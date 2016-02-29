package com.joinerni.feedy.service;

import com.joinerni.feedy.domain.Answer;
import com.joinerni.feedy.repository.AnswerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Answer.
 */
@Service
@Transactional
public class AnswerService {

    private final Logger log = LoggerFactory.getLogger(AnswerService.class);
    
    @Inject
    private AnswerRepository answerRepository;
    
    /**
     * Save a answer.
     * @return the persisted entity
     */
    public Answer save(Answer answer) {
        log.debug("Request to save Answer : {}", answer);
        Answer result = answerRepository.save(answer);
        return result;
    }

    /**
     *  get all the answers.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Answer> findAll() {
        log.debug("Request to get all Answers");
        List<Answer> result = answerRepository.findAll();
        return result;
    }

    /**
     *  get one answer by id.
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Answer findOne(Long id) {
        log.debug("Request to get Answer : {}", id);
        Answer answer = answerRepository.findOne(id);
        return answer;
    }

    /**
     *  delete the  answer by id.
     */
    public void delete(Long id) {
        log.debug("Request to delete Answer : {}", id);
        answerRepository.delete(id);
    }
}
