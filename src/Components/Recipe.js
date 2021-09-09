import React from 'react';

const Recipe = (props) => {
  console.log(props.recipe);
  return (
    <div>
      <h3>{props.recipe.title}</h3>
      <img src={props.recipe.image} alt='' />
      <table>
        <tbody>
      {props.recipe.extendedIngredients.map((item,idx) => (
        <tr key={idx}>
          <th>{item.name}</th>
          <th>{item.measures.metric.amount > 10 
            ? Math.ceil(item.measures.metric.amount/10)*10 
            : item.measures.metric.amount}</th>
          <th>{item.measures.metric.unitShort === 'inches'
            ? ''
            : item.measures.metric.unitShort}</th>
        </tr>
      ))}
        </tbody>
      </table>
      {props.recipe.analyzedInstructions[0].steps.map((item,idx) => (
        <li key={idx}>{item.step}</li>
      ))}
    </div>
  )
}

export default Recipe;