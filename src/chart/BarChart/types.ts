import { NumberScale, WordScale } from "../common/types";
import { TicksSettings } from "../types";

export type BarValue = {
  value: number,
  name: string
}


export type BarScales = {
  x: WordScale,
  y: NumberScale,
} | {
  x: NumberScale,
  y: WordScale
}

export interface BarAxisParams {
  tickSettings: TicksSettings
  showGrid: {
    x?: boolean,
    y?: boolean
  }
}

export enum Orintation {
  VERTICAL = 'VERTICAL',
  HORIZONTAL = 'HORIZONTAL'
}

// TODO add generic here
export interface BarChartSettings {
  orientation: Orintation
}

export type BarsData = Array<BarValue>;