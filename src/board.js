import Piece from "./piece"
import Util from "./util"
import Types from "./types"
import Shapes from "./shapes"

export default class Board {
  constructor (ctx) {
    this.grid = this.buildGrid()
    this.ctx = ctx;
    this.currentPiece = new Piece()
    this.currentPiece.rotatePiece()
    this.placePiece()
    console.table(this.grid)
    this.drawPlacedPieces()
    // this.drawCurrentPiece()
  }

  validPos(){
    let moveForward = true;
    this.currentPiece.pieceShapeArray.forEach((row, x)=>{
      row.forEach((cell, y)=>{
        const gridX = (this.currentPiece.x + x - 1)
        const gridY = (this.currentPiece.y + y - 1)
        const tempCell = this.grid[gridX][gridY]
        if ( tempCell !== 0 ) {//&& tempCell.type !== null
          moveForward = false;
        } 
      })
    })
    return moveForward;
  }

  placePiece(){
    if (this.validPos()) {
      this.currentPiece.pieceShapeArray.forEach((row, x)=>{
        row.forEach((cell, y)=>{
          const gridX = (this.currentPiece.x + x - 1)
          const gridY = (this.currentPiece.y + y - 1)
          if (cell.type !== null) {
            this.grid[gridX][gridY] = cell
          }
        })
      })
    }
  }

 
  // drawCurrentPiece() {
  //   this.drawPiece(this.currentPiece.type, this.currentPiece.rotation, this.currentPiece.x, this.currentPiece.y)
  // }
  
  

  drawPlacedPieces() {
    this.drawCell()
    this.grid.forEach((row, x)=>{
      row.forEach((cell, y)=>{
        if (cell !== 0) {
          const gridX = (this.currentPiece.x + x - 1)
          const gridY = (this.currentPiece.y + y - 1)
          console.log([gridX,gridY])
          this.drawCell(cell.type, cell.rotation, gridX, gridY)
        }
      })
    })
  }

  drawPiece() {
    // console.log(this.currentPiece)
    // shapeArray.forEach((row, x) => {
    //   row.forEach((cell, y)=> {
    //     // console.log(cell)
    //     // console.log([x-1,y-1])
    //     constructors.x= (this.currentPiece.x + x - 1)
    //     constructors.y= (this.currentPiece.y + y - 1)
    //     if (cell!== 0) {
    //       this.drawCell(this.currentPiece.type, this.currentPiece.rotation, constructors)
    //     }
    //   })
    // })

  }
  
  
  drawCell(type, rotation, x, y){
    this.clearCell(x, y)
    if (type === "corner") {
      switch (rotation) {
        case 1:
          Types.NE(x, y, this.ctx);
          break;
        case 2:
          Types.SE(x, y, this.ctx);
          break;
        case 3:
          Types.SW(x, y, this.ctx);
          break;
        case 4:
          Types.NW(x, y, this.ctx);
          break;
      }
    } else if (type === "bar") {
      switch (rotation) {
        case 0:
          console.log("i made it")
          Types.UP(x, y, this.ctx);
          break;
        case 1:
          Types.SIDE(x, y, this.ctx);
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
