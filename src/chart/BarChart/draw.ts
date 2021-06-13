import { DrawChart } from "../types";
import { BarsData } from "./types";
import { drawData } from "./drawData";
import { max, min } from "d3-array";
import { calcChartSize } from "../charta";
import { scaleBand, scaleLinear } from "d3-scale";
import { drawNumberAxis, drawWordsAxis } from "../common/axis";
import { AxisNames } from "../common/types";

export const drawBarChart: DrawChart<BarsData> = (chartLayout, data, chartSizeParams, chartSettings, axisParams) => {
  const minY = min(data.map(r => r.value)) || 0;
  const maxY = max(data.map(r => r.value)) || 0;



  const namesRange = data.map(d => d.name);

  const { size, margin } = chartSizeParams
  const { width, height } = calcChartSize(size, margin);
  const xScale = scaleBand().range([0, width]).domain(namesRange);

  const yScale = scaleLinear().range([height, 0]).domain([minY, maxY])//.nice();


  drawNumberAxis(chartLayout.axis.leftYAxis, chartLayout.axis.gridY, yScale, chartSizeParams, { min: minY, max: maxY }, axisParams, AxisNames.Y);
  drawWordsAxis(chartLayout.axis.bottomXAxis, chartLayout.axis.gridX, xScale, chartSizeParams, namesRange, axisParams, AxisNames.Y);
	// drawAxis(chartLayout, scales, chartSizeParams, ranges, axisParams)
	drawData<BarsData>(chartLayout, data, { x: xScale, y: yScale }, chartSettings, chartSizeParams);
}