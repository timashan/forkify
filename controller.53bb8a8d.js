// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4e14bf6bf4c630cb0c4fc1fc7a96224b":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "53bb8a8d21f21174cd35c7a058a23683";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"ebf185b1fe3ce8eccf95010af6b899b5":[function(require,module,exports) {
require('./bundle-manifest').register(JSON.parse("{\"cd35c7a058a23683\":\"controller.53bb8a8d.js\",\"55fe3d6fb4c0191e\":\"icons.1875eb90.svg\"}"));
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"ba8df6b71e73837c465d69bebde6e64d":[function(require,module,exports) {
"use strict";

var mapping = {};

function register(pairs) {
  var keys = Object.keys(pairs);

  for (var i = 0; i < keys.length; i++) {
    mapping[keys[i]] = pairs[keys[i]];
  }
}

function resolve(id) {
  var resolved = mapping[id];

  if (resolved == null) {
    throw new Error('Could not resolve bundle with id ' + id);
  }

  return resolved;
}

module.exports.register = register;
module.exports.resolve = resolve;
},{}],"175e469a7ea7db1c8c0744d04372621f":[function(require,module,exports) {
"use strict";

require("core-js/modules/web.immediate.js");

var model = _interopRequireWildcard(require("./model.js"));

var _bookmarksView = _interopRequireDefault(require("./views/bookmarksView.js"));

var _paginationView = _interopRequireDefault(require("./views/paginationView.js"));

var _recipeView = _interopRequireDefault(require("./views/recipeView.js"));

var _resultsView = _interopRequireDefault(require("./views/resultsView.js"));

var _searchView = _interopRequireDefault(require("./views/searchView.js"));

var _uploadRecipe = _interopRequireDefault(require("./views/uploadRecipe.js"));

var _regeneratorRuntime = require("regenerator-runtime");

var _config = require("./config.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const controlRecipe = async function () {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    _resultsView.default.update(model.getPagination());

    _bookmarksView.default.update(model.state.bookmarks);

    _recipeView.default.renderSpinner();

    await model.loadRecipe(hash);

    _recipeView.default.render(model.state.recipe);
  } catch (err) {
    console.error(err);

    _recipeView.default.renderError();
  }
};

const controlSearch = async function (query) {
  try {
    _resultsView.default.renderSpinner();

    await model.searchResults(query);

    _resultsView.default.render(model.getPagination());

    _paginationView.default.render(model.state.search);
  } catch (err) {
    _resultsView.default.renderError(err.message);
  }
};

const controlPagination = function (id) {
  _resultsView.default.render(model.getPagination(id));

  _paginationView.default.render(model.state.search);
};

const controlServings = function (serveTo) {
  model.adjustServings(serveTo);

  _recipeView.default.update(model.state.recipe);
};

const controlBookmarks = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark();else model.removeBookmark();
  model.persitBookmarks();

  _recipeView.default.update(model.state.recipe);

  _bookmarksView.default.render(model.state.bookmarks);
};

const controlLoadBookmarks = function () {
  _bookmarksView.default.render(model.state.bookmarks);
};

const controlUpload = async function (data) {
  try {
    _uploadRecipe.default.renderSpinner();

    await model.uploadRecipe(data);

    _uploadRecipe.default.renderMessage();

    window.location.hash = model.state.recipe.id;
    setTimeout(() => _uploadRecipe.default.toggleModal(), _config.MODAL_SEC * 1000);

    _bookmarksView.default.render(model.state.bookmarks);

    model.persitBookmarks();
  } catch (err) {
    _uploadRecipe.default.renderError(err.message);
  }
};

const init = function () {
  _recipeView.default.addHandlerLoad(controlRecipe);

  _bookmarksView.default.addHandlerLoad(controlLoadBookmarks);

  _recipeView.default.addHandlerServings(controlServings);

  _recipeView.default.addHandlerBookmark(controlBookmarks);

  _searchView.default.addEventHandlerSearch(controlSearch);

  _paginationView.default.addHandlerPagination(controlPagination);

  _uploadRecipe.default.addHandlerupload(controlUpload);
};

init();
},{"core-js/modules/web.immediate.js":"140df4f8e97a45c53c66fead1f5a9e92","./model.js":"aabf248f40f7693ef84a0cb99f385d1f","./views/bookmarksView.js":"7ed9311e216aa789713f70ebeec3ed40","./views/paginationView.js":"d2063f3e7de2e4cdacfcb5eb6479db05","./views/recipeView.js":"bcae1aced0301b01ccacb3e6f7dfede8","./views/resultsView.js":"eacdbc0d50ee3d2819f3ee59366c2773","./views/searchView.js":"c5d792f7cac03ef65de30cc0fbb2cae7","./views/uploadRecipe.js":"6859a113216d26d12319d972bf2b430e","regenerator-runtime":"e155e0d3930b156f86c48e8d05522b16","./config.js":"09212d541c5c40ff2bd93475a904f8de"}],"140df4f8e97a45c53c66fead1f5a9e92":[function(require,module,exports) {
var $ = require('../internals/export');

var global = require('../internals/global');

var task = require('../internals/task');

var FORCED = !global.setImmediate || !global.clearImmediate; // http://w3c.github.io/setImmediate/

$({
  global: true,
  bind: true,
  enumerable: true,
  forced: FORCED
}, {
  // `setImmediate` method
  // http://w3c.github.io/setImmediate/#si-setImmediate
  setImmediate: task.set,
  // `clearImmediate` method
  // http://w3c.github.io/setImmediate/#si-clearImmediate
  clearImmediate: task.clear
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/task":"dd47ece3e1296f193ccefcf3056d1754"}],"10044f24ecae4059b4af184e71d3fba2":[function(require,module,exports) {
var global = require('../internals/global');

var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var redefine = require('../internals/redefine');

var setGlobal = require('../internals/set-global');

var copyConstructorProperties = require('../internals/copy-constructor-properties');

var isForced = require('../internals/is-forced');
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/set-global":"7e47fd3b4d01808069dad42c38d45146","../internals/copy-constructor-properties":"df952df9fa85293fe01bbdf9f7116b1b","../internals/is-forced":"700278f8e2cb4c21784f4e50866ce0e4"}],"7e78823454e7f795898745d93279f917":[function(require,module,exports) {
var global = arguments[3];

var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();
},{}],"5e181b7e7dcb1bb2de0a726b7af1e93d":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var call = require('../internals/function-call');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPropertyKey = require('../internals/to-property-key');
var hasOwn = require('../internals/has-own-property');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/object-property-is-enumerable":"6d666488e852af6845747bbd2705cc05","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/to-property-key":"df2b61336906907f777029fe90c882a8","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/ie8-dom-define":"e03ae13f7b17b2e21331d728bd059d1a"}],"7e006cebe93fc4773e87d3146a8fa81b":[function(require,module,exports) {
var fails = require('../internals/fails');

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"e16fc2ec92bf0d6254ffef14ea12ad77":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],"74736a18012731e2548e8322d30daf97":[function(require,module,exports) {
var call = Function.prototype.call;

module.exports = call.bind ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

},{}],"6d666488e852af6845747bbd2705cc05":[function(require,module,exports) {
'use strict';
var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

},{}],"8c5551ce5a79ddcd7162c3e3c8f33c9a":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"debf68affb1e9f1283fa252d49c32ceb":[function(require,module,exports) {
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":"35ae890303b620d792cd5faa73776178","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37"}],"35ae890303b620d792cd5faa73776178":[function(require,module,exports) {
var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var fails = require('../internals/fails');

var classof = require('../internals/classof-raw');

var Object = global.Object;
var split = uncurryThis(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/classof-raw":"901e5a25291bac244011feea921975b2"}],"b9577e436bf35f351d6949937f43e4a6":[function(require,module,exports) {
var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = bind && bind.bind(call, call);

module.exports = bind ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};

},{}],"901e5a25291bac244011feea921975b2":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"5617d8f084e26c58afcbde9a0982cf37":[function(require,module,exports) {
var global = require('../internals/global');

var TypeError = global.TypeError; // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"df2b61336906907f777029fe90c882a8":[function(require,module,exports) {
var toPrimitive = require('../internals/to-primitive');
var isSymbol = require('../internals/is-symbol');

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

},{"../internals/to-primitive":"2a7f05f0f9119d3b88a770acfa30cc7b","../internals/is-symbol":"7500e07108c47e5d25bda62049b8b4ba"}],"2a7f05f0f9119d3b88a770acfa30cc7b":[function(require,module,exports) {
var global = require('../internals/global');

var call = require('../internals/function-call');

var isObject = require('../internals/is-object');

var isSymbol = require('../internals/is-symbol');

var getMethod = require('../internals/get-method');

var ordinaryToPrimitive = require('../internals/ordinary-to-primitive');

var wellKnownSymbol = require('../internals/well-known-symbol');

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/is-object":"03244e745134af366d66b74456891052","../internals/is-symbol":"7500e07108c47e5d25bda62049b8b4ba","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/ordinary-to-primitive":"beb7e03593f40bc8230218c946b07a98","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"03244e745134af366d66b74456891052":[function(require,module,exports) {
var isCallable = require('../internals/is-callable');

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

},{"../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f"}],"305f89aa9a013f46af3c2284b8a3ce4f":[function(require,module,exports) {
// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};

},{}],"7500e07108c47e5d25bda62049b8b4ba":[function(require,module,exports) {
var global = require('../internals/global');

var getBuiltIn = require('../internals/get-built-in');

var isCallable = require('../internals/is-callable');

var isPrototypeOf = require('../internals/object-is-prototype-of');

var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var Object = global.Object;
module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/use-symbol-as-uid":"ea1988735f852716e8c2b0bf1a7f981c"}],"a8e7e15d3af5a0a555019aebcf7ed164":[function(require,module,exports) {
var global = require('../internals/global');

var isCallable = require('../internals/is-callable');

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f"}],"544f373cb6f2cefc1ac40f5370c50e9d":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');

module.exports = uncurryThis({}.isPrototypeOf);

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"ea1988735f852716e8c2b0bf1a7f981c":[function(require,module,exports) {
/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = require('../internals/native-symbol');

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

},{"../internals/native-symbol":"f4c6561c5780f812466dd472171f0916"}],"f4c6561c5780f812466dd472171f0916":[function(require,module,exports) {
/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = require('../internals/engine-v8-version');
var fails = require('../internals/fails');

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

},{"../internals/engine-v8-version":"e23493e3b068d06b425cfae337547b80","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"e23493e3b068d06b425cfae337547b80":[function(require,module,exports) {
var global = require('../internals/global');

var userAgent = require('../internals/engine-user-agent');

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us

  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
} // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0


if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828"}],"143c26fec04440461ecc4dae3ad13828":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('navigator', 'userAgent') || '';

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164"}],"5375a7fbf3e5e64eea2416cbbad034a2":[function(require,module,exports) {
var aCallable = require('../internals/a-callable');

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};

},{"../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660"}],"d4f749998260ddb7816916a3fe6d4660":[function(require,module,exports) {
var global = require('../internals/global');

var isCallable = require('../internals/is-callable');

var tryToString = require('../internals/try-to-string');

var TypeError = global.TypeError; // `Assert: IsCallable(argument) is true`

module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/try-to-string":"3fb606768f23a6e9175aba0e8f4c8e20"}],"3fb606768f23a6e9175aba0e8f4c8e20":[function(require,module,exports) {
var global = require('../internals/global');

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"beb7e03593f40bc8230218c946b07a98":[function(require,module,exports) {
var global = require('../internals/global');

var call = require('../internals/function-call');

var isCallable = require('../internals/is-callable');

var isObject = require('../internals/is-object');

var TypeError = global.TypeError; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/is-object":"03244e745134af366d66b74456891052"}],"df9ad61e8404f948b528f2ef2becebe4":[function(require,module,exports) {
var global = require('../internals/global');

var shared = require('../internals/shared');

var hasOwn = require('../internals/has-own-property');

var uid = require('../internals/uid');

var NATIVE_SYMBOL = require('../internals/native-symbol');

var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;

    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }

  return WellKnownSymbolsStore[name];
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/shared":"1950ed6cf8f0dece2a998d60590e9098","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/uid":"d5b7e7679d9dac163ab327cbf9508501","../internals/native-symbol":"f4c6561c5780f812466dd472171f0916","../internals/use-symbol-as-uid":"ea1988735f852716e8c2b0bf1a7f981c"}],"1950ed6cf8f0dece2a998d60590e9098":[function(require,module,exports) {
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.20.2',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2022 Denis Pushkarev (zloirock.ru)'
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/shared-store":"050f18cf9a95404c13e77ce244078f47"}],"f767c4b71b5cfe3ee6c1a7e54bdcafa0":[function(require,module,exports) {
module.exports = false;

},{}],"050f18cf9a95404c13e77ce244078f47":[function(require,module,exports) {
var global = require('../internals/global');

var setGlobal = require('../internals/set-global');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/set-global":"7e47fd3b4d01808069dad42c38d45146"}],"7e47fd3b4d01808069dad42c38d45146":[function(require,module,exports) {
var global = require('../internals/global'); // eslint-disable-next-line es/no-object-defineproperty -- safe


var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global[key] = value;
  }

  return value;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"d97bfcc83949e538357d288583678586":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var toObject = require('../internals/to-object');

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba"}],"2633fa4da95065e00ff87cc7cbdd56ba":[function(require,module,exports) {
var global = require('../internals/global');

var requireObjectCoercible = require('../internals/require-object-coercible');

var Object = global.Object; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37"}],"d5b7e7679d9dac163ab327cbf9508501":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"e03ae13f7b17b2e21331d728bd059d1a":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/document-create-element":"cbe47a0c6cb67b97db834ad53049114a"}],"cbe47a0c6cb67b97db834ad53049114a":[function(require,module,exports) {
var global = require('../internals/global');

var isObject = require('../internals/is-object');

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-object":"03244e745134af366d66b74456891052"}],"b52adb17d2cebacfac251681882f0a33":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a"}],"645ef963c1e312a12b44589911036a7f":[function(require,module,exports) {
var global = require('../internals/global');

var DESCRIPTORS = require('../internals/descriptors');

var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug');

var anObject = require('../internals/an-object');

var toPropertyKey = require('../internals/to-property-key');

var TypeError = global.TypeError; // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable'; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);

  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);

    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }

  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/ie8-dom-define":"e03ae13f7b17b2e21331d728bd059d1a","../internals/v8-prototype-define-bug":"a678e0bae4e73cf403d7e7fa4baa92b0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-property-key":"df2b61336906907f777029fe90c882a8"}],"a678e0bae4e73cf403d7e7fa4baa92b0":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"4f20fc1a2160760f9e7961d272520cbd":[function(require,module,exports) {
var global = require('../internals/global');

var isObject = require('../internals/is-object');

var String = global.String;
var TypeError = global.TypeError; // `Assert: Type(argument) is Object`

module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-object":"03244e745134af366d66b74456891052"}],"b8f156ba0e16ecf7371c0d9dbd0a7d60":[function(require,module,exports) {
var global = require('../internals/global');

var isCallable = require('../internals/is-callable');

var hasOwn = require('../internals/has-own-property');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var setGlobal = require('../internals/set-global');

var inspectSource = require('../internals/inspect-source');

var InternalStateModule = require('../internals/internal-state');

var CONFIGURABLE_FUNCTION_NAME = require('../internals/function-name').CONFIGURABLE;

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;

  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }

    if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
      createNonEnumerableProperty(value, 'name', name);
    }

    state = enforceInternalState(value);

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }

  if (O === global) {
    if (simple) O[key] = value;else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/set-global":"7e47fd3b4d01808069dad42c38d45146","../internals/inspect-source":"2632e39e653b5d5a3bae68e9954b90e4","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/function-name":"8c9a0dc6f151e22aaeb5f0e18e363d7d"}],"2632e39e653b5d5a3bae68e9954b90e4":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var isCallable = require('../internals/is-callable');
var store = require('../internals/shared-store');

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/shared-store":"050f18cf9a95404c13e77ce244078f47"}],"8b9f5ed7c6f8b05b4cd6ee1eefa801c1":[function(require,module,exports) {
var NATIVE_WEAK_MAP = require('../internals/native-weak-map');

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var isObject = require('../internals/is-object');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var hasOwn = require('../internals/has-own-property');

var shared = require('../internals/shared-store');

var sharedKey = require('../internals/shared-key');

var hiddenKeys = require('../internals/hidden-keys');

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);

  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget(store, it) || {};
  };

  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };

  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};
},{"../internals/native-weak-map":"3633a06fd667b2a3966200ce5e2edda9","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/is-object":"03244e745134af366d66b74456891052","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/shared-store":"050f18cf9a95404c13e77ce244078f47","../internals/shared-key":"18fb64363b0383efc58d7addc88469cd","../internals/hidden-keys":"7cf9eee6c00d9cc7018f7817cf84e3d6"}],"3633a06fd667b2a3966200ce5e2edda9":[function(require,module,exports) {
var global = require('../internals/global');

var isCallable = require('../internals/is-callable');

var inspectSource = require('../internals/inspect-source');

var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/inspect-source":"2632e39e653b5d5a3bae68e9954b90e4"}],"18fb64363b0383efc58d7addc88469cd":[function(require,module,exports) {
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":"1950ed6cf8f0dece2a998d60590e9098","../internals/uid":"d5b7e7679d9dac163ab327cbf9508501"}],"7cf9eee6c00d9cc7018f7817cf84e3d6":[function(require,module,exports) {
module.exports = {};

},{}],"8c9a0dc6f151e22aaeb5f0e18e363d7d":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var hasOwn = require('../internals/has-own-property');

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/has-own-property":"d97bfcc83949e538357d288583678586"}],"df952df9fa85293fe01bbdf9f7116b1b":[function(require,module,exports) {
var hasOwn = require('../internals/has-own-property');
var ownKeys = require('../internals/own-keys');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

},{"../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/own-keys":"a99313addb30af59e8e5785ab390671c","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f"}],"a99313addb30af59e8e5785ab390671c":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/object-get-own-property-names":"b422be4dea2e1243d9a0803066cc2d3d","../internals/object-get-own-property-symbols":"f759fc76793903b9cadc1e3a84780ff9","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"b422be4dea2e1243d9a0803066cc2d3d":[function(require,module,exports) {
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/object-keys-internal":"87cfa515865c83e03f632cbb3fb5fffb","../internals/enum-bug-keys":"f973a6d08ba70476eedabcaf4b58c5fb"}],"87cfa515865c83e03f632cbb3fb5fffb":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var hasOwn = require('../internals/has-own-property');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/array-includes":"8d0989f06759b3b2c526a5860656b2fc","../internals/hidden-keys":"7cf9eee6c00d9cc7018f7817cf84e3d6"}],"8d0989f06759b3b2c526a5860656b2fc":[function(require,module,exports) {
var toIndexedObject = require('../internals/to-indexed-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var lengthOfArrayLike = require('../internals/length-of-array-like');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/to-absolute-index":"ff996ac5a229620b351a78c404035460","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666"}],"ff996ac5a229620b351a78c404035460":[function(require,module,exports) {
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f"}],"25e1ba8089f537c8bc0aca5bea74579f":[function(require,module,exports) {
var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};

},{}],"e316973a6f76533d644cd1ab97e51666":[function(require,module,exports) {
var toLength = require('../internals/to-length');

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};

},{"../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f"}],"68c0420762f5f4704115d4fb34e0ae7f":[function(require,module,exports) {
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f"}],"f973a6d08ba70476eedabcaf4b58c5fb":[function(require,module,exports) {
// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

},{}],"f759fc76793903b9cadc1e3a84780ff9":[function(require,module,exports) {
// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

},{}],"700278f8e2cb4c21784f4e50866ce0e4":[function(require,module,exports) {
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f"}],"dd47ece3e1296f193ccefcf3056d1754":[function(require,module,exports) {
var global = require('../internals/global');

var apply = require('../internals/function-apply');

var bind = require('../internals/function-bind-context');

var isCallable = require('../internals/is-callable');

var hasOwn = require('../internals/has-own-property');

var fails = require('../internals/fails');

var html = require('../internals/html');

var arraySlice = require('../internals/array-slice');

var createElement = require('../internals/document-create-element');

var IS_IOS = require('../internals/engine-is-ios');

var IS_NODE = require('../internals/engine-is-node');

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) {
  /* empty */
}

var run = function (id) {
  if (hasOwn(queue, id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), location.protocol + '//' + location.host);
}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = arraySlice(arguments, 1);

    queue[++counter] = function () {
      apply(isCallable(fn) ? fn : Function(fn), undefined, args);
    };

    defer(counter);
    return counter;
  };

  clear = function clearImmediate(id) {
    delete queue[id];
  }; // Node.js 0.8-


  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    }; // Sphere (JS game engine) Dispatch API

  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    }; // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624

  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && isCallable(global.postMessage) && !global.importScripts && location && location.protocol !== 'file:' && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false); // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    }; // Rest old browsers

  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/html":"1918dab06b404ee3e52f081d798c1688","../internals/array-slice":"d58518bc0d77fd7d4bbb2d854257bf40","../internals/document-create-element":"cbe47a0c6cb67b97db834ad53049114a","../internals/engine-is-ios":"3156eb661c8c8e66a6d95c3b2d979fb4","../internals/engine-is-node":"42c67226e3ca045b9c35647f16133bfa"}],"a59096d8f45a668c44fc59d4e30bb557":[function(require,module,exports) {
var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (bind ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});

},{}],"f9e6dc73b4a152f549e8299150ac260e":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : bind ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660"}],"1918dab06b404ee3e52f081d798c1688":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164"}],"d58518bc0d77fd7d4bbb2d854257bf40":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');

module.exports = uncurryThis([].slice);

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"3156eb661c8c8e66a6d95c3b2d979fb4":[function(require,module,exports) {
var userAgent = require('../internals/engine-user-agent');

module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);

},{"../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828"}],"42c67226e3ca045b9c35647f16133bfa":[function(require,module,exports) {
var classof = require('../internals/classof-raw');

var global = require('../internals/global');

module.exports = classof(global.process) == 'process';
},{"../internals/classof-raw":"901e5a25291bac244011feea921975b2","../internals/global":"7e78823454e7f795898745d93279f917"}],"aabf248f40f7693ef84a0cb99f385d1f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadRecipe = exports.state = exports.searchResults = exports.retriveBookmarks = exports.removeBookmark = exports.persitBookmarks = exports.loadRecipe = exports.getPagination = exports.adjustServings = exports.addBookmark = void 0;

var _regeneratorRuntime = require("regenerator-runtime");

var _config = require("./config.js");

var _helper = require("./helper.js");

const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: _config.RESULTS_PER_PAGE
  },
  bookmarks: []
};
exports.state = state;

const createRecipeObject = function (data) {
  const {
    recipe
  } = data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    imageUrl: recipe.image_url,
    sourceUrl: recipe.source_url,
    ingredients: recipe.ingredients,
    bookmarked: state.bookmarks.some(rec => rec.id === recipe.id) ? true : false,
    ...(recipe.key && {
      key: recipe.key
    })
  };
};

const loadRecipe = async function (id) {
  const data = await (0, _helper.AJAX)(`${_config.API_URL}${id}?key=${_config.KEY}`);
  state.recipe = createRecipeObject(data);
};

exports.loadRecipe = loadRecipe;

const searchResults = async function (query) {
  try {
    state.search.query = query;
    let {
      recipes
    } = await (0, _helper.AJAX)(`${_config.API_URL}?search=${query}&key=${_config.KEY}`);
    if (recipes.length === 0) throw Error;
    recipes = recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        imageUrl: rec.image_url,
        ...(rec.key && {
          key: rec.key
        })
      };
    });
    state.search.results = recipes;
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

exports.searchResults = searchResults;

const adjustServings = function (serveTo) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * serveTo / state.recipe.servings;
  });
  state.recipe.servings = serveTo;
};

exports.adjustServings = adjustServings;

const getPagination = function () {
  let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  state.search.page = page;
  return state.search.results.slice((page - 1) * 10, page * 10);
};

exports.getPagination = getPagination;

const addBookmark = function () {
  state.recipe.bookmarked = true;
  state.bookmarks.push(state.recipe);
};

exports.addBookmark = addBookmark;

const removeBookmark = function () {
  state.recipe.bookmarked = false;
  const index = state.bookmarks.findIndex(rec => rec.id === state.recipe.id);
  state.bookmarks.splice(index, 1);
};

exports.removeBookmark = removeBookmark;

const persitBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

exports.persitBookmarks = persitBookmarks;

const retriveBookmarks = function () {
  const data = JSON.parse(localStorage.getItem('bookmarks'));
  if (!data) return;
  state.bookmarks = data;
};

exports.retriveBookmarks = retriveBookmarks;

const uploadRecipe = async function (rec) {
  try {
    let ingredients = Object.entries(rec);
    ingredients = ingredients.filter(ing => ing[0].startsWith('ingredient') && ing[1].length !== 0).map(ing => {
      const entry = ing[1].split(',').map(val => val.trim());
      if (entry.length !== 3) throw new Error('Invalid inputs');
      const [quantity, unit, description] = entry;
      return {
        quantity: quantity ? +quantity : null,
        unit,
        description
      };
    });
    const recipe = {
      title: rec.title,
      publisher: rec.publisher,
      servings: rec.servings,
      cooking_time: rec.cookingTime,
      image_url: rec.imageUrl,
      source_url: rec.sourceUrl,
      ingredients: ingredients
    };
    const data = await (0, _helper.AJAX)(`${_config.API_URL}?key=${_config.KEY}`, recipe);
    if (!data) return;
    const newRecipe = createRecipeObject(data);
    newRecipe.key = _config.KEY;
    newRecipe.bookmarked = true;
    state.recipe = newRecipe;
    state.bookmarks.push(newRecipe);
  } catch (err) {
    throw err;
  }
};

exports.uploadRecipe = uploadRecipe;

const init = function () {
  retriveBookmarks();
};

init();
},{"regenerator-runtime":"e155e0d3930b156f86c48e8d05522b16","./config.js":"09212d541c5c40ff2bd93475a904f8de","./helper.js":"ca5e72bede557533b2de19db21a2a688"}],"e155e0d3930b156f86c48e8d05522b16":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{}],"09212d541c5c40ff2bd93475a904f8de":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIMEOUT_SEC = exports.RESULTS_PER_PAGE = exports.MODAL_SEC = exports.KEY = exports.API_URL = void 0;
const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
exports.API_URL = API_URL;
const KEY = 'f379c514-5716-45e3-a059-04e6427feaf3';
exports.KEY = KEY;
const RESULTS_PER_PAGE = 10;
exports.RESULTS_PER_PAGE = RESULTS_PER_PAGE;
const TIMEOUT_SEC = 5;
exports.TIMEOUT_SEC = TIMEOUT_SEC;
const MODAL_SEC = 3;
exports.MODAL_SEC = MODAL_SEC;
},{}],"ca5e72bede557533b2de19db21a2a688":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AJAX = void 0;

var _coreJs = require("core-js");

var _regeneratorRuntime = require("regenerator-runtime");

var _config = require("./config.js");

const timeout = function (sec) {
  return new _coreJs.Promise(function (_, reject) {
    setTimeout(reject, sec * 1000);
  });
};

const AJAX = async function (url) {
  let uploadData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  try {
    const fetchPro = uploadData ? fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadData)
    }) : fetch(url);
    const res = await _coreJs.Promise.race([fetchPro, timeout(_config.TIMEOUT_SEC)]);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return data.data;
  } catch (err) {
    throw err;
  }
};

exports.AJAX = AJAX;
},{"core-js":"fc0e4df879b2b85b40e45a90fbc1777f","regenerator-runtime":"e155e0d3930b156f86c48e8d05522b16","./config.js":"09212d541c5c40ff2bd93475a904f8de"}],"fc0e4df879b2b85b40e45a90fbc1777f":[function(require,module,exports) {
module.exports = require('./features');

},{"./features":"467680543f0399a16243b4f9e4a8b007"}],"467680543f0399a16243b4f9e4a8b007":[function(require,module,exports) {
require('../modules/es.symbol');
require('../modules/es.symbol.description');
require('../modules/es.symbol.async-iterator');
require('../modules/es.symbol.has-instance');
require('../modules/es.symbol.is-concat-spreadable');
require('../modules/es.symbol.iterator');
require('../modules/es.symbol.match');
require('../modules/es.symbol.match-all');
require('../modules/es.symbol.replace');
require('../modules/es.symbol.search');
require('../modules/es.symbol.species');
require('../modules/es.symbol.split');
require('../modules/es.symbol.to-primitive');
require('../modules/es.symbol.to-string-tag');
require('../modules/es.symbol.unscopables');
require('../modules/es.error.cause');
require('../modules/es.error.to-string');
require('../modules/es.aggregate-error');
require('../modules/es.aggregate-error.cause');
require('../modules/es.array.at');
require('../modules/es.array.concat');
require('../modules/es.array.copy-within');
require('../modules/es.array.every');
require('../modules/es.array.fill');
require('../modules/es.array.filter');
require('../modules/es.array.find');
require('../modules/es.array.find-index');
require('../modules/es.array.flat');
require('../modules/es.array.flat-map');
require('../modules/es.array.for-each');
require('../modules/es.array.from');
require('../modules/es.array.includes');
require('../modules/es.array.index-of');
require('../modules/es.array.is-array');
require('../modules/es.array.iterator');
require('../modules/es.array.join');
require('../modules/es.array.last-index-of');
require('../modules/es.array.map');
require('../modules/es.array.of');
require('../modules/es.array.reduce');
require('../modules/es.array.reduce-right');
require('../modules/es.array.reverse');
require('../modules/es.array.slice');
require('../modules/es.array.some');
require('../modules/es.array.sort');
require('../modules/es.array.species');
require('../modules/es.array.splice');
require('../modules/es.array.unscopables.flat');
require('../modules/es.array.unscopables.flat-map');
require('../modules/es.array-buffer.constructor');
require('../modules/es.array-buffer.is-view');
require('../modules/es.array-buffer.slice');
require('../modules/es.data-view');
require('../modules/es.date.get-year');
require('../modules/es.date.now');
require('../modules/es.date.set-year');
require('../modules/es.date.to-gmt-string');
require('../modules/es.date.to-iso-string');
require('../modules/es.date.to-json');
require('../modules/es.date.to-primitive');
require('../modules/es.date.to-string');
require('../modules/es.escape');
require('../modules/es.function.bind');
require('../modules/es.function.has-instance');
require('../modules/es.function.name');
require('../modules/es.global-this');
require('../modules/es.json.stringify');
require('../modules/es.json.to-string-tag');
require('../modules/es.map');
require('../modules/es.math.acosh');
require('../modules/es.math.asinh');
require('../modules/es.math.atanh');
require('../modules/es.math.cbrt');
require('../modules/es.math.clz32');
require('../modules/es.math.cosh');
require('../modules/es.math.expm1');
require('../modules/es.math.fround');
require('../modules/es.math.hypot');
require('../modules/es.math.imul');
require('../modules/es.math.log10');
require('../modules/es.math.log1p');
require('../modules/es.math.log2');
require('../modules/es.math.sign');
require('../modules/es.math.sinh');
require('../modules/es.math.tanh');
require('../modules/es.math.to-string-tag');
require('../modules/es.math.trunc');
require('../modules/es.number.constructor');
require('../modules/es.number.epsilon');
require('../modules/es.number.is-finite');
require('../modules/es.number.is-integer');
require('../modules/es.number.is-nan');
require('../modules/es.number.is-safe-integer');
require('../modules/es.number.max-safe-integer');
require('../modules/es.number.min-safe-integer');
require('../modules/es.number.parse-float');
require('../modules/es.number.parse-int');
require('../modules/es.number.to-exponential');
require('../modules/es.number.to-fixed');
require('../modules/es.number.to-precision');
require('../modules/es.object.assign');
require('../modules/es.object.create');
require('../modules/es.object.define-getter');
require('../modules/es.object.define-properties');
require('../modules/es.object.define-property');
require('../modules/es.object.define-setter');
require('../modules/es.object.entries');
require('../modules/es.object.freeze');
require('../modules/es.object.from-entries');
require('../modules/es.object.get-own-property-descriptor');
require('../modules/es.object.get-own-property-descriptors');
require('../modules/es.object.get-own-property-names');
require('../modules/es.object.get-prototype-of');
require('../modules/es.object.has-own');
require('../modules/es.object.is');
require('../modules/es.object.is-extensible');
require('../modules/es.object.is-frozen');
require('../modules/es.object.is-sealed');
require('../modules/es.object.keys');
require('../modules/es.object.lookup-getter');
require('../modules/es.object.lookup-setter');
require('../modules/es.object.prevent-extensions');
require('../modules/es.object.seal');
require('../modules/es.object.set-prototype-of');
require('../modules/es.object.to-string');
require('../modules/es.object.values');
require('../modules/es.parse-float');
require('../modules/es.parse-int');
require('../modules/es.promise');
require('../modules/es.promise.all-settled');
require('../modules/es.promise.any');
require('../modules/es.promise.finally');
require('../modules/es.reflect.apply');
require('../modules/es.reflect.construct');
require('../modules/es.reflect.define-property');
require('../modules/es.reflect.delete-property');
require('../modules/es.reflect.get');
require('../modules/es.reflect.get-own-property-descriptor');
require('../modules/es.reflect.get-prototype-of');
require('../modules/es.reflect.has');
require('../modules/es.reflect.is-extensible');
require('../modules/es.reflect.own-keys');
require('../modules/es.reflect.prevent-extensions');
require('../modules/es.reflect.set');
require('../modules/es.reflect.set-prototype-of');
require('../modules/es.reflect.to-string-tag');
require('../modules/es.regexp.constructor');
require('../modules/es.regexp.dot-all');
require('../modules/es.regexp.exec');
require('../modules/es.regexp.flags');
require('../modules/es.regexp.sticky');
require('../modules/es.regexp.test');
require('../modules/es.regexp.to-string');
require('../modules/es.set');
require('../modules/es.string.at-alternative');
require('../modules/es.string.code-point-at');
require('../modules/es.string.ends-with');
require('../modules/es.string.from-code-point');
require('../modules/es.string.includes');
require('../modules/es.string.iterator');
require('../modules/es.string.match');
require('../modules/es.string.match-all');
require('../modules/es.string.pad-end');
require('../modules/es.string.pad-start');
require('../modules/es.string.raw');
require('../modules/es.string.repeat');
require('../modules/es.string.replace');
require('../modules/es.string.replace-all');
require('../modules/es.string.search');
require('../modules/es.string.split');
require('../modules/es.string.starts-with');
require('../modules/es.string.substr');
require('../modules/es.string.trim');
require('../modules/es.string.trim-end');
require('../modules/es.string.trim-start');
require('../modules/es.string.anchor');
require('../modules/es.string.big');
require('../modules/es.string.blink');
require('../modules/es.string.bold');
require('../modules/es.string.fixed');
require('../modules/es.string.fontcolor');
require('../modules/es.string.fontsize');
require('../modules/es.string.italics');
require('../modules/es.string.link');
require('../modules/es.string.small');
require('../modules/es.string.strike');
require('../modules/es.string.sub');
require('../modules/es.string.sup');
require('../modules/es.typed-array.float32-array');
require('../modules/es.typed-array.float64-array');
require('../modules/es.typed-array.int8-array');
require('../modules/es.typed-array.int16-array');
require('../modules/es.typed-array.int32-array');
require('../modules/es.typed-array.uint8-array');
require('../modules/es.typed-array.uint8-clamped-array');
require('../modules/es.typed-array.uint16-array');
require('../modules/es.typed-array.uint32-array');
require('../modules/es.typed-array.at');
require('../modules/es.typed-array.copy-within');
require('../modules/es.typed-array.every');
require('../modules/es.typed-array.fill');
require('../modules/es.typed-array.filter');
require('../modules/es.typed-array.find');
require('../modules/es.typed-array.find-index');
require('../modules/es.typed-array.for-each');
require('../modules/es.typed-array.from');
require('../modules/es.typed-array.includes');
require('../modules/es.typed-array.index-of');
require('../modules/es.typed-array.iterator');
require('../modules/es.typed-array.join');
require('../modules/es.typed-array.last-index-of');
require('../modules/es.typed-array.map');
require('../modules/es.typed-array.of');
require('../modules/es.typed-array.reduce');
require('../modules/es.typed-array.reduce-right');
require('../modules/es.typed-array.reverse');
require('../modules/es.typed-array.set');
require('../modules/es.typed-array.slice');
require('../modules/es.typed-array.some');
require('../modules/es.typed-array.sort');
require('../modules/es.typed-array.subarray');
require('../modules/es.typed-array.to-locale-string');
require('../modules/es.typed-array.to-string');
require('../modules/es.unescape');
require('../modules/es.weak-map');
require('../modules/es.weak-set');
require('../modules/esnext.aggregate-error');
require('../modules/esnext.array.from-async');
require('../modules/esnext.array.at');
require('../modules/esnext.array.filter-out');
require('../modules/esnext.array.filter-reject');
require('../modules/esnext.array.find-last');
require('../modules/esnext.array.find-last-index');
require('../modules/esnext.array.group-by');
require('../modules/esnext.array.group-by-to-map');
require('../modules/esnext.array.is-template-object');
require('../modules/esnext.array.last-index');
require('../modules/esnext.array.last-item');
require('../modules/esnext.array.to-reversed');
require('../modules/esnext.array.to-sorted');
require('../modules/esnext.array.to-spliced');
require('../modules/esnext.array.unique-by');
require('../modules/esnext.array.with');
require('../modules/esnext.async-iterator.constructor');
require('../modules/esnext.async-iterator.as-indexed-pairs');
require('../modules/esnext.async-iterator.drop');
require('../modules/esnext.async-iterator.every');
require('../modules/esnext.async-iterator.filter');
require('../modules/esnext.async-iterator.find');
require('../modules/esnext.async-iterator.flat-map');
require('../modules/esnext.async-iterator.for-each');
require('../modules/esnext.async-iterator.from');
require('../modules/esnext.async-iterator.map');
require('../modules/esnext.async-iterator.reduce');
require('../modules/esnext.async-iterator.some');
require('../modules/esnext.async-iterator.take');
require('../modules/esnext.async-iterator.to-array');
require('../modules/esnext.bigint.range');
require('../modules/esnext.composite-key');
require('../modules/esnext.composite-symbol');
require('../modules/esnext.function.is-callable');
require('../modules/esnext.function.is-constructor');
require('../modules/esnext.function.un-this');
require('../modules/esnext.global-this');
require('../modules/esnext.iterator.constructor');
require('../modules/esnext.iterator.as-indexed-pairs');
require('../modules/esnext.iterator.drop');
require('../modules/esnext.iterator.every');
require('../modules/esnext.iterator.filter');
require('../modules/esnext.iterator.find');
require('../modules/esnext.iterator.flat-map');
require('../modules/esnext.iterator.for-each');
require('../modules/esnext.iterator.from');
require('../modules/esnext.iterator.map');
require('../modules/esnext.iterator.reduce');
require('../modules/esnext.iterator.some');
require('../modules/esnext.iterator.take');
require('../modules/esnext.iterator.to-array');
require('../modules/esnext.iterator.to-async');
require('../modules/esnext.map.delete-all');
require('../modules/esnext.map.emplace');
require('../modules/esnext.map.every');
require('../modules/esnext.map.filter');
require('../modules/esnext.map.find');
require('../modules/esnext.map.find-key');
require('../modules/esnext.map.from');
require('../modules/esnext.map.group-by');
require('../modules/esnext.map.includes');
require('../modules/esnext.map.key-by');
require('../modules/esnext.map.key-of');
require('../modules/esnext.map.map-keys');
require('../modules/esnext.map.map-values');
require('../modules/esnext.map.merge');
require('../modules/esnext.map.of');
require('../modules/esnext.map.reduce');
require('../modules/esnext.map.some');
require('../modules/esnext.map.update');
require('../modules/esnext.map.update-or-insert');
require('../modules/esnext.map.upsert');
require('../modules/esnext.math.clamp');
require('../modules/esnext.math.deg-per-rad');
require('../modules/esnext.math.degrees');
require('../modules/esnext.math.fscale');
require('../modules/esnext.math.iaddh');
require('../modules/esnext.math.imulh');
require('../modules/esnext.math.isubh');
require('../modules/esnext.math.rad-per-deg');
require('../modules/esnext.math.radians');
require('../modules/esnext.math.scale');
require('../modules/esnext.math.seeded-prng');
require('../modules/esnext.math.signbit');
require('../modules/esnext.math.umulh');
require('../modules/esnext.number.from-string');
require('../modules/esnext.number.range');
require('../modules/esnext.object.has-own');
require('../modules/esnext.object.iterate-entries');
require('../modules/esnext.object.iterate-keys');
require('../modules/esnext.object.iterate-values');
require('../modules/esnext.observable');
require('../modules/esnext.promise.all-settled');
require('../modules/esnext.promise.any');
require('../modules/esnext.promise.try');
require('../modules/esnext.reflect.define-metadata');
require('../modules/esnext.reflect.delete-metadata');
require('../modules/esnext.reflect.get-metadata');
require('../modules/esnext.reflect.get-metadata-keys');
require('../modules/esnext.reflect.get-own-metadata');
require('../modules/esnext.reflect.get-own-metadata-keys');
require('../modules/esnext.reflect.has-metadata');
require('../modules/esnext.reflect.has-own-metadata');
require('../modules/esnext.reflect.metadata');
require('../modules/esnext.set.add-all');
require('../modules/esnext.set.delete-all');
require('../modules/esnext.set.difference');
require('../modules/esnext.set.every');
require('../modules/esnext.set.filter');
require('../modules/esnext.set.find');
require('../modules/esnext.set.from');
require('../modules/esnext.set.intersection');
require('../modules/esnext.set.is-disjoint-from');
require('../modules/esnext.set.is-subset-of');
require('../modules/esnext.set.is-superset-of');
require('../modules/esnext.set.join');
require('../modules/esnext.set.map');
require('../modules/esnext.set.of');
require('../modules/esnext.set.reduce');
require('../modules/esnext.set.some');
require('../modules/esnext.set.symmetric-difference');
require('../modules/esnext.set.union');
require('../modules/esnext.string.at');
require('../modules/esnext.string.cooked');
require('../modules/esnext.string.code-points');
require('../modules/esnext.string.match-all');
require('../modules/esnext.string.replace-all');
require('../modules/esnext.symbol.async-dispose');
require('../modules/esnext.symbol.dispose');
require('../modules/esnext.symbol.matcher');
require('../modules/esnext.symbol.metadata');
require('../modules/esnext.symbol.observable');
require('../modules/esnext.symbol.pattern-match');
require('../modules/esnext.symbol.replace-all');
require('../modules/esnext.typed-array.from-async');
require('../modules/esnext.typed-array.at');
require('../modules/esnext.typed-array.filter-out');
require('../modules/esnext.typed-array.filter-reject');
require('../modules/esnext.typed-array.find-last');
require('../modules/esnext.typed-array.find-last-index');
require('../modules/esnext.typed-array.group-by');
require('../modules/esnext.typed-array.to-reversed');
require('../modules/esnext.typed-array.to-sorted');
require('../modules/esnext.typed-array.to-spliced');
require('../modules/esnext.typed-array.unique-by');
require('../modules/esnext.typed-array.with');
require('../modules/esnext.weak-map.delete-all');
require('../modules/esnext.weak-map.from');
require('../modules/esnext.weak-map.of');
require('../modules/esnext.weak-map.emplace');
require('../modules/esnext.weak-map.upsert');
require('../modules/esnext.weak-set.add-all');
require('../modules/esnext.weak-set.delete-all');
require('../modules/esnext.weak-set.from');
require('../modules/esnext.weak-set.of');
require('../modules/web.dom-collections.for-each');
require('../modules/web.dom-collections.iterator');
require('../modules/web.dom-exception.constructor');
require('../modules/web.dom-exception.stack');
require('../modules/web.dom-exception.to-string-tag');
require('../modules/web.immediate');
require('../modules/web.queue-microtask');
require('../modules/web.structured-clone');
require('../modules/web.timers');
require('../modules/web.url');
require('../modules/web.url.to-json');
require('../modules/web.url-search-params');

module.exports = require('../internals/path');

},{"../modules/es.symbol":"0baca0949de5fad24c1091e5471ca2ba","../modules/es.symbol.description":"fc8ddc6c9640106a98675332aa574ae0","../modules/es.symbol.async-iterator":"22a5723c6b9adc82863f75fe4d6aa02b","../modules/es.symbol.has-instance":"878e5e7a6eca0c0aebd8f2162ee18034","../modules/es.symbol.is-concat-spreadable":"d1be54af26eaf596de2c8bd5605385d0","../modules/es.symbol.iterator":"274c456f7663ad2f2579dfac2565ee88","../modules/es.symbol.match":"0d8bc4ff6d782b39eeed61981fe75e80","../modules/es.symbol.match-all":"a007e2acd7ca987a8af6cfd001d3944b","../modules/es.symbol.replace":"be53811d73c2c94733c7cd1577f5341e","../modules/es.symbol.search":"f82c4af94dabfc6f261a6b25c4b5e892","../modules/es.symbol.species":"754bcfe9cc3ffeb2d9f811573e6d46c5","../modules/es.symbol.split":"146261dd7051da790a2d50f6bc620563","../modules/es.symbol.to-primitive":"1f686f6503bdde082a8f64f8a2ba8354","../modules/es.symbol.to-string-tag":"2d096b5cf1f138632c5b57736e89e09d","../modules/es.symbol.unscopables":"da57ca532f83fc13b098f2612d30dd52","../modules/es.error.cause":"162844b97a4ddca19937373f1c1a1230","../modules/es.error.to-string":"59f47faf65e5b5b5777e8ff86b7c3394","../modules/es.aggregate-error":"741995e2389a9b842aa525008faba857","../modules/es.aggregate-error.cause":"3caa726738513e3b2c061c7d4ce7762b","../modules/es.array.at":"2edd59f8f85d15e14eb441b2ddbcd55f","../modules/es.array.concat":"a862a0828f51c1191c86df473f14bdeb","../modules/es.array.copy-within":"13974954cd935190e581e3c293f09b18","../modules/es.array.every":"55eba909d5beef52f570d0d2093439ec","../modules/es.array.fill":"546a2ac6439847f9d7e03c63fd633b01","../modules/es.array.filter":"63505ccdfba2f5b3c35e0e0d5cd3cf34","../modules/es.array.find":"e7b9f0b868cf352c5044f76fac875241","../modules/es.array.find-index":"4a1b6528619bc27855e858fc4308d93f","../modules/es.array.flat":"6d63607c029c91238b86cf5fd247a3d3","../modules/es.array.flat-map":"f8721355d792805a15bedd47a14b0ea4","../modules/es.array.for-each":"3e1187f097ac3c9a292138a2dce47af1","../modules/es.array.from":"4a62f37cab8aa39273b5e2b382303bb2","../modules/es.array.includes":"f0c3c9b896b38043d8c491d2b572a7ed","../modules/es.array.index-of":"c408dfe77754503e646d3b0c542aae65","../modules/es.array.is-array":"2dbcf8f0c20dd943036e9b8087d1e869","../modules/es.array.iterator":"510aceb4694d90a939f4789a99a0ae3f","../modules/es.array.join":"c768e274774620ac747ce01355f2f85e","../modules/es.array.last-index-of":"1746425f5523216b8aef957ea55ad218","../modules/es.array.map":"4ddddde331fe3c7d0ced83bcaf505b0c","../modules/es.array.of":"dd2c9767c60dce8fab934acf0c8c787c","../modules/es.array.reduce":"35f3014929c88d5836a05c31275e0336","../modules/es.array.reduce-right":"a518dc9918b60fd6c2567066786056cb","../modules/es.array.reverse":"959c1b542360d83f3c1efee1afd66713","../modules/es.array.slice":"a3f78c760e56a02d67ad562a0b76f546","../modules/es.array.some":"fc5e3f708bb994fde7f420457b59248f","../modules/es.array.sort":"24c955eb9b5c477c2e41b2651bb5369d","../modules/es.array.species":"675eb72d2501c69b2e30726ea8a0072f","../modules/es.array.splice":"09807e9ab639e714dac1a1c49e95caab","../modules/es.array.unscopables.flat":"03467547d6a5155577e726ecab8ac4de","../modules/es.array.unscopables.flat-map":"7166fcec20bd96b92fc3aa31dc051149","../modules/es.array-buffer.constructor":"f71cec60660bace78c6e88fcb8f95dff","../modules/es.array-buffer.is-view":"3401f292c24751b6d4f391cfa0e9ad00","../modules/es.array-buffer.slice":"e17a8f9b05fd096fd5934d7c81baa998","../modules/es.data-view":"8a7d10ad9ad1cc94acab6270d331a776","../modules/es.date.get-year":"de6b1e0b9accc45b2da49b93061add68","../modules/es.date.now":"6070744ceefd95744689506a8b93b17b","../modules/es.date.set-year":"09b3d7f602aae49f7024fe9c9d17a4f2","../modules/es.date.to-gmt-string":"4b0eafcca5796160bbfa5b713f932d54","../modules/es.date.to-iso-string":"bf72b77c1df93b257903a615cf7aadaa","../modules/es.date.to-json":"3a03436511e8439ce337319bf2109380","../modules/es.date.to-primitive":"e5f8c33c17826ba5955f6eba3f140d25","../modules/es.date.to-string":"acd5c19c32763d0e58772b0f3a087f13","../modules/es.escape":"43a6136370237431940f96bda5eef9c7","../modules/es.function.bind":"9ea13665a55aa2d14faacd810351ee4d","../modules/es.function.has-instance":"88b81f5878c89b20bbead891542111fa","../modules/es.function.name":"ecb3822e25df1aa4794b9d576e6808b1","../modules/es.global-this":"025e716370e78a150c710af7f87c7c5c","../modules/es.json.stringify":"501224af9e4a8dd9c558c39bd4d60d63","../modules/es.json.to-string-tag":"11e6edc097c9488da6afa2e906d649d5","../modules/es.map":"21e6c4cb86e4f5adaeb26fb92f746ee3","../modules/es.math.acosh":"19141692964c19cd3ccf0507280ee948","../modules/es.math.asinh":"d3b8f8e3e896cf795c8167a878e0779f","../modules/es.math.atanh":"589647b86d8a21a8e0d9e7dcc1516ee9","../modules/es.math.cbrt":"554b2b64b730932bb18b86a852749134","../modules/es.math.clz32":"9c3aa379b9d23faf583a544a5314185b","../modules/es.math.cosh":"c4c75ee607bef988d564f557dc047e50","../modules/es.math.expm1":"60d8e753dc5d14f1bb23d4d0c01bc2cd","../modules/es.math.fround":"5d0fa900ab4c3ad8014785d29d56e7ac","../modules/es.math.hypot":"5ec828b5cbe7c94b4d83b25fd3b3e02c","../modules/es.math.imul":"c62a8203380b14ab58f20204e3362800","../modules/es.math.log10":"b57963d3bc647611f69c9436a40d672b","../modules/es.math.log1p":"d2ec62a4f038b15776fe530a713fe5f0","../modules/es.math.log2":"ed95ec26b293b4e116072c18a6113566","../modules/es.math.sign":"769d7246e398e2d836ca653275dd437a","../modules/es.math.sinh":"94c9909d4aa2b34d6c77c798c003d53a","../modules/es.math.tanh":"b63d3e6f27d0748c75d264ac8a1088d9","../modules/es.math.to-string-tag":"7034d33c389100c9120c4e0b96e0a8cb","../modules/es.math.trunc":"51d1e746a75ce81d410932ab0cd8e2b1","../modules/es.number.constructor":"4e98c31e46afac75e32a5b31e678a67d","../modules/es.number.epsilon":"6a88be76c83fe816ff906c2caa5be1ab","../modules/es.number.is-finite":"e2d8f15ec256e5fa14b35254742f0488","../modules/es.number.is-integer":"611f2e5653cf1dba6af71c1de7abc19b","../modules/es.number.is-nan":"2703383b1a8a3bef02ceac451a3230f0","../modules/es.number.is-safe-integer":"f243865be94f80456ab6b03b6f529a6d","../modules/es.number.max-safe-integer":"8f30442dc860af4bc0000c7bf8e06700","../modules/es.number.min-safe-integer":"3efc9772eb5766c13d9d2674cfaaa6d5","../modules/es.number.parse-float":"c91c6b30668f8fc1378aeb280ecb4f5d","../modules/es.number.parse-int":"1dc2b9c7776b950d044b3109a005031f","../modules/es.number.to-exponential":"6365ffca9e686792b48377b831b925be","../modules/es.number.to-fixed":"6250b45751f337fc00f311112467913e","../modules/es.number.to-precision":"61126e2ce2fafb2171a03a81ce031c32","../modules/es.object.assign":"ef0c1c8417b302bf4f6b30469135bba6","../modules/es.object.create":"dbf4a21bdc9478f943216bbfe8d568ad","../modules/es.object.define-getter":"de5884601ab4152e1b0ea9ce12bfec89","../modules/es.object.define-properties":"2d96c8c658a76609bd16b9ab4273702e","../modules/es.object.define-property":"658732fea3b8b8b53b24504731f81c52","../modules/es.object.define-setter":"99849673849286e2d51affee0ed8be99","../modules/es.object.entries":"9e0b5c004535b94bbbd55b79e434d155","../modules/es.object.freeze":"fd9d1d24e954b8bff98cf82d714634a8","../modules/es.object.from-entries":"98e4d63e60a957ee081c43dfcf9bdd63","../modules/es.object.get-own-property-descriptor":"0c4fe571da42da17a5de3a48635f62da","../modules/es.object.get-own-property-descriptors":"27e11a5f1cde02502bbaa7573838736f","../modules/es.object.get-own-property-names":"4d48008a4d8ad941d0d1587e65c61642","../modules/es.object.get-prototype-of":"1c0bfa8a22e10b17fe5cdddef0ae04a5","../modules/es.object.has-own":"05918137f48470dc95fe85e42a7bf22c","../modules/es.object.is":"39b566e669c96ea8e7aa4a0c11e9c938","../modules/es.object.is-extensible":"a26a6d2f1001c232b1745a5e26fcf137","../modules/es.object.is-frozen":"eed55e282e4cebfe1b62986982993e7e","../modules/es.object.is-sealed":"875c69f5ad8c8b8c438fcae0c5cce4b1","../modules/es.object.keys":"39acc509f64ee9aea6217b08ec961aff","../modules/es.object.lookup-getter":"8f3dca5ebb694ca202e8ccc34ef79b22","../modules/es.object.lookup-setter":"32f7148ecd6d3e33618148b5c3de8e38","../modules/es.object.prevent-extensions":"a1b896dbcbd15e53c4e7e8c00781f3fe","../modules/es.object.seal":"4d78693a0bdc517b0adeb1a2bbd48b58","../modules/es.object.set-prototype-of":"d6b5e45ec4f04895ea84f914222f100f","../modules/es.object.to-string":"55e37b05a68c7c2365e524b1791b32be","../modules/es.object.values":"756242e8680aa17c92c660a4983dc887","../modules/es.parse-float":"114570918caa36e95c44850d7f198f2e","../modules/es.parse-int":"1e51b8258cf6e252f5a70ce15d26fe0b","../modules/es.promise":"64b4f9ce25d6a1667dd03c5d1af15512","../modules/es.promise.all-settled":"621182c678695785378ee5b1e054e399","../modules/es.promise.any":"80e02179f1b001ad0b7a998fed97a14c","../modules/es.promise.finally":"dbde465c6691022f431a49199561448b","../modules/es.reflect.apply":"8fcddbabbbcaa3a34d3df5b0c1f8bcfc","../modules/es.reflect.construct":"34936bb3ea0a3d76b1e5fa8d367095a7","../modules/es.reflect.define-property":"5b57f05dde60df32aec0b0bde042f5ec","../modules/es.reflect.delete-property":"971e44db9bc3805dda53937ea34de8cb","../modules/es.reflect.get":"82e3ad2c276492b6191b4c208d23b0a4","../modules/es.reflect.get-own-property-descriptor":"bed6180414e37b4f0b66944641f43655","../modules/es.reflect.get-prototype-of":"9a73f8251ad1d2a2c0791fa8862c672a","../modules/es.reflect.has":"20723cb8dda540209d67c53c59fff123","../modules/es.reflect.is-extensible":"0380e6e14e2834201e4d9bbefa69f2a4","../modules/es.reflect.own-keys":"988461f10de6c63f8f0fceca63b3bcd5","../modules/es.reflect.prevent-extensions":"ae97330f792b08fdd88ec8cee195cb5a","../modules/es.reflect.set":"1f60ed7b4f6ea339abed64d1da1f10ba","../modules/es.reflect.set-prototype-of":"d5f6f2fa3fcdf839a378cf14bdb8160b","../modules/es.reflect.to-string-tag":"2241cb0613f84ace391eaf9141e200ad","../modules/es.regexp.constructor":"17e2033a1c93d48aced52ed58c961f29","../modules/es.regexp.dot-all":"539ec05a2f4657dbdcdd70720d253063","../modules/es.regexp.exec":"c60e58df05dbe67a3d86a0a71176436e","../modules/es.regexp.flags":"69c14483c7f90583888879597ac9d2d3","../modules/es.regexp.sticky":"7ff9d9eb82d9c3dcc0904fa5af8e9b00","../modules/es.regexp.test":"cab900d610a1d482f2bc468014013bb1","../modules/es.regexp.to-string":"6f916140f15db4b9a6e80a0af1eb5960","../modules/es.set":"e711a669bef57a9a7178d130c08422eb","../modules/es.string.at-alternative":"3b5c5c6fea8eece426a84709b52b4bca","../modules/es.string.code-point-at":"169e836154316c6dddc7fb65b971e3f6","../modules/es.string.ends-with":"673c4434789053ac7ad787f4a8f7695e","../modules/es.string.from-code-point":"2ce169741193b51d6fd48068f6b91539","../modules/es.string.includes":"a7d36f785f63c912086853d415b0988d","../modules/es.string.iterator":"17203f1447f326bd1ee667e61bac879c","../modules/es.string.match":"d99e523209fcb30df292c2428ff02309","../modules/es.string.match-all":"d0a02303903685146f0fba725a53dd98","../modules/es.string.pad-end":"987ab582e37273e69c0b679fe69f1c13","../modules/es.string.pad-start":"07ed48ecc7ac56e90df2c8704869ac80","../modules/es.string.raw":"f2be1a56b9a5448c818455d8bd482e40","../modules/es.string.repeat":"6be7dd01007c4a2e075e4832b4b0f997","../modules/es.string.replace":"a41434a38db9af6d2ad868f7a439ab89","../modules/es.string.replace-all":"845b3fa8d94b5f91b0f72276673d793c","../modules/es.string.search":"ae527e4b5645d7ce591da920b6d5804c","../modules/es.string.split":"e5425e3ea560528abc0466beeaf18eb9","../modules/es.string.starts-with":"b08993728dae252586b5825facc03f42","../modules/es.string.substr":"bdb86750583fdb03b57d141d076cab05","../modules/es.string.trim":"1d21d2f2e8e411c3424b8bfa6be4316c","../modules/es.string.trim-end":"d2e9b6dce4935bf428fb4b3953e33dc9","../modules/es.string.trim-start":"9069335fb19f954e95d4d8ab5ad7559b","../modules/es.string.anchor":"eac67dc1107ad6650b3189414593396f","../modules/es.string.big":"61887ad261889dc5b874417f6e25d1c1","../modules/es.string.blink":"e2265281232a7d68b4c0d27dce6e8a58","../modules/es.string.bold":"21e831e883a70a9f0bf0d1b5de16fabb","../modules/es.string.fixed":"0c62093fa4884bc0ff419dad3d3fe3fe","../modules/es.string.fontcolor":"9227428d69d2263af6f10bfbb71cb2a9","../modules/es.string.fontsize":"e0d0f7fe2b5527d9f3839ce5446a488d","../modules/es.string.italics":"ca31bc43e61e0c6a99106ebbc42e2822","../modules/es.string.link":"2de2022addb0d6dd8e5a9aa59e6a1bde","../modules/es.string.small":"3a375324c085b0184274912013c68c09","../modules/es.string.strike":"290971a5fdf49c2a481a1e57d8df83c5","../modules/es.string.sub":"a1fb04da2f2ca751282b866a53e94c3e","../modules/es.string.sup":"79c83b8c73cc043cc2da0c9c227551ca","../modules/es.typed-array.float32-array":"d5ed5e3a2e200dcf66c948e6350ae29c","../modules/es.typed-array.float64-array":"49914eeba57759547672886c5961b9e4","../modules/es.typed-array.int8-array":"1fc9d0d9e9c4ca72873ee75cc9532911","../modules/es.typed-array.int16-array":"6ba53210946e69387b5af65ca70f5602","../modules/es.typed-array.int32-array":"52f07ad61480c3da8b1b371346f2b755","../modules/es.typed-array.uint8-array":"6042ea91f038c74624be740ff17090b9","../modules/es.typed-array.uint8-clamped-array":"47e53ff27a819e98075783d2516842bf","../modules/es.typed-array.uint16-array":"20f511ab1a5fbdd3a99ff1f471adbc30","../modules/es.typed-array.uint32-array":"8212db3659c5fe8bebc2163b12c9f547","../modules/es.typed-array.at":"797f3e2dbbd581868c09166170c2b810","../modules/es.typed-array.copy-within":"600aa026b8a159b7bb2c160d5006a7e6","../modules/es.typed-array.every":"92a3b68ef6bc030efdf17f232050663d","../modules/es.typed-array.fill":"33be1ff0d41bd8bdd57895617624d99f","../modules/es.typed-array.filter":"5fa2a03f6136c65a641b66356cf5fcc5","../modules/es.typed-array.find":"536915337f89c8711c27bb6f4279c9e9","../modules/es.typed-array.find-index":"64d4a9b68f1f8e20787978d86d849fd8","../modules/es.typed-array.for-each":"dec5619455bf0f57b7f420968089fb01","../modules/es.typed-array.from":"183d72778e0f99cedb12a04e35ea2d50","../modules/es.typed-array.includes":"8071d5d49710e54ee4b1f069daf1498c","../modules/es.typed-array.index-of":"f132a5f38bf2eb601c6396cf64c0bc5e","../modules/es.typed-array.iterator":"91be1826c2d7d0723d824783274922e8","../modules/es.typed-array.join":"87ae94597f25d44b229c773ad7e36ea0","../modules/es.typed-array.last-index-of":"494fc1c36dfa08beb7ad90e00cba5da8","../modules/es.typed-array.map":"4dd6468fa12d7ab6c5df57b08a24b774","../modules/es.typed-array.of":"2ee3ec99d0b3dea4fec9002159200789","../modules/es.typed-array.reduce":"c7868da1c68a2d1430007cfb77b0e17d","../modules/es.typed-array.reduce-right":"c38a89f1b0df74fa710f5c57da82b166","../modules/es.typed-array.reverse":"c057b0ac343800304fb7600db363b844","../modules/es.typed-array.set":"050dec16d25f1873c295f4ac096b8101","../modules/es.typed-array.slice":"da14d8632e7dd8becac9ee0b303adc02","../modules/es.typed-array.some":"3956f6a21b0e58c29095ede2c262d916","../modules/es.typed-array.sort":"faf71bbf1ae62353e86394c83b5fd942","../modules/es.typed-array.subarray":"51e1dcefe2a202db3d768737fc47e748","../modules/es.typed-array.to-locale-string":"00b7311bff09e21eaff1ca0d9929dd68","../modules/es.typed-array.to-string":"3d4f98ca04fc7fac59be67083e661e7f","../modules/es.unescape":"ee76c5b4436d15ce16b0b7a8e5eab8c8","../modules/es.weak-map":"9e5ce70ecf8ba1c5c8a8c8442c7aea1b","../modules/es.weak-set":"f2e1e46132295114bf5d89a8377b855e","../modules/esnext.aggregate-error":"0e9f52e44e66b5362e2bde50fa2c2617","../modules/esnext.array.from-async":"87d954ec83e96fca94a7fb24b872db0e","../modules/esnext.array.at":"14fc07e44e96184ee97e5cb0152a6e4b","../modules/esnext.array.filter-out":"5c332904f32db7a4711f4671377b13e1","../modules/esnext.array.filter-reject":"5dcb3d9b7a798f1ebf122fb2f4943544","../modules/esnext.array.find-last":"3fb082cff8d77a26ad168f9a2df82b5d","../modules/esnext.array.find-last-index":"97068b6860141d335a51bd18f006f1c3","../modules/esnext.array.group-by":"2227c4bee39fc70a938c7e9acb5182c3","../modules/esnext.array.group-by-to-map":"968613f857f48fa41a61069c4721505d","../modules/esnext.array.is-template-object":"2c638b87918b6459416158d991376790","../modules/esnext.array.last-index":"52794e3bc5e7945e856d0d92eef49b8e","../modules/esnext.array.last-item":"49519781c14d9ff537c83433e02de1f3","../modules/esnext.array.to-reversed":"01f84f06403b5c5d2d858ea5498f4891","../modules/esnext.array.to-sorted":"d89baa0fd3c6e0ff2defbc852f067f7b","../modules/esnext.array.to-spliced":"f7ea14cba7e40045d8375438ee3cfa8c","../modules/esnext.array.unique-by":"4e77790b49938849dd4aeb7ae5c6a71b","../modules/esnext.array.with":"0cd49a99af6d030b64df45cba8986dc6","../modules/esnext.async-iterator.constructor":"d8634df10681764e927155bd2f995802","../modules/esnext.async-iterator.as-indexed-pairs":"e1de8dae28b24e7eb3dd226d73e922f8","../modules/esnext.async-iterator.drop":"170c52fc7bf9af58ca9dff2861725963","../modules/esnext.async-iterator.every":"1e307e222caaef7f75edf085b9e193db","../modules/esnext.async-iterator.filter":"f6efc95b5c2313b2b4931b0cb44d80bd","../modules/esnext.async-iterator.find":"a166d9f15be30f2382929da28ad21972","../modules/esnext.async-iterator.flat-map":"07dfe117837ae68569a6de16f5de2b04","../modules/esnext.async-iterator.for-each":"1de396b65ce1f1a4badf7784f75d17ad","../modules/esnext.async-iterator.from":"c35989f97f8e204a219ee38f96d7fb9f","../modules/esnext.async-iterator.map":"c4f1a5f1312a8044c0414c34a6e5f09f","../modules/esnext.async-iterator.reduce":"a31bd39f78f1dc84e8de4a630f3681da","../modules/esnext.async-iterator.some":"7bac61fd0181c26b13b1abeed09281e3","../modules/esnext.async-iterator.take":"3a1a0d98e5a981ac7f6c68c057261a72","../modules/esnext.async-iterator.to-array":"620e2b7240dc5b4b8acfb535e7f577fe","../modules/esnext.bigint.range":"f8408758922c95d2dfb4e5a2cdf1bc38","../modules/esnext.composite-key":"133c507d33a3fc2e61ca74a845eeb897","../modules/esnext.composite-symbol":"c548003ebc063bde5719d57311b468f0","../modules/esnext.function.is-callable":"d5f2dd69bea7c25d7e71c295342e38a9","../modules/esnext.function.is-constructor":"71ac9dab3761e80976943fa62ee584a1","../modules/esnext.function.un-this":"9cc5a31ca189fe4273e6afa11dcff03e","../modules/esnext.global-this":"b3e0646f2c52701f5fa4e972cf1bee7b","../modules/esnext.iterator.constructor":"fb1cd7bb979c4ac1ea606f804ddca468","../modules/esnext.iterator.as-indexed-pairs":"1a5f6b1d7c1ec69152cc0ef27a107bc7","../modules/esnext.iterator.drop":"335389a554348d510648f352832d13e2","../modules/esnext.iterator.every":"92a8400f1e07d0ae0f74b5716f435060","../modules/esnext.iterator.filter":"fa9dd6897b5bf76ce4ee0ef6a42d5b70","../modules/esnext.iterator.find":"7974fcde83c35ead83f2bc0dc9316f99","../modules/esnext.iterator.flat-map":"ad816c1e5d2c419f020d462f07cb96a8","../modules/esnext.iterator.for-each":"a6e7bfe876b6e61585551f542152c925","../modules/esnext.iterator.from":"77705137782f356064f81e86139230c2","../modules/esnext.iterator.map":"2ed44ec4c1282dbd18cd64f85939c1f9","../modules/esnext.iterator.reduce":"010f4553018139025bef31a78c9fa142","../modules/esnext.iterator.some":"58eb846a61f519d8eca34d331782dbac","../modules/esnext.iterator.take":"0d8902e6d79614a434c736f4974d0f25","../modules/esnext.iterator.to-array":"46edff0bab34ffb43f7d319896ede3b3","../modules/esnext.iterator.to-async":"bf12c1c1076c603c3f66376fa74ec747","../modules/esnext.map.delete-all":"da08c28f3be41f203707074ac2366cd1","../modules/esnext.map.emplace":"5951b13be2e1a7e7035341c8f8c75c65","../modules/esnext.map.every":"069fe26fdcf8b13478e75a588d6701dd","../modules/esnext.map.filter":"02756a3309bf3bc2e0435bf9b0517f63","../modules/esnext.map.find":"ca54e6b1c7b861f0d887f919867b1acc","../modules/esnext.map.find-key":"832e1c5815129f6f9a83e91d6d0d4722","../modules/esnext.map.from":"5052cd5fe046f0843fd16575944ccf21","../modules/esnext.map.group-by":"02e49c4f035a18c0ccb157e23668b04b","../modules/esnext.map.includes":"c02bbc042420d98748f2e0bd59edab04","../modules/esnext.map.key-by":"18f11836e004e251e6329d2ae8fe53be","../modules/esnext.map.key-of":"83b5bc57ffa9842455348af2854600b2","../modules/esnext.map.map-keys":"a0c8bff85589da1dba46ce75728658ea","../modules/esnext.map.map-values":"805d999c2a707eecfa3887515ffed686","../modules/esnext.map.merge":"01d65cd25f2e42ad41fca4bfb9417cdb","../modules/esnext.map.of":"b623f6a1958de96976d20cc4dbde8cda","../modules/esnext.map.reduce":"59667dc1e766e5cc61da0969b618b4cc","../modules/esnext.map.some":"a775e85400635450523ec6fd018025f1","../modules/esnext.map.update":"f4788c3e7f18e8e8760dbe26750754fc","../modules/esnext.map.update-or-insert":"e286f2c667d0fd96a62c18c1be89348a","../modules/esnext.map.upsert":"168110118e75466160c468ce1da0469f","../modules/esnext.math.clamp":"517dcf5afcb0a2abdd858eb5a7355c9c","../modules/esnext.math.deg-per-rad":"cf3972f2ec04fcec3334fde017f6d18b","../modules/esnext.math.degrees":"bb2c708de18de445d1996c57a8ca04cd","../modules/esnext.math.fscale":"dafad7196920382dfc96296f2295a034","../modules/esnext.math.iaddh":"22057065839ebaf54a78657e41f7b634","../modules/esnext.math.imulh":"5aa235805e7dc68cc4c9bc5b26c7ca3f","../modules/esnext.math.isubh":"26de6906ceb6f5e60f59b9295fc4475b","../modules/esnext.math.rad-per-deg":"53aed246d9718990305843874923db5e","../modules/esnext.math.radians":"63d0308801ab92d943a00e6c983ba1bc","../modules/esnext.math.scale":"f429f24b5774a08404322a041b3d9d05","../modules/esnext.math.seeded-prng":"d50020a4503dfb5193c0e752c2378c42","../modules/esnext.math.signbit":"12938d1cfa05a5c2c9248ee2399c2e40","../modules/esnext.math.umulh":"873f307703588984724a7c527b64c5d6","../modules/esnext.number.from-string":"eaa5fb070be82a4e487cb0f2d6d9d3f4","../modules/esnext.number.range":"2660e29157b8ee6c23d58f0beb2e45d7","../modules/esnext.object.has-own":"0f746baabc7b18c5e408a4f33e33289d","../modules/esnext.object.iterate-entries":"d2f57f1dc7186c1a592d441af2026bab","../modules/esnext.object.iterate-keys":"800b08fd1144b0e2859d58552e94a96e","../modules/esnext.object.iterate-values":"fd729fba0ffcb236f9fb29e383193e20","../modules/esnext.observable":"4619c203c40ca3a8626f1cd92b069f98","../modules/esnext.promise.all-settled":"ce2c93b36ed43e91d30492084af45c7d","../modules/esnext.promise.any":"8a8c25096677b665898b71d20996c28e","../modules/esnext.promise.try":"1ee10f6b9e5d4ef3434491490271f493","../modules/esnext.reflect.define-metadata":"1bd3a67d27ec0a95da57f66e8e503245","../modules/esnext.reflect.delete-metadata":"cbb88665b87044210e424394a3c73e33","../modules/esnext.reflect.get-metadata":"0194b0d28cd7ca7e7850f6f5bd06f865","../modules/esnext.reflect.get-metadata-keys":"bc7aedae3ee2d96a4fbcfba440efeca7","../modules/esnext.reflect.get-own-metadata":"17abc189563de7d28116af14c5199448","../modules/esnext.reflect.get-own-metadata-keys":"dee1a5201221f06e5e86ab8ad66042a0","../modules/esnext.reflect.has-metadata":"54b7e0cd0443c999fabe7e5b588331be","../modules/esnext.reflect.has-own-metadata":"ffad1d50b90acef3eca87bc05e93cedf","../modules/esnext.reflect.metadata":"24b40016d77a2791bbc414e8624ebe40","../modules/esnext.set.add-all":"049b81be7812083e3011118f4ce9043e","../modules/esnext.set.delete-all":"4e4a136760a56fdf2747fcf0301ccec6","../modules/esnext.set.difference":"f2ec2a892bf656d59f1fb385f58641de","../modules/esnext.set.every":"1f08231ecd5744d1d0a3808bbde44f63","../modules/esnext.set.filter":"07205cd5e676c569f2e30e747c06fe91","../modules/esnext.set.find":"e4e48aed2502949cebcf1d7f3b24d09c","../modules/esnext.set.from":"e1ce825ea17ac0c54780f322bdab2f82","../modules/esnext.set.intersection":"d3bf87f3ebf1ea6dcee9fd5dfa4175cc","../modules/esnext.set.is-disjoint-from":"73437ef5d4499909a4ddd4178b0e6daf","../modules/esnext.set.is-subset-of":"6bbe51bbb25907a399b88ad005d526bb","../modules/esnext.set.is-superset-of":"975549506783106c57614ba3722eb6a7","../modules/esnext.set.join":"dc92f14771a3f9269c3653fbb1dbf258","../modules/esnext.set.map":"12f58c7fb07aa345ad43a40d45fbd577","../modules/esnext.set.of":"0d37cc47558d037b25dfcaf802140a4f","../modules/esnext.set.reduce":"b48d6c7708e8be0cb91003cf5380fe48","../modules/esnext.set.some":"8da5844255fce2792c23e468a4f2cbea","../modules/esnext.set.symmetric-difference":"f3f1fd3fedba04200956631abc0c4365","../modules/esnext.set.union":"db0c06ca0bf84b6a2cdbd93e6640d4b8","../modules/esnext.string.at":"05842a6af50c421b0b947f461d2973f9","../modules/esnext.string.cooked":"22677fb8342f13ff14829f7dada0cfc6","../modules/esnext.string.code-points":"d8329ad3762d403c44af756979748303","../modules/esnext.string.match-all":"8390f8fd3036e103f670105703e8d91a","../modules/esnext.string.replace-all":"ded5d2c1244da71d8ff27a7afa7a3a98","../modules/esnext.symbol.async-dispose":"751525ca09d5470e0b6169b244ed5396","../modules/esnext.symbol.dispose":"86debbc2209a74666dc305ce8e05cd9c","../modules/esnext.symbol.matcher":"e4f22e36aff47474f379d78110763b90","../modules/esnext.symbol.metadata":"c47049c911b6c032f6c0c0b1ba63fbc2","../modules/esnext.symbol.observable":"6687aef5ebaf0f6effbcf247f9aa0a69","../modules/esnext.symbol.pattern-match":"abe3695e9d6b4c4bbcf331aee1c27c33","../modules/esnext.symbol.replace-all":"7f4b4da2472b15f42393d8870df757ef","../modules/esnext.typed-array.from-async":"32f8dc3020a162c372011e1bb8723410","../modules/esnext.typed-array.at":"0e25b896c9f47e3c1bf8202138901c83","../modules/esnext.typed-array.filter-out":"6538070cbe39011252cec7572e66a7a9","../modules/esnext.typed-array.filter-reject":"7280d91f94dfa7ec976c4fb8a75cd199","../modules/esnext.typed-array.find-last":"19433faa16d78d0a326271b34d5b1cf7","../modules/esnext.typed-array.find-last-index":"f66d5ed8750e87ff852d2f82cadd0a95","../modules/esnext.typed-array.group-by":"a530d53336cdb5c402ed2d84e960771d","../modules/esnext.typed-array.to-reversed":"9371e414ed33971bfee47a3e9c02a6ca","../modules/esnext.typed-array.to-sorted":"20bcd76d8efb309a47985ee3656addb6","../modules/esnext.typed-array.to-spliced":"4ecd6b165079a68fc854a598d373a0f5","../modules/esnext.typed-array.unique-by":"995de8b29be2bee5ace8eeea50c8da44","../modules/esnext.typed-array.with":"1ec0d3636a54329e1f6fcb18ee73a463","../modules/esnext.weak-map.delete-all":"26710ca0ada8370ec43570dee4622252","../modules/esnext.weak-map.from":"4aaf61c096f4103057071eb4181c5737","../modules/esnext.weak-map.of":"f8697f04f830deca50cce4e2075f44f7","../modules/esnext.weak-map.emplace":"dc699c0aa47ef12af422aa476f4dbb07","../modules/esnext.weak-map.upsert":"098804f5583acffcf7f19b7c9e4013cf","../modules/esnext.weak-set.add-all":"1a445d77b9803ff82ff11d6376361c30","../modules/esnext.weak-set.delete-all":"6c7ac37ea9bfcab74238241ce7909e89","../modules/esnext.weak-set.from":"cab93045b4d3c97a57324f1c341aa300","../modules/esnext.weak-set.of":"51acff415ff701e4a79a8397c596cc91","../modules/web.dom-collections.for-each":"83901c2800190b4304c42ab98d904769","../modules/web.dom-collections.iterator":"5ceaa0f401b64b2d4fc073e503968224","../modules/web.dom-exception.constructor":"31924be6c47d6a2e1d07f88a3ff77d86","../modules/web.dom-exception.stack":"251b8e50fafcb168f672a0e673f3ebae","../modules/web.dom-exception.to-string-tag":"d241ac7f98e6941f2c95afec00551a56","../modules/web.immediate":"140df4f8e97a45c53c66fead1f5a9e92","../modules/web.queue-microtask":"e8a09387bee67eefd154099229aafe95","../modules/web.structured-clone":"bf4737b6c803ba1daa379cdf1d7825e5","../modules/web.timers":"11b525d2e3ec21c05af8cfc8386bb875","../modules/web.url":"a66c25e402880ea6b966ee8ece30b6df","../modules/web.url.to-json":"6357c5a053a36e38c0e24243e550dd86","../modules/web.url-search-params":"2494aebefd4ca447de0ef4cfdd47509e","../internals/path":"da95d5e8f7bf2e6702061407876f0910"}],"0baca0949de5fad24c1091e5471ca2ba":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var getBuiltIn = require('../internals/get-built-in');

var apply = require('../internals/function-apply');

var call = require('../internals/function-call');

var uncurryThis = require('../internals/function-uncurry-this');

var IS_PURE = require('../internals/is-pure');

var DESCRIPTORS = require('../internals/descriptors');

var NATIVE_SYMBOL = require('../internals/native-symbol');

var fails = require('../internals/fails');

var hasOwn = require('../internals/has-own-property');

var isArray = require('../internals/is-array');

var isCallable = require('../internals/is-callable');

var isObject = require('../internals/is-object');

var isPrototypeOf = require('../internals/object-is-prototype-of');

var isSymbol = require('../internals/is-symbol');

var anObject = require('../internals/an-object');

var toObject = require('../internals/to-object');

var toIndexedObject = require('../internals/to-indexed-object');

var toPropertyKey = require('../internals/to-property-key');

var $toString = require('../internals/to-string');

var createPropertyDescriptor = require('../internals/create-property-descriptor');

var nativeObjectCreate = require('../internals/object-create');

var objectKeys = require('../internals/object-keys');

var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');

var getOwnPropertyNamesExternal = require('../internals/object-get-own-property-names-external');

var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');

var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');

var definePropertyModule = require('../internals/object-define-property');

var definePropertiesModule = require('../internals/object-define-properties');

var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');

var arraySlice = require('../internals/array-slice');

var redefine = require('../internals/redefine');

var shared = require('../internals/shared');

var sharedKey = require('../internals/shared-key');

var hiddenKeys = require('../internals/hidden-keys');

var uid = require('../internals/uid');

var wellKnownSymbol = require('../internals/well-known-symbol');

var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');

var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

var setToStringTag = require('../internals/set-to-string-tag');

var InternalStateModule = require('../internals/internal-state');

var $forEach = require('../internals/array-iteration').forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
var TypeError = global.TypeError;
var QObject = global.QObject;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push = uncurryThis([].push);
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks'); // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () {
      return nativeDefineProperty(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);

  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);

  if (hasOwn(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, {
        enumerable: createPropertyDescriptor(0, false)
      });
    }

    return setSymbolDescriptor(O, key, Attributes);
  }

  return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);

  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }

  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
      push(result, AllSymbols[key]);
    }
  });
  return result;
}; // `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor


if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (isPrototypeOf(SymbolPrototype, this)) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);

    var setter = function (value) {
      if (this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
      if (hasOwn(this, HIDDEN) && hasOwn(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };

    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
      configurable: true,
      set: setter
    });
    return wrap(tag, description);
  };

  SymbolPrototype = $Symbol[PROTOTYPE];
  redefine(SymbolPrototype, 'toString', function toString() {
    return getInternalState(this).tag;
  });
  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });
  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  definePropertiesModule.f = $defineProperties;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });

    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, {
        unsafe: true
      });
    }
  }
}

$({
  global: true,
  wrap: true,
  forced: !NATIVE_SYMBOL,
  sham: !NATIVE_SYMBOL
}, {
  Symbol: $Symbol
});
$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});
$({
  target: SYMBOL,
  stat: true,
  forced: !NATIVE_SYMBOL
}, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = $toString(key);
    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () {
    USE_SETTER = true;
  },
  useSimple: function () {
    USE_SETTER = false;
  }
});
$({
  target: 'Object',
  stat: true,
  forced: !NATIVE_SYMBOL,
  sham: !DESCRIPTORS
}, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});
$({
  target: 'Object',
  stat: true,
  forced: !NATIVE_SYMBOL
}, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443

$({
  target: 'Object',
  stat: true,
  forced: fails(function () {
    getOwnPropertySymbolsModule.f(1);
  })
}, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
}); // `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify

if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

    return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
    || $stringify({
      a: symbol
    }) != '{}' // V8 throws on boxed symbols
    || $stringify(Object(symbol)) != '{}';
  });
  $({
    target: 'JSON',
    stat: true,
    forced: FORCED_JSON_STRINGIFY
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

      if (!isArray(replacer)) replacer = function (key, value) {
        if (isCallable($replacer)) value = call($replacer, this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return apply($stringify, null, args);
    }
  });
} // `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive


if (!SymbolPrototype[TO_PRIMITIVE]) {
  var valueOf = SymbolPrototype.valueOf; // eslint-disable-next-line no-unused-vars -- required for .length

  redefine(SymbolPrototype, TO_PRIMITIVE, function (hint) {
    // TODO: improve hint logic
    return call(valueOf, this);
  });
} // `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag


setToStringTag($Symbol, SYMBOL);
hiddenKeys[HIDDEN] = true;
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/native-symbol":"f4c6561c5780f812466dd472171f0916","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/is-array":"4bcb8b0b07b2c32a8e3e3eda35fd2a4d","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/is-object":"03244e745134af366d66b74456891052","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/is-symbol":"7500e07108c47e5d25bda62049b8b4ba","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/to-property-key":"df2b61336906907f777029fe90c882a8","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/object-keys":"ec0d9c7c7614ad542f1a79132cefce40","../internals/object-get-own-property-names":"b422be4dea2e1243d9a0803066cc2d3d","../internals/object-get-own-property-names-external":"8d9c8cc419a28d94a4a934b7d6069d20","../internals/object-get-own-property-symbols":"f759fc76793903b9cadc1e3a84780ff9","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/object-define-properties":"3ad53cd176876675b1da5125e4bdfafb","../internals/object-property-is-enumerable":"6d666488e852af6845747bbd2705cc05","../internals/array-slice":"d58518bc0d77fd7d4bbb2d854257bf40","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/shared":"1950ed6cf8f0dece2a998d60590e9098","../internals/shared-key":"18fb64363b0383efc58d7addc88469cd","../internals/hidden-keys":"7cf9eee6c00d9cc7018f7817cf84e3d6","../internals/uid":"d5b7e7679d9dac163ab327cbf9508501","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/well-known-symbol-wrapped":"dfb337afb4b148aa9dffe46df38ed30b","../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39","../internals/set-to-string-tag":"b474145c0d35c2cab8be2f2358364fc4","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe"}],"4bcb8b0b07b2c32a8e3e3eda35fd2a4d":[function(require,module,exports) {
var classof = require('../internals/classof-raw');

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};

},{"../internals/classof-raw":"901e5a25291bac244011feea921975b2"}],"7aa27e4df959954bd0bf4a29c3e9ef77":[function(require,module,exports) {
var global = require('../internals/global');

var classof = require('../internals/classof');

var String = global.String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/classof":"be2998c5b4d0f20a1cc5fe6807661aae"}],"be2998c5b4d0f20a1cc5fe6807661aae":[function(require,module,exports) {
var global = require('../internals/global');

var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');

var isCallable = require('../internals/is-callable');

var classofRaw = require('../internals/classof-raw');

var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object; // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/to-string-tag-support":"db4164dc1ea7e1525cf84b1aa00e80e3","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/classof-raw":"901e5a25291bac244011feea921975b2","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"db4164dc1ea7e1525cf84b1aa00e80e3":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';

},{"../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"a92b509fc5fd0223c7351fe6c6b27164":[function(require,module,exports) {
/* global ActiveXObject -- old IE, WSH */
var anObject = require('../internals/an-object');
var definePropertiesModule = require('../internals/object-define-properties');
var enumBugKeys = require('../internals/enum-bug-keys');
var hiddenKeys = require('../internals/hidden-keys');
var html = require('../internals/html');
var documentCreateElement = require('../internals/document-create-element');
var sharedKey = require('../internals/shared-key');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

},{"../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/object-define-properties":"3ad53cd176876675b1da5125e4bdfafb","../internals/enum-bug-keys":"f973a6d08ba70476eedabcaf4b58c5fb","../internals/hidden-keys":"7cf9eee6c00d9cc7018f7817cf84e3d6","../internals/html":"1918dab06b404ee3e52f081d798c1688","../internals/document-create-element":"cbe47a0c6cb67b97db834ad53049114a","../internals/shared-key":"18fb64363b0383efc58d7addc88469cd"}],"3ad53cd176876675b1da5125e4bdfafb":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug');
var definePropertyModule = require('../internals/object-define-property');
var anObject = require('../internals/an-object');
var toIndexedObject = require('../internals/to-indexed-object');
var objectKeys = require('../internals/object-keys');

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/v8-prototype-define-bug":"a678e0bae4e73cf403d7e7fa4baa92b0","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/object-keys":"ec0d9c7c7614ad542f1a79132cefce40"}],"ec0d9c7c7614ad542f1a79132cefce40":[function(require,module,exports) {
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

},{"../internals/object-keys-internal":"87cfa515865c83e03f632cbb3fb5fffb","../internals/enum-bug-keys":"f973a6d08ba70476eedabcaf4b58c5fb"}],"8d9c8cc419a28d94a4a934b7d6069d20":[function(require,module,exports) {
/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof = require('../internals/classof-raw');
var toIndexedObject = require('../internals/to-indexed-object');
var $getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var arraySlice = require('../internals/array-slice-simple');

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};

},{"../internals/classof-raw":"901e5a25291bac244011feea921975b2","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/object-get-own-property-names":"b422be4dea2e1243d9a0803066cc2d3d","../internals/array-slice-simple":"a98e351776398a94d2cb369f0b75ee01"}],"a98e351776398a94d2cb369f0b75ee01":[function(require,module,exports) {
var global = require('../internals/global');

var toAbsoluteIndex = require('../internals/to-absolute-index');

var lengthOfArrayLike = require('../internals/length-of-array-like');

var createProperty = require('../internals/create-property');

var Array = global.Array;
var max = Math.max;

module.exports = function (O, start, end) {
  var length = lengthOfArrayLike(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = Array(max(fin - k, 0));

  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);

  result.length = n;
  return result;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/to-absolute-index":"ff996ac5a229620b351a78c404035460","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/create-property":"49f209074159e5f6b7cb7c7945792f40"}],"49f209074159e5f6b7cb7c7945792f40":[function(require,module,exports) {
'use strict';
var toPropertyKey = require('../internals/to-property-key');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

},{"../internals/to-property-key":"df2b61336906907f777029fe90c882a8","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a"}],"dfb337afb4b148aa9dffe46df38ed30b":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

exports.f = wellKnownSymbol;

},{"../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"bf4c8f5e34fed6bd24b3ecceb393fa39":[function(require,module,exports) {
var path = require('../internals/path');
var hasOwn = require('../internals/has-own-property');
var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');
var defineProperty = require('../internals/object-define-property').f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

},{"../internals/path":"da95d5e8f7bf2e6702061407876f0910","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/well-known-symbol-wrapped":"dfb337afb4b148aa9dffe46df38ed30b","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f"}],"da95d5e8f7bf2e6702061407876f0910":[function(require,module,exports) {
var global = require('../internals/global');

module.exports = global;
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"b474145c0d35c2cab8be2f2358364fc4":[function(require,module,exports) {
var defineProperty = require('../internals/object-define-property').f;
var hasOwn = require('../internals/has-own-property');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};

},{"../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"5e382939caea5c6e569307d984b5dbfe":[function(require,module,exports) {
var bind = require('../internals/function-bind-context');
var uncurryThis = require('../internals/function-uncurry-this');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var arraySpeciesCreate = require('../internals/array-species-create');

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};

},{"../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/indexed-object":"35ae890303b620d792cd5faa73776178","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/array-species-create":"4d2b0edc3e3584142bbbf5c912729f1b"}],"4d2b0edc3e3584142bbbf5c912729f1b":[function(require,module,exports) {
var arraySpeciesConstructor = require('../internals/array-species-constructor');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

},{"../internals/array-species-constructor":"9afb6eb3880f684405e54b0033eda698"}],"9afb6eb3880f684405e54b0033eda698":[function(require,module,exports) {
var global = require('../internals/global');

var isArray = require('../internals/is-array');

var isConstructor = require('../internals/is-constructor');

var isObject = require('../internals/is-object');

var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');
var Array = global.Array; // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

module.exports = function (originalArray) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return C === undefined ? Array : C;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-array":"4bcb8b0b07b2c32a8e3e3eda35fd2a4d","../internals/is-constructor":"119e842d0827f15b1b4e51c1ee9e98ea","../internals/is-object":"03244e745134af366d66b74456891052","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"119e842d0827f15b1b4e51c1ee9e98ea":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var classof = require('../internals/classof');
var getBuiltIn = require('../internals/get-built-in');
var inspectSource = require('../internals/inspect-source');

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/classof":"be2998c5b4d0f20a1cc5fe6807661aae","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/inspect-source":"2632e39e653b5d5a3bae68e9954b90e4"}],"fc8ddc6c9640106a98675332aa574ae0":[function(require,module,exports) {
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description
'use strict';

var $ = require('../internals/export');

var DESCRIPTORS = require('../internals/descriptors');

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var hasOwn = require('../internals/has-own-property');

var isCallable = require('../internals/is-callable');

var isPrototypeOf = require('../internals/object-is-prototype-of');

var toString = require('../internals/to-string');

var defineProperty = require('../internals/object-define-property').f;

var copyConstructorProperties = require('../internals/copy-constructor-properties');

var NativeSymbol = global.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) || // Safari 12 bug
NativeSymbol().description !== undefined)) {
  var EmptyStringDescriptionStore = {}; // wrap Symbol constructor for correct work with undefined description

  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
    var result = isPrototypeOf(SymbolPrototype, this) ? new NativeSymbol(description) // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
    : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  SymbolWrapper.prototype = SymbolPrototype;
  SymbolPrototype.constructor = SymbolWrapper;
  var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
  var symbolToString = uncurryThis(SymbolPrototype.toString);
  var symbolValueOf = uncurryThis(SymbolPrototype.valueOf);
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  var replace = uncurryThis(''.replace);
  var stringSlice = uncurryThis(''.slice);
  defineProperty(SymbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = symbolValueOf(this);
      var string = symbolToString(symbol);
      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });
  $({
    global: true,
    forced: true
  }, {
    Symbol: SymbolWrapper
  });
}
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/copy-constructor-properties":"df952df9fa85293fe01bbdf9f7116b1b"}],"22a5723c6b9adc82863f75fe4d6aa02b":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.asyncIterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol('asyncIterator');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"878e5e7a6eca0c0aebd8f2162ee18034":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.hasInstance` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.hasinstance
defineWellKnownSymbol('hasInstance');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"d1be54af26eaf596de2c8bd5605385d0":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
defineWellKnownSymbol('isConcatSpreadable');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"274c456f7663ad2f2579dfac2565ee88":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"0d8bc4ff6d782b39eeed61981fe75e80":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.match` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.match
defineWellKnownSymbol('match');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"a007e2acd7ca987a8af6cfd001d3944b":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.matchAll` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.matchall
defineWellKnownSymbol('matchAll');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"be53811d73c2c94733c7cd1577f5341e":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.replace` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.replace
defineWellKnownSymbol('replace');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"f82c4af94dabfc6f261a6b25c4b5e892":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.search` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.search
defineWellKnownSymbol('search');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"754bcfe9cc3ffeb2d9f811573e6d46c5":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.species` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.species
defineWellKnownSymbol('species');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"146261dd7051da790a2d50f6bc620563":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.split` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.split
defineWellKnownSymbol('split');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"1f686f6503bdde082a8f64f8a2ba8354":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.toPrimitive` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.toprimitive
defineWellKnownSymbol('toPrimitive');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"2d096b5cf1f138632c5b57736e89e09d":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.toStringTag` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol('toStringTag');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"da57ca532f83fc13b098f2612d30dd52":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.unscopables` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.unscopables
defineWellKnownSymbol('unscopables');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"162844b97a4ddca19937373f1c1a1230":[function(require,module,exports) {
/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = require('../internals/export');

var global = require('../internals/global');

var apply = require('../internals/function-apply');

var wrapErrorConstructorWithCause = require('../internals/wrap-error-constructor-with-cause');

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global[WEB_ASSEMBLY];
var FORCED = Error('e', {
  cause: 7
}).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({
    global: true,
    forced: FORCED
  }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({
      target: WEB_ASSEMBLY,
      stat: true,
      forced: FORCED
    }, O);
  }
}; // https://github.com/tc39/proposal-error-cause


exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) {
    return apply(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) {
    return apply(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) {
    return apply(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) {
    return apply(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) {
    return apply(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) {
    return apply(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) {
    return apply(init, this, arguments);
  };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) {
    return apply(init, this, arguments);
  };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) {
    return apply(init, this, arguments);
  };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) {
    return apply(init, this, arguments);
  };
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/wrap-error-constructor-with-cause":"ca1ad21877c4b182dda8d04ff0d6b843"}],"ca1ad21877c4b182dda8d04ff0d6b843":[function(require,module,exports) {
'use strict';
var getBuiltIn = require('../internals/get-built-in');
var hasOwn = require('../internals/has-own-property');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var copyConstructorProperties = require('../internals/copy-constructor-properties');
var inheritIfRequired = require('../internals/inherit-if-required');
var normalizeStringArgument = require('../internals/normalize-string-argument');
var installErrorCause = require('../internals/install-error-cause');
var clearErrorStack = require('../internals/clear-error-stack');
var ERROR_STACK_INSTALLABLE = require('../internals/error-stack-installable');
var IS_PURE = require('../internals/is-pure');

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty(result, 'stack', clearErrorStack(result.stack, 2));
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/object-set-prototype-of":"22e756b2221a479eceeccf2a78a39bef","../internals/copy-constructor-properties":"df952df9fa85293fe01bbdf9f7116b1b","../internals/inherit-if-required":"4d9c0ab06f91ed2da925563ab67ef474","../internals/normalize-string-argument":"c3728bb8b61d038eac9a31269a6d58d5","../internals/install-error-cause":"83a5813c0e8b9d6914564ea549ac2727","../internals/clear-error-stack":"55cbf711a9133651a6b71274493547dd","../internals/error-stack-installable":"685896e147d59eedb2588d6645405126","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0"}],"22e756b2221a479eceeccf2a78a39bef":[function(require,module,exports) {
/* eslint-disable no-proto -- safe */
var uncurryThis = require('../internals/function-uncurry-this');
var anObject = require('../internals/an-object');
var aPossiblePrototype = require('../internals/a-possible-prototype');

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/a-possible-prototype":"7ad1739ed58eb8a5f2873ca6b6307773"}],"7ad1739ed58eb8a5f2873ca6b6307773":[function(require,module,exports) {
var global = require('../internals/global');

var isCallable = require('../internals/is-callable');

var String = global.String;
var TypeError = global.TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f"}],"4d9c0ab06f91ed2da925563ab67ef474":[function(require,module,exports) {
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var setPrototypeOf = require('../internals/object-set-prototype-of');

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};

},{"../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/is-object":"03244e745134af366d66b74456891052","../internals/object-set-prototype-of":"22e756b2221a479eceeccf2a78a39bef"}],"c3728bb8b61d038eac9a31269a6d58d5":[function(require,module,exports) {
var toString = require('../internals/to-string');

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};

},{"../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77"}],"83a5813c0e8b9d6914564ea549ac2727":[function(require,module,exports) {
var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};

},{"../internals/is-object":"03244e745134af366d66b74456891052","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33"}],"55cbf711a9133651a6b71274493547dd":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');

var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String(Error(arg).stack); })('zxcasd');
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string') {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"685896e147d59eedb2588d6645405126":[function(require,module,exports) {
var fails = require('../internals/fails');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = !fails(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a"}],"59f47faf65e5b5b5777e8ff86b7c3394":[function(require,module,exports) {
var redefine = require('../internals/redefine');
var errorToString = require('../internals/error-to-string');

var ErrorPrototype = Error.prototype;

// `Error.prototype.toString` method fix
// https://tc39.es/ecma262/#sec-error.prototype.tostring
if (ErrorPrototype.toString !== errorToString) {
  redefine(ErrorPrototype, 'toString', errorToString);
}

},{"../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/error-to-string":"4e673dda1f72bee750e674107b061fe3"}],"4e673dda1f72bee750e674107b061fe3":[function(require,module,exports) {
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var anObject = require('../internals/an-object');
var create = require('../internals/object-create');
var normalizeStringArgument = require('../internals/normalize-string-argument');

var nativeErrorToString = Error.prototype.toString;

var INCORRECT_TO_STRING = fails(function () {
  if (DESCRIPTORS) {
    // Chrome 32- incorrectly call accessor
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var object = create(Object.defineProperty({}, 'name', { get: function () {
      return this === object;
    } }));
    if (nativeErrorToString.call(object) !== 'true') return true;
  }
  // FF10- does not properly handle non-strings
  return nativeErrorToString.call({ message: 1, name: 2 }) !== '2: 1'
    // IE8 does not properly handle defaults
    || nativeErrorToString.call({}) !== 'Error';
});

module.exports = INCORRECT_TO_STRING ? function toString() {
  var O = anObject(this);
  var name = normalizeStringArgument(O.name, 'Error');
  var message = normalizeStringArgument(O.message);
  return !name ? message : !message ? name : name + ': ' + message;
} : nativeErrorToString;

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/normalize-string-argument":"c3728bb8b61d038eac9a31269a6d58d5"}],"741995e2389a9b842aa525008faba857":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var isPrototypeOf = require('../internals/object-is-prototype-of');

var getPrototypeOf = require('../internals/object-get-prototype-of');

var setPrototypeOf = require('../internals/object-set-prototype-of');

var copyConstructorProperties = require('../internals/copy-constructor-properties');

var create = require('../internals/object-create');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var createPropertyDescriptor = require('../internals/create-property-descriptor');

var clearErrorStack = require('../internals/clear-error-stack');

var installErrorCause = require('../internals/install-error-cause');

var iterate = require('../internals/iterate');

var normalizeStringArgument = require('../internals/normalize-string-argument');

var wellKnownSymbol = require('../internals/well-known-symbol');

var ERROR_STACK_INSTALLABLE = require('../internals/error-stack-installable');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Error = global.Error;
var push = [].push;

var $AggregateError = function AggregateError(errors, message
/* , options */
) {
  var options = arguments.length > 2 ? arguments[2] : undefined;
  var isInstance = isPrototypeOf(AggregateErrorPrototype, this);
  var that;

  if (setPrototypeOf) {
    that = setPrototypeOf(new Error(), isInstance ? getPrototypeOf(this) : AggregateErrorPrototype);
  } else {
    that = isInstance ? this : create(AggregateErrorPrototype);
    createNonEnumerableProperty(that, TO_STRING_TAG, 'Error');
  }

  if (message !== undefined) createNonEnumerableProperty(that, 'message', normalizeStringArgument(message));
  if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty(that, 'stack', clearErrorStack(that.stack, 1));
  installErrorCause(that, options);
  var errorsArray = [];
  iterate(errors, push, {
    that: errorsArray
  });
  createNonEnumerableProperty(that, 'errors', errorsArray);
  return that;
};

if (setPrototypeOf) setPrototypeOf($AggregateError, Error);else copyConstructorProperties($AggregateError, Error, {
  name: true
});
var AggregateErrorPrototype = $AggregateError.prototype = create(Error.prototype, {
  constructor: createPropertyDescriptor(1, $AggregateError),
  message: createPropertyDescriptor(1, ''),
  name: createPropertyDescriptor(1, 'AggregateError')
}); // `AggregateError` constructor
// https://tc39.es/ecma262/#sec-aggregate-error-constructor

$({
  global: true
}, {
  AggregateError: $AggregateError
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf","../internals/object-set-prototype-of":"22e756b2221a479eceeccf2a78a39bef","../internals/copy-constructor-properties":"df952df9fa85293fe01bbdf9f7116b1b","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a","../internals/clear-error-stack":"55cbf711a9133651a6b71274493547dd","../internals/install-error-cause":"83a5813c0e8b9d6914564ea549ac2727","../internals/iterate":"33b1bc22ce229618eb94623257686da2","../internals/normalize-string-argument":"c3728bb8b61d038eac9a31269a6d58d5","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/error-stack-installable":"685896e147d59eedb2588d6645405126"}],"50d059706e0afa285234c1608d9f7cbf":[function(require,module,exports) {
var global = require('../internals/global');

var hasOwn = require('../internals/has-own-property');

var isCallable = require('../internals/is-callable');

var toObject = require('../internals/to-object');

var sharedKey = require('../internals/shared-key');

var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var IE_PROTO = sharedKey('IE_PROTO');
var Object = global.Object;
var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof

module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;

  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  }

  return object instanceof Object ? ObjectPrototype : null;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/shared-key":"18fb64363b0383efc58d7addc88469cd","../internals/correct-prototype-getter":"4ac53209b23e730e63e5780536ae74ea"}],"4ac53209b23e730e63e5780536ae74ea":[function(require,module,exports) {
var fails = require('../internals/fails');

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"33b1bc22ce229618eb94623257686da2":[function(require,module,exports) {
var global = require('../internals/global');

var bind = require('../internals/function-bind-context');

var call = require('../internals/function-call');

var anObject = require('../internals/an-object');

var tryToString = require('../internals/try-to-string');

var isArrayIteratorMethod = require('../internals/is-array-iterator-method');

var lengthOfArrayLike = require('../internals/length-of-array-like');

var isPrototypeOf = require('../internals/object-is-prototype-of');

var getIterator = require('../internals/get-iterator');

var getIteratorMethod = require('../internals/get-iterator-method');

var iteratorClose = require('../internals/iterator-close');

var TypeError = global.TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }

    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw TypeError(tryToString(iterable) + ' is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      }

      return new Result(false);
    }

    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;

  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }

    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  }

  return new Result(false);
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/try-to-string":"3fb606768f23a6e9175aba0e8f4c8e20","../internals/is-array-iterator-method":"a65e0e29ed1bf2da6b23fe7f2c1ffad3","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/get-iterator":"95609b3cd4fe60efb5286ed1595b57b7","../internals/get-iterator-method":"ee70e79559122fe97016e526e216278d","../internals/iterator-close":"5e9bf1de406471a090fb81ce721ec2f8"}],"a65e0e29ed1bf2da6b23fe7f2c1ffad3":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

},{"../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/iterators":"c5db2384d76eea25f1bdcd506ac55cef"}],"c5db2384d76eea25f1bdcd506ac55cef":[function(require,module,exports) {
module.exports = {};

},{}],"95609b3cd4fe60efb5286ed1595b57b7":[function(require,module,exports) {
var global = require('../internals/global');

var call = require('../internals/function-call');

var aCallable = require('../internals/a-callable');

var anObject = require('../internals/an-object');

var tryToString = require('../internals/try-to-string');

var getIteratorMethod = require('../internals/get-iterator-method');

var TypeError = global.TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw TypeError(tryToString(argument) + ' is not iterable');
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/try-to-string":"3fb606768f23a6e9175aba0e8f4c8e20","../internals/get-iterator-method":"ee70e79559122fe97016e526e216278d"}],"ee70e79559122fe97016e526e216278d":[function(require,module,exports) {
var classof = require('../internals/classof');
var getMethod = require('../internals/get-method');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};

},{"../internals/classof":"be2998c5b4d0f20a1cc5fe6807661aae","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/iterators":"c5db2384d76eea25f1bdcd506ac55cef","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"5e9bf1de406471a090fb81ce721ec2f8":[function(require,module,exports) {
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var getMethod = require('../internals/get-method');

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};

},{"../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2"}],"3caa726738513e3b2c061c7d4ce7762b":[function(require,module,exports) {
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var apply = require('../internals/function-apply');
var fails = require('../internals/fails');
var wrapErrorConstructorWithCause = require('../internals/wrap-error-constructor-with-cause');

var AGGREGATE_ERROR = 'AggregateError';
var $AggregateError = getBuiltIn(AGGREGATE_ERROR);
var FORCED = !fails(function () {
  return $AggregateError([1]).errors[0] !== 1;
}) && fails(function () {
  return $AggregateError([1], AGGREGATE_ERROR, { cause: 7 }).cause !== 7;
});

// https://github.com/tc39/proposal-error-cause
$({ global: true, forced: FORCED }, {
  AggregateError: wrapErrorConstructorWithCause(AGGREGATE_ERROR, function (init) {
    // eslint-disable-next-line no-unused-vars -- required for functions `.length`
    return function AggregateError(errors, message) { return apply(init, this, arguments); };
  }, FORCED, true)
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/wrap-error-constructor-with-cause":"ca1ad21877c4b182dda8d04ff0d6b843"}],"2edd59f8f85d15e14eb441b2ddbcd55f":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
$({ target: 'Array', proto: true }, {
  at: function at(index) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var relativeIndex = toIntegerOrInfinity(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : O[k];
  }
});

addToUnscopables('at');

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"885b707d011829ca5d38f6b6f8a535df":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');
var create = require('../internals/object-create');
var definePropertyModule = require('../internals/object-define-property');

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

},{"../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f"}],"a862a0828f51c1191c86df473f14bdeb":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var fails = require('../internals/fails');

var isArray = require('../internals/is-array');

var isObject = require('../internals/is-object');

var toObject = require('../internals/to-object');

var lengthOfArrayLike = require('../internals/length-of-array-like');

var createProperty = require('../internals/create-property');

var arraySpeciesCreate = require('../internals/array-species-create');

var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

var wellKnownSymbol = require('../internals/well-known-symbol');

var V8_VERSION = require('../internals/engine-v8-version');

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var TypeError = global.TypeError; // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

$({
  target: 'Array',
  proto: true,
  forced: FORCED
}, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;

    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];

      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }

    A.length = n;
    return A;
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/is-array":"4bcb8b0b07b2c32a8e3e3eda35fd2a4d","../internals/is-object":"03244e745134af366d66b74456891052","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/create-property":"49f209074159e5f6b7cb7c7945792f40","../internals/array-species-create":"4d2b0edc3e3584142bbbf5c912729f1b","../internals/array-method-has-species-support":"008a8663b82d4eb590c0a3fc8a06b039","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/engine-v8-version":"e23493e3b068d06b425cfae337547b80"}],"008a8663b82d4eb590c0a3fc8a06b039":[function(require,module,exports) {
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/engine-v8-version":"e23493e3b068d06b425cfae337547b80"}],"13974954cd935190e581e3c293f09b18":[function(require,module,exports) {
var $ = require('../internals/export');
var copyWithin = require('../internals/array-copy-within');
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.copyWithin` method
// https://tc39.es/ecma262/#sec-array.prototype.copywithin
$({ target: 'Array', proto: true }, {
  copyWithin: copyWithin
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('copyWithin');

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-copy-within":"eb5e4f6d5bcd578e90e61e62805332f4","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"eb5e4f6d5bcd578e90e61e62805332f4":[function(require,module,exports) {
'use strict';
var toObject = require('../internals/to-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var lengthOfArrayLike = require('../internals/length-of-array-like');

var min = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.copywithin
// eslint-disable-next-line es/no-array-prototype-copywithin -- safe
module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = lengthOfArrayLike(O);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/to-absolute-index":"ff996ac5a229620b351a78c404035460","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666"}],"55eba909d5beef52f570d0d2093439ec":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $every = require('../internals/array-iteration').every;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var STRICT_METHOD = arrayMethodIsStrict('every');

// `Array.prototype.every` method
// https://tc39.es/ecma262/#sec-array.prototype.every
$({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe","../internals/array-method-is-strict":"d659abee78cccda196f2e7238bb34986"}],"d659abee78cccda196f2e7238bb34986":[function(require,module,exports) {
'use strict';
var fails = require('../internals/fails');

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"546a2ac6439847f9d7e03c63fd633b01":[function(require,module,exports) {
var $ = require('../internals/export');
var fill = require('../internals/array-fill');
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.fill` method
// https://tc39.es/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-fill":"f859d289ee3bddee8aaf320533aa8737","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"f859d289ee3bddee8aaf320533aa8737":[function(require,module,exports) {
'use strict';
var toObject = require('../internals/to-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var lengthOfArrayLike = require('../internals/length-of-array-like');

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = lengthOfArrayLike(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/to-absolute-index":"ff996ac5a229620b351a78c404035460","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666"}],"63505ccdfba2f5b3c35e0e0d5cd3cf34":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $filter = require('../internals/array-iteration').filter;
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe","../internals/array-method-has-species-support":"008a8663b82d4eb590c0a3fc8a06b039"}],"e7b9f0b868cf352c5044f76fac875241":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $find = require('../internals/array-iteration').find;
var addToUnscopables = require('../internals/add-to-unscopables');

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"4a1b6528619bc27855e858fc4308d93f":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $findIndex = require('../internals/array-iteration').findIndex;
var addToUnscopables = require('../internals/add-to-unscopables');

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

// `Array.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-array.prototype.findindex
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND_INDEX);

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"6d63607c029c91238b86cf5fd247a3d3":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var flattenIntoArray = require('../internals/flatten-into-array');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var arraySpeciesCreate = require('../internals/array-species-create');

// `Array.prototype.flat` method
// https://tc39.es/ecma262/#sec-array.prototype.flat
$({ target: 'Array', proto: true }, {
  flat: function flat(/* depthArg = 1 */) {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg));
    return A;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/flatten-into-array":"bdcc1f2e2d6d3ce27cf032acc90bd534","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f","../internals/array-species-create":"4d2b0edc3e3584142bbbf5c912729f1b"}],"bdcc1f2e2d6d3ce27cf032acc90bd534":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');

var isArray = require('../internals/is-array');

var lengthOfArrayLike = require('../internals/length-of-array-like');

var bind = require('../internals/function-bind-context');

var TypeError = global.TypeError; // `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray

var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg) : false;
  var element, elementLen;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        elementLen = lengthOfArrayLike(element);
        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }

    sourceIndex++;
  }

  return targetIndex;
};

module.exports = flattenIntoArray;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-array":"4bcb8b0b07b2c32a8e3e3eda35fd2a4d","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e"}],"f8721355d792805a15bedd47a14b0ea4":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var flattenIntoArray = require('../internals/flatten-into-array');
var aCallable = require('../internals/a-callable');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var arraySpeciesCreate = require('../internals/array-species-create');

// `Array.prototype.flatMap` method
// https://tc39.es/ecma262/#sec-array.prototype.flatmap
$({ target: 'Array', proto: true }, {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A;
    aCallable(callbackfn);
    A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return A;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/flatten-into-array":"bdcc1f2e2d6d3ce27cf032acc90bd534","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/array-species-create":"4d2b0edc3e3584142bbbf5c912729f1b"}],"3e1187f097ac3c9a292138a2dce47af1":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var forEach = require('../internals/array-for-each');

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-for-each":"d5e0746043fb311b5972ef1996e25d2b"}],"d5e0746043fb311b5972ef1996e25d2b":[function(require,module,exports) {
'use strict';
var $forEach = require('../internals/array-iteration').forEach;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;

},{"../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe","../internals/array-method-is-strict":"d659abee78cccda196f2e7238bb34986"}],"4a62f37cab8aa39273b5e2b382303bb2":[function(require,module,exports) {
var $ = require('../internals/export');
var from = require('../internals/array-from');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-from":"ca2455971d1c96b7905e2122c9d50dab","../internals/check-correctness-of-iteration":"33641ceb9010ed8125d1d18da9ad9225"}],"ca2455971d1c96b7905e2122c9d50dab":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');

var bind = require('../internals/function-bind-context');

var call = require('../internals/function-call');

var toObject = require('../internals/to-object');

var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');

var isArrayIteratorMethod = require('../internals/is-array-iterator-method');

var isConstructor = require('../internals/is-constructor');

var lengthOfArrayLike = require('../internals/length-of-array-like');

var createProperty = require('../internals/create-property');

var getIterator = require('../internals/get-iterator');

var getIteratorMethod = require('../internals/get-iterator-method');

var Array = global.Array; // `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from

module.exports = function from(arrayLike
/* , mapfn = undefined, thisArg = undefined */
) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value; // if the target is not iterable or it's an array with the default iterator - use a simple case

  if (iteratorMethod && !(this == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];

    for (; !(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : Array(length);

    for (; length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }

  result.length = index;
  return result;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/call-with-safe-iteration-closing":"8876d1c56af08599f7b19a406726d554","../internals/is-array-iterator-method":"a65e0e29ed1bf2da6b23fe7f2c1ffad3","../internals/is-constructor":"119e842d0827f15b1b4e51c1ee9e98ea","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/create-property":"49f209074159e5f6b7cb7c7945792f40","../internals/get-iterator":"95609b3cd4fe60efb5286ed1595b57b7","../internals/get-iterator-method":"ee70e79559122fe97016e526e216278d"}],"8876d1c56af08599f7b19a406726d554":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var iteratorClose = require('../internals/iterator-close');

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};

},{"../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/iterator-close":"5e9bf1de406471a090fb81ce721ec2f8"}],"33641ceb9010ed8125d1d18da9ad9225":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

},{"../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"f0c3c9b896b38043d8c491d2b572a7ed":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $includes = require('../internals/array-includes').includes;
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-includes":"8d0989f06759b3b2c526a5860656b2fc","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"c408dfe77754503e646d3b0c542aae65":[function(require,module,exports) {
'use strict';
/* eslint-disable es/no-array-prototype-indexof -- required for testing */
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var $IndexOf = require('../internals/array-includes').indexOf;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var un$IndexOf = uncurryThis([].indexOf);

var NEGATIVE_ZERO = !!un$IndexOf && 1 / un$IndexOf([1], 1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? un$IndexOf(this, searchElement, fromIndex) || 0
      : $IndexOf(this, searchElement, fromIndex);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/array-includes":"8d0989f06759b3b2c526a5860656b2fc","../internals/array-method-is-strict":"d659abee78cccda196f2e7238bb34986"}],"2dbcf8f0c20dd943036e9b8087d1e869":[function(require,module,exports) {
var $ = require('../internals/export');
var isArray = require('../internals/is-array');

// `Array.isArray` method
// https://tc39.es/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-array":"4bcb8b0b07b2c32a8e3e3eda35fd2a4d"}],"510aceb4694d90a939f4789a99a0ae3f":[function(require,module,exports) {
'use strict';
var toIndexedObject = require('../internals/to-indexed-object');
var addToUnscopables = require('../internals/add-to-unscopables');
var Iterators = require('../internals/iterators');
var InternalStateModule = require('../internals/internal-state');
var defineProperty = require('../internals/object-define-property').f;
var defineIterator = require('../internals/define-iterator');
var IS_PURE = require('../internals/is-pure');
var DESCRIPTORS = require('../internals/descriptors');

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }

},{"../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df","../internals/iterators":"c5db2384d76eea25f1bdcd506ac55cef","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/define-iterator":"89cab28f14b0323e9b7f5add1d23fc79","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b"}],"89cab28f14b0323e9b7f5add1d23fc79":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var IS_PURE = require('../internals/is-pure');
var FunctionName = require('../internals/function-name');
var isCallable = require('../internals/is-callable');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var setToStringTag = require('../internals/set-to-string-tag');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');
var IteratorsCore = require('../internals/iterators-core');

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          redefine(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    redefine(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/function-name":"8c9a0dc6f151e22aaeb5f0e18e363d7d","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/create-iterator-constructor":"b9bab68ecd62fef0c0fd01853566a2cf","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf","../internals/object-set-prototype-of":"22e756b2221a479eceeccf2a78a39bef","../internals/set-to-string-tag":"b474145c0d35c2cab8be2f2358364fc4","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/iterators":"c5db2384d76eea25f1bdcd506ac55cef","../internals/iterators-core":"8a1b93d778cdbd6c63966f348e8ad566"}],"b9bab68ecd62fef0c0fd01853566a2cf":[function(require,module,exports) {
'use strict';
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var setToStringTag = require('../internals/set-to-string-tag');
var Iterators = require('../internals/iterators');

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

},{"../internals/iterators-core":"8a1b93d778cdbd6c63966f348e8ad566","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a","../internals/set-to-string-tag":"b474145c0d35c2cab8be2f2358364fc4","../internals/iterators":"c5db2384d76eea25f1bdcd506ac55cef"}],"8a1b93d778cdbd6c63966f348e8ad566":[function(require,module,exports) {
'use strict';
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var create = require('../internals/object-create');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var redefine = require('../internals/redefine');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  redefine(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0"}],"c768e274774620ac747ce01355f2f85e":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var IndexedObject = require('../internals/indexed-object');
var toIndexedObject = require('../internals/to-indexed-object');
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var un$Join = uncurryThis([].join);

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return un$Join(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/indexed-object":"35ae890303b620d792cd5faa73776178","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/array-method-is-strict":"d659abee78cccda196f2e7238bb34986"}],"1746425f5523216b8aef957ea55ad218":[function(require,module,exports) {
var $ = require('../internals/export');
var lastIndexOf = require('../internals/array-last-index-of');

// `Array.prototype.lastIndexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
// eslint-disable-next-line es/no-array-prototype-lastindexof -- required for testing
$({ target: 'Array', proto: true, forced: lastIndexOf !== [].lastIndexOf }, {
  lastIndexOf: lastIndexOf
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-last-index-of":"5a6493d53f2377c028ddee225c52adeb"}],"5a6493d53f2377c028ddee225c52adeb":[function(require,module,exports) {
'use strict';
/* eslint-disable es/no-array-prototype-lastindexof -- safe */
var apply = require('../internals/function-apply');
var toIndexedObject = require('../internals/to-indexed-object');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var min = Math.min;
var $lastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!$lastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
var FORCED = NEGATIVE_ZERO || !STRICT_METHOD;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
module.exports = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return apply($lastIndexOf, this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = lengthOfArrayLike(O);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toIntegerOrInfinity(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : $lastIndexOf;

},{"../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/array-method-is-strict":"d659abee78cccda196f2e7238bb34986"}],"4ddddde331fe3c7d0ced83bcaf505b0c":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $map = require('../internals/array-iteration').map;
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe","../internals/array-method-has-species-support":"008a8663b82d4eb590c0a3fc8a06b039"}],"dd2c9767c60dce8fab934acf0c8c787c":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var fails = require('../internals/fails');

var isConstructor = require('../internals/is-constructor');

var createProperty = require('../internals/create-property');

var Array = global.Array;
var ISNT_GENERIC = fails(function () {
  function F() {
    /* empty */
  }

  return !(Array.of.call(F) instanceof F);
}); // `Array.of` method
// https://tc39.es/ecma262/#sec-array.of
// WebKit Array.of isn't generic

$({
  target: 'Array',
  stat: true,
  forced: ISNT_GENERIC
}, {
  of: function
    /* ...args */
  of() {
    var index = 0;
    var argumentsLength = arguments.length;
    var result = new (isConstructor(this) ? this : Array)(argumentsLength);

    while (argumentsLength > index) createProperty(result, index, arguments[index++]);

    result.length = argumentsLength;
    return result;
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/is-constructor":"119e842d0827f15b1b4e51c1ee9e98ea","../internals/create-property":"49f209074159e5f6b7cb7c7945792f40"}],"35f3014929c88d5836a05c31275e0336":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $reduce = require('../internals/array-reduce').left;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var CHROME_VERSION = require('../internals/engine-v8-version');
var IS_NODE = require('../internals/engine-is-node');

var STRICT_METHOD = arrayMethodIsStrict('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-reduce":"96b61c2f8c6fac7e881ba14255366f70","../internals/array-method-is-strict":"d659abee78cccda196f2e7238bb34986","../internals/engine-v8-version":"e23493e3b068d06b425cfae337547b80","../internals/engine-is-node":"42c67226e3ca045b9c35647f16133bfa"}],"96b61c2f8c6fac7e881ba14255366f70":[function(require,module,exports) {
var global = require('../internals/global');

var aCallable = require('../internals/a-callable');

var toObject = require('../internals/to-object');

var IndexedObject = require('../internals/indexed-object');

var lengthOfArrayLike = require('../internals/length-of-array-like');

var TypeError = global.TypeError; // `Array.prototype.{ reduce, reduceRight }` methods implementation

var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aCallable(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(O);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }

      index += i;

      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }

    for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }

    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/indexed-object":"35ae890303b620d792cd5faa73776178","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666"}],"a518dc9918b60fd6c2567066786056cb":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $reduceRight = require('../internals/array-reduce').right;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var CHROME_VERSION = require('../internals/engine-v8-version');
var IS_NODE = require('../internals/engine-is-node');

var STRICT_METHOD = arrayMethodIsStrict('reduceRight');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduceRight` method
// https://tc39.es/ecma262/#sec-array.prototype.reduceright
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduceRight(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-reduce":"96b61c2f8c6fac7e881ba14255366f70","../internals/array-method-is-strict":"d659abee78cccda196f2e7238bb34986","../internals/engine-v8-version":"e23493e3b068d06b425cfae337547b80","../internals/engine-is-node":"42c67226e3ca045b9c35647f16133bfa"}],"959c1b542360d83f3c1efee1afd66713":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var isArray = require('../internals/is-array');

var un$Reverse = uncurryThis([].reverse);
var test = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.es/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign -- dirty hack
    if (isArray(this)) this.length = this.length;
    return un$Reverse(this);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/is-array":"4bcb8b0b07b2c32a8e3e3eda35fd2a4d"}],"a3f78c760e56a02d67ad562a0b76f546":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var isArray = require('../internals/is-array');

var isConstructor = require('../internals/is-constructor');

var isObject = require('../internals/is-object');

var toAbsoluteIndex = require('../internals/to-absolute-index');

var lengthOfArrayLike = require('../internals/length-of-array-like');

var toIndexedObject = require('../internals/to-indexed-object');

var createProperty = require('../internals/create-property');

var wellKnownSymbol = require('../internals/well-known-symbol');

var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

var un$Slice = require('../internals/array-slice');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var SPECIES = wellKnownSymbol('species');
var Array = global.Array;
var max = Math.max; // `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

$({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT
}, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

    var Constructor, result, n;

    if (isArray(O)) {
      Constructor = O.constructor; // cross-realm fallback

      if (isConstructor(Constructor) && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }

      if (Constructor === Array || Constructor === undefined) {
        return un$Slice(O, k, fin);
      }
    }

    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));

    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

    result.length = n;
    return result;
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-array":"4bcb8b0b07b2c32a8e3e3eda35fd2a4d","../internals/is-constructor":"119e842d0827f15b1b4e51c1ee9e98ea","../internals/is-object":"03244e745134af366d66b74456891052","../internals/to-absolute-index":"ff996ac5a229620b351a78c404035460","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/create-property":"49f209074159e5f6b7cb7c7945792f40","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/array-method-has-species-support":"008a8663b82d4eb590c0a3fc8a06b039","../internals/array-slice":"d58518bc0d77fd7d4bbb2d854257bf40"}],"fc5e3f708bb994fde7f420457b59248f":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $some = require('../internals/array-iteration').some;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var STRICT_METHOD = arrayMethodIsStrict('some');

// `Array.prototype.some` method
// https://tc39.es/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe","../internals/array-method-is-strict":"d659abee78cccda196f2e7238bb34986"}],"24c955eb9b5c477c2e41b2651bb5369d":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var toString = require('../internals/to-string');
var fails = require('../internals/fails');
var internalSort = require('../internals/array-sort');
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var FF = require('../internals/engine-ff-version');
var IE_OR_EDGE = require('../internals/engine-is-ie-or-edge');
var V8 = require('../internals/engine-v8-version');
var WEBKIT = require('../internals/engine-webkit-version');

var test = [];
var un$Sort = uncurryThis(test.sort);
var push = uncurryThis(test.push);

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT = !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 70;
  if (FF && FF > 3) return;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }

  test.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString(x) > toString(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);

    var array = toObject(this);

    if (STABLE_SORT) return comparefn === undefined ? un$Sort(array) : un$Sort(array, comparefn);

    var items = [];
    var arrayLength = lengthOfArrayLike(array);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) push(items, array[index]);
    }

    internalSort(items, getSortCompare(comparefn));

    itemsLength = items.length;
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) delete array[index++];

    return array;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/array-sort":"d7faf6b35c1ed5a2bc73ccee2639a205","../internals/array-method-is-strict":"d659abee78cccda196f2e7238bb34986","../internals/engine-ff-version":"3b4ad7b5fc87b1e8937fc01bcac78a78","../internals/engine-is-ie-or-edge":"4dfa925fa1c30ab0259840df105bd9cd","../internals/engine-v8-version":"e23493e3b068d06b425cfae337547b80","../internals/engine-webkit-version":"84a6eba9ab851a96fed23c7afcb16964"}],"d7faf6b35c1ed5a2bc73ccee2639a205":[function(require,module,exports) {
var arraySlice = require('../internals/array-slice-simple');

var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice(array, 0, middle), comparefn),
    mergeSort(arraySlice(array, middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = (lindex < llength && rindex < rlength)
      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
      : lindex < llength ? left[lindex++] : right[rindex++];
  } return array;
};

module.exports = mergeSort;

},{"../internals/array-slice-simple":"a98e351776398a94d2cb369f0b75ee01"}],"3b4ad7b5fc87b1e8937fc01bcac78a78":[function(require,module,exports) {
var userAgent = require('../internals/engine-user-agent');

var firefox = userAgent.match(/firefox\/(\d+)/i);

module.exports = !!firefox && +firefox[1];

},{"../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828"}],"4dfa925fa1c30ab0259840df105bd9cd":[function(require,module,exports) {
var UA = require('../internals/engine-user-agent');

module.exports = /MSIE|Trident/.test(UA);

},{"../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828"}],"84a6eba9ab851a96fed23c7afcb16964":[function(require,module,exports) {
var userAgent = require('../internals/engine-user-agent');

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

module.exports = !!webkit && +webkit[1];

},{"../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828"}],"675eb72d2501c69b2e30726ea8a0072f":[function(require,module,exports) {
var setSpecies = require('../internals/set-species');

// `Array[@@species]` getter
// https://tc39.es/ecma262/#sec-get-array-@@species
setSpecies('Array');

},{"../internals/set-species":"e3f4ec2b9d910d5e576300937f95e2c2"}],"e3f4ec2b9d910d5e576300937f95e2c2":[function(require,module,exports) {
'use strict';
var getBuiltIn = require('../internals/get-built-in');
var definePropertyModule = require('../internals/object-define-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var DESCRIPTORS = require('../internals/descriptors');

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b"}],"09807e9ab639e714dac1a1c49e95caab":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var toAbsoluteIndex = require('../internals/to-absolute-index');

var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var lengthOfArrayLike = require('../internals/length-of-array-like');

var toObject = require('../internals/to-object');

var arraySpeciesCreate = require('../internals/array-species-create');

var createProperty = require('../internals/create-property');

var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var TypeError = global.TypeError;
var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species

$({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT
}, {
  splice: function splice(start, deleteCount
  /* , ...items */
  ) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;

    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }

    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }

    A = arraySpeciesCreate(O, actualDeleteCount);

    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }

    A.length = actualDeleteCount;

    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];else delete O[to];
      }

      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];else delete O[to];
      }
    }

    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }

    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/to-absolute-index":"ff996ac5a229620b351a78c404035460","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/array-species-create":"4d2b0edc3e3584142bbbf5c912729f1b","../internals/create-property":"49f209074159e5f6b7cb7c7945792f40","../internals/array-method-has-species-support":"008a8663b82d4eb590c0a3fc8a06b039"}],"03467547d6a5155577e726ecab8ac4de":[function(require,module,exports) {
// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = require('../internals/add-to-unscopables');

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('flat');

},{"../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"7166fcec20bd96b92fc3aa31dc051149":[function(require,module,exports) {
// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = require('../internals/add-to-unscopables');

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('flatMap');

},{"../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"f71cec60660bace78c6e88fcb8f95dff":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var arrayBufferModule = require('../internals/array-buffer');

var setSpecies = require('../internals/set-species');

var ARRAY_BUFFER = 'ArrayBuffer';
var ArrayBuffer = arrayBufferModule[ARRAY_BUFFER];
var NativeArrayBuffer = global[ARRAY_BUFFER]; // `ArrayBuffer` constructor
// https://tc39.es/ecma262/#sec-arraybuffer-constructor

$({
  global: true,
  forced: NativeArrayBuffer !== ArrayBuffer
}, {
  ArrayBuffer: ArrayBuffer
});
setSpecies(ARRAY_BUFFER);
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/array-buffer":"3466d92de28aaf0afa876d9d5f82bf85","../internals/set-species":"e3f4ec2b9d910d5e576300937f95e2c2"}],"3466d92de28aaf0afa876d9d5f82bf85":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var DESCRIPTORS = require('../internals/descriptors');

var NATIVE_ARRAY_BUFFER = require('../internals/array-buffer-native');

var FunctionName = require('../internals/function-name');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var redefineAll = require('../internals/redefine-all');

var fails = require('../internals/fails');

var anInstance = require('../internals/an-instance');

var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var toLength = require('../internals/to-length');

var toIndex = require('../internals/to-index');

var IEEE754 = require('../internals/ieee754');

var getPrototypeOf = require('../internals/object-get-prototype-of');

var setPrototypeOf = require('../internals/object-set-prototype-of');

var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;

var defineProperty = require('../internals/object-define-property').f;

var arrayFill = require('../internals/array-fill');

var arraySlice = require('../internals/array-slice-simple');

var setToStringTag = require('../internals/set-to-string-tag');

var InternalStateModule = require('../internals/internal-state');

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var ArrayBufferPrototype = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
var $DataView = global[DATA_VIEW];
var DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype = Object.prototype;
var Array = global.Array;
var RangeError = global.RangeError;
var fill = uncurryThis(arrayFill);
var reverse = uncurryThis([].reverse);
var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, {
    get: function () {
      return getInternalState(this)[key];
    }
  });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = arraySlice(bytes, start, start + count);
  return isLittleEndian ? pack : reverse(pack);
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);

  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, ArrayBufferPrototype);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: fill(Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE];

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, DataViewPrototype);
    anInstance(buffer, ArrayBufferPrototype);
    var bufferLength = getInternalState(buffer).byteLength;
    var offset = toIntegerOrInfinity(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });

    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  DataViewPrototype = $DataView[PROTOTYPE];

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll(DataViewPrototype, {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset
    /* , littleEndian */
    ) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset
    /* , littleEndian */
    ) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset
    /* , littleEndian */
    ) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset
    /* , littleEndian */
    ) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset
    /* , littleEndian */
    ) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset
    /* , littleEndian */
    ) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value
    /* , littleEndian */
    ) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME && NativeArrayBuffer.name !== ARRAY_BUFFER;
  /* eslint-disable no-new -- required for testing */

  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1);
  }) || fails(function () {
    new NativeArrayBuffer();
    new NativeArrayBuffer(1.5);
    new NativeArrayBuffer(NaN);
    return INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
  })) {
    /* eslint-enable no-new -- required for testing */
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, ArrayBufferPrototype);
      return new NativeArrayBuffer(toIndex(length));
    };

    $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype;

    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }

    ArrayBufferPrototype.constructor = $ArrayBuffer;
  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
    createNonEnumerableProperty(NativeArrayBuffer, 'name', ARRAY_BUFFER);
  } // WebKit bug - the same parent prototype for typed arrays and data view


  if (setPrototypeOf && getPrototypeOf(DataViewPrototype) !== ObjectPrototype) {
    setPrototypeOf(DataViewPrototype, ObjectPrototype);
  } // iOS Safari 7.x bug


  var testView = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = uncurryThis(DataViewPrototype.setInt8);
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll(DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    }
  }, {
    unsafe: true
  });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/array-buffer-native":"54e97eb83124a07837893444bf79b59f","../internals/function-name":"8c9a0dc6f151e22aaeb5f0e18e363d7d","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/redefine-all":"ffd35f1bc6f8a9cf26e6fa0389f4748d","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/an-instance":"8b0daff12bd798defdb69ae41eea7f5e","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f","../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f","../internals/to-index":"0bb880d085cbd3bcde3887ce0606ee2e","../internals/ieee754":"4d8433859e198fb129ffab0f8372c4ab","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf","../internals/object-set-prototype-of":"22e756b2221a479eceeccf2a78a39bef","../internals/object-get-own-property-names":"b422be4dea2e1243d9a0803066cc2d3d","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/array-fill":"f859d289ee3bddee8aaf320533aa8737","../internals/array-slice-simple":"a98e351776398a94d2cb369f0b75ee01","../internals/set-to-string-tag":"b474145c0d35c2cab8be2f2358364fc4","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1"}],"54e97eb83124a07837893444bf79b59f":[function(require,module,exports) {
// eslint-disable-next-line es/no-typed-arrays -- safe
module.exports = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

},{}],"ffd35f1bc6f8a9cf26e6fa0389f4748d":[function(require,module,exports) {
var redefine = require('../internals/redefine');

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};

},{"../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60"}],"8b0daff12bd798defdb69ae41eea7f5e":[function(require,module,exports) {
var global = require('../internals/global');

var isPrototypeOf = require('../internals/object-is-prototype-of');

var TypeError = global.TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw TypeError('Incorrect invocation');
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d"}],"0bb880d085cbd3bcde3887ce0606ee2e":[function(require,module,exports) {
var global = require('../internals/global');

var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var toLength = require('../internals/to-length');

var RangeError = global.RangeError; // `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex

module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toIntegerOrInfinity(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f","../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f"}],"4d8433859e198fb129ffab0f8372c4ab":[function(require,module,exports) {
// IEEE754 conversions based on https://github.com/feross/ieee754
var global = require('../internals/global');

var Array = global.Array;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number); // eslint-disable-next-line no-self-compare -- NaN check

  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare -- NaN check
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    c = pow(2, -exponent);

    if (number * c < 1) {
      exponent--;
      c *= 2;
    }

    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }

    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }

    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }

  while (mantissaLength >= 8) {
    buffer[index++] = mantissa & 255;
    mantissa /= 256;
    mantissaLength -= 8;
  }

  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;

  while (exponentLength > 0) {
    buffer[index++] = exponent & 255;
    exponent /= 256;
    exponentLength -= 8;
  }

  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;

  while (nBits > 0) {
    exponent = exponent * 256 + buffer[index--];
    nBits -= 8;
  }

  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;

  while (nBits > 0) {
    mantissa = mantissa * 256 + buffer[index--];
    nBits -= 8;
  }

  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  }

  return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

module.exports = {
  pack: pack,
  unpack: unpack
};
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"3401f292c24751b6d4f391cfa0e9ad00":[function(require,module,exports) {
var $ = require('../internals/export');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

// `ArrayBuffer.isView` method
// https://tc39.es/ecma262/#sec-arraybuffer.isview
$({ target: 'ArrayBuffer', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
  isView: ArrayBufferViewCore.isView
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb"}],"1ec92502c86abde7ba5eb9b6cea40afb":[function(require,module,exports) {
'use strict';

var NATIVE_ARRAY_BUFFER = require('../internals/array-buffer-native');

var DESCRIPTORS = require('../internals/descriptors');

var global = require('../internals/global');

var isCallable = require('../internals/is-callable');

var isObject = require('../internals/is-object');

var hasOwn = require('../internals/has-own-property');

var classof = require('../internals/classof');

var tryToString = require('../internals/try-to-string');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var redefine = require('../internals/redefine');

var defineProperty = require('../internals/object-define-property').f;

var isPrototypeOf = require('../internals/object-is-prototype-of');

var getPrototypeOf = require('../internals/object-get-prototype-of');

var setPrototypeOf = require('../internals/object-set-prototype-of');

var wellKnownSymbol = require('../internals/well-known-symbol');

var uid = require('../internals/uid');

var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError = global.TypeError;
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = uid('TYPED_ARRAY_CONSTRUCTOR'); // Fixing native typed arrays in Opera Presto crashes the browser, see #595

var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;
var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};
var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return klass === 'DataView' || hasOwn(TypedArrayConstructorsList, klass) || hasOwn(BigIntArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return hasOwn(TypedArrayConstructorsList, klass) || hasOwn(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;
  throw TypeError(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced, options) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
      // old WebKit bug - some methods are non-configurable
      try {
        TypedArrayConstructor.prototype[KEY] = property;
      } catch (error2) {
        /* empty */
      }
    }
  }

  if (!TypedArrayPrototype[KEY] || forced) {
    redefine(TypedArrayPrototype, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;

  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) {
        /* empty */
      }
    }

    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) {
        /* empty */
      }
    } else return;
  }

  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];

    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR, Constructor);else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR, Constructor);
} // WebKit bug - typed arrays constructors prototype is Object.prototype


if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };

  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
} // WebKit bug - one more object in Uint8ClampedArray prototype chain


if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, {
    get: function () {
      return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
    }
  });

  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_CONSTRUCTOR: TYPED_ARRAY_CONSTRUCTOR,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};
},{"../internals/array-buffer-native":"54e97eb83124a07837893444bf79b59f","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/is-object":"03244e745134af366d66b74456891052","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/classof":"be2998c5b4d0f20a1cc5fe6807661aae","../internals/try-to-string":"3fb606768f23a6e9175aba0e8f4c8e20","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf","../internals/object-set-prototype-of":"22e756b2221a479eceeccf2a78a39bef","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/uid":"d5b7e7679d9dac163ab327cbf9508501"}],"e17a8f9b05fd096fd5934d7c81baa998":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var ArrayBufferModule = require('../internals/array-buffer');
var anObject = require('../internals/an-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toLength = require('../internals/to-length');
var speciesConstructor = require('../internals/species-constructor');

var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var DataViewPrototype = DataView.prototype;
var un$ArrayBufferSlice = uncurryThis(ArrayBuffer.prototype.slice);
var getUint8 = uncurryThis(DataViewPrototype.getUint8);
var setUint8 = uncurryThis(DataViewPrototype.setUint8);

var INCORRECT_SLICE = fails(function () {
  return !new ArrayBuffer(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
$({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (un$ArrayBufferSlice && end === undefined) {
      return un$ArrayBufferSlice(anObject(this), start); // FF fix
    }
    var length = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = new (speciesConstructor(this, ArrayBuffer))(toLength(fin - first));
    var viewSource = new DataView(this);
    var viewTarget = new DataView(result);
    var index = 0;
    while (first < fin) {
      setUint8(viewTarget, index++, getUint8(viewSource, first++));
    } return result;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/array-buffer":"3466d92de28aaf0afa876d9d5f82bf85","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-absolute-index":"ff996ac5a229620b351a78c404035460","../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f","../internals/species-constructor":"a110df2a5900fb30b4239748c46982d8"}],"a110df2a5900fb30b4239748c46982d8":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var aConstructor = require('../internals/a-constructor');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};

},{"../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/a-constructor":"68a3572cb2f4921c4818116046759501","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"68a3572cb2f4921c4818116046759501":[function(require,module,exports) {
var global = require('../internals/global');

var isConstructor = require('../internals/is-constructor');

var tryToString = require('../internals/try-to-string');

var TypeError = global.TypeError; // `Assert: IsConstructor(argument) is true`

module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a constructor');
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-constructor":"119e842d0827f15b1b4e51c1ee9e98ea","../internals/try-to-string":"3fb606768f23a6e9175aba0e8f4c8e20"}],"8a7d10ad9ad1cc94acab6270d331a776":[function(require,module,exports) {
var $ = require('../internals/export');
var ArrayBufferModule = require('../internals/array-buffer');
var NATIVE_ARRAY_BUFFER = require('../internals/array-buffer-native');

// `DataView` constructor
// https://tc39.es/ecma262/#sec-dataview-constructor
$({ global: true, forced: !NATIVE_ARRAY_BUFFER }, {
  DataView: ArrayBufferModule.DataView
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-buffer":"3466d92de28aaf0afa876d9d5f82bf85","../internals/array-buffer-native":"54e97eb83124a07837893444bf79b59f"}],"de6b1e0b9accc45b2da49b93061add68":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');

var FORCED = fails(function () {
  return new Date(16e11).getYear() !== 120;
});

var getFullYear = uncurryThis(Date.prototype.getFullYear);

// `Date.prototype.getYear` method
// https://tc39.es/ecma262/#sec-date.prototype.getyear
$({ target: 'Date', proto: true, forced: FORCED }, {
  getYear: function getYear() {
    return getFullYear(this) - 1900;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"6070744ceefd95744689506a8b93b17b":[function(require,module,exports) {
var $ = require('../internals/export');

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var Date = global.Date;
var getTime = uncurryThis(Date.prototype.getTime); // `Date.now` method
// https://tc39.es/ecma262/#sec-date.now

$({
  target: 'Date',
  stat: true
}, {
  now: function now() {
    return getTime(new Date());
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"09b3d7f602aae49f7024fe9c9d17a4f2":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var DatePrototype = Date.prototype;
var getTime = uncurryThis(DatePrototype.getTime);
var setFullYear = uncurryThis(DatePrototype.setFullYear);

// `Date.prototype.setYear` method
// https://tc39.es/ecma262/#sec-date.prototype.setyear
$({ target: 'Date', proto: true }, {
  setYear: function setYear(year) {
    // validate
    getTime(this);
    var yi = toIntegerOrInfinity(year);
    var yyyy = 0 <= yi && yi <= 99 ? yi + 1900 : yi;
    return setFullYear(this, yyyy);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f"}],"4b0eafcca5796160bbfa5b713f932d54":[function(require,module,exports) {
var $ = require('../internals/export');

// `Date.prototype.toGMTString` method
// https://tc39.es/ecma262/#sec-date.prototype.togmtstring
$({ target: 'Date', proto: true }, {
  toGMTString: Date.prototype.toUTCString
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"bf72b77c1df93b257903a615cf7aadaa":[function(require,module,exports) {
var $ = require('../internals/export');
var toISOString = require('../internals/date-to-iso-string');

// `Date.prototype.toISOString` method
// https://tc39.es/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit has a broken implementations
$({ target: 'Date', proto: true, forced: Date.prototype.toISOString !== toISOString }, {
  toISOString: toISOString
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/date-to-iso-string":"2e57624640a90951079daf8620321b82"}],"2e57624640a90951079daf8620321b82":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var fails = require('../internals/fails');

var padStart = require('../internals/string-pad').start;

var RangeError = global.RangeError;
var abs = Math.abs;
var DatePrototype = Date.prototype;
var n$DateToISOString = DatePrototype.toISOString;
var getTime = uncurryThis(DatePrototype.getTime);
var getUTCDate = uncurryThis(DatePrototype.getUTCDate);
var getUTCFullYear = uncurryThis(DatePrototype.getUTCFullYear);
var getUTCHours = uncurryThis(DatePrototype.getUTCHours);
var getUTCMilliseconds = uncurryThis(DatePrototype.getUTCMilliseconds);
var getUTCMinutes = uncurryThis(DatePrototype.getUTCMinutes);
var getUTCMonth = uncurryThis(DatePrototype.getUTCMonth);
var getUTCSeconds = uncurryThis(DatePrototype.getUTCSeconds); // `Date.prototype.toISOString` method implementation
// https://tc39.es/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit fails here:

module.exports = fails(function () {
  return n$DateToISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  n$DateToISOString.call(new Date(NaN));
}) ? function toISOString() {
  if (!isFinite(getTime(this))) throw RangeError('Invalid time value');
  var date = this;
  var year = getUTCFullYear(date);
  var milliseconds = getUTCMilliseconds(date);
  var sign = year < 0 ? '-' : year > 9999 ? '+' : '';
  return sign + padStart(abs(year), sign ? 6 : 4, 0) + '-' + padStart(getUTCMonth(date) + 1, 2, 0) + '-' + padStart(getUTCDate(date), 2, 0) + 'T' + padStart(getUTCHours(date), 2, 0) + ':' + padStart(getUTCMinutes(date), 2, 0) + ':' + padStart(getUTCSeconds(date), 2, 0) + '.' + padStart(milliseconds, 3, 0) + 'Z';
} : n$DateToISOString;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/string-pad":"14fdfa116c4beae657c87c3904b98ff7"}],"14fdfa116c4beae657c87c3904b98ff7":[function(require,module,exports) {
// https://github.com/tc39/proposal-string-pad-start-end
var uncurryThis = require('../internals/function-uncurry-this');
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var $repeat = require('../internals/string-repeat');
var requireObjectCoercible = require('../internals/require-object-coercible');

var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var ceil = Math.ceil;

// `String.prototype.{ padStart, padEnd }` methods implementation
var createMethod = function (IS_END) {
  return function ($this, maxLength, fillString) {
    var S = toString(requireObjectCoercible($this));
    var intMaxLength = toLength(maxLength);
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : toString(fillString);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr == '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringSlice(stringFiller, 0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

module.exports = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: createMethod(false),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: createMethod(true)
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/string-repeat":"e13c88d4c3e9f60dd634cd30678b1b2c","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37"}],"e13c88d4c3e9f60dd634cd30678b1b2c":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');

var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var toString = require('../internals/to-string');

var requireObjectCoercible = require('../internals/require-object-coercible');

var RangeError = global.RangeError; // `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat

module.exports = function repeat(count) {
  var str = toString(requireObjectCoercible(this));
  var result = '';
  var n = toIntegerOrInfinity(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');

  for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;

  return result;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37"}],"3a03436511e8439ce337319bf2109380":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var fails = require('../internals/fails');
var toObject = require('../internals/to-object');
var toPrimitive = require('../internals/to-primitive');

var FORCED = fails(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
});

// `Date.prototype.toJSON` method
// https://tc39.es/ecma262/#sec-date.prototype.tojson
$({ target: 'Date', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O, 'number');
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/to-primitive":"2a7f05f0f9119d3b88a770acfa30cc7b"}],"e5f8c33c17826ba5955f6eba3f140d25":[function(require,module,exports) {
var hasOwn = require('../internals/has-own-property');
var redefine = require('../internals/redefine');
var dateToPrimitive = require('../internals/date-to-primitive');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var DatePrototype = Date.prototype;

// `Date.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
if (!hasOwn(DatePrototype, TO_PRIMITIVE)) {
  redefine(DatePrototype, TO_PRIMITIVE, dateToPrimitive);
}

},{"../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/date-to-primitive":"1d32ee71db02d018db58e8ae6e3999d7","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"1d32ee71db02d018db58e8ae6e3999d7":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');

var anObject = require('../internals/an-object');

var ordinaryToPrimitive = require('../internals/ordinary-to-primitive');

var TypeError = global.TypeError; // `Date.prototype[@@toPrimitive](hint)` method implementation
// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive

module.exports = function (hint) {
  anObject(this);
  if (hint === 'string' || hint === 'default') hint = 'string';else if (hint !== 'number') throw TypeError('Incorrect hint');
  return ordinaryToPrimitive(this, hint);
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/ordinary-to-primitive":"beb7e03593f40bc8230218c946b07a98"}],"acd5c19c32763d0e58772b0f3a087f13":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var redefine = require('../internals/redefine');

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var un$DateToString = uncurryThis(DatePrototype[TO_STRING]);
var getTime = uncurryThis(DatePrototype.getTime);

// `Date.prototype.toString` method
// https://tc39.es/ecma262/#sec-date.prototype.tostring
if (String(new Date(NaN)) != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime(this);
    // eslint-disable-next-line no-self-compare -- NaN check
    return value === value ? un$DateToString(this) : INVALID_DATE;
  });
}

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60"}],"43a6136370237431940f96bda5eef9c7":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var toString = require('../internals/to-string');

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var exec = uncurryThis(/./.exec);
var numberToString = uncurryThis(1.0.toString);
var toUpperCase = uncurryThis(''.toUpperCase);

var raw = /[\w*+\-./@]/;

var hex = function (code, length) {
  var result = numberToString(code, 16);
  while (result.length < length) result = '0' + result;
  return result;
};

// `escape` method
// https://tc39.es/ecma262/#sec-escape-string
$({ global: true }, {
  escape: function escape(string) {
    var str = toString(string);
    var result = '';
    var length = str.length;
    var index = 0;
    var chr, code;
    while (index < length) {
      chr = charAt(str, index++);
      if (exec(raw, chr)) {
        result += chr;
      } else {
        code = charCodeAt(chr, 0);
        if (code < 256) {
          result += '%' + hex(code, 2);
        } else {
          result += '%u' + toUpperCase(hex(code, 4));
        }
      }
    } return result;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77"}],"9ea13665a55aa2d14faacd810351ee4d":[function(require,module,exports) {
var $ = require('../internals/export');
var bind = require('../internals/function-bind');

// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
$({ target: 'Function', proto: true }, {
  bind: bind
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-bind":"dc03bec42aa3bec1e6a2bbc5d8f44a0e"}],"dc03bec42aa3bec1e6a2bbc5d8f44a0e":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var aCallable = require('../internals/a-callable');

var isObject = require('../internals/is-object');

var hasOwn = require('../internals/has-own-property');

var arraySlice = require('../internals/array-slice');

var Function = global.Function;
var concat = uncurryThis([].concat);
var join = uncurryThis([].join);
var factories = {};

var construct = function (C, argsLength, args) {
  if (!hasOwn(factories, argsLength)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';

    factories[argsLength] = Function('C,a', 'return new C(' + join(list, ',') + ')');
  }

  return factories[argsLength](C, args);
}; // `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind


module.exports = Function.bind || function bind(that
/* , ...args */
) {
  var F = aCallable(this);
  var Prototype = F.prototype;
  var partArgs = arraySlice(arguments, 1);

  var boundFunction = function
    /* args... */
  bound() {
    var args = concat(partArgs, arraySlice(arguments));
    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
  };

  if (isObject(Prototype)) boundFunction.prototype = Prototype;
  return boundFunction;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/is-object":"03244e745134af366d66b74456891052","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/array-slice":"d58518bc0d77fd7d4bbb2d854257bf40"}],"88b81f5878c89b20bbead891542111fa":[function(require,module,exports) {
'use strict';
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var definePropertyModule = require('../internals/object-define-property');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var wellKnownSymbol = require('../internals/well-known-symbol');

var HAS_INSTANCE = wellKnownSymbol('hasInstance');
var FunctionPrototype = Function.prototype;

// `Function.prototype[@@hasInstance]` method
// https://tc39.es/ecma262/#sec-function.prototype-@@hasinstance
if (!(HAS_INSTANCE in FunctionPrototype)) {
  definePropertyModule.f(FunctionPrototype, HAS_INSTANCE, { value: function (O) {
    if (!isCallable(this) || !isObject(O)) return false;
    var P = this.prototype;
    if (!isObject(P)) return O instanceof this;
    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
    while (O = getPrototypeOf(O)) if (P === O) return true;
    return false;
  } });
}

},{"../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/is-object":"03244e745134af366d66b74456891052","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"ecb3822e25df1aa4794b9d576e6808b1":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var FUNCTION_NAME_EXISTS = require('../internals/function-name').EXISTS;
var uncurryThis = require('../internals/function-uncurry-this');
var defineProperty = require('../internals/object-define-property').f;

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis(FunctionPrototype.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec = uncurryThis(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/function-name":"8c9a0dc6f151e22aaeb5f0e18e363d7d","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f"}],"025e716370e78a150c710af7f87c7c5c":[function(require,module,exports) {
var $ = require('../internals/export');

var global = require('../internals/global'); // `globalThis` object
// https://tc39.es/ecma262/#sec-globalthis


$({
  global: true
}, {
  globalThis: global
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917"}],"501224af9e4a8dd9c558c39bd4d60d63":[function(require,module,exports) {
var $ = require('../internals/export');

var global = require('../internals/global');

var getBuiltIn = require('../internals/get-built-in');

var apply = require('../internals/function-apply');

var uncurryThis = require('../internals/function-uncurry-this');

var fails = require('../internals/fails');

var Array = global.Array;
var $stringify = getBuiltIn('JSON', 'stringify');
var exec = uncurryThis(/./.exec);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var replace = uncurryThis(''.replace);
var numberToString = uncurryThis(1.0.toString);
var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var fix = function (match, offset, string) {
  var prev = charAt(string, offset - 1);
  var next = charAt(string, offset + 1);

  if (exec(low, match) && !exec(hi, next) || exec(hi, match) && !exec(low, prev)) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  }

  return match;
};

var FORCED = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"' || $stringify('\uDEAD') !== '"\\udead"';
});

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  // https://github.com/tc39/proposal-well-formed-stringify
  $({
    target: 'JSON',
    stat: true,
    forced: FORCED
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      for (var i = 0, l = arguments.length, args = Array(l); i < l; i++) args[i] = arguments[i];

      var result = apply($stringify, null, args);
      return typeof result == 'string' ? replace(result, tester, fix) : result;
    }
  });
}
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"11e6edc097c9488da6afa2e906d649d5":[function(require,module,exports) {
var global = require('../internals/global');

var setToStringTag = require('../internals/set-to-string-tag'); // JSON[@@toStringTag] property
// https://tc39.es/ecma262/#sec-json-@@tostringtag


setToStringTag(global.JSON, 'JSON', true);
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/set-to-string-tag":"b474145c0d35c2cab8be2f2358364fc4"}],"21e6c4cb86e4f5adaeb26fb92f746ee3":[function(require,module,exports) {
'use strict';
var collection = require('../internals/collection');
var collectionStrong = require('../internals/collection-strong');

// `Map` constructor
// https://tc39.es/ecma262/#sec-map-objects
collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

},{"../internals/collection":"9abd6360ae544576f2e0cf88529c952a","../internals/collection-strong":"3e3fc8f420de7716b8e1e915c96fd63d"}],"9abd6360ae544576f2e0cf88529c952a":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var isForced = require('../internals/is-forced');

var redefine = require('../internals/redefine');

var InternalMetadataModule = require('../internals/internal-metadata');

var iterate = require('../internals/iterate');

var anInstance = require('../internals/an-instance');

var isCallable = require('../internals/is-callable');

var isObject = require('../internals/is-object');

var fails = require('../internals/fails');

var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');

var setToStringTag = require('../internals/set-to-string-tag');

var inheritIfRequired = require('../internals/inherit-if-required');

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var uncurriedNativeMethod = uncurryThis(NativePrototype[KEY]);
    redefine(NativePrototype, KEY, KEY == 'add' ? function add(value) {
      uncurriedNativeMethod(this, value === 0 ? 0 : value);
      return this;
    } : KEY == 'delete' ? function (key) {
      return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
    } : KEY == 'get' ? function get(key) {
      return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
    } : KEY == 'has' ? function has(key) {
      return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
    } : function set(key, value) {
      uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
      return this;
    });
  };

  var REPLACE = isForced(CONSTRUCTOR_NAME, !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })));

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.enable();
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor(); // early implementations not supports chaining

    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false

    var THROWS_ON_PRIMITIVES = fails(function () {
      instance.has(1);
    }); // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing

    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
      new NativeConstructor(iterable);
    }); // for early implementations -0 and +0 not the same

    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;

      while (index--) $instance[ADDER](index, index);

      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, NativePrototype);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], {
          that: that,
          AS_ENTRIES: IS_MAP
        });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({
    global: true,
    forced: Constructor != NativeConstructor
  }, exported);
  setToStringTag(Constructor, CONSTRUCTOR_NAME);
  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
  return Constructor;
};
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/is-forced":"700278f8e2cb4c21784f4e50866ce0e4","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/internal-metadata":"1f02b54bcbf6deb5035c0fd624813fd6","../internals/iterate":"33b1bc22ce229618eb94623257686da2","../internals/an-instance":"8b0daff12bd798defdb69ae41eea7f5e","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/is-object":"03244e745134af366d66b74456891052","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/check-correctness-of-iteration":"33641ceb9010ed8125d1d18da9ad9225","../internals/set-to-string-tag":"b474145c0d35c2cab8be2f2358364fc4","../internals/inherit-if-required":"4d9c0ab06f91ed2da925563ab67ef474"}],"1f02b54bcbf6deb5035c0fd624813fd6":[function(require,module,exports) {
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var hiddenKeys = require('../internals/hidden-keys');
var isObject = require('../internals/is-object');
var hasOwn = require('../internals/has-own-property');
var defineProperty = require('../internals/object-define-property').f;
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertyNamesExternalModule = require('../internals/object-get-own-property-names-external');
var isExtensible = require('../internals/object-is-extensible');
var uid = require('../internals/uid');
var FREEZING = require('../internals/freezing');

var REQUIRED = false;
var METADATA = uid('meta');
var id = 0;

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + id++, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
  return it;
};

var enable = function () {
  meta.enable = function () { /* empty */ };
  REQUIRED = true;
  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  var splice = uncurryThis([].splice);
  var test = {};
  test[METADATA] = 1;

  // prevent exposing of metadata key
  if (getOwnPropertyNames(test).length) {
    getOwnPropertyNamesModule.f = function (it) {
      var result = getOwnPropertyNames(it);
      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice(result, i, 1);
          break;
        }
      } return result;
    };

    $({ target: 'Object', stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};

var meta = module.exports = {
  enable: enable,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/hidden-keys":"7cf9eee6c00d9cc7018f7817cf84e3d6","../internals/is-object":"03244e745134af366d66b74456891052","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/object-get-own-property-names":"b422be4dea2e1243d9a0803066cc2d3d","../internals/object-get-own-property-names-external":"8d9c8cc419a28d94a4a934b7d6069d20","../internals/object-is-extensible":"1a3376452166a7b57634b63d80a6b36f","../internals/uid":"d5b7e7679d9dac163ab327cbf9508501","../internals/freezing":"d366f8307370c3dd6fbfe0b3a19fdf3b"}],"1a3376452166a7b57634b63d80a6b36f":[function(require,module,exports) {
var fails = require('../internals/fails');
var isObject = require('../internals/is-object');
var classof = require('../internals/classof-raw');
var ARRAY_BUFFER_NON_EXTENSIBLE = require('../internals/array-buffer-non-extensible');

// eslint-disable-next-line es/no-object-isextensible -- safe
var $isExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails(function () { $isExtensible(1); });

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
module.exports = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
  if (!isObject(it)) return false;
  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) == 'ArrayBuffer') return false;
  return $isExtensible ? $isExtensible(it) : true;
} : $isExtensible;

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/is-object":"03244e745134af366d66b74456891052","../internals/classof-raw":"901e5a25291bac244011feea921975b2","../internals/array-buffer-non-extensible":"33786b0978a8a5a51f80d5b469ed1a5c"}],"33786b0978a8a5a51f80d5b469ed1a5c":[function(require,module,exports) {
// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
var fails = require('../internals/fails');

module.exports = fails(function () {
  if (typeof ArrayBuffer == 'function') {
    var buffer = new ArrayBuffer(8);
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
  }
});

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"d366f8307370c3dd6fbfe0b3a19fdf3b":[function(require,module,exports) {
var fails = require('../internals/fails');

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"3e3fc8f420de7716b8e1e915c96fd63d":[function(require,module,exports) {
'use strict';
var defineProperty = require('../internals/object-define-property').f;
var create = require('../internals/object-create');
var redefineAll = require('../internals/redefine-all');
var bind = require('../internals/function-bind-context');
var anInstance = require('../internals/an-instance');
var iterate = require('../internals/iterate');
var defineIterator = require('../internals/define-iterator');
var setSpecies = require('../internals/set-species');
var DESCRIPTORS = require('../internals/descriptors');
var fastKey = require('../internals/internal-metadata').fastKey;
var InternalStateModule = require('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(Prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(Prototype, IS_MAP ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(Prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return Constructor;
  },
  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
    defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species
    setSpecies(CONSTRUCTOR_NAME);
  }
};

},{"../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/redefine-all":"ffd35f1bc6f8a9cf26e6fa0389f4748d","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/an-instance":"8b0daff12bd798defdb69ae41eea7f5e","../internals/iterate":"33b1bc22ce229618eb94623257686da2","../internals/define-iterator":"89cab28f14b0323e9b7f5add1d23fc79","../internals/set-species":"e3f4ec2b9d910d5e576300937f95e2c2","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/internal-metadata":"1f02b54bcbf6deb5035c0fd624813fd6","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1"}],"19141692964c19cd3ccf0507280ee948":[function(require,module,exports) {
var $ = require('../internals/export');
var log1p = require('../internals/math-log1p');

// eslint-disable-next-line es/no-math-acosh -- required for testing
var $acosh = Math.acosh;
var log = Math.log;
var sqrt = Math.sqrt;
var LN2 = Math.LN2;

var FORCED = !$acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  || Math.floor($acosh(Number.MAX_VALUE)) != 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  || $acosh(Infinity) != Infinity;

// `Math.acosh` method
// https://tc39.es/ecma262/#sec-math.acosh
$({ target: 'Math', stat: true, forced: FORCED }, {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? log(x) + LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/math-log1p":"9c4a14f418d1306da7d3fba3b371a565"}],"9c4a14f418d1306da7d3fba3b371a565":[function(require,module,exports) {
var log = Math.log;

// `Math.log1p` method implementation
// https://tc39.es/ecma262/#sec-math.log1p
// eslint-disable-next-line es/no-math-log1p -- safe
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
};

},{}],"d3b8f8e3e896cf795c8167a878e0779f":[function(require,module,exports) {
var $ = require('../internals/export');

// eslint-disable-next-line es/no-math-asinh -- required for testing
var $asinh = Math.asinh;
var log = Math.log;
var sqrt = Math.sqrt;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
}

// `Math.asinh` method
// https://tc39.es/ecma262/#sec-math.asinh
// Tor Browser bug: Math.asinh(0) -> -0
$({ target: 'Math', stat: true, forced: !($asinh && 1 / $asinh(0) > 0) }, {
  asinh: asinh
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"589647b86d8a21a8e0d9e7dcc1516ee9":[function(require,module,exports) {
var $ = require('../internals/export');

// eslint-disable-next-line es/no-math-atanh -- required for testing
var $atanh = Math.atanh;
var log = Math.log;

// `Math.atanh` method
// https://tc39.es/ecma262/#sec-math.atanh
// Tor Browser bug: Math.atanh(-0) -> 0
$({ target: 'Math', stat: true, forced: !($atanh && 1 / $atanh(-0) < 0) }, {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"554b2b64b730932bb18b86a852749134":[function(require,module,exports) {
var $ = require('../internals/export');
var sign = require('../internals/math-sign');

var abs = Math.abs;
var pow = Math.pow;

// `Math.cbrt` method
// https://tc39.es/ecma262/#sec-math.cbrt
$({ target: 'Math', stat: true }, {
  cbrt: function cbrt(x) {
    return sign(x = +x) * pow(abs(x), 1 / 3);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/math-sign":"521c5f02301e99236d8327dfb7e13740"}],"521c5f02301e99236d8327dfb7e13740":[function(require,module,exports) {
// `Math.sign` method implementation
// https://tc39.es/ecma262/#sec-math.sign
// eslint-disable-next-line es/no-math-sign -- safe
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],"9c3aa379b9d23faf583a544a5314185b":[function(require,module,exports) {
var $ = require('../internals/export');

var floor = Math.floor;
var log = Math.log;
var LOG2E = Math.LOG2E;

// `Math.clz32` method
// https://tc39.es/ecma262/#sec-math.clz32
$({ target: 'Math', stat: true }, {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - floor(log(x + 0.5) * LOG2E) : 32;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"c4c75ee607bef988d564f557dc047e50":[function(require,module,exports) {
var $ = require('../internals/export');
var expm1 = require('../internals/math-expm1');

// eslint-disable-next-line es/no-math-cosh -- required for testing
var $cosh = Math.cosh;
var abs = Math.abs;
var E = Math.E;

// `Math.cosh` method
// https://tc39.es/ecma262/#sec-math.cosh
$({ target: 'Math', stat: true, forced: !$cosh || $cosh(710) === Infinity }, {
  cosh: function cosh(x) {
    var t = expm1(abs(x) - 1) + 1;
    return (t + 1 / (t * E * E)) * (E / 2);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/math-expm1":"5610439f27b5ab58b85b355001747e3f"}],"5610439f27b5ab58b85b355001747e3f":[function(require,module,exports) {
// eslint-disable-next-line es/no-math-expm1 -- safe
var $expm1 = Math.expm1;
var exp = Math.exp;

// `Math.expm1` method implementation
// https://tc39.es/ecma262/#sec-math.expm1
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
} : $expm1;

},{}],"60d8e753dc5d14f1bb23d4d0c01bc2cd":[function(require,module,exports) {
var $ = require('../internals/export');
var expm1 = require('../internals/math-expm1');

// `Math.expm1` method
// https://tc39.es/ecma262/#sec-math.expm1
// eslint-disable-next-line es/no-math-expm1 -- required for testing
$({ target: 'Math', stat: true, forced: expm1 != Math.expm1 }, { expm1: expm1 });

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/math-expm1":"5610439f27b5ab58b85b355001747e3f"}],"5d0fa900ab4c3ad8014785d29d56e7ac":[function(require,module,exports) {
var $ = require('../internals/export');
var fround = require('../internals/math-fround');

// `Math.fround` method
// https://tc39.es/ecma262/#sec-math.fround
$({ target: 'Math', stat: true }, { fround: fround });

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/math-fround":"3f149d8dcb124d2d1a907cb49e1da9db"}],"3f149d8dcb124d2d1a907cb49e1da9db":[function(require,module,exports) {
var sign = require('../internals/math-sign');

var abs = Math.abs;
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

// `Math.fround` method implementation
// https://tc39.es/ecma262/#sec-math.fround
// eslint-disable-next-line es/no-math-fround -- safe
module.exports = Math.fround || function fround(x) {
  var $abs = abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"../internals/math-sign":"521c5f02301e99236d8327dfb7e13740"}],"5ec828b5cbe7c94b4d83b25fd3b3e02c":[function(require,module,exports) {
var $ = require('../internals/export');

// eslint-disable-next-line es/no-math-hypot -- required for testing
var $hypot = Math.hypot;
var abs = Math.abs;
var sqrt = Math.sqrt;

// Chrome 77 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=9546
var BUGGY = !!$hypot && $hypot(Infinity, NaN) !== Infinity;

// `Math.hypot` method
// https://tc39.es/ecma262/#sec-math.hypot
$({ target: 'Math', stat: true, forced: BUGGY }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  hypot: function hypot(value1, value2) {
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * sqrt(sum);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"c62a8203380b14ab58f20204e3362800":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');

// eslint-disable-next-line es/no-math-imul -- required for testing
var $imul = Math.imul;

var FORCED = fails(function () {
  return $imul(0xFFFFFFFF, 5) != -5 || $imul.length != 2;
});

// `Math.imul` method
// https://tc39.es/ecma262/#sec-math.imul
// some WebKit versions fails with big numbers, some has wrong arity
$({ target: 'Math', stat: true, forced: FORCED }, {
  imul: function imul(x, y) {
    var UINT16 = 0xFFFF;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"b57963d3bc647611f69c9436a40d672b":[function(require,module,exports) {
var $ = require('../internals/export');
var log10 = require('../internals/math-log10');

// `Math.log10` method
// https://tc39.es/ecma262/#sec-math.log10
$({ target: 'Math', stat: true }, {
  log10: log10
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/math-log10":"3b8b11a78f64e3309bf229999d29b9f8"}],"3b8b11a78f64e3309bf229999d29b9f8":[function(require,module,exports) {
var log = Math.log;
var LOG10E = Math.LOG10E;

// eslint-disable-next-line es/no-math-log10 -- safe
module.exports = Math.log10 || function log10(x) {
  return log(x) * LOG10E;
};

},{}],"d2ec62a4f038b15776fe530a713fe5f0":[function(require,module,exports) {
var $ = require('../internals/export');
var log1p = require('../internals/math-log1p');

// `Math.log1p` method
// https://tc39.es/ecma262/#sec-math.log1p
$({ target: 'Math', stat: true }, { log1p: log1p });

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/math-log1p":"9c4a14f418d1306da7d3fba3b371a565"}],"ed95ec26b293b4e116072c18a6113566":[function(require,module,exports) {
var $ = require('../internals/export');

var log = Math.log;
var LN2 = Math.LN2;

// `Math.log2` method
// https://tc39.es/ecma262/#sec-math.log2
$({ target: 'Math', stat: true }, {
  log2: function log2(x) {
    return log(x) / LN2;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"769d7246e398e2d836ca653275dd437a":[function(require,module,exports) {
var $ = require('../internals/export');
var sign = require('../internals/math-sign');

// `Math.sign` method
// https://tc39.es/ecma262/#sec-math.sign
$({ target: 'Math', stat: true }, {
  sign: sign
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/math-sign":"521c5f02301e99236d8327dfb7e13740"}],"94c9909d4aa2b34d6c77c798c003d53a":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var expm1 = require('../internals/math-expm1');

var abs = Math.abs;
var exp = Math.exp;
var E = Math.E;

var FORCED = fails(function () {
  // eslint-disable-next-line es/no-math-sinh -- required for testing
  return Math.sinh(-2e-17) != -2e-17;
});

// `Math.sinh` method
// https://tc39.es/ecma262/#sec-math.sinh
// V8 near Chromium 38 has a problem with very small numbers
$({ target: 'Math', stat: true, forced: FORCED }, {
  sinh: function sinh(x) {
    return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/math-expm1":"5610439f27b5ab58b85b355001747e3f"}],"b63d3e6f27d0748c75d264ac8a1088d9":[function(require,module,exports) {
var $ = require('../internals/export');
var expm1 = require('../internals/math-expm1');

var exp = Math.exp;

// `Math.tanh` method
// https://tc39.es/ecma262/#sec-math.tanh
$({ target: 'Math', stat: true }, {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/math-expm1":"5610439f27b5ab58b85b355001747e3f"}],"7034d33c389100c9120c4e0b96e0a8cb":[function(require,module,exports) {
var setToStringTag = require('../internals/set-to-string-tag');

// Math[@@toStringTag] property
// https://tc39.es/ecma262/#sec-math-@@tostringtag
setToStringTag(Math, 'Math', true);

},{"../internals/set-to-string-tag":"b474145c0d35c2cab8be2f2358364fc4"}],"51d1e746a75ce81d410932ab0cd8e2b1":[function(require,module,exports) {
var $ = require('../internals/export');

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
$({ target: 'Math', stat: true }, {
  trunc: function trunc(it) {
    return (it > 0 ? floor : ceil)(it);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"4e98c31e46afac75e32a5b31e678a67d":[function(require,module,exports) {
'use strict';

var DESCRIPTORS = require('../internals/descriptors');

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var isForced = require('../internals/is-forced');

var redefine = require('../internals/redefine');

var hasOwn = require('../internals/has-own-property');

var inheritIfRequired = require('../internals/inherit-if-required');

var isPrototypeOf = require('../internals/object-is-prototype-of');

var isSymbol = require('../internals/is-symbol');

var toPrimitive = require('../internals/to-primitive');

var fails = require('../internals/fails');

var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;

var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

var defineProperty = require('../internals/object-define-property').f;

var thisNumberValue = require('../internals/this-number-value');

var trim = require('../internals/string-trim').trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError = global.TypeError;
var arraySlice = uncurryThis(''.slice);
var charCodeAt = uncurryThis(''.charCodeAt); // `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric

var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
}; // `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber


var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw TypeError('Cannot convert a Symbol value to a number');

  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = charCodeAt(it, 0);

    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        // fast equal of /^0b[01]+$/i

        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        // fast equal of /^0o[0-7]+$/i

        default:
          return +it;
      }

      digits = arraySlice(it, 2);
      length = digits.length;

      for (index = 0; index < length; index++) {
        code = charCodeAt(digits, index); // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols

        if (code < 48 || code > maxCode) return NaN;
      }

      return parseInt(digits, radix);
    }
  }

  return +it;
}; // `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor


if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    var dummy = this; // check on 1..constructor(foo) case

    return isPrototypeOf(NumberPrototype, dummy) && fails(function () {
      thisNumberValue(dummy);
    }) ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
  };

  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : ( // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES2015 (in case, if modules with ES2015 Number statics required before):
  'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' + // ESNext
  'fromString,range').split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }

  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}
},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/is-forced":"700278f8e2cb4c21784f4e50866ce0e4","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/inherit-if-required":"4d9c0ab06f91ed2da925563ab67ef474","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/is-symbol":"7500e07108c47e5d25bda62049b8b4ba","../internals/to-primitive":"2a7f05f0f9119d3b88a770acfa30cc7b","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/object-get-own-property-names":"b422be4dea2e1243d9a0803066cc2d3d","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/this-number-value":"6cc23f40e07afaa5e4a427ab2430bd83","../internals/string-trim":"a979dc28c1aabf3dc5ff186df039987b"}],"6cc23f40e07afaa5e4a427ab2430bd83":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"a979dc28c1aabf3dc5ff186df039987b":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toString = require('../internals/to-string');
var whitespaces = require('../internals/whitespaces');

var replace = uncurryThis(''.replace);
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/whitespaces":"2e1181e35cded9a2f558d468336bfc66"}],"2e1181e35cded9a2f558d468336bfc66":[function(require,module,exports) {
// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"6a88be76c83fe816ff906c2caa5be1ab":[function(require,module,exports) {
var $ = require('../internals/export');

// `Number.EPSILON` constant
// https://tc39.es/ecma262/#sec-number.epsilon
$({ target: 'Number', stat: true }, {
  EPSILON: Math.pow(2, -52)
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"e2d8f15ec256e5fa14b35254742f0488":[function(require,module,exports) {
var $ = require('../internals/export');
var numberIsFinite = require('../internals/number-is-finite');

// `Number.isFinite` method
// https://tc39.es/ecma262/#sec-number.isfinite
$({ target: 'Number', stat: true }, { isFinite: numberIsFinite });

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/number-is-finite":"e3533e216c5dfe4e1a620c6996cb2d9e"}],"e3533e216c5dfe4e1a620c6996cb2d9e":[function(require,module,exports) {
var global = require('../internals/global');

var globalIsFinite = global.isFinite; // `Number.isFinite` method
// https://tc39.es/ecma262/#sec-number.isfinite
// eslint-disable-next-line es/no-number-isfinite -- safe

module.exports = Number.isFinite || function isFinite(it) {
  return typeof it == 'number' && globalIsFinite(it);
};
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"611f2e5653cf1dba6af71c1de7abc19b":[function(require,module,exports) {
var $ = require('../internals/export');
var isIntegralNumber = require('../internals/is-integral-number');

// `Number.isInteger` method
// https://tc39.es/ecma262/#sec-number.isinteger
$({ target: 'Number', stat: true }, {
  isInteger: isIntegralNumber
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-integral-number":"e4e1b979db7d4b104d155f8ac0bf76c9"}],"e4e1b979db7d4b104d155f8ac0bf76c9":[function(require,module,exports) {
var isObject = require('../internals/is-object');

var floor = Math.floor;

// `IsIntegralNumber` abstract operation
// https://tc39.es/ecma262/#sec-isintegralnumber
// eslint-disable-next-line es/no-number-isinteger -- safe
module.exports = Number.isInteger || function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"../internals/is-object":"03244e745134af366d66b74456891052"}],"2703383b1a8a3bef02ceac451a3230f0":[function(require,module,exports) {
var $ = require('../internals/export');

// `Number.isNaN` method
// https://tc39.es/ecma262/#sec-number.isnan
$({ target: 'Number', stat: true }, {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return number != number;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"f243865be94f80456ab6b03b6f529a6d":[function(require,module,exports) {
var $ = require('../internals/export');
var isIntegralNumber = require('../internals/is-integral-number');

var abs = Math.abs;

// `Number.isSafeInteger` method
// https://tc39.es/ecma262/#sec-number.issafeinteger
$({ target: 'Number', stat: true }, {
  isSafeInteger: function isSafeInteger(number) {
    return isIntegralNumber(number) && abs(number) <= 0x1FFFFFFFFFFFFF;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-integral-number":"e4e1b979db7d4b104d155f8ac0bf76c9"}],"8f30442dc860af4bc0000c7bf8e06700":[function(require,module,exports) {
var $ = require('../internals/export');

// `Number.MAX_SAFE_INTEGER` constant
// https://tc39.es/ecma262/#sec-number.max_safe_integer
$({ target: 'Number', stat: true }, {
  MAX_SAFE_INTEGER: 0x1FFFFFFFFFFFFF
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"3efc9772eb5766c13d9d2674cfaaa6d5":[function(require,module,exports) {
var $ = require('../internals/export');

// `Number.MIN_SAFE_INTEGER` constant
// https://tc39.es/ecma262/#sec-number.min_safe_integer
$({ target: 'Number', stat: true }, {
  MIN_SAFE_INTEGER: -0x1FFFFFFFFFFFFF
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"c91c6b30668f8fc1378aeb280ecb4f5d":[function(require,module,exports) {
var $ = require('../internals/export');
var parseFloat = require('../internals/number-parse-float');

// `Number.parseFloat` method
// https://tc39.es/ecma262/#sec-number.parseFloat
// eslint-disable-next-line es/no-number-parsefloat -- required for testing
$({ target: 'Number', stat: true, forced: Number.parseFloat != parseFloat }, {
  parseFloat: parseFloat
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/number-parse-float":"222d9905a88cec8921f98eb0a1be7e69"}],"222d9905a88cec8921f98eb0a1be7e69":[function(require,module,exports) {
var global = require('../internals/global');

var fails = require('../internals/fails');

var uncurryThis = require('../internals/function-uncurry-this');

var toString = require('../internals/to-string');

var trim = require('../internals/string-trim').trim;

var whitespaces = require('../internals/whitespaces');

var charAt = uncurryThis(''.charAt);
var n$ParseFloat = global.parseFloat;
var Symbol = global.Symbol;
var ITERATOR = Symbol && Symbol.iterator;
var FORCED = 1 / n$ParseFloat(whitespaces + '-0') !== -Infinity // MS Edge 18- broken with boxed symbols
|| ITERATOR && !fails(function () {
  n$ParseFloat(Object(ITERATOR));
}); // `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string

module.exports = FORCED ? function parseFloat(string) {
  var trimmedString = trim(toString(string));
  var result = n$ParseFloat(trimmedString);
  return result === 0 && charAt(trimmedString, 0) == '-' ? -0 : result;
} : n$ParseFloat;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/string-trim":"a979dc28c1aabf3dc5ff186df039987b","../internals/whitespaces":"2e1181e35cded9a2f558d468336bfc66"}],"1dc2b9c7776b950d044b3109a005031f":[function(require,module,exports) {
var $ = require('../internals/export');
var parseInt = require('../internals/number-parse-int');

// `Number.parseInt` method
// https://tc39.es/ecma262/#sec-number.parseint
// eslint-disable-next-line es/no-number-parseint -- required for testing
$({ target: 'Number', stat: true, forced: Number.parseInt != parseInt }, {
  parseInt: parseInt
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/number-parse-int":"18ae48f2771f3f34c758ef3ebcc738dc"}],"18ae48f2771f3f34c758ef3ebcc738dc":[function(require,module,exports) {
var global = require('../internals/global');

var fails = require('../internals/fails');

var uncurryThis = require('../internals/function-uncurry-this');

var toString = require('../internals/to-string');

var trim = require('../internals/string-trim').trim;

var whitespaces = require('../internals/whitespaces');

var $parseInt = global.parseInt;
var Symbol = global.Symbol;
var ITERATOR = Symbol && Symbol.iterator;
var hex = /^[+-]?0x/i;
var exec = uncurryThis(hex.exec);
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22 // MS Edge 18- broken with boxed symbols
|| ITERATOR && !fails(function () {
  $parseInt(Object(ITERATOR));
}); // `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix

module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(toString(string));
  return $parseInt(S, radix >>> 0 || (exec(hex, S) ? 16 : 10));
} : $parseInt;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/string-trim":"a979dc28c1aabf3dc5ff186df039987b","../internals/whitespaces":"2e1181e35cded9a2f558d468336bfc66"}],"6365ffca9e686792b48377b831b925be":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var thisNumberValue = require('../internals/this-number-value');

var $repeat = require('../internals/string-repeat');

var log10 = require('../internals/math-log10');

var fails = require('../internals/fails');

var RangeError = global.RangeError;
var String = global.String;
var isFinite = global.isFinite;
var abs = Math.abs;
var floor = Math.floor;
var pow = Math.pow;
var round = Math.round;
var un$ToExponential = uncurryThis(1.0.toExponential);
var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice); // Edge 17-

var ROUNDS_PROPERLY = un$ToExponential(-6.9e-11, 4) === '-6.9000e-11' // IE11- && Edge 14-
&& un$ToExponential(1.255, 2) === '1.25e+0' // FF86-, V8 ~ Chrome 49-50
&& un$ToExponential(12345, 3) === '1.235e+4' // FF86-, V8 ~ Chrome 49-50
&& un$ToExponential(25, 0) === '3e+1'; // IE8-

var THROWS_ON_INFINITY_FRACTION = fails(function () {
  un$ToExponential(1, Infinity);
}) && fails(function () {
  un$ToExponential(1, -Infinity);
}); // Safari <11 && FF <50

var PROPER_NON_FINITE_THIS_CHECK = !fails(function () {
  un$ToExponential(Infinity, Infinity);
}) && !fails(function () {
  un$ToExponential(NaN, Infinity);
});
var FORCED = !ROUNDS_PROPERLY || !THROWS_ON_INFINITY_FRACTION || !PROPER_NON_FINITE_THIS_CHECK; // `Number.prototype.toExponential` method
// https://tc39.es/ecma262/#sec-number.prototype.toexponential

$({
  target: 'Number',
  proto: true,
  forced: FORCED
}, {
  toExponential: function toExponential(fractionDigits) {
    var x = thisNumberValue(this);
    if (fractionDigits === undefined) return un$ToExponential(x);
    var f = toIntegerOrInfinity(fractionDigits);
    if (!isFinite(x)) return String(x); // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation

    if (f < 0 || f > 20) throw RangeError('Incorrect fraction digits');
    if (ROUNDS_PROPERLY) return un$ToExponential(x, f);
    var s = '';
    var m = '';
    var e = 0;
    var c = '';
    var d = '';

    if (x < 0) {
      s = '-';
      x = -x;
    }

    if (x === 0) {
      e = 0;
      m = repeat('0', f + 1);
    } else {
      // this block is based on https://gist.github.com/SheetJSDev/1100ad56b9f856c95299ed0e068eea08
      // TODO: improve accuracy with big fraction digits
      var l = log10(x);
      e = floor(l);
      var n = 0;
      var w = pow(10, e - f);
      n = round(x / w);

      if (2 * x >= (2 * n + 1) * w) {
        n += 1;
      }

      if (n >= pow(10, f + 1)) {
        n /= 10;
        e += 1;
      }

      m = String(n);
    }

    if (f !== 0) {
      m = stringSlice(m, 0, 1) + '.' + stringSlice(m, 1);
    }

    if (e === 0) {
      c = '+';
      d = '0';
    } else {
      c = e > 0 ? '+' : '-';
      d = String(abs(e));
    }

    m += 'e' + c + d;
    return s + m;
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f","../internals/this-number-value":"6cc23f40e07afaa5e4a427ab2430bd83","../internals/string-repeat":"e13c88d4c3e9f60dd634cd30678b1b2c","../internals/math-log10":"3b8b11a78f64e3309bf229999d29b9f8","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"6250b45751f337fc00f311112467913e":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var thisNumberValue = require('../internals/this-number-value');

var $repeat = require('../internals/string-repeat');

var fails = require('../internals/fails');

var RangeError = global.RangeError;
var String = global.String;
var floor = Math.floor;
var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var un$ToFixed = uncurryThis(1.0.toFixed);

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;

  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }

  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  }

  return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;

  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;

  while (--index >= 0) {
    c += data[index];
    data[index] = floor(c / n);
    c = c % n * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';

  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = String(data[index]);
      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
    }
  }

  return s;
};

var FORCED = fails(function () {
  return un$ToFixed(0.00008, 3) !== '0.000' || un$ToFixed(0.9, 0) !== '1' || un$ToFixed(1.255, 2) !== '1.25' || un$ToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
}) || !fails(function () {
  // V8 ~ Android 4.3-
  un$ToFixed({});
}); // `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed

$({
  target: 'Number',
  proto: true,
  forced: FORCED
}, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toIntegerOrInfinity(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k; // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits'); // eslint-disable-next-line no-self-compare -- NaN check

    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);

    if (number < 0) {
      sign = '-';
      number = -number;
    }

    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;

      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;

        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }

        multiply(data, pow(10, j, 1), 0);
        j = e - 1;

        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }

        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + repeat('0', fractDigits);
      }
    }

    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits ? '0.' + repeat('0', fractDigits - k) + result : stringSlice(result, 0, k - fractDigits) + '.' + stringSlice(result, k - fractDigits));
    } else {
      result = sign + result;
    }

    return result;
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f","../internals/this-number-value":"6cc23f40e07afaa5e4a427ab2430bd83","../internals/string-repeat":"e13c88d4c3e9f60dd634cd30678b1b2c","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"61126e2ce2fafb2171a03a81ce031c32":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var thisNumberValue = require('../internals/this-number-value');

var un$ToPrecision = uncurryThis(1.0.toPrecision);

var FORCED = fails(function () {
  // IE7-
  return un$ToPrecision(1, undefined) !== '1';
}) || !fails(function () {
  // V8 ~ Android 4.3-
  un$ToPrecision({});
});

// `Number.prototype.toPrecision` method
// https://tc39.es/ecma262/#sec-number.prototype.toprecision
$({ target: 'Number', proto: true, forced: FORCED }, {
  toPrecision: function toPrecision(precision) {
    return precision === undefined
      ? un$ToPrecision(thisNumberValue(this))
      : un$ToPrecision(thisNumberValue(this), precision);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/this-number-value":"6cc23f40e07afaa5e4a427ab2430bd83"}],"ef0c1c8417b302bf4f6b30469135bba6":[function(require,module,exports) {
var $ = require('../internals/export');
var assign = require('../internals/object-assign');

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/object-assign":"ae1f8d2c1cdbd736ba4b5be0b1a1834d"}],"ae1f8d2c1cdbd736ba4b5be0b1a1834d":[function(require,module,exports) {
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var uncurryThis = require('../internals/function-uncurry-this');
var call = require('../internals/function-call');
var fails = require('../internals/fails');
var objectKeys = require('../internals/object-keys');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var toObject = require('../internals/to-object');
var IndexedObject = require('../internals/indexed-object');

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/object-keys":"ec0d9c7c7614ad542f1a79132cefce40","../internals/object-get-own-property-symbols":"f759fc76793903b9cadc1e3a84780ff9","../internals/object-property-is-enumerable":"6d666488e852af6845747bbd2705cc05","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/indexed-object":"35ae890303b620d792cd5faa73776178"}],"dbf4a21bdc9478f943216bbfe8d568ad":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var create = require('../internals/object-create');

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  create: create
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164"}],"de5884601ab4152e1b0ea9ce12bfec89":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/object-prototype-accessors-forced');
var aCallable = require('../internals/a-callable');
var toObject = require('../internals/to-object');
var definePropertyModule = require('../internals/object-define-property');

// `Object.prototype.__defineGetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__defineGetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __defineGetter__: function __defineGetter__(P, getter) {
      definePropertyModule.f(toObject(this), P, { get: aCallable(getter), enumerable: true, configurable: true });
    }
  });
}

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/object-prototype-accessors-forced":"18ca8d04c6b631d60a15c8f31440c3c4","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f"}],"18ca8d04c6b631d60a15c8f31440c3c4":[function(require,module,exports) {
'use strict';

var IS_PURE = require('../internals/is-pure');

var global = require('../internals/global');

var fails = require('../internals/fails');

var WEBKIT = require('../internals/engine-webkit-version'); // Forced replacement object prototype accessors methods


module.exports = IS_PURE || !fails(function () {
  // This feature detection crashes old WebKit
  // https://github.com/zloirock/core-js/issues/232
  if (WEBKIT && WEBKIT < 535) return;
  var key = Math.random(); // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call -- required for testing

  __defineSetter__.call(null, key, function () {
    /* empty */
  });

  delete global[key];
});
},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/global":"7e78823454e7f795898745d93279f917","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/engine-webkit-version":"84a6eba9ab851a96fed23c7afcb16964"}],"2d96c8c658a76609bd16b9ab4273702e":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var defineProperties = require('../internals/object-define-properties').f;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
$({ target: 'Object', stat: true, forced: Object.defineProperties !== defineProperties, sham: !DESCRIPTORS }, {
  defineProperties: defineProperties
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/object-define-properties":"3ad53cd176876675b1da5125e4bdfafb"}],"658732fea3b8b8b53b24504731f81c52":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var defineProperty = require('../internals/object-define-property').f;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
// eslint-disable-next-line es/no-object-defineproperty -- safe
$({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty, sham: !DESCRIPTORS }, {
  defineProperty: defineProperty
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f"}],"99849673849286e2d51affee0ed8be99":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/object-prototype-accessors-forced');
var aCallable = require('../internals/a-callable');
var toObject = require('../internals/to-object');
var definePropertyModule = require('../internals/object-define-property');

// `Object.prototype.__defineSetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__defineSetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __defineSetter__: function __defineSetter__(P, setter) {
      definePropertyModule.f(toObject(this), P, { set: aCallable(setter), enumerable: true, configurable: true });
    }
  });
}

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/object-prototype-accessors-forced":"18ca8d04c6b631d60a15c8f31440c3c4","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f"}],"9e0b5c004535b94bbbd55b79e434d155":[function(require,module,exports) {
var $ = require('../internals/export');
var $entries = require('../internals/object-to-array').entries;

// `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries
$({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/object-to-array":"40717bfb23bc96e9accf86fbb92a500f"}],"40717bfb23bc96e9accf86fbb92a500f":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var uncurryThis = require('../internals/function-uncurry-this');
var objectKeys = require('../internals/object-keys');
var toIndexedObject = require('../internals/to-indexed-object');
var $propertyIsEnumerable = require('../internals/object-property-is-enumerable').f;

var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push);

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/object-keys":"ec0d9c7c7614ad542f1a79132cefce40","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/object-property-is-enumerable":"6d666488e852af6845747bbd2705cc05"}],"fd9d1d24e954b8bff98cf82d714634a8":[function(require,module,exports) {
var $ = require('../internals/export');
var FREEZING = require('../internals/freezing');
var fails = require('../internals/fails');
var isObject = require('../internals/is-object');
var onFreeze = require('../internals/internal-metadata').onFreeze;

// eslint-disable-next-line es/no-object-freeze -- safe
var $freeze = Object.freeze;
var FAILS_ON_PRIMITIVES = fails(function () { $freeze(1); });

// `Object.freeze` method
// https://tc39.es/ecma262/#sec-object.freeze
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  freeze: function freeze(it) {
    return $freeze && isObject(it) ? $freeze(onFreeze(it)) : it;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/freezing":"d366f8307370c3dd6fbfe0b3a19fdf3b","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/is-object":"03244e745134af366d66b74456891052","../internals/internal-metadata":"1f02b54bcbf6deb5035c0fd624813fd6"}],"98e4d63e60a957ee081c43dfcf9bdd63":[function(require,module,exports) {
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var createProperty = require('../internals/create-property');

// `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries
$({ target: 'Object', stat: true }, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, { AS_ENTRIES: true });
    return obj;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/iterate":"33b1bc22ce229618eb94623257686da2","../internals/create-property":"49f209074159e5f6b7cb7c7945792f40"}],"0c4fe571da42da17a5de3a48635f62da":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var toIndexedObject = require('../internals/to-indexed-object');
var nativeGetOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var DESCRIPTORS = require('../internals/descriptors');

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b"}],"27e11a5f1cde02502bbaa7573838736f":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var ownKeys = require('../internals/own-keys');
var toIndexedObject = require('../internals/to-indexed-object');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var createProperty = require('../internals/create-property');

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/own-keys":"a99313addb30af59e8e5785ab390671c","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/create-property":"49f209074159e5f6b7cb7c7945792f40"}],"4d48008a4d8ad941d0d1587e65c61642":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var getOwnPropertyNames = require('../internals/object-get-own-property-names-external').f;

// eslint-disable-next-line es/no-object-getownpropertynames -- required for testing
var FAILS_ON_PRIMITIVES = fails(function () { return !Object.getOwnPropertyNames(1); });

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  getOwnPropertyNames: getOwnPropertyNames
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/object-get-own-property-names-external":"8d9c8cc419a28d94a4a934b7d6069d20"}],"1c0bfa8a22e10b17fe5cdddef0ae04a5":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var toObject = require('../internals/to-object');
var nativeGetPrototypeOf = require('../internals/object-get-prototype-of');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});


},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf","../internals/correct-prototype-getter":"4ac53209b23e730e63e5780536ae74ea"}],"05918137f48470dc95fe85e42a7bf22c":[function(require,module,exports) {
var $ = require('../internals/export');
var hasOwn = require('../internals/has-own-property');

// `Object.hasOwn` method
// https://github.com/tc39/proposal-accessible-object-hasownproperty
$({ target: 'Object', stat: true }, {
  hasOwn: hasOwn
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/has-own-property":"d97bfcc83949e538357d288583678586"}],"39b566e669c96ea8e7aa4a0c11e9c938":[function(require,module,exports) {
var $ = require('../internals/export');
var is = require('../internals/same-value');

// `Object.is` method
// https://tc39.es/ecma262/#sec-object.is
$({ target: 'Object', stat: true }, {
  is: is
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/same-value":"70e03c57bd10a82f4701c61a54d83ad2"}],"70e03c57bd10a82f4701c61a54d83ad2":[function(require,module,exports) {
// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],"a26a6d2f1001c232b1745a5e26fcf137":[function(require,module,exports) {
var $ = require('../internals/export');
var $isExtensible = require('../internals/object-is-extensible');

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
// eslint-disable-next-line es/no-object-isextensible -- safe
$({ target: 'Object', stat: true, forced: Object.isExtensible !== $isExtensible }, {
  isExtensible: $isExtensible
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/object-is-extensible":"1a3376452166a7b57634b63d80a6b36f"}],"eed55e282e4cebfe1b62986982993e7e":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var isObject = require('../internals/is-object');
var classof = require('../internals/classof-raw');
var ARRAY_BUFFER_NON_EXTENSIBLE = require('../internals/array-buffer-non-extensible');

// eslint-disable-next-line es/no-object-isfrozen -- safe
var $isFrozen = Object.isFrozen;
var FAILS_ON_PRIMITIVES = fails(function () { $isFrozen(1); });

// `Object.isFrozen` method
// https://tc39.es/ecma262/#sec-object.isfrozen
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE }, {
  isFrozen: function isFrozen(it) {
    if (!isObject(it)) return true;
    if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) == 'ArrayBuffer') return true;
    return $isFrozen ? $isFrozen(it) : false;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/is-object":"03244e745134af366d66b74456891052","../internals/classof-raw":"901e5a25291bac244011feea921975b2","../internals/array-buffer-non-extensible":"33786b0978a8a5a51f80d5b469ed1a5c"}],"875c69f5ad8c8b8c438fcae0c5cce4b1":[function(require,module,exports) {
var $ = require('../internals/export');
var fails = require('../internals/fails');
var isObject = require('../internals/is-object');
var classof = require('../internals/classof-raw');
var ARRAY_BUFFER_NON_EXTENSIBLE = require('../internals/array-buffer-non-extensible');

// eslint-disable-next-line es/no-object-issealed -- safe
var $isSealed = Object.isSealed;
var FAILS_ON_PRIMITIVES = fails(function () { $isSealed(1); });

// `Object.isSealed` method
// https://tc39.es/ecma262/#sec-object.issealed
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE }, {
  isSealed: function isSealed(it) {
    if (!isObject(it)) return true;
    if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) == 'ArrayBuffer') return true;
    return $isSealed ? $isSealed(it) : false;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/is-object":"03244e745134af366d66b74456891052","../internals/classof-raw":"901e5a25291bac244011feea921975b2","../internals/array-buffer-non-extensible":"33786b0978a8a5a51f80d5b469ed1a5c"}],"39acc509f64ee9aea6217b08ec961aff":[function(require,module,exports) {
var $ = require('../internals/export');
var toObject = require('../internals/to-object');
var nativeKeys = require('../internals/object-keys');
var fails = require('../internals/fails');

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/object-keys":"ec0d9c7c7614ad542f1a79132cefce40","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"8f3dca5ebb694ca202e8ccc34ef79b22":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/object-prototype-accessors-forced');
var toObject = require('../internals/to-object');
var toPropertyKey = require('../internals/to-property-key');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

// `Object.prototype.__lookupGetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__lookupGetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __lookupGetter__: function __lookupGetter__(P) {
      var O = toObject(this);
      var key = toPropertyKey(P);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor(O, key)) return desc.get;
      } while (O = getPrototypeOf(O));
    }
  });
}

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/object-prototype-accessors-forced":"18ca8d04c6b631d60a15c8f31440c3c4","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/to-property-key":"df2b61336906907f777029fe90c882a8","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d"}],"32f7148ecd6d3e33618148b5c3de8e38":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/object-prototype-accessors-forced');
var toObject = require('../internals/to-object');
var toPropertyKey = require('../internals/to-property-key');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

// `Object.prototype.__lookupSetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__lookupSetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __lookupSetter__: function __lookupSetter__(P) {
      var O = toObject(this);
      var key = toPropertyKey(P);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor(O, key)) return desc.set;
      } while (O = getPrototypeOf(O));
    }
  });
}

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/object-prototype-accessors-forced":"18ca8d04c6b631d60a15c8f31440c3c4","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/to-property-key":"df2b61336906907f777029fe90c882a8","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d"}],"a1b896dbcbd15e53c4e7e8c00781f3fe":[function(require,module,exports) {
var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var onFreeze = require('../internals/internal-metadata').onFreeze;
var FREEZING = require('../internals/freezing');
var fails = require('../internals/fails');

// eslint-disable-next-line es/no-object-preventextensions -- safe
var $preventExtensions = Object.preventExtensions;
var FAILS_ON_PRIMITIVES = fails(function () { $preventExtensions(1); });

// `Object.preventExtensions` method
// https://tc39.es/ecma262/#sec-object.preventextensions
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  preventExtensions: function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(onFreeze(it)) : it;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-object":"03244e745134af366d66b74456891052","../internals/internal-metadata":"1f02b54bcbf6deb5035c0fd624813fd6","../internals/freezing":"d366f8307370c3dd6fbfe0b3a19fdf3b","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"4d78693a0bdc517b0adeb1a2bbd48b58":[function(require,module,exports) {
var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var onFreeze = require('../internals/internal-metadata').onFreeze;
var FREEZING = require('../internals/freezing');
var fails = require('../internals/fails');

// eslint-disable-next-line es/no-object-seal -- safe
var $seal = Object.seal;
var FAILS_ON_PRIMITIVES = fails(function () { $seal(1); });

// `Object.seal` method
// https://tc39.es/ecma262/#sec-object.seal
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  seal: function seal(it) {
    return $seal && isObject(it) ? $seal(onFreeze(it)) : it;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-object":"03244e745134af366d66b74456891052","../internals/internal-metadata":"1f02b54bcbf6deb5035c0fd624813fd6","../internals/freezing":"d366f8307370c3dd6fbfe0b3a19fdf3b","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"d6b5e45ec4f04895ea84f914222f100f":[function(require,module,exports) {
var $ = require('../internals/export');
var setPrototypeOf = require('../internals/object-set-prototype-of');

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
$({ target: 'Object', stat: true }, {
  setPrototypeOf: setPrototypeOf
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/object-set-prototype-of":"22e756b2221a479eceeccf2a78a39bef"}],"55e37b05a68c7c2365e524b1791b32be":[function(require,module,exports) {
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var redefine = require('../internals/redefine');
var toString = require('../internals/object-to-string');

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}

},{"../internals/to-string-tag-support":"db4164dc1ea7e1525cf84b1aa00e80e3","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/object-to-string":"b1563f81d5ab8f4bc84ff15ffaa3df87"}],"b1563f81d5ab8f4bc84ff15ffaa3df87":[function(require,module,exports) {
'use strict';
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classof = require('../internals/classof');

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

},{"../internals/to-string-tag-support":"db4164dc1ea7e1525cf84b1aa00e80e3","../internals/classof":"be2998c5b4d0f20a1cc5fe6807661aae"}],"756242e8680aa17c92c660a4983dc887":[function(require,module,exports) {
var $ = require('../internals/export');
var $values = require('../internals/object-to-array').values;

// `Object.values` method
// https://tc39.es/ecma262/#sec-object.values
$({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/object-to-array":"40717bfb23bc96e9accf86fbb92a500f"}],"114570918caa36e95c44850d7f198f2e":[function(require,module,exports) {
var $ = require('../internals/export');
var $parseFloat = require('../internals/number-parse-float');

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
$({ global: true, forced: parseFloat != $parseFloat }, {
  parseFloat: $parseFloat
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/number-parse-float":"222d9905a88cec8921f98eb0a1be7e69"}],"1e51b8258cf6e252f5a70ce15d26fe0b":[function(require,module,exports) {
var $ = require('../internals/export');
var $parseInt = require('../internals/number-parse-int');

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != $parseInt }, {
  parseInt: $parseInt
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/number-parse-int":"18ae48f2771f3f34c758ef3ebcc738dc"}],"64b4f9ce25d6a1667dd03c5d1af15512":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var IS_PURE = require('../internals/is-pure');

var global = require('../internals/global');

var getBuiltIn = require('../internals/get-built-in');

var call = require('../internals/function-call');

var NativePromise = require('../internals/native-promise-constructor');

var redefine = require('../internals/redefine');

var redefineAll = require('../internals/redefine-all');

var setPrototypeOf = require('../internals/object-set-prototype-of');

var setToStringTag = require('../internals/set-to-string-tag');

var setSpecies = require('../internals/set-species');

var aCallable = require('../internals/a-callable');

var isCallable = require('../internals/is-callable');

var isObject = require('../internals/is-object');

var anInstance = require('../internals/an-instance');

var inspectSource = require('../internals/inspect-source');

var iterate = require('../internals/iterate');

var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');

var speciesConstructor = require('../internals/species-constructor');

var task = require('../internals/task').set;

var microtask = require('../internals/microtask');

var promiseResolve = require('../internals/promise-resolve');

var hostReportErrors = require('../internals/host-report-errors');

var newPromiseCapabilityModule = require('../internals/new-promise-capability');

var perform = require('../internals/perform');

var Queue = require('../internals/queue');

var InternalStateModule = require('../internals/internal-state');

var isForced = require('../internals/is-forced');

var wellKnownSymbol = require('../internals/well-known-symbol');

var IS_BROWSER = require('../internals/engine-is-browser');

var IS_NODE = require('../internals/engine-is-node');

var V8_VERSION = require('../internals/engine-v8-version');

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.getterFor(PROMISE);
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromisePrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
var FORCED = isForced(PROMISE, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor); // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions

  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true; // We need Promise#finally in the pure version for preventing prototype pollution

  if (IS_PURE && !PromisePrototype['finally']) return true; // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679

  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false; // Detect correctness of subclassing with @@species support

  var promise = new PromiseConstructor(function (resolve) {
    resolve(1);
  });

  var FakePromise = function (exec) {
    exec(function () {
      /* empty */
    }, function () {
      /* empty */
    });
  };

  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () {
    /* empty */
  }) instanceof FakePromise;
  if (!SUBCLASSING) return true; // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test

  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});
var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () {
    /* empty */
  });
}); // helpers

var isThenable = function (it) {
  var then;
  return isObject(it) && isCallable(then = it.then) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;

  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }

      if (handler === true) result = value;else {
        if (domain) domain.enter();
        result = handler(value); // can throw

        if (domain) {
          domain.exit();
          exited = true;
        }
      }

      if (result === reaction.promise) {
        reject(TypeError('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;

    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }

    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;

  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = {
    promise: promise,
    reason: reason
  };

  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;

    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;

    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;

  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);

    if (then) {
      microtask(function () {
        var wrapper = {
          done: false
        };

        try {
          call(then, value, bind(internalResolve, wrapper, state), bind(internalReject, wrapper, state));
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({
      done: false
    }, error, state);
  }
}; // constructor polyfill


if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable(executor);
    call(Internal, this);
    var state = getInternalState(this);

    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype; // eslint-disable-next-line no-unused-vars -- required for `.length`

  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  Internal.prototype = redefineAll(PromisePrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    // eslint-disable-next-line unicorn/no-thenable -- safe
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      state.parent = true;
      reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable(onRejected) && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      if (state.state == PENDING) state.reactions.add(reaction);else microtask(function () {
        callReaction(reaction, state);
      });
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && isCallable(NativePromise) && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected); // https://github.com/zloirock/core-js/issues/640
      }, {
        unsafe: true
      }); // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`

      redefine(NativePromisePrototype, 'catch', PromisePrototype['catch'], {
        unsafe: true
      });
    } // make `.constructor === Promise` work for native promise-based APIs


    try {
      delete NativePromisePrototype.constructor;
    } catch (error) {
      /* empty */
    } // make `instanceof Promise` work for native promise-based APIs


    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromisePrototype);
    }
  }
}

$({
  global: true,
  wrap: true,
  forced: FORCED
}, {
  Promise: PromiseConstructor
});
setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);
PromiseWrapper = getBuiltIn(PROMISE); // statics

$({
  target: PROMISE,
  stat: true,
  forced: FORCED
}, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    call(capability.reject, undefined, r);
    return capability.promise;
  }
});
$({
  target: PROMISE,
  stat: true,
  forced: IS_PURE || FORCED
}, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});
$({
  target: PROMISE,
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        call($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/global":"7e78823454e7f795898745d93279f917","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/native-promise-constructor":"b4260506d379cbe17da496521575ca59","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/redefine-all":"ffd35f1bc6f8a9cf26e6fa0389f4748d","../internals/object-set-prototype-of":"22e756b2221a479eceeccf2a78a39bef","../internals/set-to-string-tag":"b474145c0d35c2cab8be2f2358364fc4","../internals/set-species":"e3f4ec2b9d910d5e576300937f95e2c2","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/is-object":"03244e745134af366d66b74456891052","../internals/an-instance":"8b0daff12bd798defdb69ae41eea7f5e","../internals/inspect-source":"2632e39e653b5d5a3bae68e9954b90e4","../internals/iterate":"33b1bc22ce229618eb94623257686da2","../internals/check-correctness-of-iteration":"33641ceb9010ed8125d1d18da9ad9225","../internals/species-constructor":"a110df2a5900fb30b4239748c46982d8","../internals/task":"dd47ece3e1296f193ccefcf3056d1754","../internals/microtask":"2ac872da81be69b6e245c6dadc1381ad","../internals/promise-resolve":"f7d3cde9130ecb34c777b0c2fe7c3f82","../internals/host-report-errors":"1bd915932f7f2579da23ca321e45abae","../internals/new-promise-capability":"783edb12ed346451e3c6474af85a7205","../internals/perform":"d2a4b5532265ab509ea6e706d3e006e3","../internals/queue":"789c97eff7fa00c05a31cdbc634ca46f","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/is-forced":"700278f8e2cb4c21784f4e50866ce0e4","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/engine-is-browser":"431accf955139e4242625d7dd3312d5b","../internals/engine-is-node":"42c67226e3ca045b9c35647f16133bfa","../internals/engine-v8-version":"e23493e3b068d06b425cfae337547b80"}],"b4260506d379cbe17da496521575ca59":[function(require,module,exports) {
var global = require('../internals/global');

module.exports = global.Promise;
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"2ac872da81be69b6e245c6dadc1381ad":[function(require,module,exports) {
var global = require('../internals/global');

var bind = require('../internals/function-bind-context');

var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

var macrotask = require('../internals/task').set;

var IS_IOS = require('../internals/engine-is-ios');

var IS_IOS_PEBBLE = require('../internals/engine-is-ios-pebble');

var IS_WEBOS_WEBKIT = require('../internals/engine-is-webos-webkit');

var IS_NODE = require('../internals/engine-is-node');

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise; // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`

var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
var flush, head, last, notify, toggle, node, promise, then; // modern engines have queueMicrotask method

if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();

    while (head) {
      fn = head.fn;
      head = head.next;

      try {
        fn();
      } catch (error) {
        if (head) notify();else last = undefined;
        throw error;
      }
    }

    last = undefined;
    if (parent) parent.enter();
  }; // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898


  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, {
      characterData: true
    });

    notify = function () {
      node.data = toggle = !toggle;
    }; // environments with maybe non-completely correct, but existent Promise

  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined); // workaround of WebKit ~ iOS Safari 10.1 bug

    promise.constructor = Promise;
    then = bind(promise.then, promise);

    notify = function () {
      then(flush);
    }; // Node.js without promises

  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    }; // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout

  } else {
    // strange IE + webpack dev server bug - use .bind(global)
    macrotask = bind(macrotask, global);

    notify = function () {
      macrotask(flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = {
    fn: fn,
    next: undefined
  };
  if (last) last.next = task;

  if (!head) {
    head = task;
    notify();
  }

  last = task;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/task":"dd47ece3e1296f193ccefcf3056d1754","../internals/engine-is-ios":"3156eb661c8c8e66a6d95c3b2d979fb4","../internals/engine-is-ios-pebble":"d4c5a7d6002a8536eefba110ab08a28a","../internals/engine-is-webos-webkit":"f062338ce14d7abc7bcacf9647b68a21","../internals/engine-is-node":"42c67226e3ca045b9c35647f16133bfa"}],"d4c5a7d6002a8536eefba110ab08a28a":[function(require,module,exports) {
var userAgent = require('../internals/engine-user-agent');

var global = require('../internals/global');

module.exports = /ipad|iphone|ipod/i.test(userAgent) && global.Pebble !== undefined;
},{"../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828","../internals/global":"7e78823454e7f795898745d93279f917"}],"f062338ce14d7abc7bcacf9647b68a21":[function(require,module,exports) {
var userAgent = require('../internals/engine-user-agent');

module.exports = /web0s(?!.*chrome)/i.test(userAgent);

},{"../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828"}],"f7d3cde9130ecb34c777b0c2fe7c3f82":[function(require,module,exports) {
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var newPromiseCapability = require('../internals/new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/is-object":"03244e745134af366d66b74456891052","../internals/new-promise-capability":"783edb12ed346451e3c6474af85a7205"}],"783edb12ed346451e3c6474af85a7205":[function(require,module,exports) {
'use strict';
var aCallable = require('../internals/a-callable');

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660"}],"1bd915932f7f2579da23ca321e45abae":[function(require,module,exports) {
var global = require('../internals/global');

module.exports = function (a, b) {
  var console = global.console;

  if (console && console.error) {
    arguments.length == 1 ? console.error(a) : console.error(a, b);
  }
};
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"d2a4b5532265ab509ea6e706d3e006e3":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

},{}],"789c97eff7fa00c05a31cdbc634ca46f":[function(require,module,exports) {
var Queue = function () {
  this.head = null;
  this.tail = null;
};

Queue.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    if (this.head) this.tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      this.head = entry.next;
      if (this.tail === entry) this.tail = null;
      return entry.item;
    }
  }
};

module.exports = Queue;

},{}],"431accf955139e4242625d7dd3312d5b":[function(require,module,exports) {
module.exports = typeof window == 'object';

},{}],"621182c678695785378ee5b1e054e399":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');

// `Promise.allSettled` method
// https://tc39.es/ecma262/#sec-promise.allsettled
$({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call(promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (error) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: error };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/new-promise-capability":"783edb12ed346451e3c6474af85a7205","../internals/perform":"d2a4b5532265ab509ea6e706d3e006e3","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"80e02179f1b001ad0b7a998fed97a14c":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var aCallable = require('../internals/a-callable');
var getBuiltIn = require('../internals/get-built-in');
var call = require('../internals/function-call');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');

var PROMISE_ANY_ERROR = 'No one promise resolved';

// `Promise.any` method
// https://tc39.es/ecma262/#sec-promise.any
$({ target: 'Promise', stat: true }, {
  any: function any(iterable) {
    var C = this;
    var AggregateError = getBuiltIn('AggregateError');
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aCallable(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        remaining++;
        call(promiseResolve, C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (error) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = error;
          --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/new-promise-capability":"783edb12ed346451e3c6474af85a7205","../internals/perform":"d2a4b5532265ab509ea6e706d3e006e3","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"dbde465c6691022f431a49199561448b":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var NativePromise = require('../internals/native-promise-constructor');
var fails = require('../internals/fails');
var getBuiltIn = require('../internals/get-built-in');
var isCallable = require('../internals/is-callable');
var speciesConstructor = require('../internals/species-constructor');
var promiseResolve = require('../internals/promise-resolve');
var redefine = require('../internals/redefine');

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails(function () {
  // eslint-disable-next-line unicorn/no-thenable -- required for testing
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = isCallable(onFinally);
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
if (!IS_PURE && isCallable(NativePromise)) {
  var method = getBuiltIn('Promise').prototype['finally'];
  if (NativePromise.prototype['finally'] !== method) {
    redefine(NativePromise.prototype, 'finally', method, { unsafe: true });
  }
}

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/native-promise-constructor":"b4260506d379cbe17da496521575ca59","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/species-constructor":"a110df2a5900fb30b4239748c46982d8","../internals/promise-resolve":"f7d3cde9130ecb34c777b0c2fe7c3f82","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60"}],"8fcddbabbbcaa3a34d3df5b0c1f8bcfc":[function(require,module,exports) {
var $ = require('../internals/export');
var functionApply = require('../internals/function-apply');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var fails = require('../internals/fails');

// MS Edge argumentsList argument is optional
var OPTIONAL_ARGUMENTS_LIST = !fails(function () {
  // eslint-disable-next-line es/no-reflect -- required for testing
  Reflect.apply(function () { /* empty */ });
});

// `Reflect.apply` method
// https://tc39.es/ecma262/#sec-reflect.apply
$({ target: 'Reflect', stat: true, forced: OPTIONAL_ARGUMENTS_LIST }, {
  apply: function apply(target, thisArgument, argumentsList) {
    return functionApply(aCallable(target), thisArgument, anObject(argumentsList));
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"34936bb3ea0a3d76b1e5fa8d367095a7":[function(require,module,exports) {
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var apply = require('../internals/function-apply');
var bind = require('../internals/function-bind');
var aConstructor = require('../internals/a-constructor');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var create = require('../internals/object-create');
var fails = require('../internals/fails');

var nativeConstruct = getBuiltIn('Reflect', 'construct');
var ObjectPrototype = Object.prototype;
var push = [].push;

// `Reflect.construct` method
// https://tc39.es/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});

var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});

var FORCED = NEW_TARGET_BUG || ARGS_BUG;

$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aConstructor(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      apply(push, $args, args);
      return new (apply(bind, Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : ObjectPrototype);
    var result = apply(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/function-bind":"dc03bec42aa3bec1e6a2bbc5d8f44a0e","../internals/a-constructor":"68a3572cb2f4921c4818116046759501","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/is-object":"03244e745134af366d66b74456891052","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"5b57f05dde60df32aec0b0bde042f5ec":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var anObject = require('../internals/an-object');
var toPropertyKey = require('../internals/to-property-key');
var definePropertyModule = require('../internals/object-define-property');
var fails = require('../internals/fails');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
var ERROR_INSTEAD_OF_FALSE = fails(function () {
  // eslint-disable-next-line es/no-reflect -- required for testing
  Reflect.defineProperty(definePropertyModule.f({}, 1, { value: 1 }), 1, { value: 2 });
});

// `Reflect.defineProperty` method
// https://tc39.es/ecma262/#sec-reflect.defineproperty
$({ target: 'Reflect', stat: true, forced: ERROR_INSTEAD_OF_FALSE, sham: !DESCRIPTORS }, {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    var key = toPropertyKey(propertyKey);
    anObject(attributes);
    try {
      definePropertyModule.f(target, key, attributes);
      return true;
    } catch (error) {
      return false;
    }
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-property-key":"df2b61336906907f777029fe90c882a8","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"971e44db9bc3805dda53937ea34de8cb":[function(require,module,exports) {
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

// `Reflect.deleteProperty` method
// https://tc39.es/ecma262/#sec-reflect.deleteproperty
$({ target: 'Reflect', stat: true }, {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var descriptor = getOwnPropertyDescriptor(anObject(target), propertyKey);
    return descriptor && !descriptor.configurable ? false : delete target[propertyKey];
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d"}],"82e3ad2c276492b6191b4c208d23b0a4":[function(require,module,exports) {
var $ = require('../internals/export');
var call = require('../internals/function-call');
var isObject = require('../internals/is-object');
var anObject = require('../internals/an-object');
var isDataDescriptor = require('../internals/is-data-descriptor');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var getPrototypeOf = require('../internals/object-get-prototype-of');

// `Reflect.get` method
// https://tc39.es/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey);
  if (descriptor) return isDataDescriptor(descriptor)
    ? descriptor.value
    : descriptor.get === undefined ? undefined : call(descriptor.get, receiver);
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

$({ target: 'Reflect', stat: true }, {
  get: get
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/is-object":"03244e745134af366d66b74456891052","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/is-data-descriptor":"ef65667e2f59b7f54b03602c0db0b1ac","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf"}],"ef65667e2f59b7f54b03602c0db0b1ac":[function(require,module,exports) {
var hasOwn = require('../internals/has-own-property');

module.exports = function (descriptor) {
  return descriptor !== undefined && (hasOwn(descriptor, 'value') || hasOwn(descriptor, 'writable'));
};

},{"../internals/has-own-property":"d97bfcc83949e538357d288583678586"}],"bed6180414e37b4f0b66944641f43655":[function(require,module,exports) {
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var anObject = require('../internals/an-object');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');

// `Reflect.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-reflect.getownpropertydescriptor
$({ target: 'Reflect', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d"}],"9a73f8251ad1d2a2c0791fa8862c672a":[function(require,module,exports) {
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var objectGetPrototypeOf = require('../internals/object-get-prototype-of');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

// `Reflect.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-reflect.getprototypeof
$({ target: 'Reflect', stat: true, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(target) {
    return objectGetPrototypeOf(anObject(target));
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf","../internals/correct-prototype-getter":"4ac53209b23e730e63e5780536ae74ea"}],"20723cb8dda540209d67c53c59fff123":[function(require,module,exports) {
var $ = require('../internals/export');

// `Reflect.has` method
// https://tc39.es/ecma262/#sec-reflect.has
$({ target: 'Reflect', stat: true }, {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"0380e6e14e2834201e4d9bbefa69f2a4":[function(require,module,exports) {
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var $isExtensible = require('../internals/object-is-extensible');

// `Reflect.isExtensible` method
// https://tc39.es/ecma262/#sec-reflect.isextensible
$({ target: 'Reflect', stat: true }, {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible(target);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/object-is-extensible":"1a3376452166a7b57634b63d80a6b36f"}],"988461f10de6c63f8f0fceca63b3bcd5":[function(require,module,exports) {
var $ = require('../internals/export');
var ownKeys = require('../internals/own-keys');

// `Reflect.ownKeys` method
// https://tc39.es/ecma262/#sec-reflect.ownkeys
$({ target: 'Reflect', stat: true }, {
  ownKeys: ownKeys
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/own-keys":"a99313addb30af59e8e5785ab390671c"}],"ae97330f792b08fdd88ec8cee195cb5a":[function(require,module,exports) {
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var anObject = require('../internals/an-object');
var FREEZING = require('../internals/freezing');

// `Reflect.preventExtensions` method
// https://tc39.es/ecma262/#sec-reflect.preventextensions
$({ target: 'Reflect', stat: true, sham: !FREEZING }, {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      var objectPreventExtensions = getBuiltIn('Object', 'preventExtensions');
      if (objectPreventExtensions) objectPreventExtensions(target);
      return true;
    } catch (error) {
      return false;
    }
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/freezing":"d366f8307370c3dd6fbfe0b3a19fdf3b"}],"1f60ed7b4f6ea339abed64d1da1f10ba":[function(require,module,exports) {
var $ = require('../internals/export');
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var isDataDescriptor = require('../internals/is-data-descriptor');
var fails = require('../internals/fails');
var definePropertyModule = require('../internals/object-define-property');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

// `Reflect.set` method
// https://tc39.es/ecma262/#sec-reflect.set
function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDescriptor = getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  var existingDescriptor, prototype, setter;
  if (!ownDescriptor) {
    if (isObject(prototype = getPrototypeOf(target))) {
      return set(prototype, propertyKey, V, receiver);
    }
    ownDescriptor = createPropertyDescriptor(0);
  }
  if (isDataDescriptor(ownDescriptor)) {
    if (ownDescriptor.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = getOwnPropertyDescriptorModule.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      definePropertyModule.f(receiver, propertyKey, existingDescriptor);
    } else definePropertyModule.f(receiver, propertyKey, createPropertyDescriptor(0, V));
  } else {
    setter = ownDescriptor.set;
    if (setter === undefined) return false;
    call(setter, receiver, V);
  } return true;
}

// MS Edge 17-18 Reflect.set allows setting the property to object
// with non-writable property on the prototype
var MS_EDGE_BUG = fails(function () {
  var Constructor = function () { /* empty */ };
  var object = definePropertyModule.f(new Constructor(), 'a', { configurable: true });
  // eslint-disable-next-line es/no-reflect -- required for testing
  return Reflect.set(Constructor.prototype, 'a', 1, object) !== false;
});

$({ target: 'Reflect', stat: true, forced: MS_EDGE_BUG }, {
  set: set
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/is-object":"03244e745134af366d66b74456891052","../internals/is-data-descriptor":"ef65667e2f59b7f54b03602c0db0b1ac","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a"}],"d5f6f2fa3fcdf839a378cf14bdb8160b":[function(require,module,exports) {
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var aPossiblePrototype = require('../internals/a-possible-prototype');
var objectSetPrototypeOf = require('../internals/object-set-prototype-of');

// `Reflect.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-reflect.setprototypeof
if (objectSetPrototypeOf) $({ target: 'Reflect', stat: true }, {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    anObject(target);
    aPossiblePrototype(proto);
    try {
      objectSetPrototypeOf(target, proto);
      return true;
    } catch (error) {
      return false;
    }
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/a-possible-prototype":"7ad1739ed58eb8a5f2873ca6b6307773","../internals/object-set-prototype-of":"22e756b2221a479eceeccf2a78a39bef"}],"2241cb0613f84ace391eaf9141e200ad":[function(require,module,exports) {
var $ = require('../internals/export');

var global = require('../internals/global');

var setToStringTag = require('../internals/set-to-string-tag');

$({
  global: true
}, {
  Reflect: {}
}); // Reflect[@@toStringTag] property
// https://tc39.es/ecma262/#sec-reflect-@@tostringtag

setToStringTag(global.Reflect, 'Reflect', true);
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/set-to-string-tag":"b474145c0d35c2cab8be2f2358364fc4"}],"17e2033a1c93d48aced52ed58c961f29":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var isForced = require('../internals/is-forced');

var inheritIfRequired = require('../internals/inherit-if-required');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var defineProperty = require('../internals/object-define-property').f;

var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;

var isPrototypeOf = require('../internals/object-is-prototype-of');

var isRegExp = require('../internals/is-regexp');

var toString = require('../internals/to-string');

var regExpFlags = require('../internals/regexp-flags');

var stickyHelpers = require('../internals/regexp-sticky-helpers');

var redefine = require('../internals/redefine');

var fails = require('../internals/fails');

var hasOwn = require('../internals/has-own-property');

var enforceInternalState = require('../internals/internal-state').enforce;

var setSpecies = require('../internals/set-species');

var wellKnownSymbol = require('../internals/well-known-symbol');

var UNSUPPORTED_DOT_ALL = require('../internals/regexp-unsupported-dot-all');

var UNSUPPORTED_NCG = require('../internals/regexp-unsupported-ncg');

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var SyntaxError = global.SyntaxError;
var getFlags = uncurryThis(regExpFlags);
var exec = uncurryThis(RegExpPrototype.exec);
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice); // TODO: Use only propper RegExpIdentifierName

var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g; // "new" should create a new object, old webkit bug

var CORRECT_NEW = new NativeRegExp(re1) !== re1;
var MISSED_STICKY = stickyHelpers.MISSED_STICKY;
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var BASE_FORCED = DESCRIPTORS && (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
  re2[MATCH] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
}));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;

  for (; index <= length; index++) {
    chr = charAt(string, index);

    if (chr === '\\') {
      result += chr + charAt(string, ++index);
      continue;
    }

    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      }

      result += chr;
    }
  }

  return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;

  for (; index <= length; index++) {
    chr = charAt(string, index);

    if (chr === '\\') {
      chr = chr + charAt(string, ++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets) switch (true) {
      case chr === '[':
        brackets = true;
        break;

      case chr === '(':
        if (exec(IS_NCG, stringSlice(string, index + 1))) {
          index += 2;
          ncg = true;
        }

        result += chr;
        groupid++;
        continue;

      case chr === '>' && ncg:
        if (groupname === '' || hasOwn(names, groupname)) {
          throw new SyntaxError('Invalid capture group name');
        }

        names[groupname] = true;
        named[named.length] = [groupname, groupid];
        ncg = false;
        groupname = '';
        continue;
    }

    if (ncg) groupname += chr;else result += chr;
  }

  return [result, named];
}; // `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor


if (isForced('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = isPrototypeOf(RegExpPrototype, this);
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || isPrototypeOf(RegExpPrototype, pattern)) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : getFlags(rawPattern);
    }

    pattern = pattern === undefined ? '' : toString(pattern);
    flags = flags === undefined ? '' : toString(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
      if (dotAll) flags = replace(flags, /s/g, '');
    }

    rawFlags = flags;

    if (MISSED_STICKY && 'sticky' in re1) {
      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
      if (sticky && UNSUPPORTED_Y) flags = replace(flags, /y/g, '');
    }

    if (UNSUPPORTED_NCG) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState(result);

      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }

      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern) try {
      // fails in old engines, but we have no alternatives for unsupported regex syntax
      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) {
      /* empty */
    }
    return result;
  };

  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () {
        return NativeRegExp[key];
      },
      set: function (it) {
        NativeRegExp[key] = it;
      }
    });
  };

  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
    proxy(keys[index++]);
  }

  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
} // https://tc39.es/ecma262/#sec-get-regexp-@@species


setSpecies('RegExp');
},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/is-forced":"700278f8e2cb4c21784f4e50866ce0e4","../internals/inherit-if-required":"4d9c0ab06f91ed2da925563ab67ef474","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/object-get-own-property-names":"b422be4dea2e1243d9a0803066cc2d3d","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/is-regexp":"1b0c4084637d9394e4a3ec700a5fe929","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/regexp-flags":"9ed5cc7a98675b7cdea415f21c6b5f7b","../internals/regexp-sticky-helpers":"8cf821686ebf02f1be282c6b0438fc93","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/set-species":"e3f4ec2b9d910d5e576300937f95e2c2","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/regexp-unsupported-dot-all":"6b5f0725b1b52b78e61de8f8f7da500a","../internals/regexp-unsupported-ncg":"75daa1b1cc25a4168d1fa2a0d0d05f78"}],"1b0c4084637d9394e4a3ec700a5fe929":[function(require,module,exports) {
var isObject = require('../internals/is-object');
var classof = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

},{"../internals/is-object":"03244e745134af366d66b74456891052","../internals/classof-raw":"901e5a25291bac244011feea921975b2","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"9ed5cc7a98675b7cdea415f21c6b5f7b":[function(require,module,exports) {
'use strict';
var anObject = require('../internals/an-object');

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"8cf821686ebf02f1be282c6b0438fc93":[function(require,module,exports) {
var fails = require('../internals/fails');

var global = require('../internals/global'); // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError


var $RegExp = global.RegExp;
var UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
}); // UC Browser bug
// https://github.com/zloirock/core-js/issues/1008

var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
  return !$RegExp('a', 'y').sticky;
});
var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});
module.exports = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y
};
},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/global":"7e78823454e7f795898745d93279f917"}],"6b5f0725b1b52b78e61de8f8f7da500a":[function(require,module,exports) {
var fails = require('../internals/fails');

var global = require('../internals/global'); // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError


var $RegExp = global.RegExp;
module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});
},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/global":"7e78823454e7f795898745d93279f917"}],"75daa1b1cc25a4168d1fa2a0d0d05f78":[function(require,module,exports) {
var fails = require('../internals/fails');

var global = require('../internals/global'); // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError


var $RegExp = global.RegExp;
module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc';
});
},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/global":"7e78823454e7f795898745d93279f917"}],"539ec05a2f4657dbdcdd70720d253063":[function(require,module,exports) {
var global = require('../internals/global');

var DESCRIPTORS = require('../internals/descriptors');

var UNSUPPORTED_DOT_ALL = require('../internals/regexp-unsupported-dot-all');

var classof = require('../internals/classof-raw');

var defineProperty = require('../internals/object-define-property').f;

var getInternalState = require('../internals/internal-state').get;

var RegExpPrototype = RegExp.prototype;
var TypeError = global.TypeError; // `RegExp.prototype.dotAll` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall

if (DESCRIPTORS && UNSUPPORTED_DOT_ALL) {
  defineProperty(RegExpPrototype, 'dotAll', {
    configurable: true,
    get: function () {
      if (this === RegExpPrototype) return undefined; // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.

      if (classof(this) === 'RegExp') {
        return !!getInternalState(this).dotAll;
      }

      throw TypeError('Incompatible receiver, RegExp required');
    }
  });
}
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/regexp-unsupported-dot-all":"6b5f0725b1b52b78e61de8f8f7da500a","../internals/classof-raw":"901e5a25291bac244011feea921975b2","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1"}],"c60e58df05dbe67a3d86a0a71176436e":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var exec = require('../internals/regexp-exec');

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/regexp-exec":"23dabdad7fff927134e97d952be0a510"}],"23dabdad7fff927134e97d952be0a510":[function(require,module,exports) {
'use strict';
/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var toString = require('../internals/to-string');
var regexpFlags = require('../internals/regexp-flags');
var stickyHelpers = require('../internals/regexp-sticky-helpers');
var shared = require('../internals/shared');
var create = require('../internals/object-create');
var getInternalState = require('../internals/internal-state').get;
var UNSUPPORTED_DOT_ALL = require('../internals/regexp-unsupported-dot-all');
var UNSUPPORTED_NCG = require('../internals/regexp-unsupported-ncg');

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;

},{"../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/regexp-flags":"9ed5cc7a98675b7cdea415f21c6b5f7b","../internals/regexp-sticky-helpers":"8cf821686ebf02f1be282c6b0438fc93","../internals/shared":"1950ed6cf8f0dece2a998d60590e9098","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/regexp-unsupported-dot-all":"6b5f0725b1b52b78e61de8f8f7da500a","../internals/regexp-unsupported-ncg":"75daa1b1cc25a4168d1fa2a0d0d05f78"}],"69c14483c7f90583888879597ac9d2d3":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var objectDefinePropertyModule = require('../internals/object-define-property');
var regExpFlags = require('../internals/regexp-flags');
var fails = require('../internals/fails');

var RegExpPrototype = RegExp.prototype;

var FORCED = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  return Object.getOwnPropertyDescriptor(RegExpPrototype, 'flags').get.call({ dotAll: true, sticky: true }) !== 'sy';
});

// `RegExp.prototype.flags` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
if (FORCED) objectDefinePropertyModule.f(RegExpPrototype, 'flags', {
  configurable: true,
  get: regExpFlags
});

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/regexp-flags":"9ed5cc7a98675b7cdea415f21c6b5f7b","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"7ff9d9eb82d9c3dcc0904fa5af8e9b00":[function(require,module,exports) {
var global = require('../internals/global');

var DESCRIPTORS = require('../internals/descriptors');

var MISSED_STICKY = require('../internals/regexp-sticky-helpers').MISSED_STICKY;

var classof = require('../internals/classof-raw');

var defineProperty = require('../internals/object-define-property').f;

var getInternalState = require('../internals/internal-state').get;

var RegExpPrototype = RegExp.prototype;
var TypeError = global.TypeError; // `RegExp.prototype.sticky` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky

if (DESCRIPTORS && MISSED_STICKY) {
  defineProperty(RegExpPrototype, 'sticky', {
    configurable: true,
    get: function () {
      if (this === RegExpPrototype) return undefined; // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.

      if (classof(this) === 'RegExp') {
        return !!getInternalState(this).sticky;
      }

      throw TypeError('Incompatible receiver, RegExp required');
    }
  });
}
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/regexp-sticky-helpers":"8cf821686ebf02f1be282c6b0438fc93","../internals/classof-raw":"901e5a25291bac244011feea921975b2","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1"}],"cab900d610a1d482f2bc468014013bb1":[function(require,module,exports) {
'use strict'; // TODO: Remove from `core-js@4` since it's moved to entry points

require('../modules/es.regexp.exec');

var $ = require('../internals/export');

var global = require('../internals/global');

var call = require('../internals/function-call');

var uncurryThis = require('../internals/function-uncurry-this');

var isCallable = require('../internals/is-callable');

var isObject = require('../internals/is-object');

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;

  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };

  return re.test('abc') === true && execCalled;
}();

var Error = global.Error;
var un$Test = uncurryThis(/./.test); // `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test

$({
  target: 'RegExp',
  proto: true,
  forced: !DELEGATES_TO_EXEC
}, {
  test: function (str) {
    var exec = this.exec;
    if (!isCallable(exec)) return un$Test(this, str);
    var result = call(exec, this, str);

    if (result !== null && !isObject(result)) {
      throw new Error('RegExp exec method returned something other than an Object or null');
    }

    return !!result;
  }
});
},{"../modules/es.regexp.exec":"c60e58df05dbe67a3d86a0a71176436e","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/is-object":"03244e745134af366d66b74456891052"}],"6f916140f15db4b9a6e80a0af1eb5960":[function(require,module,exports) {
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var PROPER_FUNCTION_NAME = require('../internals/function-name').PROPER;
var redefine = require('../internals/redefine');
var anObject = require('../internals/an-object');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var $toString = require('../internals/to-string');
var fails = require('../internals/fails');
var regExpFlags = require('../internals/regexp-flags');

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var n$ToString = RegExpPrototype[TO_STRING];
var getFlags = uncurryThis(regExpFlags);

var NOT_GENERIC = fails(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = $toString(R.source);
    var rf = R.flags;
    var f = $toString(rf === undefined && isPrototypeOf(RegExpPrototype, R) && !('flags' in RegExpPrototype) ? getFlags(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/function-name":"8c9a0dc6f151e22aaeb5f0e18e363d7d","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/regexp-flags":"9ed5cc7a98675b7cdea415f21c6b5f7b"}],"e711a669bef57a9a7178d130c08422eb":[function(require,module,exports) {
'use strict';
var collection = require('../internals/collection');
var collectionStrong = require('../internals/collection-strong');

// `Set` constructor
// https://tc39.es/ecma262/#sec-set-objects
collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

},{"../internals/collection":"9abd6360ae544576f2e0cf88529c952a","../internals/collection-strong":"3e3fc8f420de7716b8e1e915c96fd63d"}],"3b5c5c6fea8eece426a84709b52b4bca":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toString = require('../internals/to-string');
var fails = require('../internals/fails');

var charAt = uncurryThis(''.charAt);

var FORCED = fails(function () {
  return '𠮷'.at(-2) !== '\uD842';
});

// `String.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
$({ target: 'String', proto: true, forced: FORCED }, {
  at: function at(index) {
    var S = toString(requireObjectCoercible(this));
    var len = S.length;
    var relativeIndex = toIntegerOrInfinity(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : charAt(S, k);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"169e836154316c6dddc7fb65b971e3f6":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var codeAt = require('../internals/string-multibyte').codeAt;

// `String.prototype.codePointAt` method
// https://tc39.es/ecma262/#sec-string.prototype.codepointat
$({ target: 'String', proto: true }, {
  codePointAt: function codePointAt(pos) {
    return codeAt(this, pos);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/string-multibyte":"2324ad16ce38cbfde2a3a75c67697ac1"}],"2324ad16ce38cbfde2a3a75c67697ac1":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toString = require('../internals/to-string');
var requireObjectCoercible = require('../internals/require-object-coercible');

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37"}],"673c4434789053ac7ad787f4a8f7695e":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');
var IS_PURE = require('../internals/is-pure');

// eslint-disable-next-line es/no-string-prototype-endswith -- safe
var un$EndsWith = uncurryThis(''.endsWith);
var slice = uncurryThis(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.endsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.endswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = that.length;
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = toString(searchString);
    return un$EndsWith
      ? un$EndsWith(that, search, end)
      : slice(that, end - search.length, end) === search;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/not-a-regexp":"83ac77f2ca52be854a0c670dd66bddf0","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37","../internals/correct-is-regexp-logic":"7a70fee840efec120df490a17771b3a0","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0"}],"83ac77f2ca52be854a0c670dd66bddf0":[function(require,module,exports) {
var global = require('../internals/global');

var isRegExp = require('../internals/is-regexp');

var TypeError = global.TypeError;

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  }

  return it;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-regexp":"1b0c4084637d9394e4a3ec700a5fe929"}],"7a70fee840efec120df490a17771b3a0":[function(require,module,exports) {
var wellKnownSymbol = require('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};

},{"../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"2ce169741193b51d6fd48068f6b91539":[function(require,module,exports) {
var $ = require('../internals/export');

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var toAbsoluteIndex = require('../internals/to-absolute-index');

var RangeError = global.RangeError;
var fromCharCode = String.fromCharCode; // eslint-disable-next-line es/no-string-fromcodepoint -- required for testing

var $fromCodePoint = String.fromCodePoint;
var join = uncurryThis([].join); // length should be 1, old FF problem

var INCORRECT_LENGTH = !!$fromCodePoint && $fromCodePoint.length != 1; // `String.fromCodePoint` method
// https://tc39.es/ecma262/#sec-string.fromcodepoint

$({
  target: 'String',
  stat: true,
  forced: INCORRECT_LENGTH
}, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  fromCodePoint: function fromCodePoint(x) {
    var elements = [];
    var length = arguments.length;
    var i = 0;
    var code;

    while (length > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10FFFF) !== code) throw RangeError(code + ' is not a valid code point');
      elements[i] = code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00);
    }

    return join(elements, '');
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-absolute-index":"ff996ac5a229620b351a78c404035460"}],"a7d36f785f63c912086853d415b0988d":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toString = require('../internals/to-string');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');

var stringIndexOf = uncurryThis(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString(requireObjectCoercible(this)),
      toString(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/not-a-regexp":"83ac77f2ca52be854a0c670dd66bddf0","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/correct-is-regexp-logic":"7a70fee840efec120df490a17771b3a0"}],"17203f1447f326bd1ee667e61bac879c":[function(require,module,exports) {
'use strict';
var charAt = require('../internals/string-multibyte').charAt;
var toString = require('../internals/to-string');
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/define-iterator');

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

},{"../internals/string-multibyte":"2324ad16ce38cbfde2a3a75c67697ac1","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/define-iterator":"89cab28f14b0323e9b7f5add1d23fc79"}],"d99e523209fcb30df292c2428ff02309":[function(require,module,exports) {
'use strict';
var call = require('../internals/function-call');
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var requireObjectCoercible = require('../internals/require-object-coercible');
var getMethod = require('../internals/get-method');
var advanceStringIndex = require('../internals/advance-string-index');
var regExpExec = require('../internals/regexp-exec-abstract');

// @@match logic
fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
      return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeMatch, rx, S);

      if (res.done) return res.value;

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = toString(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/fix-regexp-well-known-symbol-logic":"d8e482793d25d23c0a47ad83f96948ea","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/advance-string-index":"a82731122e9bc6200670a09300eea37d","../internals/regexp-exec-abstract":"b0d0f5be4954a41ffb1779e4d139f3ac"}],"d8e482793d25d23c0a47ad83f96948ea":[function(require,module,exports) {
'use strict';
// TODO: Remove from `core-js@4` since it's moved to entry points
require('../modules/es.regexp.exec');
var uncurryThis = require('../internals/function-uncurry-this');
var redefine = require('../internals/redefine');
var regexpExec = require('../internals/regexp-exec');
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine(String.prototype, KEY, methods[0]);
    redefine(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};

},{"../modules/es.regexp.exec":"c60e58df05dbe67a3d86a0a71176436e","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/regexp-exec":"23dabdad7fff927134e97d952be0a510","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33"}],"a82731122e9bc6200670a09300eea37d":[function(require,module,exports) {
'use strict';
var charAt = require('../internals/string-multibyte').charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

},{"../internals/string-multibyte":"2324ad16ce38cbfde2a3a75c67697ac1"}],"b0d0f5be4954a41ffb1779e4d139f3ac":[function(require,module,exports) {
var global = require('../internals/global');

var call = require('../internals/function-call');

var anObject = require('../internals/an-object');

var isCallable = require('../internals/is-callable');

var classof = require('../internals/classof-raw');

var regexpExec = require('../internals/regexp-exec');

var TypeError = global.TypeError; // `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec

module.exports = function (R, S) {
  var exec = R.exec;

  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }

  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw TypeError('RegExp#exec called on incompatible receiver');
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/classof-raw":"901e5a25291bac244011feea921975b2","../internals/regexp-exec":"23dabdad7fff927134e97d952be0a510"}],"d0a02303903685146f0fba725a53dd98":[function(require,module,exports) {
'use strict';
/* eslint-disable es/no-string-prototype-matchall -- safe */

var $ = require('../internals/export');

var global = require('../internals/global');

var call = require('../internals/function-call');

var uncurryThis = require('../internals/function-uncurry-this');

var createIteratorConstructor = require('../internals/create-iterator-constructor');

var requireObjectCoercible = require('../internals/require-object-coercible');

var toLength = require('../internals/to-length');

var toString = require('../internals/to-string');

var anObject = require('../internals/an-object');

var classof = require('../internals/classof-raw');

var isPrototypeOf = require('../internals/object-is-prototype-of');

var isRegExp = require('../internals/is-regexp');

var regExpFlags = require('../internals/regexp-flags');

var getMethod = require('../internals/get-method');

var redefine = require('../internals/redefine');

var fails = require('../internals/fails');

var wellKnownSymbol = require('../internals/well-known-symbol');

var speciesConstructor = require('../internals/species-constructor');

var advanceStringIndex = require('../internals/advance-string-index');

var regExpExec = require('../internals/regexp-exec-abstract');

var InternalStateModule = require('../internals/internal-state');

var IS_PURE = require('../internals/is-pure');

var MATCH_ALL = wellKnownSymbol('matchAll');
var REGEXP_STRING = 'RegExp String';
var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(REGEXP_STRING_ITERATOR);
var RegExpPrototype = RegExp.prototype;
var TypeError = global.TypeError;
var getFlags = uncurryThis(regExpFlags);
var stringIndexOf = uncurryThis(''.indexOf);
var un$MatchAll = uncurryThis(''.matchAll);
var WORKS_WITH_NON_GLOBAL_REGEX = !!un$MatchAll && !fails(function () {
  un$MatchAll('a', /./);
});
var $RegExpStringIterator = createIteratorConstructor(function RegExpStringIterator(regexp, string, $global, fullUnicode) {
  setInternalState(this, {
    type: REGEXP_STRING_ITERATOR,
    regexp: regexp,
    string: string,
    global: $global,
    unicode: fullUnicode,
    done: false
  });
}, REGEXP_STRING, function next() {
  var state = getInternalState(this);
  if (state.done) return {
    value: undefined,
    done: true
  };
  var R = state.regexp;
  var S = state.string;
  var match = regExpExec(R, S);
  if (match === null) return {
    value: undefined,
    done: state.done = true
  };

  if (state.global) {
    if (toString(match[0]) === '') R.lastIndex = advanceStringIndex(S, toLength(R.lastIndex), state.unicode);
    return {
      value: match,
      done: false
    };
  }

  state.done = true;
  return {
    value: match,
    done: false
  };
});

var $matchAll = function (string) {
  var R = anObject(this);
  var S = toString(string);
  var C, flagsValue, flags, matcher, $global, fullUnicode;
  C = speciesConstructor(R, RegExp);
  flagsValue = R.flags;

  if (flagsValue === undefined && isPrototypeOf(RegExpPrototype, R) && !('flags' in RegExpPrototype)) {
    flagsValue = getFlags(R);
  }

  flags = flagsValue === undefined ? '' : toString(flagsValue);
  matcher = new C(C === RegExp ? R.source : R, flags);
  $global = !!~stringIndexOf(flags, 'g');
  fullUnicode = !!~stringIndexOf(flags, 'u');
  matcher.lastIndex = toLength(R.lastIndex);
  return new $RegExpStringIterator(matcher, S, $global, fullUnicode);
}; // `String.prototype.matchAll` method
// https://tc39.es/ecma262/#sec-string.prototype.matchall


$({
  target: 'String',
  proto: true,
  forced: WORKS_WITH_NON_GLOBAL_REGEX
}, {
  matchAll: function matchAll(regexp) {
    var O = requireObjectCoercible(this);
    var flags, S, matcher, rx;

    if (regexp != null) {
      if (isRegExp(regexp)) {
        flags = toString(requireObjectCoercible('flags' in RegExpPrototype ? regexp.flags : getFlags(regexp)));
        if (!~stringIndexOf(flags, 'g')) throw TypeError('`.matchAll` does not allow non-global regexes');
      }

      if (WORKS_WITH_NON_GLOBAL_REGEX) return un$MatchAll(O, regexp);
      matcher = getMethod(regexp, MATCH_ALL);
      if (matcher === undefined && IS_PURE && classof(regexp) == 'RegExp') matcher = $matchAll;
      if (matcher) return call(matcher, regexp, O);
    } else if (WORKS_WITH_NON_GLOBAL_REGEX) return un$MatchAll(O, regexp);

    S = toString(O);
    rx = new RegExp(regexp, 'g');
    return IS_PURE ? call($matchAll, rx, S) : rx[MATCH_ALL](S);
  }
});
IS_PURE || MATCH_ALL in RegExpPrototype || redefine(RegExpPrototype, MATCH_ALL, $matchAll);
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/create-iterator-constructor":"b9bab68ecd62fef0c0fd01853566a2cf","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37","../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/classof-raw":"901e5a25291bac244011feea921975b2","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/is-regexp":"1b0c4084637d9394e4a3ec700a5fe929","../internals/regexp-flags":"9ed5cc7a98675b7cdea415f21c6b5f7b","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/species-constructor":"a110df2a5900fb30b4239748c46982d8","../internals/advance-string-index":"a82731122e9bc6200670a09300eea37d","../internals/regexp-exec-abstract":"b0d0f5be4954a41ffb1779e4d139f3ac","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0"}],"987ab582e37273e69c0b679fe69f1c13":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $padEnd = require('../internals/string-pad').end;
var WEBKIT_BUG = require('../internals/string-pad-webkit-bug');

// `String.prototype.padEnd` method
// https://tc39.es/ecma262/#sec-string.prototype.padend
$({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/string-pad":"14fdfa116c4beae657c87c3904b98ff7","../internals/string-pad-webkit-bug":"42ee71ed5649b88e4b78b1af58d85041"}],"42ee71ed5649b88e4b78b1af58d85041":[function(require,module,exports) {
// https://github.com/zloirock/core-js/issues/280
var userAgent = require('../internals/engine-user-agent');

module.exports = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(userAgent);

},{"../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828"}],"07ed48ecc7ac56e90df2c8704869ac80":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $padStart = require('../internals/string-pad').start;
var WEBKIT_BUG = require('../internals/string-pad-webkit-bug');

// `String.prototype.padStart` method
// https://tc39.es/ecma262/#sec-string.prototype.padstart
$({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/string-pad":"14fdfa116c4beae657c87c3904b98ff7","../internals/string-pad-webkit-bug":"42ee71ed5649b88e4b78b1af58d85041"}],"f2be1a56b9a5448c818455d8bd482e40":[function(require,module,exports) {
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var toIndexedObject = require('../internals/to-indexed-object');
var toObject = require('../internals/to-object');
var toString = require('../internals/to-string');
var lengthOfArrayLike = require('../internals/length-of-array-like');

var push = uncurryThis([].push);
var join = uncurryThis([].join);

// `String.raw` method
// https://tc39.es/ecma262/#sec-string.raw
$({ target: 'String', stat: true }, {
  raw: function raw(template) {
    var rawTemplate = toIndexedObject(toObject(template).raw);
    var literalSegments = lengthOfArrayLike(rawTemplate);
    var argumentsLength = arguments.length;
    var elements = [];
    var i = 0;
    while (literalSegments > i) {
      push(elements, toString(rawTemplate[i++]));
      if (i === literalSegments) return join(elements, '');
      if (i < argumentsLength) push(elements, toString(arguments[i]));
    }
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666"}],"6be7dd01007c4a2e075e4832b4b0f997":[function(require,module,exports) {
var $ = require('../internals/export');
var repeat = require('../internals/string-repeat');

// `String.prototype.repeat` method
// https://tc39.es/ecma262/#sec-string.prototype.repeat
$({ target: 'String', proto: true }, {
  repeat: repeat
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/string-repeat":"e13c88d4c3e9f60dd634cd30678b1b2c"}],"a41434a38db9af6d2ad868f7a439ab89":[function(require,module,exports) {
'use strict';
var apply = require('../internals/function-apply');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var fails = require('../internals/fails');
var anObject = require('../internals/an-object');
var isCallable = require('../internals/is-callable');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var requireObjectCoercible = require('../internals/require-object-coercible');
var advanceStringIndex = require('../internals/advance-string-index');
var getMethod = require('../internals/get-method');
var getSubstitution = require('../internals/get-substitution');
var regExpExec = require('../internals/regexp-exec-abstract');
var wellKnownSymbol = require('../internals/well-known-symbol');

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          var replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

},{"../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/fix-regexp-well-known-symbol-logic":"d8e482793d25d23c0a47ad83f96948ea","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f","../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37","../internals/advance-string-index":"a82731122e9bc6200670a09300eea37d","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/get-substitution":"ab6f86ef3a20b09616af6686c7ee3625","../internals/regexp-exec-abstract":"b0d0f5be4954a41ffb1779e4d139f3ac","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"ab6f86ef3a20b09616af6686c7ee3625":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var toObject = require('../internals/to-object');

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba"}],"845b3fa8d94b5f91b0f72276673d793c":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var call = require('../internals/function-call');

var uncurryThis = require('../internals/function-uncurry-this');

var requireObjectCoercible = require('../internals/require-object-coercible');

var isCallable = require('../internals/is-callable');

var isRegExp = require('../internals/is-regexp');

var toString = require('../internals/to-string');

var getMethod = require('../internals/get-method');

var regExpFlags = require('../internals/regexp-flags');

var getSubstitution = require('../internals/get-substitution');

var wellKnownSymbol = require('../internals/well-known-symbol');

var IS_PURE = require('../internals/is-pure');

var REPLACE = wellKnownSymbol('replace');
var RegExpPrototype = RegExp.prototype;
var TypeError = global.TypeError;
var getFlags = uncurryThis(regExpFlags);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var max = Math.max;

var stringIndexOf = function (string, searchValue, fromIndex) {
  if (fromIndex > string.length) return -1;
  if (searchValue === '') return fromIndex;
  return indexOf(string, searchValue, fromIndex);
}; // `String.prototype.replaceAll` method
// https://tc39.es/ecma262/#sec-string.prototype.replaceall


$({
  target: 'String',
  proto: true
}, {
  replaceAll: function replaceAll(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
    var position = 0;
    var endOfLastMatch = 0;
    var result = '';

    if (searchValue != null) {
      IS_REG_EXP = isRegExp(searchValue);

      if (IS_REG_EXP) {
        flags = toString(requireObjectCoercible('flags' in RegExpPrototype ? searchValue.flags : getFlags(searchValue)));
        if (!~indexOf(flags, 'g')) throw TypeError('`.replaceAll` does not allow non-global regexes');
      }

      replacer = getMethod(searchValue, REPLACE);

      if (replacer) {
        return call(replacer, searchValue, O, replaceValue);
      } else if (IS_PURE && IS_REG_EXP) {
        return replace(toString(O), searchValue, replaceValue);
      }
    }

    string = toString(O);
    searchString = toString(searchValue);
    functionalReplace = isCallable(replaceValue);
    if (!functionalReplace) replaceValue = toString(replaceValue);
    searchLength = searchString.length;
    advanceBy = max(1, searchLength);
    position = stringIndexOf(string, searchString, 0);

    while (position !== -1) {
      replacement = functionalReplace ? toString(replaceValue(searchString, position, string)) : getSubstitution(searchString, string, position, [], undefined, replaceValue);
      result += stringSlice(string, endOfLastMatch, position) + replacement;
      endOfLastMatch = position + searchLength;
      position = stringIndexOf(string, searchString, position + advanceBy);
    }

    if (endOfLastMatch < string.length) {
      result += stringSlice(string, endOfLastMatch);
    }

    return result;
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/is-regexp":"1b0c4084637d9394e4a3ec700a5fe929","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/regexp-flags":"9ed5cc7a98675b7cdea415f21c6b5f7b","../internals/get-substitution":"ab6f86ef3a20b09616af6686c7ee3625","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0"}],"ae527e4b5645d7ce591da920b6d5804c":[function(require,module,exports) {
'use strict';
var call = require('../internals/function-call');
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var requireObjectCoercible = require('../internals/require-object-coercible');
var sameValue = require('../internals/same-value');
var toString = require('../internals/to-string');
var getMethod = require('../internals/get-method');
var regExpExec = require('../internals/regexp-exec-abstract');

// @@search logic
fixRegExpWellKnownSymbolLogic('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : getMethod(regexp, SEARCH);
      return searcher ? call(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeSearch, rx, S);

      if (res.done) return res.value;

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

},{"../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/fix-regexp-well-known-symbol-logic":"d8e482793d25d23c0a47ad83f96948ea","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37","../internals/same-value":"70e03c57bd10a82f4701c61a54d83ad2","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/regexp-exec-abstract":"b0d0f5be4954a41ffb1779e4d139f3ac"}],"e5425e3ea560528abc0466beeaf18eb9":[function(require,module,exports) {
'use strict';
var apply = require('../internals/function-apply');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var isRegExp = require('../internals/is-regexp');
var anObject = require('../internals/an-object');
var requireObjectCoercible = require('../internals/require-object-coercible');
var speciesConstructor = require('../internals/species-constructor');
var advanceStringIndex = require('../internals/advance-string-index');
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var getMethod = require('../internals/get-method');
var arraySlice = require('../internals/array-slice-simple');
var callRegExpExec = require('../internals/regexp-exec-abstract');
var regexpExec = require('../internals/regexp-exec');
var stickyHelpers = require('../internals/regexp-sticky-helpers');
var fails = require('../internals/fails');

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 0xFFFFFFFF;
var min = Math.min;
var $push = [].push;
var exec = uncurryThis(/./.exec);
var push = uncurryThis($push);
var stringSlice = uncurryThis(''.slice);

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return call(nativeSplit, string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = call(regexpExec, separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          push(output, stringSlice(string, lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) apply($push, output, arraySlice(match, 1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !exec(separatorCopy, '')) push(output, '');
      } else push(output, stringSlice(string, lastLastIndex));
      return output.length > lim ? arraySlice(output, 0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
      return splitter
        ? call(splitter, separator, O, limit)
        : call(internalSplit, toString(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          push(A, stringSlice(S, p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push(A, z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      push(A, stringSlice(S, p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

},{"../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/fix-regexp-well-known-symbol-logic":"d8e482793d25d23c0a47ad83f96948ea","../internals/is-regexp":"1b0c4084637d9394e4a3ec700a5fe929","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37","../internals/species-constructor":"a110df2a5900fb30b4239748c46982d8","../internals/advance-string-index":"a82731122e9bc6200670a09300eea37d","../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/array-slice-simple":"a98e351776398a94d2cb369f0b75ee01","../internals/regexp-exec-abstract":"b0d0f5be4954a41ffb1779e4d139f3ac","../internals/regexp-exec":"23dabdad7fff927134e97d952be0a510","../internals/regexp-sticky-helpers":"8cf821686ebf02f1be282c6b0438fc93","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"b08993728dae252586b5825facc03f42":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');
var IS_PURE = require('../internals/is-pure');

// eslint-disable-next-line es/no-string-prototype-startswith -- safe
var un$StartsWith = uncurryThis(''.startsWith);
var stringSlice = uncurryThis(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = toString(searchString);
    return un$StartsWith
      ? un$StartsWith(that, search, index)
      : stringSlice(that, index, index + search.length) === search;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/not-a-regexp":"83ac77f2ca52be854a0c670dd66bddf0","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37","../internals/correct-is-regexp-logic":"7a70fee840efec120df490a17771b3a0","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0"}],"bdb86750583fdb03b57d141d076cab05":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toString = require('../internals/to-string');

var stringSlice = uncurryThis(''.slice);
var max = Math.max;
var min = Math.min;

// eslint-disable-next-line unicorn/prefer-string-slice -- required for testing
var FORCED = !''.substr || 'ab'.substr(-1) !== 'b';

// `String.prototype.substr` method
// https://tc39.es/ecma262/#sec-string.prototype.substr
$({ target: 'String', proto: true, forced: FORCED }, {
  substr: function substr(start, length) {
    var that = toString(requireObjectCoercible(this));
    var size = that.length;
    var intStart = toIntegerOrInfinity(start);
    var intLength, intEnd;
    if (intStart === Infinity) intStart = 0;
    if (intStart < 0) intStart = max(size + intStart, 0);
    intLength = length === undefined ? size : toIntegerOrInfinity(length);
    if (intLength <= 0 || intLength === Infinity) return '';
    intEnd = min(intStart + intLength, size);
    return intStart >= intEnd ? '' : stringSlice(that, intStart, intEnd);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77"}],"1d21d2f2e8e411c3424b8bfa6be4316c":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $trim = require('../internals/string-trim').trim;
var forcedStringTrimMethod = require('../internals/string-trim-forced');

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/string-trim":"a979dc28c1aabf3dc5ff186df039987b","../internals/string-trim-forced":"7c698aa2e56375ba2c666c0888b24439"}],"7c698aa2e56375ba2c666c0888b24439":[function(require,module,exports) {
var PROPER_FUNCTION_NAME = require('../internals/function-name').PROPER;
var fails = require('../internals/fails');
var whitespaces = require('../internals/whitespaces');

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]()
      || non[METHOD_NAME]() !== non
      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
  });
};

},{"../internals/function-name":"8c9a0dc6f151e22aaeb5f0e18e363d7d","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/whitespaces":"2e1181e35cded9a2f558d468336bfc66"}],"d2e9b6dce4935bf428fb4b3953e33dc9":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $trimEnd = require('../internals/string-trim').end;
var forcedStringTrimMethod = require('../internals/string-trim-forced');

var FORCED = forcedStringTrimMethod('trimEnd');

var trimEnd = FORCED ? function trimEnd() {
  return $trimEnd(this);
// eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
} : ''.trimEnd;

// `String.prototype.{ trimEnd, trimRight }` methods
// https://tc39.es/ecma262/#sec-string.prototype.trimend
// https://tc39.es/ecma262/#String.prototype.trimright
$({ target: 'String', proto: true, name: 'trimEnd', forced: FORCED }, {
  trimEnd: trimEnd,
  trimRight: trimEnd
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/string-trim":"a979dc28c1aabf3dc5ff186df039987b","../internals/string-trim-forced":"7c698aa2e56375ba2c666c0888b24439"}],"9069335fb19f954e95d4d8ab5ad7559b":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $trimStart = require('../internals/string-trim').start;
var forcedStringTrimMethod = require('../internals/string-trim-forced');

var FORCED = forcedStringTrimMethod('trimStart');

var trimStart = FORCED ? function trimStart() {
  return $trimStart(this);
// eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
} : ''.trimStart;

// `String.prototype.{ trimStart, trimLeft }` methods
// https://tc39.es/ecma262/#sec-string.prototype.trimstart
// https://tc39.es/ecma262/#String.prototype.trimleft
$({ target: 'String', proto: true, name: 'trimStart', forced: FORCED }, {
  trimStart: trimStart,
  trimLeft: trimStart
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/string-trim":"a979dc28c1aabf3dc5ff186df039987b","../internals/string-trim-forced":"7c698aa2e56375ba2c666c0888b24439"}],"eac67dc1107ad6650b3189414593396f":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.anchor` method
// https://tc39.es/ecma262/#sec-string.prototype.anchor
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('anchor') }, {
  anchor: function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/create-html":"55419d9e5de109d5040f5c029671c2a8","../internals/string-html-forced":"2ded07f5aee6ab92dcb6956d178fc749"}],"55419d9e5de109d5040f5c029671c2a8":[function(require,module,exports) {
var uncurryThis = require('../internals/function-uncurry-this');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toString = require('../internals/to-string');

var quot = /"/g;
var replace = uncurryThis(''.replace);

// `CreateHTML` abstract operation
// https://tc39.es/ecma262/#sec-createhtml
module.exports = function (string, tag, attribute, value) {
  var S = toString(requireObjectCoercible(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + replace(toString(value), quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77"}],"2ded07f5aee6ab92dcb6956d178fc749":[function(require,module,exports) {
var fails = require('../internals/fails');

// check the existence of a method, lowercase
// of a tag and escaping quotes in arguments
module.exports = function (METHOD_NAME) {
  return fails(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"61887ad261889dc5b874417f6e25d1c1":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.big` method
// https://tc39.es/ecma262/#sec-string.prototype.big
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('big') }, {
  big: function big() {
    return createHTML(this, 'big', '', '');
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/create-html":"55419d9e5de109d5040f5c029671c2a8","../internals/string-html-forced":"2ded07f5aee6ab92dcb6956d178fc749"}],"e2265281232a7d68b4c0d27dce6e8a58":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.blink` method
// https://tc39.es/ecma262/#sec-string.prototype.blink
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('blink') }, {
  blink: function blink() {
    return createHTML(this, 'blink', '', '');
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/create-html":"55419d9e5de109d5040f5c029671c2a8","../internals/string-html-forced":"2ded07f5aee6ab92dcb6956d178fc749"}],"21e831e883a70a9f0bf0d1b5de16fabb":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.bold` method
// https://tc39.es/ecma262/#sec-string.prototype.bold
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('bold') }, {
  bold: function bold() {
    return createHTML(this, 'b', '', '');
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/create-html":"55419d9e5de109d5040f5c029671c2a8","../internals/string-html-forced":"2ded07f5aee6ab92dcb6956d178fc749"}],"0c62093fa4884bc0ff419dad3d3fe3fe":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.fixed` method
// https://tc39.es/ecma262/#sec-string.prototype.fixed
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fixed') }, {
  fixed: function fixed() {
    return createHTML(this, 'tt', '', '');
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/create-html":"55419d9e5de109d5040f5c029671c2a8","../internals/string-html-forced":"2ded07f5aee6ab92dcb6956d178fc749"}],"9227428d69d2263af6f10bfbb71cb2a9":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.fontcolor` method
// https://tc39.es/ecma262/#sec-string.prototype.fontcolor
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fontcolor') }, {
  fontcolor: function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/create-html":"55419d9e5de109d5040f5c029671c2a8","../internals/string-html-forced":"2ded07f5aee6ab92dcb6956d178fc749"}],"e0d0f7fe2b5527d9f3839ce5446a488d":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.fontsize` method
// https://tc39.es/ecma262/#sec-string.prototype.fontsize
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fontsize') }, {
  fontsize: function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/create-html":"55419d9e5de109d5040f5c029671c2a8","../internals/string-html-forced":"2ded07f5aee6ab92dcb6956d178fc749"}],"ca31bc43e61e0c6a99106ebbc42e2822":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.italics` method
// https://tc39.es/ecma262/#sec-string.prototype.italics
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('italics') }, {
  italics: function italics() {
    return createHTML(this, 'i', '', '');
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/create-html":"55419d9e5de109d5040f5c029671c2a8","../internals/string-html-forced":"2ded07f5aee6ab92dcb6956d178fc749"}],"2de2022addb0d6dd8e5a9aa59e6a1bde":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.link` method
// https://tc39.es/ecma262/#sec-string.prototype.link
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('link') }, {
  link: function link(url) {
    return createHTML(this, 'a', 'href', url);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/create-html":"55419d9e5de109d5040f5c029671c2a8","../internals/string-html-forced":"2ded07f5aee6ab92dcb6956d178fc749"}],"3a375324c085b0184274912013c68c09":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.small` method
// https://tc39.es/ecma262/#sec-string.prototype.small
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('small') }, {
  small: function small() {
    return createHTML(this, 'small', '', '');
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/create-html":"55419d9e5de109d5040f5c029671c2a8","../internals/string-html-forced":"2ded07f5aee6ab92dcb6956d178fc749"}],"290971a5fdf49c2a481a1e57d8df83c5":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.strike` method
// https://tc39.es/ecma262/#sec-string.prototype.strike
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('strike') }, {
  strike: function strike() {
    return createHTML(this, 'strike', '', '');
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/create-html":"55419d9e5de109d5040f5c029671c2a8","../internals/string-html-forced":"2ded07f5aee6ab92dcb6956d178fc749"}],"a1fb04da2f2ca751282b866a53e94c3e":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.sub` method
// https://tc39.es/ecma262/#sec-string.prototype.sub
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sub') }, {
  sub: function sub() {
    return createHTML(this, 'sub', '', '');
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/create-html":"55419d9e5de109d5040f5c029671c2a8","../internals/string-html-forced":"2ded07f5aee6ab92dcb6956d178fc749"}],"79c83b8c73cc043cc2da0c9c227551ca":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.sup` method
// https://tc39.es/ecma262/#sec-string.prototype.sup
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sup') }, {
  sup: function sup() {
    return createHTML(this, 'sup', '', '');
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/create-html":"55419d9e5de109d5040f5c029671c2a8","../internals/string-html-forced":"2ded07f5aee6ab92dcb6956d178fc749"}],"d5ed5e3a2e200dcf66c948e6350ae29c":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Float32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Float32', function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"8c855361f876f3547521c1eb756f5360"}],"8c855361f876f3547521c1eb756f5360":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var call = require('../internals/function-call');

var DESCRIPTORS = require('../internals/descriptors');

var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = require('../internals/typed-array-constructors-require-wrappers');

var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var ArrayBufferModule = require('../internals/array-buffer');

var anInstance = require('../internals/an-instance');

var createPropertyDescriptor = require('../internals/create-property-descriptor');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var isIntegralNumber = require('../internals/is-integral-number');

var toLength = require('../internals/to-length');

var toIndex = require('../internals/to-index');

var toOffset = require('../internals/to-offset');

var toPropertyKey = require('../internals/to-property-key');

var hasOwn = require('../internals/has-own-property');

var classof = require('../internals/classof');

var isObject = require('../internals/is-object');

var isSymbol = require('../internals/is-symbol');

var create = require('../internals/object-create');

var isPrototypeOf = require('../internals/object-is-prototype-of');

var setPrototypeOf = require('../internals/object-set-prototype-of');

var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;

var typedArrayFrom = require('../internals/typed-array-from');

var forEach = require('../internals/array-iteration').forEach;

var setSpecies = require('../internals/set-species');

var definePropertyModule = require('../internals/object-define-property');

var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');

var InternalStateModule = require('../internals/internal-state');

var inheritIfRequired = require('../internals/inherit-if-required');

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError = global.RangeError;
var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var ArrayBufferPrototype = ArrayBuffer.prototype;
var DataView = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;
var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  aTypedArrayConstructor(C);
  var index = 0;
  var length = list.length;
  var result = new C(length);

  while (length > index) result[index] = list[index++];

  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, {
    get: function () {
      return getInternalState(this)[key];
    }
  });
};

var isArrayBuffer = function (it) {
  var klass;
  return isPrototypeOf(ArrayBufferPrototype, it) || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target) && !isSymbol(key) && key in target && isIntegralNumber(+key) && key >= 0;
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  key = toPropertyKey(key);
  return isTypedArrayIndex(target, key) ? createPropertyDescriptor(2, target[key]) : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  key = toPropertyKey(key);

  if (isTypedArrayIndex(target, key) && isObject(descriptor) && hasOwn(descriptor, 'value') && !hasOwn(descriptor, 'get') && !hasOwn(descriptor, 'set') // TODO: add validation descriptor w/o calling accessors
  && !descriptor.configurable && (!hasOwn(descriptor, 'writable') || descriptor.writable) && (!hasOwn(descriptor, 'enumerable') || descriptor.enumerable)) {
    target[key] = descriptor.value;
    return target;
  }

  return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $({
    target: 'Object',
    stat: true,
    forced: !NATIVE_ARRAY_BUFFER_VIEWS
  }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  module.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructorPrototype);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;

        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;

          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }

          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return call(typedArrayFrom, TypedArrayConstructor, data);
        }

        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });

        while (index < length) addElement(that, index++);
      });
      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructorPrototype);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length) : typedArrayOffset !== undefined ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES)) : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return call(typedArrayFrom, TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });
      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_CONSTRUCTOR, TypedArrayConstructor);

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;
    $({
      global: true,
      forced: TypedArrayConstructor != NativeTypedArrayConstructor,
      sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () {
  /* empty */
};
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/typed-array-constructors-require-wrappers":"c18c6fa7d7a6ea266deebfa9f42416ec","../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-buffer":"3466d92de28aaf0afa876d9d5f82bf85","../internals/an-instance":"8b0daff12bd798defdb69ae41eea7f5e","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/is-integral-number":"e4e1b979db7d4b104d155f8ac0bf76c9","../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f","../internals/to-index":"0bb880d085cbd3bcde3887ce0606ee2e","../internals/to-offset":"4ef9165a3829f19317eb1411640c1a9c","../internals/to-property-key":"df2b61336906907f777029fe90c882a8","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/classof":"be2998c5b4d0f20a1cc5fe6807661aae","../internals/is-object":"03244e745134af366d66b74456891052","../internals/is-symbol":"7500e07108c47e5d25bda62049b8b4ba","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/object-set-prototype-of":"22e756b2221a479eceeccf2a78a39bef","../internals/object-get-own-property-names":"b422be4dea2e1243d9a0803066cc2d3d","../internals/typed-array-from":"b54e61bc75f363ab6afd0d016a887d53","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe","../internals/set-species":"e3f4ec2b9d910d5e576300937f95e2c2","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/inherit-if-required":"4d9c0ab06f91ed2da925563ab67ef474"}],"c18c6fa7d7a6ea266deebfa9f42416ec":[function(require,module,exports) {
/* eslint-disable no-new -- required for testing */
var global = require('../internals/global');

var fails = require('../internals/fails');

var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');

var NATIVE_ARRAY_BUFFER_VIEWS = require('../internals/array-buffer-view-core').NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;
module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
  Int8Array(1);
}) || !fails(function () {
  new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array();
  new Int8Array(null);
  new Int8Array(1.5);
  new Int8Array(iterable);
}, true) || fails(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/check-correctness-of-iteration":"33641ceb9010ed8125d1d18da9ad9225","../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb"}],"4ef9165a3829f19317eb1411640c1a9c":[function(require,module,exports) {
var global = require('../internals/global');

var toPositiveInteger = require('../internals/to-positive-integer');

var RangeError = global.RangeError;

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/to-positive-integer":"78a692a1c72bccb538efb4a5c2020e6b"}],"78a692a1c72bccb538efb4a5c2020e6b":[function(require,module,exports) {
var global = require('../internals/global');

var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var RangeError = global.RangeError;

module.exports = function (it) {
  var result = toIntegerOrInfinity(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f"}],"b54e61bc75f363ab6afd0d016a887d53":[function(require,module,exports) {
var bind = require('../internals/function-bind-context');
var call = require('../internals/function-call');
var aConstructor = require('../internals/a-constructor');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var getIterator = require('../internals/get-iterator');
var getIteratorMethod = require('../internals/get-iterator-method');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var aTypedArrayConstructor = require('../internals/array-buffer-view-core').aTypedArrayConstructor;

module.exports = function from(source /* , mapfn, thisArg */) {
  var C = aConstructor(this);
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    O = [];
    while (!(step = call(next, iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind(mapfn, arguments[2]);
  }
  length = lengthOfArrayLike(O);
  result = new (aTypedArrayConstructor(C))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};

},{"../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-constructor":"68a3572cb2f4921c4818116046759501","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/get-iterator":"95609b3cd4fe60efb5286ed1595b57b7","../internals/get-iterator-method":"ee70e79559122fe97016e526e216278d","../internals/is-array-iterator-method":"a65e0e29ed1bf2da6b23fe7f2c1ffad3","../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb"}],"49914eeba57759547672886c5961b9e4":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Float64Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Float64', function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"8c855361f876f3547521c1eb756f5360"}],"1fc9d0d9e9c4ca72873ee75cc9532911":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Int8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int8', function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"8c855361f876f3547521c1eb756f5360"}],"6ba53210946e69387b5af65ca70f5602":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Int16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int16', function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"8c855361f876f3547521c1eb756f5360"}],"52f07ad61480c3da8b1b371346f2b755":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Int32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int32', function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"8c855361f876f3547521c1eb756f5360"}],"6042ea91f038c74624be740ff17090b9":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Uint8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"8c855361f876f3547521c1eb756f5360"}],"47e53ff27a819e98075783d2516842bf":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Uint8ClampedArray` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"../internals/typed-array-constructor":"8c855361f876f3547521c1eb756f5360"}],"20f511ab1a5fbdd3a99ff1f471adbc30":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Uint16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint16', function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"8c855361f876f3547521c1eb756f5360"}],"8212db3659c5fe8bebc2163b12c9f547":[function(require,module,exports) {
var createTypedArrayConstructor = require('../internals/typed-array-constructor');

// `Uint32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint32', function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"../internals/typed-array-constructor":"8c855361f876f3547521c1eb756f5360"}],"797f3e2dbbd581868c09166170c2b810":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
exportTypedArrayMethod('at', function at(index) {
  var O = aTypedArray(this);
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return (k < 0 || k >= len) ? undefined : O[k];
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f"}],"600aa026b8a159b7bb2c160d5006a7e6":[function(require,module,exports) {
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $ArrayCopyWithin = require('../internals/array-copy-within');

var u$ArrayCopyWithin = uncurryThis($ArrayCopyWithin);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.copyWithin` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
exportTypedArrayMethod('copyWithin', function copyWithin(target, start /* , end */) {
  return u$ArrayCopyWithin(aTypedArray(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
});

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-copy-within":"eb5e4f6d5bcd578e90e61e62805332f4"}],"92a3b68ef6bc030efdf17f232050663d":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $every = require('../internals/array-iteration').every;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.every` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
exportTypedArrayMethod('every', function every(callbackfn /* , thisArg */) {
  return $every(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe"}],"33be1ff0d41bd8bdd57895617624d99f":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var call = require('../internals/function-call');
var $fill = require('../internals/array-fill');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.fill` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
exportTypedArrayMethod('fill', function fill(value /* , start, end */) {
  var length = arguments.length;
  return call(
    $fill,
    aTypedArray(this),
    value,
    length > 1 ? arguments[1] : undefined,
    length > 2 ? arguments[2] : undefined
  );
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/array-fill":"f859d289ee3bddee8aaf320533aa8737"}],"5fa2a03f6136c65a641b66356cf5fcc5":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $filter = require('../internals/array-iteration').filter;
var fromSpeciesAndList = require('../internals/typed-array-from-species-and-list');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filter` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
exportTypedArrayMethod('filter', function filter(callbackfn /* , thisArg */) {
  var list = $filter(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  return fromSpeciesAndList(this, list);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe","../internals/typed-array-from-species-and-list":"e9a19380fa8f88a2670ead0da7293725"}],"e9a19380fa8f88a2670ead0da7293725":[function(require,module,exports) {
var arrayFromConstructorAndList = require('../internals/array-from-constructor-and-list');
var typedArraySpeciesConstructor = require('../internals/typed-array-species-constructor');

module.exports = function (instance, list) {
  return arrayFromConstructorAndList(typedArraySpeciesConstructor(instance), list);
};

},{"../internals/array-from-constructor-and-list":"921f9e3b063d1f99d91c6bcb5737b68e","../internals/typed-array-species-constructor":"abc0c9d5e888da50b154a206613c0ab5"}],"921f9e3b063d1f99d91c6bcb5737b68e":[function(require,module,exports) {
var lengthOfArrayLike = require('../internals/length-of-array-like');

module.exports = function (Constructor, list) {
  var index = 0;
  var length = lengthOfArrayLike(list);
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};

},{"../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666"}],"abc0c9d5e888da50b154a206613c0ab5":[function(require,module,exports) {
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var speciesConstructor = require('../internals/species-constructor');

var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;

// a part of `TypedArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#typedarray-species-create
module.exports = function (originalArray) {
  return aTypedArrayConstructor(speciesConstructor(originalArray, originalArray[TYPED_ARRAY_CONSTRUCTOR]));
};

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/species-constructor":"a110df2a5900fb30b4239748c46982d8"}],"536915337f89c8711c27bb6f4279c9e9":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $find = require('../internals/array-iteration').find;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.find` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
exportTypedArrayMethod('find', function find(predicate /* , thisArg */) {
  return $find(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe"}],"64d4a9b68f1f8e20787978d86d849fd8":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $findIndex = require('../internals/array-iteration').findIndex;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
exportTypedArrayMethod('findIndex', function findIndex(predicate /* , thisArg */) {
  return $findIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe"}],"dec5619455bf0f57b7f420968089fb01":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $forEach = require('../internals/array-iteration').forEach;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.forEach` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
exportTypedArrayMethod('forEach', function forEach(callbackfn /* , thisArg */) {
  $forEach(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe"}],"183d72778e0f99cedb12a04e35ea2d50":[function(require,module,exports) {
'use strict';
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = require('../internals/typed-array-constructors-require-wrappers');
var exportTypedArrayStaticMethod = require('../internals/array-buffer-view-core').exportTypedArrayStaticMethod;
var typedArrayFrom = require('../internals/typed-array-from');

// `%TypedArray%.from` method
// https://tc39.es/ecma262/#sec-%typedarray%.from
exportTypedArrayStaticMethod('from', typedArrayFrom, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);

},{"../internals/typed-array-constructors-require-wrappers":"c18c6fa7d7a6ea266deebfa9f42416ec","../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/typed-array-from":"b54e61bc75f363ab6afd0d016a887d53"}],"8071d5d49710e54ee4b1f069daf1498c":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $includes = require('../internals/array-includes').includes;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.includes` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
exportTypedArrayMethod('includes', function includes(searchElement /* , fromIndex */) {
  return $includes(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-includes":"8d0989f06759b3b2c526a5860656b2fc"}],"f132a5f38bf2eb601c6396cf64c0bc5e":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $indexOf = require('../internals/array-includes').indexOf;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
exportTypedArrayMethod('indexOf', function indexOf(searchElement /* , fromIndex */) {
  return $indexOf(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-includes":"8d0989f06759b3b2c526a5860656b2fc"}],"91be1826c2d7d0723d824783274922e8":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');

var fails = require('../internals/fails');

var uncurryThis = require('../internals/function-uncurry-this');

var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var ArrayIterators = require('../modules/es.array.iterator');

var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var Uint8Array = global.Uint8Array;
var arrayValues = uncurryThis(ArrayIterators.values);
var arrayKeys = uncurryThis(ArrayIterators.keys);
var arrayEntries = uncurryThis(ArrayIterators.entries);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var TypedArrayPrototype = Uint8Array && Uint8Array.prototype;
var GENERIC = !fails(function () {
  TypedArrayPrototype[ITERATOR].call([1]);
});
var ITERATOR_IS_VALUES = !!TypedArrayPrototype && TypedArrayPrototype.values && TypedArrayPrototype[ITERATOR] === TypedArrayPrototype.values && TypedArrayPrototype.values.name === 'values';

var typedArrayValues = function values() {
  return arrayValues(aTypedArray(this));
}; // `%TypedArray%.prototype.entries` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries


exportTypedArrayMethod('entries', function entries() {
  return arrayEntries(aTypedArray(this));
}, GENERIC); // `%TypedArray%.prototype.keys` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys

exportTypedArrayMethod('keys', function keys() {
  return arrayKeys(aTypedArray(this));
}, GENERIC); // `%TypedArray%.prototype.values` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.values

exportTypedArrayMethod('values', typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, {
  name: 'values'
}); // `%TypedArray%.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator

exportTypedArrayMethod(ITERATOR, typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, {
  name: 'values'
});
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../modules/es.array.iterator":"510aceb4694d90a939f4789a99a0ae3f","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"87ae94597f25d44b229c773ad7e36ea0":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var uncurryThis = require('../internals/function-uncurry-this');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $join = uncurryThis([].join);

// `%TypedArray%.prototype.join` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
exportTypedArrayMethod('join', function join(separator) {
  return $join(aTypedArray(this), separator);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"494fc1c36dfa08beb7ad90e00cba5da8":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var apply = require('../internals/function-apply');
var $lastIndexOf = require('../internals/array-last-index-of');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
exportTypedArrayMethod('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
  var length = arguments.length;
  return apply($lastIndexOf, aTypedArray(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/array-last-index-of":"5a6493d53f2377c028ddee225c52adeb"}],"4dd6468fa12d7ab6c5df57b08a24b774":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $map = require('../internals/array-iteration').map;
var typedArraySpeciesConstructor = require('../internals/typed-array-species-constructor');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.map` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
exportTypedArrayMethod('map', function map(mapfn /* , thisArg */) {
  return $map(aTypedArray(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
    return new (typedArraySpeciesConstructor(O))(length);
  });
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe","../internals/typed-array-species-constructor":"abc0c9d5e888da50b154a206613c0ab5"}],"2ee3ec99d0b3dea4fec9002159200789":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = require('../internals/typed-array-constructors-require-wrappers');

var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayStaticMethod = ArrayBufferViewCore.exportTypedArrayStaticMethod;

// `%TypedArray%.of` method
// https://tc39.es/ecma262/#sec-%typedarray%.of
exportTypedArrayStaticMethod('of', function of(/* ...items */) {
  var index = 0;
  var length = arguments.length;
  var result = new (aTypedArrayConstructor(this))(length);
  while (length > index) result[index] = arguments[index++];
  return result;
}, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/typed-array-constructors-require-wrappers":"c18c6fa7d7a6ea266deebfa9f42416ec"}],"c7868da1c68a2d1430007cfb77b0e17d":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $reduce = require('../internals/array-reduce').left;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduce` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
exportTypedArrayMethod('reduce', function reduce(callbackfn /* , initialValue */) {
  var length = arguments.length;
  return $reduce(aTypedArray(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-reduce":"96b61c2f8c6fac7e881ba14255366f70"}],"c38a89f1b0df74fa710f5c57da82b166":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $reduceRight = require('../internals/array-reduce').right;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduceRicht` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
exportTypedArrayMethod('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
  var length = arguments.length;
  return $reduceRight(aTypedArray(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-reduce":"96b61c2f8c6fac7e881ba14255366f70"}],"c057b0ac343800304fb7600db363b844":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var floor = Math.floor;

// `%TypedArray%.prototype.reverse` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
exportTypedArrayMethod('reverse', function reverse() {
  var that = this;
  var length = aTypedArray(that).length;
  var middle = floor(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  } return that;
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb"}],"050dec16d25f1873c295f4ac096b8101":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');

var call = require('../internals/function-call');

var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var lengthOfArrayLike = require('../internals/length-of-array-like');

var toOffset = require('../internals/to-offset');

var toIndexedObject = require('../internals/to-object');

var fails = require('../internals/fails');

var RangeError = global.RangeError;
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS = !fails(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  var array = new Uint8ClampedArray(2);
  call($set, array, {
    length: 1,
    0: 3
  }, 1);
  return array[1] !== 3;
}); // https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other

var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS && fails(function () {
  var array = new Int8Array(2);
  array.set(1);
  array.set('2', 1);
  return array[0] !== 0 || array[1] !== 2;
}); // `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set

exportTypedArrayMethod('set', function set(arrayLike
/* , offset */
) {
  aTypedArray(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var src = toIndexedObject(arrayLike);
  if (WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS) return call($set, this, src, offset);
  var length = this.length;
  var len = lengthOfArrayLike(src);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');

  while (index < len) this[offset + index] = src[index++];
}, !WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/to-offset":"4ef9165a3829f19317eb1411640c1a9c","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"da14d8632e7dd8becac9ee0b303adc02":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var typedArraySpeciesConstructor = require('../internals/typed-array-species-constructor');
var fails = require('../internals/fails');
var arraySlice = require('../internals/array-slice');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var FORCED = fails(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  new Int8Array(1).slice();
});

// `%TypedArray%.prototype.slice` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
exportTypedArrayMethod('slice', function slice(start, end) {
  var list = arraySlice(aTypedArray(this), start, end);
  var C = typedArraySpeciesConstructor(this);
  var index = 0;
  var length = list.length;
  var result = new C(length);
  while (length > index) result[index] = list[index++];
  return result;
}, FORCED);

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/typed-array-species-constructor":"abc0c9d5e888da50b154a206613c0ab5","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/array-slice":"d58518bc0d77fd7d4bbb2d854257bf40"}],"3956f6a21b0e58c29095ede2c262d916":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $some = require('../internals/array-iteration').some;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.some` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
exportTypedArrayMethod('some', function some(callbackfn /* , thisArg */) {
  return $some(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe"}],"faf71bbf1ae62353e86394c83b5fd942":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var fails = require('../internals/fails');

var aCallable = require('../internals/a-callable');

var internalSort = require('../internals/array-sort');

var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var FF = require('../internals/engine-ff-version');

var IE_OR_EDGE = require('../internals/engine-is-ie-or-edge');

var V8 = require('../internals/engine-v8-version');

var WEBKIT = require('../internals/engine-webkit-version');

var Array = global.Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var Uint16Array = global.Uint16Array;
var un$Sort = Uint16Array && uncurryThis(Uint16Array.prototype.sort); // WebKit

var ACCEPT_INCORRECT_ARGUMENTS = !!un$Sort && !(fails(function () {
  un$Sort(new Uint16Array(2), null);
}) && fails(function () {
  un$Sort(new Uint16Array(2), {});
}));
var STABLE_SORT = !!un$Sort && !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 74;
  if (FF) return FF < 67;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 602;
  var array = new Uint16Array(516);
  var expected = Array(516);
  var index, mod;

  for (index = 0; index < 516; index++) {
    mod = index % 4;
    array[index] = 515 - index;
    expected[index] = index - 2 * mod + 3;
  }

  un$Sort(array, function (a, b) {
    return (a / 4 | 0) - (b / 4 | 0);
  });

  for (index = 0; index < 516; index++) {
    if (array[index] !== expected[index]) return true;
  }
});

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (comparefn !== undefined) return +comparefn(x, y) || 0; // eslint-disable-next-line no-self-compare -- NaN check

    if (y !== y) return -1; // eslint-disable-next-line no-self-compare -- NaN check

    if (x !== x) return 1;
    if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
    return x > y;
  };
}; // `%TypedArray%.prototype.sort` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort


exportTypedArrayMethod('sort', function sort(comparefn) {
  if (comparefn !== undefined) aCallable(comparefn);
  if (STABLE_SORT) return un$Sort(this, comparefn);
  return internalSort(aTypedArray(this), getSortCompare(comparefn));
}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/array-sort":"d7faf6b35c1ed5a2bc73ccee2639a205","../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/engine-ff-version":"3b4ad7b5fc87b1e8937fc01bcac78a78","../internals/engine-is-ie-or-edge":"4dfa925fa1c30ab0259840df105bd9cd","../internals/engine-v8-version":"e23493e3b068d06b425cfae337547b80","../internals/engine-webkit-version":"84a6eba9ab851a96fed23c7afcb16964"}],"51e1dcefe2a202db3d768737fc47e748":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var toLength = require('../internals/to-length');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var typedArraySpeciesConstructor = require('../internals/typed-array-species-constructor');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.subarray` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
exportTypedArrayMethod('subarray', function subarray(begin, end) {
  var O = aTypedArray(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  var C = typedArraySpeciesConstructor(O);
  return new C(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f","../internals/to-absolute-index":"ff996ac5a229620b351a78c404035460","../internals/typed-array-species-constructor":"abc0c9d5e888da50b154a206613c0ab5"}],"00b7311bff09e21eaff1ca0d9929dd68":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');

var apply = require('../internals/function-apply');

var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var fails = require('../internals/fails');

var arraySlice = require('../internals/array-slice');

var Int8Array = global.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString; // iOS Safari 6.x fails here

var TO_LOCALE_STRING_BUG = !!Int8Array && fails(function () {
  $toLocaleString.call(new Int8Array(1));
});
var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array.prototype.toLocaleString.call([1, 2]);
}); // `%TypedArray%.prototype.toLocaleString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring

exportTypedArrayMethod('toLocaleString', function toLocaleString() {
  return apply($toLocaleString, TO_LOCALE_STRING_BUG ? arraySlice(aTypedArray(this)) : aTypedArray(this), arraySlice(arguments));
}, FORCED);
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/array-slice":"d58518bc0d77fd7d4bbb2d854257bf40"}],"3d4f98ca04fc7fac59be67083e661e7f":[function(require,module,exports) {
'use strict';

var exportTypedArrayMethod = require('../internals/array-buffer-view-core').exportTypedArrayMethod;

var fails = require('../internals/fails');

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var Uint8Array = global.Uint8Array;
var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
var arrayToString = [].toString;
var join = uncurryThis([].join);

if (fails(function () {
  arrayToString.call({});
})) {
  arrayToString = function toString() {
    return join(this);
  };
}

var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString; // `%TypedArray%.prototype.toString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring

exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);
},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"ee76c5b4436d15ce16b0b7a8e5eab8c8":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var toString = require('../internals/to-string');

var fromCharCode = String.fromCharCode;
var charAt = uncurryThis(''.charAt);
var exec = uncurryThis(/./.exec);
var stringSlice = uncurryThis(''.slice);

var hex2 = /^[\da-f]{2}$/i;
var hex4 = /^[\da-f]{4}$/i;

// `unescape` method
// https://tc39.es/ecma262/#sec-unescape-string
$({ global: true }, {
  unescape: function unescape(string) {
    var str = toString(string);
    var result = '';
    var length = str.length;
    var index = 0;
    var chr, part;
    while (index < length) {
      chr = charAt(str, index++);
      if (chr === '%') {
        if (charAt(str, index) === 'u') {
          part = stringSlice(str, index + 1, index + 5);
          if (exec(hex4, part)) {
            result += fromCharCode(parseInt(part, 16));
            index += 5;
            continue;
          }
        } else {
          part = stringSlice(str, index, index + 2);
          if (exec(hex2, part)) {
            result += fromCharCode(parseInt(part, 16));
            index += 2;
            continue;
          }
        }
      }
      result += chr;
    } return result;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77"}],"9e5ce70ecf8ba1c5c8a8c8442c7aea1b":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var redefineAll = require('../internals/redefine-all');

var InternalMetadataModule = require('../internals/internal-metadata');

var collection = require('../internals/collection');

var collectionWeak = require('../internals/collection-weak');

var isObject = require('../internals/is-object');

var isExtensible = require('../internals/object-is-extensible');

var enforceInternalState = require('../internals/internal-state').enforce;

var NATIVE_WEAK_MAP = require('../internals/native-weak-map');

var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
}; // `WeakMap` constructor
// https://tc39.es/ecma262/#sec-weakmap-constructor


var $WeakMap = collection('WeakMap', wrapper, collectionWeak); // IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485

if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.enable();
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = uncurryThis(WeakMapPrototype['delete']);
  var nativeHas = uncurryThis(WeakMapPrototype.has);
  var nativeGet = uncurryThis(WeakMapPrototype.get);
  var nativeSet = uncurryThis(WeakMapPrototype.set);
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete(this, key) || state.frozen['delete'](key);
      }

      return nativeDelete(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) || state.frozen.has(key);
      }

      return nativeHas(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key);
      }

      return nativeGet(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas(this, key) ? nativeSet(this, key, value) : state.frozen.set(key, value);
      } else nativeSet(this, key, value);

      return this;
    }
  });
}
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/redefine-all":"ffd35f1bc6f8a9cf26e6fa0389f4748d","../internals/internal-metadata":"1f02b54bcbf6deb5035c0fd624813fd6","../internals/collection":"9abd6360ae544576f2e0cf88529c952a","../internals/collection-weak":"54f7b78e497d874d27024eb6b64fa367","../internals/is-object":"03244e745134af366d66b74456891052","../internals/object-is-extensible":"1a3376452166a7b57634b63d80a6b36f","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/native-weak-map":"3633a06fd667b2a3966200ce5e2edda9"}],"54f7b78e497d874d27024eb6b64fa367":[function(require,module,exports) {
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var redefineAll = require('../internals/redefine-all');
var getWeakData = require('../internals/internal-metadata').getWeakData;
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var anInstance = require('../internals/an-instance');
var iterate = require('../internals/iterate');
var ArrayIterationModule = require('../internals/array-iteration');
var hasOwn = require('../internals/has-own-property');
var InternalStateModule = require('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var splice = uncurryThis([].splice);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) splice(this.entries, index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(Prototype, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && hasOwn(data, state.id) && delete data[state.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && hasOwn(data, state.id);
      }
    });

    redefineAll(Prototype, IS_MAP ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // `WeakMap.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.set
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // `WeakSet.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-weakset.prototype.add
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return Constructor;
  }
};

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/redefine-all":"ffd35f1bc6f8a9cf26e6fa0389f4748d","../internals/internal-metadata":"1f02b54bcbf6deb5035c0fd624813fd6","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/is-object":"03244e745134af366d66b74456891052","../internals/an-instance":"8b0daff12bd798defdb69ae41eea7f5e","../internals/iterate":"33b1bc22ce229618eb94623257686da2","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1"}],"f2e1e46132295114bf5d89a8377b855e":[function(require,module,exports) {
'use strict';
var collection = require('../internals/collection');
var collectionWeak = require('../internals/collection-weak');

// `WeakSet` constructor
// https://tc39.es/ecma262/#sec-weakset-constructor
collection('WeakSet', function (init) {
  return function WeakSet() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionWeak);

},{"../internals/collection":"9abd6360ae544576f2e0cf88529c952a","../internals/collection-weak":"54f7b78e497d874d27024eb6b64fa367"}],"0e9f52e44e66b5362e2bde50fa2c2617":[function(require,module,exports) {
// TODO: Remove from `core-js@4`
require('../modules/es.aggregate-error');

},{"../modules/es.aggregate-error":"741995e2389a9b842aa525008faba857"}],"87d954ec83e96fca94a7fb24b872db0e":[function(require,module,exports) {
var $ = require('../internals/export');
var fromAsync = require('../internals/array-from-async');

// `Array.fromAsync` method
// https://github.com/tc39/proposal-array-from-async
$({ target: 'Array', stat: true }, {
  fromAsync: fromAsync
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-from-async":"154c54e3348318276217ba9603c0af79"}],"154c54e3348318276217ba9603c0af79":[function(require,module,exports) {
'use strict';
var bind = require('../internals/function-bind-context');
var toObject = require('../internals/to-object');
var isConstructor = require('../internals/is-constructor');
var getAsyncIterator = require('../internals/get-async-iterator');
var getIterator = require('../internals/get-iterator');
var getIteratorMethod = require('../internals/get-iterator-method');
var getMethod = require('../internals/get-method');
var getVirtual = require('../internals/entry-virtual');
var getBuiltIn = require('../internals/get-built-in');
var wellKnownSymbol = require('../internals/well-known-symbol');
var AsyncFromSyncIterator = require('../internals/async-from-sync-iterator');
var toArray = require('../internals/async-iterator-iteration').toArray;

var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');
var arrayIterator = getVirtual('Array').values;

// `Array.fromAsync` method implementation
// https://github.com/tc39/proposal-array-from-async
module.exports = function fromAsync(asyncItems /* , mapfn = undefined, thisArg = undefined */) {
  var C = this;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var thisArg = argumentsLength > 2 ? arguments[2] : undefined;
  return new (getBuiltIn('Promise'))(function (resolve) {
    var O = toObject(asyncItems);
    if (mapfn !== undefined) mapfn = bind(mapfn, thisArg);
    var usingAsyncIterator = getMethod(O, ASYNC_ITERATOR);
    var usingSyncIterator = usingAsyncIterator ? undefined : getIteratorMethod(O) || arrayIterator;
    var A = isConstructor(C) ? new C() : [];
    var iterator = usingAsyncIterator
      ? getAsyncIterator(O, usingAsyncIterator)
      : new AsyncFromSyncIterator(getIterator(O, usingSyncIterator));
    resolve(toArray(iterator, mapfn, A));
  });
};

},{"../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/is-constructor":"119e842d0827f15b1b4e51c1ee9e98ea","../internals/get-async-iterator":"48b472b39961caf4d42d5696d32da8b9","../internals/get-iterator":"95609b3cd4fe60efb5286ed1595b57b7","../internals/get-iterator-method":"ee70e79559122fe97016e526e216278d","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/entry-virtual":"d8c605b173da6b5325614f6b2f905801","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/async-from-sync-iterator":"14e7e6ac7effc7882598d97a6635f6f6","../internals/async-iterator-iteration":"b55be689df328e9281115a2e84f789bf"}],"48b472b39961caf4d42d5696d32da8b9":[function(require,module,exports) {
var call = require('../internals/function-call');
var AsyncFromSyncIterator = require('../internals/async-from-sync-iterator');
var anObject = require('../internals/an-object');
var getIterator = require('../internals/get-iterator');
var getMethod = require('../internals/get-method');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');

module.exports = function (it, usingIterator) {
  var method = arguments.length < 2 ? getMethod(it, ASYNC_ITERATOR) : usingIterator;
  return method ? anObject(call(method, it)) : new AsyncFromSyncIterator(getIterator(it));
};

},{"../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/async-from-sync-iterator":"14e7e6ac7effc7882598d97a6635f6f6","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/get-iterator":"95609b3cd4fe60efb5286ed1595b57b7","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"14e7e6ac7effc7882598d97a6635f6f6":[function(require,module,exports) {
'use strict';
var apply = require('../internals/function-apply');
var anObject = require('../internals/an-object');
var create = require('../internals/object-create');
var getMethod = require('../internals/get-method');
var redefineAll = require('../internals/redefine-all');
var InternalStateModule = require('../internals/internal-state');
var getBuiltIn = require('../internals/get-built-in');
var AsyncIteratorPrototype = require('../internals/async-iterator-prototype');

var Promise = getBuiltIn('Promise');

var ASYNC_FROM_SYNC_ITERATOR = 'AsyncFromSyncIterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ASYNC_FROM_SYNC_ITERATOR);

var asyncFromSyncIteratorContinuation = function (result, resolve, reject) {
  var done = result.done;
  Promise.resolve(result.value).then(function (value) {
    resolve({ done: done, value: value });
  }, reject);
};

var AsyncFromSyncIterator = function AsyncIterator(iterator) {
  setInternalState(this, {
    type: ASYNC_FROM_SYNC_ITERATOR,
    iterator: anObject(iterator),
    next: iterator.next
  });
};

AsyncFromSyncIterator.prototype = redefineAll(create(AsyncIteratorPrototype), {
  next: function next(arg) {
    var state = getInternalState(this);
    var hasArg = !!arguments.length;
    return new Promise(function (resolve, reject) {
      var result = anObject(apply(state.next, state.iterator, hasArg ? [arg] : []));
      asyncFromSyncIteratorContinuation(result, resolve, reject);
    });
  },
  'return': function (arg) {
    var iterator = getInternalState(this).iterator;
    var hasArg = !!arguments.length;
    return new Promise(function (resolve, reject) {
      var $return = getMethod(iterator, 'return');
      if ($return === undefined) return resolve({ done: true, value: arg });
      var result = anObject(apply($return, iterator, hasArg ? [arg] : []));
      asyncFromSyncIteratorContinuation(result, resolve, reject);
    });
  },
  'throw': function (arg) {
    var iterator = getInternalState(this).iterator;
    var hasArg = !!arguments.length;
    return new Promise(function (resolve, reject) {
      var $throw = getMethod(iterator, 'throw');
      if ($throw === undefined) return reject(arg);
      var result = anObject(apply($throw, iterator, hasArg ? [arg] : []));
      asyncFromSyncIteratorContinuation(result, resolve, reject);
    });
  }
});

module.exports = AsyncFromSyncIterator;

},{"../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/redefine-all":"ffd35f1bc6f8a9cf26e6fa0389f4748d","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/async-iterator-prototype":"54cfe6b183386257bb57d8df2db30128"}],"54cfe6b183386257bb57d8df2db30128":[function(require,module,exports) {
var global = require('../internals/global');

var shared = require('../internals/shared-store');

var isCallable = require('../internals/is-callable');

var create = require('../internals/object-create');

var getPrototypeOf = require('../internals/object-get-prototype-of');

var redefine = require('../internals/redefine');

var wellKnownSymbol = require('../internals/well-known-symbol');

var IS_PURE = require('../internals/is-pure');

var USE_FUNCTION_CONSTRUCTOR = 'USE_FUNCTION_CONSTRUCTOR';
var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');
var AsyncIterator = global.AsyncIterator;
var PassedAsyncIteratorPrototype = shared.AsyncIteratorPrototype;
var AsyncIteratorPrototype, prototype;

if (PassedAsyncIteratorPrototype) {
  AsyncIteratorPrototype = PassedAsyncIteratorPrototype;
} else if (isCallable(AsyncIterator)) {
  AsyncIteratorPrototype = AsyncIterator.prototype;
} else if (shared[USE_FUNCTION_CONSTRUCTOR] || global[USE_FUNCTION_CONSTRUCTOR]) {
  try {
    // eslint-disable-next-line no-new-func -- we have no alternatives without usage of modern syntax
    prototype = getPrototypeOf(getPrototypeOf(getPrototypeOf(Function('return async function*(){}()')())));
    if (getPrototypeOf(prototype) === Object.prototype) AsyncIteratorPrototype = prototype;
  } catch (error) {
    /* empty */
  }
}

if (!AsyncIteratorPrototype) AsyncIteratorPrototype = {};else if (IS_PURE) AsyncIteratorPrototype = create(AsyncIteratorPrototype);

if (!isCallable(AsyncIteratorPrototype[ASYNC_ITERATOR])) {
  redefine(AsyncIteratorPrototype, ASYNC_ITERATOR, function () {
    return this;
  });
}

module.exports = AsyncIteratorPrototype;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/shared-store":"050f18cf9a95404c13e77ce244078f47","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0"}],"d8c605b173da6b5325614f6b2f905801":[function(require,module,exports) {
var global = require('../internals/global');

module.exports = function (CONSTRUCTOR) {
  return global[CONSTRUCTOR].prototype;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"b55be689df328e9281115a2e84f789bf":[function(require,module,exports) {
'use strict'; // https://github.com/tc39/proposal-iterator-helpers
// https://github.com/tc39/proposal-array-from-async

var global = require('../internals/global');

var call = require('../internals/function-call');

var aCallable = require('../internals/a-callable');

var anObject = require('../internals/an-object');

var getBuiltIn = require('../internals/get-built-in');

var getMethod = require('../internals/get-method');

var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var TypeError = global.TypeError;

var createMethod = function (TYPE) {
  var IS_TO_ARRAY = TYPE == 0;
  var IS_FOR_EACH = TYPE == 1;
  var IS_EVERY = TYPE == 2;
  var IS_SOME = TYPE == 3;
  return function (iterator, fn, target) {
    anObject(iterator);
    var Promise = getBuiltIn('Promise');
    var next = aCallable(iterator.next);
    var index = 0;
    var MAPPING = fn !== undefined;
    if (MAPPING || !IS_TO_ARRAY) aCallable(fn);
    return new Promise(function (resolve, reject) {
      var closeIteration = function (method, argument) {
        try {
          var returnMethod = getMethod(iterator, 'return');

          if (returnMethod) {
            return Promise.resolve(call(returnMethod, iterator)).then(function () {
              method(argument);
            }, function (error) {
              reject(error);
            });
          }
        } catch (error2) {
          return reject(error2);
        }

        method(argument);
      };

      var onError = function (error) {
        closeIteration(reject, error);
      };

      var loop = function () {
        try {
          if (IS_TO_ARRAY && index > MAX_SAFE_INTEGER && MAPPING) {
            throw TypeError('The allowed number of iterations has been exceeded');
          }

          Promise.resolve(anObject(call(next, iterator))).then(function (step) {
            try {
              if (anObject(step).done) {
                if (IS_TO_ARRAY) {
                  target.length = index;
                  resolve(target);
                } else resolve(IS_SOME ? false : IS_EVERY || undefined);
              } else {
                var value = step.value;

                if (MAPPING) {
                  Promise.resolve(IS_TO_ARRAY ? fn(value, index) : fn(value)).then(function (result) {
                    if (IS_FOR_EACH) {
                      loop();
                    } else if (IS_EVERY) {
                      result ? loop() : closeIteration(resolve, false);
                    } else if (IS_TO_ARRAY) {
                      target[index++] = result;
                      loop();
                    } else {
                      result ? closeIteration(resolve, IS_SOME || value) : loop();
                    }
                  }, onError);
                } else {
                  target[index++] = value;
                  loop();
                }
              }
            } catch (error) {
              onError(error);
            }
          }, onError);
        } catch (error2) {
          onError(error2);
        }
      };

      loop();
    });
  };
};

module.exports = {
  toArray: createMethod(0),
  forEach: createMethod(1),
  every: createMethod(2),
  some: createMethod(3),
  find: createMethod(4)
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2"}],"14fc07e44e96184ee97e5cb0152a6e4b":[function(require,module,exports) {
// TODO: Remove from `core-js@4`
require('../modules/es.array.at');

},{"../modules/es.array.at":"2edd59f8f85d15e14eb441b2ddbcd55f"}],"5c332904f32db7a4711f4671377b13e1":[function(require,module,exports) {
'use strict';
// TODO: remove from `core-js@4`
var $ = require('../internals/export');
var $filterReject = require('../internals/array-iteration').filterReject;
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.filterOut` method
// https://github.com/tc39/proposal-array-filtering
$({ target: 'Array', proto: true }, {
  filterOut: function filterOut(callbackfn /* , thisArg */) {
    return $filterReject(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

addToUnscopables('filterOut');

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"5dcb3d9b7a798f1ebf122fb2f4943544":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $filterReject = require('../internals/array-iteration').filterReject;
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.filterReject` method
// https://github.com/tc39/proposal-array-filtering
$({ target: 'Array', proto: true }, {
  filterReject: function filterReject(callbackfn /* , thisArg */) {
    return $filterReject(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

addToUnscopables('filterReject');

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"3fb082cff8d77a26ad168f9a2df82b5d":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $findLast = require('../internals/array-iteration-from-last').findLast;
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.findLast` method
// https://github.com/tc39/proposal-array-find-from-last
$({ target: 'Array', proto: true }, {
  findLast: function findLast(callbackfn /* , that = undefined */) {
    return $findLast(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

addToUnscopables('findLast');

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-iteration-from-last":"2818ed63b927f6b0231452ed12d83d76","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"2818ed63b927f6b0231452ed12d83d76":[function(require,module,exports) {
var bind = require('../internals/function-bind-context');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');

// `Array.prototype.{ findLast, findLastIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_FIND_LAST_INDEX = TYPE == 1;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var index = lengthOfArrayLike(self);
    var value, result;
    while (index-- > 0) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (result) switch (TYPE) {
        case 0: return value; // findLast
        case 1: return index; // findLastIndex
      }
    }
    return IS_FIND_LAST_INDEX ? -1 : undefined;
  };
};

module.exports = {
  // `Array.prototype.findLast` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLast: createMethod(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: createMethod(1)
};

},{"../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/indexed-object":"35ae890303b620d792cd5faa73776178","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666"}],"97068b6860141d335a51bd18f006f1c3":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $findLastIndex = require('../internals/array-iteration-from-last').findLastIndex;
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.findLastIndex` method
// https://github.com/tc39/proposal-array-find-from-last
$({ target: 'Array', proto: true }, {
  findLastIndex: function findLastIndex(callbackfn /* , that = undefined */) {
    return $findLastIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

addToUnscopables('findLastIndex');

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-iteration-from-last":"2818ed63b927f6b0231452ed12d83d76","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"2227c4bee39fc70a938c7e9acb5182c3":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var $groupBy = require('../internals/array-group-by');
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.groupBy` method
// https://github.com/tc39/proposal-array-grouping
$({ target: 'Array', proto: true }, {
  groupBy: function groupBy(callbackfn /* , thisArg */) {
    var thisArg = arguments.length > 1 ? arguments[1] : undefined;
    return $groupBy(this, callbackfn, thisArg);
  }
});

addToUnscopables('groupBy');

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/array-group-by":"310d13273f5789d5b6b1cb097120a230","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"310d13273f5789d5b6b1cb097120a230":[function(require,module,exports) {
var global = require('../internals/global');

var bind = require('../internals/function-bind-context');

var uncurryThis = require('../internals/function-uncurry-this');

var IndexedObject = require('../internals/indexed-object');

var toObject = require('../internals/to-object');

var toPropertyKey = require('../internals/to-property-key');

var lengthOfArrayLike = require('../internals/length-of-array-like');

var objectCreate = require('../internals/object-create');

var arrayFromConstructorAndList = require('../internals/array-from-constructor-and-list');

var Array = global.Array;
var push = uncurryThis([].push);

module.exports = function ($this, callbackfn, that, specificConstructor) {
  var O = toObject($this);
  var self = IndexedObject(O);
  var boundFunction = bind(callbackfn, that);
  var target = objectCreate(null);
  var length = lengthOfArrayLike(self);
  var index = 0;
  var Constructor, key, value;

  for (; length > index; index++) {
    value = self[index];
    key = toPropertyKey(boundFunction(value, index, O)); // in some IE10 builds, `hasOwnProperty` returns incorrect result on integer keys
    // but since it's a `null` prototype object, we can safely use `in`

    if (key in target) push(target[key], value);else target[key] = [value];
  } // TODO: Remove this block from `core-js@4`


  if (specificConstructor) {
    Constructor = specificConstructor(O);

    if (Constructor !== Array) {
      for (key in target) target[key] = arrayFromConstructorAndList(Constructor, target[key]);
    }
  }

  return target;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/indexed-object":"35ae890303b620d792cd5faa73776178","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/to-property-key":"df2b61336906907f777029fe90c882a8","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/array-from-constructor-and-list":"921f9e3b063d1f99d91c6bcb5737b68e"}],"968613f857f48fa41a61069c4721505d":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var bind = require('../internals/function-bind-context');
var uncurryThis = require('../internals/function-uncurry-this');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var addToUnscopables = require('../internals/add-to-unscopables');

var Map = getBuiltIn('Map');
var MapPrototype = Map.prototype;
var mapGet = uncurryThis(MapPrototype.get);
var mapHas = uncurryThis(MapPrototype.has);
var mapSet = uncurryThis(MapPrototype.set);
var push = uncurryThis([].push);

// `Array.prototype.groupByToMap` method
// https://github.com/tc39/proposal-array-grouping
$({ target: 'Array', proto: true }, {
  groupByToMap: function groupByToMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var map = new Map();
    var length = lengthOfArrayLike(self);
    var index = 0;
    var key, value;
    for (;length > index; index++) {
      value = self[index];
      key = boundFunction(value, index, O);
      if (mapHas(map, key)) push(mapGet(map, key), value);
      else mapSet(map, key, [value]);
    } return map;
  }
});

addToUnscopables('groupByToMap');

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/indexed-object":"35ae890303b620d792cd5faa73776178","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"2c638b87918b6459416158d991376790":[function(require,module,exports) {
var $ = require('../internals/export');
var isArray = require('../internals/is-array');

// eslint-disable-next-line es/no-object-isfrozen -- safe
var isFrozen = Object.isFrozen;

var isFrozenStringArray = function (array, allowUndefined) {
  if (!isFrozen || !isArray(array) || !isFrozen(array)) return false;
  var index = 0;
  var length = array.length;
  var element;
  while (index < length) {
    element = array[index++];
    if (!(typeof element == 'string' || (allowUndefined && typeof element == 'undefined'))) {
      return false;
    }
  } return length !== 0;
};

// `Array.isTemplateObject` method
// https://github.com/tc39/proposal-array-is-template-object
$({ target: 'Array', stat: true }, {
  isTemplateObject: function isTemplateObject(value) {
    if (!isFrozenStringArray(value, true)) return false;
    var raw = value.raw;
    if (raw.length !== value.length || !isFrozenStringArray(raw, false)) return false;
    return true;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-array":"4bcb8b0b07b2c32a8e3e3eda35fd2a4d"}],"52794e3bc5e7945e856d0d92eef49b8e":[function(require,module,exports) {
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var addToUnscopables = require('../internals/add-to-unscopables');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var defineProperty = require('../internals/object-define-property').f;

// `Array.prototype.lastIndex` getter
// https://github.com/keithamus/proposal-array-last
if (DESCRIPTORS && !('lastIndex' in [])) {
  defineProperty(Array.prototype, 'lastIndex', {
    configurable: true,
    get: function lastIndex() {
      var O = toObject(this);
      var len = lengthOfArrayLike(O);
      return len == 0 ? 0 : len - 1;
    }
  });

  addToUnscopables('lastIndex');
}

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f"}],"49519781c14d9ff537c83433e02de1f3":[function(require,module,exports) {
'use strict';
var DESCRIPTORS = require('../internals/descriptors');
var addToUnscopables = require('../internals/add-to-unscopables');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var defineProperty = require('../internals/object-define-property').f;

// `Array.prototype.lastIndex` accessor
// https://github.com/keithamus/proposal-array-last
if (DESCRIPTORS && !('lastItem' in [])) {
  defineProperty(Array.prototype, 'lastItem', {
    configurable: true,
    get: function lastItem() {
      var O = toObject(this);
      var len = lengthOfArrayLike(O);
      return len == 0 ? undefined : O[len - 1];
    },
    set: function lastItem(value) {
      var O = toObject(this);
      var len = lengthOfArrayLike(O);
      return O[len == 0 ? 0 : len - 1] = value;
    }
  });

  addToUnscopables('lastItem');
}

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f"}],"01f84f06403b5c5d2d858ea5498f4891":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var arrayToReversed = require('../internals/array-to-reversed');

var toIndexedObject = require('../internals/to-indexed-object');

var addToUnscopables = require('../internals/add-to-unscopables');

var Array = global.Array; // `Array.prototype.toReversed` method
// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed

$({
  target: 'Array',
  proto: true
}, {
  toReversed: function toReversed() {
    return arrayToReversed(toIndexedObject(this), Array);
  }
});
addToUnscopables('toReversed');
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/array-to-reversed":"4ef57a2850d315617cedecf1aa99fd5d","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"4ef57a2850d315617cedecf1aa99fd5d":[function(require,module,exports) {
var lengthOfArrayLike = require('../internals/length-of-array-like');

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
module.exports = function (O, C) {
  var len = lengthOfArrayLike(O);
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = O[len - k - 1];
  return A;
};

},{"../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666"}],"d89baa0fd3c6e0ff2defbc852f067f7b":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var aCallable = require('../internals/a-callable');

var toIndexedObject = require('../internals/to-indexed-object');

var arrayFromConstructorAndList = require('../internals/array-from-constructor-and-list');

var getVirtual = require('../internals/entry-virtual');

var addToUnscopables = require('../internals/add-to-unscopables');

var Array = global.Array;
var sort = uncurryThis(getVirtual('Array').sort); // `Array.prototype.toSorted` method
// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toSorted

$({
  target: 'Array',
  proto: true
}, {
  toSorted: function toSorted(compareFn) {
    if (compareFn !== undefined) aCallable(compareFn);
    var O = toIndexedObject(this);
    var A = arrayFromConstructorAndList(Array, O);
    return sort(A, compareFn);
  }
});
addToUnscopables('toSorted');
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/array-from-constructor-and-list":"921f9e3b063d1f99d91c6bcb5737b68e","../internals/entry-virtual":"d8c605b173da6b5325614f6b2f905801","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"f7ea14cba7e40045d8375438ee3cfa8c":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var toIndexedObject = require('../internals/to-indexed-object');

var arraySlice = require('../internals/array-slice');

var arrayToSpliced = require('../internals/array-to-spliced');

var addToUnscopables = require('../internals/add-to-unscopables');

var Array = global.Array; // `Array.prototype.toSpliced` method
// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toSpliced

$({
  target: 'Array',
  proto: true
}, {
  // eslint-disable-next-line no-unused-vars -- required for .length
  toSpliced: function toSpliced(start, deleteCount
  /* , ...items */
  ) {
    return arrayToSpliced(toIndexedObject(this), Array, arraySlice(arguments));
  }
});
addToUnscopables('toSpliced');
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/array-slice":"d58518bc0d77fd7d4bbb2d854257bf40","../internals/array-to-spliced":"dae53105f19d259c09b5a164cb51dcbb","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df"}],"dae53105f19d259c09b5a164cb51dcbb":[function(require,module,exports) {
var lengthOfArrayLike = require('../internals/length-of-array-like');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var max = Math.max;
var min = Math.min;

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toSpliced
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toSpliced
module.exports = function (O, C, args) {
  var start = args[0];
  var deleteCount = args[1];
  var len = lengthOfArrayLike(O);
  var actualStart = toAbsoluteIndex(start, len);
  var argumentsLength = args.length;
  var k = 0;
  var insertCount, actualDeleteCount, newLen, A;
  if (argumentsLength === 0) {
    insertCount = actualDeleteCount = 0;
  } else if (argumentsLength === 1) {
    insertCount = 0;
    actualDeleteCount = len - actualStart;
  } else {
    insertCount = argumentsLength - 2;
    actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
  }
  newLen = len + insertCount - actualDeleteCount;
  A = new C(newLen);

  for (; k < actualStart; k++) A[k] = O[k];
  for (; k < actualStart + insertCount; k++) A[k] = args[k - actualStart + 2];
  for (; k < newLen; k++) A[k] = O[k + actualDeleteCount - insertCount];

  return A;
};

},{"../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/to-absolute-index":"ff996ac5a229620b351a78c404035460","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f"}],"4e77790b49938849dd4aeb7ae5c6a71b":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var addToUnscopables = require('../internals/add-to-unscopables');
var uniqueBy = require('../internals/array-unique-by');

// `Array.prototype.uniqueBy` method
// https://github.com/tc39/proposal-array-unique
$({ target: 'Array', proto: true }, {
  uniqueBy: uniqueBy
});

addToUnscopables('uniqueBy');

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/add-to-unscopables":"885b707d011829ca5d38f6b6f8a535df","../internals/array-unique-by":"8f2adb3f801ded3865f6c92d48d0331c"}],"8f2adb3f801ded3865f6c92d48d0331c":[function(require,module,exports) {
'use strict';
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var toObject = require('../internals/to-object');
var arraySpeciesCreate = require('../internals/array-species-create');

var Map = getBuiltIn('Map');
var MapPrototype = Map.prototype;
var mapForEach = uncurryThis(MapPrototype.forEach);
var mapHas = uncurryThis(MapPrototype.has);
var mapSet = uncurryThis(MapPrototype.set);
var push = uncurryThis([].push);

// `Array.prototype.uniqueBy` method
// https://github.com/tc39/proposal-array-unique
module.exports = function uniqueBy(resolver) {
  var that = toObject(this);
  var length = lengthOfArrayLike(that);
  var result = arraySpeciesCreate(that, 0);
  var map = new Map();
  var resolverFunction = resolver != null ? aCallable(resolver) : function (value) {
    return value;
  };
  var index, item, key;
  for (index = 0; index < length; index++) {
    item = that[index];
    key = resolverFunction(item);
    if (!mapHas(map, key)) mapSet(map, key, item);
  }
  mapForEach(map, function (value) {
    push(result, value);
  });
  return result;
};

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/array-species-create":"4d2b0edc3e3584142bbbf5c912729f1b"}],"0cd49a99af6d030b64df45cba8986dc6":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var arrayWith = require('../internals/array-with');

var toIndexedObject = require('../internals/to-indexed-object');

var Array = global.Array; // `Array.prototype.with` method
// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with

$({
  target: 'Array',
  proto: true
}, {
  'with': function (index, value) {
    return arrayWith(toIndexedObject(this), Array, index, value);
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/array-with":"92dee620654efb37b099461363648eff","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb"}],"92dee620654efb37b099461363648eff":[function(require,module,exports) {
var global = require('../internals/global');

var lengthOfArrayLike = require('../internals/length-of-array-like');

var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var RangeError = global.RangeError; // https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with

module.exports = function (O, C, index, value) {
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
  if (actualIndex >= len || actualIndex < 0) throw RangeError('Incorrect index');
  var A = new C(len);
  var k = 0;

  for (; k < len; k++) A[k] = k === actualIndex ? value : O[k];

  return A;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f"}],"d8634df10681764e927155bd2f995802":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var anInstance = require('../internals/an-instance');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var hasOwn = require('../internals/has-own-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var AsyncIteratorPrototype = require('../internals/async-iterator-prototype');
var IS_PURE = require('../internals/is-pure');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var AsyncIteratorConstructor = function AsyncIterator() {
  anInstance(this, AsyncIteratorPrototype);
};

AsyncIteratorConstructor.prototype = AsyncIteratorPrototype;

if (!hasOwn(AsyncIteratorPrototype, TO_STRING_TAG)) {
  createNonEnumerableProperty(AsyncIteratorPrototype, TO_STRING_TAG, 'AsyncIterator');
}

if (IS_PURE || !hasOwn(AsyncIteratorPrototype, 'constructor') || AsyncIteratorPrototype.constructor === Object) {
  createNonEnumerableProperty(AsyncIteratorPrototype, 'constructor', AsyncIteratorConstructor);
}

$({ global: true, forced: IS_PURE }, {
  AsyncIterator: AsyncIteratorConstructor
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/an-instance":"8b0daff12bd798defdb69ae41eea7f5e","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/async-iterator-prototype":"54cfe6b183386257bb57d8df2db30128","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0"}],"e1de8dae28b24e7eb3dd226d73e922f8":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var apply = require('../internals/function-apply');
var anObject = require('../internals/an-object');
var createAsyncIteratorProxy = require('../internals/async-iterator-create-proxy');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise, args) {
  var state = this;
  var iterator = state.iterator;

  return Promise.resolve(anObject(apply(state.next, iterator, args))).then(function (step) {
    if (anObject(step).done) {
      state.done = true;
      return { done: true, value: undefined };
    }
    return { done: false, value: [state.index++, step.value] };
  });
});

$({ target: 'AsyncIterator', proto: true, real: true }, {
  asIndexedPairs: function asIndexedPairs() {
    return new AsyncIteratorProxy({
      iterator: anObject(this),
      index: 0
    });
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/async-iterator-create-proxy":"625f82b8c98fde6fc07baa401845a478"}],"625f82b8c98fde6fc07baa401845a478":[function(require,module,exports) {
'use strict';
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var create = require('../internals/object-create');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefineAll = require('../internals/redefine-all');
var wellKnownSymbol = require('../internals/well-known-symbol');
var InternalStateModule = require('../internals/internal-state');
var getBuiltIn = require('../internals/get-built-in');
var getMethod = require('../internals/get-method');
var AsyncIteratorPrototype = require('../internals/async-iterator-prototype');

var Promise = getBuiltIn('Promise');

var ASYNC_ITERATOR_PROXY = 'AsyncIteratorProxy';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ASYNC_ITERATOR_PROXY);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (nextHandler, IS_ITERATOR) {
  var AsyncIteratorProxy = function AsyncIterator(state) {
    state.type = ASYNC_ITERATOR_PROXY;
    state.next = aCallable(state.iterator.next);
    state.done = false;
    state.ignoreArgument = !IS_ITERATOR;
    setInternalState(this, state);
  };

  AsyncIteratorProxy.prototype = redefineAll(create(AsyncIteratorPrototype), {
    next: function next(arg) {
      var that = this;
      var hasArgument = !!arguments.length;
      return new Promise(function (resolve) {
        var state = getInternalState(that);
        var args = hasArgument ? [state.ignoreArgument ? undefined : arg] : IS_ITERATOR ? [] : [undefined];
        state.ignoreArgument = false;
        resolve(state.done ? { done: true, value: undefined } : anObject(call(nextHandler, state, Promise, args)));
      });
    },
    'return': function (value) {
      var that = this;
      return new Promise(function (resolve, reject) {
        var state = getInternalState(that);
        var iterator = state.iterator;
        state.done = true;
        var $$return = getMethod(iterator, 'return');
        if ($$return === undefined) return resolve({ done: true, value: value });
        Promise.resolve(call($$return, iterator, value)).then(function (result) {
          anObject(result);
          resolve({ done: true, value: value });
        }, reject);
      });
    },
    'throw': function (value) {
      var that = this;
      return new Promise(function (resolve, reject) {
        var state = getInternalState(that);
        var iterator = state.iterator;
        state.done = true;
        var $$throw = getMethod(iterator, 'throw');
        if ($$throw === undefined) return reject(value);
        resolve(call($$throw, iterator, value));
      });
    }
  });

  if (!IS_ITERATOR) {
    createNonEnumerableProperty(AsyncIteratorProxy.prototype, TO_STRING_TAG, 'Generator');
  }

  return AsyncIteratorProxy;
};

},{"../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/redefine-all":"ffd35f1bc6f8a9cf26e6fa0389f4748d","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/async-iterator-prototype":"54cfe6b183386257bb57d8df2db30128"}],"170c52fc7bf9af58ca9dff2861725963":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var apply = require('../internals/function-apply');
var anObject = require('../internals/an-object');
var toPositiveInteger = require('../internals/to-positive-integer');
var createAsyncIteratorProxy = require('../internals/async-iterator-create-proxy');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise, args) {
  var state = this;

  return new Promise(function (resolve, reject) {
    var loop = function () {
      try {
        Promise.resolve(
          anObject(apply(state.next, state.iterator, state.remaining ? [] : args))
        ).then(function (step) {
          try {
            if (anObject(step).done) {
              state.done = true;
              resolve({ done: true, value: undefined });
            } else if (state.remaining) {
              state.remaining--;
              loop();
            } else resolve({ done: false, value: step.value });
          } catch (err) { reject(err); }
        }, reject);
      } catch (error) { reject(error); }
    };

    loop();
  });
});

$({ target: 'AsyncIterator', proto: true, real: true }, {
  drop: function drop(limit) {
    return new AsyncIteratorProxy({
      iterator: anObject(this),
      remaining: toPositiveInteger(limit)
    });
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-positive-integer":"78a692a1c72bccb538efb4a5c2020e6b","../internals/async-iterator-create-proxy":"625f82b8c98fde6fc07baa401845a478"}],"1e307e222caaef7f75edf085b9e193db":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var $every = require('../internals/async-iterator-iteration').every;

$({ target: 'AsyncIterator', proto: true, real: true }, {
  every: function every(fn) {
    return $every(this, fn);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/async-iterator-iteration":"b55be689df328e9281115a2e84f789bf"}],"f6efc95b5c2313b2b4931b0cb44d80bd":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var apply = require('../internals/function-apply');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var createAsyncIteratorProxy = require('../internals/async-iterator-create-proxy');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise, args) {
  var state = this;
  var filterer = state.filterer;

  return new Promise(function (resolve, reject) {
    var loop = function () {
      try {
        Promise.resolve(anObject(apply(state.next, state.iterator, args))).then(function (step) {
          try {
            if (anObject(step).done) {
              state.done = true;
              resolve({ done: true, value: undefined });
            } else {
              var value = step.value;
              Promise.resolve(filterer(value)).then(function (selected) {
                selected ? resolve({ done: false, value: value }) : loop();
              }, reject);
            }
          } catch (err) { reject(err); }
        }, reject);
      } catch (error) { reject(error); }
    };

    loop();
  });
});

$({ target: 'AsyncIterator', proto: true, real: true }, {
  filter: function filter(filterer) {
    return new AsyncIteratorProxy({
      iterator: anObject(this),
      filterer: aCallable(filterer)
    });
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/async-iterator-create-proxy":"625f82b8c98fde6fc07baa401845a478"}],"a166d9f15be30f2382929da28ad21972":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var $find = require('../internals/async-iterator-iteration').find;

$({ target: 'AsyncIterator', proto: true, real: true }, {
  find: function find(fn) {
    return $find(this, fn);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/async-iterator-iteration":"b55be689df328e9281115a2e84f789bf"}],"07dfe117837ae68569a6de16f5de2b04":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var createAsyncIteratorProxy = require('../internals/async-iterator-create-proxy');
var getAsyncIterator = require('../internals/get-async-iterator');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise) {
  var state = this;
  var mapper = state.mapper;
  var innerIterator;

  return new Promise(function (resolve, reject) {
    var outerLoop = function () {
      try {
        Promise.resolve(anObject(call(state.next, state.iterator))).then(function (step) {
          try {
            if (anObject(step).done) {
              state.done = true;
              resolve({ done: true, value: undefined });
            } else {
              Promise.resolve(mapper(step.value)).then(function (mapped) {
                try {
                  state.innerIterator = innerIterator = getAsyncIterator(mapped);
                  state.innerNext = aCallable(innerIterator.next);
                  return innerLoop();
                } catch (error2) { reject(error2); }
              }, reject);
            }
          } catch (error1) { reject(error1); }
        }, reject);
      } catch (error) { reject(error); }
    };

    var innerLoop = function () {
      if (innerIterator = state.innerIterator) {
        try {
          Promise.resolve(anObject(call(state.innerNext, innerIterator))).then(function (result) {
            try {
              if (anObject(result).done) {
                state.innerIterator = state.innerNext = null;
                outerLoop();
              } else resolve({ done: false, value: result.value });
            } catch (error1) { reject(error1); }
          }, reject);
        } catch (error) { reject(error); }
      } else outerLoop();
    };

    innerLoop();
  });
});

$({ target: 'AsyncIterator', proto: true, real: true }, {
  flatMap: function flatMap(mapper) {
    return new AsyncIteratorProxy({
      iterator: anObject(this),
      mapper: aCallable(mapper),
      innerIterator: null,
      innerNext: null
    });
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/async-iterator-create-proxy":"625f82b8c98fde6fc07baa401845a478","../internals/get-async-iterator":"48b472b39961caf4d42d5696d32da8b9"}],"1de396b65ce1f1a4badf7784f75d17ad":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var $forEach = require('../internals/async-iterator-iteration').forEach;

$({ target: 'AsyncIterator', proto: true, real: true }, {
  forEach: function forEach(fn) {
    return $forEach(this, fn);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/async-iterator-iteration":"b55be689df328e9281115a2e84f789bf"}],"c35989f97f8e204a219ee38f96d7fb9f":[function(require,module,exports) {
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var apply = require('../internals/function-apply');
var anObject = require('../internals/an-object');
var toObject = require('../internals/to-object');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var AsyncIteratorPrototype = require('../internals/async-iterator-prototype');
var createAsyncIteratorProxy = require('../internals/async-iterator-create-proxy');
var getAsyncIterator = require('../internals/get-async-iterator');
var getIterator = require('../internals/get-iterator');
var getIteratorMethod = require('../internals/get-iterator-method');
var getMethod = require('../internals/get-method');
var wellKnownSymbol = require('../internals/well-known-symbol');
var AsyncFromSyncIterator = require('../internals/async-from-sync-iterator');

var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise, args) {
  return anObject(apply(this.next, this.iterator, args));
}, true);

$({ target: 'AsyncIterator', stat: true }, {
  from: function from(O) {
    var object = toObject(O);
    var usingIterator = getMethod(object, ASYNC_ITERATOR);
    var iterator;
    if (usingIterator) {
      iterator = getAsyncIterator(object, usingIterator);
      if (isPrototypeOf(AsyncIteratorPrototype, iterator)) return iterator;
    }
    if (iterator === undefined) {
      usingIterator = getIteratorMethod(object);
      if (usingIterator) return new AsyncFromSyncIterator(getIterator(object, usingIterator));
    }
    return new AsyncIteratorProxy({ iterator: iterator !== undefined ? iterator : object });
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/async-iterator-prototype":"54cfe6b183386257bb57d8df2db30128","../internals/async-iterator-create-proxy":"625f82b8c98fde6fc07baa401845a478","../internals/get-async-iterator":"48b472b39961caf4d42d5696d32da8b9","../internals/get-iterator":"95609b3cd4fe60efb5286ed1595b57b7","../internals/get-iterator-method":"ee70e79559122fe97016e526e216278d","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/async-from-sync-iterator":"14e7e6ac7effc7882598d97a6635f6f6"}],"c4f1a5f1312a8044c0414c34a6e5f09f":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var apply = require('../internals/function-apply');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var createAsyncIteratorProxy = require('../internals/async-iterator-create-proxy');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise, args) {
  var state = this;
  var mapper = state.mapper;

  return Promise.resolve(anObject(apply(state.next, state.iterator, args))).then(function (step) {
    if (anObject(step).done) {
      state.done = true;
      return { done: true, value: undefined };
    }
    return Promise.resolve(mapper(step.value)).then(function (value) {
      return { done: false, value: value };
    });
  });
});

$({ target: 'AsyncIterator', proto: true, real: true }, {
  map: function map(mapper) {
    return new AsyncIteratorProxy({
      iterator: anObject(this),
      mapper: aCallable(mapper)
    });
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/async-iterator-create-proxy":"625f82b8c98fde6fc07baa401845a478"}],"a31bd39f78f1dc84e8de4a630f3681da":[function(require,module,exports) {
'use strict'; // https://github.com/tc39/proposal-iterator-helpers

var $ = require('../internals/export');

var global = require('../internals/global');

var call = require('../internals/function-call');

var aCallable = require('../internals/a-callable');

var anObject = require('../internals/an-object');

var getBuiltIn = require('../internals/get-built-in');

var Promise = getBuiltIn('Promise');
var TypeError = global.TypeError;
$({
  target: 'AsyncIterator',
  proto: true,
  real: true
}, {
  reduce: function reduce(reducer
  /* , initialValue */
  ) {
    var iterator = anObject(this);
    var next = aCallable(iterator.next);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aCallable(reducer);
    return new Promise(function (resolve, reject) {
      var loop = function () {
        try {
          Promise.resolve(anObject(call(next, iterator))).then(function (step) {
            try {
              if (anObject(step).done) {
                noInitial ? reject(TypeError('Reduce of empty iterator with no initial value')) : resolve(accumulator);
              } else {
                var value = step.value;

                if (noInitial) {
                  noInitial = false;
                  accumulator = value;
                  loop();
                } else {
                  Promise.resolve(reducer(accumulator, value)).then(function (result) {
                    accumulator = result;
                    loop();
                  }, reject);
                }
              }
            } catch (err) {
              reject(err);
            }
          }, reject);
        } catch (error) {
          reject(error);
        }
      };

      loop();
    });
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164"}],"7bac61fd0181c26b13b1abeed09281e3":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var $some = require('../internals/async-iterator-iteration').some;

$({ target: 'AsyncIterator', proto: true, real: true }, {
  some: function some(fn) {
    return $some(this, fn);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/async-iterator-iteration":"b55be689df328e9281115a2e84f789bf"}],"3a1a0d98e5a981ac7f6c68c057261a72":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var apply = require('../internals/function-apply');
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var toPositiveInteger = require('../internals/to-positive-integer');
var createAsyncIteratorProxy = require('../internals/async-iterator-create-proxy');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise, args) {
  var iterator = this.iterator;
  var returnMethod, result;
  if (!this.remaining--) {
    result = { done: true, value: undefined };
    this.done = true;
    returnMethod = iterator['return'];
    if (returnMethod !== undefined) {
      return Promise.resolve(call(returnMethod, iterator)).then(function () {
        return result;
      });
    }
    return result;
  } return apply(this.next, iterator, args);
});

$({ target: 'AsyncIterator', proto: true, real: true }, {
  take: function take(limit) {
    return new AsyncIteratorProxy({
      iterator: anObject(this),
      remaining: toPositiveInteger(limit)
    });
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-positive-integer":"78a692a1c72bccb538efb4a5c2020e6b","../internals/async-iterator-create-proxy":"625f82b8c98fde6fc07baa401845a478"}],"620e2b7240dc5b4b8acfb535e7f577fe":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var $toArray = require('../internals/async-iterator-iteration').toArray;

$({ target: 'AsyncIterator', proto: true, real: true }, {
  toArray: function toArray() {
    return $toArray(this, undefined, []);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/async-iterator-iteration":"b55be689df328e9281115a2e84f789bf"}],"f8408758922c95d2dfb4e5a2cdf1bc38":[function(require,module,exports) {
'use strict';
/* eslint-disable es/no-bigint -- safe */
var $ = require('../internals/export');
var NumericRangeIterator = require('../internals/numeric-range-iterator');

// `BigInt.range` method
// https://github.com/tc39/proposal-Number.range
if (typeof BigInt == 'function') {
  $({ target: 'BigInt', stat: true }, {
    range: function range(start, end, option) {
      return new NumericRangeIterator(start, end, option, 'bigint', BigInt(0), BigInt(1));
    }
  });
}

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/numeric-range-iterator":"ce7f94b2dacdcdbe6b15ab3ece84b8da"}],"ce7f94b2dacdcdbe6b15ab3ece84b8da":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');

var InternalStateModule = require('../internals/internal-state');

var createIteratorConstructor = require('../internals/create-iterator-constructor');

var isObject = require('../internals/is-object');

var defineProperties = require('../internals/object-define-properties').f;

var DESCRIPTORS = require('../internals/descriptors');

var INCORRECT_RANGE = 'Incorrect Number.range arguments';
var NUMERIC_RANGE_ITERATOR = 'NumericRangeIterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(NUMERIC_RANGE_ITERATOR);
var RangeError = global.RangeError;
var TypeError = global.TypeError;
var $RangeIterator = createIteratorConstructor(function NumericRangeIterator(start, end, option, type, zero, one) {
  if (typeof start != type || end !== Infinity && end !== -Infinity && typeof end != type) {
    throw new TypeError(INCORRECT_RANGE);
  }

  if (start === Infinity || start === -Infinity) {
    throw new RangeError(INCORRECT_RANGE);
  }

  var ifIncrease = end > start;
  var inclusiveEnd = false;
  var step;

  if (option === undefined) {
    step = undefined;
  } else if (isObject(option)) {
    step = option.step;
    inclusiveEnd = !!option.inclusive;
  } else if (typeof option == type) {
    step = option;
  } else {
    throw new TypeError(INCORRECT_RANGE);
  }

  if (step == null) {
    step = ifIncrease ? one : -one;
  }

  if (typeof step != type) {
    throw new TypeError(INCORRECT_RANGE);
  }

  if (step === Infinity || step === -Infinity || step === zero && start !== end) {
    throw new RangeError(INCORRECT_RANGE);
  } // eslint-disable-next-line no-self-compare -- NaN check


  var hitsEnd = start != start || end != end || step != step || end > start !== step > zero;
  setInternalState(this, {
    type: NUMERIC_RANGE_ITERATOR,
    start: start,
    end: end,
    step: step,
    inclusiveEnd: inclusiveEnd,
    hitsEnd: hitsEnd,
    currentCount: zero,
    zero: zero
  });

  if (!DESCRIPTORS) {
    this.start = start;
    this.end = end;
    this.step = step;
    this.inclusive = inclusiveEnd;
  }
}, NUMERIC_RANGE_ITERATOR, function next() {
  var state = getInternalState(this);
  if (state.hitsEnd) return {
    value: undefined,
    done: true
  };
  var start = state.start;
  var end = state.end;
  var step = state.step;
  var currentYieldingValue = start + step * state.currentCount++;
  if (currentYieldingValue === end) state.hitsEnd = true;
  var inclusiveEnd = state.inclusiveEnd;
  var endCondition;

  if (end > start) {
    endCondition = inclusiveEnd ? currentYieldingValue > end : currentYieldingValue >= end;
  } else {
    endCondition = inclusiveEnd ? end > currentYieldingValue : end >= currentYieldingValue;
  }

  if (endCondition) {
    return {
      value: undefined,
      done: state.hitsEnd = true
    };
  }

  return {
    value: currentYieldingValue,
    done: false
  };
});

var getter = function (fn) {
  return {
    get: fn,
    set: function () {
      /* empty */
    },
    configurable: true,
    enumerable: false
  };
};

if (DESCRIPTORS) {
  defineProperties($RangeIterator.prototype, {
    start: getter(function () {
      return getInternalState(this).start;
    }),
    end: getter(function () {
      return getInternalState(this).end;
    }),
    inclusive: getter(function () {
      return getInternalState(this).inclusiveEnd;
    }),
    step: getter(function () {
      return getInternalState(this).step;
    })
  });
}

module.exports = $RangeIterator;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/create-iterator-constructor":"b9bab68ecd62fef0c0fd01853566a2cf","../internals/is-object":"03244e745134af366d66b74456891052","../internals/object-define-properties":"3ad53cd176876675b1da5125e4bdfafb","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b"}],"133c507d33a3fc2e61ca74a845eeb897":[function(require,module,exports) {
var $ = require('../internals/export');

var global = require('../internals/global');

var apply = require('../internals/function-apply');

var getCompositeKeyNode = require('../internals/composite-key');

var getBuiltIn = require('../internals/get-built-in');

var create = require('../internals/object-create');

var Object = global.Object;

var initializer = function () {
  var freeze = getBuiltIn('Object', 'freeze');
  return freeze ? freeze(create(null)) : create(null);
}; // https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey


$({
  global: true
}, {
  compositeKey: function compositeKey() {
    return apply(getCompositeKeyNode, Object, arguments).get('object', initializer);
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/composite-key":"ddf0e95c2689792ade0536a9b24a196b","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164"}],"ddf0e95c2689792ade0536a9b24a196b":[function(require,module,exports) {
// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
require('../modules/es.map');

require('../modules/es.weak-map');

var global = require('../internals/global');

var getBuiltIn = require('../internals/get-built-in');

var create = require('../internals/object-create');

var isObject = require('../internals/is-object');

var Object = global.Object;
var TypeError = global.TypeError;
var Map = getBuiltIn('Map');
var WeakMap = getBuiltIn('WeakMap');

var Node = function () {
  // keys
  this.object = null;
  this.symbol = null; // child nodes

  this.primitives = null;
  this.objectsByIndex = create(null);
};

Node.prototype.get = function (key, initializer) {
  return this[key] || (this[key] = initializer());
};

Node.prototype.next = function (i, it, IS_OBJECT) {
  var store = IS_OBJECT ? this.objectsByIndex[i] || (this.objectsByIndex[i] = new WeakMap()) : this.primitives || (this.primitives = new Map());
  var entry = store.get(it);
  if (!entry) store.set(it, entry = new Node());
  return entry;
};

var root = new Node();

module.exports = function () {
  var active = root;
  var length = arguments.length;
  var i, it; // for prevent leaking, start from objects

  for (i = 0; i < length; i++) {
    if (isObject(it = arguments[i])) active = active.next(i, it, true);
  }

  if (this === Object && active === root) throw TypeError('Composite keys must contain a non-primitive component');

  for (i = 0; i < length; i++) {
    if (!isObject(it = arguments[i])) active = active.next(i, it, false);
  }

  return active;
};
},{"../modules/es.map":"21e6c4cb86e4f5adaeb26fb92f746ee3","../modules/es.weak-map":"9e5ce70ecf8ba1c5c8a8c8442c7aea1b","../internals/global":"7e78823454e7f795898745d93279f917","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/is-object":"03244e745134af366d66b74456891052"}],"c548003ebc063bde5719d57311b468f0":[function(require,module,exports) {
var $ = require('../internals/export');
var getCompositeKeyNode = require('../internals/composite-key');
var getBuiltIn = require('../internals/get-built-in');
var apply = require('../internals/function-apply');

// https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey
$({ global: true }, {
  compositeSymbol: function compositeSymbol() {
    if (arguments.length == 1 && typeof arguments[0] == 'string') return getBuiltIn('Symbol')['for'](arguments[0]);
    return apply(getCompositeKeyNode, null, arguments).get('symbol', getBuiltIn('Symbol'));
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/composite-key":"ddf0e95c2689792ade0536a9b24a196b","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557"}],"d5f2dd69bea7c25d7e71c295342e38a9":[function(require,module,exports) {
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var $isCallable = require('../internals/is-callable');
var inspectSource = require('../internals/inspect-source');
var hasOwn = require('../internals/has-own-property');
var DESCRIPTORS = require('../internals/descriptors');

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var classRegExp = /^\s*class\b/;
var exec = uncurryThis(classRegExp.exec);

var isClassConstructor = function (argument) {
  try {
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    if (!DESCRIPTORS || !exec(classRegExp, inspectSource(argument))) return false;
  } catch (error) { /* empty */ }
  var prototype = getOwnPropertyDescriptor(argument, 'prototype');
  return !!prototype && hasOwn(prototype, 'writable') && !prototype.writable;
};

// `Function.isCallable` method
// https://github.com/caitp/TC39-Proposals/blob/trunk/tc39-reflect-isconstructor-iscallable.md
$({ target: 'Function', stat: true, sham: true }, {
  isCallable: function isCallable(argument) {
    return $isCallable(argument) && !isClassConstructor(argument);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/inspect-source":"2632e39e653b5d5a3bae68e9954b90e4","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b"}],"71ac9dab3761e80976943fa62ee584a1":[function(require,module,exports) {
var $ = require('../internals/export');
var isConstructor = require('../internals/is-constructor');

// `Function.isConstructor` method
// https://github.com/caitp/TC39-Proposals/blob/trunk/tc39-reflect-isconstructor-iscallable.md
$({ target: 'Function', stat: true }, {
  isConstructor: isConstructor
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-constructor":"119e842d0827f15b1b4e51c1ee9e98ea"}],"9cc5a31ca189fe4273e6afa11dcff03e":[function(require,module,exports) {
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');

// `Function.prototype.unThis` method
// https://github.com/js-choi/proposal-function-un-this
$({ target: 'Function', proto: true }, {
  unThis: function unThis() {
    return uncurryThis(aCallable(this));
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660"}],"b3e0646f2c52701f5fa4e972cf1bee7b":[function(require,module,exports) {
// TODO: Remove from `core-js@4`
require('../modules/es.global-this');

},{"../modules/es.global-this":"025e716370e78a150c710af7f87c7c5c"}],"fb1cd7bb979c4ac1ea606f804ddca468":[function(require,module,exports) {
'use strict'; // https://github.com/tc39/proposal-iterator-helpers

var $ = require('../internals/export');

var global = require('../internals/global');

var anInstance = require('../internals/an-instance');

var isCallable = require('../internals/is-callable');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var fails = require('../internals/fails');

var hasOwn = require('../internals/has-own-property');

var wellKnownSymbol = require('../internals/well-known-symbol');

var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;

var IS_PURE = require('../internals/is-pure');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var NativeIterator = global.Iterator; // FF56- have non-standard global helper `Iterator`

var FORCED = IS_PURE || !isCallable(NativeIterator) || NativeIterator.prototype !== IteratorPrototype // FF44- non-standard `Iterator` passes previous tests
|| !fails(function () {
  NativeIterator({});
});

var IteratorConstructor = function Iterator() {
  anInstance(this, IteratorPrototype);
};

if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) {
  createNonEnumerableProperty(IteratorPrototype, TO_STRING_TAG, 'Iterator');
}

if (FORCED || !hasOwn(IteratorPrototype, 'constructor') || IteratorPrototype.constructor === Object) {
  createNonEnumerableProperty(IteratorPrototype, 'constructor', IteratorConstructor);
}

IteratorConstructor.prototype = IteratorPrototype;
$({
  global: true,
  forced: FORCED
}, {
  Iterator: IteratorConstructor
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/an-instance":"8b0daff12bd798defdb69ae41eea7f5e","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/iterators-core":"8a1b93d778cdbd6c63966f348e8ad566","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0"}],"1a5f6b1d7c1ec69152cc0ef27a107bc7":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var apply = require('../internals/function-apply');
var anObject = require('../internals/an-object');
var createIteratorProxy = require('../internals/iterator-create-proxy');

var IteratorProxy = createIteratorProxy(function (args) {
  var result = anObject(apply(this.next, this.iterator, args));
  var done = this.done = !!result.done;
  if (!done) return [this.index++, result.value];
});

$({ target: 'Iterator', proto: true, real: true }, {
  asIndexedPairs: function asIndexedPairs() {
    return new IteratorProxy({
      iterator: anObject(this),
      index: 0
    });
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/iterator-create-proxy":"9ba6ea052f03675ec92c1c4f64ffe54b"}],"9ba6ea052f03675ec92c1c4f64ffe54b":[function(require,module,exports) {
'use strict';
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var create = require('../internals/object-create');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefineAll = require('../internals/redefine-all');
var wellKnownSymbol = require('../internals/well-known-symbol');
var InternalStateModule = require('../internals/internal-state');
var getMethod = require('../internals/get-method');
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;

var ITERATOR_PROXY = 'IteratorProxy';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ITERATOR_PROXY);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (nextHandler, IS_ITERATOR) {
  var IteratorProxy = function Iterator(state) {
    state.type = ITERATOR_PROXY;
    state.next = aCallable(state.iterator.next);
    state.done = false;
    state.ignoreArg = !IS_ITERATOR;
    setInternalState(this, state);
  };

  IteratorProxy.prototype = redefineAll(create(IteratorPrototype), {
    next: function next(arg) {
      var state = getInternalState(this);
      var args = arguments.length ? [state.ignoreArg ? undefined : arg] : IS_ITERATOR ? [] : [undefined];
      state.ignoreArg = false;
      var result = state.done ? undefined : call(nextHandler, state, args);
      return { done: state.done, value: result };
    },
    'return': function (value) {
      var state = getInternalState(this);
      var iterator = state.iterator;
      state.done = true;
      var $$return = getMethod(iterator, 'return');
      return { done: true, value: $$return ? anObject(call($$return, iterator, value)).value : value };
    },
    'throw': function (value) {
      var state = getInternalState(this);
      var iterator = state.iterator;
      state.done = true;
      var $$throw = getMethod(iterator, 'throw');
      if ($$throw) return call($$throw, iterator, value);
      throw value;
    }
  });

  if (!IS_ITERATOR) {
    createNonEnumerableProperty(IteratorProxy.prototype, TO_STRING_TAG, 'Generator');
  }

  return IteratorProxy;
};

},{"../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/redefine-all":"ffd35f1bc6f8a9cf26e6fa0389f4748d","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/iterators-core":"8a1b93d778cdbd6c63966f348e8ad566"}],"335389a554348d510648f352832d13e2":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var apply = require('../internals/function-apply');
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var toPositiveInteger = require('../internals/to-positive-integer');
var createIteratorProxy = require('../internals/iterator-create-proxy');

var IteratorProxy = createIteratorProxy(function (args) {
  var iterator = this.iterator;
  var next = this.next;
  var result, done;
  while (this.remaining) {
    this.remaining--;
    result = anObject(call(next, iterator));
    done = this.done = !!result.done;
    if (done) return;
  }
  result = anObject(apply(next, iterator, args));
  done = this.done = !!result.done;
  if (!done) return result.value;
});

$({ target: 'Iterator', proto: true, real: true }, {
  drop: function drop(limit) {
    return new IteratorProxy({
      iterator: anObject(this),
      remaining: toPositiveInteger(limit)
    });
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-positive-integer":"78a692a1c72bccb538efb4a5c2020e6b","../internals/iterator-create-proxy":"9ba6ea052f03675ec92c1c4f64ffe54b"}],"92a8400f1e07d0ae0f74b5716f435060":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');

$({ target: 'Iterator', proto: true, real: true }, {
  every: function every(fn) {
    anObject(this);
    aCallable(fn);
    return !iterate(this, function (value, stop) {
      if (!fn(value)) return stop();
    }, { IS_ITERATOR: true, INTERRUPTED: true }).stopped;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/iterate":"33b1bc22ce229618eb94623257686da2","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"fa9dd6897b5bf76ce4ee0ef6a42d5b70":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var apply = require('../internals/function-apply');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var createIteratorProxy = require('../internals/iterator-create-proxy');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');

var IteratorProxy = createIteratorProxy(function (args) {
  var iterator = this.iterator;
  var filterer = this.filterer;
  var next = this.next;
  var result, done, value;
  while (true) {
    result = anObject(apply(next, iterator, args));
    done = this.done = !!result.done;
    if (done) return;
    value = result.value;
    if (callWithSafeIterationClosing(iterator, filterer, value)) return value;
  }
});

$({ target: 'Iterator', proto: true, real: true }, {
  filter: function filter(filterer) {
    return new IteratorProxy({
      iterator: anObject(this),
      filterer: aCallable(filterer)
    });
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/iterator-create-proxy":"9ba6ea052f03675ec92c1c4f64ffe54b","../internals/call-with-safe-iteration-closing":"8876d1c56af08599f7b19a406726d554"}],"7974fcde83c35ead83f2bc0dc9316f99":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');

$({ target: 'Iterator', proto: true, real: true }, {
  find: function find(fn) {
    anObject(this);
    aCallable(fn);
    return iterate(this, function (value, stop) {
      if (fn(value)) return stop(value);
    }, { IS_ITERATOR: true, INTERRUPTED: true }).result;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/iterate":"33b1bc22ce229618eb94623257686da2","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"ad816c1e5d2c419f020d462f07cb96a8":[function(require,module,exports) {
'use strict'; // https://github.com/tc39/proposal-iterator-helpers

var $ = require('../internals/export');

var global = require('../internals/global');

var call = require('../internals/function-call');

var aCallable = require('../internals/a-callable');

var anObject = require('../internals/an-object');

var getIteratorMethod = require('../internals/get-iterator-method');

var createIteratorProxy = require('../internals/iterator-create-proxy');

var iteratorClose = require('../internals/iterator-close');

var TypeError = global.TypeError;
var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var mapper = this.mapper;
  var result, mapped, iteratorMethod, innerIterator;

  while (true) {
    try {
      if (innerIterator = this.innerIterator) {
        result = anObject(call(this.innerNext, innerIterator));
        if (!result.done) return result.value;
        this.innerIterator = this.innerNext = null;
      }

      result = anObject(call(this.next, iterator));
      if (this.done = !!result.done) return;
      mapped = mapper(result.value);
      iteratorMethod = getIteratorMethod(mapped);

      if (!iteratorMethod) {
        throw TypeError('.flatMap callback should return an iterable object');
      }

      this.innerIterator = innerIterator = anObject(call(iteratorMethod, mapped));
      this.innerNext = aCallable(innerIterator.next);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
  }
});
$({
  target: 'Iterator',
  proto: true,
  real: true
}, {
  flatMap: function flatMap(mapper) {
    return new IteratorProxy({
      iterator: anObject(this),
      mapper: aCallable(mapper),
      innerIterator: null,
      innerNext: null
    });
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/get-iterator-method":"ee70e79559122fe97016e526e216278d","../internals/iterator-create-proxy":"9ba6ea052f03675ec92c1c4f64ffe54b","../internals/iterator-close":"5e9bf1de406471a090fb81ce721ec2f8"}],"a6e7bfe876b6e61585551f542152c925":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var anObject = require('../internals/an-object');

$({ target: 'Iterator', proto: true, real: true }, {
  forEach: function forEach(fn) {
    iterate(anObject(this), fn, { IS_ITERATOR: true });
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/iterate":"33b1bc22ce229618eb94623257686da2","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"77705137782f356064f81e86139230c2":[function(require,module,exports) {
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var apply = require('../internals/function-apply');
var anObject = require('../internals/an-object');
var toObject = require('../internals/to-object');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var createIteratorProxy = require('../internals/iterator-create-proxy');
var getIterator = require('../internals/get-iterator');
var getIteratorMethod = require('../internals/get-iterator-method');

var IteratorProxy = createIteratorProxy(function (args) {
  var result = anObject(apply(this.next, this.iterator, args));
  var done = this.done = !!result.done;
  if (!done) return result.value;
}, true);

$({ target: 'Iterator', stat: true }, {
  from: function from(O) {
    var object = toObject(O);
    var usingIterator = getIteratorMethod(object);
    var iterator;
    if (usingIterator) {
      iterator = getIterator(object, usingIterator);
      if (isPrototypeOf(IteratorPrototype, iterator)) return iterator;
    } else {
      iterator = object;
    } return new IteratorProxy({ iterator: iterator });
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba","../internals/object-is-prototype-of":"544f373cb6f2cefc1ac40f5370c50e9d","../internals/iterators-core":"8a1b93d778cdbd6c63966f348e8ad566","../internals/iterator-create-proxy":"9ba6ea052f03675ec92c1c4f64ffe54b","../internals/get-iterator":"95609b3cd4fe60efb5286ed1595b57b7","../internals/get-iterator-method":"ee70e79559122fe97016e526e216278d"}],"2ed44ec4c1282dbd18cd64f85939c1f9":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var apply = require('../internals/function-apply');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var createIteratorProxy = require('../internals/iterator-create-proxy');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');

var IteratorProxy = createIteratorProxy(function (args) {
  var iterator = this.iterator;
  var result = anObject(apply(this.next, iterator, args));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, result.value);
});

$({ target: 'Iterator', proto: true, real: true }, {
  map: function map(mapper) {
    return new IteratorProxy({
      iterator: anObject(this),
      mapper: aCallable(mapper)
    });
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/iterator-create-proxy":"9ba6ea052f03675ec92c1c4f64ffe54b","../internals/call-with-safe-iteration-closing":"8876d1c56af08599f7b19a406726d554"}],"010f4553018139025bef31a78c9fa142":[function(require,module,exports) {
'use strict'; // https://github.com/tc39/proposal-iterator-helpers

var $ = require('../internals/export');

var global = require('../internals/global');

var iterate = require('../internals/iterate');

var aCallable = require('../internals/a-callable');

var anObject = require('../internals/an-object');

var TypeError = global.TypeError;
$({
  target: 'Iterator',
  proto: true,
  real: true
}, {
  reduce: function reduce(reducer
  /* , initialValue */
  ) {
    anObject(this);
    aCallable(reducer);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    iterate(this, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = reducer(accumulator, value);
      }
    }, {
      IS_ITERATOR: true
    });
    if (noInitial) throw TypeError('Reduce of empty iterator with no initial value');
    return accumulator;
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/iterate":"33b1bc22ce229618eb94623257686da2","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"58eb846a61f519d8eca34d331782dbac":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');

$({ target: 'Iterator', proto: true, real: true }, {
  some: function some(fn) {
    anObject(this);
    aCallable(fn);
    return iterate(this, function (value, stop) {
      if (fn(value)) return stop();
    }, { IS_ITERATOR: true, INTERRUPTED: true }).stopped;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/iterate":"33b1bc22ce229618eb94623257686da2","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"0d8902e6d79614a434c736f4974d0f25":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var apply = require('../internals/function-apply');
var anObject = require('../internals/an-object');
var toPositiveInteger = require('../internals/to-positive-integer');
var createIteratorProxy = require('../internals/iterator-create-proxy');
var iteratorClose = require('../internals/iterator-close');

var IteratorProxy = createIteratorProxy(function (args) {
  var iterator = this.iterator;
  if (!this.remaining--) {
    this.done = true;
    return iteratorClose(iterator, 'normal', undefined);
  }
  var result = anObject(apply(this.next, iterator, args));
  var done = this.done = !!result.done;
  if (!done) return result.value;
});

$({ target: 'Iterator', proto: true, real: true }, {
  take: function take(limit) {
    return new IteratorProxy({
      iterator: anObject(this),
      remaining: toPositiveInteger(limit)
    });
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-positive-integer":"78a692a1c72bccb538efb4a5c2020e6b","../internals/iterator-create-proxy":"9ba6ea052f03675ec92c1c4f64ffe54b","../internals/iterator-close":"5e9bf1de406471a090fb81ce721ec2f8"}],"46edff0bab34ffb43f7d319896ede3b3":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var anObject = require('../internals/an-object');

var push = [].push;

$({ target: 'Iterator', proto: true, real: true }, {
  toArray: function toArray() {
    var result = [];
    iterate(anObject(this), push, { that: result, IS_ITERATOR: true });
    return result;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/iterate":"33b1bc22ce229618eb94623257686da2","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"bf12c1c1076c603c3f66376fa74ec747":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-iterator-helpers
var $ = require('../internals/export');
var AsyncFromSyncIterator = require('../internals/async-from-sync-iterator');

$({ target: 'Iterator', proto: true, real: true }, {
  toAsync: function toAsync() {
    return new AsyncFromSyncIterator(this);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/async-from-sync-iterator":"14e7e6ac7effc7882598d97a6635f6f6"}],"da08c28f3be41f203707074ac2366cd1":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var deleteAll = require('../internals/collection-delete-all');

// `Map.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  deleteAll: deleteAll
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/collection-delete-all":"e2095071a9eb94c0a435d139a9ea21ad"}],"e2095071a9eb94c0a435d139a9ea21ad":[function(require,module,exports) {
'use strict';
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');

// https://github.com/tc39/collection-methods
module.exports = function deleteAll(/* ...elements */) {
  var collection = anObject(this);
  var remover = aCallable(collection['delete']);
  var allDeleted = true;
  var wasDeleted;
  for (var k = 0, len = arguments.length; k < len; k++) {
    wasDeleted = call(remover, collection, arguments[k]);
    allDeleted = allDeleted && wasDeleted;
  }
  return !!allDeleted;
};

},{"../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"5951b13be2e1a7e7035341c8f8c75c65":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var emplace = require('../internals/map-emplace');

// `Map.prototype.emplace` method
// https://github.com/thumbsupep/proposal-upsert
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  emplace: emplace
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/map-emplace":"fd7eec2ed80b3675e641a7e23c8e86c8"}],"fd7eec2ed80b3675e641a7e23c8e86c8":[function(require,module,exports) {
'use strict';
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');

// `Map.prototype.emplace` method
// https://github.com/thumbsupep/proposal-upsert
module.exports = function emplace(key, handler) {
  var map = anObject(this);
  var get = aCallable(map.get);
  var has = aCallable(map.has);
  var set = aCallable(map.set);
  var value = (call(has, map, key) && 'update' in handler)
    ? handler.update(call(get, map, key), key, map)
    : handler.insert(key, map);
  call(set, map, key, value);
  return value;
};

},{"../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"069fe26fdcf8b13478e75a588d6701dd":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var bind = require('../internals/function-bind-context');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Map.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  every: function every(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return !iterate(iterator, function (key, value, stop) {
      if (!boundFunction(value, key, map)) return stop();
    }, { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }).stopped;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/get-map-iterator":"1f7fa01efb9f3273435ca62a5d51f86b","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"1f7fa01efb9f3273435ca62a5d51f86b":[function(require,module,exports) {
var call = require('../internals/function-call');

module.exports = function (it) {
  // eslint-disable-next-line es/no-map -- safe
  return call(Map.prototype.entries, it);
};

},{"../internals/function-call":"74736a18012731e2548e8322d30daf97"}],"02756a3309bf3bc2e0435bf9b0517f63":[function(require,module,exports) {
'use strict';
var IS_PURE = require('../internals/is-pure');
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var bind = require('../internals/function-bind-context');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var speciesConstructor = require('../internals/species-constructor');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Map.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  filter: function filter(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new (speciesConstructor(map, getBuiltIn('Map')))();
    var setter = aCallable(newMap.set);
    iterate(iterator, function (key, value) {
      if (boundFunction(value, key, map)) call(setter, newMap, key, value);
    }, { AS_ENTRIES: true, IS_ITERATOR: true });
    return newMap;
  }
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/species-constructor":"a110df2a5900fb30b4239748c46982d8","../internals/get-map-iterator":"1f7fa01efb9f3273435ca62a5d51f86b","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"ca54e6b1c7b861f0d887f919867b1acc":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var bind = require('../internals/function-bind-context');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Map.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  find: function find(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(iterator, function (key, value, stop) {
      if (boundFunction(value, key, map)) return stop(value);
    }, { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }).result;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/get-map-iterator":"1f7fa01efb9f3273435ca62a5d51f86b","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"832e1c5815129f6f9a83e91d6d0d4722":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var bind = require('../internals/function-bind-context');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Map.prototype.findKey` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  findKey: function findKey(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(iterator, function (key, value, stop) {
      if (boundFunction(value, key, map)) return stop(key);
    }, { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }).result;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/get-map-iterator":"1f7fa01efb9f3273435ca62a5d51f86b","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"5052cd5fe046f0843fd16575944ccf21":[function(require,module,exports) {
var $ = require('../internals/export');
var from = require('../internals/collection-from');

// `Map.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
$({ target: 'Map', stat: true }, {
  from: from
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/collection-from":"af8d9110c9398ad031999bb3855ddf1b"}],"af8d9110c9398ad031999bb3855ddf1b":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var bind = require('../internals/function-bind-context');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var aConstructor = require('../internals/a-constructor');
var iterate = require('../internals/iterate');

var push = [].push;

module.exports = function from(source /* , mapFn, thisArg */) {
  var length = arguments.length;
  var mapFn = length > 1 ? arguments[1] : undefined;
  var mapping, array, n, boundFunction;
  aConstructor(this);
  mapping = mapFn !== undefined;
  if (mapping) aCallable(mapFn);
  if (source == undefined) return new this();
  array = [];
  if (mapping) {
    n = 0;
    boundFunction = bind(mapFn, length > 2 ? arguments[2] : undefined);
    iterate(source, function (nextItem) {
      call(push, array, boundFunction(nextItem, n++));
    });
  } else {
    iterate(source, push, { that: array });
  }
  return new this(array);
};

},{"../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/a-constructor":"68a3572cb2f4921c4818116046759501","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"02e49c4f035a18c0ccb157e23668b04b":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');
var getIterator = require('../internals/get-iterator');
var iterate = require('../internals/iterate');

var push = uncurryThis([].push);

// `Map.groupBy` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', stat: true }, {
  groupBy: function groupBy(iterable, keyDerivative) {
    aCallable(keyDerivative);
    var iterator = getIterator(iterable);
    var newMap = new this();
    var has = aCallable(newMap.has);
    var get = aCallable(newMap.get);
    var set = aCallable(newMap.set);
    iterate(iterator, function (element) {
      var derivedKey = keyDerivative(element);
      if (!call(has, newMap, derivedKey)) call(set, newMap, derivedKey, [element]);
      else push(call(get, newMap, derivedKey), element);
    }, { IS_ITERATOR: true });
    return newMap;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/get-iterator":"95609b3cd4fe60efb5286ed1595b57b7","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"c02bbc042420d98748f2e0bd59edab04":[function(require,module,exports) {
'use strict';
var IS_PURE = require('../internals/is-pure');
var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var getMapIterator = require('../internals/get-map-iterator');
var sameValueZero = require('../internals/same-value-zero');
var iterate = require('../internals/iterate');

// `Map.prototype.includes` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  includes: function includes(searchElement) {
    return iterate(getMapIterator(anObject(this)), function (key, value, stop) {
      if (sameValueZero(value, searchElement)) return stop();
    }, { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }).stopped;
  }
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/get-map-iterator":"1f7fa01efb9f3273435ca62a5d51f86b","../internals/same-value-zero":"b82d90545926c1adf97dabb8e78e17dc","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"b82d90545926c1adf97dabb8e78e17dc":[function(require,module,exports) {
// `SameValueZero` abstract operation
// https://tc39.es/ecma262/#sec-samevaluezero
module.exports = function (x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y || x != x && y != y;
};

},{}],"18f11836e004e251e6329d2ae8fe53be":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');
var iterate = require('../internals/iterate');
var aCallable = require('../internals/a-callable');

// `Map.keyBy` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', stat: true }, {
  keyBy: function keyBy(iterable, keyDerivative) {
    var newMap = new this();
    aCallable(keyDerivative);
    var setter = aCallable(newMap.set);
    iterate(iterable, function (element) {
      call(setter, newMap, keyDerivative(element), element);
    });
    return newMap;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/iterate":"33b1bc22ce229618eb94623257686da2","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660"}],"83b5bc57ffa9842455348af2854600b2":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Map.prototype.keyOf` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  keyOf: function keyOf(searchElement) {
    return iterate(getMapIterator(anObject(this)), function (key, value, stop) {
      if (value === searchElement) return stop(key);
    }, { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }).result;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/get-map-iterator":"1f7fa01efb9f3273435ca62a5d51f86b","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"a0c8bff85589da1dba46ce75728658ea":[function(require,module,exports) {
'use strict';
var IS_PURE = require('../internals/is-pure');
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var bind = require('../internals/function-bind-context');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var speciesConstructor = require('../internals/species-constructor');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Map.prototype.mapKeys` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  mapKeys: function mapKeys(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new (speciesConstructor(map, getBuiltIn('Map')))();
    var setter = aCallable(newMap.set);
    iterate(iterator, function (key, value) {
      call(setter, newMap, boundFunction(value, key, map), value);
    }, { AS_ENTRIES: true, IS_ITERATOR: true });
    return newMap;
  }
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/species-constructor":"a110df2a5900fb30b4239748c46982d8","../internals/get-map-iterator":"1f7fa01efb9f3273435ca62a5d51f86b","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"805d999c2a707eecfa3887515ffed686":[function(require,module,exports) {
'use strict';
var IS_PURE = require('../internals/is-pure');
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var bind = require('../internals/function-bind-context');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var speciesConstructor = require('../internals/species-constructor');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Map.prototype.mapValues` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  mapValues: function mapValues(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new (speciesConstructor(map, getBuiltIn('Map')))();
    var setter = aCallable(newMap.set);
    iterate(iterator, function (key, value) {
      call(setter, newMap, key, boundFunction(value, key, map));
    }, { AS_ENTRIES: true, IS_ITERATOR: true });
    return newMap;
  }
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/species-constructor":"a110df2a5900fb30b4239748c46982d8","../internals/get-map-iterator":"1f7fa01efb9f3273435ca62a5d51f86b","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"01d65cd25f2e42ad41fca4bfb9417cdb":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var iterate = require('../internals/iterate');

// `Map.prototype.merge` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  merge: function merge(iterable /* ...iterables */) {
    var map = anObject(this);
    var setter = aCallable(map.set);
    var argumentsLength = arguments.length;
    var i = 0;
    while (i < argumentsLength) {
      iterate(arguments[i++], setter, { that: map, AS_ENTRIES: true });
    }
    return map;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"b623f6a1958de96976d20cc4dbde8cda":[function(require,module,exports) {
var $ = require('../internals/export');
var of = require('../internals/collection-of');

// `Map.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
$({ target: 'Map', stat: true }, {
  of: of
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/collection-of":"647624bb35fa71634a308343780c4842"}],"647624bb35fa71634a308343780c4842":[function(require,module,exports) {
'use strict';
var arraySlice = require('../internals/array-slice');

// https://tc39.github.io/proposal-setmap-offrom/
module.exports = function of() {
  return new this(arraySlice(arguments));
};

},{"../internals/array-slice":"d58518bc0d77fd7d4bbb2d854257bf40"}],"59667dc1e766e5cc61da0969b618b4cc":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var IS_PURE = require('../internals/is-pure');

var anObject = require('../internals/an-object');

var aCallable = require('../internals/a-callable');

var getMapIterator = require('../internals/get-map-iterator');

var iterate = require('../internals/iterate');

var TypeError = global.TypeError; // `Map.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods

$({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE
}, {
  reduce: function reduce(callbackfn
  /* , initialValue */
  ) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aCallable(callbackfn);
    iterate(iterator, function (key, value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, key, map);
      }
    }, {
      AS_ENTRIES: true,
      IS_ITERATOR: true
    });
    if (noInitial) throw TypeError('Reduce of empty map with no initial value');
    return accumulator;
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/get-map-iterator":"1f7fa01efb9f3273435ca62a5d51f86b","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"a775e85400635450523ec6fd018025f1":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var bind = require('../internals/function-bind-context');
var getMapIterator = require('../internals/get-map-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  some: function some(callbackfn /* , thisArg */) {
    var map = anObject(this);
    var iterator = getMapIterator(map);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(iterator, function (key, value, stop) {
      if (boundFunction(value, key, map)) return stop();
    }, { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }).stopped;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/get-map-iterator":"1f7fa01efb9f3273435ca62a5d51f86b","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"f4788c3e7f18e8e8760dbe26750754fc":[function(require,module,exports) {
'use strict';

var IS_PURE = require('../internals/is-pure');

var $ = require('../internals/export');

var global = require('../internals/global');

var call = require('../internals/function-call');

var anObject = require('../internals/an-object');

var aCallable = require('../internals/a-callable');

var TypeError = global.TypeError; // `Set.prototype.update` method
// https://github.com/tc39/proposal-collection-methods

$({
  target: 'Map',
  proto: true,
  real: true,
  forced: IS_PURE
}, {
  update: function update(key, callback
  /* , thunk */
  ) {
    var map = anObject(this);
    var get = aCallable(map.get);
    var has = aCallable(map.has);
    var set = aCallable(map.set);
    var length = arguments.length;
    aCallable(callback);
    var isPresentInMap = call(has, map, key);

    if (!isPresentInMap && length < 3) {
      throw TypeError('Updating absent value');
    }

    var value = isPresentInMap ? call(get, map, key) : aCallable(length > 2 ? arguments[2] : undefined)(key, map);
    call(set, map, key, callback(value, key, map));
    return map;
  }
});
},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660"}],"e286f2c667d0fd96a62c18c1be89348a":[function(require,module,exports) {
'use strict';
// TODO: remove from `core-js@4`
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var upsert = require('../internals/map-upsert');

// `Map.prototype.updateOrInsert` method (replaced by `Map.prototype.emplace`)
// https://github.com/thumbsupep/proposal-upsert
$({ target: 'Map', proto: true, real: true, name: 'upsert', forced: IS_PURE }, {
  updateOrInsert: upsert
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/map-upsert":"2dcf282e3ce272eef7faf906d095b85a"}],"2dcf282e3ce272eef7faf906d095b85a":[function(require,module,exports) {
'use strict';

var global = require('../internals/global');

var call = require('../internals/function-call');

var aCallable = require('../internals/a-callable');

var isCallable = require('../internals/is-callable');

var anObject = require('../internals/an-object');

var TypeError = global.TypeError; // `Map.prototype.upsert` method
// https://github.com/thumbsupep/proposal-upsert

module.exports = function upsert(key, updateFn
/* , insertFn */
) {
  var map = anObject(this);
  var get = aCallable(map.get);
  var has = aCallable(map.has);
  var set = aCallable(map.set);
  var insertFn = arguments.length > 2 ? arguments[2] : undefined;
  var value;

  if (!isCallable(updateFn) && !isCallable(insertFn)) {
    throw TypeError('At least one callback required');
  }

  if (call(has, map, key)) {
    value = call(get, map, key);

    if (isCallable(updateFn)) {
      value = updateFn(value);
      call(set, map, key, value);
    }
  } else if (isCallable(insertFn)) {
    value = insertFn();
    call(set, map, key, value);
  }

  return value;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"168110118e75466160c468ce1da0469f":[function(require,module,exports) {
'use strict';
// TODO: remove from `core-js@4`
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var upsert = require('../internals/map-upsert');

// `Map.prototype.upsert` method (replaced by `Map.prototype.emplace`)
// https://github.com/thumbsupep/proposal-upsert
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  upsert: upsert
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/map-upsert":"2dcf282e3ce272eef7faf906d095b85a"}],"517dcf5afcb0a2abdd858eb5a7355c9c":[function(require,module,exports) {
var $ = require('../internals/export');

var min = Math.min;
var max = Math.max;

// `Math.clamp` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true }, {
  clamp: function clamp(x, lower, upper) {
    return min(upper, max(lower, x));
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"cf3972f2ec04fcec3334fde017f6d18b":[function(require,module,exports) {
var $ = require('../internals/export');

// `Math.DEG_PER_RAD` constant
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true }, {
  DEG_PER_RAD: Math.PI / 180
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"bb2c708de18de445d1996c57a8ca04cd":[function(require,module,exports) {
var $ = require('../internals/export');

var RAD_PER_DEG = 180 / Math.PI;

// `Math.degrees` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true }, {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"dafad7196920382dfc96296f2295a034":[function(require,module,exports) {
var $ = require('../internals/export');

var scale = require('../internals/math-scale');
var fround = require('../internals/math-fround');

// `Math.fscale` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true }, {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/math-scale":"769977ff49be48bb75db3939bfa9ab92","../internals/math-fround":"3f149d8dcb124d2d1a907cb49e1da9db"}],"769977ff49be48bb75db3939bfa9ab92":[function(require,module,exports) {
// `Math.scale` method implementation
// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  var nx = +x;
  var nInLow = +inLow;
  var nInHigh = +inHigh;
  var nOutLow = +outLow;
  var nOutHigh = +outHigh;
  // eslint-disable-next-line no-self-compare -- NaN check
  if (nx != nx || nInLow != nInLow || nInHigh != nInHigh || nOutLow != nOutLow || nOutHigh != nOutHigh) return NaN;
  if (nx === Infinity || nx === -Infinity) return nx;
  return (nx - nInLow) * (nOutHigh - nOutLow) / (nInHigh - nInLow) + nOutLow;
};

},{}],"22057065839ebaf54a78657e41f7b634":[function(require,module,exports) {
var $ = require('../internals/export');

// `Math.iaddh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true }, {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"5aa235805e7dc68cc4c9bc5b26c7ca3f":[function(require,module,exports) {
var $ = require('../internals/export');

// `Math.imulh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true }, {
  imulh: function imulh(u, v) {
    var UINT16 = 0xFFFF;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"26de6906ceb6f5e60f59b9295fc4475b":[function(require,module,exports) {
var $ = require('../internals/export');

// `Math.isubh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true }, {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"53aed246d9718990305843874923db5e":[function(require,module,exports) {
var $ = require('../internals/export');

// `Math.RAD_PER_DEG` constant
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true }, {
  RAD_PER_DEG: 180 / Math.PI
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"63d0308801ab92d943a00e6c983ba1bc":[function(require,module,exports) {
var $ = require('../internals/export');

var DEG_PER_RAD = Math.PI / 180;

// `Math.radians` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true }, {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"f429f24b5774a08404322a041b3d9d05":[function(require,module,exports) {
var $ = require('../internals/export');
var scale = require('../internals/math-scale');

// `Math.scale` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true }, {
  scale: scale
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/math-scale":"769977ff49be48bb75db3939bfa9ab92"}],"d50020a4503dfb5193c0e752c2378c42":[function(require,module,exports) {
var $ = require('../internals/export');

var global = require('../internals/global');

var anObject = require('../internals/an-object');

var numberIsFinite = require('../internals/number-is-finite');

var createIteratorConstructor = require('../internals/create-iterator-constructor');

var InternalStateModule = require('../internals/internal-state');

var SEEDED_RANDOM = 'Seeded Random';
var SEEDED_RANDOM_GENERATOR = SEEDED_RANDOM + ' Generator';
var SEED_TYPE_ERROR = 'Math.seededPRNG() argument should have a "seed" field with a finite value.';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SEEDED_RANDOM_GENERATOR);
var TypeError = global.TypeError;
var $SeededRandomGenerator = createIteratorConstructor(function SeededRandomGenerator(seed) {
  setInternalState(this, {
    type: SEEDED_RANDOM_GENERATOR,
    seed: seed % 2147483647
  });
}, SEEDED_RANDOM, function next() {
  var state = getInternalState(this);
  var seed = state.seed = (state.seed * 1103515245 + 12345) % 2147483647;
  return {
    value: (seed & 1073741823) / 1073741823,
    done: false
  };
}); // `Math.seededPRNG` method
// https://github.com/tc39/proposal-seeded-random
// based on https://github.com/tc39/proposal-seeded-random/blob/78b8258835b57fc2100d076151ab506bc3202ae6/demo.html

$({
  target: 'Math',
  stat: true,
  forced: true
}, {
  seededPRNG: function seededPRNG(it) {
    var seed = anObject(it).seed;
    if (!numberIsFinite(seed)) throw TypeError(SEED_TYPE_ERROR);
    return new $SeededRandomGenerator(seed);
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/number-is-finite":"e3533e216c5dfe4e1a620c6996cb2d9e","../internals/create-iterator-constructor":"b9bab68ecd62fef0c0fd01853566a2cf","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1"}],"12938d1cfa05a5c2c9248ee2399c2e40":[function(require,module,exports) {
var $ = require('../internals/export');

// `Math.signbit` method
// https://github.com/tc39/proposal-Math.signbit
$({ target: 'Math', stat: true }, {
  signbit: function signbit(x) {
    return (x = +x) == x && x == 0 ? 1 / x == -Infinity : x < 0;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"873f307703588984724a7c527b64c5d6":[function(require,module,exports) {
var $ = require('../internals/export');

// `Math.umulh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true }, {
  umulh: function umulh(u, v) {
    var UINT16 = 0xFFFF;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2"}],"eaa5fb070be82a4e487cb0f2d6d9d3f4":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var parseInt = require('../internals/number-parse-int');

var INVALID_NUMBER_REPRESENTATION = 'Invalid number representation';
var INVALID_RADIX = 'Invalid radix';
var RangeError = global.RangeError;
var SyntaxError = global.SyntaxError;
var TypeError = global.TypeError;
var valid = /^[\da-z]+$/;
var charAt = uncurryThis(''.charAt);
var exec = uncurryThis(valid.exec);
var numberToString = uncurryThis(1.0.toString);
var stringSlice = uncurryThis(''.slice); // `Number.fromString` method
// https://github.com/tc39/proposal-number-fromstring

$({
  target: 'Number',
  stat: true
}, {
  fromString: function fromString(string, radix) {
    var sign = 1;
    var R, mathNum;
    if (typeof string != 'string') throw TypeError(INVALID_NUMBER_REPRESENTATION);
    if (!string.length) throw SyntaxError(INVALID_NUMBER_REPRESENTATION);

    if (charAt(string, 0) == '-') {
      sign = -1;
      string = stringSlice(string, 1);
      if (!string.length) throw SyntaxError(INVALID_NUMBER_REPRESENTATION);
    }

    R = radix === undefined ? 10 : toIntegerOrInfinity(radix);
    if (R < 2 || R > 36) throw RangeError(INVALID_RADIX);

    if (!exec(valid, string) || numberToString(mathNum = parseInt(string, R), R) !== string) {
      throw SyntaxError(INVALID_NUMBER_REPRESENTATION);
    }

    return sign * mathNum;
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f","../internals/number-parse-int":"18ae48f2771f3f34c758ef3ebcc738dc"}],"2660e29157b8ee6c23d58f0beb2e45d7":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var NumericRangeIterator = require('../internals/numeric-range-iterator');

// `Number.range` method
// https://github.com/tc39/proposal-Number.range
$({ target: 'Number', stat: true }, {
  range: function range(start, end, option) {
    return new NumericRangeIterator(start, end, option, 'number', 0, 1);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/numeric-range-iterator":"ce7f94b2dacdcdbe6b15ab3ece84b8da"}],"0f746baabc7b18c5e408a4f33e33289d":[function(require,module,exports) {
// TODO: Remove from `core-js@4`
require('../modules/es.object.has-own');

},{"../modules/es.object.has-own":"05918137f48470dc95fe85e42a7bf22c"}],"d2f57f1dc7186c1a592d441af2026bab":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var ObjectIterator = require('../internals/object-iterator');

// `Object.iterateEntries` method
// https://github.com/tc39/proposal-object-iteration
$({ target: 'Object', stat: true }, {
  iterateEntries: function iterateEntries(object) {
    return new ObjectIterator(object, 'entries');
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/object-iterator":"06fe4776b1eb624ab01a58c4442dc56a"}],"06fe4776b1eb624ab01a58c4442dc56a":[function(require,module,exports) {
'use strict';
var InternalStateModule = require('../internals/internal-state');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var hasOwn = require('../internals/has-own-property');
var objectKeys = require('../internals/object-keys');
var toObject = require('../internals/to-object');

var OBJECT_ITERATOR = 'Object Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(OBJECT_ITERATOR);

module.exports = createIteratorConstructor(function ObjectIterator(source, mode) {
  var object = toObject(source);
  setInternalState(this, {
    type: OBJECT_ITERATOR,
    mode: mode,
    object: object,
    keys: objectKeys(object),
    index: 0
  });
}, 'Object', function next() {
  var state = getInternalState(this);
  var keys = state.keys;
  while (true) {
    if (keys === null || state.index >= keys.length) {
      state.object = state.keys = null;
      return { value: undefined, done: true };
    }
    var key = keys[state.index++];
    var object = state.object;
    if (!hasOwn(object, key)) continue;
    switch (state.mode) {
      case 'keys': return { value: key, done: false };
      case 'values': return { value: object[key], done: false };
    } /* entries */ return { value: [key, object[key]], done: false };
  }
});

},{"../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/create-iterator-constructor":"b9bab68ecd62fef0c0fd01853566a2cf","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/object-keys":"ec0d9c7c7614ad542f1a79132cefce40","../internals/to-object":"2633fa4da95065e00ff87cc7cbdd56ba"}],"800b08fd1144b0e2859d58552e94a96e":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var ObjectIterator = require('../internals/object-iterator');

// `Object.iterateKeys` method
// https://github.com/tc39/proposal-object-iteration
$({ target: 'Object', stat: true }, {
  iterateKeys: function iterateKeys(object) {
    return new ObjectIterator(object, 'keys');
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/object-iterator":"06fe4776b1eb624ab01a58c4442dc56a"}],"fd729fba0ffcb236f9fb29e383193e20":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var ObjectIterator = require('../internals/object-iterator');

// `Object.iterateValues` method
// https://github.com/tc39/proposal-object-iteration
$({ target: 'Object', stat: true }, {
  iterateValues: function iterateValues(object) {
    return new ObjectIterator(object, 'values');
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/object-iterator":"06fe4776b1eb624ab01a58c4442dc56a"}],"4619c203c40ca3a8626f1cd92b069f98":[function(require,module,exports) {
'use strict'; // https://github.com/tc39/proposal-observable

var $ = require('../internals/export');

var global = require('../internals/global');

var call = require('../internals/function-call');

var DESCRIPTORS = require('../internals/descriptors');

var setSpecies = require('../internals/set-species');

var aCallable = require('../internals/a-callable');

var isCallable = require('../internals/is-callable');

var isConstructor = require('../internals/is-constructor');

var anObject = require('../internals/an-object');

var isObject = require('../internals/is-object');

var anInstance = require('../internals/an-instance');

var defineProperty = require('../internals/object-define-property').f;

var redefine = require('../internals/redefine');

var redefineAll = require('../internals/redefine-all');

var getIterator = require('../internals/get-iterator');

var getMethod = require('../internals/get-method');

var iterate = require('../internals/iterate');

var hostReportErrors = require('../internals/host-report-errors');

var wellKnownSymbol = require('../internals/well-known-symbol');

var InternalStateModule = require('../internals/internal-state');

var $$OBSERVABLE = wellKnownSymbol('observable');
var OBSERVABLE = 'Observable';
var SUBSCRIPTION = 'Subscription';
var SUBSCRIPTION_OBSERVER = 'SubscriptionObserver';
var getterFor = InternalStateModule.getterFor;
var setInternalState = InternalStateModule.set;
var getObservableInternalState = getterFor(OBSERVABLE);
var getSubscriptionInternalState = getterFor(SUBSCRIPTION);
var getSubscriptionObserverInternalState = getterFor(SUBSCRIPTION_OBSERVER);
var Array = global.Array;

var SubscriptionState = function (observer) {
  this.observer = anObject(observer);
  this.cleanup = undefined;
  this.subscriptionObserver = undefined;
};

SubscriptionState.prototype = {
  type: SUBSCRIPTION,
  clean: function () {
    var cleanup = this.cleanup;

    if (cleanup) {
      this.cleanup = undefined;

      try {
        cleanup();
      } catch (error) {
        hostReportErrors(error);
      }
    }
  },
  close: function () {
    if (!DESCRIPTORS) {
      var subscription = this.facade;
      var subscriptionObserver = this.subscriptionObserver;
      subscription.closed = true;
      if (subscriptionObserver) subscriptionObserver.closed = true;
    }

    this.observer = undefined;
  },
  isClosed: function () {
    return this.observer === undefined;
  }
};

var Subscription = function (observer, subscriber) {
  var subscriptionState = setInternalState(this, new SubscriptionState(observer));
  var start;
  if (!DESCRIPTORS) this.closed = false;

  try {
    if (start = getMethod(observer, 'start')) call(start, observer, this);
  } catch (error) {
    hostReportErrors(error);
  }

  if (subscriptionState.isClosed()) return;
  var subscriptionObserver = subscriptionState.subscriptionObserver = new SubscriptionObserver(subscriptionState);

  try {
    var cleanup = subscriber(subscriptionObserver);
    var subscription = cleanup;
    if (cleanup != null) subscriptionState.cleanup = isCallable(cleanup.unsubscribe) ? function () {
      subscription.unsubscribe();
    } : aCallable(cleanup);
  } catch (error) {
    subscriptionObserver.error(error);
    return;
  }

  if (subscriptionState.isClosed()) subscriptionState.clean();
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() {
    var subscriptionState = getSubscriptionInternalState(this);

    if (!subscriptionState.isClosed()) {
      subscriptionState.close();
      subscriptionState.clean();
    }
  }
});
if (DESCRIPTORS) defineProperty(Subscription.prototype, 'closed', {
  configurable: true,
  get: function () {
    return getSubscriptionInternalState(this).isClosed();
  }
});

var SubscriptionObserver = function (subscriptionState) {
  setInternalState(this, {
    type: SUBSCRIPTION_OBSERVER,
    subscriptionState: subscriptionState
  });
  if (!DESCRIPTORS) this.closed = false;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscriptionState = getSubscriptionObserverInternalState(this).subscriptionState;

    if (!subscriptionState.isClosed()) {
      var observer = subscriptionState.observer;

      try {
        var nextMethod = getMethod(observer, 'next');
        if (nextMethod) call(nextMethod, observer, value);
      } catch (error) {
        hostReportErrors(error);
      }
    }
  },
  error: function error(value) {
    var subscriptionState = getSubscriptionObserverInternalState(this).subscriptionState;

    if (!subscriptionState.isClosed()) {
      var observer = subscriptionState.observer;
      subscriptionState.close();

      try {
        var errorMethod = getMethod(observer, 'error');
        if (errorMethod) call(errorMethod, observer, value);else hostReportErrors(value);
      } catch (err) {
        hostReportErrors(err);
      }

      subscriptionState.clean();
    }
  },
  complete: function complete() {
    var subscriptionState = getSubscriptionObserverInternalState(this).subscriptionState;

    if (!subscriptionState.isClosed()) {
      var observer = subscriptionState.observer;
      subscriptionState.close();

      try {
        var completeMethod = getMethod(observer, 'complete');
        if (completeMethod) call(completeMethod, observer);
      } catch (error) {
        hostReportErrors(error);
      }

      subscriptionState.clean();
    }
  }
});
if (DESCRIPTORS) defineProperty(SubscriptionObserver.prototype, 'closed', {
  configurable: true,
  get: function () {
    return getSubscriptionObserverInternalState(this).subscriptionState.isClosed();
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, ObservablePrototype);
  setInternalState(this, {
    type: OBSERVABLE,
    subscriber: aCallable(subscriber)
  });
};

var ObservablePrototype = $Observable.prototype;
redefineAll(ObservablePrototype, {
  subscribe: function subscribe(observer) {
    var length = arguments.length;
    return new Subscription(isCallable(observer) ? {
      next: observer,
      error: length > 1 ? arguments[1] : undefined,
      complete: length > 2 ? arguments[2] : undefined
    } : isObject(observer) ? observer : {}, getObservableInternalState(this).subscriber);
  }
});
redefineAll($Observable, {
  from: function from(x) {
    var C = isConstructor(this) ? this : $Observable;
    var observableMethod = getMethod(anObject(x), $$OBSERVABLE);

    if (observableMethod) {
      var observable = anObject(call(observableMethod, x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }

    var iterator = getIterator(x);
    return new C(function (observer) {
      iterate(iterator, function (it, stop) {
        observer.next(it);
        if (observer.closed) return stop();
      }, {
        IS_ITERATOR: true,
        INTERRUPTED: true
      });
      observer.complete();
    });
  },
  of: function of() {
    var C = isConstructor(this) ? this : $Observable;
    var length = arguments.length;
    var items = Array(length);
    var index = 0;

    while (index < length) items[index] = arguments[index++];

    return new C(function (observer) {
      for (var i = 0; i < length; i++) {
        observer.next(items[i]);
        if (observer.closed) return;
      }

      observer.complete();
    });
  }
});
redefine(ObservablePrototype, $$OBSERVABLE, function () {
  return this;
});
$({
  global: true
}, {
  Observable: $Observable
});
setSpecies(OBSERVABLE);
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/set-species":"e3f4ec2b9d910d5e576300937f95e2c2","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/is-constructor":"119e842d0827f15b1b4e51c1ee9e98ea","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/is-object":"03244e745134af366d66b74456891052","../internals/an-instance":"8b0daff12bd798defdb69ae41eea7f5e","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/redefine-all":"ffd35f1bc6f8a9cf26e6fa0389f4748d","../internals/get-iterator":"95609b3cd4fe60efb5286ed1595b57b7","../internals/get-method":"5375a7fbf3e5e64eea2416cbbad034a2","../internals/iterate":"33b1bc22ce229618eb94623257686da2","../internals/host-report-errors":"1bd915932f7f2579da23ca321e45abae","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1"}],"ce2c93b36ed43e91d30492084af45c7d":[function(require,module,exports) {
// TODO: Remove from `core-js@4`
require('../modules/es.promise.all-settled.js');

},{"../modules/es.promise.all-settled.js":"621182c678695785378ee5b1e054e399"}],"8a8c25096677b665898b71d20996c28e":[function(require,module,exports) {
// TODO: Remove from `core-js@4`
require('../modules/es.promise.any');

},{"../modules/es.promise.any":"80e02179f1b001ad0b7a998fed97a14c"}],"1ee10f6b9e5d4ef3434491490271f493":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');

// `Promise.try` method
// https://github.com/tc39/proposal-promise-try
$({ target: 'Promise', stat: true }, {
  'try': function (callbackfn) {
    var promiseCapability = newPromiseCapabilityModule.f(this);
    var result = perform(callbackfn);
    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
    return promiseCapability.promise;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/new-promise-capability":"783edb12ed346451e3c6474af85a7205","../internals/perform":"d2a4b5532265ab509ea6e706d3e006e3"}],"1bd3a67d27ec0a95da57f66e8e503245":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var toMetadataKey = ReflectMetadataModule.toKey;
var ordinaryDefineOwnMetadata = ReflectMetadataModule.set;

// `Reflect.defineMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  defineMetadata: function defineMetadata(metadataKey, metadataValue, target /* , targetKey */) {
    var targetKey = arguments.length < 4 ? undefined : toMetadataKey(arguments[3]);
    ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), targetKey);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/reflect-metadata":"45fb1a102bb50c178b6f8b5e8688ccf0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"45fb1a102bb50c178b6f8b5e8688ccf0":[function(require,module,exports) {
// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
require('../modules/es.map');
require('../modules/es.weak-map');
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var shared = require('../internals/shared');

var Map = getBuiltIn('Map');
var WeakMap = getBuiltIn('WeakMap');
var push = uncurryThis([].push);

var metadata = shared('metadata');
var store = metadata.store || (metadata.store = new WeakMap());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};

var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};

var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};

var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};

var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { push(keys, key); });
  return keys;
};

var toMetadataKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};

module.exports = {
  store: store,
  getMap: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  toKey: toMetadataKey
};

},{"../modules/es.map":"21e6c4cb86e4f5adaeb26fb92f746ee3","../modules/es.weak-map":"9e5ce70ecf8ba1c5c8a8c8442c7aea1b","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/shared":"1950ed6cf8f0dece2a998d60590e9098"}],"cbb88665b87044210e424394a3c73e33":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var toMetadataKey = ReflectMetadataModule.toKey;
var getOrCreateMetadataMap = ReflectMetadataModule.getMap;
var store = ReflectMetadataModule.store;

// `Reflect.deleteMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
    if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
    if (metadataMap.size) return true;
    var targetMetadata = store.get(target);
    targetMetadata['delete'](targetKey);
    return !!targetMetadata.size || store['delete'](target);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/reflect-metadata":"45fb1a102bb50c178b6f8b5e8688ccf0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"0194b0d28cd7ca7e7850f6f5bd06f865":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');
var getPrototypeOf = require('../internals/object-get-prototype-of');

var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
var ordinaryGetOwnMetadata = ReflectMetadataModule.get;
var toMetadataKey = ReflectMetadataModule.toKey;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

// `Reflect.getMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryGetMetadata(metadataKey, anObject(target), targetKey);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/reflect-metadata":"45fb1a102bb50c178b6f8b5e8688ccf0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf"}],"bc7aedae3ee2d96a4fbcfba440efeca7":[function(require,module,exports) {
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var $arrayUniqueBy = require('../internals/array-unique-by');

var arrayUniqueBy = uncurryThis($arrayUniqueBy);
var concat = uncurryThis([].concat);
var ordinaryOwnMetadataKeys = ReflectMetadataModule.keys;
var toMetadataKey = ReflectMetadataModule.toKey;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? arrayUniqueBy(concat(oKeys, pKeys)) : pKeys : oKeys;
};

// `Reflect.getMetadataKeys` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
    var targetKey = arguments.length < 2 ? undefined : toMetadataKey(arguments[1]);
    return ordinaryMetadataKeys(anObject(target), targetKey);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/reflect-metadata":"45fb1a102bb50c178b6f8b5e8688ccf0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf","../internals/array-unique-by":"8f2adb3f801ded3865f6c92d48d0331c"}],"17abc189563de7d28116af14c5199448":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var ordinaryGetOwnMetadata = ReflectMetadataModule.get;
var toMetadataKey = ReflectMetadataModule.toKey;

// `Reflect.getOwnMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryGetOwnMetadata(metadataKey, anObject(target), targetKey);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/reflect-metadata":"45fb1a102bb50c178b6f8b5e8688ccf0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"dee1a5201221f06e5e86ab8ad66042a0":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var ordinaryOwnMetadataKeys = ReflectMetadataModule.keys;
var toMetadataKey = ReflectMetadataModule.toKey;

// `Reflect.getOwnMetadataKeys` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
    var targetKey = arguments.length < 2 ? undefined : toMetadataKey(arguments[1]);
    return ordinaryOwnMetadataKeys(anObject(target), targetKey);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/reflect-metadata":"45fb1a102bb50c178b6f8b5e8688ccf0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"54b7e0cd0443c999fabe7e5b588331be":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');
var getPrototypeOf = require('../internals/object-get-prototype-of');

var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
var toMetadataKey = ReflectMetadataModule.toKey;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

// `Reflect.hasMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryHasMetadata(metadataKey, anObject(target), targetKey);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/reflect-metadata":"45fb1a102bb50c178b6f8b5e8688ccf0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/object-get-prototype-of":"50d059706e0afa285234c1608d9f7cbf"}],"ffad1d50b90acef3eca87bc05e93cedf":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
var toMetadataKey = ReflectMetadataModule.toKey;

// `Reflect.hasOwnMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryHasOwnMetadata(metadataKey, anObject(target), targetKey);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/reflect-metadata":"45fb1a102bb50c178b6f8b5e8688ccf0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"24b40016d77a2791bbc414e8624ebe40":[function(require,module,exports) {
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var toMetadataKey = ReflectMetadataModule.toKey;
var ordinaryDefineOwnMetadata = ReflectMetadataModule.set;

// `Reflect.metadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  metadata: function metadata(metadataKey, metadataValue) {
    return function decorator(target, key) {
      ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetadataKey(key));
    };
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/reflect-metadata":"45fb1a102bb50c178b6f8b5e8688ccf0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"049b81be7812083e3011118f4ce9043e":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var addAll = require('../internals/collection-add-all');

// `Set.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  addAll: addAll
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/collection-add-all":"4f891516e3bce75989f7c8a28464e2e7"}],"4f891516e3bce75989f7c8a28464e2e7":[function(require,module,exports) {
'use strict';
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');

// https://github.com/tc39/collection-methods
module.exports = function addAll(/* ...elements */) {
  var set = anObject(this);
  var adder = aCallable(set.add);
  for (var k = 0, len = arguments.length; k < len; k++) {
    call(adder, set, arguments[k]);
  }
  return set;
};

},{"../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"4e4a136760a56fdf2747fcf0301ccec6":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var deleteAll = require('../internals/collection-delete-all');

// `Set.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  deleteAll: deleteAll
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/collection-delete-all":"e2095071a9eb94c0a435d139a9ea21ad"}],"f2ec2a892bf656d59f1fb385f58641de":[function(require,module,exports) {
'use strict';
var IS_PURE = require('../internals/is-pure');
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var speciesConstructor = require('../internals/species-constructor');
var iterate = require('../internals/iterate');

// `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  difference: function difference(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
    var remover = aCallable(newSet['delete']);
    iterate(iterable, function (value) {
      call(remover, newSet, value);
    });
    return newSet;
  }
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/species-constructor":"a110df2a5900fb30b4239748c46982d8","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"1f08231ecd5744d1d0a3808bbde44f63":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var bind = require('../internals/function-bind-context');
var getSetIterator = require('../internals/get-set-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  every: function every(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return !iterate(iterator, function (value, stop) {
      if (!boundFunction(value, value, set)) return stop();
    }, { IS_ITERATOR: true, INTERRUPTED: true }).stopped;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/get-set-iterator":"1fe82dc7004d8404d72c2c052020f53c","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"1fe82dc7004d8404d72c2c052020f53c":[function(require,module,exports) {
var call = require('../internals/function-call');

module.exports = function (it) {
  // eslint-disable-next-line es/no-set -- safe
  return call(Set.prototype.values, it);
};

},{"../internals/function-call":"74736a18012731e2548e8322d30daf97"}],"07205cd5e676c569f2e30e747c06fe91":[function(require,module,exports) {
'use strict';
var IS_PURE = require('../internals/is-pure');
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var bind = require('../internals/function-bind-context');
var speciesConstructor = require('../internals/species-constructor');
var getSetIterator = require('../internals/get-set-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  filter: function filter(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
    var adder = aCallable(newSet.add);
    iterate(iterator, function (value) {
      if (boundFunction(value, value, set)) call(adder, newSet, value);
    }, { IS_ITERATOR: true });
    return newSet;
  }
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/species-constructor":"a110df2a5900fb30b4239748c46982d8","../internals/get-set-iterator":"1fe82dc7004d8404d72c2c052020f53c","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"e4e48aed2502949cebcf1d7f3b24d09c":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var bind = require('../internals/function-bind-context');
var getSetIterator = require('../internals/get-set-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  find: function find(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(iterator, function (value, stop) {
      if (boundFunction(value, value, set)) return stop(value);
    }, { IS_ITERATOR: true, INTERRUPTED: true }).result;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/get-set-iterator":"1fe82dc7004d8404d72c2c052020f53c","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"e1ce825ea17ac0c54780f322bdab2f82":[function(require,module,exports) {
var $ = require('../internals/export');
var from = require('../internals/collection-from');

// `Set.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
$({ target: 'Set', stat: true }, {
  from: from
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/collection-from":"af8d9110c9398ad031999bb3855ddf1b"}],"d3bf87f3ebf1ea6dcee9fd5dfa4175cc":[function(require,module,exports) {
'use strict';
var IS_PURE = require('../internals/is-pure');
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var speciesConstructor = require('../internals/species-constructor');
var iterate = require('../internals/iterate');

// `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  intersection: function intersection(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
    var hasCheck = aCallable(set.has);
    var adder = aCallable(newSet.add);
    iterate(iterable, function (value) {
      if (call(hasCheck, set, value)) call(adder, newSet, value);
    });
    return newSet;
  }
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/species-constructor":"a110df2a5900fb30b4239748c46982d8","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"73437ef5d4499909a4ddd4178b0e6daf":[function(require,module,exports) {
'use strict';
var IS_PURE = require('../internals/is-pure');
var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var iterate = require('../internals/iterate');

// `Set.prototype.isDisjointFrom` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  isDisjointFrom: function isDisjointFrom(iterable) {
    var set = anObject(this);
    var hasCheck = aCallable(set.has);
    return !iterate(iterable, function (value, stop) {
      if (call(hasCheck, set, value) === true) return stop();
    }, { INTERRUPTED: true }).stopped;
  }
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"6bbe51bbb25907a399b88ad005d526bb":[function(require,module,exports) {
'use strict';
var IS_PURE = require('../internals/is-pure');
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var isCallable = require('../internals/is-callable');
var anObject = require('../internals/an-object');
var getIterator = require('../internals/get-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.isSubsetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  isSubsetOf: function isSubsetOf(iterable) {
    var iterator = getIterator(this);
    var otherSet = anObject(iterable);
    var hasCheck = otherSet.has;
    if (!isCallable(hasCheck)) {
      otherSet = new (getBuiltIn('Set'))(iterable);
      hasCheck = aCallable(otherSet.has);
    }
    return !iterate(iterator, function (value, stop) {
      if (call(hasCheck, otherSet, value) === false) return stop();
    }, { IS_ITERATOR: true, INTERRUPTED: true }).stopped;
  }
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/get-iterator":"95609b3cd4fe60efb5286ed1595b57b7","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"975549506783106c57614ba3722eb6a7":[function(require,module,exports) {
'use strict';
var IS_PURE = require('../internals/is-pure');
var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var iterate = require('../internals/iterate');

// `Set.prototype.isSupersetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  isSupersetOf: function isSupersetOf(iterable) {
    var set = anObject(this);
    var hasCheck = aCallable(set.has);
    return !iterate(iterable, function (value, stop) {
      if (call(hasCheck, set, value) === false) return stop();
    }, { INTERRUPTED: true }).stopped;
  }
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"dc92f14771a3f9269c3653fbb1dbf258":[function(require,module,exports) {
'use strict';
var IS_PURE = require('../internals/is-pure');
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var anObject = require('../internals/an-object');
var toString = require('../internals/to-string');
var getSetIterator = require('../internals/get-set-iterator');
var iterate = require('../internals/iterate');

var arrayJoin = uncurryThis([].join);
var push = [].push;

// `Set.prototype.join` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  join: function join(separator) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var sep = separator === undefined ? ',' : toString(separator);
    var result = [];
    iterate(iterator, push, { that: result, IS_ITERATOR: true });
    return arrayJoin(result, sep);
  }
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/get-set-iterator":"1fe82dc7004d8404d72c2c052020f53c","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"12f58c7fb07aa345ad43a40d45fbd577":[function(require,module,exports) {
'use strict';
var IS_PURE = require('../internals/is-pure');
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var bind = require('../internals/function-bind-context');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var speciesConstructor = require('../internals/species-constructor');
var getSetIterator = require('../internals/get-set-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.map` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  map: function map(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
    var adder = aCallable(newSet.add);
    iterate(iterator, function (value) {
      call(adder, newSet, boundFunction(value, value, set));
    }, { IS_ITERATOR: true });
    return newSet;
  }
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/species-constructor":"a110df2a5900fb30b4239748c46982d8","../internals/get-set-iterator":"1fe82dc7004d8404d72c2c052020f53c","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"0d37cc47558d037b25dfcaf802140a4f":[function(require,module,exports) {
var $ = require('../internals/export');
var of = require('../internals/collection-of');

// `Set.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
$({ target: 'Set', stat: true }, {
  of: of
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/collection-of":"647624bb35fa71634a308343780c4842"}],"b48d6c7708e8be0cb91003cf5380fe48":[function(require,module,exports) {
'use strict';

var $ = require('../internals/export');

var global = require('../internals/global');

var IS_PURE = require('../internals/is-pure');

var aCallable = require('../internals/a-callable');

var anObject = require('../internals/an-object');

var getSetIterator = require('../internals/get-set-iterator');

var iterate = require('../internals/iterate');

var TypeError = global.TypeError; // `Set.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods

$({
  target: 'Set',
  proto: true,
  real: true,
  forced: IS_PURE
}, {
  reduce: function reduce(callbackfn
  /* , initialValue */
  ) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aCallable(callbackfn);
    iterate(iterator, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, value, set);
      }
    }, {
      IS_ITERATOR: true
    });
    if (noInitial) throw TypeError('Reduce of empty set with no initial value');
    return accumulator;
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/get-set-iterator":"1fe82dc7004d8404d72c2c052020f53c","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"8da5844255fce2792c23e468a4f2cbea":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var anObject = require('../internals/an-object');
var bind = require('../internals/function-bind-context');
var getSetIterator = require('../internals/get-set-iterator');
var iterate = require('../internals/iterate');

// `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  some: function some(callbackfn /* , thisArg */) {
    var set = anObject(this);
    var iterator = getSetIterator(set);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(iterator, function (value, stop) {
      if (boundFunction(value, value, set)) return stop();
    }, { IS_ITERATOR: true, INTERRUPTED: true }).stopped;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/get-set-iterator":"1fe82dc7004d8404d72c2c052020f53c","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"f3f1fd3fedba04200956631abc0c4365":[function(require,module,exports) {
'use strict';
var IS_PURE = require('../internals/is-pure');
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var speciesConstructor = require('../internals/species-constructor');
var iterate = require('../internals/iterate');

// `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  symmetricDifference: function symmetricDifference(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
    var remover = aCallable(newSet['delete']);
    var adder = aCallable(newSet.add);
    iterate(iterable, function (value) {
      call(remover, newSet, value) || call(adder, newSet, value);
    });
    return newSet;
  }
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/species-constructor":"a110df2a5900fb30b4239748c46982d8","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"db0c06ca0bf84b6a2cdbd93e6640d4b8":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var getBuiltIn = require('../internals/get-built-in');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var speciesConstructor = require('../internals/species-constructor');
var iterate = require('../internals/iterate');

// `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods
$({ target: 'Set', proto: true, real: true, forced: IS_PURE }, {
  union: function union(iterable) {
    var set = anObject(this);
    var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
    iterate(iterable, aCallable(newSet.add), { that: newSet });
    return newSet;
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/species-constructor":"a110df2a5900fb30b4239748c46982d8","../internals/iterate":"33b1bc22ce229618eb94623257686da2"}],"05842a6af50c421b0b947f461d2973f9":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var charAt = require('../internals/string-multibyte').charAt;
var fails = require('../internals/fails');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toString = require('../internals/to-string');

var FORCED = fails(function () {
  return '𠮷'.at(-2) !== '𠮷';
});

// `String.prototype.at` method
// https://github.com/mathiasbynens/String.prototype.at
$({ target: 'String', proto: true, forced: FORCED }, {
  at: function at(index) {
    var S = toString(requireObjectCoercible(this));
    var len = S.length;
    var relativeIndex = toIntegerOrInfinity(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : charAt(S, k);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/string-multibyte":"2324ad16ce38cbfde2a3a75c67697ac1","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37","../internals/to-integer-or-infinity":"25e1ba8089f537c8bc0aca5bea74579f","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77"}],"22677fb8342f13ff14829f7dada0cfc6":[function(require,module,exports) {
var $ = require('../internals/export');

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var toIndexedObject = require('../internals/to-indexed-object');

var toString = require('../internals/to-string');

var lengthOfArrayLike = require('../internals/length-of-array-like');

var TypeError = global.TypeError;
var ArrayPrototype = Array.prototype;
var push = uncurryThis(ArrayPrototype.push);
var join = uncurryThis(ArrayPrototype.join); // `String.cooked` method
// https://github.com/tc39/proposal-string-cooked

$({
  target: 'String',
  stat: true
}, {
  cooked: function cooked(template
  /* , ...substitutions */
  ) {
    var cookedTemplate = toIndexedObject(template);
    var literalSegments = lengthOfArrayLike(cookedTemplate);
    var argumentsLength = arguments.length;
    var elements = [];
    var i = 0;

    while (literalSegments > i) {
      var nextVal = cookedTemplate[i++];
      if (nextVal === undefined) throw TypeError('Incorrect template');
      push(elements, toString(nextVal));
      if (i === literalSegments) return join(elements, '');
      if (i < argumentsLength) push(elements, toString(arguments[i]));
    }
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666"}],"d8329ad3762d403c44af756979748303":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toString = require('../internals/to-string');
var InternalStateModule = require('../internals/internal-state');
var StringMultibyteModule = require('../internals/string-multibyte');

var codeAt = StringMultibyteModule.codeAt;
var charAt = StringMultibyteModule.charAt;
var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// TODO: unify with String#@@iterator
var $StringIterator = createIteratorConstructor(function StringIterator(string) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: string,
    index: 0
  });
}, 'String', function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: { codePoint: codeAt(point, 0), position: index }, done: false };
});

// `String.prototype.codePoints` method
// https://github.com/tc39/proposal-string-prototype-codepoints
$({ target: 'String', proto: true }, {
  codePoints: function codePoints() {
    return new $StringIterator(toString(requireObjectCoercible(this)));
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/create-iterator-constructor":"b9bab68ecd62fef0c0fd01853566a2cf","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/string-multibyte":"2324ad16ce38cbfde2a3a75c67697ac1"}],"8390f8fd3036e103f670105703e8d91a":[function(require,module,exports) {
// TODO: Remove from `core-js@4`
require('../modules/es.string.match-all');

},{"../modules/es.string.match-all":"d0a02303903685146f0fba725a53dd98"}],"ded5d2c1244da71d8ff27a7afa7a3a98":[function(require,module,exports) {
// TODO: Remove from `core-js@4`
require('../modules/es.string.replace-all');

},{"../modules/es.string.replace-all":"845b3fa8d94b5f91b0f72276673d793c"}],"751525ca09d5470e0b6169b244ed5396":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.asyncDispose` well-known symbol
// https://github.com/tc39/proposal-using-statement
defineWellKnownSymbol('asyncDispose');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"86debbc2209a74666dc305ce8e05cd9c":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.dispose` well-known symbol
// https://github.com/tc39/proposal-using-statement
defineWellKnownSymbol('dispose');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"e4f22e36aff47474f379d78110763b90":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.matcher` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol('matcher');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"c47049c911b6c032f6c0c0b1ba63fbc2":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.metadata` well-known symbol
// https://github.com/tc39/proposal-decorators
defineWellKnownSymbol('metadata');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"6687aef5ebaf0f6effbcf247f9aa0a69":[function(require,module,exports) {
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.observable` well-known symbol
// https://github.com/tc39/proposal-observable
defineWellKnownSymbol('observable');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"abe3695e9d6b4c4bbcf331aee1c27c33":[function(require,module,exports) {
// TODO: remove from `core-js@4`
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.patternMatch` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol('patternMatch');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"7f4b4da2472b15f42393d8870df757ef":[function(require,module,exports) {
// TODO: remove from `core-js@4`
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

defineWellKnownSymbol('replaceAll');

},{"../internals/define-well-known-symbol":"bf4c8f5e34fed6bd24b3ecceb393fa39"}],"32f8dc3020a162c372011e1bb8723410":[function(require,module,exports) {
'use strict';
// TODO: Remove from `core-js@4`
var getBuiltIn = require('../internals/get-built-in');
var aConstructor = require('../internals/a-constructor');
var arrayFromAsync = require('../internals/array-from-async');
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = require('../internals/typed-array-constructors-require-wrappers');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var arrayFromConstructorAndList = require('../internals/array-from-constructor-and-list');

var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayStaticMethod = ArrayBufferViewCore.exportTypedArrayStaticMethod;

// `%TypedArray%.fromAsync` method
// https://github.com/tc39/proposal-array-from-async
exportTypedArrayStaticMethod('fromAsync', function fromAsync(asyncItems /* , mapfn = undefined, thisArg = undefined */) {
  var C = this;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var thisArg = argumentsLength > 2 ? arguments[2] : undefined;
  return new (getBuiltIn('Promise'))(function (resolve) {
    aConstructor(C);
    resolve(arrayFromAsync(asyncItems, mapfn, thisArg));
  }).then(function (list) {
    return arrayFromConstructorAndList(aTypedArrayConstructor(C), list);
  });
}, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/a-constructor":"68a3572cb2f4921c4818116046759501","../internals/array-from-async":"154c54e3348318276217ba9603c0af79","../internals/typed-array-constructors-require-wrappers":"c18c6fa7d7a6ea266deebfa9f42416ec","../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-from-constructor-and-list":"921f9e3b063d1f99d91c6bcb5737b68e"}],"0e25b896c9f47e3c1bf8202138901c83":[function(require,module,exports) {
// TODO: Remove from `core-js@4`
require('../modules/es.typed-array.at');

},{"../modules/es.typed-array.at":"797f3e2dbbd581868c09166170c2b810"}],"6538070cbe39011252cec7572e66a7a9":[function(require,module,exports) {
'use strict';
// TODO: Remove from `core-js@4`
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $filterReject = require('../internals/array-iteration').filterReject;
var fromSpeciesAndList = require('../internals/typed-array-from-species-and-list');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filterOut` method
// https://github.com/tc39/proposal-array-filtering
exportTypedArrayMethod('filterOut', function filterOut(callbackfn /* , thisArg */) {
  var list = $filterReject(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  return fromSpeciesAndList(this, list);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe","../internals/typed-array-from-species-and-list":"e9a19380fa8f88a2670ead0da7293725"}],"7280d91f94dfa7ec976c4fb8a75cd199":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $filterReject = require('../internals/array-iteration').filterReject;
var fromSpeciesAndList = require('../internals/typed-array-from-species-and-list');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filterReject` method
// https://github.com/tc39/proposal-array-filtering
exportTypedArrayMethod('filterReject', function filterReject(callbackfn /* , thisArg */) {
  var list = $filterReject(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  return fromSpeciesAndList(this, list);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-iteration":"5e382939caea5c6e569307d984b5dbfe","../internals/typed-array-from-species-and-list":"e9a19380fa8f88a2670ead0da7293725"}],"19433faa16d78d0a326271b34d5b1cf7":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $findLast = require('../internals/array-iteration-from-last').findLast;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLast` method
// https://github.com/tc39/proposal-array-find-from-last
exportTypedArrayMethod('findLast', function findLast(predicate /* , thisArg */) {
  return $findLast(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-iteration-from-last":"2818ed63b927f6b0231452ed12d83d76"}],"f66d5ed8750e87ff852d2f82cadd0a95":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $findLastIndex = require('../internals/array-iteration-from-last').findLastIndex;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLastIndex` method
// https://github.com/tc39/proposal-array-find-from-last
exportTypedArrayMethod('findLastIndex', function findLastIndex(predicate /* , thisArg */) {
  return $findLastIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-iteration-from-last":"2818ed63b927f6b0231452ed12d83d76"}],"a530d53336cdb5c402ed2d84e960771d":[function(require,module,exports) {
'use strict';
// TODO: Remove from `core-js@4`
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $groupBy = require('../internals/array-group-by');
var typedArraySpeciesConstructor = require('../internals/typed-array-species-constructor');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.groupBy` method
// https://github.com/tc39/proposal-array-grouping
exportTypedArrayMethod('groupBy', function groupBy(callbackfn /* , thisArg */) {
  var thisArg = arguments.length > 1 ? arguments[1] : undefined;
  return $groupBy(aTypedArray(this), callbackfn, thisArg, typedArraySpeciesConstructor);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-group-by":"310d13273f5789d5b6b1cb097120a230","../internals/typed-array-species-constructor":"abc0c9d5e888da50b154a206613c0ab5"}],"9371e414ed33971bfee47a3e9c02a6ca":[function(require,module,exports) {
'use strict';
var arrayToReversed = require('../internals/array-to-reversed');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;

// `%TypedArray%.prototype.toReversed` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
exportTypedArrayMethod('toReversed', function toReversed() {
  return arrayToReversed(aTypedArray(this), this[TYPED_ARRAY_CONSTRUCTOR]);
});

},{"../internals/array-to-reversed":"4ef57a2850d315617cedecf1aa99fd5d","../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb"}],"20bcd76d8efb309a47985ee3656addb6":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');
var arrayFromConstructorAndList = require('../internals/array-from-constructor-and-list');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;
var sort = uncurryThis(ArrayBufferViewCore.TypedArrayPrototype.sort);

// `%TypedArray%.prototype.toSorted` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toSorted
exportTypedArrayMethod('toSorted', function toSorted(compareFn) {
  if (compareFn !== undefined) aCallable(compareFn);
  var O = aTypedArray(this);
  var A = arrayFromConstructorAndList(O[TYPED_ARRAY_CONSTRUCTOR], O);
  return sort(A, compareFn);
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/a-callable":"d4f749998260ddb7816916a3fe6d4660","../internals/array-from-constructor-and-list":"921f9e3b063d1f99d91c6bcb5737b68e"}],"4ecd6b165079a68fc854a598d373a0f5":[function(require,module,exports) {
'use strict';
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var arraySlice = require('../internals/array-slice');
var arrayToSpliced = require('../internals/array-to-spliced');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;

// `%TypedArray%.prototype.toSpliced` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toSpliced
// eslint-disable-next-line no-unused-vars -- required for .length
exportTypedArrayMethod('toSpliced', function toSpliced(start, deleteCount /* , ...items */) {
  return arrayToSpliced(aTypedArray(this), this[TYPED_ARRAY_CONSTRUCTOR], arraySlice(arguments));
});

},{"../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-slice":"d58518bc0d77fd7d4bbb2d854257bf40","../internals/array-to-spliced":"dae53105f19d259c09b5a164cb51dcbb"}],"995de8b29be2bee5ace8eeea50c8da44":[function(require,module,exports) {
'use strict';
var uncurryThis = require('../internals/function-uncurry-this');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');
var $arrayUniqueBy = require('../internals/array-unique-by');
var fromSpeciesAndList = require('../internals/typed-array-from-species-and-list');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var arrayUniqueBy = uncurryThis($arrayUniqueBy);

// `%TypedArray%.prototype.uniqueBy` method
// https://github.com/tc39/proposal-array-unique
exportTypedArrayMethod('uniqueBy', function uniqueBy(resolver) {
  return fromSpeciesAndList(this, arrayUniqueBy(aTypedArray(this), resolver));
});

},{"../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb","../internals/array-unique-by":"8f2adb3f801ded3865f6c92d48d0331c","../internals/typed-array-from-species-and-list":"e9a19380fa8f88a2670ead0da7293725"}],"1ec0d3636a54329e1f6fcb18ee73a463":[function(require,module,exports) {
'use strict';
var arrayWith = require('../internals/array-with');
var ArrayBufferViewCore = require('../internals/array-buffer-view-core');

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;

// `%TypedArray%.prototype.with` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
exportTypedArrayMethod('with', { 'with': function (index, value) {
  return arrayWith(aTypedArray(this), this[TYPED_ARRAY_CONSTRUCTOR], index, value);
} }['with']);

},{"../internals/array-with":"92dee620654efb37b099461363648eff","../internals/array-buffer-view-core":"1ec92502c86abde7ba5eb9b6cea40afb"}],"26710ca0ada8370ec43570dee4622252":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var deleteAll = require('../internals/collection-delete-all');

// `WeakMap.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'WeakMap', proto: true, real: true, forced: IS_PURE }, {
  deleteAll: deleteAll
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/collection-delete-all":"e2095071a9eb94c0a435d139a9ea21ad"}],"4aaf61c096f4103057071eb4181c5737":[function(require,module,exports) {
var $ = require('../internals/export');
var from = require('../internals/collection-from');

// `WeakMap.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
$({ target: 'WeakMap', stat: true }, {
  from: from
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/collection-from":"af8d9110c9398ad031999bb3855ddf1b"}],"f8697f04f830deca50cce4e2075f44f7":[function(require,module,exports) {
var $ = require('../internals/export');
var of = require('../internals/collection-of');

// `WeakMap.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
$({ target: 'WeakMap', stat: true }, {
  of: of
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/collection-of":"647624bb35fa71634a308343780c4842"}],"dc699c0aa47ef12af422aa476f4dbb07":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var emplace = require('../internals/map-emplace');

// `WeakMap.prototype.emplace` method
// https://github.com/tc39/proposal-upsert
$({ target: 'WeakMap', proto: true, real: true, forced: IS_PURE }, {
  emplace: emplace
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/map-emplace":"fd7eec2ed80b3675e641a7e23c8e86c8"}],"098804f5583acffcf7f19b7c9e4013cf":[function(require,module,exports) {
'use strict';
// TODO: remove from `core-js@4`
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var upsert = require('../internals/map-upsert');

// `WeakMap.prototype.upsert` method (replaced by `WeakMap.prototype.emplace`)
// https://github.com/tc39/proposal-upsert
$({ target: 'WeakMap', proto: true, real: true, forced: IS_PURE }, {
  upsert: upsert
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/map-upsert":"2dcf282e3ce272eef7faf906d095b85a"}],"1a445d77b9803ff82ff11d6376361c30":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var addAll = require('../internals/collection-add-all');

// `WeakSet.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'WeakSet', proto: true, real: true, forced: IS_PURE }, {
  addAll: addAll
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/collection-add-all":"4f891516e3bce75989f7c8a28464e2e7"}],"6c7ac37ea9bfcab74238241ce7909e89":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var deleteAll = require('../internals/collection-delete-all');

// `WeakSet.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'WeakSet', proto: true, real: true, forced: IS_PURE }, {
  deleteAll: deleteAll
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/collection-delete-all":"e2095071a9eb94c0a435d139a9ea21ad"}],"cab93045b4d3c97a57324f1c341aa300":[function(require,module,exports) {
var $ = require('../internals/export');
var from = require('../internals/collection-from');

// `WeakSet.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
$({ target: 'WeakSet', stat: true }, {
  from: from
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/collection-from":"af8d9110c9398ad031999bb3855ddf1b"}],"51acff415ff701e4a79a8397c596cc91":[function(require,module,exports) {
var $ = require('../internals/export');
var of = require('../internals/collection-of');

// `WeakSet.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
$({ target: 'WeakSet', stat: true }, {
  of: of
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/collection-of":"647624bb35fa71634a308343780c4842"}],"83901c2800190b4304c42ab98d904769":[function(require,module,exports) {
var global = require('../internals/global');

var DOMIterables = require('../internals/dom-iterables');

var DOMTokenListPrototype = require('../internals/dom-token-list-prototype');

var forEach = require('../internals/array-for-each');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/dom-iterables":"3ee7a48b0c535065450a2042ac6b8e36","../internals/dom-token-list-prototype":"19315fe58a44aa4265c076bddf7bbb73","../internals/array-for-each":"d5e0746043fb311b5972ef1996e25d2b","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33"}],"3ee7a48b0c535065450a2042ac6b8e36":[function(require,module,exports) {
// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

},{}],"19315fe58a44aa4265c076bddf7bbb73":[function(require,module,exports) {
// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = require('../internals/document-create-element');

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;

},{"../internals/document-create-element":"cbe47a0c6cb67b97db834ad53049114a"}],"5ceaa0f401b64b2d4fc073e503968224":[function(require,module,exports) {
var global = require('../internals/global');

var DOMIterables = require('../internals/dom-iterables');

var DOMTokenListPrototype = require('../internals/dom-token-list-prototype');

var ArrayIteratorMethods = require('../modules/es.array.iterator');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }

    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }

    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/dom-iterables":"3ee7a48b0c535065450a2042ac6b8e36","../internals/dom-token-list-prototype":"19315fe58a44aa4265c076bddf7bbb73","../modules/es.array.iterator":"510aceb4694d90a939f4789a99a0ae3f","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4"}],"31924be6c47d6a2e1d07f88a3ff77d86":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var tryNodeRequire = require('../internals/try-node-require');
var getBuiltIn = require('../internals/get-built-in');
var fails = require('../internals/fails');
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var defineProperty = require('../internals/object-define-property').f;
var defineProperties = require('../internals/object-define-properties').f;
var redefine = require('../internals/redefine');
var hasOwn = require('../internals/has-own-property');
var anInstance = require('../internals/an-instance');
var anObject = require('../internals/an-object');
var errorToString = require('../internals/error-to-string');
var normalizeStringArgument = require('../internals/normalize-string-argument');
var DOMExceptionConstants = require('../internals/dom-exception-constants');
var clearErrorStack = require('../internals/clear-error-stack');
var InternalStateModule = require('../internals/internal-state');
var DESCRIPTORS = require('../internals/descriptors');
var IS_PURE = require('../internals/is-pure');

var DOM_EXCEPTION = 'DOMException';
var DATA_CLONE_ERR = 'DATA_CLONE_ERR';
var Error = getBuiltIn('Error');
// NodeJS < 17.0 does not expose `DOMException` to global
var NativeDOMException = getBuiltIn(DOM_EXCEPTION) || (function () {
  try {
    // NodeJS < 15.0 does not expose `MessageChannel` to global
    var MessageChannel = getBuiltIn('MessageChannel') || tryNodeRequire('worker_threads').MessageChannel;
    // eslint-disable-next-line es/no-weak-map, unicorn/require-post-message-target-origin -- safe
    new MessageChannel().port1.postMessage(new WeakMap());
  } catch (error) {
    if (error.name == DATA_CLONE_ERR && error.code == 25) return error.constructor;
  }
})();
var NativeDOMExceptionPrototype = NativeDOMException && NativeDOMException.prototype;
var ErrorPrototype = Error.prototype;
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(DOM_EXCEPTION);
var HAS_STACK = 'stack' in Error(DOM_EXCEPTION);

var codeFor = function (name) {
  return hasOwn(DOMExceptionConstants, name) && DOMExceptionConstants[name].m ? DOMExceptionConstants[name].c : 0;
};

var $DOMException = function DOMException() {
  anInstance(this, DOMExceptionPrototype);
  var argumentsLength = arguments.length;
  var message = normalizeStringArgument(argumentsLength < 1 ? undefined : arguments[0]);
  var name = normalizeStringArgument(argumentsLength < 2 ? undefined : arguments[1], 'Error');
  var code = codeFor(name);
  setInternalState(this, {
    type: DOM_EXCEPTION,
    name: name,
    message: message,
    code: code
  });
  if (!DESCRIPTORS) {
    this.name = name;
    this.message = message;
    this.code = code;
  }
  if (HAS_STACK) {
    var error = Error(message);
    error.name = DOM_EXCEPTION;
    defineProperty(this, 'stack', createPropertyDescriptor(1, clearErrorStack(error.stack, 1)));
  }
};

var DOMExceptionPrototype = $DOMException.prototype = create(ErrorPrototype);

var createGetterDescriptor = function (get) {
  return { enumerable: true, configurable: true, get: get };
};

var getterFor = function (key) {
  return createGetterDescriptor(function () {
    return getInternalState(this)[key];
  });
};

if (DESCRIPTORS) defineProperties(DOMExceptionPrototype, {
  name: getterFor('name'),
  message: getterFor('message'),
  code: getterFor('code')
});

defineProperty(DOMExceptionPrototype, 'constructor', createPropertyDescriptor(1, $DOMException));

// FF36- DOMException is a function, but can't be constructed
var INCORRECT_CONSTRUCTOR = fails(function () {
  return !(new NativeDOMException() instanceof Error);
});

// Safari 10.1 / Chrome 32- / IE8- DOMException.prototype.toString bugs
var INCORRECT_TO_STRING = INCORRECT_CONSTRUCTOR || fails(function () {
  return ErrorPrototype.toString !== errorToString || String(new NativeDOMException(1, 2)) !== '2: 1';
});

// Deno 1.6.3- DOMException.prototype.code just missed
var INCORRECT_CODE = INCORRECT_CONSTRUCTOR || fails(function () {
  return new NativeDOMException(1, 'DataCloneError').code !== 25;
});

// Deno 1.6.3- DOMException constants just missed
var MISSED_CONSTANTS = INCORRECT_CONSTRUCTOR
  || NativeDOMException[DATA_CLONE_ERR] !== 25
  || NativeDOMExceptionPrototype[DATA_CLONE_ERR] !== 25;

var FORCED_CONSTRUCTOR = IS_PURE ? INCORRECT_TO_STRING || INCORRECT_CODE || MISSED_CONSTANTS : INCORRECT_CONSTRUCTOR;

// `DOMException` constructor
// https://webidl.spec.whatwg.org/#idl-DOMException
$({ global: true, forced: FORCED_CONSTRUCTOR }, {
  DOMException: FORCED_CONSTRUCTOR ? $DOMException : NativeDOMException
});

var PolyfilledDOMException = getBuiltIn(DOM_EXCEPTION);
var PolyfilledDOMExceptionPrototype = PolyfilledDOMException.prototype;

if (INCORRECT_TO_STRING && (IS_PURE || NativeDOMException === PolyfilledDOMException)) {
  redefine(PolyfilledDOMExceptionPrototype, 'toString', errorToString);
}

if (INCORRECT_CODE && DESCRIPTORS && NativeDOMException === PolyfilledDOMException) {
  defineProperty(PolyfilledDOMExceptionPrototype, 'code', createGetterDescriptor(function () {
    return codeFor(anObject(this).name);
  }));
}

for (var key in DOMExceptionConstants) if (hasOwn(DOMExceptionConstants, key)) {
  var constant = DOMExceptionConstants[key];
  var constantName = constant.s;
  var descriptor = createPropertyDescriptor(6, constant.c);
  if (!hasOwn(PolyfilledDOMException, constantName)) {
    defineProperty(PolyfilledDOMException, constantName, descriptor);
  }
  if (!hasOwn(PolyfilledDOMExceptionPrototype, constantName)) {
    defineProperty(PolyfilledDOMExceptionPrototype, constantName, descriptor);
  }
}

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/try-node-require":"fd947cc1d4a2fe548fd9f1d6e9e91464","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/object-define-properties":"3ad53cd176876675b1da5125e4bdfafb","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/an-instance":"8b0daff12bd798defdb69ae41eea7f5e","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/error-to-string":"4e673dda1f72bee750e674107b061fe3","../internals/normalize-string-argument":"c3728bb8b61d038eac9a31269a6d58d5","../internals/dom-exception-constants":"e9ba59c173e90b95945d3645c7100bfb","../internals/clear-error-stack":"55cbf711a9133651a6b71274493547dd","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0"}],"fd947cc1d4a2fe548fd9f1d6e9e91464":[function(require,module,exports) {
var IS_NODE = require('../internals/engine-is-node');

module.exports = function (name) {
  try {
    // eslint-disable-next-line no-new-func -- safe
    if (IS_NODE) return Function('return require("' + name + '")')();
  } catch (error) { /* empty */ }
};

},{"../internals/engine-is-node":"42c67226e3ca045b9c35647f16133bfa"}],"e9ba59c173e90b95945d3645c7100bfb":[function(require,module,exports) {
module.exports = {
  IndexSizeError: { s: 'INDEX_SIZE_ERR', c: 1, m: 1 },
  DOMStringSizeError: { s: 'DOMSTRING_SIZE_ERR', c: 2, m: 0 },
  HierarchyRequestError: { s: 'HIERARCHY_REQUEST_ERR', c: 3, m: 1 },
  WrongDocumentError: { s: 'WRONG_DOCUMENT_ERR', c: 4, m: 1 },
  InvalidCharacterError: { s: 'INVALID_CHARACTER_ERR', c: 5, m: 1 },
  NoDataAllowedError: { s: 'NO_DATA_ALLOWED_ERR', c: 6, m: 0 },
  NoModificationAllowedError: { s: 'NO_MODIFICATION_ALLOWED_ERR', c: 7, m: 1 },
  NotFoundError: { s: 'NOT_FOUND_ERR', c: 8, m: 1 },
  NotSupportedError: { s: 'NOT_SUPPORTED_ERR', c: 9, m: 1 },
  InUseAttributeError: { s: 'INUSE_ATTRIBUTE_ERR', c: 10, m: 1 },
  InvalidStateError: { s: 'INVALID_STATE_ERR', c: 11, m: 1 },
  SyntaxError: { s: 'SYNTAX_ERR', c: 12, m: 1 },
  InvalidModificationError: { s: 'INVALID_MODIFICATION_ERR', c: 13, m: 1 },
  NamespaceError: { s: 'NAMESPACE_ERR', c: 14, m: 1 },
  InvalidAccessError: { s: 'INVALID_ACCESS_ERR', c: 15, m: 1 },
  ValidationError: { s: 'VALIDATION_ERR', c: 16, m: 0 },
  TypeMismatchError: { s: 'TYPE_MISMATCH_ERR', c: 17, m: 1 },
  SecurityError: { s: 'SECURITY_ERR', c: 18, m: 1 },
  NetworkError: { s: 'NETWORK_ERR', c: 19, m: 1 },
  AbortError: { s: 'ABORT_ERR', c: 20, m: 1 },
  URLMismatchError: { s: 'URL_MISMATCH_ERR', c: 21, m: 1 },
  QuotaExceededError: { s: 'QUOTA_EXCEEDED_ERR', c: 22, m: 1 },
  TimeoutError: { s: 'TIMEOUT_ERR', c: 23, m: 1 },
  InvalidNodeTypeError: { s: 'INVALID_NODE_TYPE_ERR', c: 24, m: 1 },
  DataCloneError: { s: 'DATA_CLONE_ERR', c: 25, m: 1 }
};

},{}],"251b8e50fafcb168f672a0e673f3ebae":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var defineProperty = require('../internals/object-define-property').f;
var hasOwn = require('../internals/has-own-property');
var anInstance = require('../internals/an-instance');
var inheritIfRequired = require('../internals/inherit-if-required');
var normalizeStringArgument = require('../internals/normalize-string-argument');
var DOMExceptionConstants = require('../internals/dom-exception-constants');
var clearErrorStack = require('../internals/clear-error-stack');
var IS_PURE = require('../internals/is-pure');

var DOM_EXCEPTION = 'DOMException';
var Error = getBuiltIn('Error');
var NativeDOMException = getBuiltIn(DOM_EXCEPTION);

var $DOMException = function DOMException() {
  anInstance(this, DOMExceptionPrototype);
  var argumentsLength = arguments.length;
  var message = normalizeStringArgument(argumentsLength < 1 ? undefined : arguments[0]);
  var name = normalizeStringArgument(argumentsLength < 2 ? undefined : arguments[1], 'Error');
  var that = new NativeDOMException(message, name);
  var error = Error(message);
  error.name = DOM_EXCEPTION;
  defineProperty(that, 'stack', createPropertyDescriptor(1, clearErrorStack(error.stack, 1)));
  inheritIfRequired(that, this, $DOMException);
  return that;
};

var DOMExceptionPrototype = $DOMException.prototype = NativeDOMException.prototype;

var ERROR_HAS_STACK = 'stack' in Error(DOM_EXCEPTION);
var DOM_EXCEPTION_HAS_STACK = 'stack' in new NativeDOMException(1, 2);
var FORCED_CONSTRUCTOR = ERROR_HAS_STACK && !DOM_EXCEPTION_HAS_STACK;

// `DOMException` constructor patch for `.stack` where it's required
// https://webidl.spec.whatwg.org/#es-DOMException-specialness
$({ global: true, forced: IS_PURE || FORCED_CONSTRUCTOR }, { // TODO: fix export logic
  DOMException: FORCED_CONSTRUCTOR ? $DOMException : NativeDOMException
});

var PolyfilledDOMException = getBuiltIn(DOM_EXCEPTION);
var PolyfilledDOMExceptionPrototype = PolyfilledDOMException.prototype;

if (PolyfilledDOMExceptionPrototype.constructor !== PolyfilledDOMException) {
  if (!IS_PURE) {
    defineProperty(PolyfilledDOMExceptionPrototype, 'constructor', createPropertyDescriptor(1, PolyfilledDOMException));
  }

  for (var key in DOMExceptionConstants) if (hasOwn(DOMExceptionConstants, key)) {
    var constant = DOMExceptionConstants[key];
    var constantName = constant.s;
    if (!hasOwn(PolyfilledDOMException, constantName)) {
      defineProperty(PolyfilledDOMException, constantName, createPropertyDescriptor(6, constant.c));
    }
  }
}

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/an-instance":"8b0daff12bd798defdb69ae41eea7f5e","../internals/inherit-if-required":"4d9c0ab06f91ed2da925563ab67ef474","../internals/normalize-string-argument":"c3728bb8b61d038eac9a31269a6d58d5","../internals/dom-exception-constants":"e9ba59c173e90b95945d3645c7100bfb","../internals/clear-error-stack":"55cbf711a9133651a6b71274493547dd","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0"}],"d241ac7f98e6941f2c95afec00551a56":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');
var setToStringTag = require('../internals/set-to-string-tag');

var DOM_EXCEPTION = 'DOMException';

setToStringTag(getBuiltIn(DOM_EXCEPTION), DOM_EXCEPTION);

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/set-to-string-tag":"b474145c0d35c2cab8be2f2358364fc4"}],"e8a09387bee67eefd154099229aafe95":[function(require,module,exports) {
var $ = require('../internals/export');

var global = require('../internals/global');

var microtask = require('../internals/microtask');

var IS_NODE = require('../internals/engine-is-node');

var process = global.process; // `queueMicrotask` method
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-queuemicrotask

$({
  global: true,
  enumerable: true,
  noTargetGet: true
}, {
  queueMicrotask: function queueMicrotask(fn) {
    var domain = IS_NODE && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/microtask":"2ac872da81be69b6e245c6dadc1381ad","../internals/engine-is-node":"42c67226e3ca045b9c35647f16133bfa"}],"bf4737b6c803ba1daa379cdf1d7825e5":[function(require,module,exports) {
var IS_PURE = require('../internals/is-pure');

var $ = require('../internals/export');

var global = require('../internals/global');

var getBuiltin = require('../internals/get-built-in');

var uncurryThis = require('../internals/function-uncurry-this');

var fails = require('../internals/fails');

var uid = require('../internals/uid');

var isCallable = require('../internals/is-callable');

var isConstructor = require('../internals/is-constructor');

var isObject = require('../internals/is-object');

var isSymbol = require('../internals/is-symbol');

var iterate = require('../internals/iterate');

var anObject = require('../internals/an-object');

var classof = require('../internals/classof');

var hasOwn = require('../internals/has-own-property');

var createProperty = require('../internals/create-property');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var lengthOfArrayLike = require('../internals/length-of-array-like');

var regExpFlags = require('../internals/regexp-flags');

var ERROR_STACK_INSTALLABLE = require('../internals/error-stack-installable');

var Object = global.Object;
var Date = global.Date;
var Error = global.Error;
var EvalError = global.EvalError;
var RangeError = global.RangeError;
var ReferenceError = global.ReferenceError;
var SyntaxError = global.SyntaxError;
var TypeError = global.TypeError;
var URIError = global.URIError;
var PerformanceMark = global.PerformanceMark;
var WebAssembly = global.WebAssembly;
var CompileError = WebAssembly && WebAssembly.CompileError || Error;
var LinkError = WebAssembly && WebAssembly.LinkError || Error;
var RuntimeError = WebAssembly && WebAssembly.RuntimeError || Error;
var DOMException = getBuiltin('DOMException');
var Set = getBuiltin('Set');
var Map = getBuiltin('Map');
var MapPrototype = Map.prototype;
var mapHas = uncurryThis(MapPrototype.has);
var mapGet = uncurryThis(MapPrototype.get);
var mapSet = uncurryThis(MapPrototype.set);
var setAdd = uncurryThis(Set.prototype.add);
var objectKeys = getBuiltin('Object', 'keys');
var push = uncurryThis([].push);
var booleanValueOf = uncurryThis(true.valueOf);
var numberValueOf = uncurryThis(1.0.valueOf);
var stringValueOf = uncurryThis(''.valueOf);
var getFlags = uncurryThis(regExpFlags);
var getTime = uncurryThis(Date.prototype.getTime);
var PERFORMANCE_MARK = uid('structuredClone');
var DATA_CLONE_ERROR = 'DataCloneError';
var TRANSFERRING = 'Transferring';

var checkBasicSemantic = function (structuredCloneImplementation) {
  return !fails(function () {
    var set1 = new global.Set([7]);
    var set2 = structuredCloneImplementation(set1);
    var number = structuredCloneImplementation(Object(7));
    return set2 == set1 || !set2.has(7) || typeof number != 'object' || number != 7;
  }) && structuredCloneImplementation;
}; // https://github.com/whatwg/html/pull/5749


var checkNewErrorsSemantic = function (structuredCloneImplementation) {
  return !fails(function () {
    var test = structuredCloneImplementation(new global.AggregateError([1], PERFORMANCE_MARK, {
      cause: 3
    }));
    return test.name != 'AggregateError' || test.errors[0] != 1 || test.message != PERFORMANCE_MARK || test.cause != 3;
  }) && structuredCloneImplementation;
}; // FF94+, Safari TP134+, Chrome Canary 98+, NodeJS 17.0+, Deno 1.13+
// current FF and Safari implementations can't clone errors
// https://bugzilla.mozilla.org/show_bug.cgi?id=1556604
// no one of current implementations supports new (html/5749) error cloning semantic


var nativeStructuredClone = global.structuredClone;
var FORCED_REPLACEMENT = IS_PURE || !checkNewErrorsSemantic(nativeStructuredClone); // Chrome 82+, Safari 14.1+, Deno 1.11+
// Chrome 78-81 implementation swaps `.name` and `.message` of cloned `DOMException`
// Safari 14.1 implementation doesn't clone some `RegExp` flags, so requires a workaround
// current Safari implementation can't clone errors
// Deno 1.2-1.10 implementations too naive
// NodeJS 16.0+ does not have `PerformanceMark` constructor, structured cloning implementation
//   from `performance.mark` is too naive and can't clone, for example, `RegExp` or some boxed primitives
//   https://github.com/nodejs/node/issues/40840
// no one of current implementations supports new (html/5749) error cloning semantic

var structuredCloneFromMark = !nativeStructuredClone && checkBasicSemantic(function (value) {
  return new PerformanceMark(PERFORMANCE_MARK, {
    detail: value
  }).detail;
});
var nativeRestrictedStructuredClone = checkBasicSemantic(nativeStructuredClone) || structuredCloneFromMark;

var throwUncloneable = function (type) {
  throw new DOMException('Uncloneable type: ' + type, DATA_CLONE_ERROR);
};

var throwUnpolyfillable = function (type, kind) {
  throw new DOMException((kind || 'Cloning') + ' of ' + type + ' cannot be properly polyfilled in this engine', DATA_CLONE_ERROR);
};

var structuredCloneInternal = function (value, map) {
  if (isSymbol(value)) throwUncloneable('Symbol');
  if (!isObject(value)) return value; // effectively preserves circular references

  if (map) {
    if (mapHas(map, value)) return mapGet(map, value);
  } else map = new Map();

  var type = classof(value);
  var deep = false;
  var C, name, cloned, dataTransfer, i, length, keys, key, source, target;

  switch (type) {
    case 'Array':
      cloned = [];
      deep = true;
      break;

    case 'Object':
      cloned = {};
      deep = true;
      break;

    case 'Map':
      cloned = new Map();
      deep = true;
      break;

    case 'Set':
      cloned = new Set();
      deep = true;
      break;

    case 'RegExp':
      // in this block because of a Safari 14.1 bug
      // old FF does not clone regexes passed to the constructor, so get the source and flags directly
      cloned = new RegExp(value.source, 'flags' in value ? value.flags : getFlags(value));
      break;

    case 'Error':
      name = value.name;

      switch (name) {
        case 'AggregateError':
          cloned = getBuiltin('AggregateError')([]);
          break;

        case 'EvalError':
          cloned = EvalError();
          break;

        case 'RangeError':
          cloned = RangeError();
          break;

        case 'ReferenceError':
          cloned = ReferenceError();
          break;

        case 'SyntaxError':
          cloned = SyntaxError();
          break;

        case 'TypeError':
          cloned = TypeError();
          break;

        case 'URIError':
          cloned = URIError();
          break;

        case 'CompileError':
          cloned = CompileError();
          break;

        case 'LinkError':
          cloned = LinkError();
          break;

        case 'RuntimeError':
          cloned = RuntimeError();
          break;

        default:
          cloned = Error();
      }

      deep = true;
      break;

    case 'DOMException':
      cloned = new DOMException(value.message, value.name);
      deep = true;
      break;

    case 'DataView':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'BigInt64Array':
    case 'BigUint64Array':
      C = global[type]; // in some old engines like Safari 9, typeof C is 'object'
      // on Uint8ClampedArray or some other constructors

      if (!isObject(C)) throwUnpolyfillable(type);
      cloned = new C( // this is safe, since arraybuffer cannot have circular references
      structuredCloneInternal(value.buffer, map), value.byteOffset, type === 'DataView' ? value.byteLength : value.length);
      break;

    case 'DOMQuad':
      try {
        cloned = new DOMQuad(structuredCloneInternal(value.p1, map), structuredCloneInternal(value.p2, map), structuredCloneInternal(value.p3, map), structuredCloneInternal(value.p4, map));
      } catch (error) {
        if (nativeRestrictedStructuredClone) {
          cloned = nativeRestrictedStructuredClone(value);
        } else throwUnpolyfillable(type);
      }

      break;

    case 'FileList':
      C = global.DataTransfer;

      if (isConstructor(C)) {
        dataTransfer = new C();

        for (i = 0, length = lengthOfArrayLike(value); i < length; i++) {
          dataTransfer.items.add(structuredCloneInternal(value[i], map));
        }

        cloned = dataTransfer.files;
      } else if (nativeRestrictedStructuredClone) {
        cloned = nativeRestrictedStructuredClone(value);
      } else throwUnpolyfillable(type);

      break;

    case 'ImageData':
      // Safari 9 ImageData is a constructor, but typeof ImageData is 'object'
      try {
        cloned = new ImageData(structuredCloneInternal(value.data, map), value.width, value.height, {
          colorSpace: value.colorSpace
        });
      } catch (error) {
        if (nativeRestrictedStructuredClone) {
          cloned = nativeRestrictedStructuredClone(value);
        } else throwUnpolyfillable(type);
      }

      break;

    default:
      if (nativeRestrictedStructuredClone) {
        cloned = nativeRestrictedStructuredClone(value);
      } else switch (type) {
        case 'BigInt':
          // can be a 3rd party polyfill
          cloned = Object(value.valueOf());
          break;

        case 'Boolean':
          cloned = Object(booleanValueOf(value));
          break;

        case 'Number':
          cloned = Object(numberValueOf(value));
          break;

        case 'String':
          cloned = Object(stringValueOf(value));
          break;

        case 'Date':
          cloned = new Date(getTime(value));
          break;

        case 'ArrayBuffer':
          C = global.DataView; // `ArrayBuffer#slice` is not available in IE10
          // `ArrayBuffer#slice` and `DataView` are not available in old FF

          if (!C && typeof value.slice != 'function') throwUnpolyfillable(type); // detached buffers throws in `DataView` and `.slice`

          try {
            if (typeof value.slice == 'function') {
              cloned = value.slice(0);
            } else {
              length = value.byteLength;
              cloned = new ArrayBuffer(length);
              source = new C(value);
              target = new C(cloned);

              for (i = 0; i < length; i++) {
                target.setUint8(i, source.getUint8(i));
              }
            }
          } catch (error) {
            throw new DOMException('ArrayBuffer is detached', DATA_CLONE_ERROR);
          }

          break;

        case 'SharedArrayBuffer':
          // SharedArrayBuffer should use shared memory, we can't polyfill it, so return the original
          cloned = value;
          break;

        case 'Blob':
          try {
            cloned = value.slice(0, value.size, value.type);
          } catch (error) {
            throwUnpolyfillable(type);
          }

          break;

        case 'DOMPoint':
        case 'DOMPointReadOnly':
          C = global[type];

          try {
            cloned = C.fromPoint ? C.fromPoint(value) : new C(value.x, value.y, value.z, value.w);
          } catch (error) {
            throwUnpolyfillable(type);
          }

          break;

        case 'DOMRect':
        case 'DOMRectReadOnly':
          C = global[type];

          try {
            cloned = C.fromRect ? C.fromRect(value) : new C(value.x, value.y, value.width, value.height);
          } catch (error) {
            throwUnpolyfillable(type);
          }

          break;

        case 'DOMMatrix':
        case 'DOMMatrixReadOnly':
          C = global[type];

          try {
            cloned = C.fromMatrix ? C.fromMatrix(value) : new C(value);
          } catch (error) {
            throwUnpolyfillable(type);
          }

          break;

        case 'AudioData':
        case 'VideoFrame':
          if (!isCallable(value.clone)) throwUnpolyfillable(type);

          try {
            cloned = value.clone();
          } catch (error) {
            throwUncloneable(type);
          }

          break;

        case 'File':
          try {
            cloned = new File([value], value.name, value);
          } catch (error) {
            throwUnpolyfillable(type);
          }

          break;

        case 'CryptoKey':
        case 'GPUCompilationMessage':
        case 'GPUCompilationInfo':
        case 'ImageBitmap':
        case 'RTCCertificate':
        case 'WebAssembly.Module':
          throwUnpolyfillable(type);
        // break omitted

        default:
          throwUncloneable(type);
      }

  }

  mapSet(map, value, cloned);
  if (deep) switch (type) {
    case 'Array':
    case 'Object':
      keys = objectKeys(value);

      for (i = 0, length = lengthOfArrayLike(keys); i < length; i++) {
        key = keys[i];
        createProperty(cloned, key, structuredCloneInternal(value[key], map));
      }

      break;

    case 'Map':
      value.forEach(function (v, k) {
        mapSet(cloned, structuredCloneInternal(k, map), structuredCloneInternal(v, map));
      });
      break;

    case 'Set':
      value.forEach(function (v) {
        setAdd(cloned, structuredCloneInternal(v, map));
      });
      break;

    case 'Error':
      createNonEnumerableProperty(cloned, 'message', structuredCloneInternal(value.message, map));

      if (hasOwn(value, 'cause')) {
        createNonEnumerableProperty(cloned, 'cause', structuredCloneInternal(value.cause, map));
      }

      if (name == 'AggregateError') {
        cloned.errors = structuredCloneInternal(value.errors, map);
      }

    // break omitted

    case 'DOMException':
      if (ERROR_STACK_INSTALLABLE) {
        createNonEnumerableProperty(cloned, 'stack', structuredCloneInternal(value.stack, map));
      }

  }
  return cloned;
};

var PROPER_TRANSFER = nativeStructuredClone && !fails(function () {
  var buffer = new ArrayBuffer(8);
  var clone = nativeStructuredClone(buffer, {
    transfer: [buffer]
  });
  return buffer.byteLength != 0 || clone.byteLength != 8;
});

var tryToTransfer = function (rawTransfer, map) {
  if (!isObject(rawTransfer)) throw TypeError('Transfer option cannot be converted to a sequence');
  var transfer = [];
  iterate(rawTransfer, function (value) {
    push(transfer, anObject(value));
  });
  var i = 0;
  var length = lengthOfArrayLike(transfer);
  var value, type, C, transferredArray, transferred, canvas, context;

  if (PROPER_TRANSFER) {
    transferredArray = nativeStructuredClone(transfer, {
      transfer: transfer
    });

    while (i < length) mapSet(map, transfer[i], transferredArray[i++]);
  } else while (i < length) {
    value = transfer[i++];
    if (mapHas(map, value)) throw new DOMException('Duplicate transferable', DATA_CLONE_ERROR);
    type = classof(value);

    switch (type) {
      case 'ImageBitmap':
        C = global.OffscreenCanvas;
        if (!isConstructor(C)) throwUnpolyfillable(type, TRANSFERRING);

        try {
          canvas = new C(value.width, value.height);
          context = canvas.getContext('bitmaprenderer');
          context.transferFromImageBitmap(value);
          transferred = canvas.transferToImageBitmap();
        } catch (error) {
          /* empty */
        }

        break;

      case 'AudioData':
      case 'VideoFrame':
        if (!isCallable(value.clone) || !isCallable(value.close)) throwUnpolyfillable(type, TRANSFERRING);

        try {
          transferred = value.clone();
          value.close();
        } catch (error) {
          /* empty */
        }

        break;

      case 'ArrayBuffer':
      case 'MessagePort':
      case 'OffscreenCanvas':
      case 'ReadableStream':
      case 'TransformStream':
      case 'WritableStream':
        throwUnpolyfillable(type, TRANSFERRING);
    }

    if (transferred === undefined) throw new DOMException('This object cannot be transferred: ' + type, DATA_CLONE_ERROR);
    mapSet(map, value, transferred);
  }
};

$({
  global: true,
  enumerable: true,
  sham: !PROPER_TRANSFER,
  forced: FORCED_REPLACEMENT
}, {
  structuredClone: function structuredClone(value
  /* , { transfer } */
  ) {
    var options = arguments.length > 1 ? anObject(arguments[1]) : undefined;
    var transfer = options ? options.transfer : undefined;
    var map;

    if (transfer !== undefined) {
      map = new Map();
      tryToTransfer(transfer, map);
    }

    return structuredCloneInternal(value, map);
  }
});
},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/uid":"d5b7e7679d9dac163ab327cbf9508501","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/is-constructor":"119e842d0827f15b1b4e51c1ee9e98ea","../internals/is-object":"03244e745134af366d66b74456891052","../internals/is-symbol":"7500e07108c47e5d25bda62049b8b4ba","../internals/iterate":"33b1bc22ce229618eb94623257686da2","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/classof":"be2998c5b4d0f20a1cc5fe6807661aae","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/create-property":"49f209074159e5f6b7cb7c7945792f40","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/length-of-array-like":"e316973a6f76533d644cd1ab97e51666","../internals/regexp-flags":"9ed5cc7a98675b7cdea415f21c6b5f7b","../internals/error-stack-installable":"685896e147d59eedb2588d6645405126"}],"11b525d2e3ec21c05af8cfc8386bb875":[function(require,module,exports) {
var $ = require('../internals/export');

var global = require('../internals/global');

var apply = require('../internals/function-apply');

var isCallable = require('../internals/is-callable');

var userAgent = require('../internals/engine-user-agent');

var arraySlice = require('../internals/array-slice');

var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var Function = global.Function;

var wrap = function (scheduler) {
  return function (handler, timeout
  /* , ...arguments */
  ) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? arraySlice(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      apply(isCallable(handler) ? handler : Function(handler), this, args);
    } : handler, timeout);
  };
}; // ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers


$({
  global: true,
  bind: true,
  forced: MSIE
}, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-apply":"a59096d8f45a668c44fc59d4e30bb557","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828","../internals/array-slice":"d58518bc0d77fd7d4bbb2d854257bf40"}],"a66c25e402880ea6b966ee8ece30b6df":[function(require,module,exports) {
'use strict'; // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

require('../modules/es.string.iterator');

var $ = require('../internals/export');

var DESCRIPTORS = require('../internals/descriptors');

var USE_NATIVE_URL = require('../internals/native-url');

var global = require('../internals/global');

var bind = require('../internals/function-bind-context');

var uncurryThis = require('../internals/function-uncurry-this');

var defineProperties = require('../internals/object-define-properties').f;

var redefine = require('../internals/redefine');

var anInstance = require('../internals/an-instance');

var hasOwn = require('../internals/has-own-property');

var assign = require('../internals/object-assign');

var arrayFrom = require('../internals/array-from');

var arraySlice = require('../internals/array-slice-simple');

var codeAt = require('../internals/string-multibyte').codeAt;

var toASCII = require('../internals/string-punycode-to-ascii');

var $toString = require('../internals/to-string');

var setToStringTag = require('../internals/set-to-string-tag');

var URLSearchParamsModule = require('../modules/web.url-search-params');

var InternalStateModule = require('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var NativeURL = global.URL;
var TypeError = global.TypeError;
var parseInt = global.parseInt;
var floor = Math.floor;
var pow = Math.pow;
var charAt = uncurryThis(''.charAt);
var exec = uncurryThis(/./.exec);
var join = uncurryThis([].join);
var numberToString = uncurryThis(1.0.toString);
var pop = uncurryThis([].pop);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);
var toLowerCase = uncurryThis(''.toLowerCase);
var unshift = uncurryThis([].unshift);
var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';
var ALPHA = /[a-z]/i; // eslint-disable-next-line regexp/no-obscure-range -- safe

var ALPHANUMERIC = /[\d+-.a-z]/i;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\da-f]+$/i;
/* eslint-disable regexp/no-control-character -- safe */

var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable regexp/no-control-character -- safe */

var EOF; // https://url.spec.whatwg.org/#ipv4-number-parser

var parseIPv4 = function (input) {
  var parts = split(input, '.');
  var partsLength, numbers, index, part, radix, number, ipv4;

  if (parts.length && parts[parts.length - 1] == '') {
    parts.length--;
  }

  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];

  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;

    if (part.length > 1 && charAt(part, 0) == '0') {
      radix = exec(HEX_START, part) ? 16 : 8;
      part = stringSlice(part, radix == 8 ? 1 : 2);
    }

    if (part === '') {
      number = 0;
    } else {
      if (!exec(radix == 10 ? DEC : radix == 8 ? OCT : HEX, part)) return input;
      number = parseInt(part, radix);
    }

    push(numbers, number);
  }

  for (index = 0; index < partsLength; index++) {
    number = numbers[index];

    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }

  ipv4 = pop(numbers);

  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }

  return ipv4;
}; // https://url.spec.whatwg.org/#concept-ipv6-parser
// eslint-disable-next-line max-statements -- TODO


var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var chr = function () {
    return charAt(input, pointer);
  };

  if (chr() == ':') {
    if (charAt(input, 1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }

  while (chr()) {
    if (pieceIndex == 8) return;

    if (chr() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }

    value = length = 0;

    while (length < 4 && exec(HEX, chr())) {
      value = value * 16 + parseInt(chr(), 16);
      pointer++;
      length++;
    }

    if (chr() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;

      while (chr()) {
        ipv4Piece = null;

        if (numbersSeen > 0) {
          if (chr() == '.' && numbersSeen < 4) pointer++;else return;
        }

        if (!exec(DIGIT, chr())) return;

        while (exec(DIGIT, chr())) {
          number = parseInt(chr(), 10);
          if (ipv4Piece === null) ipv4Piece = number;else if (ipv4Piece == 0) return;else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }

        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }

      if (numbersSeen != 4) return;
      break;
    } else if (chr() == ':') {
      pointer++;
      if (!chr()) return;
    } else if (chr()) return;

    address[pieceIndex++] = value;
  }

  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;

    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;

  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;

  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }

      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }

  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }

  return maxIndex;
}; // https://url.spec.whatwg.org/#host-serializing


var serializeHost = function (host) {
  var result, index, compress, ignore0; // ipv4

  if (typeof host == 'number') {
    result = [];

    for (index = 0; index < 4; index++) {
      unshift(result, host % 256);
      host = floor(host / 256);
    }

    return join(result, '.'); // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);

    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;

      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += numberToString(host[index], 16);
        if (index < 7) result += ':';
      }
    }

    return '[' + result + ']';
  }

  return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1,
  '"': 1,
  '<': 1,
  '>': 1,
  '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1,
  '?': 1,
  '{': 1,
  '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1,
  ':': 1,
  ';': 1,
  '=': 1,
  '@': 1,
  '[': 1,
  '\\': 1,
  ']': 1,
  '^': 1,
  '|': 1
});

var percentEncode = function (chr, set) {
  var code = codeAt(chr, 0);
  return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
}; // https://url.spec.whatwg.org/#special-scheme


var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
}; // https://url.spec.whatwg.org/#windows-drive-letter

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && exec(ALPHA, charAt(string, 0)) && ((second = charAt(string, 1)) == ':' || !normalized && second == '|');
}; // https://url.spec.whatwg.org/#start-with-a-windows-drive-letter


var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (string.length == 2 || (third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#');
}; // https://url.spec.whatwg.org/#single-dot-path-segment


var isSingleDot = function (segment) {
  return segment === '.' || toLowerCase(segment) === '%2e';
}; // https://url.spec.whatwg.org/#double-dot-path-segment


var isDoubleDot = function (segment) {
  segment = toLowerCase(segment);
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
}; // States:


var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

var URLState = function (url, isBase, base) {
  var urlString = $toString(url);
  var baseState, failure, searchParams;

  if (isBase) {
    failure = this.parse(urlString);
    if (failure) throw TypeError(failure);
    this.searchParams = null;
  } else {
    if (base !== undefined) baseState = new URLState(base, true);
    failure = this.parse(urlString, null, baseState);
    if (failure) throw TypeError(failure);
    searchParams = getInternalSearchParamsState(new URLSearchParams());
    searchParams.bindURL(this);
    this.searchParams = searchParams;
  }
};

URLState.prototype = {
  type: 'URL',
  // https://url.spec.whatwg.org/#url-parsing
  // eslint-disable-next-line max-statements -- TODO
  parse: function (input, stateOverride, base) {
    var url = this;
    var state = stateOverride || SCHEME_START;
    var pointer = 0;
    var buffer = '';
    var seenAt = false;
    var seenBracket = false;
    var seenPasswordToken = false;
    var codePoints, chr, bufferCodePoints, failure;
    input = $toString(input);

    if (!stateOverride) {
      url.scheme = '';
      url.username = '';
      url.password = '';
      url.host = null;
      url.port = null;
      url.path = [];
      url.query = null;
      url.fragment = null;
      url.cannotBeABaseURL = false;
      input = replace(input, LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
    }

    input = replace(input, TAB_AND_NEW_LINE, '');
    codePoints = arrayFrom(input);

    while (pointer <= codePoints.length) {
      chr = codePoints[pointer];

      switch (state) {
        case SCHEME_START:
          if (chr && exec(ALPHA, chr)) {
            buffer += toLowerCase(chr);
            state = SCHEME;
          } else if (!stateOverride) {
            state = NO_SCHEME;
            continue;
          } else return INVALID_SCHEME;

          break;

        case SCHEME:
          if (chr && (exec(ALPHANUMERIC, chr) || chr == '+' || chr == '-' || chr == '.')) {
            buffer += toLowerCase(chr);
          } else if (chr == ':') {
            if (stateOverride && (url.isSpecial() != hasOwn(specialSchemes, buffer) || buffer == 'file' && (url.includesCredentials() || url.port !== null) || url.scheme == 'file' && !url.host)) return;
            url.scheme = buffer;

            if (stateOverride) {
              if (url.isSpecial() && specialSchemes[url.scheme] == url.port) url.port = null;
              return;
            }

            buffer = '';

            if (url.scheme == 'file') {
              state = FILE;
            } else if (url.isSpecial() && base && base.scheme == url.scheme) {
              state = SPECIAL_RELATIVE_OR_AUTHORITY;
            } else if (url.isSpecial()) {
              state = SPECIAL_AUTHORITY_SLASHES;
            } else if (codePoints[pointer + 1] == '/') {
              state = PATH_OR_AUTHORITY;
              pointer++;
            } else {
              url.cannotBeABaseURL = true;
              push(url.path, '');
              state = CANNOT_BE_A_BASE_URL_PATH;
            }
          } else if (!stateOverride) {
            buffer = '';
            state = NO_SCHEME;
            pointer = 0;
            continue;
          } else return INVALID_SCHEME;

          break;

        case NO_SCHEME:
          if (!base || base.cannotBeABaseURL && chr != '#') return INVALID_SCHEME;

          if (base.cannotBeABaseURL && chr == '#') {
            url.scheme = base.scheme;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            url.cannotBeABaseURL = true;
            state = FRAGMENT;
            break;
          }

          state = base.scheme == 'file' ? FILE : RELATIVE;
          continue;

        case SPECIAL_RELATIVE_OR_AUTHORITY:
          if (chr == '/' && codePoints[pointer + 1] == '/') {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            pointer++;
          } else {
            state = RELATIVE;
            continue;
          }

          break;

        case PATH_OR_AUTHORITY:
          if (chr == '/') {
            state = AUTHORITY;
            break;
          } else {
            state = PATH;
            continue;
          }

        case RELATIVE:
          url.scheme = base.scheme;

          if (chr == EOF) {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
          } else if (chr == '/' || chr == '\\' && url.isSpecial()) {
            state = RELATIVE_SLASH;
          } else if (chr == '?') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = '';
            state = QUERY;
          } else if (chr == '#') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.path.length--;
            state = PATH;
            continue;
          }

          break;

        case RELATIVE_SLASH:
          if (url.isSpecial() && (chr == '/' || chr == '\\')) {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          } else if (chr == '/') {
            state = AUTHORITY;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            state = PATH;
            continue;
          }

          break;

        case SPECIAL_AUTHORITY_SLASHES:
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          if (chr != '/' || charAt(buffer, pointer + 1) != '/') continue;
          pointer++;
          break;

        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
          if (chr != '/' && chr != '\\') {
            state = AUTHORITY;
            continue;
          }

          break;

        case AUTHORITY:
          if (chr == '@') {
            if (seenAt) buffer = '%40' + buffer;
            seenAt = true;
            bufferCodePoints = arrayFrom(buffer);

            for (var i = 0; i < bufferCodePoints.length; i++) {
              var codePoint = bufferCodePoints[i];

              if (codePoint == ':' && !seenPasswordToken) {
                seenPasswordToken = true;
                continue;
              }

              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
              if (seenPasswordToken) url.password += encodedCodePoints;else url.username += encodedCodePoints;
            }

            buffer = '';
          } else if (chr == EOF || chr == '/' || chr == '?' || chr == '#' || chr == '\\' && url.isSpecial()) {
            if (seenAt && buffer == '') return INVALID_AUTHORITY;
            pointer -= arrayFrom(buffer).length + 1;
            buffer = '';
            state = HOST;
          } else buffer += chr;

          break;

        case HOST:
        case HOSTNAME:
          if (stateOverride && url.scheme == 'file') {
            state = FILE_HOST;
            continue;
          } else if (chr == ':' && !seenBracket) {
            if (buffer == '') return INVALID_HOST;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PORT;
            if (stateOverride == HOSTNAME) return;
          } else if (chr == EOF || chr == '/' || chr == '?' || chr == '#' || chr == '\\' && url.isSpecial()) {
            if (url.isSpecial() && buffer == '') return INVALID_HOST;
            if (stateOverride && buffer == '' && (url.includesCredentials() || url.port !== null)) return;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PATH_START;
            if (stateOverride) return;
            continue;
          } else {
            if (chr == '[') seenBracket = true;else if (chr == ']') seenBracket = false;
            buffer += chr;
          }

          break;

        case PORT:
          if (exec(DIGIT, chr)) {
            buffer += chr;
          } else if (chr == EOF || chr == '/' || chr == '?' || chr == '#' || chr == '\\' && url.isSpecial() || stateOverride) {
            if (buffer != '') {
              var port = parseInt(buffer, 10);
              if (port > 0xFFFF) return INVALID_PORT;
              url.port = url.isSpecial() && port === specialSchemes[url.scheme] ? null : port;
              buffer = '';
            }

            if (stateOverride) return;
            state = PATH_START;
            continue;
          } else return INVALID_PORT;

          break;

        case FILE:
          url.scheme = 'file';
          if (chr == '/' || chr == '\\') state = FILE_SLASH;else if (base && base.scheme == 'file') {
            if (chr == EOF) {
              url.host = base.host;
              url.path = arraySlice(base.path);
              url.query = base.query;
            } else if (chr == '?') {
              url.host = base.host;
              url.path = arraySlice(base.path);
              url.query = '';
              state = QUERY;
            } else if (chr == '#') {
              url.host = base.host;
              url.path = arraySlice(base.path);
              url.query = base.query;
              url.fragment = '';
              state = FRAGMENT;
            } else {
              if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.shortenPath();
              }

              state = PATH;
              continue;
            }
          } else {
            state = PATH;
            continue;
          }
          break;

        case FILE_SLASH:
          if (chr == '/' || chr == '\\') {
            state = FILE_HOST;
            break;
          }

          if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
            if (isWindowsDriveLetter(base.path[0], true)) push(url.path, base.path[0]);else url.host = base.host;
          }

          state = PATH;
          continue;

        case FILE_HOST:
          if (chr == EOF || chr == '/' || chr == '\\' || chr == '?' || chr == '#') {
            if (!stateOverride && isWindowsDriveLetter(buffer)) {
              state = PATH;
            } else if (buffer == '') {
              url.host = '';
              if (stateOverride) return;
              state = PATH_START;
            } else {
              failure = url.parseHost(buffer);
              if (failure) return failure;
              if (url.host == 'localhost') url.host = '';
              if (stateOverride) return;
              buffer = '';
              state = PATH_START;
            }

            continue;
          } else buffer += chr;

          break;

        case PATH_START:
          if (url.isSpecial()) {
            state = PATH;
            if (chr != '/' && chr != '\\') continue;
          } else if (!stateOverride && chr == '?') {
            url.query = '';
            state = QUERY;
          } else if (!stateOverride && chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr != EOF) {
            state = PATH;
            if (chr != '/') continue;
          }

          break;

        case PATH:
          if (chr == EOF || chr == '/' || chr == '\\' && url.isSpecial() || !stateOverride && (chr == '?' || chr == '#')) {
            if (isDoubleDot(buffer)) {
              url.shortenPath();

              if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                push(url.path, '');
              }
            } else if (isSingleDot(buffer)) {
              if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                push(url.path, '');
              }
            } else {
              if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                if (url.host) url.host = '';
                buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
              }

              push(url.path, buffer);
            }

            buffer = '';

            if (url.scheme == 'file' && (chr == EOF || chr == '?' || chr == '#')) {
              while (url.path.length > 1 && url.path[0] === '') {
                shift(url.path);
              }
            }

            if (chr == '?') {
              url.query = '';
              state = QUERY;
            } else if (chr == '#') {
              url.fragment = '';
              state = FRAGMENT;
            }
          } else {
            buffer += percentEncode(chr, pathPercentEncodeSet);
          }

          break;

        case CANNOT_BE_A_BASE_URL_PATH:
          if (chr == '?') {
            url.query = '';
            state = QUERY;
          } else if (chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr != EOF) {
            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
          }

          break;

        case QUERY:
          if (!stateOverride && chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr != EOF) {
            if (chr == "'" && url.isSpecial()) url.query += '%27';else if (chr == '#') url.query += '%23';else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
          }

          break;

        case FRAGMENT:
          if (chr != EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
          break;
      }

      pointer++;
    }
  },
  // https://url.spec.whatwg.org/#host-parsing
  parseHost: function (input) {
    var result, codePoints, index;

    if (charAt(input, 0) == '[') {
      if (charAt(input, input.length - 1) != ']') return INVALID_HOST;
      result = parseIPv6(stringSlice(input, 1, -1));
      if (!result) return INVALID_HOST;
      this.host = result; // opaque host
    } else if (!this.isSpecial()) {
      if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
      result = '';
      codePoints = arrayFrom(input);

      for (index = 0; index < codePoints.length; index++) {
        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
      }

      this.host = result;
    } else {
      input = toASCII(input);
      if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
      result = parseIPv4(input);
      if (result === null) return INVALID_HOST;
      this.host = result;
    }
  },
  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
  cannotHaveUsernamePasswordPort: function () {
    return !this.host || this.cannotBeABaseURL || this.scheme == 'file';
  },
  // https://url.spec.whatwg.org/#include-credentials
  includesCredentials: function () {
    return this.username != '' || this.password != '';
  },
  // https://url.spec.whatwg.org/#is-special
  isSpecial: function () {
    return hasOwn(specialSchemes, this.scheme);
  },
  // https://url.spec.whatwg.org/#shorten-a-urls-path
  shortenPath: function () {
    var path = this.path;
    var pathSize = path.length;

    if (pathSize && (this.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
      path.length--;
    }
  },
  // https://url.spec.whatwg.org/#concept-url-serializer
  serialize: function () {
    var url = this;
    var scheme = url.scheme;
    var username = url.username;
    var password = url.password;
    var host = url.host;
    var port = url.port;
    var path = url.path;
    var query = url.query;
    var fragment = url.fragment;
    var output = scheme + ':';

    if (host !== null) {
      output += '//';

      if (url.includesCredentials()) {
        output += username + (password ? ':' + password : '') + '@';
      }

      output += serializeHost(host);
      if (port !== null) output += ':' + port;
    } else if (scheme == 'file') output += '//';

    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
    if (query !== null) output += '?' + query;
    if (fragment !== null) output += '#' + fragment;
    return output;
  },
  // https://url.spec.whatwg.org/#dom-url-href
  setHref: function (href) {
    var failure = this.parse(href);
    if (failure) throw TypeError(failure);
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-origin
  getOrigin: function () {
    var scheme = this.scheme;
    var port = this.port;
    if (scheme == 'blob') try {
      return new URLConstructor(scheme.path[0]).origin;
    } catch (error) {
      return 'null';
    }
    if (scheme == 'file' || !this.isSpecial()) return 'null';
    return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
  },
  // https://url.spec.whatwg.org/#dom-url-protocol
  getProtocol: function () {
    return this.scheme + ':';
  },
  setProtocol: function (protocol) {
    this.parse($toString(protocol) + ':', SCHEME_START);
  },
  // https://url.spec.whatwg.org/#dom-url-username
  getUsername: function () {
    return this.username;
  },
  setUsername: function (username) {
    var codePoints = arrayFrom($toString(username));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.username = '';

    for (var i = 0; i < codePoints.length; i++) {
      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-password
  getPassword: function () {
    return this.password;
  },
  setPassword: function (password) {
    var codePoints = arrayFrom($toString(password));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.password = '';

    for (var i = 0; i < codePoints.length; i++) {
      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-host
  getHost: function () {
    var host = this.host;
    var port = this.port;
    return host === null ? '' : port === null ? serializeHost(host) : serializeHost(host) + ':' + port;
  },
  setHost: function (host) {
    if (this.cannotBeABaseURL) return;
    this.parse(host, HOST);
  },
  // https://url.spec.whatwg.org/#dom-url-hostname
  getHostname: function () {
    var host = this.host;
    return host === null ? '' : serializeHost(host);
  },
  setHostname: function (hostname) {
    if (this.cannotBeABaseURL) return;
    this.parse(hostname, HOSTNAME);
  },
  // https://url.spec.whatwg.org/#dom-url-port
  getPort: function () {
    var port = this.port;
    return port === null ? '' : $toString(port);
  },
  setPort: function (port) {
    if (this.cannotHaveUsernamePasswordPort()) return;
    port = $toString(port);
    if (port == '') this.port = null;else this.parse(port, PORT);
  },
  // https://url.spec.whatwg.org/#dom-url-pathname
  getPathname: function () {
    var path = this.path;
    return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
  },
  setPathname: function (pathname) {
    if (this.cannotBeABaseURL) return;
    this.path = [];
    this.parse(pathname, PATH_START);
  },
  // https://url.spec.whatwg.org/#dom-url-search
  getSearch: function () {
    var query = this.query;
    return query ? '?' + query : '';
  },
  setSearch: function (search) {
    search = $toString(search);

    if (search == '') {
      this.query = null;
    } else {
      if ('?' == charAt(search, 0)) search = stringSlice(search, 1);
      this.query = '';
      this.parse(search, QUERY);
    }

    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-searchparams
  getSearchParams: function () {
    return this.searchParams.facade;
  },
  // https://url.spec.whatwg.org/#dom-url-hash
  getHash: function () {
    var fragment = this.fragment;
    return fragment ? '#' + fragment : '';
  },
  setHash: function (hash) {
    hash = $toString(hash);

    if (hash == '') {
      this.fragment = null;
      return;
    }

    if ('#' == charAt(hash, 0)) hash = stringSlice(hash, 1);
    this.fragment = '';
    this.parse(hash, FRAGMENT);
  },
  update: function () {
    this.query = this.searchParams.serialize() || null;
  }
}; // `URL` constructor
// https://url.spec.whatwg.org/#url-class

var URLConstructor = function URL(url
/* , base */
) {
  var that = anInstance(this, URLPrototype);
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var state = setInternalState(that, new URLState(url, false, base));

  if (!DESCRIPTORS) {
    that.href = state.serialize();
    that.origin = state.getOrigin();
    that.protocol = state.getProtocol();
    that.username = state.getUsername();
    that.password = state.getPassword();
    that.host = state.getHost();
    that.hostname = state.getHostname();
    that.port = state.getPort();
    that.pathname = state.getPathname();
    that.search = state.getSearch();
    that.searchParams = state.getSearchParams();
    that.hash = state.getHash();
  }
};

var URLPrototype = URLConstructor.prototype;

var accessorDescriptor = function (getter, setter) {
  return {
    get: function () {
      return getInternalURLState(this)[getter]();
    },
    set: setter && function (value) {
      return getInternalURLState(this)[setter](value);
    },
    configurable: true,
    enumerable: true
  };
};

if (DESCRIPTORS) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor('serialize', 'setHref'),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor('getOrigin'),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor('getProtocol', 'setProtocol'),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor('getUsername', 'setUsername'),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor('getPassword', 'setPassword'),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor('getHost', 'setHost'),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor('getHostname', 'setHostname'),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor('getPort', 'setPort'),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor('getPathname', 'setPathname'),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor('getSearch', 'setSearch'),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor('getSearchParams'),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor('getHash', 'setHash')
  });
} // `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson


redefine(URLPrototype, 'toJSON', function toJSON() {
  return getInternalURLState(this).serialize();
}, {
  enumerable: true
}); // `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior

redefine(URLPrototype, 'toString', function toString() {
  return getInternalURLState(this).serialize();
}, {
  enumerable: true
});

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL; // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL

  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL)); // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL

  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
}

setToStringTag(URLConstructor, 'URL');
$({
  global: true,
  forced: !USE_NATIVE_URL,
  sham: !DESCRIPTORS
}, {
  URL: URLConstructor
});
},{"../modules/es.string.iterator":"17203f1447f326bd1ee667e61bac879c","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/native-url":"5e5f16f67bd2b706d5eb103748915db5","../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/object-define-properties":"3ad53cd176876675b1da5125e4bdfafb","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/an-instance":"8b0daff12bd798defdb69ae41eea7f5e","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/object-assign":"ae1f8d2c1cdbd736ba4b5be0b1a1834d","../internals/array-from":"ca2455971d1c96b7905e2122c9d50dab","../internals/array-slice-simple":"a98e351776398a94d2cb369f0b75ee01","../internals/string-multibyte":"2324ad16ce38cbfde2a3a75c67697ac1","../internals/string-punycode-to-ascii":"c01f437496192b363cd127030416cd5c","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/set-to-string-tag":"b474145c0d35c2cab8be2f2358364fc4","../modules/web.url-search-params":"2494aebefd4ca447de0ef4cfdd47509e","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1"}],"5e5f16f67bd2b706d5eb103748915db5":[function(require,module,exports) {
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = !fails(function () {
  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0"}],"c01f437496192b363cd127030416cd5c":[function(require,module,exports) {
'use strict'; // based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js

var global = require('../internals/global');

var uncurryThis = require('../internals/function-uncurry-this');

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80

var delimiter = '-'; // '\x2D'

var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars

var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var RangeError = global.RangeError;
var exec = uncurryThis(regexSeparators.exec);
var floor = Math.floor;
var fromCharCode = String.fromCharCode;
var charCodeAt = uncurryThis(''.charCodeAt);
var join = uncurryThis([].join);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var split = uncurryThis(''.split);
var toLowerCase = uncurryThis(''.toLowerCase);
/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */

var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;

  while (counter < length) {
    var value = charCodeAt(string, counter++);

    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = charCodeAt(string, counter++);

      if ((extra & 0xFC00) == 0xDC00) {
        // Low surrogate.
        push(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        push(output, value);
        counter--;
      }
    } else {
      push(output, value);
    }
  }

  return output;
};
/**
 * Converts a digit/integer into a basic code point.
 */


var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};
/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */


var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);

  while (delta > baseMinusTMin * tMax >> 1) {
    delta = floor(delta / baseMinusTMin);
    k += base;
  }

  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};
/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */


var encode = function (input) {
  var output = []; // Convert the input in UCS-2 to an array of Unicode code points.

  input = ucs2decode(input); // Cache the length.

  var inputLength = input.length; // Initialize the state.

  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue; // Handle the basic code points.

  for (i = 0; i < input.length; i++) {
    currentValue = input[i];

    if (currentValue < 0x80) {
      push(output, fromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.

  var handledCPCount = basicLength; // number of code points that have been handled;
  // Finish the basic string with a delimiter unless it's empty.

  if (basicLength) {
    push(output, delimiter);
  } // Main encoding loop:


  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];

      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.


    var handledCPCountPlusOne = handledCPCount + 1;

    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];

      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }

      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        var k = base;

        while (true) {
          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          push(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
          k += base;
        }

        push(output, fromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        handledCPCount++;
      }
    }

    delta++;
    n++;
  }

  return join(output, '');
};

module.exports = function (input) {
  var encoded = [];
  var labels = split(replace(toLowerCase(input), regexSeparators, '\u002E'), '.');
  var i, label;

  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    push(encoded, exec(regexNonASCII, label) ? 'xn--' + encode(label) : label);
  }

  return join(encoded, '.');
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6"}],"2494aebefd4ca447de0ef4cfdd47509e":[function(require,module,exports) {
'use strict'; // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

require('../modules/es.array.iterator');

var $ = require('../internals/export');

var global = require('../internals/global');

var getBuiltIn = require('../internals/get-built-in');

var call = require('../internals/function-call');

var uncurryThis = require('../internals/function-uncurry-this');

var USE_NATIVE_URL = require('../internals/native-url');

var redefine = require('../internals/redefine');

var redefineAll = require('../internals/redefine-all');

var setToStringTag = require('../internals/set-to-string-tag');

var createIteratorConstructor = require('../internals/create-iterator-constructor');

var InternalStateModule = require('../internals/internal-state');

var anInstance = require('../internals/an-instance');

var isCallable = require('../internals/is-callable');

var hasOwn = require('../internals/has-own-property');

var bind = require('../internals/function-bind-context');

var classof = require('../internals/classof');

var anObject = require('../internals/an-object');

var isObject = require('../internals/is-object');

var $toString = require('../internals/to-string');

var create = require('../internals/object-create');

var createPropertyDescriptor = require('../internals/create-property-descriptor');

var getIterator = require('../internals/get-iterator');

var getIteratorMethod = require('../internals/get-iterator-method');

var wellKnownSymbol = require('../internals/well-known-symbol');

var arraySort = require('../internals/array-sort');

var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);
var n$Fetch = getBuiltIn('fetch');
var N$Request = getBuiltIn('Request');
var Headers = getBuiltIn('Headers');
var RequestPrototype = N$Request && N$Request.prototype;
var HeadersPrototype = Headers && Headers.prototype;
var RegExp = global.RegExp;
var TypeError = global.TypeError;
var decodeURIComponent = global.decodeURIComponent;
var encodeURIComponent = global.encodeURIComponent;
var charAt = uncurryThis(''.charAt);
var join = uncurryThis([].join);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var splice = uncurryThis([].splice);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);
var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = replace(it, plus, ' ');
  var bytes = 4;

  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = replace(result, percentSequence(bytes--), percentDecode);
    }

    return result;
  }
};

var find = /[!'()~]|%20/g;
var replacements = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replacements[match];
};

var serialize = function (it) {
  return replace(encodeURIComponent(it), find, replacer);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;

  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  }

  return step;
}, true);

var URLSearchParamsState = function (init) {
  this.entries = [];
  this.url = null;

  if (init !== undefined) {
    if (isObject(init)) this.parseObject(init);else this.parseQuery(typeof init == 'string' ? charAt(init, 0) === '?' ? stringSlice(init, 1) : init : $toString(init));
  }
};

URLSearchParamsState.prototype = {
  type: URL_SEARCH_PARAMS,
  bindURL: function (url) {
    this.url = url;
    this.update();
  },
  parseObject: function (object) {
    var iteratorMethod = getIteratorMethod(object);
    var iterator, next, step, entryIterator, entryNext, first, second;

    if (iteratorMethod) {
      iterator = getIterator(object, iteratorMethod);
      next = iterator.next;

      while (!(step = call(next, iterator)).done) {
        entryIterator = getIterator(anObject(step.value));
        entryNext = entryIterator.next;
        if ((first = call(entryNext, entryIterator)).done || (second = call(entryNext, entryIterator)).done || !call(entryNext, entryIterator).done) throw TypeError('Expected sequence with length 2');
        push(this.entries, {
          key: $toString(first.value),
          value: $toString(second.value)
        });
      }
    } else for (var key in object) if (hasOwn(object, key)) {
      push(this.entries, {
        key: key,
        value: $toString(object[key])
      });
    }
  },
  parseQuery: function (query) {
    if (query) {
      var attributes = split(query, '&');
      var index = 0;
      var attribute, entry;

      while (index < attributes.length) {
        attribute = attributes[index++];

        if (attribute.length) {
          entry = split(attribute, '=');
          push(this.entries, {
            key: deserialize(shift(entry)),
            value: deserialize(join(entry, '='))
          });
        }
      }
    }
  },
  serialize: function () {
    var entries = this.entries;
    var result = [];
    var index = 0;
    var entry;

    while (index < entries.length) {
      entry = entries[index++];
      push(result, serialize(entry.key) + '=' + serialize(entry.value));
    }

    return join(result, '&');
  },
  update: function () {
    this.entries.length = 0;
    this.parseQuery(this.url.query);
  },
  updateURL: function () {
    if (this.url) this.url.update();
  }
}; // `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams

var URLSearchParamsConstructor = function
  /* init */
URLSearchParams() {
  anInstance(this, URLSearchParamsPrototype);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  setInternalState(this, new URLSearchParamsState(init));
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;
redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    push(state.entries, {
      key: $toString(name),
      value: $toString(value)
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = $toString(name);
    var index = 0;

    while (index < entries.length) {
      if (entries[index].key === key) splice(entries, index, 1);else index++;
    }

    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var index = 0;

    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }

    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var result = [];
    var index = 0;

    for (; index < entries.length; index++) {
      if (entries[index].key === key) push(result, entries[index].value);
    }

    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var index = 0;

    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }

    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = $toString(name);
    var val = $toString(value);
    var index = 0;
    var entry;

    for (; index < entries.length; index++) {
      entry = entries[index];

      if (entry.key === key) {
        if (found) splice(entries, index--, 1);else {
          found = true;
          entry.value = val;
        }
      }
    }

    if (!found) push(entries, {
      key: key,
      value: val
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    arraySort(state.entries, function (a, b) {
      return a.key > b.key ? 1 : -1;
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback
  /* , thisArg */
  ) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined);
    var index = 0;
    var entry;

    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, {
  enumerable: true
}); // `URLSearchParams.prototype[@@iterator]` method

redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, {
  name: 'entries'
}); // `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior

redefine(URLSearchParamsPrototype, 'toString', function toString() {
  return getInternalParamsState(this).serialize();
}, {
  enumerable: true
});
setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);
$({
  global: true,
  forced: !USE_NATIVE_URL
}, {
  URLSearchParams: URLSearchParamsConstructor
}); // Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`

if (!USE_NATIVE_URL && isCallable(Headers)) {
  var headersHas = uncurryThis(HeadersPrototype.has);
  var headersSet = uncurryThis(HeadersPrototype.set);

  var wrapRequestOptions = function (init) {
    if (isObject(init)) {
      var body = init.body;
      var headers;

      if (classof(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();

        if (!headersHas(headers, 'content-type')) {
          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }

        return create(init, {
          body: createPropertyDescriptor(0, $toString(body)),
          headers: createPropertyDescriptor(0, headers)
        });
      }
    }

    return init;
  };

  if (isCallable(n$Fetch)) {
    $({
      global: true,
      enumerable: true,
      forced: true
    }, {
      fetch: function fetch(input
      /* , init */
      ) {
        return n$Fetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }

  if (isCallable(N$Request)) {
    var RequestConstructor = function Request(input
    /* , init */
    ) {
      anInstance(this, RequestPrototype);
      return new N$Request(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;
    $({
      global: true,
      forced: true
    }, {
      Request: RequestConstructor
    });
  }
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};
},{"../modules/es.array.iterator":"510aceb4694d90a939f4789a99a0ae3f","../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/function-call":"74736a18012731e2548e8322d30daf97","../internals/function-uncurry-this":"b9577e436bf35f351d6949937f43e4a6","../internals/native-url":"5e5f16f67bd2b706d5eb103748915db5","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/redefine-all":"ffd35f1bc6f8a9cf26e6fa0389f4748d","../internals/set-to-string-tag":"b474145c0d35c2cab8be2f2358364fc4","../internals/create-iterator-constructor":"b9bab68ecd62fef0c0fd01853566a2cf","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1","../internals/an-instance":"8b0daff12bd798defdb69ae41eea7f5e","../internals/is-callable":"305f89aa9a013f46af3c2284b8a3ce4f","../internals/has-own-property":"d97bfcc83949e538357d288583678586","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/classof":"be2998c5b4d0f20a1cc5fe6807661aae","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/is-object":"03244e745134af366d66b74456891052","../internals/to-string":"7aa27e4df959954bd0bf4a29c3e9ef77","../internals/object-create":"a92b509fc5fd0223c7351fe6c6b27164","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a","../internals/get-iterator":"95609b3cd4fe60efb5286ed1595b57b7","../internals/get-iterator-method":"ee70e79559122fe97016e526e216278d","../internals/well-known-symbol":"df9ad61e8404f948b528f2ef2becebe4","../internals/array-sort":"d7faf6b35c1ed5a2bc73ccee2639a205"}],"6357c5a053a36e38c0e24243e550dd86":[function(require,module,exports) {
'use strict';
var $ = require('../internals/export');
var call = require('../internals/function-call');

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
$({ target: 'URL', proto: true, enumerable: true }, {
  toJSON: function toJSON() {
    return call(URL.prototype.toString, this);
  }
});

},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/function-call":"74736a18012731e2548e8322d30daf97"}],"7ed9311e216aa789713f70ebeec3ed40":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _previewView = _interopRequireDefault(require("./previewView.js"));

var _view = _interopRequireDefault(require("./view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BookmarksView extends _view.default {
  _parentElement = document.querySelector('.bookmarks__list');

  _generateMarkup() {
    return this._data.map(recipe => _previewView.default.render(recipe, false)).join('');
  }

  addHandlerLoad(handler) {
    window.addEventListener('load', handler);
  }

}

var _default = new BookmarksView();

exports.default = _default;
},{"./previewView.js":"e4d6583325a8b6c9380670c4f233bf07","./view.js":"6a3957d8744bf1d70b2b44f3726dda59"}],"e4d6583325a8b6c9380670c4f233bf07":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class previewView extends _view.default {
  _generateMarkup() {
    const id = location.hash.slice(1);
    return `
      <li class="preview">
      <a class="preview__link ${this._data.id === id ? 'preview__link--active' : ''}" href="#${this._data.id}">
        <div class="preview__img">
          <img
            alt="${this._data.title}"
            src="${this._data.imageUrl}"
          />
        </div>

        <div class="preview__data">
          <p class="preview__title">
          ${this._data.title}
          </p>
          <p class="preview__publisher">${this._data.publisher}</p>
        </div>
        <div class="preview__user--generated ${this._data.key ? '' : 'hidden'}">
          <svg class="icon">
            <use href="${_icons.default}#icon-user"></use>
          </svg>
        </div>
      </a>
    </li>
      `;
  }

}

var _default = new previewView();

exports.default = _default;
},{"./view.js":"6a3957d8744bf1d70b2b44f3726dda59","url:../../img/icons.svg":"a12d7b6c8b301e75f62bcf3c7f4ef720"}],"6a3957d8744bf1d70b2b44f3726dda59":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class View {
  _data;
  _parentElement = '';
  _message = '';
  _error = '';

  _clear() {
    this._parentElement.textContent = '';
  }

  renderSpinner() {
    const html = `
    <div class="spinner">
    <svg class="icon">
      <use href="${_icons.default}#icon-loader"></use>
    </svg>
  </div>
    `;

    this._clear();

    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  render(data) {
    let render = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'true';
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   throw new Error('No results found ;)');
    this._data = data;
    if (!render) return this._generateMarkup();

    this._clear();

    this._parentElement.insertAdjacentHTML('beforeend', this._generateMarkup());
  }

  update(data) {
    this._data = data;

    const currentElement = this._parentElement.querySelectorAll('*');

    const newElement = document.createRange().createContextualFragment(this._generateMarkup()).querySelectorAll('*');
    currentElement.forEach((curEl, i) => {
      const newEl = newElement[i];

      if (!curEl.isEqualNode(newEl) && curEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }

      if (!curEl.isEqualNode(newEl)) {
        [...newEl.attributes].forEach(attr => curEl.setAttribute(attr.name, attr.value));
      }
    });
  }

  renderError() {
    let error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._error;
    const html = `
  <div class="msg msg-pale">
    <svg class="icon">
      <use href="${_icons.default}#icon-alert-triangle"></use>
    </svg>
    <span>${error}</span>
  </div>
    `;

    this._clear();

    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  renderMessage() {
    let message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._message;
    const html = `
  <div class="msg msg-green">
    <svg class="icon">
      <use href="${_icons.default}#icon-alert-circle"></use>
    </svg>
    <span>${message}</span>
  </div>
    `;

    this._clear();

    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

}

exports.default = View;
},{"url:../../img/icons.svg":"a12d7b6c8b301e75f62bcf3c7f4ef720"}],"a12d7b6c8b301e75f62bcf3c7f4ef720":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("cd35c7a058a23683", "55fe3d6fb4c0191e");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"2146da1905b95151ed14d455c784e7b7":[function(require,module,exports) {
"use strict";

/* globals document:readonly */
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


function getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

  if (!matches) {
    throw new Error('Origin not found');
  }

  return matches[0];
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;
},{}],"1b9943ef25c7bbdf0dd1b9fa91880a6c":[function(require,module,exports) {
"use strict";

var resolve = require('./bundle-manifest').resolve;

module.exports = function (fromId, toId) {
  return relative(dirname(resolve(fromId)), resolve(toId));
};

function dirname(_filePath) {
  if (_filePath === '') {
    return '.';
  }

  var filePath = _filePath[_filePath.length - 1] === '/' ? _filePath.slice(0, _filePath.length - 1) : _filePath;
  var slashIndex = filePath.lastIndexOf('/');
  return slashIndex === -1 ? '.' : filePath.slice(0, slashIndex);
}

function relative(from, to) {
  if (from === to) {
    return '';
  }

  var fromParts = from.split('/');

  if (fromParts[0] === '.') {
    fromParts.shift();
  }

  var toParts = to.split('/');

  if (toParts[0] === '.') {
    toParts.shift();
  } // Find where path segments diverge.


  var i;
  var divergeIndex;

  for (i = 0; (i < toParts.length || i < fromParts.length) && divergeIndex == null; i++) {
    if (fromParts[i] !== toParts[i]) {
      divergeIndex = i;
    }
  } // If there are segments from "from" beyond the point of divergence,
  // return back up the path to that point using "..".


  var parts = [];

  for (i = 0; i < fromParts.length - divergeIndex; i++) {
    parts.push('..');
  } // If there are segments from "to" beyond the point of divergence,
  // continue using the remaining segments.


  if (toParts.length > divergeIndex) {
    parts.push.apply(parts, toParts.slice(divergeIndex));
  }

  return parts.join('/');
}

module.exports._dirname = dirname;
module.exports._relative = relative;
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"d2063f3e7de2e4cdacfcb5eb6479db05":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaginationView extends _view.default {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const page = +this._data.page;
    const pages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    if (page === 1 && pages > 1) return this.#generateBtn();
    if (page === pages && pages > 1) return this.#generateBtn(false);
    if (page !== 1) return `${this.#generateBtn(false)}${this.#generateBtn()}`;
    return '';
  }

  #generateBtn() {
    let forward = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    let page = this._data.page;
    const goto = forward ? ++page : --page;
    return `
    <button class="btn search-results__btn" data-goto="${goto}">${goto} page</button>
        `;
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.search-results__btn');
      if (!btn) return;
      handler(btn.dataset.goto);
    });
  }

}

var _default = new PaginationView();

exports.default = _default;
},{"./view.js":"6a3957d8744bf1d70b2b44f3726dda59"}],"bcae1aced0301b01ccacb3e6f7dfede8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

var _fractional = require("fractional");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RecipeView extends _view.default {
  _parentElement = document.querySelector('.recipe');
  _error = 'API error';
  _message = '';

  _generateIngredients() {
    return this._data.ingredients.map(ing => `
        <li>
        <svg class="icon icon--orange">
          <use href="${_icons.default}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ing.quantity ? new _fractional.Fraction(ing.quantity).toString() : ''}</div>
        <div class="recipe__units">
        ${ing.unit}
          <span class="recipe__desc">
          ${ing.description}
          </span>
        </div>
      </li>
      `).join('');
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img
      alt="${this._data.title}"
      src="${this._data.imageUrl}"
    />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>
  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="icon icon--orange">
        <use href="${_icons.default}#icon-clock"></use>
      </svg>
      <p class="recipe__info-data">${this._data.cookingTime}</p>
      <p class="recipe__info-unit">minutes</p>
    </div>

    <div class="recipe__info">
      <svg class="icon icon--orange">
        <use href="${_icons.default}#icon-users"></use>
      </svg>
      <p class="recipe__info-data">${this._data.servings}</p>
      <p class="recipe__info-unit">servings</p>
    </div>

    <div class="recipe-container__btns">
      <button class="btn btn--servings" data-serve-to=${this._data.servings - 1}>
        <svg class="icon">
          <use href="${_icons.default}#icon-minus-circle"></use>
        </svg>
      </button>

      <button class="btn btn--servings" data-serve-to=${this._data.servings + 1}>
        <svg class="icon">
          <use href="${_icons.default}#icon-plus-circle"></use>
        </svg>
      </button>
    </div>

    <div class="user--generated ${this._data.key ? '' : 'hidden'}">
      <svg class="icon">
        <use href="${_icons.default}#icon-user"></use>
      </svg>
    </div>

    <button class="btn btn--bookmark">
      <svg class="icon">
        <use href="${_icons.default}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
      </svg>
    </button>
  </div>
  <div class="recipe-ingredients">
    <h1 class="heading-2">recipe ingredients</h1>
    <ul class="recipe-ingredients__list">
    ${this._generateIngredients()}
    </ul>
  </div>
  <div class="recipe-directions">
    <h1 class="heading-2">how to cook it</h1>
    <p>
      This recipe was carefully designed and tested by
      <strong>${this._data.publisher}</strong>. Please check out directions at
      their website.
    </p>
    <a class="btn btn--orange recipe-directions__btn" href="${this._data.sourceUrl}" target="_blank">
      <span>directions</span>
      <svg class="icon icon--white">
        <use href="${_icons.default}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
    `;
  }

  addHandlerLoad(handler) {
    const arr = ['hashchange', 'load'];
    arr.forEach(event => window.addEventListener(event, handler));
  }

  addHandlerServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--servings');
      if (!btn) return;
      const serveTo = +btn.dataset.serveTo;
      if (serveTo > 0 && serveTo < 1000) handler(serveTo);
    });
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

}

var _default = new RecipeView();

exports.default = _default;
},{"./view.js":"6a3957d8744bf1d70b2b44f3726dda59","url:../../img/icons.svg":"a12d7b6c8b301e75f62bcf3c7f4ef720","fractional":"ddbc156a7c16e105c8df04e9fdec967d"}],"ddbc156a7c16e105c8df04e9fdec967d":[function(require,module,exports) {
/*
fraction.js
A Javascript fraction library.

Copyright (c) 2009  Erik Garrison <erik@hypervolu.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/


/* Fractions */
/* 
 *
 * Fraction objects are comprised of a numerator and a denomenator.  These
 * values can be accessed at fraction.numerator and fraction.denomenator.
 *
 * Fractions are always returned and stored in lowest-form normalized format.
 * This is accomplished via Fraction.normalize.
 *
 * The following mathematical operations on fractions are supported:
 *
 * Fraction.equals
 * Fraction.add
 * Fraction.subtract
 * Fraction.multiply
 * Fraction.divide
 *
 * These operations accept both numbers and fraction objects.  (Best results
 * are guaranteed when the input is a fraction object.)  They all return a new
 * Fraction object.
 *
 * Usage:
 *
 * TODO
 *
 */

/*
 * The Fraction constructor takes one of:
 *   an explicit numerator (integer) and denominator (integer),
 *   a string representation of the fraction (string),
 *   or a floating-point number (float)
 *
 * These initialization methods are provided for convenience.  Because of
 * rounding issues the best results will be given when the fraction is
 * constructed from an explicit integer numerator and denomenator, and not a
 * decimal number.
 *
 *
 * e.g. new Fraction(1, 2) --> 1/2
 *      new Fraction('1/2') --> 1/2
 *      new Fraction('2 3/4') --> 11/4  (prints as 2 3/4)
 *
 */
Fraction = function(numerator, denominator)
{
    /* double argument invocation */
    if (typeof numerator !== 'undefined' && denominator) {
        if (typeof(numerator) === 'number' && typeof(denominator) === 'number') {
            this.numerator = numerator;
            this.denominator = denominator;
        } else if (typeof(numerator) === 'string' && typeof(denominator) === 'string') {
            // what are they?
            // hmm....
            // assume they are ints?
            this.numerator = parseInt(numerator);
            this.denominator = parseInt(denominator);
        }
    /* single-argument invocation */
    } else if (typeof denominator === 'undefined') {
        num = numerator; // swap variable names for legibility
        if (typeof(num) === 'number') {  // just a straight number init
            this.numerator = num;
            this.denominator = 1;
        } else if (typeof(num) === 'string') {
            var a, b;  // hold the first and second part of the fraction, e.g. a = '1' and b = '2/3' in 1 2/3
                       // or a = '2/3' and b = undefined if we are just passed a single-part number
            var arr = num.split(' ')
            if (arr[0]) a = arr[0]
            if (arr[1]) b = arr[1]
            /* compound fraction e.g. 'A B/C' */
            //  if a is an integer ...
            if (a % 1 === 0 && b && b.match('/')) {
                return (new Fraction(a)).add(new Fraction(b));
            } else if (a && !b) {
                /* simple fraction e.g. 'A/B' */
                if (typeof(a) === 'string' && a.match('/')) {
                    // it's not a whole number... it's actually a fraction without a whole part written
                    var f = a.split('/');
                    this.numerator = f[0]; this.denominator = f[1];
                /* string floating point */
                } else if (typeof(a) === 'string' && a.match('\.')) {
                    return new Fraction(parseFloat(a));
                /* whole number e.g. 'A' */
                } else { // just passed a whole number as a string
                    this.numerator = parseInt(a);
                    this.denominator = 1;
                }
            } else {
                return undefined; // could not parse
            }
        }
    }
    this.normalize();
}


Fraction.prototype.clone = function()
{
    return new Fraction(this.numerator, this.denominator);
}


/* pretty-printer, converts fractions into whole numbers and fractions */
Fraction.prototype.toString = function()
{
    if (this.denominator==='NaN') return 'NaN'
    var wholepart = (this.numerator/this.denominator>0) ?
      Math.floor(this.numerator / this.denominator) :
      Math.ceil(this.numerator / this.denominator)
    var numerator = this.numerator % this.denominator 
    var denominator = this.denominator;
    var result = []; 
    if (wholepart != 0)  
        result.push(wholepart);
    if (numerator != 0)  
        result.push(((wholepart===0) ? numerator : Math.abs(numerator)) + '/' + denominator);
    return result.length > 0 ? result.join(' ') : 0;
}


/* destructively rescale the fraction by some integral factor */
Fraction.prototype.rescale = function(factor)
{
    this.numerator *= factor;
    this.denominator *= factor;
    return this;
}


Fraction.prototype.add = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction) {
        b = b.clone();
    } else {
        b = new Fraction(b);
    }
    td = a.denominator;
    a.rescale(b.denominator);
    b.rescale(td);

    a.numerator += b.numerator;

    return a.normalize();
}


Fraction.prototype.subtract = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction) {
        b = b.clone();  // we scale our argument destructively, so clone
    } else {
        b = new Fraction(b);
    }
    td = a.denominator;
    a.rescale(b.denominator);
    b.rescale(td);

    a.numerator -= b.numerator;

    return a.normalize();
}


Fraction.prototype.multiply = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction)
    {
        a.numerator *= b.numerator;
        a.denominator *= b.denominator;
    } else if (typeof b === 'number') {
        a.numerator *= b;
    } else {
        return a.multiply(new Fraction(b));
    }
    return a.normalize();
}

Fraction.prototype.divide = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction)
    {
        a.numerator *= b.denominator;
        a.denominator *= b.numerator;
    } else if (typeof b === 'number') {
        a.denominator *= b;
    } else {
        return a.divide(new Fraction(b));
    }
    return a.normalize();
}

Fraction.prototype.equals = function(b)
{
    if (!(b instanceof Fraction)) {
        b = new Fraction(b);
    }
    // fractions that are equal should have equal normalized forms
    var a = this.clone().normalize();
    var b = b.clone().normalize();
    return (a.numerator === b.numerator && a.denominator === b.denominator);
}


/* Utility functions */

/* Destructively normalize the fraction to its smallest representation. 
 * e.g. 4/16 -> 1/4, 14/28 -> 1/2, etc.
 * This is called after all math ops.
 */
Fraction.prototype.normalize = (function()
{

    var isFloat = function(n)
    {
        return (typeof(n) === 'number' && 
                ((n > 0 && n % 1 > 0 && n % 1 < 1) || 
                 (n < 0 && n % -1 < 0 && n % -1 > -1))
               );
    }

    var roundToPlaces = function(n, places) 
    {
        if (!places) {
            return Math.round(n);
        } else {
            var scalar = Math.pow(10, places);
            return Math.round(n*scalar)/scalar;
        }
    }
        
    return (function() {

        // XXX hackish.  Is there a better way to address this issue?
        //
        /* first check if we have decimals, and if we do eliminate them
         * multiply by the 10 ^ number of decimal places in the number
         * round the number to nine decimal places
         * to avoid js floating point funnies
         */
        if (isFloat(this.denominator)) {
            var rounded = roundToPlaces(this.denominator, 9);
            var scaleup = Math.pow(10, rounded.toString().split('.')[1].length);
            this.denominator = Math.round(this.denominator * scaleup); // this !!! should be a whole number
            //this.numerator *= scaleup;
            this.numerator *= scaleup;
        } 
        if (isFloat(this.numerator)) {
            var rounded = roundToPlaces(this.numerator, 9);
            var scaleup = Math.pow(10, rounded.toString().split('.')[1].length);
            this.numerator = Math.round(this.numerator * scaleup); // this !!! should be a whole number
            //this.numerator *= scaleup;
            this.denominator *= scaleup;
        }
        var gcf = Fraction.gcf(this.numerator, this.denominator);
        this.numerator /= gcf;
        this.denominator /= gcf;
        if ((this.numerator < 0 && this.denominator < 0) || (this.numerator > 0 && this.denominator < 0)) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
        return this;
    });

})();


/* Takes two numbers and returns their greatest common factor.
 */
Fraction.gcf = function(a, b)
{

    var common_factors = [];
    var fa = Fraction.primeFactors(a);
    var fb = Fraction.primeFactors(b);
    // for each factor in fa
    // if it's also in fb
    // put it into the common factors
    fa.forEach(function (factor) 
    { 
        var i = fb.indexOf(factor);
        if (i >= 0) {
            common_factors.push(factor);
            fb.splice(i,1); // remove from fb
        }
    });

    if (common_factors.length === 0)
        return 1;

    var gcf = (function() {
        var r = common_factors[0];
        var i;
        for (i=1;i<common_factors.length;i++)
        {
            r = r * common_factors[i];
        }
        return r;
    })();

    return gcf;

};


// Adapted from: 
// http://www.btinternet.com/~se16/js/factor.htm
Fraction.primeFactors = function(n) 
{

    var num = Math.abs(n);
    var factors = [];
    var _factor = 2;  // first potential prime factor

    while (_factor * _factor <= num)  // should we keep looking for factors?
    {      
      if (num % _factor === 0)  // this is a factor
        { 
            factors.push(_factor);  // so keep it
            num = num/_factor;  // and divide our search point by it
        }
        else
        {
            _factor++;  // and increment
        }
    }

    if (num != 1)                    // If there is anything left at the end...
    {                                // ...this must be the last prime factor
        factors.push(num);           //    so it too should be recorded
    }

    return factors;                  // Return the prime factors
}

module.exports.Fraction = Fraction

},{}],"eacdbc0d50ee3d2819f3ee59366c2773":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

var _previewView = _interopRequireDefault(require("./previewView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class resultsView extends _view.default {
  _parentElement = document.querySelector('.results');
  _error = 'No results found';

  _generateMarkup() {
    return this._data.map(recipe => _previewView.default.render(recipe, false)).join('');
  }

}

var _default = new resultsView();

exports.default = _default;
},{"./view.js":"6a3957d8744bf1d70b2b44f3726dda59","./previewView.js":"e4d6583325a8b6c9380670c4f233bf07"}],"c5d792f7cac03ef65de30cc0fbb2cae7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class searchView extends _view.default {
  _parentElement = document.querySelector('.search');

  addEventHandlerSearch(handler) {
    document.querySelector('.form-search__btn').addEventListener('click', function (e) {
      e.preventDefault();
      const searchField = document.querySelector('.search__field');
      const query = searchField.value;
      searchField.value = '';
      if (!query) return;
      handler(query);
    });
  }

}

var _default = new searchView();

exports.default = _default;
},{"./view.js":"6a3957d8744bf1d70b2b44f3726dda59"}],"6859a113216d26d12319d972bf2b430e":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Uploadrecipe extends _view.default {
  _parentElement = document.querySelector('.upload');
  _form = document.querySelector('.upload__form');
  _overlay = document.querySelector('.overlay');
  _message = 'Successfully uploaded!';

  constructor() {
    super();
    this.#addHandlerShowModal();
    this.#addHandlerHideModal();
  }

  toggleModal() {
    this._parentElement.classList.toggle('hidden');

    this._overlay.classList.toggle('hidden');
  }

  #addHandlerShowModal() {
    document.querySelector('.nav__btn--add').addEventListener('click', this.toggleModal.bind(this));
  }

  #addHandlerHideModal() {
    document.querySelector('.btn--upload__close').addEventListener('click', this.toggleModal.bind(this));
  }

  #upload(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this._parentElement));
  }

  addHandlerupload(handler) {
    this._form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(this));
      handler(data);
    });
  }

}

var _default = new Uploadrecipe();

exports.default = _default;
},{"./view.js":"6a3957d8744bf1d70b2b44f3726dda59"}]},{},["4e14bf6bf4c630cb0c4fc1fc7a96224b","ebf185b1fe3ce8eccf95010af6b899b5","175e469a7ea7db1c8c0744d04372621f"], null)

//# sourceMappingURL=controller.53bb8a8d.js.map
