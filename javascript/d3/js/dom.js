var paragraphs = document.getElementById("graph");
paragraphs.style.setProperty("color", "red", null);

d3.select("h1")
    .style("background-color", "black")
    .style("color", "white")
;
d3.selectAll("#graph").style("color", "green");

d3.selectAll("p")
    .data([4, 8, 15, 16, 23, 42])
    .style("font-size", function(d) { return d + "px"; });


// for (var i = 0; i < paragraphs.length; i++) {
//     var paragraph = paragraphs.item(i);
//     paragraph.style.setProperty("color", "white", null);
// }

async function fn()  {
    console.log(1);
    return 1;
}


fn().then(result => {
    console.log(1);
});
