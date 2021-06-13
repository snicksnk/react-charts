import { axisBottom, axisLeft } from "d3-axis";
import { axisSteps, calcChartSize } from "../charta";
import { AxisParams, ChartSizeParams } from "../types";
import { AxisNames, LayoutAxis, LayoutGrid, numberScale, RangeNumber, RangeWords, WordScale } from "./types";

// TODO add vertical orientation
export const drawNumberAxis = (layoutAxis: LayoutAxis, layoutGrid: LayoutGrid, scale: numberScale, chartSizeParams: ChartSizeParams, range: RangeNumber, axisParams: AxisParams, axisName: AxisNames) => {
  const { tickSettings } = axisParams;
  const { size, margin } = chartSizeParams

  const { width } = calcChartSize(size, margin);
  const ticks = axisSteps(range, tickSettings.step?.[axisName]);


  debugger;
  const gridY = layoutGrid.selectAll<SVGPathElement, Array<number>>('.grid-line').data(ticks.reverse());
  const gridYCreate = gridY
    .enter()
    .append('path')

  gridYCreate.merge(gridY)
    .attr('class', 'grid-line')
    .attr("d", d => `M0, ${scale(d)}, L ${width}, ${scale(d)}`)
    .attr('stroke', 'black')

  gridY.exit().remove();

  const axisY = axisLeft(scale).tickValues(ticks);//.ticks(3, 'f')//.tickValues([ranges.y.min, (ranges.y.max - ranges.y.min) / 2, ranges.y.max]);
  layoutAxis.call(axisY);
}

export const drawWordsAxis = (layoutAxis: LayoutAxis, layoutGrid: LayoutGrid, scale: WordScale, chartSizeParams: ChartSizeParams, range: RangeWords, axisParams: AxisParams, axisName: AxisNames) => {
  const { tickSettings } = axisParams;
  const { size, margin } = chartSizeParams

  const { height } = calcChartSize(size, margin);

  const gridX = layoutGrid.selectAll<SVGPathElement, Array<number>>('.grid-line').data(range);
  const gridXCreate = gridX
    .enter()
    .append('path')

  gridXCreate.merge(gridX)
    .attr('class', 'grid-line')
    .attr("d", d => `M${scale(d)}, 0 L ${scale(d)}, ${height}`)
    .attr('stroke', 'black')

  gridX.exit().remove();

  const axis = axisBottom(scale);
  layoutAxis.call(axis)
}

// export const drawAxis = (chartLayout: ChartLayout, scales: Scales, chartSizeParams: ChartSizeParams, ranges: AxisRange, axisParams: AxisParams) => {
//   const { tickSettings } = axisParams;
//   const { size, margin } = chartSizeParams
//   const { axis } = chartLayout;


//   const chartSize = calcChartSize(size, margin);

//   const { width, height } = chartSize;


//   const ticksY = axisSteps(ranges.y, tickSettings.step?.y);
//   const ticksX = axisSteps(ranges.y, tickSettings.step?.y);

//   const axisY = axisLeft(scales.y).tickValues(ticksY);//.ticks(3, 'f')//.tickValues([ranges.y.min, (ranges.y.max - ranges.y.min) / 2, ranges.y.max]);
//   const axisX = axisBottom(scales.x).tickValues(ticksX);


//   const gridY = axis.gridY.selectAll<SVGPathElement, Array<number>>('.grid-line').data(ticksY);
//   const gridYCreate = gridY
//     .enter()
//     .append('path')

//   gridYCreate.merge(gridY)
//     .attr('class', 'grid-line')
//     .attr("d", d => `M0, ${scales.y(d)}, L ${width}, ${scales.y(d)}`)
//     .attr('stroke', 'black')

//   gridY.exit().remove();


//   const gridX = axis.gridX.selectAll<SVGPathElement, Array<number>>('.grid-line').data(ticksX);
//   const gridXCreate = gridX
//     .enter()
//     .append('path')

//   gridXCreate.merge(gridX)
//     .attr('class', 'grid-line')
//     .attr("d", d => `M${scales.x(d)}, 0 L ${scales.x(d)}, ${height}`)
//     .attr('stroke', 'black')

//   gridX.exit().remove();

//   axis.leftYAxis.call(axisY);
//   axis.bottomXAxis.call(axisX)
// }


