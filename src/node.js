export default class Node {
  constructor (pos, type, rotation, next = "null") {
    this.pos = pos;
    this.type = type;
    this.rotation = rotation;
    this.next = next;
  }
}
