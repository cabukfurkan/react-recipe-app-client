import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FavoriteRecipes from './pages/FavoriteRecipes'
import Home from './pages/Home'
import MealPlanner from './pages/MealPlaner'
import RecipeDetails from './pages/RecipeDetails'
import RecipeFinder from './pages/RecipeFinder'
import { FavoriteRecipesContextProvider } from './store/favorite-recipes-context'


function App() {
  return (
    <FavoriteRecipesContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/meal-planner' element={<MealPlanner />} />
          <Route path='/favorite-recipes' element={<FavoriteRecipes />} />
          <Route path='/recipe-finder' element={<RecipeFinder />} />
          <Route path='/recipe-finder/:id/*' element={<RecipeDetails />} />
        </Routes>
      </BrowserRouter>
    </FavoriteRecipesContextProvider>
  )
}

export default App