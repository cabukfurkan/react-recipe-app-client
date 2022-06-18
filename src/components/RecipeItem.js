import React, { useState, useEffect, useContext } from "react";
import FavoriteRecipesContext from '../store/favorite-recipes-context';
import { ReactComponent as HeartRegular } from '../assets/heart-regular.svg';
import { ReactComponent as HeartSolid } from '../assets/heart-solid.svg'
import styles from './RecipeItem.module.css'
import { API_KEY } from "../apiKey";

export default function RecipeItem({ recipe }) {
    const [recipeData, setRecipeData] = useState("");
    const favoritesCtx = useContext(FavoriteRecipesContext);
    const isFavoriteReceipt = favoritesCtx.favoriteRecipeIds.find((id) => id === recipe.id);

    useEffect(() => {
        fetch(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}&includeNutrition=false`
        )
            .then((response) => response.json())
            .then((data) => {
                setRecipeData(data);
            })
            .catch(() => {
                console.log("error");
            });
    }, [recipe.id]);

    return (
        <article className={styles.recipe_container}>
            <div className={styles.title_container}>
                <h1 className={styles.title}>{recipeData.title}</h1>
            </div>
            <img src={recipeData.image} alt="recipe" />
            <ul className={styles.instructions}>
                <li>Preparation time: {recipeData.readyInMinutes} minutes</li>
                <li>Number of servings: {recipeData.servings}</li>
            </ul>
            <div className={styles.favorite_hearth_container}>
                {isFavoriteReceipt ? (
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

            <a href={recipe.sourceUrl}>Go to Recipe</a>
        </article>
    );
}