'use client'
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./global_theme";
import Navbar from "./components/navbar";
import Note from "./components/note";


export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar></Navbar>
      <Container>
        <Note></Note>
      </Container>
    </ThemeProvider>
  )
}


export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  background-color: #fff;
  padding: 20px 0;
`;
