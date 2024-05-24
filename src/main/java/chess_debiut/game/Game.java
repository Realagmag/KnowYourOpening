package chess_debiut.game;

import chess_debiut.opening.Opening;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Game {
    private Opening opening;
    private String onMove;
    private Long moveNumber;
    private String sequence;
    private boolean check;
    private boolean checkmate;
    private String winner;
    private List<Piece> pieces;

    // create all pieces on their positions and set attributes
    public Game() {
        this.onMove = "White";
        this.moveNumber = 1L;
        this.sequence = "";
        this.check = false;
        this.checkmate = false;
        this.winner = null;
        this.pieces = PositionGenerator.startingPosition();

    }

    public Game(Opening opening,
                String onMove,
                Long moveNumber,
                String sequence,
                boolean check,
                boolean checkmate,
                String winner,
                List<Piece> pieces) {
        this.opening = opening;
        this.onMove = onMove;
        this.moveNumber = moveNumber;
        this.sequence = sequence;
        this.check = check;
        this.checkmate = checkmate;
        this.winner = winner;
        this.pieces = pieces;
    }

    public void PlayerLoses() {
//        this.opening.setIncorrect(this.opening.getIncorrect()+1);
//        this.opening.setLastTrained(LocalDate.now());
        this.setWinner("Computer");
    }

    public void PlayerWins() {
//        this.opening.setCorrect(this.opening.getCorrect()+1);
//        this.opening.setLastTrained(LocalDate.now());
        this.setWinner("Player");
    }

    public void updatePositions(String move) {
        String fromWhere = move.substring(0, 2);
        String toWhere = move.substring(3, 5);
        int index = 0;
        int index_to_remove= -1;
        for (Piece piece : pieces) {
            piece.setMovedLast(false);
            if (piece.getPosition().equals(toWhere)){
                index_to_remove = index;
            }
            if (piece.getPosition().equals(fromWhere)){
                piece.pieceMoved(toWhere);
            }
            index = index + 1;
        }
        if (index_to_remove > -1){
            this.pieces.remove(index_to_remove);
        }
        PositionGenerator.calculatePossibleMoves(this.pieces);
    }
}
