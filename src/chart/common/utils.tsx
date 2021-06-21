import { Selection } from "d3-selection";
import ReactDOMServer from 'react-dom/server';
import { TicksSettings } from "../Linechart/types";
import ChartThemeProvider from "../theme/ChartThemeProvider";
import { ChartTheme } from "../theme/types";
import ShowLatex from "./ShowLatex";
import { AxisNames, Size } from "./types";

export const calculateTextSize = (document: Document) => (html: string, className: string) => {
  const bold = false; // eslint-disable-line
  const div = document.createElement('div');

  div.innerHTML = html;
  div.style.position = 'absolute';
  // div.style.top = '-9999px';
  // div.style.left = '-9999px';
  div.className = className;

  div.className = 'sizer';
  document.body.appendChild(div);

  // TOOD hack
  const size = { width: div.offsetWidth, height: div.offsetHeight };
  document.body.removeChild(div);

  return size;
}

export const drawLatex = (theme: ChartTheme, axisName: AxisNames, axisParams: TicksSettings) => (selection: Selection<SVGGElement, string, null, undefined>) => {

  const latexForTicks: Record<string, string> = {};
  const tickHtmlSize: Record<string, Size> = {};

  const ticksBlocks = selection.selectAll<SVGGElement, string>("g");
  

  ticksBlocks.selectAll('.latex-block').remove();



  ticksBlocks.each((d: any, n) => {
    const text = `${axisParams.ticksLatex?.[axisName]?.[n]}` || `${d}`;
    const html = ReactDOMServer.renderToStaticMarkup(<ChartThemeProvider theme={theme}>
      <ShowLatex>{text}</ShowLatex>
    </ChartThemeProvider>);
    const size = calculateTextSize(document)(html, 'preview');
    latexForTicks[d] = `
    <style>
      div {
        margin: 0;
        font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
          "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
          "Helvetica Neue", Arial;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap");
      
    </style>
    ${html}`;
    tickHtmlSize[d] = size;
    // return d;
  })

  ticksBlocks
    .append("svg:foreignObject")
    .attr('class', 'latex-block')
    .attr("width", d => tickHtmlSize[d].width)
    .attr("height", d => tickHtmlSize[d].height)
    .attr('x', d => -1 * tickHtmlSize[d].width / 2)
    .attr('y', d => tickHtmlSize[d].height / 2)
    // .attr('overflow', 'visible')
    .html(d => {
      return `${latexForTicks[d]}`;
    })


  ticksBlocks.select('text').remove()

  // .attr('x', (d, t, s) => {
  //   debugger
  //   console.log(d, t, s);
  // })
}
