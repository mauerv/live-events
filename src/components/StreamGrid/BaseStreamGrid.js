import React from "react";

import LocalStream from "./LocalStream/LocalStream";
import RemoteStream from "./RemoteStream/RemoteStream";

import { StreamGridContainer } from "./styles";

const StreamGrid = ({ subscriptions }) => {
  return (
    <StreamGridContainer>
      <LocalStream gridSize={subscriptions.length + 1} />
      {subscriptions.map((s, i) => (
        <RemoteStream
          stream={s.stream}
          webrtcState={s.webrtcState}
          key={i}
          gridSize={subscriptions.length + 1}
        />
      ))}
    </StreamGridContainer>
  );
};

export default StreamGrid;
