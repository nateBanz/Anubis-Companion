import React, {useState} from 'react';
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";

export const Login = ({navigation}) => {
    const [signIn, setSignIn] = useState(true)
    return (
        signIn ? <SignIn navigation={navigation} setSignIn = {setSignIn}/> : <SignUp/>

    )
}
