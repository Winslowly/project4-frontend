import { useRef, useState, useEffect } from 'react'
import './index.css'
import axios from './api/axios'

// Regex for username that expects an alphabetic char for the first char followed by upper and lowercase chars, 0-9, and hyphens and underscores between 3 and 23 characters in length.
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
// Regex for password that allows upper and lowercase alphabet chars, digits 0-9, some special chars, and is between 8 - 24 chars in length.
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = '/register'

const Register = () => {
    //Allows us to set the focus on user input when the component loads
    const userRef = useRef()
    //If we get an error this will allow us to put the focus on that so it can be announced by a screen reader for accesibility
    const errRef = useRef()


    //State tied to user input
    const [user, setUser] = useState('')
    //Whether the name validates or not
    const [validName, setValidName] = useState(false)
    //Whether we have focus on an input field or not
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    //state for a possible error message if an error exists
    const [errMsg, setErrMsg] = useState('')
    //state for a successful submission
    const [success, setSuccess] = useState(false)
    
    useEffect(() => {
        userRef.current.focus()
    }, [])

//This is where we validate the username
    useEffect(() => {
        const result = USER_REGEX.test(user)
        console.log(result)
        console.log(user)
        setValidName(result)
    }, [user])

//useEffect for password
    useEffect(() => {
        const result =  PWD_REGEX.test(pwd)
        console.log(result)
        console.log(pwd)
        setValidPwd(result)
//Setting whether we have a valid match or not with a boolean:
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

//Error msg
    useEffect(() => {
        setErrMsg('')
    },[user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //if button enabled with js hack
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return;
        }
        //use axios here to submit to backend 
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({ user, pwd }),
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            }
        )
        console.log(response.data)
        console.log(response.accessToken)
        console.log(JSON.stringify(response))
        setSuccess(true)
        // good place to clear the input fields out of the registration fields.. set state back to empty strings
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server Response')
            } else if (err.response?.status === 409) {
                setErrMsg('Username Already Exists')
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus()
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
            {/* username input */}
                    <label htmlFor="username">
                        Username:
                        {/* Add fontAwesome icon spans here */}
                    </label>
                    <input
                            type= "text"
                            id= "username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    {/* fontawesome icon here */}
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                    </p>

            {/* password input */}
                    <label htmlFor="password">
                        Password:
                        {/* Add fontAwesome icon spans here */}
                    </label>
                    <input
                            type= "password"
                            id= "password"
                            ref={userRef}
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && user && !validPwd ? "instructions" : "offscreen"}>
                    {/* fontawesome icon here */}
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number, and a special character.<br />
                    Allowed special characters: <span arial-label="exclamation mark">!</span><span aria-label='at symbol'>@</span>
                    <span aria-label='hashtag'>#</span><span aria-label='dollar sign'>$</span><span aria-label='percent'>%</span>
                    </p>

            {/* confirm password */}
                <label htmlFor="confirm_pwd">
                    Confirm Password:
                {/* Add fontAwesome icon spans here */}
                </label>
                <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    {/* fontawesome icon here */}
                    Must match the first password input field.
                </p>
                <button disabled={!validName || !validPwd || !validMatch ? true : false}> Sign Up</button>
        </form>
        <p>
            Already Registered?<br />
            <span className='line'>
                {/*put router link here*/}
                <a href="#">Sign In</a>
            </span>
        </p>
        </section>
    )
}

export default Register