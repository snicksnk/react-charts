import React from 'react';
import { Story, Meta } from '@storybook/react';

import ChartComponent, { ChartComponentProps } from '../ChartComponent';
import { drawLineChart } from '../Linechart/draw';
import { LinesData } from '../axis';
import { LineAxisParams, LineChartSettings, LineCurveType, LineDotted } from '../Linechart/types';

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

export const ChartWithCustomStepTicksAndCurve = Template.bind({});
ChartWithCustomStepTicksAndCurve.args = {
  data: [[
    { x: 30, y: 20 },
    { x: 82, y: 13 },
    { x: 90, y: 120 },
  ],
  [
    { x: 30, y: 33 },
    { x: 42, y: 53 },
    { x: 65, y: 73 },
    { x: 90, y: 23 },
  ]
  ],
  axisParams: {
    tickSettings: {
      step: {
        x: 5,
      },
      ticksList: {

      },
      ticksLatex: {

      }
    },
    showGrid: {
      x: true,
      y: true
    }
  },
  chartSettings: {
    lineCurveType: [
      LineCurveType.STRAIGHT,
      LineCurveType.CURVED
    ],
    lineDotted: [LineDotted.SOLID, LineDotted.DOTTED]
  },
  drawChart: drawLineChart
};

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
      },
      ticksList: {

      },
      ticksLatex: {
        
      }
    },
    showGrid: {
      x: true,
      y: true
    }
  },
  chartSettings: {
    lineCurveType: [],
    lineDotted: [LineDotted.DOTTED, LineDotted.SOLID]
  },
  drawChart: drawLineChart
};


const ordData = [
  {name: '0', price: 500},
  {name: '100', price: 500},
  {name: '107', price: 498},
  {name: '200', price: 498},
  {name: '300', price: 496},
  {name: '500', price: 495.25},
  {name: '700', price: 492.2},
  {name: '1000', price: 490},
  {name: '∞', price: 488.75},
]


const now = 2;


export const ChartWithFill= Template.bind({});
ChartWithFill.args = {
  data: [
    ordData.map((d, n) => ({ x: n, y:  d.price })),
    ordData.slice(0, now + 1).map((d, n) => ({ x: n, y:  d.price - d.price * 0.001 })),
    ordData.slice(now).map((d, n) => ({ x: now + n, y:  d.price })),
  ],
  axisParams: {
    tickSettings: {
      step: {
      },
      ticksList: {
        x: ordData.map((d, n) => n),
        // y: data.map(d => d.y)
      },
      ticksLatex: {
        x: ordData.map((d, n) =>{
          return d.name
        }),
        // y:['1', '2', '3', '4'], 
      },
    },
    showGrid: {
      x: true,
      y: true
    },
    now: now,
  },
  chartSettings: {
    showFill: true,
    lineCurveType: [
      LineCurveType.CURVED
    ],
    lineDotted: [LineDotted.SOLID, LineDotted.SOLID],
  },
  drawChart: drawLineChart
};

// export const LoggedOut = Template.bind({});
// LoggedOut.args = {
// };
