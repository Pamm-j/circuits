import Util from "./util"
import Cell from "./cell"
import Shapes from "./shapes"
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
    let shapes = [ "tallCorner"]
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
            pieceShapeArray[i][j] = new Cell("empty", "empty")
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
    let rotated = this.pieceShapeArray[0].map((val, index) => this.pieceShapeArray.map(row => row[index]).reverse())
    
    let newHeight = rotated[0].length
    let newLength = rotated.length
    console.log(newHeight + this.y)
    console.log(newLength+ this.x)
    this.pieceShapeArray = rotated
    this.pieceShapeArray.forEach((row)=> {
      row.forEach((cell)=> {
        cell.rotateCell()
      })
    })
    if (this.validXPos(newLength + this.x) && this.validYPos(newHeight - this.y)){
    }
    
  }

  moveUp() {
    if (this.checkVertArray(this.y - 1)) {
      this.y -= 1;
    }
    
  }

  moveDown() {
    if (this.checkVertArray(this.y)) {
    this.y += 1;
    }
  }

  moveLeft() {
    if (this.checkHorizontalArray(this.x - 1)){
    // if (this.validXPos(this.x - 1)) {
      this.x -= 1;
    }
  }

  moveRight() {
    if (this.checkHorizontalArray(this.x)){
    // if (this.validXPos(this.x + 1)) 
      this.x += 1;
    }
  }

  checkVertArray(y){
    let height = this.pieceShapeArray[0].length
    let topPos = y
    let bottomPos = y + height
    return (this.validYPos(topPos) && this.validYPos(bottomPos))
  }
  checkHorizontalArray(x){
    let length = this.pieceShapeArray.length
    let leftPos = x
    let rightPos = x + length
    // console.log(length)
    console.log(leftPos)
    console.log(rightPos)
    return (this.validXPos(leftPos) && this.validXPos(rightPos))
  }

  validXPos(x) {
    return x < Util.ROW && x >= 0;
  }

  validYPos(y) {
    return y < Util.COL && y >= 0;
 }
}