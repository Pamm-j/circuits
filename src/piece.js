import * as Util from "./util"
import * as Shapes from "./shapes"
import Cell from "./cell"
import { lShape, shortCorner, shortLine, shortZee, tallCorner, tallLine, tallZee, uShape } from "./Shapes"
// import * as Types from "./types"


export default class Piece {
  constructor () {
    this.x = 2
    this.y = 2 
    this.pieceShapeArray = this.buildpieceShapeArray()
  }

  getRandomShape() {
    let shapes = Object.keys(Shapes)
    return shapes[Math.floor(Math.random()*shapes.length)];
  }

  buildpieceShapeArray(){
    // let pieceShapeArray = JSON.parse(JSON.stringify(Shapes[this.getRandomShape()]))
    let pieceShapeArray = JSON.parse(JSON.stringify(Shapes['tallLine']))
    pieceShapeArray.forEach((row, i)=> {
      row.forEach((cell, j)=> {
        switch (cell) {
          case 0:
            pieceShapeArray[i][j] = new Cell(null, null)
            // console.log(pieceShapeArray[i][j])
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
            pieceShapeArray[i][j] = new Cell("corner", 4)
            break;
          case 5: 
            pieceShapeArray[i][j] = new Cell("bar", 0)
            // console.log(pieceShapeArray[i][j])
            break;
          case 6: 
            pieceShapeArray[i][j] = new Cell("bar", 1)
            break;
        }     
      })
    })
    // console.log(pieceShapeArray)
    return pieceShapeArray;
  }

  
  rotatePiece() {
    console.log("in piece rotation")
    this.pieceShapeArray.forEach((row)=> {
      row.forEach((cell)=> {
        cell.rotateCell()
      })
    })
    this.pieceShapeArray = transpose(this.pieceShapeArray)
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



function transpose(arr) {
  const transposedArr = [];

  for (var col = 0; col < arr[0].length; col++) {
    const transposedRow = [];
    for (var row = 0; row < arr.length; row++) {
      transposedRow.push(arr[row][col]);
    }
    transposedArr.push(transposedRow);
  }
  return transposedArr;
}