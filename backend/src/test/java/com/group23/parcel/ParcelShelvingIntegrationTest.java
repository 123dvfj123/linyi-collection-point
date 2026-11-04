package com.group23.parcel;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group23.pickup.PickupCode;
import com.group23.pickup.PickupCodeIssuanceService;
import com.group23.security.AuthenticatedUser;
import com.group23.user.UserRole;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.Callable;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

/**
 * Covers gap 1 of issue #98 end to end: a parcel that is already registered is given a storage
 * location, the parcel reads as shelved, and the location reads as occupied by that parcel.
 */
@Testcontainers(disabledWithoutDocker = true)
@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class ParcelShelvingIntegrationTest {

    private static final UUID STAFF_ID = UUID.fromString("20000000-0000-4000-8000-000000000002");
    private static final UUID COLLECTION_POINT_ID = UUID.fromString("10000000-0000-4000-8000-000000000001");

    @Container
    static final PostgreSQLContainer<?> POSTGRES = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void databaseProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
        registry.add("spring.datasource.username", POSTGRES::getUsername);
        registry.add("spring.datasource.password", POSTGRES::getPassword);
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private ParcelRepository parcelRepository;

    @Autowired
    private PickupCodeIssuanceService pickupCodeIssuanceService;

    @Autowired
    private PlatformTransactionManager transactionManager;

    @BeforeEach
    void authenticateStaff() {
        AuthenticatedUser principal = new AuthenticatedUser(STAFF_ID, UserRole.staff, COLLECTION_POINT_ID);
        SecurityContextHolder.getContext()
                .setAuthentication(new UsernamePasswordAuthenticationToken(principal, null, List.of()));
    }

    @AfterEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void placesARegisteredParcelOnAnAvailableLocation() throws Exception {
        UUID locationId = insertLocation("available");
        UUID parcelId = registerParcel();

        mockMvc.perform(patch("/api/parcels/{id}/location", parcelId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new ParcelShelveRequest(locationId))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(parcelId.toString()))
                .andExpect(jsonPath("$.status").value("shelved"))
                .andExpect(jsonPath("$.locationId").value(locationId.toString()));

        Map<String, Object> parcel = jdbcTemplate.queryForMap(
                "SELECT status::text AS status, location_id, pickup_code_id FROM parcels WHERE id = ?", parcelId);
        assertThat(parcel.get("status")).isEqualTo("shelved");
        assertThat(parcel.get("location_id")).isEqualTo(locationId);

        Map<String, Object> pickupCode = jdbcTemplate.queryForMap(
                "SELECT id, code, status::text AS status FROM pickup_codes WHERE parcel_id = ?", parcelId);
        assertThat(pickupCode.get("status")).isEqualTo("active");
        assertThat((String) pickupCode.get("code")).isNotBlank();
        assertThat(parcel.get("pickup_code_id")).isEqualTo(pickupCode.get("id"));

        Map<String, Object> location = jdbcTemplate.queryForMap(
                "SELECT status::text AS status, parcel_id FROM locations WHERE id = ?", locationId);
        assertThat(location.get("status")).isEqualTo("occupied");
        assertThat(location.get("parcel_id")).isEqualTo(parcelId);

        Map<String, Object> audit = jdbcTemplate.queryForMap(
                """
                SELECT actor_id, collection_point_id, target_id
                FROM audit_logs
                WHERE action = 'parcel.shelve' AND target_id = ?
                """,
                parcelId);
        assertThat(audit.get("actor_id")).isEqualTo(STAFF_ID);
        assertThat(audit.get("collection_point_id")).isEqualTo(COLLECTION_POINT_ID);
    }

    @Test
    void rejectsALocationThatIsAlreadyOccupiedAndLeavesTheParcelRegistered() throws Exception {
        UUID locationId = insertLocation("available");
        UUID occupant = registerParcel();
        mockMvc.perform(patch("/api/parcels/{id}/location", occupant)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new ParcelShelveRequest(locationId))))
                .andExpect(status().isOk());

        UUID parcelId = registerParcel();

        mockMvc.perform(patch("/api/parcels/{id}/location", parcelId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new ParcelShelveRequest(locationId))))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.error.code").value("UNPROCESSABLE_ENTITY"));

        String status =
                jdbcTemplate.queryForObject("SELECT status::text FROM parcels WHERE id = ?", String.class, parcelId);
        assertThat(status).isEqualTo("registered");
    }

    @Test
    void reportsAnUnknownParcelAsNotFound() throws Exception {
        UUID locationId = insertLocation("available");

        mockMvc.perform(patch("/api/parcels/{id}/location", UUID.randomUUID())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new ParcelShelveRequest(locationId))))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error.code").value("NOT_FOUND"));
    }

    @Test
    void reportsALocationFromAnotherCollectionPointAsNotFound() throws Exception {
        UUID parcelId = registerParcel();
        UUID foreignLocationId = insertLocationAt("10000000-0000-4000-8000-000000000002", "available");

        mockMvc.perform(patch("/api/parcels/{id}/location", parcelId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new ParcelShelveRequest(foreignLocationId))))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error.code").value("NOT_FOUND"));
    }

    @Test
    void rejectsASecondShelvingOfTheSameParcel() throws Exception {
        UUID firstLocation = insertLocation("available");
        UUID secondLocation = insertLocation("available");
        UUID parcelId = registerParcel();

        mockMvc.perform(patch("/api/parcels/{id}/location", parcelId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new ParcelShelveRequest(firstLocation))))
                .andExpect(status().isOk());

        mockMvc.perform(patch("/api/parcels/{id}/location", parcelId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new ParcelShelveRequest(secondLocation))))
                .andExpect(status().isUnprocessableEntity());

        String status = jdbcTemplate.queryForObject(
                "SELECT status::text FROM locations WHERE id = ?", String.class, secondLocation);
        assertThat(status).isEqualTo("available");
    }

    @Test
    void concurrentShelvingToTheSameLocationAllowsOnlyOneParcel() throws Exception {
        UUID locationId = insertLocation("available");
        UUID firstParcelId = registerParcel();
        UUID secondParcelId = registerParcel();

        List<MvcResult> results = shelveConcurrently(
                List.of(new ShelveAttempt(firstParcelId, locationId), new ShelveAttempt(secondParcelId, locationId)));

        assertThat(results)
                .extracting(result -> result.getResponse().getStatus())
                .containsExactlyInAnyOrder(200, 422);
        MvcResult rejected = results.stream()
                .filter(result -> result.getResponse().getStatus() == 422)
                .findFirst()
                .orElseThrow();
        assertThat(objectMapper
                        .readTree(rejected.getResponse().getContentAsString())
                        .path("error")
                        .path("code")
                        .asText())
                .isEqualTo("UNPROCESSABLE_ENTITY");

        Map<String, Object> location = jdbcTemplate.queryForMap(
                "SELECT status::text AS status, parcel_id FROM locations WHERE id = ?", locationId);
        assertThat(location.get("status")).isEqualTo("occupied");
        UUID winner = (UUID) location.get("parcel_id");
        assertThat(winner).isIn(firstParcelId, secondParcelId);

        Integer parcelsAtLocation = jdbcTemplate.queryForObject(
                "SELECT count(*) FROM parcels WHERE location_id = ?", Integer.class, locationId);
        assertThat(parcelsAtLocation).isEqualTo(1);
        String winnerStatus =
                jdbcTemplate.queryForObject("SELECT status::text FROM parcels WHERE id = ?", String.class, winner);
        assertThat(winnerStatus).isEqualTo("shelved");

        Integer pickupCodes = jdbcTemplate.queryForObject(
                "SELECT count(*) FROM pickup_codes WHERE parcel_id IN (?, ?)",
                Integer.class,
                firstParcelId,
                secondParcelId);
        assertThat(pickupCodes).isEqualTo(1);
        Integer orphanCodes = jdbcTemplate.queryForObject(
                """
                SELECT count(*)
                FROM pickup_codes c
                LEFT JOIN parcels p ON p.id = c.parcel_id
                WHERE c.parcel_id IN (?, ?) AND p.id IS NULL
                """,
                Integer.class,
                firstParcelId,
                secondParcelId);
        assertThat(orphanCodes).isZero();
    }

    @Test
    void concurrentShelvingOfTheSameParcelAllowsOnlyOneLocation() throws Exception {
        UUID firstLocation = insertLocation("available");
        UUID secondLocation = insertLocation("available");
        UUID parcelId = registerParcel();

        List<MvcResult> results = shelveConcurrently(
                List.of(new ShelveAttempt(parcelId, firstLocation), new ShelveAttempt(parcelId, secondLocation)));

        assertThat(results)
                .extracting(result -> result.getResponse().getStatus())
                .containsExactlyInAnyOrder(200, 422);
        MvcResult rejected = results.stream()
                .filter(result -> result.getResponse().getStatus() == 422)
                .findFirst()
                .orElseThrow();
        assertThat(objectMapper
                        .readTree(rejected.getResponse().getContentAsString())
                        .path("error")
                        .path("code")
                        .asText())
                .isEqualTo("UNPROCESSABLE_ENTITY");

        UUID parcelLocation =
                jdbcTemplate.queryForObject("SELECT location_id FROM parcels WHERE id = ?", UUID.class, parcelId);
        assertThat(parcelLocation).isIn(firstLocation, secondLocation);

        Map<String, Object> occupiedLocation = jdbcTemplate.queryForMap(
                "SELECT id, parcel_id FROM locations WHERE status = 'occupied' AND id IN (?, ?)",
                firstLocation,
                secondLocation);
        assertThat(occupiedLocation.get("id")).isEqualTo(parcelLocation);
        assertThat(occupiedLocation.get("parcel_id")).isEqualTo(parcelId);

        Integer availableLocations = jdbcTemplate.queryForObject(
                "SELECT count(*) FROM locations WHERE status = 'available' AND id IN (?, ?)",
                Integer.class,
                firstLocation,
                secondLocation);
        assertThat(availableLocations).isEqualTo(1);
        Integer pickupCodes = jdbcTemplate.queryForObject(
                "SELECT count(*) FROM pickup_codes WHERE parcel_id = ?", Integer.class, parcelId);
        assertThat(pickupCodes).isEqualTo(1);
    }

    @Test
    void rollingBackTheShelvingTransactionAlsoRemovesTheIssuedPickupCode() throws Exception {
        UUID parcelId = registerParcel();
        AtomicReference<UUID> issuedCodeId = new AtomicReference<>();

        new TransactionTemplate(transactionManager).executeWithoutResult(transaction -> {
            Parcel parcel = parcelRepository.findById(parcelId).orElseThrow();
            PickupCode pickupCode = pickupCodeIssuanceService.issueFor(parcel);
            issuedCodeId.set(pickupCode.getId());
            transaction.setRollbackOnly();
        });

        Integer persistedCodes = jdbcTemplate.queryForObject(
                "SELECT count(*) FROM pickup_codes WHERE id = ?", Integer.class, issuedCodeId.get());
        assertThat(persistedCodes).isZero();
        Integer orphanCodes = jdbcTemplate.queryForObject(
                """
                SELECT count(*)
                FROM pickup_codes c
                LEFT JOIN parcels p ON p.id = c.parcel_id
                WHERE c.id = ? AND p.id IS NULL
                """,
                Integer.class,
                issuedCodeId.get());
        assertThat(orphanCodes).isZero();
    }

    private List<MvcResult> shelveConcurrently(List<ShelveAttempt> attempts) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(attempts.size());
        CountDownLatch ready = new CountDownLatch(attempts.size());
        CountDownLatch start = new CountDownLatch(1);
        List<Future<MvcResult>> futures = new ArrayList<>();

        try {
            for (ShelveAttempt attempt : attempts) {
                Callable<MvcResult> task = () -> {
                    authenticateStaff();
                    ready.countDown();
                    try {
                        if (!start.await(5, TimeUnit.SECONDS)) {
                            throw new IllegalStateException("concurrent shelving did not start");
                        }
                        return mockMvc.perform(patch("/api/parcels/{id}/location", attempt.parcelId())
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(objectMapper.writeValueAsString(
                                                new ParcelShelveRequest(attempt.locationId()))))
                                .andReturn();
                    } finally {
                        SecurityContextHolder.clearContext();
                    }
                };
                futures.add(executor.submit(task));
            }

            if (!ready.await(5, TimeUnit.SECONDS)) {
                throw new IllegalStateException("concurrent shelving setup did not finish");
            }
            start.countDown();

            List<MvcResult> results = new ArrayList<>();
            for (Future<MvcResult> future : futures) {
                results.add(future.get(10, TimeUnit.SECONDS));
            }
            return results;
        } finally {
            executor.shutdownNow();
        }
    }

    private UUID registerParcel() throws Exception {
        ParcelCreateRequest request = new ParcelCreateRequest(
                "SHELVE-" + UUID.randomUUID(), "SF Express", "Recipient", "13812345678", ParcelSize.small, null);
        String response = mockMvc.perform(post("/api/parcels")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();
        return UUID.fromString(objectMapper.readTree(response).get("id").asText());
    }

    private UUID insertLocation(String status) {
        return insertLocationAt(COLLECTION_POINT_ID.toString(), status);
    }

    private UUID insertLocationAt(String collectionPointId, String status) {
        UUID id = UUID.randomUUID();
        jdbcTemplate.update(
                """
                INSERT INTO locations (id, code, zone, size, status, parcel_id, collection_point_id, updated_at)
                VALUES (?, ?, 'Z', 'small'::parcel_size, ?::location_status, NULL, ?::uuid, CURRENT_TIMESTAMP)
                """,
                id,
                "SHELVE-" + id,
                status,
                collectionPointId);
        return id;
    }

    private record ShelveAttempt(UUID parcelId, UUID locationId) {}
}
