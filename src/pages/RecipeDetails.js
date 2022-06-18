import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import FavoriteRecipesContext from '../store/favorite-recipes-context'
import { API_KEY } from '../apiKey'
import styles from './RecipeDetails.module.css'
import RecipeInstructionsList from '../components/RecipeInstructionsList'
import Navbar from '../layouts/Navbar'

function RecipeDetails() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState([])
    const [isAvailable, setIsAvailable] = useState(false)

    const favoritesCtx = useContext(FavoriteRecipesContext)
    const isFavoriteRecipe = favoritesCtx.favoriteRecipeIds.find((id) => id === recipe.id)

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`)

                const data = await response.json()
                setRecipe(data);
                setIsAvailable(true)

            } catch (error) {
                console.log(error);
            }
        })()
    }, [id]);

    console.log(recipe);

    return (
        <div className={styles.recipe_details_body}>
            <Navbar />
            <div className={styles.recipe_details_container}>
                <div className={styles.image_container}>
                    <img className={styles.recipe_image} src={recipe.image} alt="" />
                </div>
                <div className={styles.information_container}>
                    <h2 className={styles.title}>{recipe.title}</h2>
                    <div className={styles.prep_serv_container}>
                        <p>Preparation Time:{recipe.readyInMinutes}</p>
                        <p>Servings: {recipe.servings}</p>
                    </div>
                    <div>
                        <h3 className={styles.instructions_title}>Instructions</h3>
                        <RecipeInstructionsList isAvailable={isAvailable} recipe={recipe} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RecipeDetails