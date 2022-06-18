import React, { useState } from 'react'
import RandomRecipesList from '../components/RandomRecipesList';
import Navbar from '../layouts/Navbar';
import styles from './Home.module.css'
import { API_KEY } from '../apiKey';

function Home() {
    const [randomRecipes, setRandomRecipes] = useState("");

    function getMealData() {
        fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1`)
            .then((response) => response.json())
            .then((data) => {
                setRandomRecipes(data)
            })
            .catch(() => {
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
                {randomRecipes && <RandomRecipesList randomRecipes={randomRecipes} />}
            </div>
        </div>
    )
}

export default Home