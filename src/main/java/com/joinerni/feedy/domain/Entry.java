package com.joinerni.feedy.domain;

import java.time.ZonedDateTime;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.joinerni.feedy.domain.enumeration.EntryStatus;

/**
 * A Entry.
 */
@Entity
@Table(name = "entry")
public class Entry implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "is_signed", nullable = false)
    private Boolean isSigned;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private EntryStatus status;
    
    @Column(name = "created")
    private ZonedDateTime created;
    
    @Column(name = "last_edited")
    private ZonedDateTime lastEdited;
    
    @Column(name = "first_read")
    private ZonedDateTime firstRead;
    
    @ManyToOne
    @JoinColumn(name = "answers_id")
    private Answer answers;

    @OneToOne
    private User author;

    @OneToOne
    private User target;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getIsSigned() {
        return isSigned;
    }
    
    public void setIsSigned(Boolean isSigned) {
        this.isSigned = isSigned;
    }

    public EntryStatus getStatus() {
        return status;
    }
    
    public void setStatus(EntryStatus status) {
        this.status = status;
    }

    public ZonedDateTime getCreated() {
        return created;
    }
    
    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public ZonedDateTime getLastEdited() {
        return lastEdited;
    }
    
    public void setLastEdited(ZonedDateTime lastEdited) {
        this.lastEdited = lastEdited;
    }

    public ZonedDateTime getFirstRead() {
        return firstRead;
    }
    
    public void setFirstRead(ZonedDateTime firstRead) {
        this.firstRead = firstRead;
    }

    public Answer getAnswers() {
        return answers;
    }

    public void setAnswers(Answer answer) {
        this.answers = answer;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User user) {
        this.author = user;
    }

    public User getTarget() {
        return target;
    }

    public void setTarget(User user) {
        this.target = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Entry entry = (Entry) o;
        if(entry.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, entry.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Entry{" +
            "id=" + id +
            ", isSigned='" + isSigned + "'" +
            ", status='" + status + "'" +
            ", created='" + created + "'" +
            ", lastEdited='" + lastEdited + "'" +
            ", firstRead='" + firstRead + "'" +
            '}';
    }
}
