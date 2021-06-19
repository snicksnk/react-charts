import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { ChartTheme } from './types';


type ChartThemeProviderProps = {
  theme: ChartTheme,
  children: ReactNode
}

export default function ChartThemeProvider({ theme, children }: ChartThemeProviderProps) {
  return (<ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>);
}