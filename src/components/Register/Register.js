import React from 'react';

import SimpleForm from '../SimpleForm/SimpleForm';

import { 
    RegisterContainer,
    RegisterTitle, 
    RegisterPrompt,
} from './styles';

const Register = ({ 
    onChange, 
    onSubmit, 
    value,
    registering,
}) => (
    <RegisterContainer>
        <RegisterTitle>Welcome to Eventis</RegisterTitle>
        {registering ? <RegisterPrompt>Please wait while we set up...</RegisterPrompt> : null}
        <SimpleForm 
            onChange={onChange} 
            onSubmit={onSubmit} 
            value={value} 
            submitDisabled={registering}
        />
    </RegisterContainer>
)

export default Register;