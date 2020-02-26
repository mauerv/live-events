import React from 'react';

import { 
    SimpleFormContainer,
    SimpleFormInput,
    SimpleFormSubmit,
} from './styles';

const SimpleForm = ({ 
    value, 
    onChange, 
    onSubmit, 
    submitDisabled,
}) => (
    <SimpleFormContainer onSubmit={onSubmit}>
        <SimpleFormInput
            id="testing"
            type="text"
            value={value}
            onChange={onChange}
            autoFocus
        />
        <SimpleFormSubmit disabled={submitDisabled} type="submit" >
            Join
        </SimpleFormSubmit>
        
    </SimpleFormContainer>
);

export default SimpleForm;
