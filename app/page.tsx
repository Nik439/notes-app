'use client'
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./global_theme";


export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Text>hello</Text>
      </div>
    </ThemeProvider>
  )
}


export const Text = styled.p`
  font-size: 23px;
`;
