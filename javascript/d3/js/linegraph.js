
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

// 2. SVG領域の設定
var svg = d3.select("#graph").append("svg")
    .attr("width", width).attr("height", height);

// 3. 軸スケールの設定
var xScale = d3.scaleBand()
    .rangeRound([padding, width - padding])
    .padding(0.4)
    .domain(dataset.map(function(d) { return d.name; }))
;

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) { return d.value; })])
    .range([height - padding, padding]);

// 4. 軸の表示
svg.append("g")
    .attr("transform", "translate(" + 0 + "," + (height - padding) + ")")
    .call(d3.axisBottom(xScale))
;

svg.append("g")
    .attr("transform", "translate(" + padding + "," + 0 + ")")
    .call(d3.axisLeft(yScale))
;

// // 5. バーの表示
// svg.append("g")
//     .selectAll("rect")
//     .data(dataset)
//     .enter()
//     .append("rect")
//     .attr("x", function(d) { return xScale(d.name); })
//     .attr("y", function(d) { return yScale(d.value); })
//     .attr("width", xScale.bandwidth())
//     .attr("height", function(d) { return height - padding - yScale(d.value); })
//     .attr("fill", "red")
// ;
// 5. ラインの表示
svg.append("path")
    .datum(dataset)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) { return xScale(d.name); })
        .y(function(d) { return yScale(d.value); }));


// d3.csv("./datasets/population.csv", function(error, data) {
//     // console.log(data);
// },function(data2,co){
//     console.log(data2,co);
// });

