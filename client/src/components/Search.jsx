import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {

    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        ///console.log("Input value: ", input); // Debugging line
        if (input.trim()) {
            navigate('/searched/' + encodeURIComponent(input));
        }
    };

  return (
    <FormStyle onSubmit={submitHandler}>
        <div>
            <FaSearch />
            <input onChange={(e) => setInput(e.target.value)} type="text" value={input}/>
        </div>
    </FormStyle>
  )
}

const FormStyle = styled.form`
    margin: 0 auto; // Center the form
    position: relative;
    width: 65%; // Adjust the width as needed
    padding-top: 2rem;

    input {
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1rem;
        color: white;
        padding: 1rem 3rem; // Adjust padding to make room for the icon
        border-radius: 1rem;
        outline: none;
        width: 100%; // Input takes full width of the form
    }

    svg {
        position: absolute;
        top: 70%;
        left: 1rem; // Adjusted the left position
        transform: translateY(-50%);
        color: white;
        font-size: 1.5rem; // Adjust the size of the icon
    }
`;

export default Search