package chess_debiut.user_opening;

import chess_debiut.opening.Opening;
import chess_debiut.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "user_opening")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserOpening {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "opening_id", nullable = false)
    private Opening opening;

    Long correct;
    Long incorrect;
    LocalDate lastTrained;
}
