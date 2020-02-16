import React, { Component } from 'react';
import { Janus } from 'janus-gateway';

import RoomList from './RoomList/RoomList';
import Register from './Register/Register';
import Loading from './Loading/Loading';

import iceServers from '../iceServers';

class App extends Component {
  constructor(props) {
    super(props);
    this.localVid = React.createRef();

    this.state = {
      janus: null,
      sfuHandle: null,
      username: "",
      registered: false,
      room: 2345,
      roomList: [],
      opaqueId: `videoroomtest-${Janus.randomString(12)}`,
    }
  }

  updateJanus = janusInstance => {
    this.setState({ janus: janusInstance });
  }

  updatePluginHandle = pluginHandle => {
    this.setState({ sfuHandle: pluginHandle });
  }

  updateRoomList = () => {
    const that = this;
    const { sfuHandle } = this.state;

    const body = { "request": "list" };
    sfuHandle.send({ 
      "message": body,
      success: roomList => {
        roomList = roomList.list;
        roomList.forEach(room => room.participants = []);
        roomList.forEach(room => {
          if (room.num_participants > 0) {
            sfuHandle.send({
              message: {
                request: "listparticipants",
                room: room.room
              },
              success: participants => {
                room.participants = participants.participants;
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

	handleSubmit = e => {
		e.preventDefault();
    this.registerInRoom();
	}

	registerInRoom = () => {
    const { username, room, sfuHandle } = this.state;

		if (username.length > 0) {
			const register = {
				"request": "join",
				"room": room,
				"ptype": "publisher",
				"display": username
      };
			sfuHandle.send({ "message": register });
		}
  }

  updateRegisteredRoom = room => {
    const { sfuHandle } = this.state;

    this.setState({ room: room });
    sfuHandle.send({ "message": { "request": "leave" }})  
  }

  unpublish = () => {
    const { sfuHandle } = this.state;
    sfuHandle.send({ "message": { "request": "unpublish" }})  
  }

  publish = () => {
   this.publishOwnFeed(true)
  }
  
  publishOwnFeed = useAudio => {
    const { sfuHandle } = this.state;
    sfuHandle.createOffer({
      media: {
        audioRecv: false,
        videoRecv: false,
        audioSend: useAudio,
        videoSend: true,
      },
      success: (jsep) => {
        const publish = {
          "request": "configure",
          "audio": useAudio,
          "video": true,
        };
        sfuHandle.send({ "message": publish, "jsep": jsep });
      },
      error: (error) => {
        Janus.error("WebRTC error:", error);
        if (useAudio) {
            this.publishOwnFeed(false);
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
            that.updateJanus(janus);
            janus.attach({
              plugin: 'janus.plugin.videoroom',
              opaqueId: that.opaqueId,
              success: (pluginHandle) => { 
                that.updatePluginHandle(pluginHandle);
                that.updateRoomList();
              },
              error: (error) => {
                
              },
              onmessage: (msg, jsep) => {
                const { sfuHandle } = that.state;

                if (jsep !== undefined && jsep !== null) {
                    sfuHandle.handleRemoteJsep({ jsep: jsep });
                }

                const event = msg['videoroom'];

                if (event !== undefined && event !== null) {
                  if (event === "joined") {
                    that.setState({ registered: true });
                    that.publishOwnFeed(true);
                  }
                  if (event === "event") {
                    if (msg.error !== undefined) {
                      console.log("Failed", msg.error);
                    }
                    if (msg.unpublished === "ok") {
                      console.log("You unpublished");
                    }
                    if (msg.configured === "ok") {
                      console.log("You published");
                    }
                  }
                }
              },
              onlocalstream: stream => {
                that.updateRoomList();
              }
            })
          },
					error: error => {
						Janus.error(error);
					},
					destroyed: () => {
						
					}
        })
      }
    })
  }

  render() {
    const { 
			roomList, 
			janus,
      username,
      registered,
		} = this.state;

    if (janus !== null) {
      return (
        <div>
          {registered ? (
            <RoomList roomList={roomList} onRoomClick={this.updateRegisteredRoom}/>
          ) : (
            <Register onChange={this.handleChange} onSubmit={this.handleSubmit} value={username} />
          )}
        </div>
      );
    } else {
      return <Loading />
    }
   
  }
} 

export default App;
