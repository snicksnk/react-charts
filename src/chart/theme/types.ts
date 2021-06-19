export type Color = string;
export type CssSize = string;

export enum ColorRangeType {
  quantize = 'quantize',
  range = 'range'
}

export interface ChartTheme {
  axis: {
    line: {
      stroke: Color,
    },
    ticks: {
      fill: Color,
      'font-size': CssSize
    }
  },
  chart: {
    colors: {
      type: ColorRangeType ,
      range: Array<Color>
    }
  }
}