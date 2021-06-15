import { AxisNames, ChartLayout, ChartSizeParams, NumberScale, WordScale } from "../common/types";
import { calcChartSize } from "../Linechart/charta";
import { BarChartSettings, BarScales, BarsData, BarValue } from "./types";

export function drawData(chartLayout: ChartLayout, data: BarsData, scales: BarScales, chartSettings: BarChartSettings, chartSizeParams: ChartSizeParams, valueAxis: AxisNames) {
  const { chartCanvas } = chartLayout;
  const lines = chartCanvas.selectAll<SVGRectElement, Array<BarValue>>(".bar-chart__chart__rect").data(data);

  const { size, margin } = chartSizeParams

  const chartSize = calcChartSize(size, margin);

  const lineCreate = lines.enter()
    .append('rect')
    .attr('class', 'bar-chart__chart__rect')


  const lineUpdate = lineCreate.merge(lines)
    // .attr('fill', (_, k) => {
    //   return getLineColor(k);
    // })
   
  if (valueAxis === AxisNames.Y) {
    lineUpdate
      .attr('x', (d) => {
        return (scales.x as WordScale)(d.name) || 0;
      })
      .attr('height', (d) => {
        return chartSize.height - (scales.y as NumberScale)(d.value);
      })
      .attr('width', (scales.x as WordScale).bandwidth())
      .attr('y', d => (scales.y as NumberScale)(d.value))
  } else {
    lineUpdate
      .attr('y', (d) => {
        return (scales.y as WordScale)(d.name) || 0;
      })
      .attr('height', (d) => {
        return (scales.y as WordScale).bandwidth();
      })
      .attr('width', d => (scales.x as NumberScale)(d.value))
      .attr('x', 0)
  }

  lines.exit().remove();
}