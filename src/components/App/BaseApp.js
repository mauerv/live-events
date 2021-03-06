import React, { Component } from "react";

import RoomList from "../RoomList/RoomList";
import Register from "../Register/Register";
import Loading from "../Loading/Loading";
import StreamGrid from "../StreamGrid/StreamGrid";

import { AppContainer } from "./styles";

import {
  registerInRoom,
  subscribeToPublisher,
  unpublish,
  publish,
  janusInit
} from "../../services/janus";

class BaseApp extends Component {
  componentDidMount() {
    janusInit(janus => {
      this.props.setJanus(janus);
      this.props.onSetRoomList(janus);
    });
  }

  render() {
    const { janus, user, isRoomListSet, roomList } = this.props;

    return (
      <div>
        {janus && isRoomListSet ? (
          <div>
            {user.registered === "registered" ? (
              <AppContainer>
                <RoomList
                  roomList={roomList}
                  onRoomClick={this.changeActiveRoom}
                  activeRoom={user.activeRoom}
                  publishing={user.published}
                />
                <StreamGrid />
              </AppContainer>
            ) : (
              <AppContainer>
                <Register initializeApp={this.manageRooms} />
              </AppContainer>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }

  manageRooms = () => {
    const {
      janus,
      user,
      roomIds,
      onRemoveSubscription,
      onSetRegisteredStatus,
      onSetPublishedStatus,
      onSetPublisherList,
      onRemovePublisher,
      onSetHandle,
      onSetStream
    } = this.props;
    const that = this;

    roomIds.forEach(room => {
      janus.attach({
        plugin: "janus.plugin.videoroom",
        success: pluginHandle => {
          onSetHandle(room, pluginHandle);
          registerInRoom(room, user.username, pluginHandle);
        },
        error: error => {},
        consentDialog: on => {},
        webrtcState: active => {
          if (active) onSetPublishedStatus("published");
        },
        iceState: state => {},
        mediaState: (medium, on) => {
          console.log(medium, on);
        },
        onmessage: (msg, jsep) => {
          const { user } = that.props;
          const handle = that.props.handles[room];
          const event = msg["videoroom"];
          if (room === user.activeRoom) {
            console.log("Message", msg);
          }
          if (event !== undefined) {
            if (event === "joined") {
              if (room === user.activeRoom) {
                onSetRegisteredStatus("registered");
                that.publishOwnFeed(handle, user.publishAudio);
              }
              let publishers = msg["publishers"];
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
                  user.publishAudio
                );
              }
              if (typeof msg.unpublished === "number") {
                // cleanup state and janus handle
                onRemovePublisher(msg.unpublished);
                if (room === user.activeRoom) {
                  onRemoveSubscription(msg.unpublished);
                }
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
        oncleanup: () => {}
      });
    });
  };

  newRemoteFeeds = (room, publishers) => {
    const {
      janus,
      onSetSubscription,
      onSetSubscriptionStream,
      onSetSubscriptionWebrtcState
    } = this.props;
    const that = this;

    publishers.forEach(publisher => {
      janus.attach({
        plugin: "janus.plugin.videoroom",
        success: pluginHandle => {
          onSetSubscription(publisher.id, pluginHandle);
          subscribeToPublisher(
            room,
            publisher.id,
            publisher.video_codec,
            pluginHandle
          );
        },
        error: error => {},
        onmessage: (msg, jsep) => {
          const subscriptionHandle =
            that.props.subscriptions[publisher.id].handle;

          if (jsep !== undefined) {
            subscriptionHandle.createAnswer({
              jsep: jsep,
              media: { audioSend: false, videoSend: false },
              success: jsep => {
                const body = { request: "start", room: room };
                subscriptionHandle.send({ message: body, jsep: jsep });
              }
            });
          }

          if (msg.started === "ok") {
            onSetSubscriptionWebrtcState(publisher.id, true);
          }
        },
        onremotestream: stream => onSetSubscriptionStream(publisher.id, stream)
      });
    });
  };

  publishOwnFeed = (handle, withAudio) => {
    this.props.onSetPublishedStatus("publishing");
    publish(handle, withAudio);
  };

  changeActiveRoom = newRoom => {
    const {
      user,
      onSetActiveRoom,
      subscriptions,
      onRemoveSubscription,
      onSetStream,
      onSetPublishedStatus,
      publishers,
      handles
    } = this.props;

    if (newRoom === user.activeRoom) return;
    if (user.published !== "published") return;

    onSetPublishedStatus(false);
    onSetStream(null);
    unpublish(handles[user.activeRoom]);
    Object.keys(subscriptions).forEach(key => {
      subscriptions[key].handle.detach();
      onRemoveSubscription(key);
    });

    let activeRoomPublishers = Object.values(publishers).filter(
      p => p.room === newRoom
    );

    this.newRemoteFeeds(newRoom, activeRoomPublishers);
    onSetActiveRoom(newRoom);
  };
}

export default BaseApp;
