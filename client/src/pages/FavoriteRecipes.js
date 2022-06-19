import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import RecipeItem from "../components/RecipeItem";
import useFetchAll from "../hooks/useFetchAll";
import Navbar from "../layouts/Navbar";
import FavoritesContext from "../store/favorite-recipes-context";
import styles from './FavoriteRecipes.module.css'
import ReactLoading from 'react-loading'

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
            {!recipes ? (<div><ReactLoading type='spin' color='green' width={200} /></div>)
                : recipes.length !== 0 ? (
                    <div className={styles.favorite_recipes_container}>
                        {recipes?.map((recipe) => (
                            <RecipeItem key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                ) : (
                    <h3 className={styles.info}>❤️ Like some recipe ❤️</h3>
                )}
        </main>
    );
}