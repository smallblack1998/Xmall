"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.removeStore=exports.getStore=exports.setStore=void 0;var setStore=function(e,t){e&&("string"!=typeof t&&(t=JSON.stringify(t)),window.localStorage.setItem(e,t))};exports.setStore=setStore;var getStore=function(e){if(e)return window.localStorage.getItem(e)};exports.getStore=getStore;var removeStore=function(e){e&&window.localStorage.removeItem(e)};exports.removeStore=removeStore;