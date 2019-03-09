/**
 * 追従ナビ
 */
var Stickynavi = function(setting){
    this.setting = {
        'sticky_body_class': setting.sticky_body_class ? setting.sticky_body_class : "sticky_pc",
        'target': setting.target ? setting.target : "#header",
    };
    this.state = {};
    this.state.offsetTop = document.querySelector(this.setting.target).offsetTop; // 追従させる開始位置Y
    // this.state.$targetparent = $("#stage>.headernav"); // 追従対象の親エレメント //CSSにて指定
};

Stickynavi.prototype.sticky = function(){
    // 指定位置から追従
    if( this.state.offsetTop < this.getScrollTop() ){
        document.getElementsByTagName("body")[0].classList.add(this.setting.sticky_body_class);
    }else{
        document.getElementsByTagName("body")[0].classList.remove(this.setting.sticky_body_class);
    }
};
Stickynavi.prototype.getScrollTop = function() {
    return document.documentElement.scrollTop || document.body.scrollTop;
};
Stickynavi.prototype.updateState = function() {
    // this.state.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
};

Stickynavi.prototype.update = function() {
    this.updateState();
    this.sticky();
};

// イベント登録
Stickynavi.prototype.watch = function(){
    var self = this;

    window.addEventListener( 'scroll',function(){
        self.update();
    }, false);

    window.addEventListener("resize", function(){
        self.update();
    }, false);

    self.update();
};

// 実行
Stickynavi.prototype.run = function() {
    this.watch();
    this.sticky();
};
