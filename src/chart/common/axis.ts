import { axisBottom, axisLeft } from "d3-axis";
import { BarAxisParams } from "../BarChart/types";
import { axisSteps, calcChartSize } from "../Linechart/charta";
import { Axis, ChartSizeParams } from "../types";
import { AxisNames, NumberScale, RangeNumber, RangeWords, WordScale } from "./types";

// TODO add vertical orientation
export const drawNumberAxis = (axis: Axis, scale: NumberScale, chartSizeParams: ChartSizeParams, range: RangeNumber, axisParams: BarAxisParams, axisName: AxisNames) => {
  const { tickSettings } = axisParams;
  const { size, margin } = chartSizeParams

  const { width, height } = calcChartSize(size, margin);
  const ticks = axisSteps(range, tickSettings.step?.[axisName]);

  const layoutAxis = axisName === 'y' ? axis.leftYAxis : axis.bottomXAxis;
  const layoutGrid = axisName === 'y' ? axis.gridY : axis.gridX;

  const gridY = layoutGrid.selectAll<SVGPathElement, Array<number>>('.grid-line').data(ticks.reverse());
  const gridYCreate = gridY
    .enter()
    .append('path')

  const gridMerge = gridYCreate.merge(gridY)
    .attr('class', 'grid-line')
    .attr('opacity', axisParams.showGrid?.[axisName] ? 1 : 0);

  if (axisName === 'y') {
    gridMerge
      .attr("d", d => `M0, ${scale(d)}, L ${width}, ${scale(d)}`)
  } else {
    gridMerge
      .attr("d", d => `M${scale(d)} 0, L ${scale(d)} ${height}`)
  }
  gridY.exit().remove();

  if (axisName === 'y') {
    const axisY = axisLeft(scale).tickValues(ticks);
    layoutAxis.call(axisY);
  } else {
    const axisX = axisBottom(scale).tickValues(ticks);
    layoutAxis.call(axisX)
  }
}

export const drawWordsAxis = (axis: Axis, scale: WordScale, chartSizeParams: ChartSizeParams, range: RangeWords, axisParams: BarAxisParams, axisName: AxisNames) => {
  // const { tickSettings } = axisParams;

  const layoutAxis = axisName === 'y' ? axis.leftYAxis : axis.bottomXAxis;
  // const layoutGrid = axisName === 'y' ? axis.gridY : axis.gridX;


  // const gridX = layoutGrid.selectAll<SVGPathElement, Array<number>>('.grid-line').data(range);
  // const gridXCreate = gridX
  //   .enter()
  //   .append('path')

  // gridXCreate.merge(gridX)
  //   .attr('class', 'grid-line')
  //   .attr("d", d => `M${scale(d)}, 0 L ${scale(d)}, ${height}`)
  //   .attr('stroke', 'black')

  // gridX.exit().remove();

  if (axisName === 'y') {
    const axisWord = axisLeft(scale);
    layoutAxis.call(axisWord)
  } else {
    const axisWord = axisBottom(scale);
    layoutAxis.call(axisWord)
  }
}

// export const drawAxis = (chartLayout: ChartLayout, scales: Scales, chartSizeParams: ChartSizeParams, ranges: AxisRange, axisParams: LineAxisParams) => {
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


