package com.joinerni.feedy.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.joinerni.feedy.domain.enumeration.AnswerType;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
public class Question implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "answer_type", nullable = false)
    private AnswerType answerType;
    
    @NotNull
    @Column(name = "text", nullable = false)
    private String text;
    
    @NotNull
    @Column(name = "is_mandatory", nullable = false)
    private Boolean isMandatory;
    
    @ManyToMany
    @JoinTable(name = "question_options",
               joinColumns = @JoinColumn(name="questions_id", referencedColumnName="ID"),
               inverseJoinColumns = @JoinColumn(name="optionss_id", referencedColumnName="ID"))
    private Set<Option> optionss = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "form_id")
    private Form form;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AnswerType getAnswerType() {
        return answerType;
    }
    
    public void setAnswerType(AnswerType answerType) {
        this.answerType = answerType;
    }

    public String getText() {
        return text;
    }
    
    public void setText(String text) {
        this.text = text;
    }

    public Boolean getIsMandatory() {
        return isMandatory;
    }
    
    public void setIsMandatory(Boolean isMandatory) {
        this.isMandatory = isMandatory;
    }

    public Set<Option> getOptionss() {
        return optionss;
    }

    public void setOptionss(Set<Option> options) {
        this.optionss = options;
    }

    public Form getForm() {
        return form;
    }

    public void setForm(Form form) {
        this.form = form;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Question question = (Question) o;
        if(question.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, question.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + id +
            ", answerType='" + answerType + "'" +
            ", text='" + text + "'" +
            ", isMandatory='" + isMandatory + "'" +
            '}';
    }
}
