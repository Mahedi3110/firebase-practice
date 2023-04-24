import React from 'react';
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function Login() {
    const [user, setUser] = useState(null)
    const [error, setError] = useState('')
    const [showPass, setShowPass] = useState(false)
    const emailRef = useRef()
    const auth = getAuth(app);
    const google = new GoogleAuthProvider();
    const github = new GithubAuthProvider();
    const facebook = new FacebookAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, google)
            .then(result => {
                const logInUser = result.user
                setUser(logInUser)
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    const handleGithubSignIn = () => {
        signInWithPopup(auth, github)
            .then(result => {
                const logInUser = result.user
                setUser(logInUser)
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    const handleFacebookSignIn = () => {
        signInWithPopup(auth, facebook)
            .then(result => {
                const logInUser = result.user
                setUser(logInUser)
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        setError('')
        if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)) {
            setError('please input a strong password')
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const logInUser = result.user
                setUser(logInUser)
                setError('')
                // if (logInUser) {
                updateProfile(result.user, { displayName: name })
                    .then(() => {
                        console.log('user name updated');
                    })
                    .catch(error => {
                        setError(error.message)
                    })
                // }
                if (!logInUser.emailVerified) {
                    sendEmailVerification(logInUser)
                        .then(result => {
                            setError('please verify your email')
                        })
                }
                console.log(logInUser);
                event.target.reset()
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message.slice(10, 50))
            })
    }
    const handleSignOut = () => [
        signOut(auth)
            .then(result => {
                setUser(null)
            })
            .catch(error => {
                console.log(error.message);
            })
    ]
    const resetPass = () => {
        const email = emailRef.current.value
        if (!email) {
            setError('please enter your email address in the email input fild')
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setError('please check your email')
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message)
            })
    }
    return (
        <div className="App flex flex-col items-center">
            {
                user ? <button className='btn' onClick={handleSignOut}>Google Sign out</button> :
                    <div>
                        <button className='btn mx-5' onClick={handleGoogleSignIn}>Google Sign in</button>
                        <button className='btn mx-5' onClick={handleGithubSignIn}>Github Sign in</button>
                        <button className='btn mx-5' onClick={handleFacebookSignIn}>Facebook Sign in</button>
                        <form className='flex flex-col items-center mt-10' onSubmit={handleSubmit}>
                            <input className='w-3/5 rounded-lg' ref={emailRef} type="email" name='email' id='email' placeholder='email' required />
                            <input className='w-3/5 rounded-lg' type="text" name='name' id='name' placeholder='name' required />
                            <input className='w-3/5 rounded-lg mt-3' type={showPass ? 'text' : 'password'} name='password' id='password' placeholder='password' required />
                            <div className='mt-4'>
                                {
                                    showPass ? <FontAwesomeIcon className='cursor-pointer' onClick={() => setShowPass(!showPass)} icon={faEye} /> : <FontAwesomeIcon className='cursor-pointer' onClick={() => setShowPass(!showPass)} icon={faEyeSlash} />
                                }
                                {
                                    showPass ? <p className='cursor-pointer underline' onClick={() => setShowPass(!showPass)}>hide password</p> : <p className='cursor-pointer underline' onClick={() => setShowPass(!showPass)}>show password</p>
                                }
                            </div>
                            <input type='submit' value='Register' className='btn mx-5 mt-5' />
                        </form>
                        <p className='text-center mt-5'>{error}</p>
                        <p className='text-center mt-5'>Did you forget password? then you can <span onClick={resetPass} className='text-blue-700 underline cursor-pointer'>reset your password here</span></p>
                    </div>
            }
            <div className='mt-20'>
                {user &&
                    <div>
                        <h1>{user.displayName}</h1>
                        <p>{user.email}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Login;