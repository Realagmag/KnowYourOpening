package chess_debiut.game;

import chess_debiut.opening.Opening;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    public Opening getOpening() {
        return opening;
    }

    public void setOpening(Opening opening) {
        this.opening = opening;
    }

    public String getOnMove() {
        return onMove;
    }

    public void setOnMove(String onMove) {
        this.onMove = onMove;
    }

    public Long getMoveNumber() {
        return moveNumber;
    }

    public void setMoveNumber(Long moveNumber) {
        this.moveNumber = moveNumber;
    }

    public String getSequence() {
        return sequence;
    }

    public void setSequence(String sequence) {
        this.sequence = sequence;
    }

    public boolean isCheck() {
        return check;
    }

    public void setCheck(boolean check) {
        this.check = check;
    }

    public boolean isCheckmate() {
        return checkmate;
    }

    public void setCheckmate(boolean checkmate) {
        this.checkmate = checkmate;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public List<Piece> getPieces() {
        return pieces;
    }

    public void setPieces(List<Piece> pieces) {
        this.pieces = pieces;
    }

    public void PlayerLoses() {
        this.opening.setIncorrect(this.opening.getIncorrect()+1);
        this.opening.setLastTrained(LocalDate.now());
        this.setWinner("Computer");
    }

    public void PlayerWins() {
        this.opening.setCorrect(this.opening.getCorrect()+1);
        this.opening.setLastTrained(LocalDate.now());
        this.setWinner("Player");
    }

    public void updatePositions() { // TO DO
    }
}
