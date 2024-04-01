package chess_debiut.game;

import chess_debiut.opening.Opening;
import chess_debiut.opening.OpeningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {
    private final OpeningService openingService;

    @Autowired
    public GameService(OpeningService openingService) {
        this.openingService = openingService;
    }


    // get random opening and create a new game
    public Game startNewGame() {
        List<Opening> allOpenings = openingService.getAllOpenings();
        Opening opening = allOpenings.get(0);
        Game game = new Game();
        game.setOpening(opening);
        return game;
    }
}
