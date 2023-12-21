import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Searched() {

    const [searchedRecipes, setSearched] = useState([]);
    let params = useParams();

    const getSearched = async (name) => {
        try {
            ///console.log("I am here" + name)
            const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=21`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const recipes = await response.json();
            setSearched(recipes.results);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
      };

    useEffect(() => {
        ///console.log("Params from URL: ", params);
        if (params.search) {
            getSearched(params.search);
        }
    },[params.search]);

    return (
        <Grid>
            {searchedRecipes.map((item) => {
            return (
            <Card key={item.id}>
                <Link to={'/recipes/' + item.id}>
                    <img src={item.image} alt="" />
                    <h4>{item.title}</h4>
                </Link>
                
            </Card>
            )
        })}
        </Grid>
    )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr)); // corrected repeat and minmax syntax
  grid-gap: 3rem;
  align-items: start; // ensures that items align at the top of the grid
`

const Card = styled.div`
  img{
    display: flex;
    border-radius: 2rem;
    width: 100%;
  }
  a{
    width: 100%;
    text-decoration: none;
  }
  h4{
    text-align: center;
  }
`;

export default Searched