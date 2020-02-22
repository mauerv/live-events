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
            type="text"
            value={value}
            onChange={onChange}
            autoFocus
        />
        <SimpleFormSubmit type="submit" value="Join" disabled={submitDisabled} />
    </SimpleFormContainer>
);

export default SimpleForm;
