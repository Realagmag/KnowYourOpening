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
        calculatePossibleMoves(pieces);
        return pieces;
    }


    private static void calculatePossibleMoves(List<Piece> pieces) {
        List<String> occupiedPositions = new ArrayList<>();
        for (Piece piece : pieces){
            occupiedPositions.add(piece.getPosition());
        }
        List<String> attacked_squares = new ArrayList<>();
        for (Piece piece : pieces){
            List<String> possibleMoves = new ArrayList<>();
            boolean is_checked = false;
            attacked_squares = attackedSquares(pieces, piece.getColor(), occupiedPositions);
            is_checked = isChecked(pieces, piece.getColor(), attacked_squares);
            if (is_checked) {
                List<String> moves= new ArrayList<>();
                moves = getPossilbleMovesWithoutCheck(pieces, piece, attacked_squares);
                int index = getPieceIndex(pieces, piece.getPosition(), piece.getColor(), piece.getType());
                for (String move : moves) {
                    List<Piece> possible_list_of_pieces = new ArrayList<>(pieces);
                    Piece new_piece = new Piece(piece.getType(), move, piece.getColor());
                    possible_list_of_pieces.remove(index);
                    possible_list_of_pieces.add(index, new_piece);
                    List<String> possibleoccupiedPositions = new ArrayList<>();
                    for (Piece p : possible_list_of_pieces){
                        possibleoccupiedPositions.add(p.getPosition());
                    }
                    List<String> attacked_positions= new ArrayList<>();
                    attacked_positions = attackedSquares(pieces, piece.getColor(), possibleoccupiedPositions);
                    if (!(isChecked(possible_list_of_pieces, piece.getColor(), attacked_positions))) {
                        possibleMoves.add(move);
                    }
                }
            } else {
                possibleMoves = getPossilbleMovesWithoutCheck(pieces, piece, occupiedPositions);
            }
            piece.setPossibleMoves(possibleMoves);
        }
    }

    private static List<String> getPossilbleMovesWithoutCheck (List<Piece> pieces, Piece piece, List<String> occupied_positions) {
        List<String> possibleMoves = new ArrayList<>();
        String column = piece.getPosition().substring(0,1);
        int row = Integer.parseInt(piece.getPosition().substring(1));
        if (piece.getType().equals("pawn")){
            int color_multiplayer = 0;
            if (piece.getColor().equals("White")){
                color_multiplayer = 1;
            }   else if (piece.getColor().equals("Black")) {
                color_multiplayer = -1;
            }
            String checkedPosition_forward = column + String.valueOf(row + color_multiplayer);
            if (!(occupied_positions.contains(checkedPosition_forward))){
                possibleMoves.add(checkedPosition_forward);
                if ((piece.getPosition().endsWith("2") && piece.getColor().equals("White")) || (piece.getPosition().endsWith("7") && piece.getColor().equals("Black"))) {
                    String checkedPosition_forward_2 = column + String.valueOf(row + color_multiplayer * 2);
                    if (!(occupied_positions.contains(checkedPosition_forward_2))){
                        possibleMoves.add(checkedPosition_forward_2);
                    }
                }
            }
            if (column != "a") {
                String checkedPositionAttackLeft = Character.toString(column.charAt(0) - 1) + String.valueOf(row + color_multiplayer);
                for (Piece piece2 : pieces) {
                    if (piece2.getPosition().equals(checkedPositionAttackLeft) && !(piece2.getColor().equals(piece.getColor()))) {
                        possibleMoves.add(checkedPositionAttackLeft);
                        break;
                    }
                }
            }
            if (column != "h") {
                String checkedPositionAttackRight = Character.toString(column.charAt(0) + 1) + String.valueOf(row + color_multiplayer);
                for (Piece piece2 : pieces) {
                    if (piece2.getPosition().equals(checkedPositionAttackRight) && !(piece2.getColor().equals(piece.getColor()))) {
                        possibleMoves.add(checkedPositionAttackRight);
                        break;
                    }
                }
            }
        }


        if (piece.getType().equals("rook")){
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 0, 1, 8);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 0, -1, 8);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 1, 0, 8);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, -1, 0, 8);
        }

        if (piece.getType().equals("bishop")) {
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 1, 1, 8);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 1, -1, 8);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, -1, 1, 8);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, -1, -1, 8);
        }

        if (piece.getType().equals("queen")) {
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 0, 1, 8);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 0, -1, 8);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 1, 0, 8);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, -1, 0, 8);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 1, 1, 8);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 1, -1, 8);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, -1, 1, 8);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, -1, -1, 8);
        }

        if (piece.getType().equals("king")) {
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 0, 1, 1);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 0, -1, 1);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 1, 0, 1);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, -1, 0, 1);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 1, 1, 1);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 1, -1, 1);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, -1, 1, 1);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, -1, -1, 1);
        }

        if (piece.getType().equals("knight")) {
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 2, 1, 1);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 2, -1, 1);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 1, 2, 1);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, -1, 2, 1);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, -2, 1, 1);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, -2, -1, 1);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, 1, -2, 1);
            checkDirections(piece, pieces, occupied_positions, possibleMoves, column, row, -1, -2, 1);
        }
        return possibleMoves;
    }

    private static void checkDirections(Piece piece, List<Piece> pieces, List<String> occupied_positions, List<String> possible_moves, String column, int row, int column_delta, int row_delta, int max_move) {
        Boolean canGoFurther = true;
        String checked_column = Character.toString(column.charAt(0) + column_delta);;
        int checked_row = row + row_delta;;
        String checked_position = checked_column + String.valueOf(checked_row);
        int move = 1;
        while (canGoFurther && isValidPosition(checked_column.charAt(0), checked_row)) {
            checked_position = checked_column + String.valueOf(checked_row);
            if (!(occupied_positions.contains(checked_position))){
                possible_moves.add(checked_position);
            } else {
                Piece attacked_piece = getPieceAtPosition(pieces, checked_position);
                if (!(attacked_piece.getColor().equals(piece.getColor()))){
                    possible_moves.add(checked_position);
                }
                canGoFurther = false;
            }
            move += 1;
            if (move > max_move) {
                canGoFurther = false;
            }
            checked_column = Character.toString(checked_column.charAt(0) + column_delta);
            checked_row = checked_row + row_delta;
        }
    }

    private static boolean isValidPosition(char column, int row) {
        return column >= 'a' && column <= 'h' && row >= 1 && row <=8;
    }

    private static Piece getPieceAtPosition(List<Piece> pieces, String position) {
        for (Piece p : pieces) {
            if (p.getPosition().equals(position)) {
                return p;
            }
        }
        return null;
    }

    private static int getPieceIndex(List<Piece> pieces, String position, String color, String type) {
        int index = -1;
        int i = 0;
        for (Piece piece : pieces) {
            if (piece.getPosition().equals(position) && piece.getColor().equals(color) && piece.getType().equals(type)) {
                index = i;
                i += 1;
            }
        }
        return index;
    }

    private static List<String> attackedSquares(List<Piece> pieces, String color, List<String> occupiedPositions) {
        List<String> attacked_squares = new ArrayList<>();
        for (Piece piece : pieces) {
            String column = piece.getPosition().substring(0,1);
            int row = Integer.parseInt(piece.getPosition().substring(1));
            if (!(piece.getColor().equals(color))) {
                if (piece.getType().equals("pawn")) {
                    int color_multiplayer = 0;
                    if (piece.getColor().equals("White")){
                        color_multiplayer = 1;
                    }   else if (piece.getColor().equals("Black")) {
                        color_multiplayer = -1;
                    }
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 1, color_multiplayer, 1);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, -1, color_multiplayer, 1);
                }

                if (piece.getType().equals("rook")){
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 0, 1, 8);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 0, -1, 8);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 1, 0, 8);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, -1, 0, 8);
                }

                if (piece.getType().equals("bishop")) {
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 1, 1, 8);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 1, -1, 8);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, -1, 1, 8);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, -1, -1, 8);
                }

                if (piece.getType().equals("queen")) {
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 0, 1, 8);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 0, -1, 8);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 1, 0, 8);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, -1, 0, 8);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 1, 1, 8);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 1, -1, 8);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, -1, 1, 8);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, -1, -1, 8);
                }

                if (piece.getType().equals("king")) {
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 0, 1, 1);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 0, -1, 1);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 1, 0, 1);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, -1, 0, 1);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 1, 1, 1);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 1, -1, 1);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, -1, 1, 1);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, -1, -1, 1);
                }

                if (piece.getType().equals("knight")) {
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 2, 1, 1);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 2, -1, 1);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 1, 2, 1);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, -1, 2, 1);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, -2, 1, 1);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, -2, -1, 1);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, 1, -2, 1);
                    checkDirections(piece, pieces, occupiedPositions, attacked_squares, column, row, -1, -2, 1);

                }
            }
        }
        return attacked_squares;
    }

    private static boolean isChecked(List<Piece> pieces, String color, List<String> attacked_squares) {
        boolean is_checked = false;
        for (Piece piece : pieces) {
            is_checked = (piece.getType().equals("king") && piece.getColor().equals(color) && attacked_squares.contains(piece.getPosition()));
        }
        return is_checked;
    }
}
