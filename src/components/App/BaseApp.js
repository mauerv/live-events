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

    this.state = {
      handles: {},
      roomList: [],
    }
  }

  updateRoomList = () => {
    const that = this;
    const { user } = this.props;
    const handle = this.state.handles[user.activeRoom];

    handle.send({ 
      "message": { "request": "list" },
      success: roomList => {
        roomList = roomList.list;
        roomList.forEach(room => room.participants = []);
        roomList.forEach(room => {
          if (room.num_participants > 0) {
            handle.send({
              message: {
                request: "listparticipants",
                room: room.room
              },
              success: participants => {    
                room.participants = participants.participants.filter(p => p.publisher === true);                            
                that.setState({ roomList: roomList });
              }
            })
          }
        })
        that.setState({ roomList: roomList });
      }
    });
  }

	handleChange = e => this.props.onSetUsername(e.target.value);

	registerHandles = e => {
    e.preventDefault();
    const { janus, user } = this.props;
    const that = this;
    const rooms = [1234, 2345, 3456, 4567, 5678];

    if (user.username.length === 0) {
      return;
    }

    rooms.forEach(room => {      
      janus.attach({
        plugin: "janus.plugin.videoroom",
        success: pluginHandle => {
          let newState = { ...that.state.handles }
          newState[room] = pluginHandle;
          that.setState({ handles: newState });

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
          const handle = that.state.handles[room];

          if (jsep !== undefined && jsep !== null) {
            handle.handleRemoteJsep({ jsep: jsep });
          }

          const event = msg['videoroom'];

          if (event !== undefined && event !== null) {
            if (event === "joined") {              
              if (room === user.activeRoom) {
                that.props.onSetRegisteredStatus(true);
                that.publishOwnFeed(true);
              }
            } else if (event === "event") {
              if (msg.room === room && msg.publishers !== undefined && msg.publishers !== null) {
                setTimeout(() => that.updateRoomList(), 200);
              }
              if (msg.unpublished === "ok") {
                this.publishOwnFeed(true);
              }
              if (msg.room === room && typeof msg.unpublished === "number" ) {
                setTimeout(() => that.updateRoomList(), 200);
              }
              if (msg.configured === "ok") {
                setTimeout(() => that.updateRoomList(), 200);     
              }
            } 
          }
        },
        onlocalstream: stream => {
        }
      })
    });
  }

  unpublish = room => {
    const handle = this.state.handles[room];
    handle.send({ "message": { "request": "unpublish" }})  
  }

  publishOwnFeed = useAudio => {
    const { user } = this.props;
    const handle = this.state.handles[user.activeRoom];
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
            that.publishOwnFeed(false);
        }
      }
    })
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
            that.props.onSetJanus(janus)
          },
        });
      }
    });
  }

  render() {
    const { roomList } = this.state;
    const { janus, user } = this.props;

    return (
      <div>
        {janus ? (
          <div>
            {user.registered ? (
              <div>
                <Header />
                <RoomList roomList={roomList} onRoomClick={this.updateActiveRoom}/>
              </div>
            ) : (
              <Register onChange={this.handleChange} onSubmit={this.registerHandles} value={user.username} />
            )}
          </div>
        ) : <Loading />}
      </div>
    )
  }

  updateActiveRoom = room => {
    let temp = this.props.user.activeRoom;
    this.props.onSetActiveRoom(room);
    this.unpublish(temp);
  }
} 

export default BaseApp;
