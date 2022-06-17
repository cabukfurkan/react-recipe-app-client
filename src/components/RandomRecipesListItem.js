import React, { useContext, useEffect, useState } from 'react'
import { ReactComponent as HeartRegular } from '../assets/heart-regular.svg';
import { ReactComponent as HeartSolid } from '../assets/heart-solid.svg'
import FavoriteRecipesContext from '../store/favorite-recipes-context';
import styles from './RandomRecipesListItem.module.css'

function RandomRecipesListItem({ randomRecipe }) {
    const [imageUrl, setImageUrl] = useState("");
    const favoritesCtx = useContext(FavoriteRecipesContext);
    const isFavoriteReceipt = favoritesCtx.favoriteRecipeIds.find((id) => id === randomRecipe.id);

    useEffect(() => {
        fetch(
            `https://api.spoonacular.com/recipes/${randomRecipe.id}/information?apiKey=d835eda74cff40828b203c1ee564e1cf&includeNutrition=false`
        )
            .then((response) => response.json())
            .then((data) => {
                setImageUrl(data.image);
            })
            .catch(() => {
                console.log("error");
            });
    }, [randomRecipe.id]);

    return (
        <div>
            <article>
                <div className={styles.title_container}>
                    <h1 className={styles.title}>{randomRecipe.title}</h1>
                </div>
                <img src={imageUrl} alt="recipe" />
                <ul className={styles.instructions}>
                    <li>Preparation time: {randomRecipe.readyInMinutes} minutes</li>
                    <li>Number of servings: {randomRecipe.servings}</li>
                </ul>
                <div className={styles.favorite_hearth_container}>
                    {isFavoriteReceipt ? (
                        <HeartSolid
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                favoritesCtx.removeFavorite(randomRecipe.id);
                            }}
                        />
                    ) : (
                        <HeartRegular
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                favoritesCtx.addFavorite(randomRecipe.id);
                                console.log(favoritesCtx);
                            }}
                        />
                    )}
                </div>

                <a href={randomRecipe.sourceUrl}>Go to Recipe</a>
            </article>
        </div>
    )
}

export default RandomRecipesListItem