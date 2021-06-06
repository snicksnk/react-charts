import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { createChart, drawData, resizeChart } from './charta';
import { ChartLayout } from './types';
import { createRangeLine, LinesData } from './axis'


const ChartComponent: React.FC<{ className: string }> = ({ className }) => {
  const svgRef = useRef<HTMLDivElement | null>(null);

  const chartLayout = useRef<ChartLayout | null>(null);

  useEffect(() => {
    const margin = { top: 50, right: 50, bottom: 50, left: 50, axisOffset: 0 };
    const width = svgRef.current?.clientWidth || 0;
    const height = svgRef.current?.clientHeight || 0;

    const chartSizeParams = { size: { width, height }, margin };



    var data: LinesData = [[
      { x: 34, y: 23, r: 30, fill: 'red' },
      { x: 82, y: 13, r: 10, fill: 'blue' },
      { x: 93, y: 123, r: 10, fill: 'yellow' },
    ],
    [
      { x: 34, y: 33, r: 30, fill: 'red' },
      { x: 42, y: 23, r: 10, fill: 'blue' },
      { x: 63, y: 53, r: 10, fill: 'yellow' },
    ]
    ];

    if (svgRef.current && width && height) {

      if (!chartLayout.current) {
        chartLayout.current = createChart(svgRef.current, chartSizeParams);
      }
      drawData<LinesData>(chartLayout.current, data, createRangeLine, chartSizeParams);


      const onResize = () => {
        const width = svgRef.current?.clientWidth || 0;
        const height = svgRef.current?.clientHeight || 0;

        const chartSizeParams = { size: { width, height }, margin };

        if (chartLayout.current && width && height) {
          resizeChart(chartLayout.current, chartSizeParams);
          drawData(chartLayout.current, data, createRangeLine, chartSizeParams);
        }
      };

      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      }
    }

  }, []);

  return (<div className={className} ref={svgRef} style={{ width: '80%', height: '400px' }}>
  </div>)
}

export default styled(ChartComponent)`
  .path {
    stroke-width: 4px;
  }

  .grid-line {
    stroke: #E0E0E0;
    stroke-width: 2px;
  }

  .axis .tick line, .axis .domain{
    stroke: #E0E0E0;
    stroke-width: 2px;
  }

  .axis .tick text {
    fill:  #000000;
    font-size: 12px;
  }
`;