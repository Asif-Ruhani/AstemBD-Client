import React from 'react';
import useAuth from '../Hooks/useAuth';

const SimpleButton = () => {
    const {userLogout} = useAuth();
    const handlesomething = () => {
        userLogout()
        .then(()=>{
            console.log("logout successful")
        })
        .catch(error=>{
            console.log(error);
        })
    };

    return (
        <div>
            <button onClick={handlesomething}>
                Click Me
            </button>
        </div>
    );
};

export default SimpleButton;