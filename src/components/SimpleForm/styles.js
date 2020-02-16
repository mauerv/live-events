import styled from 'styled-components';

export const SimpleFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const SimpleFormInput = styled.input`
    padding: 4px 20px;
    border-radius: 4px;
    margin-bottom: 10px;
    font-size: 1rem;
`

export const SimpleFormSubmit = styled.input`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 5px 15px;
    border-radius: 4px;
    background-color: #b86953;
    color: white;
    font-size: 1.1rem;
    border: none;
    width: 50%;
    &:hover {
        cursor: pointer;
    }
`