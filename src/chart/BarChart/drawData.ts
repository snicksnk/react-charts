import { scaleQuantize } from "d3-scale";
import { AxisNames, NumberScale, WordScale } from "../common/types";
import { calcChartSize } from "../Linechart/charta";
import { ChartLayout, ChartSizeParams } from "../types";
import { BarChartSettings, BarScales, BarsData, BarValue } from "./types";

export function drawData(chartLayout: ChartLayout, data: BarsData, scales: BarScales, chartSettings: BarChartSettings, chartSizeParams: ChartSizeParams, valueAxis: AxisNames) {
  const { chartCanvas } = chartLayout;
  const lines = chartCanvas.selectAll<SVGRectElement, Array<BarValue>>(".rect").data(data);

  const { size, margin } = chartSizeParams

  const chartSize = calcChartSize(size, margin);

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


  const lineCreate = lines.enter()
    .append('rect')
    .attr('class', 'rect')
    .attr("stroke", "black")
    .attr('fill', 'red');



  const lineUpdate = lineCreate.merge(lines)
    .attr('fill', (_, k) => {
      return getLineColor(k);
    })
   
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