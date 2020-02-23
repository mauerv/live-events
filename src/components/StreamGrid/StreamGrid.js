import React, { Component } from 'react';
import { Janus } from 'janus-gateway';

import LocalStream from './LocalStream/LocalStream';
import RemoteGridItem from './RemoteGridItem';

import { StreamGridContainer } from './styles';

class StreamGrid extends Component { 
    constructor(props) {
        super(props);
        this.remoteStream_0 = React.createRef();
        this.remoteStream_1 = React.createRef();
        this.remoteStream_2 = React.createRef();
        this.remoteStream_3 = React.createRef();
        this.remoteStream_4 = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        const { remoteStreams } = this.props;   
        if (remoteStreams.length !== 0) {
            remoteStreams.forEach((stream, i) => {
                Janus.attachMediaStream(this[`remoteStream_${i}`].current, stream);
            });
        }
    }

    render() {   
        const {  remoteStreams } = this.props;     
        return (
            <StreamGridContainer>
                <LocalStream />
                {remoteStreams[0] ? <RemoteGridItem videoRef={this.remoteStream_0} /> : null}
                {remoteStreams[1] ? <RemoteGridItem videoRef={this.remoteStream_1} /> : null}
                {remoteStreams[2] ? <RemoteGridItem videoRef={this.remoteStream_2} /> : null}
                {remoteStreams[3] ? <RemoteGridItem videoRef={this.remoteStream_3} /> : null}
                {remoteStreams[4] ? <RemoteGridItem videoRef={this.remoteStream_4} /> : null}
            </StreamGridContainer>
        );
    }
} 
export default StreamGrid;