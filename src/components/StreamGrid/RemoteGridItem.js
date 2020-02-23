import React, { Component } from 'react';

import { 
    StreamContainer,
    StreamVideo,
} from './styles'

class RemoteGridItem extends Component {
    render() {
        return (
            <StreamContainer>
                <StreamVideo 
                    ref={this.props.videoRef}
                    autoPlay
                    playsInline
                    controls={false} 
                />
            </StreamContainer>
        )
    }
}

export default RemoteGridItem;