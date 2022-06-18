import React from 'react'
import RecipeItem from './RecipeItem';
import styles from './RandomRecipesList.module.css'

function RandomRecipesList({ randomRecipes }) {


    return (
        <section className={styles.meals} >
            {randomRecipes.recipes?.map((recipe) => {
                return <RecipeItem recipe={recipe} />;
            })}
        </section>


    )
}

export default RandomRecipesList