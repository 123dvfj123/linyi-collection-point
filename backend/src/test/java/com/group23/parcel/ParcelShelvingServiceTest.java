package com.group23.parcel;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.group23.location.LocationNotFoundException;
import com.group23.location.LocationRepository;
import com.group23.security.AuthenticatedUser;
import com.group23.user.UserRole;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class ParcelShelvingServiceTest {

    private static final UUID STAFF_ID = UUID.fromString("20000000-0000-4000-8000-000000000002");
    private static final UUID COLLECTION_POINT_ID = UUID.fromString("10000000-0000-4000-8000-000000000001");
    private static final UUID OTHER_POINT_ID = UUID.fromString("10000000-0000-4000-8000-000000000002");
    private static final AuthenticatedUser STAFF = new AuthenticatedUser(STAFF_ID, UserRole.staff, COLLECTION_POINT_ID);

    private final ParcelRepository parcelRepository = mock(ParcelRepository.class);
    private final LocationRepository locationRepository = mock(LocationRepository.class);
    private final ParcelShelvingService service = new ParcelShelvingService(parcelRepository, locationRepository);

    @Test
    void rejectsAStaffMemberWithoutACollectionPoint() {
        AuthenticatedUser unassigned = new AuthenticatedUser(STAFF_ID, UserRole.staff, null);

        assertThatThrownBy(() -> service.shelve(UUID.randomUUID(), request(), unassigned))
                .isInstanceOf(MissingCollectionPointException.class);
        verify(parcelRepository, never()).saveAndFlush(any(Parcel.class));
    }

    @Test
    void rejectsAParcelThatDoesNotExist() {
        when(parcelRepository.findById(any())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.shelve(UUID.randomUUID(), request(), STAFF))
                .isInstanceOf(ParcelNotFoundException.class);
    }

    @Test
    void hidesAParcelOwnedByAnotherCollectionPoint() {
        Parcel parcel = Parcel.register(createRequest(), staffAt(OTHER_POINT_ID));
        when(parcelRepository.findById(any())).thenReturn(Optional.of(parcel));

        assertThatThrownBy(() -> service.shelve(UUID.randomUUID(), request(), STAFF))
                .isInstanceOf(ParcelNotFoundException.class);
    }

    @Test
    void rejectsAParcelThatIsNotRegistered() {
        Parcel parcel = Parcel.register(createRequest(), STAFF);
        parcel.shelveAt(UUID.randomUUID());
        when(parcelRepository.findById(any())).thenReturn(Optional.of(parcel));

        assertThatThrownBy(() -> service.shelve(UUID.randomUUID(), request(), STAFF))
                .isInstanceOf(ParcelShelvingException.class)
                .hasMessageContaining("still registered");
    }

    @Test
    void rejectsAParcelThatAlreadyNamesALocation() {
        UUID existingLocation = UUID.randomUUID();
        Parcel parcel = Parcel.register(createRequest(existingLocation), STAFF);
        when(parcelRepository.findById(any())).thenReturn(Optional.of(parcel));

        assertThatThrownBy(() -> service.shelve(UUID.randomUUID(), request(), STAFF))
                .isInstanceOf(ParcelShelvingException.class)
                .hasMessageContaining("already names a storage location");
    }

    @Test
    void rejectsALocationThatDoesNotExistAtTheCallersCollectionPoint() {
        Parcel parcel = Parcel.register(createRequest(), STAFF);
        when(parcelRepository.findById(any())).thenReturn(Optional.of(parcel));
        when(locationRepository.findByIdAndCollectionPointId(any(), any())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.shelve(UUID.randomUUID(), request(), STAFF))
                .isInstanceOf(LocationNotFoundException.class);
        verify(parcelRepository, never()).saveAndFlush(any(Parcel.class));
    }

    private static AuthenticatedUser staffAt(UUID collectionPointId) {
        return new AuthenticatedUser(STAFF_ID, UserRole.staff, collectionPointId);
    }

    private static ParcelShelveRequest request() {
        return new ParcelShelveRequest(UUID.randomUUID());
    }

    private static ParcelCreateRequest createRequest() {
        return createRequest(null);
    }

    private static ParcelCreateRequest createRequest(UUID locationId) {
        return new ParcelCreateRequest(
                "SHELVE-" + UUID.randomUUID(), "SF Express", "Recipient", "13812345678", ParcelSize.small, locationId);
    }
}
