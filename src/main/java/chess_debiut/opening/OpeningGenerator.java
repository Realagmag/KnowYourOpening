package chess_debiut.opening;

import chess_debiut.game.Piece;
import chess_debiut.game.PositionGenerator;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OpeningGenerator {
    private List<Piece> pieces;
    private String sequence;

    public OpeningGenerator(){
        this.pieces = PositionGenerator.startingPosition();
        this.sequence ="";
    }

    public void updatePosition(String move){
        makeMove(move, pieces);
    }

    public static void makeMove(String move, List<Piece> pieces) {
        String fromWhere = move.substring(0, 2);
        String toWhere = move.substring(3, 5);
        int index = 0;
        int index_to_remove = -1;
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
            pieces.remove(index_to_remove);
        }
        PositionGenerator.calculatePossibleMoves(pieces);
    }

}
