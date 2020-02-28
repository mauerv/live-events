import React, { PureComponent } from 'react';
import { Janus } from 'janus-gateway';

import { 
    StreamContainer,
    StreamVideo,
    DynamicHeight,
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
            <StreamContainer>
                <DynamicHeight>
                    {stream !== null ? (
                        <div>
                            <StreamVideo 
                                ref={this.vidRef}
                                autoPlay
                                playsInline
                                controls={false} 
                            />
                        </div>
                    ) : null}
                </DynamicHeight>
            </StreamContainer>
        )
    }
}

export default RemoteStream;