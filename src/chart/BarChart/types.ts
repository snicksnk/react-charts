import { numberScale, WordScale } from "../common/types";

export type BarValue = {
  value: number,
  name: string
}


export type BarScales = {
  x: WordScale,
  y: numberScale,
}

export type BarsData = Array<BarValue>;