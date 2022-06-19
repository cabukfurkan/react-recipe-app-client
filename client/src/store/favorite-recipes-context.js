import { createContext, useState } from "react";

const FavoriteRecipesContext = createContext({
    favoriteRecipeIds: [],
    addFavorite: (id) => { },
    removeFavorite: (id) => { },
});

export function FavoriteRecipesContextProvider({ children }) {
    const [favoriteRecipeIds, setFavoriteRecipeIds] = useState([])

    function addFavoriteHandler(id) {
        setFavoriteRecipeIds((prevUserFavorites) => {
            return prevUserFavorites.concat(id)
        })
    }
    function removeFavoriteHandler(id) {
        setFavoriteRecipeIds(
            favoriteRecipeIds.filter((recipeId) => recipeId !== id)
        );
    }


    const context = {
        favoriteRecipeIds: favoriteRecipeIds,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler
    }

    return <FavoriteRecipesContext.Provider value={context}>
        {children}
    </FavoriteRecipesContext.Provider>

}

export default FavoriteRecipesContext