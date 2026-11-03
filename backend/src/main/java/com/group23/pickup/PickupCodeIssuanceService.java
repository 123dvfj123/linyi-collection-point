package com.group23.pickup;

import com.group23.parcel.Parcel;
import java.time.Duration;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Issues the one pickup code a parcel receives when it is shelved.
 *
 * <p>The code is created in the same transaction as the parcel/location change,
 * so a failed shelving operation cannot leave an orphan code behind.
 */
@Service
public class PickupCodeIssuanceService {

    private static final int MAX_ATTEMPTS = 10;

    private final PickupCodeRepository pickupCodeRepository;
    private final PickupCodeGenerator pickupCodeGenerator;
    private final Duration validity;

    public PickupCodeIssuanceService(
            PickupCodeRepository pickupCodeRepository,
            PickupCodeGenerator pickupCodeGenerator,
            @Value("${app.pickup-code.validity:P7D}") Duration validity) {
        if (validity == null || validity.isZero() || validity.isNegative()) {
            throw new IllegalArgumentException("pickup-code validity must be positive");
        }
        this.pickupCodeRepository = pickupCodeRepository;
        this.pickupCodeGenerator = pickupCodeGenerator;
        this.validity = validity;
    }

    /**
     * Returns the parcel's existing code, or creates and persists a new active one.
     */
    @Transactional
    public PickupCode issueFor(Parcel parcel) {
        if (parcel.getPickupCodeId() != null) {
            return pickupCodeRepository
                    .findById(parcel.getPickupCodeId())
                    .orElseThrow(() -> new IllegalStateException("parcel references a missing pickup code"));
        }

        Instant expiresAt = Instant.now().plus(validity);
        for (int attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
            String code = pickupCodeGenerator.nextCode();
            if (pickupCodeRepository.findByCode(code).isPresent()) {
                continue;
            }
            PickupCode pickupCode = PickupCode.issue(parcel.getId(), code, expiresAt);
            return pickupCodeRepository.saveAndFlush(pickupCode);
        }

        throw new IllegalStateException("Unable to allocate a unique pickup code after " + MAX_ATTEMPTS + " attempts");
    }
}
