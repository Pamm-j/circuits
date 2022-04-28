import Piece from "./piece"
import Util from "./util"
import Types from "./types"
import LinkedList from "./linkedlist"
import Node from "./node"

export default class Board {
  constructor (ctx) {
    
    this.grid = this.buildGrid();
    this.score = 0;
    this.ctx = ctx;
    this.lists = [];
    this.currentPiece = new Piece();


    // this.currentPiece.moveRight()
    // this.currentPiece.moveRight()
    // this.currentPiece.moveRight()
    // this.currentPiece.moveRight()
    // this.placePiece()
    // this.currentPiece = new Piece();
    // this.currentPiece.moveRight()
    // this.currentPiece.rotatePiece()
    // this.placePiece()
    // this.currentPiece.moveRight()
    // this.currentPiece.moveDown()
    // this.currentPiece.moveDown()
    // this.currentPiece.moveDown()
    // this.currentPiece.rotatePiece()
    // this.currentPiece.rotatePiece()
    // this.placePiece()
    // this.currentPiece.moveRight()
    // this.currentPiece.moveRight()
    // this.currentPiece.moveRight()
    // this.currentPiece.moveRight()
    // this.currentPiece.rotatePiece()
    // this.currentPiece.rotatePiece()
    // this.currentPiece.rotatePiece()
    // this.currentPiece.moveDown()
    // this.currentPiece.moveDown()
    // this.currentPiece.moveDown()
    // this.placePiece()
    // this.animatedDeletion(this.lists[0])
    
    // this.placePiece()
    // this.currentPiece.rotatePiece()
    // this.currentPiece.rotatePiece()
    // this.currentPiece.rotatePiece()
    // this.currentPiece.moveDown()
    // this.currentPiece.moveDown()
    // this.currentPiece.moveDown()
    // this.placePiece()
    // console.log(this.lists[0].head )
    // console.log(this.lists[0].tail)
    this.drawCurrentPiece()
    // this.lists.forEach((list) =>{
      //   console.log("next list")
      //   list.printlist()
      // })
      
      
      // let n = new Node([3,2], "corner", 0)
      // let l = this.createList(n)
      // this.drawCurrentPiece();
      // this.node = new Node([3,1], "bar", 2)
      // console.log(this.node)
      // this.countEligbleNeighbors(this.node)
      // console.log(this.lists)
      // this.moveIn(this.node)
  }

  checkFullCircuit(){
    for(let i = 0; i < this.lists.length; i++) {
      let list = this.lists[i]
      // console.log(list)
      if (this.checkNodes(list.head, list.tail)){
        this.score += list.size*10
        const scoreDisplay = document.querySelector("#score")
        scoreDisplay.innerHTML = this.score
        this.animatedDeletion(list)
        list.delete()
        this.lists = this.lists.filter((list)=> list.head)
      }
    }
  }

  animatedDeletion(list){
    //console.log(list)

    let n = 0
    list.each((pos)=>{
      let x, y;
      [x,y] = pos
      n++
      this.grid[x][y] = 0
      setTimeout(()=>this.clearCell(x,y), n*50)
    })
    // list.slowEach((x,y)=>{
    //   this.clearCell(x,y)
    // })




    // list.slowEach((x,y)=>{
    //   console.log(x)
    //   // let x, y;
    //   // [x,y] = pos
    //   console.log(this.clearCell)
    //   setTimeout(this.clearCell(x, y), 400)
      // this.clearCell(x, y)
    // })
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
    // this.lists[0].printList()
    
    // console.log(["number of lists in this.list:",this.lists.length])
    // console.log(this.lists)
  }
  manyMoves(node, resultArray){
    this.singleMove(node, resultArray[0])
    let list1 = resultArray[0][0]
    let list2 = resultArray[1][0]
    console.log(list1, list2);

    if (resultArray[0][1] === resultArray[1][1] && resultArray[0][1] === "tail"){
      list1.reverse()
    } else if (resultArray[0][1] === resultArray[1][1] && resultArray[0][1] === "head"){
      list2.reverse()
    }
    // debugger
    list2.combineLists(list1)
    this.lists = this.lists.filter((list)=> list.head)

  }

  singleMove(node, result) {
    let checker = result[1]
    let list = result[0]
    switch (checker) {
      case "head":
        // console.log("making a head")
        list.unshift(node)
        break;
      case "tail":
        // console.log("making a tail")
        list.push(node)
        break;
      case undefined: 

        // console.log("making my own list")
        let l = this.createList()
        l.push(node)
        break;
    }
  }


  
              
              
              
  placePiece(){
    if (this.validPos()) {
      // console.log("Im beginning to place this piece, it's an ugly one, so listen up! I will only say this once!")
      // let l = this.createList()
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
      this.drawCurrentPiece()
      // console.table(this.grid)
      // console.log(this.lists)
      
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
          const gridX = (this.currentPiece.x + x )
          const gridY = (this.currentPiece.y + y )
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
  createList(node) {
    let list = new LinkedList()
    list.push(node)
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
  checkEquality(thing1, thing2) {
    return JSON.stringify(thing1) === JSON.stringify(thing2);
  }
  checkHead(list, node){
    return (this.checkEquality(node.link1, list.head.pos) && (this.checkEquality(list.head.link1, node.pos)
    || this.checkEquality(list.head.link2, node.pos))
    || (this.checkEquality(node.link2, list.head.pos) && (this.checkEquality(list.head.link1, node.pos)
    || this.checkEquality(list.head.link2, node.pos)))) 
  }

  checkTail(list, node) {
    if ((this.checkEquality(node.link1, list.tail.pos) && (this.checkEquality(list.tail.link1, node.pos) || this.checkEquality(list.tail.link2, node.pos))) ||
    (this.checkEquality(node.link2, list.tail.pos) && (this.checkEquality(list.tail.link1, node.pos) || this.checkEquality(list.tail.link2,  node.pos))) === true) {
      return true;
    } else {
      return false
    }
  }
  checkNodes(H, T) {
    if (((this.checkEquality(T.link1, H.pos) && (this.checkEquality(H.link1, T.pos) || this.checkEquality(H.link2, T.pos))) ||
        (this.checkEquality(T.link2, H.pos) && (this.checkEquality(H.link1, T.pos) || this.checkEquality(H.link2,  T.pos)))) === true) {
      return true;
    } else {
      return false
    }
  }

}
      