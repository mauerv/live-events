import React from 'react';

import ParticipantListItem from './ParticipantListItem';

import { ParticipantListContainer } from './styles';

const ParticipantList = ({ participants, isActive }) => (
    <ParticipantListContainer>
        {participants.map(participant => (
            <ParticipantListItem 
                key={participant.id}
                participant={participant}
                isActive={isActive}
            />
        ))}
    </ParticipantListContainer>
) 

export default ParticipantList