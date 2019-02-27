
var CountDownTimer = function(setting){
    this.init(setting);
};


// 初期設定
CountDownTimer.prototype.init = function(setting){

    this.setting = {
        // 初期化アニメーション
        'animation': setting.animation === true,
        // 初期化アニメーションの実行時間
        'duration': setting.duration ? setting.duration : 20,
        'animation_speed': setting.animation_speed ? setting.animation_speed : 40,
        // カウントダウンの目標時刻
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
        goal_time:0,
        goal_diff:0
    };

    var self = this;
    this.setTime(this.setting.goal_time);

};


// カウントダウン 初期化アニメーション
CountDownTimer.prototype.initAnimate = function(){
    var self = this;

    document.querySelectorAll(self.setting.selector_number ).forEach(function(element,idx){

        var cnt = 0;
        var t = setInterval(function() {

            cnt++;
            if(cnt > self.setting.duration * (idx+1)){
                clearInterval(t);

                self.updateDiff();

                if (idx === 0){
                    self.outputDay();
                } else if (idx === 1){
                    self.outputHour();
                } else if (idx === 2){
                    self.outputMinute();
                } else if (idx === 3){
                    self.outputSecond();
                }
            }else{
                // // 1ケタ
                // var num = Math.floor(Math.random() * 9);
                // element.innerHTML = num;

                // 2ケタ
                var num = Math.floor(Math.random() * 99);
                element.innerHTML = ("0" + num).slice(-2);
            }

        }, self.setting.animation_speed);
    });
};


// 目標時刻を設定
CountDownTimer.prototype.setTime = function(time) {
    this.state.goal_time = new Date(time).getTime();
};

// 差分の時間を更新
CountDownTimer.prototype.updateDiff = function() {
    this.state.goal_diff = this.state.goal_time - new Date().getTime();
};

// 目標時刻を過ぎていないかどうか
CountDownTimer.prototype.isPassed = function() {
    if (this.state.goal_diff < 0) {
        //隠す
        this.hide();
        return true;
    }
    return false;
};

// 隠す
CountDownTimer.prototype.hide = function() {
    document.querySelector(self.setting.selector_outer).remove();
};

// 出力：日
CountDownTimer.prototype.outputDay = function() {
    var days = Math.floor(this.state.goal_diff / (1000 * 60 * 60 * 24));
    if(days === 0){
        document.querySelector(self.setting.selector_day).remove();
        document.querySelector(self.setting.countdown_separator_day).remove();
    }else{
        document.querySelector(this.setting.selector_day).innerHTML = days;
    }
};
// 出力：時
CountDownTimer.prototype.outputHour = function() {
    var hours = Math.floor((this.state.goal_diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.querySelector(this.setting.selector_hour).innerHTML = this.utilsGetDoubleDigestNumer(hours);
};
// 出力：分
CountDownTimer.prototype.outputMinute = function() {
    var minutes = Math.floor((this.state.goal_diff % (1000 * 60 * 60)) / (1000 * 60));
    document.querySelector(this.setting.selector_minute).innerHTML = this.utilsGetDoubleDigestNumer(minutes);
};
// 出力：秒
CountDownTimer.prototype.outputSecond = function() {
    var seconds = Math.floor((this.state.goal_diff % (1000 * 60)) / 1000);
    document.querySelector(this.setting.selector_second).innerHTML = this.utilsGetDoubleDigestNumer(seconds);
};

// カウントダウン開始
CountDownTimer.prototype.start = function() {

    var self = this;

    // Update the count down every 1 second
    var timer = setInterval(function() {

        self.updateDiff();

        if (! self.isPassed() ) {
            // 経過してない
            self.outputDay();
            self.outputHour();
            self.outputMinute();
            self.outputSecond();
        }else{
            // 経過済み
            clearInterval(timer);
        }
    }, 1000);
};


// ユーティリティ関数：2桁表示
CountDownTimer.prototype.utilsGetDoubleDigestNumer = function(number) {
    return ("0" + number).slice(-2)
};


// 実行
CountDownTimer.prototype.run = function() {
    if (! this.isPassed() ) {
        if(this.setting.animation === true){
            this.updateDiff();
            // 経過してない
            this.initAnimate();
            this.start();
        }else{
            this.start();
        }
    }
};
