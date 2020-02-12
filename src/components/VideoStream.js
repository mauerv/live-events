import React from 'react';

const VideoStream = () => (
    <div>
        <h2>Stream</h2>
        <video 
            autoPlay
            playsInline
            controls={false}    
        ></video>
    </div>
);

export default VideoStream;