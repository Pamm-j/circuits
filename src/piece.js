import Util from "./util"
import Cell from "./cell"
import Shapes from "./shapes"
// import * as Types from "./types"


export default class Piece {
  constructor () {
    this.x = 2
    this.y = 2 
    if (!this.currentShape) this.currentShape = this.generateRandomShapeName()
    this.pieceShapeArray = this.buildpieceShapeArray(this.currentShape)
  }

  getRandomShape(){
    
    const nextShape = this.currentShape
    this.currentShape = this.generateRandomShapeName()
    const nextPiece = document.querySelector("#next-piece")
    nextPiece.innerHTML = this.currentShape
    return nextShape
  }

  generateRandomShapeName() {
    // let shapes = Object.keys(Shapes)
    let shapes = ["shortCorner", "shortCorner", "shortCorner", "shortCorner", "shortCorner", "shortCorner", "shortCorner", "shortCorner", "shortCorner", "shortCorner", 
    "shortCorner", "shortCorner", "shortCorner", "shortCorner", "shortCorner", "shortCorner", "shortCorner", "shortCorner", "shortCorner", "shortCorner", 
    "tallCorner", "tallCorner","tallCorner","tallCorner","tallCorner","tallCorner","tallCorner","tallCorner","tallCorner","tallCorner","tallCorner","tallCorner","tallCorner",
    "shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine",
    "shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine","shortLine",
    "tallLine","tallLine","tallLine","tallLine","tallLine","tallLine","tallLine","tallLine","tallLine","tallLine","tallLine","tallLine","tallLine","tallLine","tallLine", 
    "lShape","lShape","lShape","lShape","lShape","lShape","lShape","lShape","lShape","lShape","lShape","lShape","lShape","lShape","lShape","lShape",
    "uShape",  "uShape", "uShape",  "uShape",  "uShape",  "uShape", "uShape",  "uShape",  "uShape", 
    "shortZee", "shortZee", "shortZee", "shortZee", "shortZee", "shortZee", "shortZee", "shortZee", "shortZee",
    "tallZee", "tallZee", "tallZee", "tallZee"]
    // let shapes = [ "lShape"]
    return shapes[Math.floor(Math.random()*shapes.length)];
  }

  buildpieceShapeArray(name){
    let pieceShapeArray = JSON.parse(JSON.stringify(Shapes[name]))
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
    let rotated = this.pieceShapeArray[0].map((val, index) => this.pieceShapeArray.map(row => row[index]).reverse())
    let newHeight = rotated[0].length
    let newLength = rotated.length
    if (this.validXPos(newLength + this.x - 1 ) && this.validYPos(newHeight + this.y -1 )){
      this.pieceShapeArray = rotated
      this.pieceShapeArray.forEach((row)=> {
        row.forEach((cell)=> {
          cell.rotateCell()
        })
      })
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
      this.x -= 1;
    }
  }

  moveRight() {
    if (this.checkHorizontalArray(this.x)){
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
    return (this.validXPos(leftPos) && this.validXPos(rightPos))
  }

  validXPos(x) {
    return x < Util.ROW && x >= 0;
  }

  validYPos(y) {
    return y < Util.COL && y >= 0;
 }
}