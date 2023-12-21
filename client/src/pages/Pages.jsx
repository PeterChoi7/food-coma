import React from 'react';
import Home from './Home.jsx';
import Cuisine from './Cuisine.jsx';
import Searched from './Searched.jsx';
import Recipe from './Recipe.jsx';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cuisine/:type" element={<Cuisine />} />
      <Route path="/searched/:search" element={<Searched />} />
      <Route path="/recipes/:name" element={<Recipe />} />
    </Routes>
  );
}

export default Pages;