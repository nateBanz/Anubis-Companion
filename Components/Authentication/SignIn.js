import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from '@ui-kitten/components';
import {auth} from "../../Firebase"
import {useContext, useState} from "react";
import Firebase from "../../Firebase";
import {AnubisContext} from "../State/Context";

export const SignIn = ({navigation}) => {
const [firstLogIn, setFirstLogIn] = useState(false)
const { state: { userId }, dispatch } = useContext(AnubisContext)

    // function isUserEqual(googleUser, firebaseUser) {
    //     if (firebaseUser) {
    //         const providerData = firebaseUser.providerData;
    //         for (let i = 0; i < providerData.length; i++) {
    //             if (providerData[i].providerId === auth.GoogleAuthProvider.PROVIDER_ID &&
    //                 providerData[i].uid === googleUser.getBasicProfile().getId()) {
    //                 // We don't need to reauth the Firebase connection.
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }
    // function isLoggedIn() {
    //     Firebase.auth().onAuthStateChanged(
    //         function (user) {
    //             if(user && !firstLogIn) {
    //                 navigation.navigate('RankingScreen')
    //             }
    //             else if(user && firstLogIn) {
    //                 navigation.navigate('ProfileScreen')
    //             }
    //         }
    //     )
    // }
    //
    // function addUserToFirebase(result) {
    //     console.log('user signed in')
    //     if(result.additionalUserInfo.isNewUser) {
    //         setFirstLogIn(true)
    //         Firebase.firebase.database().ref('/users/' + result.user.uid).set(
    //             {email: result.user.email}
    //         )
    //     }
    //
    // }
    //
    // function onSignIn(googleUser) {
    //
    //
    //     console.log('Google Auth Response', googleUser);
    //     console.log(Firebase)
    //     console.log(auth)
    //     // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    //     let unsubscribe = Firebase.auth().onAuthStateChanged((firebaseUser) => {
    //         unsubscribe();
    //         // Check if we are already signed-in Firebase with the correct user.
    //         if (!isUserEqual(googleUser, firebaseUser)) {
    //             // Build Firebase credential with the Google ID token.
    //             let credential = auth.GoogleAuthProvider.credential(
    //                 googleUser);
    //
    //             // Sign in with credential from the Google user.
    //             auth.signInWithCredential(credential)
    //                 .then((res)=>addUserToFirebase(res))
    //                 .catch((error) => {
    //                 // Handle Errors here.
    //                 var errorCode = error.code;
    //                 var errorMessage = error.message;
    //                 // The email of the user's account used.
    //                 var email = error.email;
    //                 // The firebase.auth.AuthCredential type that was used.
    //                 var credential = error.credential;
    //                 // ...
    //             });
    //         } else {
    //             console.log('User already signed-in Firebase.');
    //         }
    //     });
    // }
    WebBrowser.maybeCompleteAuthSession();
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
         clientId: '745868178409-n9rumve2sv91q2abjh5da4k6jf3n0871.apps.googleusercontent.com',
    });

    React.useEffect( () => {
        console.log(response)
        if (response?.type === 'success') {
            const { id_token } = response.params;
            fetch('http://localhost:3000/login',
                {method: 'POST',
                        body: JSON.stringify({id_token}),
                        headers: {'Content-Type': 'application/json'}})
                .then((response)=> (response.json()))
                .then((logged) => {
                    if(logged.hasOwnProperty('userId')) {
                        dispatch({userId: logged.userId})
                        navigation.navigate(logged.screenName)
                    }
                })

            // if(re.hasOwnProperty('userId')){
            //     console.log(re)
            // }
        }

    }, [response]);

    return (
        <Button
            disabled={!request}
            onPress={() => {
                promptAsync()
            }}
            >Login
        </Button>
    );
}
