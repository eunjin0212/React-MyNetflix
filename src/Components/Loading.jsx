import React from "react";
import styled, { keyframes } from "styled-components";

const rotateplane = keyframes`
  0% { 
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  } 50% { 
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  } 100% { 
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
`;
const Box = styled.div`
  width: 40px;
  height: 40px;
  background-color: #fff;
  margin: 10% auto;
  animation: ${rotateplane} 1.2s infinite ease-in-out;
`;

export default () => <Box />;
