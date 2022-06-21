import { createContext, useState } from "react";
import axios from "axios";

const FavoriteRecipesContext = createContext({
    favoriteRecipeIds: [],
    addFavorite: (id) => { },
    removeFavorite: (id) => { },
});

export function FavoriteRecipesContextProvider({ children }) {
    const [favoriteRecipeIds, setFavoriteRecipeIds] = useState(JSON.parse(localStorage.getItem('favoriteRecipeIds')))

    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    const updateFavListDB = async (favoriteRecipeIds) => {
        try {
            const url = `${SERVER_URL}api/updateFav`;
            await axios.put(url, {
                email: localStorage.getItem('email'),
                favoriteRecipeIds: favoriteRecipeIds
            });
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

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

    localStorage.setItem('favoriteRecipeIds', JSON.stringify(favoriteRecipeIds))
    updateFavListDB(favoriteRecipeIds)

    return <FavoriteRecipesContext.Provider value={context}>
        {children}
    </FavoriteRecipesContext.Provider>

}

export default FavoriteRecipesContext