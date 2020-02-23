import React from 'react';

import { 
    StreamContainer,
    StreamVideo,
} from './styles'

const RemoteGridItem = React.forwardRef((props, ref) => (
    <StreamContainer>
        <StreamVideo 
            ref={ref}
            autoPlay
            playsInline
            controls={false} 
        ></StreamVideo>
    </StreamContainer>
));

export default RemoteGridItem;