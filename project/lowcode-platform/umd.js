(function (t, n) {
    typeof exports == "object" && typeof module < "u" ? module.exports = n(require("react")) : typeof define == "function" && define.amd ? define(["react"], n) : (t = typeof globalThis < "u" ? globalThis : t || self, t.ComponentLoadUmd = n(t.React))
})(this, function (t) {
    "use strict";
    var n = {exports: {}}, o = {};
    /**
     * @license React
     * react-jsx-runtime.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */var f;

    function m() {
        if (f) return o;
        f = 1;
        var l = t, x = Symbol.for("react.element"), a = Symbol.for("react.fragment"),
            R = Object.prototype.hasOwnProperty,
            y = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
            v = {key: !0, ref: !0, __self: !0, __source: !0};

        function p(i, e, d) {
            var r, u = {}, s = null, _ = null;
            d !== void 0 && (s = "" + d), e.key !== void 0 && (s = "" + e.key), e.ref !== void 0 && (_ = e.ref);
            for (r in e) R.call(e, r) && !v.hasOwnProperty(r) && (u[r] = e[r]);
            if (i && i.defaultProps) for (r in e = i.defaultProps, e) u[r] === void 0 && (u[r] = e[r]);
            return {$$typeof: x, type: i, key: s, ref: _, props: u, _owner: y.current}
        }

        return o.Fragment = a, o.jsx = p, o.jsxs = p, o
    }

    n.exports = m();
    var c = n.exports;
    return () => c.jsx("div", {children: "自定义组件"})
});
