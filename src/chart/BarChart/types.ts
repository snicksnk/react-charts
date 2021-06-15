import { NumberScale, WordScale } from "../common/types";
import { TicksSettings } from "../Linechart/types";

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

export enum BarWidth {
  WIDE = 'WIDE',
  THIN = 'THIN'
}

// TODO add generic here
export interface BarChartSettings {
  orientation: Orintation
  barWidth: BarWidth
}

export type BarsData = Array<BarValue>;