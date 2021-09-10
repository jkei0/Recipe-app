import './App.css';
import React, { useState } from 'react';
import FilterForm from './Components/FilterForm';
import Recipe from './Components/Recipe';
import {
  Switch,
  Route
} from "react-router-dom";


const App = () => {
  const [currentRecipe, setCurrentRecipe] = useState(false);

  return (
    <>
      <Switch>
        <Route path="/recipe/:id">
          <Recipe recipe={currentRecipe} setCurrentRecipe={setCurrentRecipe}/>
        </Route>
        <Route path="/">
          <FilterForm currentRecipe={currentRecipe} 
                      setCurrentRecipe={setCurrentRecipe}/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
