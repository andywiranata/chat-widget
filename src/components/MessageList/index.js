import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import styled from 'styled-components';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import EmptyState from '../EmptyState';
import Loading from '../Loading'
import moment from 'moment';
import { icSend, icClose, icHome } from '../../assets/index';

const Wrapper = styled.div`
  padding: 10px;
  padding-bottom: 70px;
`;
const Form = styled.form`
  width: 98%;
  height: 95%;
  overflow: auto;
  border-left: 1px solid #eeeef1;
`;

const MY_USER_ID = 'ME';

export default class MessageList extends Component {
  renderMessages() {
    const { list } = this.props;
    let i = 0;
    let messageCount = list.length;
    let messages = [];

    while (i < messageCount) {
      let previous = list[i - 1];
      let current = list[i];
      let next = list[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.createdAt);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.createdAt);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.createdAt);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      messages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );
      // Proceed to the next message.
      i += 1;
    }

    return messages;
  }

  render() {
    const {
      isMobile,
      channelUrl,
      title,
      status,
      loading,
      handleSendMessage,
      newMessage,
      handleNewMessageChange,
      handleClickChatWithUs,
      handleClickClose,
      handleClickHome,
    } = this.props;
    return(
      <Form onSubmit={(e)=>{
        e.preventDefault();
        handleSendMessage();
      }}>
        <Toolbar
          style={{ position: isMobile ? 'fixed' : 'none' }}
          title={title}
          onClickLeftItem={handleClickHome}
          onClickRightItem={handleClickClose}
          leftItem={<ToolbarButton icon={icHome} />}
          rightItem={<ToolbarButton icon={icClose} />}
        />
        {
          channelUrl !== '' ? (
            <React.Fragment>
              { loading ? <Loading /> :
                <Wrapper>
                  {this.renderMessages()}
                </Wrapper>
              }
              {
                status !== false ? (
                  <Compose
                    value={newMessage}
                    handeValueChange={(value) => {
                      handleNewMessageChange(value);
                    }}
                    style={{ position: isMobile ? 'fixed' : 'absolute' }}
                    rightItems={[
                      <span
                        key="emoji"
                        onClick={() => {
                          handleSendMessage();
                        }}>
                        <ToolbarButton
                          key="emoji"
                          icon={icSend}
                        />
                      </span>
                    ]}
                   />
                ) : null
              }
            </React.Fragment>
          ): <EmptyState
              loading={this.props.loadingCreateTicket}
              handleClickChatWithUs={handleClickChatWithUs}
            />
        }
      </Form>
    );
  }
}