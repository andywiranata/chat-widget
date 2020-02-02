import React, { Component } from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  font-weight: 500;
  border-bottom: 1px solid #eeeef1;
  position: sticky;
  top: 0px;
  min-height: 53px;
`;
const Title = styled.h1`
  margin: 0;
  padding-left: 16px; 
  font-size: 16px;
  font-weight: 800;
`;
const RightItem = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: row-reverse;
  margin-left: 20px;
`;
const LeftItem = styled.div`
  padding: 10px;
`;

export default class Toolbar extends Component {
  render() {
    const { title, rightItem, leftItem, onClickLeftItem, onClickRightItem } = this.props;
    return (
      <Wrapper className="toolbar">
        <LeftItem onClick={onClickLeftItem}>{ leftItem }</LeftItem>
        <Title className="toolbar-title">{ title }</Title>
        <RightItem onClick={onClickRightItem} >{ rightItem }</RightItem>
      </Wrapper>
    );
  }
}