import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { createChart, resizeChart } from './charta';
import { AxisParams, ChartLayout, ChartSettings, ChartSizeParams, DrawChart } from './types';

export type ChartComponentProps<DATA_TYPE = Object[]> = {
  className: string,
  data: DATA_TYPE,
  axisParams: AxisParams,
  chartSettings: ChartSettings,
  drawChart: DrawChart<Array<any>>,
}


export const ChartComponent: React.FC<ChartComponentProps> = ({ className, data, axisParams, chartSettings, drawChart }) => {
  const svgRef = useRef<HTMLDivElement | null>(null);

  const chartLayout = useRef<ChartLayout | null>(null);

  useEffect(() => {
    const margin = { top: 50, right: 50, bottom: 50, left: 50, axisOffset: 0 };
    const width = svgRef.current?.clientWidth || 0;
    const height = svgRef.current?.clientHeight || 0;


    const createChartSizeParams = (width: number, height: number) => {
      const chartSizeParams: ChartSizeParams = { size: { width, height }, margin };
      return chartSizeParams;
    }

    if (svgRef.current && width && height) {
      if (!chartLayout.current) {
        chartLayout.current = createChart(svgRef.current, createChartSizeParams(width, height));
      }

      drawChart(chartLayout.current, data, createChartSizeParams(width, height), chartSettings, axisParams);

      const onResize = () => {
        const width = svgRef.current?.clientWidth || 0;
        const height = svgRef.current?.clientHeight || 0;

        if (chartLayout.current && width && height) {
          resizeChart(chartLayout.current, createChartSizeParams(width, height));
          drawChart(chartLayout.current, data, createChartSizeParams(width, height), chartSettings, axisParams);
        }
      };

      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      }
    }

  }, [axisParams, data, chartSettings, drawChart]);

  return (<div className={className} ref={svgRef} style={{ width: '80%', height: '400px' }}>
  </div>)
}

ChartComponent.defaultProps = {
  className: '',
  data: []
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