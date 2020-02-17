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
      username: "",
      activeRoom: 2345,
      registered: false,
      roomList: [],
    }
  }

  updateRoomList = () => {
    const that = this;
    const handle = this.state.handles[this.state.activeRoom];

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

	handleChange = e => this.setState({ username: e.target.value })

	registerHandles = e => {
    e.preventDefault();

    const { username, activeRoom } = this.state;
    const { janus } = this.props;
    const that = this;
    const rooms = [1234, 2345, 3456, 4567, 5678];

    if (username.length === 0) {
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
            "display": username
          };
          if (room === activeRoom) {
            that.publishOwnFeed(true);
          }
          pluginHandle.send({ "message": register });
        },
        onmessage: (msg, jsep) => {
          const handle = that.state.handles[room];

          if (jsep !== undefined && jsep !== null) {
            handle.handleRemoteJsep({ jsep: jsep });
          }

          const event = msg['videoroom'];

          if (event !== undefined && event !== null) {
            if (event === "joined") {
              that.setState({ registered: true });
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

  publishNew = () => {
    this.setState({ activeRoom: 2345 });
    this.publishOwnFeed(true);
  }

  publishOwnFeed = useAudio => {
    const { activeRoom } = this.state;
    const handle = this.state.handles[activeRoom];
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
    const { 
			roomList, 
      username,
      registered,
    } = this.state;
    const { janus } = this.props;

    if (janus !== null) {
      return (
        <div>
          {registered ? (
            <div>
              <Header />
              <RoomList roomList={roomList} onRoomClick={this.updateActiveRoom}/>
            </div>
          ) : (
            <Register onChange={this.handleChange} onSubmit={this.registerHandles} value={username} />
          )}
        </div>
      );
    } else {
      return <Loading />
    }
   
  }

  updateActiveRoom = room => {
    let temp = this.state.activeRoom;
    this.setState({ activeRoom: room })
    this.unpublish(temp);
  }
} 

export default BaseApp;
