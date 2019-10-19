let setting = {
    // dynamic: false,
    dynamic: true,
    line_size: 1,
    circle_size: 0.1,
    x_max: 300,
    y_max: 300,
    repeat: 4
};

let state = {
    count: 0,
    block:[]
};

// let w = window.innerWidth;
// let h = window.innerHeight;

var campass_w = setting.x_max * 2;
var campass_h = setting.y_max;
let perlin_data = {};

function setup(){
    createCanvas(campass_w, campass_h);
    frameRate(30); // Attempt to refresh at starting FPS
    smooth();

}

function draw(){
    state.count += 1;
    if(state.count > 197){
        state.count = 0;
    }
    perlin_data = {};
    noStroke();
    background(0,0,0,70);
    stroke('#333333');
    line(0, campass_h/2,campass_w,campass_h/2);
    stroke('#FFFFFF');


    for(i = 0; i < setting.repeat; i++){
        state.block[i] = {
            w: campass_w / setting.repeat,
            h: setting.y_max / 2,
            start_x: (campass_w  / setting.repeat ) * i,
        };
        segment(i);
    }
    fn_line_perlin_write();

}


function segment(block_count){
    for(x = 0; x < state.block[i].w; x++){
        var y;
        // y = 0;
        // y = fn_line(block_count, x);
        // y = fn_line2(x);
        // y = fn_line_wavelet(block_count, x);
        // ellipse(render_pos_x(block_count, x), render_pos_y(block_count, y), setting.circle_size, setting.circle_size);

        fn_line_perlin(block_count, x);
    }
}

function render_pos_y_master(y){
    return (setting.y_max/2) - y;
}
function render_pos_x_master(x){
    return x;
}


function render_pos_y(block_count, y){
    return (setting.y_max/2) - y;
}
function render_pos_x(block_count, x){
    var start_point = state.block[block_count].start_x;
    return start_point + x;
}

function fn_line(block_count, x){
    let max_point = state.block[block_count].w;
    let a = 0.5;
    if(setting.dynamic){
        a = sin( ( state.count / 4) / Math.PI * (block_count+1));
    }
    let max_a = a * max_point;
    return (a * x) - (max_a / 2);
}
function fn_line2(x){
    let a = 1/200;
    if(setting.dynamic){
        a = sin( ( state.count / 10) / Math.PI) / 300;
    }
    return a * x * x;
}

function fn_line_wavelet(block_count, x){
    var move_center_x = x - state.block[block_count].w/2;

    // 横幅の最大値を-1〜１に圧縮したい
    let comp_rate = 1/ ( state.block[block_count].w / 2);
    // xを圧縮し、xの中心位置をずらす
    // let comp_x = (x / comp_rate) + (state.block[i].w/2);
    let comp_x = (move_center_x * comp_rate);

    // ウェーブレット曲線
    var comp_pos = 1 -  ( 3 * (comp_x ** 2) ) + ( 2 * ( Math.abs(comp_x) ** 3 ) );
    var expand_pos = comp_pos * ( campass_h / 2);
    // return expand_pos;

    // let a = 1/200;
    // if(setting.dynamic){
    //     var comp_pos = 1 -  ( 3 * (comp_x ** 2) ) + ( 2 * ( Math.abs(comp_x) ** 3 ) );
    //     var expand_pos = comp_pos * ( setting.y_max / 2);
    // }
    var multiple_line = fn_line(block_count, x) / 40;
    // return multiple_line;
    return multiple_line * expand_pos;
}




function fn_line_perlin(block_count, x){
    let wavelet_1 = fn_line_wavelet(block_count, x);

    let pos_x = state.block[block_count].start_x + x;
    if(undefined == perlin_data[pos_x]){
        perlin_data[pos_x] = wavelet_1;
    }
    else{
        perlin_data[pos_x] += wavelet_1;
    }
    // サブ波
    let sub_pos_x = pos_x + ( state.block[block_count].w / 2);


    if(undefined == perlin_data[sub_pos_x]){
        perlin_data[sub_pos_x] = wavelet_1;
    }
    else{
        perlin_data[sub_pos_x] += wavelet_1;
    }
}

function fn_line_perlin_write(){

    Object.keys(perlin_data).forEach(function(key) {
        // console.log(key, perlin_data[key]);
        ellipse(render_pos_x_master(key), render_pos_y_master(perlin_data[key]), setting.circle_size, setting.circle_size)
    });
}

