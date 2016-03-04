package com.joinerni.feedy.repository;

import com.joinerni.feedy.domain.Question;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Question entity.
 */
public interface QuestionRepository extends JpaRepository<Question,Long> {

    @Query("select distinct question from Question question left join fetch question.optionss")
    List<Question> findAllWithEagerRelationships();

    @Query("select question from Question question left join fetch question.optionss where question.id =:id")
    Question findOneWithEagerRelationships(@Param("id") Long id);

}
