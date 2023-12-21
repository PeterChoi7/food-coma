import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import { Link, useParams } from 'react-router-dom'

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=21&cuisine=${name}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const recipes = await response.json();
      if (recipes.results && Array.isArray(recipes.results)) {
        setCuisine(recipes.results);
      } else {
        // Handle the scenario where recipes.results is not as expected
        console.log('Unexpected format of recipes:', recipes);
      }
    } catch (error) {
      console.error("Failed to fetch cuisine data:", error);
    }
  };

  useEffect(() => {
    getCuisine(params.type);
    console.log(params.type);
  }, [params.type]);

  return (
    <Grid>
      {Array.isArray(cuisine) && cuisine.map((item) => (
        <Card key={item.id}>
          <Link to={'/recipes/' + item.id}>
            <img src={item.image} alt="" />
            <h4>{item.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
}

const Grid = styled(motion.div)`
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

export default Cuisine