import React, { Component } from 'react';

import RoomList from '../RoomList/RoomList';
import Register from '../Register/Register';
import Loading from '../Loading/Loading';
import StreamGrid from '../StreamGrid/StreamGrid';

import { Body } from './styles';

import { 
	registerInRoom,
	subscribeToPublisher,
	unpublish,
	publish,
	janusInit,
} from '../../services/janus';

class BaseApp extends Component {
	componentDidMount() {
		janusInit(janus => {
			this.props.onSetJanus(janus);
			this.props.onSetRoomList(janus);
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
					const event = msg['videoroom'];

					if (event !== undefined) {
						if (event === "joined") {     						   
							if (room === user.activeRoom) {
								onSetRegisteredStatus(true);
								publish(handle, true);
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
								publish(that.props.handles[that.props.user.activeRoom], true);
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
		onSetActiveRoom(room);

		unpublish(handles[user.activeRoom]);
		for (const key in subscriptions) {
			onRemoveRemoteStream(key);
			onRemoveSubscriptionHandle(key);
		}

		let activeRoomPublishers = Object.values(publishers).filter(p => p.room === room);
		
		this.registerSubscriptionHandles(
			room,
			activeRoomPublishers, 
			janus,
			onSetSubscriptionHandle,
			onSetRemoteStream,
		);
	}
} 

export default BaseApp;