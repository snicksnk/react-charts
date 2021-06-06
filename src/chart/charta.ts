import { scaleLinear } from "d3-scale";
import { min, max } from "d3-array";
import { select } from "d3-selection";
import { axisLeft, axisBottom } from "d3-axis";
import { Axis, ChartCanvas, ChartLayout, ChartMargins, Data, Size, SVG } from "./types";

export function createChart(ref: HTMLDivElement, size: Size, margin: ChartMargins) {
  const { width, height } = size;
  const svg = select(ref)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const chartCanvas = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const leftYAxis = svg.append('g').attr('class', 'leftYAxis')
    .attr("transform", `translate(${margin.left - margin.axisOffset}, ${margin.top})`);


  const bottomXAxis = svg.append('g').attr('class', 'bottomXaxis')
    .attr("transform", `translate(${margin.left}, ${height - margin.bottom + margin.axisOffset})`);

  const axis = {
    leftYAxis,
    bottomXAxis
  }

  return { svg, chartCanvas, axis };
}

export function resizeChart(svg: SVG, chartCanvas: ChartCanvas, axis: Axis, data: Data<any>, size: Size, margin: ChartMargin) {
  const { width, height } = size;
  svg.attr('width', width);
  svg.attr('height', height);

  chartCanvas.attr("transform", `translate(${margin.left}, ${margin.top})`);

}

const calcChartSize = (size: Size, margin: ChartMargins) => {
  const { top, right, bottom, left } = margin;
  const { width, height } = size;
  return {
    width: width - left - right,
    height: height - top - bottom
  };
};

export function drawData(chartLayout: ChartLayout, data: Data<any>, size: Size, margin: ChartMargins) {
  const { chartCanvas, axis } = chartLayout;

  const chartSize = calcChartSize(size, margin);

  const { width, height } = chartSize;

  const minXVal = min(data.map(r => r.x));
  const maxXVal = max(data.map(r => r.x));

  const minYVal = min(data.map(r => r.y));
  const maxYVal = max(data.map(r => r.y));

  const xScale = scaleLinear().range([0, width]).domain([minXVal, maxXVal]);
  const yScale = scaleLinear().range([height, 0]).domain([minYVal, maxYVal]);

  debugger


  // const ticks = xScale.ticks(5);

  // ticks.map(a => {

  // })

  const coords = data.map((record) => {
    return {
      x: xScale(record.x),
      y: yScale(record.y),
      r: record.r,
      fill: record.fill
    };
  });



  console.log(coords);

  const circles = chartCanvas.selectAll(".dot").data(coords);

  const axisY = axisLeft(yScale).tickValues([minYVal, (maxYVal - minYVal) / 2, maxYVal]);
  const axisX = axisBottom(xScale);

  axis.leftYAxis.call(axisY);
  axis.bottomXAxis.call(axisX)
  //svg.call(axisY);

  const dot = circles
    .enter()
    .append("g")
    .attr('class', 'dot')
    .attr('transform', d => `translate(${d.x}, ${d.y})`)

  dot.append('circle')
    .attr("r", d => d.r)
    .attr('fill', d => d.fill)

  dot.append('text')
    .text(``)
    .attr('x', d => d.r)

  const lineToAxis = dot.append('g')
    .attr('class', 'line_to_axis')

  lineToAxis.append('path')
    .attr('class', 'line_to_axis-line')
    .attr('d', d => `M 0 0 L ${-d.x} 0`)

  lineToAxis.append('text')
    .attr('x', d => -d.x)
    .attr('class', 'line_to_axis-value')
    .text((d, n) => data[n].y)

  lineToAxis.append('path')
    .attr('class', 'line_to_axis-line')
    .attr('d', d => `M 0 0 L  0 ${chartSize.height - d.y}`)

  lineToAxis.append('text')
    .attr('y', d => `${chartSize.height - d.y}`)
    .attr('class', 'line_to_axis-value')
    .text((d, n) => data[n].x)
}
