import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'

function Navbar() {
    async function handleLogOut() {
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