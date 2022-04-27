export default class Node {
  constructor (pos, type, rotation, next) {
    this.pos = pos;
    this.next = next;
    this.assignLinks(type, rotation, pos)
  }

  assignLinks(type, rotation, pos){
    let x, y;
    [x, y] = pos
    if (type === "corner") {
      switch (rotation) {
        case 0:
          this.name = "NE"
          this.link1 = [x + 1, y]
          this.link2 = [x, y - 1]
          break;
        case 3:
          this.name = "SE"
          this.link1 = [x + 1, y]
          this.link2 = [x, y + 1]
          break;
        case 2:
          this.name = "SW"
          this.link1 = [x - 1, y]
          this.link2 = [x, y + 1]
          break;
        case 1:
          this.name = "NW"
          this.link1 = [x - 1, y]
          this.link2 = [x, y - 1]
          break;
      }
    } else if (type === "bar") {
      switch (rotation%2) {
        case 0:
          this.name = "UP"
          this.link1 = [x, y + 1]
          this.link2 = [x, y - 1]
          break;
        case 1:
          this.name = "SIDE"
          this.link1 = [x + 1, y]
          this.link2 = [x - 1, y]
          break;
      }
    }
  }
}
