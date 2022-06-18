import React, { useState } from 'react'
import RandomRecipesList from '../components/RandomRecipesList';
import Navbar from '../layouts/Navbar';
import styles from './Home.module.css'

function Home() {
    const [randomRecipes, setRandomRecipes] = useState("");

    function getMealData() {
        fetch(`https://api.spoonacular.com/recipes/random?apiKey=46c9e3436c5e426990bc58ddc541257b&number=10`)
            .then((response) => response.json())
            .then((data) => {
                setRandomRecipes(data)
            })
            .catch(() => {
                console.log("error");
            });
    }
    console.log(randomRecipes);


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