import styled from 'styled-components';

export const RoomListContainer = styled.div`
    background-color: #fedea3;
    width: 20%;
`

export const RoomListTitle = styled.h1`
    margin: 0;
    font-size: 1.3rem;
    background-color: #b86953;
    padding: 10px 10px;
    color: white;
`

export const RoomContainer = styled.div`
    border: 1px #b86953 solid;
    background-color: ${props => props.isActive ? "#f19f69" : "auto"};
    padding: 15px;
    &:hover {
        cursor: pointer;
    }
`

export const RoomTitle = styled.p`
    font-size: 1.1rem;
    margin: 0;
`