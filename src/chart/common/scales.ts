import { scaleQuantize } from "d3-scale";





export const getLineColor = (range: [start: number, end: number]) => scaleQuantize<string, string>()
.domain(range)
.range([
  '#9077F5',
  '#B7A5FF',
  '#A951DF',
  '#D89DFD',
  '#F372C7',
  '#F897D7',
  '#F79031',
  '#FEAC60',
  '#95D354',
  '#C7EAA3',
  '#FF7D8D',
  '#FFAAB4',
  '#33B5A5',
  '#50DAC9',
  '#4081FF',
  '#8FB5FF']);
