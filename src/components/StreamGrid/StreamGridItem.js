import React from 'react';

import { 
    StreamContainer,
    StreamVideo,
} from './styles'

const StreamGridItem = React.forwardRef((props, ref) => (
    <StreamContainer>
        <StreamVideo 
            ref={ref}
            autoPlay
            playsInline
            controls={false} 
            muted={props.isMuted}
        ></StreamVideo>
    </StreamContainer>
));

export default StreamGridItem;