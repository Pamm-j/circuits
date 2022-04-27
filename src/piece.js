import Util from "./util"
import Shapes, { lShape, shortCorner, shortLine, tallLine, uShape } from "./shapes"
import Cell from "./cell"
// import * as Types from "./types"


export default class Piece {
  constructor () {
    this.x = 2
    this.y = 2 
    this.pieceShapeArray = this.buildpieceShapeArray()
  }

  getRandomShape() {
    // let shapes = Object.keys(Shapes)
    // let shapes = ["shortCorner", "tallCorner", "shortLine", "tallLine", "lShape", "uShape"]
    let shapes = [ "shortCorner"]
    return shapes[Math.floor(Math.random()*shapes.length)];
  }

  buildpieceShapeArray(){
    let name = this.getRandomShape()
    // console.log(name)
    let pieceShapeArray = JSON.parse(JSON.stringify(Shapes[name]))
    // let pieceShapeArray = JSON.parse(JSON.stringify(Shapes['uShape']))
    pieceShapeArray.forEach((row, i)=> {
      row.forEach((cell, j)=> {
        switch (cell) {
          case 0:
            pieceShapeArray[i][j] = new Cell(null, null)
            break;
          case 1:
            pieceShapeArray[i][j] = new Cell("corner", 0)
            break;
          case 2:
            pieceShapeArray[i][j] = new Cell("corner", 1)
            break;
          case 3: 
            pieceShapeArray[i][j] = new Cell("corner", 2)
            break;
          case 4:
            pieceShapeArray[i][j] = new Cell("corner", 3)
            break;
          case 5: 
            pieceShapeArray[i][j] = new Cell("bar", 0)
            break;
          case 6: 
            pieceShapeArray[i][j] = new Cell("bar", 1)
            break;
        }     
      })
    })
    return pieceShapeArray;
  }

  
  rotatePiece() {
    // console.log(this.pieceShapeArray)
    this.pieceShapeArray.forEach((row)=> {
      row.forEach((cell)=> {
        cell.rotateCell()
      })
    })
    let rotated = this.pieceShapeArray[0].map((val, index) => this.pieceShapeArray.map(row => row[index]).reverse())
    this.pieceShapeArray = rotated
  }

  moveUp() {
    if (this.validYPos(this.y - 1)) {
    this.y -= 1;
    }
  }

  moveDown() {
    if (this.validYPos(this.y + 1)) {
    this.y += 1;
    }
  }

  moveLeft() {
    if (this.validXPos(this.x - 1)) {
      this.x -= 1;
    }
  }

  moveRight() {
    if (this.validXPos(this.x + 1)) {
      this.x += 1;
    }
  }

  validXPos(n) {
    return n < Util.ROW - 1 && n > 0;
  }

  validYPos(n) {
    return n < Util.COL - 1 && n > 0;
 }
}