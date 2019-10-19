var stars = [];
var center_star;
var max_num = 50000;
var display_difficulty = 2;
let easing = 0.05;
var stage_count = 0;
var finish_stage_count = 60*5;


function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(60); // Attempt to refresh at starting FPS

    background('#000011');
    smooth();
    fill("#CCCCCC");
    noStroke();

    // stroke(130);
    // ellipse(width/2,height/2,10,10);
    // stroke(100,200,200);
    // stroke('#FF0000');
    // stroke(0,0,255,8);
    // line(150,25,270,350);
    // loadData();

    center_star = new CenterStar();
}

// function loadData(){
//     for(var i = 0; i <= max_num; i++){
//         var is_horizontal = Math.floor(Math.random()*2);
//         var is_positive = Math.floor(Math.random()*2);
//
//         stars[i] = new Star(is_horizontal, is_positive, Math.random())
//     }
// }

var easingLinear = function (currentTime, startValue, changeValue, duration) {
    return changeValue * currentTime / duration + startValue;
};

class CenterStar{
    constructor(){
        this.size = 5;

    }
    update(){
        if(stage_count<finish_stage_count){
            this.size = this.size - (Math.random() - 0.7 ) ;
        }else{
            // this.size = easingLinear();
            let d_size = height * 2 - this.size;
            this.size += d_size * easing;
        }
        // console.log(this.size);
    }
    draw(){
        // fill("#FFFFFF");
        fill("rgba(255,255,255,0.8)");
        ellipse(width/2, height/2, this.size, this.size);
    }
}

class Star{
    constructor(is_horizontal, is_positive, to_position_parcent){
        this.from_x = width/2;
        this.from_y = height/2;
        this.current_x = this.from_x;
        this.current_y = this.from_y;
        this.opacity = 0;
        this.size = 0;
        this.is_positive = is_positive;
        this.visible = false;

        if(is_horizontal == 1){
            if(is_positive == 1){
                this.to_x = width;
            }else{
                this.to_x = 0;
            }
            this.to_y = height * to_position_parcent;
        }else{
            this.to_x = width * to_position_parcent;
            if(is_positive == 1){
                this.to_y = height;
            }else{
                this.to_y = 0;
            }

        }
        this.count = 0;
        this.max_count = 100;
    }
    update(){

        if( this.visible == false){
            if(Math.floor(Math.random() * Math.floor(display_difficulty)) != 0){
                return;
            }
            this.visible = true;
        }

        this.count++;
        if(this.count < this.max_count + 50){
            this.parcent = this.count / this.max_count;
            this.current_x = this.from_x + ((this.to_x - this.from_x) * this.parcent);
            this.current_y = this.from_y + ((this.to_y - this.from_y) * this.parcent);
            this.size = this.size + (this.count * 0.002);


            // let dx = this.to_x - this.current_x;
            // this.current_x += dx * easing;
            //
            // let dy = this.to_y - this.current_y;
            // this.current_y += dy * easing;

        }
    }

    draw() {
        if(this.visible == false){
            return;
        }
        // stroke("#FFFFFF");
        fill("#FFFFFF");
        ellipse(this.current_x, this.current_y, this.size, this.size);
        // stroke("rgba(0,0,0,0.1)");
        // strokeWeight(this.size);
        //
        // line(this.from_x,this.from_y,this.current_x,this.current_y);
    }
    is_finished(){
        return !(this.count < this.max_count + 50)
    }
}
function star_generator(){
    if(Math.floor(Math.random() * Math.floor(display_difficulty)) == 0){
        var is_horizontal = Math.floor(Math.random()*2);
        var is_positive = Math.floor(Math.random()*2);
        stars.push(
            new Star(is_horizontal, is_positive, Math.random())
        );
    }
}
function draw(){


    stage_count++;


    star_generator();

    for(var i = 0; i <= stars.length; i++){
        if(stars[i] != undefined){
            stars[i].update();
            stars[i].draw();
            if(stars[i].is_finished()){
                stars.splice(i, 1);
            }
        }
    }

    fill("rgba(0,10,30,.3)");
    rect(0, 0, width, height);

    // fill("#FFFFFF");
    center_star.update();
    center_star.draw();


    // ellipse(50,50,80,80);
    // // if(mouseIsPressed){
    // //     fill(0);
    // // } else{
    // //     fill(255);
    // // }
    // ellipse(mouseX,mouseY,80,80);
    // line(150,25,mouseX,mouseY)

}

function mousePressed() {
    // fill(0);
    // saveFrames('output','png',1,3);
    // saveFrames('output','png',1,25, data => {
    //     print(data);
    // });
}
function app_save(){
    // saveFrames('index_output','png',1,3);
}
//
// on mousePressed() {
//     saveFrames('out', 'png', 1, 25, data => {
//         print(data);
//     });
// }