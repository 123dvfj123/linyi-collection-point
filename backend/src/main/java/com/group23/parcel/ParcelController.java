package com.group23.parcel;

import com.group23.security.AuthenticatedUser;
import jakarta.validation.Valid;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/** Exposes manual parcel registration, batch intake and shelving of an existing parcel. */
@RestController
@RequestMapping(path = "/api/parcels", produces = MediaType.APPLICATION_JSON_VALUE)
public class ParcelController {

    private final ParcelRegistrationService registrationService;
    private final ParcelBatchService batchService;
    private final ParcelShelvingService shelvingService;

    public ParcelController(
            ParcelRegistrationService registrationService,
            ParcelBatchService batchService,
            ParcelShelvingService shelvingService) {
        this.registrationService = registrationService;
        this.batchService = batchService;
        this.shelvingService = shelvingService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ParcelResponse register(
            @Valid @RequestBody ParcelCreateRequest request, @AuthenticationPrincipal AuthenticatedUser actor) {
        return registrationService.register(request, actor);
    }

    @PostMapping("/batch")
    @ResponseStatus(HttpStatus.CREATED)
    public ParcelBatchResult registerBatch(
            @Valid @RequestBody ParcelBatchCreateRequest request, @AuthenticationPrincipal AuthenticatedUser actor) {
        return batchService.register(request, actor);
    }

    @PatchMapping("/{id}/location")
    public ParcelResponse shelve(
            @PathVariable UUID id,
            @Valid @RequestBody ParcelShelveRequest request,
            @AuthenticationPrincipal AuthenticatedUser actor) {
        return shelvingService.shelve(id, request, actor);
    }
}
