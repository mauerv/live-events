import React from 'react';

import SimpleForm from '../SimpleForm/SimpleForm';

import { 
    RegisterContainer,
    RegisterTitle, 
} from './styles';

const Register = ({ onChange, onSubmit, value }) => (
    <RegisterContainer>
        <RegisterTitle>Welcome to Eventis</RegisterTitle>
        <SimpleForm 
            onChange={onChange} 
            onSubmit={onSubmit} 
            value={value} 
        />
    </RegisterContainer>
)

export default Register;