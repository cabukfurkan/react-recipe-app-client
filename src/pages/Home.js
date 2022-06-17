import React, { useEffect, useState } from 'react'
import RandomRecipesList from '../components/RandomRecipesList';
import Navbar from '../layouts/Navbar';
import styles from './Home.module.css'

function Home() {
    const [randomRecipes, setRandomRecipes] = useState("");

    useEffect(() => {
        try {
            const response = fetch(`https://api.spoonacular.com/recipes/random?apiKey=d835eda74cff40828b203c1ee564e1cf&number=10`)
            const data = response.json()

            setRandomRecipes(data);
        } catch (error) {
            console.log(error);
        }
    }, []);


    return (
        <div className={styles.Home_container}>
            <Navbar />
            <div className={styles.randomRecipes_container}>
                {randomRecipes && <RandomRecipesList randomRecipes={randomRecipes} />}
            </div>
        </div>
    )
}

export default Home