package chess_debiut.game;

import chess_debiut.opening.Opening;
import chess_debiut.opening.OpeningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class GameService {
    private final OpeningService openingService;
    private Game game;

    @Autowired
    public GameService(OpeningService openingService) {
        this.openingService = openingService;
    }


    // get random opening and create a new game
    public Game startNewGame() {
        game = new Game();
        List<Opening> allOpenings = openingService.getAllOpenings();
        Random rand = new Random();
        Opening opening = allOpenings.get(rand.nextInt(allOpenings.size()));
        game.setOpening(opening);
        return game;
    }
}
