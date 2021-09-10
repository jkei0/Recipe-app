import './App.css';
import React, { useState } from 'react';
import FilterForm from './Components/FilterForm';
import Recipe from './Components/Recipe';
import Recipes from './Components/Recipes';
import {
  Switch,
  Route
} from "react-router-dom";


const App = () => {
  const [currentRecipe, setCurrentRecipe] = useState(false);
  const [recipes, setRecipes] = useState(null);

  return (
    <>
      <Switch>
        <Route path="/recipes/:id">
          <Recipe recipe={currentRecipe} setCurrentRecipe={setCurrentRecipe}/>
        </Route>
        <Route path='/recipes'>
          <Recipes recipes={recipes} />
        </Route>
        <Route path="/">
          <FilterForm currentRecipe={currentRecipe} 
                      setCurrentRecipe={setCurrentRecipe}
                      setRecipes={setRecipes}/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
