import React from 'react';
import TicketListItem from '../TicketListItem';
import styled from 'styled-components';
import Toolbar from '../Toolbar';
import Loading from '../Loading';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid #eeeef1;
`;

const TicketList = ({ list, loading, handleOpenTicket, selectedChannelUrl }) => (
  <Wrapper>
    <Toolbar title="Chat" />
    {
      loading ? <Loading /> : (
        list.map(({
          isActive,
          message,
          title,
          date,
          channelUrl,
          key,
        }, index) =>
        <span
          key={`${index}__${title}`}
          onClick={(e)=>{
            handleOpenTicket(key, channelUrl);
          }}
        >
          <TicketListItem
            selected={selectedChannelUrl === channelUrl}
            isActive={isActive}
            message={message}
            title={title}
            date={date}
            lastUpdate={date}
            
          />
        </span>
        )
      )
    }
     
    </Wrapper>
);

export default TicketList;