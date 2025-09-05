import React from "react"
import { useRef } from "react"
import RecipeChef from "./RecipeChef"
import IngredientsList from "./IngredientsList"
import {getRecipeFromMistral } from "../src/ai"
import  ReactLoading from "react-loading"
import Loading from './Loading'

export default function Main() {
    const apiKey = import.meta.env.VITE_HUGGING_FACE_API_KEY;
   // console.log("API Key:", apiKey);
    const [loading, setLoading] = React.useState(false);
    const recipeSection = useRef(null);
    const [recipeShown, setRecipeShown] = React.useState(false)
    const [recipeTextByAi, setRecipeTextByAi] = React.useState("")
    console.log(recipeSection)
    // let recipeTextByAi;
    const [ingredients, setIngredients] = React.useState(
        ["all the main spices", "pasta", "Chicken", "tomato paste"]
    )
    React.useEffect(() => {
        if (recipeTextByAi !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({ behavior: 'smooth' });
        //     setTimeout(() => {
            
        // }, 0);
        }
    }, [recipeTextByAi])
    
    let recipeMarkdown;
    const onDelete = (target)=>{
       setIngredients(ingredients.filter(ingredient => ingredient !== target));
    }
    async function getRecipe() {
        setLoading(true);
        try {
         recipeMarkdown = await getRecipeFromMistral(ingredients);
        setRecipeTextByAi((prev)=>recipeMarkdown+prev);
        setRecipeShown((prev)=> prev = true);
        console.log("Recipe Text:", recipeMarkdown);
        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
        finally{
            setLoading(false);
        }
        

    }

    

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        if(!newIngredient) {
            return;
        }
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button>Add ingredient</button>
            </form>
             
            {ingredients.length > 0 && <IngredientsList ref={recipeSection} ingredients={ingredients} getRecipe={getRecipe} ingredientsDelete={onDelete}/>}
            {loading && <h1 className="loading-text">Loading recipe...</h1>}
           
            {!loading && recipeShown && <RecipeChef recipeText={recipeTextByAi}/>}
           
        </main>
    )
}