import { Box, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { Outlet } from "react-router-dom";
import FirebaseApp from '../firebase/FirebaseApp';
import SpaceAppBar from '../menu/SpaceAppBar';
import UserContextProvider from '../user/UserContextProvider';

const Layout = () => {
  return (
    <div className="App">
      <FirebaseApp>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* <AuthWrapper> */}
        <UserContextProvider>
          <div>
            <SpaceAppBar />
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
