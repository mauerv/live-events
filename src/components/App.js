import React, { Component } from 'react';
import { Janus } from 'janus-gateway';

import VideoRoom from './VideoRoom';
import RoomList from './RoomList/RoomList';
import SimpleForm from './SimpleForm/SimpleForm';
import Loading from './Loading/Loading';

import iceServers from '../iceServers';

class App extends Component {
  state = {
    janus: null,
    sfuHandle: null,
    username: "",
    room: 1234,
    roomList: [],
    opaqueId: `videoroomtest-${Janus.randomString(12)}`,
  }

  updateJanus = janusInstance => {
    this.setState({ janus: janusInstance });
  }

  updatePluginHandle = pluginHandle => {
    this.setState({ sfuHandle: pluginHandle });
  }

  updateRoomList = roomList => {
    const { sfuHandle } = this.state;
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
            this.setState({ roomList: roomList });
          }
        })
      }
    })
    this.setState({ roomList: roomList });
  }

	handleChange = e => this.setState({ username: e.target.value })

	handleSubmit = e => {
		e.preventDefault();
		const { username, room, sfuHandle } = this.state;

		this.registerInRoom(username, room, sfuHandle)
	}

	registerInRoom = (username, room, sfuHandle) => {
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

  componentDidMount() {
    const that =  this;

    Janus.init({
      debug: true,
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
                this.updatePluginHandle(pluginHandle);
                const body = { "request": "list" };
                pluginHandle.send({ 
                  "message": body,
                  success: (roomList) => {
                    that.updateRoomList(roomList.list);
                  } 
                })
              },
              error: (error) => {
                
              },
            })
          },
					error: function(error) {
						Janus.error(error);
					},
					destroyed: function() {
						
					}
        })
      }
    })
  }

  render() {
    const { 
			roomList, 
			sfuHandle,
			username,
		} = this.state;

    if (sfuHandle !== null) {
      return (
        <div>
          <SimpleForm onChange={this.handleChange} onSubmit={this.handleSubmit} value={username} />
          <RoomList roomList={roomList}/>
        </div>
      );
    } else {
      return (
        <Loading />
      );
    }
  }
} 

export default App;
