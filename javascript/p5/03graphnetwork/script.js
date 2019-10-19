
var nodeColor = "#FFCC00";
var selectColor = "#CCFF00";
var fixedColor = "#CC00FF";
var edgeColor = "#333333";

var fixed = false;

var edgeCount = 0;
var edges = [];
var nodeCount = 0;
var nodes = [];
var nodeTable = [];


class Edge {
    constructor(from, to){
        this.from = from;
        this.to = to;
        this.len = 50;
    }

    relax(){
        var vx = this.to.x - this.from.x;
        var vy = this.to.y - this.from.y;
        var d = mag(vx,vy);
        if(d > 0){
            var f = (this.len - d) / (d * 3);
            var dx = f * vx;
            var dy = f * vy;
            this.to.dx += dx;
            this.to.dy += dy;
            this.from.dx -= dx;
            this.from.dy -= dy;
        }
    }

    draw(){
        stroke(edgeColor);
        strokeWeight(0.35);
        line(this.from.x, this.from.y, this.to.x, this.to.y);
    }
}

class Node{
    constructor(label){
        this.label = label;
        this.x = random(width);
        this.y = random(height);
        this.dx = 0;
        this.dy = 0;
    }

    relax(){
        var ddx = 0;
        var ddy = 0;
        for(var j = 0; j<nodeCount; j++){
            var n = nodes[j];
            if(n != this){
                var vx = this.x - n.x;
                var vy = this.y - n.y;
                var lensq = vx * vy + vx * vy;
                if(lensq == 0){
                    ddx += random(1);
                    ddy += random(1);
                } else if (lensq < 100*100){
                    ddx += vx / lensq;
                    ddy += vy / lensq;
                }
            }
        }
        var dlen = mag(ddx, ddy) / 2;
        if(dlen>0){
            this.dx += ddx / dlen;
            this.dy += ddy / dlen;
        }
    }

    update(){
        if(!fixed){
            this.x += constrain(this.dx, -5, -5);
            this.y += constrain(this.dy, -5, -5);

            this.x = constrain(this.x, 0, width);
            this.y = constrain(this.y, 0, height);
        }
        this.dx /= 2;
        this.dy /= 2;
    }

    draw(){
        // if(selection == this){
        //     fill(selectColor);
        // }else
            if(fixed){
            fill(fixedColor);
        }else{
            fill(nodeColor);
        }
        // stroke(0);
        strokeWeight(0.5);

        rectMode(CORNER);
        var w = textWidth(this.label) + 10;
        var h = textAscent() + textDescent() + 4;
        rect(this.x- w/2, this.y - h/2, w, h)

        fill(0);
        textAlign(CENTER, CENTER);
        text(this.label, this.x, this.y);
    }


}


function setup(){
    createCanvas(640, 480);
    loadData();
    smooth();
}

function draw(){
    background(240);

    for(i=0; i<edgeCount; i++){
        edges[i].relax();
    }
    for(i=0; i<nodeCount; i++){
        nodes[i].relax();
    }
    for(i=0; i<nodeCount; i++){
        nodes[i].update();
    }
    for(i=0; i<edgeCount; i++){
        edges[i].draw();
    }
    for(i=0; i<nodeCount; i++){
        nodes[i].draw();
    }

}

function loadData() {
    addEdge('Joe','food');
    addEdge('Joe','dog');
    addEdge('Joe','tea');
    addEdge('Joe','cat');
    addEdge('Joe','table');
    addEdge('table','plate');
    addEdge('plate','food');
    addEdge('food','mouse');
    addEdge('food','dog');
    addEdge('mouse','cat');
    addEdge('table','cup');
    addEdge('cup','tea');
    addEdge('dog','cat');
    addEdge('tea','spoon');
    addEdge('plate','fork');
    addEdge('dog','flea1');
    addEdge('dog','flea2');
    addEdge('flea1','flea2');
    addEdge('plate','knife');
}

function addEdge(fromLabel, toLabel) {
    var from = findNode(fromLabel);
    var to = findNode(toLabel);
    var e = new Edge(from, to);
    // if(edgeCount == edges.length){
    //     edges = expand(edges);
    // }
    edges[edgeCount++] = e;
}

function findNode(label){
    label = label.toLowerCase();
    n = nodeTable[label];
    if(n == null){
        return addNode(label);
    }
    return n;
}

function addNode(label) {
    var n = new Node(label);
    // if(nodeCount == nodes.length){
    //     nodes = expand(nodes);
    // }
    nodeTable[label] = n;
    nodes[nodeCount++] = n;
    return n
}

function app_save(){
    saveFrames('index_output','png',1,1);
}
