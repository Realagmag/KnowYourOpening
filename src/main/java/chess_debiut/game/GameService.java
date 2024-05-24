package chess_debiut.game;

import chess_debiut.opening.Opening;
import chess_debiut.opening.OpeningService;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GameService {
    private final OpeningService openingService;

    @Autowired
    public GameService(OpeningService openingService) {
        this.openingService = openingService;
    }

    private ConcurrentHashMap<String, Game> userGames = new ConcurrentHashMap<>();

    // get random opening and create a new game
    public Game startNewGame() {
        Game game = new Game();
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Opening> allOpenings = openingService.getUserOpenings();
        Random rand = new Random();
        Opening opening = allOpenings.get(rand.nextInt(allOpenings.size()));
        game.setOpening(opening);
        userGames.put(username, game);
        return game;
    }
    public Game startNewGame(Long openingId) {
        Game game = new Game();
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<Opening> optionalOpening = openingService.findOpeningById(openingId);
        if (optionalOpening.isPresent()) {
            Opening opening = optionalOpening.get();
            game.setOpening(opening);
            userGames.put(username, game);
            return game;
        }else {
            throw new ObjectNotFoundException(optionalOpening, "No opening with that id in database.");
        }
    }

    public Game moveResponse(String move) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Game game = userGames.get(username);
        String moveSequence = game.getOpening().getMoveSequence();
        String currentSequence = game.getSequence();
        String nextMoves = moveSequence.substring(currentSequence.length());
        game.setSequence(currentSequence + move);
        game.setMoveNumber(game.getMoveNumber()+1);
        if(!nextMoves.startsWith(move)){
            game.PlayerLoses();}
        else if (game.getSequence().equals(game.getOpening().getMoveSequence())) {
            game.PlayerWins();
        }
        game.updatePositions(move);
        if (game.getWinner() == null){
            String programMove = nextMoves.substring(5, 10);
            game.setSequence(game.getSequence()+programMove);
            game.updatePositions(programMove);
        }
        return game;
    }
}
