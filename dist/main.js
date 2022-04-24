/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Board)\n/* harmony export */ });\n/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_util__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ \"./src/types.js\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nlet ctx;\nclass Board {\n  buildGrid(){\n   const grid = []\n   for (let i = 0; i < _util__WEBPACK_IMPORTED_MODULE_1__.ROW; i++) {\n     grid.push (new Array(_util__WEBPACK_IMPORTED_MODULE_1__.COL).fill(0))\n   }\n   return grid\n  }\n  \n  constructor (ctx) {\n    this.grid = this.buildGrid()\n    this.ctx = ctx;\n    this.currentPiece = new _piece__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx)\n    this.drawCurrentPiece()\n    // console.log(this)\n  }\n\n  placePiece(ctx) {\n    if (this.grid[this.currentPiece.x][this.currentPiece.y] === 0) {\n      this.grid[this.currentPiece.x][this.currentPiece.y] = [this.currentPiece.type, this.currentPiece.rotation]\n\n      this.drawPlacedPieces()\n    }\n    // this.currentPiece = new Piece(ctx)\n  }\n\n  drawCurrentPiece() {\n    console.log(this.currentPiece)\n    this.drawPiece(this.currentPiece.type, this.currentPiece.rotation, this.currentPiece.x, this.currentPiece.y)\n  }\n\n  \n\n  drawPlacedPieces() {\n    this.grid.forEach((row, x)=>{\n      row.forEach((cel, y)=>{\n        // console.log(\"drawing all pieces\")\n        if (cel !== 0) this.drawPiece(cel[0], cel[1], x, y)\n      })\n    })\n  }\n  \n  \n  drawPiece(type, rotation, x, y){\n    // console.log(\"drawing a piece\")\n    this.clearCell(x,y)\n    const constructors = {\n      size: _util__WEBPACK_IMPORTED_MODULE_1__.SIZE,\n      margin: _util__WEBPACK_IMPORTED_MODULE_1__.MARGIN,\n      gauge: _util__WEBPACK_IMPORTED_MODULE_1__.GAUGE,\n      x: x,\n      y: y,\n      ctx: this.ctx\n    }\n    console.log(constructors)\n    if (type === \"C\") {\n      switch (rotation) {\n        case 1:\n          _types__WEBPACK_IMPORTED_MODULE_2__.NE(constructors);\n          break;\n        case 2:\n          _types__WEBPACK_IMPORTED_MODULE_2__.SE(constructors);\n          break;\n        case 3:\n          _types__WEBPACK_IMPORTED_MODULE_2__.SW(constructors);\n          break;\n        case 4:\n          _types__WEBPACK_IMPORTED_MODULE_2__.NW(constructors);\n          break;\n      }\n    }\n    if (type === \"B\") {\n      switch (this.rotation) {\n        case 0:\n          _types__WEBPACK_IMPORTED_MODULE_2__.UP(constructors);\n          break;\n        case 1:\n          _types__WEBPACK_IMPORTED_MODULE_2__.SIDE(constructors);\n          break;\n      }\n    }\n  }\n  clearCell(x, y) {\n    this.ctx.clearRect(x * _util__WEBPACK_IMPORTED_MODULE_1__.SIZE, y * _util__WEBPACK_IMPORTED_MODULE_1__.SIZE, _util__WEBPACK_IMPORTED_MODULE_1__.SIZE, _util__WEBPACK_IMPORTED_MODULE_1__.SIZE)\n  }\n\n}\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/circuits.js":
/*!*************************!*\
  !*** ./src/circuits.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Circuits)\n/* harmony export */ });\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_util__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nlet board = {};\nclass Circuits {\n  constructor(canvas){\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n    this.start();\n    document.addEventListener(\"keyup\", this.action)\n  }\n\n  action(e) {\n    if (e.keyCode === 90) {\n      board.placePiece()\n      board.drawPlacedPieces()\n      // console.table(board.grid);\n    } else {\n      board.clearCell(board.currentPiece.x, board.currentPiece.y)\n      board.drawPlacedPieces()\n      if (e.keyCode === 37) {\n        board.currentPiece.moveLeft(board.ctx)\n        board.drawCurrentPiece()\n      } else if (e.keyCode === 38) {\n        board.currentPiece.moveUp(board.ctx)\n      } else if (e.keyCode === 39) {\n        board.currentPiece.moveRight(board.ctx)\n      } else if (e.keyCode === 40) {\n        board.currentPiece.moveDown(board.ctx)\n      } else if (e.keyCode === 32) {\n        board.currentPiece.rotate(board.ctx)\n      }\n      board.drawCurrentPiece()\n    }\n  }\n\n  start() {\n    board = new _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctx)\n  }\n\n}\n\n//# sourceURL=webpack:///./src/circuits.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _circuits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./circuits */ \"./src/circuits.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_util__WEBPACK_IMPORTED_MODULE_1__);\n// event listener document.add... DomCONETE\n//starts game, grab canvas w ctx to pass around\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", (event)=> {\n  const canvas = document.getElementById('work-bench');\n  let ctx = canvas.getContext(\"2d\");\n  canvas.width = (_util__WEBPACK_IMPORTED_MODULE_1___default().ROW) * (_util__WEBPACK_IMPORTED_MODULE_1___default().SIZE)\n  canvas.height = (_util__WEBPACK_IMPORTED_MODULE_1___default().COL) * (_util__WEBPACK_IMPORTED_MODULE_1___default().SIZE)\n  const circ = new _circuits__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas)\n  // console.log(circ.board.currentPiece)\n  \n\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/piece.js":
/*!**********************!*\
  !*** ./src/piece.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Piece)\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_util__WEBPACK_IMPORTED_MODULE_0__);\n\n// import * as Types from \"./types\"\nconst PIECES = {\n  corner: [\n          [0, 0, 0],\n          [0, 1, 0],\n          [0, 0, 0]\n        ]\n}\n\nclass Piece {\n  constructor (ctx) {\n    this.x = 2\n    this.y = 2 \n    this.type = \"C\"\n    this.rotation = 1\n    this.ctx = ctx\n  }\n\n  rotate(ctx) {\n    this.clearCell(ctx)\n    this.rotation++ \n    if (this.type === \"C\") {\n      if (this.rotation > 4) {\n        this.rotation = this.rotation % 4\n      }\n    } else {\n      this.rotation = this.rotation % 2\n    }\n  }\n\n  moveUp(ctx) {\n    if (this.validYPos(this.y - 1)) {\n    this.y -= 1;\n    }\n  }\n\n  moveDown(ctx) {\n    if (this.validYPos(this.y + 1)) {\n    this.y += 1;\n    }\n  }\n\n  moveLeft(ctx) {\n    if (this.validXPos(this.x - 1)) {\n      this.x -= 1;\n    }\n  }\n\n  moveRight(ctx) {\n    if (this.validXPos(this.x + 1)) {\n      this.x += 1;\n    }\n  }\n\n  clearCell(ctx) {\n    ctx.clearRect(this.x * _util__WEBPACK_IMPORTED_MODULE_0__.SIZE, this.y * _util__WEBPACK_IMPORTED_MODULE_0__.SIZE, _util__WEBPACK_IMPORTED_MODULE_0__.SIZE, _util__WEBPACK_IMPORTED_MODULE_0__.SIZE)\n  }\n\n  validXPos(n) {\n    return n < _util__WEBPACK_IMPORTED_MODULE_0__.ROW && n >= 0;\n  }\n\n  validYPos(n) {\n    return n < _util__WEBPACK_IMPORTED_MODULE_0__.COL && n >= 0;\n }\n}\n\n//# sourceURL=webpack:///./src/piece.js?");

/***/ }),

/***/ "./src/types.js":
/*!**********************!*\
  !*** ./src/types.js ***!
  \**********************/
/***/ ((module) => {

eval("const Types = {\r\n  UP: function(info){ \r\n    info.ctx.fillStyle = \"orange\";\r\n    info.ctx.fillRect((info.x*info.size)+ info.margin, info.y*info.size, info.gauge, info.size);\r\n  },\r\n  SIDE: function(info){ \r\n    info.ctx.fillStyle = \"orange\";\r\n    info.ctx.fillRect((info.x*info.size), (info.y*info.size)+ info.margin, info.size, info.gauge);\r\n  },\r\n  NE: function(info){ \r\n    // info.ctx.fillStyle = \"magenta\";\r\n    // info.ctx.fillRect(info.x*info.size, info.y*info.size, info.size, info.size);\r\n    info.ctx.fillStyle = \"orange\";\r\n    info.ctx.fillRect(info.x*info.size + info.margin, info.y*info.size, info.gauge, info.gauge + info.margin);\r\n    info.ctx.fillStyle = \"orange\";\r\n    info.ctx.fillRect(info.x*info.size + info.margin, info.y*info.size + info.margin, info.gauge + info.margin, info.gauge);\r\n  },\r\n  SE: function(info){ \r\n    info.ctx.fillStyle = \"orange\";\r\n    info.ctx.fillRect(info.x*info.size + info.margin, info.y*info.size + info.margin, info.gauge, info.gauge + info.margin);\r\n    info.ctx.fillStyle = \"orange\";\r\n    info.ctx.fillRect(info.x*info.size + info.margin, info.y*info.size + info.margin, info.gauge + info.margin, info.gauge);\r\n  },\r\n  NW: function(info){ \r\n    info.ctx.fillStyle = \"orange\";\r\n    info.ctx.fillRect(info.x*info.size + info.margin, info.y*info.size, info.gauge, info.gauge + info.margin);\r\n    info.ctx.fillStyle = \"orange\";\r\n    info.ctx.fillRect(info.x*info.size, info.y*info.size + info.margin, info.gauge + info.margin, info.gauge);\r\n  },\r\n  SW: function(info){ \r\n    info.ctx.fillStyle = \"orange\";\r\n    info.ctx.fillRect(info.x*info.size + info.margin, info.y*info.size + info.margin, info.gauge, info.gauge + info.margin);\r\n    info.ctx.fillStyle = \"orange\";\r\n    info.ctx.fillRect(info.x*info.size, info.y*info.size + info.margin, info.gauge + info.margin, info.gauge);\r\n  }\r\n}\r\n\r\nmodule.exports = Types;\n\n//# sourceURL=webpack:///./src/types.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\n  ROW: 8, \n  COL: 7,\n  SIZE: 50,\n  GAUGE: 16,\n  MARGIN: 17\n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;