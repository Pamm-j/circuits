import * as Util from "./util"

const PIECES = {
  corner: [0,0]
}

export default class Piece {
  constructor (ctx) {
    this.x = 8
    this.xDraw = this.x * Util.BLOCKSIZE
    this.y = 3
    this.yDraw = this.y * Util.BLOCKSIZE
    this.drawPiece(ctx)
  }

  drawPiece(ctx){
    ctx.fillStyle = "orange";
    ctx.fillRect( this.x * Util.BLOCKSIZE, this.y * Util.BLOCKSIZE, Util.BLOCKSIZE, Util.BLOCKSIZE)
    ctx.fillStyle = "black";
    ctx.fillRect( this.x * Util.BLOCKSIZE, this.y * Util.BLOCKSIZE, Util.BLOCKSIZE/2, Util.BLOCKSIZE/2)
    ctx.fillStyle = "orange";
    ctx.fillRect( this.x * Util.BLOCKSIZE, this.y * Util.BLOCKSIZE, Util.BLOCKSIZE/3, Util.BLOCKSIZE/3)
  }

  moveUp(ctx) {
    ctx.clearRect(this.x * Util.BLOCKSIZE, this.y * Util.BLOCKSIZE, Util.BLOCKSIZE, Util.BLOCKSIZE)
    this.y -= 1;
    this.drawPiece(ctx);
    console.log("i moved up")
  }
}