import React from 'react'
import RandomRecipesListItem from './RandomRecipesListItem';
import styles from './RandomRecipesListItem.module.css'

function RandomRecipesList({ randomRecipes }) {


    return (

        <section className={styles.meals} >
            {randomRecipes?.recipes.map((randomRecipe) => {
                return <RandomRecipesListItem randomRecipe={randomRecipe} />;
            })}
        </section>


    )
}

export default RandomRecipesList