'use client'
import styled, { ThemeProvider, keyframes } from "styled-components";
import { theme } from "../../global_theme";
import { useEffect, useRef, useState } from "react";
import { api_state } from "../../models/api_state";
import { note } from "../../models/note";
import { useRouter } from "next/navigation";
import { getNote, updateNote } from "@/app/utils/api";

export default function NotePage({ params: {id} }: { params: { id: number } }) {
  const [title, setTitle] = useState<string>("")
  const [text, setText] = useState<string>("")
  const [noteState, setNoteState] = useState<api_state>("loading")
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const router = useRouter()
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  function handleTitleChange(e:React.ChangeEvent<HTMLTextAreaElement>) {
    setTitle(e.target.value)
  }

  function handleTextChange(e:React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value)
  }

  function handleTitleKeyDown(e:React.KeyboardEvent) {
    if (e.key == "Enter" || (e.key == "ArrowDown" || e.key == "ArrowRight") && titleRef.current?.selectionStart == title.length) {
      e.preventDefault()
      textRef.current?.focus()

      if (textRef.current) {
        textRef.current.selectionStart = 0
        textRef.current.selectionEnd = 0
      }
    }
  }

  function handleTextKeyDown(e:React.KeyboardEvent) {
    if ((e.key == "ArrowUp" || e.key == "ArrowLeft") && textRef.current?.selectionStart == 0) {
      e.preventDefault()
      titleRef.current?.focus()

      if (titleRef.current) {
        titleRef.current.selectionStart = title.length
      }
    }
  }

  function focusText() {
    textRef.current?.focus()
    if (textRef.current)
      textRef.current.selectionStart = text.length
  }


  useEffect(()=>{
    if (noteState == "success") {
      updateNote(id, title, text)
    }    
  },[id, title, text, noteState])

  useEffect(() => {
    if (titleRef.current) {
      // reset height to get the correct scrollHeight
      titleRef.current.style.height = "36px";
      const scrollHeight = titleRef.current.scrollHeight;

      //set the height directly, outside of the render loop
      titleRef.current.style.height = scrollHeight + "px";
    }
  }, [title, windowWidth]);

  useEffect(() => {
    if (textRef.current) {
      // reset height to get the correct scrollHeight
      textRef.current.style.height = "0px";
      const scrollHeight = textRef.current.scrollHeight;

      //set the height directly, outside of the render loop
      textRef.current.style.height = scrollHeight + "px";
    }
  }, [text, windowWidth]);


  useEffect(()=>{
    getNote(id).then((res: note)=>{
      setNoteState("success")
      setTitle(res.title)
      setText(res.text)
      
    }).catch(()=>{
      setNoteState("error")
      router.push("/")
    })

    function handleResize() {
      setWindowWidth(window.innerWidth)      
    }

    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener("resize", handleResize);
  },[id, router])


  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Content>
          {noteState=="loading" ? 
            <></>
          :noteState=="success" ?
            <>
              <Title onChange={handleTitleChange} onKeyDown={handleTitleKeyDown} value={title} ref={titleRef} rows={1} placeholder="New note"></Title>
              <Text onChange={handleTextChange} onKeyDown={handleTextKeyDown} value={text} ref={textRef} rows={1} placeholder="text..."></Text>
              <FocusHelper onClick={focusText}></FocusHelper>
            </>
          :
            <></>
          }
        </Content>
      </Container>
    </ThemeProvider>
  )
}


const clipAnimation = keyframes`
  0% { clip-path: polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%); }
  100% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
`

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  
  background-color: #000;
  
  width: 100%;
  max-width: 1490px;
  margin: 0 auto 10px;
  border: 2px solid #000;
  border-bottom: 6px solid #000;
  border-right: 6px solid #000;
  border-radius: 8px;

  animation: ${clipAnimation} 0.8s ease-out;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  background-color: #fff;
  padding: 10px;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  animation: ${clipAnimation} 0.8s ease-out 5ms;
`

const Title = styled.textarea`
  font-size: 30px;
  font-weight: bolder;
  letter-spacing: 0px;
  border: 0;
  outline: none;
  width: 100%;
  resize: none;
  overflow: hidden;
  border-bottom: 1px solid black;
`;

const Text = styled.textarea`
  margin-top: 10px;
  font-size: 18px;
  font-weight: normal;
  letter-spacing: 0px;
  border: 0;
  outline: none;
  width: 100%;
  resize: none;
  overflow: hidden;
`;

const FocusHelper = styled.div`
  width: 100%;
  flex: 2;
`