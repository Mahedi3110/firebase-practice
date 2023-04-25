import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Header = () => {
    const { user, loading, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 shadow-lg">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:p-2 p-4">
                    <Link to="/" className="flex items-center md:p-2">
                        {/* <img src="../../public/All Images/JH.png" className="h-10 mr-1" alt="Job Hunter Logo" /> */}
                        <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white">Job Hunter</span>
                    </Link>
                    <div className="flex md:order-2 md:p-2">
                        <button type="button" className="btn normal-case text-white bg-gradient-to-r from-cyan-500 to-blue-500 border-0 hover:bg-blue-800 font-bold rounded-lg px-6 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-lg">Star Applying</button>
                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 md:p-2" id="navbar-sticky">
                        <ul className="flex flex-col items-center p-4 md:p-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'text-blue-700 mx-5' : 'mx-5 hover:text-blue-500'} to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'text-blue-700 mx-5' : 'mx-5 hover:text-blue-500'} to="/user">User</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'text-blue-700 mx-5' : 'mx-5 hover:text-blue-500'} to="/order">Order</NavLink>
                            </li>
                            <li>
                                {loading ? <p className='mx-5'>Loading...</p> :
                                    user?.emailVerified ? <div className='flex items-center'>
                                        <NavLink className={({ isActive }) => isActive ? 'text-blue-700 mx-5' : 'mx-5 hover:text-blue-500'} to="/profile">Profile</NavLink>
                                        <i onClick={handleLogOut} className="fa-solid fa-right-from-bracket text-3xl cursor-pointer"></i>
                                    </div> :
                                        <NavLink className={({ isActive }) => isActive ? 'text-blue-700 mx-5' : 'mx-5 hover:text-blue-500'} to="/join">Join</NavLink>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;