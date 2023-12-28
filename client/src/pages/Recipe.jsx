import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from "axios";

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState('instructions');
    const [isSaved, setIsSaved] = useState(false);


    const fetchDetails = async () => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const detailData = await response.json();
            setDetails(detailData);
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    };

    const toggleSaveRecipe = async () => {
        const userID = window.localStorage.getItem('userID');
        if (!userID) {
            console.error('Please Log In');
            return; // Exit the function if there is no userID
        }
    
        // Check if all the required details are available
        if (!details || !details.title || !details.extendedIngredients || !details.instructions || !details.image) {
            console.error('Recipe details are not available');
            return; // Exit the function if details are incomplete
        }
    
        // Prepare the recipeData
        const recipeData = details;
    
        const url = `http://localhost:3001/auth/${isSaved ? 'unsaveRecipe' : 'saveRecipe'}`;
    
        try {
            await axios.post(url, { userID, recipeData });
            setIsSaved(!isSaved); // Toggle the saved status
            console.log(`${isSaved ? 'Unsaved' : 'Saved'} recipe successfully!`);
        } catch (error) {
            console.error('Error toggling saved recipe:', error);
        }
    };


    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    return (
        <DetailedWrapper>
            <LeftColumn>
            <SaveButton onClick={toggleSaveRecipe}> {/* Change this to call saveRecipe */}
                {isSaved ? '❤️ saved' : '🤍 save'}
            </SaveButton>
                <h2>{details.title}</h2>
                <img src={details.image} alt="" />
            </LeftColumn>
            <RightColumn>
                <ButtonContainer>
                    <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>
                        Instructions
                    </Button>
                    <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>
                        Ingredients
                    </Button>
                </ButtonContainer>
                <Content>
                    {activeTab === 'instructions' && (
                        <div>
                            <div dangerouslySetInnerHTML={{__html: details.summary}}></div>
                            <div dangerouslySetInnerHTML={{__html: details.instructions}}></div>
                        </div>
                    )}
                    {activeTab === 'ingredients' && (
                        <ul>
                            {details.extendedIngredients.map((ingredient) =>
                                <li key={ingredient.id}>{ingredient.original}</li>
                            )}
                        </ul>
                    )}
                </Content>
            </RightColumn>
        </DetailedWrapper>
    );
}

const DetailedWrapper = styled.div`
    display: flex;
    margin-top: 10rem;
    gap: 2rem;
`;

const LeftColumn = styled.div`
    flex: 1;
    img {
        width: 100%;
        border-radius: 20px;
        margin-top: 2rem;
    }
    margin: 1rem 
`;

const RightColumn = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: start;
    width: 100%;
    margin-bottom: 3rem;
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    flex: 1;
    text-align: center;
    transition: background-color 0.3s, color 0.3s;

    &:last-child {
        margin-right: 0;
    }

    &.active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
        border-color: transparent;
    }
`;

const SaveButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: ${props => props.isSaved ? 'red' : 'grey'}; // Heart color changes based on save state
    margin-bottom: 1rem; // Spacing above the title
`;

const Content = styled.div`
    // Additional styling for content
`;

export default Recipe;