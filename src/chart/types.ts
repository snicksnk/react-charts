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

export interface Axis {
  leftYAxis: Selection<SVGGElement, unknown, null, undefined>,
  bottomXAxis: Selection<SVGGElement, unknown, null, undefined>
}

export type Data<D> = Array<D>

export type SVG = Selection<SVGSVGElement, unknown, null, undefined>;
export type ChartCanvas = Selection<SVGGElement, unknown, null, undefined>;

export interface ChartLayout {
  svg: SVG
  chartCanvas: ChartCanvas
  axis: Axis
}