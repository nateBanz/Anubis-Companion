import React, {useContext, useRef, useState} from 'react';
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";
import {Video} from "expo-av";
import {TouchableOpacity, StyleSheet, View} from "react-native";
import {
    SafeAreaView,
} from 'react-native-safe-area-context';
import OverLogo from "../Assets/OverLogo";
import {Text} from "@ui-kitten/components";
import {GoogleSocialButton} from "react-native-social-buttons";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {login} from "../../databaseConfig/FirebaseHelper";
import {AnubisContext} from "../State/Context";

export const Login = ({navigation}) => {
    const [signIn, setSignIn] = useState(true)
    const { state: { userId }, dispatch } = useContext(AnubisContext)
    const video = useRef(null)
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#ecf0f1',
        },
        video: {
            width: '100%',
            height: '100%',
        },
        buttons: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        normalView: {
            width: '100%',
            height: '100%',
        },
        expandedView: {
            height: 500,
            width: 300,
            padding: 10,
            margin: 4,
        },
        expandedText: {
            marginTop: 10,
            color: 'white',
            fontSize: 18
        },
        activeButton: {
            backgroundColor:'#C66C3B',
            borderRadius:30,
            borderColor: '#C66C3B',
            width: 100,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginLeft: 15,
            marginTop: -50

        },
        hiddenButton : {
            backgroundColor:'#C66C3B25',
            borderRadius:30,
            borderColor: '#C66C3B',
            width: 100,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginLeft: 15,
            marginTop: -50

        },
        text: {

        }
    });

    WebBrowser.maybeCompleteAuthSession();
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '745868178409-mcv36kf4km0nv4e5fhgdsj9m5gom29d0.apps.googleusercontent.com',
    });

    React.useEffect( () => {
        console.log(response)
        if (response?.type === 'success') {
            const { id_token } = response.params;
            console.log('next')
            login(id_token)
                .then((logged) => {
                    if(logged.hasOwnProperty('userId')) {
                        console.log('done')
                        dispatch({userId: logged.userId})
                        if(logged.screenName !== 'SetBattleTagScreen') {
                            dispatch({isSignedIn: true})
                            dispatch({isLoading: true})
                        }
                        else {navigation.navigate(logged.screenName)}

                    }
                })

        }

    }, [response]);
    return (
        // signIn ? <SignIn navigation={navigation} setSignIn = {setSignIn}/> : <SignUp/>
        <SafeAreaView>
            <View style = {styles.normalView}>
                <Video
                    resizeMode= 'cover'
                    ref = {video}
                    isLooping
                    source={require('../Assets/anubisback.mp4')}
                    style = {styles.video}
                    shouldPlay
                    isMuted
                >
                </Video>
                <View style = {{position: 'absolute', top: 50, alignSelf: 'center'}}>
                    <OverLogo/>
                </View>

                <Text style = {{color: 'white', fontSize: 65, position: 'absolute', top: 225, left: 20, fontWeight: 'bold', letterSpacing: 1}}>
                    ANUBIS
                </Text>
                <Text style = {{color: 'white', fontSize: 40, position: 'absolute', top: 330, left: 20, fontWeight: 'bold', letterSpacing: 1}}>
                    The <Text style = {{fontStyle: 'italic',  fontSize: 40, fontWeight: 'bold' }}>Ultimate</Text> Overwatch Companion.
                </Text>

                <TouchableOpacity
                    style={{
                        marginTop: -225,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        padding: 20,
                        width: 350,
                        backgroundColor: '#C66C3B',
                        borderRadius: 30,
                        borderColor: '#FFFFFF',
                        maxHeight: 50,
                        flex: 1,
                        textAlign: 'center'
                    }}x
                    onPress = {()=>(navigation.navigate('SignIn'))}
                    >
                    <Text style = {{color: 'white', fontSize: 15}}> Sign In/Sign Up with Email </Text>

                </TouchableOpacity>

                <View style ={{borderRadius: 20, alignSelf: 'center', marginTop: 10}}>
                    <GoogleSocialButton
                        buttonViewStyle =  {{
                            borderRadius: 20, width: 350
                        }}
                        textStyle = {{fontSize: 15}}
                        disabled={!request}
                        onPress={() => {
                            promptAsync()
                        }}
                        Sign in With Google
                    >
                    </GoogleSocialButton>
                </View>
            </View>
        </SafeAreaView>

    )
}
