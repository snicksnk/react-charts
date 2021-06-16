import { AxisNames, ChartLayout, ChartSizeParams } from "../common/types";
import { calcChartSize } from "../Linechart/charta";
import { BarChartSettings, BarValue } from "../BarChart/types";
import { ClusteredBarData, ClusteredBarScales } from "./types";
import { colorThemeElements} from "../common/scales";
import { scaleQuantize } from "d3-scale";

export function drawData(chartLayout: ChartLayout, data: ClusteredBarData, scales: ClusteredBarScales, chartSettings: BarChartSettings, chartSizeParams: ChartSizeParams, valueAxis: AxisNames) {
  const { chartCanvas } = chartLayout;
  const { size, margin } = chartSizeParams
  const chartSize = calcChartSize(size, margin);


  const group = chartCanvas.selectAll<SVGGElement, Array<BarValue>>(".clustered-bar-chart__chart__group").data(data);

  const groupCreate = group.enter()
    .append('g')
    .attr('class', 'clustered-bar-chart__chart__group');


  const groupUpdate = groupCreate.merge(group)
  const colorScale = scaleQuantize<string, string>()
    .domain([0, scales.names.bars.domain().length])
    .range(colorThemeElements);


  
  const rect = groupUpdate.selectAll<SVGRectElement, Array<BarValue>>('.clustered-bar-chart__chart__group__rect').data(group => group.bars);

  const rectCreate = rect.enter()
    .append('rect')
    .attr('class', 'clustered-bar-chart__chart__group__rect');

  const rectUpdate = rectCreate.merge(rect);

  const valueScale = scales.values;
  const groupScale = scales.names.groups;
  const barsScale = scales.names.bars;


  if (valueAxis === AxisNames.Y) {

    groupUpdate
      .attr('transform', group => `translate(${groupScale(group.groupName)}, 0)`)

    rectUpdate
      .attr('x', (d) => {
        return barsScale(d.name) || 0;
      })
      .attr('height', (d) => {
        return chartSize.height - valueScale(d.value);
      })
      .attr('width', barsScale.bandwidth())
      .attr('y', d => valueScale(d.value))
      .attr('fill', (_, k) => colorScale(k))

  } else {
    groupUpdate
      .attr('transform', group => `translate(0, ${groupScale(group.groupName)})`)

    rectUpdate
      .attr('y', (d) => {
        return barsScale(d.name) || 0;
      })
      .attr('height', barsScale.bandwidth())
      .attr('width', (d) => {
        return valueScale(d.value);
      })
      .attr('x', 0)
      .attr('fill', (_, k) => colorScale(k))
  }

  rectUpdate.exit().remove();
  groupUpdate.exit().remove();
}