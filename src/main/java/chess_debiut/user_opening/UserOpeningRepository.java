package chess_debiut.user_opening;

import chess_debiut.opening.Opening;
import chess_debiut.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserOpeningRepository extends JpaRepository<UserOpening, Integer> {
    List<UserOpening> findByUser(User user);
    List<UserOpening> findByOpening(Opening opening);

}
