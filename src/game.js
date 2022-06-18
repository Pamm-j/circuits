import Board from "./board"
let startTest = {};
let board = startTest

export default class Circuits {
  constructor(canvas, smallCanva){
    this.highScore = 0;
    this.ctx = canvas.getContext("2d");
    this.smallctx = smallCanva.getContext("2d")
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.play();
    document.addEventListener("keydown", this.action);
  }

  action(e) {
    // console.log(board.playing)
    if (e.keyCode === 32 && board !== startTest) {
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
    addEventListener("click", ()=> {
      const open = document.getElementById("opening")
      open.style.display = "none"
      board = new Board(this.ctx, this.smallctx)
      board.clearGrid()
      console.log(!board.timesUp)
      board.drawPlacedPieces()
      board.drawCurrentPiece()
      board.resetTimer()
    })


    
  }


  reset(){
    while (!board.timesUp){
      if (board.placePiece) board.reset()
    }
  }

}