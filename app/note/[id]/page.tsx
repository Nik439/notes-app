'use client'
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../global_theme";
import { useEffect, useRef, useState } from "react";
import { api_state } from "../../models/api_state";
import { note } from "../../models/note";
import { useRouter } from "next/navigation";

export default function NotePage({ params: {id} }: { params: { id: number } }) {
  const [title, setTitle] = useState<string>("")
  const [text, setText] = useState<string>("")
  const [noteState, setNoteState] = useState<api_state>("loading")
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const router = useRouter()
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  async function getNote() {
    const res = await fetch(`/api/note/${id}`)
    if (res.ok)
      return await res.json()
    else
      throw new Error
  }

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


  useEffect(() => {
    if (textRef.current) {
      // reset height to get the correct scrollHeight
      textRef.current.style.height = "0px";
      const scrollHeight = textRef.current.scrollHeight;

      //set the height directly, outside of the render loop
      textRef.current.style.height = scrollHeight + "px";
    }
  }, [textRef.current, text, windowWidth]);

  useEffect(() => {
    if (titleRef.current) {
      // reset height to get the correct scrollHeight
      titleRef.current.style.height = "0px";
      const scrollHeight = titleRef.current.scrollHeight;

      //set the height directly, outside of the render loop
      titleRef.current.style.height = scrollHeight + "px";
    }
  }, [titleRef.current, title, windowWidth]);

  useEffect(()=>{
    getNote().then((res: note)=>{
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
  },[])


  return (
    <ThemeProvider theme={theme}>
      <Container>
        {noteState=="loading" ? 
          <></>
        :
          <>
            <Title onChange={handleTitleChange} onKeyDown={handleTitleKeyDown} value={title} ref={titleRef} rows={1}></Title>
            <Text onChange={handleTextChange} onKeyDown={handleTextKeyDown} value={text} ref={textRef} rows={1}></Text>
            <FocusHelper onClick={focusText}></FocusHelper>
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
  padding: 10px 0px;
`;

export const Title = styled.textarea`
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

export const Text = styled.textarea`
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

export const FocusHelper = styled.div`
  width: 100%;
  flex: 2;
`