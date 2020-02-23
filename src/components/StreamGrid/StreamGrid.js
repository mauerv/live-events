import React, { Component } from 'react';
import { Janus } from 'janus-gateway';

import LocalGridItem from './LocalGridItem';
import RemoteGridItem from './RemoteGridItem';

import { StreamGridContainer } from './styles';

class StreamGrid extends Component { 
    constructor(props) {
        super(props);
        this.userVid = React.createRef();
        this.remoteStream_0 = React.createRef();
        this.remoteStream_1 = React.createRef();
        this.remoteStream_2 = React.createRef();
        this.remoteStream_3 = React.createRef();
        this.remoteStream_4 = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        const { userStream, remoteStreams } = this.props;   
        if (userStream !== null) {
            Janus.attachMediaStream(this.userVid.current, userStream);
        }
        if (remoteStreams.length !== 0) {
            remoteStreams.forEach((stream, i) => {
                Janus.attachMediaStream(this[`remoteStream_${i}`].current, stream);
            });
        }
    }

    render() {   
        const { 
            userStream, 
            remoteStreams, 
            toggleAudio,
            toggleVideo,
            publishAudio,
            publishVideo, 
        } = this.props;     
        return (
            <StreamGridContainer>
                {userStream ? (
                    <LocalGridItem 
                        ref={this.userVid} 
                        isMuted={"muted"}
                        toggleAudio={toggleAudio}
                        toggleVideo={toggleVideo}
                        publishAudio={publishAudio}
                        publishVideo={publishVideo}
                    />
                ) : null}
                {remoteStreams[0] ? <RemoteGridItem ref={this.remoteStream_0} /> : null}
                {remoteStreams[1] ? <RemoteGridItem ref={this.remoteStream_1} /> : null}
                {remoteStreams[2] ? <RemoteGridItem ref={this.remoteStream_2} /> : null}
                {remoteStreams[3] ? <RemoteGridItem ref={this.remoteStream_3} /> : null}
                {remoteStreams[4] ? <RemoteGridItem ref={this.remoteStream_4} /> : null}
            </StreamGridContainer>
        );
    }
} 
export default StreamGrid;