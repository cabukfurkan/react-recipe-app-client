import React from 'react'
import styles from './RecipeInstructionsListItem.module.css'

function RecipeInstructionsListItem({ step }, { key }) {
    return (
        <li className={styles.instruction} key={key}>{step}</li>
    )
}

export default RecipeInstructionsListItem