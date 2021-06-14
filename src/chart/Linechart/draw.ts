import { createRangeLine, LinesData } from "../axis";
import { DrawChart } from "../common/types";
import { createScales, drawAxis, drawData } from "./charta";
import { LineAxisParams, LineChartSettings } from "./types";

export const drawLineChart: DrawChart<LinesData, LineChartSettings, LineAxisParams> = (chartLayout, data, chartSizeParams, chartSettings, axisParams) =>{
	const ranges = createRangeLine(data);
	const scales = createScales(chartSizeParams, ranges);
	drawAxis(chartLayout, scales, chartSizeParams, ranges, axisParams)
	drawData<LinesData>(chartLayout, data, scales, chartSettings);
}