import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from '../admin/Admin';
import LoginPanel from '../auth/LogInPanel';
import Logout from '../auth/Logout';
import Config from '../config/Config';
import Dashboard from '../dashboard/Dashboard';
import Guest from '../guest/Guest';
import Home from '../home/Home';
import Host from '../host/Host';
import MessageArchive from '../messages/MessageArchive';
import Messages from '../messages/Messages';
import Neighborhood from '../neighborhood/Neighborhood';
import Reservation from '../reservation/Reservation';
import Reserve from '../reservation/Reserve';
import Search from '../search/Search';
import NewSpaceForm from '../spaces/NewSpaceForm';
import Space from '../spaces/Space';
import SpaceEdit from '../spaces/SpaceEdit';
import Spaces from '../spaces/Spaces';
import Account from '../user/Account';
import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<LoginPanel />} />
          <Route path="/host" element={<Host />} />
          <Route path="/newSpace" element={<NewSpaceForm />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/space/:id" element={<Space />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/spaces/:id" element={<Space />} />
          <Route path="/spaces/:id/edit" element={<SpaceEdit />} />
          <Route path="/spaces/:id/edit/:tab?" element={<SpaceEdit />} />
          <Route path="/space/:spaceId/reserve" element={<Reserve />} />
          <Route path="/spaces/:spaceId/reserve" element={<Reserve />} />
          <Route path="/reserve/:id" element={<Reserve />} />
          <Route path="/reservation/:id" element={<Reservation />} />
          <Route path="/reservations/:id" element={<Reservation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/config" element={<Config />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/archive" element={<MessageArchive />} />
          <Route path="/guest" element={<Guest />} />
        </Route>
        <Route path="/n" element={<Neighborhood />} />
        <Route path="/neighborhood" element={<Neighborhood />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
