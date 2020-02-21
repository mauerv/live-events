import { Janus } from 'janus-gateway';

export const onJanusError = error => {
    Janus.error("Couldn't initialize janus...", error);
    alert("Couldn't initialize janus... " + error);
    window.location.reload();
} 

export const onJanusDestroy = () => {
    window.location.reload();
}

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