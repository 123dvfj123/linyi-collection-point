package com.group23.parcel;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group23.security.AuthenticatedUser;
import com.group23.user.UserRole;
import java.util.List;
import java.util.Map;
import java.util.UUID;
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
}
