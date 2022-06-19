import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import FavoriteRecipesContext from '../store/favorite-recipes-context'
import { API_KEY } from '../apiKey'
import styles from './RecipeDetails.module.css'
import RecipeInstructionsList from '../components/RecipeInstructionsList'
import Navbar from '../layouts/Navbar'
import { ReactComponent as HeartRegular } from '../assets/heart-regular.svg';
import { ReactComponent as HeartSolid } from '../assets/heart-solid.svg'
import ReactLoading from 'react-loading'

function RecipeDetails() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState([])
    const [isAvailable, setIsAvailable] = useState(false)

    const favoritesCtx = useContext(FavoriteRecipesContext)

    useEffect(() => {
        // (async () => {
        //     try {
        //         const response = await fetch(
        //             `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`)

        //         const data = await response.json()
        //         setRecipe(data);
        //         setIsAvailable(true)

        //     } catch (error) {
        //         console.log(error);
        //     }
        // })()

        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`)
            .then((response) => response.json())
            .then(data => {
                setRecipe(data)
                console.log(data);
                setIsAvailable(true)
            }).catch((error) => {
                console.log(error);
            })
        // }, [id]);
    }, []);

    const isFavoriteRecipe = favoritesCtx.favoriteRecipeIds.find((id) => id === recipe.id)

    return (
        <div className={styles.recipe_details_body}>
            <Navbar />
            {!recipe ? (<div><ReactLoading type='spin' color='green' width={200} /></div>)
                : (
                    <div className={styles.recipe_details_container}>
                        <div className={styles.image_container}>
                            <img className={styles.recipe_image} src={recipe.image} alt="" />
                            <div className={styles.favorite_hearth_container}>
                                {isFavoriteRecipe ? (
                                    <HeartSolid
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            favoritesCtx.removeFavorite(recipe.id);
                                        }}
                                    />
                                ) : (
                                    <HeartRegular
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            favoritesCtx.addFavorite(recipe.id);
                                            console.log(favoritesCtx);
                                        }}
                                    />
                                )}
                            </div>
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
                )}
        </div>
    )
}

export default RecipeDetails