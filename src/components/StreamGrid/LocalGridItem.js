import React from 'react';

import { 
    StreamContainer,
    StreamVideo,
} from './styles'

const LocalGridItem = React.forwardRef((props, ref) => (
    <StreamContainer>
        <StreamVideo 
            ref={ref}
            autoPlay
            playsInline
            controls={false} 
            muted={props.isMuted}
        ></StreamVideo>
        <button onClick={props.toggleAudio}>{props.publishAudio ? "Mute" : "Unmute"}</button>
        <button onClick={props.toggleVideo}>{props.publishVideo ? "Video Off" : "Video On"}</button>
    </StreamContainer>
));

export default LocalGridItem;