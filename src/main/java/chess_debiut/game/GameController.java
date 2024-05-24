package chess_debiut.game;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {
    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) { this.gameService = gameService; }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/game/new")
    public Game startNewGame(){
        return gameService.startNewGame();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/game/new/{id}")
    public Game startNewGame(@PathVariable("id") Long openingId){
        return gameService.startNewGame(openingId);
    }

    @PutMapping("/game/{move}")
    public Game moveResponse(@PathVariable("move") String move){
        return gameService.moveResponse(move);
    }
}
