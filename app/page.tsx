'use client'
import styled, { ThemeProvider, keyframes } from "styled-components";
import { theme } from "./global_theme";
import Note from "./components/note";
import { useEffect, useRef, useState } from "react";
import { api_state } from "./models/api_state";
import { note } from "./models/note";
import Image from "next/image";
import { deleteNote, getNotes } from "./utils/api";

export default function Home() {
  const [notes, setNotes] = useState<note[]>([])
  const [selectedNote, setSelectedNote] = useState<number>(0)
  const [menuActive, setMenuActive] = useState<boolean>(false)
  const [menuPosition, setMenuPosition] = useState<{x: number, y: number}>({x:0, y:0})
  const [notesState, setNotesState] = useState<api_state>("loading")

  function handleContextMenu(e: React.MouseEvent, note_id: number) {
    e.preventDefault()
    setSelectedNote(note_id)
    setMenuActive(true)
    let position = {x:e.clientX, y:e.clientY}

    if (position.x > window.innerWidth-144) {
      position.x -= 144
    }
    if (position.y > window.innerHeight-77) {
      position.y -= 77
    }
    setMenuPosition(position)    
  }

  function closeContextMenu({button, target}: any) {
    if ((button == 0 && target.id != "context_menu") || button == 1 || button == 2)    
      setMenuActive(false)
  }

  useEffect(()=>{
    getNotes().then((res: [note])=>{
      setNotesState("success")
      setNotes(res)
    }).catch(err=>{
      setNotesState("error")
      console.error(err);
    })

    document.addEventListener("mousedown", closeContextMenu)
    
    return () => document.removeEventListener("click", closeContextMenu);
  },[])

  function handleDelete() {
    deleteNote(selectedNote).then(()=>{
      setMenuActive(false)
      setNotes(prev => prev.filter((filter_note)=>filter_note.id != selectedNote))
    }).catch((err)=>{
      console.error(err)
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container className={notesState=="loading" ? "load" : ""}>
        {notesState=="loading"?
          <></>
        :notesState=="success"?
          <>
            <CustomContextMenu id="context_menu" onClick={handleDelete} $position={menuPosition} className={menuActive ? "active" : ""}>
              <MenuBackground className="menu_background"></MenuBackground>
              <MenuImg src="/bin.svg" alt="" width={50} height={50}></MenuImg>
              <MenuText>Delete</MenuText>
            </CustomContextMenu>
            {notes.sort((a, b) => {
              //sort array from most to least recent
              return a.last_update && b.last_update ? new Date(b.last_update).getTime()-new Date(a.last_update).getTime() : 0
            })
            .map((note: note)=>(
              <Note key={note.id} note={note} handleContextMenu={handleContextMenu}></Note>
            ))}
          </>
        :
          <Error>An error has occurred, please try again later.</Error>
        }
      </Container>
    </ThemeProvider>
  )
}

const fadeAnimation = keyframes`
  0% { opacity: 0.5 }
  50% { opacity: 1 }
  100% { opacity: 0.5 }
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 1fr 1fr 1fr 1fr 200px;
  grid-auto-rows: 250px;
  flex: 1;
  background-color: #fff;
  column-gap: 15px;
  row-gap: 30px;
  margin: 0 auto 25px;
  max-width: 1490px;
  width: 100%;

  &.load {
    margin-bottom: 0;
    background-image: url("/note_load.svg");
    background-repeat: space repeat;
    animation: ${fadeAnimation} 1s infinite;
  }

  ${({theme}) => theme.breakpoint.xxl} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

    &.load {
      background-image: url("/note_load_space.svg");
    }
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

    &.load {
      background-position-x: 15%, 85%;
      background-repeat: repeat-y;
      background-image: url("/note_load_space.svg"), url("/note_load_space.svg");
    }
  }

  ${({theme}) => theme.breakpoint.xs} {
    grid-template-columns: 1fr;

    &.load {
      background-position-x: center;
      background-repeat: repeat-y;
      background-image: url("/note_load.svg");
    }
  }
`;

const CustomContextMenu = styled.div<{$position: {x: number, y: number}}>`
  display: none;
  overflow: hidden;

  &.active {
    display: flex;
    align-items: center;
    position: fixed;
    column-gap: 10px;
    z-index: 20;
    padding: 10px;
    padding-right: 20px;
    left: ${({$position}) => $position.x}px;
    top: ${({$position}) => $position.y}px;
    background-color: #fff;
    border: 2px solid #000;
    border-bottom: 6px solid #000;
    border-right: 6px solid #000;
    border-radius: 8px;
    user-select: none;
    cursor: pointer;

    &:hover {
      .menu_background {
        transform: translateX(0);
      }
    }
  }
`

const MenuImg = styled(Image)`
  z-index: 1;
  pointer-events: none;
`

const MenuText = styled.p`
  font-size: 16px;
  font-weight: 400;
  z-index: 1;
  pointer-events: none;
`

const MenuBackground = styled.div`
  position: absolute;
  background-color: #ffe133;
  width: 100%;
  height: 100%;
  margin-left: -10px;
  transform: translateX(-100%);
  transition: 0.4s;
  z-index: 0;
  pointer-events: none;
`

const Error = styled.p`
  position: absolute;
  font-size: 20px;
  width: calc(100% - 40px);
`;