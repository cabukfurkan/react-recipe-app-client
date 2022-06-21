import React from 'react'
import RecipeInstructionsListItem from './RecipeInstructionsListItem'
import styles from './RecipeInstructionsList.module.css'

function RecipeInstructionsList({ recipe, isAvailable }) {
    console.log(recipe);
    return (
        <ol className={styles.instructions_list} >
            {isAvailable && recipe.analyzedInstructions[0].steps.map((instruction, index) =>
                <RecipeInstructionsListItem key={index} step={instruction.step} />
            )}
        </ol>
    )
}

export default RecipeInstructionsList