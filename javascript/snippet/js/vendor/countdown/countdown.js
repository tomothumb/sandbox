Vue.filter('zerofill', function (value) {
  if (!value) return '00';
  if(value <= 9){
    return "0" + value.toString();
  }
  return value.toString();
});

let Countdown = function(selector){
  let countdown_moment = moment();
  let countdown_anime_request;
  let countdown_interval = 30;
  let countdown_frame_cnt = 0;

  let countdown_vueapp = new Vue({
    el: selector,
    data: {
      'countdown': {
        '_passed': false,
      },
      'timer': {
        'y': 0,
        'm': 0,
        'd': 0,
        'h': 0,
        'i': 0,
        's': 0,
      },
    },
    methods: {
      updateTime: function () {
        let now = moment();
        // console.log(now.format("YYYY-MM-DD hh:mm:ss"));
        // console.log(countdown_moment.format("YYYY-MM-DD hh:mm:ss"));
        // console.log(countdown_moment);
        // console.log(now.isSameOrBefore(countdown_moment));
        if(now.isSameOrBefore(countdown_moment)){
          // まだ
          let diff_y = countdown_moment.diff(now, 'years');
          let diff_m = countdown_moment.diff(now, 'months') - (diff_y * 12);
          let diff_d = countdown_moment.diff(now, 'days') - (diff_y * 12 * now.daysInMonth()) - ((diff_m) * now.daysInMonth());
          let diff_h = countdown_moment.diff(now, 'hours') - (diff_y * 12 * now.daysInMonth() * 24) - ((diff_m) * now.daysInMonth() * 24) - (diff_d * 24);
          let diff_i = countdown_moment.diff(now, 'minutes') - (diff_y * 12 * now.daysInMonth() * 24 * 60) - ((diff_m) * now.daysInMonth() * 24 * 60) - (diff_d * 24 * 60) - (diff_h * 60);
          let diff_s = countdown_moment.diff(now, 'seconds') - (diff_y * 12 * now.daysInMonth() * 24 * 60 * 60) - ((diff_m) * now.daysInMonth() * 24 * 60 * 60) - (diff_d * 24 * 60 * 60) - (diff_h * 60 * 60) - (diff_i * 60);
          // console.log('goal',countdown_moment.format("YYYYMMDD hh:mm:ss"));
          // console.log('now',now.format("YYYYMMDD hh:mm:ss"));
          // console.log('diff_y',diff_y);
          // console.log('diff_m',diff_m);
          // console.log('diff_d',diff_d);
          // console.log('diff_h',diff_h);
          // console.log('diff_i',diff_i);
          // console.log('diff_s',diff_s);
          this.$set(this.timer, 'y', diff_y);
          this.$set(this.timer, 'm', diff_m);
          this.$set(this.timer, 'd', diff_d);
          this.$set(this.timer, 'h', diff_h);
          this.$set(this.timer, 'i', diff_i);
          this.$set(this.timer, 's', diff_s);
        } else {
          // あと
          console.log('終了');
          this.$set(this.countdown, '_passed', true);
        }
      },
    }
  });


  let setTimer = function(m) {
    countdown_moment = m;
  };

  let countdown_update = function(timestamp) {
    countdown_frame_cnt++;
    if (countdown_frame_cnt % countdown_interval == countdown_interval-1) {
      countdown_frame_cnt = 0;
      countdown_vueapp.updateTime()
    }
    if(countdown_vueapp.countdown._passed === true){
      window.cancelAnimationFrame(countdown_anime_request)
    }else{
      countdown_anime_request = window.requestAnimationFrame(countdown_update);
    }
  };

  let start = function (){
    countdown_anime_request = window.requestAnimationFrame(countdown_update);
  };

  return {
    setTimer: setTimer,
    start: start
  }
};