import React, { Component } from 'react';
import { Janus } from 'janus-gateway';

import RoomList from '../RoomList/RoomList';
import Register from '../Register/Register';
import Loading from '../Loading/Loading';
import Header from '../Header/Header';

import iceServers from '../../constants/iceServers';

class BaseApp extends Component {
  constructor(props) {
    super(props);
    this.localVid = React.createRef();
  }

	handleChange = e => this.props.onSetUsername(e.target.value);

	registerHandles = e => {
    e.preventDefault();
    const { janus, user, roomIds } = this.props;
    const that = this;

    if (user.username.length === 0) {
      return;
    }

    roomIds.forEach(room => {      
      janus.attach({
        plugin: "janus.plugin.videoroom",
        success: pluginHandle => {
          that.props.onSetHandle(room, pluginHandle);
          const register = {
            "request": "join",
            "room": room,
            "ptype": "publisher",
            "display": user.username
          };
          
          pluginHandle.send({ "message": register });
        },
        error: error => console.log(error),
        onmessage: (msg, jsep) => {
          const handle = that.props.handles[room];
          
          if (jsep !== undefined && jsep !== null) {
            handle.handleRemoteJsep({ jsep: jsep });
          }
          
          const event = msg['videoroom'];

          if (event !== undefined && event !== null) {
            if (event === "joined") {           
              if (room === user.activeRoom) {
                that.props.onSetRegisteredStatus(true);
                that.publish(true);
              }
              
              let publishers = msg['publishers'];
              if (publishers !== undefined && publishers !== null) {   
                that.props.onSetPublisherList(publishers, room);
              }   

            } else if (event === "event") {
              if (msg.unpublished === "ok") {
                that.publish(true);
              }
              if (typeof msg.unpublished === "number") {
                that.props.onDeletePublisher(msg.unpublished);
              }
              if (msg.publishers !== undefined) {
                that.props.onSetPublisherList(msg.publishers, room);
              }
            } 
          }
        },
        onlocalstream: stream => {}
      })
    });
  }

  unpublish = room => {
    const handle = this.props.handles[room];
    handle.send({ "message": { "request": "unpublish" }})  
  }

  publish = useAudio => {
    const { user } = this.props;
    const handle = this.props.handles[user.activeRoom];
    const that = this;

    handle.createOffer({
      media: {
        audioRecv: false,
        videoRecv: false,
        audioSend: useAudio,
        videoSend: true,
      },
      success: (jsep) => {        
        const publish = {
          "request": "publish",
          "audio": useAudio,
          "video": true,
        };
        handle.send({ "message": publish, "jsep": jsep });
      },
      error: (error) => {
        Janus.error("WebRTC error:", error);
        if (useAudio) {
            that.publish(false);
        }
      }
    })
  }

  changeActiveRoom = room => {
    const { user, onSetActiveRoom } = this.props;
    this.unpublish(user.activeRoom);
    onSetActiveRoom(room);
    this.publish(true);
  }

  componentDidMount() {
    const that =  this;

    Janus.init({
      debug: false,
      callback: () => {
        const janus = new Janus({
          server: process.env.REACT_APP_JANUS_SERVER,
          iceServers: iceServers,
          success: () => {
            that.props.onSetJanus(janus);
            that.props.onSetRoomList(janus);
          },
        });
      }
    });
  }

  render() {
    const { janus, user, roomList } = this.props;

    return (
      <div>
        {janus ? (
          <div>
            {user.registered ? (
              <div>
                <Header />
                <RoomList roomList={roomList} onRoomClick={this.changeActiveRoom}/>
              </div>
            ) : (
              <Register 
                onChange={this.handleChange} 
                onSubmit={this.registerHandles} 
                value={user.username} 
              />
            )}
          </div>
        ) : <Loading />}
      </div>
    )
  }
} 

export default BaseApp;