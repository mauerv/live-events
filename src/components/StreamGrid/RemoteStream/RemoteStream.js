import React, { PureComponent } from 'react';
import { Janus } from 'janus-gateway';

import { 
    StreamContainer,
    StreamVideo,
} from './styles'

class RemoteStream extends PureComponent {
    vidRef = React.createRef();

    componentDidUpdate(prevProps, prevState) {  
        const { stream } = this.props;
        if (stream !== null) Janus.attachMediaStream(this.vidRef.current, stream);
    }

    render() {
        const { stream, iceState } = this.props;
        return (
            <div>
                {stream !== null ? (
                    <div>
                        {iceState === "connected" ? (
                            <StreamContainer>
                                <StreamVideo 
                                    ref={this.vidRef}
                                    autoPlay
                                    playsInline
                                    controls={false} 
                                />
                            </StreamContainer>
                        ) : (
                            <div>Joining...</div>
                        )}
                    </div>
                ) : null}
            </div>
        )
    }
}

export default RemoteStream;