import { styled, Switch as MuiSwitch, CircularProgress } from '@mui/material';

export const VisuallyHiddenInput = styled('input')`
  display: none;
`;

export const PreviewImage = styled('img')`
  width: 100%;
  object-fit: photo;
  border-radius: 8px;
  margin-top: 16px;
`;

export const PublishSwitch = styled(MuiSwitch)`
  .MuiSwitch-thumb {
    background-color: #1976D2;
  }
  .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
    background-color: #1976D2;
  }
`;

export const StyledCircularProgress = styled(CircularProgress)`
  color: #4CAF50;
`;

export const StyledButtonContainer = styled('div')`
  margin-top: 16px;
  display: flex;
  align-items: center;
`;

export const StyledButtonLabel = styled('span')`
  margin-left: 8px;
`;
