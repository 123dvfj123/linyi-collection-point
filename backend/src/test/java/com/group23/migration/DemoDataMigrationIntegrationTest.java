package com.group23.migration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.sql.DataSource;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

/**
 * Covers item 2 of issue #289 on a clean Testcontainers database: V1 to V4 apply
 * in order, the two demo codes stay usable, a second run of V4 cannot bring a
 * used code back, and the parcel/pickup-code links stay one-to-one.
 */
@Testcontainers(disabledWithoutDocker = true)
@SpringBootTest
class DemoDataMigrationIntegrationTest {

    private static final String FIRST_DEMO_CODE = "48210001";
    private static final String SECOND_DEMO_CODE = "48210002";
    private static final String USED_DEMO_CODE = "48210003";

    @Container
    static final PostgreSQLContainer<?> POSTGRES = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void databaseProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
        registry.add("spring.datasource.username", POSTGRES::getUsername);
        registry.add("spring.datasource.password", POSTGRES::getPassword);
    }

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private DataSource dataSource;

    /**
     * The re-run test deliberately edits the demo rows, so every test starts from
     * the state V4 leaves behind instead of from whatever the previous test did.
     */
    @AfterEach
    void restoreDemoCodes() {
        jdbcTemplate.update(
                """
                UPDATE pickup_codes
                SET status = 'active'::pickup_code_status,
                    used_at = NULL,
                    expires_at = CURRENT_TIMESTAMP + INTERVAL '30 days'
                WHERE code IN (?, ?)
                """,
                FIRST_DEMO_CODE,
                SECOND_DEMO_CODE);
    }

    @Test
    void appliesEveryMigrationInOrderOnACleanDatabase() {
        List<String> versions = jdbcTemplate.queryForList(
                "SELECT version FROM flyway_schema_history WHERE success ORDER BY installed_rank", String.class);

        assertThat(versions).containsExactly("1", "2", "3", "4");
    }

    @Test
    void demoCodesAreActiveAndExpireInTheFuture() {
        assertThat(isActiveWithFutureExpiry(FIRST_DEMO_CODE)).isTrue();
        assertThat(isActiveWithFutureExpiry(SECOND_DEMO_CODE)).isTrue();
    }

    @Test
    void rerunningV4RefreshesAnExpiredCodeAndLeavesUsedCodesUsed() {
        jdbcTemplate.update(
                "UPDATE pickup_codes SET expires_at = CURRENT_TIMESTAMP - INTERVAL '1 day' WHERE code = ?",
                FIRST_DEMO_CODE);
        jdbcTemplate.update(
                "UPDATE pickup_codes SET status = 'used'::pickup_code_status, used_at = CURRENT_TIMESTAMP"
                        + " WHERE code = ?",
                SECOND_DEMO_CODE);

        runV4Again();

        assertThat(isActiveWithFutureExpiry(FIRST_DEMO_CODE)).isTrue();
        Map<String, Object> secondCode = jdbcTemplate.queryForMap(
                "SELECT status::text AS status, used_at FROM pickup_codes WHERE code = ?", SECOND_DEMO_CODE);
        assertThat(secondCode.get("status")).isEqualTo("used");
        assertThat(secondCode.get("used_at")).isNotNull();
        assertThat(isUsed(USED_DEMO_CODE)).isTrue();
    }

    @Test
    void everyParcelAndPickupCodeStillPointAtEachOther() {
        Integer parcelsWithBrokenLink = jdbcTemplate.queryForObject(
                """
                SELECT count(*)
                FROM parcels p
                LEFT JOIN pickup_codes c ON c.id = p.pickup_code_id
                WHERE p.pickup_code_id IS NOT NULL
                  AND (c.id IS NULL OR c.parcel_id <> p.id)
                """,
                Integer.class);
        assertThat(parcelsWithBrokenLink).isZero();

        Integer codesWithoutParcel = jdbcTemplate.queryForObject(
                """
                SELECT count(*)
                FROM pickup_codes c
                LEFT JOIN parcels p ON p.id = c.parcel_id
                WHERE p.id IS NULL
                """,
                Integer.class);
        assertThat(codesWithoutParcel).isZero();

        assertThat(hasForeignKey("parcels", "pickup_code_id", "pickup_codes")).isTrue();
        assertThat(hasForeignKey("pickup_codes", "parcel_id", "parcels")).isTrue();
        assertThat(hasUniqueConstraint("parcels", "pickup_code_id")).isTrue();
        assertThat(hasUniqueConstraint("pickup_codes", "parcel_id")).isTrue();
    }

    @Test
    void theDatabaseRefusesAPickupCodeThatDoesNotExist() {
        UUID parcelId = jdbcTemplate.queryForObject("SELECT id FROM parcels LIMIT 1", UUID.class);
        UUID missingCodeId = UUID.fromString("50000000-0000-4000-8000-00000000ffff");

        assertThatThrownBy(() -> jdbcTemplate.update(
                        "UPDATE parcels SET pickup_code_id = ? WHERE id = ?", missingCodeId, parcelId))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    private void runV4Again() {
        ResourceDatabasePopulator populator =
                new ResourceDatabasePopulator(new ClassPathResource("db/migration/V4__refresh_demo_pickup_codes.sql"));
        populator.execute(dataSource);
    }

    private boolean isActiveWithFutureExpiry(String code) {
        Boolean matches = jdbcTemplate.queryForObject(
                "SELECT status = 'active' AND expires_at > CURRENT_TIMESTAMP FROM pickup_codes WHERE code = ?",
                Boolean.class,
                code);
        return Boolean.TRUE.equals(matches);
    }

    private boolean isUsed(String code) {
        Boolean used = jdbcTemplate.queryForObject(
                "SELECT status = 'used' AND used_at IS NOT NULL FROM pickup_codes WHERE code = ?", Boolean.class, code);
        return Boolean.TRUE.equals(used);
    }

    private boolean hasForeignKey(String table, String column, String referencedTable) {
        Integer count = jdbcTemplate.queryForObject(
                """
                SELECT count(*)
                FROM pg_constraint con
                JOIN pg_class src ON src.oid = con.conrelid
                JOIN pg_class dst ON dst.oid = con.confrelid
                JOIN pg_attribute att ON att.attrelid = con.conrelid AND att.attnum = ANY (con.conkey)
                WHERE con.contype = 'f'
                  AND src.relname = ?
                  AND dst.relname = ?
                  AND att.attname = ?
                """,
                Integer.class,
                table,
                referencedTable,
                column);
        return count != null && count > 0;
    }

    private boolean hasUniqueConstraint(String table, String column) {
        Integer count = jdbcTemplate.queryForObject(
                """
                SELECT count(*)
                FROM pg_constraint con
                JOIN pg_class src ON src.oid = con.conrelid
                JOIN pg_attribute att ON att.attrelid = con.conrelid AND att.attnum = ANY (con.conkey)
                WHERE con.contype = 'u'
                  AND src.relname = ?
                  AND att.attname = ?
                """,
                Integer.class,
                table,
                column);
        return count != null && count > 0;
    }
}
