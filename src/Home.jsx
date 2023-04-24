import React, { useContext } from 'react';
import 'flowbite'
import { AuthContext } from './provider/AuthProvider';

const Home = () => {
    const user = useContext(AuthContext)
    return (
        <div>
            <p>{user && user.displayName}</p>
        </div>
    );
};

export default Home;