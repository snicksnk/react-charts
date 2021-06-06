import React from 'react';
import { Story, Meta } from '@storybook/react';

import ChartComponent from '../ChartComponent';

export default {
  title: 'Example/Page',
} as Meta;

const Template: Story<{}> = (args) => <ChartComponent {...args} />;

export const Chart = Template.bind({});
Chart.args = {
};

// export const LoggedOut = Template.bind({});
// LoggedOut.args = {
// };
