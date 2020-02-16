import React from 'react';

import { 
    ParticipantContainer,
    ParticipantName,
    ParticipantStatus,
} from './styles';

const ParticipantListItem = ({ participant }) => (
    <ParticipantContainer>
        <ParticipantStatus></ParticipantStatus>
        <ParticipantName>{participant.display}</ParticipantName>
    </ParticipantContainer>
);

export default ParticipantListItem;