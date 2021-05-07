// data load
// reference for d3.autotype: https://github.com/d3/d3-dsv#autoType
d3.csv("./data/hours_worked.csv", d3.autoType).then(data => {
    console.log(data);
  
    /** CONSTANTS */
    // constants help us reference the same values throughout our code
    const width = window.innerWidth / 1.2,
      height = window.innerHeight / 4,
      paddingInner = 0.2,
      margin = { top: 20, bottom: 40, left: 100, right: 100 };
  
    /** SCALES */
    // reference for d3.scales: https://github.com/d3/d3-scale
    
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.Hours)])
      .range([width - margin.left, margin.right]);

    const yScale = d3
      .scaleBand()
      .domain(data.map(d => d.Gender))
      .range([height - margin.bottom, margin.top])
      .paddingInner(paddingInner);
  
    // reference for d3.axis: https://github.com/d3/d3-axis
    const yAxis = d3.axisLeft(yScale).ticks(data.length);
  
    /** MAIN CODE */
    const svg = d3
      .select("#barchart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  
    // append rects
    const rect = svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => xScale(d.Hours))
      .attr("y", d => yScale(d.Gender))
      .attr("height", yScale.bandwidth())
      .attr("width", d => width - margin.left - xScale(d.Hours))
      .attr("transform", `translate(200, ${height - margin.bottom, margin.top})`)
      .attr ("fill", function(d) {
        if (d.Hours < 43.20) {
        return "rgb(201, 183, 130)";
      } else if (d.Hours > 43.10) {
        return "rgb(101, 154, 198)";
      } return "black";
      });
      
     
    svg.selectAll("rect")
      .transition()
      .duration(2000)
      .attr("x", 0, xScale)
      .attr("width", d => width - margin.right - xScale(d.Hours))
      .attr ("opacity", 1);
  

    // append text
    const text = svg
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("class", "label")
      // this allows us to position the text in the center of the bar
      .attr("y", d => yScale(d.Gender) + (yScale.bandwidth()+4))
      .attr("x", 40, d => xScale(d.Hours))
      .text(d => d.Hours)
      .attr("dx", "200")
      .attr("dy", "-30");
  
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(190, ${height - margin.bottom, margin.top})`)
      .call(yAxis)
      .text(d.Gender)

  });