import Piece from "./piece"
import Util from "./util"
import Types from "./types"
import LinkedList from "./linkedlist"
import Node from "./node"
import Timer from "./timer"

export default class Board {
  constructor (ctx) {
    this.grid = this.buildGrid();
    this.score = 0;
    this.ctx = ctx;
    this.lists = [];
    this.currentPiece = new Piece();
    this.drawCurrentPiece()
    this.resetTimer()
  }

  resetTimer(){
    this.drawTimerBox(this.ctx)
    if (this.timer) this.timer.stop()
    this.timer = new Timer(5000)
    this.timer.start(this.ctx)
  }

  checkFullCircuit(){
    for(let i = 0; i < this.lists.length; i++) {
      let list = this.lists[i]
      if (this.checkNodes(list.head, list.tail) && list.size > 3){
        this.score += list.size*10
        const scoreDisplay = document.querySelector("#score")
        scoreDisplay.innerHTML = this.score
        this.animatedDeletion(list)
        list.delete()
        this.lists = this.lists.filter((list)=> {
          if (list.head === 'bananas') {
            return false;
          } 
          return true;
        })
      }
    }
  }

  drawTimerBox(ctx) {
    ctx.fillStyle = "#9E714E";
    ctx.fillRect(Util.SIZE*Util.ROW, 0, Util.SIZE, Util.SIZE*Util.COL);
    ctx.fillStyle = "#4F190D";
    ctx.fillRect(Util.SIZE*Util.ROW+5, 5, Util.SIZE - 10, Util.SIZE*Util.COL - 10);
  }

  animatedDeletion(list){
    let n = 0
    list.each((pos)=>{
      let x, y;
      [x,y] = pos
      n++
      this.grid[x][y] = 0
      setTimeout(()=>this.clearCell(x,y), n*50)
    })
  }

  returnEligbleNeighbors(node){
    let toDoList = []
    let count = 0;
    if (this.lists.length === 0) {
      return []
    };

    for (let i = 0; i < this.lists.length; i++) {
      let list = this.lists[i]
      if (this.checkHead(list, node) && !this.checkTail(list, node)) {
        toDoList.push([list, "head"])
        count += 1
      } else if (this.checkTail(list, node) && !this.checkHead(list, node)) {
        toDoList.push([list, "tail"])
        count += 1
      } else if (this.checkHead(list, node)) {
        toDoList.push([list, 'head'])
        count += 1
      } else if (this.checkTail(list, node)) {
        toDoList.push([list, "tail"])
        count += 1
      } 
    }
    return toDoList;
  }

        
  moveIn(node) {
    let neighbors = this.returnEligbleNeighbors(node)

    if (neighbors.length === 0) {
      this.createList(node)
    } else if (neighbors.length === 1) {
      this.singleMove(node, neighbors[0])
    } else {
      this.manyMoves(node, neighbors)
    }
  }
  manyMoves(node, resultArray){
    this.singleMove(node, resultArray[0])
    let list1 = resultArray[0][0]
    let list2 = resultArray[1][0]

    if (resultArray[0][1] === resultArray[1][1] && resultArray[0][1] === "tail"){
      list1.reverse()
      list2.combineLists(list1)
    } else if (resultArray[0][1] === resultArray[1][1] && resultArray[0][1] === "head"){
      list2.reverse()
      list2.combineLists(list1)
    } else if (resultArray[0][1] === 'head') {
      list2.combineLists(list1)
    } else {
      list1.combineLists(list2)
    }
    this.lists = this.lists.filter((list)=> {
      if (list.head === 'bananas') {
        return false;
      } 
      return true;
      })
  }

  singleMove(node, result) {
    let checker = result[1]
    let list = result[0]
    switch (checker) {
      case "head":
        list.unshift(node)
        break;
      case "tail":
        list.push(node)
        break;
      case undefined: 
        this.createList(node)
        break;
    }
  }


  
              
              
              
  placePiece(){
    if (this.validPos()) {
      this.currentPiece.pieceShapeArray.forEach((row, x)=>{
        row.forEach((cell, y)=>{
          const gridX = (this.currentPiece.x + x )
          const gridY = (this.currentPiece.y + y )
          if (cell.type !== "empty") {
            let node = new Node([gridX, gridY], cell.type, cell.rotation)
            
            this.moveIn(node)
            this.grid[gridX][gridY] = JSON.parse(JSON.stringify(cell))
          }
        })
      })
      this.clearCurrentPiece()
      this.drawPlacedPieces()
      this.checkFullCircuit()
      this.currentPiece = new Piece ()
      this.resetTimer()
      this.drawCurrentPiece() 
    }
  }

  indbouds(x,y){
    if ( x < Util.ROW && x > 1 && y < Util.COL && y > 1) {
      return true;
    } else {
      return false;
    }

  }

  validPos(){
    let moveForward = true;
    this.currentPiece.pieceShapeArray.forEach((row, x)=>{
      row.forEach((cell, y)=>{
        const gridX = (this.currentPiece.x + x )
        const gridY = (this.currentPiece.y + y  )
        const tempCell = this.grid[gridX][gridY]
        if ( cell.type !== "empty") {
          if (tempCell !== 0) {
            moveForward = false;
          }
        } 
      })
    })
    return moveForward;
  }
  
  drawCurrentPiece() {
    this.currentPiece.pieceShapeArray.forEach((row, x)=>{
      row.forEach((cell, y)=>{
        if (cell !== 0) {
          const gridX = (this.currentPiece.x + x )
          const gridY = (this.currentPiece.y + y )
          this.drawCell(cell.type, cell.rotation, gridX, gridY, "current")
        }
      })
    })
  }
  
  clearCurrentPiece() {
    this.currentPiece.pieceShapeArray.forEach((row, x)=>{
      row.forEach((cell, y)=>{
        if (cell !== 0) {
          const gridX = (this.currentPiece.x + x )
          const gridY = (this.currentPiece.y + y )
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
    if (type === "corner") {
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
  createList(node) {
    let list = new LinkedList(node)
    this.lists.push(list)
    return list;
  }
  

  buildGrid(){
    const grid = []
    for (let i = 0; i < Util.ROW; i++) {
      grid.push (new Array(Util.COL).fill(0))
    }
    return grid
  }
  checkHead(list, node){
    return (checkEquality(node.link1, list.head.pos) && checkEquality(list.head.link1, node.pos))
    || (checkEquality(node.link2, list.head.pos) && checkEquality(list.head.link2, node.pos))
    || (checkEquality(node.link1, list.head.pos) && checkEquality(list.head.link2, node.pos))
    || (checkEquality(node.link2, list.head.pos) && checkEquality(list.head.link1, node.pos))
  }

  checkTail(list, node) {
    return (checkEquality(node.link1, list.tail.pos) && checkEquality(list.tail.link1, node.pos))
    || (checkEquality(node.link2, list.tail.pos) && checkEquality(list.tail.link2, node.pos))
    || (checkEquality(node.link1, list.tail.pos) && checkEquality(list.tail.link2, node.pos))
    || (checkEquality(node.link2, list.tail.pos) && checkEquality(list.tail.link1, node.pos))
  }
  checkNodes(head, tail) {
    return (checkEquality(head.link1, tail.pos) && checkEquality(tail.link1, head.pos))
    || (checkEquality(head.link2, tail.pos) && checkEquality(tail.link2, head.pos))
    || (checkEquality(head.link1, tail.pos) && checkEquality(tail.link2, head.pos))
    || (checkEquality(head.link2, tail.pos) && checkEquality(tail.link1, head.pos))
  }

}

const checkEquality = (thing1, thing2) => {
  return JSON.stringify(thing1) === JSON.stringify(thing2);
}
      