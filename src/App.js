import React, { Component } from 'react';
import { MessageList, TicketList, Loading, EmptyState } from './components/index';
import styled from 'styled-components'

const WIDTH = window.innerWidth;
const TABLET_WIDTH = 700;
const MOBILE_WIDTH = 500;

const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  background: #eeeef0;
  position: absolute;
  line-height: 1;
  box-sizing: initial;
  display: block;
  z-index: 99992;
  top: ${props => props.isMobile ? '0' : '40px' };
  right: ${props => props.isMobile ? '0' : '40px' };
  width: ${props => props.isMobile ? '100%' : WIDTH < TABLET_WIDTH ? '80%' : '70%' };
  height: ${props => props.isMobile ? `${window.innerHeight}px` : '500px' };
  box-shadow: 0 2px 30px 0 rgba(0,0,0,.2);
  border-radius: 12px;
`;
const Wrapper =  styled.div`
  width: 100%;
  height: 100%;
  background: #eeeef1;
  display: flex;
`;
const Scrollable = styled.div`
  background-color: white;
  position: relative;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingApp: true,
      ticketList: [],
      selectedChannelKey: '',
      selectedChannelUrl: '',
      selectedStatus: '',
      selectedTitle: '',
      selectedUpdateAt: -1,
      messageList: [],
      loadingChat: false,
      loadingCreateTicket: false,
      isShow: false,
      newMessage: '',
    }
    this.isMobile = WIDTH <= MOBILE_WIDTH;
    this.oc = null;
  }

  open() {
    this.setState({ isShow: true, });
  }
  close() {
    this.setState({ isShow: false, });
  }
  openWindow(loadingApp = true, ticketList = [], error) {
    this.setState({ isShow: true, loadingApp, ticketList, error });
  }
  handleOpenTicket = (channelKey, channelUrl) => {
    if(channelKey && channelKey !== '') {
      this.setState({loadingChat: true, selectedChannelUrl: channelUrl }, ()=>{
        window.ChatWidget.getPreviousMessageList(channelKey)
        .then((messageList) => {
          const ticket = this.state.ticketList.find(({key})=> {
            return key === channelKey
          });
          this.setState({
            selectedChannelKey: channelKey,
            selectedChannelUrl: ticket.channelUrl,
            selectedStatus: ticket.isActive,
            selectedTitle: ticket.title,
            selectedUpdateAt: ticket.lastUpdate,
            messageList,
            loadingChat: false,
          });
        }).catch((e) => {
          // do something
          console.log('e: ', e);
        })
      });
    }
  }
  handleNewMessageChange = (message)=>{
    this.setState({
      newMessage: message
    });
  }
  handleSendMessage = () => {
    if (!this.state.newMessage === '') return;
    const { messageList, newMessage } = this.state;
    const message = {
      author: 'ME',
      message: newMessage,
      loading: true,
      createdAt: Date.now(),
    }
    console.log(this.state);
    messageList.push(message);
    // window.ChatWidget.sendMessage(message, this.state.selectedChannelKey)

    this.setState({
      messageList,
      newMessage: '',
    }, () => {
    });
  }
  handleClickClose = () => {
    this.close();
  }
  handleClickHome = () => {
    this.setState({ selectedChannelUrl: '', selectedChannelKey: '' })
  }
  handleClickChatWithUs = () => {
    let title = prompt('Title ?');
    this.setState({ loadingCreateTicket: true }, ()=>{
      window.ChatWidget.createTicket(title).then((ticketList)=>{
        this.setState({ loadingCreateTicket: false, ticketList });
      });
    })
   
  }
  render() {
    const {
      newMessage,
      loadingChat,
      selectedChannelUrl,
      selectedStatus,
      selectedTitle,
      messageList,
      loadingApp,
      loadingCreateTicket,
      ticketList } = this.state;
    if(!this.state.isShow) {
      return <span />;
    }
    return (
      <AppContainer isMobile={this.isMobile}>
        <Wrapper>
          {
            !this.isMobile ? (
              <Scrollable style={{ width: "35%" }}>
                <TicketList
                  selectedChannelUrl={selectedChannelUrl}
                  loading={loadingApp}
                  isMobile={this.isMobile}
                  list={ticketList}
                  handleOpenTicket={this.handleOpenTicket}
                />
              </Scrollable>
            ): null
          }
          <Scrollable style={{ width: this.isMobile ? "100%" : "75%" }}>
            <MessageList
              handleClickHome={this.handleClickHome}
              handleClickClose={this.handleClickClose}
              loadingCreateTicket={loadingCreateTicket}
              newMessage={newMessage}
              handleClickChatWithUs={this.handleClickChatWithUs}
              handleSendMessage={this.handleSendMessage}
              handleNewMessageChange={this.handleNewMessageChange}
              isMobile={this.isMobile}
              loading={loadingChat}
              status={selectedStatus}
              title={selectedTitle}
              list={messageList}
              channelUrl={selectedChannelUrl} />
          </Scrollable>
        </Wrapper>
      </AppContainer>
    );
  }
} 

export default App;
