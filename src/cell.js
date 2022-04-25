export default class Cell {
  constructor(type, rotation){
    this.type = type,
    this.rotation = rotation
  }
  rotateCell() {
    if (this.rotation !== null) {
      // console.log("in cell rotation")
      // if (this.type === "corner") {
        this.rotation = (this.rotation + 1 ) % 4;
      // } else if (this.type === "bar") {
      //   this.rotation = (this.rotation + 1) % 2;
      // }
      
    }
  }
}