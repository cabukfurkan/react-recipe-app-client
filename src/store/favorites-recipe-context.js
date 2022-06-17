import { createContext, useState } from "react";

const FavoritesContext = createContext({
    favoriteRecipeIds: [],
    addFavorite: (id) => { },
    removeFavorite: (id) => { },
});

export function FavoritesContextProvider({ children }) {
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

    return <FavoritesContext.Provider value={context}>
        {children}
    </FavoritesContext.Provider>

}

export default FavoritesContext