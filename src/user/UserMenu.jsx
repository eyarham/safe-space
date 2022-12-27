import { Avatar, Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../user/UserContextProvider';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UserMenu = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  const auth = getAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [userInitial, setUserInitial] = useState(null);

  const [loggedInUser, setLoggedInUser] = useState();
  const [settingLinks, setSettingLinks] = useState([]);


  useEffect(() => {
    if (loggedInUser) {
      setSettingLinks([{ text: 'Account', value: 'account' }, { text: 'Logout', value: 'logout' }])
    }
    else {
      setSettingLinks([{ text: 'Login', value: 'login' }])
    }
  }, [loggedInUser])
  useEffect(() => {
    setLoggedInUser(user);
    if (user && user.email) {
      setUserInitial(user.email.charAt(0))
    }
  }, [user])
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //const uid = user.uid;
        setLoggedInUser(user);
        setUserInitial(user.email.charAt(0))
        // ...
      } else {
        // User is signed out
        // ...
        setLoggedInUser(null);
      }
    });
  }, [auth])


  const navigateToSelected = (destination, isExternal) => {
    if (isExternal) { window.open(destination, '_blank') }
    else {
      navigate('/' + destination);
    }
  }


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar>{userInitial}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {loggedInUser &&
          <MenuItem>{loggedInUser.email}</MenuItem>
        }
        <Divider />
        {settingLinks.map((setting) => (
          <MenuItem key={setting.value} onClick={() => navigateToSelected(setting.value, setting.isExternal)}>
            <Typography textAlign="center">{setting.text}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default UserMenu