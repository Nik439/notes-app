'use client'
import styled, { keyframes } from "styled-components";
import { note } from "../models/note";
import Link from "next/link";

export default function Note({note}: {note: note}) {

  return (
    <Container href={`/note/${note.id}`}>
      <Content>
        <NoteBackground className="note_background"></NoteBackground>
        <Title>{note.title}</Title>
        <Text>{note.text}</Text>
      </Content>
    </Container>
  )
}

const clipAnimation = keyframes`
  0% { clip-path: circle(0%); }
  100% { clip-path: circle(100%); }
`

const bounceAnimation = keyframes`
  0% { transform: scale(100%) }
  50% { transform: scale(105%) }
  100% { transform: scale(100%) }
`

export const Container = styled(Link)`
  height: 250px;
  width: 200px;
  background-color: #000;
  display: flex;
  align-items: center;
  border-radius: 8px;
  max-width: 100%;
  overflow: hidden;
  transform-origin: center;
  animation: ${clipAnimation} 0.8s ease-out,  ${bounceAnimation} .4s ease .4s;
  border: 2px solid #000;
  border-bottom: 6px solid #000;
  border-right: 6px solid #000;
  border-radius: 8px;
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  padding: 5px 10px;
  overflow: hidden;
  transform-origin: center;
  animation: ${clipAnimation} 0.8s ease-out 10ms;
  transition: 0.8s;
  position: relative;

  &:hover {
    .note_background {
      transform: translateY(0px);
    }
  }
`;

export const NoteBackground = styled.div`
position: absolute;
  background-color: #ffe133;
  width: 200px;
  height: 250px;
  margin-top: -5px;
  transform: translateY(250px);
  transition: 0.4s;
`

export const Title = styled.h2`
  z-index: 1;
`;

export const Text = styled.p`
  z-index: 1;
`;