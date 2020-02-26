import React from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

export const RegisterContainer = styled(({ children, ...rest }) => (
    <Grid item xs={12} {...rest}>
        {children}
    </Grid>
))`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const RegisterTitle = styled(({ children, ...rest }) => (
    <Box color="primary.light">
        <Typography variant="h1" {...rest}>{ children }</Typography>
    </Box>
))`
`

export const RegisterPrompt = styled(({ children, ...rest }) => (
    <Box color="primary.dark">
        <Typography {...rest}>{ children }</Typography>
    </Box>
))`
    margin-bottom: 10px;
`

export const RegisterDescription = styled(Typography)`
    margin: 10px;
`