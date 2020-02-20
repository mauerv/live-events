import React from 'react';

import VideoStream from '../VideoStream/VideoStream';

const StreamGrid = ({ localVid, vid_1234 }) => (
    <div>
        <VideoStream ref={localVid} />
        <VideoStream ref={vid_1234} />
    </div>
);

export default StreamGrid;