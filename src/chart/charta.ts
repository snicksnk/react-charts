import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { axisLeft, axisBottom } from "d3-axis";
import { Axis, ChartCanvas, ChartLayout, ChartMargins, createRange, Data, Size, SVG } from "./types";
import { line } from "d3-shape";

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

export function resizeChart(chartLayout: ChartLayout, size: Size, margin: ChartMargins) {
  const { svg, chartCanvas } = chartLayout;

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



export function drawData<D = Array<any>>(chartLayout: ChartLayout, data: D & Array<any>, createRange: createRange<any>, size: Size, margin: ChartMargins) {
  const { chartCanvas, axis } = chartLayout;

  const chartSize = calcChartSize(size, margin);

  const { width, height } = chartSize;

  const ranges = createRange(data);

  const xScale = scaleLinear().range([0, width]).domain([ranges.x.min, ranges.x.max]);
  const yScale = scaleLinear().range([height, 0]).domain([ranges.y.min, ranges.y.max]);

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



  const circles = chartCanvas.selectAll<SVGGElement, D>(".dot").data(coords)

  const lines = chartCanvas.selectAll<SVGPathElement, Array<D>>(".line").data([coords]);


  // circles.attr('transform', d => `translate(${d.x}, ${d.y})`);

  const axisY = axisLeft(yScale).tickValues([ranges.y.min, (ranges.y.max - ranges.y.min) / 2, ranges.y.max]);
  const axisX = axisBottom(xScale);

  axis.leftYAxis.call(axisY);
  axis.bottomXAxis.call(axisX)
  //svg.call(axisY);

  const lineCreate = lines.enter()
    .append('path')
    .attr('class', 'path')
    .attr("stroke", "black")
    .attr('fill', 'none')

  lineCreate.merge(lines).attr("d", line<any>()
    .x((d) => { return (d.x) })
    .y((d) => { return (d.y) })
  )

  const dot = circles
    .enter()
    .append("g")
    .attr('class', 'dot')
  // .attr('transform', d => `translate(${d.x}, ${d.y})`);

  dot.merge(circles).attr('transform', d => `translate(${d.x}, ${d.y})`);

  // circles
  ;

  dot.append('circle')
    .attr("r", d => d.r)
    .attr('fill', d => d.fill)

}
