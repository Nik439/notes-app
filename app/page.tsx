'use client'
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./global_theme";
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
      console.error(err);
    })
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {notesState=="loading" ? 
          <></>
        :
          notes.sort((a, b) => {
            //sort array from most to least recent
            return a.last_update && b.last_update ? new Date(b.last_update).getTime()-new Date(a.last_update).getTime() : 0
          })
          .map((note: note)=>(
            <Note  key={note.id} note={note}></Note>
          ))
        }
      </Container>
    </ThemeProvider>
  )
}


export const Container = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 1fr 1fr 1fr 1fr 200px;
  background-color: #fff;
  column-gap: 15px;
  row-gap: 30px;
  margin: 0 auto 25px;
  max-width: 1490px;
  width: 100%;

  ${({theme}) => theme.breakpoint.xxl} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  ${({theme}) => theme.breakpoint.xl} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  ${({theme}) => theme.breakpoint.lg} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  ${({theme}) => theme.breakpoint.md} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  ${({theme}) => theme.breakpoint.sm} {
    grid-template-columns: 1fr 1fr;
  }

  ${({theme}) => theme.breakpoint.xs} {
    grid-template-columns: 1fr;
  }
`;
