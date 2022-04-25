export default class Cell {
  constructor(type, rotation){
    this.type = type,
    this.rotation = rotation
  }
  rotateCell() {
    if (this.rotation !== null) {
      // console.log("in cell rotation")
      this.rotation = (this.rotation + 1) % 4;
    }
  }
}