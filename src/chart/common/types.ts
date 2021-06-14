import { ScaleBand, ScaleLinear } from "d3-scale";
import { Selection } from "d3-selection";

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