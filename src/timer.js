import Util from "./util";

export default class Timer {
  constructor(time) {
    this.time = time
    this.maxTime = time
  }

  drawTimer(ctx){
    ctx.fillStyle = "#9E714E";
    ctx.fillRect(Util.SIZE*Util.ROW, 0, Util.SIZE, Util.SIZE*Util.COL*((this.maxTime-this.time)/this.maxTime));
  }


  start(ctx){
    this.interval = setInterval(()=>{
      this.drawTimer(ctx)
      if (this.time < 0 ) {
        clearInterval(this.interval)
        alert("game over")
      }
      this.time -= (10)
    }, 10 )
  }

  stop(){
    clearInterval(this.interval)
  }

  pause(){
    let timeLeft = this.time
    this.stop()
  }
  unpause(ctx){
    this.start(ctx)
    // let timeLeft = this.time
    // this.stop()
    // console.log(timeLeft)
  }
}