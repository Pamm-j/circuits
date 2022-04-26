import Node from "./node";
export default class LinkedList {
  constructor () {
    this.head = null;
    this.size = 0;
  }
  
  insertFirst(pos, type, rotation) {
    this.head = new Node(pos, type, rotation, this.head);
    this.size++;
  }
  
  insertLast(pos, type, rotation) {
    let node = new Node(pos, type, rotation);
    let current;
    
    if(!this.head) {
      this.head = node;
    } else {
      current = this.head;
      
      while (current.next) current = current.next;
      current.next = node
    }
    this.size++;
  }
  combineLists(list){
    let last = this.getLastNode()
    // console.log("in combine lists")
    // console.log(last)
    // console.log(list.head)
    last.next = list.head
    this.size += list.size
  }

  
  getLastNode() {
    let current = this.head;
    let count = 0;

    while (current) {
      if (count === this.size-1) {
        return current
      }
      count++;
      current = current.next
    }
  }
}
