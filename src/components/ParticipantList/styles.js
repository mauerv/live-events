import React from "react";
import styled from "styled-components";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

export const ParticipantListContainer = styled.div``;

export const ParticipantContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px auto;
`;

export const ParticipantName = styled(({ isActive, children, ...rest }) => (
  <Typography {...rest}>{children}</Typography>
))`
  font-weight: ${props => (props.isActive ? 400 : 200)};
  margin-left: 5px;
  line-height: 1;
`;

export const ParticipantStatus = styled.div`
  border-radius: 50%;
  background-color: ${props => props.theme.palette.success.main};
  width: 15px;
  height: 15px;
  z-index: 1000;
`;

export const ParticipantLoading = styled(CircularProgress)`
  width: 15px;
  height: 15px;
`;
