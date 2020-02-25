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

		return (
			<div>
				{janus && isRoomListSet ? (
					<div>
					{user.registered === "registered" ? (
						<Body>
							<RoomList 
								roomList={roomList} 
								onRoomClick={this.changeActiveRoom} 
								activeRoom={user.activeRoom}
								publishing={user.publishing}
							/>
							<StreamGrid remoteStreams={streamList} />
						</Body>
					) : (
						<Register initializeApp={this.manageRooms} />
					)}
					</div>
				) : <Loading />}
			</div>
		)
	}

	manageRooms = () => {
		const { 
			janus, 
			user, 
			roomIds, 
			onRemoveSubscriptionHandle,
			onSetRegisteredStatus,
			onSetPublishedStatus,
			onSetPublisherList,
			onRemovePublisher,
			onSetHandle,
			onSetStream,
			onRemoveRemoteStream,
		} = this.props;
		const that = this;

		roomIds.forEach(room => {      
			janus.attach({
				plugin: "janus.plugin.videoroom",
				success: pluginHandle => {
					onSetHandle(room, pluginHandle);
					registerInRoom(room, user.username, pluginHandle);
				},
				error: error => console.log(error),
				iceState: state => {
					if (state === "connected") {
						onSetPublishedStatus("published");
					}
				},
				onmessage: (msg, jsep) => {
					const { user } = that.props;
					const handle = that.props.handles[room];
					const event = msg['videoroom'];

					if (event !== undefined) {
						if (event === "joined") {     						   
							if (room === user.activeRoom) {
								onSetRegisteredStatus("registered");
								that.publishOwnFeed(handle, user.publishAudio);
							}
							let publishers = msg['publishers'];
							if (publishers !== undefined && publishers.length !== 0) {   							
								onSetPublisherList(publishers, room);
								if (room === user.activeRoom) {	
									that.newRemoteFeeds(room, publishers);
								}
							}   
						} else if (event === "event") {
							if (msg.configured === "ok") {
								// can't directly publish without video, workaround.
								if (handle.isVideoMuted() === user.publishVideo) {
									handle.muteVideo();
								}
							}
							if (msg.unpublished === "ok") {		
								that.publishOwnFeed(
									that.props.handles[user.activeRoom], 
									user.publishAudio, 
									
								);
							}
							if (typeof msg.unpublished === "number") {
								onRemovePublisher(msg.unpublished);
								onRemoveRemoteStream(msg.unpublished);
								onRemoveSubscriptionHandle(msg.unpublished);
							}
							if (msg.publishers !== undefined) {			
								onSetPublisherList(msg.publishers, room);
								if (room === user.activeRoom) {
									that.newRemoteFeeds(room, msg.publishers);
								}
							}
						} 
					}
					if (jsep !== undefined && jsep !== null) {
						handle.handleRemoteJsep({ jsep: jsep });						
					}
				},
				onlocalstream: stream => onSetStream(stream),
			})
		});
	}

	newRemoteFeeds = (room, publishers) => {
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
					onSetRemoteStream(stream, publisher.id);
				},
				oncleanup: () => {}
			})
		})
	}	

	publishOwnFeed = (handle, withAudio) => {
		this.props.onSetPublishedStatus("publishing");
		publish(handle, withAudio);
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
		if (user.published !== "published") return;
		
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