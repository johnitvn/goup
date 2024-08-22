'use strict';
var S_ = Object.create;
var br = Object.defineProperty;
var R_ = Object.getOwnPropertyDescriptor;
var T_ = Object.getOwnPropertyNames;
var O_ = Object.getPrototypeOf,
  C_ = Object.prototype.hasOwnProperty;
var ce = (t, e) => () => (t && (e = t((t = 0))), e);
var y = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports),
  Zt = (t, e) => {
    for (var i in e) br(t, i, { get: e[i], enumerable: !0 });
  },
  Vp = (t, e, i, n) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let s of T_(e))
        !C_.call(t, s) && s !== i && br(t, s, { get: () => e[s], enumerable: !(n = R_(e, s)) || n.enumerable });
    return t;
  };
var Tt = (t, e, i) => (
    (i = t != null ? S_(O_(t)) : {}),
    Vp(e || !t || !t.__esModule ? br(i, 'default', { value: t, enumerable: !0 }) : i, t)
  ),
  Qt = (t) => Vp(br({}, '__esModule', { value: !0 }), t);
var Yp = {};
Zt(Yp, { configureLightClientRequire: () => I_, lightClientRequire: () => M });
function M(t) {
  let e;
  try {
    e = JSON.parse(process.env.NX_CLOUD_LIGHT_CLIENT_RESOLUTION_PATHS);
  } catch {
    e = [];
  }
  if (e.length === 0)
    throw new Error('Light client require must have paths configured with `configureLightClientRequire`.');
  let i;
  try {
    i = require.resolve(t, { paths: e });
  } catch (n) {
    throw (
      (process.env.NX_VERBOSE_LOGGING === 'true' &&
        console.error(
          `Was not able to require.resolve module ${t} from the following paths: ${e}. This may be expected.`
        ),
      n)
    );
  }
  try {
    return require(i);
  } catch (n) {
    throw (
      (process.env.NX_VERBOSE_LOGGING === 'true' &&
        console.error(`Was not able require module ${t} from path ${i}. This may be expected. `),
      n)
    );
  }
}
function I_(t) {
  process.env.NX_CLOUD_LIGHT_CLIENT_RESOLUTION_PATHS = JSON.stringify(t);
}
var os = ce(() => {
  'use strict';
});
var To = y((Y) => {
  'use strict';
  var Ro = require('path');
  os();
  try {
    try {
      let t;
      try {
        t = M('nx/src/utils/app-root').workspaceRoot;
      } catch {
        t = M('nx/src/utils/workspace-root').workspaceRoot;
      }
      let { getDependencyConfigs: e } = M('nx/src/tasks-runner/utils'),
        i = M('nx/tasks-runners/default').default,
        { CompositeLifeCycle: n } = M('nx/src/tasks-runner/life-cycle'),
        s = null;
      try {
        s = M('nx/src/index').initTasksRunner;
      } catch {}
      let r;
      try {
        r = M('nx/src/devkit-exports').cacheDir;
      } catch {
        try {
          r = M('nx/src/utils/cache-directory').cacheDir;
        } catch {
          r = (0, Ro.join)(t, './node_modules/.cache/nx');
        }
      }
      let a;
      try {
        a = M('nx/src/utils/cache-directory').workspaceDataDirectory ?? r;
      } catch {
        a = r;
      }
      let o = M('nx/src/tasks-runner/utils').isCacheableTask,
        u,
        l,
        c;
      try {
        (u = M('nx/src/devkit-exports').getPackageManagerCommand),
          (l = M('nx/src/devkit-exports').detectPackageManager),
          (c = M('nx/src/devkit-exports').writeJsonFile);
      } catch {
        (u = M('nx/src/utils/package-manager').getPackageManagerCommand),
          (l = M('nx/src/utils/package-manager').detectPackageManager),
          (c = M('nx/src/utils/fileutils').writeJsonFile);
      }
      let p;
      try {
        p = M('nx/src/tasks-runner/cache').getCache;
      } catch {}
      (Y.cacheDirectory = r),
        (Y.runnerReturnsPromise = !0),
        (Y.tasksRunner = i),
        (Y.CompositeLifeCycle = n),
        (Y.getDependencyConfigs = e),
        (Y.initTasksRunner = s),
        (Y.isCacheableTask = o),
        (Y.getPackageManagerCommand = u),
        (Y.detectPackageManager = l),
        (Y.writeJsonFile = c),
        (Y.workspaceDataDirectory = a),
        (Y.getCache = p);
    } catch {
      let { appRootPath: e, workspaceRoot: i } = M('@nrwl/tao/src/utils/app-root'),
        n = e ?? i,
        { getDependencyConfigs: s } = M('@nrwl/workspace/src/tasks-runner/utils'),
        { tasksRunnerV2: r } = M('@nrwl/workspace/src/tasks-runner/tasks-runner-v2'),
        a;
      try {
        a = M('@nrwl/workspace/src/tasks-runner/life-cycle').CompositeLifeCycle;
      } catch {}
      let o = M('@nrwl/workspace/src/tasks-runner/utils').isCacheableTask,
        u = M('@nrwl/devkit/index').getPackageManagerCommand,
        l = M('@nrwl/devkit/index').detectPackageManager,
        c = M('@nrwl/devkit/index').writeJsonFile;
      (Y.cacheDirectory = (0, Ro.join)(n, './node_modules/.cache/nx')),
        (Y.runnerReturnsPromise = !1),
        (Y.tasksRunner = r),
        (Y.CompositeLifeCycle = a),
        (Y.getDependencyConfigs = s),
        (Y.initTasksRunner = null),
        (Y.isCacheableTask = o),
        (Y.workspaceDataDirectory = Y.cacheDirectory),
        (Y.getPackageManagerCommand = u),
        (Y.detectPackageManager = l),
        (Y.writeJsonFile = c),
        (Y.getCache = void 0);
    }
  } catch (t) {
    process.env.NX_VERBOSE_LOGGING === 'true' && console.log(t),
      console.error('NX CLOUD ERROR'),
      console.error('---------------------------------------'),
      console.error(
        'This version of Nx Cloud is incompatible with the @nrwl/* and @nx/* packages in your workspace, or Nx was not installed properly.'
      ),
      console.error(''),
      console.error('Verify your install step was successful, and if it was,'),
      console.error(
        'match your @nrwl/nx-cloud version to the same major version of your @nx/* and @nrwl/* packages and try again.'
      ),
      console.error('---------------------------------------'),
      process.exit(1);
  }
});
function Jp() {
  return (
    process.env.CI === 'true' ||
    process.env.TF_BUILD === 'true' ||
    process.env.GITHUB_ACTIONS === 'true' ||
    process.env.BUILDKITE === 'true' ||
    process.env.CIRCLECI === 'true' ||
    process.env.CIRRUS_CI === 'true' ||
    process.env.TRAVIS === 'true' ||
    !!process.env['bamboo.buildKey'] ||
    !!process.env.CODEBUILD_BUILD_ID ||
    !!process.env.GITLAB_CI ||
    !!process.env.HEROKU_TEST_RUN_ID ||
    !!process.env.BUILD_ID ||
    !!process.env.BUILD_BUILDID ||
    !!process.env.TEAMCITY_VERSION
  );
}
var Zp = ce(() => {
  'use strict';
});
var id = y((iL, Oo) => {
  'use strict';
  var N_ = require('fs'),
    Qp = require('path'),
    k_ = require('os');
  function ed(t) {
    console.log(`[dotenv][DEBUG] ${t}`);
  }
  var L_ = `
`,
    A_ = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,
    D_ = /\\n/g,
    F_ = /\r\n|\n|\r/;
  function td(t, e) {
    let i = !!(e && e.debug),
      n = {};
    return (
      t
        .toString()
        .split(F_)
        .forEach(function (s, r) {
          let a = s.match(A_);
          if (a != null) {
            let o = a[1],
              u = a[2] || '',
              l = u.length - 1,
              c = u[0] === '"' && u[l] === '"';
            (u[0] === "'" && u[l] === "'") || c
              ? ((u = u.substring(1, l)), c && (u = u.replace(D_, L_)))
              : (u = u.trim()),
              (n[o] = u);
          } else i && ed(`did not match key and value when parsing line ${r + 1}: ${s}`);
        }),
      n
    );
  }
  function P_(t) {
    return t[0] === '~' ? Qp.join(k_.homedir(), t.slice(1)) : t;
  }
  function U_(t) {
    let e = Qp.resolve(process.cwd(), '.env'),
      i = 'utf8',
      n = !1;
    t && (t.path != null && (e = P_(t.path)), t.encoding != null && (i = t.encoding), t.debug != null && (n = !0));
    try {
      let s = td(N_.readFileSync(e, { encoding: i }), { debug: n });
      return (
        Object.keys(s).forEach(function (r) {
          Object.prototype.hasOwnProperty.call(process.env, r)
            ? n && ed(`"${r}" is already defined in \`process.env\` and will not be overwritten`)
            : (process.env[r] = s[r]);
        }),
        { parsed: s }
      );
    } catch (s) {
      return { error: s };
    }
  }
  Oo.exports.config = U_;
  Oo.exports.parse = td;
});
var nd = y((cs, Co) => {
  'use strict';
  (function (t, e) {
    typeof cs == 'object' && typeof Co == 'object'
      ? (Co.exports = e(require('child_process'), require('crypto')))
      : typeof define == 'function' && define.amd
      ? define(['child_process', 'crypto'], e)
      : typeof cs == 'object'
      ? (cs['electron-machine-id'] = e(require('child_process'), require('crypto')))
      : (t['electron-machine-id'] = e(t.child_process, t.crypto));
  })(cs, function (t, e) {
    return (function (i) {
      function n(r) {
        if (s[r]) return s[r].exports;
        var a = (s[r] = { exports: {}, id: r, loaded: !1 });
        return i[r].call(a.exports, a, a.exports, n), (a.loaded = !0), a.exports;
      }
      var s = {};
      return (n.m = i), (n.c = s), (n.p = ''), n(0);
    })([
      function (i, n, s) {
        i.exports = s(34);
      },
      function (i, n, s) {
        var r = s(29)('wks'),
          a = s(33),
          o = s(2).Symbol,
          u = typeof o == 'function',
          l = (i.exports = function (c) {
            return r[c] || (r[c] = (u && o[c]) || (u ? o : a)('Symbol.' + c));
          });
        l.store = r;
      },
      function (i, n) {
        var s = (i.exports =
          typeof window < 'u' && window.Math == Math
            ? window
            : typeof self < 'u' && self.Math == Math
            ? self
            : Function('return this')());
        typeof __g == 'number' && (__g = s);
      },
      function (i, n, s) {
        var r = s(9);
        i.exports = function (a) {
          if (!r(a)) throw TypeError(a + ' is not an object!');
          return a;
        };
      },
      function (i, n, s) {
        i.exports = !s(24)(function () {
          return (
            Object.defineProperty({}, 'a', {
              get: function () {
                return 7;
              },
            }).a != 7
          );
        });
      },
      function (i, n, s) {
        var r = s(12),
          a = s(17);
        i.exports = s(4)
          ? function (o, u, l) {
              return r.f(o, u, a(1, l));
            }
          : function (o, u, l) {
              return (o[u] = l), o;
            };
      },
      function (i, n) {
        var s = (i.exports = { version: '2.4.0' });
        typeof __e == 'number' && (__e = s);
      },
      function (i, n, s) {
        var r = s(14);
        i.exports = function (a, o, u) {
          if ((r(a), o === void 0)) return a;
          switch (u) {
            case 1:
              return function (l) {
                return a.call(o, l);
              };
            case 2:
              return function (l, c) {
                return a.call(o, l, c);
              };
            case 3:
              return function (l, c, p) {
                return a.call(o, l, c, p);
              };
          }
          return function () {
            return a.apply(o, arguments);
          };
        };
      },
      function (i, n) {
        var s = {}.hasOwnProperty;
        i.exports = function (r, a) {
          return s.call(r, a);
        };
      },
      function (i, n) {
        i.exports = function (s) {
          return typeof s == 'object' ? s !== null : typeof s == 'function';
        };
      },
      function (i, n) {
        i.exports = {};
      },
      function (i, n) {
        var s = {}.toString;
        i.exports = function (r) {
          return s.call(r).slice(8, -1);
        };
      },
      function (i, n, s) {
        var r = s(3),
          a = s(26),
          o = s(32),
          u = Object.defineProperty;
        n.f = s(4)
          ? Object.defineProperty
          : function (l, c, p) {
              if ((r(l), (c = o(c, !0)), r(p), a))
                try {
                  return u(l, c, p);
                } catch {}
              if ('get' in p || 'set' in p) throw TypeError('Accessors not supported!');
              return 'value' in p && (l[c] = p.value), l;
            };
      },
      function (i, n, s) {
        var r = s(42),
          a = s(15);
        i.exports = function (o) {
          return r(a(o));
        };
      },
      function (i, n) {
        i.exports = function (s) {
          if (typeof s != 'function') throw TypeError(s + ' is not a function!');
          return s;
        };
      },
      function (i, n) {
        i.exports = function (s) {
          if (s == null) throw TypeError("Can't call method on  " + s);
          return s;
        };
      },
      function (i, n, s) {
        var r = s(9),
          a = s(2).document,
          o = r(a) && r(a.createElement);
        i.exports = function (u) {
          return o ? a.createElement(u) : {};
        };
      },
      function (i, n) {
        i.exports = function (s, r) {
          return { enumerable: !(1 & s), configurable: !(2 & s), writable: !(4 & s), value: r };
        };
      },
      function (i, n, s) {
        var r = s(12).f,
          a = s(8),
          o = s(1)('toStringTag');
        i.exports = function (u, l, c) {
          u && !a((u = c ? u : u.prototype), o) && r(u, o, { configurable: !0, value: l });
        };
      },
      function (i, n, s) {
        var r = s(29)('keys'),
          a = s(33);
        i.exports = function (o) {
          return r[o] || (r[o] = a(o));
        };
      },
      function (i, n) {
        var s = Math.ceil,
          r = Math.floor;
        i.exports = function (a) {
          return isNaN((a = +a)) ? 0 : (a > 0 ? r : s)(a);
        };
      },
      function (i, n, s) {
        var r = s(11),
          a = s(1)('toStringTag'),
          o =
            r(
              (function () {
                return arguments;
              })()
            ) == 'Arguments',
          u = function (l, c) {
            try {
              return l[c];
            } catch {}
          };
        i.exports = function (l) {
          var c, p, d;
          return l === void 0
            ? 'Undefined'
            : l === null
            ? 'Null'
            : typeof (p = u((c = Object(l)), a)) == 'string'
            ? p
            : o
            ? r(c)
            : (d = r(c)) == 'Object' && typeof c.callee == 'function'
            ? 'Arguments'
            : d;
        };
      },
      function (i, n) {
        i.exports =
          'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
      },
      function (i, n, s) {
        var r = s(2),
          a = s(6),
          o = s(7),
          u = s(5),
          l = 'prototype',
          c = function (p, d, f) {
            var h,
              m,
              b,
              v = p & c.F,
              E = p & c.G,
              g = p & c.S,
              N = p & c.P,
              P = p & c.B,
              O = p & c.W,
              W = E ? a : a[d] || (a[d] = {}),
              U = W[l],
              R = E ? r : g ? r[d] : (r[d] || {})[l];
            E && (f = d);
            for (h in f)
              (m = !v && R && R[h] !== void 0),
                (m && h in W) ||
                  ((b = m ? R[h] : f[h]),
                  (W[h] =
                    E && typeof R[h] != 'function'
                      ? f[h]
                      : P && m
                      ? o(b, r)
                      : O && R[h] == b
                      ? (function (k) {
                          var A = function (q, j, F) {
                            if (this instanceof k) {
                              switch (arguments.length) {
                                case 0:
                                  return new k();
                                case 1:
                                  return new k(q);
                                case 2:
                                  return new k(q, j);
                              }
                              return new k(q, j, F);
                            }
                            return k.apply(this, arguments);
                          };
                          return (A[l] = k[l]), A;
                        })(b)
                      : N && typeof b == 'function'
                      ? o(Function.call, b)
                      : b),
                  N && (((W.virtual || (W.virtual = {}))[h] = b), p & c.R && U && !U[h] && u(U, h, b)));
          };
        (c.F = 1), (c.G = 2), (c.S = 4), (c.P = 8), (c.B = 16), (c.W = 32), (c.U = 64), (c.R = 128), (i.exports = c);
      },
      function (i, n) {
        i.exports = function (s) {
          try {
            return !!s();
          } catch {
            return !0;
          }
        };
      },
      function (i, n, s) {
        i.exports = s(2).document && document.documentElement;
      },
      function (i, n, s) {
        i.exports =
          !s(4) &&
          !s(24)(function () {
            return (
              Object.defineProperty(s(16)('div'), 'a', {
                get: function () {
                  return 7;
                },
              }).a != 7
            );
          });
      },
      function (i, n, s) {
        'use strict';
        var r = s(28),
          a = s(23),
          o = s(57),
          u = s(5),
          l = s(8),
          c = s(10),
          p = s(45),
          d = s(18),
          f = s(52),
          h = s(1)('iterator'),
          m = !([].keys && 'next' in [].keys()),
          b = '@@iterator',
          v = 'keys',
          E = 'values',
          g = function () {
            return this;
          };
        i.exports = function (N, P, O, W, U, R, k) {
          p(O, P, W);
          var A,
            q,
            j,
            F = function (T) {
              if (!m && T in S) return S[T];
              switch (T) {
                case v:
                  return function () {
                    return new O(this, T);
                  };
                case E:
                  return function () {
                    return new O(this, T);
                  };
              }
              return function () {
                return new O(this, T);
              };
            },
            z = P + ' Iterator',
            G = U == E,
            w = !1,
            S = N.prototype,
            L = S[h] || S[b] || (U && S[U]),
            ie = L || F(U),
            Q = U ? (G ? F('entries') : ie) : void 0,
            _ = (P == 'Array' && S.entries) || L;
          if (
            (_ && ((j = f(_.call(new N()))), j !== Object.prototype && (d(j, z, !0), r || l(j, h) || u(j, h, g))),
            G &&
              L &&
              L.name !== E &&
              ((w = !0),
              (ie = function () {
                return L.call(this);
              })),
            (r && !k) || (!m && !w && S[h]) || u(S, h, ie),
            (c[P] = ie),
            (c[z] = g),
            U)
          )
            if (((A = { values: G ? ie : F(E), keys: R ? ie : F(v), entries: Q }), k))
              for (q in A) q in S || o(S, q, A[q]);
            else a(a.P + a.F * (m || w), P, A);
          return A;
        };
      },
      function (i, n) {
        i.exports = !0;
      },
      function (i, n, s) {
        var r = s(2),
          a = '__core-js_shared__',
          o = r[a] || (r[a] = {});
        i.exports = function (u) {
          return o[u] || (o[u] = {});
        };
      },
      function (i, n, s) {
        var r,
          a,
          o,
          u = s(7),
          l = s(41),
          c = s(25),
          p = s(16),
          d = s(2),
          f = d.process,
          h = d.setImmediate,
          m = d.clearImmediate,
          b = d.MessageChannel,
          v = 0,
          E = {},
          g = 'onreadystatechange',
          N = function () {
            var O = +this;
            if (E.hasOwnProperty(O)) {
              var W = E[O];
              delete E[O], W();
            }
          },
          P = function (O) {
            N.call(O.data);
          };
        (h && m) ||
          ((h = function (O) {
            for (var W = [], U = 1; arguments.length > U; ) W.push(arguments[U++]);
            return (
              (E[++v] = function () {
                l(typeof O == 'function' ? O : Function(O), W);
              }),
              r(v),
              v
            );
          }),
          (m = function (O) {
            delete E[O];
          }),
          s(11)(f) == 'process'
            ? (r = function (O) {
                f.nextTick(u(N, O, 1));
              })
            : b
            ? ((a = new b()), (o = a.port2), (a.port1.onmessage = P), (r = u(o.postMessage, o, 1)))
            : d.addEventListener && typeof postMessage == 'function' && !d.importScripts
            ? ((r = function (O) {
                d.postMessage(O + '', '*');
              }),
              d.addEventListener('message', P, !1))
            : (r =
                g in p('script')
                  ? function (O) {
                      c.appendChild(p('script'))[g] = function () {
                        c.removeChild(this), N.call(O);
                      };
                    }
                  : function (O) {
                      setTimeout(u(N, O, 1), 0);
                    })),
          (i.exports = { set: h, clear: m });
      },
      function (i, n, s) {
        var r = s(20),
          a = Math.min;
        i.exports = function (o) {
          return o > 0 ? a(r(o), 9007199254740991) : 0;
        };
      },
      function (i, n, s) {
        var r = s(9);
        i.exports = function (a, o) {
          if (!r(a)) return a;
          var u, l;
          if (
            (o && typeof (u = a.toString) == 'function' && !r((l = u.call(a)))) ||
            (typeof (u = a.valueOf) == 'function' && !r((l = u.call(a)))) ||
            (!o && typeof (u = a.toString) == 'function' && !r((l = u.call(a))))
          )
            return l;
          throw TypeError("Can't convert object to primitive value");
        };
      },
      function (i, n) {
        var s = 0,
          r = Math.random();
        i.exports = function (a) {
          return 'Symbol('.concat(a === void 0 ? '' : a, ')_', (++s + r).toString(36));
        };
      },
      function (i, n, s) {
        'use strict';
        function r(g) {
          return g && g.__esModule ? g : { default: g };
        }
        function a() {
          return process.platform !== 'win32'
            ? ''
            : process.arch === 'ia32' && process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432')
            ? 'mixed'
            : 'native';
        }
        function o(g) {
          return (0, h.createHash)('sha256').update(g).digest('hex');
        }
        function u(g) {
          switch (b) {
            case 'darwin':
              return g
                .split('IOPlatformUUID')[1]
                .split(
                  `
`
                )[0]
                .replace(/\=|\s+|\"/gi, '')
                .toLowerCase();
            case 'win32':
              return g
                .toString()
                .split('REG_SZ')[1]
                .replace(/\r+|\n+|\s+/gi, '')
                .toLowerCase();
            case 'linux':
              return g
                .toString()
                .replace(/\r+|\n+|\s+/gi, '')
                .toLowerCase();
            case 'freebsd':
              return g
                .toString()
                .replace(/\r+|\n+|\s+/gi, '')
                .toLowerCase();
            default:
              throw new Error('Unsupported platform: ' + process.platform);
          }
        }
        function l(g) {
          var N = u((0, f.execSync)(E[b]).toString());
          return g ? N : o(N);
        }
        function c(g) {
          return new d.default(function (N, P) {
            return (0, f.exec)(E[b], {}, function (O, W, U) {
              if (O) return P(new Error('Error while obtaining machine id: ' + O.stack));
              var R = u(W.toString());
              return N(g ? R : o(R));
            });
          });
        }
        Object.defineProperty(n, '__esModule', { value: !0 });
        var p = s(35),
          d = r(p);
        (n.machineIdSync = l), (n.machineId = c);
        var f = s(70),
          h = s(71),
          m = process,
          b = m.platform,
          v = { native: '%windir%\\System32', mixed: '%windir%\\sysnative\\cmd.exe /c %windir%\\System32' },
          E = {
            darwin: 'ioreg -rd1 -c IOPlatformExpertDevice',
            win32: v[a()] + '\\REG.exe QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid',
            linux: '( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :',
            freebsd: 'kenv -q smbios.system.uuid || sysctl -n kern.hostuuid',
          };
      },
      function (i, n, s) {
        i.exports = { default: s(36), __esModule: !0 };
      },
      function (i, n, s) {
        s(66), s(68), s(69), s(67), (i.exports = s(6).Promise);
      },
      function (i, n) {
        i.exports = function () {};
      },
      function (i, n) {
        i.exports = function (s, r, a, o) {
          if (!(s instanceof r) || (o !== void 0 && o in s)) throw TypeError(a + ': incorrect invocation!');
          return s;
        };
      },
      function (i, n, s) {
        var r = s(13),
          a = s(31),
          o = s(62);
        i.exports = function (u) {
          return function (l, c, p) {
            var d,
              f = r(l),
              h = a(f.length),
              m = o(p, h);
            if (u && c != c) {
              for (; h > m; ) if (((d = f[m++]), d != d)) return !0;
            } else for (; h > m; m++) if ((u || m in f) && f[m] === c) return u || m || 0;
            return !u && -1;
          };
        };
      },
      function (i, f, s) {
        var r = s(7),
          a = s(44),
          o = s(43),
          u = s(3),
          l = s(31),
          c = s(64),
          p = {},
          d = {},
          f = (i.exports = function (h, m, b, v, E) {
            var g,
              N,
              P,
              O,
              W = E
                ? function () {
                    return h;
                  }
                : c(h),
              U = r(b, v, m ? 2 : 1),
              R = 0;
            if (typeof W != 'function') throw TypeError(h + ' is not iterable!');
            if (o(W)) {
              for (g = l(h.length); g > R; R++)
                if (((O = m ? U(u((N = h[R]))[0], N[1]) : U(h[R])), O === p || O === d)) return O;
            } else
              for (P = W.call(h); !(N = P.next()).done; ) if (((O = a(P, U, N.value, m)), O === p || O === d)) return O;
          });
        (f.BREAK = p), (f.RETURN = d);
      },
      function (i, n) {
        i.exports = function (s, r, a) {
          var o = a === void 0;
          switch (r.length) {
            case 0:
              return o ? s() : s.call(a);
            case 1:
              return o ? s(r[0]) : s.call(a, r[0]);
            case 2:
              return o ? s(r[0], r[1]) : s.call(a, r[0], r[1]);
            case 3:
              return o ? s(r[0], r[1], r[2]) : s.call(a, r[0], r[1], r[2]);
            case 4:
              return o ? s(r[0], r[1], r[2], r[3]) : s.call(a, r[0], r[1], r[2], r[3]);
          }
          return s.apply(a, r);
        };
      },
      function (i, n, s) {
        var r = s(11);
        i.exports = Object('z').propertyIsEnumerable(0)
          ? Object
          : function (a) {
              return r(a) == 'String' ? a.split('') : Object(a);
            };
      },
      function (i, n, s) {
        var r = s(10),
          a = s(1)('iterator'),
          o = Array.prototype;
        i.exports = function (u) {
          return u !== void 0 && (r.Array === u || o[a] === u);
        };
      },
      function (i, n, s) {
        var r = s(3);
        i.exports = function (a, o, u, l) {
          try {
            return l ? o(r(u)[0], u[1]) : o(u);
          } catch (p) {
            var c = a.return;
            throw (c !== void 0 && r(c.call(a)), p);
          }
        };
      },
      function (i, n, s) {
        'use strict';
        var r = s(49),
          a = s(17),
          o = s(18),
          u = {};
        s(5)(u, s(1)('iterator'), function () {
          return this;
        }),
          (i.exports = function (l, c, p) {
            (l.prototype = r(u, { next: a(1, p) })), o(l, c + ' Iterator');
          });
      },
      function (i, n, s) {
        var r = s(1)('iterator'),
          a = !1;
        try {
          var o = [7][r]();
          (o.return = function () {
            a = !0;
          }),
            Array.from(o, function () {
              throw 2;
            });
        } catch {}
        i.exports = function (u, l) {
          if (!l && !a) return !1;
          var c = !1;
          try {
            var p = [7],
              d = p[r]();
            (d.next = function () {
              return { done: (c = !0) };
            }),
              (p[r] = function () {
                return d;
              }),
              u(p);
          } catch {}
          return c;
        };
      },
      function (i, n) {
        i.exports = function (s, r) {
          return { value: r, done: !!s };
        };
      },
      function (i, n, s) {
        var r = s(2),
          a = s(30).set,
          o = r.MutationObserver || r.WebKitMutationObserver,
          u = r.process,
          l = r.Promise,
          c = s(11)(u) == 'process';
        i.exports = function () {
          var p,
            d,
            f,
            h = function () {
              var E, g;
              for (c && (E = u.domain) && E.exit(); p; ) {
                (g = p.fn), (p = p.next);
                try {
                  g();
                } catch (N) {
                  throw (p ? f() : (d = void 0), N);
                }
              }
              (d = void 0), E && E.enter();
            };
          if (c)
            f = function () {
              u.nextTick(h);
            };
          else if (o) {
            var m = !0,
              b = document.createTextNode('');
            new o(h).observe(b, { characterData: !0 }),
              (f = function () {
                b.data = m = !m;
              });
          } else if (l && l.resolve) {
            var v = l.resolve();
            f = function () {
              v.then(h);
            };
          } else
            f = function () {
              a.call(r, h);
            };
          return function (E) {
            var g = { fn: E, next: void 0 };
            d && (d.next = g), p || ((p = g), f()), (d = g);
          };
        };
      },
      function (i, n, s) {
        var r = s(3),
          a = s(50),
          o = s(22),
          u = s(19)('IE_PROTO'),
          l = function () {},
          c = 'prototype',
          p = function () {
            var d,
              f = s(16)('iframe'),
              h = o.length,
              m = '>';
            for (
              f.style.display = 'none',
                s(25).appendChild(f),
                f.src = 'javascript:',
                d = f.contentWindow.document,
                d.open(),
                d.write('<script>document.F=Object</script' + m),
                d.close(),
                p = d.F;
              h--;

            )
              delete p[c][o[h]];
            return p();
          };
        i.exports =
          Object.create ||
          function (d, f) {
            var h;
            return (
              d !== null ? ((l[c] = r(d)), (h = new l()), (l[c] = null), (h[u] = d)) : (h = p()),
              f === void 0 ? h : a(h, f)
            );
          };
      },
      function (i, n, s) {
        var r = s(12),
          a = s(3),
          o = s(54);
        i.exports = s(4)
          ? Object.defineProperties
          : function (u, l) {
              a(u);
              for (var c, p = o(l), d = p.length, f = 0; d > f; ) r.f(u, (c = p[f++]), l[c]);
              return u;
            };
      },
      function (i, n, s) {
        var r = s(55),
          a = s(17),
          o = s(13),
          u = s(32),
          l = s(8),
          c = s(26),
          p = Object.getOwnPropertyDescriptor;
        n.f = s(4)
          ? p
          : function (d, f) {
              if (((d = o(d)), (f = u(f, !0)), c))
                try {
                  return p(d, f);
                } catch {}
              if (l(d, f)) return a(!r.f.call(d, f), d[f]);
            };
      },
      function (i, n, s) {
        var r = s(8),
          a = s(63),
          o = s(19)('IE_PROTO'),
          u = Object.prototype;
        i.exports =
          Object.getPrototypeOf ||
          function (l) {
            return (
              (l = a(l)),
              r(l, o)
                ? l[o]
                : typeof l.constructor == 'function' && l instanceof l.constructor
                ? l.constructor.prototype
                : l instanceof Object
                ? u
                : null
            );
          };
      },
      function (i, n, s) {
        var r = s(8),
          a = s(13),
          o = s(39)(!1),
          u = s(19)('IE_PROTO');
        i.exports = function (l, c) {
          var p,
            d = a(l),
            f = 0,
            h = [];
          for (p in d) p != u && r(d, p) && h.push(p);
          for (; c.length > f; ) r(d, (p = c[f++])) && (~o(h, p) || h.push(p));
          return h;
        };
      },
      function (i, n, s) {
        var r = s(53),
          a = s(22);
        i.exports =
          Object.keys ||
          function (o) {
            return r(o, a);
          };
      },
      function (i, n) {
        n.f = {}.propertyIsEnumerable;
      },
      function (i, n, s) {
        var r = s(5);
        i.exports = function (a, o, u) {
          for (var l in o) u && a[l] ? (a[l] = o[l]) : r(a, l, o[l]);
          return a;
        };
      },
      function (i, n, s) {
        i.exports = s(5);
      },
      function (i, n, s) {
        var r = s(9),
          a = s(3),
          o = function (u, l) {
            if ((a(u), !r(l) && l !== null)) throw TypeError(l + ": can't set as prototype!");
          };
        i.exports = {
          set:
            Object.setPrototypeOf ||
            ('__proto__' in {}
              ? (function (u, l, c) {
                  try {
                    (c = s(7)(Function.call, s(51).f(Object.prototype, '__proto__').set, 2)),
                      c(u, []),
                      (l = !(u instanceof Array));
                  } catch {
                    l = !0;
                  }
                  return function (p, d) {
                    return o(p, d), l ? (p.__proto__ = d) : c(p, d), p;
                  };
                })({}, !1)
              : void 0),
          check: o,
        };
      },
      function (i, n, s) {
        'use strict';
        var r = s(2),
          a = s(6),
          o = s(12),
          u = s(4),
          l = s(1)('species');
        i.exports = function (c) {
          var p = typeof a[c] == 'function' ? a[c] : r[c];
          u &&
            p &&
            !p[l] &&
            o.f(p, l, {
              configurable: !0,
              get: function () {
                return this;
              },
            });
        };
      },
      function (i, n, s) {
        var r = s(3),
          a = s(14),
          o = s(1)('species');
        i.exports = function (u, l) {
          var c,
            p = r(u).constructor;
          return p === void 0 || (c = r(p)[o]) == null ? l : a(c);
        };
      },
      function (i, n, s) {
        var r = s(20),
          a = s(15);
        i.exports = function (o) {
          return function (u, l) {
            var c,
              p,
              d = String(a(u)),
              f = r(l),
              h = d.length;
            return f < 0 || f >= h
              ? o
                ? ''
                : void 0
              : ((c = d.charCodeAt(f)),
                c < 55296 || c > 56319 || f + 1 === h || (p = d.charCodeAt(f + 1)) < 56320 || p > 57343
                  ? o
                    ? d.charAt(f)
                    : c
                  : o
                  ? d.slice(f, f + 2)
                  : ((c - 55296) << 10) + (p - 56320) + 65536);
          };
        };
      },
      function (i, n, s) {
        var r = s(20),
          a = Math.max,
          o = Math.min;
        i.exports = function (u, l) {
          return (u = r(u)), u < 0 ? a(u + l, 0) : o(u, l);
        };
      },
      function (i, n, s) {
        var r = s(15);
        i.exports = function (a) {
          return Object(r(a));
        };
      },
      function (i, n, s) {
        var r = s(21),
          a = s(1)('iterator'),
          o = s(10);
        i.exports = s(6).getIteratorMethod = function (u) {
          if (u != null) return u[a] || u['@@iterator'] || o[r(u)];
        };
      },
      function (i, n, s) {
        'use strict';
        var r = s(37),
          a = s(47),
          o = s(10),
          u = s(13);
        (i.exports = s(27)(
          Array,
          'Array',
          function (l, c) {
            (this._t = u(l)), (this._i = 0), (this._k = c);
          },
          function () {
            var l = this._t,
              c = this._k,
              p = this._i++;
            return !l || p >= l.length
              ? ((this._t = void 0), a(1))
              : c == 'keys'
              ? a(0, p)
              : c == 'values'
              ? a(0, l[p])
              : a(0, [p, l[p]]);
          },
          'values'
        )),
          (o.Arguments = o.Array),
          r('keys'),
          r('values'),
          r('entries');
      },
      function (i, n) {},
      function (i, n, s) {
        'use strict';
        var r,
          a,
          o,
          u = s(28),
          l = s(2),
          c = s(7),
          p = s(21),
          d = s(23),
          f = s(9),
          h = (s(3), s(14)),
          m = s(38),
          b = s(40),
          v = (s(58).set, s(60)),
          E = s(30).set,
          g = s(48)(),
          N = 'Promise',
          P = l.TypeError,
          W = l.process,
          O = l[N],
          W = l.process,
          U = p(W) == 'process',
          R = function () {},
          k = !!(function () {
            try {
              var _ = O.resolve(1),
                T = ((_.constructor = {})[s(1)('species')] = function (I) {
                  I(R, R);
                });
              return (U || typeof PromiseRejectionEvent == 'function') && _.then(R) instanceof T;
            } catch {}
          })(),
          A = function (_, T) {
            return _ === T || (_ === O && T === o);
          },
          q = function (_) {
            var T;
            return !(!f(_) || typeof (T = _.then) != 'function') && T;
          },
          j = function (_) {
            return A(O, _) ? new F(_) : new a(_);
          },
          F = (a = function (_) {
            var T, I;
            (this.promise = new _(function (B, re) {
              if (T !== void 0 || I !== void 0) throw P('Bad Promise constructor');
              (T = B), (I = re);
            })),
              (this.resolve = h(T)),
              (this.reject = h(I));
          }),
          z = function (_) {
            try {
              _();
            } catch (T) {
              return { error: T };
            }
          },
          G = function (_, T) {
            if (!_._n) {
              _._n = !0;
              var I = _._c;
              g(function () {
                for (
                  var B = _._v,
                    re = _._s == 1,
                    st = 0,
                    ne = function (Jt) {
                      var ht,
                        vr,
                        rs = re ? Jt.ok : Jt.fail,
                        as = Jt.resolve,
                        an = Jt.reject,
                        yr = Jt.domain;
                      try {
                        rs
                          ? (re || (_._h == 2 && L(_), (_._h = 1)),
                            rs === !0 ? (ht = B) : (yr && yr.enter(), (ht = rs(B)), yr && yr.exit()),
                            ht === Jt.promise
                              ? an(P('Promise-chain cycle'))
                              : (vr = q(ht))
                              ? vr.call(ht, as, an)
                              : as(ht))
                          : an(B);
                      } catch (w_) {
                        an(w_);
                      }
                    };
                  I.length > st;

                )
                  ne(I[st++]);
                (_._c = []), (_._n = !1), T && !_._h && w(_);
              });
            }
          },
          w = function (_) {
            E.call(l, function () {
              var T,
                I,
                B,
                re = _._v;
              if (
                (S(_) &&
                  ((T = z(function () {
                    U
                      ? W.emit('unhandledRejection', re, _)
                      : (I = l.onunhandledrejection)
                      ? I({ promise: _, reason: re })
                      : (B = l.console) && B.error && B.error('Unhandled promise rejection', re);
                  })),
                  (_._h = U || S(_) ? 2 : 1)),
                (_._a = void 0),
                T)
              )
                throw T.error;
            });
          },
          S = function (_) {
            if (_._h == 1) return !1;
            for (var T, I = _._a || _._c, B = 0; I.length > B; ) if (((T = I[B++]), T.fail || !S(T.promise))) return !1;
            return !0;
          },
          L = function (_) {
            E.call(l, function () {
              var T;
              U ? W.emit('rejectionHandled', _) : (T = l.onrejectionhandled) && T({ promise: _, reason: _._v });
            });
          },
          ie = function (_) {
            var T = this;
            T._d || ((T._d = !0), (T = T._w || T), (T._v = _), (T._s = 2), T._a || (T._a = T._c.slice()), G(T, !0));
          },
          Q = function (_) {
            var T,
              I = this;
            if (!I._d) {
              (I._d = !0), (I = I._w || I);
              try {
                if (I === _) throw P("Promise can't be resolved itself");
                (T = q(_))
                  ? g(function () {
                      var B = { _w: I, _d: !1 };
                      try {
                        T.call(_, c(Q, B, 1), c(ie, B, 1));
                      } catch (re) {
                        ie.call(B, re);
                      }
                    })
                  : ((I._v = _), (I._s = 1), G(I, !1));
              } catch (B) {
                ie.call({ _w: I, _d: !1 }, B);
              }
            }
          };
        k ||
          ((O = function (_) {
            m(this, O, N, '_h'), h(_), r.call(this);
            try {
              _(c(Q, this, 1), c(ie, this, 1));
            } catch (T) {
              ie.call(this, T);
            }
          }),
          (r = function (_) {
            (this._c = []),
              (this._a = void 0),
              (this._s = 0),
              (this._d = !1),
              (this._v = void 0),
              (this._h = 0),
              (this._n = !1);
          }),
          (r.prototype = s(56)(O.prototype, {
            then: function (_, T) {
              var I = j(v(this, O));
              return (
                (I.ok = typeof _ != 'function' || _),
                (I.fail = typeof T == 'function' && T),
                (I.domain = U ? W.domain : void 0),
                this._c.push(I),
                this._a && this._a.push(I),
                this._s && G(this, !1),
                I.promise
              );
            },
            catch: function (_) {
              return this.then(void 0, _);
            },
          })),
          (F = function () {
            var _ = new r();
            (this.promise = _), (this.resolve = c(Q, _, 1)), (this.reject = c(ie, _, 1));
          })),
          d(d.G + d.W + d.F * !k, { Promise: O }),
          s(18)(O, N),
          s(59)(N),
          (o = s(6)[N]),
          d(d.S + d.F * !k, N, {
            reject: function (_) {
              var T = j(this),
                I = T.reject;
              return I(_), T.promise;
            },
          }),
          d(d.S + d.F * (u || !k), N, {
            resolve: function (_) {
              if (_ instanceof O && A(_.constructor, this)) return _;
              var T = j(this),
                I = T.resolve;
              return I(_), T.promise;
            },
          }),
          d(
            d.S +
              d.F *
                !(
                  k &&
                  s(46)(function (_) {
                    O.all(_).catch(R);
                  })
                ),
            N,
            {
              all: function (_) {
                var T = this,
                  I = j(T),
                  B = I.resolve,
                  re = I.reject,
                  st = z(function () {
                    var ne = [],
                      Jt = 0,
                      ht = 1;
                    b(_, !1, function (vr) {
                      var rs = Jt++,
                        as = !1;
                      ne.push(void 0),
                        ht++,
                        T.resolve(vr).then(function (an) {
                          as || ((as = !0), (ne[rs] = an), --ht || B(ne));
                        }, re);
                    }),
                      --ht || B(ne);
                  });
                return st && re(st.error), I.promise;
              },
              race: function (_) {
                var T = this,
                  I = j(T),
                  B = I.reject,
                  re = z(function () {
                    b(_, !1, function (st) {
                      T.resolve(st).then(I.resolve, B);
                    });
                  });
                return re && B(re.error), I.promise;
              },
            }
          );
      },
      function (i, n, s) {
        'use strict';
        var r = s(61)(!0);
        s(27)(
          String,
          'String',
          function (a) {
            (this._t = String(a)), (this._i = 0);
          },
          function () {
            var a,
              o = this._t,
              u = this._i;
            return u >= o.length
              ? { value: void 0, done: !0 }
              : ((a = r(o, u)), (this._i += a.length), { value: a, done: !1 });
          }
        );
      },
      function (i, n, s) {
        s(65);
        for (
          var r = s(2),
            a = s(5),
            o = s(10),
            u = s(1)('toStringTag'),
            l = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'],
            c = 0;
          c < 5;
          c++
        ) {
          var p = l[c],
            d = r[p],
            f = d && d.prototype;
          f && !f[u] && a(f, u, p), (o[p] = o.Array);
        }
      },
      function (i, n) {
        i.exports = require('child_process');
      },
      function (i, n) {
        i.exports = require('crypto');
      },
    ]);
  });
});
var ft = y((Ni) => {
  'use strict';
  os();
  try {
    try {
      let { output: t } = M('nx/src/utils/output'),
        e;
      try {
        e = M('nx/src/utils/app-root').workspaceRoot;
      } catch {
        e = M('nx/src/utils/workspace-root').workspaceRoot;
      }
      (Ni.workspaceRoot = e), (Ni.output = t);
    } catch {
      let { output: e } = M('@nrwl/workspace/src/utilities/output'),
        { appRootPath: i } = M('@nrwl/tao/src/utils/app-root');
      (Ni.workspaceRoot = i), (Ni.output = e);
    }
  } catch {
    let e = (i) => {
      var s;
      let n = i.bodyLines
        ? (s = i.bodyLines) == null
          ? void 0
          : s.join(`
`)
        : '';
      return `${i.title}

${n}`;
    };
    (Ni.output = {
      log: (i) => console.log(e(i)),
      note: (i) => console.info(e(i)),
      error: (i) => console.error(e(i)),
      warn: (i) => console.warn(e(i)),
      success: (i) => console.log(e(i)),
      addVerticalSeparator: () => '',
      addNewline: () =>
        console.log(`
`),
      logCommand: (i) => console.log(i),
    }),
      (Ni.workspaceRoot = process.cwd());
  }
});
var ld = {};
Zt(ld, {
  ACCESS_TOKEN: () => ps,
  DEFAULT_FILE_SIZE_LIMIT: () => ti,
  DISTRIBUTED_TASK_EXECUTION_INTERNAL_ERROR_STATUS_CODE: () => H_,
  ENCRYPTION_KEY: () => ad,
  NO_COMPLETED_TASKS_TIMEOUT: () => z_,
  NO_MESSAGES_TIMEOUT: () => j_,
  NUMBER_OF_AXIOS_RETRIES: () => us,
  NX_CLOUD_CONTRIBUTOR_TESTING: () => _r,
  NX_CLOUD_CRITICAL_ERROR_MESSAGE_FILE: () => Fo,
  NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT: () => $_,
  NX_CLOUD_DISTRIBUTED_EXECUTION_STOP_AGENTS_ON_FAILURE: () => W_,
  NX_CLOUD_NO_TIMEOUTS: () => Fe,
  NX_CLOUD_RETRY_FLAKY_TASKS: () => K_,
  NX_CLOUD_UNLIMITED_OUTPUT: () => G_,
  NX_NO_CLOUD: () => V_,
  UNLIMITED_FILE_SIZE: () => ei,
  UNLIMITED_TIMEOUT: () => ki,
  VERBOSE_LOGGING: () => D,
  agentRunningInDistributedExecution: () => ko,
  extractGitRef: () => Y_,
  extractGitSha: () => on,
  getBranch: () => Do,
  getCIExecutionEnv: () => ls,
  getCIExecutionId: () => Lo,
  getCiEnvVars: () => nE,
  getMachineInfo: () => Q_,
  getNxCloudCriticalErrorMessage: () => aE,
  getNxVersion: () => cd,
  getRunGroup: () => Ao,
  isNxCloudIdSupportedForNxVersion: () => rE,
  nxCloudCriticalErrorMessage: () => Po,
  nxInvokedByRunner: () => X_,
  parseCommand: () => eE,
  setNxCloudCriticalErrorMessage: () => Uo,
});
function ko(t) {
  return !!t;
}
function X_() {
  return process.env.NX_INVOKED_BY_RUNNER === 'true' || process.env.NX_CLOUD === 'false';
}
function on() {
  try {
    return (0, Io.execSync)('git rev-parse HEAD', { stdio: 'pipe' }).toString().trim();
  } catch {
    return;
  }
}
function Y_() {
  try {
    return (0, Io.execSync)('git rev-parse --symbolic-full-name HEAD', { stdio: 'pipe' }).toString().trim();
  } catch {
    return;
  }
}
function J_() {
  try {
    let t = (0, No.readFileSync)((0, gr.join)(q_, 'nx-cloud.env'));
    return B_.parse(t);
  } catch {
    return {};
  }
}
function Z_() {
  let t = J_();
  (ps =
    process.env.NX_CLOUD_AUTH_TOKEN ||
    process.env.NX_CLOUD_ACCESS_TOKEN ||
    t.NX_CLOUD_AUTH_TOKEN ||
    t.NX_CLOUD_ACCESS_TOKEN),
    (ad = process.env.NX_CLOUD_ENCRYPTION_KEY || t.NX_CLOUD_ENCRYPTION_KEY),
    (D = process.env.NX_VERBOSE_LOGGING === 'true' || t.NX_VERBOSE_LOGGING === 'true'),
    (Fe = process.env.NX_CLOUD_NO_TIMEOUTS === 'true' || t.NX_CLOUD_NO_TIMEOUTS === 'true'),
    (_r = process.env.NX_CLOUD_CONTRIBUTOR_TESTING === 'true' || t.NX_CLOUD_CONTRIBUTOR_TESTING === 'true');
}
function Lo() {
  return od();
}
function od() {
  return process.env.NX_CI_EXECUTION_ID !== void 0
    ? process.env.NX_CI_EXECUTION_ID
    : process.env.NX_RUN_GROUP !== void 0
    ? process.env.NX_RUN_GROUP
    : process.env.CIRCLECI !== void 0 && process.env.CIRCLE_WORKFLOW_ID
    ? process.env.CIRCLE_WORKFLOW_ID
    : process.env.TRAVIS_BUILD_ID !== void 0
    ? process.env.TRAVIS_BUILD_ID
    : process.env.GITHUB_ACTIONS && process.env.GITHUB_RUN_ID
    ? `${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT}`
    : process.env.BUILD_BUILDID
    ? process.env.BUILD_BUILDID
    : process.env.BITBUCKET_BUILD_NUMBER !== void 0
    ? process.env.BITBUCKET_BUILD_NUMBER
    : process.env.VERCEL_GIT_COMMIT_SHA !== void 0
    ? process.env.VERCEL_GIT_COMMIT_SHA
    : process.env.CI_PIPELINE_ID
    ? process.env.CI_PIPELINE_ID
    : process.env.BUILD_TAG
    ? process.env.BUILD_TAG
    : null;
}
function ls() {
  return process.env.NX_CI_EXECUTION_ENV ?? '';
}
function Ao() {
  if (process.env.NX_RUN_GROUP !== void 0) return process.env.NX_RUN_GROUP;
  let t = od();
  return t ? (ls() ? `${t}-${ls()}` : t) : on();
}
function Do() {
  if (process.env.NX_BRANCH !== void 0) return process.env.NX_BRANCH;
  if (process.env.CIRCLECI !== void 0) {
    if (process.env.CIRCLE_PR_NUMBER !== void 0) return process.env.CIRCLE_PR_NUMBER;
    if (process.env.CIRCLE_PULL_REQUEST !== void 0) {
      let t = process.env.CIRCLE_PULL_REQUEST.split('/');
      return t[t.length - 1];
    } else if (process.env.CIRCLE_BRANCH !== void 0) return process.env.CIRCLE_BRANCH;
  }
  if (process.env.TRAVIS_PULL_REQUEST !== void 0) return process.env.TRAVIS_PULL_REQUEST;
  if (process.env.GITHUB_ACTIONS) {
    if (process.env.GITHUB_REF) {
      let t = process.env.GITHUB_REF.match(/refs\/pull\/(\d+)\/merge/);
      if (t) return t[1];
    }
    return process.env.GITHUB_HEAD_REF
      ? process.env.GITHUB_HEAD_REF
      : process.env.GITHUB_REF_NAME
      ? process.env.GITHUB_REF_NAME
      : '';
  }
  return process.env.BITBUCKET_PR_ID !== void 0
    ? process.env.BITBUCKET_PR_ID
    : process.env.BITBUCKET_BRANCH !== void 0
    ? process.env.BITBUCKET_BRANCH
    : process.env.BUILD_SOURCEBRANCHNAME !== void 0
    ? process.env.BUILD_SOURCEBRANCHNAME
    : process.env.VERCEL_GIT_COMMIT_REF !== void 0
    ? process.env.VERCEL_GIT_COMMIT_REF
    : process.env.CI_MERGE_REQUEST_IID
    ? process.env.CI_MERGE_REQUEST_IID
    : process.env.CI_COMMIT_BRANCH
    ? process.env.CI_COMMIT_BRANCH
    : process.env.GIT_BRANCH
    ? process.env.GIT_BRANCH
    : null;
}
function Q_() {
  let t = require('os'),
    e = (0, rd.createHash)('md5');
  return (
    e.update(M_()),
    {
      machineId: e.digest('base64'),
      platform: t.platform(),
      version: t.version ? t.version() : '',
      cpuCores: t.cpus().length,
    }
  );
}
function eE() {
  let t = (0, gr.parse)(process.argv[1]).name,
    e = `${process.argv.slice(2).join(' ')}`;
  return `${t} ${e}`;
}
function cd() {
  let t = JSON.parse((0, No.readFileSync)('package.json').toString());
  return { ...(t.dependencies || {}), ...(t.devDependencies || {}) }.nx.trim().match(tE);
}
function nE(t) {
  let e = sE(),
    i = {};
  return (
    t == 'auto'
      ? (i = e)
      : t &&
        t
          .split(',')
          .map((n) => n.trim())
          .forEach((n) => {
            e[n] && (i[n] = e[n]);
          }),
    Object.keys(e)
      .filter((n) => n.startsWith('NX_'))
      .forEach((n) => {
        i[n] = e[n];
      }),
    D && (sd.note({ title: 'Environment variables passed to cloud:', bodyLines: Object.keys(i) }), sd.addNewline()),
    i
  );
}
function sE() {
  let t = {};
  for (let e of Object.keys(process.env)) e != null && !iE.includes(e) && process.env[e] && (t[e] = process.env[e]);
  return t;
}
function rE() {
  let t = cd(),
    e = +t[1],
    i = t[2] ? +t[2] : 9999;
  return e >= 19 && i >= 7;
}
function aE() {
  return Po;
}
function Uo(t) {
  Po = t;
}
var Io,
  rd,
  No,
  gr,
  B_,
  M_,
  sd,
  q_,
  ki,
  j_,
  z_,
  ei,
  G_,
  ti,
  H_,
  $_,
  W_,
  us,
  V_,
  K_,
  ps,
  ad,
  D,
  Fe,
  _r,
  tE,
  iE,
  Fo,
  Po,
  mt = ce(() => {
    'use strict';
    (Io = require('child_process')), (rd = require('crypto')), (No = require('fs')), (gr = require('path'));
    Zp();
    (B_ = id()),
      ({ machineIdSync: M_ } = nd()),
      ({ output: sd, workspaceRoot: q_ } = ft()),
      (ki = 9999999),
      (j_ = process.env.NX_CLOUD_AGENT_TIMEOUT_MS ? Number(process.env.NX_CLOUD_AGENT_TIMEOUT_MS) : 36e5),
      (z_ = process.env.NX_CLOUD_ORCHESTRATOR_TIMEOUT_MS ? Number(process.env.NX_CLOUD_ORCHESTRATOR_TIMEOUT_MS) : 36e5),
      (ei = 1e3 * 1e3 * 1e4),
      (G_ = process.env.NX_CLOUD_UNLIMITED_OUTPUT === 'true'),
      (ti = 1e3 * 1e3 * 300),
      (H_ = 166),
      ($_ = process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT
        ? Number(process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT)
        : null),
      (W_ = process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_STOP_AGENTS_ON_FAILURE != 'false'),
      (us = process.env.NX_CLOUD_NUMBER_OF_RETRIES ? Number(process.env.NX_CLOUD_NUMBER_OF_RETRIES) : Jp() ? 10 : 1),
      (V_ = process.env.NX_NO_CLOUD === 'true'),
      (K_ = process.env.NX_CLOUD_RETRY_FLAKY_TASKS !== 'false');
    Z_();
    tE = /(0|[1-9]\d*)(?:\.(0|[1-9]\d*))(?:\.(0|[1-9]\d*))?(?:-.*)?/;
    iE = [
      'PWD',
      'HOME',
      'SHELL',
      'LOGNAME',
      'UID',
      'HOSTNAME',
      'MAIL',
      'EDITOR',
      'LANG',
      'TEMP',
      'PATH',
      'TERM',
      'USER',
      'COMMAND_MODE',
      'TMPDIR',
      'TERMINAL_EMULATOR',
      'TERM_SESSION_ID',
      'OLDPWD',
      'MANPATH',
      'PAGER',
      'LESS',
      'LSCOLORS',
      'PNPM_HOME',
      'ZSH',
      'GOPATH',
      'GOROOT',
      'NVM_DIR',
      'NVM_BIN',
      'NVM_INC',
    ];
    Fo = 'nxCloudCriticalErrorMessage';
  });
var fd = y((aL, hd) => {
  'use strict';
  var { hasOwnProperty: Bo } = Object.prototype,
    Mo = (t, e = {}) => {
      typeof e == 'string' && (e = { section: e }),
        (e.align = e.align === !0),
        (e.newline = e.newline === !0),
        (e.sort = e.sort === !0),
        (e.whitespace = e.whitespace === !0 || e.align === !0),
        (e.platform = e.platform || (typeof process < 'u' && process.platform)),
        (e.bracketedArray = e.bracketedArray !== !1);
      let i =
          e.platform === 'win32'
            ? `\r
`
            : `
`,
        n = e.whitespace ? ' = ' : '=',
        s = [],
        r = e.sort ? Object.keys(t).sort() : Object.keys(t),
        a = 0;
      e.align &&
        (a = Ot(
          r
            .filter((l) => t[l] === null || Array.isArray(t[l]) || typeof t[l] != 'object')
            .map((l) => (Array.isArray(t[l]) ? `${l}[]` : l))
            .concat([''])
            .reduce((l, c) => (Ot(l).length >= Ot(c).length ? l : c))
        ).length);
      let o = '',
        u = e.bracketedArray ? '[]' : '';
      for (let l of r) {
        let c = t[l];
        if (c && Array.isArray(c)) for (let p of c) o += Ot(`${l}${u}`).padEnd(a, ' ') + n + Ot(p) + i;
        else c && typeof c == 'object' ? s.push(l) : (o += Ot(l).padEnd(a, ' ') + n + Ot(c) + i);
      }
      e.section && o.length && (o = '[' + Ot(e.section) + ']' + (e.newline ? i + i : i) + o);
      for (let l of s) {
        let c = pd(l, '.').join('\\.'),
          p = (e.section ? e.section + '.' : '') + c,
          d = Mo(t[l], { ...e, section: p });
        o.length && d.length && (o += i), (o += d);
      }
      return o;
    };
  function pd(t, e) {
    var i = 0,
      n = 0,
      s = 0,
      r = [];
    do
      if (((s = t.indexOf(e, i)), s !== -1)) {
        if (((i = s + e.length), s > 0 && t[s - 1] === '\\')) continue;
        r.push(t.slice(n, s)), (n = s + e.length);
      }
    while (s !== -1);
    return r.push(t.slice(n)), r;
  }
  var ud = (t, e = {}) => {
      e.bracketedArray = e.bracketedArray !== !1;
      let i = Object.create(null),
        n = i,
        s = null,
        r = /^\[([^\]]*)\]\s*$|^([^=]+)(=(.*))?$/i,
        a = t.split(/[\r\n]+/g),
        o = {};
      for (let l of a) {
        if (!l || l.match(/^\s*[;#]/) || l.match(/^\s*$/)) continue;
        let c = l.match(r);
        if (!c) continue;
        if (c[1] !== void 0) {
          if (((s = Er(c[1])), s === '__proto__')) {
            n = Object.create(null);
            continue;
          }
          n = i[s] = i[s] || Object.create(null);
          continue;
        }
        let p = Er(c[2]),
          d;
        e.bracketedArray
          ? (d = p.length > 2 && p.slice(-2) === '[]')
          : ((o[p] = ((o == null ? void 0 : o[p]) || 0) + 1), (d = o[p] > 1));
        let f = d && p.endsWith('[]') ? p.slice(0, -2) : p;
        if (f === '__proto__') continue;
        let h = c[3] ? Er(c[4]) : !0,
          m = h === 'true' || h === 'false' || h === 'null' ? JSON.parse(h) : h;
        d && (Bo.call(n, f) ? Array.isArray(n[f]) || (n[f] = [n[f]]) : (n[f] = [])),
          Array.isArray(n[f]) ? n[f].push(m) : (n[f] = m);
      }
      let u = [];
      for (let l of Object.keys(i)) {
        if (!Bo.call(i, l) || typeof i[l] != 'object' || Array.isArray(i[l])) continue;
        let c = pd(l, '.');
        n = i;
        let p = c.pop(),
          d = p.replace(/\\\./g, '.');
        for (let f of c)
          f !== '__proto__' &&
            ((!Bo.call(n, f) || typeof n[f] != 'object') && (n[f] = Object.create(null)), (n = n[f]));
        (n === i && d === p) || ((n[d] = i[l]), u.push(l));
      }
      for (let l of u) delete i[l];
      return i;
    },
    dd = (t) => (t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'")),
    Ot = (t) =>
      typeof t != 'string' || t.match(/[=\r\n]/) || t.match(/^\[/) || (t.length > 1 && dd(t)) || t !== t.trim()
        ? JSON.stringify(t)
        : t.split(';').join('\\;').split('#').join('\\#'),
    Er = (t) => {
      if (((t = (t || '').trim()), dd(t))) {
        t.charAt(0) === "'" && (t = t.slice(1, -1));
        try {
          t = JSON.parse(t);
        } catch {}
      } else {
        let e = !1,
          i = '';
        for (let n = 0, s = t.length; n < s; n++) {
          let r = t.charAt(n);
          if (e) '\\;#'.indexOf(r) !== -1 ? (i += r) : (i += '\\' + r), (e = !1);
          else {
            if (';#'.indexOf(r) !== -1) break;
            r === '\\' ? (e = !0) : (i += r);
          }
        }
        return e && (i += '\\'), i.trim();
      }
      return t;
    };
  hd.exports = { parse: ud, decode: ud, stringify: Mo, encode: Mo, safe: Ot, unsafe: Er };
});
function jo(t, { whitespace: e = !0, trailingCommas: i = !1 } = {}) {
  if (typeof t != 'string')
    throw new TypeError(`Expected argument \`jsonString\` to be a \`string\`, got \`${typeof t}\``);
  let n = e ? cE : oE,
    s = !1,
    r = !1,
    a = 0,
    o = '',
    u = '',
    l = -1;
  for (let c = 0; c < t.length; c++) {
    let p = t[c],
      d = t[c + 1];
    if ((!r && p === '"' && (lE(t, c) || (s = !s)), !s))
      if (!r && p + d === '//') (o += t.slice(a, c)), (a = c), (r = qo), c++;
      else if (
        r === qo &&
        p + d ===
          `\r
`
      ) {
        c++, (r = !1), (o += n(t, a, c)), (a = c);
        continue;
      } else if (
        r === qo &&
        p ===
          `
`
      )
        (r = !1), (o += n(t, a, c)), (a = c);
      else if (!r && p + d === '/*') {
        (o += t.slice(a, c)), (a = c), (r = md), c++;
        continue;
      } else if (r === md && p + d === '*/') {
        c++, (r = !1), (o += n(t, a, c + 1)), (a = c + 1);
        continue;
      } else
        i &&
          !r &&
          (l !== -1
            ? p === '}' || p === ']'
              ? ((o += t.slice(a, c)), (u += n(o, 0, 1) + o.slice(1)), (o = ''), (a = c), (l = -1))
              : p !== ' ' &&
                p !== '	' &&
                p !== '\r' &&
                p !==
                  `
` &&
                ((o += t.slice(a, c)), (a = c), (l = -1))
            : p === ',' && ((u += o + t.slice(a, c)), (o = ''), (a = c), (l = c)));
  }
  return u + o + (r ? n(t.slice(a)) : t.slice(a));
}
var qo,
  md,
  oE,
  cE,
  lE,
  xd = ce(() => {
    'use strict';
    (qo = Symbol('singleComment')),
      (md = Symbol('multiComment')),
      (oE = () => ''),
      (cE = (t, e, i) => t.slice(e, i).replace(/\S/g, ' ')),
      (lE = (t, e) => {
        let i = e - 1,
          n = 0;
        for (; t[i] === '\\'; ) (i -= 1), (n += 1);
        return !!(n % 2);
      });
  });
function yd(t) {
  var s, r;
  let e = JSON.parse(jo((0, vd.readFileSync)(`${uE}/nx.json`).toString(), { trailingCommas: !0 })),
    i = {},
    n = [];
  for (let a in e.targetDefaults) e.targetDefaults[a].cache && n.push(a);
  return (
    e.nxCloudAccessToken && (i.accessToken ?? (i.accessToken = e.nxCloudAccessToken)),
    e.nxCloudId && (i.nxCloudId ?? (i.nxCloudId = e.nxCloudId)),
    e.nxCloudUrl && (i.url ?? (i.url = e.nxCloudUrl)),
    e.nxCloudEncryptionKey && (i.encryptionKey = e.nxCloudEncryptionKey),
    e.parallel && (i.parallel ?? (i.parallel = e.parallel)),
    e.cacheDirectory && (i.cacheDirectory ?? (i.cacheDirectory = e.cacheDirectory)),
    n.length && (i.cacheableOperations ?? (i.cacheableOperations = n)),
    {
      nxJson: e,
      nxCloudOptions: {
        ...i,
        ...((r = (s = e.tasksRunnerOptions) == null ? void 0 : s[t]) == null ? void 0 : r.options),
      },
    }
  );
}
var vd,
  uE,
  bd = ce(() => {
    'use strict';
    vd = require('fs');
    xd();
    ({ workspaceRoot: uE } = ft());
  });
var ze,
  Sr,
  hs,
  rt,
  zo,
  ds,
  cn,
  Go,
  wr,
  gd = ce(() => {
    'use strict';
    (ze = require('fs')), (Sr = Tt(fd())), (hs = Tt(require('os'))), (rt = Tt(require('path')));
    mt();
    bd();
    ({ output: zo } = ft()),
      (ds = 'nxcloud'),
      (cn = 'nxcloud.ini'),
      (Go = `.${cn}`),
      (wr = class {
        constructor(e, i = !1) {
          (this.nxCloudUrl = e ?? this.setNxCloudUrl()),
            (this.configFilePath = this.findExistingNxCloudConfig() ?? this.getDefaultConfigPath()),
            (this.data = this.load(i) ?? {});
        }
        setNxCloudUrl() {
          try {
            let { nxJson: e, nxCloudOptions: i } = yd('default');
            return i.url ?? 'https://cloud.nx.app';
          } catch {}
          return 'https://cloud.nx.app';
        }
        getNxCloudUrl() {
          return this.nxCloudUrl;
        }
        findExistingNxCloudConfig() {
          if (process.platform === 'win32') {
            let e = rt.default.join(hs.homedir(), Go);
            if ((0, ze.existsSync)(e)) return e;
            if (process.env.LOCALAPPDATA) {
              let i = rt.default.join(process.env.LOCALAPPDATA, ds, cn);
              if ((0, ze.existsSync)(i)) return i;
            }
          } else {
            if (process.env.XDG_CONFIG_HOME) {
              let s = rt.default.join(process.env.XDG_CONFIG_HOME, ds, cn);
              if ((0, ze.existsSync)(s)) return s;
            }
            let e = hs.homedir(),
              i = rt.default.join(e, Go);
            if ((0, ze.existsSync)(i)) return i;
            let n = rt.default.join(e, '.config', ds, cn);
            if ((0, ze.existsSync)(n)) return n;
          }
          return null;
        }
        getDefaultConfigPath() {
          return process.platform == 'win32'
            ? process.env.LOCALAPPDATA
              ? rt.default.join(process.env.LOCALAPPDATA, ds, cn)
              : rt.default.join(hs.homedir(), Go)
            : rt.default.join(hs.homedir(), '.config', ds, cn);
        }
        load(e) {
          let i = this.configFilePath;
          if ((0, ze.existsSync)(i)) {
            let n = (0, ze.readFileSync)(i, 'utf-8');
            return (0, Sr.parse)(n);
          } else
            return (
              e &&
                (zo.note({
                  title:
                    'Could not find an existing nx-cloud global configuration file to save your personal access token.',
                  bodyLines: [
                    `A new .nxcloudrc will be generated in the ${rt.default.dirname(this.configFilePath)} directory.`,
                  ],
                }),
                (this.data = {}),
                this.save()),
              {}
            );
        }
        save() {
          let e = (0, Sr.stringify)(this.data);
          (0, ze.mkdirSync)(rt.default.dirname(this.configFilePath), { recursive: !0 }),
            (0, ze.writeFileSync)(this.configFilePath, e, 'utf-8');
        }
        getPersonalAccessTokenFromNxCloudUrl(e = this.nxCloudUrl) {
          var i;
          return ((i = this.data[e]) == null ? void 0 : i.personalAccessToken) || null;
        }
        deletePersonalAccessTokenFromNxCloudUrl(e) {
          let i = Object.entries(this.data).find(([n, s]) => n === e);
          if (i) {
            let n = i[0];
            delete this.data[i[0]],
              this.save(),
              D && zo.success({ title: `Deleted personal access token from ${this.configFilePath} for ${n}` });
          }
        }
        setPersonalAccessToken(e) {
          (this.data[this.nxCloudUrl] = { personalAccessToken: e }),
            this.save(),
            D &&
              zo.success({ title: `Saved new personal access token to ${this.configFilePath} for ${this.nxCloudUrl}` });
        }
        getAllSectionNxCloudUrls() {
          return Object.keys(this.data);
        }
      });
  });
function Ed(t) {
  let e = dE() ? '   ' : '';
  hE()
    ? (process.stdout.write(`${e}${Ho(t)}`), xt.addNewline(), xt.addNewline())
    : fE()
    ? (xt.addNewline(), process.stdout.write(`${e}${Ho(t)}`), xt.addNewline(), xt.addNewline())
    : (process.stdout.write(`${e}${Ho(t)}`), xt.addNewline(), xt.addNewline());
}
function dE() {
  try {
    let t = JSON.parse((0, _d.readFileSync)('package.json').toString()),
      i = { ...(t.dependencies || {}), ...(t.devDependencies || {}) }.nx.trim().match(pE),
      n = +i[1];
    if (n < 18) return !0;
    if (n > 18) return !1;
    let s = i[2] ? +i[2] : 9999,
      r = i[3] ? +i[3] : 9999;
    return s === 0 && r < 5;
  } catch {
    return !1;
  }
}
function hE() {
  try {
    return M('nx/src/tasks-runner/life-cycles/dynamic-run-many-terminal-output-life-cycle'), !0;
  } catch {
    try {
      return M('@nrwl/workspace/src/tasks-runner/life-cycles/dynamic-run-many-terminal-output-life-cycle'), !0;
    } catch {
      return !1;
    }
  }
}
function Ho(t) {
  let e;
  if (typeof xt.dim == 'function') return xt.dim(t);
  try {
    return xt.colors.gray(t);
  } catch {
    return t;
  }
}
function fE() {
  return process.argv.indexOf('run-many') === -1 && process.argv.indexOf('affected') === -1;
}
function wd(t) {
  let e = t.trim();
  return e.endsWith('.') ? e : `${e}.`;
}
var _d,
  xt,
  pE,
  $o = ce(() => {
    'use strict';
    _d = require('fs');
    os();
    ({ output: xt } = ft());
    pE = /(0|[1-9]\d*)(?:\.(0|[1-9]\d*))(?:\.(0|[1-9]\d*))?(?:-.*)?/;
  });
function Li(t) {
  return new Promise((e) => {
    setTimeout(() => e(null), t);
  });
}
var Rr = ce(() => {
  'use strict';
});
var Td = y((xL, Rd) => {
  'use strict';
  var Sd = require('stream').Stream,
    mE = require('util');
  Rd.exports = at;
  function at() {
    (this.source = null),
      (this.dataSize = 0),
      (this.maxDataSize = 1024 * 1024),
      (this.pauseStream = !0),
      (this._maxDataSizeExceeded = !1),
      (this._released = !1),
      (this._bufferedEvents = []);
  }
  mE.inherits(at, Sd);
  at.create = function (t, e) {
    var i = new this();
    e = e || {};
    for (var n in e) i[n] = e[n];
    i.source = t;
    var s = t.emit;
    return (
      (t.emit = function () {
        return i._handleEmit(arguments), s.apply(t, arguments);
      }),
      t.on('error', function () {}),
      i.pauseStream && t.pause(),
      i
    );
  };
  Object.defineProperty(at.prototype, 'readable', {
    configurable: !0,
    enumerable: !0,
    get: function () {
      return this.source.readable;
    },
  });
  at.prototype.setEncoding = function () {
    return this.source.setEncoding.apply(this.source, arguments);
  };
  at.prototype.resume = function () {
    this._released || this.release(), this.source.resume();
  };
  at.prototype.pause = function () {
    this.source.pause();
  };
  at.prototype.release = function () {
    (this._released = !0),
      this._bufferedEvents.forEach(
        function (t) {
          this.emit.apply(this, t);
        }.bind(this)
      ),
      (this._bufferedEvents = []);
  };
  at.prototype.pipe = function () {
    var t = Sd.prototype.pipe.apply(this, arguments);
    return this.resume(), t;
  };
  at.prototype._handleEmit = function (t) {
    if (this._released) {
      this.emit.apply(this, t);
      return;
    }
    t[0] === 'data' && ((this.dataSize += t[1].length), this._checkIfMaxDataSizeExceeded()),
      this._bufferedEvents.push(t);
  };
  at.prototype._checkIfMaxDataSizeExceeded = function () {
    if (!this._maxDataSizeExceeded && !(this.dataSize <= this.maxDataSize)) {
      this._maxDataSizeExceeded = !0;
      var t = 'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
      this.emit('error', new Error(t));
    }
  };
});
var Nd = y((vL, Id) => {
  'use strict';
  var xE = require('util'),
    Cd = require('stream').Stream,
    Od = Td();
  Id.exports = se;
  function se() {
    (this.writable = !1),
      (this.readable = !0),
      (this.dataSize = 0),
      (this.maxDataSize = 2 * 1024 * 1024),
      (this.pauseStreams = !0),
      (this._released = !1),
      (this._streams = []),
      (this._currentStream = null),
      (this._insideLoop = !1),
      (this._pendingNext = !1);
  }
  xE.inherits(se, Cd);
  se.create = function (t) {
    var e = new this();
    t = t || {};
    for (var i in t) e[i] = t[i];
    return e;
  };
  se.isStreamLike = function (t) {
    return (
      typeof t != 'function' &&
      typeof t != 'string' &&
      typeof t != 'boolean' &&
      typeof t != 'number' &&
      !Buffer.isBuffer(t)
    );
  };
  se.prototype.append = function (t) {
    var e = se.isStreamLike(t);
    if (e) {
      if (!(t instanceof Od)) {
        var i = Od.create(t, { maxDataSize: 1 / 0, pauseStream: this.pauseStreams });
        t.on('data', this._checkDataSize.bind(this)), (t = i);
      }
      this._handleErrors(t), this.pauseStreams && t.pause();
    }
    return this._streams.push(t), this;
  };
  se.prototype.pipe = function (t, e) {
    return Cd.prototype.pipe.call(this, t, e), this.resume(), t;
  };
  se.prototype._getNext = function () {
    if (((this._currentStream = null), this._insideLoop)) {
      this._pendingNext = !0;
      return;
    }
    this._insideLoop = !0;
    try {
      do (this._pendingNext = !1), this._realGetNext();
      while (this._pendingNext);
    } finally {
      this._insideLoop = !1;
    }
  };
  se.prototype._realGetNext = function () {
    var t = this._streams.shift();
    if (typeof t > 'u') {
      this.end();
      return;
    }
    if (typeof t != 'function') {
      this._pipeNext(t);
      return;
    }
    var e = t;
    e(
      function (i) {
        var n = se.isStreamLike(i);
        n && (i.on('data', this._checkDataSize.bind(this)), this._handleErrors(i)), this._pipeNext(i);
      }.bind(this)
    );
  };
  se.prototype._pipeNext = function (t) {
    this._currentStream = t;
    var e = se.isStreamLike(t);
    if (e) {
      t.on('end', this._getNext.bind(this)), t.pipe(this, { end: !1 });
      return;
    }
    var i = t;
    this.write(i), this._getNext();
  };
  se.prototype._handleErrors = function (t) {
    var e = this;
    t.on('error', function (i) {
      e._emitError(i);
    });
  };
  se.prototype.write = function (t) {
    this.emit('data', t);
  };
  se.prototype.pause = function () {
    this.pauseStreams &&
      (this.pauseStreams &&
        this._currentStream &&
        typeof this._currentStream.pause == 'function' &&
        this._currentStream.pause(),
      this.emit('pause'));
  };
  se.prototype.resume = function () {
    this._released || ((this._released = !0), (this.writable = !0), this._getNext()),
      this.pauseStreams &&
        this._currentStream &&
        typeof this._currentStream.resume == 'function' &&
        this._currentStream.resume(),
      this.emit('resume');
  };
  se.prototype.end = function () {
    this._reset(), this.emit('end');
  };
  se.prototype.destroy = function () {
    this._reset(), this.emit('close');
  };
  se.prototype._reset = function () {
    (this.writable = !1), (this._streams = []), (this._currentStream = null);
  };
  se.prototype._checkDataSize = function () {
    if ((this._updateDataSize(), !(this.dataSize <= this.maxDataSize))) {
      var t = 'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
      this._emitError(new Error(t));
    }
  };
  se.prototype._updateDataSize = function () {
    this.dataSize = 0;
    var t = this;
    this._streams.forEach(function (e) {
      e.dataSize && (t.dataSize += e.dataSize);
    }),
      this._currentStream && this._currentStream.dataSize && (this.dataSize += this._currentStream.dataSize);
  };
  se.prototype._emitError = function (t) {
    this._reset(), this.emit('error', t);
  };
});
var kd = y((yL, vE) => {
  vE.exports = {
    'application/1d-interleaved-parityfec': { source: 'iana' },
    'application/3gpdash-qoe-report+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/3gpp-ims+xml': { source: 'iana', compressible: !0 },
    'application/3gpphal+json': { source: 'iana', compressible: !0 },
    'application/3gpphalforms+json': { source: 'iana', compressible: !0 },
    'application/a2l': { source: 'iana' },
    'application/ace+cbor': { source: 'iana' },
    'application/activemessage': { source: 'iana' },
    'application/activity+json': { source: 'iana', compressible: !0 },
    'application/alto-costmap+json': { source: 'iana', compressible: !0 },
    'application/alto-costmapfilter+json': { source: 'iana', compressible: !0 },
    'application/alto-directory+json': { source: 'iana', compressible: !0 },
    'application/alto-endpointcost+json': { source: 'iana', compressible: !0 },
    'application/alto-endpointcostparams+json': { source: 'iana', compressible: !0 },
    'application/alto-endpointprop+json': { source: 'iana', compressible: !0 },
    'application/alto-endpointpropparams+json': { source: 'iana', compressible: !0 },
    'application/alto-error+json': { source: 'iana', compressible: !0 },
    'application/alto-networkmap+json': { source: 'iana', compressible: !0 },
    'application/alto-networkmapfilter+json': { source: 'iana', compressible: !0 },
    'application/alto-updatestreamcontrol+json': { source: 'iana', compressible: !0 },
    'application/alto-updatestreamparams+json': { source: 'iana', compressible: !0 },
    'application/aml': { source: 'iana' },
    'application/andrew-inset': { source: 'iana', extensions: ['ez'] },
    'application/applefile': { source: 'iana' },
    'application/applixware': { source: 'apache', extensions: ['aw'] },
    'application/at+jwt': { source: 'iana' },
    'application/atf': { source: 'iana' },
    'application/atfx': { source: 'iana' },
    'application/atom+xml': { source: 'iana', compressible: !0, extensions: ['atom'] },
    'application/atomcat+xml': { source: 'iana', compressible: !0, extensions: ['atomcat'] },
    'application/atomdeleted+xml': { source: 'iana', compressible: !0, extensions: ['atomdeleted'] },
    'application/atomicmail': { source: 'iana' },
    'application/atomsvc+xml': { source: 'iana', compressible: !0, extensions: ['atomsvc'] },
    'application/atsc-dwd+xml': { source: 'iana', compressible: !0, extensions: ['dwd'] },
    'application/atsc-dynamic-event-message': { source: 'iana' },
    'application/atsc-held+xml': { source: 'iana', compressible: !0, extensions: ['held'] },
    'application/atsc-rdt+json': { source: 'iana', compressible: !0 },
    'application/atsc-rsat+xml': { source: 'iana', compressible: !0, extensions: ['rsat'] },
    'application/atxml': { source: 'iana' },
    'application/auth-policy+xml': { source: 'iana', compressible: !0 },
    'application/bacnet-xdd+zip': { source: 'iana', compressible: !1 },
    'application/batch-smtp': { source: 'iana' },
    'application/bdoc': { compressible: !1, extensions: ['bdoc'] },
    'application/beep+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/calendar+json': { source: 'iana', compressible: !0 },
    'application/calendar+xml': { source: 'iana', compressible: !0, extensions: ['xcs'] },
    'application/call-completion': { source: 'iana' },
    'application/cals-1840': { source: 'iana' },
    'application/captive+json': { source: 'iana', compressible: !0 },
    'application/cbor': { source: 'iana' },
    'application/cbor-seq': { source: 'iana' },
    'application/cccex': { source: 'iana' },
    'application/ccmp+xml': { source: 'iana', compressible: !0 },
    'application/ccxml+xml': { source: 'iana', compressible: !0, extensions: ['ccxml'] },
    'application/cdfx+xml': { source: 'iana', compressible: !0, extensions: ['cdfx'] },
    'application/cdmi-capability': { source: 'iana', extensions: ['cdmia'] },
    'application/cdmi-container': { source: 'iana', extensions: ['cdmic'] },
    'application/cdmi-domain': { source: 'iana', extensions: ['cdmid'] },
    'application/cdmi-object': { source: 'iana', extensions: ['cdmio'] },
    'application/cdmi-queue': { source: 'iana', extensions: ['cdmiq'] },
    'application/cdni': { source: 'iana' },
    'application/cea': { source: 'iana' },
    'application/cea-2018+xml': { source: 'iana', compressible: !0 },
    'application/cellml+xml': { source: 'iana', compressible: !0 },
    'application/cfw': { source: 'iana' },
    'application/city+json': { source: 'iana', compressible: !0 },
    'application/clr': { source: 'iana' },
    'application/clue+xml': { source: 'iana', compressible: !0 },
    'application/clue_info+xml': { source: 'iana', compressible: !0 },
    'application/cms': { source: 'iana' },
    'application/cnrp+xml': { source: 'iana', compressible: !0 },
    'application/coap-group+json': { source: 'iana', compressible: !0 },
    'application/coap-payload': { source: 'iana' },
    'application/commonground': { source: 'iana' },
    'application/conference-info+xml': { source: 'iana', compressible: !0 },
    'application/cose': { source: 'iana' },
    'application/cose-key': { source: 'iana' },
    'application/cose-key-set': { source: 'iana' },
    'application/cpl+xml': { source: 'iana', compressible: !0, extensions: ['cpl'] },
    'application/csrattrs': { source: 'iana' },
    'application/csta+xml': { source: 'iana', compressible: !0 },
    'application/cstadata+xml': { source: 'iana', compressible: !0 },
    'application/csvm+json': { source: 'iana', compressible: !0 },
    'application/cu-seeme': { source: 'apache', extensions: ['cu'] },
    'application/cwt': { source: 'iana' },
    'application/cybercash': { source: 'iana' },
    'application/dart': { compressible: !0 },
    'application/dash+xml': { source: 'iana', compressible: !0, extensions: ['mpd'] },
    'application/dash-patch+xml': { source: 'iana', compressible: !0, extensions: ['mpp'] },
    'application/dashdelta': { source: 'iana' },
    'application/davmount+xml': { source: 'iana', compressible: !0, extensions: ['davmount'] },
    'application/dca-rft': { source: 'iana' },
    'application/dcd': { source: 'iana' },
    'application/dec-dx': { source: 'iana' },
    'application/dialog-info+xml': { source: 'iana', compressible: !0 },
    'application/dicom': { source: 'iana' },
    'application/dicom+json': { source: 'iana', compressible: !0 },
    'application/dicom+xml': { source: 'iana', compressible: !0 },
    'application/dii': { source: 'iana' },
    'application/dit': { source: 'iana' },
    'application/dns': { source: 'iana' },
    'application/dns+json': { source: 'iana', compressible: !0 },
    'application/dns-message': { source: 'iana' },
    'application/docbook+xml': { source: 'apache', compressible: !0, extensions: ['dbk'] },
    'application/dots+cbor': { source: 'iana' },
    'application/dskpp+xml': { source: 'iana', compressible: !0 },
    'application/dssc+der': { source: 'iana', extensions: ['dssc'] },
    'application/dssc+xml': { source: 'iana', compressible: !0, extensions: ['xdssc'] },
    'application/dvcs': { source: 'iana' },
    'application/ecmascript': { source: 'iana', compressible: !0, extensions: ['es', 'ecma'] },
    'application/edi-consent': { source: 'iana' },
    'application/edi-x12': { source: 'iana', compressible: !1 },
    'application/edifact': { source: 'iana', compressible: !1 },
    'application/efi': { source: 'iana' },
    'application/elm+json': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/elm+xml': { source: 'iana', compressible: !0 },
    'application/emergencycalldata.cap+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/emergencycalldata.comment+xml': { source: 'iana', compressible: !0 },
    'application/emergencycalldata.control+xml': { source: 'iana', compressible: !0 },
    'application/emergencycalldata.deviceinfo+xml': { source: 'iana', compressible: !0 },
    'application/emergencycalldata.ecall.msd': { source: 'iana' },
    'application/emergencycalldata.providerinfo+xml': { source: 'iana', compressible: !0 },
    'application/emergencycalldata.serviceinfo+xml': { source: 'iana', compressible: !0 },
    'application/emergencycalldata.subscriberinfo+xml': { source: 'iana', compressible: !0 },
    'application/emergencycalldata.veds+xml': { source: 'iana', compressible: !0 },
    'application/emma+xml': { source: 'iana', compressible: !0, extensions: ['emma'] },
    'application/emotionml+xml': { source: 'iana', compressible: !0, extensions: ['emotionml'] },
    'application/encaprtp': { source: 'iana' },
    'application/epp+xml': { source: 'iana', compressible: !0 },
    'application/epub+zip': { source: 'iana', compressible: !1, extensions: ['epub'] },
    'application/eshop': { source: 'iana' },
    'application/exi': { source: 'iana', extensions: ['exi'] },
    'application/expect-ct-report+json': { source: 'iana', compressible: !0 },
    'application/express': { source: 'iana', extensions: ['exp'] },
    'application/fastinfoset': { source: 'iana' },
    'application/fastsoap': { source: 'iana' },
    'application/fdt+xml': { source: 'iana', compressible: !0, extensions: ['fdt'] },
    'application/fhir+json': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/fhir+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/fido.trusted-apps+json': { compressible: !0 },
    'application/fits': { source: 'iana' },
    'application/flexfec': { source: 'iana' },
    'application/font-sfnt': { source: 'iana' },
    'application/font-tdpfr': { source: 'iana', extensions: ['pfr'] },
    'application/font-woff': { source: 'iana', compressible: !1 },
    'application/framework-attributes+xml': { source: 'iana', compressible: !0 },
    'application/geo+json': { source: 'iana', compressible: !0, extensions: ['geojson'] },
    'application/geo+json-seq': { source: 'iana' },
    'application/geopackage+sqlite3': { source: 'iana' },
    'application/geoxacml+xml': { source: 'iana', compressible: !0 },
    'application/gltf-buffer': { source: 'iana' },
    'application/gml+xml': { source: 'iana', compressible: !0, extensions: ['gml'] },
    'application/gpx+xml': { source: 'apache', compressible: !0, extensions: ['gpx'] },
    'application/gxf': { source: 'apache', extensions: ['gxf'] },
    'application/gzip': { source: 'iana', compressible: !1, extensions: ['gz'] },
    'application/h224': { source: 'iana' },
    'application/held+xml': { source: 'iana', compressible: !0 },
    'application/hjson': { extensions: ['hjson'] },
    'application/http': { source: 'iana' },
    'application/hyperstudio': { source: 'iana', extensions: ['stk'] },
    'application/ibe-key-request+xml': { source: 'iana', compressible: !0 },
    'application/ibe-pkg-reply+xml': { source: 'iana', compressible: !0 },
    'application/ibe-pp-data': { source: 'iana' },
    'application/iges': { source: 'iana' },
    'application/im-iscomposing+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/index': { source: 'iana' },
    'application/index.cmd': { source: 'iana' },
    'application/index.obj': { source: 'iana' },
    'application/index.response': { source: 'iana' },
    'application/index.vnd': { source: 'iana' },
    'application/inkml+xml': { source: 'iana', compressible: !0, extensions: ['ink', 'inkml'] },
    'application/iotp': { source: 'iana' },
    'application/ipfix': { source: 'iana', extensions: ['ipfix'] },
    'application/ipp': { source: 'iana' },
    'application/isup': { source: 'iana' },
    'application/its+xml': { source: 'iana', compressible: !0, extensions: ['its'] },
    'application/java-archive': { source: 'apache', compressible: !1, extensions: ['jar', 'war', 'ear'] },
    'application/java-serialized-object': { source: 'apache', compressible: !1, extensions: ['ser'] },
    'application/java-vm': { source: 'apache', compressible: !1, extensions: ['class'] },
    'application/javascript': { source: 'iana', charset: 'UTF-8', compressible: !0, extensions: ['js', 'mjs'] },
    'application/jf2feed+json': { source: 'iana', compressible: !0 },
    'application/jose': { source: 'iana' },
    'application/jose+json': { source: 'iana', compressible: !0 },
    'application/jrd+json': { source: 'iana', compressible: !0 },
    'application/jscalendar+json': { source: 'iana', compressible: !0 },
    'application/json': { source: 'iana', charset: 'UTF-8', compressible: !0, extensions: ['json', 'map'] },
    'application/json-patch+json': { source: 'iana', compressible: !0 },
    'application/json-seq': { source: 'iana' },
    'application/json5': { extensions: ['json5'] },
    'application/jsonml+json': { source: 'apache', compressible: !0, extensions: ['jsonml'] },
    'application/jwk+json': { source: 'iana', compressible: !0 },
    'application/jwk-set+json': { source: 'iana', compressible: !0 },
    'application/jwt': { source: 'iana' },
    'application/kpml-request+xml': { source: 'iana', compressible: !0 },
    'application/kpml-response+xml': { source: 'iana', compressible: !0 },
    'application/ld+json': { source: 'iana', compressible: !0, extensions: ['jsonld'] },
    'application/lgr+xml': { source: 'iana', compressible: !0, extensions: ['lgr'] },
    'application/link-format': { source: 'iana' },
    'application/load-control+xml': { source: 'iana', compressible: !0 },
    'application/lost+xml': { source: 'iana', compressible: !0, extensions: ['lostxml'] },
    'application/lostsync+xml': { source: 'iana', compressible: !0 },
    'application/lpf+zip': { source: 'iana', compressible: !1 },
    'application/lxf': { source: 'iana' },
    'application/mac-binhex40': { source: 'iana', extensions: ['hqx'] },
    'application/mac-compactpro': { source: 'apache', extensions: ['cpt'] },
    'application/macwriteii': { source: 'iana' },
    'application/mads+xml': { source: 'iana', compressible: !0, extensions: ['mads'] },
    'application/manifest+json': { source: 'iana', charset: 'UTF-8', compressible: !0, extensions: ['webmanifest'] },
    'application/marc': { source: 'iana', extensions: ['mrc'] },
    'application/marcxml+xml': { source: 'iana', compressible: !0, extensions: ['mrcx'] },
    'application/mathematica': { source: 'iana', extensions: ['ma', 'nb', 'mb'] },
    'application/mathml+xml': { source: 'iana', compressible: !0, extensions: ['mathml'] },
    'application/mathml-content+xml': { source: 'iana', compressible: !0 },
    'application/mathml-presentation+xml': { source: 'iana', compressible: !0 },
    'application/mbms-associated-procedure-description+xml': { source: 'iana', compressible: !0 },
    'application/mbms-deregister+xml': { source: 'iana', compressible: !0 },
    'application/mbms-envelope+xml': { source: 'iana', compressible: !0 },
    'application/mbms-msk+xml': { source: 'iana', compressible: !0 },
    'application/mbms-msk-response+xml': { source: 'iana', compressible: !0 },
    'application/mbms-protection-description+xml': { source: 'iana', compressible: !0 },
    'application/mbms-reception-report+xml': { source: 'iana', compressible: !0 },
    'application/mbms-register+xml': { source: 'iana', compressible: !0 },
    'application/mbms-register-response+xml': { source: 'iana', compressible: !0 },
    'application/mbms-schedule+xml': { source: 'iana', compressible: !0 },
    'application/mbms-user-service-description+xml': { source: 'iana', compressible: !0 },
    'application/mbox': { source: 'iana', extensions: ['mbox'] },
    'application/media-policy-dataset+xml': { source: 'iana', compressible: !0, extensions: ['mpf'] },
    'application/media_control+xml': { source: 'iana', compressible: !0 },
    'application/mediaservercontrol+xml': { source: 'iana', compressible: !0, extensions: ['mscml'] },
    'application/merge-patch+json': { source: 'iana', compressible: !0 },
    'application/metalink+xml': { source: 'apache', compressible: !0, extensions: ['metalink'] },
    'application/metalink4+xml': { source: 'iana', compressible: !0, extensions: ['meta4'] },
    'application/mets+xml': { source: 'iana', compressible: !0, extensions: ['mets'] },
    'application/mf4': { source: 'iana' },
    'application/mikey': { source: 'iana' },
    'application/mipc': { source: 'iana' },
    'application/missing-blocks+cbor-seq': { source: 'iana' },
    'application/mmt-aei+xml': { source: 'iana', compressible: !0, extensions: ['maei'] },
    'application/mmt-usd+xml': { source: 'iana', compressible: !0, extensions: ['musd'] },
    'application/mods+xml': { source: 'iana', compressible: !0, extensions: ['mods'] },
    'application/moss-keys': { source: 'iana' },
    'application/moss-signature': { source: 'iana' },
    'application/mosskey-data': { source: 'iana' },
    'application/mosskey-request': { source: 'iana' },
    'application/mp21': { source: 'iana', extensions: ['m21', 'mp21'] },
    'application/mp4': { source: 'iana', extensions: ['mp4s', 'm4p'] },
    'application/mpeg4-generic': { source: 'iana' },
    'application/mpeg4-iod': { source: 'iana' },
    'application/mpeg4-iod-xmt': { source: 'iana' },
    'application/mrb-consumer+xml': { source: 'iana', compressible: !0 },
    'application/mrb-publish+xml': { source: 'iana', compressible: !0 },
    'application/msc-ivr+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/msc-mixer+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/msword': { source: 'iana', compressible: !1, extensions: ['doc', 'dot'] },
    'application/mud+json': { source: 'iana', compressible: !0 },
    'application/multipart-core': { source: 'iana' },
    'application/mxf': { source: 'iana', extensions: ['mxf'] },
    'application/n-quads': { source: 'iana', extensions: ['nq'] },
    'application/n-triples': { source: 'iana', extensions: ['nt'] },
    'application/nasdata': { source: 'iana' },
    'application/news-checkgroups': { source: 'iana', charset: 'US-ASCII' },
    'application/news-groupinfo': { source: 'iana', charset: 'US-ASCII' },
    'application/news-transmission': { source: 'iana' },
    'application/nlsml+xml': { source: 'iana', compressible: !0 },
    'application/node': { source: 'iana', extensions: ['cjs'] },
    'application/nss': { source: 'iana' },
    'application/oauth-authz-req+jwt': { source: 'iana' },
    'application/oblivious-dns-message': { source: 'iana' },
    'application/ocsp-request': { source: 'iana' },
    'application/ocsp-response': { source: 'iana' },
    'application/octet-stream': {
      source: 'iana',
      compressible: !1,
      extensions: [
        'bin',
        'dms',
        'lrf',
        'mar',
        'so',
        'dist',
        'distz',
        'pkg',
        'bpk',
        'dump',
        'elc',
        'deploy',
        'exe',
        'dll',
        'deb',
        'dmg',
        'iso',
        'img',
        'msi',
        'msp',
        'msm',
        'buffer',
      ],
    },
    'application/oda': { source: 'iana', extensions: ['oda'] },
    'application/odm+xml': { source: 'iana', compressible: !0 },
    'application/odx': { source: 'iana' },
    'application/oebps-package+xml': { source: 'iana', compressible: !0, extensions: ['opf'] },
    'application/ogg': { source: 'iana', compressible: !1, extensions: ['ogx'] },
    'application/omdoc+xml': { source: 'apache', compressible: !0, extensions: ['omdoc'] },
    'application/onenote': { source: 'apache', extensions: ['onetoc', 'onetoc2', 'onetmp', 'onepkg'] },
    'application/opc-nodeset+xml': { source: 'iana', compressible: !0 },
    'application/oscore': { source: 'iana' },
    'application/oxps': { source: 'iana', extensions: ['oxps'] },
    'application/p21': { source: 'iana' },
    'application/p21+zip': { source: 'iana', compressible: !1 },
    'application/p2p-overlay+xml': { source: 'iana', compressible: !0, extensions: ['relo'] },
    'application/parityfec': { source: 'iana' },
    'application/passport': { source: 'iana' },
    'application/patch-ops-error+xml': { source: 'iana', compressible: !0, extensions: ['xer'] },
    'application/pdf': { source: 'iana', compressible: !1, extensions: ['pdf'] },
    'application/pdx': { source: 'iana' },
    'application/pem-certificate-chain': { source: 'iana' },
    'application/pgp-encrypted': { source: 'iana', compressible: !1, extensions: ['pgp'] },
    'application/pgp-keys': { source: 'iana', extensions: ['asc'] },
    'application/pgp-signature': { source: 'iana', extensions: ['asc', 'sig'] },
    'application/pics-rules': { source: 'apache', extensions: ['prf'] },
    'application/pidf+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/pidf-diff+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/pkcs10': { source: 'iana', extensions: ['p10'] },
    'application/pkcs12': { source: 'iana' },
    'application/pkcs7-mime': { source: 'iana', extensions: ['p7m', 'p7c'] },
    'application/pkcs7-signature': { source: 'iana', extensions: ['p7s'] },
    'application/pkcs8': { source: 'iana', extensions: ['p8'] },
    'application/pkcs8-encrypted': { source: 'iana' },
    'application/pkix-attr-cert': { source: 'iana', extensions: ['ac'] },
    'application/pkix-cert': { source: 'iana', extensions: ['cer'] },
    'application/pkix-crl': { source: 'iana', extensions: ['crl'] },
    'application/pkix-pkipath': { source: 'iana', extensions: ['pkipath'] },
    'application/pkixcmp': { source: 'iana', extensions: ['pki'] },
    'application/pls+xml': { source: 'iana', compressible: !0, extensions: ['pls'] },
    'application/poc-settings+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/postscript': { source: 'iana', compressible: !0, extensions: ['ai', 'eps', 'ps'] },
    'application/ppsp-tracker+json': { source: 'iana', compressible: !0 },
    'application/problem+json': { source: 'iana', compressible: !0 },
    'application/problem+xml': { source: 'iana', compressible: !0 },
    'application/provenance+xml': { source: 'iana', compressible: !0, extensions: ['provx'] },
    'application/prs.alvestrand.titrax-sheet': { source: 'iana' },
    'application/prs.cww': { source: 'iana', extensions: ['cww'] },
    'application/prs.cyn': { source: 'iana', charset: '7-BIT' },
    'application/prs.hpub+zip': { source: 'iana', compressible: !1 },
    'application/prs.nprend': { source: 'iana' },
    'application/prs.plucker': { source: 'iana' },
    'application/prs.rdf-xml-crypt': { source: 'iana' },
    'application/prs.xsf+xml': { source: 'iana', compressible: !0 },
    'application/pskc+xml': { source: 'iana', compressible: !0, extensions: ['pskcxml'] },
    'application/pvd+json': { source: 'iana', compressible: !0 },
    'application/qsig': { source: 'iana' },
    'application/raml+yaml': { compressible: !0, extensions: ['raml'] },
    'application/raptorfec': { source: 'iana' },
    'application/rdap+json': { source: 'iana', compressible: !0 },
    'application/rdf+xml': { source: 'iana', compressible: !0, extensions: ['rdf', 'owl'] },
    'application/reginfo+xml': { source: 'iana', compressible: !0, extensions: ['rif'] },
    'application/relax-ng-compact-syntax': { source: 'iana', extensions: ['rnc'] },
    'application/remote-printing': { source: 'iana' },
    'application/reputon+json': { source: 'iana', compressible: !0 },
    'application/resource-lists+xml': { source: 'iana', compressible: !0, extensions: ['rl'] },
    'application/resource-lists-diff+xml': { source: 'iana', compressible: !0, extensions: ['rld'] },
    'application/rfc+xml': { source: 'iana', compressible: !0 },
    'application/riscos': { source: 'iana' },
    'application/rlmi+xml': { source: 'iana', compressible: !0 },
    'application/rls-services+xml': { source: 'iana', compressible: !0, extensions: ['rs'] },
    'application/route-apd+xml': { source: 'iana', compressible: !0, extensions: ['rapd'] },
    'application/route-s-tsid+xml': { source: 'iana', compressible: !0, extensions: ['sls'] },
    'application/route-usd+xml': { source: 'iana', compressible: !0, extensions: ['rusd'] },
    'application/rpki-ghostbusters': { source: 'iana', extensions: ['gbr'] },
    'application/rpki-manifest': { source: 'iana', extensions: ['mft'] },
    'application/rpki-publication': { source: 'iana' },
    'application/rpki-roa': { source: 'iana', extensions: ['roa'] },
    'application/rpki-updown': { source: 'iana' },
    'application/rsd+xml': { source: 'apache', compressible: !0, extensions: ['rsd'] },
    'application/rss+xml': { source: 'apache', compressible: !0, extensions: ['rss'] },
    'application/rtf': { source: 'iana', compressible: !0, extensions: ['rtf'] },
    'application/rtploopback': { source: 'iana' },
    'application/rtx': { source: 'iana' },
    'application/samlassertion+xml': { source: 'iana', compressible: !0 },
    'application/samlmetadata+xml': { source: 'iana', compressible: !0 },
    'application/sarif+json': { source: 'iana', compressible: !0 },
    'application/sarif-external-properties+json': { source: 'iana', compressible: !0 },
    'application/sbe': { source: 'iana' },
    'application/sbml+xml': { source: 'iana', compressible: !0, extensions: ['sbml'] },
    'application/scaip+xml': { source: 'iana', compressible: !0 },
    'application/scim+json': { source: 'iana', compressible: !0 },
    'application/scvp-cv-request': { source: 'iana', extensions: ['scq'] },
    'application/scvp-cv-response': { source: 'iana', extensions: ['scs'] },
    'application/scvp-vp-request': { source: 'iana', extensions: ['spq'] },
    'application/scvp-vp-response': { source: 'iana', extensions: ['spp'] },
    'application/sdp': { source: 'iana', extensions: ['sdp'] },
    'application/secevent+jwt': { source: 'iana' },
    'application/senml+cbor': { source: 'iana' },
    'application/senml+json': { source: 'iana', compressible: !0 },
    'application/senml+xml': { source: 'iana', compressible: !0, extensions: ['senmlx'] },
    'application/senml-etch+cbor': { source: 'iana' },
    'application/senml-etch+json': { source: 'iana', compressible: !0 },
    'application/senml-exi': { source: 'iana' },
    'application/sensml+cbor': { source: 'iana' },
    'application/sensml+json': { source: 'iana', compressible: !0 },
    'application/sensml+xml': { source: 'iana', compressible: !0, extensions: ['sensmlx'] },
    'application/sensml-exi': { source: 'iana' },
    'application/sep+xml': { source: 'iana', compressible: !0 },
    'application/sep-exi': { source: 'iana' },
    'application/session-info': { source: 'iana' },
    'application/set-payment': { source: 'iana' },
    'application/set-payment-initiation': { source: 'iana', extensions: ['setpay'] },
    'application/set-registration': { source: 'iana' },
    'application/set-registration-initiation': { source: 'iana', extensions: ['setreg'] },
    'application/sgml': { source: 'iana' },
    'application/sgml-open-catalog': { source: 'iana' },
    'application/shf+xml': { source: 'iana', compressible: !0, extensions: ['shf'] },
    'application/sieve': { source: 'iana', extensions: ['siv', 'sieve'] },
    'application/simple-filter+xml': { source: 'iana', compressible: !0 },
    'application/simple-message-summary': { source: 'iana' },
    'application/simplesymbolcontainer': { source: 'iana' },
    'application/sipc': { source: 'iana' },
    'application/slate': { source: 'iana' },
    'application/smil': { source: 'iana' },
    'application/smil+xml': { source: 'iana', compressible: !0, extensions: ['smi', 'smil'] },
    'application/smpte336m': { source: 'iana' },
    'application/soap+fastinfoset': { source: 'iana' },
    'application/soap+xml': { source: 'iana', compressible: !0 },
    'application/sparql-query': { source: 'iana', extensions: ['rq'] },
    'application/sparql-results+xml': { source: 'iana', compressible: !0, extensions: ['srx'] },
    'application/spdx+json': { source: 'iana', compressible: !0 },
    'application/spirits-event+xml': { source: 'iana', compressible: !0 },
    'application/sql': { source: 'iana' },
    'application/srgs': { source: 'iana', extensions: ['gram'] },
    'application/srgs+xml': { source: 'iana', compressible: !0, extensions: ['grxml'] },
    'application/sru+xml': { source: 'iana', compressible: !0, extensions: ['sru'] },
    'application/ssdl+xml': { source: 'apache', compressible: !0, extensions: ['ssdl'] },
    'application/ssml+xml': { source: 'iana', compressible: !0, extensions: ['ssml'] },
    'application/stix+json': { source: 'iana', compressible: !0 },
    'application/swid+xml': { source: 'iana', compressible: !0, extensions: ['swidtag'] },
    'application/tamp-apex-update': { source: 'iana' },
    'application/tamp-apex-update-confirm': { source: 'iana' },
    'application/tamp-community-update': { source: 'iana' },
    'application/tamp-community-update-confirm': { source: 'iana' },
    'application/tamp-error': { source: 'iana' },
    'application/tamp-sequence-adjust': { source: 'iana' },
    'application/tamp-sequence-adjust-confirm': { source: 'iana' },
    'application/tamp-status-query': { source: 'iana' },
    'application/tamp-status-response': { source: 'iana' },
    'application/tamp-update': { source: 'iana' },
    'application/tamp-update-confirm': { source: 'iana' },
    'application/tar': { compressible: !0 },
    'application/taxii+json': { source: 'iana', compressible: !0 },
    'application/td+json': { source: 'iana', compressible: !0 },
    'application/tei+xml': { source: 'iana', compressible: !0, extensions: ['tei', 'teicorpus'] },
    'application/tetra_isi': { source: 'iana' },
    'application/thraud+xml': { source: 'iana', compressible: !0, extensions: ['tfi'] },
    'application/timestamp-query': { source: 'iana' },
    'application/timestamp-reply': { source: 'iana' },
    'application/timestamped-data': { source: 'iana', extensions: ['tsd'] },
    'application/tlsrpt+gzip': { source: 'iana' },
    'application/tlsrpt+json': { source: 'iana', compressible: !0 },
    'application/tnauthlist': { source: 'iana' },
    'application/token-introspection+jwt': { source: 'iana' },
    'application/toml': { compressible: !0, extensions: ['toml'] },
    'application/trickle-ice-sdpfrag': { source: 'iana' },
    'application/trig': { source: 'iana', extensions: ['trig'] },
    'application/ttml+xml': { source: 'iana', compressible: !0, extensions: ['ttml'] },
    'application/tve-trigger': { source: 'iana' },
    'application/tzif': { source: 'iana' },
    'application/tzif-leap': { source: 'iana' },
    'application/ubjson': { compressible: !1, extensions: ['ubj'] },
    'application/ulpfec': { source: 'iana' },
    'application/urc-grpsheet+xml': { source: 'iana', compressible: !0 },
    'application/urc-ressheet+xml': { source: 'iana', compressible: !0, extensions: ['rsheet'] },
    'application/urc-targetdesc+xml': { source: 'iana', compressible: !0, extensions: ['td'] },
    'application/urc-uisocketdesc+xml': { source: 'iana', compressible: !0 },
    'application/vcard+json': { source: 'iana', compressible: !0 },
    'application/vcard+xml': { source: 'iana', compressible: !0 },
    'application/vemmi': { source: 'iana' },
    'application/vividence.scriptfile': { source: 'apache' },
    'application/vnd.1000minds.decision-model+xml': { source: 'iana', compressible: !0, extensions: ['1km'] },
    'application/vnd.3gpp-prose+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp-prose-pc3ch+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp-v2x-local-service-information': { source: 'iana' },
    'application/vnd.3gpp.5gnas': { source: 'iana' },
    'application/vnd.3gpp.access-transfer-events+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.bsf+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.gmop+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.gtpc': { source: 'iana' },
    'application/vnd.3gpp.interworking-data': { source: 'iana' },
    'application/vnd.3gpp.lpp': { source: 'iana' },
    'application/vnd.3gpp.mc-signalling-ear': { source: 'iana' },
    'application/vnd.3gpp.mcdata-affiliation-command+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcdata-info+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcdata-payload': { source: 'iana' },
    'application/vnd.3gpp.mcdata-service-config+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcdata-signalling': { source: 'iana' },
    'application/vnd.3gpp.mcdata-ue-config+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcdata-user-profile+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcptt-affiliation-command+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcptt-floor-request+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcptt-info+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcptt-location-info+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcptt-mbms-usage-info+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcptt-service-config+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcptt-signed+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcptt-ue-config+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcptt-ue-init-config+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcptt-user-profile+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcvideo-affiliation-command+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcvideo-affiliation-info+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcvideo-info+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcvideo-location-info+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcvideo-mbms-usage-info+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcvideo-service-config+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcvideo-transmission-request+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcvideo-ue-config+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mcvideo-user-profile+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.mid-call+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.ngap': { source: 'iana' },
    'application/vnd.3gpp.pfcp': { source: 'iana' },
    'application/vnd.3gpp.pic-bw-large': { source: 'iana', extensions: ['plb'] },
    'application/vnd.3gpp.pic-bw-small': { source: 'iana', extensions: ['psb'] },
    'application/vnd.3gpp.pic-bw-var': { source: 'iana', extensions: ['pvb'] },
    'application/vnd.3gpp.s1ap': { source: 'iana' },
    'application/vnd.3gpp.sms': { source: 'iana' },
    'application/vnd.3gpp.sms+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.srvcc-ext+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.srvcc-info+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.state-and-event-info+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp.ussd+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp2.bcmcsinfo+xml': { source: 'iana', compressible: !0 },
    'application/vnd.3gpp2.sms': { source: 'iana' },
    'application/vnd.3gpp2.tcap': { source: 'iana', extensions: ['tcap'] },
    'application/vnd.3lightssoftware.imagescal': { source: 'iana' },
    'application/vnd.3m.post-it-notes': { source: 'iana', extensions: ['pwn'] },
    'application/vnd.accpac.simply.aso': { source: 'iana', extensions: ['aso'] },
    'application/vnd.accpac.simply.imp': { source: 'iana', extensions: ['imp'] },
    'application/vnd.acucobol': { source: 'iana', extensions: ['acu'] },
    'application/vnd.acucorp': { source: 'iana', extensions: ['atc', 'acutc'] },
    'application/vnd.adobe.air-application-installer-package+zip': {
      source: 'apache',
      compressible: !1,
      extensions: ['air'],
    },
    'application/vnd.adobe.flash.movie': { source: 'iana' },
    'application/vnd.adobe.formscentral.fcdt': { source: 'iana', extensions: ['fcdt'] },
    'application/vnd.adobe.fxp': { source: 'iana', extensions: ['fxp', 'fxpl'] },
    'application/vnd.adobe.partial-upload': { source: 'iana' },
    'application/vnd.adobe.xdp+xml': { source: 'iana', compressible: !0, extensions: ['xdp'] },
    'application/vnd.adobe.xfdf': { source: 'iana', extensions: ['xfdf'] },
    'application/vnd.aether.imp': { source: 'iana' },
    'application/vnd.afpc.afplinedata': { source: 'iana' },
    'application/vnd.afpc.afplinedata-pagedef': { source: 'iana' },
    'application/vnd.afpc.cmoca-cmresource': { source: 'iana' },
    'application/vnd.afpc.foca-charset': { source: 'iana' },
    'application/vnd.afpc.foca-codedfont': { source: 'iana' },
    'application/vnd.afpc.foca-codepage': { source: 'iana' },
    'application/vnd.afpc.modca': { source: 'iana' },
    'application/vnd.afpc.modca-cmtable': { source: 'iana' },
    'application/vnd.afpc.modca-formdef': { source: 'iana' },
    'application/vnd.afpc.modca-mediummap': { source: 'iana' },
    'application/vnd.afpc.modca-objectcontainer': { source: 'iana' },
    'application/vnd.afpc.modca-overlay': { source: 'iana' },
    'application/vnd.afpc.modca-pagesegment': { source: 'iana' },
    'application/vnd.age': { source: 'iana', extensions: ['age'] },
    'application/vnd.ah-barcode': { source: 'iana' },
    'application/vnd.ahead.space': { source: 'iana', extensions: ['ahead'] },
    'application/vnd.airzip.filesecure.azf': { source: 'iana', extensions: ['azf'] },
    'application/vnd.airzip.filesecure.azs': { source: 'iana', extensions: ['azs'] },
    'application/vnd.amadeus+json': { source: 'iana', compressible: !0 },
    'application/vnd.amazon.ebook': { source: 'apache', extensions: ['azw'] },
    'application/vnd.amazon.mobi8-ebook': { source: 'iana' },
    'application/vnd.americandynamics.acc': { source: 'iana', extensions: ['acc'] },
    'application/vnd.amiga.ami': { source: 'iana', extensions: ['ami'] },
    'application/vnd.amundsen.maze+xml': { source: 'iana', compressible: !0 },
    'application/vnd.android.ota': { source: 'iana' },
    'application/vnd.android.package-archive': { source: 'apache', compressible: !1, extensions: ['apk'] },
    'application/vnd.anki': { source: 'iana' },
    'application/vnd.anser-web-certificate-issue-initiation': { source: 'iana', extensions: ['cii'] },
    'application/vnd.anser-web-funds-transfer-initiation': { source: 'apache', extensions: ['fti'] },
    'application/vnd.antix.game-component': { source: 'iana', extensions: ['atx'] },
    'application/vnd.apache.arrow.file': { source: 'iana' },
    'application/vnd.apache.arrow.stream': { source: 'iana' },
    'application/vnd.apache.thrift.binary': { source: 'iana' },
    'application/vnd.apache.thrift.compact': { source: 'iana' },
    'application/vnd.apache.thrift.json': { source: 'iana' },
    'application/vnd.api+json': { source: 'iana', compressible: !0 },
    'application/vnd.aplextor.warrp+json': { source: 'iana', compressible: !0 },
    'application/vnd.apothekende.reservation+json': { source: 'iana', compressible: !0 },
    'application/vnd.apple.installer+xml': { source: 'iana', compressible: !0, extensions: ['mpkg'] },
    'application/vnd.apple.keynote': { source: 'iana', extensions: ['key'] },
    'application/vnd.apple.mpegurl': { source: 'iana', extensions: ['m3u8'] },
    'application/vnd.apple.numbers': { source: 'iana', extensions: ['numbers'] },
    'application/vnd.apple.pages': { source: 'iana', extensions: ['pages'] },
    'application/vnd.apple.pkpass': { compressible: !1, extensions: ['pkpass'] },
    'application/vnd.arastra.swi': { source: 'iana' },
    'application/vnd.aristanetworks.swi': { source: 'iana', extensions: ['swi'] },
    'application/vnd.artisan+json': { source: 'iana', compressible: !0 },
    'application/vnd.artsquare': { source: 'iana' },
    'application/vnd.astraea-software.iota': { source: 'iana', extensions: ['iota'] },
    'application/vnd.audiograph': { source: 'iana', extensions: ['aep'] },
    'application/vnd.autopackage': { source: 'iana' },
    'application/vnd.avalon+json': { source: 'iana', compressible: !0 },
    'application/vnd.avistar+xml': { source: 'iana', compressible: !0 },
    'application/vnd.balsamiq.bmml+xml': { source: 'iana', compressible: !0, extensions: ['bmml'] },
    'application/vnd.balsamiq.bmpr': { source: 'iana' },
    'application/vnd.banana-accounting': { source: 'iana' },
    'application/vnd.bbf.usp.error': { source: 'iana' },
    'application/vnd.bbf.usp.msg': { source: 'iana' },
    'application/vnd.bbf.usp.msg+json': { source: 'iana', compressible: !0 },
    'application/vnd.bekitzur-stech+json': { source: 'iana', compressible: !0 },
    'application/vnd.bint.med-content': { source: 'iana' },
    'application/vnd.biopax.rdf+xml': { source: 'iana', compressible: !0 },
    'application/vnd.blink-idb-value-wrapper': { source: 'iana' },
    'application/vnd.blueice.multipass': { source: 'iana', extensions: ['mpm'] },
    'application/vnd.bluetooth.ep.oob': { source: 'iana' },
    'application/vnd.bluetooth.le.oob': { source: 'iana' },
    'application/vnd.bmi': { source: 'iana', extensions: ['bmi'] },
    'application/vnd.bpf': { source: 'iana' },
    'application/vnd.bpf3': { source: 'iana' },
    'application/vnd.businessobjects': { source: 'iana', extensions: ['rep'] },
    'application/vnd.byu.uapi+json': { source: 'iana', compressible: !0 },
    'application/vnd.cab-jscript': { source: 'iana' },
    'application/vnd.canon-cpdl': { source: 'iana' },
    'application/vnd.canon-lips': { source: 'iana' },
    'application/vnd.capasystems-pg+json': { source: 'iana', compressible: !0 },
    'application/vnd.cendio.thinlinc.clientconf': { source: 'iana' },
    'application/vnd.century-systems.tcp_stream': { source: 'iana' },
    'application/vnd.chemdraw+xml': { source: 'iana', compressible: !0, extensions: ['cdxml'] },
    'application/vnd.chess-pgn': { source: 'iana' },
    'application/vnd.chipnuts.karaoke-mmd': { source: 'iana', extensions: ['mmd'] },
    'application/vnd.ciedi': { source: 'iana' },
    'application/vnd.cinderella': { source: 'iana', extensions: ['cdy'] },
    'application/vnd.cirpack.isdn-ext': { source: 'iana' },
    'application/vnd.citationstyles.style+xml': { source: 'iana', compressible: !0, extensions: ['csl'] },
    'application/vnd.claymore': { source: 'iana', extensions: ['cla'] },
    'application/vnd.cloanto.rp9': { source: 'iana', extensions: ['rp9'] },
    'application/vnd.clonk.c4group': { source: 'iana', extensions: ['c4g', 'c4d', 'c4f', 'c4p', 'c4u'] },
    'application/vnd.cluetrust.cartomobile-config': { source: 'iana', extensions: ['c11amc'] },
    'application/vnd.cluetrust.cartomobile-config-pkg': { source: 'iana', extensions: ['c11amz'] },
    'application/vnd.coffeescript': { source: 'iana' },
    'application/vnd.collabio.xodocuments.document': { source: 'iana' },
    'application/vnd.collabio.xodocuments.document-template': { source: 'iana' },
    'application/vnd.collabio.xodocuments.presentation': { source: 'iana' },
    'application/vnd.collabio.xodocuments.presentation-template': { source: 'iana' },
    'application/vnd.collabio.xodocuments.spreadsheet': { source: 'iana' },
    'application/vnd.collabio.xodocuments.spreadsheet-template': { source: 'iana' },
    'application/vnd.collection+json': { source: 'iana', compressible: !0 },
    'application/vnd.collection.doc+json': { source: 'iana', compressible: !0 },
    'application/vnd.collection.next+json': { source: 'iana', compressible: !0 },
    'application/vnd.comicbook+zip': { source: 'iana', compressible: !1 },
    'application/vnd.comicbook-rar': { source: 'iana' },
    'application/vnd.commerce-battelle': { source: 'iana' },
    'application/vnd.commonspace': { source: 'iana', extensions: ['csp'] },
    'application/vnd.contact.cmsg': { source: 'iana', extensions: ['cdbcmsg'] },
    'application/vnd.coreos.ignition+json': { source: 'iana', compressible: !0 },
    'application/vnd.cosmocaller': { source: 'iana', extensions: ['cmc'] },
    'application/vnd.crick.clicker': { source: 'iana', extensions: ['clkx'] },
    'application/vnd.crick.clicker.keyboard': { source: 'iana', extensions: ['clkk'] },
    'application/vnd.crick.clicker.palette': { source: 'iana', extensions: ['clkp'] },
    'application/vnd.crick.clicker.template': { source: 'iana', extensions: ['clkt'] },
    'application/vnd.crick.clicker.wordbank': { source: 'iana', extensions: ['clkw'] },
    'application/vnd.criticaltools.wbs+xml': { source: 'iana', compressible: !0, extensions: ['wbs'] },
    'application/vnd.cryptii.pipe+json': { source: 'iana', compressible: !0 },
    'application/vnd.crypto-shade-file': { source: 'iana' },
    'application/vnd.cryptomator.encrypted': { source: 'iana' },
    'application/vnd.cryptomator.vault': { source: 'iana' },
    'application/vnd.ctc-posml': { source: 'iana', extensions: ['pml'] },
    'application/vnd.ctct.ws+xml': { source: 'iana', compressible: !0 },
    'application/vnd.cups-pdf': { source: 'iana' },
    'application/vnd.cups-postscript': { source: 'iana' },
    'application/vnd.cups-ppd': { source: 'iana', extensions: ['ppd'] },
    'application/vnd.cups-raster': { source: 'iana' },
    'application/vnd.cups-raw': { source: 'iana' },
    'application/vnd.curl': { source: 'iana' },
    'application/vnd.curl.car': { source: 'apache', extensions: ['car'] },
    'application/vnd.curl.pcurl': { source: 'apache', extensions: ['pcurl'] },
    'application/vnd.cyan.dean.root+xml': { source: 'iana', compressible: !0 },
    'application/vnd.cybank': { source: 'iana' },
    'application/vnd.cyclonedx+json': { source: 'iana', compressible: !0 },
    'application/vnd.cyclonedx+xml': { source: 'iana', compressible: !0 },
    'application/vnd.d2l.coursepackage1p0+zip': { source: 'iana', compressible: !1 },
    'application/vnd.d3m-dataset': { source: 'iana' },
    'application/vnd.d3m-problem': { source: 'iana' },
    'application/vnd.dart': { source: 'iana', compressible: !0, extensions: ['dart'] },
    'application/vnd.data-vision.rdz': { source: 'iana', extensions: ['rdz'] },
    'application/vnd.datapackage+json': { source: 'iana', compressible: !0 },
    'application/vnd.dataresource+json': { source: 'iana', compressible: !0 },
    'application/vnd.dbf': { source: 'iana', extensions: ['dbf'] },
    'application/vnd.debian.binary-package': { source: 'iana' },
    'application/vnd.dece.data': { source: 'iana', extensions: ['uvf', 'uvvf', 'uvd', 'uvvd'] },
    'application/vnd.dece.ttml+xml': { source: 'iana', compressible: !0, extensions: ['uvt', 'uvvt'] },
    'application/vnd.dece.unspecified': { source: 'iana', extensions: ['uvx', 'uvvx'] },
    'application/vnd.dece.zip': { source: 'iana', extensions: ['uvz', 'uvvz'] },
    'application/vnd.denovo.fcselayout-link': { source: 'iana', extensions: ['fe_launch'] },
    'application/vnd.desmume.movie': { source: 'iana' },
    'application/vnd.dir-bi.plate-dl-nosuffix': { source: 'iana' },
    'application/vnd.dm.delegation+xml': { source: 'iana', compressible: !0 },
    'application/vnd.dna': { source: 'iana', extensions: ['dna'] },
    'application/vnd.document+json': { source: 'iana', compressible: !0 },
    'application/vnd.dolby.mlp': { source: 'apache', extensions: ['mlp'] },
    'application/vnd.dolby.mobile.1': { source: 'iana' },
    'application/vnd.dolby.mobile.2': { source: 'iana' },
    'application/vnd.doremir.scorecloud-binary-document': { source: 'iana' },
    'application/vnd.dpgraph': { source: 'iana', extensions: ['dpg'] },
    'application/vnd.dreamfactory': { source: 'iana', extensions: ['dfac'] },
    'application/vnd.drive+json': { source: 'iana', compressible: !0 },
    'application/vnd.ds-keypoint': { source: 'apache', extensions: ['kpxx'] },
    'application/vnd.dtg.local': { source: 'iana' },
    'application/vnd.dtg.local.flash': { source: 'iana' },
    'application/vnd.dtg.local.html': { source: 'iana' },
    'application/vnd.dvb.ait': { source: 'iana', extensions: ['ait'] },
    'application/vnd.dvb.dvbisl+xml': { source: 'iana', compressible: !0 },
    'application/vnd.dvb.dvbj': { source: 'iana' },
    'application/vnd.dvb.esgcontainer': { source: 'iana' },
    'application/vnd.dvb.ipdcdftnotifaccess': { source: 'iana' },
    'application/vnd.dvb.ipdcesgaccess': { source: 'iana' },
    'application/vnd.dvb.ipdcesgaccess2': { source: 'iana' },
    'application/vnd.dvb.ipdcesgpdd': { source: 'iana' },
    'application/vnd.dvb.ipdcroaming': { source: 'iana' },
    'application/vnd.dvb.iptv.alfec-base': { source: 'iana' },
    'application/vnd.dvb.iptv.alfec-enhancement': { source: 'iana' },
    'application/vnd.dvb.notif-aggregate-root+xml': { source: 'iana', compressible: !0 },
    'application/vnd.dvb.notif-container+xml': { source: 'iana', compressible: !0 },
    'application/vnd.dvb.notif-generic+xml': { source: 'iana', compressible: !0 },
    'application/vnd.dvb.notif-ia-msglist+xml': { source: 'iana', compressible: !0 },
    'application/vnd.dvb.notif-ia-registration-request+xml': { source: 'iana', compressible: !0 },
    'application/vnd.dvb.notif-ia-registration-response+xml': { source: 'iana', compressible: !0 },
    'application/vnd.dvb.notif-init+xml': { source: 'iana', compressible: !0 },
    'application/vnd.dvb.pfr': { source: 'iana' },
    'application/vnd.dvb.service': { source: 'iana', extensions: ['svc'] },
    'application/vnd.dxr': { source: 'iana' },
    'application/vnd.dynageo': { source: 'iana', extensions: ['geo'] },
    'application/vnd.dzr': { source: 'iana' },
    'application/vnd.easykaraoke.cdgdownload': { source: 'iana' },
    'application/vnd.ecdis-update': { source: 'iana' },
    'application/vnd.ecip.rlp': { source: 'iana' },
    'application/vnd.eclipse.ditto+json': { source: 'iana', compressible: !0 },
    'application/vnd.ecowin.chart': { source: 'iana', extensions: ['mag'] },
    'application/vnd.ecowin.filerequest': { source: 'iana' },
    'application/vnd.ecowin.fileupdate': { source: 'iana' },
    'application/vnd.ecowin.series': { source: 'iana' },
    'application/vnd.ecowin.seriesrequest': { source: 'iana' },
    'application/vnd.ecowin.seriesupdate': { source: 'iana' },
    'application/vnd.efi.img': { source: 'iana' },
    'application/vnd.efi.iso': { source: 'iana' },
    'application/vnd.emclient.accessrequest+xml': { source: 'iana', compressible: !0 },
    'application/vnd.enliven': { source: 'iana', extensions: ['nml'] },
    'application/vnd.enphase.envoy': { source: 'iana' },
    'application/vnd.eprints.data+xml': { source: 'iana', compressible: !0 },
    'application/vnd.epson.esf': { source: 'iana', extensions: ['esf'] },
    'application/vnd.epson.msf': { source: 'iana', extensions: ['msf'] },
    'application/vnd.epson.quickanime': { source: 'iana', extensions: ['qam'] },
    'application/vnd.epson.salt': { source: 'iana', extensions: ['slt'] },
    'application/vnd.epson.ssf': { source: 'iana', extensions: ['ssf'] },
    'application/vnd.ericsson.quickcall': { source: 'iana' },
    'application/vnd.espass-espass+zip': { source: 'iana', compressible: !1 },
    'application/vnd.eszigno3+xml': { source: 'iana', compressible: !0, extensions: ['es3', 'et3'] },
    'application/vnd.etsi.aoc+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.asic-e+zip': { source: 'iana', compressible: !1 },
    'application/vnd.etsi.asic-s+zip': { source: 'iana', compressible: !1 },
    'application/vnd.etsi.cug+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.iptvcommand+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.iptvdiscovery+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.iptvprofile+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.iptvsad-bc+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.iptvsad-cod+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.iptvsad-npvr+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.iptvservice+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.iptvsync+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.iptvueprofile+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.mcid+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.mheg5': { source: 'iana' },
    'application/vnd.etsi.overload-control-policy-dataset+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.pstn+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.sci+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.simservs+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.timestamp-token': { source: 'iana' },
    'application/vnd.etsi.tsl+xml': { source: 'iana', compressible: !0 },
    'application/vnd.etsi.tsl.der': { source: 'iana' },
    'application/vnd.eu.kasparian.car+json': { source: 'iana', compressible: !0 },
    'application/vnd.eudora.data': { source: 'iana' },
    'application/vnd.evolv.ecig.profile': { source: 'iana' },
    'application/vnd.evolv.ecig.settings': { source: 'iana' },
    'application/vnd.evolv.ecig.theme': { source: 'iana' },
    'application/vnd.exstream-empower+zip': { source: 'iana', compressible: !1 },
    'application/vnd.exstream-package': { source: 'iana' },
    'application/vnd.ezpix-album': { source: 'iana', extensions: ['ez2'] },
    'application/vnd.ezpix-package': { source: 'iana', extensions: ['ez3'] },
    'application/vnd.f-secure.mobile': { source: 'iana' },
    'application/vnd.familysearch.gedcom+zip': { source: 'iana', compressible: !1 },
    'application/vnd.fastcopy-disk-image': { source: 'iana' },
    'application/vnd.fdf': { source: 'iana', extensions: ['fdf'] },
    'application/vnd.fdsn.mseed': { source: 'iana', extensions: ['mseed'] },
    'application/vnd.fdsn.seed': { source: 'iana', extensions: ['seed', 'dataless'] },
    'application/vnd.ffsns': { source: 'iana' },
    'application/vnd.ficlab.flb+zip': { source: 'iana', compressible: !1 },
    'application/vnd.filmit.zfc': { source: 'iana' },
    'application/vnd.fints': { source: 'iana' },
    'application/vnd.firemonkeys.cloudcell': { source: 'iana' },
    'application/vnd.flographit': { source: 'iana', extensions: ['gph'] },
    'application/vnd.fluxtime.clip': { source: 'iana', extensions: ['ftc'] },
    'application/vnd.font-fontforge-sfd': { source: 'iana' },
    'application/vnd.framemaker': { source: 'iana', extensions: ['fm', 'frame', 'maker', 'book'] },
    'application/vnd.frogans.fnc': { source: 'iana', extensions: ['fnc'] },
    'application/vnd.frogans.ltf': { source: 'iana', extensions: ['ltf'] },
    'application/vnd.fsc.weblaunch': { source: 'iana', extensions: ['fsc'] },
    'application/vnd.fujifilm.fb.docuworks': { source: 'iana' },
    'application/vnd.fujifilm.fb.docuworks.binder': { source: 'iana' },
    'application/vnd.fujifilm.fb.docuworks.container': { source: 'iana' },
    'application/vnd.fujifilm.fb.jfi+xml': { source: 'iana', compressible: !0 },
    'application/vnd.fujitsu.oasys': { source: 'iana', extensions: ['oas'] },
    'application/vnd.fujitsu.oasys2': { source: 'iana', extensions: ['oa2'] },
    'application/vnd.fujitsu.oasys3': { source: 'iana', extensions: ['oa3'] },
    'application/vnd.fujitsu.oasysgp': { source: 'iana', extensions: ['fg5'] },
    'application/vnd.fujitsu.oasysprs': { source: 'iana', extensions: ['bh2'] },
    'application/vnd.fujixerox.art-ex': { source: 'iana' },
    'application/vnd.fujixerox.art4': { source: 'iana' },
    'application/vnd.fujixerox.ddd': { source: 'iana', extensions: ['ddd'] },
    'application/vnd.fujixerox.docuworks': { source: 'iana', extensions: ['xdw'] },
    'application/vnd.fujixerox.docuworks.binder': { source: 'iana', extensions: ['xbd'] },
    'application/vnd.fujixerox.docuworks.container': { source: 'iana' },
    'application/vnd.fujixerox.hbpl': { source: 'iana' },
    'application/vnd.fut-misnet': { source: 'iana' },
    'application/vnd.futoin+cbor': { source: 'iana' },
    'application/vnd.futoin+json': { source: 'iana', compressible: !0 },
    'application/vnd.fuzzysheet': { source: 'iana', extensions: ['fzs'] },
    'application/vnd.genomatix.tuxedo': { source: 'iana', extensions: ['txd'] },
    'application/vnd.gentics.grd+json': { source: 'iana', compressible: !0 },
    'application/vnd.geo+json': { source: 'iana', compressible: !0 },
    'application/vnd.geocube+xml': { source: 'iana', compressible: !0 },
    'application/vnd.geogebra.file': { source: 'iana', extensions: ['ggb'] },
    'application/vnd.geogebra.slides': { source: 'iana' },
    'application/vnd.geogebra.tool': { source: 'iana', extensions: ['ggt'] },
    'application/vnd.geometry-explorer': { source: 'iana', extensions: ['gex', 'gre'] },
    'application/vnd.geonext': { source: 'iana', extensions: ['gxt'] },
    'application/vnd.geoplan': { source: 'iana', extensions: ['g2w'] },
    'application/vnd.geospace': { source: 'iana', extensions: ['g3w'] },
    'application/vnd.gerber': { source: 'iana' },
    'application/vnd.globalplatform.card-content-mgt': { source: 'iana' },
    'application/vnd.globalplatform.card-content-mgt-response': { source: 'iana' },
    'application/vnd.gmx': { source: 'iana', extensions: ['gmx'] },
    'application/vnd.google-apps.document': { compressible: !1, extensions: ['gdoc'] },
    'application/vnd.google-apps.presentation': { compressible: !1, extensions: ['gslides'] },
    'application/vnd.google-apps.spreadsheet': { compressible: !1, extensions: ['gsheet'] },
    'application/vnd.google-earth.kml+xml': { source: 'iana', compressible: !0, extensions: ['kml'] },
    'application/vnd.google-earth.kmz': { source: 'iana', compressible: !1, extensions: ['kmz'] },
    'application/vnd.gov.sk.e-form+xml': { source: 'iana', compressible: !0 },
    'application/vnd.gov.sk.e-form+zip': { source: 'iana', compressible: !1 },
    'application/vnd.gov.sk.xmldatacontainer+xml': { source: 'iana', compressible: !0 },
    'application/vnd.grafeq': { source: 'iana', extensions: ['gqf', 'gqs'] },
    'application/vnd.gridmp': { source: 'iana' },
    'application/vnd.groove-account': { source: 'iana', extensions: ['gac'] },
    'application/vnd.groove-help': { source: 'iana', extensions: ['ghf'] },
    'application/vnd.groove-identity-message': { source: 'iana', extensions: ['gim'] },
    'application/vnd.groove-injector': { source: 'iana', extensions: ['grv'] },
    'application/vnd.groove-tool-message': { source: 'iana', extensions: ['gtm'] },
    'application/vnd.groove-tool-template': { source: 'iana', extensions: ['tpl'] },
    'application/vnd.groove-vcard': { source: 'iana', extensions: ['vcg'] },
    'application/vnd.hal+json': { source: 'iana', compressible: !0 },
    'application/vnd.hal+xml': { source: 'iana', compressible: !0, extensions: ['hal'] },
    'application/vnd.handheld-entertainment+xml': { source: 'iana', compressible: !0, extensions: ['zmm'] },
    'application/vnd.hbci': { source: 'iana', extensions: ['hbci'] },
    'application/vnd.hc+json': { source: 'iana', compressible: !0 },
    'application/vnd.hcl-bireports': { source: 'iana' },
    'application/vnd.hdt': { source: 'iana' },
    'application/vnd.heroku+json': { source: 'iana', compressible: !0 },
    'application/vnd.hhe.lesson-player': { source: 'iana', extensions: ['les'] },
    'application/vnd.hl7cda+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/vnd.hl7v2+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/vnd.hp-hpgl': { source: 'iana', extensions: ['hpgl'] },
    'application/vnd.hp-hpid': { source: 'iana', extensions: ['hpid'] },
    'application/vnd.hp-hps': { source: 'iana', extensions: ['hps'] },
    'application/vnd.hp-jlyt': { source: 'iana', extensions: ['jlt'] },
    'application/vnd.hp-pcl': { source: 'iana', extensions: ['pcl'] },
    'application/vnd.hp-pclxl': { source: 'iana', extensions: ['pclxl'] },
    'application/vnd.httphone': { source: 'iana' },
    'application/vnd.hydrostatix.sof-data': { source: 'iana', extensions: ['sfd-hdstx'] },
    'application/vnd.hyper+json': { source: 'iana', compressible: !0 },
    'application/vnd.hyper-item+json': { source: 'iana', compressible: !0 },
    'application/vnd.hyperdrive+json': { source: 'iana', compressible: !0 },
    'application/vnd.hzn-3d-crossword': { source: 'iana' },
    'application/vnd.ibm.afplinedata': { source: 'iana' },
    'application/vnd.ibm.electronic-media': { source: 'iana' },
    'application/vnd.ibm.minipay': { source: 'iana', extensions: ['mpy'] },
    'application/vnd.ibm.modcap': { source: 'iana', extensions: ['afp', 'listafp', 'list3820'] },
    'application/vnd.ibm.rights-management': { source: 'iana', extensions: ['irm'] },
    'application/vnd.ibm.secure-container': { source: 'iana', extensions: ['sc'] },
    'application/vnd.iccprofile': { source: 'iana', extensions: ['icc', 'icm'] },
    'application/vnd.ieee.1905': { source: 'iana' },
    'application/vnd.igloader': { source: 'iana', extensions: ['igl'] },
    'application/vnd.imagemeter.folder+zip': { source: 'iana', compressible: !1 },
    'application/vnd.imagemeter.image+zip': { source: 'iana', compressible: !1 },
    'application/vnd.immervision-ivp': { source: 'iana', extensions: ['ivp'] },
    'application/vnd.immervision-ivu': { source: 'iana', extensions: ['ivu'] },
    'application/vnd.ims.imsccv1p1': { source: 'iana' },
    'application/vnd.ims.imsccv1p2': { source: 'iana' },
    'application/vnd.ims.imsccv1p3': { source: 'iana' },
    'application/vnd.ims.lis.v2.result+json': { source: 'iana', compressible: !0 },
    'application/vnd.ims.lti.v2.toolconsumerprofile+json': { source: 'iana', compressible: !0 },
    'application/vnd.ims.lti.v2.toolproxy+json': { source: 'iana', compressible: !0 },
    'application/vnd.ims.lti.v2.toolproxy.id+json': { source: 'iana', compressible: !0 },
    'application/vnd.ims.lti.v2.toolsettings+json': { source: 'iana', compressible: !0 },
    'application/vnd.ims.lti.v2.toolsettings.simple+json': { source: 'iana', compressible: !0 },
    'application/vnd.informedcontrol.rms+xml': { source: 'iana', compressible: !0 },
    'application/vnd.informix-visionary': { source: 'iana' },
    'application/vnd.infotech.project': { source: 'iana' },
    'application/vnd.infotech.project+xml': { source: 'iana', compressible: !0 },
    'application/vnd.innopath.wamp.notification': { source: 'iana' },
    'application/vnd.insors.igm': { source: 'iana', extensions: ['igm'] },
    'application/vnd.intercon.formnet': { source: 'iana', extensions: ['xpw', 'xpx'] },
    'application/vnd.intergeo': { source: 'iana', extensions: ['i2g'] },
    'application/vnd.intertrust.digibox': { source: 'iana' },
    'application/vnd.intertrust.nncp': { source: 'iana' },
    'application/vnd.intu.qbo': { source: 'iana', extensions: ['qbo'] },
    'application/vnd.intu.qfx': { source: 'iana', extensions: ['qfx'] },
    'application/vnd.iptc.g2.catalogitem+xml': { source: 'iana', compressible: !0 },
    'application/vnd.iptc.g2.conceptitem+xml': { source: 'iana', compressible: !0 },
    'application/vnd.iptc.g2.knowledgeitem+xml': { source: 'iana', compressible: !0 },
    'application/vnd.iptc.g2.newsitem+xml': { source: 'iana', compressible: !0 },
    'application/vnd.iptc.g2.newsmessage+xml': { source: 'iana', compressible: !0 },
    'application/vnd.iptc.g2.packageitem+xml': { source: 'iana', compressible: !0 },
    'application/vnd.iptc.g2.planningitem+xml': { source: 'iana', compressible: !0 },
    'application/vnd.ipunplugged.rcprofile': { source: 'iana', extensions: ['rcprofile'] },
    'application/vnd.irepository.package+xml': { source: 'iana', compressible: !0, extensions: ['irp'] },
    'application/vnd.is-xpr': { source: 'iana', extensions: ['xpr'] },
    'application/vnd.isac.fcs': { source: 'iana', extensions: ['fcs'] },
    'application/vnd.iso11783-10+zip': { source: 'iana', compressible: !1 },
    'application/vnd.jam': { source: 'iana', extensions: ['jam'] },
    'application/vnd.japannet-directory-service': { source: 'iana' },
    'application/vnd.japannet-jpnstore-wakeup': { source: 'iana' },
    'application/vnd.japannet-payment-wakeup': { source: 'iana' },
    'application/vnd.japannet-registration': { source: 'iana' },
    'application/vnd.japannet-registration-wakeup': { source: 'iana' },
    'application/vnd.japannet-setstore-wakeup': { source: 'iana' },
    'application/vnd.japannet-verification': { source: 'iana' },
    'application/vnd.japannet-verification-wakeup': { source: 'iana' },
    'application/vnd.jcp.javame.midlet-rms': { source: 'iana', extensions: ['rms'] },
    'application/vnd.jisp': { source: 'iana', extensions: ['jisp'] },
    'application/vnd.joost.joda-archive': { source: 'iana', extensions: ['joda'] },
    'application/vnd.jsk.isdn-ngn': { source: 'iana' },
    'application/vnd.kahootz': { source: 'iana', extensions: ['ktz', 'ktr'] },
    'application/vnd.kde.karbon': { source: 'iana', extensions: ['karbon'] },
    'application/vnd.kde.kchart': { source: 'iana', extensions: ['chrt'] },
    'application/vnd.kde.kformula': { source: 'iana', extensions: ['kfo'] },
    'application/vnd.kde.kivio': { source: 'iana', extensions: ['flw'] },
    'application/vnd.kde.kontour': { source: 'iana', extensions: ['kon'] },
    'application/vnd.kde.kpresenter': { source: 'iana', extensions: ['kpr', 'kpt'] },
    'application/vnd.kde.kspread': { source: 'iana', extensions: ['ksp'] },
    'application/vnd.kde.kword': { source: 'iana', extensions: ['kwd', 'kwt'] },
    'application/vnd.kenameaapp': { source: 'iana', extensions: ['htke'] },
    'application/vnd.kidspiration': { source: 'iana', extensions: ['kia'] },
    'application/vnd.kinar': { source: 'iana', extensions: ['kne', 'knp'] },
    'application/vnd.koan': { source: 'iana', extensions: ['skp', 'skd', 'skt', 'skm'] },
    'application/vnd.kodak-descriptor': { source: 'iana', extensions: ['sse'] },
    'application/vnd.las': { source: 'iana' },
    'application/vnd.las.las+json': { source: 'iana', compressible: !0 },
    'application/vnd.las.las+xml': { source: 'iana', compressible: !0, extensions: ['lasxml'] },
    'application/vnd.laszip': { source: 'iana' },
    'application/vnd.leap+json': { source: 'iana', compressible: !0 },
    'application/vnd.liberty-request+xml': { source: 'iana', compressible: !0 },
    'application/vnd.llamagraphics.life-balance.desktop': { source: 'iana', extensions: ['lbd'] },
    'application/vnd.llamagraphics.life-balance.exchange+xml': {
      source: 'iana',
      compressible: !0,
      extensions: ['lbe'],
    },
    'application/vnd.logipipe.circuit+zip': { source: 'iana', compressible: !1 },
    'application/vnd.loom': { source: 'iana' },
    'application/vnd.lotus-1-2-3': { source: 'iana', extensions: ['123'] },
    'application/vnd.lotus-approach': { source: 'iana', extensions: ['apr'] },
    'application/vnd.lotus-freelance': { source: 'iana', extensions: ['pre'] },
    'application/vnd.lotus-notes': { source: 'iana', extensions: ['nsf'] },
    'application/vnd.lotus-organizer': { source: 'iana', extensions: ['org'] },
    'application/vnd.lotus-screencam': { source: 'iana', extensions: ['scm'] },
    'application/vnd.lotus-wordpro': { source: 'iana', extensions: ['lwp'] },
    'application/vnd.macports.portpkg': { source: 'iana', extensions: ['portpkg'] },
    'application/vnd.mapbox-vector-tile': { source: 'iana', extensions: ['mvt'] },
    'application/vnd.marlin.drm.actiontoken+xml': { source: 'iana', compressible: !0 },
    'application/vnd.marlin.drm.conftoken+xml': { source: 'iana', compressible: !0 },
    'application/vnd.marlin.drm.license+xml': { source: 'iana', compressible: !0 },
    'application/vnd.marlin.drm.mdcf': { source: 'iana' },
    'application/vnd.mason+json': { source: 'iana', compressible: !0 },
    'application/vnd.maxar.archive.3tz+zip': { source: 'iana', compressible: !1 },
    'application/vnd.maxmind.maxmind-db': { source: 'iana' },
    'application/vnd.mcd': { source: 'iana', extensions: ['mcd'] },
    'application/vnd.medcalcdata': { source: 'iana', extensions: ['mc1'] },
    'application/vnd.mediastation.cdkey': { source: 'iana', extensions: ['cdkey'] },
    'application/vnd.meridian-slingshot': { source: 'iana' },
    'application/vnd.mfer': { source: 'iana', extensions: ['mwf'] },
    'application/vnd.mfmp': { source: 'iana', extensions: ['mfm'] },
    'application/vnd.micro+json': { source: 'iana', compressible: !0 },
    'application/vnd.micrografx.flo': { source: 'iana', extensions: ['flo'] },
    'application/vnd.micrografx.igx': { source: 'iana', extensions: ['igx'] },
    'application/vnd.microsoft.portable-executable': { source: 'iana' },
    'application/vnd.microsoft.windows.thumbnail-cache': { source: 'iana' },
    'application/vnd.miele+json': { source: 'iana', compressible: !0 },
    'application/vnd.mif': { source: 'iana', extensions: ['mif'] },
    'application/vnd.minisoft-hp3000-save': { source: 'iana' },
    'application/vnd.mitsubishi.misty-guard.trustweb': { source: 'iana' },
    'application/vnd.mobius.daf': { source: 'iana', extensions: ['daf'] },
    'application/vnd.mobius.dis': { source: 'iana', extensions: ['dis'] },
    'application/vnd.mobius.mbk': { source: 'iana', extensions: ['mbk'] },
    'application/vnd.mobius.mqy': { source: 'iana', extensions: ['mqy'] },
    'application/vnd.mobius.msl': { source: 'iana', extensions: ['msl'] },
    'application/vnd.mobius.plc': { source: 'iana', extensions: ['plc'] },
    'application/vnd.mobius.txf': { source: 'iana', extensions: ['txf'] },
    'application/vnd.mophun.application': { source: 'iana', extensions: ['mpn'] },
    'application/vnd.mophun.certificate': { source: 'iana', extensions: ['mpc'] },
    'application/vnd.motorola.flexsuite': { source: 'iana' },
    'application/vnd.motorola.flexsuite.adsi': { source: 'iana' },
    'application/vnd.motorola.flexsuite.fis': { source: 'iana' },
    'application/vnd.motorola.flexsuite.gotap': { source: 'iana' },
    'application/vnd.motorola.flexsuite.kmr': { source: 'iana' },
    'application/vnd.motorola.flexsuite.ttc': { source: 'iana' },
    'application/vnd.motorola.flexsuite.wem': { source: 'iana' },
    'application/vnd.motorola.iprm': { source: 'iana' },
    'application/vnd.mozilla.xul+xml': { source: 'iana', compressible: !0, extensions: ['xul'] },
    'application/vnd.ms-3mfdocument': { source: 'iana' },
    'application/vnd.ms-artgalry': { source: 'iana', extensions: ['cil'] },
    'application/vnd.ms-asf': { source: 'iana' },
    'application/vnd.ms-cab-compressed': { source: 'iana', extensions: ['cab'] },
    'application/vnd.ms-color.iccprofile': { source: 'apache' },
    'application/vnd.ms-excel': {
      source: 'iana',
      compressible: !1,
      extensions: ['xls', 'xlm', 'xla', 'xlc', 'xlt', 'xlw'],
    },
    'application/vnd.ms-excel.addin.macroenabled.12': { source: 'iana', extensions: ['xlam'] },
    'application/vnd.ms-excel.sheet.binary.macroenabled.12': { source: 'iana', extensions: ['xlsb'] },
    'application/vnd.ms-excel.sheet.macroenabled.12': { source: 'iana', extensions: ['xlsm'] },
    'application/vnd.ms-excel.template.macroenabled.12': { source: 'iana', extensions: ['xltm'] },
    'application/vnd.ms-fontobject': { source: 'iana', compressible: !0, extensions: ['eot'] },
    'application/vnd.ms-htmlhelp': { source: 'iana', extensions: ['chm'] },
    'application/vnd.ms-ims': { source: 'iana', extensions: ['ims'] },
    'application/vnd.ms-lrm': { source: 'iana', extensions: ['lrm'] },
    'application/vnd.ms-office.activex+xml': { source: 'iana', compressible: !0 },
    'application/vnd.ms-officetheme': { source: 'iana', extensions: ['thmx'] },
    'application/vnd.ms-opentype': { source: 'apache', compressible: !0 },
    'application/vnd.ms-outlook': { compressible: !1, extensions: ['msg'] },
    'application/vnd.ms-package.obfuscated-opentype': { source: 'apache' },
    'application/vnd.ms-pki.seccat': { source: 'apache', extensions: ['cat'] },
    'application/vnd.ms-pki.stl': { source: 'apache', extensions: ['stl'] },
    'application/vnd.ms-playready.initiator+xml': { source: 'iana', compressible: !0 },
    'application/vnd.ms-powerpoint': { source: 'iana', compressible: !1, extensions: ['ppt', 'pps', 'pot'] },
    'application/vnd.ms-powerpoint.addin.macroenabled.12': { source: 'iana', extensions: ['ppam'] },
    'application/vnd.ms-powerpoint.presentation.macroenabled.12': { source: 'iana', extensions: ['pptm'] },
    'application/vnd.ms-powerpoint.slide.macroenabled.12': { source: 'iana', extensions: ['sldm'] },
    'application/vnd.ms-powerpoint.slideshow.macroenabled.12': { source: 'iana', extensions: ['ppsm'] },
    'application/vnd.ms-powerpoint.template.macroenabled.12': { source: 'iana', extensions: ['potm'] },
    'application/vnd.ms-printdevicecapabilities+xml': { source: 'iana', compressible: !0 },
    'application/vnd.ms-printing.printticket+xml': { source: 'apache', compressible: !0 },
    'application/vnd.ms-printschematicket+xml': { source: 'iana', compressible: !0 },
    'application/vnd.ms-project': { source: 'iana', extensions: ['mpp', 'mpt'] },
    'application/vnd.ms-tnef': { source: 'iana' },
    'application/vnd.ms-windows.devicepairing': { source: 'iana' },
    'application/vnd.ms-windows.nwprinting.oob': { source: 'iana' },
    'application/vnd.ms-windows.printerpairing': { source: 'iana' },
    'application/vnd.ms-windows.wsd.oob': { source: 'iana' },
    'application/vnd.ms-wmdrm.lic-chlg-req': { source: 'iana' },
    'application/vnd.ms-wmdrm.lic-resp': { source: 'iana' },
    'application/vnd.ms-wmdrm.meter-chlg-req': { source: 'iana' },
    'application/vnd.ms-wmdrm.meter-resp': { source: 'iana' },
    'application/vnd.ms-word.document.macroenabled.12': { source: 'iana', extensions: ['docm'] },
    'application/vnd.ms-word.template.macroenabled.12': { source: 'iana', extensions: ['dotm'] },
    'application/vnd.ms-works': { source: 'iana', extensions: ['wps', 'wks', 'wcm', 'wdb'] },
    'application/vnd.ms-wpl': { source: 'iana', extensions: ['wpl'] },
    'application/vnd.ms-xpsdocument': { source: 'iana', compressible: !1, extensions: ['xps'] },
    'application/vnd.msa-disk-image': { source: 'iana' },
    'application/vnd.mseq': { source: 'iana', extensions: ['mseq'] },
    'application/vnd.msign': { source: 'iana' },
    'application/vnd.multiad.creator': { source: 'iana' },
    'application/vnd.multiad.creator.cif': { source: 'iana' },
    'application/vnd.music-niff': { source: 'iana' },
    'application/vnd.musician': { source: 'iana', extensions: ['mus'] },
    'application/vnd.muvee.style': { source: 'iana', extensions: ['msty'] },
    'application/vnd.mynfc': { source: 'iana', extensions: ['taglet'] },
    'application/vnd.nacamar.ybrid+json': { source: 'iana', compressible: !0 },
    'application/vnd.ncd.control': { source: 'iana' },
    'application/vnd.ncd.reference': { source: 'iana' },
    'application/vnd.nearst.inv+json': { source: 'iana', compressible: !0 },
    'application/vnd.nebumind.line': { source: 'iana' },
    'application/vnd.nervana': { source: 'iana' },
    'application/vnd.netfpx': { source: 'iana' },
    'application/vnd.neurolanguage.nlu': { source: 'iana', extensions: ['nlu'] },
    'application/vnd.nimn': { source: 'iana' },
    'application/vnd.nintendo.nitro.rom': { source: 'iana' },
    'application/vnd.nintendo.snes.rom': { source: 'iana' },
    'application/vnd.nitf': { source: 'iana', extensions: ['ntf', 'nitf'] },
    'application/vnd.noblenet-directory': { source: 'iana', extensions: ['nnd'] },
    'application/vnd.noblenet-sealer': { source: 'iana', extensions: ['nns'] },
    'application/vnd.noblenet-web': { source: 'iana', extensions: ['nnw'] },
    'application/vnd.nokia.catalogs': { source: 'iana' },
    'application/vnd.nokia.conml+wbxml': { source: 'iana' },
    'application/vnd.nokia.conml+xml': { source: 'iana', compressible: !0 },
    'application/vnd.nokia.iptv.config+xml': { source: 'iana', compressible: !0 },
    'application/vnd.nokia.isds-radio-presets': { source: 'iana' },
    'application/vnd.nokia.landmark+wbxml': { source: 'iana' },
    'application/vnd.nokia.landmark+xml': { source: 'iana', compressible: !0 },
    'application/vnd.nokia.landmarkcollection+xml': { source: 'iana', compressible: !0 },
    'application/vnd.nokia.n-gage.ac+xml': { source: 'iana', compressible: !0, extensions: ['ac'] },
    'application/vnd.nokia.n-gage.data': { source: 'iana', extensions: ['ngdat'] },
    'application/vnd.nokia.n-gage.symbian.install': { source: 'iana', extensions: ['n-gage'] },
    'application/vnd.nokia.ncd': { source: 'iana' },
    'application/vnd.nokia.pcd+wbxml': { source: 'iana' },
    'application/vnd.nokia.pcd+xml': { source: 'iana', compressible: !0 },
    'application/vnd.nokia.radio-preset': { source: 'iana', extensions: ['rpst'] },
    'application/vnd.nokia.radio-presets': { source: 'iana', extensions: ['rpss'] },
    'application/vnd.novadigm.edm': { source: 'iana', extensions: ['edm'] },
    'application/vnd.novadigm.edx': { source: 'iana', extensions: ['edx'] },
    'application/vnd.novadigm.ext': { source: 'iana', extensions: ['ext'] },
    'application/vnd.ntt-local.content-share': { source: 'iana' },
    'application/vnd.ntt-local.file-transfer': { source: 'iana' },
    'application/vnd.ntt-local.ogw_remote-access': { source: 'iana' },
    'application/vnd.ntt-local.sip-ta_remote': { source: 'iana' },
    'application/vnd.ntt-local.sip-ta_tcp_stream': { source: 'iana' },
    'application/vnd.oasis.opendocument.chart': { source: 'iana', extensions: ['odc'] },
    'application/vnd.oasis.opendocument.chart-template': { source: 'iana', extensions: ['otc'] },
    'application/vnd.oasis.opendocument.database': { source: 'iana', extensions: ['odb'] },
    'application/vnd.oasis.opendocument.formula': { source: 'iana', extensions: ['odf'] },
    'application/vnd.oasis.opendocument.formula-template': { source: 'iana', extensions: ['odft'] },
    'application/vnd.oasis.opendocument.graphics': { source: 'iana', compressible: !1, extensions: ['odg'] },
    'application/vnd.oasis.opendocument.graphics-template': { source: 'iana', extensions: ['otg'] },
    'application/vnd.oasis.opendocument.image': { source: 'iana', extensions: ['odi'] },
    'application/vnd.oasis.opendocument.image-template': { source: 'iana', extensions: ['oti'] },
    'application/vnd.oasis.opendocument.presentation': { source: 'iana', compressible: !1, extensions: ['odp'] },
    'application/vnd.oasis.opendocument.presentation-template': { source: 'iana', extensions: ['otp'] },
    'application/vnd.oasis.opendocument.spreadsheet': { source: 'iana', compressible: !1, extensions: ['ods'] },
    'application/vnd.oasis.opendocument.spreadsheet-template': { source: 'iana', extensions: ['ots'] },
    'application/vnd.oasis.opendocument.text': { source: 'iana', compressible: !1, extensions: ['odt'] },
    'application/vnd.oasis.opendocument.text-master': { source: 'iana', extensions: ['odm'] },
    'application/vnd.oasis.opendocument.text-template': { source: 'iana', extensions: ['ott'] },
    'application/vnd.oasis.opendocument.text-web': { source: 'iana', extensions: ['oth'] },
    'application/vnd.obn': { source: 'iana' },
    'application/vnd.ocf+cbor': { source: 'iana' },
    'application/vnd.oci.image.manifest.v1+json': { source: 'iana', compressible: !0 },
    'application/vnd.oftn.l10n+json': { source: 'iana', compressible: !0 },
    'application/vnd.oipf.contentaccessdownload+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oipf.contentaccessstreaming+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oipf.cspg-hexbinary': { source: 'iana' },
    'application/vnd.oipf.dae.svg+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oipf.dae.xhtml+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oipf.mippvcontrolmessage+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oipf.pae.gem': { source: 'iana' },
    'application/vnd.oipf.spdiscovery+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oipf.spdlist+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oipf.ueprofile+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oipf.userprofile+xml': { source: 'iana', compressible: !0 },
    'application/vnd.olpc-sugar': { source: 'iana', extensions: ['xo'] },
    'application/vnd.oma-scws-config': { source: 'iana' },
    'application/vnd.oma-scws-http-request': { source: 'iana' },
    'application/vnd.oma-scws-http-response': { source: 'iana' },
    'application/vnd.oma.bcast.associated-procedure-parameter+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.bcast.drm-trigger+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.bcast.imd+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.bcast.ltkm': { source: 'iana' },
    'application/vnd.oma.bcast.notification+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.bcast.provisioningtrigger': { source: 'iana' },
    'application/vnd.oma.bcast.sgboot': { source: 'iana' },
    'application/vnd.oma.bcast.sgdd+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.bcast.sgdu': { source: 'iana' },
    'application/vnd.oma.bcast.simple-symbol-container': { source: 'iana' },
    'application/vnd.oma.bcast.smartcard-trigger+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.bcast.sprov+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.bcast.stkm': { source: 'iana' },
    'application/vnd.oma.cab-address-book+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.cab-feature-handler+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.cab-pcc+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.cab-subs-invite+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.cab-user-prefs+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.dcd': { source: 'iana' },
    'application/vnd.oma.dcdc': { source: 'iana' },
    'application/vnd.oma.dd2+xml': { source: 'iana', compressible: !0, extensions: ['dd2'] },
    'application/vnd.oma.drm.risd+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.group-usage-list+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.lwm2m+cbor': { source: 'iana' },
    'application/vnd.oma.lwm2m+json': { source: 'iana', compressible: !0 },
    'application/vnd.oma.lwm2m+tlv': { source: 'iana' },
    'application/vnd.oma.pal+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.poc.detailed-progress-report+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.poc.final-report+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.poc.groups+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.poc.invocation-descriptor+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.poc.optimized-progress-report+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.push': { source: 'iana' },
    'application/vnd.oma.scidm.messages+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oma.xcap-directory+xml': { source: 'iana', compressible: !0 },
    'application/vnd.omads-email+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/vnd.omads-file+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/vnd.omads-folder+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/vnd.omaloc-supl-init': { source: 'iana' },
    'application/vnd.onepager': { source: 'iana' },
    'application/vnd.onepagertamp': { source: 'iana' },
    'application/vnd.onepagertamx': { source: 'iana' },
    'application/vnd.onepagertat': { source: 'iana' },
    'application/vnd.onepagertatp': { source: 'iana' },
    'application/vnd.onepagertatx': { source: 'iana' },
    'application/vnd.openblox.game+xml': { source: 'iana', compressible: !0, extensions: ['obgx'] },
    'application/vnd.openblox.game-binary': { source: 'iana' },
    'application/vnd.openeye.oeb': { source: 'iana' },
    'application/vnd.openofficeorg.extension': { source: 'apache', extensions: ['oxt'] },
    'application/vnd.openstreetmap.data+xml': { source: 'iana', compressible: !0, extensions: ['osm'] },
    'application/vnd.opentimestamps.ots': { source: 'iana' },
    'application/vnd.openxmlformats-officedocument.custom-properties+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.customxmlproperties+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.drawing+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.drawingml.chart+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.extended-properties+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.presentationml.comments+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
      source: 'iana',
      compressible: !1,
      extensions: ['pptx'],
    },
    'application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.presentationml.presprops+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.presentationml.slide': { source: 'iana', extensions: ['sldx'] },
    'application/vnd.openxmlformats-officedocument.presentationml.slide+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow': { source: 'iana', extensions: ['ppsx'] },
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.presentationml.tags+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.presentationml.template': { source: 'iana', extensions: ['potx'] },
    'application/vnd.openxmlformats-officedocument.presentationml.template.main+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      source: 'iana',
      compressible: !1,
      extensions: ['xlsx'],
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template': { source: 'iana', extensions: ['xltx'] },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.theme+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.themeoverride+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.vmldrawing': { source: 'iana' },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      source: 'iana',
      compressible: !1,
      extensions: ['docx'],
    },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template': { source: 'iana', extensions: ['dotx'] },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml': {
      source: 'iana',
      compressible: !0,
    },
    'application/vnd.openxmlformats-package.core-properties+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml': { source: 'iana', compressible: !0 },
    'application/vnd.openxmlformats-package.relationships+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oracle.resource+json': { source: 'iana', compressible: !0 },
    'application/vnd.orange.indata': { source: 'iana' },
    'application/vnd.osa.netdeploy': { source: 'iana' },
    'application/vnd.osgeo.mapguide.package': { source: 'iana', extensions: ['mgp'] },
    'application/vnd.osgi.bundle': { source: 'iana' },
    'application/vnd.osgi.dp': { source: 'iana', extensions: ['dp'] },
    'application/vnd.osgi.subsystem': { source: 'iana', extensions: ['esa'] },
    'application/vnd.otps.ct-kip+xml': { source: 'iana', compressible: !0 },
    'application/vnd.oxli.countgraph': { source: 'iana' },
    'application/vnd.pagerduty+json': { source: 'iana', compressible: !0 },
    'application/vnd.palm': { source: 'iana', extensions: ['pdb', 'pqa', 'oprc'] },
    'application/vnd.panoply': { source: 'iana' },
    'application/vnd.paos.xml': { source: 'iana' },
    'application/vnd.patentdive': { source: 'iana' },
    'application/vnd.patientecommsdoc': { source: 'iana' },
    'application/vnd.pawaafile': { source: 'iana', extensions: ['paw'] },
    'application/vnd.pcos': { source: 'iana' },
    'application/vnd.pg.format': { source: 'iana', extensions: ['str'] },
    'application/vnd.pg.osasli': { source: 'iana', extensions: ['ei6'] },
    'application/vnd.piaccess.application-licence': { source: 'iana' },
    'application/vnd.picsel': { source: 'iana', extensions: ['efif'] },
    'application/vnd.pmi.widget': { source: 'iana', extensions: ['wg'] },
    'application/vnd.poc.group-advertisement+xml': { source: 'iana', compressible: !0 },
    'application/vnd.pocketlearn': { source: 'iana', extensions: ['plf'] },
    'application/vnd.powerbuilder6': { source: 'iana', extensions: ['pbd'] },
    'application/vnd.powerbuilder6-s': { source: 'iana' },
    'application/vnd.powerbuilder7': { source: 'iana' },
    'application/vnd.powerbuilder7-s': { source: 'iana' },
    'application/vnd.powerbuilder75': { source: 'iana' },
    'application/vnd.powerbuilder75-s': { source: 'iana' },
    'application/vnd.preminet': { source: 'iana' },
    'application/vnd.previewsystems.box': { source: 'iana', extensions: ['box'] },
    'application/vnd.proteus.magazine': { source: 'iana', extensions: ['mgz'] },
    'application/vnd.psfs': { source: 'iana' },
    'application/vnd.publishare-delta-tree': { source: 'iana', extensions: ['qps'] },
    'application/vnd.pvi.ptid1': { source: 'iana', extensions: ['ptid'] },
    'application/vnd.pwg-multiplexed': { source: 'iana' },
    'application/vnd.pwg-xhtml-print+xml': { source: 'iana', compressible: !0 },
    'application/vnd.qualcomm.brew-app-res': { source: 'iana' },
    'application/vnd.quarantainenet': { source: 'iana' },
    'application/vnd.quark.quarkxpress': { source: 'iana', extensions: ['qxd', 'qxt', 'qwd', 'qwt', 'qxl', 'qxb'] },
    'application/vnd.quobject-quoxdocument': { source: 'iana' },
    'application/vnd.radisys.moml+xml': { source: 'iana', compressible: !0 },
    'application/vnd.radisys.msml+xml': { source: 'iana', compressible: !0 },
    'application/vnd.radisys.msml-audit+xml': { source: 'iana', compressible: !0 },
    'application/vnd.radisys.msml-audit-conf+xml': { source: 'iana', compressible: !0 },
    'application/vnd.radisys.msml-audit-conn+xml': { source: 'iana', compressible: !0 },
    'application/vnd.radisys.msml-audit-dialog+xml': { source: 'iana', compressible: !0 },
    'application/vnd.radisys.msml-audit-stream+xml': { source: 'iana', compressible: !0 },
    'application/vnd.radisys.msml-conf+xml': { source: 'iana', compressible: !0 },
    'application/vnd.radisys.msml-dialog+xml': { source: 'iana', compressible: !0 },
    'application/vnd.radisys.msml-dialog-base+xml': { source: 'iana', compressible: !0 },
    'application/vnd.radisys.msml-dialog-fax-detect+xml': { source: 'iana', compressible: !0 },
    'application/vnd.radisys.msml-dialog-fax-sendrecv+xml': { source: 'iana', compressible: !0 },
    'application/vnd.radisys.msml-dialog-group+xml': { source: 'iana', compressible: !0 },
    'application/vnd.radisys.msml-dialog-speech+xml': { source: 'iana', compressible: !0 },
    'application/vnd.radisys.msml-dialog-transform+xml': { source: 'iana', compressible: !0 },
    'application/vnd.rainstor.data': { source: 'iana' },
    'application/vnd.rapid': { source: 'iana' },
    'application/vnd.rar': { source: 'iana', extensions: ['rar'] },
    'application/vnd.realvnc.bed': { source: 'iana', extensions: ['bed'] },
    'application/vnd.recordare.musicxml': { source: 'iana', extensions: ['mxl'] },
    'application/vnd.recordare.musicxml+xml': { source: 'iana', compressible: !0, extensions: ['musicxml'] },
    'application/vnd.renlearn.rlprint': { source: 'iana' },
    'application/vnd.resilient.logic': { source: 'iana' },
    'application/vnd.restful+json': { source: 'iana', compressible: !0 },
    'application/vnd.rig.cryptonote': { source: 'iana', extensions: ['cryptonote'] },
    'application/vnd.rim.cod': { source: 'apache', extensions: ['cod'] },
    'application/vnd.rn-realmedia': { source: 'apache', extensions: ['rm'] },
    'application/vnd.rn-realmedia-vbr': { source: 'apache', extensions: ['rmvb'] },
    'application/vnd.route66.link66+xml': { source: 'iana', compressible: !0, extensions: ['link66'] },
    'application/vnd.rs-274x': { source: 'iana' },
    'application/vnd.ruckus.download': { source: 'iana' },
    'application/vnd.s3sms': { source: 'iana' },
    'application/vnd.sailingtracker.track': { source: 'iana', extensions: ['st'] },
    'application/vnd.sar': { source: 'iana' },
    'application/vnd.sbm.cid': { source: 'iana' },
    'application/vnd.sbm.mid2': { source: 'iana' },
    'application/vnd.scribus': { source: 'iana' },
    'application/vnd.sealed.3df': { source: 'iana' },
    'application/vnd.sealed.csf': { source: 'iana' },
    'application/vnd.sealed.doc': { source: 'iana' },
    'application/vnd.sealed.eml': { source: 'iana' },
    'application/vnd.sealed.mht': { source: 'iana' },
    'application/vnd.sealed.net': { source: 'iana' },
    'application/vnd.sealed.ppt': { source: 'iana' },
    'application/vnd.sealed.tiff': { source: 'iana' },
    'application/vnd.sealed.xls': { source: 'iana' },
    'application/vnd.sealedmedia.softseal.html': { source: 'iana' },
    'application/vnd.sealedmedia.softseal.pdf': { source: 'iana' },
    'application/vnd.seemail': { source: 'iana', extensions: ['see'] },
    'application/vnd.seis+json': { source: 'iana', compressible: !0 },
    'application/vnd.sema': { source: 'iana', extensions: ['sema'] },
    'application/vnd.semd': { source: 'iana', extensions: ['semd'] },
    'application/vnd.semf': { source: 'iana', extensions: ['semf'] },
    'application/vnd.shade-save-file': { source: 'iana' },
    'application/vnd.shana.informed.formdata': { source: 'iana', extensions: ['ifm'] },
    'application/vnd.shana.informed.formtemplate': { source: 'iana', extensions: ['itp'] },
    'application/vnd.shana.informed.interchange': { source: 'iana', extensions: ['iif'] },
    'application/vnd.shana.informed.package': { source: 'iana', extensions: ['ipk'] },
    'application/vnd.shootproof+json': { source: 'iana', compressible: !0 },
    'application/vnd.shopkick+json': { source: 'iana', compressible: !0 },
    'application/vnd.shp': { source: 'iana' },
    'application/vnd.shx': { source: 'iana' },
    'application/vnd.sigrok.session': { source: 'iana' },
    'application/vnd.simtech-mindmapper': { source: 'iana', extensions: ['twd', 'twds'] },
    'application/vnd.siren+json': { source: 'iana', compressible: !0 },
    'application/vnd.smaf': { source: 'iana', extensions: ['mmf'] },
    'application/vnd.smart.notebook': { source: 'iana' },
    'application/vnd.smart.teacher': { source: 'iana', extensions: ['teacher'] },
    'application/vnd.snesdev-page-table': { source: 'iana' },
    'application/vnd.software602.filler.form+xml': { source: 'iana', compressible: !0, extensions: ['fo'] },
    'application/vnd.software602.filler.form-xml-zip': { source: 'iana' },
    'application/vnd.solent.sdkm+xml': { source: 'iana', compressible: !0, extensions: ['sdkm', 'sdkd'] },
    'application/vnd.spotfire.dxp': { source: 'iana', extensions: ['dxp'] },
    'application/vnd.spotfire.sfs': { source: 'iana', extensions: ['sfs'] },
    'application/vnd.sqlite3': { source: 'iana' },
    'application/vnd.sss-cod': { source: 'iana' },
    'application/vnd.sss-dtf': { source: 'iana' },
    'application/vnd.sss-ntf': { source: 'iana' },
    'application/vnd.stardivision.calc': { source: 'apache', extensions: ['sdc'] },
    'application/vnd.stardivision.draw': { source: 'apache', extensions: ['sda'] },
    'application/vnd.stardivision.impress': { source: 'apache', extensions: ['sdd'] },
    'application/vnd.stardivision.math': { source: 'apache', extensions: ['smf'] },
    'application/vnd.stardivision.writer': { source: 'apache', extensions: ['sdw', 'vor'] },
    'application/vnd.stardivision.writer-global': { source: 'apache', extensions: ['sgl'] },
    'application/vnd.stepmania.package': { source: 'iana', extensions: ['smzip'] },
    'application/vnd.stepmania.stepchart': { source: 'iana', extensions: ['sm'] },
    'application/vnd.street-stream': { source: 'iana' },
    'application/vnd.sun.wadl+xml': { source: 'iana', compressible: !0, extensions: ['wadl'] },
    'application/vnd.sun.xml.calc': { source: 'apache', extensions: ['sxc'] },
    'application/vnd.sun.xml.calc.template': { source: 'apache', extensions: ['stc'] },
    'application/vnd.sun.xml.draw': { source: 'apache', extensions: ['sxd'] },
    'application/vnd.sun.xml.draw.template': { source: 'apache', extensions: ['std'] },
    'application/vnd.sun.xml.impress': { source: 'apache', extensions: ['sxi'] },
    'application/vnd.sun.xml.impress.template': { source: 'apache', extensions: ['sti'] },
    'application/vnd.sun.xml.math': { source: 'apache', extensions: ['sxm'] },
    'application/vnd.sun.xml.writer': { source: 'apache', extensions: ['sxw'] },
    'application/vnd.sun.xml.writer.global': { source: 'apache', extensions: ['sxg'] },
    'application/vnd.sun.xml.writer.template': { source: 'apache', extensions: ['stw'] },
    'application/vnd.sus-calendar': { source: 'iana', extensions: ['sus', 'susp'] },
    'application/vnd.svd': { source: 'iana', extensions: ['svd'] },
    'application/vnd.swiftview-ics': { source: 'iana' },
    'application/vnd.sycle+xml': { source: 'iana', compressible: !0 },
    'application/vnd.syft+json': { source: 'iana', compressible: !0 },
    'application/vnd.symbian.install': { source: 'apache', extensions: ['sis', 'sisx'] },
    'application/vnd.syncml+xml': { source: 'iana', charset: 'UTF-8', compressible: !0, extensions: ['xsm'] },
    'application/vnd.syncml.dm+wbxml': { source: 'iana', charset: 'UTF-8', extensions: ['bdm'] },
    'application/vnd.syncml.dm+xml': { source: 'iana', charset: 'UTF-8', compressible: !0, extensions: ['xdm'] },
    'application/vnd.syncml.dm.notification': { source: 'iana' },
    'application/vnd.syncml.dmddf+wbxml': { source: 'iana' },
    'application/vnd.syncml.dmddf+xml': { source: 'iana', charset: 'UTF-8', compressible: !0, extensions: ['ddf'] },
    'application/vnd.syncml.dmtnds+wbxml': { source: 'iana' },
    'application/vnd.syncml.dmtnds+xml': { source: 'iana', charset: 'UTF-8', compressible: !0 },
    'application/vnd.syncml.ds.notification': { source: 'iana' },
    'application/vnd.tableschema+json': { source: 'iana', compressible: !0 },
    'application/vnd.tao.intent-module-archive': { source: 'iana', extensions: ['tao'] },
    'application/vnd.tcpdump.pcap': { source: 'iana', extensions: ['pcap', 'cap', 'dmp'] },
    'application/vnd.think-cell.ppttc+json': { source: 'iana', compressible: !0 },
    'application/vnd.tmd.mediaflex.api+xml': { source: 'iana', compressible: !0 },
    'application/vnd.tml': { source: 'iana' },
    'application/vnd.tmobile-livetv': { source: 'iana', extensions: ['tmo'] },
    'application/vnd.tri.onesource': { source: 'iana' },
    'application/vnd.trid.tpt': { source: 'iana', extensions: ['tpt'] },
    'application/vnd.triscape.mxs': { source: 'iana', extensions: ['mxs'] },
    'application/vnd.trueapp': { source: 'iana', extensions: ['tra'] },
    'application/vnd.truedoc': { source: 'iana' },
    'application/vnd.ubisoft.webplayer': { source: 'iana' },
    'application/vnd.ufdl': { source: 'iana', extensions: ['ufd', 'ufdl'] },
    'application/vnd.uiq.theme': { source: 'iana', extensions: ['utz'] },
    'application/vnd.umajin': { source: 'iana', extensions: ['umj'] },
    'application/vnd.unity': { source: 'iana', extensions: ['unityweb'] },
    'application/vnd.uoml+xml': { source: 'iana', compressible: !0, extensions: ['uoml'] },
    'application/vnd.uplanet.alert': { source: 'iana' },
    'application/vnd.uplanet.alert-wbxml': { source: 'iana' },
    'application/vnd.uplanet.bearer-choice': { source: 'iana' },
    'application/vnd.uplanet.bearer-choice-wbxml': { source: 'iana' },
    'application/vnd.uplanet.cacheop': { source: 'iana' },
    'application/vnd.uplanet.cacheop-wbxml': { source: 'iana' },
    'application/vnd.uplanet.channel': { source: 'iana' },
    'application/vnd.uplanet.channel-wbxml': { source: 'iana' },
    'application/vnd.uplanet.list': { source: 'iana' },
    'application/vnd.uplanet.list-wbxml': { source: 'iana' },
    'application/vnd.uplanet.listcmd': { source: 'iana' },
    'application/vnd.uplanet.listcmd-wbxml': { source: 'iana' },
    'application/vnd.uplanet.signal': { source: 'iana' },
    'application/vnd.uri-map': { source: 'iana' },
    'application/vnd.valve.source.material': { source: 'iana' },
    'application/vnd.vcx': { source: 'iana', extensions: ['vcx'] },
    'application/vnd.vd-study': { source: 'iana' },
    'application/vnd.vectorworks': { source: 'iana' },
    'application/vnd.vel+json': { source: 'iana', compressible: !0 },
    'application/vnd.verimatrix.vcas': { source: 'iana' },
    'application/vnd.veritone.aion+json': { source: 'iana', compressible: !0 },
    'application/vnd.veryant.thin': { source: 'iana' },
    'application/vnd.ves.encrypted': { source: 'iana' },
    'application/vnd.vidsoft.vidconference': { source: 'iana' },
    'application/vnd.visio': { source: 'iana', extensions: ['vsd', 'vst', 'vss', 'vsw'] },
    'application/vnd.visionary': { source: 'iana', extensions: ['vis'] },
    'application/vnd.vividence.scriptfile': { source: 'iana' },
    'application/vnd.vsf': { source: 'iana', extensions: ['vsf'] },
    'application/vnd.wap.sic': { source: 'iana' },
    'application/vnd.wap.slc': { source: 'iana' },
    'application/vnd.wap.wbxml': { source: 'iana', charset: 'UTF-8', extensions: ['wbxml'] },
    'application/vnd.wap.wmlc': { source: 'iana', extensions: ['wmlc'] },
    'application/vnd.wap.wmlscriptc': { source: 'iana', extensions: ['wmlsc'] },
    'application/vnd.webturbo': { source: 'iana', extensions: ['wtb'] },
    'application/vnd.wfa.dpp': { source: 'iana' },
    'application/vnd.wfa.p2p': { source: 'iana' },
    'application/vnd.wfa.wsc': { source: 'iana' },
    'application/vnd.windows.devicepairing': { source: 'iana' },
    'application/vnd.wmc': { source: 'iana' },
    'application/vnd.wmf.bootstrap': { source: 'iana' },
    'application/vnd.wolfram.mathematica': { source: 'iana' },
    'application/vnd.wolfram.mathematica.package': { source: 'iana' },
    'application/vnd.wolfram.player': { source: 'iana', extensions: ['nbp'] },
    'application/vnd.wordperfect': { source: 'iana', extensions: ['wpd'] },
    'application/vnd.wqd': { source: 'iana', extensions: ['wqd'] },
    'application/vnd.wrq-hp3000-labelled': { source: 'iana' },
    'application/vnd.wt.stf': { source: 'iana', extensions: ['stf'] },
    'application/vnd.wv.csp+wbxml': { source: 'iana' },
    'application/vnd.wv.csp+xml': { source: 'iana', compressible: !0 },
    'application/vnd.wv.ssp+xml': { source: 'iana', compressible: !0 },
    'application/vnd.xacml+json': { source: 'iana', compressible: !0 },
    'application/vnd.xara': { source: 'iana', extensions: ['xar'] },
    'application/vnd.xfdl': { source: 'iana', extensions: ['xfdl'] },
    'application/vnd.xfdl.webform': { source: 'iana' },
    'application/vnd.xmi+xml': { source: 'iana', compressible: !0 },
    'application/vnd.xmpie.cpkg': { source: 'iana' },
    'application/vnd.xmpie.dpkg': { source: 'iana' },
    'application/vnd.xmpie.plan': { source: 'iana' },
    'application/vnd.xmpie.ppkg': { source: 'iana' },
    'application/vnd.xmpie.xlim': { source: 'iana' },
    'application/vnd.yamaha.hv-dic': { source: 'iana', extensions: ['hvd'] },
    'application/vnd.yamaha.hv-script': { source: 'iana', extensions: ['hvs'] },
    'application/vnd.yamaha.hv-voice': { source: 'iana', extensions: ['hvp'] },
    'application/vnd.yamaha.openscoreformat': { source: 'iana', extensions: ['osf'] },
    'application/vnd.yamaha.openscoreformat.osfpvg+xml': { source: 'iana', compressible: !0, extensions: ['osfpvg'] },
    'application/vnd.yamaha.remote-setup': { source: 'iana' },
    'application/vnd.yamaha.smaf-audio': { source: 'iana', extensions: ['saf'] },
    'application/vnd.yamaha.smaf-phrase': { source: 'iana', extensions: ['spf'] },
    'application/vnd.yamaha.through-ngn': { source: 'iana' },
    'application/vnd.yamaha.tunnel-udpencap': { source: 'iana' },
    'application/vnd.yaoweme': { source: 'iana' },
    'application/vnd.yellowriver-custom-menu': { source: 'iana', extensions: ['cmp'] },
    'application/vnd.youtube.yt': { source: 'iana' },
    'application/vnd.zul': { source: 'iana', extensions: ['zir', 'zirz'] },
    'application/vnd.zzazz.deck+xml': { source: 'iana', compressible: !0, extensions: ['zaz'] },
    'application/voicexml+xml': { source: 'iana', compressible: !0, extensions: ['vxml'] },
    'application/voucher-cms+json': { source: 'iana', compressible: !0 },
    'application/vq-rtcpxr': { source: 'iana' },
    'application/wasm': { source: 'iana', compressible: !0, extensions: ['wasm'] },
    'application/watcherinfo+xml': { source: 'iana', compressible: !0, extensions: ['wif'] },
    'application/webpush-options+json': { source: 'iana', compressible: !0 },
    'application/whoispp-query': { source: 'iana' },
    'application/whoispp-response': { source: 'iana' },
    'application/widget': { source: 'iana', extensions: ['wgt'] },
    'application/winhlp': { source: 'apache', extensions: ['hlp'] },
    'application/wita': { source: 'iana' },
    'application/wordperfect5.1': { source: 'iana' },
    'application/wsdl+xml': { source: 'iana', compressible: !0, extensions: ['wsdl'] },
    'application/wspolicy+xml': { source: 'iana', compressible: !0, extensions: ['wspolicy'] },
    'application/x-7z-compressed': { source: 'apache', compressible: !1, extensions: ['7z'] },
    'application/x-abiword': { source: 'apache', extensions: ['abw'] },
    'application/x-ace-compressed': { source: 'apache', extensions: ['ace'] },
    'application/x-amf': { source: 'apache' },
    'application/x-apple-diskimage': { source: 'apache', extensions: ['dmg'] },
    'application/x-arj': { compressible: !1, extensions: ['arj'] },
    'application/x-authorware-bin': { source: 'apache', extensions: ['aab', 'x32', 'u32', 'vox'] },
    'application/x-authorware-map': { source: 'apache', extensions: ['aam'] },
    'application/x-authorware-seg': { source: 'apache', extensions: ['aas'] },
    'application/x-bcpio': { source: 'apache', extensions: ['bcpio'] },
    'application/x-bdoc': { compressible: !1, extensions: ['bdoc'] },
    'application/x-bittorrent': { source: 'apache', extensions: ['torrent'] },
    'application/x-blorb': { source: 'apache', extensions: ['blb', 'blorb'] },
    'application/x-bzip': { source: 'apache', compressible: !1, extensions: ['bz'] },
    'application/x-bzip2': { source: 'apache', compressible: !1, extensions: ['bz2', 'boz'] },
    'application/x-cbr': { source: 'apache', extensions: ['cbr', 'cba', 'cbt', 'cbz', 'cb7'] },
    'application/x-cdlink': { source: 'apache', extensions: ['vcd'] },
    'application/x-cfs-compressed': { source: 'apache', extensions: ['cfs'] },
    'application/x-chat': { source: 'apache', extensions: ['chat'] },
    'application/x-chess-pgn': { source: 'apache', extensions: ['pgn'] },
    'application/x-chrome-extension': { extensions: ['crx'] },
    'application/x-cocoa': { source: 'nginx', extensions: ['cco'] },
    'application/x-compress': { source: 'apache' },
    'application/x-conference': { source: 'apache', extensions: ['nsc'] },
    'application/x-cpio': { source: 'apache', extensions: ['cpio'] },
    'application/x-csh': { source: 'apache', extensions: ['csh'] },
    'application/x-deb': { compressible: !1 },
    'application/x-debian-package': { source: 'apache', extensions: ['deb', 'udeb'] },
    'application/x-dgc-compressed': { source: 'apache', extensions: ['dgc'] },
    'application/x-director': {
      source: 'apache',
      extensions: ['dir', 'dcr', 'dxr', 'cst', 'cct', 'cxt', 'w3d', 'fgd', 'swa'],
    },
    'application/x-doom': { source: 'apache', extensions: ['wad'] },
    'application/x-dtbncx+xml': { source: 'apache', compressible: !0, extensions: ['ncx'] },
    'application/x-dtbook+xml': { source: 'apache', compressible: !0, extensions: ['dtb'] },
    'application/x-dtbresource+xml': { source: 'apache', compressible: !0, extensions: ['res'] },
    'application/x-dvi': { source: 'apache', compressible: !1, extensions: ['dvi'] },
    'application/x-envoy': { source: 'apache', extensions: ['evy'] },
    'application/x-eva': { source: 'apache', extensions: ['eva'] },
    'application/x-font-bdf': { source: 'apache', extensions: ['bdf'] },
    'application/x-font-dos': { source: 'apache' },
    'application/x-font-framemaker': { source: 'apache' },
    'application/x-font-ghostscript': { source: 'apache', extensions: ['gsf'] },
    'application/x-font-libgrx': { source: 'apache' },
    'application/x-font-linux-psf': { source: 'apache', extensions: ['psf'] },
    'application/x-font-pcf': { source: 'apache', extensions: ['pcf'] },
    'application/x-font-snf': { source: 'apache', extensions: ['snf'] },
    'application/x-font-speedo': { source: 'apache' },
    'application/x-font-sunos-news': { source: 'apache' },
    'application/x-font-type1': { source: 'apache', extensions: ['pfa', 'pfb', 'pfm', 'afm'] },
    'application/x-font-vfont': { source: 'apache' },
    'application/x-freearc': { source: 'apache', extensions: ['arc'] },
    'application/x-futuresplash': { source: 'apache', extensions: ['spl'] },
    'application/x-gca-compressed': { source: 'apache', extensions: ['gca'] },
    'application/x-glulx': { source: 'apache', extensions: ['ulx'] },
    'application/x-gnumeric': { source: 'apache', extensions: ['gnumeric'] },
    'application/x-gramps-xml': { source: 'apache', extensions: ['gramps'] },
    'application/x-gtar': { source: 'apache', extensions: ['gtar'] },
    'application/x-gzip': { source: 'apache' },
    'application/x-hdf': { source: 'apache', extensions: ['hdf'] },
    'application/x-httpd-php': { compressible: !0, extensions: ['php'] },
    'application/x-install-instructions': { source: 'apache', extensions: ['install'] },
    'application/x-iso9660-image': { source: 'apache', extensions: ['iso'] },
    'application/x-iwork-keynote-sffkey': { extensions: ['key'] },
    'application/x-iwork-numbers-sffnumbers': { extensions: ['numbers'] },
    'application/x-iwork-pages-sffpages': { extensions: ['pages'] },
    'application/x-java-archive-diff': { source: 'nginx', extensions: ['jardiff'] },
    'application/x-java-jnlp-file': { source: 'apache', compressible: !1, extensions: ['jnlp'] },
    'application/x-javascript': { compressible: !0 },
    'application/x-keepass2': { extensions: ['kdbx'] },
    'application/x-latex': { source: 'apache', compressible: !1, extensions: ['latex'] },
    'application/x-lua-bytecode': { extensions: ['luac'] },
    'application/x-lzh-compressed': { source: 'apache', extensions: ['lzh', 'lha'] },
    'application/x-makeself': { source: 'nginx', extensions: ['run'] },
    'application/x-mie': { source: 'apache', extensions: ['mie'] },
    'application/x-mobipocket-ebook': { source: 'apache', extensions: ['prc', 'mobi'] },
    'application/x-mpegurl': { compressible: !1 },
    'application/x-ms-application': { source: 'apache', extensions: ['application'] },
    'application/x-ms-shortcut': { source: 'apache', extensions: ['lnk'] },
    'application/x-ms-wmd': { source: 'apache', extensions: ['wmd'] },
    'application/x-ms-wmz': { source: 'apache', extensions: ['wmz'] },
    'application/x-ms-xbap': { source: 'apache', extensions: ['xbap'] },
    'application/x-msaccess': { source: 'apache', extensions: ['mdb'] },
    'application/x-msbinder': { source: 'apache', extensions: ['obd'] },
    'application/x-mscardfile': { source: 'apache', extensions: ['crd'] },
    'application/x-msclip': { source: 'apache', extensions: ['clp'] },
    'application/x-msdos-program': { extensions: ['exe'] },
    'application/x-msdownload': { source: 'apache', extensions: ['exe', 'dll', 'com', 'bat', 'msi'] },
    'application/x-msmediaview': { source: 'apache', extensions: ['mvb', 'm13', 'm14'] },
    'application/x-msmetafile': { source: 'apache', extensions: ['wmf', 'wmz', 'emf', 'emz'] },
    'application/x-msmoney': { source: 'apache', extensions: ['mny'] },
    'application/x-mspublisher': { source: 'apache', extensions: ['pub'] },
    'application/x-msschedule': { source: 'apache', extensions: ['scd'] },
    'application/x-msterminal': { source: 'apache', extensions: ['trm'] },
    'application/x-mswrite': { source: 'apache', extensions: ['wri'] },
    'application/x-netcdf': { source: 'apache', extensions: ['nc', 'cdf'] },
    'application/x-ns-proxy-autoconfig': { compressible: !0, extensions: ['pac'] },
    'application/x-nzb': { source: 'apache', extensions: ['nzb'] },
    'application/x-perl': { source: 'nginx', extensions: ['pl', 'pm'] },
    'application/x-pilot': { source: 'nginx', extensions: ['prc', 'pdb'] },
    'application/x-pkcs12': { source: 'apache', compressible: !1, extensions: ['p12', 'pfx'] },
    'application/x-pkcs7-certificates': { source: 'apache', extensions: ['p7b', 'spc'] },
    'application/x-pkcs7-certreqresp': { source: 'apache', extensions: ['p7r'] },
    'application/x-pki-message': { source: 'iana' },
    'application/x-rar-compressed': { source: 'apache', compressible: !1, extensions: ['rar'] },
    'application/x-redhat-package-manager': { source: 'nginx', extensions: ['rpm'] },
    'application/x-research-info-systems': { source: 'apache', extensions: ['ris'] },
    'application/x-sea': { source: 'nginx', extensions: ['sea'] },
    'application/x-sh': { source: 'apache', compressible: !0, extensions: ['sh'] },
    'application/x-shar': { source: 'apache', extensions: ['shar'] },
    'application/x-shockwave-flash': { source: 'apache', compressible: !1, extensions: ['swf'] },
    'application/x-silverlight-app': { source: 'apache', extensions: ['xap'] },
    'application/x-sql': { source: 'apache', extensions: ['sql'] },
    'application/x-stuffit': { source: 'apache', compressible: !1, extensions: ['sit'] },
    'application/x-stuffitx': { source: 'apache', extensions: ['sitx'] },
    'application/x-subrip': { source: 'apache', extensions: ['srt'] },
    'application/x-sv4cpio': { source: 'apache', extensions: ['sv4cpio'] },
    'application/x-sv4crc': { source: 'apache', extensions: ['sv4crc'] },
    'application/x-t3vm-image': { source: 'apache', extensions: ['t3'] },
    'application/x-tads': { source: 'apache', extensions: ['gam'] },
    'application/x-tar': { source: 'apache', compressible: !0, extensions: ['tar'] },
    'application/x-tcl': { source: 'apache', extensions: ['tcl', 'tk'] },
    'application/x-tex': { source: 'apache', extensions: ['tex'] },
    'application/x-tex-tfm': { source: 'apache', extensions: ['tfm'] },
    'application/x-texinfo': { source: 'apache', extensions: ['texinfo', 'texi'] },
    'application/x-tgif': { source: 'apache', extensions: ['obj'] },
    'application/x-ustar': { source: 'apache', extensions: ['ustar'] },
    'application/x-virtualbox-hdd': { compressible: !0, extensions: ['hdd'] },
    'application/x-virtualbox-ova': { compressible: !0, extensions: ['ova'] },
    'application/x-virtualbox-ovf': { compressible: !0, extensions: ['ovf'] },
    'application/x-virtualbox-vbox': { compressible: !0, extensions: ['vbox'] },
    'application/x-virtualbox-vbox-extpack': { compressible: !1, extensions: ['vbox-extpack'] },
    'application/x-virtualbox-vdi': { compressible: !0, extensions: ['vdi'] },
    'application/x-virtualbox-vhd': { compressible: !0, extensions: ['vhd'] },
    'application/x-virtualbox-vmdk': { compressible: !0, extensions: ['vmdk'] },
    'application/x-wais-source': { source: 'apache', extensions: ['src'] },
    'application/x-web-app-manifest+json': { compressible: !0, extensions: ['webapp'] },
    'application/x-www-form-urlencoded': { source: 'iana', compressible: !0 },
    'application/x-x509-ca-cert': { source: 'iana', extensions: ['der', 'crt', 'pem'] },
    'application/x-x509-ca-ra-cert': { source: 'iana' },
    'application/x-x509-next-ca-cert': { source: 'iana' },
    'application/x-xfig': { source: 'apache', extensions: ['fig'] },
    'application/x-xliff+xml': { source: 'apache', compressible: !0, extensions: ['xlf'] },
    'application/x-xpinstall': { source: 'apache', compressible: !1, extensions: ['xpi'] },
    'application/x-xz': { source: 'apache', extensions: ['xz'] },
    'application/x-zmachine': { source: 'apache', extensions: ['z1', 'z2', 'z3', 'z4', 'z5', 'z6', 'z7', 'z8'] },
    'application/x400-bp': { source: 'iana' },
    'application/xacml+xml': { source: 'iana', compressible: !0 },
    'application/xaml+xml': { source: 'apache', compressible: !0, extensions: ['xaml'] },
    'application/xcap-att+xml': { source: 'iana', compressible: !0, extensions: ['xav'] },
    'application/xcap-caps+xml': { source: 'iana', compressible: !0, extensions: ['xca'] },
    'application/xcap-diff+xml': { source: 'iana', compressible: !0, extensions: ['xdf'] },
    'application/xcap-el+xml': { source: 'iana', compressible: !0, extensions: ['xel'] },
    'application/xcap-error+xml': { source: 'iana', compressible: !0 },
    'application/xcap-ns+xml': { source: 'iana', compressible: !0, extensions: ['xns'] },
    'application/xcon-conference-info+xml': { source: 'iana', compressible: !0 },
    'application/xcon-conference-info-diff+xml': { source: 'iana', compressible: !0 },
    'application/xenc+xml': { source: 'iana', compressible: !0, extensions: ['xenc'] },
    'application/xhtml+xml': { source: 'iana', compressible: !0, extensions: ['xhtml', 'xht'] },
    'application/xhtml-voice+xml': { source: 'apache', compressible: !0 },
    'application/xliff+xml': { source: 'iana', compressible: !0, extensions: ['xlf'] },
    'application/xml': { source: 'iana', compressible: !0, extensions: ['xml', 'xsl', 'xsd', 'rng'] },
    'application/xml-dtd': { source: 'iana', compressible: !0, extensions: ['dtd'] },
    'application/xml-external-parsed-entity': { source: 'iana' },
    'application/xml-patch+xml': { source: 'iana', compressible: !0 },
    'application/xmpp+xml': { source: 'iana', compressible: !0 },
    'application/xop+xml': { source: 'iana', compressible: !0, extensions: ['xop'] },
    'application/xproc+xml': { source: 'apache', compressible: !0, extensions: ['xpl'] },
    'application/xslt+xml': { source: 'iana', compressible: !0, extensions: ['xsl', 'xslt'] },
    'application/xspf+xml': { source: 'apache', compressible: !0, extensions: ['xspf'] },
    'application/xv+xml': { source: 'iana', compressible: !0, extensions: ['mxml', 'xhvml', 'xvml', 'xvm'] },
    'application/yang': { source: 'iana', extensions: ['yang'] },
    'application/yang-data+json': { source: 'iana', compressible: !0 },
    'application/yang-data+xml': { source: 'iana', compressible: !0 },
    'application/yang-patch+json': { source: 'iana', compressible: !0 },
    'application/yang-patch+xml': { source: 'iana', compressible: !0 },
    'application/yin+xml': { source: 'iana', compressible: !0, extensions: ['yin'] },
    'application/zip': { source: 'iana', compressible: !1, extensions: ['zip'] },
    'application/zlib': { source: 'iana' },
    'application/zstd': { source: 'iana' },
    'audio/1d-interleaved-parityfec': { source: 'iana' },
    'audio/32kadpcm': { source: 'iana' },
    'audio/3gpp': { source: 'iana', compressible: !1, extensions: ['3gpp'] },
    'audio/3gpp2': { source: 'iana' },
    'audio/aac': { source: 'iana' },
    'audio/ac3': { source: 'iana' },
    'audio/adpcm': { source: 'apache', extensions: ['adp'] },
    'audio/amr': { source: 'iana', extensions: ['amr'] },
    'audio/amr-wb': { source: 'iana' },
    'audio/amr-wb+': { source: 'iana' },
    'audio/aptx': { source: 'iana' },
    'audio/asc': { source: 'iana' },
    'audio/atrac-advanced-lossless': { source: 'iana' },
    'audio/atrac-x': { source: 'iana' },
    'audio/atrac3': { source: 'iana' },
    'audio/basic': { source: 'iana', compressible: !1, extensions: ['au', 'snd'] },
    'audio/bv16': { source: 'iana' },
    'audio/bv32': { source: 'iana' },
    'audio/clearmode': { source: 'iana' },
    'audio/cn': { source: 'iana' },
    'audio/dat12': { source: 'iana' },
    'audio/dls': { source: 'iana' },
    'audio/dsr-es201108': { source: 'iana' },
    'audio/dsr-es202050': { source: 'iana' },
    'audio/dsr-es202211': { source: 'iana' },
    'audio/dsr-es202212': { source: 'iana' },
    'audio/dv': { source: 'iana' },
    'audio/dvi4': { source: 'iana' },
    'audio/eac3': { source: 'iana' },
    'audio/encaprtp': { source: 'iana' },
    'audio/evrc': { source: 'iana' },
    'audio/evrc-qcp': { source: 'iana' },
    'audio/evrc0': { source: 'iana' },
    'audio/evrc1': { source: 'iana' },
    'audio/evrcb': { source: 'iana' },
    'audio/evrcb0': { source: 'iana' },
    'audio/evrcb1': { source: 'iana' },
    'audio/evrcnw': { source: 'iana' },
    'audio/evrcnw0': { source: 'iana' },
    'audio/evrcnw1': { source: 'iana' },
    'audio/evrcwb': { source: 'iana' },
    'audio/evrcwb0': { source: 'iana' },
    'audio/evrcwb1': { source: 'iana' },
    'audio/evs': { source: 'iana' },
    'audio/flexfec': { source: 'iana' },
    'audio/fwdred': { source: 'iana' },
    'audio/g711-0': { source: 'iana' },
    'audio/g719': { source: 'iana' },
    'audio/g722': { source: 'iana' },
    'audio/g7221': { source: 'iana' },
    'audio/g723': { source: 'iana' },
    'audio/g726-16': { source: 'iana' },
    'audio/g726-24': { source: 'iana' },
    'audio/g726-32': { source: 'iana' },
    'audio/g726-40': { source: 'iana' },
    'audio/g728': { source: 'iana' },
    'audio/g729': { source: 'iana' },
    'audio/g7291': { source: 'iana' },
    'audio/g729d': { source: 'iana' },
    'audio/g729e': { source: 'iana' },
    'audio/gsm': { source: 'iana' },
    'audio/gsm-efr': { source: 'iana' },
    'audio/gsm-hr-08': { source: 'iana' },
    'audio/ilbc': { source: 'iana' },
    'audio/ip-mr_v2.5': { source: 'iana' },
    'audio/isac': { source: 'apache' },
    'audio/l16': { source: 'iana' },
    'audio/l20': { source: 'iana' },
    'audio/l24': { source: 'iana', compressible: !1 },
    'audio/l8': { source: 'iana' },
    'audio/lpc': { source: 'iana' },
    'audio/melp': { source: 'iana' },
    'audio/melp1200': { source: 'iana' },
    'audio/melp2400': { source: 'iana' },
    'audio/melp600': { source: 'iana' },
    'audio/mhas': { source: 'iana' },
    'audio/midi': { source: 'apache', extensions: ['mid', 'midi', 'kar', 'rmi'] },
    'audio/mobile-xmf': { source: 'iana', extensions: ['mxmf'] },
    'audio/mp3': { compressible: !1, extensions: ['mp3'] },
    'audio/mp4': { source: 'iana', compressible: !1, extensions: ['m4a', 'mp4a'] },
    'audio/mp4a-latm': { source: 'iana' },
    'audio/mpa': { source: 'iana' },
    'audio/mpa-robust': { source: 'iana' },
    'audio/mpeg': { source: 'iana', compressible: !1, extensions: ['mpga', 'mp2', 'mp2a', 'mp3', 'm2a', 'm3a'] },
    'audio/mpeg4-generic': { source: 'iana' },
    'audio/musepack': { source: 'apache' },
    'audio/ogg': { source: 'iana', compressible: !1, extensions: ['oga', 'ogg', 'spx', 'opus'] },
    'audio/opus': { source: 'iana' },
    'audio/parityfec': { source: 'iana' },
    'audio/pcma': { source: 'iana' },
    'audio/pcma-wb': { source: 'iana' },
    'audio/pcmu': { source: 'iana' },
    'audio/pcmu-wb': { source: 'iana' },
    'audio/prs.sid': { source: 'iana' },
    'audio/qcelp': { source: 'iana' },
    'audio/raptorfec': { source: 'iana' },
    'audio/red': { source: 'iana' },
    'audio/rtp-enc-aescm128': { source: 'iana' },
    'audio/rtp-midi': { source: 'iana' },
    'audio/rtploopback': { source: 'iana' },
    'audio/rtx': { source: 'iana' },
    'audio/s3m': { source: 'apache', extensions: ['s3m'] },
    'audio/scip': { source: 'iana' },
    'audio/silk': { source: 'apache', extensions: ['sil'] },
    'audio/smv': { source: 'iana' },
    'audio/smv-qcp': { source: 'iana' },
    'audio/smv0': { source: 'iana' },
    'audio/sofa': { source: 'iana' },
    'audio/sp-midi': { source: 'iana' },
    'audio/speex': { source: 'iana' },
    'audio/t140c': { source: 'iana' },
    'audio/t38': { source: 'iana' },
    'audio/telephone-event': { source: 'iana' },
    'audio/tetra_acelp': { source: 'iana' },
    'audio/tetra_acelp_bb': { source: 'iana' },
    'audio/tone': { source: 'iana' },
    'audio/tsvcis': { source: 'iana' },
    'audio/uemclip': { source: 'iana' },
    'audio/ulpfec': { source: 'iana' },
    'audio/usac': { source: 'iana' },
    'audio/vdvi': { source: 'iana' },
    'audio/vmr-wb': { source: 'iana' },
    'audio/vnd.3gpp.iufp': { source: 'iana' },
    'audio/vnd.4sb': { source: 'iana' },
    'audio/vnd.audiokoz': { source: 'iana' },
    'audio/vnd.celp': { source: 'iana' },
    'audio/vnd.cisco.nse': { source: 'iana' },
    'audio/vnd.cmles.radio-events': { source: 'iana' },
    'audio/vnd.cns.anp1': { source: 'iana' },
    'audio/vnd.cns.inf1': { source: 'iana' },
    'audio/vnd.dece.audio': { source: 'iana', extensions: ['uva', 'uvva'] },
    'audio/vnd.digital-winds': { source: 'iana', extensions: ['eol'] },
    'audio/vnd.dlna.adts': { source: 'iana' },
    'audio/vnd.dolby.heaac.1': { source: 'iana' },
    'audio/vnd.dolby.heaac.2': { source: 'iana' },
    'audio/vnd.dolby.mlp': { source: 'iana' },
    'audio/vnd.dolby.mps': { source: 'iana' },
    'audio/vnd.dolby.pl2': { source: 'iana' },
    'audio/vnd.dolby.pl2x': { source: 'iana' },
    'audio/vnd.dolby.pl2z': { source: 'iana' },
    'audio/vnd.dolby.pulse.1': { source: 'iana' },
    'audio/vnd.dra': { source: 'iana', extensions: ['dra'] },
    'audio/vnd.dts': { source: 'iana', extensions: ['dts'] },
    'audio/vnd.dts.hd': { source: 'iana', extensions: ['dtshd'] },
    'audio/vnd.dts.uhd': { source: 'iana' },
    'audio/vnd.dvb.file': { source: 'iana' },
    'audio/vnd.everad.plj': { source: 'iana' },
    'audio/vnd.hns.audio': { source: 'iana' },
    'audio/vnd.lucent.voice': { source: 'iana', extensions: ['lvp'] },
    'audio/vnd.ms-playready.media.pya': { source: 'iana', extensions: ['pya'] },
    'audio/vnd.nokia.mobile-xmf': { source: 'iana' },
    'audio/vnd.nortel.vbk': { source: 'iana' },
    'audio/vnd.nuera.ecelp4800': { source: 'iana', extensions: ['ecelp4800'] },
    'audio/vnd.nuera.ecelp7470': { source: 'iana', extensions: ['ecelp7470'] },
    'audio/vnd.nuera.ecelp9600': { source: 'iana', extensions: ['ecelp9600'] },
    'audio/vnd.octel.sbc': { source: 'iana' },
    'audio/vnd.presonus.multitrack': { source: 'iana' },
    'audio/vnd.qcelp': { source: 'iana' },
    'audio/vnd.rhetorex.32kadpcm': { source: 'iana' },
    'audio/vnd.rip': { source: 'iana', extensions: ['rip'] },
    'audio/vnd.rn-realaudio': { compressible: !1 },
    'audio/vnd.sealedmedia.softseal.mpeg': { source: 'iana' },
    'audio/vnd.vmx.cvsd': { source: 'iana' },
    'audio/vnd.wave': { compressible: !1 },
    'audio/vorbis': { source: 'iana', compressible: !1 },
    'audio/vorbis-config': { source: 'iana' },
    'audio/wav': { compressible: !1, extensions: ['wav'] },
    'audio/wave': { compressible: !1, extensions: ['wav'] },
    'audio/webm': { source: 'apache', compressible: !1, extensions: ['weba'] },
    'audio/x-aac': { source: 'apache', compressible: !1, extensions: ['aac'] },
    'audio/x-aiff': { source: 'apache', extensions: ['aif', 'aiff', 'aifc'] },
    'audio/x-caf': { source: 'apache', compressible: !1, extensions: ['caf'] },
    'audio/x-flac': { source: 'apache', extensions: ['flac'] },
    'audio/x-m4a': { source: 'nginx', extensions: ['m4a'] },
    'audio/x-matroska': { source: 'apache', extensions: ['mka'] },
    'audio/x-mpegurl': { source: 'apache', extensions: ['m3u'] },
    'audio/x-ms-wax': { source: 'apache', extensions: ['wax'] },
    'audio/x-ms-wma': { source: 'apache', extensions: ['wma'] },
    'audio/x-pn-realaudio': { source: 'apache', extensions: ['ram', 'ra'] },
    'audio/x-pn-realaudio-plugin': { source: 'apache', extensions: ['rmp'] },
    'audio/x-realaudio': { source: 'nginx', extensions: ['ra'] },
    'audio/x-tta': { source: 'apache' },
    'audio/x-wav': { source: 'apache', extensions: ['wav'] },
    'audio/xm': { source: 'apache', extensions: ['xm'] },
    'chemical/x-cdx': { source: 'apache', extensions: ['cdx'] },
    'chemical/x-cif': { source: 'apache', extensions: ['cif'] },
    'chemical/x-cmdf': { source: 'apache', extensions: ['cmdf'] },
    'chemical/x-cml': { source: 'apache', extensions: ['cml'] },
    'chemical/x-csml': { source: 'apache', extensions: ['csml'] },
    'chemical/x-pdb': { source: 'apache' },
    'chemical/x-xyz': { source: 'apache', extensions: ['xyz'] },
    'font/collection': { source: 'iana', extensions: ['ttc'] },
    'font/otf': { source: 'iana', compressible: !0, extensions: ['otf'] },
    'font/sfnt': { source: 'iana' },
    'font/ttf': { source: 'iana', compressible: !0, extensions: ['ttf'] },
    'font/woff': { source: 'iana', extensions: ['woff'] },
    'font/woff2': { source: 'iana', extensions: ['woff2'] },
    'image/aces': { source: 'iana', extensions: ['exr'] },
    'image/apng': { compressible: !1, extensions: ['apng'] },
    'image/avci': { source: 'iana', extensions: ['avci'] },
    'image/avcs': { source: 'iana', extensions: ['avcs'] },
    'image/avif': { source: 'iana', compressible: !1, extensions: ['avif'] },
    'image/bmp': { source: 'iana', compressible: !0, extensions: ['bmp'] },
    'image/cgm': { source: 'iana', extensions: ['cgm'] },
    'image/dicom-rle': { source: 'iana', extensions: ['drle'] },
    'image/emf': { source: 'iana', extensions: ['emf'] },
    'image/fits': { source: 'iana', extensions: ['fits'] },
    'image/g3fax': { source: 'iana', extensions: ['g3'] },
    'image/gif': { source: 'iana', compressible: !1, extensions: ['gif'] },
    'image/heic': { source: 'iana', extensions: ['heic'] },
    'image/heic-sequence': { source: 'iana', extensions: ['heics'] },
    'image/heif': { source: 'iana', extensions: ['heif'] },
    'image/heif-sequence': { source: 'iana', extensions: ['heifs'] },
    'image/hej2k': { source: 'iana', extensions: ['hej2'] },
    'image/hsj2': { source: 'iana', extensions: ['hsj2'] },
    'image/ief': { source: 'iana', extensions: ['ief'] },
    'image/jls': { source: 'iana', extensions: ['jls'] },
    'image/jp2': { source: 'iana', compressible: !1, extensions: ['jp2', 'jpg2'] },
    'image/jpeg': { source: 'iana', compressible: !1, extensions: ['jpeg', 'jpg', 'jpe'] },
    'image/jph': { source: 'iana', extensions: ['jph'] },
    'image/jphc': { source: 'iana', extensions: ['jhc'] },
    'image/jpm': { source: 'iana', compressible: !1, extensions: ['jpm'] },
    'image/jpx': { source: 'iana', compressible: !1, extensions: ['jpx', 'jpf'] },
    'image/jxr': { source: 'iana', extensions: ['jxr'] },
    'image/jxra': { source: 'iana', extensions: ['jxra'] },
    'image/jxrs': { source: 'iana', extensions: ['jxrs'] },
    'image/jxs': { source: 'iana', extensions: ['jxs'] },
    'image/jxsc': { source: 'iana', extensions: ['jxsc'] },
    'image/jxsi': { source: 'iana', extensions: ['jxsi'] },
    'image/jxss': { source: 'iana', extensions: ['jxss'] },
    'image/ktx': { source: 'iana', extensions: ['ktx'] },
    'image/ktx2': { source: 'iana', extensions: ['ktx2'] },
    'image/naplps': { source: 'iana' },
    'image/pjpeg': { compressible: !1 },
    'image/png': { source: 'iana', compressible: !1, extensions: ['png'] },
    'image/prs.btif': { source: 'iana', extensions: ['btif'] },
    'image/prs.pti': { source: 'iana', extensions: ['pti'] },
    'image/pwg-raster': { source: 'iana' },
    'image/sgi': { source: 'apache', extensions: ['sgi'] },
    'image/svg+xml': { source: 'iana', compressible: !0, extensions: ['svg', 'svgz'] },
    'image/t38': { source: 'iana', extensions: ['t38'] },
    'image/tiff': { source: 'iana', compressible: !1, extensions: ['tif', 'tiff'] },
    'image/tiff-fx': { source: 'iana', extensions: ['tfx'] },
    'image/vnd.adobe.photoshop': { source: 'iana', compressible: !0, extensions: ['psd'] },
    'image/vnd.airzip.accelerator.azv': { source: 'iana', extensions: ['azv'] },
    'image/vnd.cns.inf2': { source: 'iana' },
    'image/vnd.dece.graphic': { source: 'iana', extensions: ['uvi', 'uvvi', 'uvg', 'uvvg'] },
    'image/vnd.djvu': { source: 'iana', extensions: ['djvu', 'djv'] },
    'image/vnd.dvb.subtitle': { source: 'iana', extensions: ['sub'] },
    'image/vnd.dwg': { source: 'iana', extensions: ['dwg'] },
    'image/vnd.dxf': { source: 'iana', extensions: ['dxf'] },
    'image/vnd.fastbidsheet': { source: 'iana', extensions: ['fbs'] },
    'image/vnd.fpx': { source: 'iana', extensions: ['fpx'] },
    'image/vnd.fst': { source: 'iana', extensions: ['fst'] },
    'image/vnd.fujixerox.edmics-mmr': { source: 'iana', extensions: ['mmr'] },
    'image/vnd.fujixerox.edmics-rlc': { source: 'iana', extensions: ['rlc'] },
    'image/vnd.globalgraphics.pgb': { source: 'iana' },
    'image/vnd.microsoft.icon': { source: 'iana', compressible: !0, extensions: ['ico'] },
    'image/vnd.mix': { source: 'iana' },
    'image/vnd.mozilla.apng': { source: 'iana' },
    'image/vnd.ms-dds': { compressible: !0, extensions: ['dds'] },
    'image/vnd.ms-modi': { source: 'iana', extensions: ['mdi'] },
    'image/vnd.ms-photo': { source: 'apache', extensions: ['wdp'] },
    'image/vnd.net-fpx': { source: 'iana', extensions: ['npx'] },
    'image/vnd.pco.b16': { source: 'iana', extensions: ['b16'] },
    'image/vnd.radiance': { source: 'iana' },
    'image/vnd.sealed.png': { source: 'iana' },
    'image/vnd.sealedmedia.softseal.gif': { source: 'iana' },
    'image/vnd.sealedmedia.softseal.jpg': { source: 'iana' },
    'image/vnd.svf': { source: 'iana' },
    'image/vnd.tencent.tap': { source: 'iana', extensions: ['tap'] },
    'image/vnd.valve.source.texture': { source: 'iana', extensions: ['vtf'] },
    'image/vnd.wap.wbmp': { source: 'iana', extensions: ['wbmp'] },
    'image/vnd.xiff': { source: 'iana', extensions: ['xif'] },
    'image/vnd.zbrush.pcx': { source: 'iana', extensions: ['pcx'] },
    'image/webp': { source: 'apache', extensions: ['webp'] },
    'image/wmf': { source: 'iana', extensions: ['wmf'] },
    'image/x-3ds': { source: 'apache', extensions: ['3ds'] },
    'image/x-cmu-raster': { source: 'apache', extensions: ['ras'] },
    'image/x-cmx': { source: 'apache', extensions: ['cmx'] },
    'image/x-freehand': { source: 'apache', extensions: ['fh', 'fhc', 'fh4', 'fh5', 'fh7'] },
    'image/x-icon': { source: 'apache', compressible: !0, extensions: ['ico'] },
    'image/x-jng': { source: 'nginx', extensions: ['jng'] },
    'image/x-mrsid-image': { source: 'apache', extensions: ['sid'] },
    'image/x-ms-bmp': { source: 'nginx', compressible: !0, extensions: ['bmp'] },
    'image/x-pcx': { source: 'apache', extensions: ['pcx'] },
    'image/x-pict': { source: 'apache', extensions: ['pic', 'pct'] },
    'image/x-portable-anymap': { source: 'apache', extensions: ['pnm'] },
    'image/x-portable-bitmap': { source: 'apache', extensions: ['pbm'] },
    'image/x-portable-graymap': { source: 'apache', extensions: ['pgm'] },
    'image/x-portable-pixmap': { source: 'apache', extensions: ['ppm'] },
    'image/x-rgb': { source: 'apache', extensions: ['rgb'] },
    'image/x-tga': { source: 'apache', extensions: ['tga'] },
    'image/x-xbitmap': { source: 'apache', extensions: ['xbm'] },
    'image/x-xcf': { compressible: !1 },
    'image/x-xpixmap': { source: 'apache', extensions: ['xpm'] },
    'image/x-xwindowdump': { source: 'apache', extensions: ['xwd'] },
    'message/cpim': { source: 'iana' },
    'message/delivery-status': { source: 'iana' },
    'message/disposition-notification': { source: 'iana', extensions: ['disposition-notification'] },
    'message/external-body': { source: 'iana' },
    'message/feedback-report': { source: 'iana' },
    'message/global': { source: 'iana', extensions: ['u8msg'] },
    'message/global-delivery-status': { source: 'iana', extensions: ['u8dsn'] },
    'message/global-disposition-notification': { source: 'iana', extensions: ['u8mdn'] },
    'message/global-headers': { source: 'iana', extensions: ['u8hdr'] },
    'message/http': { source: 'iana', compressible: !1 },
    'message/imdn+xml': { source: 'iana', compressible: !0 },
    'message/news': { source: 'iana' },
    'message/partial': { source: 'iana', compressible: !1 },
    'message/rfc822': { source: 'iana', compressible: !0, extensions: ['eml', 'mime'] },
    'message/s-http': { source: 'iana' },
    'message/sip': { source: 'iana' },
    'message/sipfrag': { source: 'iana' },
    'message/tracking-status': { source: 'iana' },
    'message/vnd.si.simp': { source: 'iana' },
    'message/vnd.wfa.wsc': { source: 'iana', extensions: ['wsc'] },
    'model/3mf': { source: 'iana', extensions: ['3mf'] },
    'model/e57': { source: 'iana' },
    'model/gltf+json': { source: 'iana', compressible: !0, extensions: ['gltf'] },
    'model/gltf-binary': { source: 'iana', compressible: !0, extensions: ['glb'] },
    'model/iges': { source: 'iana', compressible: !1, extensions: ['igs', 'iges'] },
    'model/mesh': { source: 'iana', compressible: !1, extensions: ['msh', 'mesh', 'silo'] },
    'model/mtl': { source: 'iana', extensions: ['mtl'] },
    'model/obj': { source: 'iana', extensions: ['obj'] },
    'model/step': { source: 'iana' },
    'model/step+xml': { source: 'iana', compressible: !0, extensions: ['stpx'] },
    'model/step+zip': { source: 'iana', compressible: !1, extensions: ['stpz'] },
    'model/step-xml+zip': { source: 'iana', compressible: !1, extensions: ['stpxz'] },
    'model/stl': { source: 'iana', extensions: ['stl'] },
    'model/vnd.collada+xml': { source: 'iana', compressible: !0, extensions: ['dae'] },
    'model/vnd.dwf': { source: 'iana', extensions: ['dwf'] },
    'model/vnd.flatland.3dml': { source: 'iana' },
    'model/vnd.gdl': { source: 'iana', extensions: ['gdl'] },
    'model/vnd.gs-gdl': { source: 'apache' },
    'model/vnd.gs.gdl': { source: 'iana' },
    'model/vnd.gtw': { source: 'iana', extensions: ['gtw'] },
    'model/vnd.moml+xml': { source: 'iana', compressible: !0 },
    'model/vnd.mts': { source: 'iana', extensions: ['mts'] },
    'model/vnd.opengex': { source: 'iana', extensions: ['ogex'] },
    'model/vnd.parasolid.transmit.binary': { source: 'iana', extensions: ['x_b'] },
    'model/vnd.parasolid.transmit.text': { source: 'iana', extensions: ['x_t'] },
    'model/vnd.pytha.pyox': { source: 'iana' },
    'model/vnd.rosette.annotated-data-model': { source: 'iana' },
    'model/vnd.sap.vds': { source: 'iana', extensions: ['vds'] },
    'model/vnd.usdz+zip': { source: 'iana', compressible: !1, extensions: ['usdz'] },
    'model/vnd.valve.source.compiled-map': { source: 'iana', extensions: ['bsp'] },
    'model/vnd.vtu': { source: 'iana', extensions: ['vtu'] },
    'model/vrml': { source: 'iana', compressible: !1, extensions: ['wrl', 'vrml'] },
    'model/x3d+binary': { source: 'apache', compressible: !1, extensions: ['x3db', 'x3dbz'] },
    'model/x3d+fastinfoset': { source: 'iana', extensions: ['x3db'] },
    'model/x3d+vrml': { source: 'apache', compressible: !1, extensions: ['x3dv', 'x3dvz'] },
    'model/x3d+xml': { source: 'iana', compressible: !0, extensions: ['x3d', 'x3dz'] },
    'model/x3d-vrml': { source: 'iana', extensions: ['x3dv'] },
    'multipart/alternative': { source: 'iana', compressible: !1 },
    'multipart/appledouble': { source: 'iana' },
    'multipart/byteranges': { source: 'iana' },
    'multipart/digest': { source: 'iana' },
    'multipart/encrypted': { source: 'iana', compressible: !1 },
    'multipart/form-data': { source: 'iana', compressible: !1 },
    'multipart/header-set': { source: 'iana' },
    'multipart/mixed': { source: 'iana' },
    'multipart/multilingual': { source: 'iana' },
    'multipart/parallel': { source: 'iana' },
    'multipart/related': { source: 'iana', compressible: !1 },
    'multipart/report': { source: 'iana' },
    'multipart/signed': { source: 'iana', compressible: !1 },
    'multipart/vnd.bint.med-plus': { source: 'iana' },
    'multipart/voice-message': { source: 'iana' },
    'multipart/x-mixed-replace': { source: 'iana' },
    'text/1d-interleaved-parityfec': { source: 'iana' },
    'text/cache-manifest': { source: 'iana', compressible: !0, extensions: ['appcache', 'manifest'] },
    'text/calendar': { source: 'iana', extensions: ['ics', 'ifb'] },
    'text/calender': { compressible: !0 },
    'text/cmd': { compressible: !0 },
    'text/coffeescript': { extensions: ['coffee', 'litcoffee'] },
    'text/cql': { source: 'iana' },
    'text/cql-expression': { source: 'iana' },
    'text/cql-identifier': { source: 'iana' },
    'text/css': { source: 'iana', charset: 'UTF-8', compressible: !0, extensions: ['css'] },
    'text/csv': { source: 'iana', compressible: !0, extensions: ['csv'] },
    'text/csv-schema': { source: 'iana' },
    'text/directory': { source: 'iana' },
    'text/dns': { source: 'iana' },
    'text/ecmascript': { source: 'iana' },
    'text/encaprtp': { source: 'iana' },
    'text/enriched': { source: 'iana' },
    'text/fhirpath': { source: 'iana' },
    'text/flexfec': { source: 'iana' },
    'text/fwdred': { source: 'iana' },
    'text/gff3': { source: 'iana' },
    'text/grammar-ref-list': { source: 'iana' },
    'text/html': { source: 'iana', compressible: !0, extensions: ['html', 'htm', 'shtml'] },
    'text/jade': { extensions: ['jade'] },
    'text/javascript': { source: 'iana', compressible: !0 },
    'text/jcr-cnd': { source: 'iana' },
    'text/jsx': { compressible: !0, extensions: ['jsx'] },
    'text/less': { compressible: !0, extensions: ['less'] },
    'text/markdown': { source: 'iana', compressible: !0, extensions: ['markdown', 'md'] },
    'text/mathml': { source: 'nginx', extensions: ['mml'] },
    'text/mdx': { compressible: !0, extensions: ['mdx'] },
    'text/mizar': { source: 'iana' },
    'text/n3': { source: 'iana', charset: 'UTF-8', compressible: !0, extensions: ['n3'] },
    'text/parameters': { source: 'iana', charset: 'UTF-8' },
    'text/parityfec': { source: 'iana' },
    'text/plain': {
      source: 'iana',
      compressible: !0,
      extensions: ['txt', 'text', 'conf', 'def', 'list', 'log', 'in', 'ini'],
    },
    'text/provenance-notation': { source: 'iana', charset: 'UTF-8' },
    'text/prs.fallenstein.rst': { source: 'iana' },
    'text/prs.lines.tag': { source: 'iana', extensions: ['dsc'] },
    'text/prs.prop.logic': { source: 'iana' },
    'text/raptorfec': { source: 'iana' },
    'text/red': { source: 'iana' },
    'text/rfc822-headers': { source: 'iana' },
    'text/richtext': { source: 'iana', compressible: !0, extensions: ['rtx'] },
    'text/rtf': { source: 'iana', compressible: !0, extensions: ['rtf'] },
    'text/rtp-enc-aescm128': { source: 'iana' },
    'text/rtploopback': { source: 'iana' },
    'text/rtx': { source: 'iana' },
    'text/sgml': { source: 'iana', extensions: ['sgml', 'sgm'] },
    'text/shaclc': { source: 'iana' },
    'text/shex': { source: 'iana', extensions: ['shex'] },
    'text/slim': { extensions: ['slim', 'slm'] },
    'text/spdx': { source: 'iana', extensions: ['spdx'] },
    'text/strings': { source: 'iana' },
    'text/stylus': { extensions: ['stylus', 'styl'] },
    'text/t140': { source: 'iana' },
    'text/tab-separated-values': { source: 'iana', compressible: !0, extensions: ['tsv'] },
    'text/troff': { source: 'iana', extensions: ['t', 'tr', 'roff', 'man', 'me', 'ms'] },
    'text/turtle': { source: 'iana', charset: 'UTF-8', extensions: ['ttl'] },
    'text/ulpfec': { source: 'iana' },
    'text/uri-list': { source: 'iana', compressible: !0, extensions: ['uri', 'uris', 'urls'] },
    'text/vcard': { source: 'iana', compressible: !0, extensions: ['vcard'] },
    'text/vnd.a': { source: 'iana' },
    'text/vnd.abc': { source: 'iana' },
    'text/vnd.ascii-art': { source: 'iana' },
    'text/vnd.curl': { source: 'iana', extensions: ['curl'] },
    'text/vnd.curl.dcurl': { source: 'apache', extensions: ['dcurl'] },
    'text/vnd.curl.mcurl': { source: 'apache', extensions: ['mcurl'] },
    'text/vnd.curl.scurl': { source: 'apache', extensions: ['scurl'] },
    'text/vnd.debian.copyright': { source: 'iana', charset: 'UTF-8' },
    'text/vnd.dmclientscript': { source: 'iana' },
    'text/vnd.dvb.subtitle': { source: 'iana', extensions: ['sub'] },
    'text/vnd.esmertec.theme-descriptor': { source: 'iana', charset: 'UTF-8' },
    'text/vnd.familysearch.gedcom': { source: 'iana', extensions: ['ged'] },
    'text/vnd.ficlab.flt': { source: 'iana' },
    'text/vnd.fly': { source: 'iana', extensions: ['fly'] },
    'text/vnd.fmi.flexstor': { source: 'iana', extensions: ['flx'] },
    'text/vnd.gml': { source: 'iana' },
    'text/vnd.graphviz': { source: 'iana', extensions: ['gv'] },
    'text/vnd.hans': { source: 'iana' },
    'text/vnd.hgl': { source: 'iana' },
    'text/vnd.in3d.3dml': { source: 'iana', extensions: ['3dml'] },
    'text/vnd.in3d.spot': { source: 'iana', extensions: ['spot'] },
    'text/vnd.iptc.newsml': { source: 'iana' },
    'text/vnd.iptc.nitf': { source: 'iana' },
    'text/vnd.latex-z': { source: 'iana' },
    'text/vnd.motorola.reflex': { source: 'iana' },
    'text/vnd.ms-mediapackage': { source: 'iana' },
    'text/vnd.net2phone.commcenter.command': { source: 'iana' },
    'text/vnd.radisys.msml-basic-layout': { source: 'iana' },
    'text/vnd.senx.warpscript': { source: 'iana' },
    'text/vnd.si.uricatalogue': { source: 'iana' },
    'text/vnd.sosi': { source: 'iana' },
    'text/vnd.sun.j2me.app-descriptor': { source: 'iana', charset: 'UTF-8', extensions: ['jad'] },
    'text/vnd.trolltech.linguist': { source: 'iana', charset: 'UTF-8' },
    'text/vnd.wap.si': { source: 'iana' },
    'text/vnd.wap.sl': { source: 'iana' },
    'text/vnd.wap.wml': { source: 'iana', extensions: ['wml'] },
    'text/vnd.wap.wmlscript': { source: 'iana', extensions: ['wmls'] },
    'text/vtt': { source: 'iana', charset: 'UTF-8', compressible: !0, extensions: ['vtt'] },
    'text/x-asm': { source: 'apache', extensions: ['s', 'asm'] },
    'text/x-c': { source: 'apache', extensions: ['c', 'cc', 'cxx', 'cpp', 'h', 'hh', 'dic'] },
    'text/x-component': { source: 'nginx', extensions: ['htc'] },
    'text/x-fortran': { source: 'apache', extensions: ['f', 'for', 'f77', 'f90'] },
    'text/x-gwt-rpc': { compressible: !0 },
    'text/x-handlebars-template': { extensions: ['hbs'] },
    'text/x-java-source': { source: 'apache', extensions: ['java'] },
    'text/x-jquery-tmpl': { compressible: !0 },
    'text/x-lua': { extensions: ['lua'] },
    'text/x-markdown': { compressible: !0, extensions: ['mkd'] },
    'text/x-nfo': { source: 'apache', extensions: ['nfo'] },
    'text/x-opml': { source: 'apache', extensions: ['opml'] },
    'text/x-org': { compressible: !0, extensions: ['org'] },
    'text/x-pascal': { source: 'apache', extensions: ['p', 'pas'] },
    'text/x-processing': { compressible: !0, extensions: ['pde'] },
    'text/x-sass': { extensions: ['sass'] },
    'text/x-scss': { extensions: ['scss'] },
    'text/x-setext': { source: 'apache', extensions: ['etx'] },
    'text/x-sfv': { source: 'apache', extensions: ['sfv'] },
    'text/x-suse-ymp': { compressible: !0, extensions: ['ymp'] },
    'text/x-uuencode': { source: 'apache', extensions: ['uu'] },
    'text/x-vcalendar': { source: 'apache', extensions: ['vcs'] },
    'text/x-vcard': { source: 'apache', extensions: ['vcf'] },
    'text/xml': { source: 'iana', compressible: !0, extensions: ['xml'] },
    'text/xml-external-parsed-entity': { source: 'iana' },
    'text/yaml': { compressible: !0, extensions: ['yaml', 'yml'] },
    'video/1d-interleaved-parityfec': { source: 'iana' },
    'video/3gpp': { source: 'iana', extensions: ['3gp', '3gpp'] },
    'video/3gpp-tt': { source: 'iana' },
    'video/3gpp2': { source: 'iana', extensions: ['3g2'] },
    'video/av1': { source: 'iana' },
    'video/bmpeg': { source: 'iana' },
    'video/bt656': { source: 'iana' },
    'video/celb': { source: 'iana' },
    'video/dv': { source: 'iana' },
    'video/encaprtp': { source: 'iana' },
    'video/ffv1': { source: 'iana' },
    'video/flexfec': { source: 'iana' },
    'video/h261': { source: 'iana', extensions: ['h261'] },
    'video/h263': { source: 'iana', extensions: ['h263'] },
    'video/h263-1998': { source: 'iana' },
    'video/h263-2000': { source: 'iana' },
    'video/h264': { source: 'iana', extensions: ['h264'] },
    'video/h264-rcdo': { source: 'iana' },
    'video/h264-svc': { source: 'iana' },
    'video/h265': { source: 'iana' },
    'video/iso.segment': { source: 'iana', extensions: ['m4s'] },
    'video/jpeg': { source: 'iana', extensions: ['jpgv'] },
    'video/jpeg2000': { source: 'iana' },
    'video/jpm': { source: 'apache', extensions: ['jpm', 'jpgm'] },
    'video/jxsv': { source: 'iana' },
    'video/mj2': { source: 'iana', extensions: ['mj2', 'mjp2'] },
    'video/mp1s': { source: 'iana' },
    'video/mp2p': { source: 'iana' },
    'video/mp2t': { source: 'iana', extensions: ['ts'] },
    'video/mp4': { source: 'iana', compressible: !1, extensions: ['mp4', 'mp4v', 'mpg4'] },
    'video/mp4v-es': { source: 'iana' },
    'video/mpeg': { source: 'iana', compressible: !1, extensions: ['mpeg', 'mpg', 'mpe', 'm1v', 'm2v'] },
    'video/mpeg4-generic': { source: 'iana' },
    'video/mpv': { source: 'iana' },
    'video/nv': { source: 'iana' },
    'video/ogg': { source: 'iana', compressible: !1, extensions: ['ogv'] },
    'video/parityfec': { source: 'iana' },
    'video/pointer': { source: 'iana' },
    'video/quicktime': { source: 'iana', compressible: !1, extensions: ['qt', 'mov'] },
    'video/raptorfec': { source: 'iana' },
    'video/raw': { source: 'iana' },
    'video/rtp-enc-aescm128': { source: 'iana' },
    'video/rtploopback': { source: 'iana' },
    'video/rtx': { source: 'iana' },
    'video/scip': { source: 'iana' },
    'video/smpte291': { source: 'iana' },
    'video/smpte292m': { source: 'iana' },
    'video/ulpfec': { source: 'iana' },
    'video/vc1': { source: 'iana' },
    'video/vc2': { source: 'iana' },
    'video/vnd.cctv': { source: 'iana' },
    'video/vnd.dece.hd': { source: 'iana', extensions: ['uvh', 'uvvh'] },
    'video/vnd.dece.mobile': { source: 'iana', extensions: ['uvm', 'uvvm'] },
    'video/vnd.dece.mp4': { source: 'iana' },
    'video/vnd.dece.pd': { source: 'iana', extensions: ['uvp', 'uvvp'] },
    'video/vnd.dece.sd': { source: 'iana', extensions: ['uvs', 'uvvs'] },
    'video/vnd.dece.video': { source: 'iana', extensions: ['uvv', 'uvvv'] },
    'video/vnd.directv.mpeg': { source: 'iana' },
    'video/vnd.directv.mpeg-tts': { source: 'iana' },
    'video/vnd.dlna.mpeg-tts': { source: 'iana' },
    'video/vnd.dvb.file': { source: 'iana', extensions: ['dvb'] },
    'video/vnd.fvt': { source: 'iana', extensions: ['fvt'] },
    'video/vnd.hns.video': { source: 'iana' },
    'video/vnd.iptvforum.1dparityfec-1010': { source: 'iana' },
    'video/vnd.iptvforum.1dparityfec-2005': { source: 'iana' },
    'video/vnd.iptvforum.2dparityfec-1010': { source: 'iana' },
    'video/vnd.iptvforum.2dparityfec-2005': { source: 'iana' },
    'video/vnd.iptvforum.ttsavc': { source: 'iana' },
    'video/vnd.iptvforum.ttsmpeg2': { source: 'iana' },
    'video/vnd.motorola.video': { source: 'iana' },
    'video/vnd.motorola.videop': { source: 'iana' },
    'video/vnd.mpegurl': { source: 'iana', extensions: ['mxu', 'm4u'] },
    'video/vnd.ms-playready.media.pyv': { source: 'iana', extensions: ['pyv'] },
    'video/vnd.nokia.interleaved-multimedia': { source: 'iana' },
    'video/vnd.nokia.mp4vr': { source: 'iana' },
    'video/vnd.nokia.videovoip': { source: 'iana' },
    'video/vnd.objectvideo': { source: 'iana' },
    'video/vnd.radgamettools.bink': { source: 'iana' },
    'video/vnd.radgamettools.smacker': { source: 'iana' },
    'video/vnd.sealed.mpeg1': { source: 'iana' },
    'video/vnd.sealed.mpeg4': { source: 'iana' },
    'video/vnd.sealed.swf': { source: 'iana' },
    'video/vnd.sealedmedia.softseal.mov': { source: 'iana' },
    'video/vnd.uvvu.mp4': { source: 'iana', extensions: ['uvu', 'uvvu'] },
    'video/vnd.vivo': { source: 'iana', extensions: ['viv'] },
    'video/vnd.youtube.yt': { source: 'iana' },
    'video/vp8': { source: 'iana' },
    'video/vp9': { source: 'iana' },
    'video/webm': { source: 'apache', compressible: !1, extensions: ['webm'] },
    'video/x-f4v': { source: 'apache', extensions: ['f4v'] },
    'video/x-fli': { source: 'apache', extensions: ['fli'] },
    'video/x-flv': { source: 'apache', compressible: !1, extensions: ['flv'] },
    'video/x-m4v': { source: 'apache', extensions: ['m4v'] },
    'video/x-matroska': { source: 'apache', compressible: !1, extensions: ['mkv', 'mk3d', 'mks'] },
    'video/x-mng': { source: 'apache', extensions: ['mng'] },
    'video/x-ms-asf': { source: 'apache', extensions: ['asf', 'asx'] },
    'video/x-ms-vob': { source: 'apache', extensions: ['vob'] },
    'video/x-ms-wm': { source: 'apache', extensions: ['wm'] },
    'video/x-ms-wmv': { source: 'apache', compressible: !1, extensions: ['wmv'] },
    'video/x-ms-wmx': { source: 'apache', extensions: ['wmx'] },
    'video/x-ms-wvx': { source: 'apache', extensions: ['wvx'] },
    'video/x-msvideo': { source: 'apache', extensions: ['avi'] },
    'video/x-sgi-movie': { source: 'apache', extensions: ['movie'] },
    'video/x-smv': { source: 'apache', extensions: ['smv'] },
    'x-conference/x-cooltalk': { source: 'apache', extensions: ['ice'] },
    'x-shader/x-fragment': { compressible: !0 },
    'x-shader/x-vertex': { compressible: !0 },
  };
});
var Ad = y((bL, Ld) => {
  'use strict';
  Ld.exports = kd();
});
var Pd = y((Pe) => {
  'use strict';
  var Tr = Ad(),
    yE = require('path').extname,
    Dd = /^\s*([^;\s]*)(?:;|\s|$)/,
    bE = /^text\//i;
  Pe.charset = Fd;
  Pe.charsets = { lookup: Fd };
  Pe.contentType = gE;
  Pe.extension = _E;
  Pe.extensions = Object.create(null);
  Pe.lookup = EE;
  Pe.types = Object.create(null);
  wE(Pe.extensions, Pe.types);
  function Fd(t) {
    if (!t || typeof t != 'string') return !1;
    var e = Dd.exec(t),
      i = e && Tr[e[1].toLowerCase()];
    return i && i.charset ? i.charset : e && bE.test(e[1]) ? 'UTF-8' : !1;
  }
  function gE(t) {
    if (!t || typeof t != 'string') return !1;
    var e = t.indexOf('/') === -1 ? Pe.lookup(t) : t;
    if (!e) return !1;
    if (e.indexOf('charset') === -1) {
      var i = Pe.charset(e);
      i && (e += '; charset=' + i.toLowerCase());
    }
    return e;
  }
  function _E(t) {
    if (!t || typeof t != 'string') return !1;
    var e = Dd.exec(t),
      i = e && Pe.extensions[e[1].toLowerCase()];
    return !i || !i.length ? !1 : i[0];
  }
  function EE(t) {
    if (!t || typeof t != 'string') return !1;
    var e = yE('x.' + t)
      .toLowerCase()
      .substr(1);
    return (e && Pe.types[e]) || !1;
  }
  function wE(t, e) {
    var i = ['nginx', 'apache', void 0, 'iana'];
    Object.keys(Tr).forEach(function (s) {
      var r = Tr[s],
        a = r.extensions;
      if (!(!a || !a.length)) {
        t[s] = a;
        for (var o = 0; o < a.length; o++) {
          var u = a[o];
          if (e[u]) {
            var l = i.indexOf(Tr[e[u]].source),
              c = i.indexOf(r.source);
            if (e[u] !== 'application/octet-stream' && (l > c || (l === c && e[u].substr(0, 12) === 'application/')))
              continue;
          }
          e[u] = s;
        }
      }
    });
  }
});
var Bd = y((_L, Ud) => {
  'use strict';
  Ud.exports = SE;
  function SE(t) {
    var e =
      typeof setImmediate == 'function'
        ? setImmediate
        : typeof process == 'object' && typeof process.nextTick == 'function'
        ? process.nextTick
        : null;
    e ? e(t) : setTimeout(t, 0);
  }
});
var Wo = y((EL, qd) => {
  'use strict';
  var Md = Bd();
  qd.exports = RE;
  function RE(t) {
    var e = !1;
    return (
      Md(function () {
        e = !0;
      }),
      function (n, s) {
        e
          ? t(n, s)
          : Md(function () {
              t(n, s);
            });
      }
    );
  }
});
var Vo = y((wL, jd) => {
  'use strict';
  jd.exports = TE;
  function TE(t) {
    Object.keys(t.jobs).forEach(OE.bind(t)), (t.jobs = {});
  }
  function OE(t) {
    typeof this.jobs[t] == 'function' && this.jobs[t]();
  }
});
var Ko = y((SL, Gd) => {
  'use strict';
  var zd = Wo(),
    CE = Vo();
  Gd.exports = IE;
  function IE(t, e, i, n) {
    var s = i.keyedList ? i.keyedList[i.index] : i.index;
    i.jobs[s] = NE(e, s, t[s], function (r, a) {
      s in i.jobs && (delete i.jobs[s], r ? CE(i) : (i.results[s] = a), n(r, i.results));
    });
  }
  function NE(t, e, i, n) {
    var s;
    return t.length == 2 ? (s = t(i, zd(n))) : (s = t(i, e, zd(n))), s;
  }
});
var Xo = y((RL, Hd) => {
  'use strict';
  Hd.exports = kE;
  function kE(t, e) {
    var i = !Array.isArray(t),
      n = {
        index: 0,
        keyedList: i || e ? Object.keys(t) : null,
        jobs: {},
        results: i ? {} : [],
        size: i ? Object.keys(t).length : t.length,
      };
    return (
      e &&
        n.keyedList.sort(
          i
            ? e
            : function (s, r) {
                return e(t[s], t[r]);
              }
        ),
      n
    );
  }
});
var Yo = y((TL, $d) => {
  'use strict';
  var LE = Vo(),
    AE = Wo();
  $d.exports = DE;
  function DE(t) {
    Object.keys(this.jobs).length && ((this.index = this.size), LE(this), AE(t)(null, this.results));
  }
});
var Vd = y((OL, Wd) => {
  'use strict';
  var FE = Ko(),
    PE = Xo(),
    UE = Yo();
  Wd.exports = BE;
  function BE(t, e, i) {
    for (var n = PE(t); n.index < (n.keyedList || t).length; )
      FE(t, e, n, function (s, r) {
        if (s) {
          i(s, r);
          return;
        }
        if (Object.keys(n.jobs).length === 0) {
          i(null, n.results);
          return;
        }
      }),
        n.index++;
    return UE.bind(n, i);
  }
});
var Jo = y((CL, Or) => {
  'use strict';
  var Kd = Ko(),
    ME = Xo(),
    qE = Yo();
  Or.exports = jE;
  Or.exports.ascending = Xd;
  Or.exports.descending = zE;
  function jE(t, e, i, n) {
    var s = ME(t, i);
    return (
      Kd(t, e, s, function r(a, o) {
        if (a) {
          n(a, o);
          return;
        }
        if ((s.index++, s.index < (s.keyedList || t).length)) {
          Kd(t, e, s, r);
          return;
        }
        n(null, s.results);
      }),
      qE.bind(s, n)
    );
  }
  function Xd(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
  }
  function zE(t, e) {
    return -1 * Xd(t, e);
  }
});
var Jd = y((IL, Yd) => {
  'use strict';
  var GE = Jo();
  Yd.exports = HE;
  function HE(t, e, i) {
    return GE(t, e, null, i);
  }
});
var Qd = y((NL, Zd) => {
  'use strict';
  Zd.exports = { parallel: Vd(), serial: Jd(), serialOrdered: Jo() };
});
var th = y((kL, eh) => {
  'use strict';
  eh.exports = function (t, e) {
    return (
      Object.keys(e).forEach(function (i) {
        t[i] = t[i] || e[i];
      }),
      t
    );
  };
});
var sh = y((LL, nh) => {
  'use strict';
  var tc = Nd(),
    ih = require('util'),
    Zo = require('path'),
    $E = require('http'),
    WE = require('https'),
    VE = require('url').parse,
    KE = require('fs'),
    XE = require('stream').Stream,
    Qo = Pd(),
    YE = Qd(),
    ec = th();
  nh.exports = $;
  ih.inherits($, tc);
  function $(t) {
    if (!(this instanceof $)) return new $(t);
    (this._overheadLength = 0), (this._valueLength = 0), (this._valuesToMeasure = []), tc.call(this), (t = t || {});
    for (var e in t) this[e] = t[e];
  }
  $.LINE_BREAK = `\r
`;
  $.DEFAULT_CONTENT_TYPE = 'application/octet-stream';
  $.prototype.append = function (t, e, i) {
    (i = i || {}), typeof i == 'string' && (i = { filename: i });
    var n = tc.prototype.append.bind(this);
    if ((typeof e == 'number' && (e = '' + e), ih.isArray(e))) {
      this._error(new Error('Arrays are not supported.'));
      return;
    }
    var s = this._multiPartHeader(t, e, i),
      r = this._multiPartFooter();
    n(s), n(e), n(r), this._trackLength(s, e, i);
  };
  $.prototype._trackLength = function (t, e, i) {
    var n = 0;
    i.knownLength != null
      ? (n += +i.knownLength)
      : Buffer.isBuffer(e)
      ? (n = e.length)
      : typeof e == 'string' && (n = Buffer.byteLength(e)),
      (this._valueLength += n),
      (this._overheadLength += Buffer.byteLength(t) + $.LINE_BREAK.length),
      !(!e || (!e.path && !(e.readable && e.hasOwnProperty('httpVersion')) && !(e instanceof XE))) &&
        (i.knownLength || this._valuesToMeasure.push(e));
  };
  $.prototype._lengthRetriever = function (t, e) {
    t.hasOwnProperty('fd')
      ? t.end != null && t.end != 1 / 0 && t.start != null
        ? e(null, t.end + 1 - (t.start ? t.start : 0))
        : KE.stat(t.path, function (i, n) {
            var s;
            if (i) {
              e(i);
              return;
            }
            (s = n.size - (t.start ? t.start : 0)), e(null, s);
          })
      : t.hasOwnProperty('httpVersion')
      ? e(null, +t.headers['content-length'])
      : t.hasOwnProperty('httpModule')
      ? (t.on('response', function (i) {
          t.pause(), e(null, +i.headers['content-length']);
        }),
        t.resume())
      : e('Unknown stream');
  };
  $.prototype._multiPartHeader = function (t, e, i) {
    if (typeof i.header == 'string') return i.header;
    var n = this._getContentDisposition(e, i),
      s = this._getContentType(e, i),
      r = '',
      a = {
        'Content-Disposition': ['form-data', 'name="' + t + '"'].concat(n || []),
        'Content-Type': [].concat(s || []),
      };
    typeof i.header == 'object' && ec(a, i.header);
    var o;
    for (var u in a)
      a.hasOwnProperty(u) &&
        ((o = a[u]),
        o != null && (Array.isArray(o) || (o = [o]), o.length && (r += u + ': ' + o.join('; ') + $.LINE_BREAK)));
    return '--' + this.getBoundary() + $.LINE_BREAK + r + $.LINE_BREAK;
  };
  $.prototype._getContentDisposition = function (t, e) {
    var i, n;
    return (
      typeof e.filepath == 'string'
        ? (i = Zo.normalize(e.filepath).replace(/\\/g, '/'))
        : e.filename || t.name || t.path
        ? (i = Zo.basename(e.filename || t.name || t.path))
        : t.readable && t.hasOwnProperty('httpVersion') && (i = Zo.basename(t.client._httpMessage.path || '')),
      i && (n = 'filename="' + i + '"'),
      n
    );
  };
  $.prototype._getContentType = function (t, e) {
    var i = e.contentType;
    return (
      !i && t.name && (i = Qo.lookup(t.name)),
      !i && t.path && (i = Qo.lookup(t.path)),
      !i && t.readable && t.hasOwnProperty('httpVersion') && (i = t.headers['content-type']),
      !i && (e.filepath || e.filename) && (i = Qo.lookup(e.filepath || e.filename)),
      !i && typeof t == 'object' && (i = $.DEFAULT_CONTENT_TYPE),
      i
    );
  };
  $.prototype._multiPartFooter = function () {
    return function (t) {
      var e = $.LINE_BREAK,
        i = this._streams.length === 0;
      i && (e += this._lastBoundary()), t(e);
    }.bind(this);
  };
  $.prototype._lastBoundary = function () {
    return '--' + this.getBoundary() + '--' + $.LINE_BREAK;
  };
  $.prototype.getHeaders = function (t) {
    var e,
      i = { 'content-type': 'multipart/form-data; boundary=' + this.getBoundary() };
    for (e in t) t.hasOwnProperty(e) && (i[e.toLowerCase()] = t[e]);
    return i;
  };
  $.prototype.setBoundary = function (t) {
    this._boundary = t;
  };
  $.prototype.getBoundary = function () {
    return this._boundary || this._generateBoundary(), this._boundary;
  };
  $.prototype.getBuffer = function () {
    for (var t = new Buffer.alloc(0), e = this.getBoundary(), i = 0, n = this._streams.length; i < n; i++)
      typeof this._streams[i] != 'function' &&
        (Buffer.isBuffer(this._streams[i])
          ? (t = Buffer.concat([t, this._streams[i]]))
          : (t = Buffer.concat([t, Buffer.from(this._streams[i])])),
        (typeof this._streams[i] != 'string' || this._streams[i].substring(2, e.length + 2) !== e) &&
          (t = Buffer.concat([t, Buffer.from($.LINE_BREAK)])));
    return Buffer.concat([t, Buffer.from(this._lastBoundary())]);
  };
  $.prototype._generateBoundary = function () {
    for (var t = '--------------------------', e = 0; e < 24; e++) t += Math.floor(Math.random() * 10).toString(16);
    this._boundary = t;
  };
  $.prototype.getLengthSync = function () {
    var t = this._overheadLength + this._valueLength;
    return (
      this._streams.length && (t += this._lastBoundary().length),
      this.hasKnownLength() || this._error(new Error('Cannot calculate proper length in synchronous way.')),
      t
    );
  };
  $.prototype.hasKnownLength = function () {
    var t = !0;
    return this._valuesToMeasure.length && (t = !1), t;
  };
  $.prototype.getLength = function (t) {
    var e = this._overheadLength + this._valueLength;
    if ((this._streams.length && (e += this._lastBoundary().length), !this._valuesToMeasure.length)) {
      process.nextTick(t.bind(this, null, e));
      return;
    }
    YE.parallel(this._valuesToMeasure, this._lengthRetriever, function (i, n) {
      if (i) {
        t(i);
        return;
      }
      n.forEach(function (s) {
        e += s;
      }),
        t(null, e);
    });
  };
  $.prototype.submit = function (t, e) {
    var i,
      n,
      s = { method: 'post' };
    return (
      typeof t == 'string'
        ? ((t = VE(t)), (n = ec({ port: t.port, path: t.pathname, host: t.hostname, protocol: t.protocol }, s)))
        : ((n = ec(t, s)), n.port || (n.port = n.protocol == 'https:' ? 443 : 80)),
      (n.headers = this.getHeaders(t.headers)),
      n.protocol == 'https:' ? (i = WE.request(n)) : (i = $E.request(n)),
      this.getLength(
        function (r, a) {
          if (r && r !== 'Unknown stream') {
            this._error(r);
            return;
          }
          if ((a && i.setHeader('Content-Length', a), this.pipe(i), e)) {
            var o,
              u = function (l, c) {
                return i.removeListener('error', u), i.removeListener('response', o), e.call(this, l, c);
              };
            (o = u.bind(this, null)), i.on('error', u), i.on('response', o);
          }
        }.bind(this)
      ),
      i
    );
  };
  $.prototype._error = function (t) {
    this.error || ((this.error = t), this.pause(), this.emit('error', t));
  };
  $.prototype.toString = function () {
    return '[object FormData]';
  };
});
var ah = y((rh) => {
  'use strict';
  var JE = require('url').parse,
    ZE = { ftp: 21, gopher: 70, http: 80, https: 443, ws: 80, wss: 443 },
    QE =
      String.prototype.endsWith ||
      function (t) {
        return t.length <= this.length && this.indexOf(t, this.length - t.length) !== -1;
      };
  function ew(t) {
    var e = typeof t == 'string' ? JE(t) : t || {},
      i = e.protocol,
      n = e.host,
      s = e.port;
    if (
      typeof n != 'string' ||
      !n ||
      typeof i != 'string' ||
      ((i = i.split(':', 1)[0]), (n = n.replace(/:\d*$/, '')), (s = parseInt(s) || ZE[i] || 0), !tw(n, s))
    )
      return '';
    var r = ln('npm_config_' + i + '_proxy') || ln(i + '_proxy') || ln('npm_config_proxy') || ln('all_proxy');
    return r && r.indexOf('://') === -1 && (r = i + '://' + r), r;
  }
  function tw(t, e) {
    var i = (ln('npm_config_no_proxy') || ln('no_proxy')).toLowerCase();
    return i
      ? i === '*'
        ? !1
        : i.split(/[,\s]/).every(function (n) {
            if (!n) return !0;
            var s = n.match(/^(.+):(\d+)$/),
              r = s ? s[1] : n,
              a = s ? parseInt(s[2]) : 0;
            return a && a !== e
              ? !0
              : /^[.*]/.test(r)
              ? (r.charAt(0) === '*' && (r = r.slice(1)), !QE.call(t, r))
              : t !== r;
          })
      : !0;
  }
  function ln(t) {
    return process.env[t.toLowerCase()] || process.env[t.toUpperCase()] || '';
  }
  rh.getProxyForUrl = ew;
});
var ch = y((DL, oh) => {
  'use strict';
  var un = 1e3,
    pn = un * 60,
    dn = pn * 60,
    Ai = dn * 24,
    iw = Ai * 7,
    nw = Ai * 365.25;
  oh.exports = function (t, e) {
    e = e || {};
    var i = typeof t;
    if (i === 'string' && t.length > 0) return sw(t);
    if (i === 'number' && isFinite(t)) return e.long ? aw(t) : rw(t);
    throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(t));
  };
  function sw(t) {
    if (((t = String(t)), !(t.length > 100))) {
      var e =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          t
        );
      if (e) {
        var i = parseFloat(e[1]),
          n = (e[2] || 'ms').toLowerCase();
        switch (n) {
          case 'years':
          case 'year':
          case 'yrs':
          case 'yr':
          case 'y':
            return i * nw;
          case 'weeks':
          case 'week':
          case 'w':
            return i * iw;
          case 'days':
          case 'day':
          case 'd':
            return i * Ai;
          case 'hours':
          case 'hour':
          case 'hrs':
          case 'hr':
          case 'h':
            return i * dn;
          case 'minutes':
          case 'minute':
          case 'mins':
          case 'min':
          case 'm':
            return i * pn;
          case 'seconds':
          case 'second':
          case 'secs':
          case 'sec':
          case 's':
            return i * un;
          case 'milliseconds':
          case 'millisecond':
          case 'msecs':
          case 'msec':
          case 'ms':
            return i;
          default:
            return;
        }
      }
    }
  }
  function rw(t) {
    var e = Math.abs(t);
    return e >= Ai
      ? Math.round(t / Ai) + 'd'
      : e >= dn
      ? Math.round(t / dn) + 'h'
      : e >= pn
      ? Math.round(t / pn) + 'm'
      : e >= un
      ? Math.round(t / un) + 's'
      : t + 'ms';
  }
  function aw(t) {
    var e = Math.abs(t);
    return e >= Ai
      ? Cr(t, e, Ai, 'day')
      : e >= dn
      ? Cr(t, e, dn, 'hour')
      : e >= pn
      ? Cr(t, e, pn, 'minute')
      : e >= un
      ? Cr(t, e, un, 'second')
      : t + ' ms';
  }
  function Cr(t, e, i, n) {
    var s = e >= i * 1.5;
    return Math.round(t / i) + ' ' + n + (s ? 's' : '');
  }
});
var ic = y((FL, lh) => {
  'use strict';
  function ow(t) {
    (i.debug = i),
      (i.default = i),
      (i.coerce = u),
      (i.disable = r),
      (i.enable = s),
      (i.enabled = a),
      (i.humanize = ch()),
      (i.destroy = l),
      Object.keys(t).forEach((c) => {
        i[c] = t[c];
      }),
      (i.names = []),
      (i.skips = []),
      (i.formatters = {});
    function e(c) {
      let p = 0;
      for (let d = 0; d < c.length; d++) (p = (p << 5) - p + c.charCodeAt(d)), (p |= 0);
      return i.colors[Math.abs(p) % i.colors.length];
    }
    i.selectColor = e;
    function i(c) {
      let p,
        d = null,
        f,
        h;
      function m(...b) {
        if (!m.enabled) return;
        let v = m,
          E = Number(new Date()),
          g = E - (p || E);
        (v.diff = g),
          (v.prev = p),
          (v.curr = E),
          (p = E),
          (b[0] = i.coerce(b[0])),
          typeof b[0] != 'string' && b.unshift('%O');
        let N = 0;
        (b[0] = b[0].replace(/%([a-zA-Z%])/g, (O, W) => {
          if (O === '%%') return '%';
          N++;
          let U = i.formatters[W];
          if (typeof U == 'function') {
            let R = b[N];
            (O = U.call(v, R)), b.splice(N, 1), N--;
          }
          return O;
        })),
          i.formatArgs.call(v, b),
          (v.log || i.log).apply(v, b);
      }
      return (
        (m.namespace = c),
        (m.useColors = i.useColors()),
        (m.color = i.selectColor(c)),
        (m.extend = n),
        (m.destroy = i.destroy),
        Object.defineProperty(m, 'enabled', {
          enumerable: !0,
          configurable: !1,
          get: () => (d !== null ? d : (f !== i.namespaces && ((f = i.namespaces), (h = i.enabled(c))), h)),
          set: (b) => {
            d = b;
          },
        }),
        typeof i.init == 'function' && i.init(m),
        m
      );
    }
    function n(c, p) {
      let d = i(this.namespace + (typeof p > 'u' ? ':' : p) + c);
      return (d.log = this.log), d;
    }
    function s(c) {
      i.save(c), (i.namespaces = c), (i.names = []), (i.skips = []);
      let p,
        d = (typeof c == 'string' ? c : '').split(/[\s,]+/),
        f = d.length;
      for (p = 0; p < f; p++)
        d[p] &&
          ((c = d[p].replace(/\*/g, '.*?')),
          c[0] === '-' ? i.skips.push(new RegExp('^' + c.slice(1) + '$')) : i.names.push(new RegExp('^' + c + '$')));
    }
    function r() {
      let c = [...i.names.map(o), ...i.skips.map(o).map((p) => '-' + p)].join(',');
      return i.enable(''), c;
    }
    function a(c) {
      if (c[c.length - 1] === '*') return !0;
      let p, d;
      for (p = 0, d = i.skips.length; p < d; p++) if (i.skips[p].test(c)) return !1;
      for (p = 0, d = i.names.length; p < d; p++) if (i.names[p].test(c)) return !0;
      return !1;
    }
    function o(c) {
      return c
        .toString()
        .substring(2, c.toString().length - 2)
        .replace(/\.\*\?$/, '*');
    }
    function u(c) {
      return c instanceof Error ? c.stack || c.message : c;
    }
    function l() {
      console.warn(
        'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
      );
    }
    return i.enable(i.load()), i;
  }
  lh.exports = ow;
});
var uh = y((Ge, Ir) => {
  'use strict';
  Ge.formatArgs = lw;
  Ge.save = uw;
  Ge.load = pw;
  Ge.useColors = cw;
  Ge.storage = dw();
  Ge.destroy = (() => {
    let t = !1;
    return () => {
      t ||
        ((t = !0),
        console.warn(
          'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
        ));
    };
  })();
  Ge.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33',
  ];
  function cw() {
    return typeof window < 'u' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)
      ? !0
      : typeof navigator < 'u' &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ? !1
      : (typeof document < 'u' &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window < 'u' &&
          window.console &&
          (window.console.firebug || (window.console.exception && window.console.table))) ||
        (typeof navigator < 'u' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator < 'u' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }
  function lw(t) {
    if (
      ((t[0] =
        (this.useColors ? '%c' : '') +
        this.namespace +
        (this.useColors ? ' %c' : ' ') +
        t[0] +
        (this.useColors ? '%c ' : ' ') +
        '+' +
        Ir.exports.humanize(this.diff)),
      !this.useColors)
    )
      return;
    let e = 'color: ' + this.color;
    t.splice(1, 0, e, 'color: inherit');
    let i = 0,
      n = 0;
    t[0].replace(/%[a-zA-Z%]/g, (s) => {
      s !== '%%' && (i++, s === '%c' && (n = i));
    }),
      t.splice(n, 0, e);
  }
  Ge.log = console.debug || console.log || (() => {});
  function uw(t) {
    try {
      t ? Ge.storage.setItem('debug', t) : Ge.storage.removeItem('debug');
    } catch {}
  }
  function pw() {
    let t;
    try {
      t = Ge.storage.getItem('debug');
    } catch {}
    return !t && typeof process < 'u' && 'env' in process && (t = process.env.DEBUG), t;
  }
  function dw() {
    try {
      return localStorage;
    } catch {}
  }
  Ir.exports = ic()(Ge);
  var { formatters: hw } = Ir.exports;
  hw.j = function (t) {
    try {
      return JSON.stringify(t);
    } catch (e) {
      return '[UnexpectedJSONParseError]: ' + e.message;
    }
  };
});
var dh = y((PL, ph) => {
  'use strict';
  ph.exports = (t, e = process.argv) => {
    let i = t.startsWith('-') ? '' : t.length === 1 ? '-' : '--',
      n = e.indexOf(i + t),
      s = e.indexOf('--');
    return n !== -1 && (s === -1 || n < s);
  };
});
var mh = y((UL, fh) => {
  'use strict';
  var fw = require('os'),
    hh = require('tty'),
    Ke = dh(),
    { env: he } = process,
    ii;
  Ke('no-color') || Ke('no-colors') || Ke('color=false') || Ke('color=never')
    ? (ii = 0)
    : (Ke('color') || Ke('colors') || Ke('color=true') || Ke('color=always')) && (ii = 1);
  'FORCE_COLOR' in he &&
    (he.FORCE_COLOR === 'true'
      ? (ii = 1)
      : he.FORCE_COLOR === 'false'
      ? (ii = 0)
      : (ii = he.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(he.FORCE_COLOR, 10), 3)));
  function nc(t) {
    return t === 0 ? !1 : { level: t, hasBasic: !0, has256: t >= 2, has16m: t >= 3 };
  }
  function sc(t, e) {
    if (ii === 0) return 0;
    if (Ke('color=16m') || Ke('color=full') || Ke('color=truecolor')) return 3;
    if (Ke('color=256')) return 2;
    if (t && !e && ii === void 0) return 0;
    let i = ii || 0;
    if (he.TERM === 'dumb') return i;
    if (process.platform === 'win32') {
      let n = fw.release().split('.');
      return Number(n[0]) >= 10 && Number(n[2]) >= 10586 ? (Number(n[2]) >= 14931 ? 3 : 2) : 1;
    }
    if ('CI' in he)
      return ['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some((n) => n in he) ||
        he.CI_NAME === 'codeship'
        ? 1
        : i;
    if ('TEAMCITY_VERSION' in he) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(he.TEAMCITY_VERSION) ? 1 : 0;
    if (he.COLORTERM === 'truecolor') return 3;
    if ('TERM_PROGRAM' in he) {
      let n = parseInt((he.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
      switch (he.TERM_PROGRAM) {
        case 'iTerm.app':
          return n >= 3 ? 3 : 2;
        case 'Apple_Terminal':
          return 2;
      }
    }
    return /-256(color)?$/i.test(he.TERM)
      ? 2
      : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(he.TERM) || 'COLORTERM' in he
      ? 1
      : i;
  }
  function mw(t) {
    let e = sc(t, t && t.isTTY);
    return nc(e);
  }
  fh.exports = { supportsColor: mw, stdout: nc(sc(!0, hh.isatty(1))), stderr: nc(sc(!0, hh.isatty(2))) };
});
var vh = y((ge, kr) => {
  'use strict';
  var xw = require('tty'),
    Nr = require('util');
  ge.init = ww;
  ge.log = gw;
  ge.formatArgs = yw;
  ge.save = _w;
  ge.load = Ew;
  ge.useColors = vw;
  ge.destroy = Nr.deprecate(() => {},
  'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  ge.colors = [6, 2, 3, 4, 5, 1];
  try {
    let t = mh();
    t &&
      (t.stderr || t).level >= 2 &&
      (ge.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81,
        92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170,
        171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214,
        215, 220, 221,
      ]);
  } catch {}
  ge.inspectOpts = Object.keys(process.env)
    .filter((t) => /^debug_/i.test(t))
    .reduce((t, e) => {
      let i = e
          .substring(6)
          .toLowerCase()
          .replace(/_([a-z])/g, (s, r) => r.toUpperCase()),
        n = process.env[e];
      return (
        /^(yes|on|true|enabled)$/i.test(n)
          ? (n = !0)
          : /^(no|off|false|disabled)$/i.test(n)
          ? (n = !1)
          : n === 'null'
          ? (n = null)
          : (n = Number(n)),
        (t[i] = n),
        t
      );
    }, {});
  function vw() {
    return 'colors' in ge.inspectOpts ? !!ge.inspectOpts.colors : xw.isatty(process.stderr.fd);
  }
  function yw(t) {
    let { namespace: e, useColors: i } = this;
    if (i) {
      let n = this.color,
        s = '\x1B[3' + (n < 8 ? n : '8;5;' + n),
        r = `  ${s};1m${e} \x1B[0m`;
      (t[0] =
        r +
        t[0]
          .split(
            `
`
          )
          .join(
            `
` + r
          )),
        t.push(s + 'm+' + kr.exports.humanize(this.diff) + '\x1B[0m');
    } else t[0] = bw() + e + ' ' + t[0];
  }
  function bw() {
    return ge.inspectOpts.hideDate ? '' : new Date().toISOString() + ' ';
  }
  function gw(...t) {
    return process.stderr.write(
      Nr.format(...t) +
        `
`
    );
  }
  function _w(t) {
    t ? (process.env.DEBUG = t) : delete process.env.DEBUG;
  }
  function Ew() {
    return process.env.DEBUG;
  }
  function ww(t) {
    t.inspectOpts = {};
    let e = Object.keys(ge.inspectOpts);
    for (let i = 0; i < e.length; i++) t.inspectOpts[e[i]] = ge.inspectOpts[e[i]];
  }
  kr.exports = ic()(ge);
  var { formatters: xh } = kr.exports;
  xh.o = function (t) {
    return (
      (this.inspectOpts.colors = this.useColors),
      Nr.inspect(t, this.inspectOpts)
        .split(
          `
`
        )
        .map((e) => e.trim())
        .join(' ')
    );
  };
  xh.O = function (t) {
    return (this.inspectOpts.colors = this.useColors), Nr.inspect(t, this.inspectOpts);
  };
});
var yh = y((BL, rc) => {
  'use strict';
  typeof process > 'u' || process.type === 'renderer' || process.browser === !0 || process.__nwjs
    ? (rc.exports = uh())
    : (rc.exports = vh());
});
var gh = y((ML, bh) => {
  'use strict';
  var fs;
  bh.exports = function () {
    if (!fs) {
      try {
        fs = yh()('follow-redirects');
      } catch {}
      typeof fs != 'function' && (fs = function () {});
    }
    fs.apply(null, arguments);
  };
});
var Rh = y((qL, vc) => {
  'use strict';
  var vs = require('url'),
    ms = vs.URL,
    Sw = require('http'),
    Rw = require('https'),
    uc = require('stream').Writable,
    pc = require('assert'),
    _h = gh(),
    dc = !1;
  try {
    pc(new ms());
  } catch (t) {
    dc = t.code === 'ERR_INVALID_URL';
  }
  var Tw = ['auth', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'hash'],
    hc = ['abort', 'aborted', 'connect', 'error', 'socket', 'timeout'],
    fc = Object.create(null);
  hc.forEach(function (t) {
    fc[t] = function (e, i, n) {
      this._redirectable.emit(t, e, i, n);
    };
  });
  var oc = ys('ERR_INVALID_URL', 'Invalid URL', TypeError),
    cc = ys('ERR_FR_REDIRECTION_FAILURE', 'Redirected request failed'),
    Ow = ys('ERR_FR_TOO_MANY_REDIRECTS', 'Maximum number of redirects exceeded', cc),
    Cw = ys('ERR_FR_MAX_BODY_LENGTH_EXCEEDED', 'Request body larger than maxBodyLength limit'),
    Iw = ys('ERR_STREAM_WRITE_AFTER_END', 'write after end'),
    Nw = uc.prototype.destroy || wh;
  function Ue(t, e) {
    uc.call(this),
      this._sanitizeOptions(t),
      (this._options = t),
      (this._ended = !1),
      (this._ending = !1),
      (this._redirectCount = 0),
      (this._redirects = []),
      (this._requestBodyLength = 0),
      (this._requestBodyBuffers = []),
      e && this.on('response', e);
    var i = this;
    (this._onNativeResponse = function (n) {
      try {
        i._processResponse(n);
      } catch (s) {
        i.emit('error', s instanceof cc ? s : new cc({ cause: s }));
      }
    }),
      this._performRequest();
  }
  Ue.prototype = Object.create(uc.prototype);
  Ue.prototype.abort = function () {
    xc(this._currentRequest), this._currentRequest.abort(), this.emit('abort');
  };
  Ue.prototype.destroy = function (t) {
    return xc(this._currentRequest, t), Nw.call(this, t), this;
  };
  Ue.prototype.write = function (t, e, i) {
    if (this._ending) throw new Iw();
    if (!Di(t) && !Aw(t)) throw new TypeError('data should be a string, Buffer or Uint8Array');
    if ((xs(e) && ((i = e), (e = null)), t.length === 0)) {
      i && i();
      return;
    }
    this._requestBodyLength + t.length <= this._options.maxBodyLength
      ? ((this._requestBodyLength += t.length),
        this._requestBodyBuffers.push({ data: t, encoding: e }),
        this._currentRequest.write(t, e, i))
      : (this.emit('error', new Cw()), this.abort());
  };
  Ue.prototype.end = function (t, e, i) {
    if ((xs(t) ? ((i = t), (t = e = null)) : xs(e) && ((i = e), (e = null)), !t))
      (this._ended = this._ending = !0), this._currentRequest.end(null, null, i);
    else {
      var n = this,
        s = this._currentRequest;
      this.write(t, e, function () {
        (n._ended = !0), s.end(null, null, i);
      }),
        (this._ending = !0);
    }
  };
  Ue.prototype.setHeader = function (t, e) {
    (this._options.headers[t] = e), this._currentRequest.setHeader(t, e);
  };
  Ue.prototype.removeHeader = function (t) {
    delete this._options.headers[t], this._currentRequest.removeHeader(t);
  };
  Ue.prototype.setTimeout = function (t, e) {
    var i = this;
    function n(a) {
      a.setTimeout(t), a.removeListener('timeout', a.destroy), a.addListener('timeout', a.destroy);
    }
    function s(a) {
      i._timeout && clearTimeout(i._timeout),
        (i._timeout = setTimeout(function () {
          i.emit('timeout'), r();
        }, t)),
        n(a);
    }
    function r() {
      i._timeout && (clearTimeout(i._timeout), (i._timeout = null)),
        i.removeListener('abort', r),
        i.removeListener('error', r),
        i.removeListener('response', r),
        i.removeListener('close', r),
        e && i.removeListener('timeout', e),
        i.socket || i._currentRequest.removeListener('socket', s);
    }
    return (
      e && this.on('timeout', e),
      this.socket ? s(this.socket) : this._currentRequest.once('socket', s),
      this.on('socket', n),
      this.on('abort', r),
      this.on('error', r),
      this.on('response', r),
      this.on('close', r),
      this
    );
  };
  ['flushHeaders', 'getHeader', 'setNoDelay', 'setSocketKeepAlive'].forEach(function (t) {
    Ue.prototype[t] = function (e, i) {
      return this._currentRequest[t](e, i);
    };
  });
  ['aborted', 'connection', 'socket'].forEach(function (t) {
    Object.defineProperty(Ue.prototype, t, {
      get: function () {
        return this._currentRequest[t];
      },
    });
  });
  Ue.prototype._sanitizeOptions = function (t) {
    if (
      (t.headers || (t.headers = {}),
      t.host && (t.hostname || (t.hostname = t.host), delete t.host),
      !t.pathname && t.path)
    ) {
      var e = t.path.indexOf('?');
      e < 0 ? (t.pathname = t.path) : ((t.pathname = t.path.substring(0, e)), (t.search = t.path.substring(e)));
    }
  };
  Ue.prototype._performRequest = function () {
    var t = this._options.protocol,
      e = this._options.nativeProtocols[t];
    if (!e) throw new TypeError('Unsupported protocol ' + t);
    if (this._options.agents) {
      var i = t.slice(0, -1);
      this._options.agent = this._options.agents[i];
    }
    var n = (this._currentRequest = e.request(this._options, this._onNativeResponse));
    n._redirectable = this;
    for (var s of hc) n.on(s, fc[s]);
    if (
      ((this._currentUrl = /^\//.test(this._options.path) ? vs.format(this._options) : this._options.path),
      this._isRedirect)
    ) {
      var r = 0,
        a = this,
        o = this._requestBodyBuffers;
      (function u(l) {
        if (n === a._currentRequest)
          if (l) a.emit('error', l);
          else if (r < o.length) {
            var c = o[r++];
            n.finished || n.write(c.data, c.encoding, u);
          } else a._ended && n.end();
      })();
    }
  };
  Ue.prototype._processResponse = function (t) {
    var e = t.statusCode;
    this._options.trackRedirects && this._redirects.push({ url: this._currentUrl, headers: t.headers, statusCode: e });
    var i = t.headers.location;
    if (!i || this._options.followRedirects === !1 || e < 300 || e >= 400) {
      (t.responseUrl = this._currentUrl),
        (t.redirects = this._redirects),
        this.emit('response', t),
        (this._requestBodyBuffers = []);
      return;
    }
    if ((xc(this._currentRequest), t.destroy(), ++this._redirectCount > this._options.maxRedirects)) throw new Ow();
    var n,
      s = this._options.beforeRedirect;
    s && (n = Object.assign({ Host: t.req.getHeader('host') }, this._options.headers));
    var r = this._options.method;
    (((e === 301 || e === 302) && this._options.method === 'POST') ||
      (e === 303 && !/^(?:GET|HEAD)$/.test(this._options.method))) &&
      ((this._options.method = 'GET'), (this._requestBodyBuffers = []), ac(/^content-/i, this._options.headers));
    var a = ac(/^host$/i, this._options.headers),
      o = mc(this._currentUrl),
      u = a || o.host,
      l = /^\w+:/.test(i) ? this._currentUrl : vs.format(Object.assign(o, { host: u })),
      c = kw(i, l);
    if (
      (_h('redirecting to', c.href),
      (this._isRedirect = !0),
      lc(c, this._options),
      ((c.protocol !== o.protocol && c.protocol !== 'https:') || (c.host !== u && !Lw(c.host, u))) &&
        ac(/^(?:authorization|cookie)$/i, this._options.headers),
      xs(s))
    ) {
      var p = { headers: t.headers, statusCode: e },
        d = { url: l, method: r, headers: n };
      s(this._options, p, d), this._sanitizeOptions(this._options);
    }
    this._performRequest();
  };
  function Eh(t) {
    var e = { maxRedirects: 21, maxBodyLength: 10485760 },
      i = {};
    return (
      Object.keys(t).forEach(function (n) {
        var s = n + ':',
          r = (i[s] = t[n]),
          a = (e[n] = Object.create(r));
        function o(l, c, p) {
          return (
            Dw(l) ? (l = lc(l)) : Di(l) ? (l = lc(mc(l))) : ((p = c), (c = Sh(l)), (l = { protocol: s })),
            xs(c) && ((p = c), (c = null)),
            (c = Object.assign({ maxRedirects: e.maxRedirects, maxBodyLength: e.maxBodyLength }, l, c)),
            (c.nativeProtocols = i),
            !Di(c.host) && !Di(c.hostname) && (c.hostname = '::1'),
            pc.equal(c.protocol, s, 'protocol mismatch'),
            _h('options', c),
            new Ue(c, p)
          );
        }
        function u(l, c, p) {
          var d = a.request(l, c, p);
          return d.end(), d;
        }
        Object.defineProperties(a, {
          request: { value: o, configurable: !0, enumerable: !0, writable: !0 },
          get: { value: u, configurable: !0, enumerable: !0, writable: !0 },
        });
      }),
      e
    );
  }
  function wh() {}
  function mc(t) {
    var e;
    if (dc) e = new ms(t);
    else if (((e = Sh(vs.parse(t))), !Di(e.protocol))) throw new oc({ input: t });
    return e;
  }
  function kw(t, e) {
    return dc ? new ms(t, e) : mc(vs.resolve(e, t));
  }
  function Sh(t) {
    if (/^\[/.test(t.hostname) && !/^\[[:0-9a-f]+\]$/i.test(t.hostname)) throw new oc({ input: t.href || t });
    if (/^\[/.test(t.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(t.host)) throw new oc({ input: t.href || t });
    return t;
  }
  function lc(t, e) {
    var i = e || {};
    for (var n of Tw) i[n] = t[n];
    return (
      i.hostname.startsWith('[') && (i.hostname = i.hostname.slice(1, -1)),
      i.port !== '' && (i.port = Number(i.port)),
      (i.path = i.search ? i.pathname + i.search : i.pathname),
      i
    );
  }
  function ac(t, e) {
    var i;
    for (var n in e) t.test(n) && ((i = e[n]), delete e[n]);
    return i === null || typeof i > 'u' ? void 0 : String(i).trim();
  }
  function ys(t, e, i) {
    function n(s) {
      Error.captureStackTrace(this, this.constructor),
        Object.assign(this, s || {}),
        (this.code = t),
        (this.message = this.cause ? e + ': ' + this.cause.message : e);
    }
    return (
      (n.prototype = new (i || Error)()),
      Object.defineProperties(n.prototype, {
        constructor: { value: n, enumerable: !1 },
        name: { value: 'Error [' + t + ']', enumerable: !1 },
      }),
      n
    );
  }
  function xc(t, e) {
    for (var i of hc) t.removeListener(i, fc[i]);
    t.on('error', wh), t.destroy(e);
  }
  function Lw(t, e) {
    pc(Di(t) && Di(e));
    var i = t.length - e.length - 1;
    return i > 0 && t[i] === '.' && t.endsWith(e);
  }
  function Di(t) {
    return typeof t == 'string' || t instanceof String;
  }
  function xs(t) {
    return typeof t == 'function';
  }
  function Aw(t) {
    return typeof t == 'object' && 'length' in t;
  }
  function Dw(t) {
    return ms && t instanceof ms;
  }
  vc.exports = Eh({ http: Sw, https: Rw });
  vc.exports.wrap = Eh;
});
var Mc = y((jL, mf) => {
  'use strict';
  var Fw = sh(),
    Pw = require('url'),
    Uw = ah(),
    Bw = require('http'),
    Mw = require('https'),
    Gh = require('util'),
    qw = Rh(),
    jw = require('zlib'),
    Hh = require('stream'),
    zw = require('events');
  function Ct(t) {
    return t && typeof t == 'object' && 'default' in t ? t : { default: t };
  }
  var $h = Ct(Fw),
    Gw = Ct(Pw),
    Hw = Ct(Bw),
    $w = Ct(Mw),
    Ww = Ct(Gh),
    Vw = Ct(qw),
    ai = Ct(jw),
    si = Ct(Hh),
    Kw = Ct(zw);
  function Wh(t, e) {
    return function () {
      return t.apply(e, arguments);
    };
  }
  var { toString: Xw } = Object.prototype,
    { getPrototypeOf: Lc } = Object,
    Ur = ((t) => (e) => {
      let i = Xw.call(e);
      return t[i] || (t[i] = i.slice(8, -1).toLowerCase());
    })(Object.create(null)),
    vt = (t) => ((t = t.toLowerCase()), (e) => Ur(e) === t),
    Br = (t) => (e) => typeof e === t,
    { isArray: xn } = Array,
    _s = Br('undefined');
  function Yw(t) {
    return (
      t !== null &&
      !_s(t) &&
      t.constructor !== null &&
      !_s(t.constructor) &&
      Ye(t.constructor.isBuffer) &&
      t.constructor.isBuffer(t)
    );
  }
  var Vh = vt('ArrayBuffer');
  function Jw(t) {
    let e;
    return (
      typeof ArrayBuffer < 'u' && ArrayBuffer.isView
        ? (e = ArrayBuffer.isView(t))
        : (e = t && t.buffer && Vh(t.buffer)),
      e
    );
  }
  var Zw = Br('string'),
    Ye = Br('function'),
    Kh = Br('number'),
    Mr = (t) => t !== null && typeof t == 'object',
    Qw = (t) => t === !0 || t === !1,
    Ar = (t) => {
      if (Ur(t) !== 'object') return !1;
      let e = Lc(t);
      return (
        (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) &&
        !(Symbol.toStringTag in t) &&
        !(Symbol.iterator in t)
      );
    },
    eS = vt('Date'),
    tS = vt('File'),
    iS = vt('Blob'),
    nS = vt('FileList'),
    sS = (t) => Mr(t) && Ye(t.pipe),
    rS = (t) => {
      let e;
      return (
        t &&
        ((typeof FormData == 'function' && t instanceof FormData) ||
          (Ye(t.append) &&
            ((e = Ur(t)) === 'formdata' || (e === 'object' && Ye(t.toString) && t.toString() === '[object FormData]'))))
      );
    },
    aS = vt('URLSearchParams'),
    oS = (t) => (t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''));
  function ws(t, e, { allOwnKeys: i = !1 } = {}) {
    if (t === null || typeof t > 'u') return;
    let n, s;
    if ((typeof t != 'object' && (t = [t]), xn(t))) for (n = 0, s = t.length; n < s; n++) e.call(null, t[n], n, t);
    else {
      let r = i ? Object.getOwnPropertyNames(t) : Object.keys(t),
        a = r.length,
        o;
      for (n = 0; n < a; n++) (o = r[n]), e.call(null, t[o], o, t);
    }
  }
  function Xh(t, e) {
    e = e.toLowerCase();
    let i = Object.keys(t),
      n = i.length,
      s;
    for (; n-- > 0; ) if (((s = i[n]), e === s.toLowerCase())) return s;
    return null;
  }
  var Yh = typeof globalThis < 'u' ? globalThis : typeof self < 'u' ? self : typeof window < 'u' ? window : global,
    Jh = (t) => !_s(t) && t !== Yh;
  function Ec() {
    let { caseless: t } = (Jh(this) && this) || {},
      e = {},
      i = (n, s) => {
        let r = (t && Xh(e, s)) || s;
        Ar(e[r]) && Ar(n) ? (e[r] = Ec(e[r], n)) : Ar(n) ? (e[r] = Ec({}, n)) : xn(n) ? (e[r] = n.slice()) : (e[r] = n);
      };
    for (let n = 0, s = arguments.length; n < s; n++) arguments[n] && ws(arguments[n], i);
    return e;
  }
  var cS = (t, e, i, { allOwnKeys: n } = {}) => (
      ws(
        e,
        (s, r) => {
          i && Ye(s) ? (t[r] = Wh(s, i)) : (t[r] = s);
        },
        { allOwnKeys: n }
      ),
      t
    ),
    lS = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t),
    uS = (t, e, i, n) => {
      (t.prototype = Object.create(e.prototype, n)),
        (t.prototype.constructor = t),
        Object.defineProperty(t, 'super', { value: e.prototype }),
        i && Object.assign(t.prototype, i);
    },
    pS = (t, e, i, n) => {
      let s,
        r,
        a,
        o = {};
      if (((e = e || {}), t == null)) return e;
      do {
        for (s = Object.getOwnPropertyNames(t), r = s.length; r-- > 0; )
          (a = s[r]), (!n || n(a, t, e)) && !o[a] && ((e[a] = t[a]), (o[a] = !0));
        t = i !== !1 && Lc(t);
      } while (t && (!i || i(t, e)) && t !== Object.prototype);
      return e;
    },
    dS = (t, e, i) => {
      (t = String(t)), (i === void 0 || i > t.length) && (i = t.length), (i -= e.length);
      let n = t.indexOf(e, i);
      return n !== -1 && n === i;
    },
    hS = (t) => {
      if (!t) return null;
      if (xn(t)) return t;
      let e = t.length;
      if (!Kh(e)) return null;
      let i = new Array(e);
      for (; e-- > 0; ) i[e] = t[e];
      return i;
    },
    fS = (
      (t) => (e) =>
        t && e instanceof t
    )(typeof Uint8Array < 'u' && Lc(Uint8Array)),
    mS = (t, e) => {
      let n = (t && t[Symbol.iterator]).call(t),
        s;
      for (; (s = n.next()) && !s.done; ) {
        let r = s.value;
        e.call(t, r[0], r[1]);
      }
    },
    xS = (t, e) => {
      let i,
        n = [];
      for (; (i = t.exec(e)) !== null; ) n.push(i);
      return n;
    },
    vS = vt('HTMLFormElement'),
    yS = (t) =>
      t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (i, n, s) {
        return n.toUpperCase() + s;
      }),
    Th = (
      ({ hasOwnProperty: t }) =>
      (e, i) =>
        t.call(e, i)
    )(Object.prototype),
    bS = vt('RegExp'),
    Zh = (t, e) => {
      let i = Object.getOwnPropertyDescriptors(t),
        n = {};
      ws(i, (s, r) => {
        let a;
        (a = e(s, r, t)) !== !1 && (n[r] = a || s);
      }),
        Object.defineProperties(t, n);
    },
    gS = (t) => {
      Zh(t, (e, i) => {
        if (Ye(t) && ['arguments', 'caller', 'callee'].indexOf(i) !== -1) return !1;
        let n = t[i];
        if (Ye(n)) {
          if (((e.enumerable = !1), 'writable' in e)) {
            e.writable = !1;
            return;
          }
          e.set ||
            (e.set = () => {
              throw Error("Can not rewrite read-only method '" + i + "'");
            });
        }
      });
    },
    _S = (t, e) => {
      let i = {},
        n = (s) => {
          s.forEach((r) => {
            i[r] = !0;
          });
        };
      return xn(t) ? n(t) : n(String(t).split(e)), i;
    },
    ES = () => {},
    wS = (t, e) => ((t = +t), Number.isFinite(t) ? t : e),
    yc = 'abcdefghijklmnopqrstuvwxyz',
    Oh = '0123456789',
    Qh = { DIGIT: Oh, ALPHA: yc, ALPHA_DIGIT: yc + yc.toUpperCase() + Oh },
    SS = (t = 16, e = Qh.ALPHA_DIGIT) => {
      let i = '',
        { length: n } = e;
      for (; t--; ) i += e[(Math.random() * n) | 0];
      return i;
    };
  function RS(t) {
    return !!(t && Ye(t.append) && t[Symbol.toStringTag] === 'FormData' && t[Symbol.iterator]);
  }
  var TS = (t) => {
      let e = new Array(10),
        i = (n, s) => {
          if (Mr(n)) {
            if (e.indexOf(n) >= 0) return;
            if (!('toJSON' in n)) {
              e[s] = n;
              let r = xn(n) ? [] : {};
              return (
                ws(n, (a, o) => {
                  let u = i(a, s + 1);
                  !_s(u) && (r[o] = u);
                }),
                (e[s] = void 0),
                r
              );
            }
          }
          return n;
        };
      return i(t, 0);
    },
    OS = vt('AsyncFunction'),
    CS = (t) => t && (Mr(t) || Ye(t)) && Ye(t.then) && Ye(t.catch),
    x = {
      isArray: xn,
      isArrayBuffer: Vh,
      isBuffer: Yw,
      isFormData: rS,
      isArrayBufferView: Jw,
      isString: Zw,
      isNumber: Kh,
      isBoolean: Qw,
      isObject: Mr,
      isPlainObject: Ar,
      isUndefined: _s,
      isDate: eS,
      isFile: tS,
      isBlob: iS,
      isRegExp: bS,
      isFunction: Ye,
      isStream: sS,
      isURLSearchParams: aS,
      isTypedArray: fS,
      isFileList: nS,
      forEach: ws,
      merge: Ec,
      extend: cS,
      trim: oS,
      stripBOM: lS,
      inherits: uS,
      toFlatObject: pS,
      kindOf: Ur,
      kindOfTest: vt,
      endsWith: dS,
      toArray: hS,
      forEachEntry: mS,
      matchAll: xS,
      isHTMLForm: vS,
      hasOwnProperty: Th,
      hasOwnProp: Th,
      reduceDescriptors: Zh,
      freezeMethods: gS,
      toObjectSet: _S,
      toCamelCase: yS,
      noop: ES,
      toFiniteNumber: wS,
      findKey: Xh,
      global: Yh,
      isContextDefined: Jh,
      ALPHABET: Qh,
      generateString: SS,
      isSpecCompliantForm: RS,
      toJSONObject: TS,
      isAsyncFn: OS,
      isThenable: CS,
    };
  function C(t, e, i, n, s) {
    Error.call(this),
      Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack),
      (this.message = t),
      (this.name = 'AxiosError'),
      e && (this.code = e),
      i && (this.config = i),
      n && (this.request = n),
      s && (this.response = s);
  }
  x.inherits(C, Error, {
    toJSON: function () {
      return {
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: x.toJSONObject(this.config),
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null,
      };
    },
  });
  var ef = C.prototype,
    tf = {};
  [
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED',
    'ERR_NOT_SUPPORT',
    'ERR_INVALID_URL',
  ].forEach((t) => {
    tf[t] = { value: t };
  });
  Object.defineProperties(C, tf);
  Object.defineProperty(ef, 'isAxiosError', { value: !0 });
  C.from = (t, e, i, n, s, r) => {
    let a = Object.create(ef);
    return (
      x.toFlatObject(
        t,
        a,
        function (u) {
          return u !== Error.prototype;
        },
        (o) => o !== 'isAxiosError'
      ),
      C.call(a, t.message, e, i, n, s),
      (a.cause = t),
      (a.name = t.name),
      r && Object.assign(a, r),
      a
    );
  };
  function wc(t) {
    return x.isPlainObject(t) || x.isArray(t);
  }
  function nf(t) {
    return x.endsWith(t, '[]') ? t.slice(0, -2) : t;
  }
  function Ch(t, e, i) {
    return t
      ? t
          .concat(e)
          .map(function (s, r) {
            return (s = nf(s)), !i && r ? '[' + s + ']' : s;
          })
          .join(i ? '.' : '')
      : e;
  }
  function IS(t) {
    return x.isArray(t) && !t.some(wc);
  }
  var NS = x.toFlatObject(x, {}, null, function (e) {
    return /^is[A-Z]/.test(e);
  });
  function qr(t, e, i) {
    if (!x.isObject(t)) throw new TypeError('target must be an object');
    (e = e || new ($h.default || FormData)()),
      (i = x.toFlatObject(i, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function (m, b) {
        return !x.isUndefined(b[m]);
      }));
    let n = i.metaTokens,
      s = i.visitor || c,
      r = i.dots,
      a = i.indexes,
      u = (i.Blob || (typeof Blob < 'u' && Blob)) && x.isSpecCompliantForm(e);
    if (!x.isFunction(s)) throw new TypeError('visitor must be a function');
    function l(h) {
      if (h === null) return '';
      if (x.isDate(h)) return h.toISOString();
      if (!u && x.isBlob(h)) throw new C('Blob is not supported. Use a Buffer instead.');
      return x.isArrayBuffer(h) || x.isTypedArray(h)
        ? u && typeof Blob == 'function'
          ? new Blob([h])
          : Buffer.from(h)
        : h;
    }
    function c(h, m, b) {
      let v = h;
      if (h && !b && typeof h == 'object') {
        if (x.endsWith(m, '{}')) (m = n ? m : m.slice(0, -2)), (h = JSON.stringify(h));
        else if ((x.isArray(h) && IS(h)) || ((x.isFileList(h) || x.endsWith(m, '[]')) && (v = x.toArray(h))))
          return (
            (m = nf(m)),
            v.forEach(function (g, N) {
              !(x.isUndefined(g) || g === null) && e.append(a === !0 ? Ch([m], N, r) : a === null ? m : m + '[]', l(g));
            }),
            !1
          );
      }
      return wc(h) ? !0 : (e.append(Ch(b, m, r), l(h)), !1);
    }
    let p = [],
      d = Object.assign(NS, { defaultVisitor: c, convertValue: l, isVisitable: wc });
    function f(h, m) {
      if (!x.isUndefined(h)) {
        if (p.indexOf(h) !== -1) throw Error('Circular reference detected in ' + m.join('.'));
        p.push(h),
          x.forEach(h, function (v, E) {
            (!(x.isUndefined(v) || v === null) && s.call(e, v, x.isString(E) ? E.trim() : E, m, d)) === !0 &&
              f(v, m ? m.concat(E) : [E]);
          }),
          p.pop();
      }
    }
    if (!x.isObject(t)) throw new TypeError('data must be an object');
    return f(t), e;
  }
  function Ih(t) {
    let e = { '!': '%21', "'": '%27', '(': '%28', ')': '%29', '~': '%7E', '%20': '+', '%00': '\0' };
    return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function (n) {
      return e[n];
    });
  }
  function sf(t, e) {
    (this._pairs = []), t && qr(t, this, e);
  }
  var rf = sf.prototype;
  rf.append = function (e, i) {
    this._pairs.push([e, i]);
  };
  rf.toString = function (e) {
    let i = e
      ? function (n) {
          return e.call(this, n, Ih);
        }
      : Ih;
    return this._pairs
      .map(function (s) {
        return i(s[0]) + '=' + i(s[1]);
      }, '')
      .join('&');
  };
  function kS(t) {
    return encodeURIComponent(t)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }
  function Ac(t, e, i) {
    if (!e) return t;
    let n = (i && i.encode) || kS,
      s = i && i.serialize,
      r;
    if ((s ? (r = s(e, i)) : (r = x.isURLSearchParams(e) ? e.toString() : new sf(e, i).toString(n)), r)) {
      let a = t.indexOf('#');
      a !== -1 && (t = t.slice(0, a)), (t += (t.indexOf('?') === -1 ? '?' : '&') + r);
    }
    return t;
  }
  var Sc = class {
      constructor() {
        this.handlers = [];
      }
      use(e, i, n) {
        return (
          this.handlers.push({
            fulfilled: e,
            rejected: i,
            synchronous: n ? n.synchronous : !1,
            runWhen: n ? n.runWhen : null,
          }),
          this.handlers.length - 1
        );
      }
      eject(e) {
        this.handlers[e] && (this.handlers[e] = null);
      }
      clear() {
        this.handlers && (this.handlers = []);
      }
      forEach(e) {
        x.forEach(this.handlers, function (n) {
          n !== null && e(n);
        });
      }
    },
    Nh = Sc,
    Dc = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
    LS = Gw.default.URLSearchParams,
    AS = {
      isNode: !0,
      classes: { URLSearchParams: LS, FormData: $h.default, Blob: (typeof Blob < 'u' && Blob) || null },
      protocols: ['http', 'https', 'file', 'data'],
    },
    af = typeof window < 'u' && typeof document < 'u',
    DS = ((t) => af && ['ReactNative', 'NativeScript', 'NS'].indexOf(t) < 0)(
      typeof navigator < 'u' && navigator.product
    ),
    FS = typeof WorkerGlobalScope < 'u' && self instanceof WorkerGlobalScope && typeof self.importScripts == 'function',
    PS = Object.freeze({
      __proto__: null,
      hasBrowserEnv: af,
      hasStandardBrowserWebWorkerEnv: FS,
      hasStandardBrowserEnv: DS,
    }),
    Xe = { ...PS, ...AS };
  function US(t, e) {
    return qr(
      t,
      new Xe.classes.URLSearchParams(),
      Object.assign(
        {
          visitor: function (i, n, s, r) {
            return Xe.isNode && x.isBuffer(i)
              ? (this.append(n, i.toString('base64')), !1)
              : r.defaultVisitor.apply(this, arguments);
          },
        },
        e
      )
    );
  }
  function BS(t) {
    return x.matchAll(/\w+|\[(\w*)]/g, t).map((e) => (e[0] === '[]' ? '' : e[1] || e[0]));
  }
  function MS(t) {
    let e = {},
      i = Object.keys(t),
      n,
      s = i.length,
      r;
    for (n = 0; n < s; n++) (r = i[n]), (e[r] = t[r]);
    return e;
  }
  function of(t) {
    function e(i, n, s, r) {
      let a = i[r++];
      if (a === '__proto__') return !0;
      let o = Number.isFinite(+a),
        u = r >= i.length;
      return (
        (a = !a && x.isArray(s) ? s.length : a),
        u
          ? (x.hasOwnProp(s, a) ? (s[a] = [s[a], n]) : (s[a] = n), !o)
          : ((!s[a] || !x.isObject(s[a])) && (s[a] = []), e(i, n, s[a], r) && x.isArray(s[a]) && (s[a] = MS(s[a])), !o)
      );
    }
    if (x.isFormData(t) && x.isFunction(t.entries)) {
      let i = {};
      return (
        x.forEachEntry(t, (n, s) => {
          e(BS(n), s, i, 0);
        }),
        i
      );
    }
    return null;
  }
  function qS(t, e, i) {
    if (x.isString(t))
      try {
        return (e || JSON.parse)(t), x.trim(t);
      } catch (n) {
        if (n.name !== 'SyntaxError') throw n;
      }
    return (i || JSON.stringify)(t);
  }
  var Fc = {
    transitional: Dc,
    adapter: ['xhr', 'http'],
    transformRequest: [
      function (e, i) {
        let n = i.getContentType() || '',
          s = n.indexOf('application/json') > -1,
          r = x.isObject(e);
        if ((r && x.isHTMLForm(e) && (e = new FormData(e)), x.isFormData(e))) return s ? JSON.stringify(of(e)) : e;
        if (x.isArrayBuffer(e) || x.isBuffer(e) || x.isStream(e) || x.isFile(e) || x.isBlob(e)) return e;
        if (x.isArrayBufferView(e)) return e.buffer;
        if (x.isURLSearchParams(e))
          return i.setContentType('application/x-www-form-urlencoded;charset=utf-8', !1), e.toString();
        let o;
        if (r) {
          if (n.indexOf('application/x-www-form-urlencoded') > -1) return US(e, this.formSerializer).toString();
          if ((o = x.isFileList(e)) || n.indexOf('multipart/form-data') > -1) {
            let u = this.env && this.env.FormData;
            return qr(o ? { 'files[]': e } : e, u && new u(), this.formSerializer);
          }
        }
        return r || s ? (i.setContentType('application/json', !1), qS(e)) : e;
      },
    ],
    transformResponse: [
      function (e) {
        let i = this.transitional || Fc.transitional,
          n = i && i.forcedJSONParsing,
          s = this.responseType === 'json';
        if (e && x.isString(e) && ((n && !this.responseType) || s)) {
          let a = !(i && i.silentJSONParsing) && s;
          try {
            return JSON.parse(e);
          } catch (o) {
            if (a) throw o.name === 'SyntaxError' ? C.from(o, C.ERR_BAD_RESPONSE, this, null, this.response) : o;
          }
        }
        return e;
      },
    ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: { FormData: Xe.classes.FormData, Blob: Xe.classes.Blob },
    validateStatus: function (e) {
      return e >= 200 && e < 300;
    },
    headers: { common: { Accept: 'application/json, text/plain, */*', 'Content-Type': void 0 } },
  };
  x.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (t) => {
    Fc.headers[t] = {};
  });
  var Pc = Fc,
    jS = x.toObjectSet([
      'age',
      'authorization',
      'content-length',
      'content-type',
      'etag',
      'expires',
      'from',
      'host',
      'if-modified-since',
      'if-unmodified-since',
      'last-modified',
      'location',
      'max-forwards',
      'proxy-authorization',
      'referer',
      'retry-after',
      'user-agent',
    ]),
    zS = (t) => {
      let e = {},
        i,
        n,
        s;
      return (
        t &&
          t
            .split(
              `
`
            )
            .forEach(function (a) {
              (s = a.indexOf(':')),
                (i = a.substring(0, s).trim().toLowerCase()),
                (n = a.substring(s + 1).trim()),
                !(!i || (e[i] && jS[i])) &&
                  (i === 'set-cookie' ? (e[i] ? e[i].push(n) : (e[i] = [n])) : (e[i] = e[i] ? e[i] + ', ' + n : n));
            }),
        e
      );
    },
    kh = Symbol('internals');
  function bs(t) {
    return t && String(t).trim().toLowerCase();
  }
  function Dr(t) {
    return t === !1 || t == null ? t : x.isArray(t) ? t.map(Dr) : String(t);
  }
  function GS(t) {
    let e = Object.create(null),
      i = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g,
      n;
    for (; (n = i.exec(t)); ) e[n[1]] = n[2];
    return e;
  }
  var HS = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
  function bc(t, e, i, n, s) {
    if (x.isFunction(n)) return n.call(this, e, i);
    if ((s && (e = i), !!x.isString(e))) {
      if (x.isString(n)) return e.indexOf(n) !== -1;
      if (x.isRegExp(n)) return n.test(e);
    }
  }
  function $S(t) {
    return t
      .trim()
      .toLowerCase()
      .replace(/([a-z\d])(\w*)/g, (e, i, n) => i.toUpperCase() + n);
  }
  function WS(t, e) {
    let i = x.toCamelCase(' ' + e);
    ['get', 'set', 'has'].forEach((n) => {
      Object.defineProperty(t, n + i, {
        value: function (s, r, a) {
          return this[n].call(this, e, s, r, a);
        },
        configurable: !0,
      });
    });
  }
  var hn = class {
    constructor(e) {
      e && this.set(e);
    }
    set(e, i, n) {
      let s = this;
      function r(o, u, l) {
        let c = bs(u);
        if (!c) throw new Error('header name must be a non-empty string');
        let p = x.findKey(s, c);
        (!p || s[p] === void 0 || l === !0 || (l === void 0 && s[p] !== !1)) && (s[p || u] = Dr(o));
      }
      let a = (o, u) => x.forEach(o, (l, c) => r(l, c, u));
      return (
        x.isPlainObject(e) || e instanceof this.constructor
          ? a(e, i)
          : x.isString(e) && (e = e.trim()) && !HS(e)
          ? a(zS(e), i)
          : e != null && r(i, e, n),
        this
      );
    }
    get(e, i) {
      if (((e = bs(e)), e)) {
        let n = x.findKey(this, e);
        if (n) {
          let s = this[n];
          if (!i) return s;
          if (i === !0) return GS(s);
          if (x.isFunction(i)) return i.call(this, s, n);
          if (x.isRegExp(i)) return i.exec(s);
          throw new TypeError('parser must be boolean|regexp|function');
        }
      }
    }
    has(e, i) {
      if (((e = bs(e)), e)) {
        let n = x.findKey(this, e);
        return !!(n && this[n] !== void 0 && (!i || bc(this, this[n], n, i)));
      }
      return !1;
    }
    delete(e, i) {
      let n = this,
        s = !1;
      function r(a) {
        if (((a = bs(a)), a)) {
          let o = x.findKey(n, a);
          o && (!i || bc(n, n[o], o, i)) && (delete n[o], (s = !0));
        }
      }
      return x.isArray(e) ? e.forEach(r) : r(e), s;
    }
    clear(e) {
      let i = Object.keys(this),
        n = i.length,
        s = !1;
      for (; n--; ) {
        let r = i[n];
        (!e || bc(this, this[r], r, e, !0)) && (delete this[r], (s = !0));
      }
      return s;
    }
    normalize(e) {
      let i = this,
        n = {};
      return (
        x.forEach(this, (s, r) => {
          let a = x.findKey(n, r);
          if (a) {
            (i[a] = Dr(s)), delete i[r];
            return;
          }
          let o = e ? $S(r) : String(r).trim();
          o !== r && delete i[r], (i[o] = Dr(s)), (n[o] = !0);
        }),
        this
      );
    }
    concat(...e) {
      return this.constructor.concat(this, ...e);
    }
    toJSON(e) {
      let i = Object.create(null);
      return (
        x.forEach(this, (n, s) => {
          n != null && n !== !1 && (i[s] = e && x.isArray(n) ? n.join(', ') : n);
        }),
        i
      );
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([e, i]) => e + ': ' + i).join(`
`);
    }
    get [Symbol.toStringTag]() {
      return 'AxiosHeaders';
    }
    static from(e) {
      return e instanceof this ? e : new this(e);
    }
    static concat(e, ...i) {
      let n = new this(e);
      return i.forEach((s) => n.set(s)), n;
    }
    static accessor(e) {
      let n = (this[kh] = this[kh] = { accessors: {} }).accessors,
        s = this.prototype;
      function r(a) {
        let o = bs(a);
        n[o] || (WS(s, a), (n[o] = !0));
      }
      return x.isArray(e) ? e.forEach(r) : r(e), this;
    }
  };
  hn.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);
  x.reduceDescriptors(hn.prototype, ({ value: t }, e) => {
    let i = e[0].toUpperCase() + e.slice(1);
    return {
      get: () => t,
      set(n) {
        this[i] = n;
      },
    };
  });
  x.freezeMethods(hn);
  var Je = hn;
  function gc(t, e) {
    let i = this || Pc,
      n = e || i,
      s = Je.from(n.headers),
      r = n.data;
    return (
      x.forEach(t, function (o) {
        r = o.call(i, r, s.normalize(), e ? e.status : void 0);
      }),
      s.normalize(),
      r
    );
  }
  function cf(t) {
    return !!(t && t.__CANCEL__);
  }
  function Fi(t, e, i) {
    C.call(this, t ?? 'canceled', C.ERR_CANCELED, e, i), (this.name = 'CanceledError');
  }
  x.inherits(Fi, C, { __CANCEL__: !0 });
  function gs(t, e, i) {
    let n = i.config.validateStatus;
    !i.status || !n || n(i.status)
      ? t(i)
      : e(
          new C(
            'Request failed with status code ' + i.status,
            [C.ERR_BAD_REQUEST, C.ERR_BAD_RESPONSE][Math.floor(i.status / 100) - 4],
            i.config,
            i.request,
            i
          )
        );
  }
  function VS(t) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
  }
  function KS(t, e) {
    return e ? t.replace(/\/?\/$/, '') + '/' + e.replace(/^\/+/, '') : t;
  }
  function Uc(t, e) {
    return t && !VS(e) ? KS(t, e) : e;
  }
  var Pr = '1.6.7';
  function lf(t) {
    let e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
    return (e && e[1]) || '';
  }
  var XS = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
  function YS(t, e, i) {
    let n = (i && i.Blob) || Xe.classes.Blob,
      s = lf(t);
    if ((e === void 0 && n && (e = !0), s === 'data')) {
      t = s.length ? t.slice(s.length + 1) : t;
      let r = XS.exec(t);
      if (!r) throw new C('Invalid URL', C.ERR_INVALID_URL);
      let a = r[1],
        o = r[2],
        u = r[3],
        l = Buffer.from(decodeURIComponent(u), o ? 'base64' : 'utf8');
      if (e) {
        if (!n) throw new C('Blob is not supported', C.ERR_NOT_SUPPORT);
        return new n([l], { type: a });
      }
      return l;
    }
    throw new C('Unsupported protocol ' + s, C.ERR_NOT_SUPPORT);
  }
  function JS(t, e) {
    let i = 0,
      n = 1e3 / e,
      s = null;
    return function (a, o) {
      let u = Date.now();
      if (a || u - i > n) return s && (clearTimeout(s), (s = null)), (i = u), t.apply(null, o);
      s || (s = setTimeout(() => ((s = null), (i = Date.now()), t.apply(null, o)), n - (u - i)));
    };
  }
  function uf(t, e) {
    t = t || 10;
    let i = new Array(t),
      n = new Array(t),
      s = 0,
      r = 0,
      a;
    return (
      (e = e !== void 0 ? e : 1e3),
      function (u) {
        let l = Date.now(),
          c = n[r];
        a || (a = l), (i[s] = u), (n[s] = l);
        let p = r,
          d = 0;
        for (; p !== s; ) (d += i[p++]), (p = p % t);
        if (((s = (s + 1) % t), s === r && (r = (r + 1) % t), l - a < e)) return;
        let f = c && l - c;
        return f ? Math.round((d * 1e3) / f) : void 0;
      }
    );
  }
  var Lr = Symbol('internals'),
    Rc = class extends si.default.Transform {
      constructor(e) {
        (e = x.toFlatObject(
          e,
          { maxRate: 0, chunkSize: 64 * 1024, minChunkSize: 100, timeWindow: 500, ticksRate: 2, samplesCount: 15 },
          null,
          (o, u) => !x.isUndefined(u[o])
        )),
          super({ readableHighWaterMark: e.chunkSize });
        let i = this,
          n = (this[Lr] = {
            length: e.length,
            timeWindow: e.timeWindow,
            ticksRate: e.ticksRate,
            chunkSize: e.chunkSize,
            maxRate: e.maxRate,
            minChunkSize: e.minChunkSize,
            bytesSeen: 0,
            isCaptured: !1,
            notifiedBytesLoaded: 0,
            ts: Date.now(),
            bytes: 0,
            onReadCallback: null,
          }),
          s = uf(n.ticksRate * e.samplesCount, n.timeWindow);
        this.on('newListener', (o) => {
          o === 'progress' && (n.isCaptured || (n.isCaptured = !0));
        });
        let r = 0;
        n.updateProgress = JS(function () {
          let u = n.length,
            l = n.bytesSeen,
            c = l - r;
          if (!c || i.destroyed) return;
          let p = s(c);
          (r = l),
            process.nextTick(() => {
              i.emit('progress', {
                loaded: l,
                total: u,
                progress: u ? l / u : void 0,
                bytes: c,
                rate: p || void 0,
                estimated: p && u && l <= u ? (u - l) / p : void 0,
              });
            });
        }, n.ticksRate);
        let a = () => {
          n.updateProgress(!0);
        };
        this.once('end', a), this.once('error', a);
      }
      _read(e) {
        let i = this[Lr];
        return i.onReadCallback && i.onReadCallback(), super._read(e);
      }
      _transform(e, i, n) {
        let s = this,
          r = this[Lr],
          a = r.maxRate,
          o = this.readableHighWaterMark,
          u = r.timeWindow,
          l = 1e3 / u,
          c = a / l,
          p = r.minChunkSize !== !1 ? Math.max(r.minChunkSize, c * 0.01) : 0;
        function d(h, m) {
          let b = Buffer.byteLength(h);
          (r.bytesSeen += b),
            (r.bytes += b),
            r.isCaptured && r.updateProgress(),
            s.push(h)
              ? process.nextTick(m)
              : (r.onReadCallback = () => {
                  (r.onReadCallback = null), process.nextTick(m);
                });
        }
        let f = (h, m) => {
          let b = Buffer.byteLength(h),
            v = null,
            E = o,
            g,
            N = 0;
          if (a) {
            let P = Date.now();
            (!r.ts || (N = P - r.ts) >= u) && ((r.ts = P), (g = c - r.bytes), (r.bytes = g < 0 ? -g : 0), (N = 0)),
              (g = c - r.bytes);
          }
          if (a) {
            if (g <= 0)
              return setTimeout(() => {
                m(null, h);
              }, u - N);
            g < E && (E = g);
          }
          E && b > E && b - E > p && ((v = h.subarray(E)), (h = h.subarray(0, E))),
            d(
              h,
              v
                ? () => {
                    process.nextTick(m, null, v);
                  }
                : m
            );
        };
        f(e, function h(m, b) {
          if (m) return n(m);
          b ? f(b, h) : n(null);
        });
      }
      setLength(e) {
        return (this[Lr].length = +e), this;
      }
    },
    Lh = Rc,
    { asyncIterator: Ah } = Symbol,
    ZS = async function* (t) {
      t.stream ? yield* t.stream() : t.arrayBuffer ? yield await t.arrayBuffer() : t[Ah] ? yield* t[Ah]() : yield t;
    },
    pf = ZS,
    QS = x.ALPHABET.ALPHA_DIGIT + '-_',
    Es = new Gh.TextEncoder(),
    ri = `\r
`,
    e0 = Es.encode(ri),
    t0 = 2,
    Tc = class {
      constructor(e, i) {
        let { escapeName: n } = this.constructor,
          s = x.isString(i),
          r = `Content-Disposition: form-data; name="${n(e)}"${!s && i.name ? `; filename="${n(i.name)}"` : ''}${ri}`;
        s
          ? (i = Es.encode(String(i).replace(/\r?\n|\r\n?/g, ri)))
          : (r += `Content-Type: ${i.type || 'application/octet-stream'}${ri}`),
          (this.headers = Es.encode(r + ri)),
          (this.contentLength = s ? i.byteLength : i.size),
          (this.size = this.headers.byteLength + this.contentLength + t0),
          (this.name = e),
          (this.value = i);
      }
      async *encode() {
        yield this.headers;
        let { value: e } = this;
        x.isTypedArray(e) ? yield e : yield* pf(e), yield e0;
      }
      static escapeName(e) {
        return String(e).replace(/[\r\n"]/g, (i) => ({ '\r': '%0D', '\n': '%0A', '"': '%22' }[i]));
      }
    },
    i0 = (t, e, i) => {
      let { tag: n = 'form-data-boundary', size: s = 25, boundary: r = n + '-' + x.generateString(s, QS) } = i || {};
      if (!x.isFormData(t)) throw TypeError('FormData instance required');
      if (r.length < 1 || r.length > 70) throw Error('boundary must be 10-70 characters long');
      let a = Es.encode('--' + r + ri),
        o = Es.encode('--' + r + '--' + ri + ri),
        u = o.byteLength,
        l = Array.from(t.entries()).map(([p, d]) => {
          let f = new Tc(p, d);
          return (u += f.size), f;
        });
      (u += a.byteLength * l.length), (u = x.toFiniteNumber(u));
      let c = { 'Content-Type': `multipart/form-data; boundary=${r}` };
      return (
        Number.isFinite(u) && (c['Content-Length'] = u),
        e && e(c),
        Hh.Readable.from(
          (async function* () {
            for (let p of l) yield a, yield* p.encode();
            yield o;
          })()
        )
      );
    },
    n0 = i0,
    Oc = class extends si.default.Transform {
      __transform(e, i, n) {
        this.push(e), n();
      }
      _transform(e, i, n) {
        if (e.length !== 0 && ((this._transform = this.__transform), e[0] !== 120)) {
          let s = Buffer.alloc(2);
          (s[0] = 120), (s[1] = 156), this.push(s, i);
        }
        this.__transform(e, i, n);
      }
    },
    s0 = Oc,
    r0 = (t, e) =>
      x.isAsyncFn(t)
        ? function (...i) {
            let n = i.pop();
            t.apply(this, i).then((s) => {
              try {
                e ? n(null, ...e(s)) : n(null, s);
              } catch (r) {
                n(r);
              }
            }, n);
          }
        : t,
    a0 = r0,
    Dh = { flush: ai.default.constants.Z_SYNC_FLUSH, finishFlush: ai.default.constants.Z_SYNC_FLUSH },
    o0 = {
      flush: ai.default.constants.BROTLI_OPERATION_FLUSH,
      finishFlush: ai.default.constants.BROTLI_OPERATION_FLUSH,
    },
    Fh = x.isFunction(ai.default.createBrotliDecompress),
    { http: c0, https: l0 } = Vw.default,
    u0 = /https:?/,
    Ph = Xe.protocols.map((t) => t + ':');
  function p0(t, e) {
    t.beforeRedirects.proxy && t.beforeRedirects.proxy(t), t.beforeRedirects.config && t.beforeRedirects.config(t, e);
  }
  function df(t, e, i) {
    let n = e;
    if (!n && n !== !1) {
      let s = Uw.getProxyForUrl(i);
      s && (n = new URL(s));
    }
    if (n) {
      if ((n.username && (n.auth = (n.username || '') + ':' + (n.password || '')), n.auth)) {
        (n.auth.username || n.auth.password) && (n.auth = (n.auth.username || '') + ':' + (n.auth.password || ''));
        let r = Buffer.from(n.auth, 'utf8').toString('base64');
        t.headers['Proxy-Authorization'] = 'Basic ' + r;
      }
      t.headers.host = t.hostname + (t.port ? ':' + t.port : '');
      let s = n.hostname || n.host;
      (t.hostname = s),
        (t.host = s),
        (t.port = n.port),
        (t.path = i),
        n.protocol && (t.protocol = n.protocol.includes(':') ? n.protocol : `${n.protocol}:`);
    }
    t.beforeRedirects.proxy = function (r) {
      df(r, e, r.href);
    };
  }
  var d0 = typeof process < 'u' && x.kindOf(process) === 'process',
    h0 = (t) =>
      new Promise((e, i) => {
        let n,
          s,
          r = (u, l) => {
            s || ((s = !0), n && n(u, l));
          },
          a = (u) => {
            r(u), e(u);
          },
          o = (u) => {
            r(u, !0), i(u);
          };
        t(a, o, (u) => (n = u)).catch(o);
      }),
    f0 = ({ address: t, family: e }) => {
      if (!x.isString(t)) throw TypeError('address must be a string');
      return { address: t, family: e || (t.indexOf('.') < 0 ? 6 : 4) };
    },
    Uh = (t, e) => f0(x.isObject(t) ? t : { address: t, family: e }),
    m0 =
      d0 &&
      function (e) {
        return h0(async function (n, s, r) {
          let { data: a, lookup: o, family: u } = e,
            { responseType: l, responseEncoding: c } = e,
            p = e.method.toUpperCase(),
            d,
            f = !1,
            h;
          if (o) {
            let w = a0(o, (S) => (x.isArray(S) ? S : [S]));
            o = (S, L, ie) => {
              w(S, L, (Q, _, T) => {
                if (Q) return ie(Q);
                let I = x.isArray(_) ? _.map((B) => Uh(B)) : [Uh(_, T)];
                L.all ? ie(Q, I) : ie(Q, I[0].address, I[0].family);
              });
            };
          }
          let m = new Kw.default(),
            b = () => {
              e.cancelToken && e.cancelToken.unsubscribe(v),
                e.signal && e.signal.removeEventListener('abort', v),
                m.removeAllListeners();
            };
          r((w, S) => {
            (d = !0), S && ((f = !0), b());
          });
          function v(w) {
            m.emit('abort', !w || w.type ? new Fi(null, e, h) : w);
          }
          m.once('abort', s),
            (e.cancelToken || e.signal) &&
              (e.cancelToken && e.cancelToken.subscribe(v),
              e.signal && (e.signal.aborted ? v() : e.signal.addEventListener('abort', v)));
          let E = Uc(e.baseURL, e.url),
            g = new URL(E, 'http://localhost'),
            N = g.protocol || Ph[0];
          if (N === 'data:') {
            let w;
            if (p !== 'GET') return gs(n, s, { status: 405, statusText: 'method not allowed', headers: {}, config: e });
            try {
              w = YS(e.url, l === 'blob', { Blob: e.env && e.env.Blob });
            } catch (S) {
              throw C.from(S, C.ERR_BAD_REQUEST, e);
            }
            return (
              l === 'text'
                ? ((w = w.toString(c)), (!c || c === 'utf8') && (w = x.stripBOM(w)))
                : l === 'stream' && (w = si.default.Readable.from(w)),
              gs(n, s, { data: w, status: 200, statusText: 'OK', headers: new Je(), config: e })
            );
          }
          if (Ph.indexOf(N) === -1) return s(new C('Unsupported protocol ' + N, C.ERR_BAD_REQUEST, e));
          let P = Je.from(e.headers).normalize();
          P.set('User-Agent', 'axios/' + Pr, !1);
          let O = e.onDownloadProgress,
            W = e.onUploadProgress,
            U = e.maxRate,
            R,
            k;
          if (x.isSpecCompliantForm(a)) {
            let w = P.getContentType(/boundary=([-_\w\d]{10,70})/i);
            a = n0(
              a,
              (S) => {
                P.set(S);
              },
              { tag: `axios-${Pr}-boundary`, boundary: (w && w[1]) || void 0 }
            );
          } else if (x.isFormData(a) && x.isFunction(a.getHeaders)) {
            if ((P.set(a.getHeaders()), !P.hasContentLength()))
              try {
                let w = await Ww.default.promisify(a.getLength).call(a);
                Number.isFinite(w) && w >= 0 && P.setContentLength(w);
              } catch {}
          } else if (x.isBlob(a))
            a.size && P.setContentType(a.type || 'application/octet-stream'),
              P.setContentLength(a.size || 0),
              (a = si.default.Readable.from(pf(a)));
          else if (a && !x.isStream(a)) {
            if (!Buffer.isBuffer(a))
              if (x.isArrayBuffer(a)) a = Buffer.from(new Uint8Array(a));
              else if (x.isString(a)) a = Buffer.from(a, 'utf-8');
              else
                return s(
                  new C(
                    'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
                    C.ERR_BAD_REQUEST,
                    e
                  )
                );
            if ((P.setContentLength(a.length, !1), e.maxBodyLength > -1 && a.length > e.maxBodyLength))
              return s(new C('Request body larger than maxBodyLength limit', C.ERR_BAD_REQUEST, e));
          }
          let A = x.toFiniteNumber(P.getContentLength());
          x.isArray(U) ? ((R = U[0]), (k = U[1])) : (R = k = U),
            a &&
              (W || R) &&
              (x.isStream(a) || (a = si.default.Readable.from(a, { objectMode: !1 })),
              (a = si.default.pipeline([a, new Lh({ length: A, maxRate: x.toFiniteNumber(R) })], x.noop)),
              W &&
                a.on('progress', (w) => {
                  W(Object.assign(w, { upload: !0 }));
                }));
          let q;
          if (e.auth) {
            let w = e.auth.username || '',
              S = e.auth.password || '';
            q = w + ':' + S;
          }
          if (!q && g.username) {
            let w = g.username,
              S = g.password;
            q = w + ':' + S;
          }
          q && P.delete('authorization');
          let j;
          try {
            j = Ac(g.pathname + g.search, e.params, e.paramsSerializer).replace(/^\?/, '');
          } catch (w) {
            let S = new Error(w.message);
            return (S.config = e), (S.url = e.url), (S.exists = !0), s(S);
          }
          P.set('Accept-Encoding', 'gzip, compress, deflate' + (Fh ? ', br' : ''), !1);
          let F = {
            path: j,
            method: p,
            headers: P.toJSON(),
            agents: { http: e.httpAgent, https: e.httpsAgent },
            auth: q,
            protocol: N,
            family: u,
            beforeRedirect: p0,
            beforeRedirects: {},
          };
          !x.isUndefined(o) && (F.lookup = o),
            e.socketPath
              ? (F.socketPath = e.socketPath)
              : ((F.hostname = g.hostname),
                (F.port = g.port),
                df(F, e.proxy, N + '//' + g.hostname + (g.port ? ':' + g.port : '') + F.path));
          let z,
            G = u0.test(F.protocol);
          if (
            ((F.agent = G ? e.httpsAgent : e.httpAgent),
            e.transport
              ? (z = e.transport)
              : e.maxRedirects === 0
              ? (z = G ? $w.default : Hw.default)
              : (e.maxRedirects && (F.maxRedirects = e.maxRedirects),
                e.beforeRedirect && (F.beforeRedirects.config = e.beforeRedirect),
                (z = G ? l0 : c0)),
            e.maxBodyLength > -1 ? (F.maxBodyLength = e.maxBodyLength) : (F.maxBodyLength = 1 / 0),
            e.insecureHTTPParser && (F.insecureHTTPParser = e.insecureHTTPParser),
            (h = z.request(F, function (S) {
              if (h.destroyed) return;
              let L = [S],
                ie = +S.headers['content-length'];
              if (O) {
                let B = new Lh({ length: x.toFiniteNumber(ie), maxRate: x.toFiniteNumber(k) });
                O &&
                  B.on('progress', (re) => {
                    O(Object.assign(re, { download: !0 }));
                  }),
                  L.push(B);
              }
              let Q = S,
                _ = S.req || h;
              if (e.decompress !== !1 && S.headers['content-encoding'])
                switch (
                  ((p === 'HEAD' || S.statusCode === 204) && delete S.headers['content-encoding'],
                  (S.headers['content-encoding'] || '').toLowerCase())
                ) {
                  case 'gzip':
                  case 'x-gzip':
                  case 'compress':
                  case 'x-compress':
                    L.push(ai.default.createUnzip(Dh)), delete S.headers['content-encoding'];
                    break;
                  case 'deflate':
                    L.push(new s0()), L.push(ai.default.createUnzip(Dh)), delete S.headers['content-encoding'];
                    break;
                  case 'br':
                    Fh && (L.push(ai.default.createBrotliDecompress(o0)), delete S.headers['content-encoding']);
                }
              Q = L.length > 1 ? si.default.pipeline(L, x.noop) : L[0];
              let T = si.default.finished(Q, () => {
                  T(), b();
                }),
                I = {
                  status: S.statusCode,
                  statusText: S.statusMessage,
                  headers: new Je(S.headers),
                  config: e,
                  request: _,
                };
              if (l === 'stream') (I.data = Q), gs(n, s, I);
              else {
                let B = [],
                  re = 0;
                Q.on('data', function (ne) {
                  B.push(ne),
                    (re += ne.length),
                    e.maxContentLength > -1 &&
                      re > e.maxContentLength &&
                      ((f = !0),
                      Q.destroy(),
                      s(
                        new C('maxContentLength size of ' + e.maxContentLength + ' exceeded', C.ERR_BAD_RESPONSE, e, _)
                      ));
                }),
                  Q.on('aborted', function () {
                    if (f) return;
                    let ne = new C(
                      'maxContentLength size of ' + e.maxContentLength + ' exceeded',
                      C.ERR_BAD_RESPONSE,
                      e,
                      _
                    );
                    Q.destroy(ne), s(ne);
                  }),
                  Q.on('error', function (ne) {
                    h.destroyed || s(C.from(ne, null, e, _));
                  }),
                  Q.on('end', function () {
                    try {
                      let ne = B.length === 1 ? B[0] : Buffer.concat(B);
                      l !== 'arraybuffer' && ((ne = ne.toString(c)), (!c || c === 'utf8') && (ne = x.stripBOM(ne))),
                        (I.data = ne);
                    } catch (ne) {
                      return s(C.from(ne, null, e, I.request, I));
                    }
                    gs(n, s, I);
                  });
              }
              m.once('abort', (B) => {
                Q.destroyed || (Q.emit('error', B), Q.destroy());
              });
            })),
            m.once('abort', (w) => {
              s(w), h.destroy(w);
            }),
            h.on('error', function (S) {
              s(C.from(S, null, e, h));
            }),
            h.on('socket', function (S) {
              S.setKeepAlive(!0, 1e3 * 60);
            }),
            e.timeout)
          ) {
            let w = parseInt(e.timeout, 10);
            if (Number.isNaN(w)) {
              s(new C('error trying to parse `config.timeout` to int', C.ERR_BAD_OPTION_VALUE, e, h));
              return;
            }
            h.setTimeout(w, function () {
              if (d) return;
              let L = e.timeout ? 'timeout of ' + e.timeout + 'ms exceeded' : 'timeout exceeded',
                ie = e.transitional || Dc;
              e.timeoutErrorMessage && (L = e.timeoutErrorMessage),
                s(new C(L, ie.clarifyTimeoutError ? C.ETIMEDOUT : C.ECONNABORTED, e, h)),
                v();
            });
          }
          if (x.isStream(a)) {
            let w = !1,
              S = !1;
            a.on('end', () => {
              w = !0;
            }),
              a.once('error', (L) => {
                (S = !0), h.destroy(L);
              }),
              a.on('close', () => {
                !w && !S && v(new Fi('Request stream has been aborted', e, h));
              }),
              a.pipe(h);
          } else h.end(a);
        });
      },
    x0 = Xe.hasStandardBrowserEnv
      ? {
          write(t, e, i, n, s, r) {
            let a = [t + '=' + encodeURIComponent(e)];
            x.isNumber(i) && a.push('expires=' + new Date(i).toGMTString()),
              x.isString(n) && a.push('path=' + n),
              x.isString(s) && a.push('domain=' + s),
              r === !0 && a.push('secure'),
              (document.cookie = a.join('; '));
          },
          read(t) {
            let e = document.cookie.match(new RegExp('(^|;\\s*)(' + t + ')=([^;]*)'));
            return e ? decodeURIComponent(e[3]) : null;
          },
          remove(t) {
            this.write(t, '', Date.now() - 864e5);
          },
        }
      : {
          write() {},
          read() {
            return null;
          },
          remove() {},
        },
    v0 = Xe.hasStandardBrowserEnv
      ? (function () {
          let e = /(msie|trident)/i.test(navigator.userAgent),
            i = document.createElement('a'),
            n;
          function s(r) {
            let a = r;
            return (
              e && (i.setAttribute('href', a), (a = i.href)),
              i.setAttribute('href', a),
              {
                href: i.href,
                protocol: i.protocol ? i.protocol.replace(/:$/, '') : '',
                host: i.host,
                search: i.search ? i.search.replace(/^\?/, '') : '',
                hash: i.hash ? i.hash.replace(/^#/, '') : '',
                hostname: i.hostname,
                port: i.port,
                pathname: i.pathname.charAt(0) === '/' ? i.pathname : '/' + i.pathname,
              }
            );
          }
          return (
            (n = s(window.location.href)),
            function (a) {
              let o = x.isString(a) ? s(a) : a;
              return o.protocol === n.protocol && o.host === n.host;
            }
          );
        })()
      : (function () {
          return function () {
            return !0;
          };
        })();
  function Bh(t, e) {
    let i = 0,
      n = uf(50, 250);
    return (s) => {
      let r = s.loaded,
        a = s.lengthComputable ? s.total : void 0,
        o = r - i,
        u = n(o),
        l = r <= a;
      i = r;
      let c = {
        loaded: r,
        total: a,
        progress: a ? r / a : void 0,
        bytes: o,
        rate: u || void 0,
        estimated: u && a && l ? (a - r) / u : void 0,
        event: s,
      };
      (c[e ? 'download' : 'upload'] = !0), t(c);
    };
  }
  var y0 = typeof XMLHttpRequest < 'u',
    b0 =
      y0 &&
      function (t) {
        return new Promise(function (i, n) {
          let s = t.data,
            r = Je.from(t.headers).normalize(),
            { responseType: a, withXSRFToken: o } = t,
            u;
          function l() {
            t.cancelToken && t.cancelToken.unsubscribe(u), t.signal && t.signal.removeEventListener('abort', u);
          }
          let c;
          if (x.isFormData(s)) {
            if (Xe.hasStandardBrowserEnv || Xe.hasStandardBrowserWebWorkerEnv) r.setContentType(!1);
            else if ((c = r.getContentType()) !== !1) {
              let [m, ...b] = c
                ? c
                    .split(';')
                    .map((v) => v.trim())
                    .filter(Boolean)
                : [];
              r.setContentType([m || 'multipart/form-data', ...b].join('; '));
            }
          }
          let p = new XMLHttpRequest();
          if (t.auth) {
            let m = t.auth.username || '',
              b = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : '';
            r.set('Authorization', 'Basic ' + btoa(m + ':' + b));
          }
          let d = Uc(t.baseURL, t.url);
          p.open(t.method.toUpperCase(), Ac(d, t.params, t.paramsSerializer), !0), (p.timeout = t.timeout);
          function f() {
            if (!p) return;
            let m = Je.from('getAllResponseHeaders' in p && p.getAllResponseHeaders()),
              v = {
                data: !a || a === 'text' || a === 'json' ? p.responseText : p.response,
                status: p.status,
                statusText: p.statusText,
                headers: m,
                config: t,
                request: p,
              };
            gs(
              function (g) {
                i(g), l();
              },
              function (g) {
                n(g), l();
              },
              v
            ),
              (p = null);
          }
          if (
            ('onloadend' in p
              ? (p.onloadend = f)
              : (p.onreadystatechange = function () {
                  !p ||
                    p.readyState !== 4 ||
                    (p.status === 0 && !(p.responseURL && p.responseURL.indexOf('file:') === 0)) ||
                    setTimeout(f);
                }),
            (p.onabort = function () {
              p && (n(new C('Request aborted', C.ECONNABORTED, t, p)), (p = null));
            }),
            (p.onerror = function () {
              n(new C('Network Error', C.ERR_NETWORK, t, p)), (p = null);
            }),
            (p.ontimeout = function () {
              let b = t.timeout ? 'timeout of ' + t.timeout + 'ms exceeded' : 'timeout exceeded',
                v = t.transitional || Dc;
              t.timeoutErrorMessage && (b = t.timeoutErrorMessage),
                n(new C(b, v.clarifyTimeoutError ? C.ETIMEDOUT : C.ECONNABORTED, t, p)),
                (p = null);
            }),
            Xe.hasStandardBrowserEnv && (o && x.isFunction(o) && (o = o(t)), o || (o !== !1 && v0(d))))
          ) {
            let m = t.xsrfHeaderName && t.xsrfCookieName && x0.read(t.xsrfCookieName);
            m && r.set(t.xsrfHeaderName, m);
          }
          s === void 0 && r.setContentType(null),
            'setRequestHeader' in p &&
              x.forEach(r.toJSON(), function (b, v) {
                p.setRequestHeader(v, b);
              }),
            x.isUndefined(t.withCredentials) || (p.withCredentials = !!t.withCredentials),
            a && a !== 'json' && (p.responseType = t.responseType),
            typeof t.onDownloadProgress == 'function' && p.addEventListener('progress', Bh(t.onDownloadProgress, !0)),
            typeof t.onUploadProgress == 'function' &&
              p.upload &&
              p.upload.addEventListener('progress', Bh(t.onUploadProgress)),
            (t.cancelToken || t.signal) &&
              ((u = (m) => {
                p && (n(!m || m.type ? new Fi(null, t, p) : m), p.abort(), (p = null));
              }),
              t.cancelToken && t.cancelToken.subscribe(u),
              t.signal && (t.signal.aborted ? u() : t.signal.addEventListener('abort', u)));
          let h = lf(d);
          if (h && Xe.protocols.indexOf(h) === -1) {
            n(new C('Unsupported protocol ' + h + ':', C.ERR_BAD_REQUEST, t));
            return;
          }
          p.send(s || null);
        });
      },
    Cc = { http: m0, xhr: b0 };
  x.forEach(Cc, (t, e) => {
    if (t) {
      try {
        Object.defineProperty(t, 'name', { value: e });
      } catch {}
      Object.defineProperty(t, 'adapterName', { value: e });
    }
  });
  var Mh = (t) => `- ${t}`,
    g0 = (t) => x.isFunction(t) || t === null || t === !1,
    hf = {
      getAdapter: (t) => {
        t = x.isArray(t) ? t : [t];
        let { length: e } = t,
          i,
          n,
          s = {};
        for (let r = 0; r < e; r++) {
          i = t[r];
          let a;
          if (((n = i), !g0(i) && ((n = Cc[(a = String(i)).toLowerCase()]), n === void 0)))
            throw new C(`Unknown adapter '${a}'`);
          if (n) break;
          s[a || '#' + r] = n;
        }
        if (!n) {
          let r = Object.entries(s).map(
              ([o, u]) =>
                `adapter ${o} ` + (u === !1 ? 'is not supported by the environment' : 'is not available in the build')
            ),
            a = e
              ? r.length > 1
                ? `since :
` +
                  r.map(Mh).join(`
`)
                : ' ' + Mh(r[0])
              : 'as no adapter specified';
          throw new C('There is no suitable adapter to dispatch the request ' + a, 'ERR_NOT_SUPPORT');
        }
        return n;
      },
      adapters: Cc,
    };
  function _c(t) {
    if ((t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)) throw new Fi(null, t);
  }
  function qh(t) {
    return (
      _c(t),
      (t.headers = Je.from(t.headers)),
      (t.data = gc.call(t, t.transformRequest)),
      ['post', 'put', 'patch'].indexOf(t.method) !== -1 &&
        t.headers.setContentType('application/x-www-form-urlencoded', !1),
      hf
        .getAdapter(t.adapter || Pc.adapter)(t)
        .then(
          function (n) {
            return _c(t), (n.data = gc.call(t, t.transformResponse, n)), (n.headers = Je.from(n.headers)), n;
          },
          function (n) {
            return (
              cf(n) ||
                (_c(t),
                n &&
                  n.response &&
                  ((n.response.data = gc.call(t, t.transformResponse, n.response)),
                  (n.response.headers = Je.from(n.response.headers)))),
              Promise.reject(n)
            );
          }
        )
    );
  }
  var jh = (t) => (t instanceof Je ? t.toJSON() : t);
  function fn(t, e) {
    e = e || {};
    let i = {};
    function n(l, c, p) {
      return x.isPlainObject(l) && x.isPlainObject(c)
        ? x.merge.call({ caseless: p }, l, c)
        : x.isPlainObject(c)
        ? x.merge({}, c)
        : x.isArray(c)
        ? c.slice()
        : c;
    }
    function s(l, c, p) {
      if (x.isUndefined(c)) {
        if (!x.isUndefined(l)) return n(void 0, l, p);
      } else return n(l, c, p);
    }
    function r(l, c) {
      if (!x.isUndefined(c)) return n(void 0, c);
    }
    function a(l, c) {
      if (x.isUndefined(c)) {
        if (!x.isUndefined(l)) return n(void 0, l);
      } else return n(void 0, c);
    }
    function o(l, c, p) {
      if (p in e) return n(l, c);
      if (p in t) return n(void 0, l);
    }
    let u = {
      url: r,
      method: r,
      data: r,
      baseURL: a,
      transformRequest: a,
      transformResponse: a,
      paramsSerializer: a,
      timeout: a,
      timeoutMessage: a,
      withCredentials: a,
      withXSRFToken: a,
      adapter: a,
      responseType: a,
      xsrfCookieName: a,
      xsrfHeaderName: a,
      onUploadProgress: a,
      onDownloadProgress: a,
      decompress: a,
      maxContentLength: a,
      maxBodyLength: a,
      beforeRedirect: a,
      transport: a,
      httpAgent: a,
      httpsAgent: a,
      cancelToken: a,
      socketPath: a,
      responseEncoding: a,
      validateStatus: o,
      headers: (l, c) => s(jh(l), jh(c), !0),
    };
    return (
      x.forEach(Object.keys(Object.assign({}, t, e)), function (c) {
        let p = u[c] || s,
          d = p(t[c], e[c], c);
        (x.isUndefined(d) && p !== o) || (i[c] = d);
      }),
      i
    );
  }
  var Bc = {};
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((t, e) => {
    Bc[t] = function (n) {
      return typeof n === t || 'a' + (e < 1 ? 'n ' : ' ') + t;
    };
  });
  var zh = {};
  Bc.transitional = function (e, i, n) {
    function s(r, a) {
      return '[Axios v' + Pr + "] Transitional option '" + r + "'" + a + (n ? '. ' + n : '');
    }
    return (r, a, o) => {
      if (e === !1) throw new C(s(a, ' has been removed' + (i ? ' in ' + i : '')), C.ERR_DEPRECATED);
      return (
        i &&
          !zh[a] &&
          ((zh[a] = !0),
          console.warn(s(a, ' has been deprecated since v' + i + ' and will be removed in the near future'))),
        e ? e(r, a, o) : !0
      );
    };
  };
  function _0(t, e, i) {
    if (typeof t != 'object') throw new C('options must be an object', C.ERR_BAD_OPTION_VALUE);
    let n = Object.keys(t),
      s = n.length;
    for (; s-- > 0; ) {
      let r = n[s],
        a = e[r];
      if (a) {
        let o = t[r],
          u = o === void 0 || a(o, r, t);
        if (u !== !0) throw new C('option ' + r + ' must be ' + u, C.ERR_BAD_OPTION_VALUE);
        continue;
      }
      if (i !== !0) throw new C('Unknown option ' + r, C.ERR_BAD_OPTION);
    }
  }
  var Ic = { assertOptions: _0, validators: Bc },
    ni = Ic.validators,
    mn = class {
      constructor(e) {
        (this.defaults = e), (this.interceptors = { request: new Nh(), response: new Nh() });
      }
      async request(e, i) {
        try {
          return await this._request(e, i);
        } catch (n) {
          if (n instanceof Error) {
            let s;
            Error.captureStackTrace ? Error.captureStackTrace((s = {})) : (s = new Error());
            let r = s.stack ? s.stack.replace(/^.+\n/, '') : '';
            n.stack
              ? r &&
                !String(n.stack).endsWith(r.replace(/^.+\n.+\n/, '')) &&
                (n.stack +=
                  `
` + r)
              : (n.stack = r);
          }
          throw n;
        }
      }
      _request(e, i) {
        typeof e == 'string' ? ((i = i || {}), (i.url = e)) : (i = e || {}), (i = fn(this.defaults, i));
        let { transitional: n, paramsSerializer: s, headers: r } = i;
        n !== void 0 &&
          Ic.assertOptions(
            n,
            {
              silentJSONParsing: ni.transitional(ni.boolean),
              forcedJSONParsing: ni.transitional(ni.boolean),
              clarifyTimeoutError: ni.transitional(ni.boolean),
            },
            !1
          ),
          s != null &&
            (x.isFunction(s)
              ? (i.paramsSerializer = { serialize: s })
              : Ic.assertOptions(s, { encode: ni.function, serialize: ni.function }, !0)),
          (i.method = (i.method || this.defaults.method || 'get').toLowerCase());
        let a = r && x.merge(r.common, r[i.method]);
        r &&
          x.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], (h) => {
            delete r[h];
          }),
          (i.headers = Je.concat(a, r));
        let o = [],
          u = !0;
        this.interceptors.request.forEach(function (m) {
          (typeof m.runWhen == 'function' && m.runWhen(i) === !1) ||
            ((u = u && m.synchronous), o.unshift(m.fulfilled, m.rejected));
        });
        let l = [];
        this.interceptors.response.forEach(function (m) {
          l.push(m.fulfilled, m.rejected);
        });
        let c,
          p = 0,
          d;
        if (!u) {
          let h = [qh.bind(this), void 0];
          for (h.unshift.apply(h, o), h.push.apply(h, l), d = h.length, c = Promise.resolve(i); p < d; )
            c = c.then(h[p++], h[p++]);
          return c;
        }
        d = o.length;
        let f = i;
        for (p = 0; p < d; ) {
          let h = o[p++],
            m = o[p++];
          try {
            f = h(f);
          } catch (b) {
            m.call(this, b);
            break;
          }
        }
        try {
          c = qh.call(this, f);
        } catch (h) {
          return Promise.reject(h);
        }
        for (p = 0, d = l.length; p < d; ) c = c.then(l[p++], l[p++]);
        return c;
      }
      getUri(e) {
        e = fn(this.defaults, e);
        let i = Uc(e.baseURL, e.url);
        return Ac(i, e.params, e.paramsSerializer);
      }
    };
  x.forEach(['delete', 'get', 'head', 'options'], function (e) {
    mn.prototype[e] = function (i, n) {
      return this.request(fn(n || {}, { method: e, url: i, data: (n || {}).data }));
    };
  });
  x.forEach(['post', 'put', 'patch'], function (e) {
    function i(n) {
      return function (r, a, o) {
        return this.request(
          fn(o || {}, { method: e, headers: n ? { 'Content-Type': 'multipart/form-data' } : {}, url: r, data: a })
        );
      };
    }
    (mn.prototype[e] = i()), (mn.prototype[e + 'Form'] = i(!0));
  });
  var Fr = mn,
    Nc = class t {
      constructor(e) {
        if (typeof e != 'function') throw new TypeError('executor must be a function.');
        let i;
        this.promise = new Promise(function (r) {
          i = r;
        });
        let n = this;
        this.promise.then((s) => {
          if (!n._listeners) return;
          let r = n._listeners.length;
          for (; r-- > 0; ) n._listeners[r](s);
          n._listeners = null;
        }),
          (this.promise.then = (s) => {
            let r,
              a = new Promise((o) => {
                n.subscribe(o), (r = o);
              }).then(s);
            return (
              (a.cancel = function () {
                n.unsubscribe(r);
              }),
              a
            );
          }),
          e(function (r, a, o) {
            n.reason || ((n.reason = new Fi(r, a, o)), i(n.reason));
          });
      }
      throwIfRequested() {
        if (this.reason) throw this.reason;
      }
      subscribe(e) {
        if (this.reason) {
          e(this.reason);
          return;
        }
        this._listeners ? this._listeners.push(e) : (this._listeners = [e]);
      }
      unsubscribe(e) {
        if (!this._listeners) return;
        let i = this._listeners.indexOf(e);
        i !== -1 && this._listeners.splice(i, 1);
      }
      static source() {
        let e;
        return {
          token: new t(function (s) {
            e = s;
          }),
          cancel: e,
        };
      }
    },
    E0 = Nc;
  function w0(t) {
    return function (i) {
      return t.apply(null, i);
    };
  }
  function S0(t) {
    return x.isObject(t) && t.isAxiosError === !0;
  }
  var kc = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
  };
  Object.entries(kc).forEach(([t, e]) => {
    kc[e] = t;
  });
  var R0 = kc;
  function ff(t) {
    let e = new Fr(t),
      i = Wh(Fr.prototype.request, e);
    return (
      x.extend(i, Fr.prototype, e, { allOwnKeys: !0 }),
      x.extend(i, e, null, { allOwnKeys: !0 }),
      (i.create = function (s) {
        return ff(fn(t, s));
      }),
      i
    );
  }
  var le = ff(Pc);
  le.Axios = Fr;
  le.CanceledError = Fi;
  le.CancelToken = E0;
  le.isCancel = cf;
  le.VERSION = Pr;
  le.toFormData = qr;
  le.AxiosError = C;
  le.Cancel = le.CanceledError;
  le.all = function (e) {
    return Promise.all(e);
  };
  le.spread = w0;
  le.isAxiosError = S0;
  le.mergeConfig = fn;
  le.AxiosHeaders = Je;
  le.formToJSON = (t) => of(x.isHTMLForm(t) ? new FormData(t) : t);
  le.getAdapter = hf.getAdapter;
  le.HttpStatusCode = R0;
  le.default = le;
  mf.exports = le;
});
function zr(t, e = null, i = 1e4) {
  let n = (o) => o,
    s = process.env.NX_CLOUD_API || t.url || 'https://cloud.nx.app',
    r = ps ? ps : t.accessToken,
    a = t.nxCloudId;
  if (((e = e ?? new wr(s)), !r && !a))
    throw new Error(
      'Unable to authenticate. Please connect your workspace to Nx Cloud to define a valid Nx Cloud ID. If you are in a CI context, please set the NX_CLOUD_ACCESS_TOKEN environment variable or define an access token in your nx.json.'
    );
  if (t.customProxyConfigPath) {
    let { nxCloudProxyConfig: o } = require((0, vf.join)(process.cwd(), t.customProxyConfigPath));
    n = o ?? n;
  }
  return T0.create(
    n({
      baseURL: s,
      timeout: Fe ? ki : i,
      headers: {
        authorization: r,
        [C0]: t.nxCloudId,
        [O0]: e.getPersonalAccessTokenFromNxCloudUrl(),
        'Nx-Cloud-Client-Version': t.clientVersion || 'unknown',
      },
    })
  );
}
async function zc(t, e) {
  let i = new Date(),
    n = await e();
  return D && console.log(`${t}: ${new Date().getTime() - i.getTime()}`), n;
}
async function I0(t) {
  try {
    return await t();
  } catch (e) {
    let i = (e.response && e.response.status) || e.code,
      n = e.response ? (e.response.data.message ? e.response.data.message : e.response.data) : e.message;
    n = wd(n);
    let s =
      (n == null
        ? void 0
        : n.split(`
`)) || [];
    throw new jc('failure', N0(i), e, s);
  }
}
async function ot(t, e = us) {
  var i, n, s;
  try {
    return await I0(t);
  } catch (r) {
    let a = ((i = r.axiosException) == null ? void 0 : i.code) ?? r.code,
      o = ((n = r.axiosException) == null ? void 0 : n.message) ?? r.message;
    if (e === 0 || a === 401 || a === 403)
      throw (
        (D &&
          qc.note({
            title: `Connection to Nx Cloud failed with status code ${a}`,
            bodyLines: (s = r.axiosException) == null ? void 0 : s.bodyLines,
          }),
        r.axiosException ?? r)
      );
    if (a === 429) {
      if (!jr) {
        let u = 1e4 + (us + 1 - e) * 6e4 * Math.random();
        qc.note({ title: `Received Code ${a}. ${o ? `${o}. ` : ''}Retrying in ${xf(u)}s.` }), (jr = Li(u));
      }
      await jr, (jr = null);
    } else {
      let u = 1e3 + (us + 1 - e) * 4e3 * Math.random();
      D && qc.note({ title: `Received Code ${a}. Retrying in ${xf(u)}s.` }), await Li(u);
    }
    return ot(t, e - 1);
  }
}
function xf(t) {
  return Math.round(t / 1e3);
}
function N0(t) {
  let e = `${t}:`;
  switch (t) {
    case 400:
      return `${e} Invalid request to Nx Cloud.`;
    case 403:
      return `${e} Access to resource is not authorized.`;
    case 404:
      return `${e} Cannot find requested resource.`;
    case 500:
      return `${e} Unexpected server error.`;
    case 'ECONNABORTED':
    case 'ETIMEOUT':
      return `${e} Connection timed out, check for other network problems.`;
    case 'ECONNRESET':
      return `${e} The connection to Nx Cloud was closed suddenly.`;
    case 'ECONNREFUSED':
      return `${e} Cannot connect to server. Please check that you have the correct server address and port number.`;
    case 'ENOTFOUND':
      return `${e} DNS error due to invalid host. Are you accessing Nx Cloud from a network proxy?`;
    case 'SELF_SIGNED_CERT_IN_CHAIN':
      return `${e} Found a self-signed cert in certificate chain. Ensure you have verified trust for all certs in your network.`;
    default:
      return `${e} Unable to connect to Nx Cloud.`;
  }
}
var vf,
  qc,
  T0,
  jc,
  O0,
  C0,
  jr,
  Gr = ce(() => {
    'use strict';
    vf = require('path');
    mt();
    gd();
    $o();
    Rr();
    ({ output: qc } = ft()),
      (T0 = Mc()),
      (jc = class {
        constructor(e, i, n, s) {
          this.type = e;
          this.message = i;
          this.axiosException = n;
          this.bodyLines = s;
        }
      }),
      (O0 = 'Nx-Cloud-Personal-Access-Token'),
      (C0 = 'Nx-Cloud-Id');
    jr = null;
  });
var vn = y((VL, bf) => {
  'use strict';
  var yf = new Map([
    ['C', 'cwd'],
    ['f', 'file'],
    ['z', 'gzip'],
    ['P', 'preservePaths'],
    ['U', 'unlink'],
    ['strip-components', 'strip'],
    ['stripComponents', 'strip'],
    ['keep-newer', 'newer'],
    ['keepNewer', 'newer'],
    ['keep-newer-files', 'newer'],
    ['keepNewerFiles', 'newer'],
    ['k', 'keep'],
    ['keep-existing', 'keep'],
    ['keepExisting', 'keep'],
    ['m', 'noMtime'],
    ['no-mtime', 'noMtime'],
    ['p', 'preserveOwner'],
    ['L', 'follow'],
    ['h', 'follow'],
  ]);
  bf.exports = (t) =>
    t
      ? Object.keys(t)
          .map((e) => [yf.has(e) ? yf.get(e) : e, t[e]])
          .reduce((e, i) => ((e[i[0]] = i[1]), e), Object.create(null))
      : {};
});
var Yr = y((If) => {
  'use strict';
  var gf = typeof process == 'object' && process ? process : { stdout: null, stderr: null },
    k0 = require('events'),
    _f = require('stream'),
    L0 = require('string_decoder'),
    Ef = L0.StringDecoder,
    It = Symbol('EOF'),
    Nt = Symbol('maybeEmitEnd'),
    oi = Symbol('emittedEnd'),
    Hr = Symbol('emittingEnd'),
    Ss = Symbol('emittedError'),
    $r = Symbol('closed'),
    wf = Symbol('read'),
    Wr = Symbol('flush'),
    Sf = Symbol('flushChunk'),
    Be = Symbol('encoding'),
    kt = Symbol('decoder'),
    Vr = Symbol('flowing'),
    Rs = Symbol('paused'),
    yn = Symbol('resume'),
    ae = Symbol('buffer'),
    yt = Symbol('pipes'),
    fe = Symbol('bufferLength'),
    Gc = Symbol('bufferPush'),
    Hc = Symbol('bufferShift'),
    _e = Symbol('objectMode'),
    oe = Symbol('destroyed'),
    $c = Symbol('error'),
    Wc = Symbol('emitData'),
    Rf = Symbol('emitEnd'),
    Vc = Symbol('emitEnd2'),
    Lt = Symbol('async'),
    Kc = Symbol('abort'),
    Kr = Symbol('aborted'),
    Pi = Symbol('signal'),
    Ts = (t) => Promise.resolve().then(t),
    Cf = global._MP_NO_ITERATOR_SYMBOLS_ !== '1',
    Tf = (Cf && Symbol.asyncIterator) || Symbol('asyncIterator not implemented'),
    Of = (Cf && Symbol.iterator) || Symbol('iterator not implemented'),
    A0 = (t) => t === 'end' || t === 'finish' || t === 'prefinish',
    D0 = (t) =>
      t instanceof ArrayBuffer ||
      (typeof t == 'object' && t.constructor && t.constructor.name === 'ArrayBuffer' && t.byteLength >= 0),
    F0 = (t) => !Buffer.isBuffer(t) && ArrayBuffer.isView(t),
    Xr = class {
      constructor(e, i, n) {
        (this.src = e), (this.dest = i), (this.opts = n), (this.ondrain = () => e[yn]()), i.on('drain', this.ondrain);
      }
      unpipe() {
        this.dest.removeListener('drain', this.ondrain);
      }
      proxyErrors() {}
      end() {
        this.unpipe(), this.opts.end && this.dest.end();
      }
    },
    Xc = class extends Xr {
      unpipe() {
        this.src.removeListener('error', this.proxyErrors), super.unpipe();
      }
      constructor(e, i, n) {
        super(e, i, n), (this.proxyErrors = (s) => i.emit('error', s)), e.on('error', this.proxyErrors);
      }
    },
    Yc = class t extends _f {
      constructor(e) {
        super(),
          (this[Vr] = !1),
          (this[Rs] = !1),
          (this[yt] = []),
          (this[ae] = []),
          (this[_e] = (e && e.objectMode) || !1),
          this[_e] ? (this[Be] = null) : (this[Be] = (e && e.encoding) || null),
          this[Be] === 'buffer' && (this[Be] = null),
          (this[Lt] = (e && !!e.async) || !1),
          (this[kt] = this[Be] ? new Ef(this[Be]) : null),
          (this[It] = !1),
          (this[oi] = !1),
          (this[Hr] = !1),
          (this[$r] = !1),
          (this[Ss] = null),
          (this.writable = !0),
          (this.readable = !0),
          (this[fe] = 0),
          (this[oe] = !1),
          e && e.debugExposeBuffer === !0 && Object.defineProperty(this, 'buffer', { get: () => this[ae] }),
          e && e.debugExposePipes === !0 && Object.defineProperty(this, 'pipes', { get: () => this[yt] }),
          (this[Pi] = e && e.signal),
          (this[Kr] = !1),
          this[Pi] && (this[Pi].addEventListener('abort', () => this[Kc]()), this[Pi].aborted && this[Kc]());
      }
      get bufferLength() {
        return this[fe];
      }
      get encoding() {
        return this[Be];
      }
      set encoding(e) {
        if (this[_e]) throw new Error('cannot set encoding in objectMode');
        if (this[Be] && e !== this[Be] && ((this[kt] && this[kt].lastNeed) || this[fe]))
          throw new Error('cannot change encoding');
        this[Be] !== e &&
          ((this[kt] = e ? new Ef(e) : null), this[ae].length && (this[ae] = this[ae].map((i) => this[kt].write(i)))),
          (this[Be] = e);
      }
      setEncoding(e) {
        this.encoding = e;
      }
      get objectMode() {
        return this[_e];
      }
      set objectMode(e) {
        this[_e] = this[_e] || !!e;
      }
      get async() {
        return this[Lt];
      }
      set async(e) {
        this[Lt] = this[Lt] || !!e;
      }
      [Kc]() {
        (this[Kr] = !0), this.emit('abort', this[Pi].reason), this.destroy(this[Pi].reason);
      }
      get aborted() {
        return this[Kr];
      }
      set aborted(e) {}
      write(e, i, n) {
        if (this[Kr]) return !1;
        if (this[It]) throw new Error('write after end');
        if (this[oe])
          return (
            this.emit(
              'error',
              Object.assign(new Error('Cannot call write after a stream was destroyed'), {
                code: 'ERR_STREAM_DESTROYED',
              })
            ),
            !0
          );
        typeof i == 'function' && ((n = i), (i = 'utf8')), i || (i = 'utf8');
        let s = this[Lt] ? Ts : (r) => r();
        return (
          !this[_e] &&
            !Buffer.isBuffer(e) &&
            (F0(e)
              ? (e = Buffer.from(e.buffer, e.byteOffset, e.byteLength))
              : D0(e)
              ? (e = Buffer.from(e))
              : typeof e != 'string' && (this.objectMode = !0)),
          this[_e]
            ? (this.flowing && this[fe] !== 0 && this[Wr](!0),
              this.flowing ? this.emit('data', e) : this[Gc](e),
              this[fe] !== 0 && this.emit('readable'),
              n && s(n),
              this.flowing)
            : e.length
            ? (typeof e == 'string' && !(i === this[Be] && !this[kt].lastNeed) && (e = Buffer.from(e, i)),
              Buffer.isBuffer(e) && this[Be] && (e = this[kt].write(e)),
              this.flowing && this[fe] !== 0 && this[Wr](!0),
              this.flowing ? this.emit('data', e) : this[Gc](e),
              this[fe] !== 0 && this.emit('readable'),
              n && s(n),
              this.flowing)
            : (this[fe] !== 0 && this.emit('readable'), n && s(n), this.flowing)
        );
      }
      read(e) {
        if (this[oe]) return null;
        if (this[fe] === 0 || e === 0 || e > this[fe]) return this[Nt](), null;
        this[_e] && (e = null),
          this[ae].length > 1 &&
            !this[_e] &&
            (this.encoding ? (this[ae] = [this[ae].join('')]) : (this[ae] = [Buffer.concat(this[ae], this[fe])]));
        let i = this[wf](e || null, this[ae][0]);
        return this[Nt](), i;
      }
      [wf](e, i) {
        return (
          e === i.length || e === null
            ? this[Hc]()
            : ((this[ae][0] = i.slice(e)), (i = i.slice(0, e)), (this[fe] -= e)),
          this.emit('data', i),
          !this[ae].length && !this[It] && this.emit('drain'),
          i
        );
      }
      end(e, i, n) {
        return (
          typeof e == 'function' && ((n = e), (e = null)),
          typeof i == 'function' && ((n = i), (i = 'utf8')),
          e && this.write(e, i),
          n && this.once('end', n),
          (this[It] = !0),
          (this.writable = !1),
          (this.flowing || !this[Rs]) && this[Nt](),
          this
        );
      }
      [yn]() {
        this[oe] ||
          ((this[Rs] = !1),
          (this[Vr] = !0),
          this.emit('resume'),
          this[ae].length ? this[Wr]() : this[It] ? this[Nt]() : this.emit('drain'));
      }
      resume() {
        return this[yn]();
      }
      pause() {
        (this[Vr] = !1), (this[Rs] = !0);
      }
      get destroyed() {
        return this[oe];
      }
      get flowing() {
        return this[Vr];
      }
      get paused() {
        return this[Rs];
      }
      [Gc](e) {
        this[_e] ? (this[fe] += 1) : (this[fe] += e.length), this[ae].push(e);
      }
      [Hc]() {
        return this[_e] ? (this[fe] -= 1) : (this[fe] -= this[ae][0].length), this[ae].shift();
      }
      [Wr](e) {
        do;
        while (this[Sf](this[Hc]()) && this[ae].length);
        !e && !this[ae].length && !this[It] && this.emit('drain');
      }
      [Sf](e) {
        return this.emit('data', e), this.flowing;
      }
      pipe(e, i) {
        if (this[oe]) return;
        let n = this[oi];
        return (
          (i = i || {}),
          e === gf.stdout || e === gf.stderr ? (i.end = !1) : (i.end = i.end !== !1),
          (i.proxyErrors = !!i.proxyErrors),
          n
            ? i.end && e.end()
            : (this[yt].push(i.proxyErrors ? new Xc(this, e, i) : new Xr(this, e, i)),
              this[Lt] ? Ts(() => this[yn]()) : this[yn]()),
          e
        );
      }
      unpipe(e) {
        let i = this[yt].find((n) => n.dest === e);
        i && (this[yt].splice(this[yt].indexOf(i), 1), i.unpipe());
      }
      addListener(e, i) {
        return this.on(e, i);
      }
      on(e, i) {
        let n = super.on(e, i);
        return (
          e === 'data' && !this[yt].length && !this.flowing
            ? this[yn]()
            : e === 'readable' && this[fe] !== 0
            ? super.emit('readable')
            : A0(e) && this[oi]
            ? (super.emit(e), this.removeAllListeners(e))
            : e === 'error' && this[Ss] && (this[Lt] ? Ts(() => i.call(this, this[Ss])) : i.call(this, this[Ss])),
          n
        );
      }
      get emittedEnd() {
        return this[oi];
      }
      [Nt]() {
        !this[Hr] &&
          !this[oi] &&
          !this[oe] &&
          this[ae].length === 0 &&
          this[It] &&
          ((this[Hr] = !0),
          this.emit('end'),
          this.emit('prefinish'),
          this.emit('finish'),
          this[$r] && this.emit('close'),
          (this[Hr] = !1));
      }
      emit(e, i, ...n) {
        if (e !== 'error' && e !== 'close' && e !== oe && this[oe]) return;
        if (e === 'data') return !this[_e] && !i ? !1 : this[Lt] ? Ts(() => this[Wc](i)) : this[Wc](i);
        if (e === 'end') return this[Rf]();
        if (e === 'close') {
          if (((this[$r] = !0), !this[oi] && !this[oe])) return;
          let r = super.emit('close');
          return this.removeAllListeners('close'), r;
        } else if (e === 'error') {
          (this[Ss] = i), super.emit($c, i);
          let r = !this[Pi] || this.listeners('error').length ? super.emit('error', i) : !1;
          return this[Nt](), r;
        } else if (e === 'resume') {
          let r = super.emit('resume');
          return this[Nt](), r;
        } else if (e === 'finish' || e === 'prefinish') {
          let r = super.emit(e);
          return this.removeAllListeners(e), r;
        }
        let s = super.emit(e, i, ...n);
        return this[Nt](), s;
      }
      [Wc](e) {
        for (let n of this[yt]) n.dest.write(e) === !1 && this.pause();
        let i = super.emit('data', e);
        return this[Nt](), i;
      }
      [Rf]() {
        this[oi] || ((this[oi] = !0), (this.readable = !1), this[Lt] ? Ts(() => this[Vc]()) : this[Vc]());
      }
      [Vc]() {
        if (this[kt]) {
          let i = this[kt].end();
          if (i) {
            for (let n of this[yt]) n.dest.write(i);
            super.emit('data', i);
          }
        }
        for (let i of this[yt]) i.end();
        let e = super.emit('end');
        return this.removeAllListeners('end'), e;
      }
      collect() {
        let e = [];
        this[_e] || (e.dataLength = 0);
        let i = this.promise();
        return (
          this.on('data', (n) => {
            e.push(n), this[_e] || (e.dataLength += n.length);
          }),
          i.then(() => e)
        );
      }
      concat() {
        return this[_e]
          ? Promise.reject(new Error('cannot concat in objectMode'))
          : this.collect().then((e) =>
              this[_e]
                ? Promise.reject(new Error('cannot concat in objectMode'))
                : this[Be]
                ? e.join('')
                : Buffer.concat(e, e.dataLength)
            );
      }
      promise() {
        return new Promise((e, i) => {
          this.on(oe, () => i(new Error('stream destroyed'))), this.on('error', (n) => i(n)), this.on('end', () => e());
        });
      }
      [Tf]() {
        let e = !1,
          i = () => (this.pause(), (e = !0), Promise.resolve({ done: !0 }));
        return {
          next: () => {
            if (e) return i();
            let s = this.read();
            if (s !== null) return Promise.resolve({ done: !1, value: s });
            if (this[It]) return i();
            let r = null,
              a = null,
              o = (p) => {
                this.removeListener('data', u), this.removeListener('end', l), this.removeListener(oe, c), i(), a(p);
              },
              u = (p) => {
                this.removeListener('error', o),
                  this.removeListener('end', l),
                  this.removeListener(oe, c),
                  this.pause(),
                  r({ value: p, done: !!this[It] });
              },
              l = () => {
                this.removeListener('error', o),
                  this.removeListener('data', u),
                  this.removeListener(oe, c),
                  i(),
                  r({ done: !0 });
              },
              c = () => o(new Error('stream destroyed'));
            return new Promise((p, d) => {
              (a = d), (r = p), this.once(oe, c), this.once('error', o), this.once('end', l), this.once('data', u);
            });
          },
          throw: i,
          return: i,
          [Tf]() {
            return this;
          },
        };
      }
      [Of]() {
        let e = !1,
          i = () => (
            this.pause(),
            this.removeListener($c, i),
            this.removeListener(oe, i),
            this.removeListener('end', i),
            (e = !0),
            { done: !0 }
          ),
          n = () => {
            if (e) return i();
            let s = this.read();
            return s === null ? i() : { value: s };
          };
        return (
          this.once('end', i),
          this.once($c, i),
          this.once(oe, i),
          {
            next: n,
            throw: i,
            return: i,
            [Of]() {
              return this;
            },
          }
        );
      }
      destroy(e) {
        return this[oe]
          ? (e ? this.emit('error', e) : this.emit(oe), this)
          : ((this[oe] = !0),
            (this[ae].length = 0),
            (this[fe] = 0),
            typeof this.close == 'function' && !this[$r] && this.close(),
            e ? this.emit('error', e) : this.emit(oe),
            this);
      }
      static isStream(e) {
        return (
          !!e &&
          (e instanceof t ||
            e instanceof _f ||
            (e instanceof k0 &&
              (typeof e.pipe == 'function' || (typeof e.write == 'function' && typeof e.end == 'function'))))
        );
      }
    };
  If.Minipass = Yc;
});
var kf = y((XL, Nf) => {
  'use strict';
  var P0 = require('zlib').constants || { ZLIB_VERNUM: 4736 };
  Nf.exports = Object.freeze(
    Object.assign(
      Object.create(null),
      {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_MEM_ERROR: -4,
        Z_BUF_ERROR: -5,
        Z_VERSION_ERROR: -6,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        DEFLATE: 1,
        INFLATE: 2,
        GZIP: 3,
        GUNZIP: 4,
        DEFLATERAW: 5,
        INFLATERAW: 6,
        UNZIP: 7,
        BROTLI_DECODE: 8,
        BROTLI_ENCODE: 9,
        Z_MIN_WINDOWBITS: 8,
        Z_MAX_WINDOWBITS: 15,
        Z_DEFAULT_WINDOWBITS: 15,
        Z_MIN_CHUNK: 64,
        Z_MAX_CHUNK: 1 / 0,
        Z_DEFAULT_CHUNK: 16384,
        Z_MIN_MEMLEVEL: 1,
        Z_MAX_MEMLEVEL: 9,
        Z_DEFAULT_MEMLEVEL: 8,
        Z_MIN_LEVEL: -1,
        Z_MAX_LEVEL: 9,
        Z_DEFAULT_LEVEL: -1,
        BROTLI_OPERATION_PROCESS: 0,
        BROTLI_OPERATION_FLUSH: 1,
        BROTLI_OPERATION_FINISH: 2,
        BROTLI_OPERATION_EMIT_METADATA: 3,
        BROTLI_MODE_GENERIC: 0,
        BROTLI_MODE_TEXT: 1,
        BROTLI_MODE_FONT: 2,
        BROTLI_DEFAULT_MODE: 0,
        BROTLI_MIN_QUALITY: 0,
        BROTLI_MAX_QUALITY: 11,
        BROTLI_DEFAULT_QUALITY: 11,
        BROTLI_MIN_WINDOW_BITS: 10,
        BROTLI_MAX_WINDOW_BITS: 24,
        BROTLI_LARGE_MAX_WINDOW_BITS: 30,
        BROTLI_DEFAULT_WINDOW: 22,
        BROTLI_MIN_INPUT_BLOCK_BITS: 16,
        BROTLI_MAX_INPUT_BLOCK_BITS: 24,
        BROTLI_PARAM_MODE: 0,
        BROTLI_PARAM_QUALITY: 1,
        BROTLI_PARAM_LGWIN: 2,
        BROTLI_PARAM_LGBLOCK: 3,
        BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4,
        BROTLI_PARAM_SIZE_HINT: 5,
        BROTLI_PARAM_LARGE_WINDOW: 6,
        BROTLI_PARAM_NPOSTFIX: 7,
        BROTLI_PARAM_NDIRECT: 8,
        BROTLI_DECODER_RESULT_ERROR: 0,
        BROTLI_DECODER_RESULT_SUCCESS: 1,
        BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2,
        BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3,
        BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0,
        BROTLI_DECODER_PARAM_LARGE_WINDOW: 1,
        BROTLI_DECODER_NO_ERROR: 0,
        BROTLI_DECODER_SUCCESS: 1,
        BROTLI_DECODER_NEEDS_MORE_INPUT: 2,
        BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3,
        BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1,
        BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2,
        BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3,
        BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4,
        BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5,
        BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6,
        BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7,
        BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8,
        BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9,
        BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10,
        BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11,
        BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12,
        BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13,
        BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14,
        BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15,
        BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16,
        BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19,
        BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20,
        BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21,
        BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22,
        BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25,
        BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26,
        BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27,
        BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30,
        BROTLI_DECODER_ERROR_UNREACHABLE: -31,
      },
      P0
    )
  );
});
var jf = y((YL, qf) => {
  'use strict';
  var Lf = typeof process == 'object' && process ? process : { stdout: null, stderr: null },
    U0 = require('events'),
    Af = require('stream'),
    Df = require('string_decoder').StringDecoder,
    At = Symbol('EOF'),
    Dt = Symbol('maybeEmitEnd'),
    ci = Symbol('emittedEnd'),
    Jr = Symbol('emittingEnd'),
    Os = Symbol('emittedError'),
    Zr = Symbol('closed'),
    Ff = Symbol('read'),
    Qr = Symbol('flush'),
    Pf = Symbol('flushChunk'),
    Me = Symbol('encoding'),
    Ft = Symbol('decoder'),
    ea = Symbol('flowing'),
    Cs = Symbol('paused'),
    bn = Symbol('resume'),
    me = Symbol('bufferLength'),
    Jc = Symbol('bufferPush'),
    Zc = Symbol('bufferShift'),
    Se = Symbol('objectMode'),
    Re = Symbol('destroyed'),
    Qc = Symbol('emitData'),
    Uf = Symbol('emitEnd'),
    el = Symbol('emitEnd2'),
    Pt = Symbol('async'),
    Is = (t) => Promise.resolve().then(t),
    Bf = global._MP_NO_ITERATOR_SYMBOLS_ !== '1',
    B0 = (Bf && Symbol.asyncIterator) || Symbol('asyncIterator not implemented'),
    M0 = (Bf && Symbol.iterator) || Symbol('iterator not implemented'),
    q0 = (t) => t === 'end' || t === 'finish' || t === 'prefinish',
    j0 = (t) =>
      t instanceof ArrayBuffer ||
      (typeof t == 'object' && t.constructor && t.constructor.name === 'ArrayBuffer' && t.byteLength >= 0),
    z0 = (t) => !Buffer.isBuffer(t) && ArrayBuffer.isView(t),
    ta = class {
      constructor(e, i, n) {
        (this.src = e), (this.dest = i), (this.opts = n), (this.ondrain = () => e[bn]()), i.on('drain', this.ondrain);
      }
      unpipe() {
        this.dest.removeListener('drain', this.ondrain);
      }
      proxyErrors() {}
      end() {
        this.unpipe(), this.opts.end && this.dest.end();
      }
    },
    tl = class extends ta {
      unpipe() {
        this.src.removeListener('error', this.proxyErrors), super.unpipe();
      }
      constructor(e, i, n) {
        super(e, i, n), (this.proxyErrors = (s) => i.emit('error', s)), e.on('error', this.proxyErrors);
      }
    };
  qf.exports = class Mf extends Af {
    constructor(e) {
      super(),
        (this[ea] = !1),
        (this[Cs] = !1),
        (this.pipes = []),
        (this.buffer = []),
        (this[Se] = (e && e.objectMode) || !1),
        this[Se] ? (this[Me] = null) : (this[Me] = (e && e.encoding) || null),
        this[Me] === 'buffer' && (this[Me] = null),
        (this[Pt] = (e && !!e.async) || !1),
        (this[Ft] = this[Me] ? new Df(this[Me]) : null),
        (this[At] = !1),
        (this[ci] = !1),
        (this[Jr] = !1),
        (this[Zr] = !1),
        (this[Os] = null),
        (this.writable = !0),
        (this.readable = !0),
        (this[me] = 0),
        (this[Re] = !1);
    }
    get bufferLength() {
      return this[me];
    }
    get encoding() {
      return this[Me];
    }
    set encoding(e) {
      if (this[Se]) throw new Error('cannot set encoding in objectMode');
      if (this[Me] && e !== this[Me] && ((this[Ft] && this[Ft].lastNeed) || this[me]))
        throw new Error('cannot change encoding');
      this[Me] !== e &&
        ((this[Ft] = e ? new Df(e) : null),
        this.buffer.length && (this.buffer = this.buffer.map((i) => this[Ft].write(i)))),
        (this[Me] = e);
    }
    setEncoding(e) {
      this.encoding = e;
    }
    get objectMode() {
      return this[Se];
    }
    set objectMode(e) {
      this[Se] = this[Se] || !!e;
    }
    get async() {
      return this[Pt];
    }
    set async(e) {
      this[Pt] = this[Pt] || !!e;
    }
    write(e, i, n) {
      if (this[At]) throw new Error('write after end');
      if (this[Re])
        return (
          this.emit(
            'error',
            Object.assign(new Error('Cannot call write after a stream was destroyed'), { code: 'ERR_STREAM_DESTROYED' })
          ),
          !0
        );
      typeof i == 'function' && ((n = i), (i = 'utf8')), i || (i = 'utf8');
      let s = this[Pt] ? Is : (r) => r();
      return (
        !this[Se] &&
          !Buffer.isBuffer(e) &&
          (z0(e)
            ? (e = Buffer.from(e.buffer, e.byteOffset, e.byteLength))
            : j0(e)
            ? (e = Buffer.from(e))
            : typeof e != 'string' && (this.objectMode = !0)),
        this[Se]
          ? (this.flowing && this[me] !== 0 && this[Qr](!0),
            this.flowing ? this.emit('data', e) : this[Jc](e),
            this[me] !== 0 && this.emit('readable'),
            n && s(n),
            this.flowing)
          : e.length
          ? (typeof e == 'string' && !(i === this[Me] && !this[Ft].lastNeed) && (e = Buffer.from(e, i)),
            Buffer.isBuffer(e) && this[Me] && (e = this[Ft].write(e)),
            this.flowing && this[me] !== 0 && this[Qr](!0),
            this.flowing ? this.emit('data', e) : this[Jc](e),
            this[me] !== 0 && this.emit('readable'),
            n && s(n),
            this.flowing)
          : (this[me] !== 0 && this.emit('readable'), n && s(n), this.flowing)
      );
    }
    read(e) {
      if (this[Re]) return null;
      if (this[me] === 0 || e === 0 || e > this[me]) return this[Dt](), null;
      this[Se] && (e = null),
        this.buffer.length > 1 &&
          !this[Se] &&
          (this.encoding
            ? (this.buffer = [this.buffer.join('')])
            : (this.buffer = [Buffer.concat(this.buffer, this[me])]));
      let i = this[Ff](e || null, this.buffer[0]);
      return this[Dt](), i;
    }
    [Ff](e, i) {
      return (
        e === i.length || e === null
          ? this[Zc]()
          : ((this.buffer[0] = i.slice(e)), (i = i.slice(0, e)), (this[me] -= e)),
        this.emit('data', i),
        !this.buffer.length && !this[At] && this.emit('drain'),
        i
      );
    }
    end(e, i, n) {
      return (
        typeof e == 'function' && ((n = e), (e = null)),
        typeof i == 'function' && ((n = i), (i = 'utf8')),
        e && this.write(e, i),
        n && this.once('end', n),
        (this[At] = !0),
        (this.writable = !1),
        (this.flowing || !this[Cs]) && this[Dt](),
        this
      );
    }
    [bn]() {
      this[Re] ||
        ((this[Cs] = !1),
        (this[ea] = !0),
        this.emit('resume'),
        this.buffer.length ? this[Qr]() : this[At] ? this[Dt]() : this.emit('drain'));
    }
    resume() {
      return this[bn]();
    }
    pause() {
      (this[ea] = !1), (this[Cs] = !0);
    }
    get destroyed() {
      return this[Re];
    }
    get flowing() {
      return this[ea];
    }
    get paused() {
      return this[Cs];
    }
    [Jc](e) {
      this[Se] ? (this[me] += 1) : (this[me] += e.length), this.buffer.push(e);
    }
    [Zc]() {
      return (
        this.buffer.length && (this[Se] ? (this[me] -= 1) : (this[me] -= this.buffer[0].length)), this.buffer.shift()
      );
    }
    [Qr](e) {
      do;
      while (this[Pf](this[Zc]()));
      !e && !this.buffer.length && !this[At] && this.emit('drain');
    }
    [Pf](e) {
      return e ? (this.emit('data', e), this.flowing) : !1;
    }
    pipe(e, i) {
      if (this[Re]) return;
      let n = this[ci];
      return (
        (i = i || {}),
        e === Lf.stdout || e === Lf.stderr ? (i.end = !1) : (i.end = i.end !== !1),
        (i.proxyErrors = !!i.proxyErrors),
        n
          ? i.end && e.end()
          : (this.pipes.push(i.proxyErrors ? new tl(this, e, i) : new ta(this, e, i)),
            this[Pt] ? Is(() => this[bn]()) : this[bn]()),
        e
      );
    }
    unpipe(e) {
      let i = this.pipes.find((n) => n.dest === e);
      i && (this.pipes.splice(this.pipes.indexOf(i), 1), i.unpipe());
    }
    addListener(e, i) {
      return this.on(e, i);
    }
    on(e, i) {
      let n = super.on(e, i);
      return (
        e === 'data' && !this.pipes.length && !this.flowing
          ? this[bn]()
          : e === 'readable' && this[me] !== 0
          ? super.emit('readable')
          : q0(e) && this[ci]
          ? (super.emit(e), this.removeAllListeners(e))
          : e === 'error' && this[Os] && (this[Pt] ? Is(() => i.call(this, this[Os])) : i.call(this, this[Os])),
        n
      );
    }
    get emittedEnd() {
      return this[ci];
    }
    [Dt]() {
      !this[Jr] &&
        !this[ci] &&
        !this[Re] &&
        this.buffer.length === 0 &&
        this[At] &&
        ((this[Jr] = !0),
        this.emit('end'),
        this.emit('prefinish'),
        this.emit('finish'),
        this[Zr] && this.emit('close'),
        (this[Jr] = !1));
    }
    emit(e, i, ...n) {
      if (e !== 'error' && e !== 'close' && e !== Re && this[Re]) return;
      if (e === 'data') return i ? (this[Pt] ? Is(() => this[Qc](i)) : this[Qc](i)) : !1;
      if (e === 'end') return this[Uf]();
      if (e === 'close') {
        if (((this[Zr] = !0), !this[ci] && !this[Re])) return;
        let r = super.emit('close');
        return this.removeAllListeners('close'), r;
      } else if (e === 'error') {
        this[Os] = i;
        let r = super.emit('error', i);
        return this[Dt](), r;
      } else if (e === 'resume') {
        let r = super.emit('resume');
        return this[Dt](), r;
      } else if (e === 'finish' || e === 'prefinish') {
        let r = super.emit(e);
        return this.removeAllListeners(e), r;
      }
      let s = super.emit(e, i, ...n);
      return this[Dt](), s;
    }
    [Qc](e) {
      for (let n of this.pipes) n.dest.write(e) === !1 && this.pause();
      let i = super.emit('data', e);
      return this[Dt](), i;
    }
    [Uf]() {
      this[ci] || ((this[ci] = !0), (this.readable = !1), this[Pt] ? Is(() => this[el]()) : this[el]());
    }
    [el]() {
      if (this[Ft]) {
        let i = this[Ft].end();
        if (i) {
          for (let n of this.pipes) n.dest.write(i);
          super.emit('data', i);
        }
      }
      for (let i of this.pipes) i.end();
      let e = super.emit('end');
      return this.removeAllListeners('end'), e;
    }
    collect() {
      let e = [];
      this[Se] || (e.dataLength = 0);
      let i = this.promise();
      return (
        this.on('data', (n) => {
          e.push(n), this[Se] || (e.dataLength += n.length);
        }),
        i.then(() => e)
      );
    }
    concat() {
      return this[Se]
        ? Promise.reject(new Error('cannot concat in objectMode'))
        : this.collect().then((e) =>
            this[Se]
              ? Promise.reject(new Error('cannot concat in objectMode'))
              : this[Me]
              ? e.join('')
              : Buffer.concat(e, e.dataLength)
          );
    }
    promise() {
      return new Promise((e, i) => {
        this.on(Re, () => i(new Error('stream destroyed'))), this.on('error', (n) => i(n)), this.on('end', () => e());
      });
    }
    [B0]() {
      return {
        next: () => {
          let i = this.read();
          if (i !== null) return Promise.resolve({ done: !1, value: i });
          if (this[At]) return Promise.resolve({ done: !0 });
          let n = null,
            s = null,
            r = (l) => {
              this.removeListener('data', a), this.removeListener('end', o), s(l);
            },
            a = (l) => {
              this.removeListener('error', r),
                this.removeListener('end', o),
                this.pause(),
                n({ value: l, done: !!this[At] });
            },
            o = () => {
              this.removeListener('error', r), this.removeListener('data', a), n({ done: !0 });
            },
            u = () => r(new Error('stream destroyed'));
          return new Promise((l, c) => {
            (s = c), (n = l), this.once(Re, u), this.once('error', r), this.once('end', o), this.once('data', a);
          });
        },
      };
    }
    [M0]() {
      return {
        next: () => {
          let i = this.read();
          return { value: i, done: i === null };
        },
      };
    }
    destroy(e) {
      return this[Re]
        ? (e ? this.emit('error', e) : this.emit(Re), this)
        : ((this[Re] = !0),
          (this.buffer.length = 0),
          (this[me] = 0),
          typeof this.close == 'function' && !this[Zr] && this.close(),
          e ? this.emit('error', e) : this.emit(Re),
          this);
    }
    static isStream(e) {
      return (
        !!e &&
        (e instanceof Mf ||
          e instanceof Af ||
          (e instanceof U0 &&
            (typeof e.pipe == 'function' || (typeof e.write == 'function' && typeof e.end == 'function'))))
      );
    }
  };
});
var vl = y((He) => {
  'use strict';
  var al = require('assert'),
    li = require('buffer').Buffer,
    Hf = require('zlib'),
    Ui = (He.constants = kf()),
    G0 = jf(),
    zf = li.concat,
    Bi = Symbol('_superWrite'),
    _n = class extends Error {
      constructor(e) {
        super('zlib: ' + e.message),
          (this.code = e.code),
          (this.errno = e.errno),
          this.code || (this.code = 'ZLIB_ERROR'),
          (this.message = 'zlib: ' + e.message),
          Error.captureStackTrace(this, this.constructor);
      }
      get name() {
        return 'ZlibError';
      }
    },
    H0 = Symbol('opts'),
    Ns = Symbol('flushFlag'),
    Gf = Symbol('finishFlushFlag'),
    xl = Symbol('fullFlushFlag'),
    J = Symbol('handle'),
    ia = Symbol('onError'),
    gn = Symbol('sawError'),
    il = Symbol('level'),
    nl = Symbol('strategy'),
    sl = Symbol('ended'),
    JL = Symbol('_defaultFullFlush'),
    na = class extends G0 {
      constructor(e, i) {
        if (!e || typeof e != 'object') throw new TypeError('invalid options for ZlibBase constructor');
        super(e), (this[gn] = !1), (this[sl] = !1), (this[H0] = e), (this[Ns] = e.flush), (this[Gf] = e.finishFlush);
        try {
          this[J] = new Hf[i](e);
        } catch (n) {
          throw new _n(n);
        }
        (this[ia] = (n) => {
          this[gn] || ((this[gn] = !0), this.close(), this.emit('error', n));
        }),
          this[J].on('error', (n) => this[ia](new _n(n))),
          this.once('end', () => this.close);
      }
      close() {
        this[J] && (this[J].close(), (this[J] = null), this.emit('close'));
      }
      reset() {
        if (!this[gn]) return al(this[J], 'zlib binding closed'), this[J].reset();
      }
      flush(e) {
        this.ended || (typeof e != 'number' && (e = this[xl]), this.write(Object.assign(li.alloc(0), { [Ns]: e })));
      }
      end(e, i, n) {
        return e && this.write(e, i), this.flush(this[Gf]), (this[sl] = !0), super.end(null, null, n);
      }
      get ended() {
        return this[sl];
      }
      write(e, i, n) {
        if ((typeof i == 'function' && ((n = i), (i = 'utf8')), typeof e == 'string' && (e = li.from(e, i)), this[gn]))
          return;
        al(this[J], 'zlib binding closed');
        let s = this[J]._handle,
          r = s.close;
        s.close = () => {};
        let a = this[J].close;
        (this[J].close = () => {}), (li.concat = (l) => l);
        let o;
        try {
          let l = typeof e[Ns] == 'number' ? e[Ns] : this[Ns];
          (o = this[J]._processChunk(e, l)), (li.concat = zf);
        } catch (l) {
          (li.concat = zf), this[ia](new _n(l));
        } finally {
          this[J] && ((this[J]._handle = s), (s.close = r), (this[J].close = a), this[J].removeAllListeners('error'));
        }
        this[J] && this[J].on('error', (l) => this[ia](new _n(l)));
        let u;
        if (o)
          if (Array.isArray(o) && o.length > 0) {
            u = this[Bi](li.from(o[0]));
            for (let l = 1; l < o.length; l++) u = this[Bi](o[l]);
          } else u = this[Bi](li.from(o));
        return n && n(), u;
      }
      [Bi](e) {
        return super.write(e);
      }
    },
    Ut = class extends na {
      constructor(e, i) {
        (e = e || {}),
          (e.flush = e.flush || Ui.Z_NO_FLUSH),
          (e.finishFlush = e.finishFlush || Ui.Z_FINISH),
          super(e, i),
          (this[xl] = Ui.Z_FULL_FLUSH),
          (this[il] = e.level),
          (this[nl] = e.strategy);
      }
      params(e, i) {
        if (!this[gn]) {
          if (!this[J]) throw new Error('cannot switch params when binding is closed');
          if (!this[J].params) throw new Error('not supported in this implementation');
          if (this[il] !== e || this[nl] !== i) {
            this.flush(Ui.Z_SYNC_FLUSH), al(this[J], 'zlib binding closed');
            let n = this[J].flush;
            this[J].flush = (s, r) => {
              this.flush(s), r();
            };
            try {
              this[J].params(e, i);
            } finally {
              this[J].flush = n;
            }
            this[J] && ((this[il] = e), (this[nl] = i));
          }
        }
      }
    },
    ol = class extends Ut {
      constructor(e) {
        super(e, 'Deflate');
      }
    },
    cl = class extends Ut {
      constructor(e) {
        super(e, 'Inflate');
      }
    },
    rl = Symbol('_portable'),
    ll = class extends Ut {
      constructor(e) {
        super(e, 'Gzip'), (this[rl] = e && !!e.portable);
      }
      [Bi](e) {
        return this[rl] ? ((this[rl] = !1), (e[9] = 255), super[Bi](e)) : super[Bi](e);
      }
    },
    ul = class extends Ut {
      constructor(e) {
        super(e, 'Gunzip');
      }
    },
    pl = class extends Ut {
      constructor(e) {
        super(e, 'DeflateRaw');
      }
    },
    dl = class extends Ut {
      constructor(e) {
        super(e, 'InflateRaw');
      }
    },
    hl = class extends Ut {
      constructor(e) {
        super(e, 'Unzip');
      }
    },
    sa = class extends na {
      constructor(e, i) {
        (e = e || {}),
          (e.flush = e.flush || Ui.BROTLI_OPERATION_PROCESS),
          (e.finishFlush = e.finishFlush || Ui.BROTLI_OPERATION_FINISH),
          super(e, i),
          (this[xl] = Ui.BROTLI_OPERATION_FLUSH);
      }
    },
    fl = class extends sa {
      constructor(e) {
        super(e, 'BrotliCompress');
      }
    },
    ml = class extends sa {
      constructor(e) {
        super(e, 'BrotliDecompress');
      }
    };
  He.Deflate = ol;
  He.Inflate = cl;
  He.Gzip = ll;
  He.Gunzip = ul;
  He.DeflateRaw = pl;
  He.InflateRaw = dl;
  He.Unzip = hl;
  typeof Hf.BrotliCompress == 'function'
    ? ((He.BrotliCompress = fl), (He.BrotliDecompress = ml))
    : (He.BrotliCompress = He.BrotliDecompress =
        class {
          constructor() {
            throw new Error('Brotli is not supported in this version of Node.js');
          }
        });
});
var En = y((eA, $f) => {
  'use strict';
  var $0 = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform;
  $f.exports = $0 !== 'win32' ? (t) => t : (t) => t && t.replace(/\\/g, '/');
});
var ra = y((iA, Wf) => {
  'use strict';
  var { Minipass: W0 } = Yr(),
    yl = En(),
    bl = Symbol('slurp');
  Wf.exports = class extends W0 {
    constructor(e, i, n) {
      switch (
        (super(),
        this.pause(),
        (this.extended = i),
        (this.globalExtended = n),
        (this.header = e),
        (this.startBlockSize = 512 * Math.ceil(e.size / 512)),
        (this.blockRemain = this.startBlockSize),
        (this.remain = e.size),
        (this.type = e.type),
        (this.meta = !1),
        (this.ignore = !1),
        this.type)
      ) {
        case 'File':
        case 'OldFile':
        case 'Link':
        case 'SymbolicLink':
        case 'CharacterDevice':
        case 'BlockDevice':
        case 'Directory':
        case 'FIFO':
        case 'ContiguousFile':
        case 'GNUDumpDir':
          break;
        case 'NextFileHasLongLinkpath':
        case 'NextFileHasLongPath':
        case 'OldGnuLongPath':
        case 'GlobalExtendedHeader':
        case 'ExtendedHeader':
        case 'OldExtendedHeader':
          this.meta = !0;
          break;
        default:
          this.ignore = !0;
      }
      (this.path = yl(e.path)),
        (this.mode = e.mode),
        this.mode && (this.mode = this.mode & 4095),
        (this.uid = e.uid),
        (this.gid = e.gid),
        (this.uname = e.uname),
        (this.gname = e.gname),
        (this.size = e.size),
        (this.mtime = e.mtime),
        (this.atime = e.atime),
        (this.ctime = e.ctime),
        (this.linkpath = yl(e.linkpath)),
        (this.uname = e.uname),
        (this.gname = e.gname),
        i && this[bl](i),
        n && this[bl](n, !0);
    }
    write(e) {
      let i = e.length;
      if (i > this.blockRemain) throw new Error('writing more to entry than is appropriate');
      let n = this.remain,
        s = this.blockRemain;
      return (
        (this.remain = Math.max(0, n - i)),
        (this.blockRemain = Math.max(0, s - i)),
        this.ignore ? !0 : n >= i ? super.write(e) : super.write(e.slice(0, n))
      );
    }
    [bl](e, i) {
      for (let n in e)
        e[n] !== null &&
          e[n] !== void 0 &&
          !(i && n === 'path') &&
          (this[n] = n === 'path' || n === 'linkpath' ? yl(e[n]) : e[n]);
    }
  };
});
var gl = y((aa) => {
  'use strict';
  aa.name = new Map([
    ['0', 'File'],
    ['', 'OldFile'],
    ['1', 'Link'],
    ['2', 'SymbolicLink'],
    ['3', 'CharacterDevice'],
    ['4', 'BlockDevice'],
    ['5', 'Directory'],
    ['6', 'FIFO'],
    ['7', 'ContiguousFile'],
    ['g', 'GlobalExtendedHeader'],
    ['x', 'ExtendedHeader'],
    ['A', 'SolarisACL'],
    ['D', 'GNUDumpDir'],
    ['I', 'Inode'],
    ['K', 'NextFileHasLongLinkpath'],
    ['L', 'NextFileHasLongPath'],
    ['M', 'ContinuationFile'],
    ['N', 'OldGnuLongPath'],
    ['S', 'SparseFile'],
    ['V', 'TapeVolumeHeader'],
    ['X', 'OldExtendedHeader'],
  ]);
  aa.code = new Map(Array.from(aa.name).map((t) => [t[1], t[0]]));
});
var Yf = y((sA, Xf) => {
  'use strict';
  var V0 = (t, e) => {
      if (Number.isSafeInteger(t)) t < 0 ? X0(t, e) : K0(t, e);
      else throw Error('cannot encode number outside of javascript safe integer range');
      return e;
    },
    K0 = (t, e) => {
      e[0] = 128;
      for (var i = e.length; i > 1; i--) (e[i - 1] = t & 255), (t = Math.floor(t / 256));
    },
    X0 = (t, e) => {
      e[0] = 255;
      var i = !1;
      t = t * -1;
      for (var n = e.length; n > 1; n--) {
        var s = t & 255;
        (t = Math.floor(t / 256)), i ? (e[n - 1] = Vf(s)) : s === 0 ? (e[n - 1] = 0) : ((i = !0), (e[n - 1] = Kf(s)));
      }
    },
    Y0 = (t) => {
      let e = t[0],
        i = e === 128 ? Z0(t.slice(1, t.length)) : e === 255 ? J0(t) : null;
      if (i === null) throw Error('invalid base256 encoding');
      if (!Number.isSafeInteger(i)) throw Error('parsed number outside of javascript safe integer range');
      return i;
    },
    J0 = (t) => {
      for (var e = t.length, i = 0, n = !1, s = e - 1; s > -1; s--) {
        var r = t[s],
          a;
        n ? (a = Vf(r)) : r === 0 ? (a = r) : ((n = !0), (a = Kf(r))), a !== 0 && (i -= a * Math.pow(256, e - s - 1));
      }
      return i;
    },
    Z0 = (t) => {
      for (var e = t.length, i = 0, n = e - 1; n > -1; n--) {
        var s = t[n];
        s !== 0 && (i += s * Math.pow(256, e - n - 1));
      }
      return i;
    },
    Vf = (t) => (255 ^ t) & 255,
    Kf = (t) => ((255 ^ t) + 1) & 255;
  Xf.exports = { encode: V0, parse: Y0 };
});
var Sn = y((rA, Zf) => {
  'use strict';
  var _l = gl(),
    wn = require('path').posix,
    Jf = Yf(),
    El = Symbol('slurp'),
    $e = Symbol('type'),
    Rl = class {
      constructor(e, i, n, s) {
        (this.cksumValid = !1),
          (this.needPax = !1),
          (this.nullBlock = !1),
          (this.block = null),
          (this.path = null),
          (this.mode = null),
          (this.uid = null),
          (this.gid = null),
          (this.size = null),
          (this.mtime = null),
          (this.cksum = null),
          (this[$e] = '0'),
          (this.linkpath = null),
          (this.uname = null),
          (this.gname = null),
          (this.devmaj = 0),
          (this.devmin = 0),
          (this.atime = null),
          (this.ctime = null),
          Buffer.isBuffer(e) ? this.decode(e, i || 0, n, s) : e && this.set(e);
      }
      decode(e, i, n, s) {
        if ((i || (i = 0), !e || !(e.length >= i + 512))) throw new Error('need 512 bytes for header');
        if (
          ((this.path = Mi(e, i, 100)),
          (this.mode = ui(e, i + 100, 8)),
          (this.uid = ui(e, i + 108, 8)),
          (this.gid = ui(e, i + 116, 8)),
          (this.size = ui(e, i + 124, 12)),
          (this.mtime = wl(e, i + 136, 12)),
          (this.cksum = ui(e, i + 148, 12)),
          this[El](n),
          this[El](s, !0),
          (this[$e] = Mi(e, i + 156, 1)),
          this[$e] === '' && (this[$e] = '0'),
          this[$e] === '0' && this.path.slice(-1) === '/' && (this[$e] = '5'),
          this[$e] === '5' && (this.size = 0),
          (this.linkpath = Mi(e, i + 157, 100)),
          e.slice(i + 257, i + 265).toString() === 'ustar\x0000')
        )
          if (
            ((this.uname = Mi(e, i + 265, 32)),
            (this.gname = Mi(e, i + 297, 32)),
            (this.devmaj = ui(e, i + 329, 8)),
            (this.devmin = ui(e, i + 337, 8)),
            e[i + 475] !== 0)
          ) {
            let a = Mi(e, i + 345, 155);
            this.path = a + '/' + this.path;
          } else {
            let a = Mi(e, i + 345, 130);
            a && (this.path = a + '/' + this.path),
              (this.atime = wl(e, i + 476, 12)),
              (this.ctime = wl(e, i + 488, 12));
          }
        let r = 8 * 32;
        for (let a = i; a < i + 148; a++) r += e[a];
        for (let a = i + 156; a < i + 512; a++) r += e[a];
        (this.cksumValid = r === this.cksum), this.cksum === null && r === 8 * 32 && (this.nullBlock = !0);
      }
      [El](e, i) {
        for (let n in e) e[n] !== null && e[n] !== void 0 && !(i && n === 'path') && (this[n] = e[n]);
      }
      encode(e, i) {
        if ((e || ((e = this.block = Buffer.alloc(512)), (i = 0)), i || (i = 0), !(e.length >= i + 512)))
          throw new Error('need 512 bytes for header');
        let n = this.ctime || this.atime ? 130 : 155,
          s = Q0(this.path || '', n),
          r = s[0],
          a = s[1];
        (this.needPax = s[2]),
          (this.needPax = qi(e, i, 100, r) || this.needPax),
          (this.needPax = pi(e, i + 100, 8, this.mode) || this.needPax),
          (this.needPax = pi(e, i + 108, 8, this.uid) || this.needPax),
          (this.needPax = pi(e, i + 116, 8, this.gid) || this.needPax),
          (this.needPax = pi(e, i + 124, 12, this.size) || this.needPax),
          (this.needPax = Sl(e, i + 136, 12, this.mtime) || this.needPax),
          (e[i + 156] = this[$e].charCodeAt(0)),
          (this.needPax = qi(e, i + 157, 100, this.linkpath) || this.needPax),
          e.write('ustar\x0000', i + 257, 8),
          (this.needPax = qi(e, i + 265, 32, this.uname) || this.needPax),
          (this.needPax = qi(e, i + 297, 32, this.gname) || this.needPax),
          (this.needPax = pi(e, i + 329, 8, this.devmaj) || this.needPax),
          (this.needPax = pi(e, i + 337, 8, this.devmin) || this.needPax),
          (this.needPax = qi(e, i + 345, n, a) || this.needPax),
          e[i + 475] !== 0
            ? (this.needPax = qi(e, i + 345, 155, a) || this.needPax)
            : ((this.needPax = qi(e, i + 345, 130, a) || this.needPax),
              (this.needPax = Sl(e, i + 476, 12, this.atime) || this.needPax),
              (this.needPax = Sl(e, i + 488, 12, this.ctime) || this.needPax));
        let o = 8 * 32;
        for (let u = i; u < i + 148; u++) o += e[u];
        for (let u = i + 156; u < i + 512; u++) o += e[u];
        return (this.cksum = o), pi(e, i + 148, 8, this.cksum), (this.cksumValid = !0), this.needPax;
      }
      set(e) {
        for (let i in e) e[i] !== null && e[i] !== void 0 && (this[i] = e[i]);
      }
      get type() {
        return _l.name.get(this[$e]) || this[$e];
      }
      get typeKey() {
        return this[$e];
      }
      set type(e) {
        _l.code.has(e) ? (this[$e] = _l.code.get(e)) : (this[$e] = e);
      }
    },
    Q0 = (t, e) => {
      let n = t,
        s = '',
        r,
        a = wn.parse(t).root || '.';
      if (Buffer.byteLength(n) < 100) r = [n, s, !1];
      else {
        (s = wn.dirname(n)), (n = wn.basename(n));
        do
          Buffer.byteLength(n) <= 100 && Buffer.byteLength(s) <= e
            ? (r = [n, s, !1])
            : Buffer.byteLength(n) > 100 && Buffer.byteLength(s) <= e
            ? (r = [n.slice(0, 99), s, !0])
            : ((n = wn.join(wn.basename(s), n)), (s = wn.dirname(s)));
        while (s !== a && !r);
        r || (r = [t.slice(0, 99), '', !0]);
      }
      return r;
    },
    Mi = (t, e, i) =>
      t
        .slice(e, e + i)
        .toString('utf8')
        .replace(/\0.*/, ''),
    wl = (t, e, i) => eR(ui(t, e, i)),
    eR = (t) => (t === null ? null : new Date(t * 1e3)),
    ui = (t, e, i) => (t[e] & 128 ? Jf.parse(t.slice(e, e + i)) : iR(t, e, i)),
    tR = (t) => (isNaN(t) ? null : t),
    iR = (t, e, i) =>
      tR(
        parseInt(
          t
            .slice(e, e + i)
            .toString('utf8')
            .replace(/\0.*$/, '')
            .trim(),
          8
        )
      ),
    nR = { 12: 8589934591, 8: 2097151 },
    pi = (t, e, i, n) =>
      n === null ? !1 : n > nR[i] || n < 0 ? (Jf.encode(n, t.slice(e, e + i)), !0) : (sR(t, e, i, n), !1),
    sR = (t, e, i, n) => t.write(rR(n, i), e, i, 'ascii'),
    rR = (t, e) => aR(Math.floor(t).toString(8), e),
    aR = (t, e) => (t.length === e - 1 ? t : new Array(e - t.length - 1).join('0') + t + ' ') + '\0',
    Sl = (t, e, i, n) => (n === null ? !1 : pi(t, e, i, n.getTime() / 1e3)),
    oR = new Array(156).join('\0'),
    qi = (t, e, i, n) =>
      n === null ? !1 : (t.write(n + oR, e, i, 'utf8'), n.length !== Buffer.byteLength(n) || n.length > i);
  Zf.exports = Rl;
});
var oa = y((aA, Qf) => {
  'use strict';
  var cR = Sn(),
    lR = require('path'),
    ks = class {
      constructor(e, i) {
        (this.atime = e.atime || null),
          (this.charset = e.charset || null),
          (this.comment = e.comment || null),
          (this.ctime = e.ctime || null),
          (this.gid = e.gid || null),
          (this.gname = e.gname || null),
          (this.linkpath = e.linkpath || null),
          (this.mtime = e.mtime || null),
          (this.path = e.path || null),
          (this.size = e.size || null),
          (this.uid = e.uid || null),
          (this.uname = e.uname || null),
          (this.dev = e.dev || null),
          (this.ino = e.ino || null),
          (this.nlink = e.nlink || null),
          (this.global = i || !1);
      }
      encode() {
        let e = this.encodeBody();
        if (e === '') return null;
        let i = Buffer.byteLength(e),
          n = 512 * Math.ceil(1 + i / 512),
          s = Buffer.allocUnsafe(n);
        for (let r = 0; r < 512; r++) s[r] = 0;
        new cR({
          path: ('PaxHeader/' + lR.basename(this.path)).slice(0, 99),
          mode: this.mode || 420,
          uid: this.uid || null,
          gid: this.gid || null,
          size: i,
          mtime: this.mtime || null,
          type: this.global ? 'GlobalExtendedHeader' : 'ExtendedHeader',
          linkpath: '',
          uname: this.uname || '',
          gname: this.gname || '',
          devmaj: 0,
          devmin: 0,
          atime: this.atime || null,
          ctime: this.ctime || null,
        }).encode(s),
          s.write(e, 512, i, 'utf8');
        for (let r = i + 512; r < s.length; r++) s[r] = 0;
        return s;
      }
      encodeBody() {
        return (
          this.encodeField('path') +
          this.encodeField('ctime') +
          this.encodeField('atime') +
          this.encodeField('dev') +
          this.encodeField('ino') +
          this.encodeField('nlink') +
          this.encodeField('charset') +
          this.encodeField('comment') +
          this.encodeField('gid') +
          this.encodeField('gname') +
          this.encodeField('linkpath') +
          this.encodeField('mtime') +
          this.encodeField('size') +
          this.encodeField('uid') +
          this.encodeField('uname')
        );
      }
      encodeField(e) {
        if (this[e] === null || this[e] === void 0) return '';
        let i = this[e] instanceof Date ? this[e].getTime() / 1e3 : this[e],
          n =
            ' ' +
            (e === 'dev' || e === 'ino' || e === 'nlink' ? 'SCHILY.' : '') +
            e +
            '=' +
            i +
            `
`,
          s = Buffer.byteLength(n),
          r = Math.floor(Math.log(s) / Math.log(10)) + 1;
        return s + r >= Math.pow(10, r) && (r += 1), r + s + n;
      }
    };
  ks.parse = (t, e, i) => new ks(uR(pR(t), e), i);
  var uR = (t, e) => (e ? Object.keys(t).reduce((i, n) => ((i[n] = t[n]), i), e) : t),
    pR = (t) =>
      t
        .replace(/\n$/, '')
        .split(
          `
`
        )
        .reduce(dR, Object.create(null)),
    dR = (t, e) => {
      let i = parseInt(e, 10);
      if (i !== Buffer.byteLength(e) + 1) return t;
      e = e.slice((i + ' ').length);
      let n = e.split('='),
        s = n.shift().replace(/^SCHILY\.(dev|ino|nlink)/, '$1');
      if (!s) return t;
      let r = n.join('=');
      return (
        (t[s] = /^([A-Z]+\.)?([mac]|birth|creation)time$/.test(s) ? new Date(r * 1e3) : /^[0-9]+$/.test(r) ? +r : r), t
      );
    };
  Qf.exports = ks;
});
var Rn = y((oA, em) => {
  'use strict';
  em.exports = (t) => {
    let e = t.length - 1,
      i = -1;
    for (; e > -1 && t.charAt(e) === '/'; ) (i = e), e--;
    return i === -1 ? t : t.slice(0, i);
  };
});
var ca = y((cA, tm) => {
  'use strict';
  tm.exports = (t) =>
    class extends t {
      warn(e, i, n = {}) {
        this.file && (n.file = this.file),
          this.cwd && (n.cwd = this.cwd),
          (n.code = (i instanceof Error && i.code) || e),
          (n.tarCode = e),
          !this.strict && n.recoverable !== !1
            ? (i instanceof Error && ((n = Object.assign(i, n)), (i = i.message)), this.emit('warn', n.tarCode, i, n))
            : i instanceof Error
            ? this.emit('error', Object.assign(i, n))
            : this.emit('error', Object.assign(new Error(`${e}: ${i}`), n));
      }
    };
});
var Ol = y((uA, im) => {
  'use strict';
  var la = ['|', '<', '>', '?', ':'],
    Tl = la.map((t) => String.fromCharCode(61440 + t.charCodeAt(0))),
    hR = new Map(la.map((t, e) => [t, Tl[e]])),
    fR = new Map(Tl.map((t, e) => [t, la[e]]));
  im.exports = {
    encode: (t) => la.reduce((e, i) => e.split(i).join(hR.get(i)), t),
    decode: (t) => Tl.reduce((e, i) => e.split(i).join(fR.get(i)), t),
  };
});
var Cl = y((pA, sm) => {
  'use strict';
  var { isAbsolute: mR, parse: nm } = require('path').win32;
  sm.exports = (t) => {
    let e = '',
      i = nm(t);
    for (; mR(t) || i.root; ) {
      let n = t.charAt(0) === '/' && t.slice(0, 4) !== '//?/' ? '/' : i.root;
      (t = t.slice(n.length)), (e += n), (i = nm(t));
    }
    return [e, t];
  };
});
var am = y((dA, rm) => {
  'use strict';
  rm.exports = (t, e, i) => (
    (t &= 4095), i && (t = (t | 384) & -19), e && (t & 256 && (t |= 64), t & 32 && (t |= 8), t & 4 && (t |= 1)), t
  );
});
var Bl = y((mA, gm) => {
  'use strict';
  var { Minipass: hm } = Yr(),
    fm = oa(),
    mm = Sn(),
    gt = require('fs'),
    om = require('path'),
    bt = En(),
    xR = Rn(),
    xm = (t, e) => (e ? ((t = bt(t).replace(/^\.(\/|$)/, '')), xR(e) + '/' + t) : bt(t)),
    vR = 16 * 1024 * 1024,
    cm = Symbol('process'),
    lm = Symbol('file'),
    um = Symbol('directory'),
    Nl = Symbol('symlink'),
    pm = Symbol('hardlink'),
    Ls = Symbol('header'),
    ua = Symbol('read'),
    kl = Symbol('lstat'),
    pa = Symbol('onlstat'),
    Ll = Symbol('onread'),
    Al = Symbol('onreadlink'),
    Dl = Symbol('openfile'),
    Fl = Symbol('onopenfile'),
    di = Symbol('close'),
    da = Symbol('mode'),
    Pl = Symbol('awaitDrain'),
    Il = Symbol('ondrain'),
    _t = Symbol('prefix'),
    dm = Symbol('hadError'),
    vm = ca(),
    yR = Ol(),
    ym = Cl(),
    bm = am(),
    ha = vm(
      class extends hm {
        constructor(e, i) {
          if (((i = i || {}), super(i), typeof e != 'string')) throw new TypeError('path is required');
          (this.path = bt(e)),
            (this.portable = !!i.portable),
            (this.myuid = (process.getuid && process.getuid()) || 0),
            (this.myuser = process.env.USER || ''),
            (this.maxReadSize = i.maxReadSize || vR),
            (this.linkCache = i.linkCache || new Map()),
            (this.statCache = i.statCache || new Map()),
            (this.preservePaths = !!i.preservePaths),
            (this.cwd = bt(i.cwd || process.cwd())),
            (this.strict = !!i.strict),
            (this.noPax = !!i.noPax),
            (this.noMtime = !!i.noMtime),
            (this.mtime = i.mtime || null),
            (this.prefix = i.prefix ? bt(i.prefix) : null),
            (this.fd = null),
            (this.blockLen = null),
            (this.blockRemain = null),
            (this.buf = null),
            (this.offset = null),
            (this.length = null),
            (this.pos = null),
            (this.remain = null),
            typeof i.onwarn == 'function' && this.on('warn', i.onwarn);
          let n = !1;
          if (!this.preservePaths) {
            let [s, r] = ym(this.path);
            s && ((this.path = r), (n = s));
          }
          (this.win32 = !!i.win32 || process.platform === 'win32'),
            this.win32 && ((this.path = yR.decode(this.path.replace(/\\/g, '/'))), (e = e.replace(/\\/g, '/'))),
            (this.absolute = bt(i.absolute || om.resolve(this.cwd, e))),
            this.path === '' && (this.path = './'),
            n && this.warn('TAR_ENTRY_INFO', `stripping ${n} from absolute path`, { entry: this, path: n + this.path }),
            this.statCache.has(this.absolute) ? this[pa](this.statCache.get(this.absolute)) : this[kl]();
        }
        emit(e, ...i) {
          return e === 'error' && (this[dm] = !0), super.emit(e, ...i);
        }
        [kl]() {
          gt.lstat(this.absolute, (e, i) => {
            if (e) return this.emit('error', e);
            this[pa](i);
          });
        }
        [pa](e) {
          this.statCache.set(this.absolute, e),
            (this.stat = e),
            e.isFile() || (e.size = 0),
            (this.type = gR(e)),
            this.emit('stat', e),
            this[cm]();
        }
        [cm]() {
          switch (this.type) {
            case 'File':
              return this[lm]();
            case 'Directory':
              return this[um]();
            case 'SymbolicLink':
              return this[Nl]();
            default:
              return this.end();
          }
        }
        [da](e) {
          return bm(e, this.type === 'Directory', this.portable);
        }
        [_t](e) {
          return xm(e, this.prefix);
        }
        [Ls]() {
          this.type === 'Directory' && this.portable && (this.noMtime = !0),
            (this.header = new mm({
              path: this[_t](this.path),
              linkpath: this.type === 'Link' ? this[_t](this.linkpath) : this.linkpath,
              mode: this[da](this.stat.mode),
              uid: this.portable ? null : this.stat.uid,
              gid: this.portable ? null : this.stat.gid,
              size: this.stat.size,
              mtime: this.noMtime ? null : this.mtime || this.stat.mtime,
              type: this.type,
              uname: this.portable ? null : this.stat.uid === this.myuid ? this.myuser : '',
              atime: this.portable ? null : this.stat.atime,
              ctime: this.portable ? null : this.stat.ctime,
            })),
            this.header.encode() &&
              !this.noPax &&
              super.write(
                new fm({
                  atime: this.portable ? null : this.header.atime,
                  ctime: this.portable ? null : this.header.ctime,
                  gid: this.portable ? null : this.header.gid,
                  mtime: this.noMtime ? null : this.mtime || this.header.mtime,
                  path: this[_t](this.path),
                  linkpath: this.type === 'Link' ? this[_t](this.linkpath) : this.linkpath,
                  size: this.header.size,
                  uid: this.portable ? null : this.header.uid,
                  uname: this.portable ? null : this.header.uname,
                  dev: this.portable ? null : this.stat.dev,
                  ino: this.portable ? null : this.stat.ino,
                  nlink: this.portable ? null : this.stat.nlink,
                }).encode()
              ),
            super.write(this.header.block);
        }
        [um]() {
          this.path.slice(-1) !== '/' && (this.path += '/'), (this.stat.size = 0), this[Ls](), this.end();
        }
        [Nl]() {
          gt.readlink(this.absolute, (e, i) => {
            if (e) return this.emit('error', e);
            this[Al](i);
          });
        }
        [Al](e) {
          (this.linkpath = bt(e)), this[Ls](), this.end();
        }
        [pm](e) {
          (this.type = 'Link'),
            (this.linkpath = bt(om.relative(this.cwd, e))),
            (this.stat.size = 0),
            this[Ls](),
            this.end();
        }
        [lm]() {
          if (this.stat.nlink > 1) {
            let e = this.stat.dev + ':' + this.stat.ino;
            if (this.linkCache.has(e)) {
              let i = this.linkCache.get(e);
              if (i.indexOf(this.cwd) === 0) return this[pm](i);
            }
            this.linkCache.set(e, this.absolute);
          }
          if ((this[Ls](), this.stat.size === 0)) return this.end();
          this[Dl]();
        }
        [Dl]() {
          gt.open(this.absolute, 'r', (e, i) => {
            if (e) return this.emit('error', e);
            this[Fl](i);
          });
        }
        [Fl](e) {
          if (((this.fd = e), this[dm])) return this[di]();
          (this.blockLen = 512 * Math.ceil(this.stat.size / 512)), (this.blockRemain = this.blockLen);
          let i = Math.min(this.blockLen, this.maxReadSize);
          (this.buf = Buffer.allocUnsafe(i)),
            (this.offset = 0),
            (this.pos = 0),
            (this.remain = this.stat.size),
            (this.length = this.buf.length),
            this[ua]();
        }
        [ua]() {
          let { fd: e, buf: i, offset: n, length: s, pos: r } = this;
          gt.read(e, i, n, s, r, (a, o) => {
            if (a) return this[di](() => this.emit('error', a));
            this[Ll](o);
          });
        }
        [di](e) {
          gt.close(this.fd, e);
        }
        [Ll](e) {
          if (e <= 0 && this.remain > 0) {
            let s = new Error('encountered unexpected EOF');
            return (
              (s.path = this.absolute), (s.syscall = 'read'), (s.code = 'EOF'), this[di](() => this.emit('error', s))
            );
          }
          if (e > this.remain) {
            let s = new Error('did not encounter expected EOF');
            return (
              (s.path = this.absolute), (s.syscall = 'read'), (s.code = 'EOF'), this[di](() => this.emit('error', s))
            );
          }
          if (e === this.remain)
            for (let s = e; s < this.length && e < this.blockRemain; s++)
              (this.buf[s + this.offset] = 0), e++, this.remain++;
          let i = this.offset === 0 && e === this.buf.length ? this.buf : this.buf.slice(this.offset, this.offset + e);
          this.write(i) ? this[Il]() : this[Pl](() => this[Il]());
        }
        [Pl](e) {
          this.once('drain', e);
        }
        write(e) {
          if (this.blockRemain < e.length) {
            let i = new Error('writing more data than expected');
            return (i.path = this.absolute), this.emit('error', i);
          }
          return (
            (this.remain -= e.length),
            (this.blockRemain -= e.length),
            (this.pos += e.length),
            (this.offset += e.length),
            super.write(e)
          );
        }
        [Il]() {
          if (!this.remain)
            return (
              this.blockRemain && super.write(Buffer.alloc(this.blockRemain)),
              this[di]((e) => (e ? this.emit('error', e) : this.end()))
            );
          this.offset >= this.length &&
            ((this.buf = Buffer.allocUnsafe(Math.min(this.blockRemain, this.buf.length))), (this.offset = 0)),
            (this.length = this.buf.length - this.offset),
            this[ua]();
        }
      }
    ),
    Ul = class extends ha {
      [kl]() {
        this[pa](gt.lstatSync(this.absolute));
      }
      [Nl]() {
        this[Al](gt.readlinkSync(this.absolute));
      }
      [Dl]() {
        this[Fl](gt.openSync(this.absolute, 'r'));
      }
      [ua]() {
        let e = !0;
        try {
          let { fd: i, buf: n, offset: s, length: r, pos: a } = this,
            o = gt.readSync(i, n, s, r, a);
          this[Ll](o), (e = !1);
        } finally {
          if (e)
            try {
              this[di](() => {});
            } catch {}
        }
      }
      [Pl](e) {
        e();
      }
      [di](e) {
        gt.closeSync(this.fd), e();
      }
    },
    bR = vm(
      class extends hm {
        constructor(e, i) {
          (i = i || {}),
            super(i),
            (this.preservePaths = !!i.preservePaths),
            (this.portable = !!i.portable),
            (this.strict = !!i.strict),
            (this.noPax = !!i.noPax),
            (this.noMtime = !!i.noMtime),
            (this.readEntry = e),
            (this.type = e.type),
            this.type === 'Directory' && this.portable && (this.noMtime = !0),
            (this.prefix = i.prefix || null),
            (this.path = bt(e.path)),
            (this.mode = this[da](e.mode)),
            (this.uid = this.portable ? null : e.uid),
            (this.gid = this.portable ? null : e.gid),
            (this.uname = this.portable ? null : e.uname),
            (this.gname = this.portable ? null : e.gname),
            (this.size = e.size),
            (this.mtime = this.noMtime ? null : i.mtime || e.mtime),
            (this.atime = this.portable ? null : e.atime),
            (this.ctime = this.portable ? null : e.ctime),
            (this.linkpath = bt(e.linkpath)),
            typeof i.onwarn == 'function' && this.on('warn', i.onwarn);
          let n = !1;
          if (!this.preservePaths) {
            let [s, r] = ym(this.path);
            s && ((this.path = r), (n = s));
          }
          (this.remain = e.size),
            (this.blockRemain = e.startBlockSize),
            (this.header = new mm({
              path: this[_t](this.path),
              linkpath: this.type === 'Link' ? this[_t](this.linkpath) : this.linkpath,
              mode: this.mode,
              uid: this.portable ? null : this.uid,
              gid: this.portable ? null : this.gid,
              size: this.size,
              mtime: this.noMtime ? null : this.mtime,
              type: this.type,
              uname: this.portable ? null : this.uname,
              atime: this.portable ? null : this.atime,
              ctime: this.portable ? null : this.ctime,
            })),
            n && this.warn('TAR_ENTRY_INFO', `stripping ${n} from absolute path`, { entry: this, path: n + this.path }),
            this.header.encode() &&
              !this.noPax &&
              super.write(
                new fm({
                  atime: this.portable ? null : this.atime,
                  ctime: this.portable ? null : this.ctime,
                  gid: this.portable ? null : this.gid,
                  mtime: this.noMtime ? null : this.mtime,
                  path: this[_t](this.path),
                  linkpath: this.type === 'Link' ? this[_t](this.linkpath) : this.linkpath,
                  size: this.size,
                  uid: this.portable ? null : this.uid,
                  uname: this.portable ? null : this.uname,
                  dev: this.portable ? null : this.readEntry.dev,
                  ino: this.portable ? null : this.readEntry.ino,
                  nlink: this.portable ? null : this.readEntry.nlink,
                }).encode()
              ),
            super.write(this.header.block),
            e.pipe(this);
        }
        [_t](e) {
          return xm(e, this.prefix);
        }
        [da](e) {
          return bm(e, this.type === 'Directory', this.portable);
        }
        write(e) {
          let i = e.length;
          if (i > this.blockRemain) throw new Error('writing more to entry than is appropriate');
          return (this.blockRemain -= i), super.write(e);
        }
        end() {
          return this.blockRemain && super.write(Buffer.alloc(this.blockRemain)), super.end();
        }
      }
    );
  ha.Sync = Ul;
  ha.Tar = bR;
  var gR = (t) =>
    t.isFile() ? 'File' : t.isDirectory() ? 'Directory' : t.isSymbolicLink() ? 'SymbolicLink' : 'Unsupported';
  gm.exports = ha;
});
var Em = y((xA, _m) => {
  'use strict';
  _m.exports = function (t) {
    t.prototype[Symbol.iterator] = function* () {
      for (let e = this.head; e; e = e.next) yield e.value;
    };
  };
});
var Ml = y((vA, wm) => {
  'use strict';
  wm.exports = V;
  V.Node = ji;
  V.create = V;
  function V(t) {
    var e = this;
    if (
      (e instanceof V || (e = new V()),
      (e.tail = null),
      (e.head = null),
      (e.length = 0),
      t && typeof t.forEach == 'function')
    )
      t.forEach(function (s) {
        e.push(s);
      });
    else if (arguments.length > 0) for (var i = 0, n = arguments.length; i < n; i++) e.push(arguments[i]);
    return e;
  }
  V.prototype.removeNode = function (t) {
    if (t.list !== this) throw new Error('removing node which does not belong to this list');
    var e = t.next,
      i = t.prev;
    return (
      e && (e.prev = i),
      i && (i.next = e),
      t === this.head && (this.head = e),
      t === this.tail && (this.tail = i),
      t.list.length--,
      (t.next = null),
      (t.prev = null),
      (t.list = null),
      e
    );
  };
  V.prototype.unshiftNode = function (t) {
    if (t !== this.head) {
      t.list && t.list.removeNode(t);
      var e = this.head;
      (t.list = this), (t.next = e), e && (e.prev = t), (this.head = t), this.tail || (this.tail = t), this.length++;
    }
  };
  V.prototype.pushNode = function (t) {
    if (t !== this.tail) {
      t.list && t.list.removeNode(t);
      var e = this.tail;
      (t.list = this), (t.prev = e), e && (e.next = t), (this.tail = t), this.head || (this.head = t), this.length++;
    }
  };
  V.prototype.push = function () {
    for (var t = 0, e = arguments.length; t < e; t++) ER(this, arguments[t]);
    return this.length;
  };
  V.prototype.unshift = function () {
    for (var t = 0, e = arguments.length; t < e; t++) wR(this, arguments[t]);
    return this.length;
  };
  V.prototype.pop = function () {
    if (this.tail) {
      var t = this.tail.value;
      return (this.tail = this.tail.prev), this.tail ? (this.tail.next = null) : (this.head = null), this.length--, t;
    }
  };
  V.prototype.shift = function () {
    if (this.head) {
      var t = this.head.value;
      return (this.head = this.head.next), this.head ? (this.head.prev = null) : (this.tail = null), this.length--, t;
    }
  };
  V.prototype.forEach = function (t, e) {
    e = e || this;
    for (var i = this.head, n = 0; i !== null; n++) t.call(e, i.value, n, this), (i = i.next);
  };
  V.prototype.forEachReverse = function (t, e) {
    e = e || this;
    for (var i = this.tail, n = this.length - 1; i !== null; n--) t.call(e, i.value, n, this), (i = i.prev);
  };
  V.prototype.get = function (t) {
    for (var e = 0, i = this.head; i !== null && e < t; e++) i = i.next;
    if (e === t && i !== null) return i.value;
  };
  V.prototype.getReverse = function (t) {
    for (var e = 0, i = this.tail; i !== null && e < t; e++) i = i.prev;
    if (e === t && i !== null) return i.value;
  };
  V.prototype.map = function (t, e) {
    e = e || this;
    for (var i = new V(), n = this.head; n !== null; ) i.push(t.call(e, n.value, this)), (n = n.next);
    return i;
  };
  V.prototype.mapReverse = function (t, e) {
    e = e || this;
    for (var i = new V(), n = this.tail; n !== null; ) i.push(t.call(e, n.value, this)), (n = n.prev);
    return i;
  };
  V.prototype.reduce = function (t, e) {
    var i,
      n = this.head;
    if (arguments.length > 1) i = e;
    else if (this.head) (n = this.head.next), (i = this.head.value);
    else throw new TypeError('Reduce of empty list with no initial value');
    for (var s = 0; n !== null; s++) (i = t(i, n.value, s)), (n = n.next);
    return i;
  };
  V.prototype.reduceReverse = function (t, e) {
    var i,
      n = this.tail;
    if (arguments.length > 1) i = e;
    else if (this.tail) (n = this.tail.prev), (i = this.tail.value);
    else throw new TypeError('Reduce of empty list with no initial value');
    for (var s = this.length - 1; n !== null; s--) (i = t(i, n.value, s)), (n = n.prev);
    return i;
  };
  V.prototype.toArray = function () {
    for (var t = new Array(this.length), e = 0, i = this.head; i !== null; e++) (t[e] = i.value), (i = i.next);
    return t;
  };
  V.prototype.toArrayReverse = function () {
    for (var t = new Array(this.length), e = 0, i = this.tail; i !== null; e++) (t[e] = i.value), (i = i.prev);
    return t;
  };
  V.prototype.slice = function (t, e) {
    (e = e || this.length), e < 0 && (e += this.length), (t = t || 0), t < 0 && (t += this.length);
    var i = new V();
    if (e < t || e < 0) return i;
    t < 0 && (t = 0), e > this.length && (e = this.length);
    for (var n = 0, s = this.head; s !== null && n < t; n++) s = s.next;
    for (; s !== null && n < e; n++, s = s.next) i.push(s.value);
    return i;
  };
  V.prototype.sliceReverse = function (t, e) {
    (e = e || this.length), e < 0 && (e += this.length), (t = t || 0), t < 0 && (t += this.length);
    var i = new V();
    if (e < t || e < 0) return i;
    t < 0 && (t = 0), e > this.length && (e = this.length);
    for (var n = this.length, s = this.tail; s !== null && n > e; n--) s = s.prev;
    for (; s !== null && n > t; n--, s = s.prev) i.push(s.value);
    return i;
  };
  V.prototype.splice = function (t, e, ...i) {
    t > this.length && (t = this.length - 1), t < 0 && (t = this.length + t);
    for (var n = 0, s = this.head; s !== null && n < t; n++) s = s.next;
    for (var r = [], n = 0; s && n < e; n++) r.push(s.value), (s = this.removeNode(s));
    s === null && (s = this.tail), s !== this.head && s !== this.tail && (s = s.prev);
    for (var n = 0; n < i.length; n++) s = _R(this, s, i[n]);
    return r;
  };
  V.prototype.reverse = function () {
    for (var t = this.head, e = this.tail, i = t; i !== null; i = i.prev) {
      var n = i.prev;
      (i.prev = i.next), (i.next = n);
    }
    return (this.head = e), (this.tail = t), this;
  };
  function _R(t, e, i) {
    var n = e === t.head ? new ji(i, null, e, t) : new ji(i, e, e.next, t);
    return n.next === null && (t.tail = n), n.prev === null && (t.head = n), t.length++, n;
  }
  function ER(t, e) {
    (t.tail = new ji(e, t.tail, null, t)), t.head || (t.head = t.tail), t.length++;
  }
  function wR(t, e) {
    (t.head = new ji(e, null, t.head, t)), t.tail || (t.tail = t.head), t.length++;
  }
  function ji(t, e, i, n) {
    if (!(this instanceof ji)) return new ji(t, e, i, n);
    (this.list = n),
      (this.value = t),
      e ? ((e.next = this), (this.prev = e)) : (this.prev = null),
      i ? ((i.prev = this), (this.next = i)) : (this.next = null);
  }
  try {
    Em()(V);
  } catch {}
});
var Ea = y((bA, km) => {
  'use strict';
  var ga = class {
      constructor(e, i) {
        (this.path = e || './'),
          (this.absolute = i),
          (this.entry = null),
          (this.stat = null),
          (this.readdir = null),
          (this.pending = !1),
          (this.ignore = !1),
          (this.piped = !1);
      }
    },
    { Minipass: SR } = Yr(),
    Sm = vl(),
    RR = ra(),
    Kl = Bl(),
    TR = Kl.Sync,
    OR = Kl.Tar,
    CR = Ml(),
    Rm = Buffer.alloc(1024),
    xa = Symbol('onStat'),
    fa = Symbol('ended'),
    Et = Symbol('queue'),
    Tn = Symbol('current'),
    zi = Symbol('process'),
    ma = Symbol('processing'),
    Tm = Symbol('processJob'),
    wt = Symbol('jobs'),
    ql = Symbol('jobDone'),
    va = Symbol('addFSEntry'),
    Om = Symbol('addTarEntry'),
    Hl = Symbol('stat'),
    $l = Symbol('readdir'),
    ya = Symbol('onreaddir'),
    ba = Symbol('pipe'),
    Cm = Symbol('entry'),
    jl = Symbol('entryOpt'),
    Wl = Symbol('writeEntryClass'),
    Nm = Symbol('write'),
    zl = Symbol('ondrain'),
    _a = require('fs'),
    Im = require('path'),
    IR = ca(),
    Gl = En(),
    Xl = IR(
      class extends SR {
        constructor(e) {
          if (
            (super(e),
            (e = e || Object.create(null)),
            (this.opt = e),
            (this.file = e.file || ''),
            (this.cwd = e.cwd || process.cwd()),
            (this.maxReadSize = e.maxReadSize),
            (this.preservePaths = !!e.preservePaths),
            (this.strict = !!e.strict),
            (this.noPax = !!e.noPax),
            (this.prefix = Gl(e.prefix || '')),
            (this.linkCache = e.linkCache || new Map()),
            (this.statCache = e.statCache || new Map()),
            (this.readdirCache = e.readdirCache || new Map()),
            (this[Wl] = Kl),
            typeof e.onwarn == 'function' && this.on('warn', e.onwarn),
            (this.portable = !!e.portable),
            (this.zip = null),
            e.gzip || e.brotli)
          ) {
            if (e.gzip && e.brotli) throw new TypeError('gzip and brotli are mutually exclusive');
            e.gzip &&
              (typeof e.gzip != 'object' && (e.gzip = {}),
              this.portable && (e.gzip.portable = !0),
              (this.zip = new Sm.Gzip(e.gzip))),
              e.brotli &&
                (typeof e.brotli != 'object' && (e.brotli = {}), (this.zip = new Sm.BrotliCompress(e.brotli))),
              this.zip.on('data', (i) => super.write(i)),
              this.zip.on('end', (i) => super.end()),
              this.zip.on('drain', (i) => this[zl]()),
              this.on('resume', (i) => this.zip.resume());
          } else this.on('drain', this[zl]);
          (this.noDirRecurse = !!e.noDirRecurse),
            (this.follow = !!e.follow),
            (this.noMtime = !!e.noMtime),
            (this.mtime = e.mtime || null),
            (this.filter = typeof e.filter == 'function' ? e.filter : (i) => !0),
            (this[Et] = new CR()),
            (this[wt] = 0),
            (this.jobs = +e.jobs || 4),
            (this[ma] = !1),
            (this[fa] = !1);
        }
        [Nm](e) {
          return super.write(e);
        }
        add(e) {
          return this.write(e), this;
        }
        end(e) {
          return e && this.write(e), (this[fa] = !0), this[zi](), this;
        }
        write(e) {
          if (this[fa]) throw new Error('write after end');
          return e instanceof RR ? this[Om](e) : this[va](e), this.flowing;
        }
        [Om](e) {
          let i = Gl(Im.resolve(this.cwd, e.path));
          if (!this.filter(e.path, e)) e.resume();
          else {
            let n = new ga(e.path, i, !1);
            (n.entry = new OR(e, this[jl](n))),
              n.entry.on('end', (s) => this[ql](n)),
              (this[wt] += 1),
              this[Et].push(n);
          }
          this[zi]();
        }
        [va](e) {
          let i = Gl(Im.resolve(this.cwd, e));
          this[Et].push(new ga(e, i)), this[zi]();
        }
        [Hl](e) {
          (e.pending = !0), (this[wt] += 1);
          let i = this.follow ? 'stat' : 'lstat';
          _a[i](e.absolute, (n, s) => {
            (e.pending = !1), (this[wt] -= 1), n ? this.emit('error', n) : this[xa](e, s);
          });
        }
        [xa](e, i) {
          this.statCache.set(e.absolute, i), (e.stat = i), this.filter(e.path, i) || (e.ignore = !0), this[zi]();
        }
        [$l](e) {
          (e.pending = !0),
            (this[wt] += 1),
            _a.readdir(e.absolute, (i, n) => {
              if (((e.pending = !1), (this[wt] -= 1), i)) return this.emit('error', i);
              this[ya](e, n);
            });
        }
        [ya](e, i) {
          this.readdirCache.set(e.absolute, i), (e.readdir = i), this[zi]();
        }
        [zi]() {
          if (!this[ma]) {
            this[ma] = !0;
            for (let e = this[Et].head; e !== null && this[wt] < this.jobs; e = e.next)
              if ((this[Tm](e.value), e.value.ignore)) {
                let i = e.next;
                this[Et].removeNode(e), (e.next = i);
              }
            (this[ma] = !1),
              this[fa] &&
                !this[Et].length &&
                this[wt] === 0 &&
                (this.zip ? this.zip.end(Rm) : (super.write(Rm), super.end()));
          }
        }
        get [Tn]() {
          return this[Et] && this[Et].head && this[Et].head.value;
        }
        [ql](e) {
          this[Et].shift(), (this[wt] -= 1), this[zi]();
        }
        [Tm](e) {
          if (!e.pending) {
            if (e.entry) {
              e === this[Tn] && !e.piped && this[ba](e);
              return;
            }
            if (
              (e.stat || (this.statCache.has(e.absolute) ? this[xa](e, this.statCache.get(e.absolute)) : this[Hl](e)),
              !!e.stat &&
                !e.ignore &&
                !(
                  !this.noDirRecurse &&
                  e.stat.isDirectory() &&
                  !e.readdir &&
                  (this.readdirCache.has(e.absolute) ? this[ya](e, this.readdirCache.get(e.absolute)) : this[$l](e),
                  !e.readdir)
                ))
            ) {
              if (((e.entry = this[Cm](e)), !e.entry)) {
                e.ignore = !0;
                return;
              }
              e === this[Tn] && !e.piped && this[ba](e);
            }
          }
        }
        [jl](e) {
          return {
            onwarn: (i, n, s) => this.warn(i, n, s),
            noPax: this.noPax,
            cwd: this.cwd,
            absolute: e.absolute,
            preservePaths: this.preservePaths,
            maxReadSize: this.maxReadSize,
            strict: this.strict,
            portable: this.portable,
            linkCache: this.linkCache,
            statCache: this.statCache,
            noMtime: this.noMtime,
            mtime: this.mtime,
            prefix: this.prefix,
          };
        }
        [Cm](e) {
          this[wt] += 1;
          try {
            return new this[Wl](e.path, this[jl](e))
              .on('end', () => this[ql](e))
              .on('error', (i) => this.emit('error', i));
          } catch (i) {
            this.emit('error', i);
          }
        }
        [zl]() {
          this[Tn] && this[Tn].entry && this[Tn].entry.resume();
        }
        [ba](e) {
          (e.piped = !0),
            e.readdir &&
              e.readdir.forEach((s) => {
                let r = e.path,
                  a = r === './' ? '' : r.replace(/\/*$/, '/');
                this[va](a + s);
              });
          let i = e.entry,
            n = this.zip;
          n
            ? i.on('data', (s) => {
                n.write(s) || i.pause();
              })
            : i.on('data', (s) => {
                super.write(s) || i.pause();
              });
        }
        pause() {
          return this.zip && this.zip.pause(), super.pause();
        }
      }
    ),
    Vl = class extends Xl {
      constructor(e) {
        super(e), (this[Wl] = TR);
      }
      pause() {}
      resume() {}
      [Hl](e) {
        let i = this.follow ? 'statSync' : 'lstatSync';
        this[xa](e, _a[i](e.absolute));
      }
      [$l](e, i) {
        this[ya](e, _a.readdirSync(e.absolute));
      }
      [ba](e) {
        let i = e.entry,
          n = this.zip;
        e.readdir &&
          e.readdir.forEach((s) => {
            let r = e.path,
              a = r === './' ? '' : r.replace(/\/*$/, '/');
            this[va](a + s);
          }),
          n
            ? i.on('data', (s) => {
                n.write(s);
              })
            : i.on('data', (s) => {
                super[Nm](s);
              });
      }
    };
  Xl.Sync = Vl;
  km.exports = Xl;
});
var jm = y((gA, qm) => {
  'use strict';
  var Lm = typeof process == 'object' && process ? process : { stdout: null, stderr: null },
    NR = require('events'),
    Am = require('stream'),
    Dm = require('string_decoder').StringDecoder,
    Bt = Symbol('EOF'),
    Mt = Symbol('maybeEmitEnd'),
    hi = Symbol('emittedEnd'),
    wa = Symbol('emittingEnd'),
    As = Symbol('emittedError'),
    Sa = Symbol('closed'),
    Fm = Symbol('read'),
    Ra = Symbol('flush'),
    Pm = Symbol('flushChunk'),
    qe = Symbol('encoding'),
    qt = Symbol('decoder'),
    Ta = Symbol('flowing'),
    Ds = Symbol('paused'),
    On = Symbol('resume'),
    xe = Symbol('bufferLength'),
    Yl = Symbol('bufferPush'),
    Jl = Symbol('bufferShift'),
    Te = Symbol('objectMode'),
    Oe = Symbol('destroyed'),
    Zl = Symbol('emitData'),
    Um = Symbol('emitEnd'),
    Ql = Symbol('emitEnd2'),
    jt = Symbol('async'),
    Fs = (t) => Promise.resolve().then(t),
    Bm = global._MP_NO_ITERATOR_SYMBOLS_ !== '1',
    kR = (Bm && Symbol.asyncIterator) || Symbol('asyncIterator not implemented'),
    LR = (Bm && Symbol.iterator) || Symbol('iterator not implemented'),
    AR = (t) => t === 'end' || t === 'finish' || t === 'prefinish',
    DR = (t) =>
      t instanceof ArrayBuffer ||
      (typeof t == 'object' && t.constructor && t.constructor.name === 'ArrayBuffer' && t.byteLength >= 0),
    FR = (t) => !Buffer.isBuffer(t) && ArrayBuffer.isView(t),
    Oa = class {
      constructor(e, i, n) {
        (this.src = e), (this.dest = i), (this.opts = n), (this.ondrain = () => e[On]()), i.on('drain', this.ondrain);
      }
      unpipe() {
        this.dest.removeListener('drain', this.ondrain);
      }
      proxyErrors() {}
      end() {
        this.unpipe(), this.opts.end && this.dest.end();
      }
    },
    eu = class extends Oa {
      unpipe() {
        this.src.removeListener('error', this.proxyErrors), super.unpipe();
      }
      constructor(e, i, n) {
        super(e, i, n), (this.proxyErrors = (s) => i.emit('error', s)), e.on('error', this.proxyErrors);
      }
    };
  qm.exports = class Mm extends Am {
    constructor(e) {
      super(),
        (this[Ta] = !1),
        (this[Ds] = !1),
        (this.pipes = []),
        (this.buffer = []),
        (this[Te] = (e && e.objectMode) || !1),
        this[Te] ? (this[qe] = null) : (this[qe] = (e && e.encoding) || null),
        this[qe] === 'buffer' && (this[qe] = null),
        (this[jt] = (e && !!e.async) || !1),
        (this[qt] = this[qe] ? new Dm(this[qe]) : null),
        (this[Bt] = !1),
        (this[hi] = !1),
        (this[wa] = !1),
        (this[Sa] = !1),
        (this[As] = null),
        (this.writable = !0),
        (this.readable = !0),
        (this[xe] = 0),
        (this[Oe] = !1);
    }
    get bufferLength() {
      return this[xe];
    }
    get encoding() {
      return this[qe];
    }
    set encoding(e) {
      if (this[Te]) throw new Error('cannot set encoding in objectMode');
      if (this[qe] && e !== this[qe] && ((this[qt] && this[qt].lastNeed) || this[xe]))
        throw new Error('cannot change encoding');
      this[qe] !== e &&
        ((this[qt] = e ? new Dm(e) : null),
        this.buffer.length && (this.buffer = this.buffer.map((i) => this[qt].write(i)))),
        (this[qe] = e);
    }
    setEncoding(e) {
      this.encoding = e;
    }
    get objectMode() {
      return this[Te];
    }
    set objectMode(e) {
      this[Te] = this[Te] || !!e;
    }
    get async() {
      return this[jt];
    }
    set async(e) {
      this[jt] = this[jt] || !!e;
    }
    write(e, i, n) {
      if (this[Bt]) throw new Error('write after end');
      if (this[Oe])
        return (
          this.emit(
            'error',
            Object.assign(new Error('Cannot call write after a stream was destroyed'), { code: 'ERR_STREAM_DESTROYED' })
          ),
          !0
        );
      typeof i == 'function' && ((n = i), (i = 'utf8')), i || (i = 'utf8');
      let s = this[jt] ? Fs : (r) => r();
      return (
        !this[Te] &&
          !Buffer.isBuffer(e) &&
          (FR(e)
            ? (e = Buffer.from(e.buffer, e.byteOffset, e.byteLength))
            : DR(e)
            ? (e = Buffer.from(e))
            : typeof e != 'string' && (this.objectMode = !0)),
        this[Te]
          ? (this.flowing && this[xe] !== 0 && this[Ra](!0),
            this.flowing ? this.emit('data', e) : this[Yl](e),
            this[xe] !== 0 && this.emit('readable'),
            n && s(n),
            this.flowing)
          : e.length
          ? (typeof e == 'string' && !(i === this[qe] && !this[qt].lastNeed) && (e = Buffer.from(e, i)),
            Buffer.isBuffer(e) && this[qe] && (e = this[qt].write(e)),
            this.flowing && this[xe] !== 0 && this[Ra](!0),
            this.flowing ? this.emit('data', e) : this[Yl](e),
            this[xe] !== 0 && this.emit('readable'),
            n && s(n),
            this.flowing)
          : (this[xe] !== 0 && this.emit('readable'), n && s(n), this.flowing)
      );
    }
    read(e) {
      if (this[Oe]) return null;
      if (this[xe] === 0 || e === 0 || e > this[xe]) return this[Mt](), null;
      this[Te] && (e = null),
        this.buffer.length > 1 &&
          !this[Te] &&
          (this.encoding
            ? (this.buffer = [this.buffer.join('')])
            : (this.buffer = [Buffer.concat(this.buffer, this[xe])]));
      let i = this[Fm](e || null, this.buffer[0]);
      return this[Mt](), i;
    }
    [Fm](e, i) {
      return (
        e === i.length || e === null
          ? this[Jl]()
          : ((this.buffer[0] = i.slice(e)), (i = i.slice(0, e)), (this[xe] -= e)),
        this.emit('data', i),
        !this.buffer.length && !this[Bt] && this.emit('drain'),
        i
      );
    }
    end(e, i, n) {
      return (
        typeof e == 'function' && ((n = e), (e = null)),
        typeof i == 'function' && ((n = i), (i = 'utf8')),
        e && this.write(e, i),
        n && this.once('end', n),
        (this[Bt] = !0),
        (this.writable = !1),
        (this.flowing || !this[Ds]) && this[Mt](),
        this
      );
    }
    [On]() {
      this[Oe] ||
        ((this[Ds] = !1),
        (this[Ta] = !0),
        this.emit('resume'),
        this.buffer.length ? this[Ra]() : this[Bt] ? this[Mt]() : this.emit('drain'));
    }
    resume() {
      return this[On]();
    }
    pause() {
      (this[Ta] = !1), (this[Ds] = !0);
    }
    get destroyed() {
      return this[Oe];
    }
    get flowing() {
      return this[Ta];
    }
    get paused() {
      return this[Ds];
    }
    [Yl](e) {
      this[Te] ? (this[xe] += 1) : (this[xe] += e.length), this.buffer.push(e);
    }
    [Jl]() {
      return (
        this.buffer.length && (this[Te] ? (this[xe] -= 1) : (this[xe] -= this.buffer[0].length)), this.buffer.shift()
      );
    }
    [Ra](e) {
      do;
      while (this[Pm](this[Jl]()));
      !e && !this.buffer.length && !this[Bt] && this.emit('drain');
    }
    [Pm](e) {
      return e ? (this.emit('data', e), this.flowing) : !1;
    }
    pipe(e, i) {
      if (this[Oe]) return;
      let n = this[hi];
      return (
        (i = i || {}),
        e === Lm.stdout || e === Lm.stderr ? (i.end = !1) : (i.end = i.end !== !1),
        (i.proxyErrors = !!i.proxyErrors),
        n
          ? i.end && e.end()
          : (this.pipes.push(i.proxyErrors ? new eu(this, e, i) : new Oa(this, e, i)),
            this[jt] ? Fs(() => this[On]()) : this[On]()),
        e
      );
    }
    unpipe(e) {
      let i = this.pipes.find((n) => n.dest === e);
      i && (this.pipes.splice(this.pipes.indexOf(i), 1), i.unpipe());
    }
    addListener(e, i) {
      return this.on(e, i);
    }
    on(e, i) {
      let n = super.on(e, i);
      return (
        e === 'data' && !this.pipes.length && !this.flowing
          ? this[On]()
          : e === 'readable' && this[xe] !== 0
          ? super.emit('readable')
          : AR(e) && this[hi]
          ? (super.emit(e), this.removeAllListeners(e))
          : e === 'error' && this[As] && (this[jt] ? Fs(() => i.call(this, this[As])) : i.call(this, this[As])),
        n
      );
    }
    get emittedEnd() {
      return this[hi];
    }
    [Mt]() {
      !this[wa] &&
        !this[hi] &&
        !this[Oe] &&
        this.buffer.length === 0 &&
        this[Bt] &&
        ((this[wa] = !0),
        this.emit('end'),
        this.emit('prefinish'),
        this.emit('finish'),
        this[Sa] && this.emit('close'),
        (this[wa] = !1));
    }
    emit(e, i, ...n) {
      if (e !== 'error' && e !== 'close' && e !== Oe && this[Oe]) return;
      if (e === 'data') return i ? (this[jt] ? Fs(() => this[Zl](i)) : this[Zl](i)) : !1;
      if (e === 'end') return this[Um]();
      if (e === 'close') {
        if (((this[Sa] = !0), !this[hi] && !this[Oe])) return;
        let r = super.emit('close');
        return this.removeAllListeners('close'), r;
      } else if (e === 'error') {
        this[As] = i;
        let r = super.emit('error', i);
        return this[Mt](), r;
      } else if (e === 'resume') {
        let r = super.emit('resume');
        return this[Mt](), r;
      } else if (e === 'finish' || e === 'prefinish') {
        let r = super.emit(e);
        return this.removeAllListeners(e), r;
      }
      let s = super.emit(e, i, ...n);
      return this[Mt](), s;
    }
    [Zl](e) {
      for (let n of this.pipes) n.dest.write(e) === !1 && this.pause();
      let i = super.emit('data', e);
      return this[Mt](), i;
    }
    [Um]() {
      this[hi] || ((this[hi] = !0), (this.readable = !1), this[jt] ? Fs(() => this[Ql]()) : this[Ql]());
    }
    [Ql]() {
      if (this[qt]) {
        let i = this[qt].end();
        if (i) {
          for (let n of this.pipes) n.dest.write(i);
          super.emit('data', i);
        }
      }
      for (let i of this.pipes) i.end();
      let e = super.emit('end');
      return this.removeAllListeners('end'), e;
    }
    collect() {
      let e = [];
      this[Te] || (e.dataLength = 0);
      let i = this.promise();
      return (
        this.on('data', (n) => {
          e.push(n), this[Te] || (e.dataLength += n.length);
        }),
        i.then(() => e)
      );
    }
    concat() {
      return this[Te]
        ? Promise.reject(new Error('cannot concat in objectMode'))
        : this.collect().then((e) =>
            this[Te]
              ? Promise.reject(new Error('cannot concat in objectMode'))
              : this[qe]
              ? e.join('')
              : Buffer.concat(e, e.dataLength)
          );
    }
    promise() {
      return new Promise((e, i) => {
        this.on(Oe, () => i(new Error('stream destroyed'))), this.on('error', (n) => i(n)), this.on('end', () => e());
      });
    }
    [kR]() {
      return {
        next: () => {
          let i = this.read();
          if (i !== null) return Promise.resolve({ done: !1, value: i });
          if (this[Bt]) return Promise.resolve({ done: !0 });
          let n = null,
            s = null,
            r = (l) => {
              this.removeListener('data', a), this.removeListener('end', o), s(l);
            },
            a = (l) => {
              this.removeListener('error', r),
                this.removeListener('end', o),
                this.pause(),
                n({ value: l, done: !!this[Bt] });
            },
            o = () => {
              this.removeListener('error', r), this.removeListener('data', a), n({ done: !0 });
            },
            u = () => r(new Error('stream destroyed'));
          return new Promise((l, c) => {
            (s = c), (n = l), this.once(Oe, u), this.once('error', r), this.once('end', o), this.once('data', a);
          });
        },
      };
    }
    [LR]() {
      return {
        next: () => {
          let i = this.read();
          return { value: i, done: i === null };
        },
      };
    }
    destroy(e) {
      return this[Oe]
        ? (e ? this.emit('error', e) : this.emit(Oe), this)
        : ((this[Oe] = !0),
          (this.buffer.length = 0),
          (this[xe] = 0),
          typeof this.close == 'function' && !this[Sa] && this.close(),
          e ? this.emit('error', e) : this.emit(Oe),
          this);
    }
    static isStream(e) {
      return (
        !!e &&
        (e instanceof Mm ||
          e instanceof Am ||
          (e instanceof NR &&
            (typeof e.pipe == 'function' || (typeof e.write == 'function' && typeof e.end == 'function'))))
      );
    }
  };
});
var Fn = y((Us) => {
  'use strict';
  var PR = jm(),
    UR = require('events').EventEmitter,
    je = require('fs'),
    nu = je.writev;
  if (!nu) {
    let t = process.binding('fs'),
      e = t.FSReqWrap || t.FSReqCallback;
    nu = (i, n, s, r) => {
      let a = (u, l) => r(u, l, n),
        o = new e();
      (o.oncomplete = a), t.writeBuffers(i, n, s, o);
    };
  }
  var An = Symbol('_autoClose'),
    ct = Symbol('_close'),
    Ps = Symbol('_ended'),
    X = Symbol('_fd'),
    zm = Symbol('_finished'),
    mi = Symbol('_flags'),
    tu = Symbol('_flush'),
    su = Symbol('_handleChunk'),
    ru = Symbol('_makeBuf'),
    La = Symbol('_mode'),
    Ca = Symbol('_needDrain'),
    kn = Symbol('_onerror'),
    Dn = Symbol('_onopen'),
    iu = Symbol('_onread'),
    In = Symbol('_onwrite'),
    xi = Symbol('_open'),
    zt = Symbol('_path'),
    Gi = Symbol('_pos'),
    St = Symbol('_queue'),
    Nn = Symbol('_read'),
    Gm = Symbol('_readSize'),
    fi = Symbol('_reading'),
    Ia = Symbol('_remain'),
    Hm = Symbol('_size'),
    Na = Symbol('_write'),
    Cn = Symbol('_writing'),
    ka = Symbol('_defaultFlag'),
    Ln = Symbol('_errored'),
    Aa = class extends PR {
      constructor(e, i) {
        if (((i = i || {}), super(i), (this.readable = !0), (this.writable = !1), typeof e != 'string'))
          throw new TypeError('path must be a string');
        (this[Ln] = !1),
          (this[X] = typeof i.fd == 'number' ? i.fd : null),
          (this[zt] = e),
          (this[Gm] = i.readSize || 16 * 1024 * 1024),
          (this[fi] = !1),
          (this[Hm] = typeof i.size == 'number' ? i.size : 1 / 0),
          (this[Ia] = this[Hm]),
          (this[An] = typeof i.autoClose == 'boolean' ? i.autoClose : !0),
          typeof this[X] == 'number' ? this[Nn]() : this[xi]();
      }
      get fd() {
        return this[X];
      }
      get path() {
        return this[zt];
      }
      write() {
        throw new TypeError('this is a readable stream');
      }
      end() {
        throw new TypeError('this is a readable stream');
      }
      [xi]() {
        je.open(this[zt], 'r', (e, i) => this[Dn](e, i));
      }
      [Dn](e, i) {
        e ? this[kn](e) : ((this[X] = i), this.emit('open', i), this[Nn]());
      }
      [ru]() {
        return Buffer.allocUnsafe(Math.min(this[Gm], this[Ia]));
      }
      [Nn]() {
        if (!this[fi]) {
          this[fi] = !0;
          let e = this[ru]();
          if (e.length === 0) return process.nextTick(() => this[iu](null, 0, e));
          je.read(this[X], e, 0, e.length, null, (i, n, s) => this[iu](i, n, s));
        }
      }
      [iu](e, i, n) {
        (this[fi] = !1), e ? this[kn](e) : this[su](i, n) && this[Nn]();
      }
      [ct]() {
        if (this[An] && typeof this[X] == 'number') {
          let e = this[X];
          (this[X] = null), je.close(e, (i) => (i ? this.emit('error', i) : this.emit('close')));
        }
      }
      [kn](e) {
        (this[fi] = !0), this[ct](), this.emit('error', e);
      }
      [su](e, i) {
        let n = !1;
        return (
          (this[Ia] -= e),
          e > 0 && (n = super.write(e < i.length ? i.slice(0, e) : i)),
          (e === 0 || this[Ia] <= 0) && ((n = !1), this[ct](), super.end()),
          n
        );
      }
      emit(e, i) {
        switch (e) {
          case 'prefinish':
          case 'finish':
            break;
          case 'drain':
            typeof this[X] == 'number' && this[Nn]();
            break;
          case 'error':
            return this[Ln] ? void 0 : ((this[Ln] = !0), super.emit(e, i));
          default:
            return super.emit(e, i);
        }
      }
    },
    au = class extends Aa {
      [xi]() {
        let e = !0;
        try {
          this[Dn](null, je.openSync(this[zt], 'r')), (e = !1);
        } finally {
          e && this[ct]();
        }
      }
      [Nn]() {
        let e = !0;
        try {
          if (!this[fi]) {
            this[fi] = !0;
            do {
              let i = this[ru](),
                n = i.length === 0 ? 0 : je.readSync(this[X], i, 0, i.length, null);
              if (!this[su](n, i)) break;
            } while (!0);
            this[fi] = !1;
          }
          e = !1;
        } finally {
          e && this[ct]();
        }
      }
      [ct]() {
        if (this[An] && typeof this[X] == 'number') {
          let e = this[X];
          (this[X] = null), je.closeSync(e), this.emit('close');
        }
      }
    },
    Da = class extends UR {
      constructor(e, i) {
        (i = i || {}),
          super(i),
          (this.readable = !1),
          (this.writable = !0),
          (this[Ln] = !1),
          (this[Cn] = !1),
          (this[Ps] = !1),
          (this[Ca] = !1),
          (this[St] = []),
          (this[zt] = e),
          (this[X] = typeof i.fd == 'number' ? i.fd : null),
          (this[La] = i.mode === void 0 ? 438 : i.mode),
          (this[Gi] = typeof i.start == 'number' ? i.start : null),
          (this[An] = typeof i.autoClose == 'boolean' ? i.autoClose : !0);
        let n = this[Gi] !== null ? 'r+' : 'w';
        (this[ka] = i.flags === void 0), (this[mi] = this[ka] ? n : i.flags), this[X] === null && this[xi]();
      }
      emit(e, i) {
        if (e === 'error') {
          if (this[Ln]) return;
          this[Ln] = !0;
        }
        return super.emit(e, i);
      }
      get fd() {
        return this[X];
      }
      get path() {
        return this[zt];
      }
      [kn](e) {
        this[ct](), (this[Cn] = !0), this.emit('error', e);
      }
      [xi]() {
        je.open(this[zt], this[mi], this[La], (e, i) => this[Dn](e, i));
      }
      [Dn](e, i) {
        this[ka] && this[mi] === 'r+' && e && e.code === 'ENOENT'
          ? ((this[mi] = 'w'), this[xi]())
          : e
          ? this[kn](e)
          : ((this[X] = i), this.emit('open', i), this[tu]());
      }
      end(e, i) {
        return (
          e && this.write(e, i),
          (this[Ps] = !0),
          !this[Cn] && !this[St].length && typeof this[X] == 'number' && this[In](null, 0),
          this
        );
      }
      write(e, i) {
        return (
          typeof e == 'string' && (e = Buffer.from(e, i)),
          this[Ps]
            ? (this.emit('error', new Error('write() after end()')), !1)
            : this[X] === null || this[Cn] || this[St].length
            ? (this[St].push(e), (this[Ca] = !0), !1)
            : ((this[Cn] = !0), this[Na](e), !0)
        );
      }
      [Na](e) {
        je.write(this[X], e, 0, e.length, this[Gi], (i, n) => this[In](i, n));
      }
      [In](e, i) {
        e
          ? this[kn](e)
          : (this[Gi] !== null && (this[Gi] += i),
            this[St].length
              ? this[tu]()
              : ((this[Cn] = !1),
                this[Ps] && !this[zm]
                  ? ((this[zm] = !0), this[ct](), this.emit('finish'))
                  : this[Ca] && ((this[Ca] = !1), this.emit('drain'))));
      }
      [tu]() {
        if (this[St].length === 0) this[Ps] && this[In](null, 0);
        else if (this[St].length === 1) this[Na](this[St].pop());
        else {
          let e = this[St];
          (this[St] = []), nu(this[X], e, this[Gi], (i, n) => this[In](i, n));
        }
      }
      [ct]() {
        if (this[An] && typeof this[X] == 'number') {
          let e = this[X];
          (this[X] = null), je.close(e, (i) => (i ? this.emit('error', i) : this.emit('close')));
        }
      }
    },
    ou = class extends Da {
      [xi]() {
        let e;
        if (this[ka] && this[mi] === 'r+')
          try {
            e = je.openSync(this[zt], this[mi], this[La]);
          } catch (i) {
            if (i.code === 'ENOENT') return (this[mi] = 'w'), this[xi]();
            throw i;
          }
        else e = je.openSync(this[zt], this[mi], this[La]);
        this[Dn](null, e);
      }
      [ct]() {
        if (this[An] && typeof this[X] == 'number') {
          let e = this[X];
          (this[X] = null), je.closeSync(e), this.emit('close');
        }
      }
      [Na](e) {
        let i = !0;
        try {
          this[In](null, je.writeSync(this[X], e, 0, e.length, this[Gi])), (i = !1);
        } finally {
          if (i)
            try {
              this[ct]();
            } catch {}
        }
      }
    };
  Us.ReadStream = Aa;
  Us.ReadStreamSync = au;
  Us.WriteStream = Da;
  Us.WriteStreamSync = ou;
});
var ja = y((wA, ex) => {
  'use strict';
  var BR = ca(),
    $m = Sn(),
    MR = require('events'),
    qR = Ml(),
    jR = 1024 * 1024,
    zR = ra(),
    Wm = oa(),
    Vm = vl(),
    { nextTick: GR } = require('process'),
    cu = Buffer.from([31, 139]),
    Ze = Symbol('state'),
    Hi = Symbol('writeEntry'),
    Gt = Symbol('readEntry'),
    lu = Symbol('nextEntry'),
    Km = Symbol('processEntry'),
    Qe = Symbol('extendedHeader'),
    Bs = Symbol('globalExtendedHeader'),
    vi = Symbol('meta'),
    Xm = Symbol('emitMeta'),
    Z = Symbol('buffer'),
    Ht = Symbol('queue'),
    yi = Symbol('ended'),
    Ym = Symbol('emittedEnd'),
    $i = Symbol('emit'),
    ve = Symbol('unzip'),
    Fa = Symbol('consumeChunk'),
    Pa = Symbol('consumeChunkSub'),
    uu = Symbol('consumeBody'),
    Jm = Symbol('consumeMeta'),
    Zm = Symbol('consumeHeader'),
    Ua = Symbol('consuming'),
    pu = Symbol('bufferConcat'),
    du = Symbol('maybeEnd'),
    Ms = Symbol('writing'),
    bi = Symbol('aborted'),
    Ba = Symbol('onDone'),
    Wi = Symbol('sawValidEntry'),
    Ma = Symbol('sawNullBlock'),
    qa = Symbol('sawEOF'),
    Qm = Symbol('closeStream'),
    HR = (t) => !0;
  ex.exports = BR(
    class extends MR {
      constructor(e) {
        (e = e || {}),
          super(e),
          (this.file = e.file || ''),
          (this[Wi] = null),
          this.on(Ba, (n) => {
            (this[Ze] === 'begin' || this[Wi] === !1) && this.warn('TAR_BAD_ARCHIVE', 'Unrecognized archive format');
          }),
          e.ondone
            ? this.on(Ba, e.ondone)
            : this.on(Ba, (n) => {
                this.emit('prefinish'), this.emit('finish'), this.emit('end');
              }),
          (this.strict = !!e.strict),
          (this.maxMetaEntrySize = e.maxMetaEntrySize || jR),
          (this.filter = typeof e.filter == 'function' ? e.filter : HR);
        let i = e.file && (e.file.endsWith('.tar.br') || e.file.endsWith('.tbr'));
        (this.brotli = !e.gzip && e.brotli !== void 0 ? e.brotli : i ? void 0 : !1),
          (this.writable = !0),
          (this.readable = !1),
          (this[Ht] = new qR()),
          (this[Z] = null),
          (this[Gt] = null),
          (this[Hi] = null),
          (this[Ze] = 'begin'),
          (this[vi] = ''),
          (this[Qe] = null),
          (this[Bs] = null),
          (this[yi] = !1),
          (this[ve] = null),
          (this[bi] = !1),
          (this[Ma] = !1),
          (this[qa] = !1),
          this.on('end', () => this[Qm]()),
          typeof e.onwarn == 'function' && this.on('warn', e.onwarn),
          typeof e.onentry == 'function' && this.on('entry', e.onentry);
      }
      [Zm](e, i) {
        this[Wi] === null && (this[Wi] = !1);
        let n;
        try {
          n = new $m(e, i, this[Qe], this[Bs]);
        } catch (s) {
          return this.warn('TAR_ENTRY_INVALID', s);
        }
        if (n.nullBlock)
          this[Ma]
            ? ((this[qa] = !0), this[Ze] === 'begin' && (this[Ze] = 'header'), this[$i]('eof'))
            : ((this[Ma] = !0), this[$i]('nullBlock'));
        else if (((this[Ma] = !1), !n.cksumValid)) this.warn('TAR_ENTRY_INVALID', 'checksum failure', { header: n });
        else if (!n.path) this.warn('TAR_ENTRY_INVALID', 'path is required', { header: n });
        else {
          let s = n.type;
          if (/^(Symbolic)?Link$/.test(s) && !n.linkpath)
            this.warn('TAR_ENTRY_INVALID', 'linkpath required', { header: n });
          else if (!/^(Symbolic)?Link$/.test(s) && n.linkpath)
            this.warn('TAR_ENTRY_INVALID', 'linkpath forbidden', { header: n });
          else {
            let r = (this[Hi] = new zR(n, this[Qe], this[Bs]));
            if (!this[Wi])
              if (r.remain) {
                let a = () => {
                  r.invalid || (this[Wi] = !0);
                };
                r.on('end', a);
              } else this[Wi] = !0;
            r.meta
              ? r.size > this.maxMetaEntrySize
                ? ((r.ignore = !0), this[$i]('ignoredEntry', r), (this[Ze] = 'ignore'), r.resume())
                : r.size > 0 && ((this[vi] = ''), r.on('data', (a) => (this[vi] += a)), (this[Ze] = 'meta'))
              : ((this[Qe] = null),
                (r.ignore = r.ignore || !this.filter(r.path, r)),
                r.ignore
                  ? (this[$i]('ignoredEntry', r), (this[Ze] = r.remain ? 'ignore' : 'header'), r.resume())
                  : (r.remain ? (this[Ze] = 'body') : ((this[Ze] = 'header'), r.end()),
                    this[Gt] ? this[Ht].push(r) : (this[Ht].push(r), this[lu]())));
          }
        }
      }
      [Qm]() {
        GR(() => this.emit('close'));
      }
      [Km](e) {
        let i = !0;
        return (
          e
            ? Array.isArray(e)
              ? this.emit.apply(this, e)
              : ((this[Gt] = e), this.emit('entry', e), e.emittedEnd || (e.on('end', (n) => this[lu]()), (i = !1)))
            : ((this[Gt] = null), (i = !1)),
          i
        );
      }
      [lu]() {
        do;
        while (this[Km](this[Ht].shift()));
        if (!this[Ht].length) {
          let e = this[Gt];
          !e || e.flowing || e.size === e.remain
            ? this[Ms] || this.emit('drain')
            : e.once('drain', (n) => this.emit('drain'));
        }
      }
      [uu](e, i) {
        let n = this[Hi],
          s = n.blockRemain,
          r = s >= e.length && i === 0 ? e : e.slice(i, i + s);
        return n.write(r), n.blockRemain || ((this[Ze] = 'header'), (this[Hi] = null), n.end()), r.length;
      }
      [Jm](e, i) {
        let n = this[Hi],
          s = this[uu](e, i);
        return this[Hi] || this[Xm](n), s;
      }
      [$i](e, i, n) {
        !this[Ht].length && !this[Gt] ? this.emit(e, i, n) : this[Ht].push([e, i, n]);
      }
      [Xm](e) {
        switch ((this[$i]('meta', this[vi]), e.type)) {
          case 'ExtendedHeader':
          case 'OldExtendedHeader':
            this[Qe] = Wm.parse(this[vi], this[Qe], !1);
            break;
          case 'GlobalExtendedHeader':
            this[Bs] = Wm.parse(this[vi], this[Bs], !0);
            break;
          case 'NextFileHasLongPath':
          case 'OldGnuLongPath':
            (this[Qe] = this[Qe] || Object.create(null)), (this[Qe].path = this[vi].replace(/\0.*/, ''));
            break;
          case 'NextFileHasLongLinkpath':
            (this[Qe] = this[Qe] || Object.create(null)), (this[Qe].linkpath = this[vi].replace(/\0.*/, ''));
            break;
          default:
            throw new Error('unknown meta: ' + e.type);
        }
      }
      abort(e) {
        (this[bi] = !0), this.emit('abort', e), this.warn('TAR_ABORT', e, { recoverable: !1 });
      }
      write(e) {
        if (this[bi]) return;
        if ((this[ve] === null || (this.brotli === void 0 && this[ve] === !1)) && e) {
          if ((this[Z] && ((e = Buffer.concat([this[Z], e])), (this[Z] = null)), e.length < cu.length))
            return (this[Z] = e), !0;
          for (let r = 0; this[ve] === null && r < cu.length; r++) e[r] !== cu[r] && (this[ve] = !1);
          let s = this.brotli === void 0;
          if (this[ve] === !1 && s)
            if (e.length < 512)
              if (this[yi]) this.brotli = !0;
              else return (this[Z] = e), !0;
            else
              try {
                new $m(e.slice(0, 512)), (this.brotli = !1);
              } catch {
                this.brotli = !0;
              }
          if (this[ve] === null || (this[ve] === !1 && this.brotli)) {
            let r = this[yi];
            (this[yi] = !1),
              (this[ve] = this[ve] === null ? new Vm.Unzip() : new Vm.BrotliDecompress()),
              this[ve].on('data', (o) => this[Fa](o)),
              this[ve].on('error', (o) => this.abort(o)),
              this[ve].on('end', (o) => {
                (this[yi] = !0), this[Fa]();
              }),
              (this[Ms] = !0);
            let a = this[ve][r ? 'end' : 'write'](e);
            return (this[Ms] = !1), a;
          }
        }
        (this[Ms] = !0), this[ve] ? this[ve].write(e) : this[Fa](e), (this[Ms] = !1);
        let n = this[Ht].length ? !1 : this[Gt] ? this[Gt].flowing : !0;
        return !n && !this[Ht].length && this[Gt].once('drain', (s) => this.emit('drain')), n;
      }
      [pu](e) {
        e && !this[bi] && (this[Z] = this[Z] ? Buffer.concat([this[Z], e]) : e);
      }
      [du]() {
        if (this[yi] && !this[Ym] && !this[bi] && !this[Ua]) {
          this[Ym] = !0;
          let e = this[Hi];
          if (e && e.blockRemain) {
            let i = this[Z] ? this[Z].length : 0;
            this.warn('TAR_BAD_ARCHIVE', `Truncated input (needed ${e.blockRemain} more bytes, only ${i} available)`, {
              entry: e,
            }),
              this[Z] && e.write(this[Z]),
              e.end();
          }
          this[$i](Ba);
        }
      }
      [Fa](e) {
        if (this[Ua]) this[pu](e);
        else if (!e && !this[Z]) this[du]();
        else {
          if (((this[Ua] = !0), this[Z])) {
            this[pu](e);
            let i = this[Z];
            (this[Z] = null), this[Pa](i);
          } else this[Pa](e);
          for (; this[Z] && this[Z].length >= 512 && !this[bi] && !this[qa]; ) {
            let i = this[Z];
            (this[Z] = null), this[Pa](i);
          }
          this[Ua] = !1;
        }
        (!this[Z] || this[yi]) && this[du]();
      }
      [Pa](e) {
        let i = 0,
          n = e.length;
        for (; i + 512 <= n && !this[bi] && !this[qa]; )
          switch (this[Ze]) {
            case 'begin':
            case 'header':
              this[Zm](e, i), (i += 512);
              break;
            case 'ignore':
            case 'body':
              i += this[uu](e, i);
              break;
            case 'meta':
              i += this[Jm](e, i);
              break;
            default:
              throw new Error('invalid state: ' + this[Ze]);
          }
        i < n && (this[Z] ? (this[Z] = Buffer.concat([e.slice(i), this[Z]])) : (this[Z] = e.slice(i)));
      }
      end(e) {
        this[bi] ||
          (this[ve]
            ? this[ve].end(e)
            : ((this[yi] = !0), this.brotli === void 0 && (e = e || Buffer.alloc(0)), this.write(e)));
      }
    }
  );
});
var za = y((SA, sx) => {
  'use strict';
  var $R = vn(),
    ix = ja(),
    Pn = require('fs'),
    WR = Fn(),
    tx = require('path'),
    hu = Rn();
  sx.exports = (t, e, i) => {
    typeof t == 'function' ? ((i = t), (e = null), (t = {})) : Array.isArray(t) && ((e = t), (t = {})),
      typeof e == 'function' && ((i = e), (e = null)),
      e ? (e = Array.from(e)) : (e = []);
    let n = $R(t);
    if (n.sync && typeof i == 'function') throw new TypeError('callback not supported for sync tar functions');
    if (!n.file && typeof i == 'function') throw new TypeError('callback only supported with file option');
    return e.length && KR(n, e), n.noResume || VR(n), n.file && n.sync ? XR(n) : n.file ? YR(n, i) : nx(n);
  };
  var VR = (t) => {
      let e = t.onentry;
      t.onentry = e
        ? (i) => {
            e(i), i.resume();
          }
        : (i) => i.resume();
    },
    KR = (t, e) => {
      let i = new Map(e.map((r) => [hu(r), !0])),
        n = t.filter,
        s = (r, a) => {
          let o = a || tx.parse(r).root || '.',
            u = r === o ? !1 : i.has(r) ? i.get(r) : s(tx.dirname(r), o);
          return i.set(r, u), u;
        };
      t.filter = n ? (r, a) => n(r, a) && s(hu(r)) : (r) => s(hu(r));
    },
    XR = (t) => {
      let e = nx(t),
        i = t.file,
        n = !0,
        s;
      try {
        let r = Pn.statSync(i),
          a = t.maxReadSize || 16 * 1024 * 1024;
        if (r.size < a) e.end(Pn.readFileSync(i));
        else {
          let o = 0,
            u = Buffer.allocUnsafe(a);
          for (s = Pn.openSync(i, 'r'); o < r.size; ) {
            let l = Pn.readSync(s, u, 0, a, o);
            (o += l), e.write(u.slice(0, l));
          }
          e.end();
        }
        n = !1;
      } finally {
        if (n && s)
          try {
            Pn.closeSync(s);
          } catch {}
      }
    },
    YR = (t, e) => {
      let i = new ix(t),
        n = t.maxReadSize || 16 * 1024 * 1024,
        s = t.file,
        r = new Promise((a, o) => {
          i.on('error', o),
            i.on('end', a),
            Pn.stat(s, (u, l) => {
              if (u) o(u);
              else {
                let c = new WR.ReadStream(s, { readSize: n, size: l.size });
                c.on('error', o), c.pipe(i);
              }
            });
        });
      return e ? r.then(e, e) : r;
    },
    nx = (t) => new ix(t);
});
var ux = y((RA, lx) => {
  'use strict';
  var JR = vn(),
    Ga = Ea(),
    rx = Fn(),
    ax = za(),
    ox = require('path');
  lx.exports = (t, e, i) => {
    if (
      (typeof e == 'function' && (i = e), Array.isArray(t) && ((e = t), (t = {})), !e || !Array.isArray(e) || !e.length)
    )
      throw new TypeError('no files or directories specified');
    e = Array.from(e);
    let n = JR(t);
    if (n.sync && typeof i == 'function') throw new TypeError('callback not supported for sync tar functions');
    if (!n.file && typeof i == 'function') throw new TypeError('callback only supported with file option');
    return n.file && n.sync ? ZR(n, e) : n.file ? QR(n, e, i) : n.sync ? eT(n, e) : tT(n, e);
  };
  var ZR = (t, e) => {
      let i = new Ga.Sync(t),
        n = new rx.WriteStreamSync(t.file, { mode: t.mode || 438 });
      i.pipe(n), cx(i, e);
    },
    QR = (t, e, i) => {
      let n = new Ga(t),
        s = new rx.WriteStream(t.file, { mode: t.mode || 438 });
      n.pipe(s);
      let r = new Promise((a, o) => {
        s.on('error', o), s.on('close', a), n.on('error', o);
      });
      return fu(n, e), i ? r.then(i, i) : r;
    },
    cx = (t, e) => {
      e.forEach((i) => {
        i.charAt(0) === '@'
          ? ax({ file: ox.resolve(t.cwd, i.slice(1)), sync: !0, noResume: !0, onentry: (n) => t.add(n) })
          : t.add(i);
      }),
        t.end();
    },
    fu = (t, e) => {
      for (; e.length; ) {
        let i = e.shift();
        if (i.charAt(0) === '@')
          return ax({ file: ox.resolve(t.cwd, i.slice(1)), noResume: !0, onentry: (n) => t.add(n) }).then((n) =>
            fu(t, e)
          );
        t.add(i);
      }
      t.end();
    },
    eT = (t, e) => {
      let i = new Ga.Sync(t);
      return cx(i, e), i;
    },
    tT = (t, e) => {
      let i = new Ga(t);
      return fu(i, e), i;
    };
});
var mu = y((TA, vx) => {
  'use strict';
  var iT = vn(),
    px = Ea(),
    We = require('fs'),
    dx = Fn(),
    hx = za(),
    fx = require('path'),
    mx = Sn();
  vx.exports = (t, e, i) => {
    let n = iT(t);
    if (!n.file) throw new TypeError('file is required');
    if (n.gzip || n.brotli || n.file.endsWith('.br') || n.file.endsWith('.tbr'))
      throw new TypeError('cannot append to compressed archives');
    if (!e || !Array.isArray(e) || !e.length) throw new TypeError('no files or directories specified');
    return (e = Array.from(e)), n.sync ? nT(n, e) : rT(n, e, i);
  };
  var nT = (t, e) => {
      let i = new px.Sync(t),
        n = !0,
        s,
        r;
      try {
        try {
          s = We.openSync(t.file, 'r+');
        } catch (u) {
          if (u.code === 'ENOENT') s = We.openSync(t.file, 'w+');
          else throw u;
        }
        let a = We.fstatSync(s),
          o = Buffer.alloc(512);
        e: for (r = 0; r < a.size; r += 512) {
          for (let c = 0, p = 0; c < 512; c += p) {
            if (((p = We.readSync(s, o, c, o.length - c, r + c)), r === 0 && o[0] === 31 && o[1] === 139))
              throw new Error('cannot append to compressed archives');
            if (!p) break e;
          }
          let u = new mx(o);
          if (!u.cksumValid) break;
          let l = 512 * Math.ceil(u.size / 512);
          if (r + l + 512 > a.size) break;
          (r += l), t.mtimeCache && t.mtimeCache.set(u.path, u.mtime);
        }
        (n = !1), sT(t, i, r, s, e);
      } finally {
        if (n)
          try {
            We.closeSync(s);
          } catch {}
      }
    },
    sT = (t, e, i, n, s) => {
      let r = new dx.WriteStreamSync(t.file, { fd: n, start: i });
      e.pipe(r), aT(e, s);
    },
    rT = (t, e, i) => {
      e = Array.from(e);
      let n = new px(t),
        s = (a, o, u) => {
          let l = (h, m) => {
              h ? We.close(a, (b) => u(h)) : u(null, m);
            },
            c = 0;
          if (o === 0) return l(null, 0);
          let p = 0,
            d = Buffer.alloc(512),
            f = (h, m) => {
              if (h) return l(h);
              if (((p += m), p < 512 && m)) return We.read(a, d, p, d.length - p, c + p, f);
              if (c === 0 && d[0] === 31 && d[1] === 139) return l(new Error('cannot append to compressed archives'));
              if (p < 512) return l(null, c);
              let b = new mx(d);
              if (!b.cksumValid) return l(null, c);
              let v = 512 * Math.ceil(b.size / 512);
              if (c + v + 512 > o || ((c += v + 512), c >= o)) return l(null, c);
              t.mtimeCache && t.mtimeCache.set(b.path, b.mtime), (p = 0), We.read(a, d, 0, 512, c, f);
            };
          We.read(a, d, 0, 512, c, f);
        },
        r = new Promise((a, o) => {
          n.on('error', o);
          let u = 'r+',
            l = (c, p) => {
              if (c && c.code === 'ENOENT' && u === 'r+') return (u = 'w+'), We.open(t.file, u, l);
              if (c) return o(c);
              We.fstat(p, (d, f) => {
                if (d) return We.close(p, () => o(d));
                s(p, f.size, (h, m) => {
                  if (h) return o(h);
                  let b = new dx.WriteStream(t.file, { fd: p, start: m });
                  n.pipe(b), b.on('error', o), b.on('close', a), xx(n, e);
                });
              });
            };
          We.open(t.file, u, l);
        });
      return i ? r.then(i, i) : r;
    },
    aT = (t, e) => {
      e.forEach((i) => {
        i.charAt(0) === '@'
          ? hx({ file: fx.resolve(t.cwd, i.slice(1)), sync: !0, noResume: !0, onentry: (n) => t.add(n) })
          : t.add(i);
      }),
        t.end();
    },
    xx = (t, e) => {
      for (; e.length; ) {
        let i = e.shift();
        if (i.charAt(0) === '@')
          return hx({ file: fx.resolve(t.cwd, i.slice(1)), noResume: !0, onentry: (n) => t.add(n) }).then((n) =>
            xx(t, e)
          );
        t.add(i);
      }
      t.end();
    };
});
var bx = y((OA, yx) => {
  'use strict';
  var oT = vn(),
    cT = mu();
  yx.exports = (t, e, i) => {
    let n = oT(t);
    if (!n.file) throw new TypeError('file is required');
    if (n.gzip || n.brotli || n.file.endsWith('.br') || n.file.endsWith('.tbr'))
      throw new TypeError('cannot append to compressed archives');
    if (!e || !Array.isArray(e) || !e.length) throw new TypeError('no files or directories specified');
    return (e = Array.from(e)), lT(n), cT(n, e, i);
  };
  var lT = (t) => {
    let e = t.filter;
    t.mtimeCache || (t.mtimeCache = new Map()),
      (t.filter = e
        ? (i, n) => e(i, n) && !(t.mtimeCache.get(i) > n.mtime)
        : (i, n) => !(t.mtimeCache.get(i) > n.mtime));
  };
});
var Ex = y((CA, _x) => {
  'use strict';
  var { promisify: gx } = require('util'),
    gi = require('fs'),
    uT = (t) => {
      if (!t) t = { mode: 511, fs: gi };
      else if (typeof t == 'object') t = { mode: 511, fs: gi, ...t };
      else if (typeof t == 'number') t = { mode: t, fs: gi };
      else if (typeof t == 'string') t = { mode: parseInt(t, 8), fs: gi };
      else throw new TypeError('invalid options argument');
      return (
        (t.mkdir = t.mkdir || t.fs.mkdir || gi.mkdir),
        (t.mkdirAsync = gx(t.mkdir)),
        (t.stat = t.stat || t.fs.stat || gi.stat),
        (t.statAsync = gx(t.stat)),
        (t.statSync = t.statSync || t.fs.statSync || gi.statSync),
        (t.mkdirSync = t.mkdirSync || t.fs.mkdirSync || gi.mkdirSync),
        t
      );
    };
  _x.exports = uT;
});
var Sx = y((IA, wx) => {
  'use strict';
  var pT = process.env.__TESTING_MKDIRP_PLATFORM__ || process.platform,
    { resolve: dT, parse: hT } = require('path'),
    fT = (t) => {
      if (/\0/.test(t))
        throw Object.assign(new TypeError('path must be a string without null bytes'), {
          path: t,
          code: 'ERR_INVALID_ARG_VALUE',
        });
      if (((t = dT(t)), pT === 'win32')) {
        let e = /[*|"<>?:]/,
          { root: i } = hT(t);
        if (e.test(t.substr(i.length)))
          throw Object.assign(new Error('Illegal characters in path.'), { path: t, code: 'EINVAL' });
      }
      return t;
    };
  wx.exports = fT;
});
var Ix = y((NA, Cx) => {
  'use strict';
  var { dirname: Rx } = require('path'),
    Tx = (t, e, i = void 0) =>
      i === e
        ? Promise.resolve()
        : t.statAsync(e).then(
            (n) => (n.isDirectory() ? i : void 0),
            (n) => (n.code === 'ENOENT' ? Tx(t, Rx(e), e) : void 0)
          ),
    Ox = (t, e, i = void 0) => {
      if (i !== e)
        try {
          return t.statSync(e).isDirectory() ? i : void 0;
        } catch (n) {
          return n.code === 'ENOENT' ? Ox(t, Rx(e), e) : void 0;
        }
    };
  Cx.exports = { findMade: Tx, findMadeSync: Ox };
});
var yu = y((kA, kx) => {
  'use strict';
  var { dirname: Nx } = require('path'),
    xu = (t, e, i) => {
      e.recursive = !1;
      let n = Nx(t);
      return n === t
        ? e.mkdirAsync(t, e).catch((s) => {
            if (s.code !== 'EISDIR') throw s;
          })
        : e.mkdirAsync(t, e).then(
            () => i || t,
            (s) => {
              if (s.code === 'ENOENT') return xu(n, e).then((r) => xu(t, e, r));
              if (s.code !== 'EEXIST' && s.code !== 'EROFS') throw s;
              return e.statAsync(t).then(
                (r) => {
                  if (r.isDirectory()) return i;
                  throw s;
                },
                () => {
                  throw s;
                }
              );
            }
          );
    },
    vu = (t, e, i) => {
      let n = Nx(t);
      if (((e.recursive = !1), n === t))
        try {
          return e.mkdirSync(t, e);
        } catch (s) {
          if (s.code !== 'EISDIR') throw s;
          return;
        }
      try {
        return e.mkdirSync(t, e), i || t;
      } catch (s) {
        if (s.code === 'ENOENT') return vu(t, e, vu(n, e, i));
        if (s.code !== 'EEXIST' && s.code !== 'EROFS') throw s;
        try {
          if (!e.statSync(t).isDirectory()) throw s;
        } catch {
          throw s;
        }
      }
    };
  kx.exports = { mkdirpManual: xu, mkdirpManualSync: vu };
});
var Dx = y((LA, Ax) => {
  'use strict';
  var { dirname: Lx } = require('path'),
    { findMade: mT, findMadeSync: xT } = Ix(),
    { mkdirpManual: vT, mkdirpManualSync: yT } = yu(),
    bT = (t, e) => (
      (e.recursive = !0),
      Lx(t) === t
        ? e.mkdirAsync(t, e)
        : mT(e, t).then((n) =>
            e
              .mkdirAsync(t, e)
              .then(() => n)
              .catch((s) => {
                if (s.code === 'ENOENT') return vT(t, e);
                throw s;
              })
          )
    ),
    gT = (t, e) => {
      if (((e.recursive = !0), Lx(t) === t)) return e.mkdirSync(t, e);
      let n = xT(e, t);
      try {
        return e.mkdirSync(t, e), n;
      } catch (s) {
        if (s.code === 'ENOENT') return yT(t, e);
        throw s;
      }
    };
  Ax.exports = { mkdirpNative: bT, mkdirpNativeSync: gT };
});
var Bx = y((AA, Ux) => {
  'use strict';
  var Fx = require('fs'),
    _T = process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version,
    bu = _T.replace(/^v/, '').split('.'),
    Px = +bu[0] > 10 || (+bu[0] == 10 && +bu[1] >= 12),
    ET = Px ? (t) => t.mkdir === Fx.mkdir : () => !1,
    wT = Px ? (t) => t.mkdirSync === Fx.mkdirSync : () => !1;
  Ux.exports = { useNative: ET, useNativeSync: wT };
});
var Hx = y((DA, Gx) => {
  'use strict';
  var Un = Ex(),
    Bn = Sx(),
    { mkdirpNative: Mx, mkdirpNativeSync: qx } = Dx(),
    { mkdirpManual: jx, mkdirpManualSync: zx } = yu(),
    { useNative: ST, useNativeSync: RT } = Bx(),
    Mn = (t, e) => ((t = Bn(t)), (e = Un(e)), ST(e) ? Mx(t, e) : jx(t, e)),
    TT = (t, e) => ((t = Bn(t)), (e = Un(e)), RT(e) ? qx(t, e) : zx(t, e));
  Mn.sync = TT;
  Mn.native = (t, e) => Mx(Bn(t), Un(e));
  Mn.manual = (t, e) => jx(Bn(t), Un(e));
  Mn.nativeSync = (t, e) => qx(Bn(t), Un(e));
  Mn.manualSync = (t, e) => zx(Bn(t), Un(e));
  Gx.exports = Mn;
});
var Jx = y((FA, Yx) => {
  'use strict';
  var et = require('fs'),
    Vi = require('path'),
    OT = et.lchown ? 'lchown' : 'chown',
    CT = et.lchownSync ? 'lchownSync' : 'chownSync',
    Wx = et.lchown && !process.version.match(/v1[1-9]+\./) && !process.version.match(/v10\.[6-9]/),
    $x = (t, e, i) => {
      try {
        return et[CT](t, e, i);
      } catch (n) {
        if (n.code !== 'ENOENT') throw n;
      }
    },
    IT = (t, e, i) => {
      try {
        return et.chownSync(t, e, i);
      } catch (n) {
        if (n.code !== 'ENOENT') throw n;
      }
    },
    NT = Wx
      ? (t, e, i, n) => (s) => {
          !s || s.code !== 'EISDIR' ? n(s) : et.chown(t, e, i, n);
        }
      : (t, e, i, n) => n,
    gu = Wx
      ? (t, e, i) => {
          try {
            return $x(t, e, i);
          } catch (n) {
            if (n.code !== 'EISDIR') throw n;
            IT(t, e, i);
          }
        }
      : (t, e, i) => $x(t, e, i),
    kT = process.version,
    Vx = (t, e, i) => et.readdir(t, e, i),
    LT = (t, e) => et.readdirSync(t, e);
  /^v4\./.test(kT) && (Vx = (t, e, i) => et.readdir(t, i));
  var Ha = (t, e, i, n) => {
      et[OT](
        t,
        e,
        i,
        NT(t, e, i, (s) => {
          n(s && s.code !== 'ENOENT' ? s : null);
        })
      );
    },
    Kx = (t, e, i, n, s) => {
      if (typeof e == 'string')
        return et.lstat(Vi.resolve(t, e), (r, a) => {
          if (r) return s(r.code !== 'ENOENT' ? r : null);
          (a.name = e), Kx(t, a, i, n, s);
        });
      if (e.isDirectory())
        _u(Vi.resolve(t, e.name), i, n, (r) => {
          if (r) return s(r);
          let a = Vi.resolve(t, e.name);
          Ha(a, i, n, s);
        });
      else {
        let r = Vi.resolve(t, e.name);
        Ha(r, i, n, s);
      }
    },
    _u = (t, e, i, n) => {
      Vx(t, { withFileTypes: !0 }, (s, r) => {
        if (s) {
          if (s.code === 'ENOENT') return n();
          if (s.code !== 'ENOTDIR' && s.code !== 'ENOTSUP') return n(s);
        }
        if (s || !r.length) return Ha(t, e, i, n);
        let a = r.length,
          o = null,
          u = (l) => {
            if (!o) {
              if (l) return n((o = l));
              if (--a === 0) return Ha(t, e, i, n);
            }
          };
        r.forEach((l) => Kx(t, l, e, i, u));
      });
    },
    AT = (t, e, i, n) => {
      if (typeof e == 'string')
        try {
          let s = et.lstatSync(Vi.resolve(t, e));
          (s.name = e), (e = s);
        } catch (s) {
          if (s.code === 'ENOENT') return;
          throw s;
        }
      e.isDirectory() && Xx(Vi.resolve(t, e.name), i, n), gu(Vi.resolve(t, e.name), i, n);
    },
    Xx = (t, e, i) => {
      let n;
      try {
        n = LT(t, { withFileTypes: !0 });
      } catch (s) {
        if (s.code === 'ENOENT') return;
        if (s.code === 'ENOTDIR' || s.code === 'ENOTSUP') return gu(t, e, i);
        throw s;
      }
      return n && n.length && n.forEach((s) => AT(t, s, e, i)), gu(t, e, i);
    };
  Yx.exports = _u;
  _u.sync = Xx;
});
var tv = y((PA, Eu) => {
  'use strict';
  var Zx = Hx(),
    tt = require('fs'),
    $a = require('path'),
    Qx = Jx(),
    lt = En(),
    Wa = class extends Error {
      constructor(e, i) {
        super('Cannot extract through symbolic link'), (this.path = i), (this.symlink = e);
      }
      get name() {
        return 'SylinkError';
      }
    },
    Va = class extends Error {
      constructor(e, i) {
        super(i + ": Cannot cd into '" + e + "'"), (this.path = e), (this.code = i);
      }
      get name() {
        return 'CwdError';
      }
    },
    Ka = (t, e) => t.get(lt(e)),
    qs = (t, e, i) => t.set(lt(e), i),
    DT = (t, e) => {
      tt.stat(t, (i, n) => {
        (i || !n.isDirectory()) && (i = new Va(t, (i && i.code) || 'ENOTDIR')), e(i);
      });
    };
  Eu.exports = (t, e, i) => {
    t = lt(t);
    let n = e.umask,
      s = e.mode | 448,
      r = (s & n) !== 0,
      a = e.uid,
      o = e.gid,
      u = typeof a == 'number' && typeof o == 'number' && (a !== e.processUid || o !== e.processGid),
      l = e.preserve,
      c = e.unlink,
      p = e.cache,
      d = lt(e.cwd),
      f = (b, v) => {
        b ? i(b) : (qs(p, t, !0), v && u ? Qx(v, a, o, (E) => f(E)) : r ? tt.chmod(t, s, i) : i());
      };
    if (p && Ka(p, t) === !0) return f();
    if (t === d) return DT(t, f);
    if (l) return Zx(t, { mode: s }).then((b) => f(null, b), f);
    let m = lt($a.relative(d, t)).split('/');
    Xa(d, m, s, p, c, d, null, f);
  };
  var Xa = (t, e, i, n, s, r, a, o) => {
      if (!e.length) return o(null, a);
      let u = e.shift(),
        l = lt($a.resolve(t + '/' + u));
      if (Ka(n, l)) return Xa(l, e, i, n, s, r, a, o);
      tt.mkdir(l, i, ev(l, e, i, n, s, r, a, o));
    },
    ev = (t, e, i, n, s, r, a, o) => (u) => {
      u
        ? tt.lstat(t, (l, c) => {
            if (l) (l.path = l.path && lt(l.path)), o(l);
            else if (c.isDirectory()) Xa(t, e, i, n, s, r, a, o);
            else if (s)
              tt.unlink(t, (p) => {
                if (p) return o(p);
                tt.mkdir(t, i, ev(t, e, i, n, s, r, a, o));
              });
            else {
              if (c.isSymbolicLink()) return o(new Wa(t, t + '/' + e.join('/')));
              o(u);
            }
          })
        : ((a = a || t), Xa(t, e, i, n, s, r, a, o));
    },
    FT = (t) => {
      let e = !1,
        i = 'ENOTDIR';
      try {
        e = tt.statSync(t).isDirectory();
      } catch (n) {
        i = n.code;
      } finally {
        if (!e) throw new Va(t, i);
      }
    };
  Eu.exports.sync = (t, e) => {
    t = lt(t);
    let i = e.umask,
      n = e.mode | 448,
      s = (n & i) !== 0,
      r = e.uid,
      a = e.gid,
      o = typeof r == 'number' && typeof a == 'number' && (r !== e.processUid || a !== e.processGid),
      u = e.preserve,
      l = e.unlink,
      c = e.cache,
      p = lt(e.cwd),
      d = (b) => {
        qs(c, t, !0), b && o && Qx.sync(b, r, a), s && tt.chmodSync(t, n);
      };
    if (c && Ka(c, t) === !0) return d();
    if (t === p) return FT(p), d();
    if (u) return d(Zx.sync(t, n));
    let h = lt($a.relative(p, t)).split('/'),
      m = null;
    for (let b = h.shift(), v = p; b && (v += '/' + b); b = h.shift())
      if (((v = lt($a.resolve(v))), !Ka(c, v)))
        try {
          tt.mkdirSync(v, n), (m = m || v), qs(c, v, !0);
        } catch {
          let g = tt.lstatSync(v);
          if (g.isDirectory()) {
            qs(c, v, !0);
            continue;
          } else if (l) {
            tt.unlinkSync(v), tt.mkdirSync(v, n), (m = m || v), qs(c, v, !0);
            continue;
          } else if (g.isSymbolicLink()) return new Wa(v, v + '/' + h.join('/'));
        }
    return d(m);
  };
});
var Su = y((UA, iv) => {
  'use strict';
  var wu = Object.create(null),
    { hasOwnProperty: PT } = Object.prototype;
  iv.exports = (t) => (PT.call(wu, t) || (wu[t] = t.normalize('NFD')), wu[t]);
});
var av = y((BA, rv) => {
  'use strict';
  var nv = require('assert'),
    UT = Su(),
    BT = Rn(),
    { join: sv } = require('path'),
    MT = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform,
    qT = MT === 'win32';
  rv.exports = () => {
    let t = new Map(),
      e = new Map(),
      i = (l) =>
        l
          .split('/')
          .slice(0, -1)
          .reduce((p, d) => (p.length && (d = sv(p[p.length - 1], d)), p.push(d || '/'), p), []),
      n = new Set(),
      s = (l) => {
        let c = e.get(l);
        if (!c) throw new Error('function does not have any path reservations');
        return { paths: c.paths.map((p) => t.get(p)), dirs: [...c.dirs].map((p) => t.get(p)) };
      },
      r = (l) => {
        let { paths: c, dirs: p } = s(l);
        return c.every((d) => d[0] === l) && p.every((d) => d[0] instanceof Set && d[0].has(l));
      },
      a = (l) => (n.has(l) || !r(l) ? !1 : (n.add(l), l(() => o(l)), !0)),
      o = (l) => {
        if (!n.has(l)) return !1;
        let { paths: c, dirs: p } = e.get(l),
          d = new Set();
        return (
          c.forEach((f) => {
            let h = t.get(f);
            nv.equal(h[0], l),
              h.length === 1
                ? t.delete(f)
                : (h.shift(), typeof h[0] == 'function' ? d.add(h[0]) : h[0].forEach((m) => d.add(m)));
          }),
          p.forEach((f) => {
            let h = t.get(f);
            nv(h[0] instanceof Set),
              h[0].size === 1 && h.length === 1
                ? t.delete(f)
                : h[0].size === 1
                ? (h.shift(), d.add(h[0]))
                : h[0].delete(l);
          }),
          n.delete(l),
          d.forEach((f) => a(f)),
          !0
        );
      };
    return {
      check: r,
      reserve: (l, c) => {
        l = qT ? ['win32 parallelization disabled'] : l.map((d) => BT(sv(UT(d))).toLowerCase());
        let p = new Set(l.map((d) => i(d)).reduce((d, f) => d.concat(f)));
        return (
          e.set(c, { dirs: p, paths: l }),
          l.forEach((d) => {
            let f = t.get(d);
            f ? f.push(c) : t.set(d, [c]);
          }),
          p.forEach((d) => {
            let f = t.get(d);
            f
              ? f[f.length - 1] instanceof Set
                ? f[f.length - 1].add(c)
                : f.push(new Set([c]))
              : t.set(d, [new Set([c])]);
          }),
          a(c)
        );
      },
    };
  };
});
var lv = y((MA, cv) => {
  'use strict';
  var jT = process.env.__FAKE_PLATFORM__ || process.platform,
    zT = jT === 'win32',
    GT = global.__FAKE_TESTING_FS__ || require('fs'),
    { O_CREAT: HT, O_TRUNC: $T, O_WRONLY: WT, UV_FS_O_FILEMAP: ov = 0 } = GT.constants,
    VT = zT && !!ov,
    KT = 512 * 1024,
    XT = ov | $T | HT | WT;
  cv.exports = VT ? (t) => (t < KT ? XT : 'w') : () => 'w';
});
var Au = y((qA, wv) => {
  'use strict';
  var YT = require('assert'),
    JT = ja(),
    K = require('fs'),
    ZT = Fn(),
    $t = require('path'),
    gv = tv(),
    uv = Ol(),
    QT = av(),
    eO = Cl(),
    it = En(),
    tO = Rn(),
    iO = Su(),
    pv = Symbol('onEntry'),
    Ou = Symbol('checkFs'),
    dv = Symbol('checkFs2'),
    Za = Symbol('pruneCache'),
    Cu = Symbol('isReusable'),
    nt = Symbol('makeFs'),
    Iu = Symbol('file'),
    Nu = Symbol('directory'),
    Qa = Symbol('link'),
    hv = Symbol('symlink'),
    fv = Symbol('hardlink'),
    mv = Symbol('unsupported'),
    xv = Symbol('checkPath'),
    _i = Symbol('mkdir'),
    Ce = Symbol('onError'),
    Ya = Symbol('pending'),
    vv = Symbol('pend'),
    qn = Symbol('unpend'),
    Ru = Symbol('ended'),
    Tu = Symbol('maybeClose'),
    ku = Symbol('skip'),
    js = Symbol('doChown'),
    zs = Symbol('uid'),
    Gs = Symbol('gid'),
    Hs = Symbol('checkedCwd'),
    _v = require('crypto'),
    Ev = lv(),
    nO = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform,
    $s = nO === 'win32',
    sO = 1024,
    rO = (t, e) => {
      if (!$s) return K.unlink(t, e);
      let i = t + '.DELETE.' + _v.randomBytes(16).toString('hex');
      K.rename(t, i, (n) => {
        if (n) return e(n);
        K.unlink(i, e);
      });
    },
    aO = (t) => {
      if (!$s) return K.unlinkSync(t);
      let e = t + '.DELETE.' + _v.randomBytes(16).toString('hex');
      K.renameSync(t, e), K.unlinkSync(e);
    },
    yv = (t, e, i) => (t === t >>> 0 ? t : e === e >>> 0 ? e : i),
    bv = (t) => tO(it(iO(t))).toLowerCase(),
    oO = (t, e) => {
      e = bv(e);
      for (let i of t.keys()) {
        let n = bv(i);
        (n === e || n.indexOf(e + '/') === 0) && t.delete(i);
      }
    },
    cO = (t) => {
      for (let e of t.keys()) t.delete(e);
    },
    Ws = class extends JT {
      constructor(e) {
        if (
          (e || (e = {}),
          (e.ondone = (i) => {
            (this[Ru] = !0), this[Tu]();
          }),
          super(e),
          (this[Hs] = !1),
          (this.reservations = QT()),
          (this.transform = typeof e.transform == 'function' ? e.transform : null),
          (this.writable = !0),
          (this.readable = !1),
          (this[Ya] = 0),
          (this[Ru] = !1),
          (this.dirCache = e.dirCache || new Map()),
          typeof e.uid == 'number' || typeof e.gid == 'number')
        ) {
          if (typeof e.uid != 'number' || typeof e.gid != 'number')
            throw new TypeError('cannot set owner without number uid and gid');
          if (e.preserveOwner) throw new TypeError('cannot preserve owner in archive and also set owner explicitly');
          (this.uid = e.uid), (this.gid = e.gid), (this.setOwner = !0);
        } else (this.uid = null), (this.gid = null), (this.setOwner = !1);
        e.preserveOwner === void 0 && typeof e.uid != 'number'
          ? (this.preserveOwner = process.getuid && process.getuid() === 0)
          : (this.preserveOwner = !!e.preserveOwner),
          (this.processUid = (this.preserveOwner || this.setOwner) && process.getuid ? process.getuid() : null),
          (this.processGid = (this.preserveOwner || this.setOwner) && process.getgid ? process.getgid() : null),
          (this.maxDepth = typeof e.maxDepth == 'number' ? e.maxDepth : sO),
          (this.forceChown = e.forceChown === !0),
          (this.win32 = !!e.win32 || $s),
          (this.newer = !!e.newer),
          (this.keep = !!e.keep),
          (this.noMtime = !!e.noMtime),
          (this.preservePaths = !!e.preservePaths),
          (this.unlink = !!e.unlink),
          (this.cwd = it($t.resolve(e.cwd || process.cwd()))),
          (this.strip = +e.strip || 0),
          (this.processUmask = e.noChmod ? 0 : process.umask()),
          (this.umask = typeof e.umask == 'number' ? e.umask : this.processUmask),
          (this.dmode = e.dmode || 511 & ~this.umask),
          (this.fmode = e.fmode || 438 & ~this.umask),
          this.on('entry', (i) => this[pv](i));
      }
      warn(e, i, n = {}) {
        return (e === 'TAR_BAD_ARCHIVE' || e === 'TAR_ABORT') && (n.recoverable = !1), super.warn(e, i, n);
      }
      [Tu]() {
        this[Ru] && this[Ya] === 0 && (this.emit('prefinish'), this.emit('finish'), this.emit('end'));
      }
      [xv](e) {
        let i = it(e.path),
          n = i.split('/');
        if (this.strip) {
          if (n.length < this.strip) return !1;
          if (e.type === 'Link') {
            let s = it(e.linkpath).split('/');
            if (s.length >= this.strip) e.linkpath = s.slice(this.strip).join('/');
            else return !1;
          }
          n.splice(0, this.strip), (e.path = n.join('/'));
        }
        if (isFinite(this.maxDepth) && n.length > this.maxDepth)
          return (
            this.warn('TAR_ENTRY_ERROR', 'path excessively deep', {
              entry: e,
              path: i,
              depth: n.length,
              maxDepth: this.maxDepth,
            }),
            !1
          );
        if (!this.preservePaths) {
          if (n.includes('..') || ($s && /^[a-z]:\.\.$/i.test(n[0])))
            return this.warn('TAR_ENTRY_ERROR', "path contains '..'", { entry: e, path: i }), !1;
          let [s, r] = eO(i);
          s && ((e.path = r), this.warn('TAR_ENTRY_INFO', `stripping ${s} from absolute path`, { entry: e, path: i }));
        }
        if (
          ($t.isAbsolute(e.path)
            ? (e.absolute = it($t.resolve(e.path)))
            : (e.absolute = it($t.resolve(this.cwd, e.path))),
          !this.preservePaths && e.absolute.indexOf(this.cwd + '/') !== 0 && e.absolute !== this.cwd)
        )
          return (
            this.warn('TAR_ENTRY_ERROR', 'path escaped extraction target', {
              entry: e,
              path: it(e.path),
              resolvedPath: e.absolute,
              cwd: this.cwd,
            }),
            !1
          );
        if (e.absolute === this.cwd && e.type !== 'Directory' && e.type !== 'GNUDumpDir') return !1;
        if (this.win32) {
          let { root: s } = $t.win32.parse(e.absolute);
          e.absolute = s + uv.encode(e.absolute.slice(s.length));
          let { root: r } = $t.win32.parse(e.path);
          e.path = r + uv.encode(e.path.slice(r.length));
        }
        return !0;
      }
      [pv](e) {
        if (!this[xv](e)) return e.resume();
        switch ((YT.equal(typeof e.absolute, 'string'), e.type)) {
          case 'Directory':
          case 'GNUDumpDir':
            e.mode && (e.mode = e.mode | 448);
          case 'File':
          case 'OldFile':
          case 'ContiguousFile':
          case 'Link':
          case 'SymbolicLink':
            return this[Ou](e);
          case 'CharacterDevice':
          case 'BlockDevice':
          case 'FIFO':
          default:
            return this[mv](e);
        }
      }
      [Ce](e, i) {
        e.name === 'CwdError'
          ? this.emit('error', e)
          : (this.warn('TAR_ENTRY_ERROR', e, { entry: i }), this[qn](), i.resume());
      }
      [_i](e, i, n) {
        gv(
          it(e),
          {
            uid: this.uid,
            gid: this.gid,
            processUid: this.processUid,
            processGid: this.processGid,
            umask: this.processUmask,
            preserve: this.preservePaths,
            unlink: this.unlink,
            cache: this.dirCache,
            cwd: this.cwd,
            mode: i,
            noChmod: this.noChmod,
          },
          n
        );
      }
      [js](e) {
        return (
          this.forceChown ||
          (this.preserveOwner &&
            ((typeof e.uid == 'number' && e.uid !== this.processUid) ||
              (typeof e.gid == 'number' && e.gid !== this.processGid))) ||
          (typeof this.uid == 'number' && this.uid !== this.processUid) ||
          (typeof this.gid == 'number' && this.gid !== this.processGid)
        );
      }
      [zs](e) {
        return yv(this.uid, e.uid, this.processUid);
      }
      [Gs](e) {
        return yv(this.gid, e.gid, this.processGid);
      }
      [Iu](e, i) {
        let n = e.mode & 4095 || this.fmode,
          s = new ZT.WriteStream(e.absolute, { flags: Ev(e.size), mode: n, autoClose: !1 });
        s.on('error', (u) => {
          s.fd && K.close(s.fd, () => {}), (s.write = () => !0), this[Ce](u, e), i();
        });
        let r = 1,
          a = (u) => {
            if (u) {
              s.fd && K.close(s.fd, () => {}), this[Ce](u, e), i();
              return;
            }
            --r === 0 &&
              K.close(s.fd, (l) => {
                l ? this[Ce](l, e) : this[qn](), i();
              });
          };
        s.on('finish', (u) => {
          let l = e.absolute,
            c = s.fd;
          if (e.mtime && !this.noMtime) {
            r++;
            let p = e.atime || new Date(),
              d = e.mtime;
            K.futimes(c, p, d, (f) => (f ? K.utimes(l, p, d, (h) => a(h && f)) : a()));
          }
          if (this[js](e)) {
            r++;
            let p = this[zs](e),
              d = this[Gs](e);
            K.fchown(c, p, d, (f) => (f ? K.chown(l, p, d, (h) => a(h && f)) : a()));
          }
          a();
        });
        let o = (this.transform && this.transform(e)) || e;
        o !== e &&
          (o.on('error', (u) => {
            this[Ce](u, e), i();
          }),
          e.pipe(o)),
          o.pipe(s);
      }
      [Nu](e, i) {
        let n = e.mode & 4095 || this.dmode;
        this[_i](e.absolute, n, (s) => {
          if (s) {
            this[Ce](s, e), i();
            return;
          }
          let r = 1,
            a = (o) => {
              --r === 0 && (i(), this[qn](), e.resume());
            };
          e.mtime && !this.noMtime && (r++, K.utimes(e.absolute, e.atime || new Date(), e.mtime, a)),
            this[js](e) && (r++, K.chown(e.absolute, this[zs](e), this[Gs](e), a)),
            a();
        });
      }
      [mv](e) {
        (e.unsupported = !0),
          this.warn('TAR_ENTRY_UNSUPPORTED', `unsupported entry type: ${e.type}`, { entry: e }),
          e.resume();
      }
      [hv](e, i) {
        this[Qa](e, e.linkpath, 'symlink', i);
      }
      [fv](e, i) {
        let n = it($t.resolve(this.cwd, e.linkpath));
        this[Qa](e, n, 'link', i);
      }
      [vv]() {
        this[Ya]++;
      }
      [qn]() {
        this[Ya]--, this[Tu]();
      }
      [ku](e) {
        this[qn](), e.resume();
      }
      [Cu](e, i) {
        return e.type === 'File' && !this.unlink && i.isFile() && i.nlink <= 1 && !$s;
      }
      [Ou](e) {
        this[vv]();
        let i = [e.path];
        e.linkpath && i.push(e.linkpath), this.reservations.reserve(i, (n) => this[dv](e, n));
      }
      [Za](e) {
        e.type === 'SymbolicLink' ? cO(this.dirCache) : e.type !== 'Directory' && oO(this.dirCache, e.absolute);
      }
      [dv](e, i) {
        this[Za](e);
        let n = (o) => {
            this[Za](e), i(o);
          },
          s = () => {
            this[_i](this.cwd, this.dmode, (o) => {
              if (o) {
                this[Ce](o, e), n();
                return;
              }
              (this[Hs] = !0), r();
            });
          },
          r = () => {
            if (e.absolute !== this.cwd) {
              let o = it($t.dirname(e.absolute));
              if (o !== this.cwd)
                return this[_i](o, this.dmode, (u) => {
                  if (u) {
                    this[Ce](u, e), n();
                    return;
                  }
                  a();
                });
            }
            a();
          },
          a = () => {
            K.lstat(e.absolute, (o, u) => {
              if (u && (this.keep || (this.newer && u.mtime > e.mtime))) {
                this[ku](e), n();
                return;
              }
              if (o || this[Cu](e, u)) return this[nt](null, e, n);
              if (u.isDirectory()) {
                if (e.type === 'Directory') {
                  let l = !this.noChmod && e.mode && (u.mode & 4095) !== e.mode,
                    c = (p) => this[nt](p, e, n);
                  return l ? K.chmod(e.absolute, e.mode, c) : c();
                }
                if (e.absolute !== this.cwd) return K.rmdir(e.absolute, (l) => this[nt](l, e, n));
              }
              if (e.absolute === this.cwd) return this[nt](null, e, n);
              rO(e.absolute, (l) => this[nt](l, e, n));
            });
          };
        this[Hs] ? r() : s();
      }
      [nt](e, i, n) {
        if (e) {
          this[Ce](e, i), n();
          return;
        }
        switch (i.type) {
          case 'File':
          case 'OldFile':
          case 'ContiguousFile':
            return this[Iu](i, n);
          case 'Link':
            return this[fv](i, n);
          case 'SymbolicLink':
            return this[hv](i, n);
          case 'Directory':
          case 'GNUDumpDir':
            return this[Nu](i, n);
        }
      }
      [Qa](e, i, n, s) {
        K[n](i, e.absolute, (r) => {
          r ? this[Ce](r, e) : (this[qn](), e.resume()), s();
        });
      }
    },
    Ja = (t) => {
      try {
        return [null, t()];
      } catch (e) {
        return [e, null];
      }
    },
    Lu = class extends Ws {
      [nt](e, i) {
        return super[nt](e, i, () => {});
      }
      [Ou](e) {
        if ((this[Za](e), !this[Hs])) {
          let r = this[_i](this.cwd, this.dmode);
          if (r) return this[Ce](r, e);
          this[Hs] = !0;
        }
        if (e.absolute !== this.cwd) {
          let r = it($t.dirname(e.absolute));
          if (r !== this.cwd) {
            let a = this[_i](r, this.dmode);
            if (a) return this[Ce](a, e);
          }
        }
        let [i, n] = Ja(() => K.lstatSync(e.absolute));
        if (n && (this.keep || (this.newer && n.mtime > e.mtime))) return this[ku](e);
        if (i || this[Cu](e, n)) return this[nt](null, e);
        if (n.isDirectory()) {
          if (e.type === 'Directory') {
            let a = !this.noChmod && e.mode && (n.mode & 4095) !== e.mode,
              [o] = a
                ? Ja(() => {
                    K.chmodSync(e.absolute, e.mode);
                  })
                : [];
            return this[nt](o, e);
          }
          let [r] = Ja(() => K.rmdirSync(e.absolute));
          this[nt](r, e);
        }
        let [s] = e.absolute === this.cwd ? [] : Ja(() => aO(e.absolute));
        this[nt](s, e);
      }
      [Iu](e, i) {
        let n = e.mode & 4095 || this.fmode,
          s = (o) => {
            let u;
            try {
              K.closeSync(r);
            } catch (l) {
              u = l;
            }
            (o || u) && this[Ce](o || u, e), i();
          },
          r;
        try {
          r = K.openSync(e.absolute, Ev(e.size), n);
        } catch (o) {
          return s(o);
        }
        let a = (this.transform && this.transform(e)) || e;
        a !== e && (a.on('error', (o) => this[Ce](o, e)), e.pipe(a)),
          a.on('data', (o) => {
            try {
              K.writeSync(r, o, 0, o.length);
            } catch (u) {
              s(u);
            }
          }),
          a.on('end', (o) => {
            let u = null;
            if (e.mtime && !this.noMtime) {
              let l = e.atime || new Date(),
                c = e.mtime;
              try {
                K.futimesSync(r, l, c);
              } catch (p) {
                try {
                  K.utimesSync(e.absolute, l, c);
                } catch {
                  u = p;
                }
              }
            }
            if (this[js](e)) {
              let l = this[zs](e),
                c = this[Gs](e);
              try {
                K.fchownSync(r, l, c);
              } catch (p) {
                try {
                  K.chownSync(e.absolute, l, c);
                } catch {
                  u = u || p;
                }
              }
            }
            s(u);
          });
      }
      [Nu](e, i) {
        let n = e.mode & 4095 || this.dmode,
          s = this[_i](e.absolute, n);
        if (s) {
          this[Ce](s, e), i();
          return;
        }
        if (e.mtime && !this.noMtime)
          try {
            K.utimesSync(e.absolute, e.atime || new Date(), e.mtime);
          } catch {}
        if (this[js](e))
          try {
            K.chownSync(e.absolute, this[zs](e), this[Gs](e));
          } catch {}
        i(), e.resume();
      }
      [_i](e, i) {
        try {
          return gv.sync(it(e), {
            uid: this.uid,
            gid: this.gid,
            processUid: this.processUid,
            processGid: this.processGid,
            umask: this.processUmask,
            preserve: this.preservePaths,
            unlink: this.unlink,
            cache: this.dirCache,
            cwd: this.cwd,
            mode: i,
          });
        } catch (n) {
          return n;
        }
      }
      [Qa](e, i, n, s) {
        try {
          K[n + 'Sync'](i, e.absolute), s(), e.resume();
        } catch (r) {
          return this[Ce](r, e);
        }
      }
    };
  Ws.Sync = Lu;
  wv.exports = Ws;
});
var Cv = y((jA, Ov) => {
  'use strict';
  var lO = vn(),
    eo = Au(),
    Rv = require('fs'),
    Tv = Fn(),
    Sv = require('path'),
    Du = Rn();
  Ov.exports = (t, e, i) => {
    typeof t == 'function' ? ((i = t), (e = null), (t = {})) : Array.isArray(t) && ((e = t), (t = {})),
      typeof e == 'function' && ((i = e), (e = null)),
      e ? (e = Array.from(e)) : (e = []);
    let n = lO(t);
    if (n.sync && typeof i == 'function') throw new TypeError('callback not supported for sync tar functions');
    if (!n.file && typeof i == 'function') throw new TypeError('callback only supported with file option');
    return e.length && uO(n, e), n.file && n.sync ? pO(n) : n.file ? dO(n, i) : n.sync ? hO(n) : fO(n);
  };
  var uO = (t, e) => {
      let i = new Map(e.map((r) => [Du(r), !0])),
        n = t.filter,
        s = (r, a) => {
          let o = a || Sv.parse(r).root || '.',
            u = r === o ? !1 : i.has(r) ? i.get(r) : s(Sv.dirname(r), o);
          return i.set(r, u), u;
        };
      t.filter = n ? (r, a) => n(r, a) && s(Du(r)) : (r) => s(Du(r));
    },
    pO = (t) => {
      let e = new eo.Sync(t),
        i = t.file,
        n = Rv.statSync(i),
        s = t.maxReadSize || 16 * 1024 * 1024;
      new Tv.ReadStreamSync(i, { readSize: s, size: n.size }).pipe(e);
    },
    dO = (t, e) => {
      let i = new eo(t),
        n = t.maxReadSize || 16 * 1024 * 1024,
        s = t.file,
        r = new Promise((a, o) => {
          i.on('error', o),
            i.on('close', a),
            Rv.stat(s, (u, l) => {
              if (u) o(u);
              else {
                let c = new Tv.ReadStream(s, { readSize: n, size: l.size });
                c.on('error', o), c.pipe(i);
              }
            });
        });
      return e ? r.then(e, e) : r;
    },
    hO = (t) => new eo.Sync(t),
    fO = (t) => new eo(t);
});
var Iv = y((pe) => {
  'use strict';
  pe.c = pe.create = ux();
  pe.r = pe.replace = mu();
  pe.t = pe.list = za();
  pe.u = pe.update = bx();
  pe.x = pe.extract = Cv();
  pe.Pack = Ea();
  pe.Unpack = Au();
  pe.Parse = ja();
  pe.ReadEntry = ra();
  pe.WriteEntry = Bl();
  pe.Header = Sn();
  pe.Pax = oa();
  pe.types = gl();
});
var ye = y((Fu) => {
  'use strict';
  Fu.fromCallback = function (t) {
    return Object.defineProperty(
      function (...e) {
        if (typeof e[e.length - 1] == 'function') t.apply(this, e);
        else
          return new Promise((i, n) => {
            t.call(this, ...e, (s, r) => (s != null ? n(s) : i(r)));
          });
      },
      'name',
      { value: t.name }
    );
  };
  Fu.fromPromise = function (t) {
    return Object.defineProperty(
      function (...e) {
        let i = e[e.length - 1];
        if (typeof i != 'function') return t.apply(this, e);
        t.apply(this, e.slice(0, -1)).then((n) => i(null, n), i);
      },
      'name',
      { value: t.name }
    );
  };
});
var kv = y((HA, Nv) => {
  'use strict';
  var Ei = require('constants'),
    mO = process.cwd,
    to = null,
    xO = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function () {
    return to || (to = mO.call(process)), to;
  };
  try {
    process.cwd();
  } catch {}
  typeof process.chdir == 'function' &&
    ((Pu = process.chdir),
    (process.chdir = function (t) {
      (to = null), Pu.call(process, t);
    }),
    Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Pu));
  var Pu;
  Nv.exports = vO;
  function vO(t) {
    Ei.hasOwnProperty('O_SYMLINK') && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && e(t),
      t.lutimes || i(t),
      (t.chown = r(t.chown)),
      (t.fchown = r(t.fchown)),
      (t.lchown = r(t.lchown)),
      (t.chmod = n(t.chmod)),
      (t.fchmod = n(t.fchmod)),
      (t.lchmod = n(t.lchmod)),
      (t.chownSync = a(t.chownSync)),
      (t.fchownSync = a(t.fchownSync)),
      (t.lchownSync = a(t.lchownSync)),
      (t.chmodSync = s(t.chmodSync)),
      (t.fchmodSync = s(t.fchmodSync)),
      (t.lchmodSync = s(t.lchmodSync)),
      (t.stat = o(t.stat)),
      (t.fstat = o(t.fstat)),
      (t.lstat = o(t.lstat)),
      (t.statSync = u(t.statSync)),
      (t.fstatSync = u(t.fstatSync)),
      (t.lstatSync = u(t.lstatSync)),
      t.chmod &&
        !t.lchmod &&
        ((t.lchmod = function (c, p, d) {
          d && process.nextTick(d);
        }),
        (t.lchmodSync = function () {})),
      t.chown &&
        !t.lchown &&
        ((t.lchown = function (c, p, d, f) {
          f && process.nextTick(f);
        }),
        (t.lchownSync = function () {})),
      xO === 'win32' &&
        (t.rename =
          typeof t.rename != 'function'
            ? t.rename
            : (function (c) {
                function p(d, f, h) {
                  var m = Date.now(),
                    b = 0;
                  c(d, f, function v(E) {
                    if (
                      E &&
                      (E.code === 'EACCES' || E.code === 'EPERM' || E.code === 'EBUSY') &&
                      Date.now() - m < 6e4
                    ) {
                      setTimeout(function () {
                        t.stat(f, function (g, N) {
                          g && g.code === 'ENOENT' ? c(d, f, v) : h(E);
                        });
                      }, b),
                        b < 100 && (b += 10);
                      return;
                    }
                    h && h(E);
                  });
                }
                return Object.setPrototypeOf && Object.setPrototypeOf(p, c), p;
              })(t.rename)),
      (t.read =
        typeof t.read != 'function'
          ? t.read
          : (function (c) {
              function p(d, f, h, m, b, v) {
                var E;
                if (v && typeof v == 'function') {
                  var g = 0;
                  E = function (N, P, O) {
                    if (N && N.code === 'EAGAIN' && g < 10) return g++, c.call(t, d, f, h, m, b, E);
                    v.apply(this, arguments);
                  };
                }
                return c.call(t, d, f, h, m, b, E);
              }
              return Object.setPrototypeOf && Object.setPrototypeOf(p, c), p;
            })(t.read)),
      (t.readSync =
        typeof t.readSync != 'function'
          ? t.readSync
          : (function (c) {
              return function (p, d, f, h, m) {
                for (var b = 0; ; )
                  try {
                    return c.call(t, p, d, f, h, m);
                  } catch (v) {
                    if (v.code === 'EAGAIN' && b < 10) {
                      b++;
                      continue;
                    }
                    throw v;
                  }
              };
            })(t.readSync));
    function e(c) {
      (c.lchmod = function (p, d, f) {
        c.open(p, Ei.O_WRONLY | Ei.O_SYMLINK, d, function (h, m) {
          if (h) {
            f && f(h);
            return;
          }
          c.fchmod(m, d, function (b) {
            c.close(m, function (v) {
              f && f(b || v);
            });
          });
        });
      }),
        (c.lchmodSync = function (p, d) {
          var f = c.openSync(p, Ei.O_WRONLY | Ei.O_SYMLINK, d),
            h = !0,
            m;
          try {
            (m = c.fchmodSync(f, d)), (h = !1);
          } finally {
            if (h)
              try {
                c.closeSync(f);
              } catch {}
            else c.closeSync(f);
          }
          return m;
        });
    }
    function i(c) {
      Ei.hasOwnProperty('O_SYMLINK') && c.futimes
        ? ((c.lutimes = function (p, d, f, h) {
            c.open(p, Ei.O_SYMLINK, function (m, b) {
              if (m) {
                h && h(m);
                return;
              }
              c.futimes(b, d, f, function (v) {
                c.close(b, function (E) {
                  h && h(v || E);
                });
              });
            });
          }),
          (c.lutimesSync = function (p, d, f) {
            var h = c.openSync(p, Ei.O_SYMLINK),
              m,
              b = !0;
            try {
              (m = c.futimesSync(h, d, f)), (b = !1);
            } finally {
              if (b)
                try {
                  c.closeSync(h);
                } catch {}
              else c.closeSync(h);
            }
            return m;
          }))
        : c.futimes &&
          ((c.lutimes = function (p, d, f, h) {
            h && process.nextTick(h);
          }),
          (c.lutimesSync = function () {}));
    }
    function n(c) {
      return (
        c &&
        function (p, d, f) {
          return c.call(t, p, d, function (h) {
            l(h) && (h = null), f && f.apply(this, arguments);
          });
        }
      );
    }
    function s(c) {
      return (
        c &&
        function (p, d) {
          try {
            return c.call(t, p, d);
          } catch (f) {
            if (!l(f)) throw f;
          }
        }
      );
    }
    function r(c) {
      return (
        c &&
        function (p, d, f, h) {
          return c.call(t, p, d, f, function (m) {
            l(m) && (m = null), h && h.apply(this, arguments);
          });
        }
      );
    }
    function a(c) {
      return (
        c &&
        function (p, d, f) {
          try {
            return c.call(t, p, d, f);
          } catch (h) {
            if (!l(h)) throw h;
          }
        }
      );
    }
    function o(c) {
      return (
        c &&
        function (p, d, f) {
          typeof d == 'function' && ((f = d), (d = null));
          function h(m, b) {
            b && (b.uid < 0 && (b.uid += 4294967296), b.gid < 0 && (b.gid += 4294967296)),
              f && f.apply(this, arguments);
          }
          return d ? c.call(t, p, d, h) : c.call(t, p, h);
        }
      );
    }
    function u(c) {
      return (
        c &&
        function (p, d) {
          var f = d ? c.call(t, p, d) : c.call(t, p);
          return f && (f.uid < 0 && (f.uid += 4294967296), f.gid < 0 && (f.gid += 4294967296)), f;
        }
      );
    }
    function l(c) {
      if (!c || c.code === 'ENOSYS') return !0;
      var p = !process.getuid || process.getuid() !== 0;
      return !!(p && (c.code === 'EINVAL' || c.code === 'EPERM'));
    }
  }
});
var Dv = y(($A, Av) => {
  'use strict';
  var Lv = require('stream').Stream;
  Av.exports = yO;
  function yO(t) {
    return { ReadStream: e, WriteStream: i };
    function e(n, s) {
      if (!(this instanceof e)) return new e(n, s);
      Lv.call(this);
      var r = this;
      (this.path = n),
        (this.fd = null),
        (this.readable = !0),
        (this.paused = !1),
        (this.flags = 'r'),
        (this.mode = 438),
        (this.bufferSize = 64 * 1024),
        (s = s || {});
      for (var a = Object.keys(s), o = 0, u = a.length; o < u; o++) {
        var l = a[o];
        this[l] = s[l];
      }
      if ((this.encoding && this.setEncoding(this.encoding), this.start !== void 0)) {
        if (typeof this.start != 'number') throw TypeError('start must be a Number');
        if (this.end === void 0) this.end = 1 / 0;
        else if (typeof this.end != 'number') throw TypeError('end must be a Number');
        if (this.start > this.end) throw new Error('start must be <= end');
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function () {
          r._read();
        });
        return;
      }
      t.open(this.path, this.flags, this.mode, function (c, p) {
        if (c) {
          r.emit('error', c), (r.readable = !1);
          return;
        }
        (r.fd = p), r.emit('open', p), r._read();
      });
    }
    function i(n, s) {
      if (!(this instanceof i)) return new i(n, s);
      Lv.call(this),
        (this.path = n),
        (this.fd = null),
        (this.writable = !0),
        (this.flags = 'w'),
        (this.encoding = 'binary'),
        (this.mode = 438),
        (this.bytesWritten = 0),
        (s = s || {});
      for (var r = Object.keys(s), a = 0, o = r.length; a < o; a++) {
        var u = r[a];
        this[u] = s[u];
      }
      if (this.start !== void 0) {
        if (typeof this.start != 'number') throw TypeError('start must be a Number');
        if (this.start < 0) throw new Error('start must be >= zero');
        this.pos = this.start;
      }
      (this.busy = !1),
        (this._queue = []),
        this.fd === null &&
          ((this._open = t.open),
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]),
          this.flush());
    }
  }
});
var Pv = y((WA, Fv) => {
  'use strict';
  Fv.exports = gO;
  var bO =
    Object.getPrototypeOf ||
    function (t) {
      return t.__proto__;
    };
  function gO(t) {
    if (t === null || typeof t != 'object') return t;
    if (t instanceof Object) var e = { __proto__: bO(t) };
    else var e = Object.create(null);
    return (
      Object.getOwnPropertyNames(t).forEach(function (i) {
        Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(t, i));
      }),
      e
    );
  }
});
var zn = y((VA, Mu) => {
  'use strict';
  var ee = require('fs'),
    _O = kv(),
    EO = Dv(),
    wO = Pv(),
    io = require('util'),
    Ee,
    so;
  typeof Symbol == 'function' && typeof Symbol.for == 'function'
    ? ((Ee = Symbol.for('graceful-fs.queue')), (so = Symbol.for('graceful-fs.previous')))
    : ((Ee = '___graceful-fs.queue'), (so = '___graceful-fs.previous'));
  function SO() {}
  function Mv(t, e) {
    Object.defineProperty(t, Ee, {
      get: function () {
        return e;
      },
    });
  }
  var Ki = SO;
  io.debuglog
    ? (Ki = io.debuglog('gfs4'))
    : /\bgfs4\b/i.test(process.env.NODE_DEBUG || '') &&
      (Ki = function () {
        var t = io.format.apply(io, arguments);
        (t =
          'GFS4: ' +
          t.split(/\n/).join(`
GFS4: `)),
          console.error(t);
      });
  ee[Ee] ||
    ((Uv = global[Ee] || []),
    Mv(ee, Uv),
    (ee.close = (function (t) {
      function e(i, n) {
        return t.call(ee, i, function (s) {
          s || Bv(), typeof n == 'function' && n.apply(this, arguments);
        });
      }
      return Object.defineProperty(e, so, { value: t }), e;
    })(ee.close)),
    (ee.closeSync = (function (t) {
      function e(i) {
        t.apply(ee, arguments), Bv();
      }
      return Object.defineProperty(e, so, { value: t }), e;
    })(ee.closeSync)),
    /\bgfs4\b/i.test(process.env.NODE_DEBUG || '') &&
      process.on('exit', function () {
        Ki(ee[Ee]), require('assert').equal(ee[Ee].length, 0);
      }));
  var Uv;
  global[Ee] || Mv(global, ee[Ee]);
  Mu.exports = Uu(wO(ee));
  process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !ee.__patched && ((Mu.exports = Uu(ee)), (ee.__patched = !0));
  function Uu(t) {
    _O(t), (t.gracefulify = Uu), (t.createReadStream = P), (t.createWriteStream = O);
    var e = t.readFile;
    t.readFile = i;
    function i(R, k, A) {
      return typeof k == 'function' && ((A = k), (k = null)), q(R, k, A);
      function q(j, F, z, G) {
        return e(j, F, function (w) {
          w && (w.code === 'EMFILE' || w.code === 'ENFILE')
            ? jn([q, [j, F, z], w, G || Date.now(), Date.now()])
            : typeof z == 'function' && z.apply(this, arguments);
        });
      }
    }
    var n = t.writeFile;
    t.writeFile = s;
    function s(R, k, A, q) {
      return typeof A == 'function' && ((q = A), (A = null)), j(R, k, A, q);
      function j(F, z, G, w, S) {
        return n(F, z, G, function (L) {
          L && (L.code === 'EMFILE' || L.code === 'ENFILE')
            ? jn([j, [F, z, G, w], L, S || Date.now(), Date.now()])
            : typeof w == 'function' && w.apply(this, arguments);
        });
      }
    }
    var r = t.appendFile;
    r && (t.appendFile = a);
    function a(R, k, A, q) {
      return typeof A == 'function' && ((q = A), (A = null)), j(R, k, A, q);
      function j(F, z, G, w, S) {
        return r(F, z, G, function (L) {
          L && (L.code === 'EMFILE' || L.code === 'ENFILE')
            ? jn([j, [F, z, G, w], L, S || Date.now(), Date.now()])
            : typeof w == 'function' && w.apply(this, arguments);
        });
      }
    }
    var o = t.copyFile;
    o && (t.copyFile = u);
    function u(R, k, A, q) {
      return typeof A == 'function' && ((q = A), (A = 0)), j(R, k, A, q);
      function j(F, z, G, w, S) {
        return o(F, z, G, function (L) {
          L && (L.code === 'EMFILE' || L.code === 'ENFILE')
            ? jn([j, [F, z, G, w], L, S || Date.now(), Date.now()])
            : typeof w == 'function' && w.apply(this, arguments);
        });
      }
    }
    var l = t.readdir;
    t.readdir = p;
    var c = /^v[0-5]\./;
    function p(R, k, A) {
      typeof k == 'function' && ((A = k), (k = null));
      var q = c.test(process.version)
        ? function (z, G, w, S) {
            return l(z, j(z, G, w, S));
          }
        : function (z, G, w, S) {
            return l(z, G, j(z, G, w, S));
          };
      return q(R, k, A);
      function j(F, z, G, w) {
        return function (S, L) {
          S && (S.code === 'EMFILE' || S.code === 'ENFILE')
            ? jn([q, [F, z, G], S, w || Date.now(), Date.now()])
            : (L && L.sort && L.sort(), typeof G == 'function' && G.call(this, S, L));
        };
      }
    }
    if (process.version.substr(0, 4) === 'v0.8') {
      var d = EO(t);
      (v = d.ReadStream), (g = d.WriteStream);
    }
    var f = t.ReadStream;
    f && ((v.prototype = Object.create(f.prototype)), (v.prototype.open = E));
    var h = t.WriteStream;
    h && ((g.prototype = Object.create(h.prototype)), (g.prototype.open = N)),
      Object.defineProperty(t, 'ReadStream', {
        get: function () {
          return v;
        },
        set: function (R) {
          v = R;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(t, 'WriteStream', {
        get: function () {
          return g;
        },
        set: function (R) {
          g = R;
        },
        enumerable: !0,
        configurable: !0,
      });
    var m = v;
    Object.defineProperty(t, 'FileReadStream', {
      get: function () {
        return m;
      },
      set: function (R) {
        m = R;
      },
      enumerable: !0,
      configurable: !0,
    });
    var b = g;
    Object.defineProperty(t, 'FileWriteStream', {
      get: function () {
        return b;
      },
      set: function (R) {
        b = R;
      },
      enumerable: !0,
      configurable: !0,
    });
    function v(R, k) {
      return this instanceof v ? (f.apply(this, arguments), this) : v.apply(Object.create(v.prototype), arguments);
    }
    function E() {
      var R = this;
      U(R.path, R.flags, R.mode, function (k, A) {
        k ? (R.autoClose && R.destroy(), R.emit('error', k)) : ((R.fd = A), R.emit('open', A), R.read());
      });
    }
    function g(R, k) {
      return this instanceof g ? (h.apply(this, arguments), this) : g.apply(Object.create(g.prototype), arguments);
    }
    function N() {
      var R = this;
      U(R.path, R.flags, R.mode, function (k, A) {
        k ? (R.destroy(), R.emit('error', k)) : ((R.fd = A), R.emit('open', A));
      });
    }
    function P(R, k) {
      return new t.ReadStream(R, k);
    }
    function O(R, k) {
      return new t.WriteStream(R, k);
    }
    var W = t.open;
    t.open = U;
    function U(R, k, A, q) {
      return typeof A == 'function' && ((q = A), (A = null)), j(R, k, A, q);
      function j(F, z, G, w, S) {
        return W(F, z, G, function (L, ie) {
          L && (L.code === 'EMFILE' || L.code === 'ENFILE')
            ? jn([j, [F, z, G, w], L, S || Date.now(), Date.now()])
            : typeof w == 'function' && w.apply(this, arguments);
        });
      }
    }
    return t;
  }
  function jn(t) {
    Ki('ENQUEUE', t[0].name, t[1]), ee[Ee].push(t), Bu();
  }
  var no;
  function Bv() {
    for (var t = Date.now(), e = 0; e < ee[Ee].length; ++e)
      ee[Ee][e].length > 2 && ((ee[Ee][e][3] = t), (ee[Ee][e][4] = t));
    Bu();
  }
  function Bu() {
    if ((clearTimeout(no), (no = void 0), ee[Ee].length !== 0)) {
      var t = ee[Ee].shift(),
        e = t[0],
        i = t[1],
        n = t[2],
        s = t[3],
        r = t[4];
      if (s === void 0) Ki('RETRY', e.name, i), e.apply(null, i);
      else if (Date.now() - s >= 6e4) {
        Ki('TIMEOUT', e.name, i);
        var a = i.pop();
        typeof a == 'function' && a.call(null, n);
      } else {
        var o = Date.now() - r,
          u = Math.max(r - s, 1),
          l = Math.min(u * 1.2, 100);
        o >= l ? (Ki('RETRY', e.name, i), e.apply(null, i.concat([s]))) : ee[Ee].push(t);
      }
      no === void 0 && (no = setTimeout(Bu, 0));
    }
  }
});
var Le = y((Wt) => {
  'use strict';
  var qv = ye().fromCallback,
    ke = zn(),
    RO = [
      'access',
      'appendFile',
      'chmod',
      'chown',
      'close',
      'copyFile',
      'fchmod',
      'fchown',
      'fdatasync',
      'fstat',
      'fsync',
      'ftruncate',
      'futimes',
      'lchmod',
      'lchown',
      'link',
      'lstat',
      'mkdir',
      'mkdtemp',
      'open',
      'opendir',
      'readdir',
      'readFile',
      'readlink',
      'realpath',
      'rename',
      'rm',
      'rmdir',
      'stat',
      'symlink',
      'truncate',
      'unlink',
      'utimes',
      'writeFile',
    ].filter((t) => typeof ke[t] == 'function');
  Object.assign(Wt, ke);
  RO.forEach((t) => {
    Wt[t] = qv(ke[t]);
  });
  Wt.exists = function (t, e) {
    return typeof e == 'function' ? ke.exists(t, e) : new Promise((i) => ke.exists(t, i));
  };
  Wt.read = function (t, e, i, n, s, r) {
    return typeof r == 'function'
      ? ke.read(t, e, i, n, s, r)
      : new Promise((a, o) => {
          ke.read(t, e, i, n, s, (u, l, c) => {
            if (u) return o(u);
            a({ bytesRead: l, buffer: c });
          });
        });
  };
  Wt.write = function (t, e, ...i) {
    return typeof i[i.length - 1] == 'function'
      ? ke.write(t, e, ...i)
      : new Promise((n, s) => {
          ke.write(t, e, ...i, (r, a, o) => {
            if (r) return s(r);
            n({ bytesWritten: a, buffer: o });
          });
        });
  };
  Wt.readv = function (t, e, ...i) {
    return typeof i[i.length - 1] == 'function'
      ? ke.readv(t, e, ...i)
      : new Promise((n, s) => {
          ke.readv(t, e, ...i, (r, a, o) => {
            if (r) return s(r);
            n({ bytesRead: a, buffers: o });
          });
        });
  };
  Wt.writev = function (t, e, ...i) {
    return typeof i[i.length - 1] == 'function'
      ? ke.writev(t, e, ...i)
      : new Promise((n, s) => {
          ke.writev(t, e, ...i, (r, a, o) => {
            if (r) return s(r);
            n({ bytesWritten: a, buffers: o });
          });
        });
  };
  typeof ke.realpath.native == 'function'
    ? (Wt.realpath.native = qv(ke.realpath.native))
    : process.emitWarning(
        'fs.realpath.native is not a function. Is fs being monkey-patched?',
        'Warning',
        'fs-extra-WARN0003'
      );
});
var zv = y((XA, jv) => {
  'use strict';
  var TO = require('path');
  jv.exports.checkPath = function (e) {
    if (process.platform === 'win32' && /[<>:"|?*]/.test(e.replace(TO.parse(e).root, ''))) {
      let n = new Error(`Path contains invalid characters: ${e}`);
      throw ((n.code = 'EINVAL'), n);
    }
  };
});
var Wv = y((YA, qu) => {
  'use strict';
  var Gv = Le(),
    { checkPath: Hv } = zv(),
    $v = (t) => {
      let e = { mode: 511 };
      return typeof t == 'number' ? t : { ...e, ...t }.mode;
    };
  qu.exports.makeDir = async (t, e) => (Hv(t), Gv.mkdir(t, { mode: $v(e), recursive: !0 }));
  qu.exports.makeDirSync = (t, e) => (Hv(t), Gv.mkdirSync(t, { mode: $v(e), recursive: !0 }));
});
var ut = y((JA, Vv) => {
  'use strict';
  var OO = ye().fromPromise,
    { makeDir: CO, makeDirSync: ju } = Wv(),
    zu = OO(CO);
  Vv.exports = { mkdirs: zu, mkdirsSync: ju, mkdirp: zu, mkdirpSync: ju, ensureDir: zu, ensureDirSync: ju };
});
var wi = y((ZA, Xv) => {
  'use strict';
  var IO = ye().fromPromise,
    Kv = Le();
  function NO(t) {
    return Kv.access(t)
      .then(() => !0)
      .catch(() => !1);
  }
  Xv.exports = { pathExists: IO(NO), pathExistsSync: Kv.existsSync };
});
var Gu = y((QA, Yv) => {
  'use strict';
  var Gn = Le(),
    kO = ye().fromPromise;
  async function LO(t, e, i) {
    let n = await Gn.open(t, 'r+'),
      s = null;
    try {
      await Gn.futimes(n, e, i);
    } finally {
      try {
        await Gn.close(n);
      } catch (r) {
        s = r;
      }
    }
    if (s) throw s;
  }
  function AO(t, e, i) {
    let n = Gn.openSync(t, 'r+');
    return Gn.futimesSync(n, e, i), Gn.closeSync(n);
  }
  Yv.exports = { utimesMillis: kO(LO), utimesMillisSync: AO };
});
var Xi = y((eD, ey) => {
  'use strict';
  var Hn = Le(),
    be = require('path'),
    Jv = ye().fromPromise;
  function DO(t, e, i) {
    let n = i.dereference ? (s) => Hn.stat(s, { bigint: !0 }) : (s) => Hn.lstat(s, { bigint: !0 });
    return Promise.all([
      n(t),
      n(e).catch((s) => {
        if (s.code === 'ENOENT') return null;
        throw s;
      }),
    ]).then(([s, r]) => ({ srcStat: s, destStat: r }));
  }
  function FO(t, e, i) {
    let n,
      s = i.dereference ? (a) => Hn.statSync(a, { bigint: !0 }) : (a) => Hn.lstatSync(a, { bigint: !0 }),
      r = s(t);
    try {
      n = s(e);
    } catch (a) {
      if (a.code === 'ENOENT') return { srcStat: r, destStat: null };
      throw a;
    }
    return { srcStat: r, destStat: n };
  }
  async function PO(t, e, i, n) {
    let { srcStat: s, destStat: r } = await DO(t, e, n);
    if (r) {
      if (Vs(s, r)) {
        let a = be.basename(t),
          o = be.basename(e);
        if (i === 'move' && a !== o && a.toLowerCase() === o.toLowerCase())
          return { srcStat: s, destStat: r, isChangingCase: !0 };
        throw new Error('Source and destination must not be the same.');
      }
      if (s.isDirectory() && !r.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${e}' with directory '${t}'.`);
      if (!s.isDirectory() && r.isDirectory())
        throw new Error(`Cannot overwrite directory '${e}' with non-directory '${t}'.`);
    }
    if (s.isDirectory() && Hu(t, e)) throw new Error(ro(t, e, i));
    return { srcStat: s, destStat: r };
  }
  function UO(t, e, i, n) {
    let { srcStat: s, destStat: r } = FO(t, e, n);
    if (r) {
      if (Vs(s, r)) {
        let a = be.basename(t),
          o = be.basename(e);
        if (i === 'move' && a !== o && a.toLowerCase() === o.toLowerCase())
          return { srcStat: s, destStat: r, isChangingCase: !0 };
        throw new Error('Source and destination must not be the same.');
      }
      if (s.isDirectory() && !r.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${e}' with directory '${t}'.`);
      if (!s.isDirectory() && r.isDirectory())
        throw new Error(`Cannot overwrite directory '${e}' with non-directory '${t}'.`);
    }
    if (s.isDirectory() && Hu(t, e)) throw new Error(ro(t, e, i));
    return { srcStat: s, destStat: r };
  }
  async function Zv(t, e, i, n) {
    let s = be.resolve(be.dirname(t)),
      r = be.resolve(be.dirname(i));
    if (r === s || r === be.parse(r).root) return;
    let a;
    try {
      a = await Hn.stat(r, { bigint: !0 });
    } catch (o) {
      if (o.code === 'ENOENT') return;
      throw o;
    }
    if (Vs(e, a)) throw new Error(ro(t, i, n));
    return Zv(t, e, r, n);
  }
  function Qv(t, e, i, n) {
    let s = be.resolve(be.dirname(t)),
      r = be.resolve(be.dirname(i));
    if (r === s || r === be.parse(r).root) return;
    let a;
    try {
      a = Hn.statSync(r, { bigint: !0 });
    } catch (o) {
      if (o.code === 'ENOENT') return;
      throw o;
    }
    if (Vs(e, a)) throw new Error(ro(t, i, n));
    return Qv(t, e, r, n);
  }
  function Vs(t, e) {
    return e.ino && e.dev && e.ino === t.ino && e.dev === t.dev;
  }
  function Hu(t, e) {
    let i = be
        .resolve(t)
        .split(be.sep)
        .filter((s) => s),
      n = be
        .resolve(e)
        .split(be.sep)
        .filter((s) => s);
    return i.every((s, r) => n[r] === s);
  }
  function ro(t, e, i) {
    return `Cannot ${i} '${t}' to a subdirectory of itself, '${e}'.`;
  }
  ey.exports = {
    checkPaths: Jv(PO),
    checkPathsSync: UO,
    checkParentPaths: Jv(Zv),
    checkParentPathsSync: Qv,
    isSrcSubdir: Hu,
    areIdentical: Vs,
  };
});
var ry = y((tD, sy) => {
  'use strict';
  var Ie = Le(),
    Ks = require('path'),
    { mkdirs: BO } = ut(),
    { pathExists: MO } = wi(),
    { utimesMillis: qO } = Gu(),
    Xs = Xi();
  async function jO(t, e, i = {}) {
    typeof i == 'function' && (i = { filter: i }),
      (i.clobber = 'clobber' in i ? !!i.clobber : !0),
      (i.overwrite = 'overwrite' in i ? !!i.overwrite : i.clobber),
      i.preserveTimestamps &&
        process.arch === 'ia32' &&
        process.emitWarning(
          `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
          'Warning',
          'fs-extra-WARN0001'
        );
    let { srcStat: n, destStat: s } = await Xs.checkPaths(t, e, 'copy', i);
    if ((await Xs.checkParentPaths(t, n, e, 'copy'), !(await iy(t, e, i)))) return;
    let a = Ks.dirname(e);
    (await MO(a)) || (await BO(a)), await ny(s, t, e, i);
  }
  async function iy(t, e, i) {
    return i.filter ? i.filter(t, e) : !0;
  }
  async function ny(t, e, i, n) {
    let r = await (n.dereference ? Ie.stat : Ie.lstat)(e);
    if (r.isDirectory()) return $O(r, t, e, i, n);
    if (r.isFile() || r.isCharacterDevice() || r.isBlockDevice()) return zO(r, t, e, i, n);
    if (r.isSymbolicLink()) return WO(t, e, i, n);
    throw r.isSocket()
      ? new Error(`Cannot copy a socket file: ${e}`)
      : r.isFIFO()
      ? new Error(`Cannot copy a FIFO pipe: ${e}`)
      : new Error(`Unknown file: ${e}`);
  }
  async function zO(t, e, i, n, s) {
    if (!e) return ty(t, i, n, s);
    if (s.overwrite) return await Ie.unlink(n), ty(t, i, n, s);
    if (s.errorOnExist) throw new Error(`'${n}' already exists`);
  }
  async function ty(t, e, i, n) {
    if ((await Ie.copyFile(e, i), n.preserveTimestamps)) {
      GO(t.mode) && (await HO(i, t.mode));
      let s = await Ie.stat(e);
      await qO(i, s.atime, s.mtime);
    }
    return Ie.chmod(i, t.mode);
  }
  function GO(t) {
    return (t & 128) === 0;
  }
  function HO(t, e) {
    return Ie.chmod(t, e | 128);
  }
  async function $O(t, e, i, n, s) {
    e || (await Ie.mkdir(n));
    let r = await Ie.readdir(i);
    await Promise.all(
      r.map(async (a) => {
        let o = Ks.join(i, a),
          u = Ks.join(n, a);
        if (!(await iy(o, u, s))) return;
        let { destStat: c } = await Xs.checkPaths(o, u, 'copy', s);
        return ny(c, o, u, s);
      })
    ),
      e || (await Ie.chmod(n, t.mode));
  }
  async function WO(t, e, i, n) {
    let s = await Ie.readlink(e);
    if ((n.dereference && (s = Ks.resolve(process.cwd(), s)), !t)) return Ie.symlink(s, i);
    let r = null;
    try {
      r = await Ie.readlink(i);
    } catch (a) {
      if (a.code === 'EINVAL' || a.code === 'UNKNOWN') return Ie.symlink(s, i);
      throw a;
    }
    if ((n.dereference && (r = Ks.resolve(process.cwd(), r)), Xs.isSrcSubdir(s, r)))
      throw new Error(`Cannot copy '${s}' to a subdirectory of itself, '${r}'.`);
    if (Xs.isSrcSubdir(r, s)) throw new Error(`Cannot overwrite '${r}' with '${s}'.`);
    return await Ie.unlink(i), Ie.symlink(s, i);
  }
  sy.exports = jO;
});
var uy = y((iD, ly) => {
  'use strict';
  var Ae = zn(),
    Ys = require('path'),
    VO = ut().mkdirsSync,
    KO = Gu().utimesMillisSync,
    Js = Xi();
  function XO(t, e, i) {
    typeof i == 'function' && (i = { filter: i }),
      (i = i || {}),
      (i.clobber = 'clobber' in i ? !!i.clobber : !0),
      (i.overwrite = 'overwrite' in i ? !!i.overwrite : i.clobber),
      i.preserveTimestamps &&
        process.arch === 'ia32' &&
        process.emitWarning(
          `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
          'Warning',
          'fs-extra-WARN0002'
        );
    let { srcStat: n, destStat: s } = Js.checkPathsSync(t, e, 'copy', i);
    if ((Js.checkParentPathsSync(t, n, e, 'copy'), i.filter && !i.filter(t, e))) return;
    let r = Ys.dirname(e);
    return Ae.existsSync(r) || VO(r), ay(s, t, e, i);
  }
  function ay(t, e, i, n) {
    let r = (n.dereference ? Ae.statSync : Ae.lstatSync)(e);
    if (r.isDirectory()) return iC(r, t, e, i, n);
    if (r.isFile() || r.isCharacterDevice() || r.isBlockDevice()) return YO(r, t, e, i, n);
    if (r.isSymbolicLink()) return rC(t, e, i, n);
    throw r.isSocket()
      ? new Error(`Cannot copy a socket file: ${e}`)
      : r.isFIFO()
      ? new Error(`Cannot copy a FIFO pipe: ${e}`)
      : new Error(`Unknown file: ${e}`);
  }
  function YO(t, e, i, n, s) {
    return e ? JO(t, i, n, s) : oy(t, i, n, s);
  }
  function JO(t, e, i, n) {
    if (n.overwrite) return Ae.unlinkSync(i), oy(t, e, i, n);
    if (n.errorOnExist) throw new Error(`'${i}' already exists`);
  }
  function oy(t, e, i, n) {
    return Ae.copyFileSync(e, i), n.preserveTimestamps && ZO(t.mode, e, i), $u(i, t.mode);
  }
  function ZO(t, e, i) {
    return QO(t) && eC(i, t), tC(e, i);
  }
  function QO(t) {
    return (t & 128) === 0;
  }
  function eC(t, e) {
    return $u(t, e | 128);
  }
  function $u(t, e) {
    return Ae.chmodSync(t, e);
  }
  function tC(t, e) {
    let i = Ae.statSync(t);
    return KO(e, i.atime, i.mtime);
  }
  function iC(t, e, i, n, s) {
    return e ? cy(i, n, s) : nC(t.mode, i, n, s);
  }
  function nC(t, e, i, n) {
    return Ae.mkdirSync(i), cy(e, i, n), $u(i, t);
  }
  function cy(t, e, i) {
    Ae.readdirSync(t).forEach((n) => sC(n, t, e, i));
  }
  function sC(t, e, i, n) {
    let s = Ys.join(e, t),
      r = Ys.join(i, t);
    if (n.filter && !n.filter(s, r)) return;
    let { destStat: a } = Js.checkPathsSync(s, r, 'copy', n);
    return ay(a, s, r, n);
  }
  function rC(t, e, i, n) {
    let s = Ae.readlinkSync(e);
    if ((n.dereference && (s = Ys.resolve(process.cwd(), s)), t)) {
      let r;
      try {
        r = Ae.readlinkSync(i);
      } catch (a) {
        if (a.code === 'EINVAL' || a.code === 'UNKNOWN') return Ae.symlinkSync(s, i);
        throw a;
      }
      if ((n.dereference && (r = Ys.resolve(process.cwd(), r)), Js.isSrcSubdir(s, r)))
        throw new Error(`Cannot copy '${s}' to a subdirectory of itself, '${r}'.`);
      if (Js.isSrcSubdir(r, s)) throw new Error(`Cannot overwrite '${r}' with '${s}'.`);
      return aC(s, i);
    } else return Ae.symlinkSync(s, i);
  }
  function aC(t, e) {
    return Ae.unlinkSync(e), Ae.symlinkSync(t, e);
  }
  ly.exports = XO;
});
var ao = y((nD, py) => {
  'use strict';
  var oC = ye().fromPromise;
  py.exports = { copy: oC(ry()), copySync: uy() };
});
var Zs = y((sD, hy) => {
  'use strict';
  var dy = zn(),
    cC = ye().fromCallback;
  function lC(t, e) {
    dy.rm(t, { recursive: !0, force: !0 }, e);
  }
  function uC(t) {
    dy.rmSync(t, { recursive: !0, force: !0 });
  }
  hy.exports = { remove: cC(lC), removeSync: uC };
});
var _y = y((rD, gy) => {
  'use strict';
  var pC = ye().fromPromise,
    xy = Le(),
    vy = require('path'),
    yy = ut(),
    by = Zs(),
    fy = pC(async function (e) {
      let i;
      try {
        i = await xy.readdir(e);
      } catch {
        return yy.mkdirs(e);
      }
      return Promise.all(i.map((n) => by.remove(vy.join(e, n))));
    });
  function my(t) {
    let e;
    try {
      e = xy.readdirSync(t);
    } catch {
      return yy.mkdirsSync(t);
    }
    e.forEach((i) => {
      (i = vy.join(t, i)), by.removeSync(i);
    });
  }
  gy.exports = { emptyDirSync: my, emptydirSync: my, emptyDir: fy, emptydir: fy };
});
var Ry = y((aD, Sy) => {
  'use strict';
  var dC = ye().fromPromise,
    Ey = require('path'),
    Vt = Le(),
    wy = ut();
  async function hC(t) {
    let e;
    try {
      e = await Vt.stat(t);
    } catch {}
    if (e && e.isFile()) return;
    let i = Ey.dirname(t),
      n = null;
    try {
      n = await Vt.stat(i);
    } catch (s) {
      if (s.code === 'ENOENT') {
        await wy.mkdirs(i), await Vt.writeFile(t, '');
        return;
      } else throw s;
    }
    n.isDirectory() ? await Vt.writeFile(t, '') : await Vt.readdir(i);
  }
  function fC(t) {
    let e;
    try {
      e = Vt.statSync(t);
    } catch {}
    if (e && e.isFile()) return;
    let i = Ey.dirname(t);
    try {
      Vt.statSync(i).isDirectory() || Vt.readdirSync(i);
    } catch (n) {
      if (n && n.code === 'ENOENT') wy.mkdirsSync(i);
      else throw n;
    }
    Vt.writeFileSync(t, '');
  }
  Sy.exports = { createFile: dC(hC), createFileSync: fC };
});
var Ny = y((oD, Iy) => {
  'use strict';
  var mC = ye().fromPromise,
    Ty = require('path'),
    Si = Le(),
    Oy = ut(),
    { pathExists: xC } = wi(),
    { areIdentical: Cy } = Xi();
  async function vC(t, e) {
    let i;
    try {
      i = await Si.lstat(e);
    } catch {}
    let n;
    try {
      n = await Si.lstat(t);
    } catch (a) {
      throw ((a.message = a.message.replace('lstat', 'ensureLink')), a);
    }
    if (i && Cy(n, i)) return;
    let s = Ty.dirname(e);
    (await xC(s)) || (await Oy.mkdirs(s)), await Si.link(t, e);
  }
  function yC(t, e) {
    let i;
    try {
      i = Si.lstatSync(e);
    } catch {}
    try {
      let r = Si.lstatSync(t);
      if (i && Cy(r, i)) return;
    } catch (r) {
      throw ((r.message = r.message.replace('lstat', 'ensureLink')), r);
    }
    let n = Ty.dirname(e);
    return Si.existsSync(n) || Oy.mkdirsSync(n), Si.linkSync(t, e);
  }
  Iy.exports = { createLink: mC(vC), createLinkSync: yC };
});
var Ly = y((cD, ky) => {
  'use strict';
  var Ri = require('path'),
    Qs = Le(),
    { pathExists: bC } = wi(),
    gC = ye().fromPromise;
  async function _C(t, e) {
    if (Ri.isAbsolute(t)) {
      try {
        await Qs.lstat(t);
      } catch (r) {
        throw ((r.message = r.message.replace('lstat', 'ensureSymlink')), r);
      }
      return { toCwd: t, toDst: t };
    }
    let i = Ri.dirname(e),
      n = Ri.join(i, t);
    if (await bC(n)) return { toCwd: n, toDst: t };
    try {
      await Qs.lstat(t);
    } catch (r) {
      throw ((r.message = r.message.replace('lstat', 'ensureSymlink')), r);
    }
    return { toCwd: t, toDst: Ri.relative(i, t) };
  }
  function EC(t, e) {
    if (Ri.isAbsolute(t)) {
      if (!Qs.existsSync(t)) throw new Error('absolute srcpath does not exist');
      return { toCwd: t, toDst: t };
    }
    let i = Ri.dirname(e),
      n = Ri.join(i, t);
    if (Qs.existsSync(n)) return { toCwd: n, toDst: t };
    if (!Qs.existsSync(t)) throw new Error('relative srcpath does not exist');
    return { toCwd: t, toDst: Ri.relative(i, t) };
  }
  ky.exports = { symlinkPaths: gC(_C), symlinkPathsSync: EC };
});
var Fy = y((lD, Dy) => {
  'use strict';
  var Ay = Le(),
    wC = ye().fromPromise;
  async function SC(t, e) {
    if (e) return e;
    let i;
    try {
      i = await Ay.lstat(t);
    } catch {
      return 'file';
    }
    return i && i.isDirectory() ? 'dir' : 'file';
  }
  function RC(t, e) {
    if (e) return e;
    let i;
    try {
      i = Ay.lstatSync(t);
    } catch {
      return 'file';
    }
    return i && i.isDirectory() ? 'dir' : 'file';
  }
  Dy.exports = { symlinkType: wC(SC), symlinkTypeSync: RC };
});
var My = y((uD, By) => {
  'use strict';
  var TC = ye().fromPromise,
    Py = require('path'),
    Rt = Le(),
    { mkdirs: OC, mkdirsSync: CC } = ut(),
    { symlinkPaths: IC, symlinkPathsSync: NC } = Ly(),
    { symlinkType: kC, symlinkTypeSync: LC } = Fy(),
    { pathExists: AC } = wi(),
    { areIdentical: Uy } = Xi();
  async function DC(t, e, i) {
    let n;
    try {
      n = await Rt.lstat(e);
    } catch {}
    if (n && n.isSymbolicLink()) {
      let [o, u] = await Promise.all([Rt.stat(t), Rt.stat(e)]);
      if (Uy(o, u)) return;
    }
    let s = await IC(t, e);
    t = s.toDst;
    let r = await kC(s.toCwd, i),
      a = Py.dirname(e);
    return (await AC(a)) || (await OC(a)), Rt.symlink(t, e, r);
  }
  function FC(t, e, i) {
    let n;
    try {
      n = Rt.lstatSync(e);
    } catch {}
    if (n && n.isSymbolicLink()) {
      let o = Rt.statSync(t),
        u = Rt.statSync(e);
      if (Uy(o, u)) return;
    }
    let s = NC(t, e);
    (t = s.toDst), (i = LC(s.toCwd, i));
    let r = Py.dirname(e);
    return Rt.existsSync(r) || CC(r), Rt.symlinkSync(t, e, i);
  }
  By.exports = { createSymlink: TC(DC), createSymlinkSync: FC };
});
var Vy = y((pD, Wy) => {
  'use strict';
  var { createFile: qy, createFileSync: jy } = Ry(),
    { createLink: zy, createLinkSync: Gy } = Ny(),
    { createSymlink: Hy, createSymlinkSync: $y } = My();
  Wy.exports = {
    createFile: qy,
    createFileSync: jy,
    ensureFile: qy,
    ensureFileSync: jy,
    createLink: zy,
    createLinkSync: Gy,
    ensureLink: zy,
    ensureLinkSync: Gy,
    createSymlink: Hy,
    createSymlinkSync: $y,
    ensureSymlink: Hy,
    ensureSymlinkSync: $y,
  };
});
var oo = y((dD, Ky) => {
  'use strict';
  function PC(
    t,
    {
      EOL: e = `
`,
      finalEOL: i = !0,
      replacer: n = null,
      spaces: s,
    } = {}
  ) {
    let r = i ? e : '';
    return JSON.stringify(t, n, s).replace(/\n/g, e) + r;
  }
  function UC(t) {
    return Buffer.isBuffer(t) && (t = t.toString('utf8')), t.replace(/^\uFEFF/, '');
  }
  Ky.exports = { stringify: PC, stripBom: UC };
});
var Zy = y((hD, Jy) => {
  'use strict';
  var $n;
  try {
    $n = zn();
  } catch {
    $n = require('fs');
  }
  var co = ye(),
    { stringify: Xy, stripBom: Yy } = oo();
  async function BC(t, e = {}) {
    typeof e == 'string' && (e = { encoding: e });
    let i = e.fs || $n,
      n = 'throws' in e ? e.throws : !0,
      s = await co.fromCallback(i.readFile)(t, e);
    s = Yy(s);
    let r;
    try {
      r = JSON.parse(s, e ? e.reviver : null);
    } catch (a) {
      if (n) throw ((a.message = `${t}: ${a.message}`), a);
      return null;
    }
    return r;
  }
  var MC = co.fromPromise(BC);
  function qC(t, e = {}) {
    typeof e == 'string' && (e = { encoding: e });
    let i = e.fs || $n,
      n = 'throws' in e ? e.throws : !0;
    try {
      let s = i.readFileSync(t, e);
      return (s = Yy(s)), JSON.parse(s, e.reviver);
    } catch (s) {
      if (n) throw ((s.message = `${t}: ${s.message}`), s);
      return null;
    }
  }
  async function jC(t, e, i = {}) {
    let n = i.fs || $n,
      s = Xy(e, i);
    await co.fromCallback(n.writeFile)(t, s, i);
  }
  var zC = co.fromPromise(jC);
  function GC(t, e, i = {}) {
    let n = i.fs || $n,
      s = Xy(e, i);
    return n.writeFileSync(t, s, i);
  }
  var HC = { readFile: MC, readFileSync: qC, writeFile: zC, writeFileSync: GC };
  Jy.exports = HC;
});
var eb = y((fD, Qy) => {
  'use strict';
  var lo = Zy();
  Qy.exports = {
    readJson: lo.readFile,
    readJsonSync: lo.readFileSync,
    writeJson: lo.writeFile,
    writeJsonSync: lo.writeFileSync,
  };
});
var uo = y((mD, nb) => {
  'use strict';
  var $C = ye().fromPromise,
    Wu = Le(),
    tb = require('path'),
    ib = ut(),
    WC = wi().pathExists;
  async function VC(t, e, i = 'utf-8') {
    let n = tb.dirname(t);
    return (await WC(n)) || (await ib.mkdirs(n)), Wu.writeFile(t, e, i);
  }
  function KC(t, ...e) {
    let i = tb.dirname(t);
    Wu.existsSync(i) || ib.mkdirsSync(i), Wu.writeFileSync(t, ...e);
  }
  nb.exports = { outputFile: $C(VC), outputFileSync: KC };
});
var rb = y((xD, sb) => {
  'use strict';
  var { stringify: XC } = oo(),
    { outputFile: YC } = uo();
  async function JC(t, e, i = {}) {
    let n = XC(e, i);
    await YC(t, n, i);
  }
  sb.exports = JC;
});
var ob = y((vD, ab) => {
  'use strict';
  var { stringify: ZC } = oo(),
    { outputFileSync: QC } = uo();
  function eI(t, e, i) {
    let n = ZC(e, i);
    QC(t, n, i);
  }
  ab.exports = eI;
});
var lb = y((yD, cb) => {
  'use strict';
  var tI = ye().fromPromise,
    De = eb();
  De.outputJson = tI(rb());
  De.outputJsonSync = ob();
  De.outputJSON = De.outputJson;
  De.outputJSONSync = De.outputJsonSync;
  De.writeJSON = De.writeJson;
  De.writeJSONSync = De.writeJsonSync;
  De.readJSON = De.readJson;
  De.readJSONSync = De.readJsonSync;
  cb.exports = De;
});
var fb = y((bD, hb) => {
  'use strict';
  var iI = Le(),
    ub = require('path'),
    { copy: nI } = ao(),
    { remove: db } = Zs(),
    { mkdirp: sI } = ut(),
    { pathExists: rI } = wi(),
    pb = Xi();
  async function aI(t, e, i = {}) {
    let n = i.overwrite || i.clobber || !1,
      { srcStat: s, isChangingCase: r = !1 } = await pb.checkPaths(t, e, 'move', i);
    await pb.checkParentPaths(t, s, e, 'move');
    let a = ub.dirname(e);
    return ub.parse(a).root !== a && (await sI(a)), oI(t, e, n, r);
  }
  async function oI(t, e, i, n) {
    if (!n) {
      if (i) await db(e);
      else if (await rI(e)) throw new Error('dest already exists.');
    }
    try {
      await iI.rename(t, e);
    } catch (s) {
      if (s.code !== 'EXDEV') throw s;
      await cI(t, e, i);
    }
  }
  async function cI(t, e, i) {
    return await nI(t, e, { overwrite: i, errorOnExist: !0, preserveTimestamps: !0 }), db(t);
  }
  hb.exports = aI;
});
var bb = y((gD, yb) => {
  'use strict';
  var xb = zn(),
    Ku = require('path'),
    lI = ao().copySync,
    vb = Zs().removeSync,
    uI = ut().mkdirpSync,
    mb = Xi();
  function pI(t, e, i) {
    i = i || {};
    let n = i.overwrite || i.clobber || !1,
      { srcStat: s, isChangingCase: r = !1 } = mb.checkPathsSync(t, e, 'move', i);
    return mb.checkParentPathsSync(t, s, e, 'move'), dI(e) || uI(Ku.dirname(e)), hI(t, e, n, r);
  }
  function dI(t) {
    let e = Ku.dirname(t);
    return Ku.parse(e).root === e;
  }
  function hI(t, e, i, n) {
    if (n) return Vu(t, e, i);
    if (i) return vb(e), Vu(t, e, i);
    if (xb.existsSync(e)) throw new Error('dest already exists.');
    return Vu(t, e, i);
  }
  function Vu(t, e, i) {
    try {
      xb.renameSync(t, e);
    } catch (n) {
      if (n.code !== 'EXDEV') throw n;
      return fI(t, e, i);
    }
  }
  function fI(t, e, i) {
    return lI(t, e, { overwrite: i, errorOnExist: !0, preserveTimestamps: !0 }), vb(t);
  }
  yb.exports = pI;
});
var _b = y((_D, gb) => {
  'use strict';
  var mI = ye().fromPromise;
  gb.exports = { move: mI(fb()), moveSync: bb() };
});
var wb = y((ED, Eb) => {
  'use strict';
  Eb.exports = { ...Le(), ...ao(), ..._y(), ...Vy(), ...lb(), ...ut(), ..._b(), ...uo(), ...wi(), ...Zs() };
});
var Rb = y((wD, Sb) => {
  'use strict';
  Sb.exports = typeof queueMicrotask == 'function' ? queueMicrotask : (t) => Promise.resolve().then(t);
});
var Ob = y((SD, Tb) => {
  'use strict';
  Tb.exports = typeof process < 'u' && typeof process.nextTick == 'function' ? process.nextTick.bind(process) : Rb();
});
var Ib = y((TD, Cb) => {
  'use strict';
  Cb.exports = class {
    constructor(e) {
      if (!(e > 0) || (e - 1) & e) throw new Error('Max size for a FixedFIFO should be a power of two');
      (this.buffer = new Array(e)), (this.mask = e - 1), (this.top = 0), (this.btm = 0), (this.next = null);
    }
    clear() {
      (this.top = this.btm = 0), (this.next = null), this.buffer.fill(void 0);
    }
    push(e) {
      return this.buffer[this.top] !== void 0
        ? !1
        : ((this.buffer[this.top] = e), (this.top = (this.top + 1) & this.mask), !0);
    }
    shift() {
      let e = this.buffer[this.btm];
      if (e !== void 0) return (this.buffer[this.btm] = void 0), (this.btm = (this.btm + 1) & this.mask), e;
    }
    peek() {
      return this.buffer[this.btm];
    }
    isEmpty() {
      return this.buffer[this.btm] === void 0;
    }
  };
});
var Xu = y((CD, kb) => {
  'use strict';
  var Nb = Ib();
  kb.exports = class {
    constructor(e) {
      (this.hwm = e || 16), (this.head = new Nb(this.hwm)), (this.tail = this.head), (this.length = 0);
    }
    clear() {
      (this.head = this.tail), this.head.clear(), (this.length = 0);
    }
    push(e) {
      if ((this.length++, !this.head.push(e))) {
        let i = this.head;
        (this.head = i.next = new Nb(2 * this.head.buffer.length)), this.head.push(e);
      }
    }
    shift() {
      this.length !== 0 && this.length--;
      let e = this.tail.shift();
      if (e === void 0 && this.tail.next) {
        let i = this.tail.next;
        return (this.tail.next = null), (this.tail = i), this.tail.shift();
      }
      return e;
    }
    peek() {
      let e = this.tail.peek();
      return e === void 0 && this.tail.next ? this.tail.next.peek() : e;
    }
    isEmpty() {
      return this.length === 0;
    }
  };
});
var Wn = y((ID, Lb) => {
  'use strict';
  function xI(t) {
    return Buffer.isBuffer(t) || t instanceof Uint8Array;
  }
  function vI(t) {
    return Buffer.isEncoding(t);
  }
  function yI(t, e, i) {
    return Buffer.alloc(t, e, i);
  }
  function bI(t) {
    return Buffer.allocUnsafe(t);
  }
  function gI(t) {
    return Buffer.allocUnsafeSlow(t);
  }
  function _I(t, e) {
    return Buffer.byteLength(t, e);
  }
  function EI(t, e) {
    return Buffer.compare(t, e);
  }
  function wI(t, e) {
    return Buffer.concat(t, e);
  }
  function SI(t, e, i, n, s) {
    return ue(t).copy(e, i, n, s);
  }
  function RI(t, e) {
    return ue(t).equals(e);
  }
  function TI(t, e, i, n, s) {
    return ue(t).fill(e, i, n, s);
  }
  function OI(t, e, i) {
    return Buffer.from(t, e, i);
  }
  function CI(t, e, i, n) {
    return ue(t).includes(e, i, n);
  }
  function II(t, e, i, n) {
    return ue(t).indexOf(e, i, n);
  }
  function NI(t, e, i, n) {
    return ue(t).lastIndexOf(e, i, n);
  }
  function kI(t) {
    return ue(t).swap16();
  }
  function LI(t) {
    return ue(t).swap32();
  }
  function AI(t) {
    return ue(t).swap64();
  }
  function ue(t) {
    return Buffer.isBuffer(t) ? t : Buffer.from(t.buffer, t.byteOffset, t.byteLength);
  }
  function DI(t, e, i, n) {
    return ue(t).toString(e, i, n);
  }
  function FI(t, e, i, n, s) {
    return ue(t).write(e, i, n, s);
  }
  function PI(t, e, i) {
    return ue(t).writeDoubleLE(e, i);
  }
  function UI(t, e, i) {
    return ue(t).writeFloatLE(e, i);
  }
  function BI(t, e, i) {
    return ue(t).writeUInt32LE(e, i);
  }
  function MI(t, e, i) {
    return ue(t).writeInt32LE(e, i);
  }
  function qI(t, e) {
    return ue(t).readDoubleLE(e);
  }
  function jI(t, e) {
    return ue(t).readFloatLE(e);
  }
  function zI(t, e) {
    return ue(t).readUInt32LE(e);
  }
  function GI(t, e) {
    return ue(t).readInt32LE(e);
  }
  Lb.exports = {
    isBuffer: xI,
    isEncoding: vI,
    alloc: yI,
    allocUnsafe: bI,
    allocUnsafeSlow: gI,
    byteLength: _I,
    compare: EI,
    concat: wI,
    copy: SI,
    equals: RI,
    fill: TI,
    from: OI,
    includes: CI,
    indexOf: II,
    lastIndexOf: NI,
    swap16: kI,
    swap32: LI,
    swap64: AI,
    toBuffer: ue,
    toString: DI,
    write: FI,
    writeDoubleLE: PI,
    writeFloatLE: UI,
    writeUInt32LE: BI,
    writeInt32LE: MI,
    readDoubleLE: qI,
    readFloatLE: jI,
    readUInt32LE: zI,
    readInt32LE: GI,
  };
});
var Db = y((kD, Ab) => {
  'use strict';
  var HI = Wn();
  Ab.exports = class {
    constructor(e) {
      this.encoding = e;
    }
    decode(e) {
      return HI.toString(e, this.encoding);
    }
    flush() {
      return '';
    }
  };
});
var Pb = y((AD, Fb) => {
  'use strict';
  var $I = Wn();
  Fb.exports = class {
    constructor() {
      (this.codePoint = 0),
        (this.bytesSeen = 0),
        (this.bytesNeeded = 0),
        (this.lowerBoundary = 128),
        (this.upperBoundary = 191);
    }
    decode(e) {
      if (this.bytesNeeded === 0) {
        let n = !0;
        for (let s = Math.max(0, e.byteLength - 4), r = e.byteLength; s < r && n; s++) n = e[s] <= 127;
        if (n) return $I.toString(e, 'utf8');
      }
      let i = '';
      for (let n = 0, s = e.byteLength; n < s; n++) {
        let r = e[n];
        if (this.bytesNeeded === 0) {
          r <= 127
            ? (i += String.fromCharCode(r))
            : r >= 194 && r <= 223
            ? ((this.bytesNeeded = 1), (this.codePoint = r & 31))
            : r >= 224 && r <= 239
            ? (r === 224 ? (this.lowerBoundary = 160) : r === 237 && (this.upperBoundary = 159),
              (this.bytesNeeded = 2),
              (this.codePoint = r & 15))
            : r >= 240 && r <= 244
            ? (r === 240 && (this.lowerBoundary = 144),
              r === 244 && (this.upperBoundary = 143),
              (this.bytesNeeded = 3),
              (this.codePoint = r & 7))
            : (i += '\uFFFD');
          continue;
        }
        if (r < this.lowerBoundary || r > this.upperBoundary) {
          (this.codePoint = 0),
            (this.bytesNeeded = 0),
            (this.bytesSeen = 0),
            (this.lowerBoundary = 128),
            (this.upperBoundary = 191),
            (i += '\uFFFD');
          continue;
        }
        (this.lowerBoundary = 128),
          (this.upperBoundary = 191),
          (this.codePoint = (this.codePoint << 6) | (r & 63)),
          this.bytesSeen++,
          this.bytesSeen === this.bytesNeeded &&
            ((i += String.fromCodePoint(this.codePoint)),
            (this.codePoint = 0),
            (this.bytesNeeded = 0),
            (this.bytesSeen = 0));
      }
      return i;
    }
    flush() {
      let e = this.bytesNeeded > 0 ? '\uFFFD' : '';
      return (
        (this.codePoint = 0),
        (this.bytesNeeded = 0),
        (this.bytesSeen = 0),
        (this.lowerBoundary = 128),
        (this.upperBoundary = 191),
        e
      );
    }
  };
});
var Bb = y((FD, Ub) => {
  'use strict';
  var WI = Db(),
    VI = Pb();
  Ub.exports = class {
    constructor(e = 'utf8') {
      switch (((this.encoding = KI(e)), this.encoding)) {
        case 'utf8':
          this.decoder = new VI();
          break;
        case 'utf16le':
        case 'base64':
          throw new Error('Unsupported encoding: ' + this.encoding);
        default:
          this.decoder = new WI(this.encoding);
      }
    }
    push(e) {
      return typeof e == 'string' ? e : this.decoder.decode(e);
    }
    write(e) {
      return this.push(e);
    }
    end(e) {
      let i = '';
      return e && (i = this.push(e)), (i += this.decoder.flush()), i;
    }
  };
  function KI(t) {
    switch (((t = t.toLowerCase()), t)) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return t;
      default:
        throw new Error('Unknown encoding: ' + t);
    }
  }
});
var pp = y((PD, cg) => {
  'use strict';
  var { EventEmitter: XI } = require('events'),
    vo = new Error('Stream was destroyed'),
    Yu = new Error('Premature close'),
    Gb = Ob(),
    Hb = Xu(),
    YI = Bb(),
    te = (1 << 29) - 1,
    en = 1,
    np = 2,
    Yi = 4,
    er = 8,
    $b = te ^ en,
    JI = te ^ np,
    ar = 16,
    tr = 32,
    Jn = 64,
    Ti = 128,
    or = 256,
    sp = 512,
    Ji = 1024,
    Ju = 2048,
    rp = 4096,
    ap = 8192,
    pt = 16384,
    Vn = 32768,
    yo = 65536,
    Zi = 131072,
    Wb = or | sp,
    ZI = ar | yo,
    QI = Jn | ar,
    eN = rp | Ti,
    op = or | Zi,
    tN = te ^ ar,
    iN = te ^ Jn,
    nN = te ^ (Jn | yo),
    sN = te ^ yo,
    rN = te ^ or,
    aN = te ^ (Ti | ap),
    oN = te ^ Ji,
    Mb = te ^ Wb,
    Vb = te ^ Vn,
    cN = te ^ tr,
    Kb = te ^ Zi,
    lN = te ^ op,
    Oi = 1 << 18,
    Xn = 2 << 18,
    cr = 4 << 18,
    Qi = 8 << 18,
    lr = 16 << 18,
    tn = 32 << 18,
    Zu = 64 << 18,
    Kn = 128 << 18,
    cp = 256 << 18,
    Yn = 512 << 18,
    bo = 1024 << 18,
    Xb = te ^ (Oi | cp),
    Yb = te ^ cr,
    uN = te ^ Yn,
    pN = te ^ lr,
    dN = te ^ Qi,
    Jb = te ^ Kn,
    hN = te ^ Xn,
    Zb = te ^ bo,
    ir = ar | Oi,
    Qb = te ^ ir,
    lp = pt | tn,
    Kt = Yi | er | np,
    Ve = Kt | en,
    eg = Kt | lp,
    fN = Yb & iN,
    up = Kn | Vn,
    mN = up & Qb,
    tg = Ve | mN,
    xN = Ve | Ji | pt,
    qb = Ve | pt | Ti,
    vN = Ve | Ji | Ti,
    yN = Ve | rp | Ti | ap,
    bN = Ve | ar | Ji | pt | yo | Zi,
    gN = Kt | Ji | pt,
    _N = tr | Ve | Vn | Jn,
    EN = Ve | Yn | tn,
    wN = Qi | lr,
    ig = Qi | Oi,
    SN = Qi | lr | Ve | Oi,
    jb = Ve | Oi | Qi | bo,
    RN = cr | Oi,
    TN = Oi | cp,
    ON = Ve | Yn | ig | tn,
    CN = lr | Kt | Yn | tn,
    IN = Xn | Ve | Kn | cr,
    po = Symbol.asyncIterator || Symbol('asyncIterator'),
    ho = class {
      constructor(
        e,
        { highWaterMark: i = 16384, map: n = null, mapWritable: s, byteLength: r, byteLengthWritable: a } = {}
      ) {
        (this.stream = e),
          (this.queue = new Hb()),
          (this.highWaterMark = i),
          (this.buffered = 0),
          (this.error = null),
          (this.pipeline = null),
          (this.drains = null),
          (this.byteLength = a || r || og),
          (this.map = s || n),
          (this.afterWrite = LN.bind(this)),
          (this.afterUpdateNextTick = FN.bind(this));
      }
      get ended() {
        return (this.stream._duplexState & tn) !== 0;
      }
      push(e) {
        return (
          this.map !== null && (e = this.map(e)),
          (this.buffered += this.byteLength(e)),
          this.queue.push(e),
          this.buffered < this.highWaterMark
            ? ((this.stream._duplexState |= Qi), !0)
            : ((this.stream._duplexState |= wN), !1)
        );
      }
      shift() {
        let e = this.queue.shift();
        return (this.buffered -= this.byteLength(e)), this.buffered === 0 && (this.stream._duplexState &= dN), e;
      }
      end(e) {
        typeof e == 'function' ? this.stream.once('finish', e) : e != null && this.push(e),
          (this.stream._duplexState = (this.stream._duplexState | Yn) & Yb);
      }
      autoBatch(e, i) {
        let n = [],
          s = this.stream;
        for (n.push(e); (s._duplexState & jb) === ig; ) n.push(s._writableState.shift());
        if (s._duplexState & Ve) return i(null);
        s._writev(n, i);
      }
      update() {
        let e = this.stream;
        e._duplexState |= Xn;
        do {
          for (; (e._duplexState & jb) === Qi; ) {
            let i = this.shift();
            (e._duplexState |= TN), e._write(i, this.afterWrite);
          }
          e._duplexState & RN || this.updateNonPrimary();
        } while (this.continueUpdate() === !0);
        e._duplexState &= hN;
      }
      updateNonPrimary() {
        let e = this.stream;
        if ((e._duplexState & ON) === Yn) {
          (e._duplexState = (e._duplexState | Oi) & uN), e._final(kN.bind(this));
          return;
        }
        if ((e._duplexState & Kt) === Yi) {
          e._duplexState & up || ((e._duplexState |= ir), e._destroy(ng.bind(this)));
          return;
        }
        (e._duplexState & tg) === en && ((e._duplexState = (e._duplexState | ir) & $b), e._open(sg.bind(this)));
      }
      continueUpdate() {
        return this.stream._duplexState & Kn ? ((this.stream._duplexState &= Jb), !0) : !1;
      }
      updateCallback() {
        (this.stream._duplexState & IN) === cr ? this.update() : this.updateNextTick();
      }
      updateNextTick() {
        this.stream._duplexState & Kn ||
          ((this.stream._duplexState |= Kn), this.stream._duplexState & Xn || Gb(this.afterUpdateNextTick));
      }
    },
    Qu = class {
      constructor(
        e,
        { highWaterMark: i = 16384, map: n = null, mapReadable: s, byteLength: r, byteLengthReadable: a } = {}
      ) {
        (this.stream = e),
          (this.queue = new Hb()),
          (this.highWaterMark = i === 0 ? 1 : i),
          (this.buffered = 0),
          (this.readAhead = i > 0),
          (this.error = null),
          (this.pipeline = null),
          (this.byteLength = a || r || og),
          (this.map = s || n),
          (this.pipeTo = null),
          (this.afterRead = AN.bind(this)),
          (this.afterUpdateNextTick = DN.bind(this));
      }
      get ended() {
        return (this.stream._duplexState & pt) !== 0;
      }
      pipe(e, i) {
        if (this.pipeTo !== null) throw new Error('Can only pipe to one destination');
        if (
          (typeof i != 'function' && (i = null),
          (this.stream._duplexState |= sp),
          (this.pipeTo = e),
          (this.pipeline = new tp(this.stream, e, i)),
          i && this.stream.on('error', zb),
          rr(e))
        )
          (e._writableState.pipeline = this.pipeline),
            i && e.on('error', zb),
            e.on('finish', this.pipeline.finished.bind(this.pipeline));
        else {
          let n = this.pipeline.done.bind(this.pipeline, e),
            s = this.pipeline.done.bind(this.pipeline, e, null);
          e.on('error', n), e.on('close', s), e.on('finish', this.pipeline.finished.bind(this.pipeline));
        }
        e.on('drain', NN.bind(this)), this.stream.emit('piping', e), e.emit('pipe', this.stream);
      }
      push(e) {
        let i = this.stream;
        return e === null
          ? ((this.highWaterMark = 0), (i._duplexState = (i._duplexState | Ji) & nN), !1)
          : this.map !== null && ((e = this.map(e)), e === null)
          ? this.buffered < this.highWaterMark
          : ((this.buffered += this.byteLength(e)),
            this.queue.push(e),
            (i._duplexState = (i._duplexState | Ti) & sN),
            this.buffered < this.highWaterMark);
      }
      shift() {
        let e = this.queue.shift();
        return (this.buffered -= this.byteLength(e)), this.buffered === 0 && (this.stream._duplexState &= aN), e;
      }
      unshift(e) {
        let i = [this.map !== null ? this.map(e) : e];
        for (; this.buffered > 0; ) i.push(this.shift());
        for (let n = 0; n < i.length - 1; n++) {
          let s = i[n];
          (this.buffered += this.byteLength(s)), this.queue.push(s);
        }
        this.push(i[i.length - 1]);
      }
      read() {
        let e = this.stream;
        if ((e._duplexState & qb) === Ti) {
          let i = this.shift();
          return (
            this.pipeTo !== null && this.pipeTo.write(i) === !1 && (e._duplexState &= Mb),
            e._duplexState & Ju && e.emit('data', i),
            i
          );
        }
        return this.readAhead === !1 && ((e._duplexState |= Zi), this.updateNextTick()), null;
      }
      drain() {
        let e = this.stream;
        for (; (e._duplexState & qb) === Ti && e._duplexState & Wb; ) {
          let i = this.shift();
          this.pipeTo !== null && this.pipeTo.write(i) === !1 && (e._duplexState &= Mb),
            e._duplexState & Ju && e.emit('data', i);
        }
      }
      update() {
        let e = this.stream;
        e._duplexState |= tr;
        do {
          for (this.drain(); this.buffered < this.highWaterMark && (e._duplexState & bN) === Zi; )
            (e._duplexState |= ZI), e._read(this.afterRead), this.drain();
          (e._duplexState & yN) === eN && ((e._duplexState |= ap), e.emit('readable')),
            e._duplexState & QI || this.updateNonPrimary();
        } while (this.continueUpdate() === !0);
        e._duplexState &= cN;
      }
      updateNonPrimary() {
        let e = this.stream;
        if (
          ((e._duplexState & vN) === Ji &&
            ((e._duplexState = (e._duplexState | pt) & oN),
            e.emit('end'),
            (e._duplexState & eg) === lp && (e._duplexState |= Yi),
            this.pipeTo !== null && this.pipeTo.end()),
          (e._duplexState & Kt) === Yi)
        ) {
          e._duplexState & up || ((e._duplexState |= ir), e._destroy(ng.bind(this)));
          return;
        }
        (e._duplexState & tg) === en && ((e._duplexState = (e._duplexState | ir) & $b), e._open(sg.bind(this)));
      }
      continueUpdate() {
        return this.stream._duplexState & Vn ? ((this.stream._duplexState &= Vb), !0) : !1;
      }
      updateCallback() {
        (this.stream._duplexState & _N) === Jn ? this.update() : this.updateNextTick();
      }
      updateNextTick() {
        this.stream._duplexState & Vn ||
          ((this.stream._duplexState |= Vn), this.stream._duplexState & tr || Gb(this.afterUpdateNextTick));
      }
    },
    ep = class {
      constructor(e) {
        (this.data = null), (this.afterTransform = UN.bind(e)), (this.afterFinal = null);
      }
    },
    tp = class {
      constructor(e, i, n) {
        (this.from = e), (this.to = i), (this.afterPipe = n), (this.error = null), (this.pipeToFinished = !1);
      }
      finished() {
        this.pipeToFinished = !0;
      }
      done(e, i) {
        if ((i && (this.error = i), e === this.to && ((this.to = null), this.from !== null))) {
          (!(this.from._duplexState & pt) || !this.pipeToFinished) &&
            this.from.destroy(this.error || new Error('Writable stream closed prematurely'));
          return;
        }
        if (e === this.from && ((this.from = null), this.to !== null)) {
          e._duplexState & pt || this.to.destroy(this.error || new Error('Readable stream closed before ending'));
          return;
        }
        this.afterPipe !== null && this.afterPipe(this.error), (this.to = this.from = this.afterPipe = null);
      }
    };
  function NN() {
    (this.stream._duplexState |= sp), this.updateCallback();
  }
  function kN(t) {
    let e = this.stream;
    t && e.destroy(t),
      e._duplexState & Kt || ((e._duplexState |= tn), e.emit('finish')),
      (e._duplexState & eg) === lp && (e._duplexState |= Yi),
      (e._duplexState &= Xb),
      e._duplexState & Xn ? this.updateNextTick() : this.update();
  }
  function ng(t) {
    let e = this.stream;
    !t && this.error !== vo && (t = this.error), t && e.emit('error', t), (e._duplexState |= er), e.emit('close');
    let i = e._readableState,
      n = e._writableState;
    if ((i !== null && i.pipeline !== null && i.pipeline.done(e, t), n !== null)) {
      for (; n.drains !== null && n.drains.length > 0; ) n.drains.shift().resolve(!1);
      n.pipeline !== null && n.pipeline.done(e, t);
    }
  }
  function LN(t) {
    let e = this.stream;
    t && e.destroy(t),
      (e._duplexState &= Xb),
      this.drains !== null && PN(this.drains),
      (e._duplexState & SN) === lr && ((e._duplexState &= pN), (e._duplexState & Zu) === Zu && e.emit('drain')),
      this.updateCallback();
  }
  function AN(t) {
    t && this.stream.destroy(t),
      (this.stream._duplexState &= tN),
      this.readAhead === !1 && !(this.stream._duplexState & or) && (this.stream._duplexState &= Kb),
      this.updateCallback();
  }
  function DN() {
    this.stream._duplexState & tr || ((this.stream._duplexState &= Vb), this.update());
  }
  function FN() {
    this.stream._duplexState & Xn || ((this.stream._duplexState &= Jb), this.update());
  }
  function PN(t) {
    for (let e = 0; e < t.length; e++) --t[e].writes === 0 && (t.shift().resolve(!0), e--);
  }
  function sg(t) {
    let e = this.stream;
    t && e.destroy(t),
      e._duplexState & Yi ||
        (e._duplexState & xN || (e._duplexState |= Jn), e._duplexState & EN || (e._duplexState |= cr), e.emit('open')),
      (e._duplexState &= Qb),
      e._writableState !== null && e._writableState.updateCallback(),
      e._readableState !== null && e._readableState.updateCallback();
  }
  function UN(t, e) {
    e != null && this.push(e), this._writableState.afterWrite(t);
  }
  function BN(t) {
    this._readableState !== null &&
      (t === 'data' && ((this._duplexState |= Ju | op), this._readableState.updateNextTick()),
      t === 'readable' && ((this._duplexState |= rp), this._readableState.updateNextTick())),
      this._writableState !== null &&
        t === 'drain' &&
        ((this._duplexState |= Zu), this._writableState.updateNextTick());
  }
  var nr = class extends XI {
      constructor(e) {
        super(),
          (this._duplexState = 0),
          (this._readableState = null),
          (this._writableState = null),
          e &&
            (e.open && (this._open = e.open),
            e.destroy && (this._destroy = e.destroy),
            e.predestroy && (this._predestroy = e.predestroy),
            e.signal && e.signal.addEventListener('abort', $N.bind(this))),
          this.on('newListener', BN);
      }
      _open(e) {
        e(null);
      }
      _destroy(e) {
        e(null);
      }
      _predestroy() {}
      get readable() {
        return this._readableState !== null ? !0 : void 0;
      }
      get writable() {
        return this._writableState !== null ? !0 : void 0;
      }
      get destroyed() {
        return (this._duplexState & er) !== 0;
      }
      get destroying() {
        return (this._duplexState & Kt) !== 0;
      }
      destroy(e) {
        this._duplexState & Kt ||
          (e || (e = vo),
          (this._duplexState = (this._duplexState | Yi) & fN),
          this._readableState !== null && ((this._readableState.highWaterMark = 0), (this._readableState.error = e)),
          this._writableState !== null && ((this._writableState.highWaterMark = 0), (this._writableState.error = e)),
          (this._duplexState |= np),
          this._predestroy(),
          (this._duplexState &= JI),
          this._readableState !== null && this._readableState.updateNextTick(),
          this._writableState !== null && this._writableState.updateNextTick());
      }
    },
    fo = class t extends nr {
      constructor(e) {
        super(e),
          (this._duplexState |= en | tn | Zi),
          (this._readableState = new Qu(this, e)),
          e &&
            (this._readableState.readAhead === !1 && (this._duplexState &= Kb),
            e.read && (this._read = e.read),
            e.eagerOpen && this._readableState.updateNextTick(),
            e.encoding && this.setEncoding(e.encoding));
      }
      setEncoding(e) {
        let i = new YI(e),
          n = this._readableState.map || jN;
        return (this._readableState.map = s), this;
        function s(r) {
          let a = i.push(r);
          return a === '' ? null : n(a);
        }
      }
      _read(e) {
        e(null);
      }
      pipe(e, i) {
        return this._readableState.updateNextTick(), this._readableState.pipe(e, i), e;
      }
      read() {
        return this._readableState.updateNextTick(), this._readableState.read();
      }
      push(e) {
        return this._readableState.updateNextTick(), this._readableState.push(e);
      }
      unshift(e) {
        return this._readableState.updateNextTick(), this._readableState.unshift(e);
      }
      resume() {
        return (this._duplexState |= op), this._readableState.updateNextTick(), this;
      }
      pause() {
        return (this._duplexState &= this._readableState.readAhead === !1 ? lN : rN), this;
      }
      static _fromAsyncIterator(e, i) {
        let n,
          s = new t({
            ...i,
            read(a) {
              e.next().then(r).then(a.bind(null, null)).catch(a);
            },
            predestroy() {
              n = e.return();
            },
            destroy(a) {
              if (!n) return a(null);
              n.then(a.bind(null, null)).catch(a);
            },
          });
        return s;
        function r(a) {
          a.done ? s.push(null) : s.push(a.value);
        }
      }
      static from(e, i) {
        if (GN(e)) return e;
        if (e[po]) return this._fromAsyncIterator(e[po](), i);
        Array.isArray(e) || (e = e === void 0 ? [] : [e]);
        let n = 0;
        return new t({
          ...i,
          read(s) {
            this.push(n === e.length ? null : e[n++]), s(null);
          },
        });
      }
      static isBackpressured(e) {
        return (e._duplexState & gN) !== 0 || e._readableState.buffered >= e._readableState.highWaterMark;
      }
      static isPaused(e) {
        return (e._duplexState & or) === 0;
      }
      [po]() {
        let e = this,
          i = null,
          n = null,
          s = null;
        return (
          this.on('error', (l) => {
            i = l;
          }),
          this.on('readable', r),
          this.on('close', a),
          {
            [po]() {
              return this;
            },
            next() {
              return new Promise(function (l, c) {
                (n = l), (s = c);
                let p = e.read();
                p !== null ? o(p) : e._duplexState & er && o(null);
              });
            },
            return() {
              return u(null);
            },
            throw(l) {
              return u(l);
            },
          }
        );
        function r() {
          n !== null && o(e.read());
        }
        function a() {
          n !== null && o(null);
        }
        function o(l) {
          s !== null &&
            (i ? s(i) : l === null && !(e._duplexState & pt) ? s(vo) : n({ value: l, done: l === null }),
            (s = n = null));
        }
        function u(l) {
          return (
            e.destroy(l),
            new Promise((c, p) => {
              if (e._duplexState & er) return c({ value: void 0, done: !0 });
              e.once('close', function () {
                l ? p(l) : c({ value: void 0, done: !0 });
              });
            })
          );
        }
      }
    },
    mo = class extends nr {
      constructor(e) {
        super(e),
          (this._duplexState |= en | pt),
          (this._writableState = new ho(this, e)),
          e &&
            (e.writev && (this._writev = e.writev),
            e.write && (this._write = e.write),
            e.final && (this._final = e.final),
            e.eagerOpen && this._writableState.updateNextTick());
      }
      cork() {
        this._duplexState |= bo;
      }
      uncork() {
        (this._duplexState &= Zb), this._writableState.updateNextTick();
      }
      _writev(e, i) {
        i(null);
      }
      _write(e, i) {
        this._writableState.autoBatch(e, i);
      }
      _final(e) {
        e(null);
      }
      static isBackpressured(e) {
        return (e._duplexState & CN) !== 0;
      }
      static drained(e) {
        if (e.destroyed) return Promise.resolve(!1);
        let i = e._writableState,
          s = (WN(e) ? Math.min(1, i.queue.length) : i.queue.length) + (e._duplexState & cp ? 1 : 0);
        return s === 0
          ? Promise.resolve(!0)
          : (i.drains === null && (i.drains = []),
            new Promise((r) => {
              i.drains.push({ writes: s, resolve: r });
            }));
      }
      write(e) {
        return this._writableState.updateNextTick(), this._writableState.push(e);
      }
      end(e) {
        return this._writableState.updateNextTick(), this._writableState.end(e), this;
      }
    },
    sr = class extends fo {
      constructor(e) {
        super(e),
          (this._duplexState = en | (this._duplexState & Zi)),
          (this._writableState = new ho(this, e)),
          e &&
            (e.writev && (this._writev = e.writev),
            e.write && (this._write = e.write),
            e.final && (this._final = e.final));
      }
      cork() {
        this._duplexState |= bo;
      }
      uncork() {
        (this._duplexState &= Zb), this._writableState.updateNextTick();
      }
      _writev(e, i) {
        i(null);
      }
      _write(e, i) {
        this._writableState.autoBatch(e, i);
      }
      _final(e) {
        e(null);
      }
      write(e) {
        return this._writableState.updateNextTick(), this._writableState.push(e);
      }
      end(e) {
        return this._writableState.updateNextTick(), this._writableState.end(e), this;
      }
    },
    xo = class extends sr {
      constructor(e) {
        super(e),
          (this._transformState = new ep(this)),
          e && (e.transform && (this._transform = e.transform), e.flush && (this._flush = e.flush));
      }
      _write(e, i) {
        this._readableState.buffered >= this._readableState.highWaterMark
          ? (this._transformState.data = e)
          : this._transform(e, this._transformState.afterTransform);
      }
      _read(e) {
        if (this._transformState.data !== null) {
          let i = this._transformState.data;
          (this._transformState.data = null), e(null), this._transform(i, this._transformState.afterTransform);
        } else e(null);
      }
      destroy(e) {
        super.destroy(e),
          this._transformState.data !== null &&
            ((this._transformState.data = null), this._transformState.afterTransform());
      }
      _transform(e, i) {
        i(null, e);
      }
      _flush(e) {
        e(null);
      }
      _final(e) {
        (this._transformState.afterFinal = e), this._flush(MN.bind(this));
      }
    },
    ip = class extends xo {};
  function MN(t, e) {
    let i = this._transformState.afterFinal;
    if (t) return i(t);
    e != null && this.push(e), this.push(null), i(null);
  }
  function qN(...t) {
    return new Promise((e, i) =>
      rg(...t, (n) => {
        if (n) return i(n);
        e();
      })
    );
  }
  function rg(t, ...e) {
    let i = Array.isArray(t) ? [...t, ...e] : [t, ...e],
      n = i.length && typeof i[i.length - 1] == 'function' ? i.pop() : null;
    if (i.length < 2) throw new Error('Pipeline requires at least 2 streams');
    let s = i[0],
      r = null,
      a = null;
    for (let l = 1; l < i.length; l++) (r = i[l]), rr(s) ? s.pipe(r, u) : (o(s, !0, l > 1, u), s.pipe(r)), (s = r);
    if (n) {
      let l = !1,
        c = rr(r) || !!(r._writableState && r._writableState.autoDestroy);
      r.on('error', (p) => {
        a === null && (a = p);
      }),
        r.on('finish', () => {
          (l = !0), c || n(a);
        }),
        c && r.on('close', () => n(a || (l ? null : Yu)));
    }
    return r;
    function o(l, c, p, d) {
      l.on('error', d), l.on('close', f);
      function f() {
        if ((c && l._readableState && !l._readableState.ended) || (p && l._writableState && !l._writableState.ended))
          return d(Yu);
      }
    }
    function u(l) {
      if (!(!l || a)) {
        a = l;
        for (let c of i) c.destroy(l);
      }
    }
  }
  function jN(t) {
    return t;
  }
  function ag(t) {
    return !!t._readableState || !!t._writableState;
  }
  function rr(t) {
    return typeof t._duplexState == 'number' && ag(t);
  }
  function zN(t) {
    let e = (t._readableState && t._readableState.error) || (t._writableState && t._writableState.error);
    return e === vo ? null : e;
  }
  function GN(t) {
    return rr(t) && t.readable;
  }
  function HN(t) {
    return typeof t == 'object' && t !== null && typeof t.byteLength == 'number';
  }
  function og(t) {
    return HN(t) ? t.byteLength : 1024;
  }
  function zb() {}
  function $N() {
    this.destroy(new Error('Stream aborted.'));
  }
  function WN(t) {
    return t._writev !== mo.prototype._writev && t._writev !== sr.prototype._writev;
  }
  cg.exports = {
    pipeline: rg,
    pipelinePromise: qN,
    isStream: ag,
    isStreamx: rr,
    getStreamError: zN,
    Stream: nr,
    Writable: mo,
    Readable: fo,
    Duplex: sr,
    Transform: xo,
    PassThrough: ip,
  };
});
var fp = y((Qn) => {
  'use strict';
  var H = Wn(),
    VN = '0000000000000000000',
    KN = '7777777777777777777',
    go = 48,
    lg = H.from([117, 115, 116, 97, 114, 0]),
    XN = H.from([go, go]),
    YN = H.from([117, 115, 116, 97, 114, 32]),
    JN = H.from([32, 0]),
    ZN = 4095,
    ur = 257,
    hp = 263;
  Qn.decodeLongPath = function (e, i) {
    return Zn(e, 0, e.length, i);
  };
  Qn.encodePax = function (e) {
    let i = '';
    e.name &&
      (i += dp(
        ' path=' +
          e.name +
          `
`
      )),
      e.linkname &&
        (i += dp(
          ' linkpath=' +
            e.linkname +
            `
`
        ));
    let n = e.pax;
    if (n)
      for (let s in n)
        i += dp(
          ' ' +
            s +
            '=' +
            n[s] +
            `
`
        );
    return H.from(i);
  };
  Qn.decodePax = function (e) {
    let i = {};
    for (; e.length; ) {
      let n = 0;
      for (; n < e.length && e[n] !== 32; ) n++;
      let s = parseInt(H.toString(e.subarray(0, n)), 10);
      if (!s) return i;
      let r = H.toString(e.subarray(n + 1, s - 1)),
        a = r.indexOf('=');
      if (a === -1) return i;
      (i[r.slice(0, a)] = r.slice(a + 1)), (e = e.subarray(s));
    }
    return i;
  };
  Qn.encode = function (e) {
    let i = H.alloc(512),
      n = e.name,
      s = '';
    if ((e.typeflag === 5 && n[n.length - 1] !== '/' && (n += '/'), H.byteLength(n) !== n.length)) return null;
    for (; H.byteLength(n) > 100; ) {
      let r = n.indexOf('/');
      if (r === -1) return null;
      (s += s ? '/' + n.slice(0, r) : n.slice(0, r)), (n = n.slice(r + 1));
    }
    return H.byteLength(n) > 100 || H.byteLength(s) > 155 || (e.linkname && H.byteLength(e.linkname) > 100)
      ? null
      : (H.write(i, n),
        H.write(i, Ii(e.mode & ZN, 6), 100),
        H.write(i, Ii(e.uid, 6), 108),
        H.write(i, Ii(e.gid, 6), 116),
        rk(e.size, i, 124),
        H.write(i, Ii((e.mtime.getTime() / 1e3) | 0, 11), 136),
        (i[156] = go + nk(e.type)),
        e.linkname && H.write(i, e.linkname, 157),
        H.copy(lg, i, ur),
        H.copy(XN, i, hp),
        e.uname && H.write(i, e.uname, 265),
        e.gname && H.write(i, e.gname, 297),
        H.write(i, Ii(e.devmajor || 0, 6), 329),
        H.write(i, Ii(e.devminor || 0, 6), 337),
        s && H.write(i, s, 345),
        H.write(i, Ii(pg(i), 6), 148),
        i);
  };
  Qn.decode = function (e, i, n) {
    let s = e[156] === 0 ? 0 : e[156] - go,
      r = Zn(e, 0, 100, i),
      a = Ci(e, 100, 8),
      o = Ci(e, 108, 8),
      u = Ci(e, 116, 8),
      l = Ci(e, 124, 12),
      c = Ci(e, 136, 12),
      p = ik(s),
      d = e[157] === 0 ? null : Zn(e, 157, 100, i),
      f = Zn(e, 265, 32),
      h = Zn(e, 297, 32),
      m = Ci(e, 329, 8),
      b = Ci(e, 337, 8),
      v = pg(e);
    if (v === 8 * 32) return null;
    if (v !== Ci(e, 148, 8))
      throw new Error('Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?');
    if (QN(e)) e[345] && (r = Zn(e, 345, 155, i) + '/' + r);
    else if (!ek(e)) {
      if (!n) throw new Error('Invalid tar header: unknown format.');
    }
    return (
      s === 0 && r && r[r.length - 1] === '/' && (s = 5),
      {
        name: r,
        mode: a,
        uid: o,
        gid: u,
        size: l,
        mtime: new Date(1e3 * c),
        type: p,
        linkname: d,
        uname: f,
        gname: h,
        devmajor: m,
        devminor: b,
        pax: null,
      }
    );
  };
  function QN(t) {
    return H.equals(lg, t.subarray(ur, ur + 6));
  }
  function ek(t) {
    return H.equals(YN, t.subarray(ur, ur + 6)) && H.equals(JN, t.subarray(hp, hp + 2));
  }
  function tk(t, e, i) {
    return typeof t != 'number' ? i : ((t = ~~t), t >= e ? e : t >= 0 || ((t += e), t >= 0) ? t : 0);
  }
  function ik(t) {
    switch (t) {
      case 0:
        return 'file';
      case 1:
        return 'link';
      case 2:
        return 'symlink';
      case 3:
        return 'character-device';
      case 4:
        return 'block-device';
      case 5:
        return 'directory';
      case 6:
        return 'fifo';
      case 7:
        return 'contiguous-file';
      case 72:
        return 'pax-header';
      case 55:
        return 'pax-global-header';
      case 27:
        return 'gnu-long-link-path';
      case 28:
      case 30:
        return 'gnu-long-path';
    }
    return null;
  }
  function nk(t) {
    switch (t) {
      case 'file':
        return 0;
      case 'link':
        return 1;
      case 'symlink':
        return 2;
      case 'character-device':
        return 3;
      case 'block-device':
        return 4;
      case 'directory':
        return 5;
      case 'fifo':
        return 6;
      case 'contiguous-file':
        return 7;
      case 'pax-header':
        return 72;
    }
    return 0;
  }
  function ug(t, e, i, n) {
    for (; i < n; i++) if (t[i] === e) return i;
    return n;
  }
  function pg(t) {
    let e = 256;
    for (let i = 0; i < 148; i++) e += t[i];
    for (let i = 156; i < 512; i++) e += t[i];
    return e;
  }
  function Ii(t, e) {
    return (t = t.toString(8)), t.length > e ? KN.slice(0, e) + ' ' : VN.slice(0, e - t.length) + t + ' ';
  }
  function sk(t, e, i) {
    e[i] = 128;
    for (let n = 11; n > 0; n--) (e[i + n] = t & 255), (t = Math.floor(t / 256));
  }
  function rk(t, e, i) {
    t.toString(8).length > 11 ? sk(t, e, i) : H.write(e, Ii(t, 11), i);
  }
  function ak(t) {
    let e;
    if (t[0] === 128) e = !0;
    else if (t[0] === 255) e = !1;
    else return null;
    let i = [],
      n;
    for (n = t.length - 1; n > 0; n--) {
      let a = t[n];
      e ? i.push(a) : i.push(255 - a);
    }
    let s = 0,
      r = i.length;
    for (n = 0; n < r; n++) s += i[n] * Math.pow(256, n);
    return e ? s : -1 * s;
  }
  function Ci(t, e, i) {
    if (((t = t.subarray(e, e + i)), (e = 0), t[e] & 128)) return ak(t);
    {
      for (; e < t.length && t[e] === 32; ) e++;
      let n = tk(ug(t, 32, e, t.length), t.length, t.length);
      for (; e < n && t[e] === 0; ) e++;
      return n === e ? 0 : parseInt(H.toString(t.subarray(e, n)), 8);
    }
  }
  function Zn(t, e, i, n) {
    return H.toString(t.subarray(e, ug(t, 0, e, e + i)), n);
  }
  function dp(t) {
    let e = H.byteLength(t),
      i = Math.floor(Math.log(e) / Math.log(10)) + 1;
    return e + i >= Math.pow(10, i) && i++, e + i + t;
  }
});
var xg = y((BD, mg) => {
  'use strict';
  var { Writable: ok, Readable: ck, getStreamError: dg } = pp(),
    lk = Xu(),
    hg = Wn(),
    es = fp(),
    uk = hg.alloc(0),
    xp = class {
      constructor() {
        (this.buffered = 0), (this.shifted = 0), (this.queue = new lk()), (this._offset = 0);
      }
      push(e) {
        (this.buffered += e.byteLength), this.queue.push(e);
      }
      shiftFirst(e) {
        return this._buffered === 0 ? null : this._next(e);
      }
      shift(e) {
        if (e > this.buffered) return null;
        if (e === 0) return uk;
        let i = this._next(e);
        if (e === i.byteLength) return i;
        let n = [i];
        for (; (e -= i.byteLength) > 0; ) (i = this._next(e)), n.push(i);
        return hg.concat(n);
      }
      _next(e) {
        let i = this.queue.peek(),
          n = i.byteLength - this._offset;
        if (e >= n) {
          let s = this._offset ? i.subarray(this._offset, i.byteLength) : i;
          return this.queue.shift(), (this._offset = 0), (this.buffered -= n), (this.shifted += n), s;
        }
        return (this.buffered -= e), (this.shifted += e), i.subarray(this._offset, (this._offset += e));
      }
    },
    vp = class extends ck {
      constructor(e, i, n) {
        super(), (this.header = i), (this.offset = n), (this._parent = e);
      }
      _read(e) {
        this.header.size === 0 && this.push(null), this._parent._stream === this && this._parent._update(), e(null);
      }
      _predestroy() {
        this._parent.destroy(dg(this));
      }
      _detach() {
        this._parent._stream === this &&
          ((this._parent._stream = null), (this._parent._missing = fg(this.header.size)), this._parent._update());
      }
      _destroy(e) {
        this._detach(), e(null);
      }
    },
    yp = class extends ok {
      constructor(e) {
        super(e),
          e || (e = {}),
          (this._buffer = new xp()),
          (this._offset = 0),
          (this._header = null),
          (this._stream = null),
          (this._missing = 0),
          (this._longHeader = !1),
          (this._callback = mp),
          (this._locked = !1),
          (this._finished = !1),
          (this._pax = null),
          (this._paxGlobal = null),
          (this._gnuLongPath = null),
          (this._gnuLongLinkPath = null),
          (this._filenameEncoding = e.filenameEncoding || 'utf-8'),
          (this._allowUnknownFormat = !!e.allowUnknownFormat),
          (this._unlockBound = this._unlock.bind(this));
      }
      _unlock(e) {
        if (((this._locked = !1), e)) {
          this.destroy(e), this._continueWrite(e);
          return;
        }
        this._update();
      }
      _consumeHeader() {
        if (this._locked) return !1;
        this._offset = this._buffer.shifted;
        try {
          this._header = es.decode(this._buffer.shift(512), this._filenameEncoding, this._allowUnknownFormat);
        } catch (e) {
          return this._continueWrite(e), !1;
        }
        if (!this._header) return !0;
        switch (this._header.type) {
          case 'gnu-long-path':
          case 'gnu-long-link-path':
          case 'pax-global-header':
          case 'pax-header':
            return (this._longHeader = !0), (this._missing = this._header.size), !0;
        }
        return (
          (this._locked = !0),
          this._applyLongHeaders(),
          this._header.size === 0 || this._header.type === 'directory'
            ? (this.emit('entry', this._header, this._createStream(), this._unlockBound), !0)
            : ((this._stream = this._createStream()),
              (this._missing = this._header.size),
              this.emit('entry', this._header, this._stream, this._unlockBound),
              !0)
        );
      }
      _applyLongHeaders() {
        this._gnuLongPath && ((this._header.name = this._gnuLongPath), (this._gnuLongPath = null)),
          this._gnuLongLinkPath && ((this._header.linkname = this._gnuLongLinkPath), (this._gnuLongLinkPath = null)),
          this._pax &&
            (this._pax.path && (this._header.name = this._pax.path),
            this._pax.linkpath && (this._header.linkname = this._pax.linkpath),
            this._pax.size && (this._header.size = parseInt(this._pax.size, 10)),
            (this._header.pax = this._pax),
            (this._pax = null));
      }
      _decodeLongHeader(e) {
        switch (this._header.type) {
          case 'gnu-long-path':
            this._gnuLongPath = es.decodeLongPath(e, this._filenameEncoding);
            break;
          case 'gnu-long-link-path':
            this._gnuLongLinkPath = es.decodeLongPath(e, this._filenameEncoding);
            break;
          case 'pax-global-header':
            this._paxGlobal = es.decodePax(e);
            break;
          case 'pax-header':
            this._pax =
              this._paxGlobal === null ? es.decodePax(e) : Object.assign({}, this._paxGlobal, es.decodePax(e));
            break;
        }
      }
      _consumeLongHeader() {
        (this._longHeader = !1), (this._missing = fg(this._header.size));
        let e = this._buffer.shift(this._header.size);
        try {
          this._decodeLongHeader(e);
        } catch (i) {
          return this._continueWrite(i), !1;
        }
        return !0;
      }
      _consumeStream() {
        let e = this._buffer.shiftFirst(this._missing);
        if (e === null) return !1;
        this._missing -= e.byteLength;
        let i = this._stream.push(e);
        return this._missing === 0
          ? (this._stream.push(null), i && this._stream._detach(), i && this._locked === !1)
          : i;
      }
      _createStream() {
        return new vp(this, this._header, this._offset);
      }
      _update() {
        for (; this._buffer.buffered > 0 && !this.destroying; ) {
          if (this._missing > 0) {
            if (this._stream !== null) {
              if (this._consumeStream() === !1) return;
              continue;
            }
            if (this._longHeader === !0) {
              if (this._missing > this._buffer.buffered) break;
              if (this._consumeLongHeader() === !1) return !1;
              continue;
            }
            let e = this._buffer.shiftFirst(this._missing);
            e !== null && (this._missing -= e.byteLength);
            continue;
          }
          if (this._buffer.buffered < 512) break;
          if (this._stream !== null || this._consumeHeader() === !1) return;
        }
        this._continueWrite(null);
      }
      _continueWrite(e) {
        let i = this._callback;
        (this._callback = mp), i(e);
      }
      _write(e, i) {
        (this._callback = i), this._buffer.push(e), this._update();
      }
      _final(e) {
        (this._finished = this._missing === 0 && this._buffer.buffered === 0),
          e(this._finished ? null : new Error('Unexpected end of data'));
      }
      _predestroy() {
        this._continueWrite(null);
      }
      _destroy(e) {
        this._stream && this._stream.destroy(dg(this)), e(null);
      }
      [Symbol.asyncIterator]() {
        let e = null,
          i = null,
          n = null,
          s = null,
          r = null,
          a = this;
        return (
          this.on('entry', l),
          this.on('error', (d) => {
            e = d;
          }),
          this.on('close', c),
          {
            [Symbol.asyncIterator]() {
              return this;
            },
            next() {
              return new Promise(u);
            },
            return() {
              return p(null);
            },
            throw(d) {
              return p(d);
            },
          }
        );
        function o(d) {
          if (!r) return;
          let f = r;
          (r = null), f(d);
        }
        function u(d, f) {
          if (e) return f(e);
          if (s) {
            d({ value: s, done: !1 }), (s = null);
            return;
          }
          (i = d), (n = f), o(null), a._finished && i && (i({ value: void 0, done: !0 }), (i = n = null));
        }
        function l(d, f, h) {
          (r = h), f.on('error', mp), i ? (i({ value: f, done: !1 }), (i = n = null)) : (s = f);
        }
        function c() {
          o(e), i && (e ? n(e) : i({ value: void 0, done: !0 }), (i = n = null));
        }
        function p(d) {
          return (
            a.destroy(d),
            o(d),
            new Promise((f, h) => {
              if (a.destroyed) return f({ value: void 0, done: !0 });
              a.once('close', function () {
                d ? h(d) : f({ value: void 0, done: !0 });
              });
            })
          );
        }
      }
    };
  mg.exports = function (e) {
    return new yp(e);
  };
  function mp() {}
  function fg(t) {
    return (t &= 511), t && 512 - t;
  }
});
var yg = y((MD, bp) => {
  'use strict';
  var vg = { S_IFMT: 61440, S_IFDIR: 16384, S_IFCHR: 8192, S_IFBLK: 24576, S_IFIFO: 4096, S_IFLNK: 40960 };
  try {
    bp.exports = require('fs').constants || vg;
  } catch {
    bp.exports = vg;
  }
});
var wg = y((qD, Eg) => {
  'use strict';
  var { Readable: pk, Writable: dk, getStreamError: bg } = pp(),
    nn = Wn(),
    ts = yg(),
    _o = fp(),
    hk = 493,
    fk = 420,
    gg = nn.alloc(1024),
    _p = class extends dk {
      constructor(e, i, n) {
        super({ mapWritable: xk, eagerOpen: !0 }),
          (this.written = 0),
          (this.header = i),
          (this._callback = n),
          (this._linkname = null),
          (this._isLinkname = i.type === 'symlink' && !i.linkname),
          (this._isVoid = i.type !== 'file' && i.type !== 'contiguous-file'),
          (this._finished = !1),
          (this._pack = e),
          (this._openCallback = null),
          this._pack._stream === null ? (this._pack._stream = this) : this._pack._pending.push(this);
      }
      _open(e) {
        (this._openCallback = e), this._pack._stream === this && this._continueOpen();
      }
      _continuePack(e) {
        if (this._callback === null) return;
        let i = this._callback;
        (this._callback = null), i(e);
      }
      _continueOpen() {
        this._pack._stream === null && (this._pack._stream = this);
        let e = this._openCallback;
        if (((this._openCallback = null), e !== null)) {
          if (this._pack.destroying) return e(new Error('pack stream destroyed'));
          if (this._pack._finalized) return e(new Error('pack stream is already finalized'));
          (this._pack._stream = this),
            this._isLinkname || this._pack._encode(this.header),
            this._isVoid && (this._finish(), this._continuePack(null)),
            e(null);
        }
      }
      _write(e, i) {
        if (this._isLinkname) return (this._linkname = this._linkname ? nn.concat([this._linkname, e]) : e), i(null);
        if (this._isVoid) return e.byteLength > 0 ? i(new Error('No body allowed for this entry')) : i();
        if (((this.written += e.byteLength), this._pack.push(e))) return i();
        this._pack._drain = i;
      }
      _finish() {
        this._finished ||
          ((this._finished = !0),
          this._isLinkname &&
            ((this.header.linkname = this._linkname ? nn.toString(this._linkname, 'utf-8') : ''),
            this._pack._encode(this.header)),
          _g(this._pack, this.header.size),
          this._pack._done(this));
      }
      _final(e) {
        if (this.written !== this.header.size) return e(new Error('Size mismatch'));
        this._finish(), e(null);
      }
      _getError() {
        return bg(this) || new Error('tar entry destroyed');
      }
      _predestroy() {
        this._pack.destroy(this._getError());
      }
      _destroy(e) {
        this._pack._done(this), this._continuePack(this._finished ? null : this._getError()), e();
      }
    },
    Ep = class extends pk {
      constructor(e) {
        super(e),
          (this._drain = gp),
          (this._finalized = !1),
          (this._finalizing = !1),
          (this._pending = []),
          (this._stream = null);
      }
      entry(e, i, n) {
        if (this._finalized || this.destroying) throw new Error('already finalized or destroyed');
        typeof i == 'function' && ((n = i), (i = null)),
          n || (n = gp),
          (!e.size || e.type === 'symlink') && (e.size = 0),
          e.type || (e.type = mk(e.mode)),
          e.mode || (e.mode = e.type === 'directory' ? hk : fk),
          e.uid || (e.uid = 0),
          e.gid || (e.gid = 0),
          e.mtime || (e.mtime = new Date()),
          typeof i == 'string' && (i = nn.from(i));
        let s = new _p(this, e, n);
        return nn.isBuffer(i) ? ((e.size = i.byteLength), s.write(i), s.end(), s) : (s._isVoid, s);
      }
      finalize() {
        if (this._stream || this._pending.length > 0) {
          this._finalizing = !0;
          return;
        }
        this._finalized || ((this._finalized = !0), this.push(gg), this.push(null));
      }
      _done(e) {
        e === this._stream &&
          ((this._stream = null),
          this._finalizing && this.finalize(),
          this._pending.length && this._pending.shift()._continueOpen());
      }
      _encode(e) {
        if (!e.pax) {
          let i = _o.encode(e);
          if (i) {
            this.push(i);
            return;
          }
        }
        this._encodePax(e);
      }
      _encodePax(e) {
        let i = _o.encodePax({ name: e.name, linkname: e.linkname, pax: e.pax }),
          n = {
            name: 'PaxHeader',
            mode: e.mode,
            uid: e.uid,
            gid: e.gid,
            size: i.byteLength,
            mtime: e.mtime,
            type: 'pax-header',
            linkname: e.linkname && 'PaxHeader',
            uname: e.uname,
            gname: e.gname,
            devmajor: e.devmajor,
            devminor: e.devminor,
          };
        this.push(_o.encode(n)),
          this.push(i),
          _g(this, i.byteLength),
          (n.size = e.size),
          (n.type = e.type),
          this.push(_o.encode(n));
      }
      _doDrain() {
        let e = this._drain;
        (this._drain = gp), e();
      }
      _predestroy() {
        let e = bg(this);
        for (this._stream && this._stream.destroy(e); this._pending.length; ) {
          let i = this._pending.shift();
          i.destroy(e), i._continueOpen();
        }
        this._doDrain();
      }
      _read(e) {
        this._doDrain(), e();
      }
    };
  Eg.exports = function (e) {
    return new Ep(e);
  };
  function mk(t) {
    switch (t & ts.S_IFMT) {
      case ts.S_IFBLK:
        return 'block-device';
      case ts.S_IFCHR:
        return 'character-device';
      case ts.S_IFDIR:
        return 'directory';
      case ts.S_IFIFO:
        return 'fifo';
      case ts.S_IFLNK:
        return 'symlink';
    }
    return 'file';
  }
  function gp() {}
  function _g(t, e) {
    (e &= 511), e && t.push(gg.subarray(0, 512 - e));
  }
  function xk(t) {
    return nn.isBuffer(t) ? t : nn.from(t);
  }
});
var Sg = y((wp) => {
  'use strict';
  wp.extract = xg();
  wp.pack = wg();
});
function Og(t, e) {
  return new Rp(t, e);
}
async function Cg(t, e, i, n) {
  let s = (0, pr.pack)(),
    r = (0, de.join)(e, t),
    a = [];
  s.entry({ name: (0, de.join)(t, 'outputs'), type: 'directory' }),
    await Ng(r, (l) => {
      a.push(l);
    });
  let o = a.map(async (l) => {
      let c = (0, de.join)(r, l),
        p = await (0, is.readFile)(c);
      return { path: (0, de.join)(t, 'outputs', l), fileContents: p };
    }),
    u = [
      { path: (0, de.join)(t, 'terminalOutput'), fileContents: i },
      { path: (0, de.join)(t, 'code'), fileContents: n.toString() },
      ...(await Promise.all(o)),
    ];
  for (let { path: l, fileContents: c } of u) s.entry({ name: l }, c);
  return s.finalize(), s;
}
async function Ig(t, e) {
  let i = (0, pr.pack)();
  return i.entry({ name: (0, de.join)('terminalOutputs', t) }, e), i.finalize(), i;
}
async function Ng(t, e) {
  let i = await (0, is.readdir)(t);
  await Promise.all(
    i.map(async (n) => {
      let s = (0, de.join)(t, n);
      (await (0, is.stat)(s)).isDirectory()
        ? await Ng(s, (a) => {
            e((0, de.join)(n, a));
          })
        : e(n);
    })
  );
}
var Rg,
  Sp,
  is,
  Tg,
  de,
  pr,
  Rp,
  kg = ce(() => {
    'use strict';
    (Rg = require('fs')),
      (Sp = Tt(wb())),
      (is = require('fs/promises')),
      (Tg = require('stream')),
      (de = require('path')),
      (pr = Tt(Sg()));
    Rp = class extends Tg.Transform {
      constructor(i, n) {
        super();
        this.destination = i;
        this.hash = n;
        this.tarExtractStream = (0, pr.extract)();
        this.outputFiles = [];
        this.terminalOutput = '';
        this.finished = new Promise((i) => {
          this.finish = i;
        });
        this.setupListeners();
      }
      setupListeners() {
        this.on('finish', () => {
          var i;
          (i = this.finish) == null || i.call(this);
        }),
          this.tarExtractStream.on('entry', (i, n, s) => {
            if (
              i.name === 'terminalOutput' ||
              i.name === (0, de.join)(this.hash, 'terminalOutput') ||
              i.name === (0, de.join)('terminalOutputs', this.hash) ||
              i.name === (0, de.join)(this.hash, 'terminalOutputs')
            )
              n.on('data', (r) => {
                this.terminalOutput += r;
              }),
                n.on('end', () => {
                  s();
                });
            else if (i.name === 'code' || i.name === (0, de.join)(this.hash, 'code')) {
              let r = '';
              n.on('data', (a) => {
                r += a;
              }),
                n.on('end', () => {
                  (this.code = +r), s();
                });
            } else
              this.outputFiles.push(
                new Promise(async (r) => {
                  let a = i.name,
                    o = (0, de.relative)(a.startsWith(this.hash) ? `${this.hash}/outputs` : 'outputs', a),
                    u = (0, de.join)(this.destination, o);
                  i.type === 'directory'
                    ? (0, Sp.ensureDir)(u).then(() => {
                        r(), s();
                      })
                    : (0, Sp.ensureDir)((0, de.dirname)(u)).then(() => {
                        let l = (0, Rg.createWriteStream)(u);
                        n.pipe(l),
                          n.on('end', () => {
                            s();
                          }),
                          l.on('close', () => {
                            r();
                          });
                      });
                })
              );
          }),
          this.tarExtractStream.on('finish', () => {
            this.emit('finish');
          });
      }
      _transform(i, n, s) {
        this.tarExtractStream.write(i, n) ? s() : this.tarExtractStream.once('drain', s);
      }
      _flush(i) {
        this.tarExtractStream.end(i);
      }
      async getResult() {
        return (
          await this.finished,
          await Promise.all(this.outputFiles),
          { code: this.code, terminalOutput: this.terminalOutput, outputsPath: this.destination }
        );
      }
    };
  });
var Dg = {};
Zt(Dg, { FileStorage: () => Cp });
var Lg,
  Ne,
  dt,
  dr,
  Op,
  Ag,
  hr,
  Eo,
  Tp,
  we,
  Cp,
  Fg = ce(() => {
    'use strict';
    (Lg = require('crypto')), (Ne = require('fs')), (dt = Tt(require('path'))), (dr = require('path'));
    Gr();
    mt();
    Rr();
    (Op = require('stream')), (Ag = require('stream/promises')), (hr = Tt(Iv())), (Eo = require('zlib'));
    kg();
    (Tp = Mc()),
      ({ output: we } = ft()),
      (Cp = class {
        constructor(e, i, n, s) {
          this.encryption = e;
          this.errorReporter = i;
          this.context = s;
          this.storedHashes = [];
          this.axiosConfigBuilder = (e) => e;
          if (n.customProxyConfigPath) {
            let { fileServerProxyConfig: r } = require((0, dr.join)(process.cwd(), n.customProxyConfigPath));
            this.axiosConfigBuilder = r ?? this.axiosConfigBuilder;
          }
        }
        async retrieve(e, i, n, s) {
          process.env.NX_CLOUD_DEBUG_URLS == 'true' &&
            we.note({
              title: `Nx Cloud: Downloading ${e} ${n.fileType}`,
              bodyLines: [`RETRIEVAL URL: ${n.remoteUrl}`],
            });
          try {
            let r = null,
              a = this.createCommitFilePath(e, i, n);
            if (s) {
              let o = this.createFileName(e, i, n);
              await this.extractTarV1(n, o, a);
            } else r = await this.extractTarV2(n, (0, dr.join)(i, e), a, e);
            return this.createCommitFile(a), D && we.note({ title: `Nx Cloud: Downloaded ${e}` }), r;
          } catch (r) {
            let a = r.message || r.toString(),
              o;
            throw (
              (a.includes('zlib') || a.includes('gzip') || a.includes('TAR_BAD_ARCHIVE') || a.includes('header')
                ? (o = `Failed to untar cached artifacts. The artifact may be corrupted. (Reference hash: ${e})`)
                : a.includes('decrypt')
                ? (o = `Failed to decrypt artifact. Please review your encryption key. (Reference hash: ${e})`)
                : (o = `Failed to download cached artifacts. Enable NX_VERBOSE_LOGGING for more details. (Reference hash: ${e})`),
              D &&
                we.note({
                  title: `${o}`,
                  bodyLines: [`- ${r.message}`, `- Affected artifact: ${e} in context ${this.context}.`],
                }),
              (this.context === 'dte-agent' || this.context === 'dte-main') &&
                (we.note({
                  title: `An error occurred while trying to retrieve artifacts in the ${this.context} context. Hash: ${e}.`,
                  bodyLines: [
                    '- Please update the nx-cloud package to the latest version.',
                    '- Please update the nx package to 15.8.9 or higher. You can do it without updating the plugins.',
                    '- If you are not able to update the nx package, and you are passing --configuration to a run-many or an affected command, define that configuration for all the projects.',
                  ],
                }),
                process.env.NX_CLOUD_DEBUG_URLS == 'true' && we.note({ title: `URL: ${e}` })),
              await this.errorReporter.reportError(o),
              new Error(o))
            );
          }
        }
        async store(e, i, n, s, r = !0) {
          D && we.note({ title: `Nx Cloud: Storing ${e} with storeV1` }),
            process.env.NX_CLOUD_DEBUG_URLS == 'true' &&
              we.note({ title: `Nx Cloud: Storing ${e} ${s.join(', ')}`, bodyLines: [`STORAGE URL: ${n.remoteUrl}`] });
          let a = await this.createTarFile(e, i, s, n);
          await this.uploadFile(n.remoteUrl, a),
            r && this.storedHashes.push(e),
            D && we.note({ title: `Nx Cloud: Stored ${e} ${s.join(', ')}` });
        }
        async storeV2(e, i, n, s, r, a = !0) {
          D && we.note({ title: `Nx Cloud: Storing ${e} with storeV2` });
          let o = [];
          n.fileType === 'artifact'
            ? (o = [(0, dr.join)(i, e, 'outputs')])
            : (o = [(0, dr.join)(i, 'terminalOutput', e)]),
            process.env.NX_CLOUD_DEBUG_URLS == 'true' &&
              we.note({ title: `Nx Cloud: Storing ${e} ${o.join(', ')}`, bodyLines: [`STORAGE URL: ${n.remoteUrl}`] });
          let u;
          n.fileType === 'artifact' ? (u = await Cg(e, i, s, r)) : (u = await Ig(e, s));
          let l = u
            .pipe((0, Eo.createGzip)())
            .pipe(
              this.encryption.hasEncryption() && n.fileType === 'artifact'
                ? this.encryption.encryptFileStream()
                : new Op.PassThrough()
            );
          await this.uploadFileStream(n.remoteUrl, l),
            a && this.storedHashes.push(e),
            D && we.note({ title: `Nx Cloud: Stored ${e} ${o.join(', ')}` });
        }
        createFileName(e, i, n) {
          switch (n.fileType) {
            case 'artifact':
              return dt.join(i, `${e}.tar.gz`);
            case 'terminalOutput':
              return dt.join(i, `${e}-logs.tar.gz`);
          }
        }
        async downloadFile(e) {
          let i;
          try {
            let n = new URL(e.remoteUrl),
              s = n.origin + n.pathname,
              r = {};
            for (let [a, o] of n.searchParams.entries()) r[a] = o;
            i = await ot(() =>
              Tp(
                s,
                this.axiosConfigBuilder({
                  method: 'GET',
                  responseType: 'stream',
                  maxContentLength: Fe ? ei : ti,
                  maxBodyLength: Fe ? ei : ti,
                  timeout: Fe ? ki : 6e4,
                  params: r,
                })
              )
            );
          } catch (n) {
            throw n;
          }
          return i;
        }
        async extractTarV1(e, i, n) {
          D && we.note({ title: 'FileStorage: Extracting tar file to disk' });
          let s = await this.downloadFile(e);
          if ((0, Ne.existsSync)(i)) {
            let r = 0;
            for (; r++ < 50; ) {
              if ((0, Ne.existsSync)(n)) return;
              await Li(500);
            }
          }
          if (this.encryption.hasEncryption() && e.fileType === 'artifact') {
            await new Promise((a) => {
              s.data.pipe((0, Ne.createWriteStream)(i)).on('close', () => a(null));
            }),
              this.encryption.decryptFile(i);
            let r = (0, Ne.createReadStream)(i).pipe(hr.x({ cwd: dt.dirname(i), sync: !0, noChmod: !0 }));
            return this.convertStreamIntoPromise(r);
          } else {
            let r = s.data.pipe(hr.x({ cwd: dt.dirname(i), sync: !0, noChmod: !0 }));
            return this.convertStreamIntoPromise(r);
          }
        }
        convertStreamIntoPromise(e) {
          return new Promise((i, n) => {
            e.on('error', (s) => {
              s.tarCode === 'TAR_ABORT' && s.message.indexOf('incorrect header check') > -1
                ? (console.warn('FileStorage: Decompression OK, Trailing garbage ignored.'), i(null))
                : n(s);
            }),
              e.on('finish', () => i(null));
          });
        }
        async extractTarV2(e, i, n, s) {
          if ((D && we.note({ title: 'FileStorage: streaming and extracting tar file' }), (0, Ne.existsSync)(n)))
            return (
              D &&
                we.note({ title: `FileStorage: Commit file found for ${n}`, bodyLines: ['Skipping download stream'] }),
              null
            );
          let r = await this.downloadFile(e),
            a = Og(i, s);
          return (
            await (0, Ag.pipeline)(
              r.data,
              this.encryption.hasEncryption() && e.fileType === 'artifact'
                ? this.encryption.decryptFileStream()
                : new Op.PassThrough(),
              (0, Eo.createGunzip)(),
              a
            ),
            a.getResult()
          );
        }
        createCommitFile(e) {
          (0, Ne.writeFileSync)(e, 'true');
        }
        createCommitFilePath(e, i, n) {
          return n.fileType === 'terminalOutput'
            ? dt.join(i, 'terminalOutputs', `${e}.commit`)
            : dt.join(i, `${e}.commit`);
        }
        async createTarFile(e, i, n, s) {
          let r = this.createFileName(e, i, s);
          try {
            (0, Ne.unlinkSync)(dt.join(i, e, 'source'));
          } catch {}
          return (
            (0, Ne.existsSync)(dt.join(i, e, 'terminalOutput')) ||
              (D &&
                we.note({
                  title: `FileStorage: terminalOutput does not exist. Creating terminalOutput directory for ${e}`,
                }),
              (0, Ne.writeFileSync)(dt.join(i, e, 'terminalOutput'), 'No terminal output.')),
            hr.c({ gzip: !0, sync: !0, file: r, cwd: i }, n),
            this.encryption.hasEncryption() && s.fileType === 'artifact' && this.encryption.encryptFile(r),
            r
          );
        }
        async uploadFile(e, i) {
          process.env.NX_CLOUD_ECONNABORTED_LOGGING == 'true' &&
            we.note({ title: `Attempting to upload file with path: ${i}` });
          let n = (0, Ne.readFileSync)(i),
            s = this.generateMD5(n),
            r = this.getFileUploadHeaders(e, s);
          try {
            let a = await ot(() =>
              Tp(
                e,
                this.axiosConfigBuilder({
                  method: 'PUT',
                  data: n,
                  headers: r,
                  maxContentLength: Fe ? ei : ti,
                  maxBodyLength: Fe ? ei : ti,
                  timeout: Fe ? ki : 12e4,
                })
              )
            );
          } catch (a) {
            if (a.message && a.message.includes('RetentionPolicyNotMet')) return;
            throw a;
          }
        }
        async uploadFileStream(e, i) {
          process.env.NX_CLOUD_ECONNABORTED_LOGGING == 'true' &&
            we.note({ title: `Attempting to upload file with path: ${i}` });
          let n = this.getFileUploadHeaders(e, '');
          try {
            let s = await ot(() =>
              Tp(
                e,
                this.axiosConfigBuilder({
                  method: 'PUT',
                  data: i,
                  headers: { ...n, 'Transfer-Encoding': 'chunked' },
                  maxContentLength: Fe ? ei : ti,
                  maxBodyLength: Fe ? ei : ti,
                  timeout: Fe ? ki : 12e4,
                })
              )
            );
          } catch (s) {
            if (s.message && s.message.includes('RetentionPolicyNotMet')) return;
            throw s;
          }
        }
        generateMD5(e) {
          let i = (0, Lg.createHash)('md5');
          return i.update(e), i.digest('base64');
        }
        getFileUploadHeaders(e, i) {
          let n = e.includes('/file/'),
            s = { 'Content-Type': 'application/octet-stream', 'x-ms-blob-type': 'BlockBlob' };
          return n && (s['Content-MD5'] = i), s;
        }
      });
  });
var Ip = y((XD, Pg) => {
  'use strict';
  var vk = require('crypto');
  Pg.exports = function () {
    return vk.randomBytes(16);
  };
});
var Np = y((YD, Bg) => {
  'use strict';
  var Ug = [];
  for (fr = 0; fr < 256; ++fr) Ug[fr] = (fr + 256).toString(16).substr(1);
  var fr;
  function yk(t, e) {
    var i = e || 0,
      n = Ug;
    return [
      n[t[i++]],
      n[t[i++]],
      n[t[i++]],
      n[t[i++]],
      '-',
      n[t[i++]],
      n[t[i++]],
      '-',
      n[t[i++]],
      n[t[i++]],
      '-',
      n[t[i++]],
      n[t[i++]],
      '-',
      n[t[i++]],
      n[t[i++]],
      n[t[i++]],
      n[t[i++]],
      n[t[i++]],
      n[t[i++]],
    ].join('');
  }
  Bg.exports = yk;
});
var jg = y((JD, qg) => {
  'use strict';
  var bk = Ip(),
    gk = Np(),
    Mg,
    kp,
    Lp = 0,
    Ap = 0;
  function _k(t, e, i) {
    var n = (e && i) || 0,
      s = e || [];
    t = t || {};
    var r = t.node || Mg,
      a = t.clockseq !== void 0 ? t.clockseq : kp;
    if (r == null || a == null) {
      var o = bk();
      r == null && (r = Mg = [o[0] | 1, o[1], o[2], o[3], o[4], o[5]]),
        a == null && (a = kp = ((o[6] << 8) | o[7]) & 16383);
    }
    var u = t.msecs !== void 0 ? t.msecs : new Date().getTime(),
      l = t.nsecs !== void 0 ? t.nsecs : Ap + 1,
      c = u - Lp + (l - Ap) / 1e4;
    if (
      (c < 0 && t.clockseq === void 0 && (a = (a + 1) & 16383),
      (c < 0 || u > Lp) && t.nsecs === void 0 && (l = 0),
      l >= 1e4)
    )
      throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    (Lp = u), (Ap = l), (kp = a), (u += 122192928e5);
    var p = ((u & 268435455) * 1e4 + l) % 4294967296;
    (s[n++] = (p >>> 24) & 255), (s[n++] = (p >>> 16) & 255), (s[n++] = (p >>> 8) & 255), (s[n++] = p & 255);
    var d = ((u / 4294967296) * 1e4) & 268435455;
    (s[n++] = (d >>> 8) & 255),
      (s[n++] = d & 255),
      (s[n++] = ((d >>> 24) & 15) | 16),
      (s[n++] = (d >>> 16) & 255),
      (s[n++] = (a >>> 8) | 128),
      (s[n++] = a & 255);
    for (var f = 0; f < 6; ++f) s[n + f] = r[f];
    return e || gk(s);
  }
  qg.exports = _k;
});
var Gg = y((ZD, zg) => {
  'use strict';
  var Ek = Ip(),
    wk = Np();
  function Sk(t, e, i) {
    var n = (e && i) || 0;
    typeof t == 'string' && ((e = t === 'binary' ? new Array(16) : null), (t = null)), (t = t || {});
    var s = t.random || (t.rng || Ek)();
    if (((s[6] = (s[6] & 15) | 64), (s[8] = (s[8] & 63) | 128), e)) for (var r = 0; r < 16; ++r) e[n + r] = s[r];
    return e || wk(s);
  }
  zg.exports = Sk;
});
var Wg = y((QD, $g) => {
  'use strict';
  var Rk = jg(),
    Hg = Gg(),
    Dp = Hg;
  Dp.v1 = Rk;
  Dp.v4 = Hg;
  $g.exports = Dp;
});
async function Fp() {
  let t = Ok();
  D && console.log('[Nx Cloud Debug] Attempting to acquire filesystem lock with path: ', t);
  try {
    (0, Xt.mkdirSync)(t), D && console.log('[Nx Cloud Debug] Successfully created folder lock at path:', t);
  } catch {
    return D && console.log('[Nx Cloud Debug] Failed to create folder lock at path:', t), await Ck(t);
  }
  return Yg(t);
}
function Ok() {
  return (0, wo.join)((0, Vg.tmpdir)(), 'client-instance-id.lock');
}
function Yg(t) {
  try {
    D && console.log('[Nx Cloud Debug] Attempting to write client instance id into lockfile');
    let e = Kg.default.v4();
    return (
      (0, Xt.writeFileSync)((0, wo.join)(t, Xg), e, { encoding: 'utf-8' }),
      D && console.log('[Nx Cloud Debug] Successfully wrote client instance id into lockfile'),
      e
    );
  } catch {
    throw new Error('Skipped writing client instance id into lockfile');
  }
}
async function Ck(t) {
  try {
    let e = (0, wo.join)(t, Xg);
    return (0, Xt.existsSync)(e) || (await Li(250), (0, Xt.existsSync)(e) || Yg(t)), (0, Xt.readFileSync)(e, 'utf-8');
  } catch {
    return D && console.log('[Nx Cloud Debug] Failed to read client id lockfile, returning default value'), Tk;
  }
}
var Xt,
  Vg,
  wo,
  Kg,
  Xg,
  Tk,
  Jg = ce(() => {
    'use strict';
    (Xt = require('fs')), (Vg = require('os')), (wo = require('path')), (Kg = Tt(Wg()));
    mt();
    Rr();
    (Xg = 'client-instance-id.uuid'), (Tk = '00000000-0000-0000-0000-000000000000');
  });
function e_() {
  return Math.floor(Math.random() * 100) + 1 <= (_r ? 100 : Ik) ? Nk() : null;
}
function Nk() {
  try {
    let t = (0, Zg.execSync)('git log --since="30 days ago" --format="%ae %an"', {
        stdio: 'pipe',
        windowsHide: !0,
        encoding: 'utf-8',
      }).trim().split(`
`),
      e = Array.from(new Set(t)),
      i = {};
    for (let s of e) {
      let [r, ...a] = s.split(' '),
        o = kk(r);
      i[o] || (i[o] = a.join(' '));
    }
    let n = {};
    for (let [s, r] of Object.entries(i)) n[r] || (n[r] = s);
    return Object.values(n);
  } catch {
    return null;
  }
}
function kk(t) {
  let e = (0, Qg.createHash)('md5');
  return e.update(t), e.digest('base64');
}
var Zg,
  Qg,
  Ik,
  t_ = ce(() => {
    'use strict';
    (Zg = require('child_process')), (Qg = require('crypto'));
    mt();
    Ik = 5;
  });
function n_(t) {
  if (t == null) return null;
  let e = Buffer.from(t),
    i = (0, i_.createHash)('sha256');
  return i.update(e), i.digest('hex');
}
var i_,
  s_ = ce(() => {
    'use strict';
    i_ = require('crypto');
  });
function Pp() {
  for (let t of Object.values(Lk))
    if (t.detectorFn(process.env)) {
      let e = t.contextRetrieverFn(process.env);
      return D && console.log(JSON.stringify(e, null, 2)), e;
    }
  return D && console.log('[Nx Cloud] Unable to detect a VCS context from the environment.'), null;
}
function Ak(t) {
  return t.CIRCLECI === 'true';
}
function Dk(t) {
  D && console.log('[Nx Cloud] Detected Env: CircleCI');
  let e = (n) => {
      if (n.CIRCLE_PR_NUMBER !== void 0) return n.CIRCLE_PR_NUMBER;
      if (n.CIRCLE_PULL_REQUEST !== void 0) {
        let s = n.CIRCLE_PULL_REQUEST.split('/');
        return s[s.length - 1];
      }
      return n.CIRCLE_BRANCH !== void 0 ? n.CIRCLE_BRANCH : 'unknown';
    },
    i = (n) => (n.CIRCLE_USERNAME !== void 0 ? n.CIRCLE_USERNAME : n.CIRCLE_PR_USERNAME ? n.CIRCLE_PR_USERNAME : null);
  return {
    branch: e(t),
    ref: t.CIRCLE_BRANCH ?? null,
    title: sn(),
    headSha: t.CIRCLE_SHA1 ?? 'unknown',
    baseSha: null,
    commitLink: t.CIRCLE_PULL_REQUEST ?? null,
    author: i(t),
    authorUrl: null,
    authorAvatarUrl: null,
    repositoryUrl: t.CIRCLE_REPOSITORY_URL ?? null,
    platformName: 'CIRCLE_CI',
  };
}
function Fk(t) {
  return t.TRAVIS === 'true';
}
function Pk(t) {
  return (
    D && console.log('[Nx Cloud] Detected Env: TravisCI'),
    {
      branch: ((i) => (i.TRAVIS_EVENT_TYPE === 'pull_request' ? i.TRAVIS_PULL_REQUEST : i.TRAVIS_BRANCH))(t),
      ref: null,
      title: sn(),
      headSha: t.TRAVIS_COMMIT ?? 'unknown',
      baseSha: null,
      commitLink: null,
      author: Up(),
      authorUrl: null,
      authorAvatarUrl: null,
      repositoryUrl: null,
      platformName: 'TRAVIS_CI',
    }
  );
}
function Uk(t) {
  return t.GITHUB_ACTIONS === 'true';
}
function Bk(t) {
  D && console.log('[Nx Cloud] Detected Env: GitHub Actions');
  let e = (s) => {
      if (s.GITHUB_REF) {
        let r = s.GITHUB_REF.match(/refs\/pull\/(\d+)\/merge/);
        if (r) return r[1];
      }
      return s.GITHUB_HEAD_REF ? s.GITHUB_HEAD_REF : s.GITHUB_REF_NAME ? s.GITHUB_REF_NAME : 'unknown';
    },
    i = (s) => {
      let r = `${s.GITHUB_SERVER_URL}/${s.GITHUB_REPOSITORY}`;
      return s.GITHUB_EVENT_NAME === 'pull_request' ? `${r}/pull/${e(s)}` : `${r}/commit/${s.GITHUB_SHA}`;
    },
    n = (s) => (s.GITHUB_HEAD_REF ? s.GITHUB_HEAD_REF : s.GITHUB_REF ? s.GITHUB_REF : null);
  return {
    branch: e(t),
    ref: n(t),
    title: sn(),
    headSha: t.GITHUB_SHA ?? 'unknown',
    baseSha: null,
    commitLink: i(t),
    author: t.GITHUB_ACTOR ?? null,
    authorUrl: `${t.GITHUB_SERVER_URL}/${t.GITHUB_ACTOR}`,
    authorAvatarUrl: `${t.GITHUB_SERVER_URL}/${t.GITHUB_ACTOR}.png`,
    repositoryUrl: `${t.GITHUB_SERVER_URL}/${t.GITHUB_REPOSITORY}`,
    platformName: 'GITHUB_ACTIONS',
  };
}
function Mk(t) {
  return t.BITBUCKET_BUILD_NUMBER != null;
}
function qk(t) {
  return (
    D && console.log('[Nx Cloud] Detected Env: BitBucket Pipelines'),
    {
      branch: t.BITBUCKET_PR_ID ?? t.BITBUCKET_BRANCH ?? 'unknown',
      ref: null,
      title: sn(),
      headSha: t.BITBUCKET_COMMIT ?? 'unknown',
      baseSha: null,
      commitLink: null,
      author: Up(),
      authorUrl: null,
      authorAvatarUrl: null,
      repositoryUrl: t.BITBUCKET_GIT_HTTP_ORIGIN ?? null,
      platformName: 'BITBUCKET_PIPELINES',
    }
  );
}
function jk(t) {
  return t.BUILD_BUILDID !== void 0 && t.AGENT_NAME !== void 0;
}
function zk(t) {
  return (
    D && console.log('[Nx Cloud] Detected Env: Azure DevOps'),
    {
      branch: t.SYSTEM_PULLREQUEST_PULLREQUESTNUMBER ?? t.BUILD_SOURCEBRANCHNAME ?? 'unknown',
      ref: null,
      title: sn(),
      headSha: on() ?? 'unknown',
      baseSha: null,
      commitLink: null,
      author: t.BUILD_REQUESTEDFOR ?? null,
      authorUrl: null,
      authorAvatarUrl: null,
      repositoryUrl: t.SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI ?? t.BUILD_REPOSITORY_URI ?? null,
      platformName: 'AZURE_DEVOPS',
    }
  );
}
function Gk(t) {
  return t.GITLAB_CI === 'true';
}
function Hk(t) {
  return (
    D && console.log('[Nx Cloud] Detected Env: GitLab Pipelines'),
    {
      branch: ((i) =>
        i.CI_MERGE_REQUEST_IID ? i.CI_MERGE_REQUEST_IID : i.CI_COMMIT_BRANCH ? i.CI_COMMIT_BRANCH : 'unknown')(t),
      ref: t.CI_COMMIT_REF_NAME ?? null,
      title: sn(),
      headSha: on() ?? 'unknown',
      baseSha: null,
      commitLink: null,
      author: t.GITLAB_USER_NAME ?? null,
      authorUrl: null,
      authorAvatarUrl: null,
      repositoryUrl: t.CI_REPOSITORY_URL ?? null,
      platformName: 'GITLAB_PIPELINES',
    }
  );
}
function $k(t) {
  return t.NX_CLOUD_VERSION != null && t.NX_CLOUD_VERSION !== '';
}
function Wk(t) {
  return (
    D && console.log('[Nx Cloud] Detected Env: Nx Cloud'),
    {
      branch: Vk() ?? 'unknown',
      ref: Kk(),
      title: sn(),
      headSha: on() ?? 'unknown',
      baseSha: null,
      commitLink: null,
      author: Up(),
      authorUrl: null,
      authorAvatarUrl: null,
      repositoryUrl: null,
      platformName: 'NX_CLOUD',
    }
  );
}
function sn() {
  try {
    return (0, mr.execSync)('git log -1 --pretty=%B', { encoding: 'utf-8' }).trim();
  } catch {
    return null;
  }
}
function Up() {
  try {
    return (0, mr.execSync)('git log -1 --pretty=%aN', { encoding: 'utf-8' }).trim();
  } catch {
    return null;
  }
}
function Vk() {
  try {
    return (0, mr.execSync)('git branch --show-current', { encoding: 'utf-8' }).trim();
  } catch {
    return null;
  }
}
function Kk() {
  try {
    return (0, mr.execSync)('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  } catch {
    return null;
  }
}
var mr,
  Lk,
  r_ = ce(() => {
    'use strict';
    mr = require('child_process');
    mt();
    Lk = {
      CIRCLE_CI: { detectorFn: Ak, contextRetrieverFn: Dk },
      TRAVIS_CI: { detectorFn: Fk, contextRetrieverFn: Pk },
      GITHUB_ACTIONS: { detectorFn: Uk, contextRetrieverFn: Bk },
      BITBUCKET_PIPELINES: { detectorFn: Mk, contextRetrieverFn: qk },
      AZURE_DEVOPS: { detectorFn: jk, contextRetrieverFn: zk },
      GITLAB_PIPELINES: { detectorFn: Gk, contextRetrieverFn: Hk },
      NX_CLOUD: { detectorFn: $k, contextRetrieverFn: Wk },
    };
  });
function a_(t) {
  if (!t) return null;
  let e = {};
  Object.entries(t.nodes).forEach(([n, s]) => {
    s.type !== 'npm' &&
      (e[n] = {
        type: s.type,
        name: s.name,
        data: { root: s.data.root, sourceRoot: s.data.sourceRoot, metadata: s.data.metadata, targets: s.data.targets },
      });
  });
  let i = {};
  return (
    Object.entries(t.dependencies).forEach(([n, s]) => {
      n.startsWith('npm:') || (i[n] = s);
    }),
    { nodes: e, dependencies: i }
  );
}
var o_ = ce(() => {
  'use strict';
});
var p_ = {};
Zt(p_, { CloudRunApi: () => Bp });
var c_,
  l_,
  u_,
  xr,
  Bp,
  d_ = ce(() => {
    'use strict';
    (c_ = require('fs')), (l_ = require('util')), (u_ = require('zlib'));
    Jg();
    Gr();
    t_();
    s_();
    mt();
    r_();
    o_();
    ({ output: xr } = ft()),
      (Bp = class {
        constructor(e, i, n, s) {
          this.messages = e;
          this.runContext = i;
          this.machineInfo = s;
          (this.apiAxiosInstance = zr(n)),
            process.env.NX_CLOUD_CLIENT_INSTANCE_ID
              ? ((this.clientInstanceId = process.env.NX_CLOUD_CLIENT_INSTANCE_ID),
                (this.clientInstanceSource = 'DTE_AGENT'))
              : (this.clientInstanceSource = 'CLOUD_RUNNER');
        }
        async startRun(e, i) {
          if (this.messages.apiError) return {};
          this.clientInstanceId || (this.clientInstanceId = await Fp());
          try {
            let n = {
              meta: { nxCloudVersion: this.nxCloudVersion() },
              branch: Do(),
              runGroup: Ao(),
              ciExecutionId: Lo(),
              ciExecutionEnv: ls(),
              distributedExecutionId: e,
              hashes: i,
              machineInfo: this.machineInfo,
              vcsContext: Pp(),
              clientInstanceSource: this.clientInstanceSource,
              clientInstanceId: this.clientInstanceId,
            };
            D &&
              xr.note({
                title: 'RunStart',
                bodyLines: [
                  `
` + JSON.stringify(n, null, 2),
                ],
              });
            let s = await zc('RunStart duration', () =>
              ot(() => this.apiAxiosInstance.post('/nx-cloud/v2/runs/start', n))
            );
            return (
              s.data && s.data.message && (this.messages.message = s.data.message),
              !s.data || !s.data.artifacts
                ? ((this.messages.apiError = `Invalid Nx Cloud response: ${JSON.stringify(s.data)}`), {})
                : s.data.artifacts
            );
          } catch (n) {
            return (this.messages.apiError = this.messages.extractErrorMessage(n, 'api')), {};
          }
        }
        createEndRunReqBody(e, i, n, s, r, a) {
          let o = a_(s),
            u = {
              meta: { nxCloudVersion: this.nxCloudVersion(), ...r },
              tasks: i,
              run: e,
              linkId: a,
              ...n,
              projectGraph: o,
              projectGraphSha: o == null ? null : n_(JSON.stringify(o)),
              machineInfo: this.machineInfo,
              vcsContext: Pp(),
              hashedContributors: e_(),
              clientInstanceSource: this.clientInstanceSource,
              clientInstanceId: this.clientInstanceId,
            };
          return JSON.stringify(u);
        }
        async endRun(e, i, n, s, r, a) {
          if (this.messages.apiError) return !1;
          this.clientInstanceId || (this.clientInstanceId = await Fp()), (e.runGroup = null), (e.branch = null);
          let o = this.createEndRunReqBody(e, i, n, s, r, a);
          o.length > 20 * 1e3 * 1e3 &&
            (o = this.createEndRunReqBody(
              e,
              i.map((c) => ({ ...c, hashDetails: void 0 })),
              n,
              s,
              r,
              a
            ));
          let u = Buffer.from(o),
            l = await (0, l_.promisify)(u_.gzip)(u);
          try {
            if (D) {
              let p = i.map((d) => ({
                ...d,
                terminalOutput: d.terminalOutput ? `${d.terminalOutput.slice(0, 20)}...` : void 0,
              }));
              xr.note({
                title: 'RunEnd. Completed tasks',
                bodyLines: [
                  `
` + JSON.stringify(p, null, 2),
                ],
              });
            }
            let c = await zc('RunEnd duration', () =>
              ot(() =>
                this.apiAxiosInstance.post('/nx-cloud/runs/end', l, {
                  headers: {
                    ...this.apiAxiosInstance.defaults.headers,
                    'Content-Encoding': 'gzip',
                    'Content-Type': 'application/octet-stream',
                  },
                })
              )
            );
            if (c) {
              if (c.data && c.data.runUrl && c.data.status === 'success')
                return (this.runContext.runUrl = c.data.runUrl), !0;
              c.data && c.data.status
                ? (this.messages.apiError = `Invalid end run response: ${JSON.stringify(c.data.message)}`)
                : c.data && typeof c.data == 'string'
                ? c.data !== 'success' &&
                  (this.messages.apiError = `Invalid end run response: ${JSON.stringify(c.data)}`)
                : (this.messages.apiError = `Invalid end run response: ${JSON.stringify(c.data)}`),
                D && xr.note({ title: 'Invalid end run response', bodyLines: [JSON.stringify(c.data, null, 2)] });
            } else
              xr.error({
                title: 'Nx Cloud: Unknown Error Occurred',
                bodyLines: [
                  'Run completion responded with `undefined`.',
                  'Run Details:',
                  JSON.stringify(e, null, 2),
                  'Stack Trace:',
                  JSON.stringify(new Error().stack, null, 2),
                ],
              });
            return !1;
          } catch (c) {
            let p = c.axiosException ?? c;
            return (this.messages.apiError = this.messages.extractErrorMessage(p, 'api')), !1;
          }
        }
        async endRunIfWorkspaceNotEnabled() {
          try {
            await ot(() => this.apiAxiosInstance.get('/nx-cloud/runs/workspace-status'));
          } catch (e) {
            xr.error({ title: 'Nx Cloud: Workspace is disabled', bodyLines: e.bodyLines }), process.exit(1);
          }
        }
        async getEndRunSplashMessage() {
          try {
            return this.apiAxiosInstance.get('/nx-cloud/runs/splash').then((e) => e.data);
          } catch {
            return;
          }
        }
        async getWorkspaceSettings() {
          try {
            return this.apiAxiosInstance.get('/nx-cloud/runs/workspace-settings').then((e) => e.data);
          } catch {
            return;
          }
        }
        nxCloudVersion() {
          try {
            let e = JSON.parse((0, c_.readFileSync)('package.json').toString());
            return e.devDependencies['nx-cloud'] || e.devDependencies['@nrwl/nx-cloud'];
          } catch {
            return 'unknown';
          }
        }
      });
  });
var h_ = {};
Zt(h_, { ErrorReporterApi: () => Mp });
var Xk,
  Mp,
  f_ = ce(() => {
    'use strict';
    Gr();
    ({ output: Xk } = ft()),
      (Mp = class {
        constructor(e) {
          this.apiAxiosInstance = zr(e);
        }
        async reportError(e) {
          try {
            await ot(() => this.apiAxiosInstance.post('/nx-cloud/report-client-error', { message: e }));
          } catch (i) {
            Xk.warn({ title: `Unable to record the following error: '${e}'`, bodyLines: [i.message] });
          }
        }
      });
  });
var m_ = {};
Zt(m_, { E2EEncryption: () => qp });
var Yt,
  ss,
  Gp,
  ns,
  So,
  qp,
  jp,
  zp,
  x_ = ce(() => {
    'use strict';
    (Yt = require('crypto')),
      (ss = require('fs')),
      (Gp = require('stream')),
      (ns = 16),
      (So = 'aes-256-cbc'),
      (qp = class {
        constructor(e) {
          e && (this.encryptionKey = this.to32bytes(e));
        }
        to32bytes(e) {
          let i = e;
          for (; i.length < 32; ) i += e;
          return Buffer.from(i).slice(0, 32);
        }
        hasEncryption() {
          return !!this.encryptionKey;
        }
        encryptFile(e) {
          let i = (0, Yt.randomBytes)(ns),
            n = (0, Yt.createCipheriv)(So, this.encryptionKey, i),
            s = (0, ss.readFileSync)(e),
            r = n.update(s),
            a = Buffer.concat([i, r, n.final()]);
          (0, ss.writeFileSync)(e, a);
        }
        encryptFileStream() {
          return new jp(this.encryptionKey);
        }
        decryptFile(e) {
          let i = (0, ss.readFileSync)(e);
          try {
            let n = (0, Yt.createDecipheriv)(So, this.encryptionKey, i.slice(0, ns)),
              s = i.slice(ns),
              r = n.update(s),
              a = Buffer.concat([r, n.final()]);
            (0, ss.writeFileSync)(e, a);
          } catch {
            throw new Error('Could not decrypt the artifact. Please check your encryption key.');
          }
        }
        decryptFileStream() {
          return new zp(this.encryptionKey);
        }
      }),
      (jp = class extends Gp.Transform {
        constructor(i) {
          super();
          this.key = i;
          this.iv = (0, Yt.randomBytes)(ns);
          this.cipher = (0, Yt.createCipheriv)(So, this.key, this.iv);
          this.initialized = !1;
        }
        _transform(i, n, s) {
          try {
            this.initialized || (this.push(this.iv), (this.initialized = !0)), this.push(this.cipher.update(i)), s();
          } catch (r) {
            s(r);
          }
        }
        _flush(i) {
          try {
            this.push(this.cipher.final()), i();
          } catch (n) {
            i(n);
          }
        }
      }),
      (zp = class extends Gp.Transform {
        constructor(i) {
          super();
          this.key = i;
          this.decipher = null;
          this.iv = null;
        }
        _transform(i, n, s) {
          try {
            if (this.iv) this.push(this.decipher.update(i));
            else {
              (this.iv = i.subarray(0, ns)), (this.decipher = (0, Yt.createDecipheriv)(So, this.key, this.iv));
              let r = i.subarray(ns);
              r.length > 0 && this.push(this.decipher.update(r));
            }
            s();
          } catch (r) {
            s(r);
          }
        }
        _flush(i) {
          try {
            this.decipher && this.push(this.decipher.final()), i();
          } catch (n) {
            i(n);
          }
        }
      });
  });
var b_ = {};
Zt(b_, { MessageReporter: () => Wp });
var v_,
  y_,
  Hp,
  $p,
  Wp,
  g_ = ce(() => {
    'use strict';
    (v_ = require('fs')), (y_ = require('path'));
    mt();
    $o();
    ({ output: Hp } = ft()),
      ({ cacheDirectory: $p } = To()),
      (Wp = class {
        constructor(e) {
          this.options = e;
          this.cacheError = null;
          this.apiError = null;
          this.message = null;
          this.isAgentRunningInDte = ko(process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_ID);
        }
        get anyErrors() {
          return this.cacheError || this.apiError;
        }
        printMessages() {
          if (this.anyErrors) {
            let e = [];
            this.cacheError && e.push(`- ${this.cacheError}`),
              this.apiError && this.apiError !== this.cacheError && e.push(`- ${this.apiError}`),
              Hp.warn({ title: 'Nx Cloud Problems', bodyLines: e });
          }
          this.message && Ed(this.message), this.isAgentRunningInDte && this.setErrorMessageForAgent();
        }
        extractErrorMessage(e, i) {
          if (e.code === 'ECONNABORTED')
            return (
              process.env.NX_CLOUD_ECONNABORTED_LOGGING == 'true' &&
                (console.log('[NX CLOUD DEBUG] Request config without `data`'),
                delete e.config.data,
                console.log(JSON.stringify(e.config, null, 2))),
              `Cannot connect to Nx Cloud (scope: ${i}, code: ${e.code}). Try invoking the command with the NX_CLOUD_NO_TIMEOUTS env variable set to 'true'.`
            );
          if (e.code === 'ECONNREFUSED' || e.code === 'EAI_AGAIN' || e.code === 'ENOTFOUND' || e.code === 'EPROTO')
            return `Cannot connect to Nx Cloud (scope: ${i}, code: ${e.code}).`;
          if (e.response && e.response.status === 401)
            return e.response.data.message ? e.response.data.message : e.response.data;
          if (e.response && e.response.status === 402)
            return this.options.showUsageWarnings === !1 || this.options.showUsageWarnings === void 0
              ? null
              : e.response.data.message
              ? e.response.data.message
              : e.response.data;
          {
            let n = '';
            e.response && e.response.data && e.response.data.message
              ? (n = `. ${e.response.data.message}`)
              : e.response && e.response.data && (n = `. ${e.response.data}`);
            let s = e.code ? ` (code: ${e.code})` : '';
            return `${e.message}${n}${s}`;
          }
        }
        setErrorMessageForAgent() {
          let e =
            this.cacheError ||
            this.apiError ||
            'Unexpected failure in agent. If the issue persists, please contact support at cloud-support@nrwl.io';
          if (process.env.NX_CLOUD_INVOKED_WITH_RUN_MANY === 'true') {
            D && Hp.note({ title: `Writing error message to ${$p}`, bodyLines: [e] });
            try {
              let i = (0, y_.join)($p, Fo);
              (0, v_.writeFileSync)(i, e, { encoding: 'utf-8' });
            } catch {
              D && Hp.note({ title: `Failed to write error message to ${$p}` });
            }
          } else Uo(e);
        }
      });
  });
var Yk = {};
Zt(Yk, { default: () => E_ });
module.exports = Qt(Yk);
var __ = require('fs'),
  rn = Tt(require('path'));
function Kp(t, e) {
  let i = {};
  return (
    e.forEach((n) => {
      var o;
      let s = t[n.target.project],
        r = (o = s == null ? void 0 : s.data.metadata) == null ? void 0 : o.targetGroups,
        a = {};
      if (r) for (let [u, l] of Object.entries(r)) l.includes(n.target.target) && l.length > 0 && (a[u] = l);
      a &&
        Object.entries(a).length > 0 &&
        (n.target.project in i
          ? (i[n.target.project].targetGroups = { ...i[n.target.project].targetGroups, ...a })
          : (i[n.target.project] = { targetGroups: a }));
    }),
    { projects: Object.keys(i).length > 0 ? i : null }
  );
}
function Xp(t, e) {
  var o, u, l;
  let i = t[e.projectName],
    n = ((o = i == null ? void 0 : i.data.metadata) == null ? void 0 : o.technologies) || [],
    s = (u = i == null ? void 0 : i.data.targets) == null ? void 0 : u[e.target],
    r = ((l = s == null ? void 0 : s.metadata) == null ? void 0 : l.technologies) || [],
    a = new Set(n.concat(r));
  e.meta = a.size > 0 ? { technologies: Array.from(a) } : null;
}
async function E_(t, e) {
  if (t.lightRunnerResolutionPaths) {
    let { configureLightClientRequire: b } = (os(), Qt(Yp));
    b(t.lightRunnerResolutionPaths);
  }
  let { cacheDirectory: i } = To(),
    { FileStorage: n } = (Fg(), Qt(Dg)),
    { CloudRunApi: s } = (d_(), Qt(p_)),
    { ErrorReporterApi: r } = (f_(), Qt(h_)),
    { E2EEncryption: a } = (x_(), Qt(m_)),
    { getMachineInfo: o } = (mt(), Qt(ld)),
    { MessageReporter: u } = (g_(), Qt(b_)),
    l = new a(t.encryptionKey),
    c = new r(t.runnerOptions),
    p = new n(l, c, t.runnerOptions, 'daemon'),
    d = new u(t.runnerOptions),
    f = {},
    h = o(),
    m = new s(d, f, t.runnerOptions, h);
  return (
    setTimeout(async () => {
      e.log('Uploading file artifacts');
      try {
        await Promise.all(
          t.delayedStoreRequests.map(async (v) => {
            switch (v.cacheFile.fileType) {
              case 'artifact':
                v.terminalOutput != null && v.code != null
                  ? await p.storeV2(v.hash, v.cacheDirectory, v.cacheFile, v.terminalOutput, v.code)
                  : await p.store(v.hash, v.cacheDirectory, v.cacheFile, [
                      rn.join(v.hash, 'outputs'),
                      rn.join(v.hash, 'code'),
                      rn.join(v.hash, 'terminalOutput'),
                    ]);
                break;
              case 'terminalOutput':
                if (v.terminalOutput != null)
                  await p.storeV2(v.hash, v.cacheDirectory, v.cacheFile, v.terminalOutput, v.code ?? 1);
                else {
                  let E = (0, __.existsSync)(rn.join(v.cacheDirectory, 'terminalOutputs', v.hash))
                    ? rn.join('terminalOutputs', v.hash)
                    : rn.join(v.hash, 'terminalOutput');
                  await p.store(v.hash, v.cacheDirectory, v.cacheFile, [E], !1);
                }
                break;
            }
          })
        ),
          e.log('Done uploading file artifacts');
      } catch (v) {
        e.log('Error when uploading file artifacts'), console.log(v);
        return;
      }
      for (let v of p.storedHashes) {
        let E = t.runEnd.taskExecutions.find((g) => g.hash === v);
        if (!E) throw new Error(`Task with hash ${v} isn't recorded`);
        E.uploadedToStorage = !0;
      }
      let b = Kp(t.projectGraph.nodes, t.runEnd.allTasks);
      t.runEnd.taskExecutions.forEach((v) => {
        let E = t.runEnd.allTasks.find((g) => g.hash === v.hash);
        (v.artifactId = E == null ? void 0 : E.artifactId),
          (v.terminalOutputUploadedToFileStorage = (E == null ? void 0 : E.terminalOutputUploadedToFileStorage) ?? !1),
          Xp(t.projectGraph.nodes, v);
      }),
        e.log('Sending EndRun request');
      try {
        if (
          !(await m.endRun(t.runEnd.runData, t.runEnd.taskExecutions, t.ciExecutionContext, void 0, b, t.runEnd.linkId))
        )
          throw new Error(d.apiError);
        e.log('Done sending EndRun request');
      } catch (v) {
        e.log('Error when sending EndRun'), console.log(v);
      }
    }, 0),
    '{}'
  );
}
/*! Bundled license information:

mime-db/index.js:
  (*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

mime-types/index.js:
  (*!
   * mime-types
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
