import React from 'react'
import { useState } from 'react'
import Navbar from '../layouts/Navbar'
import FoundRecipeList from '../components/FoundRecipeList'
import styles from './RecipeFinder.module.css'

function RecipeFinder() {
    const [recipes, setRecipes] = useState(null)
    const [searchValue, setSearchValue] = useState('')

    const API_KEY = process.env.REACT_APP_API_KEY

    function getMealData() {
        fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=1&query=${searchValue}`
        )
            .then((response) => response.json())
            .then((data) => {
                setRecipes(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function handleChange(e) {
        setSearchValue(e.target.value);
    }

    return (
        <div className={styles.body_container}>
            <Navbar />
            <div className={styles.mealPlanner_container}>
                <section className={styles.controls}>
                    <input
                        type="text"
                        placeholder="name, ingredients etc"
                        onChange={handleChange}
                    />
                    <button onClick={getMealData}>Search Recipe</button>
                </section>
                {recipes && <FoundRecipeList recipes={recipes} />}
            </div>
        </div>
    )
}

export default RecipeFinder