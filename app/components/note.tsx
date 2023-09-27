'use client'
import styled from "styled-components";

export default function Note() {
  return (
    <Container>
      <Title>test</Title>
      <Text>test</Text>
    </Container>
  )
}


export const Container = styled.div`
  height: 250px;
  width: 200px;
  background-color: #fff;
  margin: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 5px 10px;
  border: 2px solid #000;
  border-bottom: 6px solid #000;
  border-right: 6px solid #000;
  border-radius: 8px;
  max-width: calc(100% - 16px);
`;

export const Title = styled.h2`
  
`;

export const Text = styled.p`
  
`;