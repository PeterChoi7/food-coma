import React from 'react';
import Home from './Home.jsx';
import Cuisine from './Cuisine.jsx';
import Searched from './Searched.jsx';
import Recipe from './Recipe.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';

import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Pages() {
  const [cookies, setCookies] = useCookies(["access_token"])
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cuisine/:type" element={<Cuisine />} />
      <Route path="/searched/:search" element={<Searched />} />
      <Route path="/recipes/:name" element={<Recipe />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default Pages;