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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Board)\n/* harmony export */ });\n/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ \"./src/types.js\");\n/* harmony import */ var _linkedlist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./linkedlist */ \"./src/linkedlist.js\");\n\n\n\n\n\nclass Board {\n  constructor (ctx) {\n    this.grid = this.buildGrid();\n    this.ctx = ctx;\n    this.currentPiece = new _piece__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.lists = [];\n    this.drawCurrentPiece();\n    // this.placePiece();\n    // this.currentPiece.moveDown();\n    // this.placePiece()\n    // this.currentPiece.moveDown();\n    // this.currentPiece.moveDown();\n    // this.placePiece()\n    // this.drawPlacedPieces()\n    // console.table(this.grid)\n    // console.log(this.lists)\n    // this.consolidateLists()\n  }\n\n  validPos(){\n    let moveForward = true;\n    this.currentPiece.pieceShapeArray.forEach((row, x)=>{\n      row.forEach((cell, y)=>{\n        const gridX = (this.currentPiece.x + x - 1)\n        const gridY = (this.currentPiece.y + y -1 )\n        const tempCell = this.grid[gridX][gridY]\n        if ( cell.type !== null) {\n          if (tempCell !== 0) {\n            moveForward = false;\n          }\n        } \n      })\n    })\n    return moveForward;\n  }\n\n  placePiece(){\n    if (this.validPos()) {\n      let l = this.createList()\n      this.currentPiece.pieceShapeArray.forEach((row, x)=>{\n        row.forEach((cell, y)=>{\n          const gridX = (this.currentPiece.x + x - 1)\n          const gridY = (this.currentPiece.y + y - 1)\n          if (cell.type !== null) {\n            l.insertFirst([gridX, gridY], cell.type, cell.rotation)\n            this.grid[gridX][gridY] = JSON.parse(JSON.stringify(cell))\n          }\n        })\n      })\n      this.clearCurrentPiece()\n      this.drawPlacedPieces()\n\n      console.table(this.grid)\n      console.log(this.lists)\n\n      this.consolidateLists()\n      this.currentPiece = new _piece__WEBPACK_IMPORTED_MODULE_0__[\"default\"] ()\n      this.drawCurrentPiece()\n\n    }\n  }\n \n  drawCurrentPiece() {\n    this.currentPiece.pieceShapeArray.forEach((row, x)=>{\n      row.forEach((cell, y)=>{\n        if (cell !== 0) {\n          const gridX = (this.currentPiece.x + x - 1)\n          const gridY = (this.currentPiece.y + y - 1)\n          // console.log([gridX,gridY])\n          this.drawCell(cell.type, cell.rotation, gridX, gridY, \"current\")\n        }\n      })\n    })\n  }\n\n  clearCurrentPiece() {\n    this.currentPiece.pieceShapeArray.forEach((row, x)=>{\n      row.forEach((cell, y)=>{\n        if (cell !== 0) {\n          const gridX = (this.currentPiece.x + x - 1)\n          const gridY = (this.currentPiece.y + y - 1)\n          // console.log([gridX,gridY])\n          this.clearCell( gridX, gridY)\n        }\n      })\n    })\n  }\n  \n  drawPlacedPieces() {\n    this.grid.forEach((row, x)=>{\n      row.forEach((cell, y)=>{\n        if (cell !== 0) {\n          this.drawCell(cell.type, cell.rotation, x, y, \"other\")\n        }\n      })\n    })\n  }\n  \n  drawCell(type, rotation, x, y, status){\n    // this.clearCell(x, y)\n    if (type === \"corner\") {\n      // console.log(rotation)\n      switch (rotation) {\n        case 0:\n          _types__WEBPACK_IMPORTED_MODULE_2__[\"default\"].NE(x, y, this.ctx, status);\n          break;\n        case 3:\n          _types__WEBPACK_IMPORTED_MODULE_2__[\"default\"].SE(x, y, this.ctx, status);\n          break;\n        case 2:\n          _types__WEBPACK_IMPORTED_MODULE_2__[\"default\"].SW(x, y, this.ctx, status);\n          break;\n        case 1:\n          _types__WEBPACK_IMPORTED_MODULE_2__[\"default\"].NW(x, y, this.ctx, status);\n          break;\n      }\n    } else if (type === \"bar\") {\n      switch (rotation%2) {\n        case 0:\n          _types__WEBPACK_IMPORTED_MODULE_2__[\"default\"].UP(x, y, this.ctx, status);\n          break;\n        case 1:\n          _types__WEBPACK_IMPORTED_MODULE_2__[\"default\"].SIDE(x, y, this.ctx, status);\n          break;\n      }\n    }\n  }\n\n  clearCell(x, y) {\n    this.ctx.clearRect(x * _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SIZE, y * _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SIZE, _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SIZE, _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SIZE)\n  }\n  ///////////////////////////////////////////////////\n  ////////methods relating to the linked list////////\n  ///////////////////////////////////////////////////\n  createList() {\n    let list = new _linkedlist__WEBPACK_IMPORTED_MODULE_3__[\"default\"]()\n    this.lists.push(list)\n    return list;\n  }\n\n  consolidateLists() {\n    console.log(\"starting to consolodate\")\n\n    // debugger\n    let defNoMoreMatches = false;\n    while (!defNoMoreMatches) {\n      defNoMoreMatches = true;\n      let weAreDoneHere = false;\n      this.lists.forEach((list, listDex)=>{\n        for (let i = 0; i < this.lists.length; i++) {\n          // head to head links or tail to head\n          console.log('hodor')\n          if ( list.head && this.lists[i].head && list.tail && this.lists[i].tail &&\n            (JSON.stringify(list.head.pos) === JSON.stringify(this.lists[i].head.link1) || \n              JSON.stringify(list.head.pos) === JSON.stringify(this.lists[i].head.link2) ||\n              JSON.stringify(list.tail.pos) === JSON.stringify(this.lists[i].tail.link1) ||\n              JSON.stringify(list.tail.pos) === JSON.stringify(this.lists[i].tail.link2)) && \n              !weAreDoneHere) {\n            if (list.head === this.lists[i].head ) {\n              console.log(\"DONT BITE YOUR OWN TAIL\")\n            } else {\n              console.log(\"head to head, or tail to tail, as it was meant to be\")\n              this.lists[listDex].reverse()\n              this.joinLists(listDex, i)\n              weAreDoneHere = true;\n              defNoMoreMatches = false;\n            }\n          } else if ( list.head && this.lists[i].head && list.tail && this.lists[i].tail &&\n                    (JSON.stringify(list.head.pos) === JSON.stringify(this.lists[i].tail.link1) ||\n                    JSON.stringify(list.head.pos) === JSON.stringify(this.lists[i].tail.link2)) && \n                    !weAreDoneHere) {\n            if (list.head === this.lists[i].head) {\n              console.log(\"DONT BITE YOUR OWN TAIL\")\n            } else {\n              console.log(\"head to tail, as god intended\")\n              // console.log(this.lists[listDex])\n              // console.log(this.lists[i])\n              this.joinLists(listDex, i)\n              weAreDoneHere = true;\n              defNoMoreMatches = false;\n\n            }\n          }\n        }\n      })\n\n    }\n    console.log([\"number of lists in this.list:\",this.lists.length])\n    console.log(this.lists)\n    // this.lists.forEach((list) => list.printlist())\n  }\n  \n  joinLists(index1, index2){\n    console.log(\"in join lists\")\n    this.lists[index2].combineLists(this.lists[index1])\n    this.lists = this.lists.filter((list)=> list.head)\n    console.log(this.lists)\n\n  }\n  // consolidateLists() {\n  //   let weAreDoneHere = false;\n  //   let termini = this.buildTerminiArray()\n  //   // termini is an array of objects, which have a 'terminiType', a 'node', and and 'listIndex' which refers to this.lists\n    \n\n  //   termini\n\n  //   console.log(this.lists)\n  // }\n  // buildTerminiArray(){\n  //   let termini = [];\n  //   this.lists.forEach((list, listIndex)=> {\n  //     termini.push({node: list.getLastNode(), terminiType: \"tail\", listIndex: listIndex})\n  //     termini.push({node: list.head, terminiType: \"head\", listIndex: listIndex})\n  //   })\n  //   return termini\n  // }\n\n  buildGrid(){\n    const grid = []\n    for (let i = 0; i < _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ROW; i++) {\n      grid.push (new Array(_util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].COL).fill(0))\n    }\n    return grid\n  }\n}\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/cell.js":
/*!*********************!*\
  !*** ./src/cell.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Cell)\n/* harmony export */ });\nclass Cell {\r\n  constructor(type, rotation){\r\n    this.type = type,\r\n    this.rotation = rotation\r\n  }\r\n  rotateCell() {\r\n    if (this.rotation !== null) {\r\n      this.rotation = (this.rotation + 1 ) % 4;\r\n    }\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/cell.js?");

/***/ }),

/***/ "./src/circuits.js":
/*!*************************!*\
  !*** ./src/circuits.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Circuits)\n/* harmony export */ });\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n\n\nlet board = {};\nclass Circuits {\n  constructor(canvas){\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimensions = { width: canvas.width, height: canvas.height };\n    this.start();\n    document.addEventListener(\"keyup\", this.action);\n  }\n\n  action(e) {\n    if (e.keyCode === 83 ) {\n      board.placePiece()\n    } else { \n      board.clearCurrentPiece()\n      if (e.keyCode === 37) {\n        board.currentPiece.moveLeft(board.ctx)\n      } else if (e.keyCode === 38) {\n        board.currentPiece.moveUp(board.ctx)\n      } else if (e.keyCode === 39) {\n        board.currentPiece.moveRight(board.ctx)\n      } else if (e.keyCode === 40) {\n        board.currentPiece.moveDown(board.ctx)\n      } else if (e.keyCode === 68) {\n        board.currentPiece.rotatePiece(board.ctx)\n      }\n      board.drawPlacedPieces()\n      board.drawCurrentPiece()\n    }\n  } \n\n  start() {\n    board = new _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctx)\n  }\n\n}\n\n//# sourceURL=webpack:///./src/circuits.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _circuits__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./circuits */ \"./src/circuits.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n// event listener document.add... DomCONETE\n//starts game, grab canvas w ctx to pass around\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", (event)=> {\n  const canvas = document.getElementById('work-bench');\n  let ctx = canvas.getContext(\"2d\");\n  canvas.width = _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ROW * _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SIZE\n  canvas.height = _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].COL * _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].SIZE\n  const circ = new _circuits__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas)\n  // console.log(circ.board.currentPiece)\n  \n\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/linkedlist.js":
/*!***************************!*\
  !*** ./src/linkedlist.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ LinkedList)\n/* harmony export */ });\n/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node */ \"./src/node.js\");\n\r\nclass LinkedList {\r\n  constructor () {\r\n    this.head = null;\r\n    this.tail = null;\r\n    this.size = 0;\r\n  }\r\n  \r\n  insertLast(pos, type, rotation) {\r\n    let newNode = new _node__WEBPACK_IMPORTED_MODULE_0__[\"default\"](pos, type, rotation, this.head);\r\n    if (!this.head) {\r\n      this.head = newNode\r\n      this.tail = this.head\r\n    } else {\r\n      this.tail.next = newNode\r\n      this.tail = newNode\r\n    }\r\n    this.size++;\r\n  }\r\n  \r\n  insertFirst(pos, type, rotation) {\r\n    let newNode = new _node__WEBPACK_IMPORTED_MODULE_0__[\"default\"](pos, type, rotation);\r\n    \r\n    if(!this.head) {\r\n      this.head = newNode;\r\n      this.tail = newNode;\r\n    } else {\r\n      newNode.next = this.head;\r\n      this.head = newNode;\r\n    }\r\n    this.size++;\r\n  }\r\n\r\n  // getLastNode() {\r\n  //   let current = this.head;\r\n  //   let count = 0;\r\n\r\n  //   while (current) {\r\n  //     if (count === this.size-1) {\r\n  //       return current\r\n  //     }\r\n  //     count++;\r\n  //     current = current.next\r\n  //   }\r\n  // }\r\n\r\n  delete(){\r\n    this.head = null\r\n    this.size = 0\r\n  }\r\n  printlist(){\r\n    let current = this.head;\r\n    let count = 0;\r\n    while (count < this.size) {\r\n      console.log([current.pos, current.name])\r\n      // console.log(current)\r\n      current = current.next\r\n      count++;\r\n    }\r\n  }\r\n  combineLists(list){\r\n    let last = this.tail\r\n    last.next = list.head\r\n    this.tail = list.tail\r\n    // console.log(last)\r\n    // console.log(list.head)\r\n    this.size += list.size\r\n    list.delete()\r\n  }\r\n\r\n  reverse() {\r\n    let current = this.head;\r\n    this.head = this.tail;\r\n    this.tail = current\r\n    let prev;\r\n    let next;\r\n\r\n    // for (var i = 0; i < this.length; i++){\r\n    while (current) {\r\n      next = current.next;\r\n      current.next = prev;\r\n      prev = current;\r\n      current = next;\r\n      console.log('hodor')\r\n    }\r\n    this.head = prev;\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/linkedlist.js?");

/***/ }),

/***/ "./src/node.js":
/*!*********************!*\
  !*** ./src/node.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Node)\n/* harmony export */ });\nclass Node {\r\n  constructor (pos, type, rotation, next) {\r\n    this.pos = pos;\r\n    this.next = next;\r\n    this.assignLinks(type, rotation, pos)\r\n  }\r\n\r\n  assignLinks(type, rotation, pos){\r\n    let x, y;\r\n    [x, y] = pos\r\n    if (type === \"corner\") {\r\n      switch (rotation) {\r\n        case 0:\r\n          this.name = \"NE\"\r\n          this.link1 = [x + 1, y]\r\n          this.link2 = [x, y - 1]\r\n          break;\r\n        case 3:\r\n          this.name = \"SE\"\r\n          this.link1 = [x + 1, y]\r\n          this.link2 = [x, y + 1]\r\n          break;\r\n        case 2:\r\n          this.name = \"SW\"\r\n          this.link1 = [x - 1, y]\r\n          this.link2 = [x, y + 1]\r\n          break;\r\n        case 1:\r\n          this.name = \"NW\"\r\n          this.link1 = [x - 1, y]\r\n          this.link2 = [x, y - 1]\r\n          break;\r\n      }\r\n    } else if (type === \"bar\") {\r\n      switch (rotation%2) {\r\n        case 0:\r\n          this.name = \"UP\"\r\n          this.link1 = [x, y + 1]\r\n          this.link2 = [x, y - 1]\r\n          break;\r\n        case 1:\r\n          this.name = \"SIDE\"\r\n          this.link1 = [x + 1, y]\r\n          this.link2 = [x - 1, y]\r\n          break;\r\n      }\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/node.js?");

/***/ }),

/***/ "./src/piece.js":
/*!**********************!*\
  !*** ./src/piece.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Piece)\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shapes */ \"./src/shapes.js\");\n/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_shapes__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cell */ \"./src/cell.js\");\n\n\n\n// import * as Types from \"./types\"\n\n\nclass Piece {\n  constructor () {\n    this.x = 2\n    this.y = 2 \n    this.pieceShapeArray = this.buildpieceShapeArray()\n  }\n\n  getRandomShape() {\n    // let shapes = Object.keys(Shapes)\n    // let shapes = [\"shortCorner\", \"tallCorner\", \"shortLine\", \"tallLine\", \"lShape\", \"uShape\"]\n    let shapes = [ \"shortCorner\"]\n    return shapes[Math.floor(Math.random()*shapes.length)];\n  }\n\n  buildpieceShapeArray(){\n    let name = this.getRandomShape()\n    // console.log(name)\n    let pieceShapeArray = JSON.parse(JSON.stringify((_shapes__WEBPACK_IMPORTED_MODULE_1___default())[name]))\n    // let pieceShapeArray = JSON.parse(JSON.stringify(Shapes['uShape']))\n    pieceShapeArray.forEach((row, i)=> {\n      row.forEach((cell, j)=> {\n        switch (cell) {\n          case 0:\n            pieceShapeArray[i][j] = new _cell__WEBPACK_IMPORTED_MODULE_2__[\"default\"](null, null)\n            break;\n          case 1:\n            pieceShapeArray[i][j] = new _cell__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"corner\", 0)\n            break;\n          case 2:\n            pieceShapeArray[i][j] = new _cell__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"corner\", 1)\n            break;\n          case 3: \n            pieceShapeArray[i][j] = new _cell__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"corner\", 2)\n            break;\n          case 4:\n            pieceShapeArray[i][j] = new _cell__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"corner\", 3)\n            break;\n          case 5: \n            pieceShapeArray[i][j] = new _cell__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"bar\", 0)\n            break;\n          case 6: \n            pieceShapeArray[i][j] = new _cell__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"bar\", 1)\n            break;\n        }     \n      })\n    })\n    return pieceShapeArray;\n  }\n\n  \n  rotatePiece() {\n    // console.log(this.pieceShapeArray)\n    this.pieceShapeArray.forEach((row)=> {\n      row.forEach((cell)=> {\n        cell.rotateCell()\n      })\n    })\n    let rotated = this.pieceShapeArray[0].map((val, index) => this.pieceShapeArray.map(row => row[index]).reverse())\n    this.pieceShapeArray = rotated\n  }\n\n  moveUp() {\n    if (this.validYPos(this.y - 1)) {\n    this.y -= 1;\n    }\n  }\n\n  moveDown() {\n    if (this.validYPos(this.y + 1)) {\n    this.y += 1;\n    }\n  }\n\n  moveLeft() {\n    if (this.validXPos(this.x - 1)) {\n      this.x -= 1;\n    }\n  }\n\n  moveRight() {\n    if (this.validXPos(this.x + 1)) {\n      this.x += 1;\n    }\n  }\n\n  validXPos(n) {\n    return n < _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ROW - 1 && n > 0;\n  }\n\n  validYPos(n) {\n    return n < _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].COL - 1 && n > 0;\n }\n}\n\n//# sourceURL=webpack:///./src/piece.js?");

/***/ }),

/***/ "./src/shapes.js":
/*!***********************!*\
  !*** ./src/shapes.js ***!
  \***********************/
/***/ ((module) => {

eval("const Shapes = {\r\n  shortCorner: [\r\n    [0, 0, 0], \r\n    [0, 3, 0], \r\n    [0, 0, 0]\r\n  ],\r\n  tallCorner: [\r\n    [0, 6, 0], \r\n    [0, 3, 5], \r\n    [0, 0, 0]\r\n  ],\r\n  shortLine: [\r\n    [0, 0, 0], \r\n    [0, 5, 0], \r\n    [0, 0, 0]\r\n  ],\r\n  tallLine: [\r\n    [0, 0, 0], \r\n    [5, 5, 5], \r\n    [0, 0, 0]\r\n  ],\r\n  shortZee: [\r\n    [5, 1, 0], \r\n    [0, 3, 5], \r\n    [0, 0, 0]\r\n  ],\r\n  tallZee: [\r\n    [5, 1, 0], \r\n    [0, 6, 0], \r\n    [0, 3, 5]\r\n  ],\r\n  lShape: [\r\n    [0, 6, 0], \r\n    [0, 6, 0], \r\n    [0, 3, 5]\r\n  ],\r\n  uShape: [\r\n    [4, 5, 0], \r\n    [6, 0, 0], \r\n    [3, 5, 0]\r\n  ]\r\n}\r\n\r\n  \r\nmodule.exports = Shapes;\n\n//# sourceURL=webpack:///./src/shapes.js?");

/***/ }),

/***/ "./src/types.js":
/*!**********************!*\
  !*** ./src/types.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\r\n\r\nconst Types = {\r\n\r\n  UP: function(x, y, ctx, status){ \r\n    if (status === \"current\") {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lightColor;\r\n    } else {\r\n          if (status === \"current\") {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lightColor;\r\n    } else {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].darkColor;\r\n    }\r\n    }\r\n    ctx.fillRect((x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE)+ _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE);\r\n  },\r\n  SIDE: function(x, y, ctx, status){ \r\n        if (status === \"current\") {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lightColor;\r\n    } else {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].darkColor;\r\n    }\r\n    ctx.fillRect((x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE), (y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE)+ _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE);\r\n  },\r\n  NE: function(x, y, ctx, status){ \r\n    // ctx.fillStyle = \"magenta\";\r\n    // ctx.fillRect(x*Util.SIZE, y*Util.SIZE, Util.SIZE, Util.SIZE);\r\n        if (status === \"current\") {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lightColor;\r\n    } else {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].darkColor;\r\n    }\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN);\r\n        if (status === \"current\") {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lightColor;\r\n    } else {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].darkColor;\r\n    }\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE);\r\n  },\r\n  SE: function(x, y, ctx, status){ \r\n        if (status === \"current\") {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lightColor;\r\n    } else {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].darkColor;\r\n    }\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN);\r\n        if (status === \"current\") {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lightColor;\r\n    } else {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].darkColor;\r\n    }\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE);\r\n  },\r\n  NW: function(x, y, ctx, status){ \r\n        if (status === \"current\") {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lightColor;\r\n    } else {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].darkColor;\r\n    }\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN);\r\n        if (status === \"current\") {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lightColor;\r\n    } else {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].darkColor;\r\n    }\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE);\r\n  },\r\n  SW: function(x, y, ctx, status){ \r\n        if (status === \"current\") {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lightColor;\r\n    } else {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].darkColor;\r\n    }\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN);\r\n        if (status === \"current\") {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].lightColor;\r\n    } else {\r\n      ctx.fillStyle = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].darkColor;\r\n    }\r\n    ctx.fillRect(x*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE, y*_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SIZE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE + _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].MARGIN, _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].GAUGE);\r\n  },\r\n\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Types);\r\n\n\n//# sourceURL=webpack:///./src/types.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Util = {\n  ROW: 8, \n  COL: 15,\n  SIZE: 20,\n  GAUGE: 5,\n  MARGIN: 10,\n  darkColor: \"brown\",\n  lightColor: \"orange\"\n} \n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Util);\n// export * as Util from \"./util\"\n\n//# sourceURL=webpack:///./src/util.js?");

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