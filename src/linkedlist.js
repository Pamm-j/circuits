import Node from "./node";
export default class LinkedList {
  constructor () {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  
  insertLast(pos, type, rotation) {
    let newNode = new Node(pos, type, rotation, this.head);
    if (!this.head) {
      this.head = newNode
      this.tail = this.head
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.size++;
  }

  push(newNode) {
    if (!this.head) {
      this.head = newNode
      this.tail = this.head
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.size++;
  }

  unshift(newNode) {
    if(!this.head) {
       this.head = newNode;
       this.tail = newNode;
     } else {
       newNode.next = this.head;
       this.head = newNode;
     }
     this.size++;
   }
  
  insertFirst(pos, type, rotation) {
    let newNode = new Node(pos, type, rotation);
    
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
  }


  delete(){
    this.head = null
    this.size = 0
  }
  printList(){
    let current = this.head;
    let count = 0;
    while (count < this.size) {
      console.log([current.pos[0], current.pos[1], current.name])
      // console.log(current)
      current = current.next
      count++;
    }
  }

  
  slowEach(callback){
    let current = this.head;
    let count = 0;
    while (count < this.size) {
      let x, y;
      [x,y] = current.pos
      console.log(callback)
      setTimeout(()=>callback(x, y), 1000)
      current = current.next
      count++;
    }
  }


  each(callback){
    let current = this.head;
    let count = 0;
    while (count < this.size) {
      callback(current.pos)
      // console.log(current)
      current = current.next
      count++;
    }
  }

  combineLists(list){
    let last = this.tail
    last.next = list.head
    this.tail = list.tail
    // console.log(last)
    // console.log(list.head)
    this.size += list.size
    list.delete()
  }

  reverse() {
    let current = this.head;
    this.head = this.tail;
    this.tail = current
    let prev;
    let next;

    // for (var i = 0; i < this.length; i++){
    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }
}