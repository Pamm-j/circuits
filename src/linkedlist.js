export default class LinkedList {
  constructor (node) {
    this.head = node;
    this.tail = node;
    this.size = 1;
  }

  push(newNode) {
    this.tail.next = newNode
    this.tail = newNode
    this.size++;
  }

  unshift(newNode) {
      newNode.next = this.head;
      this.head = newNode;
      this.size++;
   }

  delete(){
    this.head = 'bananas'
    this.size = 0
  }
  printList(){
    let current = this.head;
    let count = 0;
    while (count < this.size) {
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
      current = current.next
      count++;
    }
  }

  combineLists(list){
    this.tail.next = list.head;
    this.tail = list.tail;
    this.size += list.size;
    list.delete()
  }

  reverse() {
    let current = this.head;
    this.head = this.tail;
    this.tail = current
    let prev;
    let next;

    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
  }
}