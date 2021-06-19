import { BarAxisParams, BarChartSettings, BarWidth, Orintation } from "../BarChart/types";
import { max, sum } from "d3-array";
import { calcChartSize } from "../Linechart/charta";
import { scaleBand, scaleLinear } from "d3-scale";
import { drawNumberAxis, drawWordsAxis } from "../common/axis";
import { AxisNames, ChartSizeParams, DrawChart } from "../common/types";
import { ClusteredBarChartSettings, ClusteredBarData, ClusteredBarGroupValue } from "../SegmentedBarChart/types";
import { drawData } from "./drawData";
import { stack } from "d3-shape";

function onlyUnique(value: string, index: number, self: Array<string>) {
  return self.indexOf(value) === index;
}

function getKeyStack(keyName: string, keys: string[], stack: any): Array<Array<number>> {
  const keyN = keys.indexOf(keyName);
  return stack[keyN];
}
export const createBarRange = (data: ClusteredBarData) => {
  const minVal = 0;
  const groupSums = data.map(group => sum(group.bars, bar => bar.value));
  const maxVal = max(data, (group => sum(group.bars, bar => bar.value))) || 0;

  const groupsNames = data.map(d => d.groupName);
  const barsNames = data.map(group => group.bars.map(bar => bar.name).flat()).flat().filter(onlyUnique);
  const dataForStack = data.map(group => {
    return group.bars.reduce<Record<string, number>>((acc, val: ClusteredBarGroupValue['bars'][number]) => {
      acc[val.name] = val.value;
      return acc;
    }, {});
  })

  const stacksRaw = stack().keys(barsNames)(dataForStack);
  const stacks = barsNames.reduce<Record<string, Array<Array<number>>>>((acc, keyName: string) => {
    acc[keyName] = getKeyStack(keyName, barsNames, stacksRaw);
    return acc;
  }, {})

  return { value: { min: minVal, max: maxVal }, groupsNames, barsNames, groupSums, stacks };
}


const getScales = (chartSizeParams: ChartSizeParams, chartSettings: BarChartSettings, range: ReturnType<typeof createBarRange>, valueAxis: AxisNames) => {
  const { size, margin } = chartSizeParams;
  const { width, height } = calcChartSize(size, margin);


  const groupNameBandSettings = {
    paddingInner: chartSettings.barWidth === BarWidth.THIN ? 0.09 : 0.05,
    paddingOuter: 0.1,
    align: 0.5
  }

  const groupNamesScale = scaleBand().rangeRound([0, valueAxis === AxisNames.Y ? width : height])
    .domain(range.groupsNames)
    .paddingInner(groupNameBandSettings.paddingInner)
    .paddingOuter(groupNameBandSettings.paddingOuter)
    .align(groupNameBandSettings.align);

  const barNameBandSettings = {
    paddingInner: chartSettings.barWidth === BarWidth.THIN ? 0.8 : 0.1,
    paddingOuter: 0.5,
    align: 0.5
  }

  const barNamesScale = scaleBand().range([0, groupNamesScale.bandwidth()])
    .domain(range.barsNames)
    .paddingInner(barNameBandSettings.paddingInner)
    .paddingOuter(barNameBandSettings.paddingOuter)
    .align(barNameBandSettings.align)


  const valueScaleRange = valueAxis === 'y' ? [height, 0] : [0, width];
  const valueScale = scaleLinear().range(valueScaleRange).domain([range.value.min, range.value.max]);

  return { valueScale, groupNamesScale, barNamesScale }
}

export const drawClusteredBarChart: DrawChart<ClusteredBarData, ClusteredBarChartSettings, BarAxisParams> = (chartLayout, data, chartSizeParams, chartSettings, axisParams, theme) => {
  const range = createBarRange(data);


  const axisName = chartSettings.orientation === Orintation.HORIZONTAL ? AxisNames.X : AxisNames.Y;

  const { valueScale, groupNamesScale, barNamesScale } = getScales(chartSizeParams, chartSettings, range, axisName);

  if (axisName === AxisNames.X) {
    drawNumberAxis(chartLayout.axis, valueScale, chartSizeParams, range.value, axisParams, AxisNames.X);
    drawWordsAxis(chartLayout.axis, groupNamesScale, chartSizeParams, range.groupsNames, axisParams, AxisNames.Y);

    // drawData(chartLayout, data, { y: { groups: groupNamesScale, bars: barNamesScale }, x: valueScale }, chartSettings, chartSizeParams, axisName);
  } else {
    drawNumberAxis(chartLayout.axis, valueScale, chartSizeParams, range.value, axisParams, AxisNames.Y);
    drawWordsAxis(chartLayout.axis, groupNamesScale, chartSizeParams, range.groupsNames, axisParams, AxisNames.X);
    // drawData(chartLayout, data, { x: groupNamesScale, y: valueScale }, chartSettings, chartSizeParams, axisName);
  }

  drawData(chartLayout, data, { values: valueScale, names: { bars: barNamesScale, groups: groupNamesScale } }, chartSettings, chartSizeParams, axisName, range, theme);
}
