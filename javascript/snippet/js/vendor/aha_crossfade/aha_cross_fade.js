
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

    var tmp_nodelist;
    var tmp_node;
    tmp_nodelist = document.querySelectorAll(this.setting.selector + ".active.finish");
    tmp_node = Array.prototype.slice.call(tmp_nodelist,0);
    tmp_node.forEach(function (ele) {
      ele.classList.remove("active");
      ele.classList.remove("finish");
    });

    tmp_nodelist = document.querySelectorAll(this.setting.selector + ".active");
    tmp_node = Array.prototype.slice.call(tmp_nodelist,0);
    tmp_node.forEach(function (ele) {
      ele.classList.add("finish");
    });

    tmp_nodelist = document.querySelectorAll(this.setting.selector + ":nth-of-type(" + next_item + ")");
    tmp_node = Array.prototype.slice.call(tmp_nodelist,0);
    tmp_node.forEach(function (ele) {
      ele.classList.add("active");
    });

  }
  //カウンター
  this.state.counter++;
  //実行
  window.requestAnimationFrame(this.run.bind(this));
};

