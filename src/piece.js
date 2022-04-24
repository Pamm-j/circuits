import * as Util from "./util"
import * as Pieces from "./pieces"
// import * as Types from "./types"


export default class Piece {
  constructor () {
    this.x = 2
    this.y = 2 
    this.type = "B"
    this.rotation = 0
  }

  rotate() {
    this.rotation++ 
    if (this.type === "C") {
      if (this.rotation > 4) {
        this.rotation = this.rotation % 4
      }
    } else {
      this.rotation = this.rotation % 2
    }
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