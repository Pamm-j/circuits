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

/***/ "./src/Shapes.js":
/*!***********************!*\
  !*** ./src/Shapes.js ***!
  \***********************/
/***/ ((module) => {

eval("const Shapes = {\r\n  shortCorner: [\r\n    [0, 0, 0], \r\n    [0, 1, 0], \r\n    [0, 0, 0]\r\n  ],\r\n  tallCorner: [\r\n    [0, 6, 0], \r\n    [0, 1, 6], \r\n    [0, 0, 0]\r\n  ],\r\n  shortLine: [\r\n    [0, 0, 0], \r\n    [0, 5, 0], \r\n    [0, 0, 0]\r\n  ],\r\n  tallLine: [\r\n    [0, 0, 0], \r\n    [5, 5, 5], \r\n    [0, 0, 0]\r\n  ],\r\n  shortZee: [\r\n    [5, 3, 0], \r\n    [0, 1, 5], \r\n    [0, 0, 0]\r\n  ],\r\n  tallZee: [\r\n    [5, 3, 0], \r\n    [0, 6, 0], \r\n    [0, 1, 5]\r\n  ],\r\n  lShape: [\r\n    [0, 6, 0], \r\n    [0, 6, 0], \r\n    [0, 1, 5]\r\n  ],\r\n  uShape: [\r\n    [2, 5, 0], \r\n    [6, 0, 0], \r\n    [1, 5, 0]\r\n  ]\r\n}\r\n\r\n  \r\nmodule.exports = Shapes;\n\n//# sourceURL=webpack:///./src/Shapes.js?");

/***/ }),

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Board)\n/* harmony export */ });\n/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ \"./src/types.js\");\n/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shapes */ \"./src/shapes.js\");\n/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_shapes__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nclass Board {\n  constructor (ctx) {\n    this.grid = this.buildGrid()\n    this.ctx = ctx;\n    this.currentPiece = new _piece__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\n    this.currentPiece.rotatePiece()\n    this.placePiece()\n    console.table(this.grid)\n    this.drawPlacedPieces()\n    // this.drawCurrentPiece()\n  }\n\n  validPos(){\n    let moveForward = true;\n    this.currentPiece.pieceShapeArray.forEach((row, x)=>{\n      row.forEach((cell, y)=>{\n        const gridX = (this.currentPiece.x + x - 1)\n        const gridY = (this.currentPiece.y + y - 1)\n        const tempCell = this.grid[gridX][gridY]\n        if ( tempCell !== 0 ) {//&& tempCell.type !== null\n          moveForward = false;\n        } \n      })\n    })\n    return moveForward;\n  }\n\n  placePiece(){\n    if (this.validPos()) {\n      this.currentPiece.pieceShapeArray.forEach((row, x)=>{\n        row.forEach((cell, y)=>{\n          const gridX = (this.currentPiece.x + x - 1)\n          const gridY = (this.currentPiece.y + y - 1)\n          if (cell.type !== null) {\n            this.grid[gridX][gridY] = cell\n          }\n        })\n      })\n    }\n  }\n\n \n  // drawCurrentPiece() {\n  //   this.drawPiece(this.currentPiece.type, this.currentPiece.rotation, this.currentPiece.x, this.currentPiece.y)\n  // }\n  \n  \n\n  drawPlacedPieces() {\n    this.drawCell()\n    this.grid.forEach((row, x)=>{\n      row.forEach((cell, y)=>{\n        if (cell !== 0) {\n          const gridX = (this.currentPiece.x + x - 1)\n          const gridY = (this.currentPiece.y + y - 1)\n          console.log([gridX,gridY])\n          this.drawCell(cell.type, cell.rotation, gridX, gridY)\n        }\n      })\n    })\n  }\n\n  drawPiece() {\n    // console.log(this.currentPiece)\n    // shapeArray.forEach((row, x) => {\n    //   row.forEach((cell, y)=> {\n    //     // console.log(cell)\n    //     // console.log([x-1,y-1])\n    //     constructors.x= (this.currentPiece.x + x - 1)\n    //     constructors.y= (this.currentPiece.y + y - 1)\n    //     if (cell!== 0) {\n    //       this.drawCell(this.currentPiece.type, this.currentPiece.rotation, constructors)\n    //     }\n    //   })\n    // })\n\n  }\n  \n  \n  drawCell(type, rotation, x, y){\n    this.clearCell(x, y)\n    if (type === \"corner\") {\n      switch (rotation) {\n        case 1:\n          _types__WEBPACK_IMPORTED_MODULE_2__[\"default\"].NE(x, y, this.ctx);\n          break;\n        case 2:\n          _types__WEBPACK_IMPORTED_MODULE_2__[\"default\"].SE(x, y, this.ctx);\n          break;\n        case 3:\n          _types__WEBPACK_IMPORTED_MODULE_2__[\"default\"].SW(x, y, this.ctx);\n          break;\n        case 4:\n          _types__WEBPACK_IMPORTED_MODULE_2__[\"default\"].NW(x, y, this.ctx);\n          break;\n      }\n    } else if (type === \"bar\") {\n      switch (rotation) {\n        case 0:\n          console.log(\"i made it\")\n          _types__WEBPACK_IMPORTED_MODULE_2__[\"default\"].UP(x, y, this.ctx);\n          break;\n        case 1:\n          _types__WEBPACK_IMPORTED_MODULE_2__[\"default\"].SIDE(x, y, this.ctx);\n          break;\n      }\n    }\n  }\n\n  clearCell(x, y) {\n    this.ctx.clearRect(x * _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SIZE, y * _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SIZE, _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SIZE, _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SIZE)\n  }\n    \n  buildGrid(){\n    const grid = []\n    for (let i = 0; i < _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ROW; i++) {\n      grid.push (new Array(_util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].COL).fill(0))\n    }\n    return grid\n  }\n}\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/cell.js":
/*!*********************!*\
  !*** ./src/cell.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Cell)\n/* harmony export */ });\nclass Cell {\r\n  constructor(type, rotation){\r\n    this.type = type,\r\n    this.rotation = rotation\r\n  }\r\n  rotateCell() {\r\n    if (this.rotation !== null) {\r\n      // console.log(\"in cell rotation\")\r\n      this.rotation = (this.rotation + 1) % 4;\r\n    }\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/cell.js?");

/***/ }),

/***/ "./src/circuits.js":
/*!*************************!*\
  !*** ./src/circuits.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Circuits)\n/* harmony export */ });\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n\n\nlet board = {};\nclass Circuits {\n  constructor(canvas){\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n    this.start();\n    document.addEventListener(\"keyup\", this.action)\n  }\n\n  action(e) {\n    if (e.keyCode === 90) {\n      board.placePiece()\n      board.drawPlacedPieces()\n      // console.table(board.grid);\n    } else {\n      board.clearCell(board.currentPiece.x, board.currentPiece.y)\n      board.drawPlacedPieces()\n      if (e.keyCode === 37) {\n        board.currentPiece.moveLeft(board.ctx)\n        board.drawCurrentPiece()\n      } else if (e.keyCode === 38) {\n        board.currentPiece.moveUp(board.ctx)\n      } else if (e.keyCode === 39) {\n        board.currentPiece.moveRight(board.ctx)\n      } else if (e.keyCode === 40) {\n        board.currentPiece.moveDown(board.ctx)\n      } else if (e.keyCode === 32) {\n        board.currentPiece.rotate(board.ctx)\n      }\n      board.drawCurrentPiece()\n    }\n  }\n\n  start() {\n    board = new _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctx)\n  }\n\n}\n\n//# sourceURL=webpack:///./src/circuits.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _circuits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./circuits */ \"./src/circuits.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n// event listener document.add... DomCONETE\n//starts game, grab canvas w ctx to pass around\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", (event)=> {\n  const canvas = document.getElementById('work-bench');\n  let ctx = canvas.getContext(\"2d\");\n  canvas.width = _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ROW * _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SIZE\n  canvas.height = _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].COL * _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SIZE\n  const circ = new _circuits__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas)\n  // console.log(circ.board.currentPiece)\n  \n\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/piece.js":
/*!**********************!*\
  !*** ./src/piece.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Piece)\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shapes */ \"./src/shapes.js\");\n/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_shapes__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cell */ \"./src/cell.js\");\n/* harmony import */ var _Shapes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shapes */ \"./src/Shapes.js\");\n/* harmony import */ var _Shapes__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Shapes__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n// import * as Types from \"./types\"\n\n\nclass Piece {\n  constructor () {\n    this.x = 2\n    this.y = 2 \n    this.pieceShapeArray = this.buildpieceShapeArray()\n  }\n\n  getRandomShape() {\n    let shapes = Object.keys(_shapes__WEBPACK_IMPORTED_MODULE_1__)\n    return shapes[Math.floor(Math.random()*shapes.length)];\n  }\n\n  buildpieceShapeArray(){\n    // let pieceShapeArray = JSON.parse(JSON.stringify(Shapes[this.getRandomShape()]))\n    let pieceShapeArray = JSON.parse(JSON.stringify(_shapes__WEBPACK_IMPORTED_MODULE_1__.tallLine))\n    pieceShapeArray.forEach((row, i)=> {\n      row.forEach((cell, j)=> {\n        switch (cell) {\n          case 0:\n            pieceShapeArray[i][j] = new _cell__WEBPACK_IMPORTED_MODULE_2__[\"default\"](null, null)\n            // console.log(pieceShapeArray[i][j])\n            break;\n          case 1:\n            pieceShapeArray[i][j] = new _cell__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"corner\", 0)\n            break;\n          case 2:\n            pieceShapeArray[i][j] = new _cell__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"corner\", 1)\n            break;\n          case 3: \n            pieceShapeArray[i][j] = new _cell__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"corner\", 2)\n            break;\n          case 4:\n            pieceShapeArray[i][j] = new _cell__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"corner\", 4)\n            break;\n          case 5: \n            pieceShapeArray[i][j] = new _cell__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"bar\", 0)\n            // console.log(pieceShapeArray[i][j])\n            break;\n          case 6: \n            pieceShapeArray[i][j] = new _cell__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"bar\", 1)\n            break;\n        }     \n      })\n    })\n    // console.log(pieceShapeArray)\n    return pieceShapeArray;\n  }\n\n  \n  rotatePiece() {\n    console.log(\"in piece rotation\")\n    this.pieceShapeArray.forEach((row)=> {\n      row.forEach((cell)=> {\n        cell.rotateCell()\n      })\n    })\n    this.pieceShapeArray = transpose(this.pieceShapeArray)\n  }\n\n  moveUp() {\n    if (this.validYPos(this.y - 1)) {\n    this.y -= 1;\n    }\n  }\n\n  moveDown() {\n    if (this.validYPos(this.y + 1)) {\n    this.y += 1;\n    }\n  }\n\n  moveLeft() {\n    if (this.validXPos(this.x - 1)) {\n      this.x -= 1;\n    }\n  }\n\n  moveRight() {\n    if (this.validXPos(this.x + 1)) {\n      this.x += 1;\n    }\n  }\n\n  validXPos(n) {\n    return n < _util__WEBPACK_IMPORTED_MODULE_0__.ROW - 1 && n > 0;\n  }\n\n  validYPos(n) {\n    return n < _util__WEBPACK_IMPORTED_MODULE_0__.COL - 1 && n > 0;\n }\n}\n\n\n\nfunction transpose(arr) {\n  const transposedArr = [];\n\n  for (var col = 0; col < arr[0].length; col++) {\n    const transposedRow = [];\n    for (var row = 0; row < arr.length; row++) {\n      transposedRow.push(arr[row][col]);\n    }\n    transposedArr.push(transposedRow);\n  }\n  return transposedArr;\n}\n\n//# sourceURL=webpack:///./src/piece.js?");

/***/ }),

/***/ "./src/shapes.js":
/*!***********************!*\
  !*** ./src/shapes.js ***!
  \***********************/
/***/ ((module) => {

eval("const Shapes = {\r\n  shortCorner: [\r\n    [0, 0, 0], \r\n    [0, 1, 0], \r\n    [0, 0, 0]\r\n  ],\r\n  tallCorner: [\r\n    [0, 6, 0], \r\n    [0, 1, 6], \r\n    [0, 0, 0]\r\n  ],\r\n  shortLine: [\r\n    [0, 0, 0], \r\n    [0, 5, 0], \r\n    [0, 0, 0]\r\n  ],\r\n  tallLine: [\r\n    [0, 0, 0], \r\n    [5, 5, 5], \r\n    [0, 0, 0]\r\n  ],\r\n  shortZee: [\r\n    [5, 3, 0], \r\n    [0, 1, 5], \r\n    [0, 0, 0]\r\n  ],\r\n  tallZee: [\r\n    [5, 3, 0], \r\n    [0, 6, 0], \r\n    [0, 1, 5]\r\n  ],\r\n  lShape: [\r\n    [0, 6, 0], \r\n    [0, 6, 0], \r\n    [0, 1, 5]\r\n  ],\r\n  uShape: [\r\n    [2, 5, 0], \r\n    [6, 0, 0], \r\n    [1, 5, 0]\r\n  ]\r\n}\r\n\r\n  \r\nmodule.exports = Shapes;\n\n//# sourceURL=webpack:///./src/shapes.js?");

/***/ }),

/***/ "./src/types.js":
/*!**********************!*\
  !*** ./src/types.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\r\n\r\nconst Types = {\r\n  UP: function(x, y, ctx){ \r\n    ctx.fillStyle = \"orange\";\r\n    ctx.fillRect((x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE)+ _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE);\r\n  },\r\n  SIDE: function(x, y, ctx){ \r\n    ctx.fillStyle = \"orange\";\r\n    ctx.fillRect((x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE), (y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE)+ _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE);\r\n  },\r\n  NE: function(x, y, ctx){ \r\n    // ctx.fillStyle = \"magenta\";\r\n    // ctx.fillRect(x*Util.SIZE, y*Util.SIZE, Util.SIZE, Util.SIZE);\r\n    ctx.fillStyle = \"orange\";\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN);\r\n    ctx.fillStyle = \"orange\";\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE);\r\n  },\r\n  SE: function(x, y, ctx){ \r\n    ctx.fillStyle = \"orange\";\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN);\r\n    ctx.fillStyle = \"orange\";\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE);\r\n  },\r\n  NW: function(x, y, ctx){ \r\n    ctx.fillStyle = \"orange\";\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN);\r\n    ctx.fillStyle = \"orange\";\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE);\r\n  },\r\n  SW: function(x, y, ctx){ \r\n    ctx.fillStyle = \"orange\";\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN);\r\n    ctx.fillStyle = \"orange\";\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE);\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Types);\r\n\n\n//# sourceURL=webpack:///./src/types.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Util = {\n  ROW: 8, \n  COL: 8,\n  SIZE: 50,\n  GAUGE: 16,\n  MARGIN: 17\n} \n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Util);\n// export * as Util from \"./util\"\n\n//# sourceURL=webpack:///./src/util.js?");

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