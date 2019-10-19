let setting = {
    // dynamic: false,
    dynamic: true,
    line_size: 1,
    x_max: 300,
    y_max: 150,
    max_num: 30,
    max_distance: 100,
    min_distance: 5
};

let state = {
    count: 0,
    block:[],
    nodes: [],
    paths: [],
    lastnode: null,
    nodeA: null,
    nodeB: null,

};

// let w = window.innerWidth;
// let h = window.innerHeight;
var campass_w = setting.x_max * 2;
var campass_h = setting.y_max * 2;

class Node{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    getX(){
        return this.x;

    }
    getY(){
        return this.y;
    }
    getDistance(x,y){
        return Math.sqrt( pow(this.x - x, 2) + pow(this.y - y, 2) )
    }
    draw(){
        ellipse(this.x, this.y,3,3);
    }
    prot(){}
}
class Path{
    constructor(node){
        this.startNode = node;
    }
    getEndNode(){
        return this.endNode;
    }
    checkDistanse(x, y){

    }
    makeEndNode(){
        let x = this.startNode.getX() + random() * setting.max_distance - setting.max_distance/2;
        let y = this.startNode.getY() + random() * setting.max_distance - setting.max_distance/2;

        if(setting.min_distance > Math.sqrt( pow(this.startNode.getX() - x, 2) + pow(this.startNode.getY() - y, 2) )){
            return this.makeEndNode();
        }
        let self = this;
        let valid_pos = true;
        state.nodes.forEach(function(each_node){
            let diff = each_node.getDistance(self.startNode.getX(), self.startNode.getY());
            if(setting.min_distance > diff){
        //         valid_pos = false;
            }
        });
        if(valid_pos == false){
            return this.makeEndNode();
        }
        this.endNode = new Node(x, y);
        // this.endNode = new Node(x, y);
        state.nodes.push(this.endNode);
        return true;
    }
    draw(){
        line(this.startNode.getX(),this.startNode.getY(),this.endNode.getX(),this.endNode.getY());
    }
}

function setup(){
    createCanvas(campass_w, campass_h);
    frameRate(60); // Attempt to refresh at starting FPS
    smooth();

    background(0,0,0);
    fill(255);
    strokeWeight(setting.line_size);
    stroke(255,255,255,50);
    line( 0, setting.y_max, campass_w, setting.y_max);
    line( setting.x_max, 0,setting.x_max, campass_h);
    stroke(255,255,255,255);

    // for(i = 0; i < setting.max_num; i++) {
    //     n = new Node(random()*campass_w, random()*campass_h);
    //     n.draw();
    // }


    state.nodeA = {
        x: campass_w/2+50,
        y: campass_h/2+50
    };
    state.nodeB = {
        x: campass_w/2-50,
        y: campass_h/2-50
    };

    fn_chokusen_line(state.nodeA,state.nodeB);

    // // state.last_node = undefined;
    // for(i = 0; i < setting.max_num; i++) {
    //     current_node = new Node(random()*campass_w, random()*campass_h);
    //     current_node.draw();
    //
    //
    //     if (state.last_node != null){
    //         fn_chokusen_line(current_node, state.last_node)
    //     }
    //     state.last_node = current_node;
    //
    // }


    //
    // initNode = new Node(campass_w/2, campass_h/2);
    //
    // initPath = new Path(initNode);
    // initPath.makeEndNode();
    // initPath.draw();
    //
    // state.nodes.push(initNode);
    // state.paths.push(initPath);
    //
    // for(i = 1; i < setting.max_num; i++){
    //
    //     let i_node = state.paths[i-1].getEndNode();
    //     state.paths[i] = new Path(i_node);
    //     state.paths[i].makeEndNode();
    //     state.paths[i].draw();
    // }

}

function fn_chokusen_line(pointA, pointB) {
    circle_size = 5;
    fill(255,255,255,200);
    ellipse(pointA.x, pointA.y,circle_size,circle_size);
    ellipse(pointB.x, pointB.y,circle_size,circle_size);
    // line(pointA.x,pointA.y,pointB.x,pointB.y);

    var pointAB = {
        x: (pointB.x - pointA.x)/2,
        y: (pointB.y - pointA.y)/2
    };

    var KATAMUKI_AB = pointAB.y / pointAB.x;
    var KATAMUKI_AB_90DEG = pointAB.x / pointAB.y;
    // center
    translate(pointA.x +pointAB.x, pointA.y +pointAB.y);
    // ellipse(0,0,circle_size,circle_size);

    // var ZERO_X = pointAB.x;
    // y = ax
    // y = ax + (pointA.y + pointAB.y)
    // y = KATAMUKI_AB * x;

    line_start_x = - (campass_w * 2);
    line_start_y = - KATAMUKI_AB_90DEG * line_start_x;
    line_end_x = (campass_w * 2);
    line_end_y = - KATAMUKI_AB_90DEG * line_end_x;
    line(line_start_x,line_start_y,line_end_x, line_end_y)



}

function draw(){

    background(0,0,0,10);
    stroke('#999999');

    state.count++;
    state.nodeA.x += noise(state.count)*6 - 2.8;
    state.nodeA.y += noise(state.count*3)*6 - 2.8;
    state.nodeB.x += noise(state.count*6)*6 - 2.8;
    state.nodeB.y += noise(state.count*9)*6 - 2.8;
    fn_chokusen_line(state.nodeA,state.nodeB);


    // state.count += 1;
    // if(state.count > 197){
    //     state.count = 0;
    // }
    // perlin_data = {};
    // noStroke();
    // background(0,0,0,70);
    // stroke('#333333');
    // line(0, campass_h/2,campass_w,campass_h/2);
    // stroke('#FFFFFF');
    //
    //
    // for(i = 0; i < setting.repeat; i++){
    //     state.block[i] = {
    //         w: campass_w / setting.repeat,
    //         h: setting.y_max / 2,
    //         start_x: (campass_w  / setting.repeat ) * i,
    //     };
    //     segment(i);
    // }
    // fn_line_perlin_write();

}



