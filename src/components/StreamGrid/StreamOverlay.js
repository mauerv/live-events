import React from 'react';

import { 
    StreamOverlayContainer,
    StreamOverlayText,
} from './styles';

const StreamOverlay = ({ isPublishing, text }) => (
    <StreamOverlayContainer isPublishing={isPublishing}>
        <StreamOverlayText>{text}</StreamOverlayText>
    </StreamOverlayContainer>
);

export default StreamOverlay;
