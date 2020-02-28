import React, { PureComponent } from 'react';
import { Janus } from 'janus-gateway';

import StreamOverlay from '../StreamOverlay';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';

import { 
    StreamContainer,
    StreamVideo,
    StreamControls,
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
                <StreamVideo 
                    ref={this.vidRef}
                    autoPlay
                    playsInline
                    controls={false} 
                    muted="muted"
                    objSrc={null}
                ></StreamVideo>
                <StreamOverlay isPublishing={user.published === "publishing"} text="Joining..." />
                <StreamControls>
                    {user.publishAudio ? (
                        <Mic onClick={this.toggleAudio} fontSize="large" color="error"/>
                    ) : (
                        <MicOff onClick={this.toggleAudio} fontSize="large" color="error"/>
                    )}
                    {user.publishVideo ? (
                        <Videocam onClick={this.toggleVideo} fontSize="large" color="error"/>
                    ) : (
                        <VideocamOff onClick={this.toggleVideo} fontSize="large" color="error" />
                    )}
                </StreamControls>
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