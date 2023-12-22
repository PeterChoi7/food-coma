import React, { useState } from 'react';
import Pages from "./pages/Pages";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Category from "../src/components/Category";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Search from "../src/components/Search";
import styled from "styled-components";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('');
  const [cookies, setCookies] = useCookies(["access_token"])
  const username = window.localStorage.getItem("username");


  const logout = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    window.localStorage.removeItem("username")
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          <Logo to={"/"}>
            <h1>Food Coma</h1>
          </Logo>
          {!cookies.access_token ? (
            <ButtonContainer>
            <StyledLink to= "/login">
              <Button className={activeTab === 'login' ? 'active' : ''} onClick={() => setActiveTab('login')}>
                Log in
              </Button>
            </StyledLink>
            <StyledLink to= "/signup">
              <Button className={activeTab === 'signup' ? 'active' : ''} onClick={() => setActiveTab('signup')}>
                Sign up
              </Button>
            </StyledLink>
          </ButtonContainer>
          ) : (
            <ButtonContainer>
              <h2>Welcome, {username}</h2>
                <Button className={activeTab === 'login' ? 'active' : ''} onClick={logout}>
                  Log out
                </Button>
            </ButtonContainer>
          )}
          
        </Nav>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

// Add the styled Link component
const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
`
// const Nav = styled.div`
//   padding: 4rem 0rem;
//   display: flex;
//   justify-content: flex-start;
//   align-item: center;
//   svg {
//     font-size: 2rem;
//   }
// `

const Nav = styled.div`
  padding: 1rem 2rem; // Adjust padding as needed
  display: flex;
  justify-content: space-between; // This will separate logo and buttons
  align-items: center; // Corrected 'align-item' to 'align-items'
`;

// Add styled components for ButtonContainer and Button if not already defined
const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem; // Adjust the gap between buttons
  // Add additional styling as needed
`;

const Button = styled.button`
  padding: 0.5rem 1rem; // Adjust padding as needed
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f0f0f0; // Adjust color as needed
  &:hover {
    background-color: #e0e0e0; // Adjust hover color as needed
  }
  &.active {
    background-color: #d0d0d0; // Adjust active button color as needed
  }
`;

export default App;
