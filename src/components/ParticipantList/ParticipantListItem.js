import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  ParticipantContainer,
  ParticipantName,
  ParticipantStatus
} from "./styles";

const ParticipantListItem = ({ participant, isActive, publishing }) => (
  <ParticipantContainer>
    {publishing === "publishing" && participant.isUser ? (
      <CircularProgress size={15}></CircularProgress>
    ) : (
      <ParticipantStatus></ParticipantStatus>
    )}
    <ParticipantName isActive={isActive}>{participant.display}</ParticipantName>
  </ParticipantContainer>
);

export default ParticipantListItem;
