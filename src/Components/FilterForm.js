import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const FilterForm = (props) => {
  const history = useHistory();

  const getRecipe = async () => {
    const apiKey = process.env.REACT_APP_APIKEY;
    const recipe = await axios.get("https://api.spoonacular.com/recipes/random?apiKey=" + apiKey);
    props.setCurrentRecipe(recipe.data.recipes[0]);
    console.log(String(recipe.data.recipes[0].id));
    history.push('/recipe/' + recipe.data.recipes[0].id)
  }

  return (
    <button onClick={getRecipe}>Get random recipe</button>
  )
}

export default FilterForm;
