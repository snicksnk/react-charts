import { scaleLinear, scaleQuantize, scaleSequential } from "d3-scale";
import { select } from "d3-selection";
import { axisLeft, axisBottom } from "d3-axis";
import { LineAxisParams, AxisRange, LineChartSettings, Range, LineChartScales, LineCurveType, LineDotted, TicksSettings } from "./types";
import { curveLinear, curveLinearClosed, curveMonotoneX, line, curveBasis, curveNatural, curveMonotoneY, curveBundle } from "d3-shape";
import { AxisNames, ChartLayout, ChartMargins, ChartSizeParams, Size } from "../common/types";
import { LinesData } from "../axis";
import { min, max, minIndex, maxIndex } from "d3-array";
import { drawLateCustom, drawLatex } from "../common/utils";
import { ColorRangeType } from "../theme/types";



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

  const defs = svg.append('defs');

  const gradient = defs.append('linearGradient')
  .attr('id', 'svgGradient')
  .attr('x1', '0%')
  .attr('x2', '100%')
  .attr('y1', '100%')
  .attr('y2', '100%');

  gradient.append('stop')
  .attr('class', 'start')
  .attr('offset', '0%')
  .attr('stop-color', '#dbe4f8')
  .attr('stop-opacity', 1);


  gradient.append('stop')
  .attr('class', 'end')
  .attr('offset', '70%')
  .attr('stop-color', '#baece4')
  .attr('stop-opacity', 1);


  gradient.append('stop')
  .attr('class', 'end')
  .attr('offset', '100%')
  .attr('stop-color', '#baece4')
  .attr('stop-opacity', 1);


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

export const calcChartSize = (size: Size, margin: ChartMargins) => {
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

export const axisSteps = (range: Range, axisConfig: TicksSettings, axisName: AxisNames) => {
  const stepFromConfig = axisConfig.step?.[axisName];
  const ticksListFromConfig = axisConfig.ticksList?.[axisName];

  if (ticksListFromConfig) {
    return ticksListFromConfig;
  } else {
    const step = stepFromConfig || (range.max - range.min) / 4;
    const ticks = (new Array(Math.ceil((range.max - range.min) / step))).fill(0).reduce((acc: Array<number>, _, k) => {
      acc.push(range.min + k * step);
      return acc;
    }, [])

    ticks.push(range.max);
    return ticks;
  }
}

export const drawAxis = (chartLayout: ChartLayout, scales: LineChartScales, chartSizeParams: ChartSizeParams, ranges: AxisRange, axisParams: LineAxisParams) => {
  const { tickSettings } = axisParams;
  const { size, margin } = chartSizeParams
  const { axis } = chartLayout;


  const chartSize = calcChartSize(size, margin);

  const { width, height } = chartSize;


  const ticksY = axisSteps(ranges.y, tickSettings, AxisNames.Y);
  const ticksX = axisSteps(ranges.x, tickSettings, AxisNames.X);

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
  axis.bottomXAxis.call(axisX);
  axis.bottomXAxis.call(axisX);
  
  if (axisParams.tickSettings.ticksLatex?.x) {
    axis.bottomXAxis.call(drawLateCustom({
      axis: {
        line: {
          stroke: 'red',
        },
        ticks: {
          fill: 'red',
          'font-size': '12px'
        }
      },
      chart: {
        colors: {
          type: ColorRangeType.quantize,
          range: ['red']
        }
      }
    }, AxisNames.X, axisParams.tickSettings) as any)
  } else {

  }
}



export function drawData(chartLayout: ChartLayout, data: LinesData, scales: LineChartScales, chartSettings: LineChartSettings) {
  const { chartCanvas } = chartLayout;




  const { lineCurveType, lineDotted } = chartSettings;


  // const { tickSettings } = axisParams;
  // const ranges = createRange(data);
  // const scales = createScales(chartSizeParams, ranges);
  // drawAxis(chartLayout, scales, chartSizeParams, ranges, tickSettings);

  // const circles = chartCanvas.selectAll<SVGGElement, D>(".dot").data(coords)


  // const dataWithExtras = [  ...data];


  const lines = chartCanvas.selectAll<SVGPathElement, LinesData>(".path").data(data);


  // circles.attr('transform', d => `translate(${d.x}, ${d.y})`);




  const getLineColor = scaleQuantize<string, string>()
    .domain([0, data.length])
    .range([
      '#3b7eb7',
      '#7c747414',
      '#94a9bc',
    ]);

  // axis.leftYAxis.call(axisY);
  // axis.bottomXAxis.call(axisX)
  //svg.call(axisY);


  const lineCreate = lines.enter()
    .append('path')
    .attr('class', 'path')
    .attr("stroke", "black")
    .attr('fill', 'none');



  lineCreate.merge(lines)
    .attr("d", (d, n) => line<any>()
      .curve(lineCurveType[(n as any)] === LineCurveType.CURVED ? curveLinear : curveLinear)
      .x((d) => { return scales.x(d.x) })
      .y((d) => { return scales.y(d.y) })(d)
    )
    .attr('stroke', (_, k) => {
      return getLineColor(k)
    })
    .attr('stroke-dasharray', (d, n) => lineDotted[(n as any)] === LineDotted.DOTTED ? '4' : '0')

  lines.exit().remove();

}




export function drawFill(chartLayout: ChartLayout, data: LinesData, scales: LineChartScales, chartSettings: LineChartSettings, axisParams: LineAxisParams) {
  const { chartCanvas } = chartLayout;


  const getLineColor = scaleQuantize<string, string>()
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



  // const dataWithExtras = [ { x: data[0][0]?.x, y: 0 }, ...data];


 

  const fill = chartCanvas.selectAll<SVGPathElement, LinesData>(".fill").data(data.slice(0,1).map(dots => {
    
    const minX = min(dots.map(d => d.x));
    const maxX = max(dots.map(d => d.y));

    const minY = min(dots.map(d => d.y))

    const minPoint = {
      x: minX,
      y: minY
    }

    // const maxPoint = {
    //   x: maxX,
    //   y: minY
    // }


    const endPoint = {
      x: dots[axisParams.now || 0].x,
      y: minY,
    }

    debugger;

    return [ minPoint, ...dots.slice(0, axisParams.now + 1), endPoint];
  }));

  // axis.leftYAxis.call(axisY);
  // axis.bottomXAxis.call(axisX)
  //svg.call(axisY);


  const fillCreate = fill.enter()
    .append('path')
    .attr('class', 'fill')
    .attr("stroke", "none")
    .attr('fill', "url(#svgGradient)");



    fillCreate.merge(fill)
    .attr("d", (d, n) => line<any>()
      .curve(curveLinear)
      .x((d) => { return scales.x(d.x) })
      .y((d) => { return scales.y(d.y) })(d)
    )
    // .attr('stroke-dasharray', (d, n) => lineDotted[(n as any)] === LineDotted.DOTTED ? '4' : '0')

    fill.exit().remove();



}


export function drawCircle(chartLayout: ChartLayout, data: LinesData, scales: LineChartScales, chartSettings: LineChartSettings, axisParams: LineAxisParams) {
  const { chartCanvas } = chartLayout;

  const dots = data[0];
  const point = {
    x: dots[axisParams.now || 0].x,
    y: dots[axisParams.now || 0].y,
  }

  const circle = chartCanvas.selectAll<SVGCircleElement, LinesData>(".dot").data([point])

  const dot = circle
    .enter()
    .append("g")
    .attr('class', 'dot')
    .attr('fill', 'white')
    .attr('stroke', '#3b7eb7')
    .attr('stroke-width', 4)
  // .attr('transform', d => `translate(${d.x}, ${d.y})`);

  dot.merge(circle).attr('transform', d => `translate(${scales.x(d.x)}, ${scales.y(d.y)})`);

  // circles
  ;

  dot.append('circle')
    .attr("r", d => 7)
    .attr('fill', d => d.fill)
}
