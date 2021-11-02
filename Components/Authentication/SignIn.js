import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {Icon, Layout, Text} from '@ui-kitten/components';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import {useContext, useState} from "react";
import {AnubisContext} from "../State/Context";
import { View} from "react-native";
import { GoogleSocialButton } from "react-native-social-buttons";
import {SafeAreaView} from "react-native";
import OverLogo from "../Assets/OverLogo";
import {TextInput, TouchableOpacity} from "react-native-gesture-handler";
import {Formik} from "formik";
import {login} from "../../databaseConfig/FirebaseHelper";

export const SignIn = ({navigation}) => {
    //write a function to get the users profile to check if they already have data in the database. If so set sign in
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
                    width: 325,
                    height: 420}}>
                    <Formik
                        initialValues={{ email: '' , password: ''}}
                        onSubmit={()=>console.log('Logging In')}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values })=>(
                    <View
                    style = {{flex: 1, justifyContent: 'space-evenly'}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', borderBottomWidth: 2, maxHeight: 25, paddingBottom: 5,
                        borderColor: 'white'}}>
                            <Ionicons name="person-outline" size={24} color="white" style={{flex: 1}}/>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                textAlign={'center'}
                                style= {{flex: 4, fontSize: 18, color: '#ffffff',
                                }}
                                placeholder="Email"
                                placeholderTextColor = '#ffffff'

                            />
                        </View>
                        <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', borderBottomWidth: 2, maxHeight: 25, flex: 1, paddingBottom: 5,
                            borderColor: 'white'}}>
                            <AntDesign name="lock" size={24} color ="white" style={{flex: 1}} />
                            <TextInput
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                textAlign={'center'}
                                style= {{flex:4, fontSize: 18, color: '#ffffff', borderRadius: 30
                                }}
                                placeholder="Password"
                                placeholderTextColor = '#ffffff'
                                textContentType = 'password'

                            />
                        </View>
                        <TouchableOpacity
                            style={{marginTop: 15,
                                backgroundColor:'#C66C3B',
                                borderRadius:30,
                                paddingLeft: 44,
                                paddingRight: 44,
                                paddingTop: 12,
                                paddingBottom: 12,
                                borderColor: '#C66C3B',
                                maxHeight: 50,
                                flex: 1,
                                textAlign: 'center'



                            }}
                            activeOpacity = { .5 }
                            onPress={ handleSubmit }
                        >

                            <Text category= 'h6'> Sign in </Text>

                        </TouchableOpacity>

                    </View>
                        )}
                    </Formik>
                    <View style={{flexDirection: 'row', alignItems: 'center', width: 150}}>
                        <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
                        <View>
                            <Text style={{width: 50, textAlign: 'center', fontSize: 18, color: 'white'}}>or</Text>
                        </View>
                        <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
                    </View>
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
