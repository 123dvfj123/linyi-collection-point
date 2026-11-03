package com.group23.parcel;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.time.Instant;
import java.util.UUID;

/** API representation of one parcel from the OpenAPI contract. */
@JsonPropertyOrder({
    "id",
    "trackingNo",
    "carrier",
    "recipientName",
    "recipientPhone",
    "status",
    "size",
    "locationId",
    "pickupCode",
    "expectedVersion",
    "createdAt",
    "updatedAt"
})
public record ParcelResponse(
        UUID id,
        String trackingNo,
        String carrier,
        String recipientName,
        String recipientPhone,
        ParcelStatus status,
        ParcelSize size,
        UUID locationId,
        String pickupCode,
        long expectedVersion,
        Instant createdAt,
        Instant updatedAt) {

    public static ParcelResponse from(Parcel parcel) {
        return from(parcel, null);
    }

    /**
     * Includes the pickup code only on the response that issued it. List, detail
     * and verification responses must not expose the code.
     */
    public static ParcelResponse from(Parcel parcel, String pickupCode) {
        return new ParcelResponse(
                parcel.getId(),
                parcel.getTrackingNo(),
                parcel.getCarrier(),
                parcel.getRecipientName(),
                maskPhone(parcel.getRecipientPhone()),
                parcel.getStatus(),
                parcel.getSize(),
                parcel.getLocationId(),
                pickupCode,
                parcel.getExpectedVersion(),
                parcel.getCreatedAt(),
                parcel.getUpdatedAt());
    }

    private static String maskPhone(String value) {
        String digits = value.replaceAll("\\D", "");
        if (digits.length() < 7) {
            return "***";
        }
        return digits.substring(0, 3) + "****" + digits.substring(digits.length() - 4);
    }
}
