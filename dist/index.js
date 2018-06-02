// { "framework": "Vue"} 

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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global Vue */
/* weex initialized here, please do not move this line */
var router = __webpack_require__(1);
var App = __webpack_require__(7);
/* eslint-disable no-new */
new Vue(Vue.util.extend({ el: '#root', router: router }, App));
router.push('/');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vueRouter = __webpack_require__(2);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _HelloWorld = __webpack_require__(3);

var _HelloWorld2 = _interopRequireDefault(_HelloWorld);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global Vue */
Vue.use(_vueRouter2.default);

module.exports = new _vueRouter2.default({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: _HelloWorld2.default
  }]
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert(condition, message) {
  if (!condition) {
    throw new Error("[vue-router] " + message);
  }
}

function warn(condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn("[vue-router] " + message);
  }
}

function isError(err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1;
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render(_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children);
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h();
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (val && current !== vm || !val && current === vm) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children);
  }
};

function resolveProps(route, config) {
  switch (typeof config === 'undefined' ? 'undefined' : _typeof(config)) {
    case 'undefined':
      return;
    case 'object':
      return config;
    case 'function':
      return config(route);
    case 'boolean':
      return config ? route.params : undefined;
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "props in \"" + route.path + "\" is a " + (typeof config === 'undefined' ? 'undefined' : _typeof(config)) + ", " + "expecting an object, function or boolean.");
      }
  }
}

function extend(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to;
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};

var decode = decodeURIComponent;

function resolveQuery(query, extraQuery, _parseQuery) {
  if (extraQuery === void 0) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery;
}

function parseQuery(query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res;
}

function stringifyQuery(obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&');
    }

    return encode(key) + '=' + encode(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?" + res : '';
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute(record, location, redirectedFrom, router) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || record && record.name,
    meta: record && record.meta || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route);
}

function clone(value) {
  if (Array.isArray(value)) {
    return value.map(clone);
  } else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res;
  } else {
    return value;
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch(record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res;
}

function getFullPath(ref, _stringifyQuery) {
  var path = ref.path;
  var query = ref.query;if (query === void 0) query = {};
  var hash = ref.hash;if (hash === void 0) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash;
}

function isSameRoute(a, b) {
  if (b === START) {
    return a === b;
  } else if (!b) {
    return false;
  } else if (a.path && b.path) {
    return a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') && a.hash === b.hash && isObjectEqual(a.query, b.query);
  } else if (a.name && b.name) {
    return a.name === b.name && a.hash === b.hash && isObjectEqual(a.query, b.query) && isObjectEqual(a.params, b.params);
  } else {
    return false;
  }
}

function isObjectEqual(a, b) {
  if (a === void 0) a = {};
  if (b === void 0) b = {};

  // handle null value #1566
  if (!a || !b) {
    return a === b;
  }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if ((typeof aVal === 'undefined' ? 'undefined' : _typeof(aVal)) === 'object' && (typeof bVal === 'undefined' ? 'undefined' : _typeof(bVal)) === 'object') {
      return isObjectEqual(aVal, bVal);
    }
    return String(aVal) === String(bVal);
  });
}

function isIncludedRoute(current, target) {
  return current.path.replace(trailingSlashRE, '/').indexOf(target.path.replace(trailingSlashRE, '/')) === 0 && (!target.hash || current.hash === target.hash) && queryIncludes(current.query, target.query);
}

function queryIncludes(current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false;
    }
  }
  return true;
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render(h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null ? 'router-link-exact-active' : globalExactActiveClass;
    var activeClass = this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass;
    var compareTarget = location.path ? createRoute(null, location, null, router) : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget);

    var handler = function handler(e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default);
  }
};

function guardEvent(e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
    return;
  }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) {
    return;
  }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) {
    return;
  }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) {
      return;
    }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true;
}

function findAnchor(children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child;
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child;
      }
    }
  }
}

var _Vue;

function install(Vue) {
  if (install.installed && _Vue === Vue) {
    return;
  }
  install.installed = true;

  _Vue = Vue;

  var isDef = function isDef(v) {
    return v !== undefined;
  };

  var registerInstance = function registerInstance(vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed() {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get() {
      return this._routerRoot._router;
    }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get() {
      return this._routerRoot._route;
    }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath(relative, base, append) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative;
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative;
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/');
}

function parsePath(path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  };
}

function cleanPath(path) {
  return path.replace(/\/\//g, '/');
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)',
// Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens;
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile(str, options) {
  return tokensToFunction(parse(str, options));
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (_typeof(tokens[i]) === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags(options) {
  return options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys);
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */keys);
  }

  if (isarray(path)) {
    return arrayToRegexp( /** @type {!Array} */path, /** @type {!Array} */keys, options);
  }

  return stringToRegexp( /** @type {string} */path, /** @type {!Array} */keys, options);
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams(path, params, routeMsg) {
  try {
    var filler = regexpCompileCache[path] || (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true });
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, "missing param for " + routeMsg + ": " + e.message);
    }
    return '';
  }
}

/*  */

function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  };
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(typeof route.component !== 'string', "route config \"component\" for path: " + String(path || name) + " cannot be a " + "string id. Use an actual component instead.");
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null ? {} : route.components ? route.props : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) {
        return (/^\/?$/.test(child.path)
        );
      })) {
        warn(false, "Named Route '" + route.name + "' has a default child route. " + "When navigating to this named route (:to=\"{name: '" + route.name + "'\"), " + "the default child route will not be rendered. Remove the name from " + "this route and use the name of the default child route for named " + "links instead.");
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs ? cleanPath(matchAs + "/" + child.path) : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(false, "Duplicate named routes definition: " + "{ name: \"" + name + "\", path: \"" + record.path + "\" }");
    }
  }
}

function compileRouteRegex(path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], "Duplicate param keys in route with path: \"" + path + "\"");
      keys[key.name] = true;
    });
  }
  return regex;
}

function normalizePath(path, parent, strict) {
  if (!strict) {
    path = path.replace(/\/$/, '');
  }
  if (path[0] === '/') {
    return path;
  }
  if (parent == null) {
    return path;
  }
  return cleanPath(parent.path + "/" + path);
}

/*  */

function normalizeLocation(raw, current, append, router) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next;
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, "path " + current.path);
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next;
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = current && current.path || '/';
  var path = parsedPath.path ? resolvePath(parsedPath.path, basePath, append || next.append) : basePath;

  var query = resolveQuery(parsedPath.query, next.query, router && router.options.parseQuery);

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  };
}

function assign(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a;
}

/*  */

function createMatcher(routes, router) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match(raw, currentRoute, redirectedFrom) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, "Route with name '" + name + "' does not exist");
      }
      if (!record) {
        return _createRoute(null, location);
      }
      var paramNames = record.regex.keys.filter(function (key) {
        return !key.optional;
      }).map(function (key) {
        return key.name;
      });

      if (_typeof(location.params) !== 'object') {
        location.params = {};
      }

      if (currentRoute && _typeof(currentRoute.params) === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, "named route \"" + name + "\"");
        return _createRoute(record, location, redirectedFrom);
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom);
        }
      }
    }
    // no match
    return _createRoute(null, location);
  }

  function redirect(record, location) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function' ? originalRedirect(createRoute(record, location, null, router)) : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || (typeof redirect === 'undefined' ? 'undefined' : _typeof(redirect)) !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }
      return _createRoute(null, location);
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, "redirect failed: named route \"" + name + "\" not found.");
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location);
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, "redirect route with path \"" + rawPath + "\"");
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }
      return _createRoute(null, location);
    }
  }

  function alias(record, location, matchAs) {
    var aliasedPath = fillParams(matchAs, location.params, "aliased route with path \"" + matchAs + "\"");
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location);
    }
    return _createRoute(null, location);
  }

  function _createRoute(record, location, redirectedFrom) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location);
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs);
    }
    return createRoute(record, location, redirectedFrom, router);
  }

  return {
    match: match,
    addRoutes: addRoutes
  };
}

function matchRoute(regex, path, params) {
  var m = path.match(regex);

  if (!m) {
    return false;
  } else if (!params) {
    return true;
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true;
}

function resolveRecordPath(path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true);
}

/*  */

var positionStore = Object.create(null);

function setupScroll() {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll(router, to, from, isPop) {
  if (!router.app) {
    return;
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return;
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition(shouldScroll, position);
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition() {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition() {
  var key = getStateKey();
  if (key) {
    return positionStore[key];
  }
}

function getElementPosition(el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  };
}

function isValidPosition(obj) {
  return isNumber(obj.x) || isNumber(obj.y);
}

function normalizePosition(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  };
}

function normalizeOffset(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  };
}

function isNumber(v) {
  return typeof v === 'number';
}

function scrollToPosition(shouldScroll, position) {
  var isObject = (typeof shouldScroll === 'undefined' ? 'undefined' : _typeof(shouldScroll)) === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && _typeof(shouldScroll.offset) === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && function () {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }

  return window.history && 'pushState' in window.history;
}();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now ? window.performance : Date;

var _key = genKey();

function genKey() {
  return Time.now().toFixed(3);
}

function getStateKey() {
  return _key;
}

function setStateKey(key) {
  _key = key;
}

function pushState(url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState(url) {
  pushState(url, true);
}

/*  */

function runQueue(queue, fn, cb) {
  var step = function step(index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents(matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function' ? resolvedDef : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason) ? reason : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) {
      next();
    }
  };
}

function flatMapComponents(matched, fn) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return fn(m.components[key], m.instances[key], m, key);
    });
  }));
}

function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

var hasSymbol = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';

function isESModule(obj) {
  return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === 'Module';
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once(fn) {
  var called = false;
  return function () {
    var args = [],
        len = arguments.length;
    while (len--) {
      args[len] = arguments[len];
    }if (called) {
      return;
    }
    called = true;
    return fn.apply(this, args);
  };
}

/*  */

var History = function History(router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen(cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady(cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError(errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
  var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) {
        cb(err);
      });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
  var this$1 = this;

  var current = this.current;
  var abort = function abort(err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (isSameRoute(route, current) &&
  // in the case the route map has been dynamically appended to
  route.matched.length === current.matched.length) {
    this.ensureURL();
    return abort();
  }

  var ref = resolveQueue(this.current.matched, route.matched);
  var updated = ref.updated;
  var deactivated = ref.deactivated;
  var activated = ref.activated;

  var queue = [].concat(
  // in-component leave guards
  extractLeaveGuards(deactivated),
  // global before hooks
  this.router.beforeHooks,
  // in-component update hooks
  extractUpdateHooks(updated),
  // in-config enter guards
  activated.map(function (m) {
    return m.beforeEnter;
  }),
  // async components
  resolveAsyncComponents(activated));

  this.pending = route;
  var iterator = function iterator(hook, next) {
    if (this$1.pending !== route) {
      return abort();
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (typeof to === 'string' || (typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' && (typeof to.path === 'string' || typeof to.name === 'string')) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if ((typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function isValid() {
      return this$1.current === route;
    };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort();
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute(route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase(base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = baseEl && baseEl.getAttribute('href') || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '');
}

function resolveQueue(current, next) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break;
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  };
}

function extractGuards(records, name, bind, reverse) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard) ? guard.map(function (guard) {
        return bind(guard, instance, match, key);
      }) : bind(guard, instance, match, key);
    }
  });
  return flatten(reverse ? guards.reverse() : guards);
}

function extractGuard(def, key) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key];
}

function extractLeaveGuards(deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true);
}

function extractUpdateHooks(updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard);
}

function bindGuard(guard, instance) {
  if (instance) {
    return function boundRouteGuard() {
      return guard.apply(instance, arguments);
    };
  }
}

function extractEnterGuards(activated, cbs, isValid) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid);
  });
}

function bindEnterGuard(guard, match, key, cbs, isValid) {
  return function routeEnterGuard(to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    });
  };
}

function poll(cb, // somehow flow cannot infer this is a function
instances, key, isValid) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = function (History$$1) {
  function HTML5History(router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return;
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if (History$$1) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create(History$$1 && History$$1.prototype);
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go(n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL(push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation() {
    return getLocation(this.base);
  };

  return HTML5History;
}(History);

function getLocation(base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash;
}

/*  */

var HashHistory = function (History$$1) {
  function HashHistory(router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return;
    }
    ensureSlash();
  }

  if (History$$1) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners() {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return;
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go(n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL(push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    return getHash();
  };

  return HashHistory;
}(History);

function checkFallback(base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true;
  }
}

function ensureSlash() {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true;
  }
  replaceHash('/' + path);
  return false;
}

function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1);
}

function getUrl(path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return base + "#" + path;
}

function pushHash(path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash(path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = function (History$$1) {
  function AbstractHistory(router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if (History$$1) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go(n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return;
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/';
  };

  AbstractHistory.prototype.ensureURL = function ensureURL() {
    // noop
  };

  return AbstractHistory;
}(History);

/*  */

var VueRouter = function VueRouter(options) {
  if (options === void 0) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break;
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break;
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break;
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, "invalid mode: " + mode);
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match(raw, current, redirectedFrom) {
  return this.matcher.match(raw, current, redirectedFrom);
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current;
};

VueRouter.prototype.init = function init(app /* Vue component instance */) {
  var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(install.installed, "not installed. Make sure to call `Vue.use(VueRouter)` " + "before creating root instance.");

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return;
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function setupHashListener() {
      history.setupListeners();
    };
    history.transitionTo(history.getCurrentLocation(), setupHashListener, setupHashListener);
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach(fn) {
  return registerHook(this.beforeHooks, fn);
};

VueRouter.prototype.beforeResolve = function beforeResolve(fn) {
  return registerHook(this.resolveHooks, fn);
};

VueRouter.prototype.afterEach = function afterEach(fn) {
  return registerHook(this.afterHooks, fn);
};

VueRouter.prototype.onReady = function onReady(cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError(errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go(n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back() {
  this.go(-1);
};

VueRouter.prototype.forward = function forward() {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents(to) {
  var route = to ? to.matched ? to : this.resolve(to).route : this.currentRoute;
  if (!route) {
    return [];
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key];
    });
  }));
};

VueRouter.prototype.resolve = function resolve(to, current, append) {
  var location = normalizeLocation(to, current || this.history.current, append, this);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  };
};

VueRouter.prototype.addRoutes = function addRoutes(routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties(VueRouter.prototype, prototypeAccessors);

function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) {
      list.splice(i, 1);
    }
  };
}

function createHref(base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path;
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

exports.default = VueRouter;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(4)
)

/* script */
__vue_exports__ = __webpack_require__(5)

/* template */
var __vue_template__ = __webpack_require__(6)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/brucetoo/WebstormProjects/weex-demo/src/components/HelloWorld.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-49d0bbc8"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
/* eslint-disable indent */
// const stream = weex.requireModule('stream')
exports.default = {
  methods: {
    doSomething: function doSomething() {
      console.log('do something...');
    }
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('text', {
    staticClass: ["message"]
  }, [_vm._v("Now, let's use Vue.js to build your Weex app.")]), _c('a', {
    attrs: {
      "href": _vm.url
    }
  }), _c('a', {
    attrs: {
      "href": _vm.url
    }
  }), _vm._v("//v-bind:href 简写\n    "), (_vm.seen) ? _c('p', [_vm._v("You have seen me")]) : _vm._e(), _c('a', {
    on: {
      "click": _vm.doSomething
    }
  }), _c('a', {
    on: {
      "click": _vm.doSomething
    }
  }), _vm._v(" //v-on:click 简写\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(8)
)

/* script */
__vue_exports__ = __webpack_require__(9)

/* template */
var __vue_template__ = __webpack_require__(23)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/brucetoo/WebstormProjects/weex-demo/src/index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-7458e781"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {
  "frame": {
    "height": "280"
  },
  "image": {
    "height": "280",
    "borderRadius": "10",
    "paddingTop": "20",
    "paddingRight": "20",
    "paddingBottom": "20",
    "paddingLeft": "20"
  },
  "slider": {
    "marginTop": "10",
    "height": "280",
    "borderRadius": "10"
  }
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Horizontal3Card = __webpack_require__(10);

var _Horizontal3Card2 = _interopRequireDefault(_Horizontal3Card);

var _Horizontal4App = __webpack_require__(14);

var _Horizontal4App2 = _interopRequireDefault(_Horizontal4App);

var _HorizontalScrollCard = __webpack_require__(18);

var _HorizontalScrollCard2 = _interopRequireDefault(_HorizontalScrollCard);

var _data2 = __webpack_require__(22);

var _data3 = _interopRequireDefault(_data2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// eslint-disable-next-line indent
/* eslint-disable indent,vue/no-shared-component-data */

var native = weex.requireModule('WeexModule');
var modal = weex.requireModule('modal');
exports.default = {
  components: { horizontal3Card: _Horizontal3Card2.default, horizontal4App: _Horizontal4App2.default, horizontalScrollCard: _HorizontalScrollCard2.default },
  data: function data() {
    return {
      listData: _data3.default, // json字符串直接赋值
      download: '下载'
    };
  },

  methods: {
    onBannerClick: function onBannerClick(image) {
      modal.toast({
        message: image.imageUrl,
        duration: 0.5
      });
      native.logger(image);
      native.onBannerClick(image);
    }
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(11)
)

/* script */
__vue_exports__ = __webpack_require__(12)

/* template */
var __vue_template__ = __webpack_require__(13)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/brucetoo/WebstormProjects/weex-demo/src/components/Horizontal3Card.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4882e207"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {
  "items": {
    "flex": 1
  },
  "parent": {
    "height": "150",
    "flexDirection": "row",
    "marginTop": "10",
    "marginRight": "10",
    "marginBottom": "10",
    "marginLeft": "10"
  },
  "image": {
    "height": "120",
    "width": "220",
    "borderRadius": "10",
    "marginTop": "10",
    "marginRight": "10",
    "marginBottom": "10",
    "marginLeft": "10"
  },
  "text": {
    "textAlign": "center",
    "height": "40",
    "width": "150",
    "fontSize": "20",
    "fontWeight": "bold",
    "color": "#111111",
    "borderRadius": "5",
    "backgroundColor": "#eeeeee",
    "position": "relative",
    "bottom": "30",
    "paddingTop": "8",
    "marginLeft": "50"
  }
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//

var native = weex.requireModule('WeexModule');
var modal = weex.requireModule('modal');
exports.default = {
  name: 'Horizontal3Card',
  props: ['cards'],
  methods: {
    onH3CardClick: function onH3CardClick(card) {
      modal.toast({
        message: card.imageUrl,
        duration: 0.5
      });
      native.onH3CardClick(card);
      native.logger(card);
    }
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["parent"]
  }, _vm._l((_vm.cards), function(card) {
    return _c('div', {
      staticClass: ["items"]
    }, [_c('div', {
      staticClass: ["item"],
      on: {
        "click": function($event) {
          _vm.onH3CardClick(card)
        }
      }
    }, [_c('image', {
      staticClass: ["image"],
      attrs: {
        "src": card.imageUrl,
        "resize": "cover"
      }
    }), _c('text', {
      staticClass: ["text"]
    }, [_vm._v(_vm._s(card.name))])])])
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(15)
)

/* script */
__vue_exports__ = __webpack_require__(16)

/* template */
var __vue_template__ = __webpack_require__(17)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/brucetoo/WebstormProjects/weex-demo/src/components/Horizontal4App.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-64231cd9"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {
  "items": {
    "flexDirection": "row",
    "justifyContent": "space-around"
  },
  "item": {
    "alignItems": "center"
  },
  "title": {
    "fontSize": "35",
    "color": "#000000",
    "marginTop": "20",
    "marginRight": "20",
    "marginBottom": "20",
    "marginLeft": "20",
    "fontWeight": "bold"
  },
  "icon": {
    "width": "120",
    "height": "120",
    "marginTop": "20",
    "marginRight": "20",
    "marginBottom": "20",
    "marginLeft": "20"
  },
  "name": {
    "fontSize": "30",
    "color": "#333333",
    "fontWeight": "bold"
  },
  "size": {
    "fontSize": "22",
    "color": "#bbbbbb",
    "marginTop": "5"
  },
  "download": {
    "paddingTop": "8",
    "paddingRight": "8",
    "paddingBottom": "8",
    "paddingLeft": "8",
    "borderRadius": "20",
    "fontSize": "30",
    "color": "#ffffff",
    "marginTop": "20",
    "marginBottom": "20",
    "width": "120",
    "backgroundColor": "#24c8af",
    "textAlign": "center"
  }
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'Horizontal4App',
  props: ['appItem', 'title', 'download']
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('text', {
    staticClass: ["title"]
  }, [_vm._v(_vm._s(_vm.title))]), _c('div', {
    staticClass: ["items"]
  }, _vm._l((_vm.appItem), function(app) {
    return _c('div', {
      staticClass: ["item"]
    }, [_c('image', {
      staticClass: ["icon"],
      attrs: {
        "src": app.iconUrl,
        "resize": "cover"
      }
    }), _c('text', {
      staticClass: ["name"]
    }, [_vm._v(_vm._s(app.name))]), _c('text', {
      staticClass: ["size"]
    }, [_vm._v(_vm._s(Math.round(app.size / 1000 * 100) / 100 + "Mb"))]), _c('text', {
      staticClass: ["download"]
    }, [_vm._v(_vm._s(_vm.download))])])
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(19)
)

/* script */
__vue_exports__ = __webpack_require__(20)

/* template */
var __vue_template__ = __webpack_require__(21)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/brucetoo/WebstormProjects/weex-demo/src/components/HorizontalScrollCard.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-0ef0ec29"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = {
  "item": {
    "height": "420"
  },
  "title": {
    "position": "absolute",
    "top": "20",
    "left": "20",
    "fontSize": "35",
    "color": "#ffffff",
    "fontWeight": "bold"
  },
  "background": {
    "height": "420"
  },
  "scroller": {
    "position": "absolute",
    "top": "80",
    "paddingLeft": "250",
    "flexDirection": "row"
  },
  "scroller-item": {
    "paddingTop": "20",
    "paddingRight": "20",
    "paddingBottom": "20",
    "paddingLeft": "20",
    "width": "200",
    "height": "300",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "marginRight": "30",
    "borderRadius": "5",
    "backgroundColor": "#f9f9f9"
  },
  "appName": {
    "textAlign": "center",
    "fontWeight": "bold",
    "lines": 1,
    "textSize": "12"
  },
  "icon": {
    "width": "120",
    "height": "120",
    "marginTop": "20",
    "marginRight": "20",
    "marginBottom": "20",
    "marginLeft": "20"
  },
  "download": {
    "paddingTop": "5",
    "paddingRight": "5",
    "paddingBottom": "5",
    "paddingLeft": "5",
    "borderRadius": "20",
    "fontSize": "30",
    "color": "#ffffff",
    "marginTop": "20",
    "marginBottom": "20",
    "width": "120",
    "backgroundColor": "#24c8af",
    "textAlign": "center"
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'HorizontalScrollCard.vue',
  props: ['title', 'bgUrl', 'appItem'],
  data: function data() {
    return {
      download: '下载'
    };
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["item"]
  }, [_c('image', {
    staticClass: ["background"],
    attrs: {
      "src": _vm.bgUrl,
      "resize": "cover"
    }
  }), _c('text', {
    staticClass: ["title"]
  }, [_vm._v(_vm._s(_vm.title))]), _c('scroller', {
    staticClass: ["scroller"],
    attrs: {
      "scrollDirection": "horizontal"
    }
  }, _vm._l((_vm.appItem), function(app) {
    return _c('div', {
      staticClass: ["scroller-item"]
    }, [_c('image', {
      staticClass: ["icon"],
      attrs: {
        "src": app.iconUrl,
        "resize": "cover"
      }
    }), _c('text', {
      staticClass: ["appName"]
    }, [_vm._v(_vm._s(app.name))]), _c('text', {
      staticClass: ["download"]
    }, [_vm._v(_vm._s(_vm.download))])])
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = {"data":{"shownApps":[6648837,492643,6671203,7063907,280621,7688158,6614984,7606744,330421,7624518,6551319,7450340,35609,7615406,7049813,287355],"shownAds":[32649,40399,29153,30627,41061,29159,41073,32635],"spacePos":"1649","content":[{"id":41061,"cardId":"41061","cardType":"23_63","cardGroupTitle":"banner_six","cardGroupPos":"1649/413","cardPos":"1649/413/41061","cardIdx":"1","name":"0527首页banner","adType":23,"tpData":"17119","bgColor":"","content":"","intervalTime":0,"imageNum":0,"listorder":1,"positionNo":1,"resourceType":13,"exDataStr":"[]","exData":{"id":17119,"recommendType":63,"appSetStyle":-1,"titleStyle":-1,"title":"1231首页轮播banner推荐集 6.0","tpData":"","showMore":0,"content":[{"desc":"万万没想到-第31期","apps":[],"listOrien":0,"showOrder":0,"id":268877,"name":"万万没想到-第31期","adType":10,"tpData":"http://cdn.m.pp.cn/public/specials/3/?ch=rec_banner&sid=12009&theme=fd4e3d&listType=3&downloadText=%E5%8E%BB%E6%97%85%E6%B8%B8&bg=051016&isShare=1","imageUrl":"http://serverfile.ac.uc.cn/recommendset/0_1527245091551_637.jpg","listorder":0,"positionNo":0,"resourceType":13,"exData":{"dynamicImgsUrl":["http://android-imgs.25pp.com/fs08/2018/05/25/8/1d16f6da269903f11d80da5371df913a.png","http://android-imgs.25pp.com/fs08/2018/05/25/6/a936b49e65fb891cbd2fd038866920c0.png","http://android-imgs.25pp.com/fs08/2018/05/25/2/e92039503b80c023d01e45361e444e19.jpg"]}},{"desc":"穿越火线","apps":[],"listOrien":0,"showOrder":0,"id":268879,"name":"穿越火线","adType":1,"tpData":"6671203","imageUrl":"http://serverfile.ac.uc.cn/recommendset/0_1527329715882_896.jpeg","listorder":0,"positionNo":0,"resourceType":13,"exData":{"dynamicImgsUrl":[]}},{"desc":"传奇世界3D","apps":[],"listOrien":0,"showOrder":0,"id":268881,"name":"传奇世界3D","adType":1,"tpData":"7751618","imageUrl":"http://serverfile.ac.uc.cn/recommendset/0_1527329746647_668.jpeg","listorder":0,"positionNo":0,"resourceType":13,"exData":{"dynamicImgsUrl":[]}},{"desc":"苹果用户都在玩-第57期","apps":[],"listOrien":0,"showOrder":0,"id":268867,"name":"苹果用户都在玩-第57期","adType":55,"tpData":"11977","imageUrl":"http://serverfile.ac.uc.cn/recommendset/0_1526644376242_183.jpg","listorder":0,"positionNo":0,"resourceType":13,"exData":{"dynamicImgsUrl":["http://android-imgs.25pp.com/fs08/2018/05/18/8/33600bdce5f623ed97fcc8aba776ef5d.png","http://android-imgs.25pp.com/fs08/2018/05/18/2/e508ab2967dec9be001de437253f5af1.png","http://android-imgs.25pp.com/fs08/2018/05/18/1/2a3f6a3d4191e8be66280f25004b7c0c.jpg"]}}],"exData":"{\"ab\":\"\"}"},"showCtr":true},{"id":41073,"cardId":"41073","cardType":"23_75","cardGroupTitle":"san_gong_ge_six","cardGroupPos":"1649/439","cardPos":"1649/439/41073","cardIdx":"2","name":"0528横排三宫格","adType":23,"tpData":"17131","bgColor":"","content":"","intervalTime":0,"imageNum":0,"listorder":1,"positionNo":1,"resourceType":13,"exDataStr":"[]","exData":{"id":17131,"recommendType":75,"appSetStyle":-1,"titleStyle":-1,"title":"0101横向三宫格推荐集6.0版本","tpData":"","showMore":0,"content":[{"desc":"拳皇命运","listOrien":0,"showOrder":0,"id":270981,"name":"拳皇命运","adType":1,"tpData":"7751066","imageUrl":"http://serverfile.ac.uc.cn/recommendset/270957_1527330224844_82.jpeg","listorder":0,"positionNo":0,"resourceType":13},{"desc":"最强NBA","listOrien":0,"showOrder":0,"id":270983,"name":"最强NBA","adType":1,"tpData":"7657304","imageUrl":"http://serverfile.ac.uc.cn/recommendset/270983_1527330498137_585.jpeg","listorder":0,"positionNo":0,"resourceType":13},{"desc":"集分宝抵现金","listOrien":0,"showOrder":0,"id":270985,"name":"集分宝抵现金","adType":10,"tpData":"ext://link?adType=15&tpData=4","imageUrl":"http://serverfile.ac.uc.cn/recommendset/211575_1524796313545_466.jpg","listorder":0,"positionNo":0,"resourceType":13}],"exData":"{\"ab\":\"\"}"},"showCtr":true},{"id":30627,"cardId":"30627","cardType":"50","cardGroupTitle":"sygntx","cardGroupPos":"1649/491","cardPos":"1649/491/30627","cardIdx":"3","name":"首页功能提醒","adType":50,"tpData":"","bgColor":"","content":"","intervalTime":0,"imageNum":0,"listorder":1,"positionNo":1,"resourceType":13,"exDataStr":"[]","showCtr":true},{"id":29153,"cardId":"29153","cardType":"23_77","cardGroupTitle":"ad_jingjia","cardGroupPos":"1649/415","cardPos":"1649/415/29153","cardIdx":"4","name":"每日好应用","adType":23,"tpData":"7411","bgColor":"","content":"","intervalTime":0,"imageNum":0,"listorder":1,"positionNo":1,"resourceType":13,"exDataStr":"[]","exData":{"id":7411,"recommendType":77,"appSetStyle":-1,"titleStyle":-1,"title":"每日好应用","showMore":1,"content":[{"desc":"","apps":[{"id":280621,"resourceType":0,"packageName":"com.smile.gifmaker","name":"快手","categoryId":5016,"categoryName":"摄影图像","versionName":"5.7.1.6128","versionCode":6128,"size":50563,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/23/9/110_ef65ecdd4f2f27fe7b2d0354c04066d6.apk?yingid=pp_client&packageid=600675425&md5=8be683ed9370a5fee4072c762f1f29d7&minSDK=15&size=51777301&shortMd5=9e0d3c3005d1c83651b5627c54762af0&crc32=392703493","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/23/8/110_84c2cd88ccb8974e178a28781e9780e1_con.png","downloads":435721152,"updateTime":1527066657229,"versionId":600675425,"appDesc":"快手短视频——国民短视频平台，记录你的生活，分享有趣世界。 <br>【热播综艺，邀你来嗨】 <br>快手，是众多顶级综艺的首席记录官。在《奔跑吧》，见证兄弟团挑战各种不可能任务；在《中国梦想秀》记录平凡人的正能量追梦之路；是《声临其境》声音大咖推荐的首选短视频；也是《快乐大本营》最亲密的合作伙伴，“如果感到快乐你就拍快手”就像快乐家族的口头禅。《向往的生活》的蘑菇屋里，强如黄磊也从快手上学到生活技能。快手行动更是在《天天向上》的舞台上启动“未来编程计划”，助力青年有个更酷的未来。<br><br>【幽默视频，欢乐不停】 <br>海量视频任你观看，这里有你喜欢的美女、帅哥，这里有明星、普通人的欢乐瞬间，拍摄爆笑一刻，分享你我他 … <br><br>【直播live，实时互动】 <br>看零距离的同城新鲜事，发现身边好友。随时随地直播互动，下一秒人气社交达人就是你。 <br><br>【流行配乐，动感魔音】 <br>不同曲风，不同心情。时尚魔性配乐，挑动你的音乐神经， 让我们一起摇摆。 <br><br>【美颜滤镜，魔法表情】 <br>不用化妆不用洗头，变美就是这么简单。神奇魔法让你一秒。 <br><br>【直播权限】 <br>发布优质视频、绑定手机号、分享视频，有助于开通直播权限。 <br><br>在快手，我们发现生活的乐趣；在快手，我们为彼此点赞；在快手，人人都可以上热门。这里每个人都年轻，看有趣的世界，也让世界看见有趣的你。","safeStatus":0,"hotLevel":0,"editorRecommend":"记录生活中有趣的精彩瞬间","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"vurl":"http://huichuan.sm.cn/wdj/show?dlType=huichuan&ast=AAcAACUDAAAyWRMk-8Miv37Td0kIQCuG32vdFVhRdvRw_r0HLRDDIBplNTjNdYWPNNnr7ouCpceCWuBUKqN_4_bOqGKr3OW7zJs6zZ8_K3CxTZKKQf-XX3mi6TIi2jfUFh9otjDpwd78fF6kL2hgnU5VIc5FdnjUMLXkG_Nm4PZZfj12hEPptgOUnSkcU2j7jzvXGflXCBuHJQAtUPCmfYEcc_-yY32EPuubQoR5ErTIwo89CSf8dLdP68X7Ncm_3E8AN3__RW-rj1mHLpu6z4xLQByXQxoheT3gY8oQeXMLmZaqCIWKdndnF2nBtrjRGuOKec6R975FBH4Jp3t-_pjB8LX1fBgq_0LhIUPxZ3Rmzgo5bwFwVvDOBU5C-ADVVUCCGKhZ3o_IxoZh31yHCTl6rTdujZD7YnYfxq1PpkHhpql-oln2kBxuC51cbm8-wU6zSsWBkhA-OsIahS2q0TSH0YyfJIeXjZy9FrKNZef2-OnxyqM_8GZAWYGkqfwsc6rBLAXibONeKa27YbSVDvjTBMQe7-lFn43gGO8tkIF9ECmwMc9uM5588Oe1PE-5tZLuWmz3uFcYOKVtG2_faF5LMQ67RHsXEab3KC-Ok1O5zzUGLWD1_OUlK45QycMCw55xtkQyrvAGO9iysKAeAvtRaThep22Ryf5FqoWZLBjcBvFOZw6UMfgGd2fmPV2SfaHOYj76X4za41KC5ZcY7_A1iW1QFoN1QLo4Xj0vZQvNESVY1W1ZRXGrWY_9oiGMg7BKGOKv72zqFw-aTr1x517RSi6AEkM4MFsbFfQU56k-GWGv53MEH1OAMQ4UUTTsRw4A5xQ3LYUTQLWj4ij9AEEAaeOGMlMcIjIcHe8wERTt2wM9f2b6ZiQBE1va2wlKrXg6XgaQ8WOHdmJ0mHZi8XIgf2cwQJOfPqkn8KQmxchRCSy9u9_lRHPpi9S1smS7C_eylA5FyYXcM7bjY3UB5oswH9Tx6QXUYVeYNspeLUzd43PTC-VvHztFJYh3iemnSV1VsAlbP8UKq8a8kkVq048Ofs5NxRw3Zk7FRVoFKhoWwKzFafr7JxSsV-nS","curl":"http://huichuan.sm.cn/wdj?dlType=huichuan&ast=AAcAACUDAAAyWRMk-8Miv37Td0kIQCuG32vdFVhRdvRw_r0HLRDDIBplNTjNdYWPNNnr7ouCpceCWuBUKqN_4_bOqGKr3OW7zJs6zZ8_K3CxTZKKQf-XX3mi6TIi2jfUFh9otjDpwd78fF6kL2hgnU5VIc5FdnjUMLXkG_Nm4PZZfj12hEPptgOUnSkcU2j7jzvXGflXCBuHJQAtUPCmfYEcc_-yY32EPuubQoR5ErTIwo89CSf8dLdP68X7Ncm_3E8AN3__RW-rj1mHLpu6z4xLQByXQxoheT3gY8oQeXMLmZaqCIWKdndnF2nBtrjRGuOKec6R975FBH4Jp3t-_pjB8LX1fBgq_0LhIUPxZ3Rmzgo5bwFwVvDOBU5C-ADVVUCCGKhZ3o_IxoZh31yHCTl6rTdujZD7YnYfxq1PpkHhpql-oln2kBxuC51cbm8-wU6zSsWBkhA-OsIahS2q0TSH0YyfJIeXjZy9FrKNZef2-OnxyqM_8GZAWYGkqfwsc6rBLAXibONeKa27YbSVDvjTBMQe7-lFn43gGO8tkIF9ECmwMc9uM5588Oe1PE-5tZLuWmz3uFcYOKVtG2_faF5LMQ67RHsXEab3KC-Ok1O5zzUGLWD1_OUlK45QycMCw55xtkQyrvAGO9iysKAeAvtRaThep22Ryf5FqoWZLBjcBvFOZw6UMfgGd2fmPV2SfaHOYj76X4za41KC5ZcY7_A1iW1QFoN1QLo4Xj0vZQvNESVY1W1ZRXGrWY_9oiGMg7BKGOKv72zqFw-aTr1x517RSi6AEkM4MFsbFfQU56k-GWGv53MEH1OAMQ4UUTTsRw4A5xQ3LYUTQLWj4ij9AEEAaeOGMlMcIjIcHe8wERTt2wM9f2b6ZiQBE1va2wlKrXg6XgaQ8WOHdmJ0mHZi8XIgf2cwQJOfPqkn8KQmxchRCSy9u9_lRHPpi9S1smS7C_eylA5FyYXcM7bjY3UB5oswH9Tx6QXUYVeYNspeLUzd43PTC-VvHztFJYh3iemnSV1VsAlbP8UKq8a8kkVq048Ofs5NxRw3Zk7FRVoFKhoWwKzFafr7JxSsV-nS","durl":"http://huichuan.sm.cn/wdj/fd?dlType=huichuan&ast=AAcAACUDAAAyWRMk-8Miv37Td0kIQCuG32vdFVhRdvRw_r0HLRDDIBplNTjNdYWPNNnr7ouCpceCWuBUKqN_4_bOqGKr3OW7zJs6zZ8_K3CxTZKKQf-XX3mi6TIi2jfUFh9otjDpwd78fF6kL2hgnU5VIc5FdnjUMLXkG_Nm4PZZfj12hEPptgOUnSkcU2j7jzvXGflXCBuHJQAtUPCmfYEcc_-yY32EPuubQoR5ErTIwo89CSf8dLdP68X7Ncm_3E8AN3__RW-rj1mHLpu6z4xLQByXQxoheT3gY8oQeXMLmZaqCIWKdndnF2nBtrjRGuOKec6R975FBH4Jp3t-_pjB8LX1fBgq_0LhIUPxZ3Rmzgo5bwFwVvDOBU5C-ADVVUCCGKhZ3o_IxoZh31yHCTl6rTdujZD7YnYfxq1PpkHhpql-oln2kBxuC51cbm8-wU6zSsWBkhA-OsIahS2q0TSH0YyfJIeXjZy9FrKNZef2-OnxyqM_8GZAWYGkqfwsc6rBLAXibONeKa27YbSVDvjTBMQe7-lFn43gGO8tkIF9ECmwMc9uM5588Oe1PE-5tZLuWmz3uFcYOKVtG2_faF5LMQ67RHsXEab3KC-Ok1O5zzUGLWD1_OUlK45QycMCw55xtkQyrvAGO9iysKAeAvtRaThep22Ryf5FqoWZLBjcBvFOZw6UMfgGd2fmPV2SfaHOYj76X4za41KC5ZcY7_A1iW1QFoN1QLo4Xj0vZQvNESVY1W1ZRXGrWY_9oiGMg7BKGOKv72zqFw-aTr1x517RSi6AEkM4MFsbFfQU56k-GWGv53MEH1OAMQ4UUTTsRw4A5xQ3LYUTQLWj4ij9AEEAaeOGMlMcIjIcHe8wERTt2wM9f2b6ZiQBE1va2wlKrXg6XgaQ8WOHdmJ0mHZi8XIgf2cwQJOfPqkn8KQmxchRCSy9u9_lRHPpi9S1smS7C_eylA5FyYXcM7bjY3UB5oswH9Tx6QXUYVeYNspeLUzd43PTC-VvHztFJYh3iemnSV1VsAlbP8UKq8a8kkVq048Ofs5NxRw3Zk7FRVoFKhoWwKzFafr7JxSsV-nS","iurl":"http://huichuan.sm.cn/wdj/install?dlType=huichuan&ast=AAcAACUDAAAyWRMk-8Miv37Td0kIQCuG32vdFVhRdvRw_r0HLRDDIBplNTjNdYWPNNnr7ouCpceCWuBUKqN_4_bOqGKr3OW7zJs6zZ8_K3CxTZKKQf-XX3mi6TIi2jfUFh9otjDpwd78fF6kL2hgnU5VIc5FdnjUMLXkG_Nm4PZZfj12hEPptgOUnSkcU2j7jzvXGflXCBuHJQAtUPCmfYEcc_-yY32EPuubQoR5ErTIwo89CSf8dLdP68X7Ncm_3E8AN3__RW-rj1mHLpu6z4xLQByXQxoheT3gY8oQeXMLmZaqCIWKdndnF2nBtrjRGuOKec6R975FBH4Jp3t-_pjB8LX1fBgq_0LhIUPxZ3Rmzgo5bwFwVvDOBU5C-ADVVUCCGKhZ3o_IxoZh31yHCTl6rTdujZD7YnYfxq1PpkHhpql-oln2kBxuC51cbm8-wU6zSsWBkhA-OsIahS2q0TSH0YyfJIeXjZy9FrKNZef2-OnxyqM_8GZAWYGkqfwsc6rBLAXibONeKa27YbSVDvjTBMQe7-lFn43gGO8tkIF9ECmwMc9uM5588Oe1PE-5tZLuWmz3uFcYOKVtG2_faF5LMQ67RHsXEab3KC-Ok1O5zzUGLWD1_OUlK45QycMCw55xtkQyrvAGO9iysKAeAvtRaThep22Ryf5FqoWZLBjcBvFOZw6UMfgGd2fmPV2SfaHOYj76X4za41KC5ZcY7_A1iW1QFoN1QLo4Xj0vZQvNESVY1W1ZRXGrWY_9oiGMg7BKGOKv72zqFw-aTr1x517RSi6AEkM4MFsbFfQU56k-GWGv53MEH1OAMQ4UUTTsRw4A5xQ3LYUTQLWj4ij9AEEAaeOGMlMcIjIcHe8wERTt2wM9f2b6ZiQBE1va2wlKrXg6XgaQ8WOHdmJ0mHZi8XIgf2cwQJOfPqkn8KQmxchRCSy9u9_lRHPpi9S1smS7C_eylA5FyYXcM7bjY3UB5oswH9Tx6QXUYVeYNspeLUzd43PTC-VvHztFJYh3iemnSV1VsAlbP8UKq8a8kkVq048Ofs5NxRw3Zk7FRVoFKhoWwKzFafr7JxSsV-nS","cardId":"29153","cardType":"23_77","cardGroupTitle":"ad_jingjia","cardGroupPos":"1649/415","cardPos":"1649/415/29153","cardIdx":"4","itemPos":"1649/415/29153/280621","itemIdx":"4.1","logSourceType":1},{"id":7063907,"resourceType":0,"packageName":"com.ss.android.article.video","name":"西瓜视频","categoryId":5029,"categoryName":"影音播放","versionName":"2.5.4","versionCode":254,"size":9072,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/25/2/110_5c4c2443f97a0b7b850560dcb33ac4cb.apk?yingid=pp_client&packageid=400657868&md5=2b76e41b15f630e315336a592400ac50&minSDK=14&size=9290355&shortMd5=9003604e9b0464ec5d937aeabf9a684e&crc32=1686304720","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/25/9/110_db541c5acabcbf6154ad3f75a38614bf_con.png","downloads":81885536,"updateTime":1527223857096,"versionId":400657868,"appDesc":"西瓜视频，给你新鲜好看！<br>超过 2 亿懂得生活趣味的人，都在用西瓜视频，你也来加入吧！<br>西瓜视频通过人工智能揣摩你的兴趣并完成个性化推荐，帮助每一个人挑选出喜欢的视频，越用它，它越懂你。西瓜视频覆盖千万视频！支持离线缓存、无广告观看，省流量一键看过瘾！<br><br>【看视频无广告，深得人心】<br>\u2028<br>李先生每天过得争分夺秒，一分钟要当两分钟花。如果看个视频你还出广告，他一定会和你拼命。西瓜视频看视频无广告，深得他心。\u2028<br>\u2028<br>【推荐合你意，不要太惊讶】<br>\u2028<br>西瓜视频准确推荐，分秒内就能计算出你的兴趣，见谁懂谁，难怪她这么惊讶 ~ <br><br>【海量视频，新鲜看不停】\u2028<br>\u2028<br>音乐、搞笑、社会、小品、生活、影视、娱乐、呆萌、游戏、原创、开眼... 上千万的短视频内容都汇聚于此，涉猎广泛的冉小溪开心坏了。\u2028<br>\u2028<br>西瓜视频就是这样，逐渐融入每个人的日常。无论男女老少，白雪巴人，西瓜视频总能在海量新鲜的视频内容里，挑选出你喜欢的呈现给你。你也要来一个西瓜吗？\u2028<br>￼<br>\u2028<br>关注我们：<br>西瓜视频帐号/头条号：@西瓜视频<br>微博：@西瓜视频官微\u2028<br>微信：@西瓜视频官号\u2028<br>官网：www.ixigua.com\u2028<br>上传你的视频：creator.ixigua.com\u2028","safeStatus":0,"hotLevel":0,"editorRecommend":"懂得生活趣味的人都在用","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"vurl":"http://huichuan.sm.cn/wdj/show?dlType=huichuan&ast=AJgAAE8DAAAyWRMk-8Miv37Td0kIQCuG32vdFVhRdrFw_r0HLRDDIPwF3SpgmujDBQ7YBXijOY81ktgASCNWE7rBqmycUSHhuBhR34yzNjb__iLdCsNhyuR7eTnxfoGtS3Eil-UKxuPHOby4op6s8geZlfEOXjI0oEoLZYiVRmib_RVmlCzmYDJE90h9lUF30MIGhOyTJLYttKdqAKxJ9Zv0Mzii2xo8H4pyJnYmu3WTLGoyuKlXZLrSMIWMJwXEpu_eSNGJDaQStgVE0kB6DpIB80NRG0xgTsI6uJeqIDF2RgZdv7GkZFju6GHzrku5j30nHVi4jcP4OrkYcKmn7I1RpnxlxPcb_aXHk_pbUs01Xn0TNqLcRd0hJok2_P1kuLys1e9dnJ5V8nR6Ztewslz6O0tLU1J5c2pgbbqjpAzutixi7cIPzD0mE5eKaXPIYilpplmzR30hV3f-bzjeofedieJJRG2PPVTfZMlZOWnk5CX7YhrNad_xurwfDYDEauXdtEqeP7LLi4Syl3z20nKh3gUYYPLR7KASOOwidRtlguBP46zzrxRkiiqcEwELiF7leB5bdhmqxOs7MsC1KNHwoSwURlgwfv3juLU1bmUYO76-_J3207KpY396G9hHEkeNfvUNOCXs1Ft5skhfhO02Hf2EtGYrglc7bdJm-mdwm67Vn-vYy318ABA1RC2VZ6NXxMiWBt9Hm6vlEo2EeT1QI_cuY4UDzWZ07Vk_aqHeZlBPcBEef0DD7atGLXufhgNNLHcHbZ7aPFbO3YcpQOE-q9o2HVH0K-VEzD6sgPcPNV-VN82xds-ZSGye4gdCEIxEKTfiit-Xx8LpwGHDf8qYqhhdEPA0yCcTUewSVH_l6aMVLeTZCNdqSCx2dCCEjJYC3E-6r0VAbALNtT51qZypv2UKiP0bnqz93yxN3cNy0P6g4k0TDSz-elDfRTneYIxWUXbKmxZBrAar43IxMl5ofSUvkvZXXwjLDqC50Od0gGwz8g7Z-n5lAWMZ_QTZcAPJL8cQaKkMpGX-idyQsvkhPmiKRiPIxf-5UWfSaBu30ZEIiDbJ5IoAhormKm5nZum-Ew2EiBAZKyxU_528WKoDCR1nI_vmu9ZPD0-uI2tG3jJumy3n","curl":"http://huichuan.sm.cn/wdj?dlType=huichuan&ast=AJgAAE8DAAAyWRMk-8Miv37Td0kIQCuG32vdFVhRdrFw_r0HLRDDIPwF3SpgmujDBQ7YBXijOY81ktgASCNWE7rBqmycUSHhuBhR34yzNjb__iLdCsNhyuR7eTnxfoGtS3Eil-UKxuPHOby4op6s8geZlfEOXjI0oEoLZYiVRmib_RVmlCzmYDJE90h9lUF30MIGhOyTJLYttKdqAKxJ9Zv0Mzii2xo8H4pyJnYmu3WTLGoyuKlXZLrSMIWMJwXEpu_eSNGJDaQStgVE0kB6DpIB80NRG0xgTsI6uJeqIDF2RgZdv7GkZFju6GHzrku5j30nHVi4jcP4OrkYcKmn7I1RpnxlxPcb_aXHk_pbUs01Xn0TNqLcRd0hJok2_P1kuLys1e9dnJ5V8nR6Ztewslz6O0tLU1J5c2pgbbqjpAzutixi7cIPzD0mE5eKaXPIYilpplmzR30hV3f-bzjeofedieJJRG2PPVTfZMlZOWnk5CX7YhrNad_xurwfDYDEauXdtEqeP7LLi4Syl3z20nKh3gUYYPLR7KASOOwidRtlguBP46zzrxRkiiqcEwELiF7leB5bdhmqxOs7MsC1KNHwoSwURlgwfv3juLU1bmUYO76-_J3207KpY396G9hHEkeNfvUNOCXs1Ft5skhfhO02Hf2EtGYrglc7bdJm-mdwm67Vn-vYy318ABA1RC2VZ6NXxMiWBt9Hm6vlEo2EeT1QI_cuY4UDzWZ07Vk_aqHeZlBPcBEef0DD7atGLXufhgNNLHcHbZ7aPFbO3YcpQOE-q9o2HVH0K-VEzD6sgPcPNV-VN82xds-ZSGye4gdCEIxEKTfiit-Xx8LpwGHDf8qYqhhdEPA0yCcTUewSVH_l6aMVLeTZCNdqSCx2dCCEjJYC3E-6r0VAbALNtT51qZypv2UKiP0bnqz93yxN3cNy0P6g4k0TDSz-elDfRTneYIxWUXbKmxZBrAar43IxMl5ofSUvkvZXXwjLDqC50Od0gGwz8g7Z-n5lAWMZ_QTZcAPJL8cQaKkMpGX-idyQsvkhPmiKRiPIxf-5UWfSaBu30ZEIiDbJ5IoAhormKm5nZum-Ew2EiBAZKyxU_528WKoDCR1nI_vmu9ZPD0-uI2tG3jJumy3n","durl":"http://huichuan.sm.cn/wdj/fd?dlType=huichuan&ast=AJgAAE8DAAAyWRMk-8Miv37Td0kIQCuG32vdFVhRdrFw_r0HLRDDIPwF3SpgmujDBQ7YBXijOY81ktgASCNWE7rBqmycUSHhuBhR34yzNjb__iLdCsNhyuR7eTnxfoGtS3Eil-UKxuPHOby4op6s8geZlfEOXjI0oEoLZYiVRmib_RVmlCzmYDJE90h9lUF30MIGhOyTJLYttKdqAKxJ9Zv0Mzii2xo8H4pyJnYmu3WTLGoyuKlXZLrSMIWMJwXEpu_eSNGJDaQStgVE0kB6DpIB80NRG0xgTsI6uJeqIDF2RgZdv7GkZFju6GHzrku5j30nHVi4jcP4OrkYcKmn7I1RpnxlxPcb_aXHk_pbUs01Xn0TNqLcRd0hJok2_P1kuLys1e9dnJ5V8nR6Ztewslz6O0tLU1J5c2pgbbqjpAzutixi7cIPzD0mE5eKaXPIYilpplmzR30hV3f-bzjeofedieJJRG2PPVTfZMlZOWnk5CX7YhrNad_xurwfDYDEauXdtEqeP7LLi4Syl3z20nKh3gUYYPLR7KASOOwidRtlguBP46zzrxRkiiqcEwELiF7leB5bdhmqxOs7MsC1KNHwoSwURlgwfv3juLU1bmUYO76-_J3207KpY396G9hHEkeNfvUNOCXs1Ft5skhfhO02Hf2EtGYrglc7bdJm-mdwm67Vn-vYy318ABA1RC2VZ6NXxMiWBt9Hm6vlEo2EeT1QI_cuY4UDzWZ07Vk_aqHeZlBPcBEef0DD7atGLXufhgNNLHcHbZ7aPFbO3YcpQOE-q9o2HVH0K-VEzD6sgPcPNV-VN82xds-ZSGye4gdCEIxEKTfiit-Xx8LpwGHDf8qYqhhdEPA0yCcTUewSVH_l6aMVLeTZCNdqSCx2dCCEjJYC3E-6r0VAbALNtT51qZypv2UKiP0bnqz93yxN3cNy0P6g4k0TDSz-elDfRTneYIxWUXbKmxZBrAar43IxMl5ofSUvkvZXXwjLDqC50Od0gGwz8g7Z-n5lAWMZ_QTZcAPJL8cQaKkMpGX-idyQsvkhPmiKRiPIxf-5UWfSaBu30ZEIiDbJ5IoAhormKm5nZum-Ew2EiBAZKyxU_528WKoDCR1nI_vmu9ZPD0-uI2tG3jJumy3n","iurl":"http://huichuan.sm.cn/wdj/install?dlType=huichuan&ast=AJgAAE8DAAAyWRMk-8Miv37Td0kIQCuG32vdFVhRdrFw_r0HLRDDIPwF3SpgmujDBQ7YBXijOY81ktgASCNWE7rBqmycUSHhuBhR34yzNjb__iLdCsNhyuR7eTnxfoGtS3Eil-UKxuPHOby4op6s8geZlfEOXjI0oEoLZYiVRmib_RVmlCzmYDJE90h9lUF30MIGhOyTJLYttKdqAKxJ9Zv0Mzii2xo8H4pyJnYmu3WTLGoyuKlXZLrSMIWMJwXEpu_eSNGJDaQStgVE0kB6DpIB80NRG0xgTsI6uJeqIDF2RgZdv7GkZFju6GHzrku5j30nHVi4jcP4OrkYcKmn7I1RpnxlxPcb_aXHk_pbUs01Xn0TNqLcRd0hJok2_P1kuLys1e9dnJ5V8nR6Ztewslz6O0tLU1J5c2pgbbqjpAzutixi7cIPzD0mE5eKaXPIYilpplmzR30hV3f-bzjeofedieJJRG2PPVTfZMlZOWnk5CX7YhrNad_xurwfDYDEauXdtEqeP7LLi4Syl3z20nKh3gUYYPLR7KASOOwidRtlguBP46zzrxRkiiqcEwELiF7leB5bdhmqxOs7MsC1KNHwoSwURlgwfv3juLU1bmUYO76-_J3207KpY396G9hHEkeNfvUNOCXs1Ft5skhfhO02Hf2EtGYrglc7bdJm-mdwm67Vn-vYy318ABA1RC2VZ6NXxMiWBt9Hm6vlEo2EeT1QI_cuY4UDzWZ07Vk_aqHeZlBPcBEef0DD7atGLXufhgNNLHcHbZ7aPFbO3YcpQOE-q9o2HVH0K-VEzD6sgPcPNV-VN82xds-ZSGye4gdCEIxEKTfiit-Xx8LpwGHDf8qYqhhdEPA0yCcTUewSVH_l6aMVLeTZCNdqSCx2dCCEjJYC3E-6r0VAbALNtT51qZypv2UKiP0bnqz93yxN3cNy0P6g4k0TDSz-elDfRTneYIxWUXbKmxZBrAar43IxMl5ofSUvkvZXXwjLDqC50Od0gGwz8g7Z-n5lAWMZ_QTZcAPJL8cQaKkMpGX-idyQsvkhPmiKRiPIxf-5UWfSaBu30ZEIiDbJ5IoAhormKm5nZum-Ew2EiBAZKyxU_528WKoDCR1nI_vmu9ZPD0-uI2tG3jJumy3n","cardId":"29153","cardType":"23_77","cardGroupTitle":"ad_jingjia","cardGroupPos":"1649/415","cardPos":"1649/415/29153","cardIdx":"4","itemPos":"1649/415/29153/7063907","itemIdx":"4.2","logSourceType":1},{"id":35609,"resourceType":0,"packageName":"com.ss.android.article.news","name":"今日头条","categoryId":5019,"categoryName":"新闻阅读","versionName":"6.7.4","versionCode":674,"size":22645,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/24/6/110_3bbb89c83caec58ab849e592ae8b0126.apk?yingid=pp_client&packageid=200663110&md5=6f2d4a5fc82e2e47eae3bcb0a17c8489&minSDK=14&size=23188918&shortMd5=412a572518df3986f71c53a31f5d5edd&crc32=3814676100","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/24/5/110_f1b004d93034a6c7e819fc8f95313e00_con.png","downloads":131009176,"updateTime":1527135022390,"versionId":200663110,"appDesc":"今日头条，最懂你的信息平台<br>官方推荐精品应用  单用户使用时长超过76分钟<br>近亿网友与你一起在头条！<br><br>热点资讯应有尽有 — 智能算法推荐你感兴趣的信息、无数明星大V在这里跟你互动；<br>人人都是原创作者 — 发布自己的微头条、与千万网友在问答区参与热点讨论；<br>发现生活记录生活 — 有全网精彩无广告短视频，也有草根生活喊麦达人原创小视频；<br>专属领域满足个性 — 分类连载小说漫画超快更新，足球美妆全部覆盖；<br><br>【发布专属微头条】<br>上传发布独家内容，你也可以上头条！<br>超多明星大V入驻，与偶像互动升级<br><br>【新鲜短视频看不停】<br>影视搞笑游戏生活...覆盖全网千万精彩短视频<br>无广告省流量，热点冷门一键看过瘾<br><br>【丰富频道 你要的都在这里】<br>海量小说免费阅读，超清漫画漫迷社区<br>一手体育新闻  热辣赛事点评<br><br>【个性化内容支持收藏】<br>80万+头条号网罗所有精彩资讯，有内容有观点<br>心仪内容一键收藏，历史记录搜索无压力<br><br>@联系头条<br>今日头条官网：toutiao.com<br>头条号自媒体平台：mp.toutiao.com<br>官方合作：BD@toutiao.com<br>任何反馈：kefu@toutiao.com<br>头条招聘：HR@toutiao.com","safeStatus":0,"hotLevel":0,"editorRecommend":"你关心的才是头条","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"vurl":"http://huichuan.sm.cn/wdj/show?dlType=huichuan&ast=AFUAADwDAAAyWRMk-8Miv37Td0kIQCuG32vdFVhRdsdx_r0HLRDDIGq3BnOacuN5PWZG8dVn0G-Vu4E9v6VY1yJ4CQDev4xkXj32hNvUW9GyEt-gtByzbxFP5Nb_G4HCJSicn8UQghNyMG-BeOTeptwPHhlou2YNZYaURA6mTNLjuLB2O7rYWs-qsbY13tOOrvCN4aJg5ELslKwgbn2hz343w92CS_yMyuhHxoaHXQZtV4S1Txrt6VBy_P18lTCcsu9wIeCMemm81SPf-PMVoOzhYSLOtBIJnawHuUVvsThAvFN-Oe_1312yPczCmUpCxYElStHBAm0OXntMXqmvCP3GSC1ApUt-UJzi74Gd_R5NoliZZy_4G27W0WMcw1DEbr38po5hFFeEvxM9g7DBii-a6Pi0vKANw2xd2V2_7u4U6CRZXThZJCxtNeQ9v1K9hc-WnYCCgc2YE0NVsvPIN1RnvWJREArPSoBP6to9GZfyo3aQx_OUMZ4WMkwSIJYwb_W_1TWHxBJ7CNvlI730Ob1H98YAabZjHIRxL5Tlrt2z18xcLGC_7ZnwRMkqHtFNbBs-iamRTODYBaREKqVFHQGpBC3oTZDSQRdm2lfTSwbR0euJWyisGv4b1sm-0CeV7TrVRJALe6NgUYP0pntx1_rqHG-Mwzz0f-dGwONaq1eJxpxQDGoktkqIljR-jU206mSY_aE9zzQU6EIaTIO21bj4GtTLH87Q_YXObufhCTi7QcA2Sz9CZ33sBiKe62BS2zWCVC-7_FHgxQTwTwDVEMIVrkEydw-YmmfINSgDIvKrRry9ukxZ_fgxkxVZYs82HvD1peDlpZfTt5uUyJCIGZIvVf4LwNDygicG90yzjM6jRjNazb8BpNTlqTcMBUPq5uVIQ294zYHrPWKjVZti7RiMIy1rYleEqW658l3fe4oRAJlO8Ci-j6QGMoPEewl9FLigcKTZkuhT-gzEOAr5V4s6DE4GW9MxJs6-5lDnoDi2AiKB7nBo_NoPxdGRavaxoA9MMp4N7tTBPfL27rn5vHnirUX-Euj3IId7X4REV8NA3ZRQAQGjeDj2p430uox-suN-4RiuJ-4_FYm7ohsZT4vOso4:","curl":"http://huichuan.sm.cn/wdj?dlType=huichuan&ast=AFUAADwDAAAyWRMk-8Miv37Td0kIQCuG32vdFVhRdsdx_r0HLRDDIGq3BnOacuN5PWZG8dVn0G-Vu4E9v6VY1yJ4CQDev4xkXj32hNvUW9GyEt-gtByzbxFP5Nb_G4HCJSicn8UQghNyMG-BeOTeptwPHhlou2YNZYaURA6mTNLjuLB2O7rYWs-qsbY13tOOrvCN4aJg5ELslKwgbn2hz343w92CS_yMyuhHxoaHXQZtV4S1Txrt6VBy_P18lTCcsu9wIeCMemm81SPf-PMVoOzhYSLOtBIJnawHuUVvsThAvFN-Oe_1312yPczCmUpCxYElStHBAm0OXntMXqmvCP3GSC1ApUt-UJzi74Gd_R5NoliZZy_4G27W0WMcw1DEbr38po5hFFeEvxM9g7DBii-a6Pi0vKANw2xd2V2_7u4U6CRZXThZJCxtNeQ9v1K9hc-WnYCCgc2YE0NVsvPIN1RnvWJREArPSoBP6to9GZfyo3aQx_OUMZ4WMkwSIJYwb_W_1TWHxBJ7CNvlI730Ob1H98YAabZjHIRxL5Tlrt2z18xcLGC_7ZnwRMkqHtFNbBs-iamRTODYBaREKqVFHQGpBC3oTZDSQRdm2lfTSwbR0euJWyisGv4b1sm-0CeV7TrVRJALe6NgUYP0pntx1_rqHG-Mwzz0f-dGwONaq1eJxpxQDGoktkqIljR-jU206mSY_aE9zzQU6EIaTIO21bj4GtTLH87Q_YXObufhCTi7QcA2Sz9CZ33sBiKe62BS2zWCVC-7_FHgxQTwTwDVEMIVrkEydw-YmmfINSgDIvKrRry9ukxZ_fgxkxVZYs82HvD1peDlpZfTt5uUyJCIGZIvVf4LwNDygicG90yzjM6jRjNazb8BpNTlqTcMBUPq5uVIQ294zYHrPWKjVZti7RiMIy1rYleEqW658l3fe4oRAJlO8Ci-j6QGMoPEewl9FLigcKTZkuhT-gzEOAr5V4s6DE4GW9MxJs6-5lDnoDi2AiKB7nBo_NoPxdGRavaxoA9MMp4N7tTBPfL27rn5vHnirUX-Euj3IId7X4REV8NA3ZRQAQGjeDj2p430uox-suN-4RiuJ-4_FYm7ohsZT4vOso4:","durl":"http://huichuan.sm.cn/wdj/fd?dlType=huichuan&ast=AFUAADwDAAAyWRMk-8Miv37Td0kIQCuG32vdFVhRdsdx_r0HLRDDIGq3BnOacuN5PWZG8dVn0G-Vu4E9v6VY1yJ4CQDev4xkXj32hNvUW9GyEt-gtByzbxFP5Nb_G4HCJSicn8UQghNyMG-BeOTeptwPHhlou2YNZYaURA6mTNLjuLB2O7rYWs-qsbY13tOOrvCN4aJg5ELslKwgbn2hz343w92CS_yMyuhHxoaHXQZtV4S1Txrt6VBy_P18lTCcsu9wIeCMemm81SPf-PMVoOzhYSLOtBIJnawHuUVvsThAvFN-Oe_1312yPczCmUpCxYElStHBAm0OXntMXqmvCP3GSC1ApUt-UJzi74Gd_R5NoliZZy_4G27W0WMcw1DEbr38po5hFFeEvxM9g7DBii-a6Pi0vKANw2xd2V2_7u4U6CRZXThZJCxtNeQ9v1K9hc-WnYCCgc2YE0NVsvPIN1RnvWJREArPSoBP6to9GZfyo3aQx_OUMZ4WMkwSIJYwb_W_1TWHxBJ7CNvlI730Ob1H98YAabZjHIRxL5Tlrt2z18xcLGC_7ZnwRMkqHtFNbBs-iamRTODYBaREKqVFHQGpBC3oTZDSQRdm2lfTSwbR0euJWyisGv4b1sm-0CeV7TrVRJALe6NgUYP0pntx1_rqHG-Mwzz0f-dGwONaq1eJxpxQDGoktkqIljR-jU206mSY_aE9zzQU6EIaTIO21bj4GtTLH87Q_YXObufhCTi7QcA2Sz9CZ33sBiKe62BS2zWCVC-7_FHgxQTwTwDVEMIVrkEydw-YmmfINSgDIvKrRry9ukxZ_fgxkxVZYs82HvD1peDlpZfTt5uUyJCIGZIvVf4LwNDygicG90yzjM6jRjNazb8BpNTlqTcMBUPq5uVIQ294zYHrPWKjVZti7RiMIy1rYleEqW658l3fe4oRAJlO8Ci-j6QGMoPEewl9FLigcKTZkuhT-gzEOAr5V4s6DE4GW9MxJs6-5lDnoDi2AiKB7nBo_NoPxdGRavaxoA9MMp4N7tTBPfL27rn5vHnirUX-Euj3IId7X4REV8NA3ZRQAQGjeDj2p430uox-suN-4RiuJ-4_FYm7ohsZT4vOso4:","iurl":"http://huichuan.sm.cn/wdj/install?dlType=huichuan&ast=AFUAADwDAAAyWRMk-8Miv37Td0kIQCuG32vdFVhRdsdx_r0HLRDDIGq3BnOacuN5PWZG8dVn0G-Vu4E9v6VY1yJ4CQDev4xkXj32hNvUW9GyEt-gtByzbxFP5Nb_G4HCJSicn8UQghNyMG-BeOTeptwPHhlou2YNZYaURA6mTNLjuLB2O7rYWs-qsbY13tOOrvCN4aJg5ELslKwgbn2hz343w92CS_yMyuhHxoaHXQZtV4S1Txrt6VBy_P18lTCcsu9wIeCMemm81SPf-PMVoOzhYSLOtBIJnawHuUVvsThAvFN-Oe_1312yPczCmUpCxYElStHBAm0OXntMXqmvCP3GSC1ApUt-UJzi74Gd_R5NoliZZy_4G27W0WMcw1DEbr38po5hFFeEvxM9g7DBii-a6Pi0vKANw2xd2V2_7u4U6CRZXThZJCxtNeQ9v1K9hc-WnYCCgc2YE0NVsvPIN1RnvWJREArPSoBP6to9GZfyo3aQx_OUMZ4WMkwSIJYwb_W_1TWHxBJ7CNvlI730Ob1H98YAabZjHIRxL5Tlrt2z18xcLGC_7ZnwRMkqHtFNbBs-iamRTODYBaREKqVFHQGpBC3oTZDSQRdm2lfTSwbR0euJWyisGv4b1sm-0CeV7TrVRJALe6NgUYP0pntx1_rqHG-Mwzz0f-dGwONaq1eJxpxQDGoktkqIljR-jU206mSY_aE9zzQU6EIaTIO21bj4GtTLH87Q_YXObufhCTi7QcA2Sz9CZ33sBiKe62BS2zWCVC-7_FHgxQTwTwDVEMIVrkEydw-YmmfINSgDIvKrRry9ukxZ_fgxkxVZYs82HvD1peDlpZfTt5uUyJCIGZIvVf4LwNDygicG90yzjM6jRjNazb8BpNTlqTcMBUPq5uVIQ294zYHrPWKjVZti7RiMIy1rYleEqW658l3fe4oRAJlO8Ci-j6QGMoPEewl9FLigcKTZkuhT-gzEOAr5V4s6DE4GW9MxJs6-5lDnoDi2AiKB7nBo_NoPxdGRavaxoA9MMp4N7tTBPfL27rn5vHnirUX-Euj3IId7X4REV8NA3ZRQAQGjeDj2p430uox-suN-4RiuJ-4_FYm7ohsZT4vOso4:","cardId":"29153","cardType":"23_77","cardGroupTitle":"ad_jingjia","cardGroupPos":"1649/415","cardPos":"1649/415/29153","cardIdx":"4","itemPos":"1649/415/29153/35609","itemIdx":"4.3","logSourceType":1},{"id":6614984,"resourceType":0,"packageName":"com.huajiao","name":"花椒直播","categoryId":5029,"categoryName":"影音播放","versionName":"6.2.9.1023","versionCode":6291023,"size":91301,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/11/2/110_a64c7f93529b1eba4e8305590aac5805.apk?yingid=pp_client&packageid=100408337&md5=e0cd20c96ab79387b2b6e41a3c983333&minSDK=15&size=93493001&shortMd5=452ed8aa27cd7a97d4e2ed3df65365c3&crc32=3155439963&pkgType=1&data=dGVzdFRhZz1uZXdgY3BUeXBlPTIxYGJpZD0zMDEyNzY4OWBkS2V5PTcxNTJlMDcyZThlZTBhYWUzMWM0ZmZmZTRjYjA3NzliYGlLZXk9ZDY1OWQwMmIwZTc1ZDcxYWMzNWJhNTZlZDkwYjE2MjY","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/11/4/110_d604a7cf5b00da91167126e0d984b096_con.png","downloads":20554770,"updateTime":1526022951000,"versionId":100408337,"appDesc":"【明星直播，全民互动】：范冰冰，张继科、吴亦凡等明星和网红都在玩儿的直播软件。 <br>【 直播开黑】：颜值最高的直播平台，美女声优，24小时不间断，教你精妙走位，吊打王者，carry全场，更有一系列大波福利来临！<br>【户外直播，精彩纷呈】：各式各样的吃喝玩乐，猎奇有趣的街头互动，尖叫连连的试胆探险，好看好玩的景点风光~总有一款是你的最爱~                    【特色功能Q&A】<br>Q：“直播功能哪家强”？<br>A：“花椒直播超强的【美颜+萌颜】功能，开播一秒变女神！”<br>Q：“为什么花椒直播的礼物总是让人迷之想送？”<br>A：“酷炫的星座专属礼物，全站公告‘你送了一个梦堡’！”<br>Q：“一瞬间的忧伤寂寞怎么办？”<br>A:  “花椒直播【附近的人】，分分钟治愈你。”<br>Q：“身在城乡结合部，却想有环游世界的感觉怎么办？”<br>A：“【魔法背景】几十种直播间背景随意切换，说你在太空都有人信。”<br><br>【特别说明】<br>人脸识别技术，人脸美颜技术和抠图技术由360 AI提供<br><br>【联系我们】<br>若有任何关于花椒体验及功能上的反馈建议，请添加官方QQ群：519226125<br>官方微信：huajiao_1","hotLevel":0,"editorRecommend":"每天瓜分6万大奖","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"cardId":"29153","cardType":"23_77","cardGroupTitle":"ad_jingjia","cardGroupPos":"1649/415","cardPos":"1649/415/29153","cardIdx":"4","itemPos":"1649/415/29153/6614984","itemIdx":"4.4","logSourceType":0}],"listOrien":0,"showOrder":0,"id":15885,"name":"每日好应用","adType":55,"tpData":"10129","listorder":0,"positionNo":0,"resourceType":13,"exData":{"uiStyle":0}}]},"showCtr":true},{"id":32635,"cardId":"32635","cardType":"23_77","cardGroupTitle":"lianyunyouxi_dashuju","cardGroupPos":"1649/581","cardPos":"1649/581/32635","cardIdx":"5","name":"95 后必玩推荐","adType":23,"tpData":"9875","bgColor":"","content":"","intervalTime":0,"imageNum":0,"listorder":1,"positionNo":1,"resourceType":13,"exDataStr":"[]","exData":{"id":9875,"recommendType":77,"appSetStyle":-1,"titleStyle":-1,"title":"95 后必玩推荐","showMore":1,"content":[{"desc":"","apps":[{"id":7688158,"resourceType":1,"packageName":"com.tencent.tmgp.speedmobile","name":"QQ飞车","categoryId":6003,"categoryName":"跑酷竞速","versionName":"1.4.1.10182","versionCode":1040110182,"size":824302,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/04/26/5/109_47272c38fb385467798631a0a02d7a17.apk?yingid=pp_client&packageid=700407925&md5=293e3019d0ac3767d2de6e15709e827f&minSDK=9&size=844085657&shortMd5=9c42d893b4e611e240a878b210fd0120&crc32=2962886175","iconUrl":"http://android-artworks.25pp.com/fs08/2018/04/26/7/109_c9dc3c7849f917f6f8e3ccc1136395ec_con.png","downloads":28411604,"updateTime":1524756011000,"versionId":700407925,"appDesc":"《QQ飞车手游》是腾讯公司基于《QQ飞车》端游开发的首款3D赛车竞速休闲手机游戏，于2017年4月20日在UP2017腾讯互动娱乐年度发布会上正式对外亮相。由端游原班人马倾情打造，在玩法上将会传承端游的操作手感，原汁原味还原各种中高端操作技巧，保证其操作深度；初步上线时也将会有竞速赛、道具赛、排位赛、剧情模式等端游经典模式玩法；在美术风格上，则会采用最新的渲染方式，为玩家带来耳目一新的视觉体验！","hotLevel":0,"editorRecommend":"开车的速度要快，姿势要帅","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":1,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":2,"cornerMarkColor":"ff4e00","cornerMarkLabel":"礼包","installed":false,"cardId":"32635","cardType":"23_77","cardGroupTitle":"lianyunyouxi_dashuju","cardGroupPos":"1649/581","cardPos":"1649/581/32635","cardIdx":"5","itemPos":"1649/581/32635/7688158","itemIdx":"5.1","logSourceType":0},{"id":7450340,"resourceType":1,"packageName":"com.miHoYo.bh3.uc","name":"崩坏3","categoryId":6009,"categoryName":"网络游戏","versionName":"2.3.1","versionCode":131,"size":384442,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/10/3/109_636f02bf21cce813dc1691981850a8c8.apk?yingid=pp_client&packageid=500420565&md5=2dae7cbf96bc19168a822c1b634c7d99&minSDK=14&size=393669235&shortMd5=38f669cdb861e5974c15a6a89cdc4ccb&crc32=2721039571","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/16/10/109_40fd1842001ce326a715bf88acedb134_con.png","downloads":7896810,"updateTime":1525932276000,"versionId":500420565,"appDesc":"【夜幕降临 新女武神参战】\r\nS级卡莲「第六夜想曲」、A级符华「白夜执事」华丽登场，在夜幕中守护心中的正义！第八章主线「女王降临」开启，琪亚娜化身第二律者降临战场，请舰长务必做好一级战斗准备！\r\n\r\n【次世代动作手游出击】\r\n3D全视角卡通渲染、无限可能的分支连招、主机游戏的超强打击感，带来无限沉浸的关卡剧情及战斗体验！加入《崩坏3》，与女武神并肩作战吧！\r\n休伯利安号迎接舰长登舰，启航！","hotLevel":0,"editorRecommend":"夜幕降临，S级怪盗卡参战！偷走你的心","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":1,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":2,"cornerMarkColor":"ff4e00","cornerMarkLabel":"礼包","installed":false,"cardId":"32635","cardType":"23_77","cardGroupTitle":"lianyunyouxi_dashuju","cardGroupPos":"1649/581","cardPos":"1649/581/32635","cardIdx":"5","itemPos":"1649/581/32635/7450340","itemIdx":"5.2","logSourceType":0},{"id":7049813,"resourceType":1,"packageName":"com.netease.onmyoji.uc","name":"阴阳师","categoryId":6006,"categoryName":"角色扮演","versionName":"1.0.40","versionCode":40,"size":925885,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/18/1/109_afa8bcc9f0c073c17c613708f5feb121.apk?yingid=pp_client&packageid=600674194&md5=dba96aab461fc5fed013c383b1b97e47&minSDK=9&size=948106366&shortMd5=de24f34fbd8d7b7b895e4d0ae7d8c04d&crc32=775604360","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/18/5/109_fc10547aeaf0fb1867254ccd0cf3b4d4_con.png","downloads":16232460,"updateTime":1526638855000,"versionId":600674194,"appDesc":"网易和风匠心巨制，开启唯美奇幻之旅\r\n网易2016年研发的3D RPG半即时回合制卡牌手游「阴阳师」取材于阴阳师晴明的经典故事，延续了和风物语的一贯优美与神秘。\r\n故事围绕着主人公晴明展开，在平安时代的京都，风光旖旎，却暗流涌动——魑魅魍魉伺机而动，阳界秩序岌岌可危。幸而，世间存在着一群被称之为「阴阳师」的异能者——也就是玩家将扮演的「游戏主角」。","hotLevel":0,"editorRecommend":"网易和风匠心巨制，开启唯美奇幻之旅","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":1,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":2,"cornerMarkColor":"ff4e00","cornerMarkLabel":"礼包","installed":false,"cardId":"32635","cardType":"23_77","cardGroupTitle":"lianyunyouxi_dashuju","cardGroupPos":"1649/581","cardPos":"1649/581/32635","cardIdx":"5","itemPos":"1649/581/32635/7049813","itemIdx":"5.3","logSourceType":0},{"id":7615406,"resourceType":1,"packageName":"com.yinlibo01.ttop.aligames","name":"苍之纪元","categoryId":6001,"categoryName":"休闲益智","versionName":"1.0.181","versionCode":212,"size":243596,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/24/8/109_2f98e4e042e7b111d49430a4ee04631b.apk?yingid=pp_client&packageid=700419953&md5=d7f8406b7968068ab0ebb3452b283d8c&minSDK=9&size=249443202&shortMd5=255edb539c28d0759b3dbf3032a6ff3d&crc32=3873373666","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/24/11/109_196901ab0c54c10d85d01025b38c30dc_con.png","downloads":585990,"updateTime":1527133589000,"versionId":700419953,"appDesc":"《苍之纪元》是一款异世界冒险题材的泛二次元休闲游戏，以异世界冒险为主线，与游戏中各具特色的英雄们缔结羁绊，编排成各种各样的阵容，集养成，休闲，探索为一体，享受即时战斗的快感。不同的阵容搭配带来不同的感官享受，每位参与冒险的玩家都能够得到不一样的游戏体验！国内知名音乐制作人监制，国内外知名画师参与绘画，海外知名声优花泽香菜、悠木碧、雨宫天、杉田智和献声，带给你身临其境的二次元体验！","hotLevel":0,"editorRecommend":"“花泽香菜”携殿堂级声优参上づ╭","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":1,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":2,"cornerMarkColor":"ff4e00","cornerMarkLabel":"礼包","installed":false,"cardId":"32635","cardType":"23_77","cardGroupTitle":"lianyunyouxi_dashuju","cardGroupPos":"1649/581","cardPos":"1649/581/32635","cardIdx":"5","itemPos":"1649/581/32635/7615406","itemIdx":"5.4","logSourceType":0}],"listOrien":0,"showOrder":0,"id":31637,"name":"95 后必玩推荐","adType":55,"tpData":"9679","listorder":0,"positionNo":0,"resourceType":13,"exData":{"uiStyle":0}}]},"showCtr":true,"abTestNames":["choice_home_card_sort"]},{"id":40399,"cardId":"40399","cardType":"23_35","cardGroupTitle":"tuijianji_six","cardGroupPos":"1649/419","cardPos":"1649/419/40399","cardIdx":"6","name":"本周推荐","adType":23,"tpData":"16485","bgColor":"","content":"","intervalTime":0,"imageNum":0,"listorder":1,"positionNo":1,"resourceType":13,"exDataStr":"[]","exData":{"id":16485,"recommendType":35,"appSetStyle":-1,"titleStyle":-1,"title":"本周推荐","showMore":1,"content":[{"desc":"本周推荐","apps":[{"id":7698726,"resourceType":1,"packageName":"com.konstructors.wayout","name":"出路","categoryId":6003,"categoryName":"跑酷竞速","versionName":"1.1.1","versionCode":8,"size":50876,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/04/25/1/109_abbe228b793828c6849effe8585b3bf6.apk?yingid=pp_client&packageid=700401820&md5=56dd7a6120f1f56e96ea5cf8654a4ec8&minSDK=16&size=52097348&shortMd5=54bdf28006923777ede073cb969fbc2a&crc32=1512420427","iconUrl":"http://android-artworks.25pp.com/fs08/2018/01/24/6/109_462c2aedc56922f24b188ca373779fb8_con.png","downloads":799,"updateTime":1524649958000,"versionId":700401820,"appDesc":"基于关灯游戏操作，Wayout (出路) 是一个棘手的益智游戏，其中的动作组合是非常重要的。 游戏的目的是关闭网格，即使用最少的移动次数，把所有的方块变成白色。通过完善每个拼图，测试你的大脑极限。让你的理智引导你，走过这场冥想的、放松的，但又具有挑战性的旅程。 特点： - 新的和经典的关灯游戏机制组合 - 60+手工打造的关卡 - 6章，分别有自己的一套独特的游戏机制。 - 独特的图像风格，以及周围环境配乐，营造了美丽惬意的氛围","hotLevel":0,"editorRecommend":"基于关灯游戏操作，Wayout (出路) 是一个棘手的益智游戏，其中的动作组合是非常重要的。 游戏的","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"appOpExtInfo":{"misc":{"requireID":"1"}},"cardId":"40399","cardType":"23_35","cardGroupTitle":"tuijianji_six","cardGroupPos":"1649/419","cardPos":"1649/419/40399","cardIdx":"6","itemPos":"1649/419/40399/7698726","itemIdx":"6.1","logSourceType":0},{"id":7745198,"resourceType":1,"packageName":"com.martian.hxqy.uc","name":"密室逃脱绝境系列3画仙奇缘","categoryId":6001,"categoryName":"休闲益智","versionName":"3.18.41","versionCode":3018041,"size":71079,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/03/9/109_c0f6cb529e4c6770dde6ddb96c19c036.apk?yingid=pp_client&packageid=700415498&md5=cb75aec511b8ad3bd9a2d36f07919941&minSDK=8&size=72785809&shortMd5=b21c472641fa649d4d4d065fbea3f877&crc32=1084747592","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/04/0/109_61d129ec7e89c61f43994a66cd3f7c8c_con.png","downloads":5670,"updateTime":1525362538000,"versionId":700415498,"appDesc":"密室逃脱之画仙奇缘游戏软件是一款集冒险、解谜、益智，回合制战斗，密室逃脱为一体的手机游戏，游戏包含了十余个画面精美，拥有浓郁中国风特色的场景，包含了华容道，找茬，连连看等经典的益智类小游戏，充满各种中国传统文化元素。玩家在游戏中需要从不同的场景中寻找有用的线索，解开一个个谜题，完成各种小游戏，推进故事线的发展，体验中国传统文化中琴棋书画的魅力，见证四大发明的智慧。","hotLevel":0,"editorRecommend":"密室逃脱古典中国风解谜手游","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"cardId":"40399","cardType":"23_35","cardGroupTitle":"tuijianji_six","cardGroupPos":"1649/419","cardPos":"1649/419/40399","cardIdx":"6","itemPos":"1649/419/40399/7745198","itemIdx":"6.2","logSourceType":0},{"id":7706843,"resourceType":1,"packageName":"com.crazyant.ProjZombie.uc","name":"英雄就是我","categoryId":6004,"categoryName":"动作冒险","versionName":"1.0.3","versionCode":13,"size":143474,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/04/28/9/109_663b173bd869130090b112701934567a.apk?yingid=pp_client&packageid=400649723&md5=7074e1f158c4331e284aae21585e5148&minSDK=14&size=146917559&shortMd5=8e82966d13cc89f30e0513ec4ba1accb&crc32=3800932858","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/28/7/109_7635efc17cbe0e8a1ed9762718949450_con.png","downloads":67470,"updateTime":1524919675000,"versionId":400649723,"appDesc":"《英雄就是我》是一款横版2D像素动作格斗游戏。讲述了一位身世离奇的“英雄”，以自述的方式回忆当年辉煌的过去，但殊不知这一切的背后还有另外的故事……\r\n这个游戏诞生有多维度的因素：有自己童年时对现实世界的一些偏差认知，也有早已断层的模糊记忆，当然还有对格斗游戏的挚爱。","hotLevel":0,"editorRecommend":"横版2D像素动作格斗游戏","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":4,"cornerMarkColor":"3C94F6","cornerMarkLabel":"付费","installed":false,"cardId":"40399","cardType":"23_35","cardGroupTitle":"tuijianji_six","cardGroupPos":"1649/419","cardPos":"1649/419/40399","cardIdx":"6","itemPos":"1649/419/40399/7706843","itemIdx":"6.3","logSourceType":0},{"id":7748312,"resourceType":1,"packageName":"com.xd.kk.wyddbkk.uc","name":"我一点都不可口","categoryId":6001,"categoryName":"休闲益智","versionName":"1.1.15","versionCode":15,"size":59280,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/28/10/109_7c817801a5697ee8d344df8e79e5afcb.apk?yingid=pp_client&packageid=100412205&md5=6df79ec0a464735bc52112e968481705&minSDK=16&size=60702987&shortMd5=d1911f8b57b02dbd20869c44507c2d7c&crc32=1966349805","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/28/6/109_490cf92bfa7903335947f7ad05dfb1b4_con.png","downloads":343,"updateTime":1527472706000,"versionId":100412205,"appDesc":"《我一点都不可口》是一款关卡式模拟经营游戏，玩家需要协助餐厅中的服务生，服务好每一位来到餐厅的顾客。\r\n在游戏中，你可以为小鸡们换上逗趣可爱的服饰，可以为餐厅招募各式各样的厨师，同时还有各种离奇搞怪的事件，不同风格的餐厅任你挑战，让你对他爱不释手~ (ฅ´ω`ฅ) 耐~爪爪给我~~","hotLevel":0,"editorRecommend":"95%的萌+ 5%的鬼畜","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"appOpExtInfo":{"misc":{"requireID":"1"}},"cardId":"40399","cardType":"23_35","cardGroupTitle":"tuijianji_six","cardGroupPos":"1649/419","cardPos":"1649/419/40399","cardIdx":"6","itemPos":"1649/419/40399/7748312","itemIdx":"6.4","logSourceType":0},{"id":7753668,"resourceType":1,"packageName":"com.mousecity.faraway3","name":"遥远寻踪3：北极逃生","categoryId":6001,"categoryName":"休闲益智","versionName":"1.0.75","versionCode":75,"size":100354,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/25/8/109_5ebf8507c4c5a0b4ddeeec9a6cb4b0c2.apk?yingid=pp_client&packageid=500424327&md5=01a8e26c5f7ad7ea572117dd4a64d367&minSDK=16&size=102762507&shortMd5=981550e47b73882a784a534d43b96b6e&crc32=3199641114","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/25/1/109_905c83e33f57f2641085c44aabbeebe1_con.png","downloads":735,"updateTime":1527227932000,"versionId":500424327,"appDesc":"《遥远寻踪3：北极逃生 Faraway 3: Arctic Escape》中的所有新建庙宇，充满了思维弯曲的谜题和令人兴奋全新探索地。这个房间逃脱游戏将挑战您的解谜能力。续集其中一个最好的逃脱游戏，超过一百万玩家！房间逃脱益智游戏，完全挑战您的一年，迷住您，并提供数小时惊人的移动游戏娱乐。 引人入胜的故事 从您的旅程开始以来，这已经有好几年了，正在寻找您失去的父亲。在解开了大量令人难以置信的谜题之后，您进入的最后一个门户将您带到一个全新的冬季大陆，那里布满了有待探索的冰冷新寺庙。您似乎越来越接近寻找您的父亲，而您一直在发现他留下的笔记。 观察环境、收集物品、操纵设备并解决困惑难题以逃离庙宇迷宫。 复杂谜题 探索18个新的寺庙，挤满了逃脱谜题，探索一个3d世界，从您开始的那一刻起就会吸引您。转头，查看并探索头脑急转弯谜题和奇妙的装置。 沉浸式世界 放松环境配乐和最易导航的3D世界，您会发现在逃脱游戏中，有大量的待发现的秘密。 神秘的持续 您可以找到更多父亲失踪日记的页面，也许您会解开您家人的过去。这是一款逃脱游戏，可以让您保持长时间的工作状态！ 新功能 在游戏相机中，您可以拍摄快照并将其保存以备后用。 免费试用 在您决定购买剩余水平并体验整个《遥远寻踪3：北极逃生》的故事之前，享受9个免费逃脱水平，让您印象深刻。 超级宽屏支持 这款益智游戏在新款18：9手机上看起来很漂亮，同时也在平板设备上闪耀。享受惊人而令人惊叹的精致图形，看起来很精致。 通过《遥远寻踪3：北极逃生》进入房间逃脱游戏和谜题的全新迷人世界！","hotLevel":0,"editorRecommend":"《遥远寻踪3：北极逃生 Faraway 3: Arctic Escape》中的所有新建庙宇，充满了思","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"appOpExtInfo":{"misc":{"requireID":"1"}},"cardId":"40399","cardType":"23_35","cardGroupTitle":"tuijianji_six","cardGroupPos":"1649/419","cardPos":"1649/419/40399","cardIdx":"6","itemPos":"1649/419/40399/7753668","itemIdx":"6.5","logSourceType":0},{"id":7753425,"resourceType":1,"packageName":"com.drunkbytes.tikitaka.uc","name":"金球制胜","categoryId":6005,"categoryName":"体育竞技","versionName":"1.3.7","versionCode":52310,"size":69026,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/24/1/109_f631061714c1497f20f9cb5b7a50831d.apk?yingid=pp_client&packageid=200663343&md5=16a00b2b9e885c0ff581c7da92a3e0c9&minSDK=9&size=70682997&shortMd5=81acbbdb23c075a47c352922e6d6e47a&crc32=1680573613","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/24/7/109_2f54c6bbdaf8b8e4dabbedf30ea5242d_con.png","downloads":468,"updateTime":1527156014000,"versionId":200663343,"appDesc":"《金球制胜》一款简单好玩的体育类闯关游戏，简单易上手，练习判断力和反应能力。游戏过程中，玩家需要控制队员，点击屏幕通过传球进行闯关，同时还需要预判队友的走位。游戏目前一共有70关，每一关难度越往上越增加。通过当前关卡后，才可以解锁下一关卡难度。通关结束后除了获得金币奖励外，达成相应条件还会获得奖杯。每个关卡最多可以获得3个奖杯，但是关卡不同，奖杯获得条件也会不同。","hotLevel":0,"editorRecommend":"极速前进，绝不后退","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"cardId":"40399","cardType":"23_35","cardGroupTitle":"tuijianji_six","cardGroupPos":"1649/419","cardPos":"1649/419/40399","cardIdx":"6","itemPos":"1649/419/40399/7753425","itemIdx":"6.6","logSourceType":0}],"listOrien":0,"showOrder":0,"id":244153,"name":"本周推荐","adType":55,"tpData":"11923","imageUrl":"http://serverfile.ac.uc.cn/recommendset/0_1526269306517_615.jpg","listorder":0,"positionNo":0,"resourceType":13}]},"showCtr":true},{"id":32649,"cardId":"32649","cardType":"23_77","cardGroupTitle":"lianyunyouxi_dashuju","cardGroupPos":"1649/581","cardPos":"1649/581/32649","cardIdx":"7","name":"大厂出品：用心创造快乐","adType":23,"tpData":"9887","bgColor":"","content":"","intervalTime":0,"imageNum":0,"listorder":2,"positionNo":2,"resourceType":13,"exDataStr":"[]","exData":{"id":9887,"recommendType":77,"appSetStyle":-1,"titleStyle":-1,"title":"大厂出品：用心创造快乐","showMore":1,"content":[{"desc":"","apps":[{"id":6648837,"resourceType":1,"packageName":"com.tencent.tmgp.sgame","name":"王者荣耀","categoryId":6009,"categoryName":"网络游戏","versionName":"1.34.1.11","versionCode":34011107,"size":892892,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/02/3/1_335490787c6342bb7e4b273a1ba13386.apk?yingid=pp_client&packageid=600668785&md5=781c9408e35889dcf01f8c6c3e610ed5&minSDK=16&size=914322133&shortMd5=88bbf552bffd29d115f7a19ade3190a0&crc32=3335786760","iconUrl":"http://android-artworks.25pp.com/fs08/2017/02/08/2/1_0e90a2882c9c9e090ee34c76f4ec9efb_con.png","downloads":419806848,"updateTime":1525244880000,"versionId":600668785,"appDesc":"《王者荣耀》是腾讯第一5V5英雄公平对战手游，于10月28日开启不限号测试！5V5王者峡谷（含迷雾模式）、5V5深渊大乱斗、以及3V3、1V1等多样模式一键体验，热血竞技尽享快感！海量英雄随心选择，精妙配合默契作战！10秒实时跨区匹配，与好友组队登顶最强王者！操作简单易上手，一血、五杀、超神，极致还原经典体验！实力操作公平对战，回归MOBA初心！","hotLevel":0,"editorRecommend":"全民MOBA手游","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"appOpExtInfo":{"misc":{"requireID":"1"}},"cardId":"32649","cardType":"23_77","cardGroupTitle":"lianyunyouxi_dashuju","cardGroupPos":"1649/581","cardPos":"1649/581/32649","cardIdx":"7","itemPos":"1649/581/32649/6648837","itemIdx":"7.1","logSourceType":0},{"id":6671203,"resourceType":1,"packageName":"com.tencent.tmgp.cf","name":"穿越火线：枪战王者","categoryId":6009,"categoryName":"网络游戏","versionName":"1.0.30.220","versionCode":220,"size":794410,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/04/27/6/109_a3734d168d0b31f249f55ff2c1a887a6.apk?yingid=pp_client&packageid=400648335&md5=daebff99aafb00d9d290f3cc2f0c7f9b&minSDK=9&size=813476569&shortMd5=2d309964c7b5ee082af6bffa419ff34e&crc32=3116939297","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/02/1/109_b3816c42a6b5fab8a4a67da945323e36_con.png","downloads":113646840,"updateTime":1524801736000,"versionId":400648335,"appDesc":"《穿越火线：枪战王者》是一款由韩国Smilegate研发商及腾讯游戏三年的倾力打造的CF正版FPS手游，完美传承了PC端的品质和玩法，同时还针对手机端的操作特点，进行了针对枪战玩家习惯的定制化适配与优化，让玩家能够在手机上真正享受枪战游戏带来的乐趣和快感，将三亿鼠标的枪战梦想延续到了手机上。","hotLevel":0,"editorRecommend":"穿越火线，延续枪战经典","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"appOpExtInfo":{"misc":{"requireID":"1"}},"cardId":"32649","cardType":"23_77","cardGroupTitle":"lianyunyouxi_dashuju","cardGroupPos":"1649/581","cardPos":"1649/581/32649","cardIdx":"7","itemPos":"1649/581/32649/6671203","itemIdx":"7.2","logSourceType":0},{"id":7606744,"resourceType":1,"packageName":"com.tencent.tmgp.ddtank","name":"弹弹堂","categoryId":6002,"categoryName":"飞行射击","versionName":"1.8.10","versionCode":90009,"size":454169,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/01/15/2/109_d858a78ff889827c3c7e9e20aa9ede0e.apk?yingid=pp_client&packageid=100347555&md5=46568a10b2505c70f391e388d71a0f4c&minSDK=11&size=465069889&shortMd5=a6f419b057c4730cf5cc76994fc3fc03&crc32=1430514586","iconUrl":"http://android-artworks.25pp.com/fs08/2018/04/26/1/109_edc1080ba158266fb16306e8a6fc6c1d_con.png","downloads":3852915,"updateTime":1515993029000,"versionId":100347555,"appDesc":"《弹弹堂》腾讯首款多人对战弹射手游，由第七大道页游原班人马倾情打造的正版IP大作！\r\n趣味性极高的弹道抛射对战，通过不同道具的战术搭配，根据抛物线原理发射炮弹来命中对手或破坏地形，最终击败对手，取得胜利！\r\n【双弹射操作模式】\r\n拉线/蓄力双操作模式，轻松上手，精准发射！\r\n【多道具组合策略乐趣】\r\n多道具，变套路，让对手心惊弹颤！\r\n【多元化社交体系】\r\n挚友作战；夫妻浪漫，一起互动不孤单！","hotLevel":0,"editorRecommend":"腾讯首款多人对战弹射手游","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"appOpExtInfo":{"misc":{"requireID":"1"}},"cardId":"32649","cardType":"23_77","cardGroupTitle":"lianyunyouxi_dashuju","cardGroupPos":"1649/581","cardPos":"1649/581/32649","cardIdx":"7","itemPos":"1649/581/32649/7606744","itemIdx":"7.3","logSourceType":0},{"id":7624518,"resourceType":1,"packageName":"com.tencent.tmgp.xymobile","name":"轩辕传奇","categoryId":6006,"categoryName":"角色扮演","versionName":"1.0.245.3","versionCode":2835,"size":1130999,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/04/26/5/109_3100d001c0eaa08a1ec54c09b26f2f03.apk?yingid=pp_client&packageid=700405440&md5=5e6aa48a9711aae17016b2893ff37110&minSDK=17&size=1158143496&shortMd5=b87d6ba295869478b9be4ca877375e49&crc32=2891822017","iconUrl":"http://android-artworks.25pp.com/fs08/2018/04/26/3/109_08e513ae7b32b8b7791c0c0f8ab38863_con.png","downloads":2085300,"updateTime":1524691413000,"versionId":700405440,"appDesc":"《轩辕传奇手游》是由腾讯自研的一款以山海经神话为世界背景的手游，延续端游经典PVP玩法，与上古勇士结成血盟，百人同屏，实时对战争夺城主之位，给你畅快的打击快感！更有炫酷的灵宠系统、弑神玩法等你体验。《轩辕传奇手游》，给你一个突破想象的远古神话战场！","hotLevel":0,"editorRecommend":"山海经神话战斗手游","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"cardId":"32649","cardType":"23_77","cardGroupTitle":"lianyunyouxi_dashuju","cardGroupPos":"1649/581","cardPos":"1649/581/32649","cardIdx":"7","itemPos":"1649/581/32649/7624518","itemIdx":"7.4","logSourceType":0}],"listOrien":0,"showOrder":0,"id":31649,"name":"大厂出品：用心创造快乐","adType":55,"tpData":"9705","listorder":0,"positionNo":0,"resourceType":13,"exData":{"uiStyle":0}}]},"showCtr":true,"abTestNames":["choice_home_card_sort"]},{"id":29159,"cardId":"29159","cardType":"23_77","cardGroupTitle":"ad_jingjia","cardGroupPos":"1649/415","cardPos":"1649/415/29159","cardIdx":"8","name":"附近的人都在用","adType":23,"tpData":"7417","bgColor":"","content":"","intervalTime":0,"imageNum":0,"listorder":2,"positionNo":2,"resourceType":13,"exDataStr":"[]","exData":{"id":7417,"recommendType":77,"appSetStyle":-1,"titleStyle":-1,"title":"附近的人都在用","showMore":1,"content":[{"desc":"","apps":[{"id":492643,"resourceType":0,"packageName":"com.mfw.roadbook","name":"马蜂窝旅游","categoryId":5021,"categoryName":"旅游出行","versionName":"8.1.8","versionCode":555,"size":53013,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/25/6/1_e883ffba2e2f2149e02b3fdf457be4a2.apk?yingid=pp_client&packageid=400658131&md5=b5afd4e00a85cc88ddafa996760488f0&minSDK=19&size=54285876&shortMd5=8c1c3422bb7b69b5713160f0fbb04085&crc32=1201015331","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/21/5/110_1a3b06626d9a0fbf2a9ac021ab2f96d3_con.png","downloads":7656300,"updateTime":1527243086000,"versionId":400658131,"appDesc":"◆ 黄轩代言：新用户下载注册，即送新人红包<br>◆ 官方推荐：1亿旅游用户信赖，好评率98.6%<br>◆ 旅游攻略：目的地/自由行等攻略，靠谱实用<br>◆ 用户分享：游记/问答/点评/图片，真实可信<br>◆ 商城特卖：酒店,机票,自由行,签证,当地游,门票,租车,WiFi等自由行产品一应俱全，品质高服务好，用户满意度98.2%","hotLevel":0,"editorRecommend":"8000万旅游用户信赖的全球旅行神器！","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"awardBasicInfo":{"id":2897587,"issue":330,"title":"你的每一次旅程，都独一无二","converImage":"http://android-imgs.25pp.com/fs08/2018/03/14/6/ef2b75c4b915a51ef3717be2d2850177.jpg"},"installed":false,"cardId":"29159","cardType":"23_77","cardGroupTitle":"ad_jingjia","cardGroupPos":"1649/415","cardPos":"1649/415/29159","cardIdx":"8","itemPos":"1649/415/29159/492643","itemIdx":"8.1","logSourceType":0},{"id":6551319,"resourceType":0,"packageName":"com.pingan.papd","name":"平安好医生","categoryId":5028,"categoryName":"健康运动","versionName":"5.13.0","versionCode":51300,"size":77531,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/14/5/110_73f20f73d917432e74bae412f097fd6d.apk?yingid=pp_client&packageid=800663235&md5=bf20bcf4df70e5735ad7082391cb384c&minSDK=16&size=79392739&shortMd5=505d76c34583eac62aba20ffc5a630b7&crc32=1263059131&pkgType=1&data=dGVzdFRhZz1uZXdgY3BUeXBlPTIxYGJpZD0zMDY5OTM4OGBkS2V5PWQzYmMyMmMzYTc3Zjg2NTAzYzBkODRjODJmNmYyYjNhYGlLZXk9NzI1NjI0YjJiNTU5ODQ0ZjU5YjBiYWZiYWJmZGMxZjU","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/15/8/110_f206f948628e12349627bd938ab4c295_con.png","downloads":39996224,"updateTime":1526294119000,"versionId":800663235,"appDesc":"平安好医生拥有近千名全职医学团队，在线开设妇产科、儿科、皮肤科、男科、骨科等22个科室；合作医院覆盖30多个省直辖市，3000余家医院，每天帮助近40万人解决问诊、挂号难题。<br> <br>【专业医疗服务】<br>医生咨询――7*24小时在线提供健康咨询，支持图文/电话/视频多种沟通方式。远程会诊，全流程优质服务让就医更便捷<br>专家问诊――汇聚全国几千名三甲名医，顶级专家线上坐诊，图文问诊不限次交流，专家本人亲自与患者深度沟通，提供更权威的诊疗建议<br>在线挂号――在线一键预约名医，覆盖北京中日友好医院、上海长海医院、中山大学孙逸仙纪念医院、武汉大学人民医院等千余家三甲医院知名专家<br>预约体检――全国1100家体检中心在线预约、在线报告解读、体检套餐个人享受团体价优惠购买， 赠送专家医生咨询<br>口腔/眼科护理――拜博、瑞尔、欢乐口腔等全国500家高端连锁牙科诊所，用户可享有洁牙＋抛光专属优惠；数百款全球知名品牌近视眼镜及镜架，最新在线虚拟试戴体验，享实体店优惠价格<br>【一站式购药体验】<br>在线购药――常用药、专科药一应俱全，专业药师实时提供用户用药咨询，在线开设电子处方，省钱省心<br>健康商城――保健品、药妆、运动用品、体检卡、洁牙卡等五万多款商品送货上门，平安质保，假一赔十，帮用户一站式购健康<br>闪电购药――全国14城市支持1小时闪电送药服务，超时赔付。更有b2c药品支持全国闪电发货。<br>【随身健康锦囊】<br>步步夺金――每月近2000万用户通过步步夺金走出健康好身材，还可兑换自己心仪商品<br>健康头条――云集专业医生、养生达人、健康大V，每天个性化推送千条美食、减肥、育儿、情感、两性等健康资讯，粉碎健康谣言<br>健康直播――健康达人、专家名医常驻直播间，面对面与用户话健康，更有千元私教课放送<br>健康管家――掌心上的健身房，方寸间的中医养生堂，为您定制健康调理课程，随时随地享受1对1服务<br>健康工具――计步器、经期管理、健康评测等健康工具，全方位帮助用户做好健康管理","hotLevel":0,"editorRecommend":"平安好医生 自聘全职医生，免费看病秒回复","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"cardId":"29159","cardType":"23_77","cardGroupTitle":"ad_jingjia","cardGroupPos":"1649/415","cardPos":"1649/415/29159","cardIdx":"8","itemPos":"1649/415/29159/6551319","itemIdx":"8.2","logSourceType":0},{"id":287355,"resourceType":0,"packageName":"com.homelink.android","name":"链家","categoryId":5020,"categoryName":"生活休闲","versionName":"8.4.9","versionCode":8049,"size":44377,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/08/9/110_9b20511b49404364badd9533fd032707.apk?yingid=pp_client&packageid=400652515&md5=608166ea7e068340da733023900ece41&minSDK=15&size=45442301&shortMd5=e9258d58a2e0ad9c06b3801439930e5a&crc32=1875130932&pkgType=1&data=dGVzdFRhZz1uZXdgY3BUeXBlPTIxYGJpZD0zMDUyOTQ1OGBkS2V5PTg2MmNmNWFlMTI4YTMyM2EwNTlkMWUzOWYzZmYwMzUzYGlLZXk9ZDkyNjAxN2IwNmJlZWI5NDU0NzViODc0ODQ2MGZlNTY","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/18/9/110_ebc19d898f5ac197e81e46b4f936a91a_con.png","downloads":8708040,"updateTime":1525761614000,"versionId":400652515,"appDesc":"*二手房租房买房新房，卖房找房子查房价的专业房产应用<br>*拥有二手房、新房、租房、海外房产、旅居、卖房、房产百科等众多板块<br>*提供全真新的房源动态、透明的房产行情、高效的找房工具、一键式房屋委托等特色功能<br>*真实房源数据库7000万套房屋信息，链家承诺真实在售，假一赔百<br>*房租月付告别押1付3，简单快捷无压力租房，链家租房专享<br>*覆盖全国30个重点城市，8000多家全国门市店旗下经纪人超过14万名协助买房租房卖房服务<br>产品亮点<br>【实时房源展示】丰富的二手房、新房、海外房产、旅居房产、租房等房产信息<br>【地图找房】基于城区、商圈、小区为用户提供地图找房服务，用户可以高效地找到符合自己位置需求的房子<br>【智能房屋估价】基于链家房屋数据和历史成交数据开发的智能估价系统，为买家、卖家提供房屋估价服务<br>【房价频道】为用户提供地区房价市场行情，基于链家成交数据统计，为用户提供当月参考均价、价格走势及供需趋势等信息，帮助用户更好地了解房产动态<br>【焦点模块】减价房专区，本周热看房，新上精选房，满五税少房等买房专题信息","hotLevel":0,"editorRecommend":"买卖租房找房软件","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"appOpExtInfo":{"tag":{"name":"优质找房"}},"cardId":"29159","cardType":"23_77","cardGroupTitle":"ad_jingjia","cardGroupPos":"1649/415","cardPos":"1649/415/29159","cardIdx":"8","itemPos":"1649/415/29159/287355","itemIdx":"8.3","logSourceType":0},{"id":330421,"resourceType":0,"packageName":"com.sohu.sohuvideo","name":"搜狐视频","categoryId":5029,"categoryName":"影音播放","versionName":"6.9.7","versionCode":6970,"size":36814,"downloadUrl":"http://android-apps.25pp.com/fs08/2018/05/15/7/110_d0ca158165d5c325922ea4c804b5ca27.apk?yingid=pp_client&packageid=600672864&md5=ad0619036c2655cd45215ee9e48a0daf&minSDK=14&size=37698500&shortMd5=2ee56e178aa83d5280f42135327b5101&crc32=1042974514&pkgType=1&data=dGVzdFRhZz1uZXdgY3BUeXBlPTIxYGJpZD0zMDAwNTk0OWBkS2V5PWVjNTA1OGRlOTRmYmRhMzA4MTgzZTljZDZhMGEyYzAwYGlLZXk9YWEwMmViZmFmYzM4YTBmODE0YmNhMjcwNjVlZjgzMmI","iconUrl":"http://android-artworks.25pp.com/fs08/2018/05/15/3/110_24b666219d299895a822745845f710a7_con.png","downloads":195979056,"updateTime":1526460561000,"versionId":600672864,"appDesc":"“知识英雄”答题活动全新火爆上线，每天瓜分百万现金。文学题历史题科技题，趣味横生。邀请好友一起玩，每场都有复活机会。奖金直接到账，提现0手续费，快来参与~<br>《动物系恋人啊》：钟欣潼贺军翔浪漫“练爱”；<br>《送一百位女孩回家》：记录100位女生在北京的生活；<br>《破产姐妹6》：姐妹俩存款清零遇真命；<br>《魔都》：周冬雨花式求爱之旅；<br>《海上嫁女记》：新都市女强人的生存手册；<br>《南方有乔木》：陈伟霆情陷白百何秦海璐；\t<br>《谈判官》：杨幂黄子韬甜蜜互怼；<br>《新万家灯火》：杜海涛本色出演呆萌保安；<br>《一路繁花相送》：钟汉良、江疏影演绎纯爱100%；<br>《魔卡少女樱 透明牌篇》：时隔20年，经典漫画回归；<br>《无法拥抱的你2》回归，甜宠升级悬疑来袭；<br>《继承者计划》：王彦霖穷小子变卧底上演无间道；<br>《寻梦环游记》：超高口碑治愈大作，温暖人心；<br>《浒门客栈》：汇聚武林再起歪传；<br>《器灵2》：彭昱畅打响燃魂之战！<br>《拜见宫主大人》：反套路武侠热血喜剧，致敬经典游戏《天龙八部》；<br>《推理笔记》：张子枫、陈都灵、侯明昊实力断奇案；<br>《端脑》：完美还原有妖气经典科幻漫画，烧脑来袭；<br><br>【搜狐视频，正在热播】<br>搜狐出品必精品：亲爱的王子大人、贴身校花、法医秦明、；<br>狐小狐强推综艺：周六夜现场43季、爱情保卫战、我为喜剧狂4、一周好莱坞；<br>视频搞笑自媒体：咸鱼来了、一刻talks、暴走大事件、嘿科技酷玩、星座奇葩事；<br>频道热播电视剧：择天记、楚乔传、我的继父是偶像、步步惊心、人民的名义；<br>正版美剧抢先看：越狱、破产姐妹、老友记、老妈、生活大爆炸；<br>在家惬意看电影：从你的全世界路过、奇幻森林、海洋奇缘、太空旅客；<br>热门动漫看不停：小猪佩奇、爆笑虫子、倒霉熊、辛普森一家人；<br>播遍精彩日韩剧：心里的声音、孤独的美食家、夜行书生、扑通扑通love；<br><br>【软件特点】<br>热门综艺，高清美剧，日韩动漫，美女直播，自媒体搞笑，只在搜狐视频；<br>优酷、爱奇艺、腾讯、乐视、PPTV、PPS等热门剧集应有尽有；<br>精品自制剧，搜狐出品，必属精品<br>新鲜有趣自媒体，原创吐槽涨姿势；<br>热点频道，观全球、看现场；<br>预约精彩内容，从此再不错过<br>关注官方账号获取热门视频资讯、参与活动赢取福利噢~：<br>官方QQ粉丝群：435505340<br>官方微信：搜狐视频移动客户端sohutvapp<br>官方微博：搜狐视频移动客户端","hotLevel":0,"editorRecommend":"全网聚合影视资源，720P画质超清体验","searchCount":0,"yrank":0,"dbyrank":0,"risingrate":0,"giftFlag":0,"isSignificant":0,"listorder":0,"isRecentRise":false,"cornerMark":0,"installed":false,"cardId":"29159","cardType":"23_77","cardGroupTitle":"ad_jingjia","cardGroupPos":"1649/415","cardPos":"1649/415/29159","cardIdx":"8","itemPos":"1649/415/29159/330421","itemIdx":"8.4","logSourceType":0}],"listOrien":0,"showOrder":0,"id":15891,"name":"附近的人都在用","adType":55,"tpData":"10145","listorder":0,"positionNo":0,"resourceType":13,"exData":{"uiStyle":0}}]},"showCtr":true}],"nextOffset":8},"id":"-6945858250408900019","state":{"code":2000000,"msg":"Ok","tips":""},"ex":{"abtest":{"choice_home_card_sort_soft":[{"experimentName":"choice_home_card_sort_soft","engagementName":"PPREC_REC1"}],"choice_home_card_sort":[{"experimentName":"choice_home_card_sort","engagementName":"PPREC_REC1"}]}}}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('list', _vm._l((_vm.listData.data.content), function(item) {
    return _c('cell', {
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [(item.cardType === '23_63') ? _c('slider', {
      staticClass: ["slider"],
      attrs: {
        "interval": "4000",
        "autoPlay": "true"
      }
    }, _vm._l((item.exData.content), function(image) {
      return _c('div', {
        staticClass: ["frame"]
      }, [_c('image', {
        staticClass: ["image"],
        attrs: {
          "resize": "cover",
          "src": image.imageUrl
        },
        on: {
          "click": function($event) {
            _vm.onBannerClick(image)
          }
        }
      })])
    })) : _vm._e(), (item.cardType === '23_75') ? _c('div', [_c('horizontal3Card', {
      attrs: {
        "cards": item.exData.content
      }
    })], 1) : _vm._e(), (item.cardType === '23_77') ? _c('div', [_c('horizontal4App', {
      attrs: {
        "download": _vm.download,
        "appItem": item.exData.content[0].apps,
        "title": item.exData.content[0].name
      }
    })], 1) : _vm._e(), (item.cardType === '23_35') ? _c('div', [_c('horizontalScrollCard', {
      attrs: {
        "appItem": item.exData.content[0].apps,
        "bgUrl": item.exData.content[0].imageUrl,
        "title": item.exData.content[0].name
      }
    })], 1) : _vm._e()])
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })
/******/ ]);