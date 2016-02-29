package com.joinerni.feedy.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.joinerni.feedy.domain.Answer;
import com.joinerni.feedy.service.AnswerService;
import com.joinerni.feedy.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Answer.
 */
@RestController
@RequestMapping("/api")
public class AnswerResource {

    private final Logger log = LoggerFactory.getLogger(AnswerResource.class);
        
    @Inject
    private AnswerService answerService;
    
    /**
     * POST  /answers -> Create a new answer.
     */
    @RequestMapping(value = "/answers",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Answer> createAnswer(@RequestBody Answer answer) throws URISyntaxException {
        log.debug("REST request to save Answer : {}", answer);
        if (answer.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("answer", "idexists", "A new answer cannot already have an ID")).body(null);
        }
        Answer result = answerService.save(answer);
        return ResponseEntity.created(new URI("/api/answers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("answer", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /answers -> Updates an existing answer.
     */
    @RequestMapping(value = "/answers",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Answer> updateAnswer(@RequestBody Answer answer) throws URISyntaxException {
        log.debug("REST request to update Answer : {}", answer);
        if (answer.getId() == null) {
            return createAnswer(answer);
        }
        Answer result = answerService.save(answer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("answer", answer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /answers -> get all the answers.
     */
    @RequestMapping(value = "/answers",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Answer> getAllAnswers() {
        log.debug("REST request to get all Answers");
        return answerService.findAll();
            }

    /**
     * GET  /answers/:id -> get the "id" answer.
     */
    @RequestMapping(value = "/answers/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Answer> getAnswer(@PathVariable Long id) {
        log.debug("REST request to get Answer : {}", id);
        Answer answer = answerService.findOne(id);
        return Optional.ofNullable(answer)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /answers/:id -> delete the "id" answer.
     */
    @RequestMapping(value = "/answers/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteAnswer(@PathVariable Long id) {
        log.debug("REST request to delete Answer : {}", id);
        answerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("answer", id.toString())).build();
    }
}
