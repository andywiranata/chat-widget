import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.i`
  cursor: pointer;
`;

export default class ToolbarButton extends Component {
  render() {
    const { icon } = this.props;
    return (
      <Wrapper >
        <img src={icon} />
      </Wrapper>
    );
  }
}