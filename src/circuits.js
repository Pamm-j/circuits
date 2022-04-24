import Board from "./board"
import Piece from "./piece"
import * as Util from "./util"
let board = {};
export default class Circuits {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.start();
    document.addEventListener("keyup", this.action)
  }

  action(e) {
    if (e.keyCode === 90) {
      board.placePiece()
      board.drawPlacedPieces()
      // console.table(board.grid);
    } else {
      board.clearCell(board.currentPiece.x, board.currentPiece.y)
      board.drawPlacedPieces()
      if (e.keyCode === 37) {
        board.currentPiece.moveLeft(board.ctx)
        board.drawCurrentPiece()
      } else if (e.keyCode === 38) {
        board.currentPiece.moveUp(board.ctx)
      } else if (e.keyCode === 39) {
        board.currentPiece.moveRight(board.ctx)
      } else if (e.keyCode === 40) {
        board.currentPiece.moveDown(board.ctx)
      } else if (e.keyCode === 32) {
        board.currentPiece.rotate(board.ctx)
      }
      board.drawCurrentPiece()
    }
  }

  start() {
    board = new Board(this.ctx)
  }

}