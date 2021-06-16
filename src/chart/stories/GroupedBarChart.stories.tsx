import React from 'react';
import { Story, Meta } from '@storybook/react';

import ChartComponent, { ChartComponentProps } from '../ChartComponent';
import { BarAxisParams, BarWidth, Orintation } from '../BarChart/types';
import { ClusteredBarChartSettings, ClusteredBarData } from '../SegmentedBarChart/types';
import { drawClusteredBarChart } from '../GroupedBarChart/draw';

export default {
  title: 'Example/StackedBarChart',
  component: ChartComponent,
  argTypes: {
    className: { control: 'string' },
  },
} as Meta;


const Template: Story<ChartComponentProps<ClusteredBarData, ClusteredBarChartSettings, BarAxisParams>> = (args) => <ChartComponent {...args} />;

export const VerticalStackedBarChart = Template.bind({});
VerticalStackedBarChart.args = {
  data: [{
    groupName: 'iOS',
    bars: [
      { value: 10, name: 'Phone' },
      { value: 20, name: 'Tablet' },
      { value: 40, name: 'Smart clocks' },
    ],
  },
  {
    groupName: 'Android',
    bars: [
      { value: 20, name: 'Phone' },
      { value: 10, name: 'Tablet' },
      { value: 20, name: 'Smart clocks' },
    ],
  },
  {
    groupName: 'Windows',
    bars: [
      { value: 23, name: 'Phone' },
      { value: 50, name: 'Tablet' },
      { value: 20, name: 'Smart clocks' },
    ],
  }
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
    orientation: Orintation.VERTICAL,
    barWidth: BarWidth.WIDE,
  },
  drawChart: drawClusteredBarChart
};

export const HorizontalStackedBarChart = Template.bind({});
HorizontalStackedBarChart.args = {
  data: [{
    groupName: 'iOS',
    bars: [
      { value: 10, name: 'Phone' },
      { value: 20, name: 'Tablet' },
      { value: 20, name: 'Smart clocks' },
    ],
  },
  {
    groupName: 'Android',
    bars: [
      { value: 13, name: 'Phone' },
      { value: 30, name: 'Tablet' },
      { value: 20, name: 'Smart clocks' },
    ],
  },
  {
    groupName: 'Windows',
    bars: [
      { value: 23, name: 'Phone' },
      { value: 30, name: 'Tablet' },
      { value: 20, name: 'Smart clocks' },
    ],
  }
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
    orientation: Orintation.HORIZONTAL,
    barWidth: BarWidth.WIDE,
  },
  drawChart: drawClusteredBarChart
};
