import React from "react";
import styled from "styled-components";

import Grid from "@material-ui/core/Grid";

export const StreamContainer = styled(({ children, ...rest }) => (
  <Grid item xs={6} sm={5} {...rest}>
    {children}
  </Grid>
))``;

export const DynamicHeight = styled.div`
  width: 100%;
  padding-bottom: 75%;
  position: relative;
`;

export const StreamVideo = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: fill;
  transform: scalex(-1);
`;
