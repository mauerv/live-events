import React from 'react';

import SimpleForm from '../SimpleForm/SimpleForm';

import { 
    RegisterContainer,
    RegisterTitle, 
} from './styles';

const Register = ({ 
    onChange, 
    onSubmit, 
    value,
    submitDisabled,
}) => (
    <RegisterContainer>
        <RegisterTitle>Welcome to Eventis</RegisterTitle>
        <SimpleForm 
            onChange={onChange} 
            onSubmit={onSubmit} 
            value={value} 
            submitDisabled={submitDisabled}
        />
    </RegisterContainer>
)

export default Register;