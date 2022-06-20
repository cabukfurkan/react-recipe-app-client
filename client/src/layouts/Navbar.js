import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'
import axios from 'axios';

function Navbar() {
    // async function saveFavsToDb() {
    //     try {
    //         const url = "http://localhost:8080/api/users";
    //         await axios.put(url
    //             , {
    //                 email: localStorage.getItem('email'),
    //                 favoriteRecipeIds: JSON.parse(localStorage.getItem('favoriteRecipeIds'))
    //             }
    //         );

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async function handleLogOut() {
        // await saveFavsToDb()
        localStorage.removeItem('token')
        localStorage.removeItem('favoriteRecipeIds')
        localStorage.removeItem('email')
        window.location.reload()
    }
    return (
        <div className={styles.title_container}>
            <h1 className={styles.title_container_title}>Food Factory</h1>
            <div className={styles.nav_links_container}>
                <Link className={`${styles.nav_link} ${styles.link}`} to='/' >Home</Link>
                <Link className={`${styles.nav_link} ${styles.link}`} to='/meal-planner' >Plan Your meal</Link>
                <Link className={`${styles.nav_link} ${styles.link}`} to='/recipe-finder' >Find Recipe</Link>
                <Link className={`${styles.nav_link} ${styles.link}`} to='/favorite-recipes' >Favorite Recipes</Link>
                <button onClick={handleLogOut}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar