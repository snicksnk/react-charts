import { BarAxisParams, BarChartSettings, BarsData, BarWidth, Orintation } from "../BarChart/types";
import { drawData } from "./drawData";
import { max, min } from "d3-array";
import { calcChartSize } from "../Linechart/charta";
import { scaleBand, scaleLinear } from "d3-scale";
import { drawNumberAxis, drawWordsAxis } from "../common/axis";
import { AxisNames, ChartSizeParams, DrawChart } from "../common/types";
import { GantData } from "./types";


export const createBarRange = (data: GantData) => {
  const minVal = min(data.map(r => r.start)) || 0;;
  const maxVal = max(data.map(r => r.end)) || 0;

  const namesRange = data.map(d => d.name);
  return { value: { min: minVal, max: maxVal }, name: namesRange };
}


const getScales = (chartSizeParams: ChartSizeParams, chartSettings: BarChartSettings, range: ReturnType<typeof createBarRange>, valueAxis: AxisNames) => {
  const { size, margin } = chartSizeParams;
  const { width, height } = calcChartSize(size, margin);


  const nameBandSettings = {
    paddingInner: chartSettings.barWidth === BarWidth.THIN ? 0.9 : 0.05,
    paddingOuter: 0.5,
    align: 0.5
  }

  const nameScale = scaleBand().range([0, valueAxis === AxisNames.Y ? width : height])
    .domain(range.name)
    .paddingInner(nameBandSettings.paddingInner)
    .paddingOuter(nameBandSettings.paddingOuter)
    .align(nameBandSettings.align)
  

  const valueScaleRange = valueAxis === 'y' ? [height, 0] : [0, width];
  const valueScale = scaleLinear().range(valueScaleRange).domain([range.value.min, range.value.max]);

  return { valueScale, nameScale }
}

export const drawGantChart: DrawChart<GantData, BarChartSettings, BarAxisParams> = (chartLayout, data, chartSizeParams, chartSettings, axisParams) => {
  const range = createBarRange(data);

  const axisName = chartSettings.orientation === Orintation.HORIZONTAL ? AxisNames.X : AxisNames.Y;

  const { valueScale, nameScale } = getScales(chartSizeParams, chartSettings, range, axisName);

  if (axisName === AxisNames.X) {
    drawNumberAxis(chartLayout.axis, valueScale, chartSizeParams, range.value, axisParams, AxisNames.X);
    drawWordsAxis(chartLayout.axis, nameScale, chartSizeParams, range.name, axisParams, AxisNames.Y);
    drawData(chartLayout, data, { y: nameScale, x: valueScale }, chartSettings, chartSizeParams, axisName);
  } else {
    drawNumberAxis(chartLayout.axis, valueScale, chartSizeParams, range.value, axisParams, AxisNames.Y);
    drawWordsAxis(chartLayout.axis, nameScale, chartSizeParams, range.name, axisParams, AxisNames.X);
    // drawAxis(chartLayout, scales, chartSizeParams, ranges, axisParams)
    drawData(chartLayout, data, { x: nameScale, y: valueScale }, chartSettings, chartSizeParams, axisName);
  }
}
