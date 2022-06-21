import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import FavoriteRecipes from './pages/FavoriteRecipes'
import Home from './pages/Home'
import MealPlanner from './pages/MealPlaner'
import RecipeDetails from './pages/RecipeDetails'
import RecipeFinder from './pages/RecipeFinder'
import { FavoriteRecipesContextProvider } from './store/favorite-recipes-context'
import SignUp from './components/signup/SignUp'
import Login from './components/login/Login'

function App() {
  const user = localStorage.getItem('token')
  return (
    <FavoriteRecipesContextProvider>
      <BrowserRouter>
        <Routes>
          {user && <Route path='/*' exact element={<Home />} />}
          {user && <Route path='/meal-planner' element={<MealPlanner />} />}
          {user && <Route path='/favorite-recipes' element={<FavoriteRecipes />} />}
          {user && <Route path='/recipe-finder' element={<RecipeFinder />} />}
          {user && <Route path='/recipe-finder/:id/*' element={<RecipeDetails />} />}

          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/*" exact element={<Navigate replace to="/login" />} />
        </Routes>
      </BrowserRouter>
    </FavoriteRecipesContextProvider>
  )
}

export default App