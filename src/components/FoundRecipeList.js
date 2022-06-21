import React from 'react'
import styles from './FoundRecipeList.module.css'
import RecipeItem from './RecipeItem';

function FoundRecipeList({ recipes }) {
    return (
        <section className={styles.meals} >
            {recipes.results?.map((recipe) => {
                return <RecipeItem key={recipe.id} recipe={recipe} />;
            })}
        </section>
    )
}

export default FoundRecipeList