import { useEffect, useState} from "react";
import styled, { css } from 'styled-components'
import {Splide, SplideSlide} from '@splidejs/react-splide'
import "@splidejs/splide/dist/css/splide.min.css"
import { Link } from "react-router-dom";

function Popular() {

    const [popular, setPopular] = useState([]);

    useEffect(() =>{
        getPopular();
    },[]);

    const getPopular = async () => {

        const check = localStorage.getItem('popular');

        if(check) {
            setPopular(JSON.parse(check));
        } else{
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10&type=main course`
            );
            const data = await api.json();
            
            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes)
            console.log(data)
        }
    }

    return (
        <Outer>
            <Wrapper>
                <Title>Popular Picks</Title>
                    <Splide options={{
                        perPage: 2,
                        drag: "free",
                        gap: "5rem",
                    }}>
                        {popular.map((recipe) => {
                            return (                            
                                <SplideSlide key={recipe.id}>
                                    <Card>
                                        <Link to={'/recipes/' + recipe.id}>
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
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
    
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
export default Popular;