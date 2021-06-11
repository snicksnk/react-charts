import React from 'react';
import { Story, Meta } from '@storybook/react';

import ChartComponent, { LineChartComponentProps } from '../ChartComponent';

export default {
  title: 'Example/Chart',
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


const Template: Story<LineChartComponentProps> = (args) => <ChartComponent {...args} />;

export const Chart = Template.bind({});
Chart.args = {
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
  },
  chartSettings: {
    lineCurveType: []
  }
};

// export const LoggedOut = Template.bind({});
// LoggedOut.args = {
// };
