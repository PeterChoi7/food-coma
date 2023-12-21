import {FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { FaBowlRice } from "react-icons/fa6";
import {GiNoodles, GiChopsticks, GiFastNoodles, GiBowlOfRice, GiFireBowl} from 'react-icons/gi'
import styled from 'styled-components'
import { NavLink } from "react-router-dom";


import React from 'react'

function Category() {
  return (
    <List>
        <SLink to={'/cuisine/Italian'}>
            <FaPizzaSlice/>
            <h4>Italian</h4>
        </SLink>
        <SLink to={'/cuisine/American'}>
            <FaHamburger/>
            <h4>American</h4>
        </SLink>
        <SLink to={'/cuisine/Thai'}>
            <GiFastNoodles/>
            <h4>Thai</h4>
        </SLink>
        <SLink to={'/cuisine/Korean'}>
            <GiBowlOfRice/>
            <h4>Korean</h4>
        </SLink>
        <SLink to={'/cuisine/Japanese'}>
            <GiChopsticks/>
            <h4>Japanese</h4>
        </SLink>
        <SLink to={'/cuisine/Vietnamese'}>
            <GiNoodles/>
            <h4>Vietnamese</h4>
        </SLink>
        <SLink to={'/cuisine/Indian'}>
            <GiFireBowl />
            <h4>Indian</h4>
        </SLink>
        <SLink to={'/cuisine/Mediterranean'}>
            <FaBowlRice />
            <h4>Mediterranean</h4>
        </SLink>
    </List>
  )
}

const List = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; /* Align items center vertically */
    margin: 1rem;
    flex-wrap: wrap;
    padding-top: 2rem;
`;

const SLink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center; // Centers content vertically
    align-items: center; // Centers content horizontally
    border-radius: 20%;
    margin-right: 2rem;
    text-decoration: none;
    width: 5rem; // Square shape
    height: 5rem; // Square shape
    cursor: pointer;
    transform: scale(0.8);

    svg {
        color: black;
        width: 70%; // Adjust width to increase SVG size
        height: auto; // Maintain aspect ratio
        margin-bottom: 0.5rem; // Space between SVG and text
    }

    h4 {
        color: black;
        font-size: 0.8rem;
        margin: 0;
    }

    &.active {
        h4 {
            color: #f27121;
        }
        svg {
            color: #f27121;
        }
    }
`;

export default Category