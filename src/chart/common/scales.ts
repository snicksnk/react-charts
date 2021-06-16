import { scaleQuantize } from "d3-scale";




export const colorThemeElements = [
  '#9077F5',
  '#FEAC60',
  '#FC7E6D',
  '#B7A5FF',
  '#A951DF',
  '#D89DFD',
  '#F372C7',
  '#F897D7',
  '#F79031',
  '#95D354',
  '#C7EAA3',
  '#FF7D8D',
  '#FFAAB4',
  '#33B5A5',
  '#50DAC9',
  '#4081FF',
  '#8FB5FF'];


export const getLineColor = (range: [start: number, end: number]) => scaleQuantize<string, string>()
  .domain(range)
  .range(colorThemeElements);
