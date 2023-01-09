import { useRef, useState, useEffect, useContext } from "react"

import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom"
import Register from './Registration'

const LOGIN_URL = 'localhost:3000/login'

const Login = () => {
    // const { setAuth } = useContext(AuthContext)
    const userRef = useRef()
    const errRef = useRef()
    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    },[user,pwd])

    const handleSubmit = async (e) => {
        e.preventdefault()
        setUser('')
        setPwd('')
        setSuccess(true)
        navigate('localhost:3000')
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="text" 
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required 
                    />
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required 
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        {/* put router link here */}
                        <a href='/register'>Sign Up</a>                     
                    </span>
                </p>
            </section>
            )}
        </>    
    )
}

export default Login
