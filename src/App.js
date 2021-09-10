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
    <div className='background'>
      <Switch>
        <Route path="/recipes/:id">
          <div>
            <Recipe recipe={currentRecipe} setCurrentRecipe={setCurrentRecipe}/>
          </div>
        </Route>
        <Route path='/recipes'>
          <div className='recipesPage'>
            <div className='recipesPageFilter'>
              <FilterForm currentRecipe={currentRecipe} 
                          setCurrentRecipe={setCurrentRecipe}
                          setRecipes={setRecipes}/>
            </div>
            <div className='resipesPageRecipes'>
              <Recipes recipes={recipes} className='recipes'/>
            </div>
          </div>
        </Route>
        <Route path="/">
          <div className='mainPage'>
            <FilterForm currentRecipe={currentRecipe} 
                        setCurrentRecipe={setCurrentRecipe}
                        setRecipes={setRecipes}/>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
