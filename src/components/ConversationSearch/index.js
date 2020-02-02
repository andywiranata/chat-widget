import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  background: #f4f4f8;
  padding: 8px 10px;
  border-radius: 10px;
  border: none;
  font-size: 14px;
  ::placeholder {
    text-align: center;
  }
  :focus::placeholder {
    text-align: left;
  }
`;
export default class ConversationSearch extends Component {
  render() {
    return (
      <Wrapper>
        <Input
          type="search"
        />
      </Wrapper>
    );
  }
}