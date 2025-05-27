var m = Object.defineProperty;
var w = (r, t, e) => t in r ? m(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var o = (r, t, e) => w(r, typeof t != "symbol" ? t + "" : t, e);
class f {
  constructor(t) {
    o(this, "isMicroApp", !1);
    o(this, "globalData");
    o(this, "name");
    this.globalData = t.globalData || {}, this.name = t.name || "", this.isMicroApp = t.isMicroApp || !1;
  }
  getGlobalData() {
    return this.globalData;
  }
  setGlobalData(t) {
    this.globalData = { ...this.globalData, ...t };
  }
  getAppName() {
    return this.name;
  }
}
class p extends f {
  constructor() {
    super({
      isMicroApp: window.__POWERED_BY_QIANKUN__
    });
    o(this, "globalState");
  }
  init(e) {
    var s, a;
    (s = this.globalState) == null || s.setGlobalState(e), this.name = (a = this.globalState) == null ? void 0 : a.name;
  }
  send(e) {
    var a, n;
    const s = { ...e, from: this.name };
    (n = (a = this.globalState) == null ? void 0 : a.setGlobalState) == null || n.call(a, s);
  }
  onMessage(e) {
    var s, a;
    (a = (s = this.globalState) == null ? void 0 : s.onGlobalStateChange) == null || a.call(s, (n) => {
      e(n);
    }, !0);
  }
  offMessage(e) {
    var s, a;
    (a = (s = this.globalState) == null ? void 0 : s.offGlobalStateChange) == null || a.call(s, e);
  }
}
class u extends f {
  constructor() {
    super({
      isMicroApp: window.self !== window.top && !window.__POWERED_BY_QIANKUN__
    });
    o(this, "targetOrigin");
    this.targetOrigin = window.location.origin;
  }
  init(e) {
    console.log("init", e), this.name = e.name;
  }
  send(e) {
    window.parent.postMessage({ ...e, from: this.name }, this.targetOrigin);
  }
  onMessage(e) {
    window.addEventListener("message", (s) => {
      var a;
      typeof s.data == "object" && ((a = s.data) != null && a.type) && e(s.data);
    });
  }
  offMessage(e) {
    window.removeEventListener("message", e);
  }
}
const h = class h {
  constructor() {
    o(this, "qiankunAdapter");
    o(this, "iframeAdapter");
    this.qiankunAdapter = new p(), this.iframeAdapter = new u();
  }
  static getInstance() {
    return this.instance || (this.instance = new h()), this.instance;
  }
  /**
   * 初始化基座通信适配器
   */
  init(t, e) {
    var s, a;
    (s = this.qiankunAdapter) == null || s.init(t), (a = this.iframeAdapter) == null || a.init(e);
  }
  /**
   * 发送消息给所有子应用（iframe和qiankun）
   */
  send(t) {
    var e, s;
    (e = this.qiankunAdapter) == null || e.send(t), (s = this.iframeAdapter) == null || s.send(t);
  }
  /**
   * 监听子应用消息，双向通信
   */
  onMessage(t) {
    var e, s;
    (e = this.qiankunAdapter) == null || e.onMessage(t), (s = this.iframeAdapter) == null || s.onMessage(t);
  }
  /**
   * 取消监听（可选）
   */
  offMessage(t) {
    var e, s, a, n;
    (s = (e = this.qiankunAdapter) == null ? void 0 : e.offMessage) == null || s.call(e, t), (n = (a = this.iframeAdapter) == null ? void 0 : a.offMessage) == null || n.call(a, t);
  }
};
o(h, "instance");
let l = h;
const d = class d {
  constructor() {
  }
  static getInstance() {
    return this.instance || (this.instance = new d()), this.instance;
  }
  createQiankunIntegration() {
    return new p();
  }
  createIframeIntegration() {
    return new u();
  }
  autoCreateIntegration() {
    return window.__POWERED_BY_QIANKUN__ ? this.createQiankunIntegration() : this.createIframeIntegration();
  }
};
o(d, "instance");
let g = d;
var A = /* @__PURE__ */ ((r) => (r.GUserLogin = "g-user-login", r.GUserLogut = "g-user-logout", r.GThemeChange = "g-theme-change", r))(A || {});
const i = class i {
  constructor() {
    o(this, "listeners", /* @__PURE__ */ new Map());
    o(this, "subIframeApp", /* @__PURE__ */ new Map());
  }
  /** 默认单例 */
  static get shared() {
    return this._instance || (this._instance = new i()), this._instance;
  }
  static init() {
    window.addEventListener(
      "message",
      (t) => {
        if (!Array.from(i.shared.subIframeApp.values()).find(
          (n) => n.appAddress === t.origin
        )) {
          console.warn(
            `Blocked message from untrusted origin: ${t.origin}`
          );
          return;
        }
        const { eventName: e, data: s } = t.data, a = i.shared.listeners.get(e);
        e && a && a.forEach((n) => n(s));
      },
      !1
    );
  }
  /** 注册Iframe子应用 */
  static registerSubApp(t, e) {
    i.shared.subIframeApp.has(t) || i.shared.subIframeApp.set(t, e);
  }
  /** 销毁Iframe子应用 */
  static destroySubApp(t) {
    i.shared.subIframeApp.delete(t);
  }
  static on(t, e) {
    const s = i.shared.listeners.get(t);
    return s || i.shared.listeners.set(t, []), i.shared.listeners.set(t, [
      ...s || [],
      e
    ]), this;
  }
  static off(t, e) {
    const s = i.shared.listeners.get(t);
    return s ? (e ? i.shared.listeners.set(
      t,
      (s || []).filter((a) => a !== e)
    ) : i.shared.listeners.set(t, []), i.shared) : this;
  }
  static emit(t, e) {
    const s = i.shared.listeners.get(t);
    return s && s.forEach((a) => {
      a(e);
    }), i.shared;
  }
  static emitToChild(t, e) {
    return i.emit(t, e), i.shared.subIframeApp.forEach((s, a) => {
      const n = document.getElementById(a);
      n.contentWindow && n.contentWindow.postMessage({ eventName: t, data: e }, "*");
    }), i.shared;
  }
  static emitToParent(t, e) {
    return i.emit(t, e), window.parent !== window && window.parent.postMessage({ eventName: t, data: e }, "*"), i.shared;
  }
};
/** 实例 */
o(i, "_instance");
let c = i;
export {
  f as BaseCommAdapter,
  g as IntegrationFactory,
  A as M9MicroEvent,
  c as M9MicroEventBus,
  u as MicroIframeSubAdapter,
  l as MicroMasterAdapter,
  p as MicroQiankunSubAdapter
};
