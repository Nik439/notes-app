'use client'
import styled, { keyframes } from "styled-components";
import { note } from "../models/note";
import Link from "next/link";

export default function Note({note}: {note: note}) {

  function calculateTimePassed(): string {
    let differenceValue
    if (note.last_update) {
      //time in seconds
      differenceValue =(new Date().getTime() - new Date(note.last_update).getTime()) / 1000;
      if (differenceValue < 60)
        return `less than 1 minute`

      //time in minutes
      differenceValue /= 60;
      if (differenceValue < 60) {
        let tmp = Math.floor(differenceValue)
        return `${tmp} ${tmp > 1 ? "minutes" : "minute"}`
      }
      
      //time in hours
      differenceValue /= 60;
      if (differenceValue < 24) {
        let tmp = Math.floor(differenceValue)
        return `${tmp} ${tmp > 1 ? "hours" : "hour"}`
      }
      
      //time in days
      differenceValue /= 24;
      if (differenceValue < 30) {
        let tmp = Math.floor(differenceValue)
        return `${tmp} ${tmp > 1 ? "days" : "day"}`
      }
      
      //time in months
      differenceValue /= 30;
      if (differenceValue < 12) {
        let tmp = Math.floor(differenceValue)
        return `${tmp} ${tmp > 1 ? "months" : "month"}`
      }
      
      //time in years
      differenceValue /= 12;
      let tmp = Math.floor(differenceValue)
      return `${tmp} ${tmp > 1 ? "years" : "year"}`
    }

    return ""
  }

  return (
    <Container href={`/note/${note.id}`}>
      <Content>
        <NoteBackground className="note_background"></NoteBackground>
        <Title>{note.title || "New note"}</Title>
        <Text>{note.text}</Text>
      </Content>
      <LastUpdate>Edited {calculateTimePassed()} ago</LastUpdate>
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

export const LastUpdate = styled.div`
  position: absolute;
  margin-bottom: -275px;
  font-size: 12px;
`

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
  width: 100%;
  text-align: center;
  border-bottom: 1px solid black;
  line-height: 1.2;
  margin: 7px;
`;

export const Text = styled.p`
  z-index: 1;
  line-height: 1.2;
  width: 100%;
  white-space: pre-wrap;
`;