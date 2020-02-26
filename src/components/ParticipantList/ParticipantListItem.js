import React from 'react';

import { 
    ParticipantContainer,
    ParticipantName,
    ParticipantStatus,
} from './styles';

const ParticipantListItem = ({ participant, isActive }) => (
    <ParticipantContainer>
        <ParticipantStatus></ParticipantStatus>
        <ParticipantName isActive={isActive}>{participant.display}</ParticipantName>
    </ParticipantContainer>
);

export default ParticipantListItem;