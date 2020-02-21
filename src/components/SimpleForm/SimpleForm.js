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
}) => (
    <SimpleFormContainer onSubmit={onSubmit}>
        <SimpleFormInput
            type="text"
            value={value}
            onChange={onChange}
        />
        <SimpleFormSubmit type="submit" value="Join" />
    </SimpleFormContainer>
);

export default SimpleForm;
