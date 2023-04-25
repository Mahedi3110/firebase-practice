import React, { useContext } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { updateProfile } from "firebase/auth";
import { useState } from 'react';
import { AuthContext } from './provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const Join = () => {
    const { joinByFacebook, joinByGithub, joinByGoogle, logIn, createUser, mailVerification, resetPassword, setLoading } = useContext(AuthContext)

    const passError = () => toast("Confirm password dosen't match.");
    const exist = () => toast("This email address is already exist.");
    const strongPass = () => toast("Please input a strong password.");
    const wrongPass = () => toast("Wrong password. Please try again.");
    const plsVerify = () => toast(<p className='text-center'>Your email is not verified. Please verify your email address first.</p>);

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/home';

    const [showPass1, setShowPass1] = useState(false)
    const [showPass2, setShowPass2] = useState(false)
    const [showPass3, setShowPass3] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [clicked2, setClicked2] = useState(true)
    const [border1, setBorder1] = useState(true)
    const [border2, setBorder2] = useState(true)
    const [border3, setBorder3] = useState(true)

    const passBlur1 = (event) => {
        const pass = event.target.value;
        if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(pass)) {
            strongPass()
            setBorder1(false)
            return;
        }
        else {
            setBorder1(true)
            return
        }
    }

    const handleGoogleSignIn = () => {
        joinByGoogle()
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    const handleGithubSignIn = () => {
        joinByGithub()
            .then(result => {
                console.log(result.user)
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    const handleFacebookSignIn = () => {
        joinByFacebook()
            .then(result => {
                console.log(result.user)
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    const handleSignUp = (event) => {
        setClicked2(true)
        event.preventDefault()
        const email = event.target.email.value;
        const photo = event.target.image.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;
        const fullName = event.target.firstName.value + ' ' + event.target.lastName.value;
        if (confirmPassword !== password) {
            passError()
            setBorder2(false)
            return
        }
        createUser(email, password)
            .then(result => {
                const logInUser = result.user
                // if (logInUser) {
                updateProfile(logInUser, { displayName: fullName, photoURL: photo })
                    .then(() => {
                        console.log('user name updated');
                        if (!logInUser.emailVerified) {
                            mailVerification(logInUser)
                                .then(result => {
                                    // verify()
                                    setLoading(false)
                                    setClicked2(false)
                                })
                        }
                        else {
                            setLoading(false)
                            navigate(from, { replace: true })
                        }
                    })
                    .catch(error => {
                        exist()
                        setLoading(false)
                        console.log(error.message);
                    })
                // }
            })
            .catch(error => {
                exist()
                setLoading(false)
                console.log(error.message);
            })
        setBorder2(true)
    }
    const handleLogin = (event) => {
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        logIn(email, password)
            .then(result => {
                console.log(result.user)
                const logInUser = result.user;
                if (logInUser.emailVerified) {
                    setLoading(false)
                    navigate(from, { replace: true })
                }
                else {
                    plsVerify()
                    setLoading(false)
                }
            })
            .catch(error => {
                console.log(error.message);
                wrongPass()
                setBorder3(false)
            })
    }
    const recoverPassword = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        resetPassword(email)
            .then(() => {
                console.log('check your email');
            })
            .catch(error => {
                console.log(error.message);
            })
        setClicked(true)
    }

    const okay = () => {
        setClicked2(true)
    }
    return (
        <div className='mt-28'>
            <div className="hero min-h-80">
                <div className="hero-content flex-col lg:flex-row-reverse pt-0 w-4/12">
                    <div className="card flex-shrink-0 w-full shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className='relative'>
                                        <input type={showPass1 ? 'text' : 'password'} placeholder="password" name='password' className={border3 ? "input input-bordered w-full border-gray-300" : "input input-bordered w-full border-red-700"} required />
                                        <div className='absolute top-3 right-3'>
                                            {
                                                showPass1 ? <i onClick={() => setShowPass1(!showPass1)} className="fa-regular fa-eye cursor-pointer"></i> : <i onClick={() => setShowPass1(!showPass1)} className="fa-regular fa-eye-slash cursor-pointer"></i>
                                            }
                                        </div>
                                    </div>
                                    <label htmlFor="my-modal-4" className="label label-text-alt link link-hover">Forgot password?</label>
                                </div>
                                <div className="form-control mt-6 flex flex-col items-center">
                                    <button type='submit' className="btn w-full">Login</button>
                                    <p className='ml-2'>Don't have an account? <label htmlFor="my-modal-3" onClick={okay} className="btn modal-button normal-case btn-link">Register here.</label></p>
                                </div>
                            </form>
                            <div className='mt-0 flex flex-col items-center'>
                                <h1>You can also login with this</h1>
                                <div className='mt-2'>
                                    <button onClick={handleGoogleSignIn} className='btn bg-transparent text-black border-0 hover:bg-transparent'><i className="fa-brands fa-google text-3xl"></i></button>
                                    <button onClick={handleFacebookSignIn} className='btn bg-transparent text-black border-0 hover:bg-transparent'><i className="fa-brands fa-facebook text-3xl"></i></button>
                                    <button onClick={handleGithubSignIn} className='btn bg-transparent text-black border-0 hover:bg-transparent'><i className="fa-brands fa-github text-3xl"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className={clicked2 ? "modal-box relative max-w-4xl" : "modal-box relative max-w-md"}>
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {
                        clicked2 ?
                            <div className="hero bg-base-200 w-full">
                                <div className="flex-col lg:flex-row-reverse w-full px-5">
                                    <div className="flex-shrink-0 w-full">
                                        <form onSubmit={handleSignUp}>
                                            <div className='md:grid-cols-2 grid-cols-1 grid'>
                                                <div className='mr-3'>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">First Name</span>
                                                        </label>
                                                        <input type="text" placeholder="first name" name='firstName' className="input input-bordered" required />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Last Name</span>
                                                        </label>
                                                        <input type="text" placeholder="last name" name='lastName' className="input input-bordered" required />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Image</span>
                                                        </label>
                                                        <input type="img" placeholder="image url" name='image' className="input input-bordered pt-2 pl-2" required />
                                                    </div>
                                                </div>
                                                <div className='ml-3'>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Email</span>
                                                        </label>
                                                        <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Password</span>
                                                        </label>
                                                        <div className='relative'>
                                                            <input onBlur={passBlur1} type={showPass2 ? 'text' : 'password'} placeholder="password" name='password' className={border1 ? "input input-bordered w-full border-gray-300" : "input input-bordered w-full border-red-700"} required />
                                                            <div className='absolute top-3 right-3'>
                                                                {
                                                                    showPass2 ? <i onClick={() => setShowPass2(!showPass2)} className="fa-regular fa-eye cursor-pointer"></i> : <i onClick={() => setShowPass2(!showPass2)} className="fa-regular fa-eye-slash cursor-pointer"></i>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Confirm Password</span>
                                                        </label>
                                                        <div className='relative'>
                                                            <input type={showPass3 ? 'text' : 'password'} placeholder="confirm password" name='confirmPassword' className={border2 ? "input input-bordered w-full border-gray-300" : "input input-bordered w-full border-red-700"} required />
                                                            <div className='absolute top-3 right-3'>
                                                                {
                                                                    showPass3 ? <i onClick={() => setShowPass3(!showPass3)} className="fa-regular fa-eye cursor-pointer"></i> : <i onClick={() => setShowPass3(!showPass3)} className="fa-regular fa-eye-slash cursor-pointer"></i>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-control mt-6 modal-action">
                                                <button className="btn w-3/5 mx-auto">Sign Up</button>
                                            </div>
                                        </form>
                                        <div className='mt-5 flex flex-col items-center'>
                                            <h1>You can also sign up with this</h1>
                                            <div className='mt-2'>
                                                <button onClick={handleGoogleSignIn} className='btn bg-transparent text-black border-0 hover:bg-transparent'><i className="fa-brands fa-google text-3xl"></i></button>
                                                <button onClick={handleFacebookSignIn} className='btn bg-transparent text-black border-0 hover:bg-transparent'><i className="fa-brands fa-facebook text-3xl"></i></button>
                                                <button onClick={handleGithubSignIn} className='btn bg-transparent text-black border-0 hover:bg-transparent'><i className="fa-brands fa-github text-3xl"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='flex flex-col items-center mt-5'>
                                <p className='text-center mx-5'>We just sent a verification mail to you. Please check your email and verify your email address.</p>
                                <label htmlFor="my-modal-3" className='btn btn-wide mt-5 mb-2'>Okay</label>
                            </div>
                    }
                </div>
            </div>





            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative max-w-md">
                    <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {
                        clicked ?
                            <div className='flex flex-col items-center'>
                                <p className='text-center mx-5 my-5'>We just send a password recovery mail to you. Check your email and click the link in it. And then set a new password</p>
                                <button onClick={() => setClicked(false)} className='btn'>Send again</button>
                            </div>
                            :
                            <form onSubmit={recoverPassword} className='flex flex-col mt-5 mb-3'>
                                <p className='text-center mx-5 mb-5'>If you forgot your password and want to recover it then put your eamil here and click the submit button</p>
                                <input type="email" id='email' name='email' placeholder='email' className='mx-5 rounded-lg' required />
                                <input type='submit' value='Submit' className='btn mx-5 mt-5' />
                            </form>
                    }
                </div>
            </div>





            <Toaster
                toastOptions={{
                    style: {
                        padding: '16px',
                        boxShadow: '1px 5px 15px 5px grey',
                    },
                }}
            />
        </div >
    );
};

export default Join;