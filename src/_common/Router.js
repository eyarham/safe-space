import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPanel from '../auth/LogInPanel';
import Logout from '../auth/Logout';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import Moderate from '../moderate/Moderate';
import Report from '../reports/Report';
import EditSpace from '../spaces/EditSpace';
import NewNewSpace from '../spaces/NewNewSpace';
import Space from '../spaces/Space';
import Account from '../user/Account';
import Home from './Home';
import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/account" element={<Account />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/space" element={<NewNewSpace />} />
          <Route path="/space/:id" element={<Space />} />
          <Route path="/space/:id/edit" element={<EditSpace />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<LoginPanel />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/moderate" element={<Moderate />} />
          <Route path="/report/:spaceId" element={<Report />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
