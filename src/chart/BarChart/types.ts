import { numberScale, WordScale } from "../common/types";

export type BarValue = {
  value: number,
  name: string
}


export type BarScales = {
  x: numberScale,
  y: WordScale
}

export type BarsData = Array<BarValue>;