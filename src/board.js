import Piece from "./piece"
import Util from "./util"
import Types from "./types"
import Shapes from "./shapes"

export default class Board {
  constructor (ctx) {
    this.grid = this.buildGrid()
    this.ctx = ctx;
    this.currentPiece = new Piece()
    // this.currentPiece.rotatePiece()
    // this.placePiece()
    
    // this.drawPlacedPieces()
    this.drawCurrentPiece()
  }

  validPos(){
    let moveForward = true;
    this.currentPiece.pieceShapeArray.forEach((row, x)=>{
      row.forEach((cell, y)=>{
        const gridX = (this.currentPiece.x + x - 1)
        const gridY = (this.currentPiece.y + y -1 )
        const tempCell = this.grid[gridX][gridY]
        // console.log(cell)
        // console.log(tempCell)
        if ( cell.type !== null) {
          if (tempCell !== 0) {
            // console.log(tempCell)
            // console.log(moveForward)
            moveForward = false;
          }
        } 
      })
    })
    return moveForward;
  }

  placePiece(){
    if (this.validPos()) {
      // console.log("in placing pice")
      this.currentPiece.pieceShapeArray.forEach((row, x)=>{
        row.forEach((cell, y)=>{
          const gridX = (this.currentPiece.x + x - 1)
          const gridY = (this.currentPiece.y + y - 1)

          // console.log(this.grid[gridX][gridY])
          if (cell.type !== null) {
            this.grid[gridX][gridY] = JSON.parse(JSON.stringify(cell))
          }
        })
      })
      console.table(this.grid)
      this.currentPiece = new Piece ()
    }
  }

 
  drawCurrentPiece() {
    this.currentPiece.pieceShapeArray.forEach((row, x)=>{
      row.forEach((cell, y)=>{
        if (cell !== 0) {
          const gridX = (this.currentPiece.x + x - 1)
          const gridY = (this.currentPiece.y + y - 1)
          // console.log([gridX,gridY])
          this.drawCell(cell.type, cell.rotation, gridX, gridY, "current")
        }
      })
    })
  }
  clearCurrentPiece() {
    this.currentPiece.pieceShapeArray.forEach((row, x)=>{
      row.forEach((cell, y)=>{
        if (cell !== 0) {
          const gridX = (this.currentPiece.x + x - 1)
          const gridY = (this.currentPiece.y + y - 1)
          // console.log([gridX,gridY])
          this.clearCell( gridX, gridY)
        }
      })
    })
  }
  
  

  drawPlacedPieces() {
    this.grid.forEach((row, x)=>{
      row.forEach((cell, y)=>{
        if (cell !== 0) {
          this.drawCell(cell.type, cell.rotation, x, y, "other")
        }
      })
    })
  }

  
  drawCell(type, rotation, x, y, status){
    // this.clearCell(x, y)
    if (type === "corner") {
      // console.log(rotation)
      switch (rotation) {
        case 0:
          Types.NE(x, y, this.ctx, status);
          break;
        case 3:
          Types.SE(x, y, this.ctx, status);
          break;
        case 2:
          Types.SW(x, y, this.ctx, status);
          break;
        case 1:
          Types.NW(x, y, this.ctx, status);
          break;
      }
    } else if (type === "bar") {
      switch (rotation%2) {
        case 0:
          Types.UP(x, y, this.ctx, status);
          break;
        case 1:
          Types.SIDE(x, y, this.ctx, status);
          break;
      }
    }
  }

  clearCell(x, y) {
    this.ctx.clearRect(x * Util.SIZE, y * Util.SIZE, Util.SIZE, Util.SIZE)
  }
    
  buildGrid(){
    const grid = []
    for (let i = 0; i < Util.ROW; i++) {
      grid.push (new Array(Util.COL).fill(0))
    }
    return grid
  }
}
