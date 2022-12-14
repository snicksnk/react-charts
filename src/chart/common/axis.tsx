import { axisBottom, axisLeft } from "d3-axis";
// import ReactMarkdown from 'react-markdown';

import { BarAxisParams } from "../BarChart/types";
import { axisSteps, calcChartSize } from "../Linechart/charta";
import { ChartTheme } from "../theme/types";
import { Axis, AxisNames, ChartSizeParams, NumberScale, RangeNumber, RangeWords, WordScale } from "./types";
import { drawLatex } from "./utils";

// TODO add vertical orientation
export const drawNumberAxis = (axis: Axis, scale: NumberScale, chartSizeParams: ChartSizeParams, range: RangeNumber, axisParams: BarAxisParams, axisName: AxisNames, theme: ChartTheme) => {
  const { tickSettings } = axisParams;
  const { size, margin } = chartSizeParams

  const { width, height } = calcChartSize(size, margin);
  const ticks = axisSteps(range, tickSettings, axisName);

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
    const axisX = axisBottom(scale)
      // .tickFormat((d, i) => ['<b>a</b>', 'e', 'i', 'o', 'u'][i])
      .tickValues(ticks);
    layoutAxis.call(axisX)

    if (axisParams.tickSettings.ticksLatex?.[axisName]) {
      layoutAxis.call((drawLatex(theme, axisName, axisParams.tickSettings) as any));
    }
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
    // layoutAxis.call(drawLatex(theme));
  } else {
    const axisWord = axisBottom(scale);
    layoutAxis.call(axisWord);
    // layoutAxis.call(drawLatex);
  }
}
