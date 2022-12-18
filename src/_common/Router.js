import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Space from '../spaces/Space';
import Spaces from '../spaces/Spaces';
import Home from './Home';
import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/space" element={<Space />} />
          <Route path="/spaces" element={<Spaces />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
