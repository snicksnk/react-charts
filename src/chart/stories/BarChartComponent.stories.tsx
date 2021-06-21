import React from 'react';
import { Story, Meta } from '@storybook/react';

import ChartComponent, { ChartComponentProps } from '../ChartComponent';
import { BarAxisParams, BarChartSettings, BarsData, BarWidth, Orintation } from '../BarChart/types';
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
    { value: 30, name: 'iOS' },
    { value: 25, name: 'Android' },
    { value: 31, name: 'Linux' },
    { value: 12, name: 'Windows' },
    { value: 5, name: 'Solaris' }
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
    orientation: Orintation.VERTICAL,
    barWidth: BarWidth.WIDE,
  },
  drawChart: drawBarChart
};

export const ThinHorizontalBarChart = Template.bind({});
ThinHorizontalBarChart.args = {
  data: [
    { value: 30, name: 'iOS' },
    { value: 25, name: 'Android' },
    { value: 31, name: 'Linux' },
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
      x: true
    }
  },
  chartSettings: {
    orientation: Orintation.HORIZONTAL,
    barWidth: BarWidth.THIN,
  },
  drawChart: drawBarChart
};

export const HorizontalBarChartWithoutGrid = Template.bind({});
HorizontalBarChartWithoutGrid.args = {
  data: [
    { value: 30, name: 'iOS' },
    { value: 25, name: 'Android' },
    { value: 31, name: 'Linux' },
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
      x: false
    }
  },
  chartSettings: {
    orientation: Orintation.HORIZONTAL,
    barWidth: BarWidth.WIDE,
  },
  drawChart: drawBarChart
};