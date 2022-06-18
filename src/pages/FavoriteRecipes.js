import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import RecipeItem from "../components/RecipeItem";
import useFetchAll from "../hooks/useFetchAll";
import Navbar from "../layouts/Navbar";
import FavoritesContext from "../store/favorite-recipes-context";
import styles from './FavoriteRecipes.module.css'

export default function FavoriteRecipes() {
    const [recipes, setRecipes] = useState()
    const { favoriteRecipeIds } = useContext(FavoritesContext)

    const apiUrl = `https://api.spoonacular.com/recipes/`

    const { fetchDatas } = useFetchAll(apiUrl, setRecipes, favoriteRecipeIds)

    useEffect(() => {
        fetchDatas().catch((err) => console.log(err));
    }, [favoriteRecipeIds]);

    return (
        <main>
            <Navbar />
            <div className={styles.favorite_recipes_container}>
                {recipes?.map((recipe) => (
                    <RecipeItem recipe={recipe} />
                ))}
            </div>
        </main>
    );
}