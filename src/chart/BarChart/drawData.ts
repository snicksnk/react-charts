import { scaleQuantize } from "d3-scale";
import { calcChartSize } from "../charta";
import { ChartLayout, ChartSettings, ChartSizeParams } from "../types";
import { BarScales } from "./types";

export function drawData<D = Array<any>>(chartLayout: ChartLayout, data: D & Array<any>, scales: BarScales, chartSettings: ChartSettings,  chartSizeParams: ChartSizeParams) {
  const { chartCanvas } = chartLayout;
  const lines = chartCanvas.selectAll<SVGRectElement, Array<D>>(".rect").data(data);

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



  lineCreate.merge(lines)
    .attr('x', (d) => {
     return scales.x(d.name) || 0;
    })
    .attr('height', (d) => {
      return chartSize.height - scales.y(d.value);
    })
    .attr('width', scales.x.bandwidth())
    .attr('y', d => scales.y(d.value))
    .attr('fill', (_, k) => {
      return getLineColor(k);
    })

  lines.exit().remove();



}