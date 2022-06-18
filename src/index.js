import Circuits from "./game";
import Util from "./util";

document.addEventListener("DOMContentLoaded", (event)=> {
  const canvas = document.getElementById('work-bench');
  let ctx = canvas.getContext("2d");
  const smallCanva = document.getElementById('next-piece')
  let ctx2 = smallCanva.getContext("2d")
  canvas.width = Util.ROW * Util.SIZE + Util.SIZE
  canvas.height = Util.COL * Util.SIZE
  const circ = new Circuits(canvas, smallCanva)
})
