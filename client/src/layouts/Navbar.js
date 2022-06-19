import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'


function Navbar() {

    function handleLogOut() {
        localStorage.removeItem('token')
        window.location.reload()
    }
    return (
        <div className={styles.title_container}>
            <h1 className={styles.title_container_title}>Food Factory</h1>
            <div className={styles.nav}>
                <Link className={styles.nav_link} to='/' >Home</Link>
                <Link className={styles.nav_link} to='/meal-planner' >Plan Your meal</Link>
                <Link className={styles.nav_link} to='/recipe-finder' >Find Recipe</Link>
                <Link className={styles.nav_link} to='/favorite-recipes' >Favorite Recipes</Link>
                <button onClick={handleLogOut}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar