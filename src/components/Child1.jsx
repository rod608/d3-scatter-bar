import { Component } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

class ScatterPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    const { data } = this.props;

    // Set the dimensions and margins of the graph
    const margin = { top: 50, right: 10, bottom: 60, left: 50 },
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // Select the container and set dimensions
    const svg = d3
      .select(".scatter-plot-svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom + 50);

    // Create the main group with translation for margin space
    const mainGroup = svg
      .select(".main-group")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add or update title
    svg
      .selectAll(".chart-title")
      .data([0])
      .join("text")
      .attr("class", "chart-title")
      .attr("x", (width + margin.left + margin.right) / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .text("Total Bill vs. Tips");

    // Add x-axis
    const xData = data.map((item) => item.total_bill);
    const xScale = d3.scaleLinear().domain([0, 50]).range([0, width]);
    mainGroup
      .selectAll(".x-axis-group")
      .data([0])
      .join("g")
      .attr("class", "x-axis-group")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(10).tickValues(d3.range(0, 55, 5)));

    // Add y-axis
    const yData = data.map((item) => item.tip);
    const yScale = d3.scaleLinear().domain([0, 10]).range([height, 0]);
    mainGroup
      .selectAll(".y-axis-group")
      .data([0])
      .join("g")
      .attr("class", "y-axis-group")
      .call(d3.axisLeft(yScale).ticks(10));

    // Add y-axis label (rotated "Tips")
    mainGroup
      .selectAll(".y-axis-label")
      .data([0])
      .join("text")
      .attr("class", "y-axis-label")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 16)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Tips");

    // Add x-axis label ("Total Bill")
    mainGroup
      .selectAll(".x-axis-label")
      .data([0])
      .join("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 15)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Total Bill");

    // Plot the data points
    mainGroup
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(d.total_bill))
      .attr("cy", (d) => yScale(d.tip))
      .attr("r", 3)
      .style("fill", "#69b3a2");
  }

  render() {
    return (
      <svg className="scatter-plot-svg">
        <g className="main-group"></g>
      </svg>
    );
  }
}

ScatterPlot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      total_bill: PropTypes.number.isRequired,
      tip: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ScatterPlot;
