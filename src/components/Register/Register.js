import React from 'react';

import SimpleForm from '../SimpleForm/SimpleForm';

import { 
    RegisterContainer,
    RegisterTitle, 
    RegisterPrompt,
    RegisterDescription,
} from './styles';

const Register = ({ 
    onChange, 
    onSubmit, 
    value,
    registering,
}) => (
    <RegisterContainer>
        <RegisterTitle>Welcome to Eventis</RegisterTitle>
        <RegisterDescription>
            Welcome to an experiment on digital events. Please input a nickname to use at the rooms.
        </RegisterDescription>
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