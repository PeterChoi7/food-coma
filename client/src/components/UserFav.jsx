import React from 'react'
import { useEffect, useState} from "react";
import styled, { css } from 'styled-components'
import {Splide, SplideSlide} from '@splidejs/react-splide'
import "@splidejs/splide/dist/css/splide.min.css"
import { Link } from "react-router-dom";
import axios from "axios";

function UserFav() {
  const [saved, setSaved] = useState([]);

    useEffect(() =>{
        getSaved();
    },[]);


    const getSaved = async () => {
        const userID = localStorage.getItem('userID'); // Assuming the userID is stored in localStorage after login
    
        if (!userID) {
            console.error('User is not logged in');
            return;
        }
    
        try {
            // Replace with the correct URL and port of your backend
            const response = await axios.get(`http://localhost:3001/auth/savedRecipes`, {
                params: { userID: userID }
            });
    
            if (response.data && response.data.savedRecipes) {
                setSaved(response.data.savedRecipes);
            } else {
                console.log('No saved recipes found for this user');
            }
        } catch (error) {
            console.error('Error fetching saved recipes:', error);
        }
    }
    

    

    return (
        <Outer>
            <Wrapper>
                <Title>Saved</Title>
                    <Splide options={{
                        perPage: 2,
                        drag: "free",
                        gap: "5rem"
                    }}>
                        {saved.map((recipe) => {
                            return (                            
                                <SplideSlide key={recipe.id}>
                                    <Card>
                                        <Link to={"/recipes/"+recipe.id}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title} />
                                        </Link>
                                    </Card>
                                </SplideSlide>
                            );
                        })}
                    </Splide>
            </Wrapper>
        </Outer>
    )
}

const Outer = styled.div`
    margin: 4rem;
`;

const Title = styled.div`
    text-align: center;
    font-size: 1.7rem;
    font-weight: bold;
    margin: 1.2rem;
`;


const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 25rem;
    overflow: hidden;
    position: relative;
    border-radius: 2rem;
    
    img{
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p{
        position: absoulte;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%)
        color: white;
        width: 100%
        text-align: center;
        font-weight: 600;
        font-size: 1.2rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1rem;
    }
`;

export default UserFav;