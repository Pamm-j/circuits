const Types = {
  UP: function(info){ 
    info.ctx.fillStyle = "orange";
    info.ctx.fillRect((info.x*info.size)+ info.margin, info.y*info.size, info.gauge, info.size);
  },
  SIDE: function(info){ 
    info.ctx.fillStyle = "orange";
    info.ctx.fillRect((info.x*info.size), (info.y*info.size)+ info.margin, info.size, info.gauge);
  },
  NE: function(info){ 
    // info.ctx.fillStyle = "magenta";
    // info.ctx.fillRect(info.x*info.size, info.y*info.size, info.size, info.size);
    info.ctx.fillStyle = "orange";
    info.ctx.fillRect(info.x*info.size + info.margin, info.y*info.size, info.gauge, info.gauge + info.margin);
    info.ctx.fillStyle = "orange";
    info.ctx.fillRect(info.x*info.size + info.margin, info.y*info.size + info.margin, info.gauge + info.margin, info.gauge);
  },
  SE: function(info){ 
    info.ctx.fillStyle = "orange";
    info.ctx.fillRect(info.x*info.size + info.margin, info.y*info.size + info.margin, info.gauge, info.gauge + info.margin);
    info.ctx.fillStyle = "orange";
    info.ctx.fillRect(info.x*info.size + info.margin, info.y*info.size + info.margin, info.gauge + info.margin, info.gauge);
  },
  NW: function(info){ 
    info.ctx.fillStyle = "orange";
    info.ctx.fillRect(info.x*info.size + info.margin, info.y*info.size, info.gauge, info.gauge + info.margin);
    info.ctx.fillStyle = "orange";
    info.ctx.fillRect(info.x*info.size, info.y*info.size + info.margin, info.gauge + info.margin, info.gauge);
  },
  SW: function(info){ 
    info.ctx.fillStyle = "orange";
    info.ctx.fillRect(info.x*info.size + info.margin, info.y*info.size + info.margin, info.gauge, info.gauge + info.margin);
    info.ctx.fillStyle = "orange";
    info.ctx.fillRect(info.x*info.size, info.y*info.size + info.margin, info.gauge + info.margin, info.gauge);
  }
}

module.exports = Types;