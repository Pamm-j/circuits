import Board from "./board"
let startTest = {};
let board = startTest

export default class Circuits {
  constructor(canvas, smallCanva){
    this.ctx = canvas.getContext("2d");
    this.smallctx = smallCanva.getContext("2d")
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.play();
    document.addEventListener("keydown", this.action);
  }

  action(e) {
    if (e.keyCode === 32 && board !== startTest && !board.timesUp) {
      board.togglePause(board.ctx)
    } else if (!board.pause && board !== startTest && board.playing === true) {
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
        board.clearGrid()
        board.drawPlacedPieces()
        board.drawCurrentPiece()
      }
    }
  } 

  play() {
    board = new Board(this.ctx, this.smallctx)
    let localHighScore = localStorage.getItem("highScore") 
    let highScoreDiv = document.querySelector("#high-score")
    if (typeof(localHighScore) === 'string' ) {
      highScoreDiv.innerHTML = localHighScore
      board.highScore = localHighScore
    } else {
      highScoreDiv = 0
      board.highScore = 0
    }
    const canvas = document.getElementById('work-bench');
    canvas.addEventListener("click", this.start, {once:true}) 
  }

  
  start(){
    board.playing = true;
    const open = document.getElementById("opening")
    open.style.display = "none"
    board.clearGrid()
    board.drawPlacedPieces()
    board.drawNextPiece()
    board.drawCurrentPiece()
    board.resetTimer()
    // board.reset()

  }

}