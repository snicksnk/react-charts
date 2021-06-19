import { AxisNames, ChartLayout, ChartSizeParams } from "../common/types";
import { calcChartSize } from "../Linechart/charta";
import { BarChartSettings, BarValue } from "../BarChart/types";
import { ClusteredBarData, ClusteredBarScales } from "../SegmentedBarChart/types";
import { scaleQuantize } from "d3-scale";
import { createBarRange } from "./draw";
import { ChartTheme } from "../theme/types";

export function drawData(chartLayout: ChartLayout, data: ClusteredBarData, scales: ClusteredBarScales, chartSettings: BarChartSettings, chartSizeParams: ChartSizeParams, valueAxis: AxisNames, range: ReturnType<typeof createBarRange>, theme: ChartTheme ) {
  const { chartCanvas } = chartLayout;
  const { size, margin } = chartSizeParams
  const chartSize = calcChartSize(size, margin);


  // HACK
  const dataWithBarsWithId = data.map((group, n) => {
    const updatedBars = group.bars.map(bar => ({ ...bar, groupN: n }))
    return { ...group, bars: updatedBars };
  });

  const group = chartCanvas.selectAll<SVGGElement, Array<BarValue>>(".clustered-bar-chart__chart__group").data(dataWithBarsWithId);

  const groupCreate = group.enter()
    .append('g')
    .attr('class', 'clustered-bar-chart__chart__group');


  const groupUpdate = groupCreate.merge(group)
  const colorScale = scaleQuantize<string, string>()
    .domain([0, scales.names.bars.domain().length])
    .range(theme.chart.colors.range);
  
  const rect = groupUpdate
    .selectAll<SVGRectElement, Array<BarValue>>('.clustered-bar-chart__chart__group__rect')
    .data(group => group.bars);

  const rectCreate = rect.enter()
    .append('rect')
    .attr('class', 'clustered-bar-chart__chart__group__rect');

  const rectUpdate = rectCreate.merge(rect);

  const valueScale = scales.values;
  const groupScale = scales.names.groups;
  const barsScale = scales.names.bars;


  if (valueAxis === AxisNames.Y) {
    barsScale.range()
    groupUpdate
      .attr('transform', group => `translate(${groupScale(group.groupName)}, 0)`)

    rectUpdate
      .attr('x', (d) => {
        return 0
      })
      .attr('y', (d) => {
        const stackForGroup = range.stacks[d.name][d.groupN];
        return valueScale(stackForGroup[1])
      })
      .attr('height', (d) => {
        const stackForGroup = range.stacks[d.name][d.groupN];
        return chartSize.height - valueScale(stackForGroup[1] - stackForGroup[0]);
      })
      .attr('width', groupScale.bandwidth())
      .attr('fill', (_, k) => colorScale(k))

  } else {
    groupUpdate
      .attr('transform', group => `translate(0, ${groupScale(group.groupName)})`)

    rectUpdate
      .attr('y', (d) => {
        return 0;
      })
      .attr('height', groupScale.bandwidth())
      .attr('width', (d) => {
        const stackForGroup = range.stacks[d.name][d.groupN];
        return valueScale(stackForGroup[1] - stackForGroup[0]);
      })
      .attr('x', d => {
        const stackForGroup = range.stacks[d.name][d.groupN];
        return valueScale(stackForGroup[0])
      })
      .attr('fill', (_, k) => colorScale(k))
  }

  rectUpdate.exit().remove();
  groupUpdate.exit().remove();
}