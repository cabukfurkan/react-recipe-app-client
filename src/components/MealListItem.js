import React, { useState, useEffect, useContext } from "react";
import FavoriteRecipesContext from '../store/favorite-recipes-context';
import { ReactComponent as HeartRegular } from '../assets/heart-regular.svg';
import { ReactComponent as HeartSolid } from '../assets/heart-solid.svg'
import styles from './MealListItem.module.css'

export default function MealListItem({ meal }) {
    const [imageUrl, setImageUrl] = useState("");
    const favoritesCtx = useContext(FavoriteRecipesContext);
    const isFavoriteReceipt = favoritesCtx.favoriteRecipeIds.find((id) => id === meal.id);

    useEffect(() => {
        fetch(
            `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=d835eda74cff40828b203c1ee564e1cf&includeNutrition=false`
        )
            .then((response) => response.json())
            .then((data) => {
                setImageUrl(data.image);
            })
            .catch(() => {
                console.log("error");
            });
    }, [meal.id]);



    return (
        <div>
            <article>
                <div className={styles.title_container}>
                    <h1 className={styles.title}>{meal.title}</h1>
                </div>
                <img src={imageUrl} alt="recipe" />
                <ul className={styles.instructions}>
                    <li>Preparation time: {meal.readyInMinutes} minutes</li>
                    <li>Number of servings: {meal.servings}</li>
                </ul>
                <div className={styles.favorite_hearth_container}>
                    {isFavoriteReceipt ? (
                        <HeartSolid
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                favoritesCtx.removeFavorite(meal.id);
                            }}
                        />
                    ) : (
                        <HeartRegular
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                favoritesCtx.addFavorite(meal.id);
                                console.log(favoritesCtx);
                            }}
                        />
                    )}
                </div>

                <a href={meal.sourceUrl}>Go to Recipe</a>
            </article>
        </div>
    );
}