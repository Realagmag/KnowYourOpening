package chess_debiut.game;


import java.util.ArrayList;
import java.util.List;

public class PositionGenerator {
    public static List<Piece> startingPosition() {
        List<Piece> pieces = new ArrayList<>();
        pieces.add(new Piece("pawn", "a2", "White"));
        pieces.add(new Piece("pawn", "b2", "White"));
        pieces.add(new Piece("pawn", "c2", "White"));
        pieces.add(new Piece("pawn", "d2", "White"));
        pieces.add(new Piece("pawn", "e2", "White"));
        pieces.add(new Piece("pawn", "f2", "White"));
        pieces.add(new Piece("pawn", "g2", "White"));
        pieces.add(new Piece("pawn", "h2", "White"));
        pieces.add(new Piece("pawn", "a7", "Black"));
        pieces.add(new Piece("pawn", "b7", "Black"));
        pieces.add(new Piece("pawn", "c7", "Black"));
        pieces.add(new Piece("pawn", "d7", "Black"));
        pieces.add(new Piece("pawn", "e7", "Black"));
        pieces.add(new Piece("pawn", "f7", "Black"));
        pieces.add(new Piece("pawn", "g7", "Black"));
        pieces.add(new Piece("pawn", "h7", "Black"));
        pieces.add(new Piece("rook", "a1", "White"));
        pieces.add(new Piece("rook", "h1", "White"));
        pieces.add(new Piece("rook", "a8", "Black"));
        pieces.add(new Piece("rook", "h8", "Black"));
        pieces.add(new Piece("knight", "b1", "White"));
        pieces.add(new Piece("knight", "g1", "White"));
        pieces.add(new Piece("knight", "b8", "Black"));
        pieces.add(new Piece("knight", "g8", "Black"));
        pieces.add(new Piece("bishop", "c1", "White"));
        pieces.add(new Piece("bishop", "f1", "White"));
        pieces.add(new Piece("bishop", "c8", "Black"));
        pieces.add(new Piece("bishop", "f8", "Black"));
        pieces.add(new Piece("king", "e1", "White"));
        pieces.add(new Piece("king", "e8", "Black"));
        pieces.add(new Piece("queen", "d1", "White"));
        pieces.add(new Piece("queen", "d8", "Black"));
//        calculatePossibleMoves(pieces);
        return pieces;
    }
}

//    private static void calculatePossibleMoves(List<Piece> pieces) {
//        List<String> occupiedPositions = new ArrayList<>();
//        for (Piece piece : pieces){
//            occupiedPositions.add(piece.getPosition());
//        }
//        for (Piece piece : pieces){
//            if (piece.getType().equals("pawn")){
//                if (piece.getPosition().endsWith("2") && piece.getColor().equals("White")){
//                    String column = piece.getPosition().substring(0,1);
//                    piece.setPossibleMoves();
//                }
//            }
//
//        }
//    }
//
//}
