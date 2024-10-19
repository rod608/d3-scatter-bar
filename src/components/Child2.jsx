import { Component } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    const { data } = this.props;

    // Calculate Average Tips for Each Day
    const groupedData = d3.group(data, (d) => d.day);
    const daysOfWeek = ["Sun", "Sat", "Thur", "Fri"];
    const avgTips = daysOfWeek.map((day) => {
      const dayData = groupedData.get(day) || [];
      const totalTips = d3.sum(dayData, (d) => d.tip);
      return dayData.length ? totalTips / dayData.length : 0;
    });

    // Set the dimensions and margins of the graph
    const margin = { top: 60, right: 30, bottom: 50, left: 60 },
      chartWidth = 800 - margin.left - margin.right,
      chartHeight = 600 - margin.top - margin.bottom;

    // Select the container and set dimensions
    const svg = d3
      .select(".bar-chart-svg")
      .attr("width", chartWidth + margin.left + margin.right)
      .attr("height", chartHeight + margin.top + margin.bottom);

    // Create the main group with translation for margin space
    const mainGroup = svg
      .select(".main-group")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Clear previous content
    mainGroup.selectAll("*").remove();

    // Create x-scale
    const xScale = d3
      .scaleBand()
      .domain(daysOfWeek)
      .range([0, chartWidth])
      .padding(0.1);

    // Create y-scale
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(avgTips)])
      .nice()
      .range([chartHeight, 0]);

    // Add x-axis
    mainGroup
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale));

    // Add y-axis
    mainGroup.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));

    // Add bars
    mainGroup
      .selectAll(".bar")
      .data(avgTips)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => xScale(daysOfWeek[i]))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => chartHeight - yScale(d))
      .style("fill", "#69b3a2");

    // Add x-axis label
    mainGroup
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", chartWidth / 2)
      .attr("y", chartHeight + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .text("Day");

    // Add y-axis label
    mainGroup
      .append("text")
      .attr("class", "y-axis-label")
      .attr("x", -chartHeight / 2)
      .attr("y", -margin.left + 25)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Average Tips");

    // Add chart title
    svg
      .append("text")
      .attr("class", "chart-title")
      .attr("x", (chartWidth + margin.left + margin.right) / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .text("Average Tips for Each Day");
  }

  render() {
    return (
      <svg className="bar-chart-svg">
        <g className="main-group"></g>
      </svg>
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      tip: PropTypes.number.isRequired,
      day: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BarChart;
