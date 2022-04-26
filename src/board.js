import Piece from "./piece"
import Util from "./util"
import Types from "./types"
import LinkedList from "./linkedlist"

export default class Board {
  constructor (ctx) {
    this.grid = this.buildGrid();
    this.ctx = ctx;
    this.currentPiece = new Piece();
    this.lists = [];
    this.drawCurrentPiece();
    // this.placePiece();
    // this.currentPiece.moveDown();
    // this.currentPiece.moveDown();
    // this.currentPiece.moveDown();
    // this.placePiece()
    // this.drawPlacedPieces()
    // console.table(this.grid)
    // console.log(this.lists)
    // this.consolidateLists()
  }

  validPos(){
    let moveForward = true;
    this.currentPiece.pieceShapeArray.forEach((row, x)=>{
      row.forEach((cell, y)=>{
        const gridX = (this.currentPiece.x + x - 1)
        const gridY = (this.currentPiece.y + y -1 )
        const tempCell = this.grid[gridX][gridY]
        if ( cell.type !== null) {
          if (tempCell !== 0) {
            moveForward = false;
          }
        } 
      })
    })
    return moveForward;
  }

  placePiece(){
    if (this.validPos()) {
      let l = this.createList()
      this.currentPiece.pieceShapeArray.forEach((row, x)=>{
        row.forEach((cell, y)=>{
          const gridX = (this.currentPiece.x + x - 1)
          const gridY = (this.currentPiece.y + y - 1)
          if (cell.type !== null) {
            l.insertFirst([gridX, gridY], cell.type, cell.rotation)
            this.grid[gridX][gridY] = JSON.parse(JSON.stringify(cell))
          }
        })
      })
      // console.table(this.grid)
      // console.log(this.lists)

      this.currentPiece = new Piece ()
      this.drawPlacedPieces()
      this.drawCurrentPiece()
      this.consolidateLists()
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
  ///////////////////////////////////////////////////
  ////////methods relating to the linked list////////
  ///////////////////////////////////////////////////
  createList() {
    let list = new LinkedList()
    this.lists.push(list)
    return list;
  }

  consolidateLists() {
    let weAreDoneHere = false;
    let termini = [];
    this.lists.forEach((list, listIndex)=> {
      termini.push([list.getLastNode(), "tail", listIndex])
      termini.push([list.head, "head", listIndex])
      if (list.size !== 1) {
      }
    })
    termini.forEach((dataArray, i)=>{
      let currTerminiType = dataArray[1]
      let currList = dataArray[0]
      for (let j = i + 1; j < termini.length; j++) {
        let testArray = termini[j]
        let testTerminiType = testArray[1]
        let testList = testArray[0]

        let currpos = JSON.parse(JSON.stringify(currList.pos))
        currpos[1]++;

        if (JSON.stringify(currpos) === JSON.stringify(testList.pos) && !weAreDoneHere ) {
          this.joinLists(testArray, dataArray)
          weAreDoneHere = true;
        }
      }
    })
    console.log(this.lists)
  }

  joinLists(data1, data2){
    //data format is [the node that is touching the neighbor, 'tail' or 'head, index of list in this.lists]
    let index1 = data1[2]
    let index2 = data2[2]
    console.log(data1)
    console.log(this.lists[index2])
    console.log(this.lists[index1])
    // if ( data1[1] === "head" & data2[1] !=="head") {
    //   console.log("data1  is the head")

    // } else if ( data1[1] !== "head" & data2[1] ==="head") {
      // console.log("data2  is the head")
      this.lists[index2].combineLists(this.lists[index1])
      this.lists.splice(index1, 1)

    // }
  }

  buildGrid(){
    const grid = []
    for (let i = 0; i < Util.ROW; i++) {
      grid.push (new Array(Util.COL).fill(0))
    }
    return grid
  }
}
