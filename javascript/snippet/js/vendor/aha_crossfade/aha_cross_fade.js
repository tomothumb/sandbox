
// requestAnimationFrame の Polyfill
(function (win) {
  var timer = null, polyfill;
  polyfill = function (callback) {
    clearTimeout(timer);
    setTimeout(callback, 1000 / 60);
  };
  win.requestAnimationFrame = win.requestAnimationFrame
      || win.mozRequestAnimationFrame
      || win.webkitRequestAnimationFrame
      || polyfill;
}(window));


var AHA_CrossFade = function (setting) {
  //設定
  this.setting = {
    selector: setting.selector ? setting.selector : "#main_bgs li",
    fade_sec: setting.fade_sec ? setting.fade_sec : 400

  };

  // ステート
  this.state = {
    counter: 0
  };
  this.state.numberOfImage = document.querySelectorAll(this.setting.selector).length;
};


// 監視・実行
AHA_CrossFade.prototype.run = function () {
  if (this.state.counter >= (this.state.numberOfImage * this.setting.fade_sec)) {
    this.state.counter = 0;
  }
  if (this.state.counter % this.setting.fade_sec === 0) {
    next_item = Math.floor(this.state.counter / this.setting.fade_sec) + 1;

    document.querySelectorAll(this.setting.selector + ".active.finish").forEach(function (ele) {
      ele.classList.remove("active", "finish");
    });
    document.querySelectorAll(this.setting.selector + ".active").forEach(function (ele) {
      ele.classList.add("finish");
    });
    document.querySelectorAll(this.setting.selector + ":nth-of-type(" + next_item + ")").forEach(function (ele) {
      ele.classList.add("active");
    });
  }
  //カウンター
  this.state.counter++;
  //実行
  window.requestAnimationFrame(this.run.bind(this));
};

