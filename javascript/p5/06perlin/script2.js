let setting = {
    // dynamic: false,
    dynamic: true,
    line_size: 1,
    circle_size: 0.1,
    x_max: 300,
    y_max: 300,
    repeat: 4,
    step:1
};

let state = {
    count: 0,
    block:[],
    ynoise:0,
    initial_ynoise:0,
    initial_angle:0,
    angle:0
};

// let w = window.innerWidth;
// let h = window.innerHeight;

var campass_w = setting.x_max * 2;
var campass_h = setting.y_max * 2;
let perlin_data = {};

function setup(){
    createCanvas(campass_w, campass_h);
    frameRate(24);
    smooth();

    initial_output();
    state.ynoise = random(100);
    state.initial_ynoise = state.ynoise;
        fn_pline();
}

function draw(){
    background(0,0,0,80);
    initial_output();

    // state.initial_ynoise += 0.02;
    // state.ynoise = state.initial_ynoise;

    // fn_pline();
    state.initial_angle += 5;

    fn_sin();
}

function initial_output() {
    // translate(campass_w/2,campass_h/2);

    fill(255);
    strokeWeight(1);
    stroke(255,255,255,255);

    // ellipse(0, 0, 10,10);
    line( 0, setting.y_max, campass_w, setting.y_max);
    line( setting.x_max, 0,setting.x_max, campass_h);

    // translate(- campass_w/2 + mouseX, -campass_h/2 + mouseY);
    // line( - setting.x_max,0, setting.x_max, 0);
    // line( 0, - setting.y_max,0, setting.y_max);

}

function fn_pline() {

    // let lastx = -999;
    // let lasty = -999;
    // ynoise = random(10);
    // for (x = 0; x <= campass_w; x += setting.step){
    //     y = noise(state.ynoise) * campass_h - campass_h/2;
    //     if(lastx > -999){
    //         line(x,y+setting.y_max, lastx, lasty+setting.y_max);
    //     }
    //     lastx = x;
    //     lasty = y;
    //     state.ynoise += 0.03;
    // }

}


function fn_sin() {
    state.angle += 1;

    let lastx = -999;
    let lasty = -999;
    state.angle = state.initial_angle;
    for (x = 0; x <= campass_w; x += setting.step){
        var rad = radians(state.angle);
        // y = fn_sin(rad);
        y = sin(rad);
        y *= 50;
        y += noise(rad) * 50;
        // y = y**3;
        // if(lastx > -999){
            line(x,y + setting.y_max, lastx, lasty+setting.y_max);
        // }
        lastx = x;
        lasty = y;


        state.angle += 1;
    }

}
