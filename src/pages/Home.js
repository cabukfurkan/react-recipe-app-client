import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { apiCallTime, apiKeys } from '../apiKeys';
import RandomRecipesList from '../components/RandomRecipesList';
import Navbar from '../layouts/Navbar';
import { UpdateApiKey } from '../store/action/updateApi';
import styles from './Home.module.css'

function Home() {

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


    const [recipes, setRecipes] = useState("");

    function getMealData() {
        fetch(`https://api.spoonacular.com/recipes/random?apiKey=${getApiKey}&number=1`)
            .then((response) => response.json())
            .then((data) => {
                setRecipes(data)
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


    return (
        <div className={styles.body_container}>
            <Navbar />
            <section className={styles.controls}>
                <button onClick={getMealData}>Get Random Recipes</button>
            </section>

            <div className={styles.randomRecipes_container}>
                {recipes && <RandomRecipesList recipes={recipes} />}
            </div>
        </div>
    )
}

export default Home