import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { createChart, drawData, resizeChart } from './charta';
import { ChartLayout, createRange } from './types';
import { createRangeDots, DotData } from './axis'


const ChartComponent: React.FC<{}> = () => {
  const svgRef = useRef<HTMLDivElement | null>(null);

  const chartLayout = useRef<ChartLayout | null>(null);

  useEffect(() => {
    const margin = { top: 50, right: 50, bottom: 50, left: 50, axisOffset: 0 };
    const width = svgRef.current?.clientWidth;
    const height = svgRef.current?.clientHeight;




    var data: DotData = [
      { x: 164, y: 23, r: 30, fill: 'red' },
      { x: 82, y: 13, r: 10, fill: 'blue' },
      { x: 13, y: 123, r: 10, fill: 'yellow' },
    ];

    if (svgRef.current && width && height) {

      if (!chartLayout.current) {
        chartLayout.current = createChart(svgRef.current, { width, height }, margin);
      }
      drawData<DotData>(chartLayout.current, data, createRangeDots, { width, height }, margin);

      window.addEventListener("resize", function () {

        const width = svgRef.current?.clientWidth;
        const height = svgRef.current?.clientHeight;

        if (chartLayout.current && width && height) {
          resizeChart(chartLayout.current, { width, height }, margin);
          drawData(chartLayout.current, data, createRangeDots, { width, height }, margin);
        }

        console.log("Resource conscious resize callback!");
      });

    }

  }, []);

  return (<div ref={svgRef} style={{ width: '80%', height: '400px' }}>
  </div>)
}

export default ChartComponent;