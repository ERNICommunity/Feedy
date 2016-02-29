package com.joinerni.feedy.service;

import com.joinerni.feedy.domain.Form;
import com.joinerni.feedy.repository.FormRepository;
import com.joinerni.feedy.security.AuthoritiesConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.annotation.Secured;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Form.
 */
@Service
@Transactional
public class FormService {

    private final Logger log = LoggerFactory.getLogger(FormService.class);
    
    @Inject
    private FormRepository formRepository;
    
    /**
     * Save a form.
     * @return the persisted entity
     */
    @Secured({AuthoritiesConstants.ADMIN})
    public Form save(Form form) {
        log.debug("Request to save Form : {}", form);
        Form result = formRepository.save(form);
        return result;
    }

    /**
     *  get all the forms.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Form> findAll() {
        log.debug("Request to get all Forms");
        List<Form> result = formRepository.findAll();
        return result;
    }

    /**
     *  get one form by id.
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Form findOne(Long id) {
        log.debug("Request to get Form : {}", id);
        Form form = formRepository.findOne(id);
        return form;
    }

    /**
     *  delete the  form by id.
     */
    public void delete(Long id) {
        log.debug("Request to delete Form : {}", id);
        formRepository.delete(id);
    }
}
