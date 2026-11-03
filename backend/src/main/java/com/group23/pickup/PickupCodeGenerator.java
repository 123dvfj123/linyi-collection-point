package com.group23.pickup;

import java.security.SecureRandom;
import org.springframework.stereotype.Component;

/** Generates the numeric pickup codes shown to residents and typed at the counter. */
@Component
public class PickupCodeGenerator {

    private static final int MIN_CODE = 10_000_000;
    private static final int CODE_RANGE = 90_000_000;

    private final SecureRandom random = new SecureRandom();

    public String nextCode() {
        return Integer.toString(MIN_CODE + random.nextInt(CODE_RANGE));
    }
}
