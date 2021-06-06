import { max, min } from 'd3-array';
import { createRange } from './types';

export type DotData = Array<{
  x: number, y: number, r: number, fill: string
}>

export const createRangeDots: createRange<DotData> = (data: DotData) => {
  const minXVal = min(data.map(r => r.x)) || 0;
  const maxXVal = max(data.map(r => r.x)) || 0;

  const minYVal = min(data.map(r => r.y)) || 0;
  const maxYVal = max(data.map(r => r.y)) || 0;

  return { x: { min: minXVal, max: maxXVal }, y: { min: minYVal, max: maxYVal } };
}