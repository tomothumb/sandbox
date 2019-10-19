let setting = {
    // dynamic: false,
    dynamic: true,
    line_size: 1,
    x_max: 300,
    y_max: 300,
    step:4,
    hankei: 200,
    noise_size: 5
};

let state = {
    time:0,
    angle_pos:{}
};

var campass_w = setting.x_max * 2;
var campass_h = setting.y_max * 2;

function setup(){
    createCanvas(campass_w, campass_h);
    frameRate(24);
    smooth();

    graph_line_output();
    fn_init_line();
    draw_line();

}

function draw(){
    graph_line_output();
    strokeWeight(setting.line_size);

    state.time += 0.3;
    if(state.time>360){
        state.time = 0;
    }
    fn_update_line();
    draw_line();

}

function graph_line_output() {
    background(0,0,0,50);

    fill(255);
    strokeWeight(setting.line_size);
    stroke(255,255,255,30);

    // line( 0, setting.y_max, campass_w, setting.y_max);
    // line( setting.x_max, 0,setting.x_max, campass_h);
    stroke(255,255,255,255);

}


function fn_line0() {

    // var HANKEI = 100;
    // var last_pos = {
    //     x: -999,
    //     y: -999
    // };
    // var initial_pos = {
    //     x: 0,
    //     y: 0
    // };
    //
    // for (angle = 0; angle <= 360; angle += 5){
    //
    //     var base_rad = radians(angle);
    //
    //     var base_circle_line = {
    //         x: cos(base_rad) * HANKEI,
    //         y: sin(base_rad) * HANKEI
    //     };
    //
    //     ADD_TIMENOISE_HANKEI = noise(state.time + angle) * 20;
    //     ADD_HANKEI = noise(angle) * 40;
    //     var add_pos = {
    //         x: cos(base_rad) * ADD_HANKEI - cos(base_rad) * ADD_HANKEI/2,
    //         y: sin(base_rad) * ADD_HANKEI - sin(base_rad) * ADD_HANKEI/2
    //     };
    //
    //     var add_timenoise_pos = {
    //         x: cos(base_rad) * ADD_TIMENOISE_HANKEI - cos(base_rad) * ADD_TIMENOISE_HANKEI/2,
    //         y: sin(base_rad) * ADD_TIMENOISE_HANKEI - sin(base_rad) * ADD_TIMENOISE_HANKEI/2
    //     };
    //
    //
    //     var current_pos = {
    //         x: setting.x_max + base_circle_line.x + add_pos.x + add_timenoise_pos.x,
    //         y: setting.y_max + base_circle_line.y + add_pos.y + add_timenoise_pos.y
    //     };
    //
    //     if(angle == 0){
    //         initial_pos.x = current_pos.x;
    //         initial_pos.y = current_pos.y;
    //     }
    //     if(last_pos.x > -999){
    //         line(current_pos.x, current_pos.y, last_pos.x, last_pos.y);
    //     }
    //
    //     last_pos.x = current_pos.x;
    //     last_pos.y = current_pos.y;
    // }
    // // line(x,y, lastx, lasty);
    // line(current_pos.x, current_pos.y, initial_pos.x, initial_pos.y);

}

function draw_line() {
    var last_pos = {
        x: -999,
        y: -999
    };

    for (angle = 0; angle < 360; angle += setting.step){

        if(last_pos.x > -999){
            // line(state.angle_pos[angle].x, state.angle_pos[angle].y, last_pos.x, last_pos.y);
            line(state.angle_pos[angle].x, state.angle_pos[angle].y, campass_w/2, campass_h/2);
        }
        // current_pos.x = state.angle_pos[angle].x;
        // current_pos.y = state.angle_pos[angle].y;

        last_pos.x = state.angle_pos[angle].x;
        last_pos.y = state.angle_pos[angle].y;
    }
    // line(x,y, lastx, lasty);
    // line(last_pos.x, last_pos.y, state.angle_pos[0].x, state.angle_pos[0].y);
    line(state.angle_pos[0].x, state.angle_pos[0].y, campass_w/2, campass_h/2);

}

function fn_init_line() {

    var HANKEI = setting.hankei;
    var last_pos = {
        x: -999,
        y: -999
    };
    var initial_pos = {
        x: 0,
        y: 0
    };


    for (angle = 0; angle <= 360; angle += setting.step){

        var base_rad = radians(angle);

        var base_circle_line = {
            x: cos(base_rad) * HANKEI,
            y: sin(base_rad) * HANKEI
        };

        ADD_TIMENOISE_HANKEI = noise(state.time + angle) * setting.noise_size;
        ADD_HANKEI = noise(angle) * setting.noise_size;
        var add_pos = {
            x: cos(base_rad) * ADD_HANKEI - cos(base_rad) * ADD_HANKEI/2,
            y: sin(base_rad) * ADD_HANKEI - sin(base_rad) * ADD_HANKEI/2
        };

        var add_timenoise_pos = {
            x: cos(base_rad) * ADD_TIMENOISE_HANKEI - cos(base_rad) * ADD_TIMENOISE_HANKEI/2,
            y: sin(base_rad) * ADD_TIMENOISE_HANKEI - sin(base_rad) * ADD_TIMENOISE_HANKEI/2
        };


        var current_pos = {
            x: setting.x_max + base_circle_line.x + add_pos.x + add_timenoise_pos.x,
            y: setting.y_max + base_circle_line.y + add_pos.y + add_timenoise_pos.y
        };

        if(angle == 0){
            initial_pos.x = current_pos.x;
            initial_pos.y = current_pos.y;
        }
        state.angle_pos[angle] = {
            x:current_pos.x,
            y:current_pos.y
        };

        last_pos.x = current_pos.x;
        last_pos.y = current_pos.y;
    }

}

function fn_update_line() {
    for (angle = 0; angle <= 360; angle += setting.step) {
        var base_rad = radians(angle);
        DIFF_TIMENOISE_HANKEI = noise(state.time + angle) * setting.noise_size + 0.05;
        var diff_timenoise_pos = {
            x: cos(base_rad) * DIFF_TIMENOISE_HANKEI - cos(base_rad) * setting.noise_size/2,
            y: sin(base_rad) * DIFF_TIMENOISE_HANKEI - sin(base_rad) * setting.noise_size/2
        };
        state.angle_pos[angle] = {
            x: state.angle_pos[angle].x + diff_timenoise_pos.x,
            y: state.angle_pos[angle].y + diff_timenoise_pos.y
        };
    }
}

