import { useRef, useState, useEffect, useContext } from "react"

import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom"
import { UserInfoContext } from "../context/UserInfoContext"


const LOGIN_URL = 'https://gunnicornskateboards.herokuapp.com/api/login'

const Login = () => {
    const {userData, setUserData} = useContext(UserInfoContext)
    const userRef = useRef()
    const errRef = useRef()
    const navigate = useNavigate()
    const [email, setUser] = useState('')
    const [password, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    },[email,password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // axios.put(LOGIN_URL, {email, password})
        // .then((response) => {setUserData(response.data)})
        try {
            const response = await axios.put(LOGIN_URL, JSON.stringify({ email, password }),{
                headers: {'Content-Type': 'application/json'},
                withCredentials: false
            })
            .then((response) => setUserData(response.data))
        // console.log(response.data)
        setUser('')
        setPwd('')
        setSuccess(true)
        // navigate('/')

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server Response')
            } else if (err.response?.status === 401) {
                setErrMsg('Incorrect Login Credentials')
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus()

        }
        console.log(userData)
    }
// console.log(UserInfoContext)
    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="/">Go to Home</a>
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
                        value={email}
                        required 
                    />
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={password}
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

