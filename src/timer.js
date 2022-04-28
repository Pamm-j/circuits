import { setIn } from "immutable";
import Util from "./util";

export default class Timer {
  constructor(time) {
    this.time = time
    this.interval;
    this.velocity = 0;
    // this.dimensions = dimensions;
    this.x = Util.SIZE*Util.ROW
    this.y = 0
  }

  drawTimer(ctx){
    ctx.fillStyle = "#9E714E";
    ctx.fillRect(Util.SIZE*Util.ROW, 0, Util.SIZE, Util.SIZE*Util.COL*((5000-this.time)/5000));
  }

  move() {
    this.y += Util.gravity;
  }

  animateTimer(ctx){
    this.move();
    this.drawTimer(ctx)
  }

  start(ctx){
    this.interval = setInterval(()=>{
      this.drawTimer(ctx)
      console.log(this.time)
      if (this.time === -500) {
        clearInterval(this.interval)
        alert("game over")
      }
      this.time -= 500
    }, 500)
  }

  stop(){
    clearInterval(this.interval)
  }
}