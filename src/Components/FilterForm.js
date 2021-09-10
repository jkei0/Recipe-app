import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const FilterForm = (props) => {
  const allowedCuisines = ['All','African','American','British','Cajun','Caribbean','Chinese',
    'Eastern European','European','French','German','Greek','Indian','Irish',
    'Italian','Japanese','Jewish','Korean','Latin American','Mediterranean',
    'Mexican','Middle Eastern','Nordic','Southern','Spanish','Thai','Vietnamese'];
  const allowedDiets = ['All','Gluten Free','Ketogenic','Vegetarian','Lacto-Vegetarian',
    'Ovo-Vegetarian','Vegan','Pescetarian','Paleo','Primal','Whole30'];
  const allowedTypes = ['All','main course','side dish','dessert','appetizer',
    'salad','bread','breakfast','soup','beverage','sauce','marinade','fingerfood',
    'snack','drink']


  const [cuisine, setCuisine] = useState('All');
  const [diet, setDiet] = useState('All');
  const [type, setType] = useState('All');
  const [searchText, setSearchText] = useState('');

  const history = useHistory();

  const getRecipe = async () => {
    const apiKey = process.env.REACT_APP_APIKEY;
    const recipe = await axios.get("https://api.spoonacular.com/recipes/random?apiKey=" + apiKey);
    props.setCurrentRecipe(recipe.data.recipes[0]);
    history.push('/recipes/' + recipe.data.recipes[0].id)
  }

  const handleCuisineChange = (event) => {
    setCuisine(event.target.value);
  }

  const handleTypeChange = (event) => {
    setType(event.target.value);
  }

  const handleDietChange = (event) => {
    setDiet(event.target.value);
  }

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let link = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_APIKEY}&addRecipeInformation=true`;
    const values = [[searchText, 'query'], [cuisine, 'cuisine'], [diet, 'diet'], [type, 'type']];
    const filters = values.filter(item => item[0]!=='All' && item[0]!=='');
    filters.forEach((item, idx) => {
      link = link.concat(`&${item[1]}=${item[0]}`)});
    const recipes = await axios.get(link);
    props.setRecipes(recipes.data);
    history.push('/recipes');
  }

  return (
    <div>
      <button onClick={getRecipe}>Get random recipe</button>
      <form onSubmit={handleSubmit}>
        <input value={searchText} onChange={handleSearchTextChange} placeholder='Find a recipe'/>
        <select value={cuisine} onChange={handleCuisineChange}>
          {allowedCuisines.map((item,idx) => (
            <option key={idx} value={item}>{item}</option>
          ))}
        </select>
        <select value={diet} onChange={handleDietChange}>
          {allowedDiets.map((item, idx) => (
            <option key={idx} value={item}>{item}</option>
          ))}
        </select>
        <select value={type} onChange={handleTypeChange}>
          {allowedTypes.map((item, idx) => (
            <option key={idx} value={item}>{item}</option>
          ))}
        </select>
        <button onClick={handleSubmit}>Find recipes</button>
      </form>
    </div> 
  )
}

export default FilterForm;
