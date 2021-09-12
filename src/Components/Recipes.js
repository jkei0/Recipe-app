import React from 'react';
import { useHistory, Link } from 'react-router-dom'
import './Recipes.css'

const Recipes = (props) => {
  const history = useHistory();
  console.log(props.recipes);
  if (props.recipes === null) {
    history.push('/');
    return <div></div>
  }

  return(
    <div>
      {props.recipes.results.map((item, idx) => (
        <div key={item.id} className='singleDish'>
          <div className='presentation'>
            <div dangerouslySetInnerHTML={{__html: item.summary}} className='dishSummary'/>
            <div className='gap'></div><div className='gap'></div>
            <img className='dishImage' src={item.image} alt='img'></img>
          </div>
          <h4 className='title'><Link to={`/recipes/${item.id}`}>{item.title}</Link></h4>
        </div>
      ))}
    </div>
  )
};

export default Recipes;