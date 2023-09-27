'use client'
import Image from "next/image";
import styled from "styled-components";

export default function Navbar() {
  return (
    <Container>
      <Content>
        <Logo src="/icon.svg" alt="" width={50} height={50}></Logo>

      </Content>
    </Container>
  )
}


export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  width: 100%;
  background-color: #fff;
  padding: 8px 8px 0px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  height: 100%;
  width: 100%;
  border: 2px solid #000;
  border-bottom: 6px solid #000;
  border-right: 6px solid #000;
  border-radius: 8px;
`;

export const Logo = styled(Image)`
  
`;