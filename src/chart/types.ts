import { axisRight } from "d3-axis";
import { ScaleLinear } from "d3-scale";
import { Selection } from "d3-selection";

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
  tickSettings: TicksSettings
}

export enum LineCurveType {
  STRAIGHT,
  CURVED
}

export interface Axis {
  leftYAxis: Selection<SVGGElement, unknown, null, undefined>,
  bottomXAxis: Selection<SVGGElement, unknown, null, undefined>
  gridX: Selection<SVGGElement, unknown, null, undefined>,
  gridY: Selection<SVGGElement, unknown, null, undefined>
}

export type Data<D> = Array<D>

export type SVG = Selection<SVGSVGElement, unknown, null, undefined>;
export type ChartCanvas = Selection<SVGGElement, unknown, null, undefined>;

export interface ChartLayout {
  svg: SVG
  chartCanvas: ChartCanvas
  axis: Axis
}

export type Range = {
  min: number,
  max: number
}

export type AxisRange = {
  x: Range,
  y: Range
}

export type Scales = {
  x: ScaleLinear<number, number, never>,
  y: ScaleLinear<number, number, never>,
}

export type TicksSettings = {
  x: number,
  y: number
}

export type createRange<D> = (data: D) => AxisRange