import { createRangeLine, LinesData } from "../axis";
import { createScales, drawAxis, drawData } from "../charta";
import { DrawChart } from "../types";

export const drawLineChart: DrawChart<LinesData> = (chartLayout, data, chartSizeParams, chartSettings, axisParams) =>{
	const ranges = createRangeLine(data);
	const scales = createScales(chartSizeParams, ranges);
	drawAxis(chartLayout, scales, chartSizeParams, ranges, axisParams)
	drawData<LinesData>(chartLayout, data, scales, chartSettings);
}