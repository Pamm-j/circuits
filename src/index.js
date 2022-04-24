// event listener document.add... DomCONETE
//starts game, grab canvas w ctx to pass around

import Circuits from "./circuits";
import Util from "./util";

document.addEventListener("DOMContentLoaded", (event)=> {
  const canvas = document.getElementById('work-bench');
  let ctx = canvas.getContext("2d");
  canvas.width = Util.ROW * Util.SIZE
  canvas.height = Util.COL * Util.SIZE
  const circ = new Circuits(canvas)
  // console.log(circ.board.currentPiece)
  

})