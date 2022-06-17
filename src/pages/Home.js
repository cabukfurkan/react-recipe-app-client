import React, { useEffect, useState } from 'react'
import RandomRecipesList from '../components/RandomRecipesList';

function Home() {
    const [randomRecipes, setRandomRecipes] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=37dfce836f234b8a9c7ba7bb0eb13dd1&number=10`)
                const data = await response.json()

                setRandomRecipes(data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);


    console.log(randomRecipes);
    return (
        <div>
            {randomRecipes && <RandomRecipesList randomRecipes={randomRecipes} />}
        </div>
    )
}

export default Home