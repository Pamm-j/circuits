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
    // this.placePiece()
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
      this.clearCurrentPiece()
      this.drawPlacedPieces()

      console.table(this.grid)
      console.log(this.lists)

      this.consolidateLists()
      this.currentPiece = new Piece ()
      this.drawCurrentPiece()

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
    console.log("starting to consolodate")

    // debugger
    let defNoMoreMatches = false;
    while (!defNoMoreMatches) {
      defNoMoreMatches = true;
      let weAreDoneHere = false;
      this.lists.forEach((list, listDex)=>{
        for (let i = 0; i < this.lists.length; i++) {
          // head to head links or tail to head
          console.log('hodor')
          if ( list.head && this.lists[i].head && list.tail && this.lists[i].tail &&
            (JSON.stringify(list.head.pos) === JSON.stringify(this.lists[i].head.link1) || 
              JSON.stringify(list.head.pos) === JSON.stringify(this.lists[i].head.link2) ||
              JSON.stringify(list.tail.pos) === JSON.stringify(this.lists[i].tail.link1) ||
              JSON.stringify(list.tail.pos) === JSON.stringify(this.lists[i].tail.link2)) && 
              !weAreDoneHere) {
            if (list.head === this.lists[i].head ) {
              console.log("DONT BITE YOUR OWN TAIL")
            } else {
              console.log("head to head, or tail to tail, as it was meant to be")
              this.lists[listDex].reverse()
              this.joinLists(listDex, i)
              weAreDoneHere = true;
              defNoMoreMatches = false;
            }
          } else if ( list.head && this.lists[i].head && list.tail && this.lists[i].tail &&
                    (JSON.stringify(list.head.pos) === JSON.stringify(this.lists[i].tail.link1) ||
                    JSON.stringify(list.head.pos) === JSON.stringify(this.lists[i].tail.link2)) && 
                    !weAreDoneHere) {
            if (list.head === this.lists[i].head) {
              console.log("DONT BITE YOUR OWN TAIL")
            } else {
              console.log("head to tail, as god intended")
              // console.log(this.lists[listDex])
              // console.log(this.lists[i])
              this.joinLists(listDex, i)
              weAreDoneHere = true;
              defNoMoreMatches = false;

            }
          }
        }
      })

    }
    console.log(["number of lists in this.list:",this.lists.length])
    console.log(this.lists)
    // this.lists.forEach((list) => list.printlist())
  }
  
  joinLists(index1, index2){
    console.log("in join lists")
    this.lists[index2].combineLists(this.lists[index1])
    this.lists = this.lists.filter((list)=> list.head)
    console.log(this.lists)

  }
  // consolidateLists() {
  //   let weAreDoneHere = false;
  //   let termini = this.buildTerminiArray()
  //   // termini is an array of objects, which have a 'terminiType', a 'node', and and 'listIndex' which refers to this.lists
    

  //   termini

  //   console.log(this.lists)
  // }
  // buildTerminiArray(){
  //   let termini = [];
  //   this.lists.forEach((list, listIndex)=> {
  //     termini.push({node: list.getLastNode(), terminiType: "tail", listIndex: listIndex})
  //     termini.push({node: list.head, terminiType: "head", listIndex: listIndex})
  //   })
  //   return termini
  // }

  buildGrid(){
    const grid = []
    for (let i = 0; i < Util.ROW; i++) {
      grid.push (new Array(Util.COL).fill(0))
    }
    return grid
  }
}
