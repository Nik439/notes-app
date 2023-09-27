'use client'
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./global_theme";
import Navbar from "./components/navbar";
import Note from "./components/note";
import { useEffect, useState } from "react";
import { api_state } from "./models/api_state";
import { note } from "./models/note";

async function getNotes() {
  const res = await fetch("/api/notes")
  return await res.json()
}

export default function Home() {
  const [notes, setNotes] = useState<[] | [note]>([])
  const [notesState, setNotesState] = useState<api_state>("loading")

  useEffect(()=>{
    getNotes().then((res: [note])=>{
      setNotesState("success")
      setNotes(res)
    }).catch(err=>{
      setNotesState("error")
      console.log(err);
    })
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Navbar></Navbar>
      <Container>
        {notesState=="loading" ? 
          <></>
        :
          notes.map((note: note)=>(
            <Note  key={note.id} note={note}></Note>
          ))
        }
      </Container>
    </ThemeProvider>
  )
}


export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-items: start;
  justify-content: start;
  background-color: #fff;
  padding: 20px 0;
`;
