import styles from "./Login.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignUp() {

    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    function handleChange({ currentTarget: input }) {
        setData({ ...data, [input.name]: input.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const url = `${SERVER_URL}api/auth`;
            const { data: res } = await axios.post(url, data);
            localStorage.setItem('token', res.data)
            // i sent email to local stroage for be able to fetch aktif users' favoriteids
            localStorage.setItem('email', res.email)
            localStorage.setItem('favoriteRecipeIds', JSON.stringify(res.favoriteRecipeIds))
            window.location = "/"
            console.log(res.message);

        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    }
    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Log In To Your Account</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>New Here</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default SignUp;
