package com.joinerni.feedy.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.joinerni.feedy.domain.Option;
import com.joinerni.feedy.service.OptionService;
import com.joinerni.feedy.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Option.
 */
@RestController
@RequestMapping("/api")
public class OptionResource {

    private final Logger log = LoggerFactory.getLogger(OptionResource.class);
        
    @Inject
    private OptionService optionService;
    
    /**
     * POST  /options -> Create a new option.
     */
    @RequestMapping(value = "/options",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Option> createOption(@Valid @RequestBody Option option) throws URISyntaxException {
        log.debug("REST request to save Option : {}", option);
        if (option.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("option", "idexists", "A new option cannot already have an ID")).body(null);
        }
        Option result = optionService.save(option);
        return ResponseEntity.created(new URI("/api/options/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("option", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /options -> Updates an existing option.
     */
    @RequestMapping(value = "/options",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Option> updateOption(@Valid @RequestBody Option option) throws URISyntaxException {
        log.debug("REST request to update Option : {}", option);
        if (option.getId() == null) {
            return createOption(option);
        }
        Option result = optionService.save(option);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("option", option.getId().toString()))
            .body(result);
    }

    /**
     * GET  /options -> get all the options.
     */
    @RequestMapping(value = "/options",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Option> getAllOptions() {
        log.debug("REST request to get all Options");
        return optionService.findAll();
            }

    /**
     * GET  /options/:id -> get the "id" option.
     */
    @RequestMapping(value = "/options/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Option> getOption(@PathVariable Long id) {
        log.debug("REST request to get Option : {}", id);
        Option option = optionService.findOne(id);
        return Optional.ofNullable(option)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /options/:id -> delete the "id" option.
     */
    @RequestMapping(value = "/options/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteOption(@PathVariable Long id) {
        log.debug("REST request to delete Option : {}", id);
        optionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("option", id.toString())).build();
    }
}
