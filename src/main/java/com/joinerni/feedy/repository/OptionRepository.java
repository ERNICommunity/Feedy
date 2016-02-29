package com.joinerni.feedy.repository;

import com.joinerni.feedy.domain.Option;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Option entity.
 */
public interface OptionRepository extends JpaRepository<Option,Long> {

}
