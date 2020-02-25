import React, { PureComponent } from 'react';
import { Janus } from 'janus-gateway';

import { 
    StreamContainer,
    StreamVideo,
} from './styles'

class LocalGridItem extends PureComponent {
    vidRef = React.createRef();

    componentDidUpdate(prevProps, prevState) {
        const { stream } = this.props.user;
        if (stream !== null) Janus.attachMediaStream(this.vidRef.current, stream);
    }

    render() {
        const { user } = this.props;

        return (
            <StreamContainer>
                {user.published === "publishing" ? (
                    <div>
                        ...Loading
                    </div>
                ) : (
                    <div>
                        <StreamVideo 
                            ref={this.vidRef}
                            autoPlay
                            playsInline
                            controls={false} 
                            muted="muted"
                        ></StreamVideo>
                        <button onClick={this.toggleAudio}>
                            {user.publishAudio ? "Mute" : "Unmute"}
                        </button>
                        <button onClick={this.toggleVideo}>
                            {user.publishVideo ? "Video Off" : "Video On"}
                        </button>
                    </div>  
                )}
            </StreamContainer>
        );
    }

    toggleAudio = () => {	
		const { handle, onToggleAudio } = this.props;
		if(handle.isAudioMuted())
			handle.unmuteAudio();
		else
			handle.muteAudio();
		onToggleAudio();
	}

	toggleVideo = () => {	
		const { handle, onToggleVideo } = this.props;
		if(handle.isVideoMuted())
			handle.unmuteVideo();
		else
			handle.muteVideo();
		onToggleVideo();
	}
}

export default LocalGridItem;