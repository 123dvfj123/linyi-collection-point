package com.group23.parcel;

/** Raised when a parcel is absent or belongs to another collection point. */
public class ParcelNotFoundException extends RuntimeException {

    public ParcelNotFoundException() {
        super("No parcel with that identifier exists at your collection point. Refresh the list and try again.");
    }
}
