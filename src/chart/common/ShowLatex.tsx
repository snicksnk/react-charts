import ReactMarkdown from 'react-markdown'
import Tex from '@matejmazur/react-katex'
import math from 'remark-math'
import gfm from 'remark-gfm'
import 'katex/dist/katex.min.css'; // `react-katex` does not import the CSS for you
import styled from "styled-components/macro";


const renderers = {
  inlineMath: ({ value }: any) => <Tex math={value} />,
  math: ({ value }: any) => <Tex block math={value} />
}


interface ShowLatexProps {
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



const ShowLatex = ({ children, className }: ShowLatexProps) => {
  debugger;
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

