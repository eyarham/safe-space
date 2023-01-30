import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPanel from '../auth/LogInPanel';
import Logout from '../auth/Logout';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import Config from '../config/Config';
import Moderate from '../moderate/Moderate';
import Report from '../reports/Report';
import EditReview from '../reviews/EditReview';
import NewReview from '../reviews/NewReview';
import EditSpace from '../spaces/EditSpace';
import NewNewSpace from '../spaces/NewNewSpace';
import Space from '../spaces/Space';
import AccountTabs from '../user/account/AccountTabs';
import Home from './Home';
import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/account" element={<AccountTabs />} />
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
          <Route path="/newreview/:spaceId" element={<NewReview />} />
          <Route path="/review/:id/edit" element={<EditReview />} />
          <Route path="/config" element={<Config />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
