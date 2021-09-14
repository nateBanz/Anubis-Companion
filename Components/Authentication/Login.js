import React, {useState} from 'react';
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";

export const Login = (props) => {
    const [signIn, setSignIn] = useState(true)
    return (
        signIn ? <SignIn setSignIn = {setSignIn}/> : <SignUp/>

    )
}
