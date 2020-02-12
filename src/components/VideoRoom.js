import React, { Component } from 'react';
import { Janus } from 'janus-gateway';

export default class VideoRoom extends Component {
    componentDidMount() {
        const that = this;
        const opaqueId = `videoroomtest-${Janus.randomString(12)}`;
        const myroom = 1234;
        let janus = null;
        let sfutest = null;
        let myusername = null;
        let myid = null;
        let mystream = null;
        let mypvtid = null;
        let feeds = [];
        let bitrateTimer = [];

        Janus.init({ 
            debug: "all",
            callback: () => {
                janus = new Janus({
                    server: "https://maurovelazquez.com:8089/janus",
                    success: () => {
                        janus.attach({
                            plugin: "janus.plugin.videoroom",
                            opaqueId: opaqueId,
                            success: (pluginHandle) => {
                                sfutest = pluginHandle;

                            },
                            error: (error) => {
                                console.log("Error attaching plugin...");
                            },

                        })
                    }
                });
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Video</h1>
                <div>
                    <input></input>
                    <button>Join the room</button>
                </div>
            </div>
        )
    }
}