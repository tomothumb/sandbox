
var CountDownTimer = function(setting){
    this.init(setting);
};

CountDownTimer.prototype.getdoubleDigestNumer = function(number) {
    return ("0" + number).slice(-2)
};

// 初期設定
CountDownTimer.prototype.init = function(setting){

    this.setting = {
        'animate': setting.animate ? setting.animate : true,
        'animate_dulation': setting.animate_dulation ? setting.animate_dulation : 30,
        'goal_time': setting.goal_time ? setting.goal_time : '',
        'selector_number': setting.selector_number ? setting.selector_number : '.countdown_number',
        'selector_outer': setting.selector_outer ? setting.selector_outer : '.countdown_outer',
        'selector_day': setting.selector_day ? setting.selector_day : '.countdown_day',
        'selector_hour': setting.selector_hour ? setting.selector_hour : '.countdown_hour',
        'selector_minute': setting.selector_minute ? setting.selector_minute : '.countdown_minute',
        'selector_second': setting.selector_second ? setting.selector_second : '.countdown_second',
        'selector_separator': setting.selector_separator ? setting.selector_separator : '.countdown_separator',
        'selector_separator_day': setting.selector_separator_day ? setting.selector_separator_day : '.countdown_separator_day',
    };
    this.state = {
        goal_time:0
    };

    var self = this;
    this.setTime(this.setting.goal_time);

};

// 目標時刻設定
CountDownTimer.prototype.setTime = function(time) {
    this.state.goal_time = new Date(time).getTime();
};

// カウントダウン 初期化アニメーション
CountDownTimer.prototype.initAnimate = function(){
    var self = this;


};

// 実行
CountDownTimer.prototype.run = function() {
    if(this.setting.animate === true){
        this.initAnimate();
        this.start();
    }else{
        this.start();
    }
};

// カウントダウン開始
CountDownTimer.prototype.start = function() {


    var self = this;

    // Update the count down every 1 second
    var timer = setInterval(function() {

        var now = new Date().getTime();
        var diff = self.state.goal_time - now;

        if (diff < 0) {
            clearInterval(timer);
            document.querySelector(self.setting.selector_outer).remove();
        } else {

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if(days == 0){
                document.querySelector(self.setting.selector_day).remove();
                document.querySelector(self.setting.countdown_separator_day).remove();
            }else{
                document.querySelector(self.setting.selector_day).innerHTML = days;
                document.querySelector(self.setting.selector_hour).innerHTML = self.getdoubleDigestNumer(hours);
                document.querySelector(self.setting.selector_minute).innerHTML = self.getdoubleDigestNumer(minutes);
                document.querySelector(self.setting.selector_second).innerHTML = self.getdoubleDigestNumer(seconds);
            }
        }
    }, 1000);
};
