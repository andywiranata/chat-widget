import React from 'react';
import styled from 'styled-components'
import {timestampToRelativeTime} from '../../utils';

const Badge = styled.span`
  background: #daf5db;
  color: #00b23a;
  border-radius: 10px;
  font-size: 10px;
  vertical-align: super;
  font-weight: 600;
  line-height: 18px;
  padding: 0 8px;
  height: 18px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Info = styled.div `
  width: 100%;
  background-color: ${props => props.active ? '#f3fef3' : 'white' };
  border-left: 3px solid ${props => props.active ? '#00b23a' : 'white' };
  padding: 10px 10px 10px 16px;
`;
const Title = styled.h1`
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize;
  margin: 0;
`
const Snippet = styled.p`
  font-size: 12px;
  color: #888;
  margin: 0;
`;
const TitleWrapper = styled.span`
  display: flex;
  justify-content: space-between;
`;
const LabelLastUpdate = styled.span`
  font-size: 8px;
  color: #888;
  margin: 0;
`;
const SnippetWrapper = styled.span`
  display: flex;
  justify-content: space-between;
`;
const TicketItem = ({
  isActive,
  message,
  title,
  selected,
  date,
  unreadCount
}) => (
  <Wrapper>
    <Info active={selected}>
      <TitleWrapper>
        <Title>{ title }</Title>
        <LabelLastUpdate>{timestampToRelativeTime(date)}</LabelLastUpdate>
        </TitleWrapper>
        <SnippetWrapper>
          <Snippet>{ message }</Snippet>
          { isActive ? <Badge>Aktif</Badge>: null }
        </SnippetWrapper>
      </Info>
  </Wrapper>
);

export default TicketItem;