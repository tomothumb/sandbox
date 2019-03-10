var SmoothScroll = function(setting){
    this.init(setting);
};

// 初期設定
SmoothScroll.prototype.init = function(setting) {
    this.setting = {
        'target': setting.target ? setting.target : 'a[rel=scroll]',
        'pc_offset': setting.pc_offset ? setting.pc_offset : 0,
        'sp_offset': setting.sp_offset ? setting.sp_offset : 0,
    };
};

SmoothScroll.prototype.move = function($target) {
    adjustscrollposY = 0;
    // ヘッダ固定によるオフセットが必要な場合
    // if($target.attr("href") != "#header" ) {
    //     this.setting.sp_offset = 50;
    // }
    $('html, body').animate({
            scrollTop: $(( $target.attr("href"))).offset().top - this.setting.pc_offset
        },
        {duration: 400, easing: "swing"}
    );
    return false;
};

SmoothScroll.prototype.watch = function() {
    var self = this;
    $(this.setting.target).on({
        click: function(){
            var $target = $(this);
            self.move($target);
            return false;
        }
    });
};
