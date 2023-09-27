'use client'
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../global_theme";
import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";
import { api_state } from "../../models/api_state";
import { note } from "../../models/note";

export default function NotePage({ params: {id} }: { params: { id: number } }) {
  const [note, setNote] = useState<null | note>()
  const [noteState, setNoteState] = useState<api_state>("loading")

  async function getNote() {
    const res = await fetch(`/api/note/${id}`)
    return await res.json()
  }

  useEffect(()=>{
    getNote().then((res: note)=>{
      setNoteState("success")
      setNote(res)
    }).catch(err=>{
      setNoteState("error")
      console.log(err);
    })
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Navbar></Navbar>
      <Container>
        {noteState=="loading" ? 
          <></>
        :
          <>
            <Title>{note?.title}</Title>
            <Text>{note?.text}</Text>
          </>
        }
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
  padding: 20px 8px;
`;

export const Title = styled.h2`
  
`;

export const Text = styled.p`
  
`;