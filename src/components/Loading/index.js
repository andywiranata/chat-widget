import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  color: grey;
  font-size: 12px;
  font-weight: 300;
  padding: 16px;
`;

const Loading = ()=>(
  <Wrapper>
    <i>Membuka halaman...</i>
  </Wrapper>
)

export default Loading