import React from 'react';
import { Story, Meta } from '@storybook/react';
import ShowLatex, { ShowLatexProps } from '../common/ShowLatex';

export default {
  title: 'Example/LatexBarChart',
  component: ShowLatex,
  argTypes: {
    className: { control: 'string' },
  },
} as Meta;


const Template: Story<ShowLatexProps> = (args) => <ShowLatex {...args} />;

export const LatexBarChart = Template.bind({});
LatexBarChart.args = {
  children: `
  ## Example of chart with latex
  ![OtterChart]({"chartType":"clusteredBarChart","params":{"data":[{"groupName":"iOS","bars":[{"value":10,"name":"Phone"},{"value":20,"name":"Tablet"},{"value":20,"name":"Smartclocks"}]},{"groupName":"Android","bars":[{"value":13,"name":"Phone"},{"value":30,"name":"Tablet"},{"value":20,"name":"Smartclocks"}]},{"groupName":"Windows","bars":[{"value":23,"name":"Phone"},{"value":30,"name":"Tablet"},{"value":20,"name":"Smartclocks"}]}],"axisParams":{"tickSettings":{"step":{},"ticksList":{"x":[0,18,36,54,73]},"ticksLatex":{"x":["0","**18**","36","54","73"]}},"showGrid":{"y":true}},"chartSettings":{"orientation":"HORIZONTAL","barWidth":"WIDE"}}})
  `
};





