import React, { MutableRefObject, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { createChart, drawData, resizeChart } from './charta';
import { ChartLayout, ChartSizeParams, LineCurveType, TicksSettings } from './types';
import { createRangeLine, LinesData } from './axis'

export type LineChartComponentProps = {
  className: string,
  data: LinesData,
  linesTypes: Array<LineCurveType>,
  tickSettings: TicksSettings,
  lineCurveType: Array<LineCurveType>
}


// const useDrawChart = (svgRef: MutableRefObject<HTMLDivElement | null>, ) => {//</DATA_TYPE>(tickSettings: TicksSettings, data: DATA_TYPE, lineCurveType: , linesTypes) => {
//   const chartLayout = useRef<ChartLayout | null>(null);

//   useEffect(() => {
//     const margin = { top: 50, right: 50, bottom: 50, left: 50, axisOffset: 0 };
//     const width = svgRef.current?.clientWidth || 0;
//     const height = svgRef.current?.clientHeight || 0;

//     const chartSizeParams: ChartSizeParams = { size: { width, height }, margin, tickSettings, lineCurveType };


//     if (svgRef.current && width && height) {

//       if (!chartLayout.current) {
//         chartLayout.current = createChart(svgRef.current, chartSizeParams);
//       }
//       drawData<LinesData>(chartLayout.current, data, createRangeLine, chartSizeParams);



//       const onResize = () => {
//         const width = svgRef.current?.clientWidth || 0;
//         const height = svgRef.current?.clientHeight || 0;

//         const chartSizeParams = { size: { width, height }, margin, tickSettings, lineCurveType };

//         if (chartLayout.current && width && height) {
//           resizeChart(chartLayout.current, chartSizeParams);
//           drawData(chartLayout.current, data, createRangeLine, chartSizeParams);
//         }
//       };

//       window.addEventListener("resize", onResize);
//       return () => {
//         window.removeEventListener('resize', onResize);
//       }
//     }

//   }, [tickSettings, data, lineCurveType, linesTypes]);
// }


export const ChartComponent: React.FC<LineChartComponentProps> = ({ className, data, linesTypes, tickSettings, lineCurveType }) => {
  const svgRef = useRef<HTMLDivElement | null>(null);

  const chartLayout = useRef<ChartLayout | null>(null);

  useEffect(() => {
    const margin = { top: 50, right: 50, bottom: 50, left: 50, axisOffset: 0 };
    const width = svgRef.current?.clientWidth || 0;
    const height = svgRef.current?.clientHeight || 0;


    const createChartSizeParams = (width: number, height: number) => {
      const chartSizeParams: ChartSizeParams = { size: { width, height }, margin, tickSettings, lineCurveType };
      return chartSizeParams;
    }

    if (svgRef.current && width && height) {
      if (!chartLayout.current) {
        chartLayout.current = createChart(svgRef.current, createChartSizeParams(width, height));
      }
      drawData<LinesData>(chartLayout.current, data, createRangeLine, createChartSizeParams(width, height));

      const onResize = () => {
        const width = svgRef.current?.clientWidth || 0;
        const height = svgRef.current?.clientHeight || 0;


        if (chartLayout.current && width && height) {
          resizeChart(chartLayout.current, createChartSizeParams(width, height));
          drawData(chartLayout.current, data, createRangeLine, createChartSizeParams(width, height));
        }
      };

      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      }
    }

  }, [tickSettings, data, lineCurveType, linesTypes]);

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