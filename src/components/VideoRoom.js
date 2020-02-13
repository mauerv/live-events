import React, { Component } from 'react';
import { Janus } from 'janus-gateway';

import VideoStream from './VideoStream';

export default class VideoRoom extends Component {
    constructor(props) {
        super(props);
        this.localVid = React.createRef();
        this.remoteVid_0 = React.createRef();
        this.remoteVid_1 = React.createRef();
        this.remoteVid_2 = React.createRef();
        this.remoteVid_3 = React.createRef();
        this.remoteVid_4 = React.createRef();

        this.state = {
            janus: null,
            sfutest: null,
            room: 1234,
            id: '',
            privateId: '',
            username: '',
            opaqueId: `videoroomtest-${Janus.randomString(12)}`,
            feeds: [],
        }
    }

    handleChange = e => this.setState({ username: e.target.value })

    handleSubmit = e => {
        e.preventDefault();

        const { username, room, sfutest } = this.state;

        if (username.length > 0) {
            const register = {
                "request": "join",
                "room": room,
                "ptype": "publisher",
                "display": username
            };
            sfutest.send({ "message": register });
        }
    }

    updateJanus = janusInstance => {
        this.setState({ janus: janusInstance });
    }

    updatePluginHandle = pluginHandle => {
        this.setState({ sfutest: pluginHandle });
    }

    updateId = id => {
        this.setState({ id: id });
    }

    updatePrivateId = id => {
        this.setState({ privateId: id });
    } 

    publishOwnFeed = useAudio => {
        const { sfutest } = this.state;
        sfutest.createOffer({
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
                sfutest.send({ "message": publish, "jsep": jsep });
            },
            error: (error) => {
                Janus.error("WebRTC error:", error);
                if (useAudio) {
                    this.publishOwnFeed(false);
                }
            }
        })
    }

    newRemoteFeed = (id, display, audio, video) => {
        const { 
            janus, 
            opaqueId, 
            room, 
            privateId,
            feeds,
        } = this.state;
        const that = this;
        let remoteFeed = null;

        janus.attach({
            plugin: "janus.plugin.videoroom",
            opaqueId: opaqueId,
            success: (pluginHandle) => {
                remoteFeed = pluginHandle;
                const subscribe = { 
                    "request": "join",
                    "room": room,
                    "ptype": "subscriber",
                    "feed": id,
                    "private_id": privateId,
                };
                remoteFeed.videoCodec = video;
                remoteFeed.send({ "message": subscribe });
            },
            error: (error) => {

            },
            onmessage: (msg, jsep) => {
                if (jsep !== undefined && jsep !== null) {
                    remoteFeed.createAnswer({
                        jsep: jsep,
                        media: { audioSend: false, videoSend: false },
                        success: (jsep) => {
                            const body = { "request": "start", "room": room };
                            remoteFeed.send({ "message": body , "jsep": jsep });
                        }
                    })
                }

                const event = msg['videoroom'];
                if (event !== undefined && event !== null) {
                    if (event === "attached") {
                        for(let i = 0; i < 5; i++) {
							if(feeds[i] === undefined || feeds[i] === null) {
								feeds[i] = remoteFeed;
								remoteFeed.rfindex = i;
								break;
                            }
                            remoteFeed.rfid = msg["id"];
                            remoteFeed.rfdisplay = msg["display"];
						}
                    } 
                }
            },
            webrtcState: (on) => {
                console.log("Janus says this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") is " + (on ? "up" : "down") + " now");
            },
            onremotestream: (stream) => {
                Janus.attachMediaStream(that.remoteVid_0.current, stream);
            },
            oncleanup: () => {

            }
        })
    }

    componentDidMount() {
        const that = this;

        Janus.init({
            debug: false,
            callback: () => {
                const janus = new Janus({
                    server: process.env.REACT_APP_JANUS_SERVER,
                    iceServers: [
                        { url: 'stun:stun.l.google.com:19302' }, 
                        { url: 'stun:stun2.l.google.com:19302' }, 
                    ],
                    success: () => {
                        that.updateJanus(janus);
                        janus.attach({
                            plugin: 'janus.plugin.videoroom',
                            opaqueId: that.opaqueId,    
                            success: (pluginHandle) => {
                                that.updatePluginHandle(pluginHandle);
                            },
                            onmessage: (msg, jsep) => {
                                console.log(msg);
                                const { sfutest } = that.state;

                                if (jsep !== undefined && jsep !== null) {
                                    sfutest.handleRemoteJsep({ jsep: jsep });
                                }

                                const event = msg['videoroom'];

                                if (event !== undefined && event !== null) {
                                    if (event === "joined") {
                                        that.updateId(msg['id']);
                                        that.updatePrivateId(msg['private_id']);
                                        that.publishOwnFeed(true);
                                        if (msg['publishers'] !== undefined && msg['publishers'] !== null) {
                                            let list = msg['publishers'];
                                            for(var f in list) {
                                                const id = list[f]['id'];
                                                const display = list[f]['display'];
                                                const audio = list[f]['audio_codec'];
                                                const video =list[f]['video_codec'];
                                                that.newRemoteFeed(id, display, audio, video);
                                            }
                                        }
                                    }
                                }
                            },
                            onlocalstream: (stream) => {
                                Janus.attachMediaStream(that.localVid.current, stream)
                            },
                            oncleanup: () => {
                                Janus.log(" ::: Got a cleanup notification: we are unpublished now :::");
                            }
                        })
                    }                        
                })
            }  
        })
    }

    render() {
        const { feeds } = this.state;

        return (
            <div>
                <h1>Video Room</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="Join" />
                </form>
                <div>
                    <h3>Local</h3>
                    <video 
                        ref={this.localVid}
                        autoPlay
                        playsInline
                        controls={false}
                    ></video>  
                    <h3>Remote 01</h3>
                    <video 
                        ref={this.remoteVid_0}
                        autoPlay
                        playsInline
                        controls={false}
                    ></video>   
                </div>
            </div>
        )
    }
}