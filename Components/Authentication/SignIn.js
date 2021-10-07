import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {Text} from '@ui-kitten/components';
import {useContext, useState} from "react";
import {AnubisContext} from "../State/Context";
import { View} from "react-native";
import { GoogleSocialButton } from "react-native-social-buttons";
import {SafeAreaView} from "react-native";
import OverLogo from "../Assets/OverLogo";

export const SignIn = ({navigation}) => {
const [firstLogIn, setFirstLogIn] = useState(false)
const { state: { userId }, dispatch } = useContext(AnubisContext)

    WebBrowser.maybeCompleteAuthSession();
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
         clientId: '745868178409-mcv36kf4km0nv4e5fhgdsj9m5gom29d0.apps.googleusercontent.com',
    });

    React.useEffect( () => {
        console.log(response)
        if (response?.type === 'success') {
            const { id_token } = response.params;
            fetch('http://192.168.86.58:3000/login/',
                {method: 'POST',
                        body: JSON.stringify({id_token}),
                        headers: {'Content-Type': 'application/json'}})
                .then((response)=> (response.json()))
                .then((logged) => {
                    if(logged.hasOwnProperty('userId')) {
                        console.log('done')
                        dispatch({userId: logged.userId})
                        navigation.navigate(logged.screenName)
                    }
                })

        }

    }, [response]);

    return (
        <SafeAreaView>
            <View style = {{
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: 'transparent',
                marginTop: 5}}>
               <OverLogo
              />
                <Text category='h1'>
                   Anubis
                </Text>
                <Text category='h6'>
                    Overwatch Companion
                </Text>
                <View style = {{
                    borderRadius: 40,
                    marginTop: 12,
                    padding: 12,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#22283d',
                    width: 300,
                    height: 400}}>
                    <View style ={{borderRadius: 20}}>
                        <GoogleSocialButton
                            buttonViewStyle =  {{
                                borderRadius: 40
                            }}
                            disabled={!request}
                            onPress={() => {
                                promptAsync()
                            }}
                            Sign in With Google
                            >
                        </GoogleSocialButton>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
