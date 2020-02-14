import React from 'react';

const VideoStream = React.forwardRef((props, ref) => (
    <div>
        <h2>Stream</h2>
        <video 
            ref={ref}
            autoPlay
            playsInline
            controls={false}    
        ></video>
    </div>
));

export default VideoStream;