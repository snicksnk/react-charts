import React from 'react';
import { Story, Meta } from '@storybook/react';

import ChartComponent, { ChartComponentProps } from '../ChartComponent';
import { BarAxisParams, BarChartSettings, BarWidth, Orintation } from '../BarChart/types';
import { drawGantChart } from '../GantChart/draw';
import { GantData } from '../GantChart/types';

export default {
  title: 'Example/GantChart',
  component: ChartComponent,
  argTypes: {
    className: { control: 'string' },
  },
} as Meta;


// export default {
//   title: 'Example/Button',
//   component: Button,
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
// } as Meta;


const Template: Story<ChartComponentProps<GantData, BarChartSettings, BarAxisParams>> = (args) => <ChartComponent {...args} />;

export const GantChart = Template.bind({});
GantChart.args = {
  data: [
    { start: 0, end: 8, name: 'JAN' },
    { start: 5, end: 12, name: 'FEB' },
    { start: 8, end: 20, name: 'MAR' },
    { start: 16, end: 25, name: 'APR' },
    { start: 20, end: 28, name: 'MAY' },
  ],
  axisParams: {
    tickSettings: {
      step: {
      },
      ticksList: {

      },
      ticksLatex: {
        
      }
    },
    showGrid: {
      y: true
    }
  },
  chartSettings: {
    orientation: Orintation.HORIZONTAL,
    barWidth: BarWidth.THIN,
  },
  drawChart: drawGantChart
};
