import Board from "./board"

let board = {};
export default class Circuits {
  constructor(canvas){
    this.highScore = 0;
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.play();
    this.playing = false
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
      } else if (e.keyCode === 32) {
        board.togglePause()
      }
      board.drawPlacedPieces()
      board.drawCurrentPiece()
    }
  } 

  start() {
    addEventListener("click", ()=> {
      if (!this.playing) {
        const open = document.getElementById("opening")
        open.style.display = "none"
        board = new Board(this.ctx)
      } 
      this.playing = true;
    })
  }

  play(){
    this.start()
  }

  reset(){

  }

}