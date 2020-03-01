import React from "react";
import styled from "styled-components";

import Grid from "@material-ui/core/Grid";

export const AppContainer = styled(({ children, ...rest }) => (
  <Grid container {...rest}>
    {children}
  </Grid>
))`
  height: 100vh;
  padding: 10px 24px;
`;

export const AppGrid = styled(Grid)``;
