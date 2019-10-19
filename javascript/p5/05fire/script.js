var size_x=100;
var size_y=100;
var rot=0;
var springing = 0.0009;
var damping = 0.98;
var max_size = 300;
var min_size = 70;
var current_size = 50;
var direction_expand = true;
var accel = 0.0;

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30); // Attempt to refresh at starting FPS

}

function draw(){
    noStroke();
    fill(0,15);
    rect(0,0,width, height);

    // var dx = sin(rot);
    // var dy = sin(rot);
    rot += 0.05;
    if(rot > 360){
        rot = 0;
    }
    // size_x += dx * 10;
    // size_y += dy * 10;

    if(direction_expand == true){
        delta = max_size - current_size;
    }else{
        delta = min_size - current_size;
    }

    if(direction_expand == true && max_size < current_size){
        direction_expand = false;
    } else if (direction_expand == false && min_size > current_size){
        direction_expand = true;
    }

    delta *= springing;
    accel += delta;
    current_size += accel;
    accel *= damping;
     // = nodeStartX[i]+sin(radians(angle[i]))*(accelX*2);
    // // noFill();
    // curveTightness(0.3);
    // beginShape();
    // curveVertex(10, 100);
    // curveVertex(50, 50);
    // curveVertex(200, 80);
    // curveVertex(20, 40);
    // endShape();

    fill(255);
    ellipse(width/2, height/2, current_size*tan(rot), current_size);


}
