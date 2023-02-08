import { createRangeLine, LinesData } from "../axis";
import { DrawChart } from "../common/types";
import { createScales, drawAxis, drawCircle, drawData, drawFill } from "./charta";
import { LineAxisParams, LineChartSettings } from "./types";

export const drawLineChart: DrawChart<LinesData, LineChartSettings, LineAxisParams> = (chartLayout, data, chartSizeParams, chartSettings, axisParams) =>{
	const ranges = createRangeLine(data);
	const scales = createScales(chartSizeParams, ranges);

	
	drawAxis(chartLayout, scales, chartSizeParams, ranges, axisParams)
	if (chartSettings.showFill) {
		drawFill(chartLayout, data, scales, chartSettings, axisParams);
	}

	drawData(chartLayout, data, scales, chartSettings);
	drawCircle(chartLayout, data, scales, chartSettings, axisParams);


	// drawData(chartLayout, data.slice(axisParams.now), scales, chartSettings);

}