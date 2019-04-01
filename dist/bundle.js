/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.6+9869a4bc
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/formdata-polyfill/formdata.min.js":
/*!********************************************************!*\
  !*** ./node_modules/formdata-polyfill/formdata.min.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {;(function(){var k;function l(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}var m="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,e){a!=Array.prototype&&a!=Object.prototype&&(a[b]=e.value)},n="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function p(){p=function(){};n.Symbol||(n.Symbol=r)}var r=function(){var a=0;return function(b){return"jscomp_symbol_"+(b||"")+a++}}();
function u(){p();var a=n.Symbol.iterator;a||(a=n.Symbol.iterator=n.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&m(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return v(l(this))}});u=function(){}}function v(a){u();a={next:a};a[n.Symbol.iterator]=function(){return this};return a}function x(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:l(a)}}var y;
if("function"==typeof Object.setPrototypeOf)y=Object.setPrototypeOf;else{var z;a:{var A={s:!0},B={};try{B.__proto__=A;z=B.s;break a}catch(a){}z=!1}y=z?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var C=y;function D(){this.h=!1;this.c=null;this.o=void 0;this.b=1;this.m=this.u=0;this.g=null}function E(a){if(a.h)throw new TypeError("Generator is already running");a.h=!0}D.prototype.i=function(a){this.o=a};
D.prototype.j=function(a){this.g={v:a,w:!0};this.b=this.u||this.m};D.prototype["return"]=function(a){this.g={"return":a};this.b=this.m};function F(a,b,e){a.b=e;return{value:b}}function G(a){this.A=a;this.l=[];for(var b in a)this.l.push(b);this.l.reverse()}function H(a){this.a=new D;this.B=a}H.prototype.i=function(a){E(this.a);if(this.a.c)return I(this,this.a.c.next,a,this.a.i);this.a.i(a);return J(this)};
function K(a,b){E(a.a);var e=a.a.c;if(e)return I(a,"return"in e?e["return"]:function(a){return{value:a,done:!0}},b,a.a["return"]);a.a["return"](b);return J(a)}H.prototype.j=function(a){E(this.a);if(this.a.c)return I(this,this.a.c["throw"],a,this.a.i);this.a.j(a);return J(this)};
function I(a,b,e,c){try{var d=b.call(a.a.c,e);if(!(d instanceof Object))throw new TypeError("Iterator result "+d+" is not an object");if(!d.done)return a.a.h=!1,d;var f=d.value}catch(g){return a.a.c=null,a.a.j(g),J(a)}a.a.c=null;c.call(a.a,f);return J(a)}function J(a){for(;a.a.b;)try{var b=a.B(a.a);if(b)return a.a.h=!1,{value:b.value,done:!1}}catch(e){a.a.o=void 0,a.a.j(e)}a.a.h=!1;if(a.a.g){b=a.a.g;a.a.g=null;if(b.w)throw b.v;return{value:b["return"],done:!0}}return{value:void 0,done:!0}}
function L(a){this.next=function(b){return a.i(b)};this["throw"]=function(b){return a.j(b)};this["return"]=function(b){return K(a,b)};u();this[Symbol.iterator]=function(){return this}}function M(a,b){var e=new L(new H(b));C&&C(e,a.prototype);return e}
if("function"===typeof Blob&&("undefined"===typeof FormData||!FormData.prototype.keys)){var N=function(a,b){for(var e=0;e<a.length;e++)b(a[e])},O=function(a,b,e){return b instanceof Blob?[String(a),b,void 0!==e?e+"":"string"===typeof b.name?b.name:"blob"]:[String(a),String(b)]},P=function(a,b){if(a.length<b)throw new TypeError(b+" argument required, but only "+a.length+" present.");},Q=function(a){var b=x(a);a=b.next().value;b=b.next().value;a instanceof Blob&&(a=new File([a],b,{type:a.type,lastModified:a.lastModified}));
return a},R="object"===typeof window?window:"object"===typeof self?self:this,S=R.FormData,T=R.XMLHttpRequest&&R.XMLHttpRequest.prototype.send,U=R.Request&&R.fetch,V=R.navigator&&R.navigator.sendBeacon;p();var W=R.Symbol&&Symbol.toStringTag;W&&(Blob.prototype[W]||(Blob.prototype[W]="Blob"),"File"in R&&!File.prototype[W]&&(File.prototype[W]="File"));try{new File([],"")}catch(a){R.File=function(b,e,c){b=new Blob(b,c);c=c&&void 0!==c.lastModified?new Date(c.lastModified):new Date;Object.defineProperties(b,
{name:{value:e},lastModifiedDate:{value:c},lastModified:{value:+c},toString:{value:function(){return"[object File]"}}});W&&Object.defineProperty(b,W,{value:"File"});return b}}p();u();var X=function(a){this.f=Object.create(null);if(!a)return this;var b=this;N(a.elements,function(a){if(a.name&&!a.disabled&&"submit"!==a.type&&"button"!==a.type)if("file"===a.type){var c=a.files&&a.files.length?a.files:[new File([],"",{type:"application/octet-stream"})];N(c,function(c){b.append(a.name,c)})}else"select-multiple"===
a.type||"select-one"===a.type?N(a.options,function(c){!c.disabled&&c.selected&&b.append(a.name,c.value)}):"checkbox"===a.type||"radio"===a.type?a.checked&&b.append(a.name,a.value):(c="textarea"===a.type?a.value.replace(/\r\n/g,"\n").replace(/\n/g,"\r\n"):a.value,b.append(a.name,c))})};k=X.prototype;k.append=function(a,b,e){P(arguments,2);var c=x(O.apply(null,arguments));a=c.next().value;b=c.next().value;e=c.next().value;c=this.f;c[a]||(c[a]=[]);c[a].push([b,e])};k["delete"]=function(a){P(arguments,
1);delete this.f[String(a)]};k.entries=function b(){var e=this,c,d,f,g,h,q;return M(b,function(b){switch(b.b){case 1:c=e.f,f=new G(c);case 2:var t;a:{for(t=f;0<t.l.length;){var w=t.l.pop();if(w in t.A){t=w;break a}}t=null}if(null==(d=t)){b.b=0;break}g=x(c[d]);h=g.next();case 5:if(h.done){b.b=2;break}q=h.value;return F(b,[d,Q(q)],6);case 6:h=g.next(),b.b=5}})};k.forEach=function(b,e){P(arguments,1);for(var c=x(this),d=c.next();!d.done;d=c.next()){var f=x(d.value);d=f.next().value;f=f.next().value;
b.call(e,f,d,this)}};k.get=function(b){P(arguments,1);var e=this.f;b=String(b);return e[b]?Q(e[b][0]):null};k.getAll=function(b){P(arguments,1);return(this.f[String(b)]||[]).map(Q)};k.has=function(b){P(arguments,1);return String(b)in this.f};k.keys=function e(){var c=this,d,f,g,h,q;return M(e,function(e){1==e.b&&(d=x(c),f=d.next());if(3!=e.b){if(f.done){e.b=0;return}g=f.value;h=x(g);q=h.next().value;return F(e,q,3)}f=d.next();e.b=2})};k.set=function(e,c,d){P(arguments,2);var f=O.apply(null,arguments);
this.f[f[0]]=[[f[1],f[2]]]};k.values=function c(){var d=this,f,g,h,q,w;return M(c,function(c){1==c.b&&(f=x(d),g=f.next());if(3!=c.b){if(g.done){c.b=0;return}h=g.value;q=x(h);q.next();w=q.next().value;return F(c,w,3)}g=f.next();c.b=2})};X.prototype._asNative=function(){for(var c=new S,d=x(this),f=d.next();!f.done;f=d.next()){var g=x(f.value);f=g.next().value;g=g.next().value;c.append(f,g)}return c};X.prototype._blob=function(){for(var c="----formdata-polyfill-"+Math.random(),d=[],f=x(this),g=f.next();!g.done;g=
f.next()){var h=x(g.value);g=h.next().value;h=h.next().value;d.push("--"+c+"\r\n");h instanceof Blob?d.push('Content-Disposition: form-data; name="'+g+'"; filename="'+h.name+'"\r\n',"Content-Type: "+(h.type||"application/octet-stream")+"\r\n\r\n",h,"\r\n"):d.push('Content-Disposition: form-data; name="'+g+'"\r\n\r\n'+h+"\r\n")}d.push("--"+c+"--");return new Blob(d,{type:"multipart/form-data; boundary="+c})};X.prototype[Symbol.iterator]=function(){return this.entries()};X.prototype.toString=function(){return"[object FormData]"};
W&&(X.prototype[W]="FormData");T&&(R.XMLHttpRequest.prototype.send=function(c){c instanceof X?(c=c._blob(),this.setRequestHeader("Content-Type",c.type),T.call(this,c)):T.call(this,c)});if(U){var Y=R.fetch;R.fetch=function(c,d){d&&d.body&&d.body instanceof X&&(d.body=d.body._blob());return Y.call(this,c,d)}}V&&(R.navigator.sendBeacon=function(c,d){d instanceof X&&(d=d._asNative());return V.call(this,c,d)});R.FormData=X};
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*jshint esversion: 8 */
__webpack_require__(/*! formdata-polyfill */ "./node_modules/formdata-polyfill/formdata.min.js");

window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var mainSlider = __webpack_require__(/*! ./parts/mainSlider.js */ "./src/parts/mainSlider.js"),
      burgerMenu = __webpack_require__(/*! ./parts/burgerMenu.js */ "./src/parts/burgerMenu.js"),
      feedbackSlider = __webpack_require__(/*! ./parts/feedbackSlider.js */ "./src/parts/feedbackSlider.js"),
      showMoreStyles = __webpack_require__(/*! ./parts/showMoreStyles.js */ "./src/parts/showMoreStyles.js"),
      hoverImg = __webpack_require__(/*! ./parts/hoverImg.js */ "./src/parts/hoverImg.js"),
      filter = __webpack_require__(/*! ./parts/filter.js */ "./src/parts/filter.js"),
      modalPresent = __webpack_require__(/*! ./parts/modalPresent.js */ "./src/parts/modalPresent.js"),
      calc = __webpack_require__(/*! ./parts/calc.js */ "./src/parts/calc.js"),
      accordion = __webpack_require__(/*! ./parts/accordion.js */ "./src/parts/accordion.js"),
      modalConsultation = __webpack_require__(/*! ./parts/modalConsultation.js */ "./src/parts/modalConsultation.js"),
      modalDesign = __webpack_require__(/*! ./parts/modalDesign.js */ "./src/parts/modalDesign.js"),
      form = __webpack_require__(/*! ./parts/form.js */ "./src/parts/form.js");

  mainSlider();
  burgerMenu(); //  feedbackSlider();

  showMoreStyles();
  hoverImg();
  filter('#portfolio .container', '.portfolio-menu li', '.portfolio-block');
  modalPresent();
  calc();
  accordion();
  modalConsultation();
  modalDesign();
  form();
});

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

/***/ }),

/***/ "./src/parts/accordion.js":
/*!********************************!*\
  !*** ./src/parts/accordion.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function accordion() {
  var accordionHead = document.querySelectorAll('#accordion .accordion-heading'),
      accordDescription = document.querySelectorAll('#accordion div'),
      temp = [];
  accordDescription.forEach(function (item, i) {
    temp[i] = item.offsetHeight;
    item.style.display = 'none';
    item.style.padding = '0 4rem';
    item.style.overflow = 'hidden';
  });

  function showDescription(i) {
    accordionHead[i].firstElementChild.classList.add('active');
    var j = 0,
        heightItem = 0,
        id = setInterval(show, 15);

    function show() {
      heightItem += 10;
      j += 0.16;

      if (heightItem <= temp[i]) {
        accordDescription[i].style.height = heightItem + 'px';
        accordDescription[i].style.paddingTop = "".concat(j, "rem");
        accordDescription[i].style.display = 'block';
      } else {
        accordDescription[i].style.height = temp[i] + 'px';
        accordDescription[i].style.paddingTop = '3rem';
        accordDescription[i].style.overflow = '';
        clearInterval(id);
      }
    }
  }

  function hideDescription() {
    accordDescription.forEach(function (item, i) {
      if (item.style.display != 'none') {
        accordionHead[i].firstElementChild.classList.remove('active');
        var heightItem = item.offsetHeight,
            j = 3,
            id = setInterval(hide, 15);

        function hide() {
          heightItem -= 10;
          j -= 0.16;

          if (heightItem >= 0) {
            item.style.height = heightItem + 'px';
            item.style.paddingTop = "".concat(j, "rem");
            item.style.overflow = 'hidden';
          } else {
            item.style.height = 0;
            item.style.paddingTop = 0;
            item.style.display = 'none';
            clearInterval(id);
          }
        }
      }
    });
  }

  accordionHead.forEach(function (item, i) {
    item.addEventListener('click', function () {
      if (accordDescription[i].style.display != 'block') {
        hideDescription();
        showDescription(i);
      }
    });
  });
}

module.exports = accordion;

/***/ }),

/***/ "./src/parts/burgerMenu.js":
/*!*********************************!*\
  !*** ./src/parts/burgerMenu.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function burgerMenu() {
  var burgerButton = document.querySelector('.burger'),
      burgerMenu = document.querySelector('.burger-menu'),
      temp = 0;
  window.addEventListener('resize', function () {
    var headerMenuIsHidden = document.querySelector('.header-menu').offsetWidth;

    if (headerMenuIsHidden) {
      burgerMenu.style.display = 'none';
    }
  });
  burgerButton.addEventListener('click', function () {
    var headerMenuIsHidden = document.querySelector('.header-menu').offsetWidth;

    if (!headerMenuIsHidden) {
      if (temp == 0) {
        burgerMenu.style.display = 'block';
        temp++;
      } else {
        burgerMenu.style.display = 'none';
        temp--;
      }
    }
  });
}

module.exports = burgerMenu;

/***/ }),

/***/ "./src/parts/calc.js":
/*!***************************!*\
  !*** ./src/parts/calc.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
  var Browser = {
    IE: /trident/gi.test(navigator.userAgent) || /msie/gi.test(navigator.userAgent),
    Mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
  };
  var size = document.getElementById('size'),
      material = document.getElementById('material'),
      option = document.getElementById('options'),
      promocode = document.querySelector('.promocode'),
      totalValue = document.querySelector('.calc-price'),
      total = 0;

  function animateTotalValue(value) {
    var _loop = function _loop(_i) {
      var id = setTimeout(function () {
        if (_i > 5000) {
          _i = value;
          clearInterval(id);
        }

        totalValue.innerHTML = _i;
      }, 10);

      if (_i > 5000) {
        i = _i;
        return "break";
      }

      i = _i;
    };

    for (var i = 0; i <= value; i++) {
      var _ret = _loop(i);

      if (_ret === "break") break;
    }
  }

  promocode.addEventListener('input', function () {
    var sizeSelectedIndex = size.options.selectedIndex,
        materialSelectedIndex = material.options.selectedIndex,
        optionSelectedIndex = option.options.selectedIndex,
        promo = 1;

    if (this.value == "IWANTPOPART") {
      promo = 0.7;
    }

    if (sizeSelectedIndex == 0 || materialSelectedIndex == 0) {
      totalValue.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
    } else if (Browser.IE) {
      // Do something related to Internet Explorer.
      totalValue.textContent = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
    } else {
      total = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
      animateTotalValue(total);
    }
  });
  size.addEventListener('change', function () {
    var sizeSelectedIndex = this.options.selectedIndex,
        materialSelectedIndex = material.options.selectedIndex,
        optionSelectedIndex = option.options.selectedIndex,
        promo = 1;

    if (promocode.value == "IWANTPOPART") {
      promo = 0.7;
    }

    if (sizeSelectedIndex == 0 || materialSelectedIndex == 0) {
      totalValue.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
    } else if (Browser.IE) {
      // Do something related to Internet Explorer.
      totalValue.textContent = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
    } else {
      total = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
      animateTotalValue(total);
    }
  });
  material.addEventListener('change', function () {
    var materialSelectedIndex = this.options.selectedIndex,
        sizeSelectedIndex = size.options.selectedIndex,
        optionSelectedIndex = option.options.selectedIndex,
        promo = 1;

    if (promocode.value == "IWANTPOPART") {
      promo = 0.7;
    }

    if (sizeSelectedIndex == 0 || materialSelectedIndex == 0) {
      totalValue.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
    } else if (Browser.IE) {
      // Do something related to Internet Explorer.
      totalValue.textContent = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
    } else {
      total = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
      animateTotalValue(total);
    }
  });
  options.addEventListener('change', function () {
    var optionSelectedIndex = this.options.selectedIndex,
        sizeSelectedIndex = size.options.selectedIndex,
        materialSelectedIndex = material.options.selectedIndex,
        promo = 1;

    if (promocode.value == "IWANTPOPART") {
      promo = 0.7;
    }

    if (sizeSelectedIndex == 0 || materialSelectedIndex == 0) {
      totalValue.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
    } else if (Browser.IE) {
      // Do something related to Internet Explorer.
      totalValue.textContent = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
    } else {
      total = (sizeSelectedIndex * materialSelectedIndex * (optionSelectedIndex + 1) * promo * 1000).toFixed();
      animateTotalValue(total);
    }
  });
}

module.exports = calc;

/***/ }),

/***/ "./src/parts/feedbackSlider.js":
/*!*************************************!*\
  !*** ./src/parts/feedbackSlider.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function feedbackSlider() {
  // console.log(1);
  var slideIndex = 0,
      slides = document.querySelectorAll('.feedback-slider-item'),
      mainSlider = document.querySelector('.feedback-slider'),
      temp = 0; // mainSlider.style.overflow = 'hidden';

  function animation() {
    slides[temp].style.display = 'block';
    var i = 1;
    setInterval(function () {
      slides.forEach(function (item) {
        return item.style.display = 'none';
      });
      slides[temp].style.display = 'block'; // mainSlider.style.height = slides[temp].offsetHeight + 'px';

      var slideoff = slides[temp];
      temp--;

      if (temp < 0) {
        temp = slides.length - 1;
        i = 1;
      }

      slides[temp].style.display = 'block';
      var slideon = slides[temp];
      var top = -slideon.offsetWidth * i;
      var a = -slideon.offsetWidth;
      var down = 0;
      slideon.style.transform = "translate(".concat(-slideon.offsetWidth * i + 'px', ", ").concat(-slideon.offsetHeight * i + 'px', ")"); // console.log(slideon);
      // slideoff.style.transform = `translateX(${-slideoff.offsetWidth*i + 'px'})`;

      if (temp == 0) {
        a = 0;
        down = -slideon.offsetWidth;
      }

      var id = setInterval(start, 5);

      function start() {
        top += 5;
        down += 5;

        if (top < a) {
          slideon.style.transform = "translateX(".concat(top + 'px', ")");
          slideoff.style.transform = "translateX(".concat(down + 'px', ")");
        } else {
          slideoff.style.transform = "translateX(0)";
          slideoff.style.display = 'none';
          slideon.style.transform = "translateX(0)";
          i = 2;
          clearInterval(id);
        }
      }
    }, 3000);
  }

  showSlides();

  function showSlides() {
    slides.forEach(function (item) {
      return item.style.display = 'none';
    });
    animation();
  }
}

module.exports = feedbackSlider;

/***/ }),

/***/ "./src/parts/filter.js":
/*!*****************************!*\
  !*** ./src/parts/filter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function filter(headerClassName, tabClassName, infoContentClassName) {
  var info = document.querySelector(headerClassName),
      tab = document.querySelectorAll(tabClassName),
      tabContent = document.querySelectorAll(infoContentClassName);

  function hideTabContent() {
    tabContent.forEach(function (item) {
      return item.classList.add('hide');
    });
    tab.forEach(function (item) {
      return item.classList.remove('active');
    });
  }

  function showTabContent(b) {
    var temp = 0;
    tabContent.forEach(function (item) {
      if (item.classList.contains(b)) {
        item.classList.remove('hide');
        temp++;
      }
    });

    if (temp == 0) {
      document.querySelector('.portfolio-no').style.display = 'block';
    } else {
      document.querySelector('.portfolio-no').style.display = 'none';
    }
  }

  info.addEventListener('click', function (event) {
    var target = event.target;

    if (target && target.tagName == 'LI') {
      for (var i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent();
          var classTarget = target.className;
          showTabContent(classTarget);
          target.classList.add('active');
          break;
        }
      }
    }
  });
}

module.exports = filter;

/***/ }),

/***/ "./src/parts/form.js":
/*!***************************!*\
  !*** ./src/parts/form.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Promise = typeof Promise === 'undefined' ? __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js").Promise : Promise;

function form() {
  function prettyMask(prettyInput) {
    var maska = "+375 (__)  ___ __ __";
    prettyInput.addEventListener('input', function () {
      if (!/\d$/.test(this.value)) {
        this.value = this.value.slice(0, -1);
      }

      var i = 0;
      var val = this.value.replace(/\D/g, '');

      if (this.value.length < 7) {
        this.value = '+375 (';
      } else {
        this.value = maska.replace(/./g, function (a) {
          return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
        });
      }
    });
    prettyInput.addEventListener('mouseup', function (e) {
      prettyInput.value = '+375 (';
      e.preventDefault();
      prettyInput.setSelectionRange(6, 6);
    });
  }

  function correctInput(input) {
    input.addEventListener('input', function () {
      if (!/[а-яА-Я]$/.test(input.value)) {
        this.value = this.value.slice(0, -1);
      }
    });
  }

  function append(parent, child) {
    parent.appendChild(child);
    child.style.display = 'block';
    setTimeout(function () {
      child.style.display = 'none';
      parent.firstElementChild.style.display = 'block';
    }, 2000);
  }

  var mainForm = document.querySelectorAll('form'),
      inputPhone = document.querySelectorAll('form input'),
      textarea = document.querySelectorAll('form textarea'),
      statusMessage = document.createElement('div');
  statusMessage.classList.add('status');
  inputPhone.forEach(function (item) {
    if (item.name == 'phone') {
      prettyMask(item);
    } else if (item.name == 'name') {
      correctInput(item);
    } else if (item.name == 'message') {
      correctInput(item);
    }
  });
  textarea.forEach(function (item) {
    if (item.name == 'message') {
      correctInput(item);
    }
  });

  function sendForm(elem) {
    elem.addEventListener('submit', function (e) {
      e.preventDefault();

      if (elem.classList.contains('consultation')) {
        elem.appendChild(statusMessage);
      }

      var formData = new FormData(elem);

      function postForm(data) {
        return new _Promise(function (resolve, reject) {
          var request = new XMLHttpRequest();
          request.open('POST', 'server.php');
          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

          request.onreadystatechange = function () {
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4) {
              if (request.status == 200 && request.status < 300) {
                resolve();
              } else {
                reject();
              }
            }
          };

          var obj = {};
          data.forEach(function (value, key) {
            obj[key] = value;
          });
          var json = JSON.stringify(obj);
          request.send(json);
        });
      } //postForm


      function clearInput() {
        for (var i = 0; i < elem.querySelectorAll('input').length; i++) {
          elem.querySelectorAll('input')[i].value = '';
        }
      }

      postForm(formData).then(function () {
        statusMessage.removeAttribute('class');
        statusMessage.classList.add('status', 'loadstatus');
        append(elem, statusMessage);
      }).then(function () {
        statusMessage.removeAttribute('class');
        statusMessage.classList.add('status', 'goodstatus');

        if (!elem.classList.contains('consultation-form') && !elem.classList.contains('form')) {
          elem.firstElementChild.style.display = 'none';
        }

        append(elem, statusMessage);
      }).catch(function () {
        statusMessage.removeAttribute('class');
        statusMessage.classList.add('status', 'failstatus');

        if (!elem.classList.contains( true && !elem.classList.contains('form'))) {
          elem.firstElementChild.style.display = 'none';
        }

        append(elem, statusMessage);
      }).then(clearInput);
    });
  } //sendForm


  mainForm.forEach(function (item) {
    return sendForm(item);
  });
}

module.exports = form;

/***/ }),

/***/ "./src/parts/hoverImg.js":
/*!*******************************!*\
  !*** ./src/parts/hoverImg.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function hoverImg() {
  var Browser = {
    IE: /trident/gi.test(navigator.userAgent) || /msie/gi.test(navigator.userAgent),
    Mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
  };
  var sizesBlock = document.querySelectorAll('.sizes-block'),
      images = document.querySelectorAll('.sizes-block img'),
      imageSrc = [];
  images.forEach(function (item, i) {
    return imageSrc[i] = item.src;
  });

  String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
  };

  sizesBlock.forEach(function (item, i) {
    if (Browser.Mobile) {
      window.addEventListener('click', function (e) {
        if (e.target.parentElement == item) {
          images[i].src = imageSrc[i].splice(-4, 0, '-1');
        } else {
          images[i].src = imageSrc[i];
        }
      });
    } else {
      item.addEventListener('mouseover', function () {
        images[i].src = imageSrc[i].splice(-4, 0, '-1');
      });
      item.addEventListener('mouseout', function () {
        images[i].src = imageSrc[i];
      });
    }
  });
}

module.exports = hoverImg;

/***/ }),

/***/ "./src/parts/mainSlider.js":
/*!*********************************!*\
  !*** ./src/parts/mainSlider.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function getmainSlider() {
  var slideIndex = 0,
      slides = document.querySelectorAll('.main-slider-item'),
      mainSlider = document.querySelector('.main-slider'),
      temp = 0;
  mainSlider.style.overflow = 'hidden';

  function animation() {
    slides[temp].style.display = 'block';
    var i = 2;
    setInterval(function () {
      slides.forEach(function (item) {
        return item.style.display = 'none';
      });
      slides[temp].style.display = 'block';
      mainSlider.style.height = slides[temp].offsetHeight + 'px';
      var slideoff = slides[temp];
      temp++;

      if (temp == slides.length) {
        temp = 0;
        i = 1;
      }

      slides[temp].style.display = 'block';
      var slideon = slides[temp];
      var top = -slideon.offsetHeight * i;
      var a = -slideon.offsetHeight;
      var down = 0;
      slideon.style.transform = "translateY(".concat(-slideon.offsetHeight * i + 'px', ")");

      if (temp == 0) {
        a = 0;
        down = -slideon.offsetHeight;
      }

      var id = setInterval(start, 5);

      function start() {
        top += 5;
        down += 5;

        if (top < a) {
          slideon.style.transform = "translateY(".concat(top + 'px', ")");
          slideoff.style.transform = "translateY(".concat(down + 'px', ")");
        } else {
          slideoff.style.transform = "translateY(0)";
          slideoff.style.display = 'none';
          slideon.style.transform = "translateY(0)";
          i = 2;
          clearInterval(id);
        }
      }
    }, 3000);
  }

  showSlides();

  function showSlides() {
    slides.forEach(function (item) {
      return item.style.display = 'none';
    });
    animation();
  }
}

module.exports = getmainSlider;

/***/ }),

/***/ "./src/parts/modalConsultation.js":
/*!****************************************!*\
  !*** ./src/parts/modalConsultation.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modalConsultation() {
  var btnConsultation = document.querySelectorAll('.button-consultation'),
      modalConsultation = document.querySelector('.popup-consultation'),
      allModalWindow = document.querySelectorAll('.modal-window'),
      temp = 0; //60 sec modalConsultation

  setTimeout(function () {
    allModalWindow.forEach(function (item) {
      if (item.style.display == 'block') {
        temp++;
      }
    });

    if (temp == 0) {
      modalConsultation.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }, 60000);
  btnConsultation.forEach(function (item) {
    item.addEventListener('click', function () {
      modalConsultation.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });
  modalConsultation.addEventListener('click', function (e) {
    if (e.target.classList.contains('popup-consultation') || e.target.classList.contains('popup-close')) {
      document.body.style.overflow = '';
      modalConsultation.style.display = 'none';
      modalConsultation.querySelector('form').firstElementChild.style.display = 'block';
      modalConsultation.querySelectorAll('form input').forEach(function (item) {
        item.value = '';
      });

      if (modalConsultation.querySelector('form').lastElementChild.classList.contains('status')) {
        modalConsultation.querySelector('form').lastElementChild.style.display = 'none';
      }
    }
  });
}

module.exports = modalConsultation;

/***/ }),

/***/ "./src/parts/modalDesign.js":
/*!**********************************!*\
  !*** ./src/parts/modalDesign.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modalDesign() {
  var btnDesign = document.querySelectorAll('.button-design'),
      modalDesign = document.querySelector('.popup-design');
  btnDesign.forEach(function (item) {
    item.addEventListener('click', function () {
      modalDesign.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });
  modalDesign.addEventListener('click', function (e) {
    if (e.target.classList.contains('popup-design') || e.target.classList.contains('popup-close')) {
      document.body.style.overflow = '';
      modalDesign.style.display = 'none';
      modalDesign.querySelector('form').firstElementChild.style.display = 'block';
      modalDesign.querySelectorAll('form input').forEach(function (item) {
        item.value = '';
      });

      if (modalDesign.querySelector('form').lastElementChild.classList.contains('status')) {
        modalDesign.querySelector('form').lastElementChild.style.display = 'none';
      }
    }
  });
}

module.exports = modalDesign;

/***/ }),

/***/ "./src/parts/modalPresent.js":
/*!***********************************!*\
  !*** ./src/parts/modalPresent.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modalPresent() {
  var _this = this;

  var modal = document.querySelector('.popup-gift'),
      img = document.querySelector('img'),
      allButton = document.querySelectorAll('button'),
      temp = 0; // show modal if not click and end of scroll

  allButton.forEach(function (item) {
    item.addEventListener('click', function () {
      temp++;
    });
  });
  window.addEventListener('scroll', function () {
    if (temp == 0 && _this.scrollY == document.body.scrollHeight - window.innerHeight) {
      modal.style.display = 'block';
      img.style.display = 'none';
      document.body.style.overflow = 'hidden';
    }
  });
  img.addEventListener('click', function () {
    modal.style.display = 'block';
    img.style.display = 'none';
    document.body.style.overflow = 'hidden';
  });
  modal.addEventListener('click', function (e) {
    if (e.target.classList.contains('popup-gift') || e.target.classList.contains('popup-close')) {
      document.body.style.overflow = '';
      modal.style.display = 'none';
    }
  });
}

module.exports = modalPresent;

/***/ }),

/***/ "./src/parts/showMoreStyles.js":
/*!*************************************!*\
  !*** ./src/parts/showMoreStyles.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function showMoreStyles() {
  var showMoreStyles = document.querySelector('#styles button'),
      carts = document.querySelectorAll('#styles .row > div');
  showMoreStyles.addEventListener('click', function () {
    carts.forEach(function (item) {
      item.removeAttribute('class');
      item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
      showMoreStyles.style.display = 'none';
    });
  });
}

module.exports = showMoreStyles;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map