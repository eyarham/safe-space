import { Box, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { Outlet } from "react-router-dom";
import FirebaseApp from '../firebase/FirebaseApp';
import UserContextProvider from '../user/UserContextProvider';
import MenuAppBar from './MenuAppBar';

const Layout = () => {
  return (
    <div className="App">
      <FirebaseApp>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* <AuthWrapper> */}
        <UserContextProvider>
          <div>
            <MenuAppBar />
            {/* <MainMenu /> */}
            <Container>
              <Box>
                <Outlet />
              </Box>
            </Container>
          </div>
        </UserContextProvider>
        {/* </AuthWrapper> */}
      </FirebaseApp>
    </div>
  )
}

export default Layout
