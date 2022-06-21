import React from 'react'
import RecipeItem from './RecipeItem';
import styles from './RandomRecipesList.module.css'

function RandomRecipesList({ recipes }) {


    return (
        <section className={styles.meals} >
            {recipes.recipes?.map((recipe) => {
                return <RecipeItem key={recipe.id} recipe={recipe} />;
            })}
        </section>


    )
}

export default RandomRecipesList