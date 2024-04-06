package chess_debiut.game;

import java.util.List;

public class Piece {
    private String type;
    private String position;
    private String color;
    private List<String> possibleMoves;

    public Piece() {
    }

    public Piece(String type, String position, String color, List<String> possibleMoves) {
        this.type = type;
        this.position = position;
        this.color = color;
        this.possibleMoves = possibleMoves;
    }

    public Piece(String type, String position, String color) {
        this.type = type;
        this.position = position;
        this.color = color;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<String> getPossibleMoves() {
        return possibleMoves;
    }

    public void setPossibleMoves(List<String> possibleMoves) {
        this.possibleMoves = possibleMoves;
    }
}
