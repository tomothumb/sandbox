var mapImage;
var locationTable;
var rowCount;

var dataTable;
var dataMin = 0.0;
var dataMax = 0.0;

function preload() {
    locationTable = loadTable('locations.tsv','tsv','header');
    dataTable = loadTable('random.tsv','tsv','header');
}

function setup(){
    createCanvas(640, 480);
    stroke(130);
    ellipse(width/2,height/2,10,10);
    stroke(100,200,200);
    stroke('#FF0000');
    stroke(0,0,255,8);
    line(150,25,270,350);
    mapImage = loadImage("map.png");
    rowCount = locationTable.getRowCount();
    for(row =0; row < rowCount; row++){
        value = dataTable.get(row, 1);
        if(value > dataMax){
            dataMax = value;
        }
        if(value < dataMin){
            dataMin = value;
        }
    }
}

function draw(){
    ellipse(50,50,80,80);
    // if(mouseIsPressed){
    //     fill(0);
    // } else{
    //     fill(255);
    // }
    smooth();
    fill(90);
    noStroke();
    ellipse(mouseX,mouseY,80,80);
    line(150,25,mouseX,mouseY);
    image(mapImage, 0, 0);


    for(row = 0; row < rowCount; row++){
        var abbrev = dataTable.get(row,0);
        var x = locationTable.get(row, 1);
        var y = locationTable.get(row, 2);
        drawData(x, y, row);
    }
}

function drawData(x,y, abbrev){
    var value = dataTable.get(abbrev, 1);
    // 2-40に抑える
    var mapped_size = map(value, dataMin,dataMax, 2, 40);
    // 色を分布
    var percent = norm(value, dataMin, dataMax);

    var mapped_color_alpha;
    if(value >= 0){
        // 色：正
        mapped_color_alpha = map(value, 0,dataMax, 0, 1);
        fill("rgba(41,111,52,"+mapped_color_alpha+")");
    }else{
        // 色：負
        mapped_color_alpha = map(value, 0,dataMin, 0, 1);
        fill("rgba(97,226,240,"+mapped_color_alpha+")");
    }

    // let from = color("#296F34");
    // let to = color("#61E2F0");
    // // colorMode(HSB); // Try changing to HSB.
    // var between_color = lerpColor(from, to, percent);
    // fill(between_color);
    ellipse(x, y, mapped_size, mapped_size)
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