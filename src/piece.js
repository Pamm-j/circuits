import * as Util from "./util"
// import * as Types from "./types"
const PIECES = {
  corner: [
          [0, 0, 0],
          [0, 1, 0],
          [0, 0, 0]
        ]
}

export default class Piece {
  constructor (ctx) {
    this.x = 2
    this.y = 2 
    this.type = "C"
    this.rotation = 1
    this.ctx = ctx
  }

  rotate(ctx) {
    this.clearCell(ctx)
    this.rotation++ 
    if (this.type === "C") {
      if (this.rotation > 4) {
        this.rotation = this.rotation % 4
      }
    } else {
      this.rotation = this.rotation % 2
    }
  }

  moveUp(ctx) {
    if (this.validYPos(this.y - 1)) {
    this.y -= 1;
    }
  }

  moveDown(ctx) {
    if (this.validYPos(this.y + 1)) {
    this.y += 1;
    }
  }

  moveLeft(ctx) {
    if (this.validXPos(this.x - 1)) {
      this.x -= 1;
    }
  }

  moveRight(ctx) {
    if (this.validXPos(this.x + 1)) {
      this.x += 1;
    }
  }

  clearCell(ctx) {
    ctx.clearRect(this.x * Util.SIZE, this.y * Util.SIZE, Util.SIZE, Util.SIZE)
  }

  validXPos(n) {
    return n < Util.ROW && n >= 0;
  }

  validYPos(n) {
    return n < Util.COL && n >= 0;
 }
}