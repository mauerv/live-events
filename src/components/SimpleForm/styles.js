import React from "react";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const SimpleFormContainer = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SimpleFormInput = styled(({ ...rest }) => (
  <TextField margin="normal" fullWidth label="Nickname" {...rest} />
))`
  margin: 0 10px 10px 0;
`;

export const SimpleFormSubmit = styled(({ children, ...rest }) => (
  <Button {...rest} variant="contained" color="primary">
    {children}
  </Button>
))``;
