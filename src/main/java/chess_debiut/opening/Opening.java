package chess_debiut.opening;


import chess_debiut.user.User;
import chess_debiut.user_opening.UserOpening;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

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
    String playerSide;
    LocalDate creationDate;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User createdBy;

    @OneToMany(mappedBy = "opening", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserOpening> userOpenings = new HashSet<>();

    public Opening() {
    }

    public Opening(Long id,
                   String name,
                   String moveSequence,
                   String description,
                   String playerSide,
                   LocalDate creationDate,
                   User user) {
        this.id = id;
        this.name = name;
        this.moveSequence = moveSequence;
        this.description = description;
        this.playerSide = playerSide;
        this.creationDate = creationDate;
        this.createdBy = user;
    }

    public Opening(String name,
                   String moveSequence,
                   String description,
                   String playerSide,
                   LocalDate creationDate,
                   User user) {
        this.name = name;
        this.moveSequence = moveSequence;
        this.description = description;
        this.playerSide = playerSide;
        this.creationDate = creationDate;
        this.createdBy = user;
    }
}
