package chess_debiut.opening;


import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table
public class Opening {
    @Id
    @SequenceGenerator(
            name = "opening_sequence",
            sequenceName = "opening_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "opening_sequence"
    )
    Long id;
    String name;
    String moveSequence;
    String description;
    String startingSide;
    Long correct;
    Long incorrect;
    LocalDate lastTrained;
    LocalDate creationDate;

    public Opening() {
    }

    public Opening(Long id,
                   String name,
                   String moveSequence,
                   String description,
                   String startingSide,
                   Long correct,
                   Long incorrect,
                   LocalDate lastTrained,
                   LocalDate creationDate) {
        this.id = id;
        this.name = name;
        this.moveSequence = moveSequence;
        this.description = description;
        this.startingSide = startingSide;
        this.correct = correct;
        this.incorrect = incorrect;
        this.lastTrained = lastTrained;
        this.creationDate = creationDate;
    }

    public Opening(String name,
                   String moveSequence,
                   String description,
                   String startingSide,
                   Long correct,
                   Long incorrect,
                   LocalDate lastTrained,
                   LocalDate creationDate) {
        this.name = name;
        this.moveSequence = moveSequence;
        this.description = description;
        this.startingSide = startingSide;
        this.correct = correct;
        this.incorrect = incorrect;
        this.lastTrained = lastTrained;
        this.creationDate = creationDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMoveSequence() {
        return moveSequence;
    }

    public void setMoveSequence(String moveSequence) {
        this.moveSequence = moveSequence;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStartingSide() {
        return startingSide;
    }

    public void setStartingSide(String startingSide) {
        this.startingSide = startingSide;
    }

    public Long getCorrect() {
        return correct;
    }

    public void setCorrect(Long correct) {
        this.correct = correct;
    }

    public Long getIncorrect() {
        return incorrect;
    }

    public void setIncorrect(Long incorrect) {
        this.incorrect = incorrect;
    }

    public LocalDate getLastTrained() {
        return lastTrained;
    }

    public void setLastTrained(LocalDate lastTrained) {
        this.lastTrained = lastTrained;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }
}
