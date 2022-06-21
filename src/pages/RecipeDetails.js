import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import FavoriteRecipesContext from '../store/favorite-recipes-context'
import { apiCallTime, apiKeys, API_KEY } from '../apiKeys'
import styles from './RecipeDetails.module.css'
import RecipeInstructionsList from '../components/RecipeInstructionsList'
import Navbar from '../layouts/Navbar'
import { ReactComponent as HeartRegular } from '../assets/heart-regular.svg';
import { ReactComponent as HeartSolid } from '../assets/heart-solid.svg'
import ReactLoading from 'react-loading'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateApiKey } from '../store/action/updateApi'

function RecipeDetails() {
    // apikey op
    const getApiKey = useSelector((state) => state.apiKey_Data.apiKey)
    const dispatch = useDispatch()

    const changeApiKey = () => {
        let currentApi = apiKeys[apiCallTime]
        dispatch(UpdateApiKey(currentApi))
        console.log('api key error status code 402 BUT DO NOT WORK API HAS BEEN CHANGED');

        apiCallTime++

        if (apiCallTime > 10) {
            apiCallTime = 0
        }
    }
    // 

    const { id } = useParams()
    const [recipe, setRecipe] = useState([])
    const [isAvailable, setIsAvailable] = useState(false)

    const favoritesCtx = useContext(FavoriteRecipesContext)

    useEffect(() => {
        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${getApiKey}&includeNutrition=false`)
            .then((response) => response.json())
            .then(data => {
                setRecipe(data)
                setIsAvailable(true)
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status) {
                        changeApiKey()
                    }
                }
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