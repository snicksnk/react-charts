import React, { MutableRefObject, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { createChart, createScales, drawAxis, drawData, resizeChart } from './charta';
import { AxisParams, ChartLayout, ChartSettings, ChartSizeParams, LineCurveType, TicksSettings } from './types';
import { createRangeLine, LinesData } from './axis'

export type LineChartComponentProps = {
  className: string,
  data: LinesData,
  axisParams: AxisParams,
  chartSettings: ChartSettings
}


function draw(chartLayout: ChartLayout, data: LinesData, chartSizeParams: ChartSizeParams, chartSettings: ChartSettings, axisParams: AxisParams) {
  const ranges = createRangeLine(data);
  const scales = createScales(chartSizeParams, ranges);
  drawAxis(chartLayout, scales, chartSizeParams, ranges, axisParams)
  drawData<LinesData>(chartLayout, data, scales, chartSettings);
}


export const ChartComponent: React.FC<LineChartComponentProps> = ({ className, data, axisParams, chartSettings }) => {
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

      draw(chartLayout.current, data, createChartSizeParams(width, height), chartSettings, axisParams);

      const onResize = () => {
        const width = svgRef.current?.clientWidth || 0;
        const height = svgRef.current?.clientHeight || 0;

        if (chartLayout.current && width && height) {
          resizeChart(chartLayout.current, createChartSizeParams(width, height));
          draw(chartLayout.current, data, createChartSizeParams(width, height), chartSettings, axisParams);
        }
      };

      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      }
    }

  }, [axisParams, data, chartSettings]);

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