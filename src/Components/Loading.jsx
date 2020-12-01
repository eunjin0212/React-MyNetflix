import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  width: 100px;
  height: 100px;
  margin: 10% auto;
`;

const Loading = ({ type, color }) => (
  <LoadingContainer>
    <ReactLoading type={"spin"} color={"pink"} height={40} width={40} />
  </LoadingContainer>
);

export default Loading;
