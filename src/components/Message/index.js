import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { icTime, icDoneAll } from '../../assets/index'
import './index.css';

const ImgIcon = styled.img`
  color: white;
  height: 12px;
  padding: 0px;
  margin: 0px;
  padding-left: 6px;
  vertical-align: bottom;
`;

export default class Message extends Component {
  render() {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp,
    } = this.props;
    console.log(this.props);
    const friendlyTimestamp = moment(data.timestamp).format('LLLL');
    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
        }

        <div className="bubble-container">
          <div className="bubble" title={friendlyTimestamp}>
            { data.message }
            <ImgIcon src={data.loading ? icTime : icDoneAll}  />
          </div>
        </div>
      </div>
    );
  }
}