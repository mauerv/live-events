import React from "react";

import LocalStream from "./LocalStream/LocalStream";
import RemoteStream from "./RemoteStream/RemoteStream";

import { StreamGridContainer } from "./styles";

const StreamGrid = ({ subscriptions, activeHandle, userStream }) => {
  return (
    <StreamGridContainer>
      <LocalStream activeHandle={activeHandle} userStream={userStream} />
      {subscriptions.map((s, i) => (
        <RemoteStream stream={s.stream} iceState={s.iceState} key={i} />
      ))}
    </StreamGridContainer>
  );
};

export default StreamGrid;
