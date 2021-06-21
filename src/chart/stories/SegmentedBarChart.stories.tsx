import React from 'react';
import { Story, Meta } from '@storybook/react';

import ChartComponent, { ChartComponentProps } from '../ChartComponent';
import { BarAxisParams, BarWidth, Orintation } from '../BarChart/types';
import { ClusteredBarChartSettings, ClusteredBarData } from '../SegmentedBarChart/types';
import { drawClusteredBarChart } from '../SegmentedBarChart/draw';

export default {
  title: 'Example/ClusteredBarChart',
  component: ChartComponent,
  argTypes: {
    className: { control: 'string' },
  },
} as Meta;


const Template: Story<ChartComponentProps<ClusteredBarData, ClusteredBarChartSettings, BarAxisParams>> = (args) => <ChartComponent {...args} />;

export const VerticalBarChart = Template.bind({});
VerticalBarChart.args = {
  data: [{
    groupName: 'iOS',
    bars: [
      { value: 30, name: 'Phone' },
      { value: 20, name: 'Tablet' },
      { value: 60, name: 'SmartCloks' },
      { value: 17, name: 'Desktop' },
    ],
  },
  {
    groupName: 'Android',
    bars: [
      { value: 24, name: 'Phone' },
      { value: 45, name: 'Tablet' },
      { value: 67, name: 'SmartCloks' },
      { value: 17, name: 'Desktop' },
    ],
  },
  {
    groupName: 'Windows',
    bars: [
      { value: 4, name: 'Phone' },
      { value: 55, name: 'Tablet' },
      { value: 37, name: 'SmartCloks' },
      { value: 87, name: 'Desktop' },
    ],
  }
  ],
  axisParams: {
    titles: {
      title: 'Bar chart',
      x: 'Name',
      y: 'Value'
    },
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
    },
  },
  chartSettings: {
    orientation: Orintation.VERTICAL,
    barWidth: BarWidth.WIDE,
  },
  drawChart: drawClusteredBarChart
};


export const HorizontalThinBarChart = Template.bind({});
HorizontalThinBarChart.args = {
  data: [{
    groupName: 'iOS',
    bars: [
      { value: 30, name: 'Phone' },
      { value: 20, name: 'Tablet' },
      { value: 60, name: 'SmartCloks' },
      { value: 17, name: 'Desktop' },
    ],
  },
  {
    groupName: 'Android',
    bars: [
      { value: 24, name: 'Phone' },
      { value: 45, name: 'Tablet' },
      { value: 67, name: 'SmartCloks' },
      { value: 17, name: 'Desktop' },
    ],
  }
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
  drawChart: drawClusteredBarChart
};
