import React from "react";

import ParticipantListItem from "./ParticipantListItem";

import { ParticipantListContainer } from "./styles";

const ParticipantList = ({ participants, isActive, publishing }) => (
  <ParticipantListContainer>
    {participants.map(participant => (
      <ParticipantListItem
        key={participant.id}
        participant={participant}
        isActive={isActive}
        publishing={publishing}
      />
    ))}
  </ParticipantListContainer>
);

export default ParticipantList;
