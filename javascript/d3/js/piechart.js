
// 1. データの準備
var dataset = [
    { "name": "A", "value": 5 },
    { "name": "B", "value": 6 },
    { "name": "C", "value": 8 },
    { "name": "D", "value": 1 },
    { "name": "E", "value": 2 },
    { "name": "F", "value": 6 },
    { "name": "G", "value": 8 },
    { "name": "H", "value": 6 },
    { "name": "I", "value": 10 },
    { "name": "J", "value": 9 }
];
var width = 400; // グラフの幅
var height = 300; // グラフの高さ
var padding = 30; // スケール表示用マージン

var radius = Math.min(width, height) / 2 - 10;


// 2. SVG領域の設定
var svg = d3.select("#graph").append("svg")
    .attr("width", width).attr("height", height);

g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// var piechart = svg.append('circle')
//     .attr('cx', width/2)
//     .attr('cy', height/2)
//     .attr('r', width/4)
//     .style('fill','rgba(0, 0, 0, 0.8)');

// 3. カラーの設定
var color = d3.scaleOrdinal()
    .range(["#DC3912", "#3366CC", "#109618", "#FF9900", "#990099"]);

// 4. pieチャートデータセット用関数の設定
var pie = d3.pie()
    .value(function(d) { return d.value; })
    .sort(null);

// 5. pieチャートSVG要素の設定
var pieGroup = g.selectAll(".pie")
    .data(pie(dataset))
    .enter()
    .append("g")
    .attr("class", "pie");

arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);


pieGroup.append("path")
    .attr("d", arc)
    .attr("fill", function(d) { return color(d.index) })
    .attr("opacity", 0.75)
    .attr("stroke", "white");

// 6. pieチャートテキストSVG要素の設定
var text = d3.arc()
    .outerRadius(radius - 30)
    .innerRadius(radius - 30);

pieGroup.append("text")
    .attr("fill", "black")
    .attr("transform", function(d) { return "translate(" + text.centroid(d) + ")"; })
    .attr("dy", "5px")
    .attr("font", "10px")
    .attr("text-anchor", "middle")
    .text(function(d) { return d.data.name; });

