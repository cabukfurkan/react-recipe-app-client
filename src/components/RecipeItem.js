import React, { useState, useEffect, useContext } from "react";
import FavoriteRecipesContext from '../store/favorite-recipes-context';
import { ReactComponent as HeartRegular } from '../assets/heart-regular.svg';
import { ReactComponent as HeartSolid } from '../assets/heart-solid.svg'
import styles from './RecipeItem.module.css'
import { apiCallTime, apiKeys } from "../apiKeys";
import { Link } from "react-router-dom";
import ReactLoading from 'react-loading'
import { useDispatch, useSelector } from "react-redux";
import { UpdateApiKey } from "../store/action/updateApi";

export default function RecipeItem({ recipe }) {


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

    const [recipeData, setRecipeData] = useState();
    const favoritesCtx = useContext(FavoriteRecipesContext);
    const isFavoriteRecipe = favoritesCtx.favoriteRecipeIds.find((id) => id === recipe.id);

    useEffect(() => {
        fetch(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${getApiKey}&includeNutrition=false`
        )
            .then((response) => response.json())
            .then((data) => {
                setRecipeData(data);
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status) {
                        changeApiKey()
                    }
                }
                console.log("error");
            });
    }, [recipe.id]);

    return (
        <article >
            {!recipeData ? (<div className={styles.loading}><ReactLoading type='spin' color='green' width={200} /></div>)
                : (
                    <div className={styles.recipe_container}>
                        <div className={styles.title_container}>
                            <h1 className={styles.title}>{recipeData.title}</h1>
                        </div>
                        <img src={recipeData.image} alt="recipe" />
                        <ul className={styles.instructions}>
                            <li>Preparation time: {recipeData.readyInMinutes} minutes</li>
                            <li>Number of servings: {recipeData.servings}</li>
                        </ul>
                        <div className={styles.favorite_hearth_container}>
                            {isFavoriteRecipe ? (
                                <HeartSolid
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        await favoritesCtx.removeFavorite(recipe.id);
                                    }}
                                />
                            ) : (
                                <HeartRegular
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        await favoritesCtx.addFavorite(recipe.id);
                                    }}
                                />
                            )}
                        </div>
                        <Link className={styles.link} to={`/recipe-finder/${recipe.id}`}>
                            Recipe Details
                        </Link>
                    </div>
                )

            }
        </article>
    );
}