import React from 'react';
import { Story, Meta } from '@storybook/react';

import ChartComponent, { ChartComponentProps } from '../ChartComponent';
import { drawLineChart } from '../Linechart/draw';
import { LinesData } from '../axis';
import { LineAxisParams, LineChartSettings } from '../types';

export default {
  title: 'Example/LineChart',
  component: ChartComponent,
  // argTypes: {
  //   className: { control: 'string' },
  // }
} as Meta;


// export default {
//   title: 'Example/Button',
//   component: Button,
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
// } as Meta;


const Template: Story<ChartComponentProps<LinesData, LineChartSettings, LineAxisParams>> = (args) => <ChartComponent {...args} />;

export const ChartWithDefaultTicks = Template.bind({});
ChartWithDefaultTicks.args = {
  data: [[
    { x: 30, y: 20 },
    { x: 82, y: 13 },
    { x: 93, y: 120 },
  ],
  [
    { x: 34, y: 33 },
    { x: 42, y: 23 },
    { x: 90, y: 53 },
  ]
  ],
  axisParams: {
    tickSettings: {
      step: {
      }
    },
    showGrid: {
      x: true,
      y: true
    }
  },
  chartSettings: {
    lineCurveType: []
  },
  drawChart: drawLineChart
};


export const ChartWithCustomStepTicks = Template.bind({});
ChartWithCustomStepTicks.args = {
  data: [[
    { x: 30, y: 20 },
    { x: 82, y: 13 },
    { x: 93, y: 120 },
  ],
  [
    { x: 34, y: 33 },
    { x: 42, y: 23 },
    { x: 90, y: 53 },
  ]
  ],
  axisParams: {
    tickSettings: {
      step: {
        x: 50,
        y: 20
      }
    },
    showGrid: {
      x: true,
      y: true
    }
  },
  chartSettings: {
    lineCurveType: []
  },
  drawChart: drawLineChart
};

// export const LoggedOut = Template.bind({});
// LoggedOut.args = {
// };
