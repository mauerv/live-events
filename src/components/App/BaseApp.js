import React, { Component } from 'react';
import { Janus } from 'janus-gateway';

import RoomList from '../RoomList/RoomList';
import Register from '../Register/Register';
import Loading from '../Loading/Loading';
import StreamGrid from '../StreamGrid/StreamGrid';

import { Body } from './styles';

import iceServers from '../../constants/iceServers';
import { 
	onJanusError,
	onJanusDestroy, 
	registerInRoom,
	subscribeToPublisher,
	unpublish,
} from '../../services/janus';

class BaseApp extends Component {
	componentDidMount() {
		const { onSetJanus, onSetRoomList } = this.props;

		Janus.init({
			debug: false,
			callback: () => {
			if(!Janus.isWebrtcSupported()){ return alert("Your browser doesn't support WebRTC."); }

			const janus = new Janus({
				server: process.env.REACT_APP_JANUS_SERVER,
				iceServers: iceServers,
				success: () => {
					onSetJanus(janus);
					onSetRoomList(janus);
				},
				error: onJanusError,
				destroyed: onJanusDestroy,
			});
			}
		});
	}

	render() {
		const { janus, user, roomList, streamList } = this.props;
		return (
			<div>
				{janus ? (
					<div>
					{user.registered ? (
						<Body>
							<RoomList roomList={roomList} onRoomClick={this.changeActiveRoom} />
							<StreamGrid userStream={user.stream} remoteStreams={streamList} />
						</Body>
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

	handleChange = e => this.props.onSetUsername(e.target.value);

	registerHandles = e => {
    	e.preventDefault();

		const { 
			janus, 
			user, 
			roomIds, 
			onSetSubscriptionHandle,
			onRemoveSubscriptionHandle,
			onSetRegisteredStatus,
			onSetPublisherList,
			onRemovePublisher,
			onSetHandle,
			onSetStream,
			onSetRemoteStream,
			onRemoveRemoteStream,
		} = this.props;
		const that = this;

		if (user.username.length === 0) return;

		roomIds.forEach(room => {      
			janus.attach({
				plugin: "janus.plugin.videoroom",
				success: pluginHandle => {
					onSetHandle(room, pluginHandle);
					registerInRoom(room, user.username, pluginHandle);
				},
				error: error => console.log(error),
				onmessage: (msg, jsep) => {
					const handle = that.props.handles[room];
					
					if (jsep !== undefined && jsep !== null) {
						handle.handleRemoteJsep({ jsep: jsep });
					}
					console.log("There was a message", msg);
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
										onSetSubscriptionHandle,
										onSetRemoteStream,
										onRemoveRemoteStream,
									);
								}
							}   
						} else if (event === "event") {
							if (msg.unpublished === "ok") {					
								that.publish(true);
							}
							if (typeof msg.unpublished === "number") {
								onRemovePublisher(msg.unpublished);
								onRemoveRemoteStream(msg.unpublished);
								onRemoveSubscriptionHandle(msg.unpublished);
							}
							if (msg.publishers !== undefined) {
								onSetPublisherList(msg.publishers, room);
								if (room === user.activeRoom) {
									this.registerSubscriptionHandles(
										room,
										msg.publishers,
										janus,
										onSetSubscriptionHandle,
										onSetRemoteStream,
										onRemoveRemoteStream,
									)
								}
							}
						} 
					}
				},
				onlocalstream: stream => onSetStream(stream)
			})
		});
	}



	registerSubscriptionHandles = (
		room,
		publishers, 
		janus,
		onSetSubscriptionHandle,
		onSetRemoteStream,
	) => {
		const that = this;		

		publishers.forEach(publisher => {			
			janus.attach({
				plugin: "janus.plugin.videoroom",
				success: pluginHandle => {		
					onSetSubscriptionHandle(publisher.id, pluginHandle);
					subscribeToPublisher(
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
				onremotestream: stream => onSetRemoteStream(stream, publisher.id),
			})
		})
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

	changeActiveRoom = room => {
		const { 
			user, 
			onSetActiveRoom, 
			subscriptions, 
			onSetSubscriptionHandle,
			onSetRemoteStream,
			onRemoveRemoteStream,
			onRemoveSubscriptionHandle,
			publishers,
			janus,
			handles,
		} = this.props;

		unpublish(handles[user.activeRoom]);
		for (const key in subscriptions) {
			onRemoveRemoteStream(key);
			onRemoveSubscriptionHandle(key);
		}
		let activeRoomPublishers = [];
		for (const key in publishers) {
			if (publishers[key].room === room) {
				activeRoomPublishers.push(publishers[key]);
			}
		}
		this.registerSubscriptionHandles(
			room,
			activeRoomPublishers, 
			janus,
			onSetSubscriptionHandle,
			onSetRemoteStream,
		)
		onSetActiveRoom(room);
	}
} 

export default BaseApp;