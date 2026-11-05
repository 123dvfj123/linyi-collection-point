package com.group23.parcel;

import jakarta.persistence.LockModeType;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/** Persists and reads registered parcels. */
public interface ParcelRepository extends JpaRepository<Parcel, UUID> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Parcel p where p.id = :id")
    Optional<Parcel> findForUpdateById(@Param("id") UUID id);
}
