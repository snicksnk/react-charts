import { ScaleLinear } from "d3-scale";

export interface LineAxisParams {
  tickSettings: TicksSettings
  showGrid: {
    x: boolean,
    y: boolean
  }
}

// TODO add generic here
export interface LineChartSettings {
  lineCurveType: Array<LineCurveType>
  lineDotted: Array<LineDotted>
}

export enum LineDotted {
  SOLID,
  DOTTED
}

export enum LineCurveType {
  STRAIGHT,
  CURVED
}



export type Range = {
  min: number,
  max: number
}

export type AxisRange = {
  x: Range,
  y: Range
}

export type LineChartScales = {
  x: ScaleLinear<number, number, never>,
  y: ScaleLinear<number, number, never>,
}

export type TicksSettings = {
  step: {
    x?: number,
    y?: number
  }
}

export type createRange<D> = (data: D) => AxisRange

