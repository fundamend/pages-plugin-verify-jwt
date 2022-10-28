var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// ../../../node_modules/cookie/index.js
var require_cookie = __commonJS({
  "../../../node_modules/cookie/index.js"(exports) {
    "use strict";
    init_functionsRoutes_0_9092710409801945();
    exports.parse = parse3;
    exports.serialize = serialize;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options || {};
      var dec = opt.decode || decode;
      var index = 0;
      while (index < str.length) {
        var eqIdx = str.indexOf("=", index);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key = str.slice(index, eqIdx).trim();
        if (obj[key] === void 0) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key] = tryDecode(val, dec);
        }
        index = endIdx + 1;
      }
      return obj;
    }
    function serialize(name, val, options) {
      var opt = options || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (opt.maxAge != null) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// ../../../node_modules/@tsndr/cloudflare-worker-jwt/index.js
var require_cloudflare_worker_jwt = __commonJS({
  "../../../node_modules/@tsndr/cloudflare-worker-jwt/index.js"(exports) {
    "use strict";
    init_functionsRoutes_0_9092710409801945();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decode = exports.verify = exports.sign = void 0;
    if (typeof crypto === "undefined" || !crypto.subtle)
      throw new Error("SubtleCrypto not supported!");
    function base64UrlParse(s) {
      return new Uint8Array(Array.prototype.map.call(atob(s.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), (c) => c.charCodeAt(0)));
    }
    function base64UrlStringify(a) {
      return btoa(String.fromCharCode.apply(0, a)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    var algorithms = {
      ES256: { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } },
      ES384: { name: "ECDSA", namedCurve: "P-384", hash: { name: "SHA-384" } },
      ES512: { name: "ECDSA", namedCurve: "P-521", hash: { name: "SHA-512" } },
      HS256: { name: "HMAC", hash: { name: "SHA-256" } },
      HS384: { name: "HMAC", hash: { name: "SHA-384" } },
      HS512: { name: "HMAC", hash: { name: "SHA-512" } },
      RS256: { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } },
      RS384: { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-384" } },
      RS512: { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-512" } }
    };
    function _utf8ToUint8Array(str) {
      return base64UrlParse(btoa(unescape(encodeURIComponent(str))));
    }
    function _str2ab(str) {
      str = atob(str);
      const buf = new ArrayBuffer(str.length);
      const bufView = new Uint8Array(buf);
      for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }
    function _decodePayload(raw) {
      switch (raw.length % 4) {
        case 0:
          break;
        case 2:
          raw += "==";
          break;
        case 3:
          raw += "=";
          break;
        default:
          throw new Error("Illegal base64url string!");
      }
      try {
        return JSON.parse(decodeURIComponent(escape(atob(raw))));
      } catch {
        return null;
      }
    }
    async function sign(payload, secret, options = { algorithm: "HS256", header: { typ: "JWT" } }) {
      if (typeof options === "string")
        options = { algorithm: options, header: { typ: "JWT" } };
      options = { algorithm: "HS256", header: { typ: "JWT" }, ...options };
      if (payload === null || typeof payload !== "object")
        throw new Error("payload must be an object");
      if (typeof secret !== "string")
        throw new Error("secret must be a string");
      if (typeof options.algorithm !== "string")
        throw new Error("options.algorithm must be a string");
      const algorithm = algorithms[options.algorithm];
      if (!algorithm)
        throw new Error("algorithm not found");
      payload.iat = Math.floor(Date.now() / 1e3);
      const payloadAsJSON = JSON.stringify(payload);
      const partialToken = `${base64UrlStringify(_utf8ToUint8Array(JSON.stringify({ ...options.header, alg: options.algorithm })))}.${base64UrlStringify(_utf8ToUint8Array(payloadAsJSON))}`;
      let keyFormat = "raw";
      let keyData;
      if (secret.startsWith("-----BEGIN")) {
        keyFormat = "pkcs8";
        keyData = _str2ab(secret.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, ""));
      } else
        keyData = _utf8ToUint8Array(secret);
      const key = await crypto.subtle.importKey(keyFormat, keyData, algorithm, false, ["sign"]);
      const signature = await crypto.subtle.sign(algorithm, key, _utf8ToUint8Array(partialToken));
      return `${partialToken}.${base64UrlStringify(new Uint8Array(signature))}`;
    }
    exports.sign = sign;
    async function verify(token, secret, options = { algorithm: "HS256", throwError: false }) {
      if (typeof options === "string")
        options = { algorithm: options, throwError: false };
      options = { algorithm: "HS256", throwError: false, ...options };
      if (typeof token !== "string")
        throw new Error("token must be a string");
      if (typeof secret !== "string")
        throw new Error("secret must be a string");
      if (typeof options.algorithm !== "string")
        throw new Error("options.algorithm must be a string");
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3)
        throw new Error("token must consist of 3 parts");
      const algorithm = algorithms[options.algorithm];
      if (!algorithm)
        throw new Error("algorithm not found");
      const { payload } = decode(token);
      if (!payload) {
        if (options.throwError)
          throw "PARSE_ERROR";
        return false;
      }
      if (payload.nbf && payload.nbf > Math.floor(Date.now() / 1e3)) {
        if (options.throwError)
          throw "NOT_YET_VALID";
        return false;
      }
      if (payload.exp && payload.exp <= Math.floor(Date.now() / 1e3)) {
        if (options.throwError)
          throw "EXPIRED";
        return false;
      }
      let keyFormat = "raw";
      let keyData;
      if (secret.startsWith("-----BEGIN")) {
        keyFormat = "spki";
        keyData = _str2ab(secret.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, ""));
      } else
        keyData = _utf8ToUint8Array(secret);
      const key = await crypto.subtle.importKey(keyFormat, keyData, algorithm, false, ["verify"]);
      return await crypto.subtle.verify(algorithm, key, base64UrlParse(tokenParts[2]), _utf8ToUint8Array(`${tokenParts[0]}.${tokenParts[1]}`));
    }
    exports.verify = verify;
    function decode(token) {
      return {
        header: _decodePayload(token.split(".")[0].replace(/-/g, "+").replace(/_/g, "/")),
        payload: _decodePayload(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
      };
    }
    exports.decode = decode;
    exports.default = {
      sign,
      verify,
      decode
    };
  }
});

// functions/_middleware.js
var import_cookie, import_cloudflare_worker_jwt, onRequest;
var init_middleware = __esm({
  "functions/_middleware.js"() {
    init_functionsRoutes_0_9092710409801945();
    import_cookie = __toESM(require_cookie(), 1);
    import_cloudflare_worker_jwt = __toESM(require_cloudflare_worker_jwt(), 1);
    onRequest = async ({ request, next, env }) => {
      const cookies = (0, import_cookie.parse)(request.headers.get("Cookie") || "");
      const sessionToken = cookies["__session"];
      const publicKey = "-----BEGIN PUBLIC KEY-----\n" + env.JWT_VERIFICATION_KEY.match(/.{1,64}/g).join("\n") + "\n-----END PUBLIC KEY-----";
      let isValid = false;
      if (sessionToken) {
        isValid = await import_cloudflare_worker_jwt.default.verify(sessionToken, publicKey, { algorithm: "RS256" });
      }
      if (!isValid) {
        return new Response(null, { status: 401 });
      } else {
        return next();
      }
    };
  }
});

// ../../../../../../../../tmp/functionsRoutes-0.9092710409801945.mjs
var routes;
var init_functionsRoutes_0_9092710409801945 = __esm({
  "../../../../../../../../tmp/functionsRoutes-0.9092710409801945.mjs"() {
    init_middleware();
    routes = [
      {
        routePath: "/",
        mountPath: "/",
        method: "",
        middlewares: [onRequest],
        modules: []
      }
    ];
  }
});

// ../../../node_modules/wrangler/pages/functions/template-plugin.ts
init_functionsRoutes_0_9092710409801945();

// ../../../node_modules/path-to-regexp/dist.es2015/index.js
init_functionsRoutes_0_9092710409801945();
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
  var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse2(path, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            route += "((?:".concat(token.pattern, ")").concat(token.modifier, ")");
          } else {
            route += "(".concat(token.pattern, ")").concat(token.modifier);
          }
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}

// ../../../node_modules/wrangler/pages/functions/template-plugin.ts
function* executeRequest(request, relativePathname) {
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath, { end: false });
    const mountMatcher = match(route.mountPath, { end: false });
    const matchResult = routeMatcher(relativePathname);
    const mountMatchResult = mountMatcher(relativePathname);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath, { end: true });
    const mountMatcher = match(route.mountPath, { end: false });
    const matchResult = routeMatcher(relativePathname);
    const mountMatchResult = mountMatcher(relativePathname);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
function template_plugin_default(pluginArgs) {
  const onRequest2 = async (workerContext) => {
    let { request } = workerContext;
    const { env, next, data } = workerContext;
    const url = new URL(request.url);
    const relativePathname = `/${url.pathname.split(workerContext.functionPath)[1] || ""}`.replace(/^\/\//, "/");
    const handlerIterator = executeRequest(request, relativePathname);
    const pluginNext = async (input, init) => {
      if (input !== void 0) {
        request = new Request(input, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request,
          functionPath: workerContext.functionPath + path,
          next: pluginNext,
          params,
          data,
          pluginArgs,
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext)
        };
        const response = await handler(context);
        return new Response([101, 204, 205, 304].includes(response.status) ? null : response.body, { ...response, headers: new Headers(response.headers) });
      } else {
        return next();
      }
    };
    return pluginNext();
  };
  return onRequest2;
}
export {
  template_plugin_default as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
