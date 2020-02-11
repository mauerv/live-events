import React, { Component } from 'react';
import { Janus } from 'janus-gateway';

class Echo extends Component {
    constructor(props) {
        super(props);
        this.localVid = React.createRef();
        this.remoteVid = React.createRef();
    }

    componentDidMount() {
        let echotest = null;
        let janus = null;
        let that = this;
        Janus.init({
            debug: "all",
            dependencies: Janus.useDefaultDependencies(),
            callback: () => {
                janus = new Janus({
                    server: "https://maurovelazquez.com:8089/janus",
                    success: () => {
                        janus.attach({
                            plugin: "janus.plugin.echotest",
                            success: (pluginHandle) => {                                
                                echotest = pluginHandle;
                                let body = { "audio": true, "video": true };
                                Janus.debug("Sending message (" + JSON.stringify(body) + ")");
                                echotest.send({ "message": body });
                                echotest.createOffer({
                                    success: (jsep) => {
                                        echotest.send({ "message": body, "jsep": jsep });
                                    },
                                    error: (error) => {
                                        Janus.error("WebRTC error:", error);
                                    }          
                                })
                            },
                            onmessage: (msg, jsep) => {
                                if(jsep !== undefined && jsep !== null) {
                                    echotest.handleRemoteJsep({jsep: jsep});
                                }
                            },
                            onlocalstream: (stream) => {
                                Janus.attachMediaStream(that.localVid.current, stream)
                            },
                            onremotestream: (stream) => {
                                Janus.attachMediaStream(that.remoteVid.current, stream)
                            }
                        })
                    }
                })
            }          
        });
    }

    render() {
        return (
            <div>
                <h1>Echo</h1>
                <div>
                    <h3>Local</h3>
                    <video 
                        ref={this.localVid}
                        autoPlay
                        playsInline
                        controls={false}
                    ></video>
                </div>
                <div>
                    <h3>Remote</h3>
                    <video 
                        ref={this.remoteVid}
                        autoPlay 
                        playsInline 
                        controls={false}
                    ></video>
                </div>
            </div>
        )
    }
}

export default Echo;
