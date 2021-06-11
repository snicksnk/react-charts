import { scaleLinear, scaleQuantize } from "d3-scale";
import { select } from "d3-selection";
import { axisLeft, axisBottom } from "d3-axis";
import { Axis, AxisParams, AxisRange, ChartCanvas, ChartLayout, ChartMargins, ChartSettings, ChartSizeParams, createRange, Data, Range, Scales, Size, SVG, TicksSettings } from "./types";
import { curveBasis, curveLinear, curveMonotoneX, line } from "d3-shape";



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

  const leftYAxis = svg.append('g').attr('class', 'axis leftYAxis')
    .attr("transform", `translate(${margin.left - margin.axisOffset}, ${margin.top})`);


  const bottomXAxis = svg.append('g').attr('class', 'axis bottomXaxis')
    .attr("transform", `translate(${margin.left}, ${height - margin.bottom + margin.axisOffset})`);

  const chartCanvas = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


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


export const createScales = (chartSizeParams: ChartSizeParams, ranges: AxisRange) => {
  const { size, margin } = chartSizeParams
  const { width, height } = calcChartSize(size, margin);


  const x = scaleLinear().range([0, width]).domain([ranges.x.min, ranges.x.max])//.nice();
  const y = scaleLinear().range([height, 0]).domain([ranges.y.min, ranges.y.max])//.nice();

  return { x, y };
}

const axisSteps = (range: Range, stepFromConfig?: number) => {
  const step = stepFromConfig || (range.max - range.min) / 4;
  const ticks = (new Array(Math.ceil((range.max - range.min) / step))).fill(0).reduce((acc, _, k) => {
    acc.push(range.min + k * step);
    return acc;
  }, [])

  ticks.push(range.max);
  return ticks;
}

export const drawAxis = (chartLayout: ChartLayout, scales: Scales, chartSizeParams: ChartSizeParams, ranges: AxisRange, axisParams: AxisParams) => {
  const { tickSettings } = axisParams;
  const { size, margin } = chartSizeParams
  const { axis } = chartLayout;


  const chartSize = calcChartSize(size, margin);

  const { width, height } = chartSize;

  const ticksY = axisSteps(ranges.y, tickSettings.step?.y);
  const ticksX = axisSteps(ranges.x, tickSettings.step?.x);

  const axisY = axisLeft(scales.y).tickValues(ticksY);//.ticks(3, 'f')//.tickValues([ranges.y.min, (ranges.y.max - ranges.y.min) / 2, ranges.y.max]);
  const axisX = axisBottom(scales.x).tickValues(ticksX);


  const gridY = axis.gridY.selectAll<SVGPathElement, Array<number>>('.grid-line').data(ticksY);
  const gridYCreate = gridY
    .enter()
    .append('path')

  gridYCreate.merge(gridY)
    .attr('class', 'grid-line')
    .attr("d", d => `M0, ${scales.y(d)}, L ${width}, ${scales.y(d)}`)
    .attr('stroke', 'black')

  gridY.exit().remove();


  const gridX = axis.gridX.selectAll<SVGPathElement, Array<number>>('.grid-line').data(ticksX);
  const gridXCreate = gridX
    .enter()
    .append('path')

  gridXCreate.merge(gridX)
    .attr('class', 'grid-line')
    .attr("d", d => `M${scales.x(d)}, 0 L ${scales.x(d)}, ${height}`)
    .attr('stroke', 'black')

  gridX.exit().remove();

  axis.leftYAxis.call(axisY);
  axis.bottomXAxis.call(axisX)
}



export function drawData<D = Array<any>>(chartLayout: ChartLayout, data: D & Array<any>, scales: Scales, chartSettings: ChartSettings) {
  const { chartCanvas } = chartLayout;




  const { lineCurveType } = chartSettings;


  // const { tickSettings } = axisParams;
  // const ranges = createRange(data);
  // const scales = createScales(chartSizeParams, ranges);
  // drawAxis(chartLayout, scales, chartSizeParams, ranges, tickSettings);

  // const circles = chartCanvas.selectAll<SVGGElement, D>(".dot").data(coords)

  const lines = chartCanvas.selectAll<SVGPathElement, Array<D>>(".path").data(data);


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
      //.curve((_, n) => lineCurveType[n] === 'CURVED' ?  curveMonotoneX : curveLinear)
      .x((d) => { return scales.x(d.x) })
      .y((d) => { return scales.y(d.y) })
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
