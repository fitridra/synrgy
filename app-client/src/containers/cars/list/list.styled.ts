import { styled } from '@mui/material';

export const HeaderElementStyled = styled('div')`
  display: grid;
  grid-template-columns: 1fr auto; 
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem; 
`;

export const SearchContainer = styled('div')`
  display: flex;
  gap: 1rem;
  align-items: center;

  & input {
    width: 300px; 
    border: 2px solid #1976D2;
    padding: 0.5rem;
    border-radius: 0.2rem;
    transition: border-color 0.3s ease;
    font-size: 14px;  

    &:focus {
      border-color: #1565c0;
    }
  }

  & button {
    background-color: #1976D2;
    color: #ffffff;
    transition: background-color 0.3s ease, color 0.3s ease;
    font-size: 14px;  

    &:hover {
      background-color: #1565c0;
    }
  }

  & .search-icon {
    position: absolute;
    right: 217px;
    top: 15%;
    color: #1976D2;
    cursor: pointer;
  }
`;

export const CreateButtonContainer = styled('div')`
  & button {
    background-color: #1976D2;
    color: #ffffff;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: #1565c0;
    }
  }
`;
