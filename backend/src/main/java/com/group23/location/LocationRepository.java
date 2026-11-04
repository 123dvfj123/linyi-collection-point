package com.group23.location;

import jakarta.persistence.LockModeType;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/** Reads storage locations within one collection point. */
public interface LocationRepository extends JpaRepository<Location, UUID> {

    List<Location> findAllByCollectionPointIdOrderByZoneAscCodeAsc(UUID collectionPointId);

    Optional<Location> findByIdAndCollectionPointId(UUID id, UUID collectionPointId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select l from Location l where l.id = :id and l.collectionPointId = :collectionPointId")
    Optional<Location> findForUpdateByIdAndCollectionPointId(
            @Param("id") UUID id, @Param("collectionPointId") UUID collectionPointId);
}
