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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Board)\n/* harmony export */ });\n/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_util__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\nclass Board {\n  buildGrid(){\n   const grid = []\n   for (let i = 0; i < _util__WEBPACK_IMPORTED_MODULE_1__.ROW; i++) {\n     grid.push (new Array(_util__WEBPACK_IMPORTED_MODULE_1__.COL).fill(0))\n   }\n   return grid\n  }\n  \n  constructor (ctx) {\n    this.grid = this.buildGrid()\n    this.ctx = ctx;\n    this.currentPiece = new _piece__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx)\n    // console.log(this.currentPiece)\n    // debugger\n    setTimeout(() => this.currentPiece.moveUp(ctx), 1000)\n  }\n\n  genPiece() {\n\n  }\n\n  \n\n}\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/circuits.js":
/*!*************************!*\
  !*** ./src/circuits.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Circuits)\n/* harmony export */ });\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_util__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nclass Circuits {\n  constructor(canvas){\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n    this.start();\n    document.addEventListener(\"keyup\", this.action)\n  }\n\n  action(e) {\n    if (e.keyCode === 37) {\n      this.board.currentPiece.moveLeft()\n    } else if (e.keyCode === 38) {\n      this.board.currentPiece.rotate()\n    } else if (e.keyCode === 39) {\n      this.board.currentPiece.moveRight()\n    } else if (e.keyCode === 40) {\n      this.board.currentPiece.moveUp()\n    } else if (e.keyCode === 32) {\n      this.board.currentPiece.rotate()\n    }\n  }\n\n  start() {\n    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctx)\n    console.table(this.board.grid);\n    // setTimeout(this.board.grid.currentPiece.moveUp(this.ctx), 1000)\n  }\n\n}\n\n//# sourceURL=webpack:///./src/circuits.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _circuits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./circuits */ \"./src/circuits.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_util__WEBPACK_IMPORTED_MODULE_1__);\n// event listener document.add... DomCONETE\n//starts game, grab canvas w ctx to pass around\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", (event)=> {\n  const canvas = document.getElementById('work-bench');\n  let ctx = canvas.getContext(\"2d\");\n  canvas.width = (_util__WEBPACK_IMPORTED_MODULE_1___default().ROW) * (_util__WEBPACK_IMPORTED_MODULE_1___default().BLOCKSIZE)\n  canvas.height = (_util__WEBPACK_IMPORTED_MODULE_1___default().COL) * (_util__WEBPACK_IMPORTED_MODULE_1___default().BLOCKSIZE)\n  const circ = new _circuits__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas)\n  // console.log(circ.board.currentPiece)\n  \n\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/piece.js":
/*!**********************!*\
  !*** ./src/piece.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Piece)\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_util__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst PIECES = {\n  corner: [0,0]\n}\n\nclass Piece {\n  constructor (ctx) {\n    this.x = 8\n    this.xDraw = this.x * _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE\n    this.y = 3\n    this.yDraw = this.y * _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE\n    this.drawPiece(ctx)\n  }\n\n  drawPiece(ctx){\n    ctx.fillStyle = \"orange\";\n    ctx.fillRect( this.x * _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE, this.y * _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE, _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE, _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE)\n    ctx.fillStyle = \"black\";\n    ctx.fillRect( this.x * _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE, this.y * _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE, _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE/2, _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE/2)\n    ctx.fillStyle = \"orange\";\n    ctx.fillRect( this.x * _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE, this.y * _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE, _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE/3, _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE/3)\n  }\n\n  moveUp(ctx) {\n    ctx.clearRect(this.x * _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE, this.y * _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE, _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE, _util__WEBPACK_IMPORTED_MODULE_0__.BLOCKSIZE)\n    this.y -= 1;\n    this.drawPiece(ctx);\n    console.log(\"i moved up\")\n  }\n}\n\n//# sourceURL=webpack:///./src/piece.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\n  ROW: 18, \n  COL: 8,\n  BLOCKSIZE: 50\n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

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