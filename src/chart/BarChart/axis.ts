import { axisBottom, axisLeft } from 'd3-axis';
import { axisSteps, calcChartSize } from '../Linechart/charta';
import { LineAxisParams, AxisRange, ChartLayout, ChartSizeParams, Scales } from '../types';

export const drawAxis = (chartLayout: ChartLayout, scales: Scales, chartSizeParams: ChartSizeParams, ranges: AxisRange, axisParams: LineAxisParams) => {
  const { tickSettings } = axisParams;
  const { size, margin } = chartSizeParams
  const { axis } = chartLayout;


  const chartSize = calcChartSize(size, margin);

  const { width, height } = chartSize;


  const ticksY = axisSteps(ranges.y, tickSettings.step?.y);
  const ticksX =  axisSteps(ranges.y, tickSettings.step?.y);

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