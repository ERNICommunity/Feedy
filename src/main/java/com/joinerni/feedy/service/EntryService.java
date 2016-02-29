package com.joinerni.feedy.service;

import com.joinerni.feedy.domain.Entry;
import com.joinerni.feedy.repository.EntryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Entry.
 */
@Service
@Transactional
public class EntryService {

    private final Logger log = LoggerFactory.getLogger(EntryService.class);
    
    @Inject
    private EntryRepository entryRepository;
    
    /**
     * Save a entry.
     * @return the persisted entity
     */
    public Entry save(Entry entry) {
        log.debug("Request to save Entry : {}", entry);
        Entry result = entryRepository.save(entry);
        return result;
    }

    /**
     *  get all the entrys.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Entry> findAll() {
        log.debug("Request to get all Entrys");
        List<Entry> result = entryRepository.findAll();
        return result;
    }

    /**
     *  get one entry by id.
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Entry findOne(Long id) {
        log.debug("Request to get Entry : {}", id);
        Entry entry = entryRepository.findOne(id);
        return entry;
    }

    /**
     *  delete the  entry by id.
     */
    public void delete(Long id) {
        log.debug("Request to delete Entry : {}", id);
        entryRepository.delete(id);
    }
}
