import Board from "./board"
import Timer from "./timer";

let board = {};
export default class Circuits {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.play();
    document.addEventListener("keydown", this.action);
  }

  action(e) {
    if (e.keyCode === 83 ) {
      board.placePiece()
    } else { 
      board.clearCurrentPiece()
      if (e.keyCode === 37) {
        board.currentPiece.moveLeft(board.ctx)
      } else if (e.keyCode === 38) {
        board.currentPiece.moveUp(board.ctx)
      } else if (e.keyCode === 39) {
        board.currentPiece.moveRight(board.ctx)
      } else if (e.keyCode === 40) {
        board.currentPiece.moveDown(board.ctx)
      } else if (e.keyCode === 68) {
        board.currentPiece.rotatePiece(board.ctx)
      }
      board.drawPlacedPieces()
      board.drawCurrentPiece()
    }
  } 

  start() {
    board = new Board(this.ctx)
    // let timer = new Timer()
  }

  play(){
    this.start()
  }

  reset(){

  }

}