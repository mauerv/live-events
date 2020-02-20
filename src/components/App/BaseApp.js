import React, { Component } from 'react';
import { Janus } from 'janus-gateway';

import RoomList from '../RoomList/RoomList';
import Register from '../Register/Register';
import Loading from '../Loading/Loading';
import Header from '../Header/Header';
import StreamGrid from '../StreamGrid/StreamGrid';

import iceServers from '../../constants/iceServers';

class BaseApp extends Component {
	constructor(props) {
    	super(props);
    	this.localVid = React.createRef();
	}

	handleChange = e => this.props.onSetUsername(e.target.value);

	registerHandles = e => {
    	e.preventDefault();

		const { 
			janus, 
			user, 
			roomIds, 
			onSetSubscriptionHandle,
			onSetRegisteredStatus,
			onSetPublisherList,
			onDeletePublisher,
			onSetHandle,
		} = this.props;
		const that = this;

		if (user.username.length === 0) {
		return;
		}

		roomIds.forEach(room => {      
			janus.attach({
				plugin: "janus.plugin.videoroom",
				success: pluginHandle => {
					onSetHandle(room, pluginHandle);
					that.registerInRoom(room, user.username, pluginHandle);
				},
				error: error => console.log(error),
				onmessage: (msg, jsep) => {
					const handle = that.props.handles[room];
					
					if (jsep !== undefined && jsep !== null) {
						handle.handleRemoteJsep({ jsep: jsep });
					}
					
					const event = msg['videoroom'];

					if (event !== undefined) {
						if (event === "joined") {     						   
							if (room === user.activeRoom) {
								onSetRegisteredStatus(true);
								that.publish(true);
							}
							let publishers = msg['publishers'];
							if (publishers !== undefined) {   							
								onSetPublisherList(publishers, room);
								if (room === user.activeRoom) {	
									that.registerSubscriptionHandles(
										room, 
										publishers, 
										janus, 
										onSetSubscriptionHandle
									);
								}
							}   
						} else if (event === "event") {
							if (msg.unpublished === "ok") {								
								that.publish(true);
							}
							if (typeof msg.unpublished === "number") {
								onDeletePublisher(msg.unpublished);
							}
							if (msg.publishers !== undefined) {
								onSetPublisherList(msg.publishers, room);
							}
						} 
					}
				},
				onlocalstream: stream => {
					console.log("I'm attaching in room:", that.props.user.activeRoom)
					Janus.attachMediaStream(that.localVid.current, stream);
				}
			})
		});
	}

	registerInRoom = (room, display, handle) => {
		const register = {
			"request": "join",
			"room": room,
			"ptype": "publisher",
			"display": display
		};
		handle.send({ "message": register });
	}

	registerSubscriptionHandles = (
		room,
		publishers, 
		janus,
		onSetSubscriptionHandle,
	) => {
		const that = this;		

		publishers.forEach(publisher => {			
			janus.attach({
				plugin: "janus.plugin.videoroom",
				success: pluginHandle => {		
					onSetSubscriptionHandle(publisher.id, pluginHandle);
					that.subscribeToPublisher(
						room, 
						publisher.id, 
						publisher.video_codec, 
						pluginHandle
					);
				},
				error: error => console.log(error),
				onmessage: (msg, jsep) => {
					const subscription = that.props.subscriptions[publisher.id];
					if (jsep !== undefined) {						
						subscription.createAnswer({
							jsep: jsep,
							media: { audioSend: false, videoSend: false },
							success: jsep => {
								const body = { "request": "start", "room": room };
								subscription.send({ "message": body, "jsep": jsep });
							}
						})
					}
				},
				onremotestream: stream => {
					
					
				}
			})
		})
	}	

	subscribeToPublisher = (room, id, videoCodec, handle) => {
		const subscribe = {
			"request": "join",
			"room": room,
			"ptype": "subscriber",
			"feed": id,
		};
		handle.videoCodec = videoCodec;
		handle.send({ "message": subscribe });
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
			success: jsep => {        
				const publish = {
					"request": "publish",
					"audio": useAudio,
					"video": true,
				};
				handle.send({ "message": publish, "jsep": jsep });
			},
			error: error => {
				Janus.error("WebRTC error:", error);
				if (useAudio) {
					that.publish(false);
				}
			}
		})
	}

	unpublish = room => {
		const handle = this.props.handles[room];
		handle.send({ "message": { "request": "unpublish" }})  
	}

	changeActiveRoom = room => {
		const { user, onSetActiveRoom } = this.props;
		this.unpublish(user.activeRoom);
		onSetActiveRoom(room);
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
						<RoomList roomList={roomList} onRoomClick={this.changeActiveRoom} />
						<StreamGrid localVid={this.localVid} />
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