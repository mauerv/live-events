import React, { Component } from 'react';

import SimpleForm from '../SimpleForm/SimpleForm';

import { 
    RegisterContainer,
    RegisterTitle, 
    RegisterPrompt,
    RegisterDescription,
} from './styles';

class Register extends Component { 
    render () {
        const { user } = this.props;
        return (
            <RegisterContainer>
                <RegisterTitle>Welcome to Eventis</RegisterTitle>
                <RegisterDescription>
                    Welcome to an experiment on digital events. Please input a nickname to use at the rooms.
                </RegisterDescription>
                {user.registered === 'registering' ? <RegisterPrompt>Please wait while we set up...</RegisterPrompt> : null}
                <SimpleForm 
                    onChange={this.handleChange} 
                    onSubmit={this.handleSubmit} 
                    value={user.username} 
                    submitDisabled={user.registered === 'registering'}
                />
            </RegisterContainer>
        );
    }

    handleChange = e => this.props.onSetUsername(e.target.value);

    handleSubmit = e => {
        e.preventDefault();
        const { 
            user,
            onSetRegisteredStatus,
            initializeApp, 
        } = this.props;

		if (user.registered !== false) return;
		if (user.username.length === 0) return;

		onSetRegisteredStatus("registering");
		initializeApp();
	}
}

export default Register;