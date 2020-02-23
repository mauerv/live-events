import React, { PureComponent } from 'react';
import { Janus } from 'janus-gateway';

import { 
    StreamContainer,
    StreamVideo,
} from './styles'

class RemoteGridItem extends PureComponent {
    vidRef = React.createRef();

    componentDidUpdate(prevProps, prevState) {        
        const { stream } = this.props;
        if (stream !== undefined) Janus.attachMediaStream(this.vidRef.current, stream);
    }

    render() {
        return (
            <div>
                {this.props.stream !== undefined ? (
                    <StreamContainer>
                        <StreamVideo 
                            ref={this.vidRef}
                            autoPlay
                            playsInline
                            controls={false} 
                        />
                    </StreamContainer>
                ) : null}
            </div>
        )
    }
}

export default RemoteGridItem;