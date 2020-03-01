import React, { Component } from 'react';

import SimpleForm from 'components/SimpleForm/SimpleForm';

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
                <RegisterTitle>Welcome to Events</RegisterTitle>
                <RegisterDescription>
                    An experiment in digital events. Please input a nickname to use at the rooms.
                </RegisterDescription>
                <SimpleForm 
                    onChange={this.handleChange} 
                    onSubmit={this.handleSubmit} 
                    value={user.username} 
                    submitDisabled={user.registered === 'registering'}
                />
                {user.registered === 'registering' ? <RegisterPrompt>Please wait while we set up...</RegisterPrompt> : null}
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