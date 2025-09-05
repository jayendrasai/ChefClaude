import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
export default function IngredientsList(props) {
  const getRecipe = props.getRecipe;
  const ingredients = props.ingredients;
  const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient} <button key={ingredient} onClick={()=>{props.ingredientsDelete(ingredient)}}><FontAwesomeIcon icon={faTrash} /></button></li>
       
    ))
  return (
    <section>
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
                {ingredients.length > 3 && <div className="get-recipe-container">
                    <div ref={props.ref}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={getRecipe}>Get a recipe</button>
                </div>}
            </section>
  )
}
