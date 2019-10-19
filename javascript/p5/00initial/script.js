function setup(){
    createCanvas(640, 480);
    stroke(130);
    ellipse(width/2,height/2,10,10);
    stroke(100,200,200);
    stroke('#FF0000');
    stroke(0,0,255,8);
    line(150,25,270,350);

}

function draw(){
    ellipse(50,50,80,80);
    // if(mouseIsPressed){
    //     fill(0);
    // } else{
    //     fill(255);
    // }
    ellipse(mouseX,mouseY,80,80);
    line(150,25,mouseX,mouseY)

}

function mousePressed() {
    fill(0);
    // saveFrames('output','png',1,3);
    // saveFrames('output','png',1,25, data => {
    //     print(data);
    // });
}
function app_save(){
    saveFrames('index_output','png',1,3);
}
//
// on mousePressed() {
//     saveFrames('out', 'png', 1, 25, data => {
//         print(data);
//     });
// }