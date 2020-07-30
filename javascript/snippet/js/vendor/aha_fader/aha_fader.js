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

////////
// AHA Fader VanillaJS
// Class定義
var AHA_Fader = function (setting) {
    //設定
    this.setting = {
        target_selector: setting.target_selector ? setting.target_selector : "#target",
        offset: (undefined != setting.offset) ? setting.offset : 100,
        default_class: setting.default_class ? setting.default_class : "",
        waitTime: setting.waitTime ? setting.waitTime : 100
    };
    // ステート
    this.state = {
        counter: 0,
        scrollY: 0,
        visible: false,
        waitingSec: 0,
        hideable: true,
        keephide: false,
    };
};

// 隠した状態を維持するかどうか
AHA_Fader.prototype.keepHide = function () {
    return this.state.keephide;
};
// 隠しても良いかどうか
AHA_Fader.prototype.isHideable = function () {
    return this.state.hideable;
};
// 常に表示する
AHA_Fader.prototype.show = function () {
    this.state.hideable = false;
    this.state.keephide = false;
    this.execShow();
};
// 常に隠す
AHA_Fader.prototype.hide = function () {
    this.state.hideable = true;
    this.state.keephide = true;
    this.execHide();
};
// 状態をリセットする
AHA_Fader.prototype.restart = function () {
    this.state.hideable = true;
    this.state.keephide = false;

};


// 待機状態であるか
AHA_Fader.prototype.isWating = function () {
    if (this.state.waitingSec > this.setting.waitTime) {
        return true;
    }
    return false;
};

// 表示状態であるか
AHA_Fader.prototype.isVisible = function () {
    return this.state.visible;
};

// 表示しだすスクロール量を越えているか
AHA_Fader.prototype.overScrolled = function () {
    return (this.setting.offset <= window.scrollY)
};

// 表示しても良い状態か
AHA_Fader.prototype.canVisible = function () {
    if (!this.keepHide()
        && this.isWating()
        && !this.isVisible()
        && this.overScrolled()

    ) {
        return true;
    }
    return false;
};

// 隠すべき状態か
AHA_Fader.prototype.shouldHide = function () {
    if (this.isVisible()
        && (!this.isWating() || !this.overScrolled())
        && this.isHideable()
    ) {
        return true;
    }
    return false;
};

// 表示
AHA_Fader.prototype.execShow = function () {
    if (this.canVisible()) {
        this.target_element.classList.add("js-visible");
        this.state.visible = true;
        // console.log("SHOW");
    }
};

// 隠す
AHA_Fader.prototype.execHide = function () {
    if (this.shouldHide()) {
        this.target_element.classList.remove("js-visible");
        this.state.visible = false;
        // console.log("HIDE");
    }
};

// 監視
AHA_Fader.prototype.watch = function () {
    if(!this.overScrolled()){
        this.target_element.classList.add(this.setting.default_class);

    }else{
        this.target_element.classList.remove(this.setting.default_class);

        if (this.state.scrollY === window.scrollY) {
            this.state.waitingSec += 1;
            // console.log(this.state.waitingSec);
            this.execShow()
        } else {
            this.state.scrollY = window.scrollY;
            this.state.waitingSec = 0;
            this.execHide()
        }
    }
    //実行
    window.requestAnimationFrame(this.watch.bind(this));
};

// 実行
AHA_Fader.prototype.run = function () {
    //表示するエレメント登録
    this.target_element = document.querySelector(this.setting.target_selector);
    // 監視
    window.requestAnimationFrame(this.watch.bind(this));
};
