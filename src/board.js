import Piece from "./piece"
import * as Util from "./util"
import * as Types from "./types"

let ctx;
export default class Board {
  buildGrid(){
   const grid = []
   for (let i = 0; i < Util.ROW; i++) {
     grid.push (new Array(Util.COL).fill(0))
   }
   return grid
  }
  
  constructor (ctx) {
    this.grid = this.buildGrid()
    this.ctx = ctx;
    this.currentPiece = new Piece(ctx)
    this.drawCurrentPiece()
    // console.log(this)
  }

  placePiece(ctx) {
    if (this.grid[this.currentPiece.x][this.currentPiece.y] === 0) {
      this.grid[this.currentPiece.x][this.currentPiece.y] = [this.currentPiece.type, this.currentPiece.rotation]

      this.drawPlacedPieces()
    }
    // this.currentPiece = new Piece(ctx)
  }

  drawCurrentPiece() {
    console.log(this.currentPiece)
    this.drawPiece(this.currentPiece.type, this.currentPiece.rotation, this.currentPiece.x, this.currentPiece.y)
  }

  

  drawPlacedPieces() {
    this.grid.forEach((row, x)=>{
      row.forEach((cel, y)=>{
        // console.log("drawing all pieces")
        if (cel !== 0) this.drawPiece(cel[0], cel[1], x, y)
      })
    })
  }
  
  
  drawPiece(type, rotation, x, y){
    // console.log("drawing a piece")
    this.clearCell(x,y)
    const constructors = {
      size: Util.SIZE,
      margin: Util.MARGIN,
      gauge: Util.GAUGE,
      x: x,
      y: y,
      ctx: this.ctx
    }
    console.log(constructors)
    if (type === "C") {
      switch (rotation) {
        case 1:
          Types.NE(constructors);
          break;
        case 2:
          Types.SE(constructors);
          break;
        case 3:
          Types.SW(constructors);
          break;
        case 4:
          Types.NW(constructors);
          break;
      }
    }
    if (type === "B") {
      switch (this.rotation) {
        case 0:
          Types.UP(constructors);
          break;
        case 1:
          Types.SIDE(constructors);
          break;
      }
    }
  }
  clearCell(x, y) {
    this.ctx.clearRect(x * Util.SIZE, y * Util.SIZE, Util.SIZE, Util.SIZE)
  }

}