import { scaleLinear, scaleQuantize } from "d3-scale";
import { select } from "d3-selection";
import { axisLeft, axisBottom } from "d3-axis";
import { Axis, AxisRange, ChartCanvas, ChartLayout, ChartMargins, ChartSizeParams, createRange, Data, Size, SVG } from "./types";
import { line } from "d3-shape";

export function createChart(ref: HTMLDivElement, chartSizeParams: ChartSizeParams) {
  const { size, margin } = chartSizeParams;
  const { width, height } = size;

  const svg = select(ref)
    .append("svg")
    .attr("width", width)
    .attr("height", height);



  const gridY = svg.append('g').attr('class', 'grid grid-y')
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const gridX = svg.append('g').attr('class', 'grid grid-x')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  const chartCanvas = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const leftYAxis = svg.append('g').attr('class', 'axis leftYAxis')
    .attr("transform", `translate(${margin.left - margin.axisOffset}, ${margin.top})`);


  const bottomXAxis = svg.append('g').attr('class', 'axis bottomXaxis')
    .attr("transform", `translate(${margin.left}, ${height - margin.bottom + margin.axisOffset})`);


  const axis = {
    leftYAxis,
    bottomXAxis,
    gridY,
    gridX
  }

  return { svg, chartCanvas, axis };
}

export function resizeChart(chartLayout: ChartLayout, chartSizeParams: ChartSizeParams) {
  const { size, margin } = chartSizeParams;
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

const drawAxis = (chartLayout: ChartLayout, chartSizeParams: ChartSizeParams, ranges: AxisRange) => {
  const { size, margin } = chartSizeParams
  const { axis } = chartLayout;

  const chartSize = calcChartSize(size, margin);

  const { width, height } = chartSize;


  const xScale = scaleLinear().range([0, width]).domain([ranges.x.min, ranges.x.max]);
  const yScale = scaleLinear().range([height, 0]).domain([ranges.y.min, ranges.y.max]);


  const axisY = axisLeft(yScale).ticks(3, 'f')//.tickValues([ranges.y.min, (ranges.y.max - ranges.y.min) / 2, ranges.y.max]);
  const axisX = axisBottom(xScale);


  const gridY = axis.gridY.selectAll<SVGPathElement, Array<number>>('.grid-line').data(axisY.scale().ticks());
  const gridYCreate = gridY
    .enter()
    .append('path')

  gridYCreate.merge(gridY)
    .attr('class', 'grid-line')
    .attr("d", d => `M0, ${yScale(d)}, L ${width}, ${yScale(d)}`)
    .attr('stroke', 'black')

  gridY.exit().remove();


  const gridX = axis.gridX.selectAll<SVGPathElement, Array<number>>('.grid-line').data(axisX.scale().ticks());
  const gridXCreate = gridX
    .enter()
    .append('path')

  gridXCreate.merge(gridX)
    .attr('class', 'grid-line')
    .attr("d", d => `M${xScale(d)}, 0 L ${xScale(d)}, ${height}`)
    .attr('stroke', 'black')

  gridX.exit().remove();

  axis.leftYAxis.call(axisY);
  axis.bottomXAxis.call(axisX)

  return { xScale, yScale };
}



export function drawData<D = Array<any>>(chartLayout: ChartLayout, data: D & Array<any>, createRange: createRange<any>, chartSizeParams: ChartSizeParams) {
  const { chartCanvas } = chartLayout;


  const ranges = createRange(data);

  const { xScale, yScale } = drawAxis(chartLayout, chartSizeParams, ranges);
  const coords = data.map(line => line.map((record) => {
    return {
      x: xScale(record.x),
      y: yScale(record.y),
      r: record.r,
      fill: record.fill
    };
  }));

  // const circles = chartCanvas.selectAll<SVGGElement, D>(".dot").data(coords)

  const lines = chartCanvas.selectAll<SVGPathElement, Array<D>>(".path").data(coords);


  // circles.attr('transform', d => `translate(${d.x}, ${d.y})`);




  const getLineColor = scaleQuantize<string, unknown>()
    .domain([0, data.length])
    .range([
      '#9077F5',
      '#B7A5FF',
      '#A951DF',
      '#D89DFD',
      '#F372C7',
      '#F897D7',
      '#F79031',
      '#FEAC60',
      '#95D354',
      '#C7EAA3',
      '#FF7D8D',
      '#FFAAB4',
      '#33B5A5',
      '#50DAC9',
      '#4081FF',
      '#8FB5FF']);

  // axis.leftYAxis.call(axisY);
  // axis.bottomXAxis.call(axisX)
  //svg.call(axisY);


  const lineCreate = lines.enter()
    .append('path')
    .attr('class', 'path')
    .attr("stroke", "black")
    .attr('fill', 'none');

  lineCreate.merge(lines)
    .attr("d", line<any>()
      .x((d) => { return (d.x) })
      .y((d) => { return (d.y) })
    )
    .attr('stroke', (_, k) => {
      return getLineColor(k)
    })

  lines.exit().remove();

  // const dot = circles
  //   .enter()
  //   .append("g")
  //   .attr('class', 'dot')
  // // .attr('transform', d => `translate(${d.x}, ${d.y})`);

  // dot.merge(circles).attr('transform', d => `translate(${d.x}, ${d.y})`);

  // // circles
  // ;

  // dot.append('circle')
  //   .attr("r", d => d.r)
  //   .attr('fill', d => d.fill)

}
