import Piece from "./piece"
import * as Util from "./util"


export default class Board {
  buildGrid(){
   const grid = []
   for (let i = 0; i < Util.ROW; i++) {
     grid.push (new Array(Util.COL).fill(0))
   }
   return grid
  }
  
  constructor (ctx) {
    this.grid = this.buildGrid()
    this.ctx = ctx;
    this.currentPiece = new Piece(ctx)
    // console.log(this.currentPiece)
    // debugger
    setTimeout(() => this.currentPiece.moveUp(ctx), 1000)
  }

  genPiece() {

  }

  

}