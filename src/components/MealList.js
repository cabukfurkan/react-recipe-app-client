import React from "react";
import MealListItem from "./MealListItem";
import styles from './MealList.module.css'

export default function MealList({ mealData }) {
    const nutrients = mealData.nutrients;

    return (
        <main>
            <section className={styles.nutrients}>
                <h1>Macros</h1>
                <ul>
                    <li>Calories: {nutrients.calories.toFixed(0)}</li>
                    <li>Carbohydrates: {nutrients.carbohydrates.toFixed(0)}</li>
                    <li>Fat: {nutrients.fat.toFixed(0)}</li>
                    <li>Protein: {nutrients.protein.toFixed(0)}</li>
                </ul>
            </section>

            <section className={styles.meals}>
                {mealData.meals.map((meal) => {
                    return <MealListItem meal={meal} />;
                })}
            </section>
        </main>
    );
}