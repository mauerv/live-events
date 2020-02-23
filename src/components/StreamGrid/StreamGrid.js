import React, { Component } from 'react';

import LocalStream from './LocalStream/LocalStream';
import RemoteStream from './RemoteStream/RemoteStream';

import { StreamGridContainer } from './styles';

class StreamGrid extends Component { 
    render() {   
        const { remoteStreams } = this.props;     
        return (
            <StreamGridContainer>
                <LocalStream />
                <RemoteStream stream={remoteStreams[0]} />
                <RemoteStream stream={remoteStreams[1]} />
                <RemoteStream stream={remoteStreams[2]} />
                <RemoteStream stream={remoteStreams[3]} />
                <RemoteStream stream={remoteStreams[4]} />
            </StreamGridContainer>
        );
    }
} 
export default StreamGrid;