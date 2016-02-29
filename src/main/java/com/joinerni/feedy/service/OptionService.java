package com.joinerni.feedy.service;

import com.joinerni.feedy.domain.Option;
import com.joinerni.feedy.repository.OptionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Option.
 */
@Service
@Transactional
public class OptionService {

    private final Logger log = LoggerFactory.getLogger(OptionService.class);
    
    @Inject
    private OptionRepository optionRepository;
    
    /**
     * Save a option.
     * @return the persisted entity
     */
    public Option save(Option option) {
        log.debug("Request to save Option : {}", option);
        Option result = optionRepository.save(option);
        return result;
    }

    /**
     *  get all the options.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Option> findAll() {
        log.debug("Request to get all Options");
        List<Option> result = optionRepository.findAll();
        return result;
    }

    /**
     *  get one option by id.
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Option findOne(Long id) {
        log.debug("Request to get Option : {}", id);
        Option option = optionRepository.findOne(id);
        return option;
    }

    /**
     *  delete the  option by id.
     */
    public void delete(Long id) {
        log.debug("Request to delete Option : {}", id);
        optionRepository.delete(id);
    }
}
