import { max, min } from 'd3-array';
import { BarsData } from '../BarChart/types';
import { createRange } from './types';

export const createRangeBars: createRange<BarsData> = (data: BarsData) => {
  const minXVal = min(data.map(r => r.value)) || 0;
  const maxXVal = max(data.map(r => r.value)) || 0;

  const minYVal = min(data.map(r => r.name)) || 0;
  const maxYVal = max(data.map(r => r.name)) || 0;

  return { x: { min: minXVal, max: maxXVal }, y: { min: minYVal, max: maxYVal } };
}
