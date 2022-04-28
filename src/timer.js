import Util from "./util";

export default class Timer {
  constructor(time, decrement) {
    this.time = time
    this.maxTime = time
    this.decrement = decrement
    this.timeUp = false
  }

  drawTimer(ctx){
    ctx.fillStyle = "#9E714E";
    ctx.fillRect(Util.SIZE*Util.ROW, 0, Util.SIZE, Util.SIZE*Util.COL*((this.maxTime-this.time)/this.maxTime));
  }


  start(ctx){
    this.interval = setInterval(()=>{
      this.drawTimer(ctx)
      if (this.time === -10) {
        clearInterval(this.interval)
        this.timeUp = true;
        alert("game over")
      }
      this.time -= (10 + this.decrement)
    }, 10 )
    console.log(10 - this.decrement)
  }

  stop(){
    clearInterval(this.interval)
  }
}