import define1 from "./circlegraph.js";
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["diversity_2018.csv",new URL("./files/diversity_2018.csv",import.meta.url)],["original-plate-25.jpg",new URL("./files/2aea67b42c19f3db67f519577786b2bc291187dcdf01b0ed910562a2913654d2c701d71bd10f79684bfba4ec164ab994d13e868ed069e6f053aa756b4d6ff3cb",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable().define(["md"], function(md){return(
md
)});
  main.variable().define(["FileAttachment"], function(FileAttachment){return(
FileAttachment("diversity_2018.csv")
)});
  main.variable("data").define("data", ["FileAttachment","d3"], async function(FileAttachment,d3)
{
  const text = await FileAttachment("diversity_2018.csv").text();

  return d3.csvParse(text, ({Company, Female }) => ({
    Company: Company,
    Female: +Female
  }));
}
);
  main.variable(observer("chart")).define("chart", ["d3","width","height","data","getOuterRadius","arcPadding","labelPadding","ticks","rad2deg","scale","chartRadius","PI","color","arcTween"], function(d3,width,height,data,getOuterRadius,arcPadding,labelPadding,ticks,rad2deg,scale,chartRadius,PI,color,arcTween)
{
  
   const svg = d3.create("svg")
      .attr("viewBox", [1, 1, width, height])

  const g = svg
      .attr("height", height)
      .append('g')
      .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')')
  
  const radialAxis = g
  .append('g')
    .attr('class', 'r axis')
    .selectAll('g')
      .data(data)
      .enter()
      .append('g')

  radialAxis
    .append('circle')
    .attr('r', (d, i) => getOuterRadius(i) + arcPadding)

  radialAxis
    .append('text')
    .attr('x', labelPadding, )
    .attr('y', (d, i) => -getOuterRadius(i) + arcPadding)
    .text(d => d.Company)

 const axialAxis = g
  .append('g')
    .attr('class', 'a axis')
    .selectAll('g')
      .data(ticks -2)
      .enter()
        .append('g')
        .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')')
      .attr("stroke", "white")

  axialAxis
      .append('line')
      .attr('x2', chartRadius)

  axialAxis
    .append('text')
    .attr('x', chartRadius + -10)
    .style('text-anchor', d => (scale(d) >= PI && scale(d) < 2 * PI ? 'end' : null))
    .attr('transform', d => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (chartRadius + 10) + ',0)')
    .text(d => d)
  
  const arcs = g
    .append('g')
    .attr('class', 'data')
    .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('class', 'arc')
     .style('fill', (d, i) => color(i))

  arcs.transition()
    .delay((d, i) => i * 100)
    .duration(2000)
    .attrTween('d', arcTween)
   
  return svg.node()

}
);


  main.variable().define(["md"], function(md){return(
md
)});

  main.variable("color")
  .define("color", ["d3"], function(d3){return(
d3.scaleOrdinal(d3.schemeCategory10)
)});
  main.variable("ticks")
  .define("ticks", ["scale","numTicks"], function(scale,numTicks){return(
scale.ticks(numTicks).slice(0, -1)
)});
  main.variable("keys")
  .define("keys", ["data"], function(data){return(
data.map((d, i) => d.Company)
)});
  main.variable("numArcs")
  .define("numArcs", ["keys"], function(keys){return(
keys.length
)});
  main.variable("arcWidth")
  .define("arcWidth", ["chartRadius","arcMinRadius","numArcs","arcPadding"], function(chartRadius,arcMinRadius,numArcs,arcPadding){return(
(chartRadius - arcMinRadius - numArcs * arcPadding -10) / numArcs
)});
  main.variable("scale")
  .define("scale", ["d3","data","PI"], function(d3,data,PI){return(
d3.scaleLinear()
    .domain([0, 100])
    .range([0, 2 * PI])
)});
  main.variable("arc")
  .define("arc", ["d3","getInnerRadius","getOuterRadius","scale"], function(d3,getInnerRadius,getOuterRadius,scale){return(
d3.arc()
    .innerRadius((d, i) => getInnerRadius(i))
    .outerRadius((d, i) => getOuterRadius(i))
    .startAngle(0)
    .endAngle((d, i) => scale(d))
)});
  main.variable("getInnerRadius")
  .define("getInnerRadius", ["arcMinRadius","numArcs","arcWidth","arcPadding"], function(arcMinRadius,numArcs,arcWidth,arcPadding){return(
function getInnerRadius(index) {
    return arcMinRadius + (numArcs - (index + 2)) * (arcWidth + arcPadding);
  }
)});
  main.variable("getOuterRadius")
  .define("getOuterRadius", ["getInnerRadius","arcWidth"], function(getInnerRadius,arcWidth){return(
function getOuterRadius(index) {
    return getInnerRadius(index) + arcWidth;
  }
)});
  main.variable("rad2deg")
  .define("rad2deg", ["PI"], function(PI){return(
function rad2deg(angle) {
    return angle * 180 / PI;
  }
)});
  main.variable("arcTween")
  .define("arcTween", ["d3","arc"], function(d3,arc){return(
function arcTween(d, i) {
    let interpolate = d3.interpolate(0, d.Female);
    return t => arc(interpolate(t), i);
  }
)});
  main.variable("PI")
  .define("PI", function(){return(
Math.PI
)});
  main.variable("arcMinRadius")
  .define("arcMinRadius", function(){return(
2
)});
  main.variable("arcPadding")
  .define("arcPadding", function(){return(
2
)});
  main.variable("labelPadding")
  .define("labelPadding", function(){return(
-10
)});
  main.variable("numTicks")
  .define("numTicks", function(){return(
5
)});
  main.variable("chartRadius")
  .define("chartRadius", ["height"], function(height){return(
height/2.1
)});
  const child1 = runtime.module(define1);
  main.import("margin", child1);
  main.variable("height")
  .define("height", function(){return(
500
)});
  main.variable("d3")
  .define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}