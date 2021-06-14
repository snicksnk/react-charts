import { ScaleBand, ScaleLinear } from "d3-scale";
import { Selection } from "d3-selection";


export type SVG = Selection<SVGSVGElement, unknown, null, undefined>;
export type ChartCanvas = Selection<SVGGElement, unknown, null, undefined>;

export interface Axis {
  leftYAxis: Selection<SVGGElement, unknown, null, undefined>,
  bottomXAxis: Selection<SVGGElement, unknown, null, undefined>
  gridX: Selection<SVGGElement, unknown, null, undefined>,
  gridY: Selection<SVGGElement, unknown, null, undefined>
}

export interface ChartLayout {
  svg: SVG
  chartCanvas: ChartCanvas
  axis: Axis
}

export interface Size {
  width: number,
  height: number
}

export interface ChartMargins {
  top: number
  right: number
  bottom: number
  left: number
  axisOffset: number
}

export interface ChartSizeParams {
  size: Size
  margin: ChartMargins
}

export type Data<D> = Array<D>

export type DrawChart<DATA_TYPE, CHART_SETTINGS, AXIS_PARAMS> = (chartLayout: ChartLayout, data: DATA_TYPE, chartSizeParams: ChartSizeParams, chartSettings: CHART_SETTINGS, axisParams: AXIS_PARAMS) => void


export enum AxisNames {
  X = 'x',
  Y = 'y'
}

export interface RangeNumber {
  max: number,
  min: number
}

export type RangeWords = string[];

export type NumberScale = ScaleLinear<number, number, number>;
export type WordScale = ScaleBand<string>;


export type LayoutGrid = Selection<SVGGElement, unknown, null, undefined>;
export type LayoutAxis = Selection<SVGGElement, unknown, null, undefined>;