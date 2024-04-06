package chess_debiut.opening;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table
@Data
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
}
