import Util from "./util"
import Cell from "./cell"
import Shapes from "./shapes"

export default class Piece {
  constructor (name) {
    this.x = 2
    this.y = 2 
    if (!name) name = this.getRandomShape()
    this.pieceShapeArray = this.buildpieceShapeArray(name)
  }


  getRandomShape() {
    let easyShapes = [`shortCorner`,`shortLine`]
    let mediumShapes = [`tallCorner`, `tallLine`,`leftZee`,`rightZee`,`ohm`,`leftEle`, `rightEle`, `uShape`]
    let hardShapes = [ `waitWhat`,`tallZee`,]
    let rando = Math.floor(Math.random()*1000)
    if (rando < 550 ){
      rando = (rando % easyShapes.length)
      return easyShapes[rando]
    } else if ( rando < 950) {
      rando = (rando % mediumShapes.length)
      return mediumShapes[rando]
    } else {
      rando = (rando % hardShapes.length)
      return hardShapes[rando]
    }
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
    let rotated = this.pieceShapeArray[0].map((_, index) => {
      return this.pieceShapeArray.map(row => {
        return row[index]
      }).reverse()
    })


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