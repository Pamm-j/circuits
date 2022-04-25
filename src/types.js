import Util from './util'

const Types = {
  UP: function(x, y, ctx){ 
    ctx.fillStyle = "orange";
    ctx.fillRect((x*Util.SIZE)+ Util.MARGIN, y*Util.SIZE, Util.GAUGE, Util.SIZE);
  },
  SIDE: function(x, y, ctx){ 
    ctx.fillStyle = "orange";
    ctx.fillRect((x*Util.SIZE), (y*Util.SIZE)+ Util.MARGIN, Util.SIZE, Util.GAUGE);
  },
  NE: function(x, y, ctx){ 
    // ctx.fillStyle = "magenta";
    // ctx.fillRect(x*Util.SIZE, y*Util.SIZE, Util.SIZE, Util.SIZE);
    ctx.fillStyle = "orange";
    ctx.fillRect(x*Util.SIZE + Util.MARGIN, y*Util.SIZE, Util.GAUGE, Util.GAUGE + Util.MARGIN);
    ctx.fillStyle = "orange";
    ctx.fillRect(x*Util.SIZE + Util.MARGIN, y*Util.SIZE + Util.MARGIN, Util.GAUGE + Util.MARGIN, Util.GAUGE);
  },
  SE: function(x, y, ctx){ 
    ctx.fillStyle = "orange";
    ctx.fillRect(x*Util.SIZE + Util.MARGIN, y*Util.SIZE + Util.MARGIN, Util.GAUGE, Util.GAUGE + Util.MARGIN);
    ctx.fillStyle = "orange";
    ctx.fillRect(x*Util.SIZE + Util.MARGIN, y*Util.SIZE + Util.MARGIN, Util.GAUGE + Util.MARGIN, Util.GAUGE);
  },
  NW: function(x, y, ctx){ 
    ctx.fillStyle = "orange";
    ctx.fillRect(x*Util.SIZE + Util.MARGIN, y*Util.SIZE, Util.GAUGE, Util.GAUGE + Util.MARGIN);
    ctx.fillStyle = "orange";
    ctx.fillRect(x*Util.SIZE, y*Util.SIZE + Util.MARGIN, Util.GAUGE + Util.MARGIN, Util.GAUGE);
  },
  SW: function(x, y, ctx){ 
    ctx.fillStyle = "orange";
    ctx.fillRect(x*Util.SIZE + Util.MARGIN, y*Util.SIZE + Util.MARGIN, Util.GAUGE, Util.GAUGE + Util.MARGIN);
    ctx.fillStyle = "orange";
    ctx.fillRect(x*Util.SIZE, y*Util.SIZE + Util.MARGIN, Util.GAUGE + Util.MARGIN, Util.GAUGE);
  }
}

export default Types;
