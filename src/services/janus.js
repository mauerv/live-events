import { Janus } from 'janus-gateway';

import iceServers from '../constants/iceServers';

export const janusInit = callback => {
    Janus.init({
        debug: false,
        callback: () => {
        if(!Janus.isWebrtcSupported()){ return alert("Your browser doesn't support WebRTC."); }
    
        const janus = new Janus({
            server: process.env.REACT_APP_JANUS_SERVER,
            iceServers: iceServers,
            success: () => callback(janus),
            error: onJanusError,
            destroyed: onJanusDestroy,
        });
        }
    });
}

export const onJanusError = error => {
    Janus.error("Couldn't initialize janus...", error);
    alert("Couldn't initialize janus... " + error);
    window.location.reload();
} 

export const onJanusDestroy = () => window.location.reload();

export const registerInRoom = (room, display, handle) => {
    const register = {
        "request": "join",
        "room": room,
        "ptype": "publisher",
        "display": display
    };
    handle.send({ "message": register });
}

export const subscribeToPublisher = (room, id, videoCodec, handle) => {
    const subscribe = {
        "request": "join",
        "room": room,
        "ptype": "subscriber",
        "feed": id,
    };
    handle.videoCodec = videoCodec;
    handle.send({ "message": subscribe });
}

export const publish = (handle, useAudio) => {
    handle.createOffer({
        media: { 
            audioRecv: false, audioSend: useAudio,
            videoRecv: false, videoSend: true,
        },
        success: jsep => {        
            const publish = {
                "request": "publish",
                "audio": useAudio,
                "video": true,
            };
            handle.send({ "message": publish, "jsep": jsep });
        },
        error: error => {
            Janus.error("WebRTC publish error:", error);
            if (useAudio) {
                publish(false);
            }
        }
    })
}

export const unpublish = handle => handle.send({ "message": { "request": "unpublish" }});
