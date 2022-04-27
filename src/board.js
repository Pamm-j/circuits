import Piece from "./piece"
import Util from "./util"
import Types from "./types"
import LinkedList from "./linkedlist"
import Node from "./node"

export default class Board {
  constructor (ctx) {
    this.grid = this.buildGrid();
    this.ctx = ctx;
    this.lists = [];
    this.currentPiece = new Piece();
    this.drawCurrentPiece()
    // let l = this.createList()
    // let n = new Node([3,2], "corner", 0)
    // l.unshift(n)
    // this.drawCurrentPiece();
    // this.node = new Node([3,1], "bar", 2)
    // console.log(this.node)
    // this.lookForEligbleNeighbor(this.node)
    // console.log(this.lists)
    // this.moveIn(this.node)
  }
  
  
  lookForEligbleNeighbor(node){
    let weAreDoneHere = false;
    let result;
    console.log("checking out my neighbors")
    if (this.lists.length === 0) return ['','']
    this.lists.forEach((list, i)=>{
      result = [list, ""]
      if ((this.checkEquality(node.link1, list.head.pos) && (this.checkEquality(list.head.link1, node.pos) || this.checkEquality(list.head.link2, node.pos))) || 
      (this.checkEquality(node.link2, list.head.pos) && (this.checkEquality(list.head.link1, node.pos) || this.checkEquality(list.head.link2, node.pos)))&& !weAreDoneHere ) {
        console.log("this should be the head") ;
        result[1] += "head";
        if (list.size === 1) {
          weAreDoneHere = true;
          return result;
        }
      }
       if ((this.checkEquality(node.link1, list.tail.pos) && (this.checkEquality(list.tail.link1, node.pos) || this.checkEquality(list.tail.link2, node.pos))) ||
      (this.checkEquality(node.link2, list.tail.pos) && (this.checkEquality(list.tail.link1, node.pos) || this.checkEquality(list.tail.link2,  node.pos)))  && !weAreDoneHere ) {
        result[1] += "tail"
        console.log("this should be the tail")
      } 
    })
    return result;
  }

  moveIn(node) {
    // debugger
    let result = this.lookForEligbleNeighbor(node)
    let checker = result[1]
    let list = result[0]
      switch (checker) {
        case "head":
          console.log("making a head")
          list.unshift(node)
          break;
        case "tail":
          console.log("making a tail")
          list.unshift(node)
          break;
        case "headtail":
          console.log("OH SHIT OH SHIT OH SHIT")
          // make node new head
          //reverse list w/ that head
          // make join to the other list
          break;
        case "": 
        console.log(this.lists[this.lists.length])
        console.log("making my own list, bioch")
        let l = this.createList()
        l.push(node)
        
        break;
    }
    console.log(this.lists)
    console.log(["number of lists in this.list:",this.lists.length])
  }

  
  
  placePiece(){
    if (this.validPos()) {
      // let l = this.createList()
      this.currentPiece.pieceShapeArray.forEach((row, x)=>{
        row.forEach((cell, y)=>{
          const gridX = (this.currentPiece.x + x - 1)
          const gridY = (this.currentPiece.y + y - 1)
          if (cell.type !== null) {
            let node = new Node([gridX, gridY], cell.type, cell.rotation)
            this.moveIn(node)
            this.grid[gridX][gridY] = JSON.parse(JSON.stringify(cell))
          }
        })
      })
      this.clearCurrentPiece()
      this.drawPlacedPieces()
      
      // console.table(this.grid)
      // console.log(this.lists)
      
      // this.consolidateLists()
      this.currentPiece = new Piece ()
      this.drawCurrentPiece()
      
    }
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
              
              // consolidateLists() {
                //   console.log("starting to consolodate")
                
                //   // debugger
                //   let defNoMoreMatches = false;
                //   while (!defNoMoreMatches) {
                  //     defNoMoreMatches = true;
                  //     let weAreDoneHere = false;
                  //     this.lists.forEach((list, listDex)=>{
                    //       for (let i = 0; i < this.lists.length; i++) {
                      //         // head to head links or tail to head
                      //         console.log('hodor')
                      //         if ( list.head && this.lists[i].head && list.tail && this.lists[i].tail &&
                      //           (JSON.stringify(list.head.pos) === JSON.stringify(this.lists[i].head.link1) || 
                      //             JSON.stringify(list.head.pos) === JSON.stringify(this.lists[i].head.link2) ||
                      //             JSON.stringify(list.tail.pos) === JSON.stringify(this.lists[i].tail.link1) ||
  //             JSON.stringify(list.tail.pos) === JSON.stringify(this.lists[i].tail.link2)) && 
  //             !weAreDoneHere) {
    //           if (list.head === this.lists[i].head ) {
      //             console.log("DONT BITE YOUR OWN TAIL")
      //           } else {
        //             console.log("head to head, or tail to tail, as it was meant to be")
        //             this.lists[listDex].reverse()
        //             this.joinLists(listDex, i)
        //             weAreDoneHere = true;
        //             defNoMoreMatches = false;
        //           }
        //         } else if ( list.head && this.lists[i].head && list.tail && this.lists[i].tail &&
        //                   (JSON.stringify(list.head.pos) === JSON.stringify(this.lists[i].tail.link1) ||
        //                   JSON.stringify(list.head.pos) === JSON.stringify(this.lists[i].tail.link2)) && 
        //                   !weAreDoneHere) {
          //           if (list.head === this.lists[i].head) {
            //             console.log("DONT BITE YOUR OWN TAIL")
            //           } else {
              //             console.log("head to tail, as god intended")
              //             // console.log(this.lists[listDex])
              //             // console.log(this.lists[i])
  //             this.joinLists(listDex, i)
  //             weAreDoneHere = true;
  //             defNoMoreMatches = false;
  
  //           }
  //         }
  //       }
  //     })
  
  //   }
  //   console.log(["number of lists in this.list:",this.lists.length])
  //   console.log(this.lists)
  //   // this.lists.forEach((list) => list.printlist())
  // }
  
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
  checkEquality(thing1, thing2) {
    if ((JSON.stringify(thing1) === JSON.stringify(thing2)) === true) {
      return true;
    } else {
      return false;
    }
  }
}
