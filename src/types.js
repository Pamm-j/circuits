import Util from './util'

const Types = {

  UP: function(x, y, ctx, status){ 
    if (status === "current") {
      ctx.fillStyle = Util.lightColor;
      } else {
        if (status === "current") {
        ctx.fillStyle = Util.lightColor;
      } else {
        ctx.fillStyle = Util.darkColor;
      }
    }
    ctx.fillRect((x*Util.SIZE)+ Util.MARGIN, y*Util.SIZE, Util.GAUGE, Util.SIZE);
  },
  SIDE: function(x, y, ctx, status){ 
        if (status === "current") {
      ctx.fillStyle = Util.lightColor;
    } else {
      ctx.fillStyle = Util.darkColor;
    }
    ctx.fillRect((x*Util.SIZE), (y*Util.SIZE)+ Util.MARGIN, Util.SIZE, Util.GAUGE);
  },
  NE: function(x, y, ctx, status){ 
    // ctx.fillStyle = "magenta";
    // ctx.fillRect(x*Util.SIZE, y*Util.SIZE, Util.SIZE, Util.SIZE);
        if (status === "current") {
      ctx.fillStyle = Util.lightColor;
    } else {
      ctx.fillStyle = Util.darkColor;
    }
    ctx.fillRect(x*Util.SIZE + Util.MARGIN, y*Util.SIZE, Util.GAUGE, Util.GAUGE + Util.MARGIN);
        if (status === "current") {
      ctx.fillStyle = Util.lightColor;
    } else {
      ctx.fillStyle = Util.darkColor;
    }
    ctx.fillRect(x*Util.SIZE + Util.MARGIN, y*Util.SIZE + Util.MARGIN, Util.GAUGE + Util.MARGIN, Util.GAUGE);
  },
  SE: function(x, y, ctx, status){ 
        if (status === "current") {
      ctx.fillStyle = Util.lightColor;
    } else {
      ctx.fillStyle = Util.darkColor;
    }
    ctx.fillRect(x*Util.SIZE + Util.MARGIN, y*Util.SIZE + Util.MARGIN, Util.GAUGE, Util.GAUGE + Util.MARGIN);
        if (status === "current") {
      ctx.fillStyle = Util.lightColor;
    } else {
      ctx.fillStyle = Util.darkColor;
    }
    ctx.fillRect(x*Util.SIZE + Util.MARGIN, y*Util.SIZE + Util.MARGIN, Util.GAUGE + Util.MARGIN, Util.GAUGE);
  },
  NW: function(x, y, ctx, status){ 
        if (status === "current") {
      ctx.fillStyle = Util.lightColor;
    } else {
      ctx.fillStyle = Util.darkColor;
    }
    ctx.fillRect(x*Util.SIZE + Util.MARGIN, y*Util.SIZE, Util.GAUGE, Util.GAUGE + Util.MARGIN);
        if (status === "current") {
      ctx.fillStyle = Util.lightColor;
    } else {
      ctx.fillStyle = Util.darkColor;
    }
    ctx.fillRect(x*Util.SIZE, y*Util.SIZE + Util.MARGIN, Util.GAUGE + Util.MARGIN, Util.GAUGE);
  },
  SW: function(x, y, ctx, status){ 
        if (status === "current") {
      ctx.fillStyle = Util.lightColor;
    } else {
      ctx.fillStyle = Util.darkColor;
    }
    ctx.fillRect(x*Util.SIZE + Util.MARGIN, y*Util.SIZE + Util.MARGIN, Util.GAUGE, Util.GAUGE + Util.MARGIN);
        if (status === "current") {
      ctx.fillStyle = Util.lightColor;
    } else {
      ctx.fillStyle = Util.darkColor;
    }
    ctx.fillRect(x*Util.SIZE, y*Util.SIZE + Util.MARGIN, Util.GAUGE + Util.MARGIN, Util.GAUGE);
  },

}

export default Types;
