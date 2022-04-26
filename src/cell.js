export default class Cell {
  constructor(type, rotation){
    this.type = type,
    this.rotation = rotation
  }
  rotateCell() {
    if (this.rotation !== null) {
      this.rotation = (this.rotation + 1 ) % 4;
    }
  }
}