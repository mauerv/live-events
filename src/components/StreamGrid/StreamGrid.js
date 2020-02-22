import React, { Component } from 'react';
import { Janus } from 'janus-gateway';

import StreamGridItem from './StreamGridItem';

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
        const { userStream, remoteStreams } = this.props;     
        return (
            <StreamGridContainer>
                {userStream ? <StreamGridItem ref={this.userVid} isMuted={"muted"}/> : null}
                {remoteStreams[0] ? <StreamGridItem ref={this.remoteStream_0} /> : null}
                {remoteStreams[1] ? <StreamGridItem ref={this.remoteStream_1} /> : null}
                {remoteStreams[2] ? <StreamGridItem ref={this.remoteStream_2} /> : null}
                {remoteStreams[3] ? <StreamGridItem ref={this.remoteStream_3} /> : null}
                {remoteStreams[4] ? <StreamGridItem ref={this.remoteStream_4} /> : null}
            </StreamGridContainer>
        );
    }
} 
export default StreamGrid;