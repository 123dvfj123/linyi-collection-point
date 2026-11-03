package com.group23.parcel;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.group23.pickup.PickupCode;
import com.group23.pickup.PickupCodeGenerator;
import com.group23.pickup.PickupCodeIssuanceService;
import com.group23.pickup.PickupCodeRepository;
import com.group23.pickup.PickupCodeStatus;
import com.group23.security.AuthenticatedUser;
import com.group23.user.UserRole;
import java.time.Duration;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class PickupCodeIssuanceServiceTest {

    private static final UUID STAFF_ID = UUID.fromString("20000000-0000-4000-8000-000000000002");
    private static final UUID COLLECTION_POINT_ID = UUID.fromString("10000000-0000-4000-8000-000000000001");
    private static final AuthenticatedUser STAFF = new AuthenticatedUser(STAFF_ID, UserRole.staff, COLLECTION_POINT_ID);

    private final PickupCodeRepository pickupCodeRepository = mock(PickupCodeRepository.class);
    private final PickupCodeGenerator pickupCodeGenerator = mock(PickupCodeGenerator.class);
    private final PickupCodeIssuanceService service =
            new PickupCodeIssuanceService(pickupCodeRepository, pickupCodeGenerator, Duration.ofDays(7));

    @Test
    void issuesAnActiveCodeAndPersistsIt() {
        Parcel parcel = parcel();
        when(pickupCodeGenerator.nextCode()).thenReturn("12345678");
        when(pickupCodeRepository.findByCode("12345678")).thenReturn(Optional.empty());
        when(pickupCodeRepository.saveAndFlush(any(PickupCode.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
        Instant before = Instant.now();

        PickupCode pickupCode = service.issueFor(parcel);

        assertThat(pickupCode.getParcelId()).isEqualTo(parcel.getId());
        assertThat(pickupCode.getCode()).isEqualTo("12345678");
        assertThat(pickupCode.getStatus()).isEqualTo(PickupCodeStatus.active);
        assertThat(pickupCode.getExpiresAt()).isAfter(before.plus(Duration.ofDays(6)));
        verify(pickupCodeRepository).saveAndFlush(pickupCode);
    }

    @Test
    void retriesWhenTheGeneratedCodeAlreadyExists() {
        Parcel parcel = parcel();
        when(pickupCodeGenerator.nextCode()).thenReturn("11111111", "22222222");
        when(pickupCodeRepository.findByCode("11111111")).thenReturn(Optional.of(mock(PickupCode.class)));
        when(pickupCodeRepository.findByCode("22222222")).thenReturn(Optional.empty());
        when(pickupCodeRepository.saveAndFlush(any(PickupCode.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        PickupCode pickupCode = service.issueFor(parcel);

        assertThat(pickupCode.getCode()).isEqualTo("22222222");
    }

    private static Parcel parcel() {
        return Parcel.register(
                new ParcelCreateRequest(
                        "PICKUP-" + UUID.randomUUID(),
                        "SF Express",
                        "Recipient",
                        "13812345678",
                        ParcelSize.small,
                        null),
                STAFF);
    }
}
