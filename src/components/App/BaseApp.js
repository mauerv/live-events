import React, { Component } from 'react';
import { Janus } from 'janus-gateway';

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
	state = {
		registering: false,
	};
	componentDidMount() {
		janusInit(janus => {
			this.props.onSetJanus(janus);
			this.props.onSetRoomList(janus);
		});
	}

	render() {
		const { 
			janus, 
			user,
			isRoomListSet, 
			roomList, 
			streamList,
		} = this.props;
		const { registering } = this.state;

		return (
			<div>
				{janus && isRoomListSet ? (
					<div>
					{user.registered ? (
						<Body>
							<RoomList roomList={roomList} onRoomClick={this.changeActiveRoom} />
							<StreamGrid userStream={user.stream} remoteStreams={streamList} />
						</Body>
					) : (
						<Register 
							onChange={this.handleChange} 
							onSubmit={this.handleSubmit} 
							value={user.username} 
							registering={registering}
						/>
					)}
					</div>
				) : <Loading />}
			</div>
		)
	}

	handleChange = e => this.props.onSetUsername(e.target.value);

	handleSubmit = e => {
		e.preventDefault();

		if (this.state.registering === true) return;

		this.setState({ registering: true });
		this.manageRooms();
	}

	manageRooms = () => {
		const { 
			janus, 
			user, 
			roomIds, 
			onRemoveSubscriptionHandle,
			onSetRegisteredStatus,
			onSetPublisherList,
			onRemovePublisher,
			onSetHandle,
			onSetStream,
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
					const { user } = that.props;
					const handle = that.props.handles[room];
					const event = msg['videoroom'];

					if (event !== undefined) {
						if (event === "joined") {     						   
							if (room === user.activeRoom) {
								onSetRegisteredStatus(true);
								that.setState({ registering: false });
								publish(handle, true);
							}
							let publishers = msg['publishers'];
							if (publishers !== undefined && publishers.length !== 0) {   							
								onSetPublisherList(publishers, room);
								if (room === user.activeRoom) {	
									that.newRemoteFeeds(room, publishers);
								}
							}   
						} else if (event === "event") {
							if (msg.unpublished === "ok") {		
								publish(that.props.handles[user.activeRoom], true);
							}
							if (typeof msg.unpublished === "number") {
								onRemovePublisher(msg.unpublished);
								onRemoveRemoteStream(msg.unpublished);
								onRemoveSubscriptionHandle(msg.unpublished);
							}
							if (msg.publishers !== undefined) {			
								console.log("The message has publishers", msg.publishers);			
								onSetPublisherList(msg.publishers, room);
								if (room === user.activeRoom) {
									that.newRemoteFeeds(room, msg.publishers);
								}
							}
						} 
					}
					if (jsep !== undefined && jsep !== null) {
						handle.handleRemoteJsep({ jsep: jsep });
						console.log("Fucking", msg);
						
					}
				},
				onlocalstream: stream => {				
					console.log("New audio stream", stream.getAudioTracks(), "room", that.props.user.activeRoom)
					console.log("New video stream", stream.getVideoTracks())	
	
					onSetStream(stream);
				} 
			})
		});
	}

	newRemoteFeeds = (room, publishers) => {
		console.log("Yo, got new publishers", publishers)
		const { janus, onSetSubscriptionHandle, onSetRemoteStream} = this.props;
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
				onremotestream: stream => {
					console.log("New remote stream");
					onSetRemoteStream(stream, publisher.id);
				},
				oncleanup: () => {}
			})
		})
	}	

	changeActiveRoom = newRoom => {
		const { 
			user, 
			onSetActiveRoom, 
			subscriptions, 
			onRemoveRemoteStream,
			onRemoveSubscriptionHandle,
			publishers,
			handles,
		} = this.props;
		if (newRoom === user.activeRoom) return;
		
		unpublish(handles[user.activeRoom]);
		for (const key in subscriptions) {
			onRemoveRemoteStream(key);
			onRemoveSubscriptionHandle(key);
		}
		
		let activeRoomPublishers = Object.values(publishers).filter(p => p.room === newRoom);
		
		this.newRemoteFeeds(newRoom, activeRoomPublishers);
		onSetActiveRoom(newRoom);
	}
} 

export default BaseApp;