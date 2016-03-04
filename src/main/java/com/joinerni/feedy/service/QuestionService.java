package com.joinerni.feedy.service;

import com.joinerni.feedy.domain.Question;
import com.joinerni.feedy.repository.QuestionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Question.
 */
@Service
@Transactional
public class QuestionService {

    private final Logger log = LoggerFactory.getLogger(QuestionService.class);
    
    @Inject
    private QuestionRepository questionRepository;
    
    /**
     * Save a question.
     * @return the persisted entity
     */
    public Question save(Question question) {
        log.debug("Request to save Question : {}", question);
        Question result = questionRepository.save(question);
        return result;
    }

    /**
     *  get all the questions.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Question> findAll() {
        log.debug("Request to get all Questions");
        List<Question> result = questionRepository.findAllWithEagerRelationships();
        return result;
    }

    /**
     *  get one question by id.
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Question findOne(Long id) {
        log.debug("Request to get Question : {}", id);
        Question question = questionRepository.findOneWithEagerRelationships(id);
        return question;
    }

    /**
     *  delete the  question by id.
     */
    public void delete(Long id) {
        log.debug("Request to delete Question : {}", id);
        questionRepository.delete(id);
    }
}
