package chess_debiut.game;

import chess_debiut.opening.Opening;

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

    // create all picies on their positions and set attributes
    public Game() {
        this.onMove = "White";
        this.moveNumber = 1L;
        this.sequence = "";
        this.check = false;
        this.checkmate = false;
        this.winner = null;
        this.pieces = new ArrayList<>();
        List<String> possibleMoves1P = new ArrayList<>();
        possibleMoves1P.add("a3");
        possibleMoves1P.add("a4");
        Piece firstPawn= new Piece("pawn", "a2", "white", possibleMoves1P);
        this.pieces.add(firstPawn);
        List<String> possibleMoves2P = new ArrayList<>();
        possibleMoves2P.add("b3");
        possibleMoves2P.add("b4");
        Piece secondPawn= new Piece("pawn", "b2", "white", possibleMoves2P);
        this.pieces.add(secondPawn);


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
}
