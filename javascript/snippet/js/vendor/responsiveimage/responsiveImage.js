var ResponsiveImage = function (setting) {
    this.init(setting);
    this.changeImg();
};

// 初期設定
ResponsiveImage.prototype.init = function (setting) {
    this.setting = {
        'breakpoint': setting.breakpoint ? setting.breakpoint : 767,
        'target': setting.target ? setting.target : '#responsiveImage',
        'image_pc': setting.image_pc ? setting.image_pc : 'image_pc',
        'image_sp': setting.image_sp ? setting.image_sp : 'image_sp',
    };
    this.state = {};
    this.state.targetEle = document.querySelector('#mv_category');
    this.state.image_pc = this.state.targetEle.dataset.image_pc;
    this.state.image_sp = this.state.targetEle.dataset.image_sp;

};
ResponsiveImage.prototype._isPC = function () {
    return (window.innerWidth > this.setting.breakpoint);
};

ResponsiveImage.prototype._getImageUrl = function () {
    if (this._isPC()) {
        return this.state.image_pc;
    } else if ( this.state.image_sp === "" ) {
        return this.state.image_pc;
    } else {
        return this.state.image_sp;
    }
};

ResponsiveImage.prototype.changeImg = function () {
    this.state.targetEle.style["background-image"] = "url(" + this._getImageUrl() + ")";
};

// 初期設定
ResponsiveImage.prototype.watch = function () {
    var self = this;

    var resizeTimer;
    var interval = Math.floor(1000 / 60 * 10);

    window.addEventListener('resize', function (event) {
        if (resizeTimer !== false) {
            clearTimeout(resizeTimer);
        }
        resizeTimer = setTimeout(function () {
            self.changeImg();
        }, interval);
    });
};
