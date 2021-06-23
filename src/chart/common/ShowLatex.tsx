import ReactMarkdown from 'react-markdown'
import Tex from '@matejmazur/react-katex'
import math from 'remark-math'
import gfm from 'remark-gfm'
import 'katex/dist/katex.min.css'; // `react-katex` does not import the CSS for you
import styled from "styled-components/macro";
import ColoredTheme from '../theme/presets/colored';
import { ChartComponent } from '../ChartComponent';
import { drawClusteredBarChart } from '../GroupedBarChart/draw';
import ChartThemeProvider from '../theme/ChartThemeProvider';
import { DrawChart } from './types';




const getChartComponent = (chartType: string): DrawChart<any, any, any> => {
  switch(chartType) {
    case('clusteredBarChart'): {
      return drawClusteredBarChart;
    }
    default: {
      throw new Error(`Unknown chart type ${chartType}`)
    }
  }
}

type MyImageProps = {
  alt: string,
  src: string
}

const MyImage = (props: MyImageProps) => {
  //if (/^OtterChart/.ma)

  if (props.alt === "OtterChart") {
    const { chartType, params } = JSON.parse(props.src);
    //const topicScore = props.src
    return (
      <div>
        <ChartThemeProvider theme={ColoredTheme}>
          <ChartComponent
            className=''
            {...params}
            drawChart={getChartComponent(chartType)}
          />
        </ChartThemeProvider>
      </div>
    );
  } else {
    return (
      <p>
        <img className={"small"} alt={props.alt} src={props.src} />
      </p>
    );
  }
};

const renderers = {
  inlineMath: ({ value }: any) => <Tex math={value} />,
  math: ({ value }: any) => <Tex block math={value} />,
  image: MyImage
}


export interface ShowLatexProps {
  children: string;
  className?: string;
}

const ReactMarkdownStyled: any = styled(ReactMarkdown)`
  & p {
    margin-bottom: 0;
  }
  & table,
  & th,
  & td,
  & tr {
    border: 1px solid black;
    text-align: center;
    padding: 8px;
  }
  & table {
   margin: 24px auto 10px;

  }

  & p {
    fill:  ${props => props.theme.axis.ticks.fill};
    font-size: ${props => props.theme.axis.ticks['font-size']};
  }

  text {
    font-family 'Montserrat';
  }

  p {
    /* for axis */
    margin: 0;
  }
`;



ReactMarkdownStyled.defaultProps = {
  theme: ColoredTheme
}



const ShowLatex = ({ children, className }: ShowLatexProps) => {
  return (
    <ReactMarkdownStyled
      // className={className || ''}
      plugins={[gfm, math]}
      renderers={renderers}
      children={children}
      allowDangerousHtml
    />
  );
};


export default ShowLatex;

