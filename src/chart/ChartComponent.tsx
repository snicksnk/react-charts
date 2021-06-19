import React, { useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { ChartLayout, ChartSizeParams, DrawChart } from './common/types';
import { createChart, resizeChart } from './Linechart/charta';
import { ChartTheme } from './theme/types';

export type ChartComponentProps<DATA_TYPE, CHART_SETTINGS, AXIS_PARAMS > = {
  className: string,
  data: DATA_TYPE,
  axisParams: AXIS_PARAMS,
  chartSettings: CHART_SETTINGS,
  drawChart: DrawChart<DATA_TYPE, CHART_SETTINGS, AXIS_PARAMS>,
}


export const ChartComponent: React.FC<ChartComponentProps<any, any, any>> = ({ className, data, axisParams, chartSettings, drawChart }) => {
  const svgRef = useRef<HTMLDivElement | null>(null);

  const chartLayout = useRef<ChartLayout | null>(null);

  const theme = useTheme();

  useEffect(() => {
    const margin = { top: 50, right: 60, bottom: 50, left: 60, axisOffset: 0 };
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

      drawChart(chartLayout.current, data, createChartSizeParams(width, height), chartSettings, axisParams, (theme as ChartTheme));

      const onResize = () => {
        const width = svgRef.current?.clientWidth || 0;
        const height = svgRef.current?.clientHeight || 0;

        if (chartLayout.current && width && height) {
          resizeChart(chartLayout.current, createChartSizeParams(width, height));
          drawChart(chartLayout.current, data, createChartSizeParams(width, height), chartSettings, axisParams, (theme as ChartTheme));
        }
      };

      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      }
    }

  }, [axisParams, data, chartSettings, drawChart, theme]);

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
    stroke: ${props => props.theme.axis.line.stroke};
    stroke-width: 2px;
  }

  .axis .tick line, .axis .domain{
    stroke: #E0E0E0;
    stroke-width: 2px;
  }

  .axis .domain {
    stroke: none;
  }

  .axis .tick text {
    fill:  ${props => props.theme.axis.ticks.fill};
    font-size: ${props => props.theme.axis.ticks['font-size']};
  }

  text {
    font-family 'Montserrat';
  }
  

  .bar-chart__chart__rect {
    fill: #9077F5;
  }

  svg {
    image-rendering: optimizeSpeed;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: optimize-contrast;
    image-rendering: pixelated;
    -ms-interpolation-mode: nearest-neighbor;
  }
`;