package com.group23.parcel;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

/** Request body for placing a registered parcel on a chosen storage location. */
public record ParcelShelveRequest(@NotNull(message = "must be provided") UUID locationId) {}
