import React, { useState } from "react";
import MealList from "../components/MealList";
import Navbar from "../layouts/Navbar";
import styles from './MealPlanner.module.css'


function MealPlanner() {
    const [mealData, setMealData] = useState(null);
    const [calories, setCalories] = useState(2000);

    function getMealData() {
        fetch(
            `https://api.spoonacular.com/mealplanner/generate?apiKey=46c9e3436c5e426990bc58ddc541257b&timeFrame=day&targetCalories=${calories}`
        )
            .then((response) => response.json())
            .then((data) => {
                setMealData(data);
            })
            .catch(() => {
                console.log("error");
            });
    }

    function handleChange(e) {
        setCalories(e.target.value);
    }

    return (
        <div className={styles.body_container}>
            <Navbar />
            <div className={styles.mealPlanner_container}>
                <section className={styles.controls}>
                    <input
                        type="number"
                        placeholder="Calories (e.g. 2000)"
                        onChange={handleChange}
                    />
                    <button onClick={getMealData}>Get Daily Meal Plan</button>
                </section>
                {mealData && <MealList mealData={mealData} />}
            </div>
        </div>
    );
}

export default MealPlanner;