package com.group23.parcel;

import com.group23.audit.Audited;
import com.group23.location.Location;
import com.group23.location.LocationNotFoundException;
import com.group23.location.LocationRepository;
import com.group23.location.LocationStatus;
import com.group23.security.AuthenticatedUser;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Places a registered parcel on a chosen storage location, keeping the parcel's
 * location reference and the location's occupation in step within one transaction.
 */
@Service
public class ParcelShelvingService {

    private final ParcelRepository parcelRepository;
    private final LocationRepository locationRepository;

    public ParcelShelvingService(ParcelRepository parcelRepository, LocationRepository locationRepository) {
        this.parcelRepository = parcelRepository;
        this.locationRepository = locationRepository;
    }

    @Audited(
            action = "parcel.shelve",
            targetType = "parcel",
            targetIdExpression = "#result.id",
            collectionPointIdExpression = "#a2.collectionPointId")
    @Transactional
    public ParcelResponse shelve(UUID parcelId, ParcelShelveRequest request, AuthenticatedUser actor) {
        ParcelRegistrationService.requireCollectionPoint(actor);
        UUID collectionPointId = actor.collectionPointId();

        Parcel parcel = parcelRepository
                .findById(parcelId)
                .filter(candidate -> collectionPointId.equals(candidate.getCollectionPointId()))
                .orElseThrow(ParcelNotFoundException::new);

        if (parcel.getStatus() != ParcelStatus.registered) {
            throw new ParcelShelvingException(
                    "Only a parcel that is still registered can be placed on a shelf. This one is " + parcel.getStatus()
                            + ".");
        }

        if (parcel.getLocationId() != null) {
            throw new ParcelShelvingException(
                    "This parcel already names a storage location. Clear it before choosing another one.");
        }

        Location location = locationRepository
                .findByIdAndCollectionPointId(request.locationId(), collectionPointId)
                .orElseThrow(LocationNotFoundException::new);

        if (location.getStatus() != LocationStatus.available) {
            throw new ParcelShelvingException("That storage location is " + location.getStatus()
                    + ", not available. Choose a free location and try again.");
        }

        parcel.shelveAt(location.getId());
        location.occupy(parcel.getId());

        locationRepository.saveAndFlush(location);
        return ParcelResponse.from(parcelRepository.saveAndFlush(parcel));
    }
}
