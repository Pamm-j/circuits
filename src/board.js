import Piece from "./piece"
import Util from "./util"
import Types from "./types"
import LinkedList from "./linkedlist"
import Node from "./node"
import Timer from "./timer"

export default class Board {
  constructor (ctx, smallctx) {
    this.maxTime = 15000
    this.grid = this.buildGrid();
    this.score = 0;
    this.ctx = ctx;
    this.smallctx = smallctx;
    this.lists = [];
    this.currentPiece = new Piece();
    this.currentPiece = new Piece(this.nextPiece)
    this.nextPiece = this.currentPiece.getRandomShape()
    this.pause = false;
    this.playing = false;
    this.gameOver = this.gameOver.bind(this)
    this.timesUp = false;
    this.highScore;
  }

  changePiece(){
    const toBeDrawn = this.nextPiece 
    this.nextPiece = this.currentPiece.getRandomShape()
    this.currentPiece = new Piece(toBeDrawn)
  }

  drawNextPiece(){
    let piece = new Piece(this.nextPiece)
    let ctx = this.smallctx
    let gridX, gridY;
    if (typeof piece === "object")
    ctx.clearRect(0, 0, 300, 300)
    let length = piece.pieceShapeArray.flat().length
    piece.pieceShapeArray.forEach((row, x)=>{
      row.forEach((cell, y)=>{  
        if (cell.type !== 'empty') {
          if (length < 3) {
            gridX = (x + 3 )
            gridY = (y + 1.5 )
          } else if (length > 7) {
            gridX = (x + 2 )
            gridY = (y + .25 )
          } else {
            gridX = (x + 2.25 )
            gridY = (y + .75 )
          }
          this.drawCell(cell.type, cell.rotation, gridX, gridY, "current", ctx)
        }
      })
    })
  }
  gameOver(){
    this.timesUp = true;
    this.playing = false;
    this.smallctx.clearRect(0, 0, 300, 300)
    let localHighScore = localStorage.getItem("highScore") 
    let highScore = Math.max(this.score, this.highScore, localHighScore)
    localStorage.setItem("highScore", highScore)
    if (highScore > this.highScore) {
      this.coverScreen(this.ctx, "New High Score!", "click to restart", {top:4.7, btm:5})
      this.highScore = highScore
    } else {
      this.coverScreen(this.ctx, "Game Over", "click to restart", {top:5.8, btm:5})
    }
    document.querySelector("#high-score").innerHTML = this.highScore

    this.lists = [];
    this.grid = this.buildGrid()
    this.changePiece()
    this.changePiece()
    const canvas = document.getElementById('work-bench');
    canvas.addEventListener("click", ()=> {
      this.score = 0
      document.querySelector("#score").innerHTML = this.score
      this.changePiece()
      this.reset()
      this.clearGrid()
      this.playing = true;
      this.timesUp = false;
    }, {once:true}) 
  } 
  
  resetTimer(){
    this.drawTimerBox(this.ctx)
    if (this.timer) this.timer.stop()
    let time = this.maxTime - this.score*2
    this.timer = new Timer(time, this.gameOver)
    this.timer.start(this.ctx)
  }

  drawTimerBox(ctx) {
    ctx.fillStyle = "#9E714E";
    ctx.fillRect(Util.SIZE*Util.ROW, 0, Util.SIZE, Util.SIZE*Util.COL);
    ctx.fillStyle = "#4F190D";
    ctx.fillRect(Util.SIZE*Util.ROW+5, 5, Util.SIZE - 10, Util.SIZE*Util.COL - 10);
  }

  togglePause(ctx){
    if (!this.pause) {
      this.timer.pause()
      this.coverScreen(ctx,'click spacebar', 'to unpause', {top:5.2, btm:6})
    } else {
      this.clearGrid()
      this.drawPlacedPieces()
      this.drawCurrentPiece()
      this.timer.unpause(ctx)
    }
    
    this.pause = !this.pause
    return this.pause
  }

  coverScreen(ctx, msg1, msg2, spaceing){
    ctx.fillStyle = "#242c1e"; //pause color 
    ctx.fillRect(0,0, Util.SIZE*Util.ROW, Util.SIZE*Util.COL) 
    ctx.fillStyle ="orange"
    ctx.font = `${Util.SIZE}px Allerta Stencil`;
    ctx.fillText(msg1, Util.SIZE*spaceing.top, Util.SIZE*3)
    ctx.fillText(msg2, Util.SIZE*spaceing.btm, Util.SIZE*5)
  }
  

  checkFullCircuit(){
    for(let i = 0; i < this.lists.length; i++) {
      let list = this.lists[i]
      if (this.checkNodes(list.head, list.tail) && list.size > 3){
        this.score += list.size*10
        document.querySelector("#score").innerHTML = this.score
        this.playing = false;
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

  animatedDeletion(list){
    let n = 0
    let delay = 30
    let count = 0
    let size = list.size
    list.each((pos)=>{
      count ++
      let x, y;
      [x,y] = pos
      n++
      this.grid[x][y] = 0
      if(count === size) setTimeout(()=>this.playing = true, n*delay)
      setTimeout(()=>this.clearCell(x,y), n*delay)
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

  reset(){
    this.clearCurrentPiece()
    this.drawPlacedPieces()
    this.checkFullCircuit()
    this.changePiece()
    this.drawNextPiece()
    this.drawCurrentPiece()
    this.resetTimer()
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
      this.reset()
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
  drawGridSquare(x,y){
    this.ctx.fillStyle=`rgba(78,53,36,.5)`;
    this.ctx.lineJoin = 'bevel';
    this.ctx.lineWidth = Util.SIZE/25;
    this.ctx.fillRect(x*Util.SIZE + Util.SIZE/25, y*Util.SIZE + Util.SIZE/25, Util.SIZE - Util.SIZE/10, Util.SIZE - Util.SIZE/10);
  }
  
  drawCell(type, rotation, x, y, status, ctx){
    if (!ctx) ctx = this.ctx
    if (type === "corner") {
      switch (rotation) {
        case 0:
          Types.NE(x, y, ctx, status);
          break;
        case 3:
          Types.SE(x, y, ctx, status);
          break;
        case 2:
          Types.SW(x, y, ctx, status);
          break;
        case 1:
          Types.NW(x, y, ctx, status);
          break;
      }
    } else if (type === "bar") {
      switch (rotation%2) {
        case 0:
          Types.UP(x, y, ctx, status);
          break;
        case 1:
          Types.SIDE(x, y, ctx, status);
          break;
      }
    }
  }
  clearGrid(){
    this.grid.forEach((row, x)=>{
      row.forEach((_, y)=>{
        this.clearCell(x,y)
      })
    })
  }
              
  clearCell(x, y) {
    this.ctx.clearRect(x * Util.SIZE, y * Util.SIZE, Util.SIZE, Util.SIZE)
    this.drawGridSquare(x,y)
    this.currentPiece.pieceShapeArray.forEach((row, i)=>{
      row.forEach((cell, j)=>{
        if (cell !== 0) {
          const gridX = (this.currentPiece.x + i )
          const gridY = (this.currentPiece.y + j )
          if(gridX === x && gridY === y)
          this.drawCell(cell.type, cell.rotation, gridX, gridY, "current")
        }
      })
    })
  }

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