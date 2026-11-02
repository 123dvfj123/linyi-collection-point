package com.group23.parcel;

/** Raised when a parcel cannot be placed on the requested storage location. */
public class ParcelShelvingException extends RuntimeException {

    public ParcelShelvingException(String message) {
        super(message);
    }
}
