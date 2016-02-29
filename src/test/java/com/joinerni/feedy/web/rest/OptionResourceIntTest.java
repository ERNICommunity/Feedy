package com.joinerni.feedy.web.rest;

import com.joinerni.feedy.Application;
import com.joinerni.feedy.domain.Option;
import com.joinerni.feedy.repository.OptionRepository;
import com.joinerni.feedy.service.OptionService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the OptionResource REST controller.
 *
 * @see OptionResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class OptionResourceIntTest {

    private static final String DEFAULT_TEXT = "AAAAA";
    private static final String UPDATED_TEXT = "BBBBB";

    @Inject
    private OptionRepository optionRepository;

    @Inject
    private OptionService optionService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restOptionMockMvc;

    private Option option;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        OptionResource optionResource = new OptionResource();
        ReflectionTestUtils.setField(optionResource, "optionService", optionService);
        this.restOptionMockMvc = MockMvcBuilders.standaloneSetup(optionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        option = new Option();
        option.setText(DEFAULT_TEXT);
    }

    @Test
    @Transactional
    public void createOption() throws Exception {
        int databaseSizeBeforeCreate = optionRepository.findAll().size();

        // Create the Option

        restOptionMockMvc.perform(post("/api/options")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(option)))
                .andExpect(status().isCreated());

        // Validate the Option in the database
        List<Option> options = optionRepository.findAll();
        assertThat(options).hasSize(databaseSizeBeforeCreate + 1);
        Option testOption = options.get(options.size() - 1);
        assertThat(testOption.getText()).isEqualTo(DEFAULT_TEXT);
    }

    @Test
    @Transactional
    public void checkTextIsRequired() throws Exception {
        int databaseSizeBeforeTest = optionRepository.findAll().size();
        // set the field null
        option.setText(null);

        // Create the Option, which fails.

        restOptionMockMvc.perform(post("/api/options")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(option)))
                .andExpect(status().isBadRequest());

        List<Option> options = optionRepository.findAll();
        assertThat(options).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOptions() throws Exception {
        // Initialize the database
        optionRepository.saveAndFlush(option);

        // Get all the options
        restOptionMockMvc.perform(get("/api/options?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(option.getId().intValue())))
                .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())));
    }

    @Test
    @Transactional
    public void getOption() throws Exception {
        // Initialize the database
        optionRepository.saveAndFlush(option);

        // Get the option
        restOptionMockMvc.perform(get("/api/options/{id}", option.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(option.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOption() throws Exception {
        // Get the option
        restOptionMockMvc.perform(get("/api/options/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOption() throws Exception {
        // Initialize the database
        optionRepository.saveAndFlush(option);

		int databaseSizeBeforeUpdate = optionRepository.findAll().size();

        // Update the option
        option.setText(UPDATED_TEXT);

        restOptionMockMvc.perform(put("/api/options")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(option)))
                .andExpect(status().isOk());

        // Validate the Option in the database
        List<Option> options = optionRepository.findAll();
        assertThat(options).hasSize(databaseSizeBeforeUpdate);
        Option testOption = options.get(options.size() - 1);
        assertThat(testOption.getText()).isEqualTo(UPDATED_TEXT);
    }

    @Test
    @Transactional
    public void deleteOption() throws Exception {
        // Initialize the database
        optionRepository.saveAndFlush(option);

		int databaseSizeBeforeDelete = optionRepository.findAll().size();

        // Get the option
        restOptionMockMvc.perform(delete("/api/options/{id}", option.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Option> options = optionRepository.findAll();
        assertThat(options).hasSize(databaseSizeBeforeDelete - 1);
    }
}
