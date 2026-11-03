-- Demo-only data refresh. V2 used fixed dates so the two active demo codes
-- expired shortly after Sprint 2; V2 cannot be edited because Flyway checksums
-- applied migrations. New registrations receive codes from the application.
UPDATE pickup_codes
SET expires_at = CURRENT_TIMESTAMP + INTERVAL '30 days',
    status = 'active'::pickup_code_status,
    used_at = NULL
WHERE code IN ('48210001', '48210002')
  AND status <> 'used'::pickup_code_status;
