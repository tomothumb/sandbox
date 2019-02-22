var StickyTOC = function(setting){
    this.init(setting);
};

// 初期設定
StickyTOC.prototype.init = function(setting){

    this.setting = {
        'selector': setting.selector,
        'navs': []
    };

    var self = this;
    $(this.setting.selector).each(function(){
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
            $("html, body").animate({scrollTop: targetOffsetTop}, 500, "swing");
            return false;
        })

    });
};

// 監視
StickyTOC.prototype.watch = function(){
    this.setting.navs.forEach(function (value, index, array) {
        if($(document).scrollTop() >= value.offset){
            value.$nav
                .addClass('active')
                .siblings().removeClass('active');
        }else{
            value.$nav
                .removeClass('active');
        }
    });
};

// 実行
StickyTOC.prototype.run = function(){
    var self = this;
    $(window).on("scroll",function(){ // スクロール毎にイベントが発火します。
        self.watch();
    });

};
