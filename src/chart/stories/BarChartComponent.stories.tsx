import React from 'react';
import { Story, Meta } from '@storybook/react';

import ChartComponent, { ChartComponentProps } from '../ChartComponent';
import { BarAxisParams, BarChartSettings, BarsData, Orintation } from '../BarChart/types';
import { drawBarChart } from '../BarChart/draw';

export default {
  title: 'Example/BarChart',
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


const Template: Story<ChartComponentProps<BarsData, BarChartSettings, BarAxisParams>> = (args) => <ChartComponent {...args} />;

export const VerticalBarChart = Template.bind({});
VerticalBarChart.args = {
  data: [
    { value: 30, name: 'vasya' },
    { value: 25, name: 'ivan' },
    { value: 31, name: 'fedor' },
  ],
  axisParams: {
    tickSettings: {
      step: {
      }
    },
    showGrid: {
      y: true
    }
  },
  chartSettings: {
    orientation: Orintation.VERTICAL
  },
  drawChart: drawBarChart
};

export const HorizontalBarChartWithoutGrid = Template.bind({});
HorizontalBarChartWithoutGrid.args = {
  data: [
    { value: 30, name: 'vasya' },
    { value: 25, name: 'ivan' },
    { value: 31, name: 'fedor' },
  ],
  axisParams: {
    tickSettings: {
      step: {
      }
    },
    showGrid: {
      y: false
    }
  },
  chartSettings: {
    orientation: Orintation.HORIZONTAL
  },
  drawChart: drawBarChart
};