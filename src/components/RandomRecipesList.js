import React, { useEffect, useState } from 'react'
import RandomRecipesListItem from './RandomRecipesListItem';
import styles from './RandomRecipesListItem.module.css'

function RandomRecipesList({ randomRecipes }) {


    return (
        <main>
            <section className={styles.meals} >
                {randomRecipes?.recipes.map((randomRecipe) => {
                    return <RandomRecipesListItem randomRecipe={randomRecipe} />;
                })}
            </section>

        </main>
    )
}

export default RandomRecipesList