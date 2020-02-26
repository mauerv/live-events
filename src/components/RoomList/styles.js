import React from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

export const RoomListContainer = styled(({ children, ...rest }) => (
    <Grid item xs={12} sm={3} md={2}>
        {children}
    </Grid>
))``

export const RoomListTitle = styled(({ ...rest }) => (
    <Typography {...rest} variant="h4" color="primary" />
))``

export const RoomContainer = styled.div`
    margin: 15px auto;
    background-color: ${props => props.isActive ? "auto" : "auto"};
    opacity: ${props => props.publishing === true && !props.isActive ? "0.3" : "auto"};
    &:hover {
        cursor: pointer;
    }
`

export const RoomTitle = styled(({isActive, ...rest }) => {
    return isActive ? (
        <Typography {...rest} variant="h5" />
    ) : (
        <Typography {...rest}  />
    )
    
})`
    color: ${props => props.isActive ? props.theme.palette.primary.dark : props.theme.palette.primary.light};
`
