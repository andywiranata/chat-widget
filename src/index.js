import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
import Promise from 'promise-polyfill';
import './index.css';

// To add to window
if (!window.Promise) {
	window.Promise = Promise;
}
const nodeTickets = (userId = '', pushId = '') => `chat-widget/tickets/${userId}/${pushId}`;
const nodeMessages = (userId = '', pushId) => `chat-widget/messages/${userId}/${pushId}`

const firebaseConfig = {
  apiKey: "AIzaSyDyJt2V7wxvcy6MnNSVDUBuPpw8X0NCMu8",
  authDomain: "andywiranata-42555.firebaseapp.com",
  databaseURL: "https://andywiranata-42555.firebaseio.com",
  projectId: "andywiranata-42555",
  storageBucket: "andywiranata-42555.appspot.com",
  messagingSenderId: "534100936756",
  appId: "1:534100936756:web:8cf396bc88617d40e2a261"
};

class ChatWidget {
  constructor() {
    this.chatComponent = null;
    this.userId = null;
    ReactDOM.render(<App ref={(ref) => { this.chatComponent = ref}}/>, document.getElementById('chat-widget'));
  }
  start(_, onSuccess = ()=>{}, onError = ()=> {}) {
    const that = this;
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        that.userId = 'AIzaSyDyJt2V7wxvcy6MnNSVDUBuPpw8X0NCMu8';
        onSuccess(user);
      } else {
          firebase.auth().signInAnonymously().catch(function(error) {
            onError(error)
          });

      }
    });
  }
  open(channelUrl = null) {
    this.chatComponent.open(channelUrl);
  }
  close() {
    this.chatComponent.close();
  }
  openWindow() {
    this.chatComponent.openWindow();
    this.getAllTickets().then((data)=>{
      console.log(data);
      this.chatComponent.openWindow(false, data);
    }).catch((e)=>{
      this.chatComponent.openWindow(false, [], e);
    })
    
  }

  createTicket(title = null) {
    if(this.userId == null) {
      throw new Error('You are not authorized');
    }
    const pushId = firebase.database().ref(nodeTickets(this.userId, '')).push().key;
    const node = nodeTickets(this.userId, pushId);
    return new Promise((resolve, reject) => {
      firebase.database().ref(node).set({
        channelUrl: node,
        date: firebase.database.ServerValue.TIMESTAMP,
        isActive: true,
        lastUpdate: null,
        status: true,
        title: title || pushId,
        unreadCount: 0,
      }).then(()=> {
        return this.getAllTickets();
      }).then((ticketList)=> {
        resolve(ticketList);
      })
    });

  
  }
  sendMessage(message, channelKey) {

    return firebase.database().ref(nodeMessages(this.userId, channelKey)).set(message);

  }
  getPreviousMessageList(key) {
    console.log(key);
    return new Promise((resolve, reject) => {
      firebase.database().ref(nodeMessages(this.userId, key))
      .once('value').then((snapshot)=> {
        const messageObject = snapshot.val() || {};
        const messagesList = Object.keys(messageObject).map((key)=> {
          const message = messageObject[key];
          return message;
        });
        resolve(messagesList);
      }).catch((e)=> {
        reject(e);
      })
     
    });
  }
  getAllTickets() {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`chat-widget/tickets/${this.userId}`)
      .once('value').then((snapshot)=> {
        const ticketObject = snapshot.val() || {};
        resolve(Object.keys(ticketObject).map((key, index) => {
          const ticket = ticketObject[key];
          return {
            key,
            title: ticket.title,
            data: ticket.data,
            message: ticket.message,
            channelUrl: ticket.channelUrl,
            isActive: ticket.isActive,
            message: ticket.message,
            unreadCount: ticket.unreadCount,
            date: ticket.updatedAt,
            lastUpdate: ticket.lastUpdate
          }
        }))
      });
      
    });
    
  }


}
window.ChatWidget = new ChatWidget();
