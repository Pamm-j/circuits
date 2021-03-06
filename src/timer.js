import Util from "./util";

export default class Timer {
  constructor(time, gameover) {
    this.time = time
    this.maxTime = time
    this.gameover = gameover
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
        this.gameover()
      }
      this.time -= (10)
    }, 10 )
  }

  stop(){
    clearInterval(this.interval)
  }

  pause(){
    this.stop()
  } 
  unpause(ctx){
    this.start(ctx)
  }
}