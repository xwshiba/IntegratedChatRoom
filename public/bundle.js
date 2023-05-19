/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CLIENT": () => (/* binding */ CLIENT),
/* harmony export */   "MESSAGES": () => (/* binding */ MESSAGES),
/* harmony export */   "SERVER": () => (/* binding */ SERVER)
/* harmony export */ });
var _MESSAGES;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MESSAGE: 'required-message',
  INVALID_MESSAGE: 'invalid-message'
};
var CLIENT = {
  NETWORK_ERROR: 'network-error',
  NO_SESSION: 'no-session'
};
var MESSAGES = (_MESSAGES = {}, _defineProperty(_MESSAGES, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network.  Please try again'), _defineProperty(_MESSAGES, SERVER.AUTH_MISSING, "You may have logged out or your session has expired. Please try login again"), _defineProperty(_MESSAGES, SERVER.AUTH_INSUFFICIENT, 'Your username/password combination does not match any records, please try again.'), _defineProperty(_MESSAGES, SERVER.REQUIRED_USERNAME, 'Please enter a valid (1 to 20 letters and/or numbers) username'), _defineProperty(_MESSAGES, SERVER.REQUIRED_MESSAGE, "Message can't be empty. Please enter your message."), _defineProperty(_MESSAGES, SERVER.INVALID_MESSAGE, "Your message is invalid. We only support English sentences at the current moment. Sorry for the inconvenience."), _defineProperty(_MESSAGES, "default", 'Something went wrong.  Please try again'), _MESSAGES);

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addAbilityToLogin": () => (/* binding */ addAbilityToLogin),
/* harmony export */   "addAbilityToLogout": () => (/* binding */ addAbilityToLogout),
/* harmony export */   "addAbilityToSendMessage": () => (/* binding */ addAbilityToSendMessage),
/* harmony export */   "pollRefreshedData": () => (/* binding */ pollRefreshedData)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "./src/render.js");




var timeoutId = '';
function addAbilityToLogin(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl,
    feedEl = _ref.feedEl,
    controlEl = _ref.controlEl;
  // Using 'submit' so we can get both submit via button-click and by "enter"
  appEl.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!e.target.classList.contains('forms__login')) {
      return;
    }
    ;
    var username = appEl.querySelector('.login__username').value;
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.waitOnLogin)();
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
      state: state,
      feedEl: feedEl
    }); // show loading state

    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchLogin)(username).then(function (chatData) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.login)(username);
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setChatApp)(chatData);
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
        state: state,
        feedEl: feedEl
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderControl)({
        state: state,
        controlEl: controlEl
      });
      setTimeout(pollRefreshedData, 5000, {
        state: state,
        feedEl: feedEl,
        controlEl: controlEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
        state: state,
        feedEl: feedEl
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderControl)({
        state: state,
        controlEl: controlEl
      });
    });
  });
}
;
function addAbilityToLogout(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl,
    feedEl = _ref2.feedEl,
    controlEl = _ref2.controlEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('controls__logout')) {
      return;
    }
    ;
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.logout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
      state: state,
      feedEl: feedEl
    });
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderControl)({
      state: state,
      controlEl: controlEl
    });
    clearTimeout(timeoutId);
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchLogout)() // We don't really care about results
    ["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
        state: state,
        feedEl: feedEl
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderControl)({
        state: state,
        controlEl: controlEl
      });
    });
  });
}
;
function addAbilityToSendMessage(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl,
    feedEl = _ref3.feedEl,
    controlEl = _ref3.controlEl;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('outgoing__forms')) {
      return;
    }
    ;
    var message = appEl.querySelector('.outgoing__message').value;
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.waitOnMessages)(); // Show loading state
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
      state: state,
      feedEl: feedEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchSendMessage)(message).then(function (messageObj) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.addMessage)(messageObj);
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
        state: state,
        feedEl: feedEl
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderControl)({
        state: state,
        controlEl: controlEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
        state: state,
        feedEl: feedEl
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderControl)({
        state: state,
        controlEl: controlEl
      });
    });
  });
}
;
function refresh(_ref4) {
  var state = _ref4.state,
    feedEl = _ref4.feedEl,
    controlEl = _ref4.controlEl;
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchChatData)().then(function (chatData) {
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.setChatApp)(chatData);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
      state: state,
      feedEl: feedEl
    });
  })["catch"](function (err) {
    clearTimeout(timeoutId);
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION) {
      // expected "error"
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.logout)(); // No longer waiting, set to logged out case
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
        state: state,
        feedEl: feedEl
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderControl)({
        state: state,
        controlEl: controlEl
      });
      return;
    }
    ;
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
      state: state,
      feedEl: feedEl
    });
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderControl)({
      state: state,
      controlEl: controlEl
    });
  });
}
;
function pollRefreshedData(_ref5) {
  var state = _ref5.state,
    feedEl = _ref5.feedEl,
    controlEl = _ref5.controlEl;
  refresh({
    state: state,
    feedEl: feedEl,
    controlEl: controlEl
  });
  timeoutId = setTimeout(pollRefreshedData, 5000, {
    state: state,
    feedEl: feedEl,
    controlEl: controlEl
  });
}
;

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderControl": () => (/* binding */ renderControl),
/* harmony export */   "renderFeed": () => (/* binding */ renderFeed)
/* harmony export */ });
function renderFeed(_ref) {
  var state = _ref.state,
    feedEl = _ref.feedEl;
  var feedHtml = "\n        <p class=\"instruction\">Welcome ".concat(state.username, "! This is Your Instant Chat App :)</p>\n        ").concat(generateStatusHtml(state), "\n        ").concat(generateLoginHtml(state), "\n        ").concat(generateContentHtml(state), "\n    ");
  feedEl.innerHTML = feedHtml;
}
;
function renderControl(_ref2) {
  var state = _ref2.state,
    controlEl = _ref2.controlEl;
  var controlHtml = "";
  if (!state.isLoggedIn) {
    controlHtml = "";
  } else {
    controlHtml = "".concat(generateAddMessageHtml(state));
  }
  ;
  controlEl.innerHTML = controlHtml;
}
;
function generateStatusHtml(state) {
  return "\n      <div class=\"status\">".concat(state.error, "</div>\n  ");
}
;
function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return "\n      <div class=\"login__waiting\">Loading Your Chat App...</div>\n    ";
  }
  ;
  if (state.isLoggedIn) {
    return "";
  }
  ;
  return "\n      <div class=\"login\">\n        <form class=\"forms forms__login\" action=\"#/login\">\n          <label class=\"forms__label\">\n            <span class=\"forms__tag\">Username:</span>\n            <input \n                class=\"forms__input login__username\" \n                type=\"text\"\n                name=\"username\"\n                value=\"\" />\n          </label>\n          <button class=\"forms__btn btn\" type=\"submit\">Login</button>\n        </form>\n      </div>\n  ";
}
;
function generateContentHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  ;
  if (state.isMessagesPending) {
    return "\n            <div class=\"content\">\n                ".concat(generateControlsHtml(), "\n                <div class=\"chat-app__waiting\">Loading Your Chat App...</div>\n            </div>");
  }
  ;
  return "\n      <div class=\"content\">\n        ".concat(generateControlsHtml(), "\n        <div class=\"content__chat\">\n            <ul class=\"users\">\n                <span class=\"user__info\">\n                    All Users\n                </span>\n                ").concat(generateUsersHtml(state), "\n            </ul>\n            <ol class=\"messages\">\n                <span class=\"messages__info\">\n                    Received Messages\n                </span>\n                ").concat(generateMessagesHtml(state), "\n            </ol>\n        </div>\n      </div>\n  ");
}
;
function generateControlsHtml() {
  return "\n        <div class=\"controls\">\n          <button class=\"controls__logout btn\">Logout</button>\n        </div>";
}
;
function generateUsersHtml(state) {
  var loggedInUsersHtml = Object.values(state.loggedInUsers).map(function (user) {
    // this is an array
    return "\n      <li class=\"user\">\n        <span\n          class=\"user__username--logged-in\">\n            ".concat(user, "\n        </span> \n      </li>\n    ");
  }).join('') || "<p>No Online Friends yet, add one!</p>";
  var offlineUsersHtml = Object.values(state.offlineUsers).map(function (user) {
    return "\n        <li class=\"user\">\n          <span\n            class=\"user__username--logged-out\">\n              ".concat(user, "\n          </span> \n        </li>\n    ");
  }).join('') || "";
  var usersHtml = "\n    ".concat(loggedInUsersHtml, "\n    ").concat(offlineUsersHtml, "\n  ");
  return usersHtml;
}
;
function generateMessagesHtml(state) {
  Object.entries(state.messages).sort();
  var messagesHtml = Object.entries(state.messages).sort(function (a, b) {
    return b[1].date - a[1].date;
  }).map(function (userMessage) {
    // every object entry array item has two keys - 0 as key, 1 as value, value is the real message
    var _userMessage$ = userMessage[1],
      id = _userMessage$.id,
      message = _userMessage$.message,
      sender = _userMessage$.sender,
      date = _userMessage$.date;
    var formattedDate = new Date(date);
    return "\n          <li class=\"message ".concat(sender === state.username ? "message-self" : "", "\" data-id=").concat(id, ">\n            <div class=\"message__sender\">\n                <img class=\"avatar\" alt=\"default avatar of ").concat(sender, "\" src=\"images/avatar-default.jpg\"/>\n                <span class=\"username\">").concat(sender, "</span>\n            </div>\n            <div class=\"message__content ").concat(sender === state.username ? "message__self" : "", "\">\n                <span class=\"message__text\">").concat(message, "</span>\n                <span class=\"message__time\">").concat(formattedDate, "</span>\n            </div>\n          </li>\n        ");
  }).join('') || "<p>No Messages yet, start chat!</p>";
  return messagesHtml;
}
;
function generateAddMessageHtml(state) {
  return "\n      <div class=\"outgoing\">\n        <form class=\"forms outgoing__forms\" action=\"#/chats\" method=\"POST\">\n          <input name=\"text\" class=\"forms__input outgoing__message\" value=\"\" placeholder=\"Enter message to send\" required />\n          <button type=\"submit\" class=\"forms__btn btn outgoing__btn\">Send</button>\n        </form>\n      </div>";
}
;

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchChatData": () => (/* binding */ fetchChatData),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchSendMessage": () => (/* binding */ fetchSendMessage),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession)
/* harmony export */ });
function fetchSession() {
  return fetch('/api/v1/session', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    ;
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
;
function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    ;
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
;
function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    ;
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
;
function fetchChatData() {
  return fetch('/api/v1/chats')["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    ;
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
;
function fetchSendMessage(message) {
  return fetch('/api/v1/chats', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      message: message
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    ;
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
;

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addMessage": () => (/* binding */ addMessage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "login": () => (/* binding */ login),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "setChatApp": () => (/* binding */ setChatApp),
/* harmony export */   "setError": () => (/* binding */ setError),
/* harmony export */   "waitOnLogin": () => (/* binding */ waitOnLogin),
/* harmony export */   "waitOnMessages": () => (/* binding */ waitOnMessages)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  // We store these as an object because we will access by id
  loggedInUsers: [],
  offlineUsers: [],
  messages: {},
  isLoggedIn: false,
  isLoginPending: true,
  // We start with our login status unknown
  isMessagesPending: false,
  username: '',
  error: ''
};
function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.loggedInUsers = [], state.offlineUsers = [], state.messages = {};
  state.error = '';
}
;
function waitOnMessages() {
  state.isMessagesPending = true;
  state.error = '';
}
;
function setChatApp(chatData) {
  state.loggedInUsers = chatData.loggedInUsers;
  state.offlineUsers = chatData.offlineUsers;
  state.messages = chatData.messages;
  state.isMessagesPending = false;
  state.error = '';
}
;
function addMessage(message) {
  var id = message.id;
  state.messages[id] = message;
  state.error = '';
  state.isMessagesPending = false;
}
;
function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}
;
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.loggedInUsers = [];
  state.offlineUsers = [];
  state.messages = {}, state.error = '';
}
;
function setError(error) {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  if (!error) {
    state.error = '';
    return;
  }
  ;
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/chat-app.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");





var appEl = document.querySelector('#app');
var feedEl = document.querySelector('.main__feed');
var controlEl = document.querySelector('.main__control');
(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl,
  feedEl: feedEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToLogin)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl,
  feedEl: feedEl,
  controlEl: controlEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToLogout)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl,
  feedEl: feedEl,
  controlEl: controlEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_4__.addAbilityToSendMessage)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl,
  feedEl: feedEl,
  controlEl: controlEl
});
checkForSession();

//////////

function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchSession)().then(function (session) {
    // The returned object from the service call
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(session.username); // We do not have messages yet
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      feedEl: feedEl
    }); // Show we are logged in but don't have any messages
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderControl)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      controlEl: controlEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchChatData)(); // By returning this promise we can chain the original promise
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_0__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION
      }); // Expected, not a problem
    }
    ;
    return Promise.reject(err); // Pass any other error unchanged
  }).then(function (chatData) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setChatApp)(chatData);
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      feedEl: feedEl
    });
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderControl)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      controlEl: controlEl
    });
    setTimeout(_listeners__WEBPACK_IMPORTED_MODULE_4__.pollRefreshedData, 5000, {
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      feedEl: feedEl,
      controlEl: controlEl
    });
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) == _constants__WEBPACK_IMPORTED_MODULE_0__.CLIENT.NO_SESSION) {
      // expected "error"
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)(); // No longer waiting, set to logged out case
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        feedEl: feedEl
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderControl)({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        controlEl: controlEl
      });
      return;
    }
    ;
    // For unexpected errors, report them
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR'); // Ensure that the error ends up truthy
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderFeed)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      feedEl: feedEl
    });
    (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderControl)({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      controlEl: controlEl
    });
  });
}
;
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map