import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Typography,
  ListItemIcon,
} from '@mui/material';
import { Dashboard as DashboardIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface IDashboardProps extends PropsWithChildren {}

const DashboardContainerStyled = styled.div`
  height: 100vh;
  background: #f2f2f2;
`;

const SidebarStyled = styled.aside`
  background: #4b6584;
  width: 250px;
  padding-top: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 20;
  color: #fff;
`;

const MainStyled = styled.main`
  overflow-y: auto;
  padding: 1rem;
  padding-left: 265px;
`;

const SidebarMenuStyled = styled(MenuList)`
  padding-top: 1rem;
`;

export default function Dashboard({ children }: IDashboardProps) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    const c = window.confirm('Are you sure you want to logout?');
    if (c) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  return (
    <DashboardContainerStyled>
      <SidebarStyled>
        <Box>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="subtitle1">Binar Car Rental</Typography>
          </Box>
          <Divider />
          <SidebarMenuStyled>
            <MenuItem onClick={() => navigate('/')}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <Typography variant="inherit">Dashboard</Typography>
            </MenuItem>
          </SidebarMenuStyled>
          <Divider />
          <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
            <MenuList>
              <Divider />
              <MenuItem sx={{ py: 1 }} onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon sx={{ color: '#fff' }} />
                </ListItemIcon>
                <Typography variant="inherit">Logout</Typography>
              </MenuItem>
            </MenuList>
          </Box>
        </Box>
      </SidebarStyled>
      <MainStyled>{children}</MainStyled>
    </DashboardContainerStyled>
  );
}
