import React, { Component } from "react";

import RoomList from "components/RoomList/RoomList";
import Register from "components/Register/Register";
import Loading from "components/Loading/Loading";
import StreamGrid from "components/StreamGrid/StreamGrid";

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
      setRegistered,
      setPublished,
      setPublishers,
      removePublisher,
      setHandle,
      setStream
    } = this.props;
    const that = this;

    roomIds.forEach(room => {
      janus.attach({
        plugin: "janus.plugin.videoroom",
        success: pluginHandle => {
          setHandle({ room, handle: pluginHandle });
          registerInRoom(room, user.username, pluginHandle);
        },
        error: error => {},
        consentDialog: on => {},
        webrtcState: active => {},
        iceState: state => {
          if (state === "connected") {
            setPublished("published");
          }
        },
        mediaState: (medium, on) => {},
        onmessage: (msg, jsep) => {
          const { user } = that.props;
          const handle = that.props.handles[room];
          const event = msg["videoroom"];

          if (event !== undefined) {
            if (event === "joined") {
              if (room === user.activeRoom) {
                setRegistered("registered");
                that.publishOwnFeed(handle, user.publishAudio);
              }
              let publishers = msg["publishers"];
              if (publishers !== undefined && publishers.length !== 0) {
                setPublishers(publishers, room);
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
                removePublisher(msg.unpublished);
                if (room === user.activeRoom) {
                  onRemoveSubscription(msg.unpublished);
                }
              }
              if (msg.publishers !== undefined) {
                setPublishers(msg.publishers, room);
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
        onlocalstream: stream => setStream(stream),
        oncleanup: () => {}
      });
    });
  };

  newRemoteFeeds = (room, publishers) => {
    const {
      janus,
      onSetSubscription,
      onSetSubscriptionStream,
      onSetSubscriptionIceState
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
        iceState: state => {
          if (state === "connected") {
            onSetSubscriptionIceState(publisher.id, "connected");
          }
        },
        mediaState: (medium, on) => {},
        webrtcState: on => {},
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
        },
        onremotestream: stream => {
          onSetSubscriptionStream(publisher.id, stream);
        },
        oncleanup: () => {}
      });
    });
  };

  publishOwnFeed = (handle, withAudio) => {
    this.props.setPublished("publishing");
    publish(handle, withAudio);
  };

  changeActiveRoom = newRoom => {
    const {
      user,
      setActiveRoom,
      subscriptions,
      onRemoveSubscription,
      setStream,
      setPublished,
      publishers,
      handles
    } = this.props;

    if (newRoom === user.activeRoom) return;
    if (user.published !== "published") return;

    setPublished(false);
    setStream(null);
    unpublish(handles[user.activeRoom]);
    Object.keys(subscriptions).forEach(key => {
      subscriptions[key].handle.detach();
      onRemoveSubscription(key);
    });

    let activeRoomPublishers = Object.values(publishers).filter(
      p => p.room === newRoom
    );

    this.newRemoteFeeds(newRoom, activeRoomPublishers);
    setActiveRoom(newRoom);
  };
}

export default BaseApp;
