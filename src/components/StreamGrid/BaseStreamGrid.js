import React from "react";

import LocalStream from "./LocalStream/LocalStream";
import RemoteStream from "./RemoteStream/RemoteStream";

import { StreamGridContainer } from "./styles";

const StreamGrid = ({ subscriptions, activeHandle }) => {
  return (
    <StreamGridContainer>
      <LocalStream activeHandle={activeHandle} />
      {subscriptions.map((s, i) => (
        <RemoteStream stream={s.stream} iceState={s.iceState} key={i} />
      ))}
    </StreamGridContainer>
  );
};

export default StreamGrid;
