import React, { PureComponent } from "react";
import { Janus } from "janus-gateway";

import StreamOverlay from "components/StreamGrid/StreamOverlay";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";
import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";

import {
  StreamContainer,
  StreamVideo,
  StreamControls,
  DynamicHeight
} from "./styles";

class LocalGridItem extends PureComponent {
  vidRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    const { userStream } = this.props;
    if (userStream !== null)
      Janus.attachMediaStream(this.vidRef.current, userStream);
  }

  render() {
    const { user } = this.props;

    return (
      <StreamContainer>
        <DynamicHeight>
          <StreamVideo
            ref={this.vidRef}
            autoPlay
            playsInline
            controls={false}
            muted="muted"
            objSrc={null}
          ></StreamVideo>
          <StreamOverlay
            isPublishing={user.published === "publishing"}
            text="Joining..."
          />
          <StreamControls>
            {user.publishAudio ? (
              <Mic onClick={this.toggleAudio} fontSize="large" color="error" />
            ) : (
              <MicOff
                onClick={this.toggleAudio}
                fontSize="large"
                color="error"
              />
            )}
            {user.publishVideo ? (
              <Videocam
                onClick={this.toggleVideo}
                fontSize="large"
                color="error"
              />
            ) : (
              <VideocamOff
                onClick={this.toggleVideo}
                fontSize="large"
                color="error"
              />
            )}
          </StreamControls>
        </DynamicHeight>
      </StreamContainer>
    );
  }

  toggleAudio = () => {
    const { activeHandle, onToggleAudio } = this.props;
    if (activeHandle.isAudioMuted()) activeHandle.unmuteAudio();
    else activeHandle.muteAudio();
    onToggleAudio();
  };

  toggleVideo = () => {
    const { activeHandle, onToggleVideo } = this.props;
    if (activeHandle.isVideoMuted()) activeHandle.unmuteVideo();
    else activeHandle.muteVideo();
    onToggleVideo();
  };
}

export default LocalGridItem;
