import React, { PureComponent } from "react";
import { Janus } from "janus-gateway";

import StreamOverlay from "../StreamOverlay";

import { StreamContainer, StreamVideo, DynamicHeight } from "./styles";

class RemoteStream extends PureComponent {
  vidRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    const { stream } = this.props;
    if (stream !== null) Janus.attachMediaStream(this.vidRef.current, stream);
  }

  render() {
    const { stream, webrtcState } = this.props;

    return (
      <StreamContainer>
        <DynamicHeight>
          {stream !== null ? (
            <div>
              <StreamOverlay isPublishing={webrtcState} text="Joining..." />
              <StreamVideo
                ref={this.vidRef}
                autoPlay
                playsInline
                controls={false}
              />
            </div>
          ) : null}
        </DynamicHeight>
      </StreamContainer>
    );
  }
}

export default RemoteStream;
