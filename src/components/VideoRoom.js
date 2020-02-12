import React, { Component } from 'react';
import { Janus } from 'janus-gateway';

import VideoStream from './VideoStream';

export default class VideoRoom extends Component {
    constructor(props) {
        super(props);
        this.localVid = React.createRef();

        this.state = {
            sfutest: null,
            room: 1234,
            id: '',
            privateId: '',
            username: '',
            opaqueId: `videoroomtest-${Janus.randomString(12)}`,
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
            succeess: (jsep) => {
                Janus.debug("Got published SDP!");
                Janus.debug(jsep);
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

    componentDidMount() {
        const that = this;

        Janus.init({
            debug: true,
            callback: () => {
                const janus = new Janus({
                    server: process.env.REACT_APP_JANUS_SERVER,
                    success: () => {
                        janus.attach({
                            plugin: 'janus.plugin.videoroom',
                            opaqueId: that.opaqueId,    
                            success: (pluginHandle) => {
                                that.updatePluginHandle(pluginHandle);
                            },
                            onmessage: (msg, jsep) => {
                                const event = msg['videoroom'];
                                if (event != undefined && event != null) {
                                    if (event === "joined") {
                                        that.updateId(msg['id']);
                                        that.updatePrivateId(msg['private_id']);
                                        that.publishOwnFeed(true);
                                    }
                                }
                            },
                            onlocalstream: (stream) => {
                                Janus.attachMediaStream(that.localVid.current, stream)
                            },
                        })
                    }                        
                })
            }  
        })
    }

    render() {
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
                    <VideoStream />
                    <VideoStream />
                    <VideoStream />
                    <VideoStream />
                    <VideoStream />
                </div>
            </div>
        )
    }
}