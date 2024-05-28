package chess_debiut.game;

import chess_debiut.opening.Opening;
import chess_debiut.opening.OpeningService;
import chess_debiut.user.UserRepository;
import chess_debiut.user_opening.UserOpening;
import chess_debiut.user_opening.UserOpeningRepository;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GameService {
    private final OpeningService openingService;
    private final UserOpeningRepository userOpeningRepository;
    private final UserRepository userRepository;

    @Autowired
    public GameService(OpeningService openingService, UserOpeningRepository userOpeningRepository, UserRepository userRepository) {
        this.openingService = openingService;
        this.userOpeningRepository = userOpeningRepository;
        this.userRepository = userRepository;
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
        handleFirstMoveWhenPlayerIsBlack(game);
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
            handleFirstMoveWhenPlayerIsBlack(game);
            userGames.put(username, game);

            // Add opening to subscriptions
            Optional<UserOpening> userOpening = userOpeningRepository.findByUserAndOpening(
                    userRepository.getUserByUsername(username).get(), opening);
            if (userOpening.isEmpty()){
                openingService.subscribeOpening(openingId);
            }

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

        // if game ended
        if (game.getSequence().equals(game.getOpening().getMoveSequence())) {
            game.setFinalWinner(game.isMadeMistake());

            // incorect correct and update lastTrained
            if (game.getWinner().equals("Player")){
                UserOpening userOpening = userOpeningRepository.findByUserAndOpening(
                        userRepository.getUserByUsername(username).get(), game.getOpening()).get();
                userOpening.setCorrect(userOpening.getCorrect()+1);
                userOpening.setLastTrained(LocalDate.now());
                userOpeningRepository.save(userOpening);
            }
        }
        game.updatePositions(move);
        if (game.getWinner() == null){
            String programMove = nextMoves.substring(5, 10);
            game.setSequence(game.getSequence()+programMove);
            game.updatePositions(programMove);
        }
        return game;
    }

    public Game playerMadeMistake() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Game game = userGames.get(username);
        game.setMadeMistake(true);

        //increment incorrect and update lastTrained
        UserOpening userOpening = userOpeningRepository.findByUserAndOpening(
                userRepository.getUserByUsername(username).get(), game.getOpening()).get();
        userOpening.setIncorrect(userOpening.getIncorrect()+1);
        userOpening.setLastTrained(LocalDate.now());
        userOpeningRepository.save(userOpening);

        return game;
    }

    private void handleFirstMoveWhenPlayerIsBlack(Game game){
        Opening opening = game.getOpening();
        if (opening.getPlayerSide().equals("black")){
            String move = opening.getMoveSequence().substring(0,5);
            game.updatePositions(move);
            game.setSequence(move);
        }
    }
}
