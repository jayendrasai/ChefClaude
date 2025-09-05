import React from 'react'
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
export default function RecipeChef(props) {
    
  return (
    
    <section>
                <h2>Chef Claude Recommends:</h2>
                <article className="suggested-recipe-container" aria-live="polite">
                    <ReactMarkdown>{props.recipeText}</ReactMarkdown>
                </article>
                
     </section>
    
  )
}
