import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './SearchBar.css';
import axios from 'axios';

const SearchBar = (props) => {
  const [inputField, setInputField] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let link = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_APIKEY}&addRecipeInformation=true`;
    if (inputField !== '') {
      link = link.concat(`&query=${inputField}`);
    }
    const recipes = await axios.get(link);
    props.setRecipes(recipes.data);
    history.push('/recipes');
  }

  const handleInputChange = (event) => {
    setInputField(event.target.value);
  }

  return (
    <div className='navBarContainer'>
      <NavLink to='/' className='homeLink'>
        <i className="fas fa-home fa-2x"></i>
      </NavLink>
      <form onSubmit={handleSubmit} className='navForm'>
        <input value={inputField} onChange={handleInputChange} 
          className='navInputField' placeholder='Find a recipe'/>
        <button onClick={handleSubmit} className='navSubmitButton'>
          <i className="fas fa-search fa-2x"></i>
        </button>
      </form>
    </div>
  )
};

export default SearchBar