import Board from "./board"
import Piece from "./piece"
import * as Util from "./util"

export default class Circuits {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.start();
    document.addEventListener("keyup", this.action)
  }

  action(e) {
    if (e.keyCode === 37) {
      this.board.currentPiece.moveLeft()
    } else if (e.keyCode === 38) {
      this.board.currentPiece.rotate()
    } else if (e.keyCode === 39) {
      this.board.currentPiece.moveRight()
    } else if (e.keyCode === 40) {
      this.board.currentPiece.moveUp()
    } else if (e.keyCode === 32) {
      this.board.currentPiece.rotate()
    }
  }

  start() {
    this.board = new Board(this.ctx)
    console.table(this.board.grid);
    // setTimeout(this.board.grid.currentPiece.moveUp(this.ctx), 1000)
  }

}