import { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Regex for email 
const USER_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
// Regex for password that allows upper and lowercase alphabet chars, digits 0-9, some special chars, and is between 8 - 24 chars in length.
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = 'https://gunnicornskateboards.herokuapp.com/api/register'

const Register = () => {
    //Allows us to set the focus on user input when the component loads
    const userRef = useRef()
    //If we get an error this will allow us to put the focus on that so it can be announced by a screen reader for accesibility
    const errRef = useRef()
    const navigate = useNavigate()


    //State tied to user input
    const [email, setEmail] = useState('')
    //Whether the name validates or not
    const [validName, setValidName] = useState(false)
    //Whether we have focus on an input field or not
    const [userFocus, setUserFocus] = useState(false)

    const [password, setPassword] = useState('')
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
        const result = USER_REGEX.test(email)
        console.log(result)
        console.log(email)
        setValidName(result)
    }, [email])

//useEffect for password
    useEffect(() => {
        const result =  PWD_REGEX.test(password)
        console.log(result)
        console.log(password)
        setValidPwd(result)
//Setting whether we have a valid match or not with a boolean:
        const match = password === matchPwd
        setValidMatch(match)
    }, [password, matchPwd])

//Error msg
    useEffect(() => {
        setErrMsg('')
    },[email, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //if button enabled with js hack
        const v1 = USER_REGEX.test(email)
        const v2 = PWD_REGEX.test(password)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return;
        }
        //use axios here to submit to backend 
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({ email, password }),
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: false
            }
        )
        console.log(response.data)
        console.log(response.accessToken)
        console.log(JSON.stringify(response))
        setSuccess(true)
        navigate('/')
        // good place to clear the input fields out of the registration fields.. set state back to empty strings
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server Response')
            } else if (err.response?.status === 409) {
                setErrMsg('User Already Exists')
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
            {/* email input */}
                    <label htmlFor="email">
                        Email:
                        {/* Add fontAwesome icon spans here */}
                    </label>
                    <input
                            type= "text"
                            id= "email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && email && !validName ? "instructions" : "offscreen"}>
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && password && !validPwd ? "instructions" : "offscreen"}>
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
                <a href='/login'>Sign In</a>
            </span>
        </p>
        </section>
    )
}

export default Register