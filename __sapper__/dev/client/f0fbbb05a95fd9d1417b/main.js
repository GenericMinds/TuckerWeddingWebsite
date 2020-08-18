/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + "f0fbbb05a95fd9d1417b" + "/" + ({"vendors~index":"vendors~index","index":"index"}[chunkId]||chunkId) + "." + chunkId + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "client/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/chota/dist/chota.min.css":
/*!***********************************************!*\
  !*** ./node_modules/chota/dist/chota.min.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../css-loader/dist/cjs.js!../../sass-loader/dist/cjs.js!./chota.min.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/chota/dist/chota.min.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/chota/dist/chota.min.css":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/chota/dist/chota.min.css ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/*! chota.css v0.7.2 | MIT License | github.com/jenil/chota */\n:root {\n  --bg-color:#fff;\n  --bg-secondary-color:#f3f3f6;\n  --color-primary:#14854f;\n  --color-lightGrey:#d2d6dd;\n  --color-grey:#747681;\n  --color-darkGrey:#3f4144;\n  --color-error:#d43939;\n  --color-success:#28bd14;\n  --grid-maxWidth:120rem;\n  --grid-gutter:2rem;\n  --font-size:1.6rem;\n  --font-color:#333;\n  --font-family-sans:-apple-system,BlinkMacSystemFont,Avenir,\"Avenir Next\",\"Segoe UI\",\"Roboto\",\"Oxygen\",\"Ubuntu\",\"Cantarell\",\"Fira Sans\",\"Droid Sans\",\"Helvetica Neue\",sans-serif;\n  --font-family-mono:monaco,\"Consolas\",\"Lucida Console\",monospace;\n}\n\nhtml {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  font-size: 62.5%;\n  line-height: 1.15;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\n\n*, :after, :before {\n  -webkit-box-sizing: inherit;\n  box-sizing: inherit;\n}\n\nbody {\n  background-color: var(--bg-color);\n  line-height: 1.6;\n  font-size: var(--font-size);\n  color: var(--font-color);\n  font-family: Segoe UI, Helvetica Neue, sans-serif;\n  font-family: var(--font-family-sans);\n  margin: 0;\n  padding: 0;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  font-weight: 500;\n  margin: 0.35em 0 0.7em;\n}\n\nh1 {\n  font-size: 2em;\n}\n\nh2 {\n  font-size: 1.75em;\n}\n\nh3 {\n  font-size: 1.5em;\n}\n\nh4 {\n  font-size: 1.25em;\n}\n\nh5 {\n  font-size: 1em;\n}\n\nh6 {\n  font-size: 0.85em;\n}\n\na {\n  color: var(--color-primary);\n  text-decoration: none;\n}\n\na:hover:not(.button) {\n  opacity: 0.75;\n}\n\nbutton {\n  font-family: inherit;\n}\n\np {\n  margin-top: 0;\n}\n\nblockquote {\n  background-color: var(--bg-secondary-color);\n  padding: 1.5rem 2rem;\n  border-left: 3px solid var(--color-lightGrey);\n}\n\ndl dt {\n  font-weight: 700;\n}\n\nhr {\n  background-color: var(--color-lightGrey);\n  height: 1px;\n  margin: 1rem 0;\n}\n\nhr, table {\n  border: none;\n}\n\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n  text-align: left;\n}\n\ntable.striped tr:nth-of-type(2n) {\n  background-color: var(--bg-secondary-color);\n}\n\ntd, th {\n  vertical-align: middle;\n  padding: 1.2rem 0.4rem;\n}\n\nthead {\n  border-bottom: 2px solid var(--color-lightGrey);\n}\n\ntfoot {\n  border-top: 2px solid var(--color-lightGrey);\n}\n\ncode, kbd, pre, samp, tt {\n  font-family: var(--font-family-mono);\n}\n\ncode, kbd {\n  font-size: 90%;\n  white-space: pre-wrap;\n  border-radius: 4px;\n  padding: 0.2em 0.4em;\n  color: var(--color-error);\n}\n\ncode, kbd, pre {\n  background-color: var(--bg-secondary-color);\n}\n\npre {\n  font-size: 1em;\n  padding: 1rem;\n  overflow-x: auto;\n}\n\npre code {\n  background: none;\n  padding: 0;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline;\n  -webkit-text-decoration: underline dotted;\n  text-decoration: underline dotted;\n}\n\nimg {\n  max-width: 100%;\n}\n\nfieldset {\n  border: 1px solid var(--color-lightGrey);\n}\n\niframe {\n  border: 0;\n}\n\n.container {\n  max-width: var(--grid-maxWidth);\n  margin: 0 auto;\n  width: 96%;\n  padding: 0 calc(var(--grid-gutter)/2);\n}\n\n.row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -ms-flex-flow: row wrap;\n  flex-flow: row wrap;\n  -webkit-box-pack: start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  margin-left: calc(var(--grid-gutter)/-2);\n  margin-right: calc(var(--grid-gutter)/-2);\n}\n\n.row, .row.reverse {\n  -webkit-box-orient: horizontal;\n}\n\n.row.reverse {\n  -webkit-box-direction: reverse;\n  -ms-flex-direction: row-reverse;\n  flex-direction: row-reverse;\n}\n\n.col {\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n}\n\n.col, [class*=\" col-\"], [class^=col-] {\n  margin: 0 calc(var(--grid-gutter)/2) calc(var(--grid-gutter)/2);\n}\n\n.col-1 {\n  -ms-flex: 0 0 calc(8.33333% - var(--grid-gutter));\n  flex: 0 0 calc(8.33333% - var(--grid-gutter));\n  max-width: calc(8.33333% - var(--grid-gutter));\n}\n\n.col-1, .col-2 {\n  -webkit-box-flex: 0;\n}\n\n.col-2 {\n  -ms-flex: 0 0 calc(16.66667% - var(--grid-gutter));\n  flex: 0 0 calc(16.66667% - var(--grid-gutter));\n  max-width: calc(16.66667% - var(--grid-gutter));\n}\n\n.col-3 {\n  -ms-flex: 0 0 calc(25% - var(--grid-gutter));\n  flex: 0 0 calc(25% - var(--grid-gutter));\n  max-width: calc(25% - var(--grid-gutter));\n}\n\n.col-3, .col-4 {\n  -webkit-box-flex: 0;\n}\n\n.col-4 {\n  -ms-flex: 0 0 calc(33.33333% - var(--grid-gutter));\n  flex: 0 0 calc(33.33333% - var(--grid-gutter));\n  max-width: calc(33.33333% - var(--grid-gutter));\n}\n\n.col-5 {\n  -ms-flex: 0 0 calc(41.66667% - var(--grid-gutter));\n  flex: 0 0 calc(41.66667% - var(--grid-gutter));\n  max-width: calc(41.66667% - var(--grid-gutter));\n}\n\n.col-5, .col-6 {\n  -webkit-box-flex: 0;\n}\n\n.col-6 {\n  -ms-flex: 0 0 calc(50% - var(--grid-gutter));\n  flex: 0 0 calc(50% - var(--grid-gutter));\n  max-width: calc(50% - var(--grid-gutter));\n}\n\n.col-7 {\n  -ms-flex: 0 0 calc(58.33333% - var(--grid-gutter));\n  flex: 0 0 calc(58.33333% - var(--grid-gutter));\n  max-width: calc(58.33333% - var(--grid-gutter));\n}\n\n.col-7, .col-8 {\n  -webkit-box-flex: 0;\n}\n\n.col-8 {\n  -ms-flex: 0 0 calc(66.66667% - var(--grid-gutter));\n  flex: 0 0 calc(66.66667% - var(--grid-gutter));\n  max-width: calc(66.66667% - var(--grid-gutter));\n}\n\n.col-9 {\n  -ms-flex: 0 0 calc(75% - var(--grid-gutter));\n  flex: 0 0 calc(75% - var(--grid-gutter));\n  max-width: calc(75% - var(--grid-gutter));\n}\n\n.col-9, .col-10 {\n  -webkit-box-flex: 0;\n}\n\n.col-10 {\n  -ms-flex: 0 0 calc(83.33333% - var(--grid-gutter));\n  flex: 0 0 calc(83.33333% - var(--grid-gutter));\n  max-width: calc(83.33333% - var(--grid-gutter));\n}\n\n.col-11 {\n  -ms-flex: 0 0 calc(91.66667% - var(--grid-gutter));\n  flex: 0 0 calc(91.66667% - var(--grid-gutter));\n  max-width: calc(91.66667% - var(--grid-gutter));\n}\n\n.col-11, .col-12 {\n  -webkit-box-flex: 0;\n}\n\n.col-12 {\n  -ms-flex: 0 0 calc(100% - var(--grid-gutter));\n  flex: 0 0 calc(100% - var(--grid-gutter));\n  max-width: calc(100% - var(--grid-gutter));\n}\n\n@media screen and (max-width: 599px) {\n  .container {\n    width: 100%;\n  }\n\n  .col, [class*=col-], [class^=col-] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 1 100%;\n    flex: 0 1 100%;\n    max-width: 100%;\n  }\n}\n@media screen and (min-width: 900px) {\n  .col-1-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(8.33333% - var(--grid-gutter));\n    flex: 0 0 calc(8.33333% - var(--grid-gutter));\n    max-width: calc(8.33333% - var(--grid-gutter));\n  }\n\n  .col-2-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(16.66667% - var(--grid-gutter));\n    flex: 0 0 calc(16.66667% - var(--grid-gutter));\n    max-width: calc(16.66667% - var(--grid-gutter));\n  }\n\n  .col-3-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(25% - var(--grid-gutter));\n    flex: 0 0 calc(25% - var(--grid-gutter));\n    max-width: calc(25% - var(--grid-gutter));\n  }\n\n  .col-4-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(33.33333% - var(--grid-gutter));\n    flex: 0 0 calc(33.33333% - var(--grid-gutter));\n    max-width: calc(33.33333% - var(--grid-gutter));\n  }\n\n  .col-5-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(41.66667% - var(--grid-gutter));\n    flex: 0 0 calc(41.66667% - var(--grid-gutter));\n    max-width: calc(41.66667% - var(--grid-gutter));\n  }\n\n  .col-6-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(50% - var(--grid-gutter));\n    flex: 0 0 calc(50% - var(--grid-gutter));\n    max-width: calc(50% - var(--grid-gutter));\n  }\n\n  .col-7-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(58.33333% - var(--grid-gutter));\n    flex: 0 0 calc(58.33333% - var(--grid-gutter));\n    max-width: calc(58.33333% - var(--grid-gutter));\n  }\n\n  .col-8-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(66.66667% - var(--grid-gutter));\n    flex: 0 0 calc(66.66667% - var(--grid-gutter));\n    max-width: calc(66.66667% - var(--grid-gutter));\n  }\n\n  .col-9-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(75% - var(--grid-gutter));\n    flex: 0 0 calc(75% - var(--grid-gutter));\n    max-width: calc(75% - var(--grid-gutter));\n  }\n\n  .col-10-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(83.33333% - var(--grid-gutter));\n    flex: 0 0 calc(83.33333% - var(--grid-gutter));\n    max-width: calc(83.33333% - var(--grid-gutter));\n  }\n\n  .col-11-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(91.66667% - var(--grid-gutter));\n    flex: 0 0 calc(91.66667% - var(--grid-gutter));\n    max-width: calc(91.66667% - var(--grid-gutter));\n  }\n\n  .col-12-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(100% - var(--grid-gutter));\n    flex: 0 0 calc(100% - var(--grid-gutter));\n    max-width: calc(100% - var(--grid-gutter));\n  }\n}\n@media screen and (min-width: 1200px) {\n  .col-1-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(8.33333% - var(--grid-gutter));\n    flex: 0 0 calc(8.33333% - var(--grid-gutter));\n    max-width: calc(8.33333% - var(--grid-gutter));\n  }\n\n  .col-2-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(16.66667% - var(--grid-gutter));\n    flex: 0 0 calc(16.66667% - var(--grid-gutter));\n    max-width: calc(16.66667% - var(--grid-gutter));\n  }\n\n  .col-3-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(25% - var(--grid-gutter));\n    flex: 0 0 calc(25% - var(--grid-gutter));\n    max-width: calc(25% - var(--grid-gutter));\n  }\n\n  .col-4-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(33.33333% - var(--grid-gutter));\n    flex: 0 0 calc(33.33333% - var(--grid-gutter));\n    max-width: calc(33.33333% - var(--grid-gutter));\n  }\n\n  .col-5-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(41.66667% - var(--grid-gutter));\n    flex: 0 0 calc(41.66667% - var(--grid-gutter));\n    max-width: calc(41.66667% - var(--grid-gutter));\n  }\n\n  .col-6-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(50% - var(--grid-gutter));\n    flex: 0 0 calc(50% - var(--grid-gutter));\n    max-width: calc(50% - var(--grid-gutter));\n  }\n\n  .col-7-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(58.33333% - var(--grid-gutter));\n    flex: 0 0 calc(58.33333% - var(--grid-gutter));\n    max-width: calc(58.33333% - var(--grid-gutter));\n  }\n\n  .col-8-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(66.66667% - var(--grid-gutter));\n    flex: 0 0 calc(66.66667% - var(--grid-gutter));\n    max-width: calc(66.66667% - var(--grid-gutter));\n  }\n\n  .col-9-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(75% - var(--grid-gutter));\n    flex: 0 0 calc(75% - var(--grid-gutter));\n    max-width: calc(75% - var(--grid-gutter));\n  }\n\n  .col-10-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(83.33333% - var(--grid-gutter));\n    flex: 0 0 calc(83.33333% - var(--grid-gutter));\n    max-width: calc(83.33333% - var(--grid-gutter));\n  }\n\n  .col-11-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(91.66667% - var(--grid-gutter));\n    flex: 0 0 calc(91.66667% - var(--grid-gutter));\n    max-width: calc(91.66667% - var(--grid-gutter));\n  }\n\n  .col-12-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(100% - var(--grid-gutter));\n    flex: 0 0 calc(100% - var(--grid-gutter));\n    max-width: calc(100% - var(--grid-gutter));\n  }\n}\nfieldset {\n  padding: 0.5rem 2rem;\n}\n\nlegend {\n  text-transform: uppercase;\n  font-size: 0.8em;\n  letter-spacing: 0.1rem;\n}\n\ninput:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=color]):not([type=button]):not([type=reset]), select, textarea, textarea[type=text] {\n  font-family: inherit;\n  padding: 0.8rem 1rem;\n  border-radius: 4px;\n  border: 1px solid var(--color-lightGrey);\n  font-size: 1em;\n  -webkit-transition: all 0.2s ease;\n  transition: all 0.2s ease;\n  display: block;\n  width: 100%;\n}\n\ninput:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=color]):not([type=button]):not([type=reset]):not(:disabled):hover, select:hover, textarea:hover, textarea[type=text]:hover {\n  border-color: var(--color-grey);\n}\n\ninput:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=color]):not([type=button]):not([type=reset]):focus, select:focus, textarea:focus, textarea[type=text]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  -webkit-box-shadow: 0 0 1px var(--color-primary);\n  box-shadow: 0 0 1px var(--color-primary);\n}\n\ninput.error:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=color]):not([type=button]):not([type=reset]), textarea.error {\n  border-color: var(--color-error);\n}\n\ninput.success:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=color]):not([type=button]):not([type=reset]), textarea.success {\n  border-color: var(--color-success);\n}\n\nselect {\n  -webkit-appearance: none;\n  background: #f3f3f6 no-repeat 100%;\n  background-size: 1ex;\n  background-origin: content-box;\n  background-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='40' fill='%23555'><polygon points='0,0 60,0 30,40'/></svg>\");\n}\n\n[type=checkbox], [type=radio] {\n  width: 1.6rem;\n  height: 1.6rem;\n}\n\n.button, [type=button], [type=reset], [type=submit], button {\n  padding: 1rem 2.5rem;\n  color: var(--color-darkGrey);\n  background: var(--color-lightGrey);\n  border-radius: 4px;\n  border: 1px solid transparent;\n  font-size: var(--font-size);\n  line-height: 1;\n  text-align: center;\n  -webkit-transition: opacity 0.2s ease;\n  transition: opacity 0.2s ease;\n  text-decoration: none;\n  -webkit-transform: scale(1);\n  transform: scale(1);\n  display: inline-block;\n  cursor: pointer;\n}\n\n.grouped {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.grouped > :not(:last-child) {\n  margin-right: 16px;\n}\n\n.grouped.gapless > * {\n  margin: 0 0 0 -1px !important;\n  border-radius: 0 !important;\n}\n\n.grouped.gapless > :first-child {\n  margin: 0 !important;\n  border-radius: 4px 0 0 4px !important;\n}\n\n.grouped.gapless > :last-child {\n  border-radius: 0 4px 4px 0 !important;\n}\n\n.button + .button {\n  margin-left: 1rem;\n}\n\n.button:hover, [type=button]:hover, [type=reset]:hover, [type=submit]:hover, button:hover {\n  opacity: 0.8;\n}\n\n.button:active, [type=button]:active, [type=reset]:active, [type=submit]:active, button:active {\n  -webkit-transform: scale(0.98);\n  transform: scale(0.98);\n}\n\nbutton:disabled, button:disabled:hover, input:disabled, input:disabled:hover {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n\n.button.dark, .button.error, .button.primary, .button.secondary, .button.success, [type=submit] {\n  color: #fff;\n  z-index: 1;\n  background-color: #000;\n  background-color: var(--color-primary);\n}\n\n.button.secondary {\n  background-color: var(--color-grey);\n}\n\n.button.dark {\n  background-color: var(--color-darkGrey);\n}\n\n.button.error {\n  background-color: var(--color-error);\n}\n\n.button.success {\n  background-color: var(--color-success);\n}\n\n.button.outline {\n  background-color: transparent;\n  border-color: var(--color-lightGrey);\n}\n\n.button.outline.primary {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n\n.button.outline.secondary {\n  border-color: var(--color-grey);\n  color: var(--color-grey);\n}\n\n.button.outline.dark {\n  border-color: var(--color-darkGrey);\n  color: var(--color-darkGrey);\n}\n\n.button.clear {\n  background-color: transparent;\n  border-color: transparent;\n  color: var(--color-primary);\n}\n\n.button.icon {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.button.icon > img {\n  margin-left: 2px;\n}\n\n.button.icon-only {\n  padding: 1rem;\n}\n\n::-webkit-input-placeholder {\n  color: #bdbfc4;\n}\n\n::-moz-placeholder {\n  color: #bdbfc4;\n}\n\n:-ms-input-placeholder {\n  color: #bdbfc4;\n}\n\n::-ms-input-placeholder {\n  color: #bdbfc4;\n}\n\n::placeholder {\n  color: #bdbfc4;\n}\n\n.nav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 5rem;\n  -webkit-box-align: stretch;\n  -ms-flex-align: stretch;\n  align-items: stretch;\n}\n\n.nav img {\n  max-height: 3rem;\n}\n\n.nav-center, .nav-left, .nav-right, .nav > .container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.nav-center, .nav-left, .nav-right {\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n}\n\n.nav-left {\n  -webkit-box-pack: start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n}\n\n.nav-right {\n  -webkit-box-pack: end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n}\n\n.nav-center {\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n\n@media screen and (max-width: 480px) {\n  .nav, .nav > .container {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n  }\n\n  .nav-center, .nav-left, .nav-right {\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n  }\n}\n.nav .brand, .nav a {\n  text-decoration: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  padding: 1rem 2rem;\n  color: var(--color-darkGrey);\n}\n\n.nav .active:not(.button) {\n  color: #000;\n  color: var(--color-primary);\n}\n\n.nav .brand {\n  font-size: 1.75em;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\n.nav .brand img {\n  padding-right: 1rem;\n}\n\n.nav .button {\n  margin: auto 1rem;\n}\n\n.card {\n  padding: 1rem 2rem;\n  border-radius: 4px;\n  background: var(--bg-color);\n  -webkit-box-shadow: 0 1px 3px var(--color-grey);\n  box-shadow: 0 1px 3px var(--color-grey);\n}\n\n.card p:last-child {\n  margin: 0;\n}\n\n.card header > * {\n  margin-top: 0;\n  margin-bottom: 1rem;\n}\n\n.tabs {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.tabs a {\n  text-decoration: none;\n}\n\n.tabs > .dropdown > summary, .tabs > a {\n  padding: 1rem 2rem;\n  -webkit-box-flex: 0;\n  -ms-flex: 0 1 auto;\n  flex: 0 1 auto;\n  color: var(--color-darkGrey);\n  border-bottom: 2px solid var(--color-lightGrey);\n  text-align: center;\n}\n\n.tabs > a.active, .tabs > a:hover {\n  opacity: 1;\n  border-bottom: 2px solid var(--color-darkGrey);\n}\n\n.tabs > a.active {\n  border-color: var(--color-primary);\n}\n\n.tabs.is-full a {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n}\n\n.tag {\n  display: inline-block;\n  border: 1px solid var(--color-lightGrey);\n  text-transform: uppercase;\n  color: var(--color-grey);\n  padding: 0.5rem;\n  line-height: 1;\n  letter-spacing: 0.5px;\n}\n\n.tag.is-small {\n  padding: 0.4rem;\n  font-size: 0.75em;\n}\n\n.tag.is-large {\n  padding: 0.7rem;\n  font-size: 1.125em;\n}\n\n.tag + .tag {\n  margin-left: 1rem;\n}\n\ndetails.dropdown {\n  position: relative;\n  display: inline-block;\n}\n\ndetails.dropdown > :last-child {\n  position: absolute;\n  left: 0;\n  white-space: nowrap;\n}\n\n.bg-primary {\n  background-color: var(--color-primary) !important;\n}\n\n.bg-light {\n  background-color: var(--color-lightGrey) !important;\n}\n\n.bg-dark {\n  background-color: var(--color-darkGrey) !important;\n}\n\n.bg-grey {\n  background-color: var(--color-grey) !important;\n}\n\n.bg-error {\n  background-color: var(--color-error) !important;\n}\n\n.bg-success {\n  background-color: var(--color-success) !important;\n}\n\n.bd-primary {\n  border: 1px solid var(--color-primary) !important;\n}\n\n.bd-light {\n  border: 1px solid var(--color-lightGrey) !important;\n}\n\n.bd-dark {\n  border: 1px solid var(--color-darkGrey) !important;\n}\n\n.bd-grey {\n  border: 1px solid var(--color-grey) !important;\n}\n\n.bd-error {\n  border: 1px solid var(--color-error) !important;\n}\n\n.bd-success {\n  border: 1px solid var(--color-success) !important;\n}\n\n.text-primary {\n  color: var(--color-primary) !important;\n}\n\n.text-light {\n  color: var(--color-lightGrey) !important;\n}\n\n.text-dark {\n  color: var(--color-darkGrey) !important;\n}\n\n.text-grey {\n  color: var(--color-grey) !important;\n}\n\n.text-error {\n  color: var(--color-error) !important;\n}\n\n.text-success {\n  color: var(--color-success) !important;\n}\n\n.text-white {\n  color: #fff !important;\n}\n\n.pull-right {\n  float: right !important;\n}\n\n.pull-left {\n  float: left !important;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.text-justify {\n  text-align: justify;\n}\n\n.text-uppercase {\n  text-transform: uppercase;\n}\n\n.text-lowercase {\n  text-transform: lowercase;\n}\n\n.text-capitalize {\n  text-transform: capitalize;\n}\n\n.is-full-screen {\n  width: 100%;\n  min-height: 100vh;\n}\n\n.is-full-width {\n  width: 100% !important;\n}\n\n.is-vertical-align {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.is-center, .is-horizontal-align {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n\n.is-center {\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.is-right {\n  -webkit-box-pack: end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n}\n\n.is-left, .is-right {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.is-left {\n  -webkit-box-pack: start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n}\n\n.is-fixed {\n  position: fixed;\n  width: 100%;\n}\n\n.is-paddingless {\n  padding: 0 !important;\n}\n\n.is-marginless {\n  margin: 0 !important;\n}\n\n.is-pointer {\n  cursor: pointer !important;\n}\n\n.is-rounded {\n  border-radius: 100%;\n}\n\n.clearfix {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n\n.is-hidden {\n  display: none !important;\n}\n\n@media screen and (max-width: 599px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 600px) and (max-width: 899px) {\n  .hide-sm {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 900px) and (max-width: 1199px) {\n  .hide-md {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 1200px) {\n  .hide-lg {\n    display: none !important;\n  }\n}\n@media print {\n  .hide-pr {\n    display: none !important;\n  }\n}", "",{"version":3,"sources":["D:/Projects/tuckerweddingwebsite/node_modules/chota/dist/chota.min.css","chota.min.css"],"names":[],"mappings":"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","file":"chota.min.css","sourcesContent":["/*! chota.css v0.7.2 | MIT License | github.com/jenil/chota */:root{--bg-color:#fff;--bg-secondary-color:#f3f3f6;--color-primary:#14854f;--color-lightGrey:#d2d6dd;--color-grey:#747681;--color-darkGrey:#3f4144;--color-error:#d43939;--color-success:#28bd14;--grid-maxWidth:120rem;--grid-gutter:2rem;--font-size:1.6rem;--font-color:#333;--font-family-sans:-apple-system,BlinkMacSystemFont,Avenir,\"Avenir Next\",\"Segoe UI\",\"Roboto\",\"Oxygen\",\"Ubuntu\",\"Cantarell\",\"Fira Sans\",\"Droid Sans\",\"Helvetica Neue\",sans-serif;--font-family-mono:monaco,\"Consolas\",\"Lucida Console\",monospace}html{-webkit-box-sizing:border-box;box-sizing:border-box;font-size:62.5%;line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}*,:after,:before{-webkit-box-sizing:inherit;box-sizing:inherit}body{background-color:var(--bg-color);line-height:1.6;font-size:var(--font-size);color:var(--font-color);font-family:Segoe UI,Helvetica Neue,sans-serif;font-family:var(--font-family-sans);margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-weight:500;margin:.35em 0 .7em}h1{font-size:2em}h2{font-size:1.75em}h3{font-size:1.5em}h4{font-size:1.25em}h5{font-size:1em}h6{font-size:.85em}a{color:var(--color-primary);text-decoration:none}a:hover:not(.button){opacity:.75}button{font-family:inherit}p{margin-top:0}blockquote{background-color:var(--bg-secondary-color);padding:1.5rem 2rem;border-left:3px solid var(--color-lightGrey)}dl dt{font-weight:700}hr{background-color:var(--color-lightGrey);height:1px;margin:1rem 0}hr,table{border:none}table{width:100%;border-collapse:collapse;border-spacing:0;text-align:left}table.striped tr:nth-of-type(2n){background-color:var(--bg-secondary-color)}td,th{vertical-align:middle;padding:1.2rem .4rem}thead{border-bottom:2px solid var(--color-lightGrey)}tfoot{border-top:2px solid var(--color-lightGrey)}code,kbd,pre,samp,tt{font-family:var(--font-family-mono)}code,kbd{font-size:90%;white-space:pre-wrap;border-radius:4px;padding:.2em .4em;color:var(--color-error)}code,kbd,pre{background-color:var(--bg-secondary-color)}pre{font-size:1em;padding:1rem;overflow-x:auto}pre code{background:none;padding:0}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}img{max-width:100%}fieldset{border:1px solid var(--color-lightGrey)}iframe{border:0}.container{max-width:var(--grid-maxWidth);margin:0 auto;width:96%;padding:0 calc(var(--grid-gutter)/2)}.row{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;margin-left:calc(var(--grid-gutter)/-2);margin-right:calc(var(--grid-gutter)/-2)}.row,.row.reverse{-webkit-box-orient:horizontal}.row.reverse{-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.col{-webkit-box-flex:1;-ms-flex:1;flex:1}.col,[class*=\" col-\"],[class^=col-]{margin:0 calc(var(--grid-gutter)/2) calc(var(--grid-gutter)/2)}.col-1{-ms-flex:0 0 calc(8.33333% - var(--grid-gutter));flex:0 0 calc(8.33333% - var(--grid-gutter));max-width:calc(8.33333% - var(--grid-gutter))}.col-1,.col-2{-webkit-box-flex:0}.col-2{-ms-flex:0 0 calc(16.66667% - var(--grid-gutter));flex:0 0 calc(16.66667% - var(--grid-gutter));max-width:calc(16.66667% - var(--grid-gutter))}.col-3{-ms-flex:0 0 calc(25% - var(--grid-gutter));flex:0 0 calc(25% - var(--grid-gutter));max-width:calc(25% - var(--grid-gutter))}.col-3,.col-4{-webkit-box-flex:0}.col-4{-ms-flex:0 0 calc(33.33333% - var(--grid-gutter));flex:0 0 calc(33.33333% - var(--grid-gutter));max-width:calc(33.33333% - var(--grid-gutter))}.col-5{-ms-flex:0 0 calc(41.66667% - var(--grid-gutter));flex:0 0 calc(41.66667% - var(--grid-gutter));max-width:calc(41.66667% - var(--grid-gutter))}.col-5,.col-6{-webkit-box-flex:0}.col-6{-ms-flex:0 0 calc(50% - var(--grid-gutter));flex:0 0 calc(50% - var(--grid-gutter));max-width:calc(50% - var(--grid-gutter))}.col-7{-ms-flex:0 0 calc(58.33333% - var(--grid-gutter));flex:0 0 calc(58.33333% - var(--grid-gutter));max-width:calc(58.33333% - var(--grid-gutter))}.col-7,.col-8{-webkit-box-flex:0}.col-8{-ms-flex:0 0 calc(66.66667% - var(--grid-gutter));flex:0 0 calc(66.66667% - var(--grid-gutter));max-width:calc(66.66667% - var(--grid-gutter))}.col-9{-ms-flex:0 0 calc(75% - var(--grid-gutter));flex:0 0 calc(75% - var(--grid-gutter));max-width:calc(75% - var(--grid-gutter))}.col-9,.col-10{-webkit-box-flex:0}.col-10{-ms-flex:0 0 calc(83.33333% - var(--grid-gutter));flex:0 0 calc(83.33333% - var(--grid-gutter));max-width:calc(83.33333% - var(--grid-gutter))}.col-11{-ms-flex:0 0 calc(91.66667% - var(--grid-gutter));flex:0 0 calc(91.66667% - var(--grid-gutter));max-width:calc(91.66667% - var(--grid-gutter))}.col-11,.col-12{-webkit-box-flex:0}.col-12{-ms-flex:0 0 calc(100% - var(--grid-gutter));flex:0 0 calc(100% - var(--grid-gutter));max-width:calc(100% - var(--grid-gutter))}@media screen and (max-width:599px){.container{width:100%}.col,[class*=col-],[class^=col-]{-webkit-box-flex:0;-ms-flex:0 1 100%;flex:0 1 100%;max-width:100%}}@media screen and (min-width:900px){.col-1-md{-webkit-box-flex:0;-ms-flex:0 0 calc(8.33333% - var(--grid-gutter));flex:0 0 calc(8.33333% - var(--grid-gutter));max-width:calc(8.33333% - var(--grid-gutter))}.col-2-md{-webkit-box-flex:0;-ms-flex:0 0 calc(16.66667% - var(--grid-gutter));flex:0 0 calc(16.66667% - var(--grid-gutter));max-width:calc(16.66667% - var(--grid-gutter))}.col-3-md{-webkit-box-flex:0;-ms-flex:0 0 calc(25% - var(--grid-gutter));flex:0 0 calc(25% - var(--grid-gutter));max-width:calc(25% - var(--grid-gutter))}.col-4-md{-webkit-box-flex:0;-ms-flex:0 0 calc(33.33333% - var(--grid-gutter));flex:0 0 calc(33.33333% - var(--grid-gutter));max-width:calc(33.33333% - var(--grid-gutter))}.col-5-md{-webkit-box-flex:0;-ms-flex:0 0 calc(41.66667% - var(--grid-gutter));flex:0 0 calc(41.66667% - var(--grid-gutter));max-width:calc(41.66667% - var(--grid-gutter))}.col-6-md{-webkit-box-flex:0;-ms-flex:0 0 calc(50% - var(--grid-gutter));flex:0 0 calc(50% - var(--grid-gutter));max-width:calc(50% - var(--grid-gutter))}.col-7-md{-webkit-box-flex:0;-ms-flex:0 0 calc(58.33333% - var(--grid-gutter));flex:0 0 calc(58.33333% - var(--grid-gutter));max-width:calc(58.33333% - var(--grid-gutter))}.col-8-md{-webkit-box-flex:0;-ms-flex:0 0 calc(66.66667% - var(--grid-gutter));flex:0 0 calc(66.66667% - var(--grid-gutter));max-width:calc(66.66667% - var(--grid-gutter))}.col-9-md{-webkit-box-flex:0;-ms-flex:0 0 calc(75% - var(--grid-gutter));flex:0 0 calc(75% - var(--grid-gutter));max-width:calc(75% - var(--grid-gutter))}.col-10-md{-webkit-box-flex:0;-ms-flex:0 0 calc(83.33333% - var(--grid-gutter));flex:0 0 calc(83.33333% - var(--grid-gutter));max-width:calc(83.33333% - var(--grid-gutter))}.col-11-md{-webkit-box-flex:0;-ms-flex:0 0 calc(91.66667% - var(--grid-gutter));flex:0 0 calc(91.66667% - var(--grid-gutter));max-width:calc(91.66667% - var(--grid-gutter))}.col-12-md{-webkit-box-flex:0;-ms-flex:0 0 calc(100% - var(--grid-gutter));flex:0 0 calc(100% - var(--grid-gutter));max-width:calc(100% - var(--grid-gutter))}}@media screen and (min-width:1200px){.col-1-lg{-webkit-box-flex:0;-ms-flex:0 0 calc(8.33333% - var(--grid-gutter));flex:0 0 calc(8.33333% - var(--grid-gutter));max-width:calc(8.33333% - var(--grid-gutter))}.col-2-lg{-webkit-box-flex:0;-ms-flex:0 0 calc(16.66667% - var(--grid-gutter));flex:0 0 calc(16.66667% - var(--grid-gutter));max-width:calc(16.66667% - var(--grid-gutter))}.col-3-lg{-webkit-box-flex:0;-ms-flex:0 0 calc(25% - var(--grid-gutter));flex:0 0 calc(25% - var(--grid-gutter));max-width:calc(25% - var(--grid-gutter))}.col-4-lg{-webkit-box-flex:0;-ms-flex:0 0 calc(33.33333% - var(--grid-gutter));flex:0 0 calc(33.33333% - var(--grid-gutter));max-width:calc(33.33333% - var(--grid-gutter))}.col-5-lg{-webkit-box-flex:0;-ms-flex:0 0 calc(41.66667% - var(--grid-gutter));flex:0 0 calc(41.66667% - var(--grid-gutter));max-width:calc(41.66667% - var(--grid-gutter))}.col-6-lg{-webkit-box-flex:0;-ms-flex:0 0 calc(50% - var(--grid-gutter));flex:0 0 calc(50% - var(--grid-gutter));max-width:calc(50% - var(--grid-gutter))}.col-7-lg{-webkit-box-flex:0;-ms-flex:0 0 calc(58.33333% - var(--grid-gutter));flex:0 0 calc(58.33333% - var(--grid-gutter));max-width:calc(58.33333% - var(--grid-gutter))}.col-8-lg{-webkit-box-flex:0;-ms-flex:0 0 calc(66.66667% - var(--grid-gutter));flex:0 0 calc(66.66667% - var(--grid-gutter));max-width:calc(66.66667% - var(--grid-gutter))}.col-9-lg{-webkit-box-flex:0;-ms-flex:0 0 calc(75% - var(--grid-gutter));flex:0 0 calc(75% - var(--grid-gutter));max-width:calc(75% - var(--grid-gutter))}.col-10-lg{-webkit-box-flex:0;-ms-flex:0 0 calc(83.33333% - var(--grid-gutter));flex:0 0 calc(83.33333% - var(--grid-gutter));max-width:calc(83.33333% - var(--grid-gutter))}.col-11-lg{-webkit-box-flex:0;-ms-flex:0 0 calc(91.66667% - var(--grid-gutter));flex:0 0 calc(91.66667% - var(--grid-gutter));max-width:calc(91.66667% - var(--grid-gutter))}.col-12-lg{-webkit-box-flex:0;-ms-flex:0 0 calc(100% - var(--grid-gutter));flex:0 0 calc(100% - var(--grid-gutter));max-width:calc(100% - var(--grid-gutter))}}fieldset{padding:.5rem 2rem}legend{text-transform:uppercase;font-size:.8em;letter-spacing:.1rem}input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=color]):not([type=button]):not([type=reset]),select,textarea,textarea[type=text]{font-family:inherit;padding:.8rem 1rem;border-radius:4px;border:1px solid var(--color-lightGrey);font-size:1em;-webkit-transition:all .2s ease;transition:all .2s ease;display:block;width:100%}input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=color]):not([type=button]):not([type=reset]):not(:disabled):hover,select:hover,textarea:hover,textarea[type=text]:hover{border-color:var(--color-grey)}input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=color]):not([type=button]):not([type=reset]):focus,select:focus,textarea:focus,textarea[type=text]:focus{outline:none;border-color:var(--color-primary);-webkit-box-shadow:0 0 1px var(--color-primary);box-shadow:0 0 1px var(--color-primary)}input.error:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=color]):not([type=button]):not([type=reset]),textarea.error{border-color:var(--color-error)}input.success:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=color]):not([type=button]):not([type=reset]),textarea.success{border-color:var(--color-success)}select{-webkit-appearance:none;background:#f3f3f6 no-repeat 100%;background-size:1ex;background-origin:content-box;background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='40' fill='%23555'><polygon points='0,0 60,0 30,40'/></svg>\")}[type=checkbox],[type=radio]{width:1.6rem;height:1.6rem}.button,[type=button],[type=reset],[type=submit],button{padding:1rem 2.5rem;color:var(--color-darkGrey);background:var(--color-lightGrey);border-radius:4px;border:1px solid transparent;font-size:var(--font-size);line-height:1;text-align:center;-webkit-transition:opacity .2s ease;transition:opacity .2s ease;text-decoration:none;-webkit-transform:scale(1);transform:scale(1);display:inline-block;cursor:pointer}.grouped{display:-webkit-box;display:-ms-flexbox;display:flex}.grouped>:not(:last-child){margin-right:16px}.grouped.gapless>*{margin:0 0 0 -1px!important;border-radius:0!important}.grouped.gapless>:first-child{margin:0!important;border-radius:4px 0 0 4px!important}.grouped.gapless>:last-child{border-radius:0 4px 4px 0!important}.button+.button{margin-left:1rem}.button:hover,[type=button]:hover,[type=reset]:hover,[type=submit]:hover,button:hover{opacity:.8}.button:active,[type=button]:active,[type=reset]:active,[type=submit]:active,button:active{-webkit-transform:scale(.98);transform:scale(.98)}button:disabled,button:disabled:hover,input:disabled,input:disabled:hover{opacity:.4;cursor:not-allowed}.button.dark,.button.error,.button.primary,.button.secondary,.button.success,[type=submit]{color:#fff;z-index:1;background-color:#000;background-color:var(--color-primary)}.button.secondary{background-color:var(--color-grey)}.button.dark{background-color:var(--color-darkGrey)}.button.error{background-color:var(--color-error)}.button.success{background-color:var(--color-success)}.button.outline{background-color:transparent;border-color:var(--color-lightGrey)}.button.outline.primary{border-color:var(--color-primary);color:var(--color-primary)}.button.outline.secondary{border-color:var(--color-grey);color:var(--color-grey)}.button.outline.dark{border-color:var(--color-darkGrey);color:var(--color-darkGrey)}.button.clear{background-color:transparent;border-color:transparent;color:var(--color-primary)}.button.icon{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.button.icon>img{margin-left:2px}.button.icon-only{padding:1rem}::-webkit-input-placeholder{color:#bdbfc4}::-moz-placeholder{color:#bdbfc4}:-ms-input-placeholder{color:#bdbfc4}::-ms-input-placeholder{color:#bdbfc4}::placeholder{color:#bdbfc4}.nav{display:-webkit-box;display:-ms-flexbox;display:flex;min-height:5rem;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.nav img{max-height:3rem}.nav-center,.nav-left,.nav-right,.nav>.container{display:-webkit-box;display:-ms-flexbox;display:flex}.nav-center,.nav-left,.nav-right{-webkit-box-flex:1;-ms-flex:1;flex:1}.nav-left{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.nav-right{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.nav-center{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}@media screen and (max-width:480px){.nav,.nav>.container{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.nav-center,.nav-left,.nav-right{-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}}.nav .brand,.nav a{text-decoration:none;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:1rem 2rem;color:var(--color-darkGrey)}.nav .active:not(.button){color:#000;color:var(--color-primary)}.nav .brand{font-size:1.75em;padding-top:0;padding-bottom:0}.nav .brand img{padding-right:1rem}.nav .button{margin:auto 1rem}.card{padding:1rem 2rem;border-radius:4px;background:var(--bg-color);-webkit-box-shadow:0 1px 3px var(--color-grey);box-shadow:0 1px 3px var(--color-grey)}.card p:last-child{margin:0}.card header>*{margin-top:0;margin-bottom:1rem}.tabs{display:-webkit-box;display:-ms-flexbox;display:flex}.tabs a{text-decoration:none}.tabs>.dropdown>summary,.tabs>a{padding:1rem 2rem;-webkit-box-flex:0;-ms-flex:0 1 auto;flex:0 1 auto;color:var(--color-darkGrey);border-bottom:2px solid var(--color-lightGrey);text-align:center}.tabs>a.active,.tabs>a:hover{opacity:1;border-bottom:2px solid var(--color-darkGrey)}.tabs>a.active{border-color:var(--color-primary)}.tabs.is-full a{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}.tag{display:inline-block;border:1px solid var(--color-lightGrey);text-transform:uppercase;color:var(--color-grey);padding:.5rem;line-height:1;letter-spacing:.5px}.tag.is-small{padding:.4rem;font-size:.75em}.tag.is-large{padding:.7rem;font-size:1.125em}.tag+.tag{margin-left:1rem}details.dropdown{position:relative;display:inline-block}details.dropdown>:last-child{position:absolute;left:0;white-space:nowrap}.bg-primary{background-color:var(--color-primary)!important}.bg-light{background-color:var(--color-lightGrey)!important}.bg-dark{background-color:var(--color-darkGrey)!important}.bg-grey{background-color:var(--color-grey)!important}.bg-error{background-color:var(--color-error)!important}.bg-success{background-color:var(--color-success)!important}.bd-primary{border:1px solid var(--color-primary)!important}.bd-light{border:1px solid var(--color-lightGrey)!important}.bd-dark{border:1px solid var(--color-darkGrey)!important}.bd-grey{border:1px solid var(--color-grey)!important}.bd-error{border:1px solid var(--color-error)!important}.bd-success{border:1px solid var(--color-success)!important}.text-primary{color:var(--color-primary)!important}.text-light{color:var(--color-lightGrey)!important}.text-dark{color:var(--color-darkGrey)!important}.text-grey{color:var(--color-grey)!important}.text-error{color:var(--color-error)!important}.text-success{color:var(--color-success)!important}.text-white{color:#fff!important}.pull-right{float:right!important}.pull-left{float:left!important}.text-center{text-align:center}.text-left{text-align:left}.text-right{text-align:right}.text-justify{text-align:justify}.text-uppercase{text-transform:uppercase}.text-lowercase{text-transform:lowercase}.text-capitalize{text-transform:capitalize}.is-full-screen{width:100%;min-height:100vh}.is-full-width{width:100%!important}.is-vertical-align{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.is-center,.is-horizontal-align{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.is-center{-webkit-box-align:center;-ms-flex-align:center;align-items:center}.is-right{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.is-left,.is-right{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.is-left{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.is-fixed{position:fixed;width:100%}.is-paddingless{padding:0!important}.is-marginless{margin:0!important}.is-pointer{cursor:pointer!important}.is-rounded{border-radius:100%}.clearfix{content:\"\";display:table;clear:both}.is-hidden{display:none!important}@media screen and (max-width:599px){.hide-xs{display:none!important}}@media screen and (min-width:600px) and (max-width:899px){.hide-sm{display:none!important}}@media screen and (min-width:900px) and (max-width:1199px){.hide-md{display:none!important}}@media screen and (min-width:1200px){.hide-lg{display:none!important}}@media print{.hide-pr{display:none!important}}","/*! chota.css v0.7.2 | MIT License | github.com/jenil/chota */\n:root {\n  --bg-color:#fff;\n  --bg-secondary-color:#f3f3f6;\n  --color-primary:#14854f;\n  --color-lightGrey:#d2d6dd;\n  --color-grey:#747681;\n  --color-darkGrey:#3f4144;\n  --color-error:#d43939;\n  --color-success:#28bd14;\n  --grid-maxWidth:120rem;\n  --grid-gutter:2rem;\n  --font-size:1.6rem;\n  --font-color:#333;\n  --font-family-sans:-apple-system,BlinkMacSystemFont,Avenir,\"Avenir Next\",\"Segoe UI\",\"Roboto\",\"Oxygen\",\"Ubuntu\",\"Cantarell\",\"Fira Sans\",\"Droid Sans\",\"Helvetica Neue\",sans-serif;\n  --font-family-mono:monaco,\"Consolas\",\"Lucida Console\",monospace;\n}\n\nhtml {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  font-size: 62.5%;\n  line-height: 1.15;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\n\n*, :after, :before {\n  -webkit-box-sizing: inherit;\n  box-sizing: inherit;\n}\n\nbody {\n  background-color: var(--bg-color);\n  line-height: 1.6;\n  font-size: var(--font-size);\n  color: var(--font-color);\n  font-family: Segoe UI, Helvetica Neue, sans-serif;\n  font-family: var(--font-family-sans);\n  margin: 0;\n  padding: 0;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  font-weight: 500;\n  margin: 0.35em 0 0.7em;\n}\n\nh1 {\n  font-size: 2em;\n}\n\nh2 {\n  font-size: 1.75em;\n}\n\nh3 {\n  font-size: 1.5em;\n}\n\nh4 {\n  font-size: 1.25em;\n}\n\nh5 {\n  font-size: 1em;\n}\n\nh6 {\n  font-size: 0.85em;\n}\n\na {\n  color: var(--color-primary);\n  text-decoration: none;\n}\n\na:hover:not(.button) {\n  opacity: 0.75;\n}\n\nbutton {\n  font-family: inherit;\n}\n\np {\n  margin-top: 0;\n}\n\nblockquote {\n  background-color: var(--bg-secondary-color);\n  padding: 1.5rem 2rem;\n  border-left: 3px solid var(--color-lightGrey);\n}\n\ndl dt {\n  font-weight: 700;\n}\n\nhr {\n  background-color: var(--color-lightGrey);\n  height: 1px;\n  margin: 1rem 0;\n}\n\nhr, table {\n  border: none;\n}\n\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n  text-align: left;\n}\n\ntable.striped tr:nth-of-type(2n) {\n  background-color: var(--bg-secondary-color);\n}\n\ntd, th {\n  vertical-align: middle;\n  padding: 1.2rem 0.4rem;\n}\n\nthead {\n  border-bottom: 2px solid var(--color-lightGrey);\n}\n\ntfoot {\n  border-top: 2px solid var(--color-lightGrey);\n}\n\ncode, kbd, pre, samp, tt {\n  font-family: var(--font-family-mono);\n}\n\ncode, kbd {\n  font-size: 90%;\n  white-space: pre-wrap;\n  border-radius: 4px;\n  padding: 0.2em 0.4em;\n  color: var(--color-error);\n}\n\ncode, kbd, pre {\n  background-color: var(--bg-secondary-color);\n}\n\npre {\n  font-size: 1em;\n  padding: 1rem;\n  overflow-x: auto;\n}\n\npre code {\n  background: none;\n  padding: 0;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline;\n  -webkit-text-decoration: underline dotted;\n  text-decoration: underline dotted;\n}\n\nimg {\n  max-width: 100%;\n}\n\nfieldset {\n  border: 1px solid var(--color-lightGrey);\n}\n\niframe {\n  border: 0;\n}\n\n.container {\n  max-width: var(--grid-maxWidth);\n  margin: 0 auto;\n  width: 96%;\n  padding: 0 calc(var(--grid-gutter)/2);\n}\n\n.row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-direction: normal;\n  -ms-flex-flow: row wrap;\n  flex-flow: row wrap;\n  -webkit-box-pack: start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n  margin-left: calc(var(--grid-gutter)/-2);\n  margin-right: calc(var(--grid-gutter)/-2);\n}\n\n.row, .row.reverse {\n  -webkit-box-orient: horizontal;\n}\n\n.row.reverse {\n  -webkit-box-direction: reverse;\n  -ms-flex-direction: row-reverse;\n  flex-direction: row-reverse;\n}\n\n.col {\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n}\n\n.col, [class*=\" col-\"], [class^=col-] {\n  margin: 0 calc(var(--grid-gutter)/2) calc(var(--grid-gutter)/2);\n}\n\n.col-1 {\n  -ms-flex: 0 0 calc(8.33333% - var(--grid-gutter));\n  flex: 0 0 calc(8.33333% - var(--grid-gutter));\n  max-width: calc(8.33333% - var(--grid-gutter));\n}\n\n.col-1, .col-2 {\n  -webkit-box-flex: 0;\n}\n\n.col-2 {\n  -ms-flex: 0 0 calc(16.66667% - var(--grid-gutter));\n  flex: 0 0 calc(16.66667% - var(--grid-gutter));\n  max-width: calc(16.66667% - var(--grid-gutter));\n}\n\n.col-3 {\n  -ms-flex: 0 0 calc(25% - var(--grid-gutter));\n  flex: 0 0 calc(25% - var(--grid-gutter));\n  max-width: calc(25% - var(--grid-gutter));\n}\n\n.col-3, .col-4 {\n  -webkit-box-flex: 0;\n}\n\n.col-4 {\n  -ms-flex: 0 0 calc(33.33333% - var(--grid-gutter));\n  flex: 0 0 calc(33.33333% - var(--grid-gutter));\n  max-width: calc(33.33333% - var(--grid-gutter));\n}\n\n.col-5 {\n  -ms-flex: 0 0 calc(41.66667% - var(--grid-gutter));\n  flex: 0 0 calc(41.66667% - var(--grid-gutter));\n  max-width: calc(41.66667% - var(--grid-gutter));\n}\n\n.col-5, .col-6 {\n  -webkit-box-flex: 0;\n}\n\n.col-6 {\n  -ms-flex: 0 0 calc(50% - var(--grid-gutter));\n  flex: 0 0 calc(50% - var(--grid-gutter));\n  max-width: calc(50% - var(--grid-gutter));\n}\n\n.col-7 {\n  -ms-flex: 0 0 calc(58.33333% - var(--grid-gutter));\n  flex: 0 0 calc(58.33333% - var(--grid-gutter));\n  max-width: calc(58.33333% - var(--grid-gutter));\n}\n\n.col-7, .col-8 {\n  -webkit-box-flex: 0;\n}\n\n.col-8 {\n  -ms-flex: 0 0 calc(66.66667% - var(--grid-gutter));\n  flex: 0 0 calc(66.66667% - var(--grid-gutter));\n  max-width: calc(66.66667% - var(--grid-gutter));\n}\n\n.col-9 {\n  -ms-flex: 0 0 calc(75% - var(--grid-gutter));\n  flex: 0 0 calc(75% - var(--grid-gutter));\n  max-width: calc(75% - var(--grid-gutter));\n}\n\n.col-9, .col-10 {\n  -webkit-box-flex: 0;\n}\n\n.col-10 {\n  -ms-flex: 0 0 calc(83.33333% - var(--grid-gutter));\n  flex: 0 0 calc(83.33333% - var(--grid-gutter));\n  max-width: calc(83.33333% - var(--grid-gutter));\n}\n\n.col-11 {\n  -ms-flex: 0 0 calc(91.66667% - var(--grid-gutter));\n  flex: 0 0 calc(91.66667% - var(--grid-gutter));\n  max-width: calc(91.66667% - var(--grid-gutter));\n}\n\n.col-11, .col-12 {\n  -webkit-box-flex: 0;\n}\n\n.col-12 {\n  -ms-flex: 0 0 calc(100% - var(--grid-gutter));\n  flex: 0 0 calc(100% - var(--grid-gutter));\n  max-width: calc(100% - var(--grid-gutter));\n}\n\n@media screen and (max-width: 599px) {\n  .container {\n    width: 100%;\n  }\n\n  .col, [class*=col-], [class^=col-] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 1 100%;\n    flex: 0 1 100%;\n    max-width: 100%;\n  }\n}\n@media screen and (min-width: 900px) {\n  .col-1-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(8.33333% - var(--grid-gutter));\n    flex: 0 0 calc(8.33333% - var(--grid-gutter));\n    max-width: calc(8.33333% - var(--grid-gutter));\n  }\n\n  .col-2-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(16.66667% - var(--grid-gutter));\n    flex: 0 0 calc(16.66667% - var(--grid-gutter));\n    max-width: calc(16.66667% - var(--grid-gutter));\n  }\n\n  .col-3-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(25% - var(--grid-gutter));\n    flex: 0 0 calc(25% - var(--grid-gutter));\n    max-width: calc(25% - var(--grid-gutter));\n  }\n\n  .col-4-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(33.33333% - var(--grid-gutter));\n    flex: 0 0 calc(33.33333% - var(--grid-gutter));\n    max-width: calc(33.33333% - var(--grid-gutter));\n  }\n\n  .col-5-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(41.66667% - var(--grid-gutter));\n    flex: 0 0 calc(41.66667% - var(--grid-gutter));\n    max-width: calc(41.66667% - var(--grid-gutter));\n  }\n\n  .col-6-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(50% - var(--grid-gutter));\n    flex: 0 0 calc(50% - var(--grid-gutter));\n    max-width: calc(50% - var(--grid-gutter));\n  }\n\n  .col-7-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(58.33333% - var(--grid-gutter));\n    flex: 0 0 calc(58.33333% - var(--grid-gutter));\n    max-width: calc(58.33333% - var(--grid-gutter));\n  }\n\n  .col-8-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(66.66667% - var(--grid-gutter));\n    flex: 0 0 calc(66.66667% - var(--grid-gutter));\n    max-width: calc(66.66667% - var(--grid-gutter));\n  }\n\n  .col-9-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(75% - var(--grid-gutter));\n    flex: 0 0 calc(75% - var(--grid-gutter));\n    max-width: calc(75% - var(--grid-gutter));\n  }\n\n  .col-10-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(83.33333% - var(--grid-gutter));\n    flex: 0 0 calc(83.33333% - var(--grid-gutter));\n    max-width: calc(83.33333% - var(--grid-gutter));\n  }\n\n  .col-11-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(91.66667% - var(--grid-gutter));\n    flex: 0 0 calc(91.66667% - var(--grid-gutter));\n    max-width: calc(91.66667% - var(--grid-gutter));\n  }\n\n  .col-12-md {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(100% - var(--grid-gutter));\n    flex: 0 0 calc(100% - var(--grid-gutter));\n    max-width: calc(100% - var(--grid-gutter));\n  }\n}\n@media screen and (min-width: 1200px) {\n  .col-1-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(8.33333% - var(--grid-gutter));\n    flex: 0 0 calc(8.33333% - var(--grid-gutter));\n    max-width: calc(8.33333% - var(--grid-gutter));\n  }\n\n  .col-2-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(16.66667% - var(--grid-gutter));\n    flex: 0 0 calc(16.66667% - var(--grid-gutter));\n    max-width: calc(16.66667% - var(--grid-gutter));\n  }\n\n  .col-3-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(25% - var(--grid-gutter));\n    flex: 0 0 calc(25% - var(--grid-gutter));\n    max-width: calc(25% - var(--grid-gutter));\n  }\n\n  .col-4-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(33.33333% - var(--grid-gutter));\n    flex: 0 0 calc(33.33333% - var(--grid-gutter));\n    max-width: calc(33.33333% - var(--grid-gutter));\n  }\n\n  .col-5-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(41.66667% - var(--grid-gutter));\n    flex: 0 0 calc(41.66667% - var(--grid-gutter));\n    max-width: calc(41.66667% - var(--grid-gutter));\n  }\n\n  .col-6-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(50% - var(--grid-gutter));\n    flex: 0 0 calc(50% - var(--grid-gutter));\n    max-width: calc(50% - var(--grid-gutter));\n  }\n\n  .col-7-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(58.33333% - var(--grid-gutter));\n    flex: 0 0 calc(58.33333% - var(--grid-gutter));\n    max-width: calc(58.33333% - var(--grid-gutter));\n  }\n\n  .col-8-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(66.66667% - var(--grid-gutter));\n    flex: 0 0 calc(66.66667% - var(--grid-gutter));\n    max-width: calc(66.66667% - var(--grid-gutter));\n  }\n\n  .col-9-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(75% - var(--grid-gutter));\n    flex: 0 0 calc(75% - var(--grid-gutter));\n    max-width: calc(75% - var(--grid-gutter));\n  }\n\n  .col-10-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(83.33333% - var(--grid-gutter));\n    flex: 0 0 calc(83.33333% - var(--grid-gutter));\n    max-width: calc(83.33333% - var(--grid-gutter));\n  }\n\n  .col-11-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(91.66667% - var(--grid-gutter));\n    flex: 0 0 calc(91.66667% - var(--grid-gutter));\n    max-width: calc(91.66667% - var(--grid-gutter));\n  }\n\n  .col-12-lg {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 calc(100% - var(--grid-gutter));\n    flex: 0 0 calc(100% - var(--grid-gutter));\n    max-width: calc(100% - var(--grid-gutter));\n  }\n}\nfieldset {\n  padding: 0.5rem 2rem;\n}\n\nlegend {\n  text-transform: uppercase;\n  font-size: 0.8em;\n  letter-spacing: 0.1rem;\n}\n\ninput:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=color]):not([type=button]):not([type=reset]), select, textarea, textarea[type=text] {\n  font-family: inherit;\n  padding: 0.8rem 1rem;\n  border-radius: 4px;\n  border: 1px solid var(--color-lightGrey);\n  font-size: 1em;\n  -webkit-transition: all 0.2s ease;\n  transition: all 0.2s ease;\n  display: block;\n  width: 100%;\n}\n\ninput:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=color]):not([type=button]):not([type=reset]):not(:disabled):hover, select:hover, textarea:hover, textarea[type=text]:hover {\n  border-color: var(--color-grey);\n}\n\ninput:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=color]):not([type=button]):not([type=reset]):focus, select:focus, textarea:focus, textarea[type=text]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  -webkit-box-shadow: 0 0 1px var(--color-primary);\n  box-shadow: 0 0 1px var(--color-primary);\n}\n\ninput.error:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=color]):not([type=button]):not([type=reset]), textarea.error {\n  border-color: var(--color-error);\n}\n\ninput.success:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=color]):not([type=button]):not([type=reset]), textarea.success {\n  border-color: var(--color-success);\n}\n\nselect {\n  -webkit-appearance: none;\n  background: #f3f3f6 no-repeat 100%;\n  background-size: 1ex;\n  background-origin: content-box;\n  background-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='40' fill='%23555'><polygon points='0,0 60,0 30,40'/></svg>\");\n}\n\n[type=checkbox], [type=radio] {\n  width: 1.6rem;\n  height: 1.6rem;\n}\n\n.button, [type=button], [type=reset], [type=submit], button {\n  padding: 1rem 2.5rem;\n  color: var(--color-darkGrey);\n  background: var(--color-lightGrey);\n  border-radius: 4px;\n  border: 1px solid transparent;\n  font-size: var(--font-size);\n  line-height: 1;\n  text-align: center;\n  -webkit-transition: opacity 0.2s ease;\n  transition: opacity 0.2s ease;\n  text-decoration: none;\n  -webkit-transform: scale(1);\n  transform: scale(1);\n  display: inline-block;\n  cursor: pointer;\n}\n\n.grouped {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.grouped > :not(:last-child) {\n  margin-right: 16px;\n}\n\n.grouped.gapless > * {\n  margin: 0 0 0 -1px !important;\n  border-radius: 0 !important;\n}\n\n.grouped.gapless > :first-child {\n  margin: 0 !important;\n  border-radius: 4px 0 0 4px !important;\n}\n\n.grouped.gapless > :last-child {\n  border-radius: 0 4px 4px 0 !important;\n}\n\n.button + .button {\n  margin-left: 1rem;\n}\n\n.button:hover, [type=button]:hover, [type=reset]:hover, [type=submit]:hover, button:hover {\n  opacity: 0.8;\n}\n\n.button:active, [type=button]:active, [type=reset]:active, [type=submit]:active, button:active {\n  -webkit-transform: scale(0.98);\n  transform: scale(0.98);\n}\n\nbutton:disabled, button:disabled:hover, input:disabled, input:disabled:hover {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n\n.button.dark, .button.error, .button.primary, .button.secondary, .button.success, [type=submit] {\n  color: #fff;\n  z-index: 1;\n  background-color: #000;\n  background-color: var(--color-primary);\n}\n\n.button.secondary {\n  background-color: var(--color-grey);\n}\n\n.button.dark {\n  background-color: var(--color-darkGrey);\n}\n\n.button.error {\n  background-color: var(--color-error);\n}\n\n.button.success {\n  background-color: var(--color-success);\n}\n\n.button.outline {\n  background-color: transparent;\n  border-color: var(--color-lightGrey);\n}\n\n.button.outline.primary {\n  border-color: var(--color-primary);\n  color: var(--color-primary);\n}\n\n.button.outline.secondary {\n  border-color: var(--color-grey);\n  color: var(--color-grey);\n}\n\n.button.outline.dark {\n  border-color: var(--color-darkGrey);\n  color: var(--color-darkGrey);\n}\n\n.button.clear {\n  background-color: transparent;\n  border-color: transparent;\n  color: var(--color-primary);\n}\n\n.button.icon {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.button.icon > img {\n  margin-left: 2px;\n}\n\n.button.icon-only {\n  padding: 1rem;\n}\n\n::-webkit-input-placeholder {\n  color: #bdbfc4;\n}\n\n::-moz-placeholder {\n  color: #bdbfc4;\n}\n\n:-ms-input-placeholder {\n  color: #bdbfc4;\n}\n\n::-ms-input-placeholder {\n  color: #bdbfc4;\n}\n\n::placeholder {\n  color: #bdbfc4;\n}\n\n.nav {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 5rem;\n  -webkit-box-align: stretch;\n  -ms-flex-align: stretch;\n  align-items: stretch;\n}\n\n.nav img {\n  max-height: 3rem;\n}\n\n.nav-center, .nav-left, .nav-right, .nav > .container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.nav-center, .nav-left, .nav-right {\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n}\n\n.nav-left {\n  -webkit-box-pack: start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n}\n\n.nav-right {\n  -webkit-box-pack: end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n}\n\n.nav-center {\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n\n@media screen and (max-width: 480px) {\n  .nav, .nav > .container {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n  }\n\n  .nav-center, .nav-left, .nav-right {\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n  }\n}\n.nav .brand, .nav a {\n  text-decoration: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  padding: 1rem 2rem;\n  color: var(--color-darkGrey);\n}\n\n.nav .active:not(.button) {\n  color: #000;\n  color: var(--color-primary);\n}\n\n.nav .brand {\n  font-size: 1.75em;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\n.nav .brand img {\n  padding-right: 1rem;\n}\n\n.nav .button {\n  margin: auto 1rem;\n}\n\n.card {\n  padding: 1rem 2rem;\n  border-radius: 4px;\n  background: var(--bg-color);\n  -webkit-box-shadow: 0 1px 3px var(--color-grey);\n  box-shadow: 0 1px 3px var(--color-grey);\n}\n\n.card p:last-child {\n  margin: 0;\n}\n\n.card header > * {\n  margin-top: 0;\n  margin-bottom: 1rem;\n}\n\n.tabs {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.tabs a {\n  text-decoration: none;\n}\n\n.tabs > .dropdown > summary, .tabs > a {\n  padding: 1rem 2rem;\n  -webkit-box-flex: 0;\n  -ms-flex: 0 1 auto;\n  flex: 0 1 auto;\n  color: var(--color-darkGrey);\n  border-bottom: 2px solid var(--color-lightGrey);\n  text-align: center;\n}\n\n.tabs > a.active, .tabs > a:hover {\n  opacity: 1;\n  border-bottom: 2px solid var(--color-darkGrey);\n}\n\n.tabs > a.active {\n  border-color: var(--color-primary);\n}\n\n.tabs.is-full a {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n}\n\n.tag {\n  display: inline-block;\n  border: 1px solid var(--color-lightGrey);\n  text-transform: uppercase;\n  color: var(--color-grey);\n  padding: 0.5rem;\n  line-height: 1;\n  letter-spacing: 0.5px;\n}\n\n.tag.is-small {\n  padding: 0.4rem;\n  font-size: 0.75em;\n}\n\n.tag.is-large {\n  padding: 0.7rem;\n  font-size: 1.125em;\n}\n\n.tag + .tag {\n  margin-left: 1rem;\n}\n\ndetails.dropdown {\n  position: relative;\n  display: inline-block;\n}\n\ndetails.dropdown > :last-child {\n  position: absolute;\n  left: 0;\n  white-space: nowrap;\n}\n\n.bg-primary {\n  background-color: var(--color-primary) !important;\n}\n\n.bg-light {\n  background-color: var(--color-lightGrey) !important;\n}\n\n.bg-dark {\n  background-color: var(--color-darkGrey) !important;\n}\n\n.bg-grey {\n  background-color: var(--color-grey) !important;\n}\n\n.bg-error {\n  background-color: var(--color-error) !important;\n}\n\n.bg-success {\n  background-color: var(--color-success) !important;\n}\n\n.bd-primary {\n  border: 1px solid var(--color-primary) !important;\n}\n\n.bd-light {\n  border: 1px solid var(--color-lightGrey) !important;\n}\n\n.bd-dark {\n  border: 1px solid var(--color-darkGrey) !important;\n}\n\n.bd-grey {\n  border: 1px solid var(--color-grey) !important;\n}\n\n.bd-error {\n  border: 1px solid var(--color-error) !important;\n}\n\n.bd-success {\n  border: 1px solid var(--color-success) !important;\n}\n\n.text-primary {\n  color: var(--color-primary) !important;\n}\n\n.text-light {\n  color: var(--color-lightGrey) !important;\n}\n\n.text-dark {\n  color: var(--color-darkGrey) !important;\n}\n\n.text-grey {\n  color: var(--color-grey) !important;\n}\n\n.text-error {\n  color: var(--color-error) !important;\n}\n\n.text-success {\n  color: var(--color-success) !important;\n}\n\n.text-white {\n  color: #fff !important;\n}\n\n.pull-right {\n  float: right !important;\n}\n\n.pull-left {\n  float: left !important;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.text-justify {\n  text-align: justify;\n}\n\n.text-uppercase {\n  text-transform: uppercase;\n}\n\n.text-lowercase {\n  text-transform: lowercase;\n}\n\n.text-capitalize {\n  text-transform: capitalize;\n}\n\n.is-full-screen {\n  width: 100%;\n  min-height: 100vh;\n}\n\n.is-full-width {\n  width: 100% !important;\n}\n\n.is-vertical-align {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.is-center, .is-horizontal-align {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n\n.is-center {\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.is-right {\n  -webkit-box-pack: end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n}\n\n.is-left, .is-right {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.is-left {\n  -webkit-box-pack: start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n}\n\n.is-fixed {\n  position: fixed;\n  width: 100%;\n}\n\n.is-paddingless {\n  padding: 0 !important;\n}\n\n.is-marginless {\n  margin: 0 !important;\n}\n\n.is-pointer {\n  cursor: pointer !important;\n}\n\n.is-rounded {\n  border-radius: 100%;\n}\n\n.clearfix {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n\n.is-hidden {\n  display: none !important;\n}\n\n@media screen and (max-width: 599px) {\n  .hide-xs {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 600px) and (max-width: 899px) {\n  .hide-sm {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 900px) and (max-width: 1199px) {\n  .hide-md {\n    display: none !important;\n  }\n}\n@media screen and (min-width: 1200px) {\n  .hide-lg {\n    display: none !important;\n  }\n}\n@media print {\n  .hide-pr {\n    display: none !important;\n  }\n}"]}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/svelte/index.mjs":
/*!***************************************!*\
  !*** ./node_modules/svelte/index.mjs ***!
  \***************************************/
/*! exports provided: SvelteComponent, afterUpdate, beforeUpdate, createEventDispatcher, getContext, onDestroy, onMount, setContext, tick */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SvelteComponent", function() { return _internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "afterUpdate", function() { return _internal__WEBPACK_IMPORTED_MODULE_0__["afterUpdate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "beforeUpdate", function() { return _internal__WEBPACK_IMPORTED_MODULE_0__["beforeUpdate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createEventDispatcher", function() { return _internal__WEBPACK_IMPORTED_MODULE_0__["createEventDispatcher"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getContext", function() { return _internal__WEBPACK_IMPORTED_MODULE_0__["getContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onDestroy", function() { return _internal__WEBPACK_IMPORTED_MODULE_0__["onDestroy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onMount", function() { return _internal__WEBPACK_IMPORTED_MODULE_0__["onMount"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setContext", function() { return _internal__WEBPACK_IMPORTED_MODULE_0__["setContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tick", function() { return _internal__WEBPACK_IMPORTED_MODULE_0__["tick"]; });




/***/ }),

/***/ "./node_modules/svelte/internal/index.mjs":
/*!************************************************!*\
  !*** ./node_modules/svelte/internal/index.mjs ***!
  \************************************************/
/*! exports provided: HtmlTag, SvelteComponent, SvelteComponentDev, SvelteElement, action_destroyer, add_attribute, add_classes, add_flush_callback, add_location, add_render_callback, add_resize_listener, add_transform, afterUpdate, append, append_dev, assign, attr, attr_dev, beforeUpdate, bind, binding_callbacks, blank_object, bubble, check_outros, children, claim_component, claim_element, claim_space, claim_text, clear_loops, component_subscribe, compute_rest_props, createEventDispatcher, create_animation, create_bidirectional_transition, create_component, create_in_transition, create_out_transition, create_slot, create_ssr_component, current_component, custom_event, dataset_dev, debug, destroy_block, destroy_component, destroy_each, detach, detach_after_dev, detach_before_dev, detach_between_dev, detach_dev, dirty_components, dispatch_dev, each, element, element_is, empty, escape, escaped, exclude_internal_props, fix_and_destroy_block, fix_and_outro_and_destroy_block, fix_position, flush, getContext, get_binding_group_value, get_current_component, get_slot_changes, get_slot_context, get_spread_object, get_spread_update, get_store_value, globals, group_outros, handle_promise, has_prop, identity, init, insert, insert_dev, intros, invalid_attribute_name_character, is_client, is_crossorigin, is_function, is_promise, listen, listen_dev, loop, loop_guard, missing_component, mount_component, noop, not_equal, now, null_to_empty, object_without_properties, onDestroy, onMount, once, outro_and_destroy_block, prevent_default, prop_dev, query_selector_all, raf, run, run_all, safe_not_equal, schedule_update, select_multiple_value, select_option, select_options, select_value, self, setContext, set_attributes, set_current_component, set_custom_element_data, set_data, set_data_dev, set_input_type, set_input_value, set_now, set_raf, set_store_value, set_style, set_svg_attributes, space, spread, stop_propagation, subscribe, svg_element, text, tick, time_ranges_to_array, to_number, toggle_class, transition_in, transition_out, update_keyed_each, update_slot, validate_component, validate_each_argument, validate_each_keys, validate_slots, validate_store, xlink_attr */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HtmlTag", function() { return HtmlTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SvelteComponent", function() { return SvelteComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SvelteComponentDev", function() { return SvelteComponentDev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SvelteElement", function() { return SvelteElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "action_destroyer", function() { return action_destroyer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_attribute", function() { return add_attribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_classes", function() { return add_classes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_flush_callback", function() { return add_flush_callback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_location", function() { return add_location; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_render_callback", function() { return add_render_callback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_resize_listener", function() { return add_resize_listener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_transform", function() { return add_transform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "afterUpdate", function() { return afterUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append", function() { return append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append_dev", function() { return append_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attr", function() { return attr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attr_dev", function() { return attr_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "beforeUpdate", function() { return beforeUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bind", function() { return bind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "binding_callbacks", function() { return binding_callbacks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blank_object", function() { return blank_object; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bubble", function() { return bubble; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "check_outros", function() { return check_outros; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "children", function() { return children; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claim_component", function() { return claim_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claim_element", function() { return claim_element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claim_space", function() { return claim_space; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "claim_text", function() { return claim_text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clear_loops", function() { return clear_loops; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "component_subscribe", function() { return component_subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compute_rest_props", function() { return compute_rest_props; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEventDispatcher", function() { return createEventDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_animation", function() { return create_animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_bidirectional_transition", function() { return create_bidirectional_transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_component", function() { return create_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_in_transition", function() { return create_in_transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_out_transition", function() { return create_out_transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_slot", function() { return create_slot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_ssr_component", function() { return create_ssr_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "current_component", function() { return current_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "custom_event", function() { return custom_event; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataset_dev", function() { return dataset_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debug", function() { return debug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroy_block", function() { return destroy_block; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroy_component", function() { return destroy_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroy_each", function() { return destroy_each; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detach", function() { return detach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detach_after_dev", function() { return detach_after_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detach_before_dev", function() { return detach_before_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detach_between_dev", function() { return detach_between_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detach_dev", function() { return detach_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dirty_components", function() { return dirty_components; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispatch_dev", function() { return dispatch_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "each", function() { return each; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "element", function() { return element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "element_is", function() { return element_is; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escape", function() { return escape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escaped", function() { return escaped; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exclude_internal_props", function() { return exclude_internal_props; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fix_and_destroy_block", function() { return fix_and_destroy_block; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fix_and_outro_and_destroy_block", function() { return fix_and_outro_and_destroy_block; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fix_position", function() { return fix_position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flush", function() { return flush; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContext", function() { return getContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_binding_group_value", function() { return get_binding_group_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_current_component", function() { return get_current_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_slot_changes", function() { return get_slot_changes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_slot_context", function() { return get_slot_context; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_spread_object", function() { return get_spread_object; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_spread_update", function() { return get_spread_update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_store_value", function() { return get_store_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "globals", function() { return globals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "group_outros", function() { return group_outros; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handle_promise", function() { return handle_promise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has_prop", function() { return has_prop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insert", function() { return insert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insert_dev", function() { return insert_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intros", function() { return intros; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invalid_attribute_name_character", function() { return invalid_attribute_name_character; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_client", function() { return is_client; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_crossorigin", function() { return is_crossorigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_function", function() { return is_function; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_promise", function() { return is_promise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listen", function() { return listen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listen_dev", function() { return listen_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loop", function() { return loop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loop_guard", function() { return loop_guard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "missing_component", function() { return missing_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mount_component", function() { return mount_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "not_equal", function() { return not_equal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "now", function() { return now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "null_to_empty", function() { return null_to_empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "object_without_properties", function() { return object_without_properties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onDestroy", function() { return onDestroy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onMount", function() { return onMount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "once", function() { return once; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "outro_and_destroy_block", function() { return outro_and_destroy_block; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prevent_default", function() { return prevent_default; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prop_dev", function() { return prop_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query_selector_all", function() { return query_selector_all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raf", function() { return raf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "run", function() { return run; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "run_all", function() { return run_all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safe_not_equal", function() { return safe_not_equal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schedule_update", function() { return schedule_update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select_multiple_value", function() { return select_multiple_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select_option", function() { return select_option; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select_options", function() { return select_options; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select_value", function() { return select_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "self", function() { return self; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setContext", function() { return setContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_attributes", function() { return set_attributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_current_component", function() { return set_current_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_custom_element_data", function() { return set_custom_element_data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_data", function() { return set_data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_data_dev", function() { return set_data_dev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_input_type", function() { return set_input_type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_input_value", function() { return set_input_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_now", function() { return set_now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_raf", function() { return set_raf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_store_value", function() { return set_store_value; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_style", function() { return set_style; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_svg_attributes", function() { return set_svg_attributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "space", function() { return space; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spread", function() { return spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stop_propagation", function() { return stop_propagation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svg_element", function() { return svg_element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "text", function() { return text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tick", function() { return tick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "time_ranges_to_array", function() { return time_ranges_to_array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "to_number", function() { return to_number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggle_class", function() { return toggle_class; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transition_in", function() { return transition_in; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transition_out", function() { return transition_out; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_keyed_each", function() { return update_keyed_each; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_slot", function() { return update_slot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_component", function() { return validate_component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_each_argument", function() { return validate_each_argument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_each_keys", function() { return validate_each_keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_slots", function() { return validate_slots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_store", function() { return validate_store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xlink_attr", function() { return xlink_attr; });
function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function is_promise(value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function not_equal(a, b) {
    return a != a ? b == b : a !== b;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}
function once(fn) {
    let ran = false;
    return function (...args) {
        if (ran)
            return;
        ran = true;
        fn.call(this, ...args);
    };
}
function null_to_empty(value) {
    return value == null ? '' : value;
}
function set_store_value(store, ret, value = ret) {
    store.set(value);
    return ret;
}
const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;
// used internally for testing
function set_now(fn) {
    now = fn;
}
function set_raf(fn) {
    raf = fn;
}

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * For testing purposes only!
 */
function clear_loops() {
    tasks.clear();
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function element_is(name, is) {
    return document.createElement(name, { is });
}
function object_without_properties(obj, exclude) {
    const target = {};
    for (const k in obj) {
        if (has_prop(obj, k)
            // @ts-ignore
            && exclude.indexOf(k) === -1) {
            // @ts-ignore
            target[k] = obj[k];
        }
    }
    return target;
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function self(fn) {
    return function (event) {
        // @ts-ignore
        if (event.target === this)
            fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function set_svg_attributes(node, attributes) {
    for (const key in attributes) {
        attr(node, key, attributes[key]);
    }
}
function set_custom_element_data(node, prop, value) {
    if (prop in node) {
        node[prop] = value;
    }
    else {
        attr(node, prop, value);
    }
}
function xlink_attr(node, attribute, value) {
    node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}
function get_binding_group_value(group, __value, checked) {
    const value = new Set();
    for (let i = 0; i < group.length; i += 1) {
        if (group[i].checked)
            value.add(group[i].__value);
    }
    if (!checked) {
        value.delete(__value);
    }
    return Array.from(value);
}
function to_number(value) {
    return value === '' ? undefined : +value;
}
function time_ranges_to_array(ranges) {
    const array = [];
    for (let i = 0; i < ranges.length; i += 1) {
        array.push({ start: ranges.start(i), end: ranges.end(i) });
    }
    return array;
}
function children(element) {
    return Array.from(element.childNodes);
}
function claim_element(nodes, name, attributes, svg) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeName === name) {
            let j = 0;
            const remove = [];
            while (j < node.attributes.length) {
                const attribute = node.attributes[j++];
                if (!attributes[attribute.name]) {
                    remove.push(attribute.name);
                }
            }
            for (let k = 0; k < remove.length; k++) {
                node.removeAttribute(remove[k]);
            }
            return nodes.splice(i, 1)[0];
        }
    }
    return svg ? svg_element(name) : element(name);
}
function claim_text(nodes, data) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 3) {
            node.data = '' + data;
            return nodes.splice(i, 1)[0];
        }
    }
    return text(data);
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function set_data(text, data) {
    data = '' + data;
    if (text.data !== data)
        text.data = data;
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_input_type(input, type) {
    try {
        input.type = type;
    }
    catch (e) {
        // do nothing
    }
}
function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
}
function select_options(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        option.selected = ~value.indexOf(option.__value);
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked') || select.options[0];
    return selected_option && selected_option.__value;
}
function select_multiple_value(select) {
    return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin;
function is_crossorigin() {
    if (crossorigin === undefined) {
        crossorigin = false;
        try {
            if (typeof window !== 'undefined' && window.parent) {
                void window.parent.document;
            }
        }
        catch (error) {
            crossorigin = true;
        }
    }
    return crossorigin;
}
function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    const z_index = (parseInt(computed_style.zIndex) || 0) - 1;
    if (computed_style.position === 'static') {
        node.style.position = 'relative';
    }
    const iframe = element('iframe');
    iframe.setAttribute('style', `display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ` +
        `overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: ${z_index};`);
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    const crossorigin = is_crossorigin();
    let unsubscribe;
    if (crossorigin) {
        iframe.src = `data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>`;
        unsubscribe = listen(window, 'message', (event) => {
            if (event.source === iframe.contentWindow)
                fn();
        });
    }
    else {
        iframe.src = 'about:blank';
        iframe.onload = () => {
            unsubscribe = listen(iframe.contentWindow, 'resize', fn);
        };
    }
    append(node, iframe);
    return () => {
        if (crossorigin) {
            unsubscribe();
        }
        else if (unsubscribe && iframe.contentWindow) {
            unsubscribe();
        }
        detach(iframe);
    };
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}
class HtmlTag {
    constructor(anchor = null) {
        this.a = anchor;
        this.e = this.n = null;
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            this.e = element(target.nodeName);
            this.t = target;
            this.h(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}

const active_docs = new Set();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = node.ownerDocument;
    active_docs.add(doc);
    const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
    const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
    if (!current_rules[name]) {
        current_rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        active_docs.forEach(doc => {
            const stylesheet = doc.__svelte_stylesheet;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            doc.__svelte_rules = {};
        });
        active_docs.clear();
    });
}

function create_animation(node, from, fn, params) {
    if (!from)
        return noop;
    const to = node.getBoundingClientRect();
    if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
        return noop;
    const { delay = 0, duration = 300, easing = identity, 
    // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
    start: start_time = now() + delay, 
    // @ts-ignore todo:
    end = start_time + duration, tick = noop, css } = fn(node, { from, to }, params);
    let running = true;
    let started = false;
    let name;
    function start() {
        if (css) {
            name = create_rule(node, 0, 1, duration, delay, easing, css);
        }
        if (!delay) {
            started = true;
        }
    }
    function stop() {
        if (css)
            delete_rule(node, name);
        running = false;
    }
    loop(now => {
        if (!started && now >= start_time) {
            started = true;
        }
        if (started && now >= end) {
            tick(1, 0);
            stop();
        }
        if (!running) {
            return false;
        }
        if (started) {
            const p = now - start_time;
            const t = 0 + 1 * easing(p / duration);
            tick(t, 1 - t);
        }
        return true;
    });
    start();
    tick(0, 1);
    return stop;
}
function fix_position(node) {
    const style = getComputedStyle(node);
    if (style.position !== 'absolute' && style.position !== 'fixed') {
        const { width, height } = style;
        const a = node.getBoundingClientRect();
        node.style.position = 'absolute';
        node.style.width = width;
        node.style.height = height;
        add_transform(node, a);
    }
}
function add_transform(node, a) {
    const b = node.getBoundingClientRect();
    if (a.left !== b.left || a.top !== b.top) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
    }
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        callbacks.slice().forEach(fn => fn(event));
    }
}

const dirty_components = [];
const intros = { enabled: false };
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    let config = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            delete_rule(node);
            if (is_function(config)) {
                config = config();
                wait().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    let config = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) {
        wait().then(() => {
            // @ts-ignore
            config = config();
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = program.b - t;
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

function handle_promise(promise, info) {
    const token = info.token = {};
    function update(type, index, key, value) {
        if (info.token !== token)
            return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== undefined) {
            child_ctx = child_ctx.slice();
            child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
            if (info.blocks) {
                info.blocks.forEach((block, i) => {
                    if (i !== index && block) {
                        group_outros();
                        transition_out(block, 1, 1, () => {
                            info.blocks[i] = null;
                        });
                        check_outros();
                    }
                });
            }
            else {
                info.block.d(1);
            }
            block.c();
            transition_in(block, 1);
            block.m(info.mount(), info.anchor);
            needs_flush = true;
        }
        info.block = block;
        if (info.blocks)
            info.blocks[index] = block;
        if (needs_flush) {
            flush();
        }
    }
    if (is_promise(promise)) {
        const current_component = get_current_component();
        promise.then(value => {
            set_current_component(current_component);
            update(info.then, 1, info.value, value);
            set_current_component(null);
        }, error => {
            set_current_component(current_component);
            update(info.catch, 2, info.error, error);
            set_current_component(null);
        });
        // if we previously had a then/catch block, destroy it
        if (info.current !== info.pending) {
            update(info.pending, 0);
            return true;
        }
    }
    else {
        if (info.current !== info.then) {
            update(info.then, 1, info.value, promise);
            return true;
        }
        info.resolved = promise;
    }
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function fix_and_destroy_block(block, lookup) {
    block.f();
    destroy_block(block, lookup);
}
function fix_and_outro_and_destroy_block(block, lookup) {
    block.f();
    outro_and_destroy_block(block, lookup);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error(`Cannot have duplicate keys in a keyed each`);
        }
        keys.add(key);
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

// source: https://html.spec.whatwg.org/multipage/indices.html
const boolean_attributes = new Set([
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected'
]);

const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args, classes_to_add) {
    const attributes = Object.assign({}, ...args);
    if (classes_to_add) {
        if (attributes.class == null) {
            attributes.class = classes_to_add;
        }
        else {
            attributes.class += ' ' + classes_to_add;
        }
    }
    let str = '';
    Object.keys(attributes).forEach(name => {
        if (invalid_attribute_name_character.test(name))
            return;
        const value = attributes[name];
        if (value === true)
            str += " " + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
            if (value)
                str += " " + name;
        }
        else if (value != null) {
            str += ` ${name}="${String(value).replace(/"/g, '&#34;').replace(/'/g, '&#39;')}"`;
        }
    });
    return str;
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
function debug(file, line, column, values) {
    console.log(`{@debug} ${file ? file + ' ' : ''}(${line}:${column})`); // eslint-disable-line no-console
    console.log(values); // eslint-disable-line no-console
    return '';
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function add_classes(classes) {
    return classes ? ` class="${classes}"` : ``;
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, prop_values, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if ($$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor);
        flush();
    }
    set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === 'function') {
    SvelteElement = class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            // @ts-ignore todo: improve typings
            for (const key in this.$$.slotted) {
                // @ts-ignore todo: improve typings
                this.appendChild(this.$$.slotted[key]);
            }
        }
        attributeChangedCallback(attr, _oldValue, newValue) {
            this[attr] = newValue;
        }
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            // TODO should this delegate to addEventListener?
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    };
}
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set() {
        // overridden by instance, if it has props
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.23.2' }, detail)));
}
function append_dev(target, node) {
    dispatch_dev("SvelteDOMInsert", { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev("SvelteDOMInsert", { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev("SvelteDOMRemove", { node });
    detach(node);
}
function detach_between_dev(before, after) {
    while (before.nextSibling && before.nextSibling !== after) {
        detach_dev(before.nextSibling);
    }
}
function detach_before_dev(after) {
    while (after.previousSibling) {
        detach_dev(after.previousSibling);
    }
}
function detach_after_dev(before) {
    while (before.nextSibling) {
        detach_dev(before.nextSibling);
    }
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
    else
        dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev("SvelteDOMSetProperty", { node, property, value });
}
function dataset_dev(node, property, value) {
    node.dataset[property] = value;
    dispatch_dev("SvelteDOMSetDataset", { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.data === data)
        return;
    dispatch_dev("SvelteDOMSetData", { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error(`'target' is a required option`);
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn(`Component was already destroyed`); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}
function loop_guard(timeout) {
    const start = Date.now();
    return () => {
        if (Date.now() - start > timeout) {
            throw new Error(`Infinite loop detected`);
        }
    };
}




/***/ }),

/***/ "./node_modules/svelte/store/index.mjs":
/*!*********************************************!*\
  !*** ./node_modules/svelte/store/index.mjs ***!
  \*********************************************/
/*! exports provided: get, derived, readable, writable */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "derived", function() { return derived; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readable", function() { return readable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writable", function() { return writable; });
/* harmony import */ var _internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "get", function() { return _internal__WEBPACK_IMPORTED_MODULE_0__["get_store_value"]; });




const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe,
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = _internal__WEBPACK_IMPORTED_MODULE_0__["noop"]) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (Object(_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"])(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = _internal__WEBPACK_IMPORTED_MODULE_0__["noop"]) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || _internal__WEBPACK_IMPORTED_MODULE_0__["noop"];
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}
function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single
        ? [stores]
        : stores;
    const auto = fn.length < 2;
    return readable(initial_value, (set) => {
        let inited = false;
        const values = [];
        let pending = 0;
        let cleanup = _internal__WEBPACK_IMPORTED_MODULE_0__["noop"];
        const sync = () => {
            if (pending) {
                return;
            }
            cleanup();
            const result = fn(single ? values[0] : values, set);
            if (auto) {
                set(result);
            }
            else {
                cleanup = Object(_internal__WEBPACK_IMPORTED_MODULE_0__["is_function"])(result) ? result : _internal__WEBPACK_IMPORTED_MODULE_0__["noop"];
            }
        };
        const unsubscribers = stores_array.map((store, i) => Object(_internal__WEBPACK_IMPORTED_MODULE_0__["subscribe"])(store, (value) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (inited) {
                sync();
            }
        }, () => {
            pending |= (1 << i);
        }));
        inited = true;
        sync();
        return function stop() {
            Object(_internal__WEBPACK_IMPORTED_MODULE_0__["run_all"])(unsubscribers);
            cleanup();
        };
    });
}




/***/ }),

/***/ "./src/client.ts":
/*!***********************!*\
  !*** ./src/client.ts ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sapper_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sapper/app */ "./src/node_modules/@sapper/app.mjs");
/* harmony import */ var chota__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chota */ "./node_modules/chota/dist/chota.min.css");
/* harmony import */ var chota__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chota__WEBPACK_IMPORTED_MODULE_1__);


_sapper_app__WEBPACK_IMPORTED_MODULE_0__["start"]({
    target: document.querySelector('#sapper')
});


/***/ }),

/***/ "./src/node_modules/@sapper/app.mjs":
/*!******************************************!*\
  !*** ./src/node_modules/@sapper/app.mjs ***!
  \******************************************/
/*! exports provided: goto, prefetch, prefetchRoutes, start, stores */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "goto", function() { return goto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefetch", function() { return prefetch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefetchRoutes", function() { return prefetchRoutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return start; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stores", function() { return stores$1; });
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _internal_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/shared */ "./src/node_modules/@sapper/internal/shared.mjs");
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");
/* harmony import */ var _internal_App_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/App.svelte */ "./src/node_modules/@sapper/internal/App.svelte");
/* harmony import */ var _internal_manifest_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/manifest-client */ "./src/node_modules/@sapper/internal/manifest-client.mjs");






function goto(href, opts = { replaceState: false }) {
	const target = select_target(new URL(href, document.baseURI));

	if (target) {
		_history[opts.replaceState ? 'replaceState' : 'pushState']({ id: cid }, '', href);
		return navigate(target, null).then(() => {});
	}

	location.href = href;
	return new Promise(f => {}); // never resolves
}

/** Callback to inform of a value updates. */



















function page_store(value) {
	const store = Object(svelte_store__WEBPACK_IMPORTED_MODULE_2__["writable"])(value);
	let ready = true;

	function notify() {
		ready = true;
		store.update(val => val);
	}

	function set(new_value) {
		ready = false;
		store.set(new_value);
	}

	function subscribe(run) {
		let old_value;
		return store.subscribe((value) => {
			if (old_value === undefined || (ready && value !== old_value)) {
				run(old_value = value);
			}
		});
	}

	return { notify, set, subscribe };
}

const initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;

let ready = false;
let root_component;
let current_token;
let root_preloaded;
let current_branch = [];
let current_query = '{}';

const stores = {
	page: page_store({}),
	preloading: Object(svelte_store__WEBPACK_IMPORTED_MODULE_2__["writable"])(null),
	session: Object(svelte_store__WEBPACK_IMPORTED_MODULE_2__["writable"])(initial_data && initial_data.session)
};

let $session;
let session_dirty;

stores.session.subscribe(async value => {
	$session = value;

	if (!ready) return;
	session_dirty = true;

	const target = select_target(new URL(location.href));

	const token = current_token = {};
	const { redirect, props, branch } = await hydrate_target(target);
	if (token !== current_token) return; // a secondary navigation happened while we were loading

	await render(redirect, branch, props, target.page);
});

let prefetching


 = null;
function set_prefetching(href, promise) {
	prefetching = { href, promise };
}

let target;
function set_target(element) {
	target = element;
}

let uid = 1;
function set_uid(n) {
	uid = n;
}

let cid;
function set_cid(n) {
	cid = n;
}

const _history = typeof history !== 'undefined' ? history : {
	pushState: (state, title, href) => {},
	replaceState: (state, title, href) => {},
	scrollRestoration: ''
};

const scroll_history = {};

function extract_query(search) {
	const query = Object.create(null);
	if (search.length > 0) {
		search.slice(1).split('&').forEach(searchParam => {
			let [, key, value = ''] = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' ')));
			if (typeof query[key] === 'string') query[key] = [query[key]];
			if (typeof query[key] === 'object') (query[key] ).push(value);
			else query[key] = value;
		});
	}
	return query;
}

function select_target(url) {
	if (url.origin !== location.origin) return null;
	if (!url.pathname.startsWith(initial_data.baseUrl)) return null;

	let path = url.pathname.slice(initial_data.baseUrl.length);

	if (path === '') {
		path = '/';
	}

	// avoid accidental clashes between server routes and page routes
	if (_internal_manifest_client__WEBPACK_IMPORTED_MODULE_4__["ignore"].some(pattern => pattern.test(path))) return;

	for (let i = 0; i < _internal_manifest_client__WEBPACK_IMPORTED_MODULE_4__["routes"].length; i += 1) {
		const route = _internal_manifest_client__WEBPACK_IMPORTED_MODULE_4__["routes"][i];

		const match = route.pattern.exec(path);

		if (match) {
			const query = extract_query(url.search);
			const part = route.parts[route.parts.length - 1];
			const params = part.params ? part.params(match) : {};

			const page = { host: location.host, path, query, params };

			return { href: url.href, route, match, page };
		}
	}
}

function handle_error(url) {
	const { host, pathname, search } = location;
	const { session, preloaded, status, error } = initial_data;

	if (!root_preloaded) {
		root_preloaded = preloaded && preloaded[0];
	}

	const props = {
		error,
		status,
		session,
		level0: {
			props: root_preloaded
		},
		level1: {
			props: {
				status,
				error
			},
			component: _internal_manifest_client__WEBPACK_IMPORTED_MODULE_4__["ErrorComponent"]
		},
		segments: preloaded

	};
	const query = extract_query(search);
	render(null, [], props, { host, path: pathname, query, params: {} });
}

function scroll_state() {
	return {
		x: pageXOffset,
		y: pageYOffset
	};
}

async function navigate(target, id, noscroll, hash) {
	if (id) {
		// popstate or initial navigation
		cid = id;
	} else {
		const current_scroll = scroll_state();

		// clicked on a link. preserve scroll state
		scroll_history[cid] = current_scroll;

		id = cid = ++uid;
		scroll_history[cid] = noscroll ? current_scroll : { x: 0, y: 0 };
	}

	cid = id;

	if (root_component) stores.preloading.set(true);

	const loaded = prefetching && prefetching.href === target.href ?
		prefetching.promise :
		hydrate_target(target);

	prefetching = null;

	const token = current_token = {};
	const { redirect, props, branch } = await loaded;
	if (token !== current_token) return; // a secondary navigation happened while we were loading

	await render(redirect, branch, props, target.page);
	if (document.activeElement) document.activeElement.blur();

	if (!noscroll) {
		let scroll = scroll_history[id];

		if (hash) {
			// scroll is an element id (from a hash), we need to compute y.
			const deep_linked = document.getElementById(hash.slice(1));

			if (deep_linked) {
				scroll = {
					x: 0,
					y: deep_linked.getBoundingClientRect().top + scrollY
				};
			}
		}

		scroll_history[cid] = scroll;
		if (scroll) scrollTo(scroll.x, scroll.y);
	}
}

async function render(redirect, branch, props, page) {
	if (redirect) return goto(redirect.location, { replaceState: true });

	stores.page.set(page);
	stores.preloading.set(false);

	if (root_component) {
		root_component.$set(props);
	} else {
		props.stores = {
			page: { subscribe: stores.page.subscribe },
			preloading: { subscribe: stores.preloading.subscribe },
			session: stores.session
		};
		props.level0 = {
			props: await root_preloaded
		};
		props.notify = stores.page.notify;

		// first load — remove SSR'd <head> contents
		const start = document.querySelector('#sapper-head-start');
		const end = document.querySelector('#sapper-head-end');

		if (start && end) {
			while (start.nextSibling !== end) detach(start.nextSibling);
			detach(start);
			detach(end);
		}

		root_component = new _internal_App_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			target,
			props,
			hydrate: true
		});
	}

	current_branch = branch;
	current_query = JSON.stringify(page.query);
	ready = true;
	session_dirty = false;
}

function part_changed(i, segment, match, stringified_query) {
	// TODO only check query string changes for preload functions
	// that do in fact depend on it (using static analysis or
	// runtime instrumentation)
	if (stringified_query !== current_query) return true;

	const previous = current_branch[i];

	if (!previous) return false;
	if (segment !== previous.segment) return true;
	if (previous.match) {
		if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
			return true;
		}
	}
}

async function hydrate_target(target)



 {
	const { route, page } = target;
	const segments = page.path.split('/').filter(Boolean);

	let redirect = null;

	const props = { error: null, status: 200, segments: [segments[0]] };

	const preload_context = {
		fetch: (url, opts) => fetch(url, opts),
		redirect: (statusCode, location) => {
			if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
				throw new Error(`Conflicting redirects`);
			}
			redirect = { statusCode, location };
		},
		error: (status, error) => {
			props.error = typeof error === 'string' ? new Error(error) : error;
			props.status = status;
		}
	};

	if (!root_preloaded) {
		root_preloaded = initial_data.preloaded[0] || _internal_manifest_client__WEBPACK_IMPORTED_MODULE_4__["root_preload"].call(preload_context, {
			host: page.host,
			path: page.path,
			query: page.query,
			params: {}
		}, $session);
	}

	let branch;
	let l = 1;

	try {
		const stringified_query = JSON.stringify(page.query);
		const match = route.pattern.exec(page.path);

		let segment_dirty = false;

		branch = await Promise.all(route.parts.map(async (part, i) => {
			const segment = segments[i];

			if (part_changed(i, segment, match, stringified_query)) segment_dirty = true;

			props.segments[l] = segments[i + 1]; // TODO make this less confusing
			if (!part) return { segment };

			const j = l++;

			if (!session_dirty && !segment_dirty && current_branch[i] && current_branch[i].part === part.i) {
				return current_branch[i];
			}

			segment_dirty = false;

			const { default: component, preload } = await load_component(_internal_manifest_client__WEBPACK_IMPORTED_MODULE_4__["components"][part.i]);

			let preloaded;
			if (ready || !initial_data.preloaded[i + 1]) {
				preloaded = preload
					? await preload.call(preload_context, {
						host: page.host,
						path: page.path,
						query: page.query,
						params: part.params ? part.params(target.match) : {}
					}, $session)
					: {};
			} else {
				preloaded = initial_data.preloaded[i + 1];
			}

			return (props[`level${j}`] = { component, props: preloaded, segment, match, part: part.i });
		}));
	} catch (error) {
		props.error = error;
		props.status = 500;
		branch = [];
	}

	return { redirect, props, branch };
}

function load_css(chunk) {
	const href = `client/${chunk}`;
	if (document.querySelector(`link[href="${href}"]`)) return;

	return new Promise((fulfil, reject) => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = href;

		link.onload = () => fulfil();
		link.onerror = reject;

		document.head.appendChild(link);
	});
}

function load_component(component)


 {
	// TODO this is temporary — once placeholders are
	// always rewritten, scratch the ternary
	const promises = (typeof component.css === 'string' ? [] : component.css.map(load_css));
	promises.unshift(component.js());
	return Promise.all(promises).then(values => values[0]);
}

function detach(node) {
	node.parentNode.removeChild(node);
}

function prefetch(href) {
	const target = select_target(new URL(href, document.baseURI));

	if (target) {
		if (!prefetching || href !== prefetching.href) {
			set_prefetching(href, hydrate_target(target));
		}

		return prefetching.promise;
	}
}

function start(opts

) {
	if ('scrollRestoration' in _history) {
		_history.scrollRestoration = 'manual';
	}
	
	// Adopted from Nuxt.js
	// Reset scrollRestoration to auto when leaving page, allowing page reload
	// and back-navigation from other pages to use the browser to restore the
	// scrolling position.
	addEventListener('beforeunload', () => {
		_history.scrollRestoration = 'auto';
	});

	// Setting scrollRestoration to manual again when returning to this page.
	addEventListener('load', () => {
		_history.scrollRestoration = 'manual';
	});

	set_target(opts.target);

	addEventListener('click', handle_click);
	addEventListener('popstate', handle_popstate);

	// prefetch
	addEventListener('touchstart', trigger_prefetch);
	addEventListener('mousemove', handle_mousemove);

	return Promise.resolve().then(() => {
		const { hash, href } = location;

		_history.replaceState({ id: uid }, '', href);

		const url = new URL(location.href);

		if (initial_data.error) return handle_error();

		const target = select_target(url);
		if (target) return navigate(target, uid, true, hash);
	});
}

let mousemove_timeout;

function handle_mousemove(event) {
	clearTimeout(mousemove_timeout);
	mousemove_timeout = setTimeout(() => {
		trigger_prefetch(event);
	}, 20);
}

function trigger_prefetch(event) {
	const a = find_anchor(event.target);
	if (!a || a.rel !== 'prefetch') return;

	prefetch(a.href);
}

function handle_click(event) {
	// Adapted from https://github.com/visionmedia/page.js
	// MIT license https://github.com/visionmedia/page.js#license
	if (which(event) !== 1) return;
	if (event.metaKey || event.ctrlKey || event.shiftKey) return;
	if (event.defaultPrevented) return;

	const a = find_anchor(event.target);
	if (!a) return;

	if (!a.href) return;

	// check if link is inside an svg
	// in this case, both href and target are always inside an object
	const svg = typeof a.href === 'object' && a.href.constructor.name === 'SVGAnimatedString';
	const href = String(svg ? (a).href.baseVal : a.href);

	if (href === location.href) {
		if (!location.hash) event.preventDefault();
		return;
	}

	// Ignore if tag has
	// 1. 'download' attribute
	// 2. rel='external' attribute
	if (a.hasAttribute('download') || a.getAttribute('rel') === 'external') return;

	// Ignore if <a> has a target
	if (svg ? (a).target.baseVal : a.target) return;

	const url = new URL(href);

	// Don't handle hash changes
	if (url.pathname === location.pathname && url.search === location.search) return;

	const target = select_target(url);
	if (target) {
		const noscroll = a.hasAttribute('sapper-noscroll');
		navigate(target, null, noscroll, url.hash);
		event.preventDefault();
		_history.pushState({ id: cid }, '', url.href);
	}
}

function which(event) {
	return event.which === null ? event.button : event.which;
}

function find_anchor(node) {
	while (node && node.nodeName.toUpperCase() !== 'A') node = node.parentNode; // SVG <a> elements have a lowercase name
	return node;
}

function handle_popstate(event) {
	scroll_history[cid] = scroll_state();

	if (event.state) {
		const url = new URL(location.href);
		const target = select_target(url);
		if (target) {
			navigate(target, event.state.id);
		} else {
			location.href = location.href;
		}
	} else {
		// hashchange
		set_uid(uid + 1);
		set_cid(uid);
		_history.replaceState({ id: cid }, '', location.href);
	}
}

function prefetchRoutes(pathnames) {
	return _internal_manifest_client__WEBPACK_IMPORTED_MODULE_4__["routes"]
		.filter(pathnames
			? route => pathnames.some(pathname => route.pattern.test(pathname))
			: () => true
		)
		.reduce((promise, route) => promise.then(() => {
			return Promise.all(route.parts.map(part => part && load_component(_internal_manifest_client__WEBPACK_IMPORTED_MODULE_4__["components"][part.i])));
		}), Promise.resolve());
}

const stores$1 = () => Object(svelte__WEBPACK_IMPORTED_MODULE_0__["getContext"])(_internal_shared__WEBPACK_IMPORTED_MODULE_1__["CONTEXT_KEY"]);




/***/ }),

/***/ "./src/node_modules/@sapper/internal/App.svelte":
/*!******************************************************!*\
  !*** ./src/node_modules/@sapper/internal/App.svelte ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ "./node_modules/svelte/index.mjs");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared */ "./src/node_modules/@sapper/internal/shared.mjs");
/* harmony import */ var _layout_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout.svelte */ "./src/node_modules/@sapper/internal/layout.svelte");
/* harmony import */ var _error_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./error.svelte */ "./src/node_modules/@sapper/internal/error.svelte");
/* src\node_modules\@sapper\internal\App.svelte generated by Svelte v3.23.2 */


const { Error: Error_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__["globals"];




const file = "src\\node_modules\\@sapper\\internal\\App.svelte";

// (23:1) {:else}
function create_else_block(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*level1*/ ctx[4].props];
	var switch_value = /*level1*/ ctx[4].component;

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(switch_instance.$$.fragment);
			switch_instance_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		l: function claim(nodes) {
			if (switch_instance) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(switch_instance, target, anchor);
			}

			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*level1*/ 16)
			? Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["get_spread_update"])(switch_instance_spread_levels, [Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["get_spread_object"])(/*level1*/ ctx[4].props)])
			: {};

			if (switch_value !== (switch_value = /*level1*/ ctx[4].component)) {
				if (switch_instance) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();
					const old_component = switch_instance;

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(old_component.$$.fragment, 1, 0, () => {
						Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(old_component, 1);
					});

					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(switch_instance.$$.fragment);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(switch_instance.$$.fragment, 1);
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(switch_instance_anchor);
			if (switch_instance) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(switch_instance, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(23:1) {:else}",
		ctx
	});

	return block;
}

// (21:1) {#if error}
function create_if_block(ctx) {
	let error_1;
	let current;

	error_1 = new _error_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({
			props: {
				error: /*error*/ ctx[0],
				status: /*status*/ ctx[1]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(error_1.$$.fragment);
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(error_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(error_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const error_1_changes = {};
			if (dirty & /*error*/ 1) error_1_changes.error = /*error*/ ctx[0];
			if (dirty & /*status*/ 2) error_1_changes.status = /*status*/ ctx[1];
			error_1.$set(error_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(error_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(error_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(error_1, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(21:1) {#if error}",
		ctx
	});

	return block;
}

// (20:0) <Layout segment="{segments[0]}" {...level0.props}>
function create_default_slot(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*error*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		l: function claim(nodes) {
			if_block.l(nodes);
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["group_outros"])();

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["check_outros"])();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				}

				Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(if_block);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(20:0) <Layout segment=\\\"{segments[0]}\\\" {...level0.props}>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let layout;
	let current;
	const layout_spread_levels = [{ segment: /*segments*/ ctx[2][0] }, /*level0*/ ctx[3].props];

	let layout_props = {
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	};

	for (let i = 0; i < layout_spread_levels.length; i += 1) {
		layout_props = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["assign"])(layout_props, layout_spread_levels[i]);
	}

	layout = new _layout_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({ props: layout_props, $$inline: true });

	const block = {
		c: function create() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_component"])(layout.$$.fragment);
		},
		l: function claim(nodes) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_component"])(layout.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["mount_component"])(layout, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const layout_changes = (dirty & /*segments, level0*/ 12)
			? Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["get_spread_update"])(layout_spread_levels, [
					dirty & /*segments*/ 4 && { segment: /*segments*/ ctx[2][0] },
					dirty & /*level0*/ 8 && Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["get_spread_object"])(/*level0*/ ctx[3].props)
				])
			: {};

			if (dirty & /*$$scope, error, status, level1*/ 147) {
				layout_changes.$$scope = { dirty, ctx };
			}

			layout.$set(layout_changes);
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(layout.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(layout.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["destroy_component"])(layout, detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["afterUpdate"])(notify);
	Object(svelte__WEBPACK_IMPORTED_MODULE_1__["setContext"])(_shared__WEBPACK_IMPORTED_MODULE_2__["CONTEXT_KEY"], stores);
	const writable_props = ["stores", "error", "status", "segments", "level0", "level1", "notify"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("App", $$slots, []);

	$$self.$set = $$props => {
		if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
		if ("error" in $$props) $$invalidate(0, error = $$props.error);
		if ("status" in $$props) $$invalidate(1, status = $$props.status);
		if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
		if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
		if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
		if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
	};

	$$self.$capture_state = () => ({
		setContext: svelte__WEBPACK_IMPORTED_MODULE_1__["setContext"],
		afterUpdate: svelte__WEBPACK_IMPORTED_MODULE_1__["afterUpdate"],
		CONTEXT_KEY: _shared__WEBPACK_IMPORTED_MODULE_2__["CONTEXT_KEY"],
		Layout: _layout_svelte__WEBPACK_IMPORTED_MODULE_3__["default"],
		Error: _error_svelte__WEBPACK_IMPORTED_MODULE_4__["default"],
		stores,
		error,
		status,
		segments,
		level0,
		level1,
		notify
	});

	$$self.$inject_state = $$props => {
		if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
		if ("error" in $$props) $$invalidate(0, error = $$props.error);
		if ("status" in $$props) $$invalidate(1, status = $$props.status);
		if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
		if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
		if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
		if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [error, status, segments, level0, level1, stores, notify];
}

class App extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {
			stores: 5,
			error: 0,
			status: 1,
			segments: 2,
			level0: 3,
			level1: 4,
			notify: 6
		});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*stores*/ ctx[5] === undefined && !("stores" in props)) {
			console.warn("<App> was created without expected prop 'stores'");
		}

		if (/*error*/ ctx[0] === undefined && !("error" in props)) {
			console.warn("<App> was created without expected prop 'error'");
		}

		if (/*status*/ ctx[1] === undefined && !("status" in props)) {
			console.warn("<App> was created without expected prop 'status'");
		}

		if (/*segments*/ ctx[2] === undefined && !("segments" in props)) {
			console.warn("<App> was created without expected prop 'segments'");
		}

		if (/*level0*/ ctx[3] === undefined && !("level0" in props)) {
			console.warn("<App> was created without expected prop 'level0'");
		}

		if (/*notify*/ ctx[6] === undefined && !("notify" in props)) {
			console.warn("<App> was created without expected prop 'notify'");
		}
	}

	get stores() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stores(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get error() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set error(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get status() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get segments() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segments(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level0() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level0(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level1() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level1(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get notify() {
		throw new Error_1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set notify(value) {
		throw new Error_1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/node_modules/@sapper/internal/error.svelte":
/*!********************************************************!*\
  !*** ./src/node_modules/@sapper/internal/error.svelte ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* src\node_modules\@sapper\internal\error.svelte generated by Svelte v3.23.2 */


const { Error: Error_1 } = svelte_internal__WEBPACK_IMPORTED_MODULE_0__["globals"];
const file = "src\\node_modules\\@sapper\\internal\\error.svelte";

// (10:0) {#if process.env.NODE_ENV === 'development'}
function create_if_block(ctx) {
	let pre;
	let t_value = /*error*/ ctx[0].stack + "";
	let t;

	const block = {
		c: function create() {
			pre = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("pre");
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t_value);
			this.h();
		},
		l: function claim(nodes) {
			pre = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "PRE", {});
			var pre_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(pre);
			t = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(pre_nodes, t_value);
			pre_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(pre, file, 10, 1, 148);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, pre, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(pre, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*error*/ 1 && t_value !== (t_value = /*error*/ ctx[0].stack + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(pre);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(10:0) {#if process.env.NODE_ENV === 'development'}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let h1;
	let t0;
	let t1;
	let p;
	let t2_value = /*error*/ ctx[0].message + "";
	let t2;
	let t3;
	let if_block_anchor;
	let if_block =  true && create_if_block(ctx);

	const block = {
		c: function create() {
			h1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("h1");
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(/*status*/ ctx[1]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["element"])("p");
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["text"])(t2_value);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["space"])();
			if (if_block) if_block.c();
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
			this.h();
		},
		l: function claim(nodes) {
			h1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "H1", {});
			var h1_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(h1);
			t0 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(h1_nodes, /*status*/ ctx[1]);
			h1_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t1 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			p = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_element"])(nodes, "P", {});
			var p_nodes = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["children"])(p);
			t2 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_text"])(p_nodes, t2_value);
			p_nodes.forEach(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"]);
			t3 = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["claim_space"])(nodes);
			if (if_block) if_block.l(nodes);
			if_block_anchor = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["empty"])();
			this.h();
		},
		h: function hydrate() {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(h1, file, 5, 0, 59);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["add_location"])(p, file, 7, 0, 78);
		},
		m: function mount(target, anchor) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, h1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(h1, t0);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t1, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, p, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["append_dev"])(p, t2);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, t3, anchor);
			if (if_block) if_block.m(target, anchor);
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["insert_dev"])(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*status*/ 2) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t0, /*status*/ ctx[1]);
			if (dirty & /*error*/ 1 && t2_value !== (t2_value = /*error*/ ctx[0].message + "")) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["set_data_dev"])(t2, t2_value);
			if (true) if_block.p(ctx, dirty);
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__["noop"],
		d: function destroy(detaching) {
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(h1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t1);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(p);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(t3);
			if (if_block) if_block.d(detaching);
			if (detaching) Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["detach_dev"])(if_block_anchor);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { error } = $$props;
	let { status } = $$props;
	const writable_props = ["error", "status"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Error> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Error", $$slots, []);

	$$self.$set = $$props => {
		if ("error" in $$props) $$invalidate(0, error = $$props.error);
		if ("status" in $$props) $$invalidate(1, status = $$props.status);
	};

	$$self.$capture_state = () => ({ error, status });

	$$self.$inject_state = $$props => {
		if ("error" in $$props) $$invalidate(0, error = $$props.error);
		if ("status" in $$props) $$invalidate(1, status = $$props.status);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [error, status];
}

class Error extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], { error: 0, status: 1 });

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Error",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*error*/ ctx[0] === undefined && !("error" in props)) {
			console.warn("<Error> was created without expected prop 'error'");
		}

		if (/*status*/ ctx[1] === undefined && !("status" in props)) {
			console.warn("<Error> was created without expected prop 'status'");
		}
	}

	get error() {
		throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set error(value) {
		throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get status() {
		throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Error);

/***/ }),

/***/ "./src/node_modules/@sapper/internal/layout.svelte":
/*!*********************************************************!*\
  !*** ./src/node_modules/@sapper/internal/layout.svelte ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/internal/index.mjs");
/* src\node_modules\@sapper\internal\layout.svelte generated by Svelte v3.23.2 */


const file = "src\\node_modules\\@sapper\\internal\\layout.svelte";

function create_fragment(ctx) {
	let current;
	const default_slot_template = /*$$slots*/ ctx[1].default;
	const default_slot = Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["create_slot"])(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			if (default_slot) default_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 1) {
					Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["update_slot"])(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], dirty, null, null);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_in"])(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["transition_out"])(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Layout> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["validate_slots"])("Layout", $$slots, ['default']);

	$$self.$set = $$props => {
		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, $$slots];
}

class Layout extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__["SvelteComponentDev"] {
	constructor(options) {
		super(options);
		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["init"])(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__["safe_not_equal"], {});

		Object(svelte_internal__WEBPACK_IMPORTED_MODULE_0__["dispatch_dev"])("SvelteRegisterComponent", {
			component: this,
			tagName: "Layout",
			options,
			id: create_fragment.name
		});
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ }),

/***/ "./src/node_modules/@sapper/internal/manifest-client.mjs":
/*!***************************************************************!*\
  !*** ./src/node_modules/@sapper/internal/manifest-client.mjs ***!
  \***************************************************************/
/*! exports provided: Root, root_preload, ErrorComponent, ignore, components, routes */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ignore", function() { return ignore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony import */ var _layout_svelte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout.svelte */ "./src/node_modules/@sapper/internal/layout.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Root", function() { return _layout_svelte__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared */ "./src/node_modules/@sapper/internal/shared.mjs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "root_preload", function() { return _shared__WEBPACK_IMPORTED_MODULE_1__["preload"]; });

/* harmony import */ var _error_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error.svelte */ "./src/node_modules/@sapper/internal/error.svelte");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorComponent", function() { return _error_svelte__WEBPACK_IMPORTED_MODULE_2__["default"]; });

// This file is generated by Sapper — do not edit it!




const ignore = [/^\/api\/facebookController\/?$/, /^\/api\/toastController\/?$/, /^\/api\/awsController\/?$/];

const components = [
	{
		js: () => Promise.all(/*! import() | index */[__webpack_require__.e("vendors~index"), __webpack_require__.e("index")]).then(__webpack_require__.bind(null, /*! ../../../routes/index.svelte */ "./src/routes/index.svelte")),
		css: "__SAPPER_CSS_PLACEHOLDER:index.svelte__"
	}
];

const routes = [
	{
		// index.svelte
		pattern: /^\/$/,
		parts: [
			{ i: 0 }
		]
	}
];

if (typeof window !== 'undefined') {
	__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./node_modules/sapper/sapper-dev-client.js */ "./node_modules/sapper/sapper-dev-client.js")).then(client => {
		client.connect(10000);
	});
}

/***/ }),

/***/ "./src/node_modules/@sapper/internal/shared.mjs":
/*!******************************************************!*\
  !*** ./src/node_modules/@sapper/internal/shared.mjs ***!
  \******************************************************/
/*! exports provided: CONTEXT_KEY, preload */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTEXT_KEY", function() { return CONTEXT_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "preload", function() { return preload; });
/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/store */ "./node_modules/svelte/store/index.mjs");


const CONTEXT_KEY = {};

const preload = () => ({});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nob3RhL2Rpc3QvY2hvdGEubWluLmNzcz81YjdjIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jaG90YS9kaXN0L2Nob3RhLm1pbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9pbnRlcm5hbC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zdG9yZS9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvYXBwLm1qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvaW50ZXJuYWwvQXBwLnN2ZWx0ZSIsIndlYnBhY2s6Ly8vLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvaW50ZXJuYWwvZXJyb3Iuc3ZlbHRlIiwid2VicGFjazovLy8uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9pbnRlcm5hbC9tYW5pZmVzdC1jbGllbnQubWpzIiwid2VicGFjazovLy8uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9pbnRlcm5hbC9zaGFyZWQubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7Ozs7UUFJQTtRQUNBO1FBQ0Esd0VBQXdFLGdEQUFnRDtRQUN4SDs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBOztRQUVBO1FBQ0EsaUNBQWlDOztRQUVqQztRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0Esd0JBQXdCLGtDQUFrQztRQUMxRCxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0EsMENBQTBDLG9CQUFvQixXQUFXOztRQUV6RTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQix1QkFBdUI7UUFDdkM7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ3JNQSxVQUFVLG1CQUFPLENBQUMseUlBQThEO0FBQ2hGLDBCQUEwQixtQkFBTyxDQUFDLHlNQUE4RTs7QUFFaEg7O0FBRUE7QUFDQSwwQkFBMEIsUUFBUztBQUNuQzs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7O0FBSUEsc0M7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUFBO0FBQUE7QUFBQTtBQUMrRTtBQUMvRSw4QkFBOEIsc0VBQTJCO0FBQ3pEO0FBQ0EsOEJBQThCLFFBQVMsMEVBQTBFLG9CQUFvQixpQ0FBaUMsNEJBQTRCLDhCQUE4Qix5QkFBeUIsNkJBQTZCLDBCQUEwQiw0QkFBNEIsMkJBQTJCLHVCQUF1Qix1QkFBdUIsc0JBQXNCLHNNQUFzTSx3RUFBd0UsR0FBRyxVQUFVLG1DQUFtQywyQkFBMkIscUJBQXFCLHNCQUFzQiwrQkFBK0IsbUNBQW1DLEdBQUcsd0JBQXdCLGdDQUFnQyx3QkFBd0IsR0FBRyxVQUFVLHNDQUFzQyxxQkFBcUIsZ0NBQWdDLDZCQUE2QixzREFBc0QseUNBQXlDLGNBQWMsZUFBZSxHQUFHLDRCQUE0QixxQkFBcUIsMkJBQTJCLEdBQUcsUUFBUSxtQkFBbUIsR0FBRyxRQUFRLHNCQUFzQixHQUFHLFFBQVEscUJBQXFCLEdBQUcsUUFBUSxzQkFBc0IsR0FBRyxRQUFRLG1CQUFtQixHQUFHLFFBQVEsc0JBQXNCLEdBQUcsT0FBTyxnQ0FBZ0MsMEJBQTBCLEdBQUcsMEJBQTBCLGtCQUFrQixHQUFHLFlBQVkseUJBQXlCLEdBQUcsT0FBTyxrQkFBa0IsR0FBRyxnQkFBZ0IsZ0RBQWdELHlCQUF5QixrREFBa0QsR0FBRyxXQUFXLHFCQUFxQixHQUFHLFFBQVEsNkNBQTZDLGdCQUFnQixtQkFBbUIsR0FBRyxlQUFlLGlCQUFpQixHQUFHLFdBQVcsZ0JBQWdCLDhCQUE4QixzQkFBc0IscUJBQXFCLEdBQUcsc0NBQXNDLGdEQUFnRCxHQUFHLFlBQVksMkJBQTJCLDJCQUEyQixHQUFHLFdBQVcsb0RBQW9ELEdBQUcsV0FBVyxpREFBaUQsR0FBRyw4QkFBOEIseUNBQXlDLEdBQUcsZUFBZSxtQkFBbUIsMEJBQTBCLHVCQUF1Qix5QkFBeUIsOEJBQThCLEdBQUcsb0JBQW9CLGdEQUFnRCxHQUFHLFNBQVMsbUJBQW1CLGtCQUFrQixxQkFBcUIsR0FBRyxjQUFjLHFCQUFxQixlQUFlLEdBQUcsaUJBQWlCLHdCQUF3QiwrQkFBK0IsOENBQThDLHNDQUFzQyxHQUFHLFNBQVMsb0JBQW9CLEdBQUcsY0FBYyw2Q0FBNkMsR0FBRyxZQUFZLGNBQWMsR0FBRyxnQkFBZ0Isb0NBQW9DLG1CQUFtQixlQUFlLDBDQUEwQyxHQUFHLFVBQVUseUJBQXlCLHlCQUF5QixrQkFBa0Isa0NBQWtDLDRCQUE0Qix3QkFBd0IsNEJBQTRCLHlCQUF5QixnQ0FBZ0MsNkNBQTZDLDhDQUE4QyxHQUFHLHdCQUF3QixtQ0FBbUMsR0FBRyxrQkFBa0IsbUNBQW1DLG9DQUFvQyxnQ0FBZ0MsR0FBRyxVQUFVLHdCQUF3QixnQkFBZ0IsWUFBWSxHQUFHLDZDQUE2QyxvRUFBb0UsR0FBRyxZQUFZLHNEQUFzRCxrREFBa0QsbURBQW1ELEdBQUcsb0JBQW9CLHdCQUF3QixHQUFHLFlBQVksdURBQXVELG1EQUFtRCxvREFBb0QsR0FBRyxZQUFZLGlEQUFpRCw2Q0FBNkMsOENBQThDLEdBQUcsb0JBQW9CLHdCQUF3QixHQUFHLFlBQVksdURBQXVELG1EQUFtRCxvREFBb0QsR0FBRyxZQUFZLHVEQUF1RCxtREFBbUQsb0RBQW9ELEdBQUcsb0JBQW9CLHdCQUF3QixHQUFHLFlBQVksaURBQWlELDZDQUE2Qyw4Q0FBOEMsR0FBRyxZQUFZLHVEQUF1RCxtREFBbUQsb0RBQW9ELEdBQUcsb0JBQW9CLHdCQUF3QixHQUFHLFlBQVksdURBQXVELG1EQUFtRCxvREFBb0QsR0FBRyxZQUFZLGlEQUFpRCw2Q0FBNkMsOENBQThDLEdBQUcscUJBQXFCLHdCQUF3QixHQUFHLGFBQWEsdURBQXVELG1EQUFtRCxvREFBb0QsR0FBRyxhQUFhLHVEQUF1RCxtREFBbUQsb0RBQW9ELEdBQUcsc0JBQXNCLHdCQUF3QixHQUFHLGFBQWEsa0RBQWtELDhDQUE4QywrQ0FBK0MsR0FBRywwQ0FBMEMsZ0JBQWdCLGtCQUFrQixLQUFLLDBDQUEwQywwQkFBMEIseUJBQXlCLHFCQUFxQixzQkFBc0IsS0FBSyxHQUFHLHdDQUF3QyxlQUFlLDBCQUEwQix3REFBd0Qsb0RBQW9ELHFEQUFxRCxLQUFLLGlCQUFpQiwwQkFBMEIseURBQXlELHFEQUFxRCxzREFBc0QsS0FBSyxpQkFBaUIsMEJBQTBCLG1EQUFtRCwrQ0FBK0MsZ0RBQWdELEtBQUssaUJBQWlCLDBCQUEwQix5REFBeUQscURBQXFELHNEQUFzRCxLQUFLLGlCQUFpQiwwQkFBMEIseURBQXlELHFEQUFxRCxzREFBc0QsS0FBSyxpQkFBaUIsMEJBQTBCLG1EQUFtRCwrQ0FBK0MsZ0RBQWdELEtBQUssaUJBQWlCLDBCQUEwQix5REFBeUQscURBQXFELHNEQUFzRCxLQUFLLGlCQUFpQiwwQkFBMEIseURBQXlELHFEQUFxRCxzREFBc0QsS0FBSyxpQkFBaUIsMEJBQTBCLG1EQUFtRCwrQ0FBK0MsZ0RBQWdELEtBQUssa0JBQWtCLDBCQUEwQix5REFBeUQscURBQXFELHNEQUFzRCxLQUFLLGtCQUFrQiwwQkFBMEIseURBQXlELHFEQUFxRCxzREFBc0QsS0FBSyxrQkFBa0IsMEJBQTBCLG9EQUFvRCxnREFBZ0QsaURBQWlELEtBQUssR0FBRyx5Q0FBeUMsZUFBZSwwQkFBMEIsd0RBQXdELG9EQUFvRCxxREFBcUQsS0FBSyxpQkFBaUIsMEJBQTBCLHlEQUF5RCxxREFBcUQsc0RBQXNELEtBQUssaUJBQWlCLDBCQUEwQixtREFBbUQsK0NBQStDLGdEQUFnRCxLQUFLLGlCQUFpQiwwQkFBMEIseURBQXlELHFEQUFxRCxzREFBc0QsS0FBSyxpQkFBaUIsMEJBQTBCLHlEQUF5RCxxREFBcUQsc0RBQXNELEtBQUssaUJBQWlCLDBCQUEwQixtREFBbUQsK0NBQStDLGdEQUFnRCxLQUFLLGlCQUFpQiwwQkFBMEIseURBQXlELHFEQUFxRCxzREFBc0QsS0FBSyxpQkFBaUIsMEJBQTBCLHlEQUF5RCxxREFBcUQsc0RBQXNELEtBQUssaUJBQWlCLDBCQUEwQixtREFBbUQsK0NBQStDLGdEQUFnRCxLQUFLLGtCQUFrQiwwQkFBMEIseURBQXlELHFEQUFxRCxzREFBc0QsS0FBSyxrQkFBa0IsMEJBQTBCLHlEQUF5RCxxREFBcUQsc0RBQXNELEtBQUssa0JBQWtCLDBCQUEwQixvREFBb0QsZ0RBQWdELGlEQUFpRCxLQUFLLEdBQUcsWUFBWSx5QkFBeUIsR0FBRyxZQUFZLDhCQUE4QixxQkFBcUIsMkJBQTJCLEdBQUcsbUtBQW1LLHlCQUF5Qix5QkFBeUIsdUJBQXVCLDZDQUE2QyxtQkFBbUIsc0NBQXNDLDhCQUE4QixtQkFBbUIsZ0JBQWdCLEdBQUcsME1BQTBNLG9DQUFvQyxHQUFHLDJMQUEyTCxrQkFBa0IsdUNBQXVDLHFEQUFxRCw2Q0FBNkMsR0FBRyxrSkFBa0oscUNBQXFDLEdBQUcsc0pBQXNKLHVDQUF1QyxHQUFHLFlBQVksNkJBQTZCLHVDQUF1Qyx5QkFBeUIsbUNBQW1DLCtDQUErQyw4SEFBOEgsR0FBRyxtQ0FBbUMsa0JBQWtCLG1CQUFtQixHQUFHLGlFQUFpRSx5QkFBeUIsaUNBQWlDLHVDQUF1Qyx1QkFBdUIsa0NBQWtDLGdDQUFnQyxtQkFBbUIsdUJBQXVCLDBDQUEwQyxrQ0FBa0MsMEJBQTBCLGdDQUFnQyx3QkFBd0IsMEJBQTBCLG9CQUFvQixHQUFHLGNBQWMseUJBQXlCLHlCQUF5QixrQkFBa0IsR0FBRyxrQ0FBa0MsdUJBQXVCLEdBQUcsMEJBQTBCLGtDQUFrQyxnQ0FBZ0MsR0FBRyxxQ0FBcUMseUJBQXlCLDBDQUEwQyxHQUFHLG9DQUFvQywwQ0FBMEMsR0FBRyx1QkFBdUIsc0JBQXNCLEdBQUcsK0ZBQStGLGlCQUFpQixHQUFHLG9HQUFvRyxtQ0FBbUMsMkJBQTJCLEdBQUcsa0ZBQWtGLGlCQUFpQix3QkFBd0IsR0FBRyxxR0FBcUcsZ0JBQWdCLGVBQWUsMkJBQTJCLDJDQUEyQyxHQUFHLHVCQUF1Qix3Q0FBd0MsR0FBRyxrQkFBa0IsNENBQTRDLEdBQUcsbUJBQW1CLHlDQUF5QyxHQUFHLHFCQUFxQiwyQ0FBMkMsR0FBRyxxQkFBcUIsa0NBQWtDLHlDQUF5QyxHQUFHLDZCQUE2Qix1Q0FBdUMsZ0NBQWdDLEdBQUcsK0JBQStCLG9DQUFvQyw2QkFBNkIsR0FBRywwQkFBMEIsd0NBQXdDLGlDQUFpQyxHQUFHLG1CQUFtQixrQ0FBa0MsOEJBQThCLGdDQUFnQyxHQUFHLGtCQUFrQixnQ0FBZ0MsZ0NBQWdDLHlCQUF5Qiw4QkFBOEIsMkJBQTJCLHdCQUF3QixHQUFHLHdCQUF3QixxQkFBcUIsR0FBRyx1QkFBdUIsa0JBQWtCLEdBQUcsaUNBQWlDLG1CQUFtQixHQUFHLHdCQUF3QixtQkFBbUIsR0FBRyw0QkFBNEIsbUJBQW1CLEdBQUcsNkJBQTZCLG1CQUFtQixHQUFHLG1CQUFtQixtQkFBbUIsR0FBRyxVQUFVLHlCQUF5Qix5QkFBeUIsa0JBQWtCLHFCQUFxQiwrQkFBK0IsNEJBQTRCLHlCQUF5QixHQUFHLGNBQWMscUJBQXFCLEdBQUcsMkRBQTJELHlCQUF5Qix5QkFBeUIsa0JBQWtCLEdBQUcsd0NBQXdDLHdCQUF3QixnQkFBZ0IsWUFBWSxHQUFHLGVBQWUsNEJBQTRCLHlCQUF5QixnQ0FBZ0MsR0FBRyxnQkFBZ0IsMEJBQTBCLHVCQUF1Qiw4QkFBOEIsR0FBRyxpQkFBaUIsNkJBQTZCLDBCQUEwQiw0QkFBNEIsR0FBRywwQ0FBMEMsNkJBQTZCLG1DQUFtQyxvQ0FBb0MsaUNBQWlDLDZCQUE2QixLQUFLLDBDQUEwQywwQkFBMEIsc0JBQXNCLCtCQUErQiw0QkFBNEIsOEJBQThCLEtBQUssR0FBRyx1QkFBdUIsMEJBQTBCLHlCQUF5Qix5QkFBeUIsa0JBQWtCLDhCQUE4QiwyQkFBMkIsd0JBQXdCLHVCQUF1QixpQ0FBaUMsR0FBRywrQkFBK0IsZ0JBQWdCLGdDQUFnQyxHQUFHLGlCQUFpQixzQkFBc0IsbUJBQW1CLHNCQUFzQixHQUFHLHFCQUFxQix3QkFBd0IsR0FBRyxrQkFBa0Isc0JBQXNCLEdBQUcsV0FBVyx1QkFBdUIsdUJBQXVCLGdDQUFnQyxvREFBb0QsNENBQTRDLEdBQUcsd0JBQXdCLGNBQWMsR0FBRyxzQkFBc0Isa0JBQWtCLHdCQUF3QixHQUFHLFdBQVcseUJBQXlCLHlCQUF5QixrQkFBa0IsR0FBRyxhQUFhLDBCQUEwQixHQUFHLDRDQUE0Qyx1QkFBdUIsd0JBQXdCLHVCQUF1QixtQkFBbUIsaUNBQWlDLG9EQUFvRCx1QkFBdUIsR0FBRyx1Q0FBdUMsZUFBZSxtREFBbUQsR0FBRyxzQkFBc0IsdUNBQXVDLEdBQUcscUJBQXFCLHdCQUF3Qix1QkFBdUIsbUJBQW1CLEdBQUcsVUFBVSwwQkFBMEIsNkNBQTZDLDhCQUE4Qiw2QkFBNkIsb0JBQW9CLG1CQUFtQiwwQkFBMEIsR0FBRyxtQkFBbUIsb0JBQW9CLHNCQUFzQixHQUFHLG1CQUFtQixvQkFBb0IsdUJBQXVCLEdBQUcsaUJBQWlCLHNCQUFzQixHQUFHLHNCQUFzQix1QkFBdUIsMEJBQTBCLEdBQUcsb0NBQW9DLHVCQUF1QixZQUFZLHdCQUF3QixHQUFHLGlCQUFpQixzREFBc0QsR0FBRyxlQUFlLHdEQUF3RCxHQUFHLGNBQWMsdURBQXVELEdBQUcsY0FBYyxtREFBbUQsR0FBRyxlQUFlLG9EQUFvRCxHQUFHLGlCQUFpQixzREFBc0QsR0FBRyxpQkFBaUIsc0RBQXNELEdBQUcsZUFBZSx3REFBd0QsR0FBRyxjQUFjLHVEQUF1RCxHQUFHLGNBQWMsbURBQW1ELEdBQUcsZUFBZSxvREFBb0QsR0FBRyxpQkFBaUIsc0RBQXNELEdBQUcsbUJBQW1CLDJDQUEyQyxHQUFHLGlCQUFpQiw2Q0FBNkMsR0FBRyxnQkFBZ0IsNENBQTRDLEdBQUcsZ0JBQWdCLHdDQUF3QyxHQUFHLGlCQUFpQix5Q0FBeUMsR0FBRyxtQkFBbUIsMkNBQTJDLEdBQUcsaUJBQWlCLDJCQUEyQixHQUFHLGlCQUFpQiw0QkFBNEIsR0FBRyxnQkFBZ0IsMkJBQTJCLEdBQUcsa0JBQWtCLHVCQUF1QixHQUFHLGdCQUFnQixxQkFBcUIsR0FBRyxpQkFBaUIsc0JBQXNCLEdBQUcsbUJBQW1CLHdCQUF3QixHQUFHLHFCQUFxQiw4QkFBOEIsR0FBRyxxQkFBcUIsOEJBQThCLEdBQUcsc0JBQXNCLCtCQUErQixHQUFHLHFCQUFxQixnQkFBZ0Isc0JBQXNCLEdBQUcsb0JBQW9CLDJCQUEyQixHQUFHLHdCQUF3Qix5QkFBeUIseUJBQXlCLGtCQUFrQiw4QkFBOEIsMkJBQTJCLHdCQUF3QixHQUFHLHNDQUFzQyx5QkFBeUIseUJBQXlCLGtCQUFrQiw2QkFBNkIsMEJBQTBCLDRCQUE0QixHQUFHLGdCQUFnQiw4QkFBOEIsMkJBQTJCLHdCQUF3QixHQUFHLGVBQWUsMEJBQTBCLHVCQUF1Qiw4QkFBOEIsR0FBRyx5QkFBeUIseUJBQXlCLHlCQUF5QixrQkFBa0IsOEJBQThCLDJCQUEyQix3QkFBd0IsR0FBRyxjQUFjLDRCQUE0Qix5QkFBeUIsZ0NBQWdDLEdBQUcsZUFBZSxvQkFBb0IsZ0JBQWdCLEdBQUcscUJBQXFCLDBCQUEwQixHQUFHLG9CQUFvQix5QkFBeUIsR0FBRyxpQkFBaUIsK0JBQStCLEdBQUcsaUJBQWlCLHdCQUF3QixHQUFHLGVBQWUsa0JBQWtCLG1CQUFtQixnQkFBZ0IsR0FBRyxnQkFBZ0IsNkJBQTZCLEdBQUcsMENBQTBDLGNBQWMsK0JBQStCLEtBQUssR0FBRywrREFBK0QsY0FBYywrQkFBK0IsS0FBSyxHQUFHLGdFQUFnRSxjQUFjLCtCQUErQixLQUFLLEdBQUcseUNBQXlDLGNBQWMsK0JBQStCLEtBQUssR0FBRyxnQkFBZ0IsY0FBYywrQkFBK0IsS0FBSyxHQUFHLE9BQU8sbUpBQW1KLE1BQU0sVUFBVSxZQUFZLFlBQVksWUFBWSxZQUFZLFlBQVksWUFBWSxZQUFZLFlBQVksWUFBWSxZQUFZLFlBQVksWUFBWSxZQUFZLFFBQVEsUUFBUSxXQUFXLFlBQVksWUFBWSxZQUFZLFlBQVksWUFBWSxTQUFTLFFBQVEsWUFBWSxZQUFZLFNBQVMsUUFBUSxXQUFXLFlBQVksWUFBWSxZQUFZLFlBQVksWUFBWSxXQUFXLFVBQVUsU0FBUyxRQUFRLFlBQVksWUFBWSxTQUFTLFFBQVEsVUFBVSxTQUFTLFFBQVEsV0FBVyxTQUFTLFFBQVEsV0FBVyxTQUFTLFFBQVEsV0FBVyxTQUFTLFFBQVEsVUFBVSxTQUFTLFFBQVEsV0FBVyxTQUFTLFFBQVEsV0FBVyxZQUFZLFNBQVMsUUFBUSxXQUFXLFNBQVMsUUFBUSxXQUFXLFNBQVMsUUFBUSxVQUFVLFNBQVMsUUFBUSxXQUFXLFlBQVksWUFBWSxTQUFTLFFBQVEsV0FBVyxTQUFTLFFBQVEsV0FBVyxXQUFXLFVBQVUsU0FBUyxRQUFRLFVBQVUsU0FBUyxRQUFRLFVBQVUsV0FBVyxZQUFZLFlBQVksU0FBUyxRQUFRLFlBQVksU0FBUyxRQUFRLFdBQVcsWUFBWSxTQUFTLFFBQVEsV0FBVyxTQUFTLFFBQVEsV0FBVyxTQUFTLFFBQVEsWUFBWSxTQUFTLFFBQVEsVUFBVSxXQUFXLFlBQVksWUFBWSxZQUFZLFNBQVMsUUFBUSxXQUFXLFNBQVMsUUFBUSxVQUFVLFVBQVUsV0FBVyxTQUFTLFFBQVEsV0FBVyxXQUFXLFNBQVMsUUFBUSxXQUFXLFlBQVksWUFBWSxZQUFZLFNBQVMsUUFBUSxVQUFVLFNBQVMsUUFBUSxXQUFXLFNBQVMsUUFBUSxVQUFVLFNBQVMsUUFBUSxXQUFXLFdBQVcsVUFBVSxXQUFXLFNBQVMsUUFBUSxXQUFXLFlBQVksV0FBVyxXQUFXLFlBQVksWUFBWSxZQUFZLFlBQVksWUFBWSxZQUFZLFlBQVksU0FBUyxRQUFRLFlBQVksU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFNBQVMsUUFBUSxXQUFXLFdBQVcsVUFBVSxTQUFTLFFBQVEsWUFBWSxTQUFTLFFBQVEsV0FBVyxZQUFZLFlBQVksU0FBUyxRQUFRLFdBQVcsU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFNBQVMsUUFBUSxXQUFXLFlBQVksWUFBWSxTQUFTLFFBQVEsV0FBVyxTQUFTLFFBQVEsV0FBVyxZQUFZLFlBQVksU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFNBQVMsUUFBUSxXQUFXLFNBQVMsUUFBUSxXQUFXLFlBQVksWUFBWSxTQUFTLFFBQVEsV0FBVyxZQUFZLFlBQVksU0FBUyxRQUFRLFdBQVcsU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFNBQVMsUUFBUSxXQUFXLFlBQVksWUFBWSxTQUFTLFFBQVEsV0FBVyxTQUFTLFFBQVEsV0FBVyxZQUFZLFlBQVksU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFNBQVMsUUFBUSxZQUFZLFNBQVMsUUFBUSxXQUFXLFlBQVksWUFBWSxTQUFTLFFBQVEsTUFBTSxVQUFVLFNBQVMsUUFBUSxZQUFZLFlBQVksV0FBVyxVQUFVLFFBQVEsS0FBSyxRQUFRLE1BQU0sV0FBVyxZQUFZLFlBQVksWUFBWSxTQUFTLFFBQVEsV0FBVyxZQUFZLFlBQVksWUFBWSxTQUFTLFFBQVEsV0FBVyxZQUFZLFlBQVksWUFBWSxTQUFTLFFBQVEsV0FBVyxZQUFZLFlBQVksWUFBWSxTQUFTLFFBQVEsV0FBVyxZQUFZLFlBQVksWUFBWSxTQUFTLFFBQVEsV0FBVyxZQUFZLFlBQVksWUFBWSxTQUFTLFFBQVEsV0FBVyxZQUFZLFlBQVksWUFBWSxTQUFTLFFBQVEsV0FBVyxZQUFZLFlBQVksWUFBWSxTQUFTLFFBQVEsV0FBVyxZQUFZLFlBQVksWUFBWSxTQUFTLFFBQVEsV0FBVyxZQUFZLFlBQVksWUFBWSxTQUFTLFFBQVEsV0FBVyxZQUFZLFlBQVksWUFBWSxTQUFTLFFBQVEsV0FBVyxZQUFZLFlBQVksWUFBWSxRQUFRLEtBQUssUUFBUSxNQUFNLFdBQVcsWUFBWSxZQUFZLFlBQVksU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFlBQVksU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFlBQVksU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFlBQVksU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFlBQVksU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFlBQVksU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFlBQVksU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFlBQVksU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFlBQVksU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFlBQVksU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFlBQVksU0FBUyxRQUFRLFdBQVcsWUFBWSxZQUFZLFlBQVksUUFBUSxLQUFLLFFBQVEsV0FBVyxTQUFTLFFBQVEsV0FBVyxZQUFZLFdBQVcsU0FBUyxRQUFRLFlBQVksWUFBWSxZQUFZLFlBQVksV0FBVyxXQUFXLFlBQVksV0FBVyxVQUFVLFVBQVUsU0FBUyxZQUFZLFVBQVUsU0FBUyxXQUFXLFdBQVcsWUFBWSxZQUFZLFVBQVUsU0FBUyxZQUFZLFVBQVUsU0FBUyxZQUFZLFVBQVUsU0FBUyxXQUFXLFlBQVksWUFBWSxZQUFZLFlBQVksVUFBVSxTQUFTLFdBQVcsVUFBVSxVQUFVLFNBQVMsWUFBWSxZQUFZLFlBQVksWUFBWSxZQUFZLFlBQVksV0FBVyxXQUFXLFlBQVksWUFBWSxZQUFZLFlBQVksWUFBWSxZQUFZLFdBQVcsVUFBVSxTQUFTLFdBQVcsWUFBWSxXQUFXLFVBQVUsU0FBUyxZQUFZLFVBQVUsU0FBUyxZQUFZLFlBQVksVUFBVSxTQUFTLFlBQVksWUFBWSxVQUFVLFNBQVMsWUFBWSxVQUFVLFNBQVMsWUFBWSxVQUFVLFNBQVMsV0FBVyxVQUFVLFNBQVMsWUFBWSxZQUFZLFVBQVUsU0FBUyxXQUFXLFdBQVcsVUFBVSxTQUFTLFdBQVcsVUFBVSxXQUFXLFlBQVksVUFBVSxTQUFTLFlBQVksVUFBVSxTQUFTLFdBQVcsVUFBVSxTQUFTLFdBQVcsVUFBVSxTQUFTLFlBQVksVUFBVSxTQUFTLFlBQVksWUFBWSxVQUFVLFNBQVMsWUFBWSxZQUFZLFVBQVUsU0FBUyxZQUFZLFlBQVksVUFBVSxTQUFTLFlBQVksWUFBWSxVQUFVLFNBQVMsV0FBVyxZQUFZLFlBQVksVUFBVSxTQUFTLFdBQVcsWUFBWSxZQUFZLFlBQVksWUFBWSxZQUFZLFVBQVUsU0FBUyxZQUFZLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxVQUFVLFVBQVUsU0FBUyxXQUFXLFlBQVksV0FBVyxXQUFXLFlBQVksWUFBWSxZQUFZLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxZQUFZLFlBQVksV0FBVyxVQUFVLFNBQVMsWUFBWSxXQUFXLFVBQVUsVUFBVSxTQUFTLFdBQVcsWUFBWSxZQUFZLFVBQVUsU0FBUyxXQUFXLFlBQVksWUFBWSxVQUFVLFNBQVMsV0FBVyxZQUFZLFlBQVksVUFBVSxTQUFTLE1BQU0sWUFBWSxZQUFZLFlBQVksWUFBWSxVQUFVLFNBQVMsWUFBWSxXQUFXLFdBQVcsWUFBWSxZQUFZLFNBQVMsS0FBSyxTQUFTLFlBQVksWUFBWSxZQUFZLFdBQVcsV0FBVyxZQUFZLFlBQVksWUFBWSxZQUFZLFVBQVUsU0FBUyxXQUFXLFdBQVcsVUFBVSxTQUFTLFdBQVcsV0FBVyxXQUFXLFVBQVUsU0FBUyxZQUFZLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxXQUFXLFlBQVksWUFBWSxZQUFZLFlBQVksVUFBVSxTQUFTLFdBQVcsVUFBVSxTQUFTLFVBQVUsV0FBVyxVQUFVLFNBQVMsV0FBVyxZQUFZLFdBQVcsVUFBVSxTQUFTLFdBQVcsVUFBVSxTQUFTLFlBQVksWUFBWSxZQUFZLFdBQVcsV0FBVyxZQUFZLFlBQVksVUFBVSxTQUFTLFdBQVcsV0FBVyxVQUFVLFNBQVMsV0FBVyxVQUFVLFNBQVMsWUFBWSxZQUFZLFdBQVcsVUFBVSxTQUFTLFdBQVcsWUFBWSxZQUFZLFlBQVksV0FBVyxVQUFVLFdBQVcsVUFBVSxTQUFTLFVBQVUsV0FBVyxVQUFVLFNBQVMsVUFBVSxXQUFXLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxZQUFZLFlBQVksVUFBVSxTQUFTLFlBQVksV0FBVyxXQUFXLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxXQUFXLFVBQVUsU0FBUyxXQUFX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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLDRCQUE0QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQkFBb0IsNkJBQTZCO0FBQ2pEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUM1UUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF1Szs7Ozs7Ozs7Ozs7OztBQ0F2SztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixLQUFLO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsMEJBQTBCO0FBQ3hELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVCQUF1QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLEtBQUs7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1Qyw4QkFBOEIsRUFBRSxLQUFLO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpRUFBaUU7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpRUFBaUU7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUVBQWlFO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNrRDtBQUNDO0FBQ1E7O0FBRXBEOztBQUVBO0FBQ1A7QUFDQSxZQUFZLGtOQUFzRTtBQUNsRjtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDLDZLQUFtRjtBQUNwRjtBQUNBLEVBQUU7QUFDRixDOzs7Ozs7Ozs7Ozs7QUM1QkE7QUFBQTtBQUFBO0FBQUE7QUFBd0M7O0FBRWpDOztBQUVBLHlCQUF5QixFIiwiZmlsZSI6ImYwZmJiYjA1YTk1ZmQ5ZDE0MTdiL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm1haW5cIjogMFxuIFx0fTtcblxuXG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgXCJmMGZiYmIwNWE5NWZkOWQxNDE3YlwiICsgXCIvXCIgKyAoe1widmVuZG9yc35pbmRleFwiOlwidmVuZG9yc35pbmRleFwiLFwiaW5kZXhcIjpcImluZGV4XCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLlwiICsgY2h1bmtJZCArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG4gXHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImNsaWVudC9cIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY2xpZW50LnRzXCIpO1xuIiwidmFyIGFwaSA9IHJlcXVpcmUoXCIhLi4vLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIik7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jaG90YS5taW4uY3NzXCIpO1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgICAgICB9XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyh0cnVlKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qISBjaG90YS5jc3MgdjAuNy4yIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL2plbmlsL2Nob3RhICovXFxuOnJvb3Qge1xcbiAgLS1iZy1jb2xvcjojZmZmO1xcbiAgLS1iZy1zZWNvbmRhcnktY29sb3I6I2YzZjNmNjtcXG4gIC0tY29sb3ItcHJpbWFyeTojMTQ4NTRmO1xcbiAgLS1jb2xvci1saWdodEdyZXk6I2QyZDZkZDtcXG4gIC0tY29sb3ItZ3JleTojNzQ3NjgxO1xcbiAgLS1jb2xvci1kYXJrR3JleTojM2Y0MTQ0O1xcbiAgLS1jb2xvci1lcnJvcjojZDQzOTM5O1xcbiAgLS1jb2xvci1zdWNjZXNzOiMyOGJkMTQ7XFxuICAtLWdyaWQtbWF4V2lkdGg6MTIwcmVtO1xcbiAgLS1ncmlkLWd1dHRlcjoycmVtO1xcbiAgLS1mb250LXNpemU6MS42cmVtO1xcbiAgLS1mb250LWNvbG9yOiMzMzM7XFxuICAtLWZvbnQtZmFtaWx5LXNhbnM6LWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsQXZlbmlyLFxcXCJBdmVuaXIgTmV4dFxcXCIsXFxcIlNlZ29lIFVJXFxcIixcXFwiUm9ib3RvXFxcIixcXFwiT3h5Z2VuXFxcIixcXFwiVWJ1bnR1XFxcIixcXFwiQ2FudGFyZWxsXFxcIixcXFwiRmlyYSBTYW5zXFxcIixcXFwiRHJvaWQgU2Fuc1xcXCIsXFxcIkhlbHZldGljYSBOZXVlXFxcIixzYW5zLXNlcmlmO1xcbiAgLS1mb250LWZhbWlseS1tb25vOm1vbmFjbyxcXFwiQ29uc29sYXNcXFwiLFxcXCJMdWNpZGEgQ29uc29sZVxcXCIsbW9ub3NwYWNlO1xcbn1cXG5cXG5odG1sIHtcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LXNpemU6IDYyLjUlO1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7XFxuICAtbXMtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcXG59XFxuXFxuKiwgOmFmdGVyLCA6YmVmb3JlIHtcXG4gIC13ZWJraXQtYm94LXNpemluZzogaW5oZXJpdDtcXG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmctY29sb3IpO1xcbiAgbGluZS1oZWlnaHQ6IDEuNjtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplKTtcXG4gIGNvbG9yOiB2YXIoLS1mb250LWNvbG9yKTtcXG4gIGZvbnQtZmFtaWx5OiBTZWdvZSBVSSwgSGVsdmV0aWNhIE5ldWUsIHNhbnMtc2VyaWY7XFxuICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktc2Fucyk7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2IHtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBtYXJnaW46IDAuMzVlbSAwIDAuN2VtO1xcbn1cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDJlbTtcXG59XFxuXFxuaDIge1xcbiAgZm9udC1zaXplOiAxLjc1ZW07XFxufVxcblxcbmgzIHtcXG4gIGZvbnQtc2l6ZTogMS41ZW07XFxufVxcblxcbmg0IHtcXG4gIGZvbnQtc2l6ZTogMS4yNWVtO1xcbn1cXG5cXG5oNSB7XFxuICBmb250LXNpemU6IDFlbTtcXG59XFxuXFxuaDYge1xcbiAgZm9udC1zaXplOiAwLjg1ZW07XFxufVxcblxcbmEge1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLXByaW1hcnkpO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG5hOmhvdmVyOm5vdCguYnV0dG9uKSB7XFxuICBvcGFjaXR5OiAwLjc1O1xcbn1cXG5cXG5idXR0b24ge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxufVxcblxcbnAge1xcbiAgbWFyZ2luLXRvcDogMDtcXG59XFxuXFxuYmxvY2txdW90ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iZy1zZWNvbmRhcnktY29sb3IpO1xcbiAgcGFkZGluZzogMS41cmVtIDJyZW07XFxuICBib3JkZXItbGVmdDogM3B4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSk7XFxufVxcblxcbmRsIGR0IHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcblxcbmhyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWxpZ2h0R3JleSk7XFxuICBoZWlnaHQ6IDFweDtcXG4gIG1hcmdpbjogMXJlbSAwO1xcbn1cXG5cXG5ociwgdGFibGUge1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG50YWJsZSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcblxcbnRhYmxlLnN0cmlwZWQgdHI6bnRoLW9mLXR5cGUoMm4pIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLXNlY29uZGFyeS1jb2xvcik7XFxufVxcblxcbnRkLCB0aCB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgcGFkZGluZzogMS4ycmVtIDAuNHJlbTtcXG59XFxuXFxudGhlYWQge1xcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSk7XFxufVxcblxcbnRmb290IHtcXG4gIGJvcmRlci10b3A6IDJweCBzb2xpZCB2YXIoLS1jb2xvci1saWdodEdyZXkpO1xcbn1cXG5cXG5jb2RlLCBrYmQsIHByZSwgc2FtcCwgdHQge1xcbiAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LW1vbm8pO1xcbn1cXG5cXG5jb2RlLCBrYmQge1xcbiAgZm9udC1zaXplOiA5MCU7XFxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBwYWRkaW5nOiAwLjJlbSAwLjRlbTtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1lcnJvcik7XFxufVxcblxcbmNvZGUsIGtiZCwgcHJlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLXNlY29uZGFyeS1jb2xvcik7XFxufVxcblxcbnByZSB7XFxuICBmb250LXNpemU6IDFlbTtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBvdmVyZmxvdy14OiBhdXRvO1xcbn1cXG5cXG5wcmUgY29kZSB7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuYWJiclt0aXRsZV0ge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgLXdlYmtpdC10ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7XFxufVxcblxcbmltZyB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxufVxcblxcbmZpZWxkc2V0IHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSk7XFxufVxcblxcbmlmcmFtZSB7XFxuICBib3JkZXI6IDA7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgbWF4LXdpZHRoOiB2YXIoLS1ncmlkLW1heFdpZHRoKTtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgd2lkdGg6IDk2JTtcXG4gIHBhZGRpbmc6IDAgY2FsYyh2YXIoLS1ncmlkLWd1dHRlcikvMik7XFxufVxcblxcbi5yb3cge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gIC1tcy1mbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcXG4gIC13ZWJraXQtYm94LXBhY2s6IHN0YXJ0O1xcbiAgLW1zLWZsZXgtcGFjazogc3RhcnQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBtYXJnaW4tbGVmdDogY2FsYyh2YXIoLS1ncmlkLWd1dHRlcikvLTIpO1xcbiAgbWFyZ2luLXJpZ2h0OiBjYWxjKHZhcigtLWdyaWQtZ3V0dGVyKS8tMik7XFxufVxcblxcbi5yb3csIC5yb3cucmV2ZXJzZSB7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IGhvcml6b250YWw7XFxufVxcblxcbi5yb3cucmV2ZXJzZSB7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IHJldmVyc2U7XFxuICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xcbn1cXG5cXG4uY29sIHtcXG4gIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAtbXMtZmxleDogMTtcXG4gIGZsZXg6IDE7XFxufVxcblxcbi5jb2wsIFtjbGFzcyo9XFxcIiBjb2wtXFxcIl0sIFtjbGFzc149Y29sLV0ge1xcbiAgbWFyZ2luOiAwIGNhbGModmFyKC0tZ3JpZC1ndXR0ZXIpLzIpIGNhbGModmFyKC0tZ3JpZC1ndXR0ZXIpLzIpO1xcbn1cXG5cXG4uY29sLTEge1xcbiAgLW1zLWZsZXg6IDAgMCBjYWxjKDguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIGZsZXg6IDAgMCBjYWxjKDguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIG1heC13aWR0aDogY2FsYyg4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxufVxcblxcbi5jb2wtMSwgLmNvbC0yIHtcXG4gIC13ZWJraXQtYm94LWZsZXg6IDA7XFxufVxcblxcbi5jb2wtMiB7XFxuICAtbXMtZmxleDogMCAwIGNhbGMoMTYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIGZsZXg6IDAgMCBjYWxjKDE2LjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICBtYXgtd2lkdGg6IGNhbGMoMTYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG59XFxuXFxuLmNvbC0zIHtcXG4gIC1tcy1mbGV4OiAwIDAgY2FsYygyNSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgZmxleDogMCAwIGNhbGMoMjUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIG1heC13aWR0aDogY2FsYygyNSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbn1cXG5cXG4uY29sLTMsIC5jb2wtNCB7XFxuICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbn1cXG5cXG4uY29sLTQge1xcbiAgLW1zLWZsZXg6IDAgMCBjYWxjKDMzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICBmbGV4OiAwIDAgY2FsYygzMy4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgbWF4LXdpZHRoOiBjYWxjKDMzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxufVxcblxcbi5jb2wtNSB7XFxuICAtbXMtZmxleDogMCAwIGNhbGMoNDEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIGZsZXg6IDAgMCBjYWxjKDQxLjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICBtYXgtd2lkdGg6IGNhbGMoNDEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG59XFxuXFxuLmNvbC01LCAuY29sLTYge1xcbiAgLXdlYmtpdC1ib3gtZmxleDogMDtcXG59XFxuXFxuLmNvbC02IHtcXG4gIC1tcy1mbGV4OiAwIDAgY2FsYyg1MCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgZmxleDogMCAwIGNhbGMoNTAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIG1heC13aWR0aDogY2FsYyg1MCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbn1cXG5cXG4uY29sLTcge1xcbiAgLW1zLWZsZXg6IDAgMCBjYWxjKDU4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICBmbGV4OiAwIDAgY2FsYyg1OC4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgbWF4LXdpZHRoOiBjYWxjKDU4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxufVxcblxcbi5jb2wtNywgLmNvbC04IHtcXG4gIC13ZWJraXQtYm94LWZsZXg6IDA7XFxufVxcblxcbi5jb2wtOCB7XFxuICAtbXMtZmxleDogMCAwIGNhbGMoNjYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIGZsZXg6IDAgMCBjYWxjKDY2LjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICBtYXgtd2lkdGg6IGNhbGMoNjYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG59XFxuXFxuLmNvbC05IHtcXG4gIC1tcy1mbGV4OiAwIDAgY2FsYyg3NSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgZmxleDogMCAwIGNhbGMoNzUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIG1heC13aWR0aDogY2FsYyg3NSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbn1cXG5cXG4uY29sLTksIC5jb2wtMTAge1xcbiAgLXdlYmtpdC1ib3gtZmxleDogMDtcXG59XFxuXFxuLmNvbC0xMCB7XFxuICAtbXMtZmxleDogMCAwIGNhbGMoODMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIGZsZXg6IDAgMCBjYWxjKDgzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICBtYXgtd2lkdGg6IGNhbGMoODMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG59XFxuXFxuLmNvbC0xMSB7XFxuICAtbXMtZmxleDogMCAwIGNhbGMoOTEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIGZsZXg6IDAgMCBjYWxjKDkxLjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICBtYXgtd2lkdGg6IGNhbGMoOTEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG59XFxuXFxuLmNvbC0xMSwgLmNvbC0xMiB7XFxuICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbn1cXG5cXG4uY29sLTEyIHtcXG4gIC1tcy1mbGV4OiAwIDAgY2FsYygxMDAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIGZsZXg6IDAgMCBjYWxjKDEwMCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1OTlweCkge1xcbiAgLmNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcblxcbiAgLmNvbCwgW2NsYXNzKj1jb2wtXSwgW2NsYXNzXj1jb2wtXSB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDEgMTAwJTtcXG4gICAgZmxleDogMCAxIDEwMCU7XFxuICAgIG1heC13aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogOTAwcHgpIHtcXG4gIC5jb2wtMS1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYyg4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIGZsZXg6IDAgMCBjYWxjKDguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtMi1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYygxNi42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYygxNi42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoMTYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtMy1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYygyNSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYygyNSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoMjUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtNC1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYygzMy4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYygzMy4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoMzMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtNS1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYyg0MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYyg0MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoNDEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtNi1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYyg1MCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYyg1MCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoNTAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtNy1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYyg1OC4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYyg1OC4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoNTguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtOC1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYyg2Ni42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYyg2Ni42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoNjYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtOS1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYyg3NSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYyg3NSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoNzUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtMTAtbWQge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoODMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoODMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDgzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTExLW1kIHtcXG4gICAgLXdlYmtpdC1ib3gtZmxleDogMDtcXG4gICAgLW1zLWZsZXg6IDAgMCBjYWxjKDkxLjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIGZsZXg6IDAgMCBjYWxjKDkxLjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIG1heC13aWR0aDogY2FsYyg5MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgfVxcblxcbiAgLmNvbC0xMi1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYygxMDAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoMTAwJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIG1heC13aWR0aDogY2FsYygxMDAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG59XFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTIwMHB4KSB7XFxuICAuY29sLTEtbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoOC4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYyg4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIG1heC13aWR0aDogY2FsYyg4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTItbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoMTYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoMTYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDE2LjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTMtbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoMjUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoMjUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDI1JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTQtbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoMzMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoMzMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDMzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTUtbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoNDEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoNDEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDQxLjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTYtbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoNTAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoNTAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDUwJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTctbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoNTguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoNTguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDU4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTgtbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoNjYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoNjYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDY2LjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTktbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoNzUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoNzUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDc1JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTEwLWxnIHtcXG4gICAgLXdlYmtpdC1ib3gtZmxleDogMDtcXG4gICAgLW1zLWZsZXg6IDAgMCBjYWxjKDgzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIGZsZXg6IDAgMCBjYWxjKDgzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIG1heC13aWR0aDogY2FsYyg4My4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgfVxcblxcbiAgLmNvbC0xMS1sZyB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYyg5MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYyg5MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoOTEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtMTItbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoMTAwJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIGZsZXg6IDAgMCBjYWxjKDEwMCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxufVxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuNXJlbSAycmVtO1xcbn1cXG5cXG5sZWdlbmQge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGZvbnQtc2l6ZTogMC44ZW07XFxuICBsZXR0ZXItc3BhY2luZzogMC4xcmVtO1xcbn1cXG5cXG5pbnB1dDpub3QoW3R5cGU9Y2hlY2tib3hdKTpub3QoW3R5cGU9cmFkaW9dKTpub3QoW3R5cGU9c3VibWl0XSk6bm90KFt0eXBlPWNvbG9yXSk6bm90KFt0eXBlPWJ1dHRvbl0pOm5vdChbdHlwZT1yZXNldF0pLCBzZWxlY3QsIHRleHRhcmVhLCB0ZXh0YXJlYVt0eXBlPXRleHRdIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcbiAgcGFkZGluZzogMC44cmVtIDFyZW07XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1jb2xvci1saWdodEdyZXkpO1xcbiAgZm9udC1zaXplOiAxZW07XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuaW5wdXQ6bm90KFt0eXBlPWNoZWNrYm94XSk6bm90KFt0eXBlPXJhZGlvXSk6bm90KFt0eXBlPXN1Ym1pdF0pOm5vdChbdHlwZT1jb2xvcl0pOm5vdChbdHlwZT1idXR0b25dKTpub3QoW3R5cGU9cmVzZXRdKTpub3QoOmRpc2FibGVkKTpob3Zlciwgc2VsZWN0OmhvdmVyLCB0ZXh0YXJlYTpob3ZlciwgdGV4dGFyZWFbdHlwZT10ZXh0XTpob3ZlciB7XFxuICBib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLWdyZXkpO1xcbn1cXG5cXG5pbnB1dDpub3QoW3R5cGU9Y2hlY2tib3hdKTpub3QoW3R5cGU9cmFkaW9dKTpub3QoW3R5cGU9c3VibWl0XSk6bm90KFt0eXBlPWNvbG9yXSk6bm90KFt0eXBlPWJ1dHRvbl0pOm5vdChbdHlwZT1yZXNldF0pOmZvY3VzLCBzZWxlY3Q6Zm9jdXMsIHRleHRhcmVhOmZvY3VzLCB0ZXh0YXJlYVt0eXBlPXRleHRdOmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLXByaW1hcnkpO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgMXB4IHZhcigtLWNvbG9yLXByaW1hcnkpO1xcbiAgYm94LXNoYWRvdzogMCAwIDFweCB2YXIoLS1jb2xvci1wcmltYXJ5KTtcXG59XFxuXFxuaW5wdXQuZXJyb3I6bm90KFt0eXBlPWNoZWNrYm94XSk6bm90KFt0eXBlPXJhZGlvXSk6bm90KFt0eXBlPXN1Ym1pdF0pOm5vdChbdHlwZT1jb2xvcl0pOm5vdChbdHlwZT1idXR0b25dKTpub3QoW3R5cGU9cmVzZXRdKSwgdGV4dGFyZWEuZXJyb3Ige1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1jb2xvci1lcnJvcik7XFxufVxcblxcbmlucHV0LnN1Y2Nlc3M6bm90KFt0eXBlPWNoZWNrYm94XSk6bm90KFt0eXBlPXJhZGlvXSk6bm90KFt0eXBlPXN1Ym1pdF0pOm5vdChbdHlwZT1jb2xvcl0pOm5vdChbdHlwZT1idXR0b25dKTpub3QoW3R5cGU9cmVzZXRdKSwgdGV4dGFyZWEuc3VjY2VzcyB7XFxuICBib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLXN1Y2Nlc3MpO1xcbn1cXG5cXG5zZWxlY3Qge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgYmFja2dyb3VuZDogI2YzZjNmNiBuby1yZXBlYXQgMTAwJTtcXG4gIGJhY2tncm91bmQtc2l6ZTogMWV4O1xcbiAgYmFja2dyb3VuZC1vcmlnaW46IGNvbnRlbnQtYm94O1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWw7dXRmOCw8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzYwJyBoZWlnaHQ9JzQwJyBmaWxsPSclMjM1NTUnPjxwb2x5Z29uIHBvaW50cz0nMCwwIDYwLDAgMzAsNDAnLz48L3N2Zz5cXFwiKTtcXG59XFxuXFxuW3R5cGU9Y2hlY2tib3hdLCBbdHlwZT1yYWRpb10ge1xcbiAgd2lkdGg6IDEuNnJlbTtcXG4gIGhlaWdodDogMS42cmVtO1xcbn1cXG5cXG4uYnV0dG9uLCBbdHlwZT1idXR0b25dLCBbdHlwZT1yZXNldF0sIFt0eXBlPXN1Ym1pdF0sIGJ1dHRvbiB7XFxuICBwYWRkaW5nOiAxcmVtIDIuNXJlbTtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1kYXJrR3JleSk7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvci1saWdodEdyZXkpO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZSk7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGVhc2U7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgZWFzZTtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5ncm91cGVkIHtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uZ3JvdXBlZCA+IDpub3QoOmxhc3QtY2hpbGQpIHtcXG4gIG1hcmdpbi1yaWdodDogMTZweDtcXG59XFxuXFxuLmdyb3VwZWQuZ2FwbGVzcyA+ICoge1xcbiAgbWFyZ2luOiAwIDAgMCAtMXB4ICFpbXBvcnRhbnQ7XFxuICBib3JkZXItcmFkaXVzOiAwICFpbXBvcnRhbnQ7XFxufVxcblxcbi5ncm91cGVkLmdhcGxlc3MgPiA6Zmlyc3QtY2hpbGQge1xcbiAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XFxuICBib3JkZXItcmFkaXVzOiA0cHggMCAwIDRweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZ3JvdXBlZC5nYXBsZXNzID4gOmxhc3QtY2hpbGQge1xcbiAgYm9yZGVyLXJhZGl1czogMCA0cHggNHB4IDAgIWltcG9ydGFudDtcXG59XFxuXFxuLmJ1dHRvbiArIC5idXR0b24ge1xcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XFxufVxcblxcbi5idXR0b246aG92ZXIsIFt0eXBlPWJ1dHRvbl06aG92ZXIsIFt0eXBlPXJlc2V0XTpob3ZlciwgW3R5cGU9c3VibWl0XTpob3ZlciwgYnV0dG9uOmhvdmVyIHtcXG4gIG9wYWNpdHk6IDAuODtcXG59XFxuXFxuLmJ1dHRvbjphY3RpdmUsIFt0eXBlPWJ1dHRvbl06YWN0aXZlLCBbdHlwZT1yZXNldF06YWN0aXZlLCBbdHlwZT1zdWJtaXRdOmFjdGl2ZSwgYnV0dG9uOmFjdGl2ZSB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC45OCk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDAuOTgpO1xcbn1cXG5cXG5idXR0b246ZGlzYWJsZWQsIGJ1dHRvbjpkaXNhYmxlZDpob3ZlciwgaW5wdXQ6ZGlzYWJsZWQsIGlucHV0OmRpc2FibGVkOmhvdmVyIHtcXG4gIG9wYWNpdHk6IDAuNDtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcblxcbi5idXR0b24uZGFyaywgLmJ1dHRvbi5lcnJvciwgLmJ1dHRvbi5wcmltYXJ5LCAuYnV0dG9uLnNlY29uZGFyeSwgLmJ1dHRvbi5zdWNjZXNzLCBbdHlwZT1zdWJtaXRdIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgei1pbmRleDogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1wcmltYXJ5KTtcXG59XFxuXFxuLmJ1dHRvbi5zZWNvbmRhcnkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItZ3JleSk7XFxufVxcblxcbi5idXR0b24uZGFyayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1kYXJrR3JleSk7XFxufVxcblxcbi5idXR0b24uZXJyb3Ige1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItZXJyb3IpO1xcbn1cXG5cXG4uYnV0dG9uLnN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3Itc3VjY2Vzcyk7XFxufVxcblxcbi5idXR0b24ub3V0bGluZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1jb2xvcjogdmFyKC0tY29sb3ItbGlnaHRHcmV5KTtcXG59XFxuXFxuLmJ1dHRvbi5vdXRsaW5lLnByaW1hcnkge1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1jb2xvci1wcmltYXJ5KTtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1wcmltYXJ5KTtcXG59XFxuXFxuLmJ1dHRvbi5vdXRsaW5lLnNlY29uZGFyeSB7XFxuICBib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLWdyZXkpO1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWdyZXkpO1xcbn1cXG5cXG4uYnV0dG9uLm91dGxpbmUuZGFyayB7XFxuICBib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLWRhcmtHcmV5KTtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1kYXJrR3JleSk7XFxufVxcblxcbi5idXR0b24uY2xlYXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLXByaW1hcnkpO1xcbn1cXG5cXG4uYnV0dG9uLmljb24ge1xcbiAgZGlzcGxheTogLXdlYmtpdC1pbmxpbmUtYm94O1xcbiAgZGlzcGxheTogLW1zLWlubGluZS1mbGV4Ym94O1xcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5idXR0b24uaWNvbiA+IGltZyB7XFxuICBtYXJnaW4tbGVmdDogMnB4O1xcbn1cXG5cXG4uYnV0dG9uLmljb24tb25seSB7XFxuICBwYWRkaW5nOiAxcmVtO1xcbn1cXG5cXG46Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgY29sb3I6ICNiZGJmYzQ7XFxufVxcblxcbjo6LW1vei1wbGFjZWhvbGRlciB7XFxuICBjb2xvcjogI2JkYmZjNDtcXG59XFxuXFxuOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XFxuICBjb2xvcjogI2JkYmZjNDtcXG59XFxuXFxuOjotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgY29sb3I6ICNiZGJmYzQ7XFxufVxcblxcbjo6cGxhY2Vob2xkZXIge1xcbiAgY29sb3I6ICNiZGJmYzQ7XFxufVxcblxcbi5uYXYge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBtaW4taGVpZ2h0OiA1cmVtO1xcbiAgLXdlYmtpdC1ib3gtYWxpZ246IHN0cmV0Y2g7XFxuICAtbXMtZmxleC1hbGlnbjogc3RyZXRjaDtcXG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xcbn1cXG5cXG4ubmF2IGltZyB7XFxuICBtYXgtaGVpZ2h0OiAzcmVtO1xcbn1cXG5cXG4ubmF2LWNlbnRlciwgLm5hdi1sZWZ0LCAubmF2LXJpZ2h0LCAubmF2ID4gLmNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLm5hdi1jZW50ZXIsIC5uYXYtbGVmdCwgLm5hdi1yaWdodCB7XFxuICAtd2Via2l0LWJveC1mbGV4OiAxO1xcbiAgLW1zLWZsZXg6IDE7XFxuICBmbGV4OiAxO1xcbn1cXG5cXG4ubmF2LWxlZnQge1xcbiAgLXdlYmtpdC1ib3gtcGFjazogc3RhcnQ7XFxuICAtbXMtZmxleC1wYWNrOiBzdGFydDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG59XFxuXFxuLm5hdi1yaWdodCB7XFxuICAtd2Via2l0LWJveC1wYWNrOiBlbmQ7XFxuICAtbXMtZmxleC1wYWNrOiBlbmQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbn1cXG5cXG4ubmF2LWNlbnRlciB7XFxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDgwcHgpIHtcXG4gIC5uYXYsIC5uYXYgPiAuY29udGFpbmVyIHtcXG4gICAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcXG4gICAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgfVxcblxcbiAgLm5hdi1jZW50ZXIsIC5uYXYtbGVmdCwgLm5hdi1yaWdodCB7XFxuICAgIC1tcy1mbGV4LXdyYXA6IHdyYXA7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgfVxcbn1cXG4ubmF2IC5icmFuZCwgLm5hdiBhIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogMXJlbSAycmVtO1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWRhcmtHcmV5KTtcXG59XFxuXFxuLm5hdiAuYWN0aXZlOm5vdCguYnV0dG9uKSB7XFxuICBjb2xvcjogIzAwMDtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1wcmltYXJ5KTtcXG59XFxuXFxuLm5hdiAuYnJhbmQge1xcbiAgZm9udC1zaXplOiAxLjc1ZW07XFxuICBwYWRkaW5nLXRvcDogMDtcXG4gIHBhZGRpbmctYm90dG9tOiAwO1xcbn1cXG5cXG4ubmF2IC5icmFuZCBpbWcge1xcbiAgcGFkZGluZy1yaWdodDogMXJlbTtcXG59XFxuXFxuLm5hdiAuYnV0dG9uIHtcXG4gIG1hcmdpbjogYXV0byAxcmVtO1xcbn1cXG5cXG4uY2FyZCB7XFxuICBwYWRkaW5nOiAxcmVtIDJyZW07XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1iZy1jb2xvcik7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMXB4IDNweCB2YXIoLS1jb2xvci1ncmV5KTtcXG4gIGJveC1zaGFkb3c6IDAgMXB4IDNweCB2YXIoLS1jb2xvci1ncmV5KTtcXG59XFxuXFxuLmNhcmQgcDpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLmNhcmQgaGVhZGVyID4gKiB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuLnRhYnMge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi50YWJzIGEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG4udGFicyA+IC5kcm9wZG93biA+IHN1bW1hcnksIC50YWJzID4gYSB7XFxuICBwYWRkaW5nOiAxcmVtIDJyZW07XFxuICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgLW1zLWZsZXg6IDAgMSBhdXRvO1xcbiAgZmxleDogMCAxIGF1dG87XFxuICBjb2xvcjogdmFyKC0tY29sb3ItZGFya0dyZXkpO1xcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi50YWJzID4gYS5hY3RpdmUsIC50YWJzID4gYTpob3ZlciB7XFxuICBvcGFjaXR5OiAxO1xcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHZhcigtLWNvbG9yLWRhcmtHcmV5KTtcXG59XFxuXFxuLnRhYnMgPiBhLmFjdGl2ZSB7XFxuICBib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLXByaW1hcnkpO1xcbn1cXG5cXG4udGFicy5pcy1mdWxsIGEge1xcbiAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gIC1tcy1mbGV4OiAxIDEgYXV0bztcXG4gIGZsZXg6IDEgMSBhdXRvO1xcbn1cXG5cXG4udGFnIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSk7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWdyZXkpO1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBsZXR0ZXItc3BhY2luZzogMC41cHg7XFxufVxcblxcbi50YWcuaXMtc21hbGwge1xcbiAgcGFkZGluZzogMC40cmVtO1xcbiAgZm9udC1zaXplOiAwLjc1ZW07XFxufVxcblxcbi50YWcuaXMtbGFyZ2Uge1xcbiAgcGFkZGluZzogMC43cmVtO1xcbiAgZm9udC1zaXplOiAxLjEyNWVtO1xcbn1cXG5cXG4udGFnICsgLnRhZyB7XFxuICBtYXJnaW4tbGVmdDogMXJlbTtcXG59XFxuXFxuZGV0YWlscy5kcm9wZG93biB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcblxcbmRldGFpbHMuZHJvcGRvd24gPiA6bGFzdC1jaGlsZCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG59XFxuXFxuLmJnLXByaW1hcnkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItcHJpbWFyeSkgIWltcG9ydGFudDtcXG59XFxuXFxuLmJnLWxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWxpZ2h0R3JleSkgIWltcG9ydGFudDtcXG59XFxuXFxuLmJnLWRhcmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItZGFya0dyZXkpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5iZy1ncmV5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWdyZXkpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5iZy1lcnJvciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1lcnJvcikgIWltcG9ydGFudDtcXG59XFxuXFxuLmJnLXN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3Itc3VjY2VzcykgIWltcG9ydGFudDtcXG59XFxuXFxuLmJkLXByaW1hcnkge1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tY29sb3ItcHJpbWFyeSkgIWltcG9ydGFudDtcXG59XFxuXFxuLmJkLWxpZ2h0IHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSkgIWltcG9ydGFudDtcXG59XFxuXFxuLmJkLWRhcmsge1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tY29sb3ItZGFya0dyZXkpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5iZC1ncmV5IHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLWdyZXkpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5iZC1lcnJvciB7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1jb2xvci1lcnJvcikgIWltcG9ydGFudDtcXG59XFxuXFxuLmJkLXN1Y2Nlc3Mge1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tY29sb3Itc3VjY2VzcykgIWltcG9ydGFudDtcXG59XFxuXFxuLnRleHQtcHJpbWFyeSB7XFxuICBjb2xvcjogdmFyKC0tY29sb3ItcHJpbWFyeSkgIWltcG9ydGFudDtcXG59XFxuXFxuLnRleHQtbGlnaHQge1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWxpZ2h0R3JleSkgIWltcG9ydGFudDtcXG59XFxuXFxuLnRleHQtZGFyayB7XFxuICBjb2xvcjogdmFyKC0tY29sb3ItZGFya0dyZXkpICFpbXBvcnRhbnQ7XFxufVxcblxcbi50ZXh0LWdyZXkge1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWdyZXkpICFpbXBvcnRhbnQ7XFxufVxcblxcbi50ZXh0LWVycm9yIHtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1lcnJvcikgIWltcG9ydGFudDtcXG59XFxuXFxuLnRleHQtc3VjY2VzcyB7XFxuICBjb2xvcjogdmFyKC0tY29sb3Itc3VjY2VzcykgIWltcG9ydGFudDtcXG59XFxuXFxuLnRleHQtd2hpdGUge1xcbiAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcXG59XFxuXFxuLnB1bGwtcmlnaHQge1xcbiAgZmxvYXQ6IHJpZ2h0ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5wdWxsLWxlZnQge1xcbiAgZmxvYXQ6IGxlZnQgIWltcG9ydGFudDtcXG59XFxuXFxuLnRleHQtY2VudGVyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLnRleHQtbGVmdCB7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG5cXG4udGV4dC1yaWdodCB7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuXFxuLnRleHQtanVzdGlmeSB7XFxuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xcbn1cXG5cXG4udGV4dC11cHBlcmNhc2Uge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuLnRleHQtbG93ZXJjYXNlIHtcXG4gIHRleHQtdHJhbnNmb3JtOiBsb3dlcmNhc2U7XFxufVxcblxcbi50ZXh0LWNhcGl0YWxpemUge1xcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxufVxcblxcbi5pcy1mdWxsLXNjcmVlbiB7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4uaXMtZnVsbC13aWR0aCB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcbn1cXG5cXG4uaXMtdmVydGljYWwtYWxpZ24ge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5pcy1jZW50ZXIsIC5pcy1ob3Jpem9udGFsLWFsaWduIHtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5pcy1jZW50ZXIge1xcbiAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uaXMtcmlnaHQge1xcbiAgLXdlYmtpdC1ib3gtcGFjazogZW5kO1xcbiAgLW1zLWZsZXgtcGFjazogZW5kO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG59XFxuXFxuLmlzLWxlZnQsIC5pcy1yaWdodCB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmlzLWxlZnQge1xcbiAgLXdlYmtpdC1ib3gtcGFjazogc3RhcnQ7XFxuICAtbXMtZmxleC1wYWNrOiBzdGFydDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG59XFxuXFxuLmlzLWZpeGVkIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4uaXMtcGFkZGluZ2xlc3Mge1xcbiAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uaXMtbWFyZ2lubGVzcyB7XFxuICBtYXJnaW46IDAgIWltcG9ydGFudDtcXG59XFxuXFxuLmlzLXBvaW50ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyICFpbXBvcnRhbnQ7XFxufVxcblxcbi5pcy1yb3VuZGVkIHtcXG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxufVxcblxcbi5jbGVhcmZpeCB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGRpc3BsYXk6IHRhYmxlO1xcbiAgY2xlYXI6IGJvdGg7XFxufVxcblxcbi5pcy1oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1OTlweCkge1xcbiAgLmhpZGUteHMge1xcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYwMHB4KSBhbmQgKG1heC13aWR0aDogODk5cHgpIHtcXG4gIC5oaWRlLXNtIHtcXG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA5MDBweCkgYW5kIChtYXgtd2lkdGg6IDExOTlweCkge1xcbiAgLmhpZGUtbWQge1xcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEyMDBweCkge1xcbiAgLmhpZGUtbGcge1xcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSBwcmludCB7XFxuICAuaGlkZS1wciB7XFxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG4gIH1cXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRDovUHJvamVjdHMvdHVja2Vyd2VkZGluZ3dlYnNpdGUvbm9kZV9tb2R1bGVzL2Nob3RhL2Rpc3QvY2hvdGEubWluLmNzc1wiLFwiY2hvdGEubWluLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSw2REFBQTtBQUE4RDtFQUFNLGVBQUE7RUFBZ0IsNEJBQUE7RUFBNkIsdUJBQUE7RUFBd0IseUJBQUE7RUFBMEIsb0JBQUE7RUFBcUIsd0JBQUE7RUFBeUIscUJBQUE7RUFBc0IsdUJBQUE7RUFBd0Isc0JBQUE7RUFBdUIsa0JBQUE7RUFBbUIsa0JBQUE7RUFBbUIsaUJBQUE7RUFBa0IsK0tBQUE7RUFBZ0wsK0RBQUE7QUNnQjlmOztBRGhCOGpCO0VBQUssOEJBQUE7RUFBOEIsc0JBQUE7RUFBc0IsZ0JBQUE7RUFBZ0IsaUJBQUE7RUFBaUIsMEJBQUE7RUFBMEIsOEJBQUE7QUN5QmxyQjs7QUR6Qmd0QjtFQUFpQiwyQkFBQTtFQUEyQixtQkFBQTtBQzhCNXZCOztBRDlCK3dCO0VBQUssaUNBQUE7RUFBaUMsZ0JBQUE7RUFBZ0IsMkJBQUE7RUFBMkIsd0JBQUE7RUFBd0IsaURBQUE7RUFBK0Msb0NBQUE7RUFBb0MsU0FBQTtFQUFTLFVBQUE7QUN5Q3A5Qjs7QUR6Qzg5QjtFQUFrQixnQkFBQTtFQUFnQixzQkFBQTtBQzhDaGdDOztBRDlDb2hDO0VBQUcsY0FBQTtBQ2tEdmhDOztBRGxEcWlDO0VBQUcsaUJBQUE7QUNzRHhpQzs7QUR0RHlqQztFQUFHLGdCQUFBO0FDMEQ1akM7O0FEMUQ0a0M7RUFBRyxpQkFBQTtBQzhEL2tDOztBRDlEZ21D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QTtFQUF3QixxQkFBQTtFQUFxQix1QkFBQTtBQ3EvQi96aEI7O0FEci9CczFoQjtFQUFXLHlCQUFBO0VBQXlCLHNCQUFBO0VBQXNCLG1CQUFBO0FDMi9CaDVoQjs7QUQzL0JtNmhCO0VBQVUscUJBQUE7RUFBcUIsa0JBQUE7RUFBa0IseUJBQUE7QUNpZ0NwOWhCOztBRGpnQzYraEI7RUFBbUIsb0JBQUE7RUFBb0Isb0JBQUE7RUFBb0IsYUFBQTtFQUFhLHlCQUFBO0VBQXlCLHNCQUFBO0VBQXNCLG1CQUFBO0FDMGdDcG1pQjs7QUQxZ0N1bmlCO0VBQVMsdUJBQUE7RUFBdUIsb0JBQUE7RUFBb0IsMkJBQUE7QUNnaEMzcWlCOztBRGhoQ3NzaUI7RUFBVSxlQUFBO0VBQWUsV0FBQTtBQ3FoQy90aUI7O0FEcmhDMHVpQjtFQUFnQixxQkFBQTtBQ3loQzF2aUI7O0FEemhDOHdpQjtFQUFlLG9CQUFBO0FDNmhDN3hpQjs7QUQ3aENnemlCO0VBQVksMEJBQUE7QUNpaUM1emlCOztBRGppQ3ExaUI7RUFBWSxtQkFBQTtBQ3FpQ2oyaUI7O0FEcmlDbzNpQjtFQUFVLFdBQUE7RUFBVyxjQUFBO0VBQWMsV0FBQTtBQzJpQ3Y1aUI7O0FEM2lDazZpQjtFQUFXLHdCQUFBO0FDK2lDNzZpQjs7QUQvaUNvOGlCO0VBQW9DO0lBQVMsd0JBQUE7RUNvakMvK2lCO0FBQ0Y7QURyakN5Z2pCO0VBQTBEO0lBQVMsd0JBQUE7RUN5akMxa2pCO0FBQ0Y7QUQxakNvbWpCO0VBQTJEO0lBQVMsd0JBQUE7RUM4akN0cWpCO0FBQ0Y7QUQvakNnc2pCO0VBQXFDO0lBQVMsd0JBQUE7RUNta0M1dWpCO0FBQ0Y7QURwa0Nzd2pCO0VBQWE7SUFBUyx3QkFBQTtFQ3drQzF4akI7QUFDRlwiLFwiZmlsZVwiOlwiY2hvdGEubWluLmNzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiEgY2hvdGEuY3NzIHYwLjcuMiB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9qZW5pbC9jaG90YSAqLzpyb290ey0tYmctY29sb3I6I2ZmZjstLWJnLXNlY29uZGFyeS1jb2xvcjojZjNmM2Y2Oy0tY29sb3ItcHJpbWFyeTojMTQ4NTRmOy0tY29sb3ItbGlnaHRHcmV5OiNkMmQ2ZGQ7LS1jb2xvci1ncmV5OiM3NDc2ODE7LS1jb2xvci1kYXJrR3JleTojM2Y0MTQ0Oy0tY29sb3ItZXJyb3I6I2Q0MzkzOTstLWNvbG9yLXN1Y2Nlc3M6IzI4YmQxNDstLWdyaWQtbWF4V2lkdGg6MTIwcmVtOy0tZ3JpZC1ndXR0ZXI6MnJlbTstLWZvbnQtc2l6ZToxLjZyZW07LS1mb250LWNvbG9yOiMzMzM7LS1mb250LWZhbWlseS1zYW5zOi1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LEF2ZW5pcixcXFwiQXZlbmlyIE5leHRcXFwiLFxcXCJTZWdvZSBVSVxcXCIsXFxcIlJvYm90b1xcXCIsXFxcIk94eWdlblxcXCIsXFxcIlVidW50dVxcXCIsXFxcIkNhbnRhcmVsbFxcXCIsXFxcIkZpcmEgU2Fuc1xcXCIsXFxcIkRyb2lkIFNhbnNcXFwiLFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsc2Fucy1zZXJpZjstLWZvbnQtZmFtaWx5LW1vbm86bW9uYWNvLFxcXCJDb25zb2xhc1xcXCIsXFxcIkx1Y2lkYSBDb25zb2xlXFxcIixtb25vc3BhY2V9aHRtbHstd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2l6aW5nOmJvcmRlci1ib3g7Zm9udC1zaXplOjYyLjUlO2xpbmUtaGVpZ2h0OjEuMTU7LW1zLXRleHQtc2l6ZS1hZGp1c3Q6MTAwJTstd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6MTAwJX0qLDphZnRlciw6YmVmb3Jley13ZWJraXQtYm94LXNpemluZzppbmhlcml0O2JveC1zaXppbmc6aW5oZXJpdH1ib2R5e2JhY2tncm91bmQtY29sb3I6dmFyKC0tYmctY29sb3IpO2xpbmUtaGVpZ2h0OjEuNjtmb250LXNpemU6dmFyKC0tZm9udC1zaXplKTtjb2xvcjp2YXIoLS1mb250LWNvbG9yKTtmb250LWZhbWlseTpTZWdvZSBVSSxIZWx2ZXRpY2EgTmV1ZSxzYW5zLXNlcmlmO2ZvbnQtZmFtaWx5OnZhcigtLWZvbnQtZmFtaWx5LXNhbnMpO21hcmdpbjowO3BhZGRpbmc6MH1oMSxoMixoMyxoNCxoNSxoNntmb250LXdlaWdodDo1MDA7bWFyZ2luOi4zNWVtIDAgLjdlbX1oMXtmb250LXNpemU6MmVtfWgye2ZvbnQtc2l6ZToxLjc1ZW19aDN7Zm9udC1zaXplOjEuNWVtfWg0e2ZvbnQtc2l6ZToxLjI1ZW19aDV7Zm9udC1zaXplOjFlbX1oNntmb250LXNpemU6Ljg1ZW19YXtjb2xvcjp2YXIoLS1jb2xvci1wcmltYXJ5KTt0ZXh0LWRlY29yYXRpb246bm9uZX1hOmhvdmVyOm5vdCguYnV0dG9uKXtvcGFjaXR5Oi43NX1idXR0b257Zm9udC1mYW1pbHk6aW5oZXJpdH1we21hcmdpbi10b3A6MH1ibG9ja3F1b3Rle2JhY2tncm91bmQtY29sb3I6dmFyKC0tYmctc2Vjb25kYXJ5LWNvbG9yKTtwYWRkaW5nOjEuNXJlbSAycmVtO2JvcmRlci1sZWZ0OjNweCBzb2xpZCB2YXIoLS1jb2xvci1saWdodEdyZXkpfWRsIGR0e2ZvbnQtd2VpZ2h0OjcwMH1ocntiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWNvbG9yLWxpZ2h0R3JleSk7aGVpZ2h0OjFweDttYXJnaW46MXJlbSAwfWhyLHRhYmxle2JvcmRlcjpub25lfXRhYmxle3dpZHRoOjEwMCU7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlO2JvcmRlci1zcGFjaW5nOjA7dGV4dC1hbGlnbjpsZWZ0fXRhYmxlLnN0cmlwZWQgdHI6bnRoLW9mLXR5cGUoMm4pe2JhY2tncm91bmQtY29sb3I6dmFyKC0tYmctc2Vjb25kYXJ5LWNvbG9yKX10ZCx0aHt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7cGFkZGluZzoxLjJyZW0gLjRyZW19dGhlYWR7Ym9yZGVyLWJvdHRvbToycHggc29saWQgdmFyKC0tY29sb3ItbGlnaHRHcmV5KX10Zm9vdHtib3JkZXItdG9wOjJweCBzb2xpZCB2YXIoLS1jb2xvci1saWdodEdyZXkpfWNvZGUsa2JkLHByZSxzYW1wLHR0e2ZvbnQtZmFtaWx5OnZhcigtLWZvbnQtZmFtaWx5LW1vbm8pfWNvZGUsa2Jke2ZvbnQtc2l6ZTo5MCU7d2hpdGUtc3BhY2U6cHJlLXdyYXA7Ym9yZGVyLXJhZGl1czo0cHg7cGFkZGluZzouMmVtIC40ZW07Y29sb3I6dmFyKC0tY29sb3ItZXJyb3IpfWNvZGUsa2JkLHByZXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJnLXNlY29uZGFyeS1jb2xvcil9cHJle2ZvbnQtc2l6ZToxZW07cGFkZGluZzoxcmVtO292ZXJmbG93LXg6YXV0b31wcmUgY29kZXtiYWNrZ3JvdW5kOm5vbmU7cGFkZGluZzowfWFiYnJbdGl0bGVde2JvcmRlci1ib3R0b206bm9uZTt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lOy13ZWJraXQtdGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZSBkb3R0ZWQ7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZSBkb3R0ZWR9aW1ne21heC13aWR0aDoxMDAlfWZpZWxkc2V0e2JvcmRlcjoxcHggc29saWQgdmFyKC0tY29sb3ItbGlnaHRHcmV5KX1pZnJhbWV7Ym9yZGVyOjB9LmNvbnRhaW5lcnttYXgtd2lkdGg6dmFyKC0tZ3JpZC1tYXhXaWR0aCk7bWFyZ2luOjAgYXV0bzt3aWR0aDo5NiU7cGFkZGluZzowIGNhbGModmFyKC0tZ3JpZC1ndXR0ZXIpLzIpfS5yb3d7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1kaXJlY3Rpb246bm9ybWFsOy1tcy1mbGV4LWZsb3c6cm93IHdyYXA7ZmxleC1mbG93OnJvdyB3cmFwOy13ZWJraXQtYm94LXBhY2s6c3RhcnQ7LW1zLWZsZXgtcGFjazpzdGFydDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDttYXJnaW4tbGVmdDpjYWxjKHZhcigtLWdyaWQtZ3V0dGVyKS8tMik7bWFyZ2luLXJpZ2h0OmNhbGModmFyKC0tZ3JpZC1ndXR0ZXIpLy0yKX0ucm93LC5yb3cucmV2ZXJzZXstd2Via2l0LWJveC1vcmllbnQ6aG9yaXpvbnRhbH0ucm93LnJldmVyc2V7LXdlYmtpdC1ib3gtZGlyZWN0aW9uOnJldmVyc2U7LW1zLWZsZXgtZGlyZWN0aW9uOnJvdy1yZXZlcnNlO2ZsZXgtZGlyZWN0aW9uOnJvdy1yZXZlcnNlfS5jb2x7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxfS5jb2wsW2NsYXNzKj1cXFwiIGNvbC1cXFwiXSxbY2xhc3NePWNvbC1de21hcmdpbjowIGNhbGModmFyKC0tZ3JpZC1ndXR0ZXIpLzIpIGNhbGModmFyKC0tZ3JpZC1ndXR0ZXIpLzIpfS5jb2wtMXstbXMtZmxleDowIDAgY2FsYyg4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7ZmxleDowIDAgY2FsYyg4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7bWF4LXdpZHRoOmNhbGMoOC4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtMSwuY29sLTJ7LXdlYmtpdC1ib3gtZmxleDowfS5jb2wtMnstbXMtZmxleDowIDAgY2FsYygxNi42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoMTYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYygxNi42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtM3stbXMtZmxleDowIDAgY2FsYygyNSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoMjUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYygyNSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtMywuY29sLTR7LXdlYmtpdC1ib3gtZmxleDowfS5jb2wtNHstbXMtZmxleDowIDAgY2FsYygzMy4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoMzMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYygzMy4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtNXstbXMtZmxleDowIDAgY2FsYyg0MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoNDEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYyg0MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtNSwuY29sLTZ7LXdlYmtpdC1ib3gtZmxleDowfS5jb2wtNnstbXMtZmxleDowIDAgY2FsYyg1MCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoNTAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYyg1MCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtN3stbXMtZmxleDowIDAgY2FsYyg1OC4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoNTguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYyg1OC4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtNywuY29sLTh7LXdlYmtpdC1ib3gtZmxleDowfS5jb2wtOHstbXMtZmxleDowIDAgY2FsYyg2Ni42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoNjYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYyg2Ni42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtOXstbXMtZmxleDowIDAgY2FsYyg3NSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoNzUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYyg3NSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtOSwuY29sLTEwey13ZWJraXQtYm94LWZsZXg6MH0uY29sLTEwey1tcy1mbGV4OjAgMCBjYWxjKDgzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7ZmxleDowIDAgY2FsYyg4My4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO21heC13aWR0aDpjYWxjKDgzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSl9LmNvbC0xMXstbXMtZmxleDowIDAgY2FsYyg5MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoOTEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYyg5MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtMTEsLmNvbC0xMnstd2Via2l0LWJveC1mbGV4OjB9LmNvbC0xMnstbXMtZmxleDowIDAgY2FsYygxMDAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtmbGV4OjAgMCBjYWxjKDEwMCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO21heC13aWR0aDpjYWxjKDEwMCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTk5cHgpey5jb250YWluZXJ7d2lkdGg6MTAwJX0uY29sLFtjbGFzcyo9Y29sLV0sW2NsYXNzXj1jb2wtXXstd2Via2l0LWJveC1mbGV4OjA7LW1zLWZsZXg6MCAxIDEwMCU7ZmxleDowIDEgMTAwJTttYXgtd2lkdGg6MTAwJX19QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo5MDBweCl7LmNvbC0xLW1key13ZWJraXQtYm94LWZsZXg6MDstbXMtZmxleDowIDAgY2FsYyg4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7ZmxleDowIDAgY2FsYyg4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7bWF4LXdpZHRoOmNhbGMoOC4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtMi1tZHstd2Via2l0LWJveC1mbGV4OjA7LW1zLWZsZXg6MCAwIGNhbGMoMTYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtmbGV4OjAgMCBjYWxjKDE2LjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7bWF4LXdpZHRoOmNhbGMoMTYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKX0uY29sLTMtbWR7LXdlYmtpdC1ib3gtZmxleDowOy1tcy1mbGV4OjAgMCBjYWxjKDI1JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7ZmxleDowIDAgY2FsYygyNSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO21heC13aWR0aDpjYWxjKDI1JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSl9LmNvbC00LW1key13ZWJraXQtYm94LWZsZXg6MDstbXMtZmxleDowIDAgY2FsYygzMy4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoMzMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYygzMy4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtNS1tZHstd2Via2l0LWJveC1mbGV4OjA7LW1zLWZsZXg6MCAwIGNhbGMoNDEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtmbGV4OjAgMCBjYWxjKDQxLjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7bWF4LXdpZHRoOmNhbGMoNDEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKX0uY29sLTYtbWR7LXdlYmtpdC1ib3gtZmxleDowOy1tcy1mbGV4OjAgMCBjYWxjKDUwJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7ZmxleDowIDAgY2FsYyg1MCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO21heC13aWR0aDpjYWxjKDUwJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSl9LmNvbC03LW1key13ZWJraXQtYm94LWZsZXg6MDstbXMtZmxleDowIDAgY2FsYyg1OC4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoNTguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYyg1OC4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtOC1tZHstd2Via2l0LWJveC1mbGV4OjA7LW1zLWZsZXg6MCAwIGNhbGMoNjYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtmbGV4OjAgMCBjYWxjKDY2LjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7bWF4LXdpZHRoOmNhbGMoNjYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKX0uY29sLTktbWR7LXdlYmtpdC1ib3gtZmxleDowOy1tcy1mbGV4OjAgMCBjYWxjKDc1JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7ZmxleDowIDAgY2FsYyg3NSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO21heC13aWR0aDpjYWxjKDc1JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSl9LmNvbC0xMC1tZHstd2Via2l0LWJveC1mbGV4OjA7LW1zLWZsZXg6MCAwIGNhbGMoODMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtmbGV4OjAgMCBjYWxjKDgzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7bWF4LXdpZHRoOmNhbGMoODMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKX0uY29sLTExLW1key13ZWJraXQtYm94LWZsZXg6MDstbXMtZmxleDowIDAgY2FsYyg5MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoOTEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYyg5MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtMTItbWR7LXdlYmtpdC1ib3gtZmxleDowOy1tcy1mbGV4OjAgMCBjYWxjKDEwMCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoMTAwJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7bWF4LXdpZHRoOmNhbGMoMTAwJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSl9fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MTIwMHB4KXsuY29sLTEtbGd7LXdlYmtpdC1ib3gtZmxleDowOy1tcy1mbGV4OjAgMCBjYWxjKDguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtmbGV4OjAgMCBjYWxjKDguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYyg4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSl9LmNvbC0yLWxney13ZWJraXQtYm94LWZsZXg6MDstbXMtZmxleDowIDAgY2FsYygxNi42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoMTYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYygxNi42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtMy1sZ3std2Via2l0LWJveC1mbGV4OjA7LW1zLWZsZXg6MCAwIGNhbGMoMjUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtmbGV4OjAgMCBjYWxjKDI1JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7bWF4LXdpZHRoOmNhbGMoMjUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKX0uY29sLTQtbGd7LXdlYmtpdC1ib3gtZmxleDowOy1tcy1mbGV4OjAgMCBjYWxjKDMzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7ZmxleDowIDAgY2FsYygzMy4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO21heC13aWR0aDpjYWxjKDMzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSl9LmNvbC01LWxney13ZWJraXQtYm94LWZsZXg6MDstbXMtZmxleDowIDAgY2FsYyg0MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoNDEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYyg0MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtNi1sZ3std2Via2l0LWJveC1mbGV4OjA7LW1zLWZsZXg6MCAwIGNhbGMoNTAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtmbGV4OjAgMCBjYWxjKDUwJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7bWF4LXdpZHRoOmNhbGMoNTAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKX0uY29sLTctbGd7LXdlYmtpdC1ib3gtZmxleDowOy1tcy1mbGV4OjAgMCBjYWxjKDU4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7ZmxleDowIDAgY2FsYyg1OC4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO21heC13aWR0aDpjYWxjKDU4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSl9LmNvbC04LWxney13ZWJraXQtYm94LWZsZXg6MDstbXMtZmxleDowIDAgY2FsYyg2Ni42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoNjYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYyg2Ni42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtOS1sZ3std2Via2l0LWJveC1mbGV4OjA7LW1zLWZsZXg6MCAwIGNhbGMoNzUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtmbGV4OjAgMCBjYWxjKDc1JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7bWF4LXdpZHRoOmNhbGMoNzUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKX0uY29sLTEwLWxney13ZWJraXQtYm94LWZsZXg6MDstbXMtZmxleDowIDAgY2FsYyg4My4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO2ZsZXg6MCAwIGNhbGMoODMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYyg4My4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpfS5jb2wtMTEtbGd7LXdlYmtpdC1ib3gtZmxleDowOy1tcy1mbGV4OjAgMCBjYWxjKDkxLjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7ZmxleDowIDAgY2FsYyg5MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO21heC13aWR0aDpjYWxjKDkxLjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSl9LmNvbC0xMi1sZ3std2Via2l0LWJveC1mbGV4OjA7LW1zLWZsZXg6MCAwIGNhbGMoMTAwJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7ZmxleDowIDAgY2FsYygxMDAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTttYXgtd2lkdGg6Y2FsYygxMDAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKX19ZmllbGRzZXR7cGFkZGluZzouNXJlbSAycmVtfWxlZ2VuZHt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Zm9udC1zaXplOi44ZW07bGV0dGVyLXNwYWNpbmc6LjFyZW19aW5wdXQ6bm90KFt0eXBlPWNoZWNrYm94XSk6bm90KFt0eXBlPXJhZGlvXSk6bm90KFt0eXBlPXN1Ym1pdF0pOm5vdChbdHlwZT1jb2xvcl0pOm5vdChbdHlwZT1idXR0b25dKTpub3QoW3R5cGU9cmVzZXRdKSxzZWxlY3QsdGV4dGFyZWEsdGV4dGFyZWFbdHlwZT10ZXh0XXtmb250LWZhbWlseTppbmhlcml0O3BhZGRpbmc6LjhyZW0gMXJlbTtib3JkZXItcmFkaXVzOjRweDtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSk7Zm9udC1zaXplOjFlbTstd2Via2l0LXRyYW5zaXRpb246YWxsIC4ycyBlYXNlO3RyYW5zaXRpb246YWxsIC4ycyBlYXNlO2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJX1pbnB1dDpub3QoW3R5cGU9Y2hlY2tib3hdKTpub3QoW3R5cGU9cmFkaW9dKTpub3QoW3R5cGU9c3VibWl0XSk6bm90KFt0eXBlPWNvbG9yXSk6bm90KFt0eXBlPWJ1dHRvbl0pOm5vdChbdHlwZT1yZXNldF0pOm5vdCg6ZGlzYWJsZWQpOmhvdmVyLHNlbGVjdDpob3Zlcix0ZXh0YXJlYTpob3Zlcix0ZXh0YXJlYVt0eXBlPXRleHRdOmhvdmVye2JvcmRlci1jb2xvcjp2YXIoLS1jb2xvci1ncmV5KX1pbnB1dDpub3QoW3R5cGU9Y2hlY2tib3hdKTpub3QoW3R5cGU9cmFkaW9dKTpub3QoW3R5cGU9c3VibWl0XSk6bm90KFt0eXBlPWNvbG9yXSk6bm90KFt0eXBlPWJ1dHRvbl0pOm5vdChbdHlwZT1yZXNldF0pOmZvY3VzLHNlbGVjdDpmb2N1cyx0ZXh0YXJlYTpmb2N1cyx0ZXh0YXJlYVt0eXBlPXRleHRdOmZvY3Vze291dGxpbmU6bm9uZTtib3JkZXItY29sb3I6dmFyKC0tY29sb3ItcHJpbWFyeSk7LXdlYmtpdC1ib3gtc2hhZG93OjAgMCAxcHggdmFyKC0tY29sb3ItcHJpbWFyeSk7Ym94LXNoYWRvdzowIDAgMXB4IHZhcigtLWNvbG9yLXByaW1hcnkpfWlucHV0LmVycm9yOm5vdChbdHlwZT1jaGVja2JveF0pOm5vdChbdHlwZT1yYWRpb10pOm5vdChbdHlwZT1zdWJtaXRdKTpub3QoW3R5cGU9Y29sb3JdKTpub3QoW3R5cGU9YnV0dG9uXSk6bm90KFt0eXBlPXJlc2V0XSksdGV4dGFyZWEuZXJyb3J7Ym9yZGVyLWNvbG9yOnZhcigtLWNvbG9yLWVycm9yKX1pbnB1dC5zdWNjZXNzOm5vdChbdHlwZT1jaGVja2JveF0pOm5vdChbdHlwZT1yYWRpb10pOm5vdChbdHlwZT1zdWJtaXRdKTpub3QoW3R5cGU9Y29sb3JdKTpub3QoW3R5cGU9YnV0dG9uXSk6bm90KFt0eXBlPXJlc2V0XSksdGV4dGFyZWEuc3VjY2Vzc3tib3JkZXItY29sb3I6dmFyKC0tY29sb3Itc3VjY2Vzcyl9c2VsZWN0ey13ZWJraXQtYXBwZWFyYW5jZTpub25lO2JhY2tncm91bmQ6I2YzZjNmNiBuby1yZXBlYXQgMTAwJTtiYWNrZ3JvdW5kLXNpemU6MWV4O2JhY2tncm91bmQtb3JpZ2luOmNvbnRlbnQtYm94O2JhY2tncm91bmQtaW1hZ2U6dXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWw7dXRmOCw8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzYwJyBoZWlnaHQ9JzQwJyBmaWxsPSclMjM1NTUnPjxwb2x5Z29uIHBvaW50cz0nMCwwIDYwLDAgMzAsNDAnLz48L3N2Zz5cXFwiKX1bdHlwZT1jaGVja2JveF0sW3R5cGU9cmFkaW9de3dpZHRoOjEuNnJlbTtoZWlnaHQ6MS42cmVtfS5idXR0b24sW3R5cGU9YnV0dG9uXSxbdHlwZT1yZXNldF0sW3R5cGU9c3VibWl0XSxidXR0b257cGFkZGluZzoxcmVtIDIuNXJlbTtjb2xvcjp2YXIoLS1jb2xvci1kYXJrR3JleSk7YmFja2dyb3VuZDp2YXIoLS1jb2xvci1saWdodEdyZXkpO2JvcmRlci1yYWRpdXM6NHB4O2JvcmRlcjoxcHggc29saWQgdHJhbnNwYXJlbnQ7Zm9udC1zaXplOnZhcigtLWZvbnQtc2l6ZSk7bGluZS1oZWlnaHQ6MTt0ZXh0LWFsaWduOmNlbnRlcjstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAuMnMgZWFzZTt0cmFuc2l0aW9uOm9wYWNpdHkgLjJzIGVhc2U7dGV4dC1kZWNvcmF0aW9uOm5vbmU7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2N1cnNvcjpwb2ludGVyfS5ncm91cGVke2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXh9Lmdyb3VwZWQ+Om5vdCg6bGFzdC1jaGlsZCl7bWFyZ2luLXJpZ2h0OjE2cHh9Lmdyb3VwZWQuZ2FwbGVzcz4qe21hcmdpbjowIDAgMCAtMXB4IWltcG9ydGFudDtib3JkZXItcmFkaXVzOjAhaW1wb3J0YW50fS5ncm91cGVkLmdhcGxlc3M+OmZpcnN0LWNoaWxke21hcmdpbjowIWltcG9ydGFudDtib3JkZXItcmFkaXVzOjRweCAwIDAgNHB4IWltcG9ydGFudH0uZ3JvdXBlZC5nYXBsZXNzPjpsYXN0LWNoaWxke2JvcmRlci1yYWRpdXM6MCA0cHggNHB4IDAhaW1wb3J0YW50fS5idXR0b24rLmJ1dHRvbnttYXJnaW4tbGVmdDoxcmVtfS5idXR0b246aG92ZXIsW3R5cGU9YnV0dG9uXTpob3ZlcixbdHlwZT1yZXNldF06aG92ZXIsW3R5cGU9c3VibWl0XTpob3ZlcixidXR0b246aG92ZXJ7b3BhY2l0eTouOH0uYnV0dG9uOmFjdGl2ZSxbdHlwZT1idXR0b25dOmFjdGl2ZSxbdHlwZT1yZXNldF06YWN0aXZlLFt0eXBlPXN1Ym1pdF06YWN0aXZlLGJ1dHRvbjphY3RpdmV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoLjk4KTt0cmFuc2Zvcm06c2NhbGUoLjk4KX1idXR0b246ZGlzYWJsZWQsYnV0dG9uOmRpc2FibGVkOmhvdmVyLGlucHV0OmRpc2FibGVkLGlucHV0OmRpc2FibGVkOmhvdmVye29wYWNpdHk6LjQ7Y3Vyc29yOm5vdC1hbGxvd2VkfS5idXR0b24uZGFyaywuYnV0dG9uLmVycm9yLC5idXR0b24ucHJpbWFyeSwuYnV0dG9uLnNlY29uZGFyeSwuYnV0dG9uLnN1Y2Nlc3MsW3R5cGU9c3VibWl0XXtjb2xvcjojZmZmO3otaW5kZXg6MTtiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1jb2xvci1wcmltYXJ5KX0uYnV0dG9uLnNlY29uZGFyeXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWNvbG9yLWdyZXkpfS5idXR0b24uZGFya3tiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWNvbG9yLWRhcmtHcmV5KX0uYnV0dG9uLmVycm9ye2JhY2tncm91bmQtY29sb3I6dmFyKC0tY29sb3ItZXJyb3IpfS5idXR0b24uc3VjY2Vzc3tiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWNvbG9yLXN1Y2Nlc3MpfS5idXR0b24ub3V0bGluZXtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlci1jb2xvcjp2YXIoLS1jb2xvci1saWdodEdyZXkpfS5idXR0b24ub3V0bGluZS5wcmltYXJ5e2JvcmRlci1jb2xvcjp2YXIoLS1jb2xvci1wcmltYXJ5KTtjb2xvcjp2YXIoLS1jb2xvci1wcmltYXJ5KX0uYnV0dG9uLm91dGxpbmUuc2Vjb25kYXJ5e2JvcmRlci1jb2xvcjp2YXIoLS1jb2xvci1ncmV5KTtjb2xvcjp2YXIoLS1jb2xvci1ncmV5KX0uYnV0dG9uLm91dGxpbmUuZGFya3tib3JkZXItY29sb3I6dmFyKC0tY29sb3ItZGFya0dyZXkpO2NvbG9yOnZhcigtLWNvbG9yLWRhcmtHcmV5KX0uYnV0dG9uLmNsZWFye2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50O2NvbG9yOnZhcigtLWNvbG9yLXByaW1hcnkpfS5idXR0b24uaWNvbntkaXNwbGF5Oi13ZWJraXQtaW5saW5lLWJveDtkaXNwbGF5Oi1tcy1pbmxpbmUtZmxleGJveDtkaXNwbGF5OmlubGluZS1mbGV4Oy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjstbXMtZmxleC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS5idXR0b24uaWNvbj5pbWd7bWFyZ2luLWxlZnQ6MnB4fS5idXR0b24uaWNvbi1vbmx5e3BhZGRpbmc6MXJlbX06Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6I2JkYmZjNH06Oi1tb3otcGxhY2Vob2xkZXJ7Y29sb3I6I2JkYmZjNH06LW1zLWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOiNiZGJmYzR9OjotbXMtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6I2JkYmZjNH06OnBsYWNlaG9sZGVye2NvbG9yOiNiZGJmYzR9Lm5hdntkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O21pbi1oZWlnaHQ6NXJlbTstd2Via2l0LWJveC1hbGlnbjpzdHJldGNoOy1tcy1mbGV4LWFsaWduOnN0cmV0Y2g7YWxpZ24taXRlbXM6c3RyZXRjaH0ubmF2IGltZ3ttYXgtaGVpZ2h0OjNyZW19Lm5hdi1jZW50ZXIsLm5hdi1sZWZ0LC5uYXYtcmlnaHQsLm5hdj4uY29udGFpbmVye2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXh9Lm5hdi1jZW50ZXIsLm5hdi1sZWZ0LC5uYXYtcmlnaHR7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjE7ZmxleDoxfS5uYXYtbGVmdHstd2Via2l0LWJveC1wYWNrOnN0YXJ0Oy1tcy1mbGV4LXBhY2s6c3RhcnQ7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnR9Lm5hdi1yaWdodHstd2Via2l0LWJveC1wYWNrOmVuZDstbXMtZmxleC1wYWNrOmVuZDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9Lm5hdi1jZW50ZXJ7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7LW1zLWZsZXgtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcn1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjQ4MHB4KXsubmF2LC5uYXY+LmNvbnRhaW5lcnstd2Via2l0LWJveC1vcmllbnQ6dmVydGljYWw7LXdlYmtpdC1ib3gtZGlyZWN0aW9uOm5vcm1hbDstbXMtZmxleC1kaXJlY3Rpb246Y29sdW1uO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn0ubmF2LWNlbnRlciwubmF2LWxlZnQsLm5hdi1yaWdodHstbXMtZmxleC13cmFwOndyYXA7ZmxleC13cmFwOndyYXA7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7LW1zLWZsZXgtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcn19Lm5hdiAuYnJhbmQsLm5hdiBhe3RleHQtZGVjb3JhdGlvbjpub25lO2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7cGFkZGluZzoxcmVtIDJyZW07Y29sb3I6dmFyKC0tY29sb3ItZGFya0dyZXkpfS5uYXYgLmFjdGl2ZTpub3QoLmJ1dHRvbil7Y29sb3I6IzAwMDtjb2xvcjp2YXIoLS1jb2xvci1wcmltYXJ5KX0ubmF2IC5icmFuZHtmb250LXNpemU6MS43NWVtO3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MH0ubmF2IC5icmFuZCBpbWd7cGFkZGluZy1yaWdodDoxcmVtfS5uYXYgLmJ1dHRvbnttYXJnaW46YXV0byAxcmVtfS5jYXJke3BhZGRpbmc6MXJlbSAycmVtO2JvcmRlci1yYWRpdXM6NHB4O2JhY2tncm91bmQ6dmFyKC0tYmctY29sb3IpOy13ZWJraXQtYm94LXNoYWRvdzowIDFweCAzcHggdmFyKC0tY29sb3ItZ3JleSk7Ym94LXNoYWRvdzowIDFweCAzcHggdmFyKC0tY29sb3ItZ3JleSl9LmNhcmQgcDpsYXN0LWNoaWxke21hcmdpbjowfS5jYXJkIGhlYWRlcj4qe21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjFyZW19LnRhYnN7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleH0udGFicyBhe3RleHQtZGVjb3JhdGlvbjpub25lfS50YWJzPi5kcm9wZG93bj5zdW1tYXJ5LC50YWJzPmF7cGFkZGluZzoxcmVtIDJyZW07LXdlYmtpdC1ib3gtZmxleDowOy1tcy1mbGV4OjAgMSBhdXRvO2ZsZXg6MCAxIGF1dG87Y29sb3I6dmFyKC0tY29sb3ItZGFya0dyZXkpO2JvcmRlci1ib3R0b206MnB4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSk7dGV4dC1hbGlnbjpjZW50ZXJ9LnRhYnM+YS5hY3RpdmUsLnRhYnM+YTpob3ZlcntvcGFjaXR5OjE7Ym9yZGVyLWJvdHRvbToycHggc29saWQgdmFyKC0tY29sb3ItZGFya0dyZXkpfS50YWJzPmEuYWN0aXZle2JvcmRlci1jb2xvcjp2YXIoLS1jb2xvci1wcmltYXJ5KX0udGFicy5pcy1mdWxsIGF7LXdlYmtpdC1ib3gtZmxleDoxOy1tcy1mbGV4OjEgMSBhdXRvO2ZsZXg6MSAxIGF1dG99LnRhZ3tkaXNwbGF5OmlubGluZS1ibG9jaztib3JkZXI6MXB4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSk7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2NvbG9yOnZhcigtLWNvbG9yLWdyZXkpO3BhZGRpbmc6LjVyZW07bGluZS1oZWlnaHQ6MTtsZXR0ZXItc3BhY2luZzouNXB4fS50YWcuaXMtc21hbGx7cGFkZGluZzouNHJlbTtmb250LXNpemU6Ljc1ZW19LnRhZy5pcy1sYXJnZXtwYWRkaW5nOi43cmVtO2ZvbnQtc2l6ZToxLjEyNWVtfS50YWcrLnRhZ3ttYXJnaW4tbGVmdDoxcmVtfWRldGFpbHMuZHJvcGRvd257cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTppbmxpbmUtYmxvY2t9ZGV0YWlscy5kcm9wZG93bj46bGFzdC1jaGlsZHtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7d2hpdGUtc3BhY2U6bm93cmFwfS5iZy1wcmltYXJ5e2JhY2tncm91bmQtY29sb3I6dmFyKC0tY29sb3ItcHJpbWFyeSkhaW1wb3J0YW50fS5iZy1saWdodHtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWNvbG9yLWxpZ2h0R3JleSkhaW1wb3J0YW50fS5iZy1kYXJre2JhY2tncm91bmQtY29sb3I6dmFyKC0tY29sb3ItZGFya0dyZXkpIWltcG9ydGFudH0uYmctZ3JleXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWNvbG9yLWdyZXkpIWltcG9ydGFudH0uYmctZXJyb3J7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1jb2xvci1lcnJvcikhaW1wb3J0YW50fS5iZy1zdWNjZXNze2JhY2tncm91bmQtY29sb3I6dmFyKC0tY29sb3Itc3VjY2VzcykhaW1wb3J0YW50fS5iZC1wcmltYXJ5e2JvcmRlcjoxcHggc29saWQgdmFyKC0tY29sb3ItcHJpbWFyeSkhaW1wb3J0YW50fS5iZC1saWdodHtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSkhaW1wb3J0YW50fS5iZC1kYXJre2JvcmRlcjoxcHggc29saWQgdmFyKC0tY29sb3ItZGFya0dyZXkpIWltcG9ydGFudH0uYmQtZ3JleXtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWNvbG9yLWdyZXkpIWltcG9ydGFudH0uYmQtZXJyb3J7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS1jb2xvci1lcnJvcikhaW1wb3J0YW50fS5iZC1zdWNjZXNze2JvcmRlcjoxcHggc29saWQgdmFyKC0tY29sb3Itc3VjY2VzcykhaW1wb3J0YW50fS50ZXh0LXByaW1hcnl7Y29sb3I6dmFyKC0tY29sb3ItcHJpbWFyeSkhaW1wb3J0YW50fS50ZXh0LWxpZ2h0e2NvbG9yOnZhcigtLWNvbG9yLWxpZ2h0R3JleSkhaW1wb3J0YW50fS50ZXh0LWRhcmt7Y29sb3I6dmFyKC0tY29sb3ItZGFya0dyZXkpIWltcG9ydGFudH0udGV4dC1ncmV5e2NvbG9yOnZhcigtLWNvbG9yLWdyZXkpIWltcG9ydGFudH0udGV4dC1lcnJvcntjb2xvcjp2YXIoLS1jb2xvci1lcnJvcikhaW1wb3J0YW50fS50ZXh0LXN1Y2Nlc3N7Y29sb3I6dmFyKC0tY29sb3Itc3VjY2VzcykhaW1wb3J0YW50fS50ZXh0LXdoaXRle2NvbG9yOiNmZmYhaW1wb3J0YW50fS5wdWxsLXJpZ2h0e2Zsb2F0OnJpZ2h0IWltcG9ydGFudH0ucHVsbC1sZWZ0e2Zsb2F0OmxlZnQhaW1wb3J0YW50fS50ZXh0LWNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn0udGV4dC1sZWZ0e3RleHQtYWxpZ246bGVmdH0udGV4dC1yaWdodHt0ZXh0LWFsaWduOnJpZ2h0fS50ZXh0LWp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS50ZXh0LXVwcGVyY2FzZXt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2V9LnRleHQtbG93ZXJjYXNle3RleHQtdHJhbnNmb3JtOmxvd2VyY2FzZX0udGV4dC1jYXBpdGFsaXple3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemV9LmlzLWZ1bGwtc2NyZWVue3dpZHRoOjEwMCU7bWluLWhlaWdodDoxMDB2aH0uaXMtZnVsbC13aWR0aHt3aWR0aDoxMDAlIWltcG9ydGFudH0uaXMtdmVydGljYWwtYWxpZ257ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0uaXMtY2VudGVyLC5pcy1ob3Jpem9udGFsLWFsaWdue2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7LW1zLWZsZXgtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcn0uaXMtY2VudGVyey13ZWJraXQtYm94LWFsaWduOmNlbnRlcjstbXMtZmxleC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS5pcy1yaWdodHstd2Via2l0LWJveC1wYWNrOmVuZDstbXMtZmxleC1wYWNrOmVuZDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmR9LmlzLWxlZnQsLmlzLXJpZ2h0e2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LmlzLWxlZnR7LXdlYmtpdC1ib3gtcGFjazpzdGFydDstbXMtZmxleC1wYWNrOnN0YXJ0O2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0fS5pcy1maXhlZHtwb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlfS5pcy1wYWRkaW5nbGVzc3twYWRkaW5nOjAhaW1wb3J0YW50fS5pcy1tYXJnaW5sZXNze21hcmdpbjowIWltcG9ydGFudH0uaXMtcG9pbnRlcntjdXJzb3I6cG9pbnRlciFpbXBvcnRhbnR9LmlzLXJvdW5kZWR7Ym9yZGVyLXJhZGl1czoxMDAlfS5jbGVhcmZpeHtjb250ZW50OlxcXCJcXFwiO2Rpc3BsYXk6dGFibGU7Y2xlYXI6Ym90aH0uaXMtaGlkZGVue2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo1OTlweCl7LmhpZGUteHN7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo2MDBweCkgYW5kIChtYXgtd2lkdGg6ODk5cHgpey5oaWRlLXNte2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6OTAwcHgpIGFuZCAobWF4LXdpZHRoOjExOTlweCl7LmhpZGUtbWR7ZGlzcGxheTpub25lIWltcG9ydGFudH19QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDoxMjAwcHgpey5oaWRlLWxne2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSBwcmludHsuaGlkZS1wcntkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1cIixcIi8qISBjaG90YS5jc3MgdjAuNy4yIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL2plbmlsL2Nob3RhICovXFxuOnJvb3Qge1xcbiAgLS1iZy1jb2xvcjojZmZmO1xcbiAgLS1iZy1zZWNvbmRhcnktY29sb3I6I2YzZjNmNjtcXG4gIC0tY29sb3ItcHJpbWFyeTojMTQ4NTRmO1xcbiAgLS1jb2xvci1saWdodEdyZXk6I2QyZDZkZDtcXG4gIC0tY29sb3ItZ3JleTojNzQ3NjgxO1xcbiAgLS1jb2xvci1kYXJrR3JleTojM2Y0MTQ0O1xcbiAgLS1jb2xvci1lcnJvcjojZDQzOTM5O1xcbiAgLS1jb2xvci1zdWNjZXNzOiMyOGJkMTQ7XFxuICAtLWdyaWQtbWF4V2lkdGg6MTIwcmVtO1xcbiAgLS1ncmlkLWd1dHRlcjoycmVtO1xcbiAgLS1mb250LXNpemU6MS42cmVtO1xcbiAgLS1mb250LWNvbG9yOiMzMzM7XFxuICAtLWZvbnQtZmFtaWx5LXNhbnM6LWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsQXZlbmlyLFxcXCJBdmVuaXIgTmV4dFxcXCIsXFxcIlNlZ29lIFVJXFxcIixcXFwiUm9ib3RvXFxcIixcXFwiT3h5Z2VuXFxcIixcXFwiVWJ1bnR1XFxcIixcXFwiQ2FudGFyZWxsXFxcIixcXFwiRmlyYSBTYW5zXFxcIixcXFwiRHJvaWQgU2Fuc1xcXCIsXFxcIkhlbHZldGljYSBOZXVlXFxcIixzYW5zLXNlcmlmO1xcbiAgLS1mb250LWZhbWlseS1tb25vOm1vbmFjbyxcXFwiQ29uc29sYXNcXFwiLFxcXCJMdWNpZGEgQ29uc29sZVxcXCIsbW9ub3NwYWNlO1xcbn1cXG5cXG5odG1sIHtcXG4gIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LXNpemU6IDYyLjUlO1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7XFxuICAtbXMtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcXG59XFxuXFxuKiwgOmFmdGVyLCA6YmVmb3JlIHtcXG4gIC13ZWJraXQtYm94LXNpemluZzogaW5oZXJpdDtcXG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmctY29sb3IpO1xcbiAgbGluZS1oZWlnaHQ6IDEuNjtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zaXplKTtcXG4gIGNvbG9yOiB2YXIoLS1mb250LWNvbG9yKTtcXG4gIGZvbnQtZmFtaWx5OiBTZWdvZSBVSSwgSGVsdmV0aWNhIE5ldWUsIHNhbnMtc2VyaWY7XFxuICBmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktc2Fucyk7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2IHtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBtYXJnaW46IDAuMzVlbSAwIDAuN2VtO1xcbn1cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDJlbTtcXG59XFxuXFxuaDIge1xcbiAgZm9udC1zaXplOiAxLjc1ZW07XFxufVxcblxcbmgzIHtcXG4gIGZvbnQtc2l6ZTogMS41ZW07XFxufVxcblxcbmg0IHtcXG4gIGZvbnQtc2l6ZTogMS4yNWVtO1xcbn1cXG5cXG5oNSB7XFxuICBmb250LXNpemU6IDFlbTtcXG59XFxuXFxuaDYge1xcbiAgZm9udC1zaXplOiAwLjg1ZW07XFxufVxcblxcbmEge1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLXByaW1hcnkpO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG5hOmhvdmVyOm5vdCguYnV0dG9uKSB7XFxuICBvcGFjaXR5OiAwLjc1O1xcbn1cXG5cXG5idXR0b24ge1xcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxufVxcblxcbnAge1xcbiAgbWFyZ2luLXRvcDogMDtcXG59XFxuXFxuYmxvY2txdW90ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iZy1zZWNvbmRhcnktY29sb3IpO1xcbiAgcGFkZGluZzogMS41cmVtIDJyZW07XFxuICBib3JkZXItbGVmdDogM3B4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSk7XFxufVxcblxcbmRsIGR0IHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcblxcbmhyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWxpZ2h0R3JleSk7XFxuICBoZWlnaHQ6IDFweDtcXG4gIG1hcmdpbjogMXJlbSAwO1xcbn1cXG5cXG5ociwgdGFibGUge1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG50YWJsZSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcblxcbnRhYmxlLnN0cmlwZWQgdHI6bnRoLW9mLXR5cGUoMm4pIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLXNlY29uZGFyeS1jb2xvcik7XFxufVxcblxcbnRkLCB0aCB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgcGFkZGluZzogMS4ycmVtIDAuNHJlbTtcXG59XFxuXFxudGhlYWQge1xcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSk7XFxufVxcblxcbnRmb290IHtcXG4gIGJvcmRlci10b3A6IDJweCBzb2xpZCB2YXIoLS1jb2xvci1saWdodEdyZXkpO1xcbn1cXG5cXG5jb2RlLCBrYmQsIHByZSwgc2FtcCwgdHQge1xcbiAgZm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LW1vbm8pO1xcbn1cXG5cXG5jb2RlLCBrYmQge1xcbiAgZm9udC1zaXplOiA5MCU7XFxuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBwYWRkaW5nOiAwLjJlbSAwLjRlbTtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1lcnJvcik7XFxufVxcblxcbmNvZGUsIGtiZCwgcHJlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLXNlY29uZGFyeS1jb2xvcik7XFxufVxcblxcbnByZSB7XFxuICBmb250LXNpemU6IDFlbTtcXG4gIHBhZGRpbmc6IDFyZW07XFxuICBvdmVyZmxvdy14OiBhdXRvO1xcbn1cXG5cXG5wcmUgY29kZSB7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuYWJiclt0aXRsZV0ge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgLXdlYmtpdC10ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7XFxufVxcblxcbmltZyB7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxufVxcblxcbmZpZWxkc2V0IHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSk7XFxufVxcblxcbmlmcmFtZSB7XFxuICBib3JkZXI6IDA7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgbWF4LXdpZHRoOiB2YXIoLS1ncmlkLW1heFdpZHRoKTtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgd2lkdGg6IDk2JTtcXG4gIHBhZGRpbmc6IDAgY2FsYyh2YXIoLS1ncmlkLWd1dHRlcikvMik7XFxufVxcblxcbi5yb3cge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gIC1tcy1mbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcXG4gIC13ZWJraXQtYm94LXBhY2s6IHN0YXJ0O1xcbiAgLW1zLWZsZXgtcGFjazogc3RhcnQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBtYXJnaW4tbGVmdDogY2FsYyh2YXIoLS1ncmlkLWd1dHRlcikvLTIpO1xcbiAgbWFyZ2luLXJpZ2h0OiBjYWxjKHZhcigtLWdyaWQtZ3V0dGVyKS8tMik7XFxufVxcblxcbi5yb3csIC5yb3cucmV2ZXJzZSB7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IGhvcml6b250YWw7XFxufVxcblxcbi5yb3cucmV2ZXJzZSB7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IHJldmVyc2U7XFxuICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xcbn1cXG5cXG4uY29sIHtcXG4gIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAtbXMtZmxleDogMTtcXG4gIGZsZXg6IDE7XFxufVxcblxcbi5jb2wsIFtjbGFzcyo9XFxcIiBjb2wtXFxcIl0sIFtjbGFzc149Y29sLV0ge1xcbiAgbWFyZ2luOiAwIGNhbGModmFyKC0tZ3JpZC1ndXR0ZXIpLzIpIGNhbGModmFyKC0tZ3JpZC1ndXR0ZXIpLzIpO1xcbn1cXG5cXG4uY29sLTEge1xcbiAgLW1zLWZsZXg6IDAgMCBjYWxjKDguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIGZsZXg6IDAgMCBjYWxjKDguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIG1heC13aWR0aDogY2FsYyg4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxufVxcblxcbi5jb2wtMSwgLmNvbC0yIHtcXG4gIC13ZWJraXQtYm94LWZsZXg6IDA7XFxufVxcblxcbi5jb2wtMiB7XFxuICAtbXMtZmxleDogMCAwIGNhbGMoMTYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIGZsZXg6IDAgMCBjYWxjKDE2LjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICBtYXgtd2lkdGg6IGNhbGMoMTYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG59XFxuXFxuLmNvbC0zIHtcXG4gIC1tcy1mbGV4OiAwIDAgY2FsYygyNSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgZmxleDogMCAwIGNhbGMoMjUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIG1heC13aWR0aDogY2FsYygyNSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbn1cXG5cXG4uY29sLTMsIC5jb2wtNCB7XFxuICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbn1cXG5cXG4uY29sLTQge1xcbiAgLW1zLWZsZXg6IDAgMCBjYWxjKDMzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICBmbGV4OiAwIDAgY2FsYygzMy4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgbWF4LXdpZHRoOiBjYWxjKDMzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxufVxcblxcbi5jb2wtNSB7XFxuICAtbXMtZmxleDogMCAwIGNhbGMoNDEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIGZsZXg6IDAgMCBjYWxjKDQxLjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICBtYXgtd2lkdGg6IGNhbGMoNDEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG59XFxuXFxuLmNvbC01LCAuY29sLTYge1xcbiAgLXdlYmtpdC1ib3gtZmxleDogMDtcXG59XFxuXFxuLmNvbC02IHtcXG4gIC1tcy1mbGV4OiAwIDAgY2FsYyg1MCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgZmxleDogMCAwIGNhbGMoNTAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIG1heC13aWR0aDogY2FsYyg1MCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbn1cXG5cXG4uY29sLTcge1xcbiAgLW1zLWZsZXg6IDAgMCBjYWxjKDU4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICBmbGV4OiAwIDAgY2FsYyg1OC4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgbWF4LXdpZHRoOiBjYWxjKDU4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxufVxcblxcbi5jb2wtNywgLmNvbC04IHtcXG4gIC13ZWJraXQtYm94LWZsZXg6IDA7XFxufVxcblxcbi5jb2wtOCB7XFxuICAtbXMtZmxleDogMCAwIGNhbGMoNjYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIGZsZXg6IDAgMCBjYWxjKDY2LjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICBtYXgtd2lkdGg6IGNhbGMoNjYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG59XFxuXFxuLmNvbC05IHtcXG4gIC1tcy1mbGV4OiAwIDAgY2FsYyg3NSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgZmxleDogMCAwIGNhbGMoNzUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIG1heC13aWR0aDogY2FsYyg3NSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbn1cXG5cXG4uY29sLTksIC5jb2wtMTAge1xcbiAgLXdlYmtpdC1ib3gtZmxleDogMDtcXG59XFxuXFxuLmNvbC0xMCB7XFxuICAtbXMtZmxleDogMCAwIGNhbGMoODMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIGZsZXg6IDAgMCBjYWxjKDgzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICBtYXgtd2lkdGg6IGNhbGMoODMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG59XFxuXFxuLmNvbC0xMSB7XFxuICAtbXMtZmxleDogMCAwIGNhbGMoOTEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIGZsZXg6IDAgMCBjYWxjKDkxLjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICBtYXgtd2lkdGg6IGNhbGMoOTEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG59XFxuXFxuLmNvbC0xMSwgLmNvbC0xMiB7XFxuICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbn1cXG5cXG4uY29sLTEyIHtcXG4gIC1tcy1mbGV4OiAwIDAgY2FsYygxMDAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIGZsZXg6IDAgMCBjYWxjKDEwMCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1OTlweCkge1xcbiAgLmNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcblxcbiAgLmNvbCwgW2NsYXNzKj1jb2wtXSwgW2NsYXNzXj1jb2wtXSB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDEgMTAwJTtcXG4gICAgZmxleDogMCAxIDEwMCU7XFxuICAgIG1heC13aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogOTAwcHgpIHtcXG4gIC5jb2wtMS1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYyg4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIGZsZXg6IDAgMCBjYWxjKDguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtMi1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYygxNi42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYygxNi42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoMTYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtMy1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYygyNSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYygyNSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoMjUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtNC1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYygzMy4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYygzMy4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoMzMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtNS1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYyg0MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYyg0MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoNDEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtNi1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYyg1MCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYyg1MCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoNTAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtNy1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYyg1OC4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYyg1OC4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoNTguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtOC1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYyg2Ni42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYyg2Ni42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoNjYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtOS1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYyg3NSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYyg3NSUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoNzUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtMTAtbWQge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoODMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoODMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDgzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTExLW1kIHtcXG4gICAgLXdlYmtpdC1ib3gtZmxleDogMDtcXG4gICAgLW1zLWZsZXg6IDAgMCBjYWxjKDkxLjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIGZsZXg6IDAgMCBjYWxjKDkxLjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIG1heC13aWR0aDogY2FsYyg5MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgfVxcblxcbiAgLmNvbC0xMi1tZCB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYygxMDAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoMTAwJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIG1heC13aWR0aDogY2FsYygxMDAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG59XFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTIwMHB4KSB7XFxuICAuY29sLTEtbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoOC4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYyg4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIG1heC13aWR0aDogY2FsYyg4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTItbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoMTYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoMTYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDE2LjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTMtbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoMjUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoMjUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDI1JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTQtbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoMzMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoMzMuMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDMzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTUtbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoNDEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoNDEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDQxLjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTYtbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoNTAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoNTAlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDUwJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTctbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoNTguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoNTguMzMzMzMlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDU4LjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTgtbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoNjYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoNjYuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDY2LjY2NjY3JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTktbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoNzUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgZmxleDogMCAwIGNhbGMoNzUlIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gICAgbWF4LXdpZHRoOiBjYWxjKDc1JSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxuXFxuICAuY29sLTEwLWxnIHtcXG4gICAgLXdlYmtpdC1ib3gtZmxleDogMDtcXG4gICAgLW1zLWZsZXg6IDAgMCBjYWxjKDgzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIGZsZXg6IDAgMCBjYWxjKDgzLjMzMzMzJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIG1heC13aWR0aDogY2FsYyg4My4zMzMzMyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgfVxcblxcbiAgLmNvbC0xMS1sZyB7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDA7XFxuICAgIC1tcy1mbGV4OiAwIDAgY2FsYyg5MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBmbGV4OiAwIDAgY2FsYyg5MS42NjY2NyUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoOTEuNjY2NjclIC0gdmFyKC0tZ3JpZC1ndXR0ZXIpKTtcXG4gIH1cXG5cXG4gIC5jb2wtMTItbGcge1xcbiAgICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgICAtbXMtZmxleDogMCAwIGNhbGMoMTAwJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICAgIGZsZXg6IDAgMCBjYWxjKDEwMCUgLSB2YXIoLS1ncmlkLWd1dHRlcikpO1xcbiAgICBtYXgtd2lkdGg6IGNhbGMoMTAwJSAtIHZhcigtLWdyaWQtZ3V0dGVyKSk7XFxuICB9XFxufVxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuNXJlbSAycmVtO1xcbn1cXG5cXG5sZWdlbmQge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGZvbnQtc2l6ZTogMC44ZW07XFxuICBsZXR0ZXItc3BhY2luZzogMC4xcmVtO1xcbn1cXG5cXG5pbnB1dDpub3QoW3R5cGU9Y2hlY2tib3hdKTpub3QoW3R5cGU9cmFkaW9dKTpub3QoW3R5cGU9c3VibWl0XSk6bm90KFt0eXBlPWNvbG9yXSk6bm90KFt0eXBlPWJ1dHRvbl0pOm5vdChbdHlwZT1yZXNldF0pLCBzZWxlY3QsIHRleHRhcmVhLCB0ZXh0YXJlYVt0eXBlPXRleHRdIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcbiAgcGFkZGluZzogMC44cmVtIDFyZW07XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1jb2xvci1saWdodEdyZXkpO1xcbiAgZm9udC1zaXplOiAxZW07XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuaW5wdXQ6bm90KFt0eXBlPWNoZWNrYm94XSk6bm90KFt0eXBlPXJhZGlvXSk6bm90KFt0eXBlPXN1Ym1pdF0pOm5vdChbdHlwZT1jb2xvcl0pOm5vdChbdHlwZT1idXR0b25dKTpub3QoW3R5cGU9cmVzZXRdKTpub3QoOmRpc2FibGVkKTpob3Zlciwgc2VsZWN0OmhvdmVyLCB0ZXh0YXJlYTpob3ZlciwgdGV4dGFyZWFbdHlwZT10ZXh0XTpob3ZlciB7XFxuICBib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLWdyZXkpO1xcbn1cXG5cXG5pbnB1dDpub3QoW3R5cGU9Y2hlY2tib3hdKTpub3QoW3R5cGU9cmFkaW9dKTpub3QoW3R5cGU9c3VibWl0XSk6bm90KFt0eXBlPWNvbG9yXSk6bm90KFt0eXBlPWJ1dHRvbl0pOm5vdChbdHlwZT1yZXNldF0pOmZvY3VzLCBzZWxlY3Q6Zm9jdXMsIHRleHRhcmVhOmZvY3VzLCB0ZXh0YXJlYVt0eXBlPXRleHRdOmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLXByaW1hcnkpO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDAgMXB4IHZhcigtLWNvbG9yLXByaW1hcnkpO1xcbiAgYm94LXNoYWRvdzogMCAwIDFweCB2YXIoLS1jb2xvci1wcmltYXJ5KTtcXG59XFxuXFxuaW5wdXQuZXJyb3I6bm90KFt0eXBlPWNoZWNrYm94XSk6bm90KFt0eXBlPXJhZGlvXSk6bm90KFt0eXBlPXN1Ym1pdF0pOm5vdChbdHlwZT1jb2xvcl0pOm5vdChbdHlwZT1idXR0b25dKTpub3QoW3R5cGU9cmVzZXRdKSwgdGV4dGFyZWEuZXJyb3Ige1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1jb2xvci1lcnJvcik7XFxufVxcblxcbmlucHV0LnN1Y2Nlc3M6bm90KFt0eXBlPWNoZWNrYm94XSk6bm90KFt0eXBlPXJhZGlvXSk6bm90KFt0eXBlPXN1Ym1pdF0pOm5vdChbdHlwZT1jb2xvcl0pOm5vdChbdHlwZT1idXR0b25dKTpub3QoW3R5cGU9cmVzZXRdKSwgdGV4dGFyZWEuc3VjY2VzcyB7XFxuICBib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLXN1Y2Nlc3MpO1xcbn1cXG5cXG5zZWxlY3Qge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbiAgYmFja2dyb3VuZDogI2YzZjNmNiBuby1yZXBlYXQgMTAwJTtcXG4gIGJhY2tncm91bmQtc2l6ZTogMWV4O1xcbiAgYmFja2dyb3VuZC1vcmlnaW46IGNvbnRlbnQtYm94O1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCJkYXRhOmltYWdlL3N2Zyt4bWw7dXRmOCw8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzYwJyBoZWlnaHQ9JzQwJyBmaWxsPSclMjM1NTUnPjxwb2x5Z29uIHBvaW50cz0nMCwwIDYwLDAgMzAsNDAnLz48L3N2Zz5cXFwiKTtcXG59XFxuXFxuW3R5cGU9Y2hlY2tib3hdLCBbdHlwZT1yYWRpb10ge1xcbiAgd2lkdGg6IDEuNnJlbTtcXG4gIGhlaWdodDogMS42cmVtO1xcbn1cXG5cXG4uYnV0dG9uLCBbdHlwZT1idXR0b25dLCBbdHlwZT1yZXNldF0sIFt0eXBlPXN1Ym1pdF0sIGJ1dHRvbiB7XFxuICBwYWRkaW5nOiAxcmVtIDIuNXJlbTtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1kYXJrR3JleSk7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvci1saWdodEdyZXkpO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZSk7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGVhc2U7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgZWFzZTtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5ncm91cGVkIHtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uZ3JvdXBlZCA+IDpub3QoOmxhc3QtY2hpbGQpIHtcXG4gIG1hcmdpbi1yaWdodDogMTZweDtcXG59XFxuXFxuLmdyb3VwZWQuZ2FwbGVzcyA+ICoge1xcbiAgbWFyZ2luOiAwIDAgMCAtMXB4ICFpbXBvcnRhbnQ7XFxuICBib3JkZXItcmFkaXVzOiAwICFpbXBvcnRhbnQ7XFxufVxcblxcbi5ncm91cGVkLmdhcGxlc3MgPiA6Zmlyc3QtY2hpbGQge1xcbiAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XFxuICBib3JkZXItcmFkaXVzOiA0cHggMCAwIDRweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZ3JvdXBlZC5nYXBsZXNzID4gOmxhc3QtY2hpbGQge1xcbiAgYm9yZGVyLXJhZGl1czogMCA0cHggNHB4IDAgIWltcG9ydGFudDtcXG59XFxuXFxuLmJ1dHRvbiArIC5idXR0b24ge1xcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XFxufVxcblxcbi5idXR0b246aG92ZXIsIFt0eXBlPWJ1dHRvbl06aG92ZXIsIFt0eXBlPXJlc2V0XTpob3ZlciwgW3R5cGU9c3VibWl0XTpob3ZlciwgYnV0dG9uOmhvdmVyIHtcXG4gIG9wYWNpdHk6IDAuODtcXG59XFxuXFxuLmJ1dHRvbjphY3RpdmUsIFt0eXBlPWJ1dHRvbl06YWN0aXZlLCBbdHlwZT1yZXNldF06YWN0aXZlLCBbdHlwZT1zdWJtaXRdOmFjdGl2ZSwgYnV0dG9uOmFjdGl2ZSB7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC45OCk7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDAuOTgpO1xcbn1cXG5cXG5idXR0b246ZGlzYWJsZWQsIGJ1dHRvbjpkaXNhYmxlZDpob3ZlciwgaW5wdXQ6ZGlzYWJsZWQsIGlucHV0OmRpc2FibGVkOmhvdmVyIHtcXG4gIG9wYWNpdHk6IDAuNDtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcblxcbi5idXR0b24uZGFyaywgLmJ1dHRvbi5lcnJvciwgLmJ1dHRvbi5wcmltYXJ5LCAuYnV0dG9uLnNlY29uZGFyeSwgLmJ1dHRvbi5zdWNjZXNzLCBbdHlwZT1zdWJtaXRdIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgei1pbmRleDogMTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1wcmltYXJ5KTtcXG59XFxuXFxuLmJ1dHRvbi5zZWNvbmRhcnkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItZ3JleSk7XFxufVxcblxcbi5idXR0b24uZGFyayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1kYXJrR3JleSk7XFxufVxcblxcbi5idXR0b24uZXJyb3Ige1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItZXJyb3IpO1xcbn1cXG5cXG4uYnV0dG9uLnN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3Itc3VjY2Vzcyk7XFxufVxcblxcbi5idXR0b24ub3V0bGluZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlci1jb2xvcjogdmFyKC0tY29sb3ItbGlnaHRHcmV5KTtcXG59XFxuXFxuLmJ1dHRvbi5vdXRsaW5lLnByaW1hcnkge1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1jb2xvci1wcmltYXJ5KTtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1wcmltYXJ5KTtcXG59XFxuXFxuLmJ1dHRvbi5vdXRsaW5lLnNlY29uZGFyeSB7XFxuICBib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLWdyZXkpO1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWdyZXkpO1xcbn1cXG5cXG4uYnV0dG9uLm91dGxpbmUuZGFyayB7XFxuICBib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLWRhcmtHcmV5KTtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1kYXJrR3JleSk7XFxufVxcblxcbi5idXR0b24uY2xlYXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLXByaW1hcnkpO1xcbn1cXG5cXG4uYnV0dG9uLmljb24ge1xcbiAgZGlzcGxheTogLXdlYmtpdC1pbmxpbmUtYm94O1xcbiAgZGlzcGxheTogLW1zLWlubGluZS1mbGV4Ym94O1xcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5idXR0b24uaWNvbiA+IGltZyB7XFxuICBtYXJnaW4tbGVmdDogMnB4O1xcbn1cXG5cXG4uYnV0dG9uLmljb24tb25seSB7XFxuICBwYWRkaW5nOiAxcmVtO1xcbn1cXG5cXG46Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgY29sb3I6ICNiZGJmYzQ7XFxufVxcblxcbjo6LW1vei1wbGFjZWhvbGRlciB7XFxuICBjb2xvcjogI2JkYmZjNDtcXG59XFxuXFxuOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XFxuICBjb2xvcjogI2JkYmZjNDtcXG59XFxuXFxuOjotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgY29sb3I6ICNiZGJmYzQ7XFxufVxcblxcbjo6cGxhY2Vob2xkZXIge1xcbiAgY29sb3I6ICNiZGJmYzQ7XFxufVxcblxcbi5uYXYge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBtaW4taGVpZ2h0OiA1cmVtO1xcbiAgLXdlYmtpdC1ib3gtYWxpZ246IHN0cmV0Y2g7XFxuICAtbXMtZmxleC1hbGlnbjogc3RyZXRjaDtcXG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xcbn1cXG5cXG4ubmF2IGltZyB7XFxuICBtYXgtaGVpZ2h0OiAzcmVtO1xcbn1cXG5cXG4ubmF2LWNlbnRlciwgLm5hdi1sZWZ0LCAubmF2LXJpZ2h0LCAubmF2ID4gLmNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuXFxuLm5hdi1jZW50ZXIsIC5uYXYtbGVmdCwgLm5hdi1yaWdodCB7XFxuICAtd2Via2l0LWJveC1mbGV4OiAxO1xcbiAgLW1zLWZsZXg6IDE7XFxuICBmbGV4OiAxO1xcbn1cXG5cXG4ubmF2LWxlZnQge1xcbiAgLXdlYmtpdC1ib3gtcGFjazogc3RhcnQ7XFxuICAtbXMtZmxleC1wYWNrOiBzdGFydDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG59XFxuXFxuLm5hdi1yaWdodCB7XFxuICAtd2Via2l0LWJveC1wYWNrOiBlbmQ7XFxuICAtbXMtZmxleC1wYWNrOiBlbmQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbn1cXG5cXG4ubmF2LWNlbnRlciB7XFxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDgwcHgpIHtcXG4gIC5uYXYsIC5uYXYgPiAuY29udGFpbmVyIHtcXG4gICAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcXG4gICAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgfVxcblxcbiAgLm5hdi1jZW50ZXIsIC5uYXYtbGVmdCwgLm5hdi1yaWdodCB7XFxuICAgIC1tcy1mbGV4LXdyYXA6IHdyYXA7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgfVxcbn1cXG4ubmF2IC5icmFuZCwgLm5hdiBhIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogMXJlbSAycmVtO1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWRhcmtHcmV5KTtcXG59XFxuXFxuLm5hdiAuYWN0aXZlOm5vdCguYnV0dG9uKSB7XFxuICBjb2xvcjogIzAwMDtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1wcmltYXJ5KTtcXG59XFxuXFxuLm5hdiAuYnJhbmQge1xcbiAgZm9udC1zaXplOiAxLjc1ZW07XFxuICBwYWRkaW5nLXRvcDogMDtcXG4gIHBhZGRpbmctYm90dG9tOiAwO1xcbn1cXG5cXG4ubmF2IC5icmFuZCBpbWcge1xcbiAgcGFkZGluZy1yaWdodDogMXJlbTtcXG59XFxuXFxuLm5hdiAuYnV0dG9uIHtcXG4gIG1hcmdpbjogYXV0byAxcmVtO1xcbn1cXG5cXG4uY2FyZCB7XFxuICBwYWRkaW5nOiAxcmVtIDJyZW07XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS1iZy1jb2xvcik7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDAgMXB4IDNweCB2YXIoLS1jb2xvci1ncmV5KTtcXG4gIGJveC1zaGFkb3c6IDAgMXB4IDNweCB2YXIoLS1jb2xvci1ncmV5KTtcXG59XFxuXFxuLmNhcmQgcDpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLmNhcmQgaGVhZGVyID4gKiB7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcXG59XFxuXFxuLnRhYnMge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxufVxcblxcbi50YWJzIGEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG4udGFicyA+IC5kcm9wZG93biA+IHN1bW1hcnksIC50YWJzID4gYSB7XFxuICBwYWRkaW5nOiAxcmVtIDJyZW07XFxuICAtd2Via2l0LWJveC1mbGV4OiAwO1xcbiAgLW1zLWZsZXg6IDAgMSBhdXRvO1xcbiAgZmxleDogMCAxIGF1dG87XFxuICBjb2xvcjogdmFyKC0tY29sb3ItZGFya0dyZXkpO1xcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi50YWJzID4gYS5hY3RpdmUsIC50YWJzID4gYTpob3ZlciB7XFxuICBvcGFjaXR5OiAxO1xcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHZhcigtLWNvbG9yLWRhcmtHcmV5KTtcXG59XFxuXFxuLnRhYnMgPiBhLmFjdGl2ZSB7XFxuICBib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLXByaW1hcnkpO1xcbn1cXG5cXG4udGFicy5pcy1mdWxsIGEge1xcbiAgLXdlYmtpdC1ib3gtZmxleDogMTtcXG4gIC1tcy1mbGV4OiAxIDEgYXV0bztcXG4gIGZsZXg6IDEgMSBhdXRvO1xcbn1cXG5cXG4udGFnIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSk7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWdyZXkpO1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxuICBsZXR0ZXItc3BhY2luZzogMC41cHg7XFxufVxcblxcbi50YWcuaXMtc21hbGwge1xcbiAgcGFkZGluZzogMC40cmVtO1xcbiAgZm9udC1zaXplOiAwLjc1ZW07XFxufVxcblxcbi50YWcuaXMtbGFyZ2Uge1xcbiAgcGFkZGluZzogMC43cmVtO1xcbiAgZm9udC1zaXplOiAxLjEyNWVtO1xcbn1cXG5cXG4udGFnICsgLnRhZyB7XFxuICBtYXJnaW4tbGVmdDogMXJlbTtcXG59XFxuXFxuZGV0YWlscy5kcm9wZG93biB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcblxcbmRldGFpbHMuZHJvcGRvd24gPiA6bGFzdC1jaGlsZCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG59XFxuXFxuLmJnLXByaW1hcnkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItcHJpbWFyeSkgIWltcG9ydGFudDtcXG59XFxuXFxuLmJnLWxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWxpZ2h0R3JleSkgIWltcG9ydGFudDtcXG59XFxuXFxuLmJnLWRhcmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3ItZGFya0dyZXkpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5iZy1ncmV5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLWdyZXkpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5iZy1lcnJvciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1lcnJvcikgIWltcG9ydGFudDtcXG59XFxuXFxuLmJnLXN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3Itc3VjY2VzcykgIWltcG9ydGFudDtcXG59XFxuXFxuLmJkLXByaW1hcnkge1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tY29sb3ItcHJpbWFyeSkgIWltcG9ydGFudDtcXG59XFxuXFxuLmJkLWxpZ2h0IHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLWxpZ2h0R3JleSkgIWltcG9ydGFudDtcXG59XFxuXFxuLmJkLWRhcmsge1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tY29sb3ItZGFya0dyZXkpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5iZC1ncmV5IHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLWdyZXkpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5iZC1lcnJvciB7XFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1jb2xvci1lcnJvcikgIWltcG9ydGFudDtcXG59XFxuXFxuLmJkLXN1Y2Nlc3Mge1xcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tY29sb3Itc3VjY2VzcykgIWltcG9ydGFudDtcXG59XFxuXFxuLnRleHQtcHJpbWFyeSB7XFxuICBjb2xvcjogdmFyKC0tY29sb3ItcHJpbWFyeSkgIWltcG9ydGFudDtcXG59XFxuXFxuLnRleHQtbGlnaHQge1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWxpZ2h0R3JleSkgIWltcG9ydGFudDtcXG59XFxuXFxuLnRleHQtZGFyayB7XFxuICBjb2xvcjogdmFyKC0tY29sb3ItZGFya0dyZXkpICFpbXBvcnRhbnQ7XFxufVxcblxcbi50ZXh0LWdyZXkge1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLWdyZXkpICFpbXBvcnRhbnQ7XFxufVxcblxcbi50ZXh0LWVycm9yIHtcXG4gIGNvbG9yOiB2YXIoLS1jb2xvci1lcnJvcikgIWltcG9ydGFudDtcXG59XFxuXFxuLnRleHQtc3VjY2VzcyB7XFxuICBjb2xvcjogdmFyKC0tY29sb3Itc3VjY2VzcykgIWltcG9ydGFudDtcXG59XFxuXFxuLnRleHQtd2hpdGUge1xcbiAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcXG59XFxuXFxuLnB1bGwtcmlnaHQge1xcbiAgZmxvYXQ6IHJpZ2h0ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5wdWxsLWxlZnQge1xcbiAgZmxvYXQ6IGxlZnQgIWltcG9ydGFudDtcXG59XFxuXFxuLnRleHQtY2VudGVyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLnRleHQtbGVmdCB7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG5cXG4udGV4dC1yaWdodCB7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuXFxuLnRleHQtanVzdGlmeSB7XFxuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xcbn1cXG5cXG4udGV4dC11cHBlcmNhc2Uge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuLnRleHQtbG93ZXJjYXNlIHtcXG4gIHRleHQtdHJhbnNmb3JtOiBsb3dlcmNhc2U7XFxufVxcblxcbi50ZXh0LWNhcGl0YWxpemUge1xcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxufVxcblxcbi5pcy1mdWxsLXNjcmVlbiB7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4uaXMtZnVsbC13aWR0aCB7XFxuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xcbn1cXG5cXG4uaXMtdmVydGljYWwtYWxpZ24ge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5pcy1jZW50ZXIsIC5pcy1ob3Jpem9udGFsLWFsaWduIHtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5pcy1jZW50ZXIge1xcbiAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uaXMtcmlnaHQge1xcbiAgLXdlYmtpdC1ib3gtcGFjazogZW5kO1xcbiAgLW1zLWZsZXgtcGFjazogZW5kO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG59XFxuXFxuLmlzLWxlZnQsIC5pcy1yaWdodCB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmlzLWxlZnQge1xcbiAgLXdlYmtpdC1ib3gtcGFjazogc3RhcnQ7XFxuICAtbXMtZmxleC1wYWNrOiBzdGFydDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG59XFxuXFxuLmlzLWZpeGVkIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4uaXMtcGFkZGluZ2xlc3Mge1xcbiAgcGFkZGluZzogMCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uaXMtbWFyZ2lubGVzcyB7XFxuICBtYXJnaW46IDAgIWltcG9ydGFudDtcXG59XFxuXFxuLmlzLXBvaW50ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyICFpbXBvcnRhbnQ7XFxufVxcblxcbi5pcy1yb3VuZGVkIHtcXG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxufVxcblxcbi5jbGVhcmZpeCB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGRpc3BsYXk6IHRhYmxlO1xcbiAgY2xlYXI6IGJvdGg7XFxufVxcblxcbi5pcy1oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1OTlweCkge1xcbiAgLmhpZGUteHMge1xcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYwMHB4KSBhbmQgKG1heC13aWR0aDogODk5cHgpIHtcXG4gIC5oaWRlLXNtIHtcXG4gICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA5MDBweCkgYW5kIChtYXgtd2lkdGg6IDExOTlweCkge1xcbiAgLmhpZGUtbWQge1xcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEyMDBweCkge1xcbiAgLmhpZGUtbGcge1xcbiAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxuICB9XFxufVxcbkBtZWRpYSBwcmludCB7XFxuICAuaGlkZS1wciB7XFxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG4gIH1cXG59XCJdfV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcblxuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCAnJykuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufSAvLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5cblxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG4gIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgcmV0dXJuIFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzT2xkSUUgPSBmdW5jdGlvbiBpc09sZElFKCkge1xuICB2YXIgbWVtbztcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKCkge1xuICAgIGlmICh0eXBlb2YgbWVtbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG4gICAgICAvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG4gICAgICAvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcbiAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuICAgICAgbWVtbyA9IEJvb2xlYW4od2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2IpO1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vO1xuICB9O1xufSgpO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gZ2V0VGFyZ2V0KCkge1xuICB2YXIgbWVtbyA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUodGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vW3RhcmdldF07XG4gIH07XG59KCk7XG5cbnZhciBzdHlsZXNJbkRvbSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRG9tLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRG9tW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM11cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlc0luRG9tLnB1c2goe1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiBhZGRTdHlsZShvYmosIG9wdGlvbnMpLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICB2YXIgYXR0cmlidXRlcyA9IG9wdGlvbnMuYXR0cmlidXRlcyB8fCB7fTtcblxuICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMubm9uY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJyA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICAgIGlmIChub25jZSkge1xuICAgICAgYXR0cmlidXRlcy5ub25jZSA9IG5vbmNlO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gIH0pO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zLmluc2VydChzdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChvcHRpb25zLmluc2VydCB8fCAnaGVhZCcpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gICAgfVxuXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxudmFyIHJlcGxhY2VUZXh0ID0gZnVuY3Rpb24gcmVwbGFjZVRleHQoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2UoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuICB9O1xufSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLm1lZGlhID8gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKS5jb25jYXQob2JqLmNzcywgXCJ9XCIpIDogb2JqLmNzczsgLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlLCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3M7XG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYTtcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoJ21lZGlhJyk7XG4gIH1cblxuICBpZiAoc291cmNlTWFwICYmIGJ0b2EpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlO1xuICB2YXIgdXBkYXRlO1xuICB2YXIgcmVtb3ZlO1xuXG4gIGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuICAgIHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUgPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZShvYmopO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307IC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuICAvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cbiAgaWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09ICdib29sZWFuJykge1xuICAgIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuICB9XG5cbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuZXdMaXN0KSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRvbVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5Eb21bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5Eb20uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJleHBvcnQgeyBTdmVsdGVDb21wb25lbnREZXYgYXMgU3ZlbHRlQ29tcG9uZW50LCBhZnRlclVwZGF0ZSwgYmVmb3JlVXBkYXRlLCBjcmVhdGVFdmVudERpc3BhdGNoZXIsIGdldENvbnRleHQsIG9uRGVzdHJveSwgb25Nb3VudCwgc2V0Q29udGV4dCwgdGljayB9IGZyb20gJy4vaW50ZXJuYWwnO1xuIiwiZnVuY3Rpb24gbm9vcCgpIHsgfVxuY29uc3QgaWRlbnRpdHkgPSB4ID0+IHg7XG5mdW5jdGlvbiBhc3NpZ24odGFyLCBzcmMpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgZm9yIChjb25zdCBrIGluIHNyYylcbiAgICAgICAgdGFyW2tdID0gc3JjW2tdO1xuICAgIHJldHVybiB0YXI7XG59XG5mdW5jdGlvbiBpc19wcm9taXNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBhZGRfbG9jYXRpb24oZWxlbWVudCwgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyKSB7XG4gICAgZWxlbWVudC5fX3N2ZWx0ZV9tZXRhID0ge1xuICAgICAgICBsb2M6IHsgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gcnVuKGZuKSB7XG4gICAgcmV0dXJuIGZuKCk7XG59XG5mdW5jdGlvbiBibGFua19vYmplY3QoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCk7XG59XG5mdW5jdGlvbiBydW5fYWxsKGZucykge1xuICAgIGZucy5mb3JFYWNoKHJ1bik7XG59XG5mdW5jdGlvbiBpc19mdW5jdGlvbih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBzYWZlX25vdF9lcXVhbChhLCBiKSB7XG4gICAgcmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGIgfHwgKChhICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JykgfHwgdHlwZW9mIGEgPT09ICdmdW5jdGlvbicpO1xufVxuZnVuY3Rpb24gbm90X2VxdWFsKGEsIGIpIHtcbiAgICByZXR1cm4gYSAhPSBhID8gYiA9PSBiIDogYSAhPT0gYjtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX3N0b3JlKHN0b3JlLCBuYW1lKSB7XG4gICAgaWYgKHN0b3JlICE9IG51bGwgJiYgdHlwZW9mIHN0b3JlLnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCcke25hbWV9JyBpcyBub3QgYSBzdG9yZSB3aXRoIGEgJ3N1YnNjcmliZScgbWV0aG9kYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gc3Vic2NyaWJlKHN0b3JlLCAuLi5jYWxsYmFja3MpIHtcbiAgICBpZiAoc3RvcmUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbm9vcDtcbiAgICB9XG4gICAgY29uc3QgdW5zdWIgPSBzdG9yZS5zdWJzY3JpYmUoLi4uY2FsbGJhY2tzKTtcbiAgICByZXR1cm4gdW5zdWIudW5zdWJzY3JpYmUgPyAoKSA9PiB1bnN1Yi51bnN1YnNjcmliZSgpIDogdW5zdWI7XG59XG5mdW5jdGlvbiBnZXRfc3RvcmVfdmFsdWUoc3RvcmUpIHtcbiAgICBsZXQgdmFsdWU7XG4gICAgc3Vic2NyaWJlKHN0b3JlLCBfID0+IHZhbHVlID0gXykoKTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiBjb21wb25lbnRfc3Vic2NyaWJlKGNvbXBvbmVudCwgc3RvcmUsIGNhbGxiYWNrKSB7XG4gICAgY29tcG9uZW50LiQkLm9uX2Rlc3Ryb3kucHVzaChzdWJzY3JpYmUoc3RvcmUsIGNhbGxiYWNrKSk7XG59XG5mdW5jdGlvbiBjcmVhdGVfc2xvdChkZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGZuKSB7XG4gICAgaWYgKGRlZmluaXRpb24pIHtcbiAgICAgICAgY29uc3Qgc2xvdF9jdHggPSBnZXRfc2xvdF9jb250ZXh0KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pO1xuICAgICAgICByZXR1cm4gZGVmaW5pdGlvblswXShzbG90X2N0eCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0X3Nsb3RfY29udGV4dChkZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGZuKSB7XG4gICAgcmV0dXJuIGRlZmluaXRpb25bMV0gJiYgZm5cbiAgICAgICAgPyBhc3NpZ24oJCRzY29wZS5jdHguc2xpY2UoKSwgZGVmaW5pdGlvblsxXShmbihjdHgpKSlcbiAgICAgICAgOiAkJHNjb3BlLmN0eDtcbn1cbmZ1bmN0aW9uIGdldF9zbG90X2NoYW5nZXMoZGVmaW5pdGlvbiwgJCRzY29wZSwgZGlydHksIGZuKSB7XG4gICAgaWYgKGRlZmluaXRpb25bMl0gJiYgZm4pIHtcbiAgICAgICAgY29uc3QgbGV0cyA9IGRlZmluaXRpb25bMl0oZm4oZGlydHkpKTtcbiAgICAgICAgaWYgKCQkc2NvcGUuZGlydHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGxldHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBsZXRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uc3QgbWVyZ2VkID0gW107XG4gICAgICAgICAgICBjb25zdCBsZW4gPSBNYXRoLm1heCgkJHNjb3BlLmRpcnR5Lmxlbmd0aCwgbGV0cy5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZFtpXSA9ICQkc2NvcGUuZGlydHlbaV0gfCBsZXRzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1lcmdlZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJCRzY29wZS5kaXJ0eSB8IGxldHM7XG4gICAgfVxuICAgIHJldHVybiAkJHNjb3BlLmRpcnR5O1xufVxuZnVuY3Rpb24gdXBkYXRlX3Nsb3Qoc2xvdCwgc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGRpcnR5LCBnZXRfc2xvdF9jaGFuZ2VzX2ZuLCBnZXRfc2xvdF9jb250ZXh0X2ZuKSB7XG4gICAgY29uc3Qgc2xvdF9jaGFuZ2VzID0gZ2V0X3Nsb3RfY2hhbmdlcyhzbG90X2RlZmluaXRpb24sICQkc2NvcGUsIGRpcnR5LCBnZXRfc2xvdF9jaGFuZ2VzX2ZuKTtcbiAgICBpZiAoc2xvdF9jaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IHNsb3RfY29udGV4dCA9IGdldF9zbG90X2NvbnRleHQoc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGdldF9zbG90X2NvbnRleHRfZm4pO1xuICAgICAgICBzbG90LnAoc2xvdF9jb250ZXh0LCBzbG90X2NoYW5nZXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGV4Y2x1ZGVfaW50ZXJuYWxfcHJvcHMocHJvcHMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGsgaW4gcHJvcHMpXG4gICAgICAgIGlmIChrWzBdICE9PSAnJCcpXG4gICAgICAgICAgICByZXN1bHRba10gPSBwcm9wc1trXTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gY29tcHV0ZV9yZXN0X3Byb3BzKHByb3BzLCBrZXlzKSB7XG4gICAgY29uc3QgcmVzdCA9IHt9O1xuICAgIGtleXMgPSBuZXcgU2V0KGtleXMpO1xuICAgIGZvciAoY29uc3QgayBpbiBwcm9wcylcbiAgICAgICAgaWYgKCFrZXlzLmhhcyhrKSAmJiBrWzBdICE9PSAnJCcpXG4gICAgICAgICAgICByZXN0W2tdID0gcHJvcHNba107XG4gICAgcmV0dXJuIHJlc3Q7XG59XG5mdW5jdGlvbiBvbmNlKGZuKSB7XG4gICAgbGV0IHJhbiA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICBpZiAocmFuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICByYW4gPSB0cnVlO1xuICAgICAgICBmbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xuICAgIH07XG59XG5mdW5jdGlvbiBudWxsX3RvX2VtcHR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xufVxuZnVuY3Rpb24gc2V0X3N0b3JlX3ZhbHVlKHN0b3JlLCByZXQsIHZhbHVlID0gcmV0KSB7XG4gICAgc3RvcmUuc2V0KHZhbHVlKTtcbiAgICByZXR1cm4gcmV0O1xufVxuY29uc3QgaGFzX3Byb3AgPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbmZ1bmN0aW9uIGFjdGlvbl9kZXN0cm95ZXIoYWN0aW9uX3Jlc3VsdCkge1xuICAgIHJldHVybiBhY3Rpb25fcmVzdWx0ICYmIGlzX2Z1bmN0aW9uKGFjdGlvbl9yZXN1bHQuZGVzdHJveSkgPyBhY3Rpb25fcmVzdWx0LmRlc3Ryb3kgOiBub29wO1xufVxuXG5jb25zdCBpc19jbGllbnQgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbmxldCBub3cgPSBpc19jbGllbnRcbiAgICA/ICgpID0+IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgIDogKCkgPT4gRGF0ZS5ub3coKTtcbmxldCByYWYgPSBpc19jbGllbnQgPyBjYiA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpIDogbm9vcDtcbi8vIHVzZWQgaW50ZXJuYWxseSBmb3IgdGVzdGluZ1xuZnVuY3Rpb24gc2V0X25vdyhmbikge1xuICAgIG5vdyA9IGZuO1xufVxuZnVuY3Rpb24gc2V0X3JhZihmbikge1xuICAgIHJhZiA9IGZuO1xufVxuXG5jb25zdCB0YXNrcyA9IG5ldyBTZXQoKTtcbmZ1bmN0aW9uIHJ1bl90YXNrcyhub3cpIHtcbiAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBpZiAoIXRhc2suYyhub3cpKSB7XG4gICAgICAgICAgICB0YXNrcy5kZWxldGUodGFzayk7XG4gICAgICAgICAgICB0YXNrLmYoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0YXNrcy5zaXplICE9PSAwKVxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbn1cbi8qKlxuICogRm9yIHRlc3RpbmcgcHVycG9zZXMgb25seSFcbiAqL1xuZnVuY3Rpb24gY2xlYXJfbG9vcHMoKSB7XG4gICAgdGFza3MuY2xlYXIoKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB0YXNrIHRoYXQgcnVucyBvbiBlYWNoIHJhZiBmcmFtZVxuICogdW50aWwgaXQgcmV0dXJucyBhIGZhbHN5IHZhbHVlIG9yIGlzIGFib3J0ZWRcbiAqL1xuZnVuY3Rpb24gbG9vcChjYWxsYmFjaykge1xuICAgIGxldCB0YXNrO1xuICAgIGlmICh0YXNrcy5zaXplID09PSAwKVxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9taXNlOiBuZXcgUHJvbWlzZShmdWxmaWxsID0+IHtcbiAgICAgICAgICAgIHRhc2tzLmFkZCh0YXNrID0geyBjOiBjYWxsYmFjaywgZjogZnVsZmlsbCB9KTtcbiAgICAgICAgfSksXG4gICAgICAgIGFib3J0KCkge1xuICAgICAgICAgICAgdGFza3MuZGVsZXRlKHRhc2spO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kKHRhcmdldCwgbm9kZSkge1xuICAgIHRhcmdldC5hcHBlbmRDaGlsZChub2RlKTtcbn1cbmZ1bmN0aW9uIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIHRhcmdldC5pbnNlcnRCZWZvcmUobm9kZSwgYW5jaG9yIHx8IG51bGwpO1xufVxuZnVuY3Rpb24gZGV0YWNoKG5vZGUpIHtcbiAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2VhY2goaXRlcmF0aW9ucywgZGV0YWNoaW5nKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChpdGVyYXRpb25zW2ldKVxuICAgICAgICAgICAgaXRlcmF0aW9uc1tpXS5kKGRldGFjaGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG59XG5mdW5jdGlvbiBlbGVtZW50X2lzKG5hbWUsIGlzKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSwgeyBpcyB9KTtcbn1cbmZ1bmN0aW9uIG9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMob2JqLCBleGNsdWRlKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0ge307XG4gICAgZm9yIChjb25zdCBrIGluIG9iaikge1xuICAgICAgICBpZiAoaGFzX3Byb3Aob2JqLCBrKVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgJiYgZXhjbHVkZS5pbmRleE9mKGspID09PSAtMSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGFyZ2V0W2tdID0gb2JqW2tdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBzdmdfZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBuYW1lKTtcbn1cbmZ1bmN0aW9uIHRleHQoZGF0YSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkYXRhKTtcbn1cbmZ1bmN0aW9uIHNwYWNlKCkge1xuICAgIHJldHVybiB0ZXh0KCcgJyk7XG59XG5mdW5jdGlvbiBlbXB0eSgpIHtcbiAgICByZXR1cm4gdGV4dCgnJyk7XG59XG5mdW5jdGlvbiBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiAoKSA9PiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcHJldmVudF9kZWZhdWx0KGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gc3RvcF9wcm9wYWdhdGlvbihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBzZWxmKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMpXG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgZWxzZSBpZiAobm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKSAhPT0gdmFsdWUpXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuZnVuY3Rpb24gc2V0X2F0dHJpYnV0ZXMobm9kZSwgYXR0cmlidXRlcykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG5vZGUuX19wcm90b19fKTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVzW2tleV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuY3NzVGV4dCA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfX3ZhbHVlJykge1xuICAgICAgICAgICAgbm9kZS52YWx1ZSA9IG5vZGVba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdG9yc1trZXldICYmIGRlc2NyaXB0b3JzW2tleV0uc2V0KSB7XG4gICAgICAgICAgICBub2RlW2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9zdmdfYXR0cmlidXRlcyhub2RlLCBhdHRyaWJ1dGVzKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YShub2RlLCBwcm9wLCB2YWx1ZSkge1xuICAgIGlmIChwcm9wIGluIG5vZGUpIHtcbiAgICAgICAgbm9kZVtwcm9wXSA9IHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXR0cihub2RlLCBwcm9wLCB2YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24geGxpbmtfYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuZnVuY3Rpb24gZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUoZ3JvdXAsIF9fdmFsdWUsIGNoZWNrZWQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3VwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChncm91cFtpXS5jaGVja2VkKVxuICAgICAgICAgICAgdmFsdWUuYWRkKGdyb3VwW2ldLl9fdmFsdWUpO1xuICAgIH1cbiAgICBpZiAoIWNoZWNrZWQpIHtcbiAgICAgICAgdmFsdWUuZGVsZXRlKF9fdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZSk7XG59XG5mdW5jdGlvbiB0b19udW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09ICcnID8gdW5kZWZpbmVkIDogK3ZhbHVlO1xufVxuZnVuY3Rpb24gdGltZV9yYW5nZXNfdG9fYXJyYXkocmFuZ2VzKSB7XG4gICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBhcnJheS5wdXNoKHsgc3RhcnQ6IHJhbmdlcy5zdGFydChpKSwgZW5kOiByYW5nZXMuZW5kKGkpIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG59XG5mdW5jdGlvbiBjaGlsZHJlbihlbGVtZW50KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKTtcbn1cbmZ1bmN0aW9uIGNsYWltX2VsZW1lbnQobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMsIHN2Zykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICBpZiAobm9kZS5ub2RlTmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgbGV0IGogPSAwO1xuICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gW107XG4gICAgICAgICAgICB3aGlsZSAoaiA8IG5vZGUuYXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBub2RlLmF0dHJpYnV0ZXNbaisrXTtcbiAgICAgICAgICAgICAgICBpZiAoIWF0dHJpYnV0ZXNbYXR0cmlidXRlLm5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZS5wdXNoKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHJlbW92ZS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKHJlbW92ZVtrXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXMuc3BsaWNlKGksIDEpWzBdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdmcgPyBzdmdfZWxlbWVudChuYW1lKSA6IGVsZW1lbnQobmFtZSk7XG59XG5mdW5jdGlvbiBjbGFpbV90ZXh0KG5vZGVzLCBkYXRhKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgICBub2RlLmRhdGEgPSAnJyArIGRhdGE7XG4gICAgICAgICAgICByZXR1cm4gbm9kZXMuc3BsaWNlKGksIDEpWzBdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0ZXh0KGRhdGEpO1xufVxuZnVuY3Rpb24gY2xhaW1fc3BhY2Uobm9kZXMpIHtcbiAgICByZXR1cm4gY2xhaW1fdGV4dChub2RlcywgJyAnKTtcbn1cbmZ1bmN0aW9uIHNldF9kYXRhKHRleHQsIGRhdGEpIHtcbiAgICBkYXRhID0gJycgKyBkYXRhO1xuICAgIGlmICh0ZXh0LmRhdGEgIT09IGRhdGEpXG4gICAgICAgIHRleHQuZGF0YSA9IGRhdGE7XG59XG5mdW5jdGlvbiBzZXRfaW5wdXRfdmFsdWUoaW5wdXQsIHZhbHVlKSB7XG4gICAgaW5wdXQudmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHNldF9pbnB1dF90eXBlKGlucHV0LCB0eXBlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaW5wdXQudHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfc3R5bGUobm9kZSwga2V5LCB2YWx1ZSwgaW1wb3J0YW50KSB7XG4gICAgbm9kZS5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlLCBpbXBvcnRhbnQgPyAnaW1wb3J0YW50JyA6ICcnKTtcbn1cbmZ1bmN0aW9uIHNlbGVjdF9vcHRpb24oc2VsZWN0LCB2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gc2VsZWN0Lm9wdGlvbnNbaV07XG4gICAgICAgIGlmIChvcHRpb24uX192YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBzZWxlY3Rfb3B0aW9ucyhzZWxlY3QsIHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gfnZhbHVlLmluZGV4T2Yob3B0aW9uLl9fdmFsdWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNlbGVjdF92YWx1ZShzZWxlY3QpIHtcbiAgICBjb25zdCBzZWxlY3RlZF9vcHRpb24gPSBzZWxlY3QucXVlcnlTZWxlY3RvcignOmNoZWNrZWQnKSB8fCBzZWxlY3Qub3B0aW9uc1swXTtcbiAgICByZXR1cm4gc2VsZWN0ZWRfb3B0aW9uICYmIHNlbGVjdGVkX29wdGlvbi5fX3ZhbHVlO1xufVxuZnVuY3Rpb24gc2VsZWN0X211bHRpcGxlX3ZhbHVlKHNlbGVjdCkge1xuICAgIHJldHVybiBbXS5tYXAuY2FsbChzZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnOmNoZWNrZWQnKSwgb3B0aW9uID0+IG9wdGlvbi5fX3ZhbHVlKTtcbn1cbi8vIHVuZm9ydHVuYXRlbHkgdGhpcyBjYW4ndCBiZSBhIGNvbnN0YW50IGFzIHRoYXQgd291bGRuJ3QgYmUgdHJlZS1zaGFrZWFibGVcbi8vIHNvIHdlIGNhY2hlIHRoZSByZXN1bHQgaW5zdGVhZFxubGV0IGNyb3Nzb3JpZ2luO1xuZnVuY3Rpb24gaXNfY3Jvc3NvcmlnaW4oKSB7XG4gICAgaWYgKGNyb3Nzb3JpZ2luID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3Jvc3NvcmlnaW4gPSBmYWxzZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgdm9pZCB3aW5kb3cucGFyZW50LmRvY3VtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY3Jvc3NvcmlnaW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjcm9zc29yaWdpbjtcbn1cbmZ1bmN0aW9uIGFkZF9yZXNpemVfbGlzdGVuZXIobm9kZSwgZm4pIHtcbiAgICBjb25zdCBjb21wdXRlZF9zdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgY29uc3Qgel9pbmRleCA9IChwYXJzZUludChjb21wdXRlZF9zdHlsZS56SW5kZXgpIHx8IDApIC0gMTtcbiAgICBpZiAoY29tcHV0ZWRfc3R5bGUucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIH1cbiAgICBjb25zdCBpZnJhbWUgPSBlbGVtZW50KCdpZnJhbWUnKTtcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBkaXNwbGF5OiBibG9jazsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IGAgK1xuICAgICAgICBgb3ZlcmZsb3c6IGhpZGRlbjsgYm9yZGVyOiAwOyBvcGFjaXR5OiAwOyBwb2ludGVyLWV2ZW50czogbm9uZTsgei1pbmRleDogJHt6X2luZGV4fTtgKTtcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgaWZyYW1lLnRhYkluZGV4ID0gLTE7XG4gICAgY29uc3QgY3Jvc3NvcmlnaW4gPSBpc19jcm9zc29yaWdpbigpO1xuICAgIGxldCB1bnN1YnNjcmliZTtcbiAgICBpZiAoY3Jvc3NvcmlnaW4pIHtcbiAgICAgICAgaWZyYW1lLnNyYyA9IGBkYXRhOnRleHQvaHRtbCw8c2NyaXB0Pm9ucmVzaXplPWZ1bmN0aW9uKCl7cGFyZW50LnBvc3RNZXNzYWdlKDAsJyonKX08L3NjcmlwdD5gO1xuICAgICAgICB1bnN1YnNjcmliZSA9IGxpc3Rlbih3aW5kb3csICdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBpZnJhbWUuY29udGVudFdpbmRvdylcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmcmFtZS5zcmMgPSAnYWJvdXQ6YmxhbmsnO1xuICAgICAgICBpZnJhbWUub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUgPSBsaXN0ZW4oaWZyYW1lLmNvbnRlbnRXaW5kb3csICdyZXNpemUnLCBmbik7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGFwcGVuZChub2RlLCBpZnJhbWUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChjcm9zc29yaWdpbikge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1bnN1YnNjcmliZSAmJiBpZnJhbWUuY29udGVudFdpbmRvdykge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBkZXRhY2goaWZyYW1lKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdG9nZ2xlX2NsYXNzKGVsZW1lbnQsIG5hbWUsIHRvZ2dsZSkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0W3RvZ2dsZSA/ICdhZGQnIDogJ3JlbW92ZSddKG5hbWUpO1xufVxuZnVuY3Rpb24gY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCkge1xuICAgIGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UsIGRldGFpbCk7XG4gICAgcmV0dXJuIGU7XG59XG5mdW5jdGlvbiBxdWVyeV9zZWxlY3Rvcl9hbGwoc2VsZWN0b3IsIHBhcmVudCA9IGRvY3VtZW50LmJvZHkpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xufVxuY2xhc3MgSHRtbFRhZyB7XG4gICAgY29uc3RydWN0b3IoYW5jaG9yID0gbnVsbCkge1xuICAgICAgICB0aGlzLmEgPSBhbmNob3I7XG4gICAgICAgIHRoaXMuZSA9IHRoaXMubiA9IG51bGw7XG4gICAgfVxuICAgIG0oaHRtbCwgdGFyZ2V0LCBhbmNob3IgPSBudWxsKSB7XG4gICAgICAgIGlmICghdGhpcy5lKSB7XG4gICAgICAgICAgICB0aGlzLmUgPSBlbGVtZW50KHRhcmdldC5ub2RlTmFtZSk7XG4gICAgICAgICAgICB0aGlzLnQgPSB0YXJnZXQ7XG4gICAgICAgICAgICB0aGlzLmgoaHRtbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pKGFuY2hvcik7XG4gICAgfVxuICAgIGgoaHRtbCkge1xuICAgICAgICB0aGlzLmUuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgdGhpcy5uID0gQXJyYXkuZnJvbSh0aGlzLmUuY2hpbGROb2Rlcyk7XG4gICAgfVxuICAgIGkoYW5jaG9yKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5uLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpbnNlcnQodGhpcy50LCB0aGlzLm5baV0sIGFuY2hvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcChodG1sKSB7XG4gICAgICAgIHRoaXMuZCgpO1xuICAgICAgICB0aGlzLmgoaHRtbCk7XG4gICAgICAgIHRoaXMuaSh0aGlzLmEpO1xuICAgIH1cbiAgICBkKCkge1xuICAgICAgICB0aGlzLm4uZm9yRWFjaChkZXRhY2gpO1xuICAgIH1cbn1cblxuY29uc3QgYWN0aXZlX2RvY3MgPSBuZXcgU2V0KCk7XG5sZXQgYWN0aXZlID0gMDtcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXJrc2t5YXBwL3N0cmluZy1oYXNoL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG5mdW5jdGlvbiBoYXNoKHN0cikge1xuICAgIGxldCBoYXNoID0gNTM4MTtcbiAgICBsZXQgaSA9IHN0ci5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSlcbiAgICAgICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpIF4gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGhhc2ggPj4+IDA7XG59XG5mdW5jdGlvbiBjcmVhdGVfcnVsZShub2RlLCBhLCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2UsIGZuLCB1aWQgPSAwKSB7XG4gICAgY29uc3Qgc3RlcCA9IDE2LjY2NiAvIGR1cmF0aW9uO1xuICAgIGxldCBrZXlmcmFtZXMgPSAne1xcbic7XG4gICAgZm9yIChsZXQgcCA9IDA7IHAgPD0gMTsgcCArPSBzdGVwKSB7XG4gICAgICAgIGNvbnN0IHQgPSBhICsgKGIgLSBhKSAqIGVhc2UocCk7XG4gICAgICAgIGtleWZyYW1lcyArPSBwICogMTAwICsgYCV7JHtmbih0LCAxIC0gdCl9fVxcbmA7XG4gICAgfVxuICAgIGNvbnN0IHJ1bGUgPSBrZXlmcmFtZXMgKyBgMTAwJSB7JHtmbihiLCAxIC0gYil9fVxcbn1gO1xuICAgIGNvbnN0IG5hbWUgPSBgX19zdmVsdGVfJHtoYXNoKHJ1bGUpfV8ke3VpZH1gO1xuICAgIGNvbnN0IGRvYyA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICBhY3RpdmVfZG9jcy5hZGQoZG9jKTtcbiAgICBjb25zdCBzdHlsZXNoZWV0ID0gZG9jLl9fc3ZlbHRlX3N0eWxlc2hlZXQgfHwgKGRvYy5fX3N2ZWx0ZV9zdHlsZXNoZWV0ID0gZG9jLmhlYWQuYXBwZW5kQ2hpbGQoZWxlbWVudCgnc3R5bGUnKSkuc2hlZXQpO1xuICAgIGNvbnN0IGN1cnJlbnRfcnVsZXMgPSBkb2MuX19zdmVsdGVfcnVsZXMgfHwgKGRvYy5fX3N2ZWx0ZV9ydWxlcyA9IHt9KTtcbiAgICBpZiAoIWN1cnJlbnRfcnVsZXNbbmFtZV0pIHtcbiAgICAgICAgY3VycmVudF9ydWxlc1tuYW1lXSA9IHRydWU7XG4gICAgICAgIHN0eWxlc2hlZXQuaW5zZXJ0UnVsZShgQGtleWZyYW1lcyAke25hbWV9ICR7cnVsZX1gLCBzdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aCk7XG4gICAgfVxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IG5vZGUuc3R5bGUuYW5pbWF0aW9uIHx8ICcnO1xuICAgIG5vZGUuc3R5bGUuYW5pbWF0aW9uID0gYCR7YW5pbWF0aW9uID8gYCR7YW5pbWF0aW9ufSwgYCA6IGBgfSR7bmFtZX0gJHtkdXJhdGlvbn1tcyBsaW5lYXIgJHtkZWxheX1tcyAxIGJvdGhgO1xuICAgIGFjdGl2ZSArPSAxO1xuICAgIHJldHVybiBuYW1lO1xufVxuZnVuY3Rpb24gZGVsZXRlX3J1bGUobm9kZSwgbmFtZSkge1xuICAgIGNvbnN0IHByZXZpb3VzID0gKG5vZGUuc3R5bGUuYW5pbWF0aW9uIHx8ICcnKS5zcGxpdCgnLCAnKTtcbiAgICBjb25zdCBuZXh0ID0gcHJldmlvdXMuZmlsdGVyKG5hbWVcbiAgICAgICAgPyBhbmltID0+IGFuaW0uaW5kZXhPZihuYW1lKSA8IDAgLy8gcmVtb3ZlIHNwZWNpZmljIGFuaW1hdGlvblxuICAgICAgICA6IGFuaW0gPT4gYW5pbS5pbmRleE9mKCdfX3N2ZWx0ZScpID09PSAtMSAvLyByZW1vdmUgYWxsIFN2ZWx0ZSBhbmltYXRpb25zXG4gICAgKTtcbiAgICBjb25zdCBkZWxldGVkID0gcHJldmlvdXMubGVuZ3RoIC0gbmV4dC5sZW5ndGg7XG4gICAgaWYgKGRlbGV0ZWQpIHtcbiAgICAgICAgbm9kZS5zdHlsZS5hbmltYXRpb24gPSBuZXh0LmpvaW4oJywgJyk7XG4gICAgICAgIGFjdGl2ZSAtPSBkZWxldGVkO1xuICAgICAgICBpZiAoIWFjdGl2ZSlcbiAgICAgICAgICAgIGNsZWFyX3J1bGVzKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2xlYXJfcnVsZXMoKSB7XG4gICAgcmFmKCgpID0+IHtcbiAgICAgICAgaWYgKGFjdGl2ZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgYWN0aXZlX2RvY3MuZm9yRWFjaChkb2MgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVzaGVldCA9IGRvYy5fX3N2ZWx0ZV9zdHlsZXNoZWV0O1xuICAgICAgICAgICAgbGV0IGkgPSBzdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pXG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldC5kZWxldGVSdWxlKGkpO1xuICAgICAgICAgICAgZG9jLl9fc3ZlbHRlX3J1bGVzID0ge307XG4gICAgICAgIH0pO1xuICAgICAgICBhY3RpdmVfZG9jcy5jbGVhcigpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVfYW5pbWF0aW9uKG5vZGUsIGZyb20sIGZuLCBwYXJhbXMpIHtcbiAgICBpZiAoIWZyb20pXG4gICAgICAgIHJldHVybiBub29wO1xuICAgIGNvbnN0IHRvID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAoZnJvbS5sZWZ0ID09PSB0by5sZWZ0ICYmIGZyb20ucmlnaHQgPT09IHRvLnJpZ2h0ICYmIGZyb20udG9wID09PSB0by50b3AgJiYgZnJvbS5ib3R0b20gPT09IHRvLmJvdHRvbSlcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgXG4gICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBzaG91bGQgdGhpcyBiZSBzZXBhcmF0ZWQgZnJvbSBkZXN0cnVjdHVyaW5nPyBPciBzdGFydC9lbmQgYWRkZWQgdG8gcHVibGljIGFwaSBhbmQgZG9jdW1lbnRhdGlvbj9cbiAgICBzdGFydDogc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXksIFxuICAgIC8vIEB0cy1pZ25vcmUgdG9kbzpcbiAgICBlbmQgPSBzdGFydF90aW1lICsgZHVyYXRpb24sIHRpY2sgPSBub29wLCBjc3MgfSA9IGZuKG5vZGUsIHsgZnJvbSwgdG8gfSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IHRydWU7XG4gICAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICBsZXQgbmFtZTtcbiAgICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVsYXkpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBuYW1lKTtcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgIGlmICghc3RhcnRlZCAmJiBub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0ZWQgJiYgbm93ID49IGVuZCkge1xuICAgICAgICAgICAgdGljaygxLCAwKTtcbiAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRlZCkge1xuICAgICAgICAgICAgY29uc3QgcCA9IG5vdyAtIHN0YXJ0X3RpbWU7XG4gICAgICAgICAgICBjb25zdCB0ID0gMCArIDEgKiBlYXNpbmcocCAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIHN0YXJ0KCk7XG4gICAgdGljaygwLCAxKTtcbiAgICByZXR1cm4gc3RvcDtcbn1cbmZ1bmN0aW9uIGZpeF9wb3NpdGlvbihub2RlKSB7XG4gICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIGlmIChzdHlsZS5wb3NpdGlvbiAhPT0gJ2Fic29sdXRlJyAmJiBzdHlsZS5wb3NpdGlvbiAhPT0gJ2ZpeGVkJykge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHN0eWxlO1xuICAgICAgICBjb25zdCBhID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIG5vZGUuc3R5bGUud2lkdGggPSB3aWR0aDtcbiAgICAgICAgbm9kZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGFkZF90cmFuc2Zvcm0obm9kZSwgYSk7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkX3RyYW5zZm9ybShub2RlLCBhKSB7XG4gICAgY29uc3QgYiA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGEubGVmdCAhPT0gYi5sZWZ0IHx8IGEudG9wICE9PSBiLnRvcCkge1xuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSA9PT0gJ25vbmUnID8gJycgOiBzdHlsZS50cmFuc2Zvcm07XG4gICAgICAgIG5vZGUuc3R5bGUudHJhbnNmb3JtID0gYCR7dHJhbnNmb3JtfSB0cmFuc2xhdGUoJHthLmxlZnQgLSBiLmxlZnR9cHgsICR7YS50b3AgLSBiLnRvcH1weClgO1xuICAgIH1cbn1cblxubGV0IGN1cnJlbnRfY29tcG9uZW50O1xuZnVuY3Rpb24gc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgIGN1cnJlbnRfY29tcG9uZW50ID0gY29tcG9uZW50O1xufVxuZnVuY3Rpb24gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkge1xuICAgIGlmICghY3VycmVudF9jb21wb25lbnQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRnVuY3Rpb24gY2FsbGVkIG91dHNpZGUgY29tcG9uZW50IGluaXRpYWxpemF0aW9uYCk7XG4gICAgcmV0dXJuIGN1cnJlbnRfY29tcG9uZW50O1xufVxuZnVuY3Rpb24gYmVmb3JlVXBkYXRlKGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuYmVmb3JlX3VwZGF0ZS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIG9uTW91bnQoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5vbl9tb3VudC5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGFmdGVyVXBkYXRlKGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuYWZ0ZXJfdXBkYXRlLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gb25EZXN0cm95KGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQub25fZGVzdHJveS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlcigpIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQoKTtcbiAgICByZXR1cm4gKHR5cGUsIGRldGFpbCkgPT4ge1xuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSBjb21wb25lbnQuJCQuY2FsbGJhY2tzW3R5cGVdO1xuICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAvLyBUT0RPIGFyZSB0aGVyZSBzaXR1YXRpb25zIHdoZXJlIGV2ZW50cyBjb3VsZCBiZSBkaXNwYXRjaGVkXG4gICAgICAgICAgICAvLyBpbiBhIHNlcnZlciAobm9uLURPTSkgZW52aXJvbm1lbnQ/XG4gICAgICAgICAgICBjb25zdCBldmVudCA9IGN1c3RvbV9ldmVudCh0eXBlLCBkZXRhaWwpO1xuICAgICAgICAgICAgY2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaChmbiA9PiB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbChjb21wb25lbnQsIGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHNldENvbnRleHQoa2V5LCBjb250ZXh0KSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dC5zZXQoa2V5LCBjb250ZXh0KTtcbn1cbmZ1bmN0aW9uIGdldENvbnRleHQoa2V5KSB7XG4gICAgcmV0dXJuIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuZ2V0KGtleSk7XG59XG4vLyBUT0RPIGZpZ3VyZSBvdXQgaWYgd2Ugc3RpbGwgd2FudCB0byBzdXBwb3J0XG4vLyBzaG9ydGhhbmQgZXZlbnRzLCBvciBpZiB3ZSB3YW50IHRvIGltcGxlbWVudFxuLy8gYSByZWFsIGJ1YmJsaW5nIG1lY2hhbmlzbVxuZnVuY3Rpb24gYnViYmxlKGNvbXBvbmVudCwgZXZlbnQpIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSBjb21wb25lbnQuJCQuY2FsbGJhY2tzW2V2ZW50LnR5cGVdO1xuICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgY2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaChmbiA9PiBmbihldmVudCkpO1xuICAgIH1cbn1cblxuY29uc3QgZGlydHlfY29tcG9uZW50cyA9IFtdO1xuY29uc3QgaW50cm9zID0geyBlbmFibGVkOiBmYWxzZSB9O1xuY29uc3QgYmluZGluZ19jYWxsYmFja3MgPSBbXTtcbmNvbnN0IHJlbmRlcl9jYWxsYmFja3MgPSBbXTtcbmNvbnN0IGZsdXNoX2NhbGxiYWNrcyA9IFtdO1xuY29uc3QgcmVzb2x2ZWRfcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xubGV0IHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcbmZ1bmN0aW9uIHNjaGVkdWxlX3VwZGF0ZSgpIHtcbiAgICBpZiAoIXVwZGF0ZV9zY2hlZHVsZWQpIHtcbiAgICAgICAgdXBkYXRlX3NjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgIHJlc29sdmVkX3Byb21pc2UudGhlbihmbHVzaCk7XG4gICAgfVxufVxuZnVuY3Rpb24gdGljaygpIHtcbiAgICBzY2hlZHVsZV91cGRhdGUoKTtcbiAgICByZXR1cm4gcmVzb2x2ZWRfcHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGFkZF9yZW5kZXJfY2FsbGJhY2soZm4pIHtcbiAgICByZW5kZXJfY2FsbGJhY2tzLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gYWRkX2ZsdXNoX2NhbGxiYWNrKGZuKSB7XG4gICAgZmx1c2hfY2FsbGJhY2tzLnB1c2goZm4pO1xufVxubGV0IGZsdXNoaW5nID0gZmFsc2U7XG5jb25zdCBzZWVuX2NhbGxiYWNrcyA9IG5ldyBTZXQoKTtcbmZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIGlmIChmbHVzaGluZylcbiAgICAgICAgcmV0dXJuO1xuICAgIGZsdXNoaW5nID0gdHJ1ZTtcbiAgICBkbyB7XG4gICAgICAgIC8vIGZpcnN0LCBjYWxsIGJlZm9yZVVwZGF0ZSBmdW5jdGlvbnNcbiAgICAgICAgLy8gYW5kIHVwZGF0ZSBjb21wb25lbnRzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlydHlfY29tcG9uZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gZGlydHlfY29tcG9uZW50c1tpXTtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICAgICAgdXBkYXRlKGNvbXBvbmVudC4kJCk7XG4gICAgICAgIH1cbiAgICAgICAgZGlydHlfY29tcG9uZW50cy5sZW5ndGggPSAwO1xuICAgICAgICB3aGlsZSAoYmluZGluZ19jYWxsYmFja3MubGVuZ3RoKVxuICAgICAgICAgICAgYmluZGluZ19jYWxsYmFja3MucG9wKCkoKTtcbiAgICAgICAgLy8gdGhlbiwgb25jZSBjb21wb25lbnRzIGFyZSB1cGRhdGVkLCBjYWxsXG4gICAgICAgIC8vIGFmdGVyVXBkYXRlIGZ1bmN0aW9ucy4gVGhpcyBtYXkgY2F1c2VcbiAgICAgICAgLy8gc3Vic2VxdWVudCB1cGRhdGVzLi4uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyX2NhbGxiYWNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSByZW5kZXJfY2FsbGJhY2tzW2ldO1xuICAgICAgICAgICAgaWYgKCFzZWVuX2NhbGxiYWNrcy5oYXMoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgLy8gLi4uc28gZ3VhcmQgYWdhaW5zdCBpbmZpbml0ZSBsb29wc1xuICAgICAgICAgICAgICAgIHNlZW5fY2FsbGJhY2tzLmFkZChjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aCA9IDA7XG4gICAgfSB3aGlsZSAoZGlydHlfY29tcG9uZW50cy5sZW5ndGgpO1xuICAgIHdoaWxlIChmbHVzaF9jYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICAgIGZsdXNoX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgIH1cbiAgICB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgZmx1c2hpbmcgPSBmYWxzZTtcbiAgICBzZWVuX2NhbGxiYWNrcy5jbGVhcigpO1xufVxuZnVuY3Rpb24gdXBkYXRlKCQkKSB7XG4gICAgaWYgKCQkLmZyYWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICQkLnVwZGF0ZSgpO1xuICAgICAgICBydW5fYWxsKCQkLmJlZm9yZV91cGRhdGUpO1xuICAgICAgICBjb25zdCBkaXJ0eSA9ICQkLmRpcnR5O1xuICAgICAgICAkJC5kaXJ0eSA9IFstMV07XG4gICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LnAoJCQuY3R4LCBkaXJ0eSk7XG4gICAgICAgICQkLmFmdGVyX3VwZGF0ZS5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xuICAgIH1cbn1cblxubGV0IHByb21pc2U7XG5mdW5jdGlvbiB3YWl0KCkge1xuICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9taXNlO1xufVxuZnVuY3Rpb24gZGlzcGF0Y2gobm9kZSwgZGlyZWN0aW9uLCBraW5kKSB7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGN1c3RvbV9ldmVudChgJHtkaXJlY3Rpb24gPyAnaW50cm8nIDogJ291dHJvJ30ke2tpbmR9YCkpO1xufVxuY29uc3Qgb3V0cm9pbmcgPSBuZXcgU2V0KCk7XG5sZXQgb3V0cm9zO1xuZnVuY3Rpb24gZ3JvdXBfb3V0cm9zKCkge1xuICAgIG91dHJvcyA9IHtcbiAgICAgICAgcjogMCxcbiAgICAgICAgYzogW10sXG4gICAgICAgIHA6IG91dHJvcyAvLyBwYXJlbnQgZ3JvdXBcbiAgICB9O1xufVxuZnVuY3Rpb24gY2hlY2tfb3V0cm9zKCkge1xuICAgIGlmICghb3V0cm9zLnIpIHtcbiAgICAgICAgcnVuX2FsbChvdXRyb3MuYyk7XG4gICAgfVxuICAgIG91dHJvcyA9IG91dHJvcy5wO1xufVxuZnVuY3Rpb24gdHJhbnNpdGlvbl9pbihibG9jaywgbG9jYWwpIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2suaSkge1xuICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICBibG9jay5pKGxvY2FsKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uX291dChibG9jaywgbG9jYWwsIGRldGFjaCwgY2FsbGJhY2spIHtcbiAgICBpZiAoYmxvY2sgJiYgYmxvY2subykge1xuICAgICAgICBpZiAob3V0cm9pbmcuaGFzKGJsb2NrKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgb3V0cm9pbmcuYWRkKGJsb2NrKTtcbiAgICAgICAgb3V0cm9zLmMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICBvdXRyb2luZy5kZWxldGUoYmxvY2spO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRldGFjaClcbiAgICAgICAgICAgICAgICAgICAgYmxvY2suZCgxKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYmxvY2subyhsb2NhbCk7XG4gICAgfVxufVxuY29uc3QgbnVsbF90cmFuc2l0aW9uID0geyBkdXJhdGlvbjogMCB9O1xuZnVuY3Rpb24gY3JlYXRlX2luX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gZmFsc2U7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGxldCB0YXNrO1xuICAgIGxldCB1aWQgPSAwO1xuICAgIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ28oKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MsIHVpZCsrKTtcbiAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXk7XG4gICAgICAgIGNvbnN0IGVuZF90aW1lID0gc3RhcnRfdGltZSArIGR1cmF0aW9uO1xuICAgICAgICBpZiAodGFzaylcbiAgICAgICAgICAgIHRhc2suYWJvcnQoKTtcbiAgICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgdHJ1ZSwgJ3N0YXJ0JykpO1xuICAgICAgICB0YXNrID0gbG9vcChub3cgPT4ge1xuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAobm93ID49IGVuZF90aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHRydWUsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydCgpIHtcbiAgICAgICAgICAgIGlmIChzdGFydGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUpO1xuICAgICAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbihnbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbnZhbGlkYXRlKCkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBlbmQoKSB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlX291dF90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMpIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IHRydWU7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lO1xuICAgIGNvbnN0IGdyb3VwID0gb3V0cm9zO1xuICAgIGdyb3VwLnIgKz0gMTtcbiAgICBmdW5jdGlvbiBnbygpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMSwgMCwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgIGNvbnN0IHN0YXJ0X3RpbWUgPSBub3coKSArIGRlbGF5O1xuICAgICAgICBjb25zdCBlbmRfdGltZSA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbjtcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCBmYWxzZSwgJ3N0YXJ0JykpO1xuICAgICAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gZW5kX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGljaygwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgZmFsc2UsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEtLWdyb3VwLnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgd2lsbCByZXN1bHQgaW4gYGVuZCgpYCBiZWluZyBjYWxsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzbyB3ZSBkb24ndCBuZWVkIHRvIGNsZWFuIHVwIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bl9hbGwoZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm93ID49IHN0YXJ0X3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IGVhc2luZygobm93IC0gc3RhcnRfdGltZSkgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRpY2soMSAtIHQsIHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgd2FpdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICBnbygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdvKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGVuZChyZXNldCkge1xuICAgICAgICAgICAgaWYgKHJlc2V0ICYmIGNvbmZpZy50aWNrKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLnRpY2soMSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgYW5pbWF0aW9uX25hbWUpO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVfYmlkaXJlY3Rpb25hbF90cmFuc2l0aW9uKG5vZGUsIGZuLCBwYXJhbXMsIGludHJvKSB7XG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XG4gICAgbGV0IHQgPSBpbnRybyA/IDAgOiAxO1xuICAgIGxldCBydW5uaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgIGxldCBhbmltYXRpb25fbmFtZSA9IG51bGw7XG4gICAgZnVuY3Rpb24gY2xlYXJfYW5pbWF0aW9uKCkge1xuICAgICAgICBpZiAoYW5pbWF0aW9uX25hbWUpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQocHJvZ3JhbSwgZHVyYXRpb24pIHtcbiAgICAgICAgY29uc3QgZCA9IHByb2dyYW0uYiAtIHQ7XG4gICAgICAgIGR1cmF0aW9uICo9IE1hdGguYWJzKGQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYTogdCxcbiAgICAgICAgICAgIGI6IHByb2dyYW0uYixcbiAgICAgICAgICAgIGQsXG4gICAgICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgICAgIHN0YXJ0OiBwcm9ncmFtLnN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBwcm9ncmFtLnN0YXJ0ICsgZHVyYXRpb24sXG4gICAgICAgICAgICBncm91cDogcHJvZ3JhbS5ncm91cFxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBnbyhiKSB7XG4gICAgICAgIGNvbnN0IHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDMwMCwgZWFzaW5nID0gaWRlbnRpdHksIHRpY2sgPSBub29wLCBjc3MgfSA9IGNvbmZpZyB8fCBudWxsX3RyYW5zaXRpb247XG4gICAgICAgIGNvbnN0IHByb2dyYW0gPSB7XG4gICAgICAgICAgICBzdGFydDogbm93KCkgKyBkZWxheSxcbiAgICAgICAgICAgIGJcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFiKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgcHJvZ3JhbS5ncm91cCA9IG91dHJvcztcbiAgICAgICAgICAgIG91dHJvcy5yICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgcGVuZGluZ19wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYW4gaW50cm8sIGFuZCB0aGVyZSdzIGEgZGVsYXksIHdlIG5lZWQgdG8gZG9cbiAgICAgICAgICAgIC8vIGFuIGluaXRpYWwgdGljayBhbmQvb3IgYXBwbHkgQ1NTIGFuaW1hdGlvbiBpbW1lZGlhdGVseVxuICAgICAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgdCwgYiwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYilcbiAgICAgICAgICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gaW5pdChwcm9ncmFtLCBkdXJhdGlvbik7XG4gICAgICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIGIsICdzdGFydCcpKTtcbiAgICAgICAgICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ19wcm9ncmFtICYmIG5vdyA+IHBlbmRpbmdfcHJvZ3JhbS5zdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBpbml0KHBlbmRpbmdfcHJvZ3JhbSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBydW5uaW5nX3Byb2dyYW0uYiwgJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCB0LCBydW5uaW5nX3Byb2dyYW0uYiwgcnVubmluZ19wcm9ncmFtLmR1cmF0aW9uLCAwLCBlYXNpbmcsIGNvbmZpZy5jc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBydW5uaW5nX3Byb2dyYW0uZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQgPSBydW5uaW5nX3Byb2dyYW0uYiwgMSAtIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgcnVubmluZ19wcm9ncmFtLmIsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGVuZGluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UncmUgZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0uYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnRybyDigJQgd2UgY2FuIHRpZHkgdXAgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvdXRybyDigJQgbmVlZHMgdG8gYmUgY29vcmRpbmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEtLXJ1bm5pbmdfcHJvZ3JhbS5ncm91cC5yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2FsbChydW5uaW5nX3Byb2dyYW0uZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChub3cgPj0gcnVubmluZ19wcm9ncmFtLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gbm93IC0gcnVubmluZ19wcm9ncmFtLnN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHJ1bm5pbmdfcHJvZ3JhbS5hICsgcnVubmluZ19wcm9ncmFtLmQgKiBlYXNpbmcocCAvIHJ1bm5pbmdfcHJvZ3JhbS5kdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gISEocnVubmluZ19wcm9ncmFtIHx8IHBlbmRpbmdfcHJvZ3JhbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBydW4oYikge1xuICAgICAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICAgICAgICAgIGdvKGIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ28oYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9wcm9taXNlKHByb21pc2UsIGluZm8pIHtcbiAgICBjb25zdCB0b2tlbiA9IGluZm8udG9rZW4gPSB7fTtcbiAgICBmdW5jdGlvbiB1cGRhdGUodHlwZSwgaW5kZXgsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGluZm8udG9rZW4gIT09IHRva2VuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpbmZvLnJlc29sdmVkID0gdmFsdWU7XG4gICAgICAgIGxldCBjaGlsZF9jdHggPSBpbmZvLmN0eDtcbiAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjaGlsZF9jdHggPSBjaGlsZF9jdHguc2xpY2UoKTtcbiAgICAgICAgICAgIGNoaWxkX2N0eFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYmxvY2sgPSB0eXBlICYmIChpbmZvLmN1cnJlbnQgPSB0eXBlKShjaGlsZF9jdHgpO1xuICAgICAgICBsZXQgbmVlZHNfZmx1c2ggPSBmYWxzZTtcbiAgICAgICAgaWYgKGluZm8uYmxvY2spIHtcbiAgICAgICAgICAgIGlmIChpbmZvLmJsb2Nrcykge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzLmZvckVhY2goKGJsb2NrLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSBpbmRleCAmJiBibG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzW2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2suZCgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJsb2NrLmMoKTtcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oYmxvY2ssIDEpO1xuICAgICAgICAgICAgYmxvY2subShpbmZvLm1vdW50KCksIGluZm8uYW5jaG9yKTtcbiAgICAgICAgICAgIG5lZWRzX2ZsdXNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLmJsb2NrID0gYmxvY2s7XG4gICAgICAgIGlmIChpbmZvLmJsb2NrcylcbiAgICAgICAgICAgIGluZm8uYmxvY2tzW2luZGV4XSA9IGJsb2NrO1xuICAgICAgICBpZiAobmVlZHNfZmx1c2gpIHtcbiAgICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzX3Byb21pc2UocHJvbWlzZSkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudF9jb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQoKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby50aGVuLCAxLCBpbmZvLnZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby5jYXRjaCwgMiwgaW5mby5lcnJvciwgZXJyb3IpO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gaWYgd2UgcHJldmlvdXNseSBoYWQgYSB0aGVuL2NhdGNoIGJsb2NrLCBkZXN0cm95IGl0XG4gICAgICAgIGlmIChpbmZvLmN1cnJlbnQgIT09IGluZm8ucGVuZGluZykge1xuICAgICAgICAgICAgdXBkYXRlKGluZm8ucGVuZGluZywgMCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGluZm8uY3VycmVudCAhPT0gaW5mby50aGVuKSB7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby50aGVuLCAxLCBpbmZvLnZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGluZm8ucmVzb2x2ZWQgPSBwcm9taXNlO1xuICAgIH1cbn1cblxuY29uc3QgZ2xvYmFscyA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgID8gd2luZG93XG4gICAgOiB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyBnbG9iYWxUaGlzXG4gICAgICAgIDogZ2xvYmFsKTtcblxuZnVuY3Rpb24gZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZCgxKTtcbiAgICBsb29rdXAuZGVsZXRlKGJsb2NrLmtleSk7XG59XG5mdW5jdGlvbiBvdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgdHJhbnNpdGlvbl9vdXQoYmxvY2ssIDEsIDEsICgpID0+IHtcbiAgICAgICAgbG9va3VwLmRlbGV0ZShibG9jay5rZXkpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZml4X2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5mKCk7XG4gICAgZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKTtcbn1cbmZ1bmN0aW9uIGZpeF9hbmRfb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmYoKTtcbiAgICBvdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZV9rZXllZF9lYWNoKG9sZF9ibG9ja3MsIGRpcnR5LCBnZXRfa2V5LCBkeW5hbWljLCBjdHgsIGxpc3QsIGxvb2t1cCwgbm9kZSwgZGVzdHJveSwgY3JlYXRlX2VhY2hfYmxvY2ssIG5leHQsIGdldF9jb250ZXh0KSB7XG4gICAgbGV0IG8gPSBvbGRfYmxvY2tzLmxlbmd0aDtcbiAgICBsZXQgbiA9IGxpc3QubGVuZ3RoO1xuICAgIGxldCBpID0gbztcbiAgICBjb25zdCBvbGRfaW5kZXhlcyA9IHt9O1xuICAgIHdoaWxlIChpLS0pXG4gICAgICAgIG9sZF9pbmRleGVzW29sZF9ibG9ja3NbaV0ua2V5XSA9IGk7XG4gICAgY29uc3QgbmV3X2Jsb2NrcyA9IFtdO1xuICAgIGNvbnN0IG5ld19sb29rdXAgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgZGVsdGFzID0gbmV3IE1hcCgpO1xuICAgIGkgPSBuO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uc3QgY2hpbGRfY3R4ID0gZ2V0X2NvbnRleHQoY3R4LCBsaXN0LCBpKTtcbiAgICAgICAgY29uc3Qga2V5ID0gZ2V0X2tleShjaGlsZF9jdHgpO1xuICAgICAgICBsZXQgYmxvY2sgPSBsb29rdXAuZ2V0KGtleSk7XG4gICAgICAgIGlmICghYmxvY2spIHtcbiAgICAgICAgICAgIGJsb2NrID0gY3JlYXRlX2VhY2hfYmxvY2soa2V5LCBjaGlsZF9jdHgpO1xuICAgICAgICAgICAgYmxvY2suYygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGR5bmFtaWMpIHtcbiAgICAgICAgICAgIGJsb2NrLnAoY2hpbGRfY3R4LCBkaXJ0eSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3X2xvb2t1cC5zZXQoa2V5LCBuZXdfYmxvY2tzW2ldID0gYmxvY2spO1xuICAgICAgICBpZiAoa2V5IGluIG9sZF9pbmRleGVzKVxuICAgICAgICAgICAgZGVsdGFzLnNldChrZXksIE1hdGguYWJzKGkgLSBvbGRfaW5kZXhlc1trZXldKSk7XG4gICAgfVxuICAgIGNvbnN0IHdpbGxfbW92ZSA9IG5ldyBTZXQoKTtcbiAgICBjb25zdCBkaWRfbW92ZSA9IG5ldyBTZXQoKTtcbiAgICBmdW5jdGlvbiBpbnNlcnQoYmxvY2spIHtcbiAgICAgICAgdHJhbnNpdGlvbl9pbihibG9jaywgMSk7XG4gICAgICAgIGJsb2NrLm0obm9kZSwgbmV4dCk7XG4gICAgICAgIGxvb2t1cC5zZXQoYmxvY2sua2V5LCBibG9jayk7XG4gICAgICAgIG5leHQgPSBibG9jay5maXJzdDtcbiAgICAgICAgbi0tO1xuICAgIH1cbiAgICB3aGlsZSAobyAmJiBuKSB7XG4gICAgICAgIGNvbnN0IG5ld19ibG9jayA9IG5ld19ibG9ja3NbbiAtIDFdO1xuICAgICAgICBjb25zdCBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW28gLSAxXTtcbiAgICAgICAgY29uc3QgbmV3X2tleSA9IG5ld19ibG9jay5rZXk7XG4gICAgICAgIGNvbnN0IG9sZF9rZXkgPSBvbGRfYmxvY2sua2V5O1xuICAgICAgICBpZiAobmV3X2Jsb2NrID09PSBvbGRfYmxvY2spIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIG5leHQgPSBuZXdfYmxvY2suZmlyc3Q7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgICAgICBuLS07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9rZXkpKSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgb2xkIGJsb2NrXG4gICAgICAgICAgICBkZXN0cm95KG9sZF9ibG9jaywgbG9va3VwKTtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbG9va3VwLmhhcyhuZXdfa2V5KSB8fCB3aWxsX21vdmUuaGFzKG5ld19rZXkpKSB7XG4gICAgICAgICAgICBpbnNlcnQobmV3X2Jsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkaWRfbW92ZS5oYXMob2xkX2tleSkpIHtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZWx0YXMuZ2V0KG5ld19rZXkpID4gZGVsdGFzLmdldChvbGRfa2V5KSkge1xuICAgICAgICAgICAgZGlkX21vdmUuYWRkKG5ld19rZXkpO1xuICAgICAgICAgICAgaW5zZXJ0KG5ld19ibG9jayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3aWxsX21vdmUuYWRkKG9sZF9rZXkpO1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdoaWxlIChvLS0pIHtcbiAgICAgICAgY29uc3Qgb2xkX2Jsb2NrID0gb2xkX2Jsb2Nrc1tvXTtcbiAgICAgICAgaWYgKCFuZXdfbG9va3VwLmhhcyhvbGRfYmxvY2sua2V5KSlcbiAgICAgICAgICAgIGRlc3Ryb3kob2xkX2Jsb2NrLCBsb29rdXApO1xuICAgIH1cbiAgICB3aGlsZSAobilcbiAgICAgICAgaW5zZXJ0KG5ld19ibG9ja3NbbiAtIDFdKTtcbiAgICByZXR1cm4gbmV3X2Jsb2Nrcztcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX2VhY2hfa2V5cyhjdHgsIGxpc3QsIGdldF9jb250ZXh0LCBnZXRfa2V5KSB7XG4gICAgY29uc3Qga2V5cyA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qga2V5ID0gZ2V0X2tleShnZXRfY29udGV4dChjdHgsIGxpc3QsIGkpKTtcbiAgICAgICAgaWYgKGtleXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGhhdmUgZHVwbGljYXRlIGtleXMgaW4gYSBrZXllZCBlYWNoYCk7XG4gICAgICAgIH1cbiAgICAgICAga2V5cy5hZGQoa2V5KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldF9zcHJlYWRfdXBkYXRlKGxldmVscywgdXBkYXRlcykge1xuICAgIGNvbnN0IHVwZGF0ZSA9IHt9O1xuICAgIGNvbnN0IHRvX251bGxfb3V0ID0ge307XG4gICAgY29uc3QgYWNjb3VudGVkX2ZvciA9IHsgJCRzY29wZTogMSB9O1xuICAgIGxldCBpID0gbGV2ZWxzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNvbnN0IG8gPSBsZXZlbHNbaV07XG4gICAgICAgIGNvbnN0IG4gPSB1cGRhdGVzW2ldO1xuICAgICAgICBpZiAobikge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbykge1xuICAgICAgICAgICAgICAgIGlmICghKGtleSBpbiBuKSlcbiAgICAgICAgICAgICAgICAgICAgdG9fbnVsbF9vdXRba2V5XSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBuKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhY2NvdW50ZWRfZm9yW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlW2tleV0gPSBuW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGFjY291bnRlZF9mb3Jba2V5XSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV2ZWxzW2ldID0gbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG8pIHtcbiAgICAgICAgICAgICAgICBhY2NvdW50ZWRfZm9yW2tleV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIHRvX251bGxfb3V0KSB7XG4gICAgICAgIGlmICghKGtleSBpbiB1cGRhdGUpKVxuICAgICAgICAgICAgdXBkYXRlW2tleV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB1cGRhdGU7XG59XG5mdW5jdGlvbiBnZXRfc3ByZWFkX29iamVjdChzcHJlYWRfcHJvcHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHNwcmVhZF9wcm9wcyA9PT0gJ29iamVjdCcgJiYgc3ByZWFkX3Byb3BzICE9PSBudWxsID8gc3ByZWFkX3Byb3BzIDoge307XG59XG5cbi8vIHNvdXJjZTogaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5kaWNlcy5odG1sXG5jb25zdCBib29sZWFuX2F0dHJpYnV0ZXMgPSBuZXcgU2V0KFtcbiAgICAnYWxsb3dmdWxsc2NyZWVuJyxcbiAgICAnYWxsb3dwYXltZW50cmVxdWVzdCcsXG4gICAgJ2FzeW5jJyxcbiAgICAnYXV0b2ZvY3VzJyxcbiAgICAnYXV0b3BsYXknLFxuICAgICdjaGVja2VkJyxcbiAgICAnY29udHJvbHMnLFxuICAgICdkZWZhdWx0JyxcbiAgICAnZGVmZXInLFxuICAgICdkaXNhYmxlZCcsXG4gICAgJ2Zvcm1ub3ZhbGlkYXRlJyxcbiAgICAnaGlkZGVuJyxcbiAgICAnaXNtYXAnLFxuICAgICdsb29wJyxcbiAgICAnbXVsdGlwbGUnLFxuICAgICdtdXRlZCcsXG4gICAgJ25vbW9kdWxlJyxcbiAgICAnbm92YWxpZGF0ZScsXG4gICAgJ29wZW4nLFxuICAgICdwbGF5c2lubGluZScsXG4gICAgJ3JlYWRvbmx5JyxcbiAgICAncmVxdWlyZWQnLFxuICAgICdyZXZlcnNlZCcsXG4gICAgJ3NlbGVjdGVkJ1xuXSk7XG5cbmNvbnN0IGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyID0gL1tcXHMnXCI+Lz1cXHV7RkREMH0tXFx1e0ZERUZ9XFx1e0ZGRkV9XFx1e0ZGRkZ9XFx1ezFGRkZFfVxcdXsxRkZGRn1cXHV7MkZGRkV9XFx1ezJGRkZGfVxcdXszRkZGRX1cXHV7M0ZGRkZ9XFx1ezRGRkZFfVxcdXs0RkZGRn1cXHV7NUZGRkV9XFx1ezVGRkZGfVxcdXs2RkZGRX1cXHV7NkZGRkZ9XFx1ezdGRkZFfVxcdXs3RkZGRn1cXHV7OEZGRkV9XFx1ezhGRkZGfVxcdXs5RkZGRX1cXHV7OUZGRkZ9XFx1e0FGRkZFfVxcdXtBRkZGRn1cXHV7QkZGRkV9XFx1e0JGRkZGfVxcdXtDRkZGRX1cXHV7Q0ZGRkZ9XFx1e0RGRkZFfVxcdXtERkZGRn1cXHV7RUZGRkV9XFx1e0VGRkZGfVxcdXtGRkZGRX1cXHV7RkZGRkZ9XFx1ezEwRkZGRX1cXHV7MTBGRkZGfV0vdTtcbi8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2F0dHJpYnV0ZXMtMlxuLy8gaHR0cHM6Ly9pbmZyYS5zcGVjLndoYXR3Zy5vcmcvI25vbmNoYXJhY3RlclxuZnVuY3Rpb24gc3ByZWFkKGFyZ3MsIGNsYXNzZXNfdG9fYWRkKSB7XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sIC4uLmFyZ3MpO1xuICAgIGlmIChjbGFzc2VzX3RvX2FkZCkge1xuICAgICAgICBpZiAoYXR0cmlidXRlcy5jbGFzcyA9PSBudWxsKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzLmNsYXNzID0gY2xhc3Nlc190b19hZGQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzLmNsYXNzICs9ICcgJyArIGNsYXNzZXNfdG9fYWRkO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBzdHIgPSAnJztcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICBpZiAoaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIudGVzdChuYW1lKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBhdHRyaWJ1dGVzW25hbWVdO1xuICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpXG4gICAgICAgICAgICBzdHIgKz0gXCIgXCIgKyBuYW1lO1xuICAgICAgICBlbHNlIGlmIChib29sZWFuX2F0dHJpYnV0ZXMuaGFzKG5hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSlcbiAgICAgICAgICAgICAgICBzdHIgKz0gXCIgXCIgKyBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0ciArPSBgICR7bmFtZX09XCIke1N0cmluZyh2YWx1ZSkucmVwbGFjZSgvXCIvZywgJyYjMzQ7JykucmVwbGFjZSgvJy9nLCAnJiMzOTsnKX1cImA7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc3RyO1xufVxuY29uc3QgZXNjYXBlZCA9IHtcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjMzk7JyxcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0Oydcbn07XG5mdW5jdGlvbiBlc2NhcGUoaHRtbCkge1xuICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvW1wiJyY8Pl0vZywgbWF0Y2ggPT4gZXNjYXBlZFttYXRjaF0pO1xufVxuZnVuY3Rpb24gZWFjaChpdGVtcywgZm4pIHtcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBzdHIgKz0gZm4oaXRlbXNbaV0sIGkpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuY29uc3QgbWlzc2luZ19jb21wb25lbnQgPSB7XG4gICAgJCRyZW5kZXI6ICgpID0+ICcnXG59O1xuZnVuY3Rpb24gdmFsaWRhdGVfY29tcG9uZW50KGNvbXBvbmVudCwgbmFtZSkge1xuICAgIGlmICghY29tcG9uZW50IHx8ICFjb21wb25lbnQuJCRyZW5kZXIpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09ICdzdmVsdGU6Y29tcG9uZW50JylcbiAgICAgICAgICAgIG5hbWUgKz0gJyB0aGlzPXsuLi59JztcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGA8JHtuYW1lfT4gaXMgbm90IGEgdmFsaWQgU1NSIGNvbXBvbmVudC4gWW91IG1heSBuZWVkIHRvIHJldmlldyB5b3VyIGJ1aWxkIGNvbmZpZyB0byBlbnN1cmUgdGhhdCBkZXBlbmRlbmNpZXMgYXJlIGNvbXBpbGVkLCByYXRoZXIgdGhhbiBpbXBvcnRlZCBhcyBwcmUtY29tcGlsZWQgbW9kdWxlc2ApO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50O1xufVxuZnVuY3Rpb24gZGVidWcoZmlsZSwgbGluZSwgY29sdW1uLCB2YWx1ZXMpIHtcbiAgICBjb25zb2xlLmxvZyhge0BkZWJ1Z30gJHtmaWxlID8gZmlsZSArICcgJyA6ICcnfSgke2xpbmV9OiR7Y29sdW1ufSlgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2codmFsdWVzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgcmV0dXJuICcnO1xufVxubGV0IG9uX2Rlc3Ryb3k7XG5mdW5jdGlvbiBjcmVhdGVfc3NyX2NvbXBvbmVudChmbikge1xuICAgIGZ1bmN0aW9uICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cykge1xuICAgICAgICBjb25zdCBwYXJlbnRfY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgICAgIGNvbnN0ICQkID0ge1xuICAgICAgICAgICAgb25fZGVzdHJveSxcbiAgICAgICAgICAgIGNvbnRleHQ6IG5ldyBNYXAocGFyZW50X2NvbXBvbmVudCA/IHBhcmVudF9jb21wb25lbnQuJCQuY29udGV4dCA6IFtdKSxcbiAgICAgICAgICAgIC8vIHRoZXNlIHdpbGwgYmUgaW1tZWRpYXRlbHkgZGlzY2FyZGVkXG4gICAgICAgICAgICBvbl9tb3VudDogW10sXG4gICAgICAgICAgICBiZWZvcmVfdXBkYXRlOiBbXSxcbiAgICAgICAgICAgIGFmdGVyX3VwZGF0ZTogW10sXG4gICAgICAgICAgICBjYWxsYmFja3M6IGJsYW5rX29iamVjdCgpXG4gICAgICAgIH07XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudCh7ICQkIH0pO1xuICAgICAgICBjb25zdCBodG1sID0gZm4ocmVzdWx0LCBwcm9wcywgYmluZGluZ3MsIHNsb3RzKTtcbiAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xuICAgICAgICByZXR1cm4gaHRtbDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVuZGVyOiAocHJvcHMgPSB7fSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgICAgICAgICBvbl9kZXN0cm95ID0gW107XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7IHRpdGxlOiAnJywgaGVhZDogJycsIGNzczogbmV3IFNldCgpIH07XG4gICAgICAgICAgICBjb25zdCBodG1sID0gJCRyZW5kZXIocmVzdWx0LCBwcm9wcywge30sIG9wdGlvbnMpO1xuICAgICAgICAgICAgcnVuX2FsbChvbl9kZXN0cm95KTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaHRtbCxcbiAgICAgICAgICAgICAgICBjc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgY29kZTogQXJyYXkuZnJvbShyZXN1bHQuY3NzKS5tYXAoY3NzID0+IGNzcy5jb2RlKS5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgbWFwOiBudWxsIC8vIFRPRE9cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhlYWQ6IHJlc3VsdC50aXRsZSArIHJlc3VsdC5oZWFkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICAkJHJlbmRlclxuICAgIH07XG59XG5mdW5jdGlvbiBhZGRfYXR0cmlidXRlKG5hbWUsIHZhbHVlLCBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwgfHwgKGJvb2xlYW4gJiYgIXZhbHVlKSlcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIHJldHVybiBgICR7bmFtZX0ke3ZhbHVlID09PSB0cnVlID8gJycgOiBgPSR7dHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IEpTT04uc3RyaW5naWZ5KGVzY2FwZSh2YWx1ZSkpIDogYFwiJHt2YWx1ZX1cImB9YH1gO1xufVxuZnVuY3Rpb24gYWRkX2NsYXNzZXMoY2xhc3Nlcykge1xuICAgIHJldHVybiBjbGFzc2VzID8gYCBjbGFzcz1cIiR7Y2xhc3Nlc31cImAgOiBgYDtcbn1cblxuZnVuY3Rpb24gYmluZChjb21wb25lbnQsIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgaW5kZXggPSBjb21wb25lbnQuJCQucHJvcHNbbmFtZV07XG4gICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29tcG9uZW50LiQkLmJvdW5kW2luZGV4XSA9IGNhbGxiYWNrO1xuICAgICAgICBjYWxsYmFjayhjb21wb25lbnQuJCQuY3R4W2luZGV4XSk7XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlX2NvbXBvbmVudChibG9jaykge1xuICAgIGJsb2NrICYmIGJsb2NrLmMoKTtcbn1cbmZ1bmN0aW9uIGNsYWltX2NvbXBvbmVudChibG9jaywgcGFyZW50X25vZGVzKSB7XG4gICAgYmxvY2sgJiYgYmxvY2subChwYXJlbnRfbm9kZXMpO1xufVxuZnVuY3Rpb24gbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgdGFyZ2V0LCBhbmNob3IpIHtcbiAgICBjb25zdCB7IGZyYWdtZW50LCBvbl9tb3VudCwgb25fZGVzdHJveSwgYWZ0ZXJfdXBkYXRlIH0gPSBjb21wb25lbnQuJCQ7XG4gICAgZnJhZ21lbnQgJiYgZnJhZ21lbnQubSh0YXJnZXQsIGFuY2hvcik7XG4gICAgLy8gb25Nb3VudCBoYXBwZW5zIGJlZm9yZSB0aGUgaW5pdGlhbCBhZnRlclVwZGF0ZVxuICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdfb25fZGVzdHJveSA9IG9uX21vdW50Lm1hcChydW4pLmZpbHRlcihpc19mdW5jdGlvbik7XG4gICAgICAgIGlmIChvbl9kZXN0cm95KSB7XG4gICAgICAgICAgICBvbl9kZXN0cm95LnB1c2goLi4ubmV3X29uX2Rlc3Ryb3kpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gRWRnZSBjYXNlIC0gY29tcG9uZW50IHdhcyBkZXN0cm95ZWQgaW1tZWRpYXRlbHksXG4gICAgICAgICAgICAvLyBtb3N0IGxpa2VseSBhcyBhIHJlc3VsdCBvZiBhIGJpbmRpbmcgaW5pdGlhbGlzaW5nXG4gICAgICAgICAgICBydW5fYWxsKG5ld19vbl9kZXN0cm95KTtcbiAgICAgICAgfVxuICAgICAgICBjb21wb25lbnQuJCQub25fbW91bnQgPSBbXTtcbiAgICB9KTtcbiAgICBhZnRlcl91cGRhdGUuZm9yRWFjaChhZGRfcmVuZGVyX2NhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIGRlc3Ryb3lfY29tcG9uZW50KGNvbXBvbmVudCwgZGV0YWNoaW5nKSB7XG4gICAgY29uc3QgJCQgPSBjb21wb25lbnQuJCQ7XG4gICAgaWYgKCQkLmZyYWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHJ1bl9hbGwoJCQub25fZGVzdHJveSk7XG4gICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LmQoZGV0YWNoaW5nKTtcbiAgICAgICAgLy8gVE9ETyBudWxsIG91dCBvdGhlciByZWZzLCBpbmNsdWRpbmcgY29tcG9uZW50LiQkIChidXQgbmVlZCB0b1xuICAgICAgICAvLyBwcmVzZXJ2ZSBmaW5hbCBzdGF0ZT8pXG4gICAgICAgICQkLm9uX2Rlc3Ryb3kgPSAkJC5mcmFnbWVudCA9IG51bGw7XG4gICAgICAgICQkLmN0eCA9IFtdO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG1ha2VfZGlydHkoY29tcG9uZW50LCBpKSB7XG4gICAgaWYgKGNvbXBvbmVudC4kJC5kaXJ0eVswXSA9PT0gLTEpIHtcbiAgICAgICAgZGlydHlfY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG4gICAgICAgIHNjaGVkdWxlX3VwZGF0ZSgpO1xuICAgICAgICBjb21wb25lbnQuJCQuZGlydHkuZmlsbCgwKTtcbiAgICB9XG4gICAgY29tcG9uZW50LiQkLmRpcnR5WyhpIC8gMzEpIHwgMF0gfD0gKDEgPDwgKGkgJSAzMSkpO1xufVxuZnVuY3Rpb24gaW5pdChjb21wb25lbnQsIG9wdGlvbnMsIGluc3RhbmNlLCBjcmVhdGVfZnJhZ21lbnQsIG5vdF9lcXVhbCwgcHJvcHMsIGRpcnR5ID0gWy0xXSkge1xuICAgIGNvbnN0IHBhcmVudF9jb21wb25lbnQgPSBjdXJyZW50X2NvbXBvbmVudDtcbiAgICBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KTtcbiAgICBjb25zdCBwcm9wX3ZhbHVlcyA9IG9wdGlvbnMucHJvcHMgfHwge307XG4gICAgY29uc3QgJCQgPSBjb21wb25lbnQuJCQgPSB7XG4gICAgICAgIGZyYWdtZW50OiBudWxsLFxuICAgICAgICBjdHg6IG51bGwsXG4gICAgICAgIC8vIHN0YXRlXG4gICAgICAgIHByb3BzLFxuICAgICAgICB1cGRhdGU6IG5vb3AsXG4gICAgICAgIG5vdF9lcXVhbCxcbiAgICAgICAgYm91bmQ6IGJsYW5rX29iamVjdCgpLFxuICAgICAgICAvLyBsaWZlY3ljbGVcbiAgICAgICAgb25fbW91bnQ6IFtdLFxuICAgICAgICBvbl9kZXN0cm95OiBbXSxcbiAgICAgICAgYmVmb3JlX3VwZGF0ZTogW10sXG4gICAgICAgIGFmdGVyX3VwZGF0ZTogW10sXG4gICAgICAgIGNvbnRleHQ6IG5ldyBNYXAocGFyZW50X2NvbXBvbmVudCA/IHBhcmVudF9jb21wb25lbnQuJCQuY29udGV4dCA6IFtdKSxcbiAgICAgICAgLy8gZXZlcnl0aGluZyBlbHNlXG4gICAgICAgIGNhbGxiYWNrczogYmxhbmtfb2JqZWN0KCksXG4gICAgICAgIGRpcnR5XG4gICAgfTtcbiAgICBsZXQgcmVhZHkgPSBmYWxzZTtcbiAgICAkJC5jdHggPSBpbnN0YW5jZVxuICAgICAgICA/IGluc3RhbmNlKGNvbXBvbmVudCwgcHJvcF92YWx1ZXMsIChpLCByZXQsIC4uLnJlc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcmVzdC5sZW5ndGggPyByZXN0WzBdIDogcmV0O1xuICAgICAgICAgICAgaWYgKCQkLmN0eCAmJiBub3RfZXF1YWwoJCQuY3R4W2ldLCAkJC5jdHhbaV0gPSB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCQuYm91bmRbaV0pXG4gICAgICAgICAgICAgICAgICAgICQkLmJvdW5kW2ldKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVhZHkpXG4gICAgICAgICAgICAgICAgICAgIG1ha2VfZGlydHkoY29tcG9uZW50LCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH0pXG4gICAgICAgIDogW107XG4gICAgJCQudXBkYXRlKCk7XG4gICAgcmVhZHkgPSB0cnVlO1xuICAgIHJ1bl9hbGwoJCQuYmVmb3JlX3VwZGF0ZSk7XG4gICAgLy8gYGZhbHNlYCBhcyBhIHNwZWNpYWwgY2FzZSBvZiBubyBET00gY29tcG9uZW50XG4gICAgJCQuZnJhZ21lbnQgPSBjcmVhdGVfZnJhZ21lbnQgPyBjcmVhdGVfZnJhZ21lbnQoJCQuY3R4KSA6IGZhbHNlO1xuICAgIGlmIChvcHRpb25zLnRhcmdldCkge1xuICAgICAgICBpZiAob3B0aW9ucy5oeWRyYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlcyA9IGNoaWxkcmVuKG9wdGlvbnMudGFyZ2V0KTtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICAkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5sKG5vZGVzKTtcbiAgICAgICAgICAgIG5vZGVzLmZvckVhY2goZGV0YWNoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICAkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuaW50cm8pXG4gICAgICAgICAgICB0cmFuc2l0aW9uX2luKGNvbXBvbmVudC4kJC5mcmFnbWVudCk7XG4gICAgICAgIG1vdW50X2NvbXBvbmVudChjb21wb25lbnQsIG9wdGlvbnMudGFyZ2V0LCBvcHRpb25zLmFuY2hvcik7XG4gICAgICAgIGZsdXNoKCk7XG4gICAgfVxuICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChwYXJlbnRfY29tcG9uZW50KTtcbn1cbmxldCBTdmVsdGVFbGVtZW50O1xuaWYgKHR5cGVvZiBIVE1MRWxlbWVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFN2ZWx0ZUVsZW1lbnQgPSBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy4kJC5zbG90dGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBpbXByb3ZlIHR5cGluZ3NcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMuJCQuc2xvdHRlZFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0ciwgX29sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpc1thdHRyXSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgICRkZXN0cm95KCkge1xuICAgICAgICAgICAgZGVzdHJveV9jb21wb25lbnQodGhpcywgMSk7XG4gICAgICAgICAgICB0aGlzLiRkZXN0cm95ID0gbm9vcDtcbiAgICAgICAgfVxuICAgICAgICAkb24odHlwZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIC8vIFRPRE8gc2hvdWxkIHRoaXMgZGVsZWdhdGUgdG8gYWRkRXZlbnRMaXN0ZW5lcj9cbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSB8fCAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gPSBbXSkpO1xuICAgICAgICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgJHNldCgpIHtcbiAgICAgICAgICAgIC8vIG92ZXJyaWRkZW4gYnkgaW5zdGFuY2UsIGlmIGl0IGhhcyBwcm9wc1xuICAgICAgICB9XG4gICAgfTtcbn1cbmNsYXNzIFN2ZWx0ZUNvbXBvbmVudCB7XG4gICAgJGRlc3Ryb3koKSB7XG4gICAgICAgIGRlc3Ryb3lfY29tcG9uZW50KHRoaXMsIDEpO1xuICAgICAgICB0aGlzLiRkZXN0cm95ID0gbm9vcDtcbiAgICB9XG4gICAgJG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSB8fCAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gPSBbXSkpO1xuICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgICRzZXQoKSB7XG4gICAgICAgIC8vIG92ZXJyaWRkZW4gYnkgaW5zdGFuY2UsIGlmIGl0IGhhcyBwcm9wc1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hfZGV2KHR5cGUsIGRldGFpbCkge1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY3VzdG9tX2V2ZW50KHR5cGUsIE9iamVjdC5hc3NpZ24oeyB2ZXJzaW9uOiAnMy4yMy4yJyB9LCBkZXRhaWwpKSk7XG59XG5mdW5jdGlvbiBhcHBlbmRfZGV2KHRhcmdldCwgbm9kZSkge1xuICAgIGRpc3BhdGNoX2RldihcIlN2ZWx0ZURPTUluc2VydFwiLCB7IHRhcmdldCwgbm9kZSB9KTtcbiAgICBhcHBlbmQodGFyZ2V0LCBub2RlKTtcbn1cbmZ1bmN0aW9uIGluc2VydF9kZXYodGFyZ2V0LCBub2RlLCBhbmNob3IpIHtcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01JbnNlcnRcIiwgeyB0YXJnZXQsIG5vZGUsIGFuY2hvciB9KTtcbiAgICBpbnNlcnQodGFyZ2V0LCBub2RlLCBhbmNob3IpO1xufVxuZnVuY3Rpb24gZGV0YWNoX2Rldihub2RlKSB7XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NUmVtb3ZlXCIsIHsgbm9kZSB9KTtcbiAgICBkZXRhY2gobm9kZSk7XG59XG5mdW5jdGlvbiBkZXRhY2hfYmV0d2Vlbl9kZXYoYmVmb3JlLCBhZnRlcikge1xuICAgIHdoaWxlIChiZWZvcmUubmV4dFNpYmxpbmcgJiYgYmVmb3JlLm5leHRTaWJsaW5nICE9PSBhZnRlcikge1xuICAgICAgICBkZXRhY2hfZGV2KGJlZm9yZS5uZXh0U2libGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZGV0YWNoX2JlZm9yZV9kZXYoYWZ0ZXIpIHtcbiAgICB3aGlsZSAoYWZ0ZXIucHJldmlvdXNTaWJsaW5nKSB7XG4gICAgICAgIGRldGFjaF9kZXYoYWZ0ZXIucHJldmlvdXNTaWJsaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXRhY2hfYWZ0ZXJfZGV2KGJlZm9yZSkge1xuICAgIHdoaWxlIChiZWZvcmUubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgZGV0YWNoX2RldihiZWZvcmUubmV4dFNpYmxpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGxpc3Rlbl9kZXYobm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMsIGhhc19wcmV2ZW50X2RlZmF1bHQsIGhhc19zdG9wX3Byb3BhZ2F0aW9uKSB7XG4gICAgY29uc3QgbW9kaWZpZXJzID0gb3B0aW9ucyA9PT0gdHJ1ZSA/IFtcImNhcHR1cmVcIl0gOiBvcHRpb25zID8gQXJyYXkuZnJvbShPYmplY3Qua2V5cyhvcHRpb25zKSkgOiBbXTtcbiAgICBpZiAoaGFzX3ByZXZlbnRfZGVmYXVsdClcbiAgICAgICAgbW9kaWZpZXJzLnB1c2goJ3ByZXZlbnREZWZhdWx0Jyk7XG4gICAgaWYgKGhhc19zdG9wX3Byb3BhZ2F0aW9uKVxuICAgICAgICBtb2RpZmllcnMucHVzaCgnc3RvcFByb3BhZ2F0aW9uJyk7XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NQWRkRXZlbnRMaXN0ZW5lclwiLCB7IG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBtb2RpZmllcnMgfSk7XG4gICAgY29uc3QgZGlzcG9zZSA9IGxpc3Rlbihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NUmVtb3ZlRXZlbnRMaXN0ZW5lclwiLCB7IG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBtb2RpZmllcnMgfSk7XG4gICAgICAgIGRpc3Bvc2UoKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gYXR0cl9kZXYobm9kZSwgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgIGF0dHIobm9kZSwgYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgIGRpc3BhdGNoX2RldihcIlN2ZWx0ZURPTVJlbW92ZUF0dHJpYnV0ZVwiLCB7IG5vZGUsIGF0dHJpYnV0ZSB9KTtcbiAgICBlbHNlXG4gICAgICAgIGRpc3BhdGNoX2RldihcIlN2ZWx0ZURPTVNldEF0dHJpYnV0ZVwiLCB7IG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBwcm9wX2Rldihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBub2RlW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIGRpc3BhdGNoX2RldihcIlN2ZWx0ZURPTVNldFByb3BlcnR5XCIsIHsgbm9kZSwgcHJvcGVydHksIHZhbHVlIH0pO1xufVxuZnVuY3Rpb24gZGF0YXNldF9kZXYobm9kZSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgbm9kZS5kYXRhc2V0W3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIGRpc3BhdGNoX2RldihcIlN2ZWx0ZURPTVNldERhdGFzZXRcIiwgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBzZXRfZGF0YV9kZXYodGV4dCwgZGF0YSkge1xuICAgIGRhdGEgPSAnJyArIGRhdGE7XG4gICAgaWYgKHRleHQuZGF0YSA9PT0gZGF0YSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGRpc3BhdGNoX2RldihcIlN2ZWx0ZURPTVNldERhdGFcIiwgeyBub2RlOiB0ZXh0LCBkYXRhIH0pO1xuICAgIHRleHQuZGF0YSA9IGRhdGE7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9lYWNoX2FyZ3VtZW50KGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnc3RyaW5nJyAmJiAhKGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiAnbGVuZ3RoJyBpbiBhcmcpKSB7XG4gICAgICAgIGxldCBtc2cgPSAneyNlYWNofSBvbmx5IGl0ZXJhdGVzIG92ZXIgYXJyYXktbGlrZSBvYmplY3RzLic7XG4gICAgICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIGFyZyAmJiBTeW1ib2wuaXRlcmF0b3IgaW4gYXJnKSB7XG4gICAgICAgICAgICBtc2cgKz0gJyBZb3UgY2FuIHVzZSBhIHNwcmVhZCB0byBjb252ZXJ0IHRoaXMgaXRlcmFibGUgaW50byBhbiBhcnJheS4nO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX3Nsb3RzKG5hbWUsIHNsb3QsIGtleXMpIHtcbiAgICBmb3IgKGNvbnN0IHNsb3Rfa2V5IG9mIE9iamVjdC5rZXlzKHNsb3QpKSB7XG4gICAgICAgIGlmICghfmtleXMuaW5kZXhPZihzbG90X2tleSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgPCR7bmFtZX0+IHJlY2VpdmVkIGFuIHVuZXhwZWN0ZWQgc2xvdCBcIiR7c2xvdF9rZXl9XCIuYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5jbGFzcyBTdmVsdGVDb21wb25lbnREZXYgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zIHx8ICghb3B0aW9ucy50YXJnZXQgJiYgIW9wdGlvbnMuJCRpbmxpbmUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCd0YXJnZXQnIGlzIGEgcmVxdWlyZWQgb3B0aW9uYCk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG4gICAgJGRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLiRkZXN0cm95KCk7XG4gICAgICAgIHRoaXMuJGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYENvbXBvbmVudCB3YXMgYWxyZWFkeSBkZXN0cm95ZWRgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIH07XG4gICAgfVxuICAgICRjYXB0dXJlX3N0YXRlKCkgeyB9XG4gICAgJGluamVjdF9zdGF0ZSgpIHsgfVxufVxuZnVuY3Rpb24gbG9vcF9ndWFyZCh0aW1lb3V0KSB7XG4gICAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChEYXRlLm5vdygpIC0gc3RhcnQgPiB0aW1lb3V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEluZmluaXRlIGxvb3AgZGV0ZWN0ZWRgKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCB7IEh0bWxUYWcsIFN2ZWx0ZUNvbXBvbmVudCwgU3ZlbHRlQ29tcG9uZW50RGV2LCBTdmVsdGVFbGVtZW50LCBhY3Rpb25fZGVzdHJveWVyLCBhZGRfYXR0cmlidXRlLCBhZGRfY2xhc3NlcywgYWRkX2ZsdXNoX2NhbGxiYWNrLCBhZGRfbG9jYXRpb24sIGFkZF9yZW5kZXJfY2FsbGJhY2ssIGFkZF9yZXNpemVfbGlzdGVuZXIsIGFkZF90cmFuc2Zvcm0sIGFmdGVyVXBkYXRlLCBhcHBlbmQsIGFwcGVuZF9kZXYsIGFzc2lnbiwgYXR0ciwgYXR0cl9kZXYsIGJlZm9yZVVwZGF0ZSwgYmluZCwgYmluZGluZ19jYWxsYmFja3MsIGJsYW5rX29iamVjdCwgYnViYmxlLCBjaGVja19vdXRyb3MsIGNoaWxkcmVuLCBjbGFpbV9jb21wb25lbnQsIGNsYWltX2VsZW1lbnQsIGNsYWltX3NwYWNlLCBjbGFpbV90ZXh0LCBjbGVhcl9sb29wcywgY29tcG9uZW50X3N1YnNjcmliZSwgY29tcHV0ZV9yZXN0X3Byb3BzLCBjcmVhdGVFdmVudERpc3BhdGNoZXIsIGNyZWF0ZV9hbmltYXRpb24sIGNyZWF0ZV9iaWRpcmVjdGlvbmFsX3RyYW5zaXRpb24sIGNyZWF0ZV9jb21wb25lbnQsIGNyZWF0ZV9pbl90cmFuc2l0aW9uLCBjcmVhdGVfb3V0X3RyYW5zaXRpb24sIGNyZWF0ZV9zbG90LCBjcmVhdGVfc3NyX2NvbXBvbmVudCwgY3VycmVudF9jb21wb25lbnQsIGN1c3RvbV9ldmVudCwgZGF0YXNldF9kZXYsIGRlYnVnLCBkZXN0cm95X2Jsb2NrLCBkZXN0cm95X2NvbXBvbmVudCwgZGVzdHJveV9lYWNoLCBkZXRhY2gsIGRldGFjaF9hZnRlcl9kZXYsIGRldGFjaF9iZWZvcmVfZGV2LCBkZXRhY2hfYmV0d2Vlbl9kZXYsIGRldGFjaF9kZXYsIGRpcnR5X2NvbXBvbmVudHMsIGRpc3BhdGNoX2RldiwgZWFjaCwgZWxlbWVudCwgZWxlbWVudF9pcywgZW1wdHksIGVzY2FwZSwgZXNjYXBlZCwgZXhjbHVkZV9pbnRlcm5hbF9wcm9wcywgZml4X2FuZF9kZXN0cm95X2Jsb2NrLCBmaXhfYW5kX291dHJvX2FuZF9kZXN0cm95X2Jsb2NrLCBmaXhfcG9zaXRpb24sIGZsdXNoLCBnZXRDb250ZXh0LCBnZXRfYmluZGluZ19ncm91cF92YWx1ZSwgZ2V0X2N1cnJlbnRfY29tcG9uZW50LCBnZXRfc2xvdF9jaGFuZ2VzLCBnZXRfc2xvdF9jb250ZXh0LCBnZXRfc3ByZWFkX29iamVjdCwgZ2V0X3NwcmVhZF91cGRhdGUsIGdldF9zdG9yZV92YWx1ZSwgZ2xvYmFscywgZ3JvdXBfb3V0cm9zLCBoYW5kbGVfcHJvbWlzZSwgaGFzX3Byb3AsIGlkZW50aXR5LCBpbml0LCBpbnNlcnQsIGluc2VydF9kZXYsIGludHJvcywgaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIsIGlzX2NsaWVudCwgaXNfY3Jvc3NvcmlnaW4sIGlzX2Z1bmN0aW9uLCBpc19wcm9taXNlLCBsaXN0ZW4sIGxpc3Rlbl9kZXYsIGxvb3AsIGxvb3BfZ3VhcmQsIG1pc3NpbmdfY29tcG9uZW50LCBtb3VudF9jb21wb25lbnQsIG5vb3AsIG5vdF9lcXVhbCwgbm93LCBudWxsX3RvX2VtcHR5LCBvYmplY3Rfd2l0aG91dF9wcm9wZXJ0aWVzLCBvbkRlc3Ryb3ksIG9uTW91bnQsIG9uY2UsIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrLCBwcmV2ZW50X2RlZmF1bHQsIHByb3BfZGV2LCBxdWVyeV9zZWxlY3Rvcl9hbGwsIHJhZiwgcnVuLCBydW5fYWxsLCBzYWZlX25vdF9lcXVhbCwgc2NoZWR1bGVfdXBkYXRlLCBzZWxlY3RfbXVsdGlwbGVfdmFsdWUsIHNlbGVjdF9vcHRpb24sIHNlbGVjdF9vcHRpb25zLCBzZWxlY3RfdmFsdWUsIHNlbGYsIHNldENvbnRleHQsIHNldF9hdHRyaWJ1dGVzLCBzZXRfY3VycmVudF9jb21wb25lbnQsIHNldF9jdXN0b21fZWxlbWVudF9kYXRhLCBzZXRfZGF0YSwgc2V0X2RhdGFfZGV2LCBzZXRfaW5wdXRfdHlwZSwgc2V0X2lucHV0X3ZhbHVlLCBzZXRfbm93LCBzZXRfcmFmLCBzZXRfc3RvcmVfdmFsdWUsIHNldF9zdHlsZSwgc2V0X3N2Z19hdHRyaWJ1dGVzLCBzcGFjZSwgc3ByZWFkLCBzdG9wX3Byb3BhZ2F0aW9uLCBzdWJzY3JpYmUsIHN2Z19lbGVtZW50LCB0ZXh0LCB0aWNrLCB0aW1lX3Jhbmdlc190b19hcnJheSwgdG9fbnVtYmVyLCB0b2dnbGVfY2xhc3MsIHRyYW5zaXRpb25faW4sIHRyYW5zaXRpb25fb3V0LCB1cGRhdGVfa2V5ZWRfZWFjaCwgdXBkYXRlX3Nsb3QsIHZhbGlkYXRlX2NvbXBvbmVudCwgdmFsaWRhdGVfZWFjaF9hcmd1bWVudCwgdmFsaWRhdGVfZWFjaF9rZXlzLCB2YWxpZGF0ZV9zbG90cywgdmFsaWRhdGVfc3RvcmUsIHhsaW5rX2F0dHIgfTtcbiIsImltcG9ydCB7IG5vb3AsIHNhZmVfbm90X2VxdWFsLCBzdWJzY3JpYmUsIHJ1bl9hbGwsIGlzX2Z1bmN0aW9uIH0gZnJvbSAnLi4vaW50ZXJuYWwnO1xuZXhwb3J0IHsgZ2V0X3N0b3JlX3ZhbHVlIGFzIGdldCB9IGZyb20gJy4uL2ludGVybmFsJztcblxuY29uc3Qgc3Vic2NyaWJlcl9xdWV1ZSA9IFtdO1xuLyoqXG4gKiBDcmVhdGVzIGEgYFJlYWRhYmxlYCBzdG9yZSB0aGF0IGFsbG93cyByZWFkaW5nIGJ5IHN1YnNjcmlwdGlvbi5cbiAqIEBwYXJhbSB2YWx1ZSBpbml0aWFsIHZhbHVlXG4gKiBAcGFyYW0ge1N0YXJ0U3RvcE5vdGlmaWVyfXN0YXJ0IHN0YXJ0IGFuZCBzdG9wIG5vdGlmaWNhdGlvbnMgZm9yIHN1YnNjcmlwdGlvbnNcbiAqL1xuZnVuY3Rpb24gcmVhZGFibGUodmFsdWUsIHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiB3cml0YWJsZSh2YWx1ZSwgc3RhcnQpLnN1YnNjcmliZSxcbiAgICB9O1xufVxuLyoqXG4gKiBDcmVhdGUgYSBgV3JpdGFibGVgIHN0b3JlIHRoYXQgYWxsb3dzIGJvdGggdXBkYXRpbmcgYW5kIHJlYWRpbmcgYnkgc3Vic2NyaXB0aW9uLlxuICogQHBhcmFtIHsqPX12YWx1ZSBpbml0aWFsIHZhbHVlXG4gKiBAcGFyYW0ge1N0YXJ0U3RvcE5vdGlmaWVyPX1zdGFydCBzdGFydCBhbmQgc3RvcCBub3RpZmljYXRpb25zIGZvciBzdWJzY3JpcHRpb25zXG4gKi9cbmZ1bmN0aW9uIHdyaXRhYmxlKHZhbHVlLCBzdGFydCA9IG5vb3ApIHtcbiAgICBsZXQgc3RvcDtcbiAgICBjb25zdCBzdWJzY3JpYmVycyA9IFtdO1xuICAgIGZ1bmN0aW9uIHNldChuZXdfdmFsdWUpIHtcbiAgICAgICAgaWYgKHNhZmVfbm90X2VxdWFsKHZhbHVlLCBuZXdfdmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ld192YWx1ZTtcbiAgICAgICAgICAgIGlmIChzdG9wKSB7IC8vIHN0b3JlIGlzIHJlYWR5XG4gICAgICAgICAgICAgICAgY29uc3QgcnVuX3F1ZXVlID0gIXN1YnNjcmliZXJfcXVldWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcyA9IHN1YnNjcmliZXJzW2ldO1xuICAgICAgICAgICAgICAgICAgICBzWzFdKCk7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWUucHVzaChzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChydW5fcXVldWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlW2ldWzBdKHN1YnNjcmliZXJfcXVldWVbaSArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZShmbikge1xuICAgICAgICBzZXQoZm4odmFsdWUpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3Vic2NyaWJlKHJ1biwgaW52YWxpZGF0ZSA9IG5vb3ApIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaWJlciA9IFtydW4sIGludmFsaWRhdGVdO1xuICAgICAgICBzdWJzY3JpYmVycy5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBzdG9wID0gc3RhcnQoc2V0KSB8fCBub29wO1xuICAgICAgICB9XG4gICAgICAgIHJ1bih2YWx1ZSk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHN1YnNjcmliZXJzLmluZGV4T2Yoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgICAgICAgICAgc3RvcCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7IHNldCwgdXBkYXRlLCBzdWJzY3JpYmUgfTtcbn1cbmZ1bmN0aW9uIGRlcml2ZWQoc3RvcmVzLCBmbiwgaW5pdGlhbF92YWx1ZSkge1xuICAgIGNvbnN0IHNpbmdsZSA9ICFBcnJheS5pc0FycmF5KHN0b3Jlcyk7XG4gICAgY29uc3Qgc3RvcmVzX2FycmF5ID0gc2luZ2xlXG4gICAgICAgID8gW3N0b3Jlc11cbiAgICAgICAgOiBzdG9yZXM7XG4gICAgY29uc3QgYXV0byA9IGZuLmxlbmd0aCA8IDI7XG4gICAgcmV0dXJuIHJlYWRhYmxlKGluaXRpYWxfdmFsdWUsIChzZXQpID0+IHtcbiAgICAgICAgbGV0IGluaXRlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgbGV0IHBlbmRpbmcgPSAwO1xuICAgICAgICBsZXQgY2xlYW51cCA9IG5vb3A7XG4gICAgICAgIGNvbnN0IHN5bmMgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAocGVuZGluZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZuKHNpbmdsZSA/IHZhbHVlc1swXSA6IHZhbHVlcywgc2V0KTtcbiAgICAgICAgICAgIGlmIChhdXRvKSB7XG4gICAgICAgICAgICAgICAgc2V0KHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGVhbnVwID0gaXNfZnVuY3Rpb24ocmVzdWx0KSA/IHJlc3VsdCA6IG5vb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVuc3Vic2NyaWJlcnMgPSBzdG9yZXNfYXJyYXkubWFwKChzdG9yZSwgaSkgPT4gc3Vic2NyaWJlKHN0b3JlLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZhbHVlc1tpXSA9IHZhbHVlO1xuICAgICAgICAgICAgcGVuZGluZyAmPSB+KDEgPDwgaSk7XG4gICAgICAgICAgICBpZiAoaW5pdGVkKSB7XG4gICAgICAgICAgICAgICAgc3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBwZW5kaW5nIHw9ICgxIDw8IGkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGluaXRlZCA9IHRydWU7XG4gICAgICAgIHN5bmMoKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgICAgICBydW5fYWxsKHVuc3Vic2NyaWJlcnMpO1xuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBkZXJpdmVkLCByZWFkYWJsZSwgd3JpdGFibGUgfTtcbiIsImltcG9ydCAqIGFzIHNhcHBlciBmcm9tICdAc2FwcGVyL2FwcCc7XHJcbmltcG9ydCAnY2hvdGEnO1xyXG5zYXBwZXIuc3RhcnQoe1xyXG4gICAgdGFyZ2V0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2FwcGVyJylcclxufSk7XHJcbiIsImltcG9ydCB7IGdldENvbnRleHQgfSBmcm9tICdzdmVsdGUnO1xuaW1wb3J0IHsgQ09OVEVYVF9LRVkgfSBmcm9tICcuL2ludGVybmFsL3NoYXJlZCc7XG5pbXBvcnQgeyB3cml0YWJsZSB9IGZyb20gJ3N2ZWx0ZS9zdG9yZSc7XG5pbXBvcnQgQXBwIGZyb20gJy4vaW50ZXJuYWwvQXBwLnN2ZWx0ZSc7XG5pbXBvcnQgeyBpZ25vcmUsIHJvdXRlcywgcm9vdF9wcmVsb2FkLCBjb21wb25lbnRzLCBFcnJvckNvbXBvbmVudCB9IGZyb20gJy4vaW50ZXJuYWwvbWFuaWZlc3QtY2xpZW50JztcblxuZnVuY3Rpb24gZ290byhocmVmLCBvcHRzID0geyByZXBsYWNlU3RhdGU6IGZhbHNlIH0pIHtcblx0Y29uc3QgdGFyZ2V0ID0gc2VsZWN0X3RhcmdldChuZXcgVVJMKGhyZWYsIGRvY3VtZW50LmJhc2VVUkkpKTtcblxuXHRpZiAodGFyZ2V0KSB7XG5cdFx0X2hpc3Rvcnlbb3B0cy5yZXBsYWNlU3RhdGUgPyAncmVwbGFjZVN0YXRlJyA6ICdwdXNoU3RhdGUnXSh7IGlkOiBjaWQgfSwgJycsIGhyZWYpO1xuXHRcdHJldHVybiBuYXZpZ2F0ZSh0YXJnZXQsIG51bGwpLnRoZW4oKCkgPT4ge30pO1xuXHR9XG5cblx0bG9jYXRpb24uaHJlZiA9IGhyZWY7XG5cdHJldHVybiBuZXcgUHJvbWlzZShmID0+IHt9KTsgLy8gbmV2ZXIgcmVzb2x2ZXNcbn1cblxuLyoqIENhbGxiYWNrIHRvIGluZm9ybSBvZiBhIHZhbHVlIHVwZGF0ZXMuICovXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbmZ1bmN0aW9uIHBhZ2Vfc3RvcmUodmFsdWUpIHtcblx0Y29uc3Qgc3RvcmUgPSB3cml0YWJsZSh2YWx1ZSk7XG5cdGxldCByZWFkeSA9IHRydWU7XG5cblx0ZnVuY3Rpb24gbm90aWZ5KCkge1xuXHRcdHJlYWR5ID0gdHJ1ZTtcblx0XHRzdG9yZS51cGRhdGUodmFsID0+IHZhbCk7XG5cdH1cblxuXHRmdW5jdGlvbiBzZXQobmV3X3ZhbHVlKSB7XG5cdFx0cmVhZHkgPSBmYWxzZTtcblx0XHRzdG9yZS5zZXQobmV3X3ZhbHVlKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHN1YnNjcmliZShydW4pIHtcblx0XHRsZXQgb2xkX3ZhbHVlO1xuXHRcdHJldHVybiBzdG9yZS5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG5cdFx0XHRpZiAob2xkX3ZhbHVlID09PSB1bmRlZmluZWQgfHwgKHJlYWR5ICYmIHZhbHVlICE9PSBvbGRfdmFsdWUpKSB7XG5cdFx0XHRcdHJ1bihvbGRfdmFsdWUgPSB2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4geyBub3RpZnksIHNldCwgc3Vic2NyaWJlIH07XG59XG5cbmNvbnN0IGluaXRpYWxfZGF0YSA9IHR5cGVvZiBfX1NBUFBFUl9fICE9PSAndW5kZWZpbmVkJyAmJiBfX1NBUFBFUl9fO1xuXG5sZXQgcmVhZHkgPSBmYWxzZTtcbmxldCByb290X2NvbXBvbmVudDtcbmxldCBjdXJyZW50X3Rva2VuO1xubGV0IHJvb3RfcHJlbG9hZGVkO1xubGV0IGN1cnJlbnRfYnJhbmNoID0gW107XG5sZXQgY3VycmVudF9xdWVyeSA9ICd7fSc7XG5cbmNvbnN0IHN0b3JlcyA9IHtcblx0cGFnZTogcGFnZV9zdG9yZSh7fSksXG5cdHByZWxvYWRpbmc6IHdyaXRhYmxlKG51bGwpLFxuXHRzZXNzaW9uOiB3cml0YWJsZShpbml0aWFsX2RhdGEgJiYgaW5pdGlhbF9kYXRhLnNlc3Npb24pXG59O1xuXG5sZXQgJHNlc3Npb247XG5sZXQgc2Vzc2lvbl9kaXJ0eTtcblxuc3RvcmVzLnNlc3Npb24uc3Vic2NyaWJlKGFzeW5jIHZhbHVlID0+IHtcblx0JHNlc3Npb24gPSB2YWx1ZTtcblxuXHRpZiAoIXJlYWR5KSByZXR1cm47XG5cdHNlc3Npb25fZGlydHkgPSB0cnVlO1xuXG5cdGNvbnN0IHRhcmdldCA9IHNlbGVjdF90YXJnZXQobmV3IFVSTChsb2NhdGlvbi5ocmVmKSk7XG5cblx0Y29uc3QgdG9rZW4gPSBjdXJyZW50X3Rva2VuID0ge307XG5cdGNvbnN0IHsgcmVkaXJlY3QsIHByb3BzLCBicmFuY2ggfSA9IGF3YWl0IGh5ZHJhdGVfdGFyZ2V0KHRhcmdldCk7XG5cdGlmICh0b2tlbiAhPT0gY3VycmVudF90b2tlbikgcmV0dXJuOyAvLyBhIHNlY29uZGFyeSBuYXZpZ2F0aW9uIGhhcHBlbmVkIHdoaWxlIHdlIHdlcmUgbG9hZGluZ1xuXG5cdGF3YWl0IHJlbmRlcihyZWRpcmVjdCwgYnJhbmNoLCBwcm9wcywgdGFyZ2V0LnBhZ2UpO1xufSk7XG5cbmxldCBwcmVmZXRjaGluZ1xuXG5cbiA9IG51bGw7XG5mdW5jdGlvbiBzZXRfcHJlZmV0Y2hpbmcoaHJlZiwgcHJvbWlzZSkge1xuXHRwcmVmZXRjaGluZyA9IHsgaHJlZiwgcHJvbWlzZSB9O1xufVxuXG5sZXQgdGFyZ2V0O1xuZnVuY3Rpb24gc2V0X3RhcmdldChlbGVtZW50KSB7XG5cdHRhcmdldCA9IGVsZW1lbnQ7XG59XG5cbmxldCB1aWQgPSAxO1xuZnVuY3Rpb24gc2V0X3VpZChuKSB7XG5cdHVpZCA9IG47XG59XG5cbmxldCBjaWQ7XG5mdW5jdGlvbiBzZXRfY2lkKG4pIHtcblx0Y2lkID0gbjtcbn1cblxuY29uc3QgX2hpc3RvcnkgPSB0eXBlb2YgaGlzdG9yeSAhPT0gJ3VuZGVmaW5lZCcgPyBoaXN0b3J5IDoge1xuXHRwdXNoU3RhdGU6IChzdGF0ZSwgdGl0bGUsIGhyZWYpID0+IHt9LFxuXHRyZXBsYWNlU3RhdGU6IChzdGF0ZSwgdGl0bGUsIGhyZWYpID0+IHt9LFxuXHRzY3JvbGxSZXN0b3JhdGlvbjogJydcbn07XG5cbmNvbnN0IHNjcm9sbF9oaXN0b3J5ID0ge307XG5cbmZ1bmN0aW9uIGV4dHJhY3RfcXVlcnkoc2VhcmNoKSB7XG5cdGNvbnN0IHF1ZXJ5ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0aWYgKHNlYXJjaC5sZW5ndGggPiAwKSB7XG5cdFx0c2VhcmNoLnNsaWNlKDEpLnNwbGl0KCcmJykuZm9yRWFjaChzZWFyY2hQYXJhbSA9PiB7XG5cdFx0XHRsZXQgWywga2V5LCB2YWx1ZSA9ICcnXSA9IC8oW149XSopKD86PSguKikpPy8uZXhlYyhkZWNvZGVVUklDb21wb25lbnQoc2VhcmNoUGFyYW0ucmVwbGFjZSgvXFwrL2csICcgJykpKTtcblx0XHRcdGlmICh0eXBlb2YgcXVlcnlba2V5XSA9PT0gJ3N0cmluZycpIHF1ZXJ5W2tleV0gPSBbcXVlcnlba2V5XV07XG5cdFx0XHRpZiAodHlwZW9mIHF1ZXJ5W2tleV0gPT09ICdvYmplY3QnKSAocXVlcnlba2V5XSApLnB1c2godmFsdWUpO1xuXHRcdFx0ZWxzZSBxdWVyeVtrZXldID0gdmFsdWU7XG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIHF1ZXJ5O1xufVxuXG5mdW5jdGlvbiBzZWxlY3RfdGFyZ2V0KHVybCkge1xuXHRpZiAodXJsLm9yaWdpbiAhPT0gbG9jYXRpb24ub3JpZ2luKSByZXR1cm4gbnVsbDtcblx0aWYgKCF1cmwucGF0aG5hbWUuc3RhcnRzV2l0aChpbml0aWFsX2RhdGEuYmFzZVVybCkpIHJldHVybiBudWxsO1xuXG5cdGxldCBwYXRoID0gdXJsLnBhdGhuYW1lLnNsaWNlKGluaXRpYWxfZGF0YS5iYXNlVXJsLmxlbmd0aCk7XG5cblx0aWYgKHBhdGggPT09ICcnKSB7XG5cdFx0cGF0aCA9ICcvJztcblx0fVxuXG5cdC8vIGF2b2lkIGFjY2lkZW50YWwgY2xhc2hlcyBiZXR3ZWVuIHNlcnZlciByb3V0ZXMgYW5kIHBhZ2Ugcm91dGVzXG5cdGlmIChpZ25vcmUuc29tZShwYXR0ZXJuID0+IHBhdHRlcm4udGVzdChwYXRoKSkpIHJldHVybjtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGNvbnN0IHJvdXRlID0gcm91dGVzW2ldO1xuXG5cdFx0Y29uc3QgbWF0Y2ggPSByb3V0ZS5wYXR0ZXJuLmV4ZWMocGF0aCk7XG5cblx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdGNvbnN0IHF1ZXJ5ID0gZXh0cmFjdF9xdWVyeSh1cmwuc2VhcmNoKTtcblx0XHRcdGNvbnN0IHBhcnQgPSByb3V0ZS5wYXJ0c1tyb3V0ZS5wYXJ0cy5sZW5ndGggLSAxXTtcblx0XHRcdGNvbnN0IHBhcmFtcyA9IHBhcnQucGFyYW1zID8gcGFydC5wYXJhbXMobWF0Y2gpIDoge307XG5cblx0XHRcdGNvbnN0IHBhZ2UgPSB7IGhvc3Q6IGxvY2F0aW9uLmhvc3QsIHBhdGgsIHF1ZXJ5LCBwYXJhbXMgfTtcblxuXHRcdFx0cmV0dXJuIHsgaHJlZjogdXJsLmhyZWYsIHJvdXRlLCBtYXRjaCwgcGFnZSB9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBoYW5kbGVfZXJyb3IodXJsKSB7XG5cdGNvbnN0IHsgaG9zdCwgcGF0aG5hbWUsIHNlYXJjaCB9ID0gbG9jYXRpb247XG5cdGNvbnN0IHsgc2Vzc2lvbiwgcHJlbG9hZGVkLCBzdGF0dXMsIGVycm9yIH0gPSBpbml0aWFsX2RhdGE7XG5cblx0aWYgKCFyb290X3ByZWxvYWRlZCkge1xuXHRcdHJvb3RfcHJlbG9hZGVkID0gcHJlbG9hZGVkICYmIHByZWxvYWRlZFswXTtcblx0fVxuXG5cdGNvbnN0IHByb3BzID0ge1xuXHRcdGVycm9yLFxuXHRcdHN0YXR1cyxcblx0XHRzZXNzaW9uLFxuXHRcdGxldmVsMDoge1xuXHRcdFx0cHJvcHM6IHJvb3RfcHJlbG9hZGVkXG5cdFx0fSxcblx0XHRsZXZlbDE6IHtcblx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdHN0YXR1cyxcblx0XHRcdFx0ZXJyb3Jcblx0XHRcdH0sXG5cdFx0XHRjb21wb25lbnQ6IEVycm9yQ29tcG9uZW50XG5cdFx0fSxcblx0XHRzZWdtZW50czogcHJlbG9hZGVkXG5cblx0fTtcblx0Y29uc3QgcXVlcnkgPSBleHRyYWN0X3F1ZXJ5KHNlYXJjaCk7XG5cdHJlbmRlcihudWxsLCBbXSwgcHJvcHMsIHsgaG9zdCwgcGF0aDogcGF0aG5hbWUsIHF1ZXJ5LCBwYXJhbXM6IHt9IH0pO1xufVxuXG5mdW5jdGlvbiBzY3JvbGxfc3RhdGUoKSB7XG5cdHJldHVybiB7XG5cdFx0eDogcGFnZVhPZmZzZXQsXG5cdFx0eTogcGFnZVlPZmZzZXRcblx0fTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbmF2aWdhdGUodGFyZ2V0LCBpZCwgbm9zY3JvbGwsIGhhc2gpIHtcblx0aWYgKGlkKSB7XG5cdFx0Ly8gcG9wc3RhdGUgb3IgaW5pdGlhbCBuYXZpZ2F0aW9uXG5cdFx0Y2lkID0gaWQ7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgY3VycmVudF9zY3JvbGwgPSBzY3JvbGxfc3RhdGUoKTtcblxuXHRcdC8vIGNsaWNrZWQgb24gYSBsaW5rLiBwcmVzZXJ2ZSBzY3JvbGwgc3RhdGVcblx0XHRzY3JvbGxfaGlzdG9yeVtjaWRdID0gY3VycmVudF9zY3JvbGw7XG5cblx0XHRpZCA9IGNpZCA9ICsrdWlkO1xuXHRcdHNjcm9sbF9oaXN0b3J5W2NpZF0gPSBub3Njcm9sbCA/IGN1cnJlbnRfc2Nyb2xsIDogeyB4OiAwLCB5OiAwIH07XG5cdH1cblxuXHRjaWQgPSBpZDtcblxuXHRpZiAocm9vdF9jb21wb25lbnQpIHN0b3Jlcy5wcmVsb2FkaW5nLnNldCh0cnVlKTtcblxuXHRjb25zdCBsb2FkZWQgPSBwcmVmZXRjaGluZyAmJiBwcmVmZXRjaGluZy5ocmVmID09PSB0YXJnZXQuaHJlZiA/XG5cdFx0cHJlZmV0Y2hpbmcucHJvbWlzZSA6XG5cdFx0aHlkcmF0ZV90YXJnZXQodGFyZ2V0KTtcblxuXHRwcmVmZXRjaGluZyA9IG51bGw7XG5cblx0Y29uc3QgdG9rZW4gPSBjdXJyZW50X3Rva2VuID0ge307XG5cdGNvbnN0IHsgcmVkaXJlY3QsIHByb3BzLCBicmFuY2ggfSA9IGF3YWl0IGxvYWRlZDtcblx0aWYgKHRva2VuICE9PSBjdXJyZW50X3Rva2VuKSByZXR1cm47IC8vIGEgc2Vjb25kYXJ5IG5hdmlnYXRpb24gaGFwcGVuZWQgd2hpbGUgd2Ugd2VyZSBsb2FkaW5nXG5cblx0YXdhaXQgcmVuZGVyKHJlZGlyZWN0LCBicmFuY2gsIHByb3BzLCB0YXJnZXQucGFnZSk7XG5cdGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50KSBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcblxuXHRpZiAoIW5vc2Nyb2xsKSB7XG5cdFx0bGV0IHNjcm9sbCA9IHNjcm9sbF9oaXN0b3J5W2lkXTtcblxuXHRcdGlmIChoYXNoKSB7XG5cdFx0XHQvLyBzY3JvbGwgaXMgYW4gZWxlbWVudCBpZCAoZnJvbSBhIGhhc2gpLCB3ZSBuZWVkIHRvIGNvbXB1dGUgeS5cblx0XHRcdGNvbnN0IGRlZXBfbGlua2VkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaC5zbGljZSgxKSk7XG5cblx0XHRcdGlmIChkZWVwX2xpbmtlZCkge1xuXHRcdFx0XHRzY3JvbGwgPSB7XG5cdFx0XHRcdFx0eDogMCxcblx0XHRcdFx0XHR5OiBkZWVwX2xpbmtlZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBzY3JvbGxZXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2Nyb2xsX2hpc3RvcnlbY2lkXSA9IHNjcm9sbDtcblx0XHRpZiAoc2Nyb2xsKSBzY3JvbGxUbyhzY3JvbGwueCwgc2Nyb2xsLnkpO1xuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbmRlcihyZWRpcmVjdCwgYnJhbmNoLCBwcm9wcywgcGFnZSkge1xuXHRpZiAocmVkaXJlY3QpIHJldHVybiBnb3RvKHJlZGlyZWN0LmxvY2F0aW9uLCB7IHJlcGxhY2VTdGF0ZTogdHJ1ZSB9KTtcblxuXHRzdG9yZXMucGFnZS5zZXQocGFnZSk7XG5cdHN0b3Jlcy5wcmVsb2FkaW5nLnNldChmYWxzZSk7XG5cblx0aWYgKHJvb3RfY29tcG9uZW50KSB7XG5cdFx0cm9vdF9jb21wb25lbnQuJHNldChwcm9wcyk7XG5cdH0gZWxzZSB7XG5cdFx0cHJvcHMuc3RvcmVzID0ge1xuXHRcdFx0cGFnZTogeyBzdWJzY3JpYmU6IHN0b3Jlcy5wYWdlLnN1YnNjcmliZSB9LFxuXHRcdFx0cHJlbG9hZGluZzogeyBzdWJzY3JpYmU6IHN0b3Jlcy5wcmVsb2FkaW5nLnN1YnNjcmliZSB9LFxuXHRcdFx0c2Vzc2lvbjogc3RvcmVzLnNlc3Npb25cblx0XHR9O1xuXHRcdHByb3BzLmxldmVsMCA9IHtcblx0XHRcdHByb3BzOiBhd2FpdCByb290X3ByZWxvYWRlZFxuXHRcdH07XG5cdFx0cHJvcHMubm90aWZ5ID0gc3RvcmVzLnBhZ2Uubm90aWZ5O1xuXG5cdFx0Ly8gZmlyc3QgbG9hZCDigJQgcmVtb3ZlIFNTUidkIDxoZWFkPiBjb250ZW50c1xuXHRcdGNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhcHBlci1oZWFkLXN0YXJ0Jyk7XG5cdFx0Y29uc3QgZW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhcHBlci1oZWFkLWVuZCcpO1xuXG5cdFx0aWYgKHN0YXJ0ICYmIGVuZCkge1xuXHRcdFx0d2hpbGUgKHN0YXJ0Lm5leHRTaWJsaW5nICE9PSBlbmQpIGRldGFjaChzdGFydC5uZXh0U2libGluZyk7XG5cdFx0XHRkZXRhY2goc3RhcnQpO1xuXHRcdFx0ZGV0YWNoKGVuZCk7XG5cdFx0fVxuXG5cdFx0cm9vdF9jb21wb25lbnQgPSBuZXcgQXBwKHtcblx0XHRcdHRhcmdldCxcblx0XHRcdHByb3BzLFxuXHRcdFx0aHlkcmF0ZTogdHJ1ZVxuXHRcdH0pO1xuXHR9XG5cblx0Y3VycmVudF9icmFuY2ggPSBicmFuY2g7XG5cdGN1cnJlbnRfcXVlcnkgPSBKU09OLnN0cmluZ2lmeShwYWdlLnF1ZXJ5KTtcblx0cmVhZHkgPSB0cnVlO1xuXHRzZXNzaW9uX2RpcnR5ID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHBhcnRfY2hhbmdlZChpLCBzZWdtZW50LCBtYXRjaCwgc3RyaW5naWZpZWRfcXVlcnkpIHtcblx0Ly8gVE9ETyBvbmx5IGNoZWNrIHF1ZXJ5IHN0cmluZyBjaGFuZ2VzIGZvciBwcmVsb2FkIGZ1bmN0aW9uc1xuXHQvLyB0aGF0IGRvIGluIGZhY3QgZGVwZW5kIG9uIGl0ICh1c2luZyBzdGF0aWMgYW5hbHlzaXMgb3Jcblx0Ly8gcnVudGltZSBpbnN0cnVtZW50YXRpb24pXG5cdGlmIChzdHJpbmdpZmllZF9xdWVyeSAhPT0gY3VycmVudF9xdWVyeSkgcmV0dXJuIHRydWU7XG5cblx0Y29uc3QgcHJldmlvdXMgPSBjdXJyZW50X2JyYW5jaFtpXTtcblxuXHRpZiAoIXByZXZpb3VzKSByZXR1cm4gZmFsc2U7XG5cdGlmIChzZWdtZW50ICE9PSBwcmV2aW91cy5zZWdtZW50KSByZXR1cm4gdHJ1ZTtcblx0aWYgKHByZXZpb3VzLm1hdGNoKSB7XG5cdFx0aWYgKEpTT04uc3RyaW5naWZ5KHByZXZpb3VzLm1hdGNoLnNsaWNlKDEsIGkgKyAyKSkgIT09IEpTT04uc3RyaW5naWZ5KG1hdGNoLnNsaWNlKDEsIGkgKyAyKSkpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBoeWRyYXRlX3RhcmdldCh0YXJnZXQpXG5cblxuXG4ge1xuXHRjb25zdCB7IHJvdXRlLCBwYWdlIH0gPSB0YXJnZXQ7XG5cdGNvbnN0IHNlZ21lbnRzID0gcGFnZS5wYXRoLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xuXG5cdGxldCByZWRpcmVjdCA9IG51bGw7XG5cblx0Y29uc3QgcHJvcHMgPSB7IGVycm9yOiBudWxsLCBzdGF0dXM6IDIwMCwgc2VnbWVudHM6IFtzZWdtZW50c1swXV0gfTtcblxuXHRjb25zdCBwcmVsb2FkX2NvbnRleHQgPSB7XG5cdFx0ZmV0Y2g6ICh1cmwsIG9wdHMpID0+IGZldGNoKHVybCwgb3B0cyksXG5cdFx0cmVkaXJlY3Q6IChzdGF0dXNDb2RlLCBsb2NhdGlvbikgPT4ge1xuXHRcdFx0aWYgKHJlZGlyZWN0ICYmIChyZWRpcmVjdC5zdGF0dXNDb2RlICE9PSBzdGF0dXNDb2RlIHx8IHJlZGlyZWN0LmxvY2F0aW9uICE9PSBsb2NhdGlvbikpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDb25mbGljdGluZyByZWRpcmVjdHNgKTtcblx0XHRcdH1cblx0XHRcdHJlZGlyZWN0ID0geyBzdGF0dXNDb2RlLCBsb2NhdGlvbiB9O1xuXHRcdH0sXG5cdFx0ZXJyb3I6IChzdGF0dXMsIGVycm9yKSA9PiB7XG5cdFx0XHRwcm9wcy5lcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBuZXcgRXJyb3IoZXJyb3IpIDogZXJyb3I7XG5cdFx0XHRwcm9wcy5zdGF0dXMgPSBzdGF0dXM7XG5cdFx0fVxuXHR9O1xuXG5cdGlmICghcm9vdF9wcmVsb2FkZWQpIHtcblx0XHRyb290X3ByZWxvYWRlZCA9IGluaXRpYWxfZGF0YS5wcmVsb2FkZWRbMF0gfHwgcm9vdF9wcmVsb2FkLmNhbGwocHJlbG9hZF9jb250ZXh0LCB7XG5cdFx0XHRob3N0OiBwYWdlLmhvc3QsXG5cdFx0XHRwYXRoOiBwYWdlLnBhdGgsXG5cdFx0XHRxdWVyeTogcGFnZS5xdWVyeSxcblx0XHRcdHBhcmFtczoge31cblx0XHR9LCAkc2Vzc2lvbik7XG5cdH1cblxuXHRsZXQgYnJhbmNoO1xuXHRsZXQgbCA9IDE7XG5cblx0dHJ5IHtcblx0XHRjb25zdCBzdHJpbmdpZmllZF9xdWVyeSA9IEpTT04uc3RyaW5naWZ5KHBhZ2UucXVlcnkpO1xuXHRcdGNvbnN0IG1hdGNoID0gcm91dGUucGF0dGVybi5leGVjKHBhZ2UucGF0aCk7XG5cblx0XHRsZXQgc2VnbWVudF9kaXJ0eSA9IGZhbHNlO1xuXG5cdFx0YnJhbmNoID0gYXdhaXQgUHJvbWlzZS5hbGwocm91dGUucGFydHMubWFwKGFzeW5jIChwYXJ0LCBpKSA9PiB7XG5cdFx0XHRjb25zdCBzZWdtZW50ID0gc2VnbWVudHNbaV07XG5cblx0XHRcdGlmIChwYXJ0X2NoYW5nZWQoaSwgc2VnbWVudCwgbWF0Y2gsIHN0cmluZ2lmaWVkX3F1ZXJ5KSkgc2VnbWVudF9kaXJ0eSA9IHRydWU7XG5cblx0XHRcdHByb3BzLnNlZ21lbnRzW2xdID0gc2VnbWVudHNbaSArIDFdOyAvLyBUT0RPIG1ha2UgdGhpcyBsZXNzIGNvbmZ1c2luZ1xuXHRcdFx0aWYgKCFwYXJ0KSByZXR1cm4geyBzZWdtZW50IH07XG5cblx0XHRcdGNvbnN0IGogPSBsKys7XG5cblx0XHRcdGlmICghc2Vzc2lvbl9kaXJ0eSAmJiAhc2VnbWVudF9kaXJ0eSAmJiBjdXJyZW50X2JyYW5jaFtpXSAmJiBjdXJyZW50X2JyYW5jaFtpXS5wYXJ0ID09PSBwYXJ0LmkpIHtcblx0XHRcdFx0cmV0dXJuIGN1cnJlbnRfYnJhbmNoW2ldO1xuXHRcdFx0fVxuXG5cdFx0XHRzZWdtZW50X2RpcnR5ID0gZmFsc2U7XG5cblx0XHRcdGNvbnN0IHsgZGVmYXVsdDogY29tcG9uZW50LCBwcmVsb2FkIH0gPSBhd2FpdCBsb2FkX2NvbXBvbmVudChjb21wb25lbnRzW3BhcnQuaV0pO1xuXG5cdFx0XHRsZXQgcHJlbG9hZGVkO1xuXHRcdFx0aWYgKHJlYWR5IHx8ICFpbml0aWFsX2RhdGEucHJlbG9hZGVkW2kgKyAxXSkge1xuXHRcdFx0XHRwcmVsb2FkZWQgPSBwcmVsb2FkXG5cdFx0XHRcdFx0PyBhd2FpdCBwcmVsb2FkLmNhbGwocHJlbG9hZF9jb250ZXh0LCB7XG5cdFx0XHRcdFx0XHRob3N0OiBwYWdlLmhvc3QsXG5cdFx0XHRcdFx0XHRwYXRoOiBwYWdlLnBhdGgsXG5cdFx0XHRcdFx0XHRxdWVyeTogcGFnZS5xdWVyeSxcblx0XHRcdFx0XHRcdHBhcmFtczogcGFydC5wYXJhbXMgPyBwYXJ0LnBhcmFtcyh0YXJnZXQubWF0Y2gpIDoge31cblx0XHRcdFx0XHR9LCAkc2Vzc2lvbilcblx0XHRcdFx0XHQ6IHt9O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHJlbG9hZGVkID0gaW5pdGlhbF9kYXRhLnByZWxvYWRlZFtpICsgMV07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAocHJvcHNbYGxldmVsJHtqfWBdID0geyBjb21wb25lbnQsIHByb3BzOiBwcmVsb2FkZWQsIHNlZ21lbnQsIG1hdGNoLCBwYXJ0OiBwYXJ0LmkgfSk7XG5cdFx0fSkpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHByb3BzLmVycm9yID0gZXJyb3I7XG5cdFx0cHJvcHMuc3RhdHVzID0gNTAwO1xuXHRcdGJyYW5jaCA9IFtdO1xuXHR9XG5cblx0cmV0dXJuIHsgcmVkaXJlY3QsIHByb3BzLCBicmFuY2ggfTtcbn1cblxuZnVuY3Rpb24gbG9hZF9jc3MoY2h1bmspIHtcblx0Y29uc3QgaHJlZiA9IGBjbGllbnQvJHtjaHVua31gO1xuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGlua1tocmVmPVwiJHtocmVmfVwiXWApKSByZXR1cm47XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKChmdWxmaWwsIHJlamVjdCkgPT4ge1xuXHRcdGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cdFx0bGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG5cdFx0bGluay5ocmVmID0gaHJlZjtcblxuXHRcdGxpbmsub25sb2FkID0gKCkgPT4gZnVsZmlsKCk7XG5cdFx0bGluay5vbmVycm9yID0gcmVqZWN0O1xuXG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRfY29tcG9uZW50KGNvbXBvbmVudClcblxuXG4ge1xuXHQvLyBUT0RPIHRoaXMgaXMgdGVtcG9yYXJ5IOKAlCBvbmNlIHBsYWNlaG9sZGVycyBhcmVcblx0Ly8gYWx3YXlzIHJld3JpdHRlbiwgc2NyYXRjaCB0aGUgdGVybmFyeVxuXHRjb25zdCBwcm9taXNlcyA9ICh0eXBlb2YgY29tcG9uZW50LmNzcyA9PT0gJ3N0cmluZycgPyBbXSA6IGNvbXBvbmVudC5jc3MubWFwKGxvYWRfY3NzKSk7XG5cdHByb21pc2VzLnVuc2hpZnQoY29tcG9uZW50LmpzKCkpO1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4odmFsdWVzID0+IHZhbHVlc1swXSk7XG59XG5cbmZ1bmN0aW9uIGRldGFjaChub2RlKSB7XG5cdG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbn1cblxuZnVuY3Rpb24gcHJlZmV0Y2goaHJlZikge1xuXHRjb25zdCB0YXJnZXQgPSBzZWxlY3RfdGFyZ2V0KG5ldyBVUkwoaHJlZiwgZG9jdW1lbnQuYmFzZVVSSSkpO1xuXG5cdGlmICh0YXJnZXQpIHtcblx0XHRpZiAoIXByZWZldGNoaW5nIHx8IGhyZWYgIT09IHByZWZldGNoaW5nLmhyZWYpIHtcblx0XHRcdHNldF9wcmVmZXRjaGluZyhocmVmLCBoeWRyYXRlX3RhcmdldCh0YXJnZXQpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcHJlZmV0Y2hpbmcucHJvbWlzZTtcblx0fVxufVxuXG5mdW5jdGlvbiBzdGFydChvcHRzXG5cbikge1xuXHRpZiAoJ3Njcm9sbFJlc3RvcmF0aW9uJyBpbiBfaGlzdG9yeSkge1xuXHRcdF9oaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gJ21hbnVhbCc7XG5cdH1cblx0XG5cdC8vIEFkb3B0ZWQgZnJvbSBOdXh0LmpzXG5cdC8vIFJlc2V0IHNjcm9sbFJlc3RvcmF0aW9uIHRvIGF1dG8gd2hlbiBsZWF2aW5nIHBhZ2UsIGFsbG93aW5nIHBhZ2UgcmVsb2FkXG5cdC8vIGFuZCBiYWNrLW5hdmlnYXRpb24gZnJvbSBvdGhlciBwYWdlcyB0byB1c2UgdGhlIGJyb3dzZXIgdG8gcmVzdG9yZSB0aGVcblx0Ly8gc2Nyb2xsaW5nIHBvc2l0aW9uLlxuXHRhZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiB7XG5cdFx0X2hpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSAnYXV0byc7XG5cdH0pO1xuXG5cdC8vIFNldHRpbmcgc2Nyb2xsUmVzdG9yYXRpb24gdG8gbWFudWFsIGFnYWluIHdoZW4gcmV0dXJuaW5nIHRvIHRoaXMgcGFnZS5cblx0YWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcblx0XHRfaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9ICdtYW51YWwnO1xuXHR9KTtcblxuXHRzZXRfdGFyZ2V0KG9wdHMudGFyZ2V0KTtcblxuXHRhZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZV9jbGljayk7XG5cdGFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgaGFuZGxlX3BvcHN0YXRlKTtcblxuXHQvLyBwcmVmZXRjaFxuXHRhZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdHJpZ2dlcl9wcmVmZXRjaCk7XG5cdGFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZV9tb3VzZW1vdmUpO1xuXG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcblx0XHRjb25zdCB7IGhhc2gsIGhyZWYgfSA9IGxvY2F0aW9uO1xuXG5cdFx0X2hpc3RvcnkucmVwbGFjZVN0YXRlKHsgaWQ6IHVpZCB9LCAnJywgaHJlZik7XG5cblx0XHRjb25zdCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xuXG5cdFx0aWYgKGluaXRpYWxfZGF0YS5lcnJvcikgcmV0dXJuIGhhbmRsZV9lcnJvcigpO1xuXG5cdFx0Y29uc3QgdGFyZ2V0ID0gc2VsZWN0X3RhcmdldCh1cmwpO1xuXHRcdGlmICh0YXJnZXQpIHJldHVybiBuYXZpZ2F0ZSh0YXJnZXQsIHVpZCwgdHJ1ZSwgaGFzaCk7XG5cdH0pO1xufVxuXG5sZXQgbW91c2Vtb3ZlX3RpbWVvdXQ7XG5cbmZ1bmN0aW9uIGhhbmRsZV9tb3VzZW1vdmUoZXZlbnQpIHtcblx0Y2xlYXJUaW1lb3V0KG1vdXNlbW92ZV90aW1lb3V0KTtcblx0bW91c2Vtb3ZlX3RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHR0cmlnZ2VyX3ByZWZldGNoKGV2ZW50KTtcblx0fSwgMjApO1xufVxuXG5mdW5jdGlvbiB0cmlnZ2VyX3ByZWZldGNoKGV2ZW50KSB7XG5cdGNvbnN0IGEgPSBmaW5kX2FuY2hvcihldmVudC50YXJnZXQpO1xuXHRpZiAoIWEgfHwgYS5yZWwgIT09ICdwcmVmZXRjaCcpIHJldHVybjtcblxuXHRwcmVmZXRjaChhLmhyZWYpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVfY2xpY2soZXZlbnQpIHtcblx0Ly8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS92aXNpb25tZWRpYS9wYWdlLmpzXG5cdC8vIE1JVCBsaWNlbnNlIGh0dHBzOi8vZ2l0aHViLmNvbS92aXNpb25tZWRpYS9wYWdlLmpzI2xpY2Vuc2Vcblx0aWYgKHdoaWNoKGV2ZW50KSAhPT0gMSkgcmV0dXJuO1xuXHRpZiAoZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5KSByZXR1cm47XG5cdGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKSByZXR1cm47XG5cblx0Y29uc3QgYSA9IGZpbmRfYW5jaG9yKGV2ZW50LnRhcmdldCk7XG5cdGlmICghYSkgcmV0dXJuO1xuXG5cdGlmICghYS5ocmVmKSByZXR1cm47XG5cblx0Ly8gY2hlY2sgaWYgbGluayBpcyBpbnNpZGUgYW4gc3ZnXG5cdC8vIGluIHRoaXMgY2FzZSwgYm90aCBocmVmIGFuZCB0YXJnZXQgYXJlIGFsd2F5cyBpbnNpZGUgYW4gb2JqZWN0XG5cdGNvbnN0IHN2ZyA9IHR5cGVvZiBhLmhyZWYgPT09ICdvYmplY3QnICYmIGEuaHJlZi5jb25zdHJ1Y3Rvci5uYW1lID09PSAnU1ZHQW5pbWF0ZWRTdHJpbmcnO1xuXHRjb25zdCBocmVmID0gU3RyaW5nKHN2ZyA/IChhKS5ocmVmLmJhc2VWYWwgOiBhLmhyZWYpO1xuXG5cdGlmIChocmVmID09PSBsb2NhdGlvbi5ocmVmKSB7XG5cdFx0aWYgKCFsb2NhdGlvbi5oYXNoKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIElnbm9yZSBpZiB0YWcgaGFzXG5cdC8vIDEuICdkb3dubG9hZCcgYXR0cmlidXRlXG5cdC8vIDIuIHJlbD0nZXh0ZXJuYWwnIGF0dHJpYnV0ZVxuXHRpZiAoYS5oYXNBdHRyaWJ1dGUoJ2Rvd25sb2FkJykgfHwgYS5nZXRBdHRyaWJ1dGUoJ3JlbCcpID09PSAnZXh0ZXJuYWwnKSByZXR1cm47XG5cblx0Ly8gSWdub3JlIGlmIDxhPiBoYXMgYSB0YXJnZXRcblx0aWYgKHN2ZyA/IChhKS50YXJnZXQuYmFzZVZhbCA6IGEudGFyZ2V0KSByZXR1cm47XG5cblx0Y29uc3QgdXJsID0gbmV3IFVSTChocmVmKTtcblxuXHQvLyBEb24ndCBoYW5kbGUgaGFzaCBjaGFuZ2VzXG5cdGlmICh1cmwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lICYmIHVybC5zZWFyY2ggPT09IGxvY2F0aW9uLnNlYXJjaCkgcmV0dXJuO1xuXG5cdGNvbnN0IHRhcmdldCA9IHNlbGVjdF90YXJnZXQodXJsKTtcblx0aWYgKHRhcmdldCkge1xuXHRcdGNvbnN0IG5vc2Nyb2xsID0gYS5oYXNBdHRyaWJ1dGUoJ3NhcHBlci1ub3Njcm9sbCcpO1xuXHRcdG5hdmlnYXRlKHRhcmdldCwgbnVsbCwgbm9zY3JvbGwsIHVybC5oYXNoKTtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdF9oaXN0b3J5LnB1c2hTdGF0ZSh7IGlkOiBjaWQgfSwgJycsIHVybC5ocmVmKTtcblx0fVxufVxuXG5mdW5jdGlvbiB3aGljaChldmVudCkge1xuXHRyZXR1cm4gZXZlbnQud2hpY2ggPT09IG51bGwgPyBldmVudC5idXR0b24gOiBldmVudC53aGljaDtcbn1cblxuZnVuY3Rpb24gZmluZF9hbmNob3Iobm9kZSkge1xuXHR3aGlsZSAobm9kZSAmJiBub2RlLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgIT09ICdBJykgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTsgLy8gU1ZHIDxhPiBlbGVtZW50cyBoYXZlIGEgbG93ZXJjYXNlIG5hbWVcblx0cmV0dXJuIG5vZGU7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9wb3BzdGF0ZShldmVudCkge1xuXHRzY3JvbGxfaGlzdG9yeVtjaWRdID0gc2Nyb2xsX3N0YXRlKCk7XG5cblx0aWYgKGV2ZW50LnN0YXRlKSB7XG5cdFx0Y29uc3QgdXJsID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKTtcblx0XHRjb25zdCB0YXJnZXQgPSBzZWxlY3RfdGFyZ2V0KHVybCk7XG5cdFx0aWYgKHRhcmdldCkge1xuXHRcdFx0bmF2aWdhdGUodGFyZ2V0LCBldmVudC5zdGF0ZS5pZCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxvY2F0aW9uLmhyZWYgPSBsb2NhdGlvbi5ocmVmO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHQvLyBoYXNoY2hhbmdlXG5cdFx0c2V0X3VpZCh1aWQgKyAxKTtcblx0XHRzZXRfY2lkKHVpZCk7XG5cdFx0X2hpc3RvcnkucmVwbGFjZVN0YXRlKHsgaWQ6IGNpZCB9LCAnJywgbG9jYXRpb24uaHJlZik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcHJlZmV0Y2hSb3V0ZXMocGF0aG5hbWVzKSB7XG5cdHJldHVybiByb3V0ZXNcblx0XHQuZmlsdGVyKHBhdGhuYW1lc1xuXHRcdFx0PyByb3V0ZSA9PiBwYXRobmFtZXMuc29tZShwYXRobmFtZSA9PiByb3V0ZS5wYXR0ZXJuLnRlc3QocGF0aG5hbWUpKVxuXHRcdFx0OiAoKSA9PiB0cnVlXG5cdFx0KVxuXHRcdC5yZWR1Y2UoKHByb21pc2UsIHJvdXRlKSA9PiBwcm9taXNlLnRoZW4oKCkgPT4ge1xuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKHJvdXRlLnBhcnRzLm1hcChwYXJ0ID0+IHBhcnQgJiYgbG9hZF9jb21wb25lbnQoY29tcG9uZW50c1twYXJ0LmldKSkpO1xuXHRcdH0pLCBQcm9taXNlLnJlc29sdmUoKSk7XG59XG5cbmNvbnN0IHN0b3JlcyQxID0gKCkgPT4gZ2V0Q29udGV4dChDT05URVhUX0tFWSk7XG5cbmV4cG9ydCB7IGdvdG8sIHByZWZldGNoLCBwcmVmZXRjaFJvdXRlcywgc3RhcnQsIHN0b3JlcyQxIGFzIHN0b3JlcyB9O1xuIiwiPCEtLSBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IFNhcHBlciDigJQgZG8gbm90IGVkaXQgaXQhIC0tPlxuPHNjcmlwdD5cblx0aW1wb3J0IHsgc2V0Q29udGV4dCwgYWZ0ZXJVcGRhdGUgfSBmcm9tICdzdmVsdGUnO1xuXHRpbXBvcnQgeyBDT05URVhUX0tFWSB9IGZyb20gJy4vc2hhcmVkJztcblx0aW1wb3J0IExheW91dCBmcm9tICcuL2xheW91dC5zdmVsdGUnO1xuXHRpbXBvcnQgRXJyb3IgZnJvbSAnLi9lcnJvci5zdmVsdGUnO1xuXG5cdGV4cG9ydCBsZXQgc3RvcmVzO1xuXHRleHBvcnQgbGV0IGVycm9yO1xuXHRleHBvcnQgbGV0IHN0YXR1cztcblx0ZXhwb3J0IGxldCBzZWdtZW50cztcblx0ZXhwb3J0IGxldCBsZXZlbDA7XG5cdGV4cG9ydCBsZXQgbGV2ZWwxID0gbnVsbDtcblx0ZXhwb3J0IGxldCBub3RpZnk7XG5cblx0YWZ0ZXJVcGRhdGUobm90aWZ5KTtcblx0c2V0Q29udGV4dChDT05URVhUX0tFWSwgc3RvcmVzKTtcbjwvc2NyaXB0PlxuXG48TGF5b3V0IHNlZ21lbnQ9XCJ7c2VnbWVudHNbMF19XCIgey4uLmxldmVsMC5wcm9wc30+XG5cdHsjaWYgZXJyb3J9XG5cdFx0PEVycm9yIHtlcnJvcn0ge3N0YXR1c30vPlxuXHR7OmVsc2V9XG5cdFx0PHN2ZWx0ZTpjb21wb25lbnQgdGhpcz1cIntsZXZlbDEuY29tcG9uZW50fVwiIHsuLi5sZXZlbDEucHJvcHN9Lz5cblx0ey9pZn1cbjwvTGF5b3V0PiIsIjxzY3JpcHQ+XG5cdGV4cG9ydCBsZXQgZXJyb3I7XG5cdGV4cG9ydCBsZXQgc3RhdHVzO1xuPC9zY3JpcHQ+XG5cbjxoMT57c3RhdHVzfTwvaDE+XG5cbjxwPntlcnJvci5tZXNzYWdlfTwvcD5cblxueyNpZiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50J31cblx0PHByZT57ZXJyb3Iuc3RhY2t9PC9wcmU+XG57L2lmfSIsIi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgU2FwcGVyIOKAlCBkbyBub3QgZWRpdCBpdCFcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUm9vdCB9IGZyb20gJy4vbGF5b3V0LnN2ZWx0ZSc7XG5leHBvcnQgeyBwcmVsb2FkIGFzIHJvb3RfcHJlbG9hZCB9IGZyb20gJy4vc2hhcmVkJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRXJyb3JDb21wb25lbnQgfSBmcm9tICcuL2Vycm9yLnN2ZWx0ZSc7XG5cbmV4cG9ydCBjb25zdCBpZ25vcmUgPSBbL15cXC9hcGlcXC9mYWNlYm9va0NvbnRyb2xsZXJcXC8/JC8sIC9eXFwvYXBpXFwvdG9hc3RDb250cm9sbGVyXFwvPyQvLCAvXlxcL2FwaVxcL2F3c0NvbnRyb2xsZXJcXC8/JC9dO1xuXG5leHBvcnQgY29uc3QgY29tcG9uZW50cyA9IFtcblx0e1xuXHRcdGpzOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJpbmRleFwiICovIFwiLi4vLi4vLi4vcm91dGVzL2luZGV4LnN2ZWx0ZVwiKSxcblx0XHRjc3M6IFwiX19TQVBQRVJfQ1NTX1BMQUNFSE9MREVSOmluZGV4LnN2ZWx0ZV9fXCJcblx0fVxuXTtcblxuZXhwb3J0IGNvbnN0IHJvdXRlcyA9IFtcblx0e1xuXHRcdC8vIGluZGV4LnN2ZWx0ZVxuXHRcdHBhdHRlcm46IC9eXFwvJC8sXG5cdFx0cGFydHM6IFtcblx0XHRcdHsgaTogMCB9XG5cdFx0XVxuXHR9XG5dO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0aW1wb3J0KFwiRDovUHJvamVjdHMvdHVja2Vyd2VkZGluZ3dlYnNpdGUvbm9kZV9tb2R1bGVzL3NhcHBlci9zYXBwZXItZGV2LWNsaWVudC5qc1wiKS50aGVuKGNsaWVudCA9PiB7XG5cdFx0Y2xpZW50LmNvbm5lY3QoMTAwMDApO1xuXHR9KTtcbn0iLCJpbXBvcnQgeyB3cml0YWJsZSB9IGZyb20gJ3N2ZWx0ZS9zdG9yZSc7XG5cbmV4cG9ydCBjb25zdCBDT05URVhUX0tFWSA9IHt9O1xuXG5leHBvcnQgY29uc3QgcHJlbG9hZCA9ICgpID0+ICh7fSk7Il0sInNvdXJjZVJvb3QiOiIifQ==