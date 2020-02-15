import React from 'react';

import { 
    SimpleFormContainer,
    SimpleFormTitle,
    SimpleFormForm,
    SimpleFormInput,
    SimpleFormSubmit,
} from './styles';

const SimpleForm = ({ value, onChange, onSubmit }) => (
    <SimpleFormContainer>
        <SimpleFormTitle>App</SimpleFormTitle>
        <SimpleFormForm onSubmit={onSubmit}>
        <SimpleFormInput
            type="text"
            value={value}
            onChange={onChange}
        />
        <SimpleFormSubmit type="submit" value="Join" />
        </SimpleFormForm>
    </SimpleFormContainer>
);

export default SimpleForm;
