import React from 'react';

import ParticipantListItem from './ParticipantListItem';

const ParticipantList = ({ participants }) => (
    <div>
        {participants.map(participant => (
            <ParticipantListItem 
                key={participant.id}
                participant={participant}
            />
        ))}
    </div>
) 

export default ParticipantList