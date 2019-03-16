var StickyTOC = function(setting){
    this.__init(setting);
};

// 初期設定
StickyTOC.prototype.__init = function(setting){

    this.setting = {
        'selector': setting.selector ? setting.selector : '.sticky_toc',
        'selector_child': setting.selector_child ? setting.selector_child : 'li',
        'active_class': setting.active_class ? setting.selector : 'js-active',
        'navs': []
    };
    this.__initClickEvent();
};

StickyTOC.prototype.__initClickEvent = function() {
    $(target_selector_str).each(function(){
        var data = $(this).data('side_nav_target');
        var $target = $('#' + data);

        var targetOffsetTop = Math.floor($target.offset().top);
        self.setting.navs.push({
            'offset' : targetOffsetTop,
            '$nav' : $(this),
            '$target' : $target,
        });

        // イベント登録
        $(this).click(function(){
            // スムーズスクロール
            $("html, body").animate({scrollTop: self.setting.navs.offset}, 500, "swing");
            return false;
        })

    });
};

StickyTOC.prototype.__setPosition = function() {
    var self = this;

    tmp_nodelist = this.setting.navs;
    tmp_node = Array.prototype.slice.call(tmp_nodelist,0);

    // this.setting.navs.forEach(function (value, index, array) {
    tmp_node.forEach(function (value, index, array) {
        self.setting.navs[index].offset = Math.floor(value.$target.offset().top);
    });
};

// 監視
StickyTOC.prototype.__watch = function(){
    var self = this;

    var tmp_nodelist;
    var tmp_node;
    tmp_nodelist = this.setting.navs;
    tmp_node = Array.prototype.slice.call(tmp_nodelist,0);

    // this.setting.navs.forEach(function (value, index, array) {
    tmp_node.forEach(function (value, index, array) {
        if($(document).scrollTop() >= value.offset){
            value.$nav
                .addClass(self.setting.active_class)
                .siblings().removeClass(self.setting.active_class);
        }else{
            value.$nav
                .removeClass(self.setting.active_class);
        }
    });
};

// 実行
StickyTOC.prototype.run = function(){
    var self = this;
    $(window).on("scroll",function(){ // スクロール毎にイベントが発火します。
        self.__watch();
    });


    // リサイズ
    var resizeTimer;
    var interval = Math.floor(1000 / 60 * 10);
    window.addEventListener('resize', function (event) {
        if (resizeTimer !== false) {
            clearTimeout(resizeTimer);
        }
        resizeTimer = setTimeout(function () {
            self.__setPosition();
        }, interval);
    });

};
