import React from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

export const StreamContainer = styled(({ children, ...rest }) => (
    <Grid item md={4} xs={6} {...rest}>{children}</Grid>
))`
    position: relative;
    height: 100%;
`

export const StreamVideo = styled.video `
    height: calc(width * 3 / 4);
    width: 100%;
    object-fit: fill;
`