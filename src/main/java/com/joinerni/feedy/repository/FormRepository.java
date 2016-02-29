package com.joinerni.feedy.repository;

import com.joinerni.feedy.domain.Form;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Form entity.
 */
public interface FormRepository extends JpaRepository<Form,Long> {

}
