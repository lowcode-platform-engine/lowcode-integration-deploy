(function (n, i) {
    typeof exports == "object" && typeof module < "u" ? module.exports = i(require("react")) : typeof define == "function" && define.amd ? define(["react"], i) : (n = typeof globalThis < "u" ? globalThis : n || self, n.SchemaTestComponent = i(n.React))
})(this, function (n) {
    "use strict";
    var i = {exports: {}}, o = {};
    /**
     * @license React
     * react-jsx-runtime.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */var _;

    function j() {
        if (_) return o;
        _ = 1;
        var f = n, p = Symbol.for("react.element"), u = Symbol.for("react.fragment"),
            m = Object.prototype.hasOwnProperty,
            x = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
            h = {key: !0, ref: !0, __self: !0, __source: !0};

        function c(s, e, d) {
            var t, l = {}, a = null, v = null;
            d !== void 0 && (a = "" + d), e.key !== void 0 && (a = "" + e.key), e.ref !== void 0 && (v = e.ref);
            for (t in e) m.call(e, t) && !h.hasOwnProperty(t) && (l[t] = e[t]);
            if (s && s.defaultProps) for (t in e = s.defaultProps, e) l[t] === void 0 && (l[t] = e[t]);
            return {$$typeof: p, type: s, key: a, ref: v, props: l, _owner: x.current}
        }

        return o.Fragment = u, o.jsx = c, o.jsxs = c, o
    }

    i.exports = j();
    var r = i.exports;
    return f => {
        const {
            name: p = "测试",
            testColor: u = "red",
            switchVal: m,
            switchVal1: x,
            time1: h,
            time2: c,
            time: s,
            list: e = []
        } = f;
        return r.jsxs("div", {
            children: [r.jsxs("div", {children: ["普通文本: ", p]}), r.jsxs("div", {
                children: ["测试颜色: ", r.jsx("span", {
                    style: {color: u},
                    children: u
                }), " "]
            }), r.jsxs("div", {children: ["普通选择开关: ", m === !0 ? "true" : "false", " "]}), r.jsxs("div", {children: ["普通开关: ", x === !0 ? "true" : "false", " "]}), r.jsxs("div", {children: ["时间: ", s, " "]}), r.jsxs("div", {children: ["时间1: ", h, " "]}), r.jsxs("div", {children: ["时间2: ", c, " "]}), r.jsx("div", {children: "列表:  "}), e.map((d, t) => r.jsxs("div", {children: [d.title, " - ", d.index]}, t))]
        })
    }
});
