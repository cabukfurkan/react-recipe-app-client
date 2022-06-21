import React, { useState } from "react";
import MealList from "../components/MealList";
import Navbar from "../layouts/Navbar";
import styles from './MealPlanner.module.css'
import { apiCallTime, apiKeys, API_KEY } from "../apiKeys";
import { useDispatch, useSelector } from "react-redux";
import { UpdateApiKey } from "../store/action/updateApi";


function MealPlanner() {
    // apikey op
    const getApiKey = useSelector((state) => state.apiKey_Data.apiKey)
    const dispatch = useDispatch()

    const changeApiKey = () => {
        let currentApi = apiKeys[apiCallTime]
        dispatch(UpdateApiKey(currentApi))
        console.log('api key error status code 402 BUT DO NOT WORK API HAS BEEN CHANGED');

        apiCallTime++

        if (apiCallTime > 10) {
            apiCallTime = 0
        }
    }
    // 
    const [mealData, setMealData] = useState(null);
    const [calories, setCalories] = useState(2000);

    function getMealData() {
        fetch(
            `https://api.spoonacular.com/mealplanner/generate?apiKey=${getApiKey}&timeFrame=day&targetCalories=${calories}`
        )
            .then((response) => response.json())
            .then((data) => {
                setMealData(data);
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status) {
                        changeApiKey()
                    }
                }
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