import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FavoriteRecipes from './pages/FavoriteRecipes'
import MealPlanner from './pages/MealPlaner'
import RecipeDetails from './pages/RecipeDetails'
import { FavoritesContextProvider } from './store/favorites-recipe-context'


function App() {
  return (
    <FavoritesContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<MealPlanner />} />
          <Route path='/meal-planner/*' element={<MealPlanner />} />
          <Route path="/meal-planner/:id/*" element={<RecipeDetails />} />
          <Route path='/favorite-recipes' element={<FavoriteRecipes />} />
        </Routes>
      </BrowserRouter>
    </FavoritesContextProvider>
  )
}

export default App