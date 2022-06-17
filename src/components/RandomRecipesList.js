import React, { useEffect, useState } from 'react'
import RandomRecipesListItem from './RandomRecipesListItem';

function RandomRecipesList({ randomRecipes }) {


    return (
        <main>
            <section >
                {randomRecipes?.recipes.map((randomRecipe) => {
                    return <RandomRecipesListItem randomRecipe={randomRecipe} />;
                })}
            </section>

        </main>
    )
}

export default RandomRecipesList