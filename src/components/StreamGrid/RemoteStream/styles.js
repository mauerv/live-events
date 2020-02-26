import React from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

export const StreamContainer = styled(({ children, ...rest }) => (
    <Grid item md={4} xs={6} {...rest}>{children}</Grid>
))``

export const StreamVideo = styled.video `
    width: 100%;
`