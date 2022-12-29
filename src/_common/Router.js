import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPanel from '../auth/LogInPanel';
import Logout from '../auth/Logout';
import EditSpace from '../spaces/EditSpace';
import NewNewSpace from '../spaces/NewNewSpace';
import Space from '../spaces/Space';
import Spaces from '../spaces/Spaces';
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
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<LoginPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
