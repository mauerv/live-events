import React, { Component } from 'react';

import ParticipantListItem from './ParticipantListItem';

class ParticipantList extends Component {
    render() {
        const { participants } = this.props;

        return (
            <div>
                {participants.map(participant => (
                    <ParticipantListItem 
                        key={participant.id}
                        participant={participant}
                    />
                ))}
            </div>
        );
    }
} 

export default ParticipantList;