import { ChartTheme, ColorRangeType } from "../types";



const BlackWhiteTheme: ChartTheme = {
  axis: {
    line: {
      stroke: '#E0E0E0',
    },
    ticks: {
      fill: '#000000',
      'font-size': '12px'
    }
  },
  chart: {
    colors: {
      type: ColorRangeType.quantize,
      range: [
        '#DBDBDB',
        '#9A9A9A',
        '#616161',
      ]
    }
  }
};

export default BlackWhiteTheme;