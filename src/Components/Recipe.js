import axios from 'axios';
import React from 'react';
import './Recipe.css'; 

const Recipe = (props) => {

  const id = window.location.href.split('/').slice(-1)
  if(props.recipe === false || String(props.recipe.id) !== id[0]) {
    const getRecipe = async() => {
      const recipe = await axios
        .get('https://api.spoonacular.com/recipes/' 
        + id 
        + '/information' 
        + '?apiKey=' 
        + process.env.REACT_APP_APIKEY);
      props.setCurrentRecipe(recipe.data);
    }
    getRecipe();
    return (
      <div></div>
    )
  };
  const renderList = props.recipe.analyzedInstructions.length > 0
                    ? true 
                    : false

  return (
    <div className='container'>
      <div className='upperPart'>
        <h3 className='title'>{props.recipe.title}</h3>
        <div className='headline'>
          <div dangerouslySetInnerHTML={{__html: props.recipe.summary}} className='summary'/>
          <div className='gap'></div>
          <img src={props.recipe.image} alt='' className='img'/>
        </div>
      </div>
      <div className='methods'>
        <table className='ingredientTable'>
          <thead>
            <tr><th align='left'>Ingredients</th></tr>
          </thead>
          <tbody>
            {props.recipe.extendedIngredients.map((item,idx) => (
            <tr key={idx} className='ingredientsTableRow'>
              <td>{item.name}</td>
              <td>{item.measures.metric.amount > 10 
                ? Math.ceil(item.measures.metric.amount/10)*10 
                : item.measures.metric.amount}</td>
              <td>{item.measures.metric.unitShort === 'inches'
                ? ''
                : item.measures.metric.unitShort}</td>
            </tr>
        ))}
          </tbody>
        </table>
        <div className='gap'></div><div className='gap'></div><div className='gap'></div>
        <section className='guideList'>
          <h4 className='methodHeadline'>Methods</h4>
          <ol>
            {renderList && props.recipe.analyzedInstructions[0].steps.map((item,idx) => (
              <li key={idx} className='guide'>{item.step}</li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}

export default Recipe;