import React from "react";
import styled from "styled-components";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export const StreamGridContainer = styled(({ children, ...rest }) => (
  <Grid item xs={12} sm={9}>
    <Grid container spacing={1} justify="center">
      {children}
    </Grid>
  </Grid>
))`
  justify-content: center;
`;

export const StreamOverlayContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: black;
  display: ${props => (props.isPublishing ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  opacity: 0.6;
`;

export const StreamOverlayText = styled(({ children, ...rest }) => (
  <Typography variant="h5" {...rest}>
    {children}
  </Typography>
))`
  color: white;
`;
