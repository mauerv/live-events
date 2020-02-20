import React from 'react';

import VideoStream from '../VideoStream/VideoStream';

const StreamGrid = ({ localVid }) => (
    <VideoStream ref={localVid} />
);

export default StreamGrid;