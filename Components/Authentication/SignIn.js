import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {Icon, Layout, } from '@ui-kitten/components';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import {useContext, useState} from "react";
import {AnubisContext} from "../State/Context";
import { View,TextInput,Text} from "react-native";
import { GoogleSocialButton } from "react-native-social-buttons";
import {
    SafeAreaView,
} from 'react-native-safe-area-context';
import OverLogo from "../Assets/OverLogo";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Formik} from "formik";
import {login} from "../../databaseConfig/FirebaseHelper";

export const SignIn = ({navigation}) => {
    //write a function to get the users profile to check if they already have data in the database. If so set sign in
const [firstLogIn, setFirstLogIn] = useState(false)
const { state: { userId }, dispatch } = useContext(AnubisContext)


    return (
        <SafeAreaView>
            <View style = {{
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: 'transparent',
                marginTop: 5}}>

                <View style = {{
                    borderRadius: 40,
                    marginTop: 50,
                    padding: 15,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#22283d',
                    width: 400,
                    height: 500}}>
                    <Text style = {{ fontWeight: 'bold', letterSpacing: 1, fontSize: 28, color: '#ffffff'}}>Sign In/Register</Text>
                    <Formik
                        initialValues={{ email: '' , password: ''}}
                        onSubmit={(values)=>console.log('hello')}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values })=>(
                    <View
                    style = {{flex: 1, justifyContent: 'space-evenly'}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, maxHeight: 25, paddingBottom: 5,
                        borderColor: 'white', width: 340}}>
                            <Ionicons name="person-outline" size={24} color="white" style={{flex: 1}}/>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                textAlign={'center'}
                                style= {{flex: 11, fontSize: 18, color: '#ffffff',
                                }}
                                placeholder="Enter Email"
                                placeholderTextColor = '#ffffff'
                                keyboardType="default"
                                autoCapitalize={'none'}

                            />
                        </View>
                        <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 2, maxHeight: 25, paddingBottom: 5,
                            borderColor: 'white'}}>
                            <AntDesign name="lock" size={24} color ="white" style={{flex: 1}} />
                            <TextInput
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                textAlign={'center'}
                                style= {{flex:11, fontSize: 18, color: '#ffffff', borderRadius: 30
                                }}
                                placeholder="Enter Password"
                                placeholderTextColor = '#ffffff'
                                secureTextEntry={true}
                                keyboardType="default"
                                autoCapitalize={'none'}

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
                            onPress={ () =>login(null, values.email, values.password, false ).
                            then((logged) => {
                                if(logged.hasOwnProperty('userId')) {
                                    console.log('done')
                                    dispatch({userId: logged.userId})
                                    if(logged.screenName !== 'SetBattleTagScreen') {
                                        dispatch({isSignedIn: true})
                                        dispatch({isLoading: true})
                                    }
                                    else {navigation.navigate(logged.screenName)}

                                }
                            })}
                        >

                            <Text style={{alignSelf: 'center', fontSize: 15, color: 'white'}}> Sign in </Text>


                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{marginTop: -30,
                                backgroundColor:'#C66C3B00',
                                borderWidth: 1,
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
                            onPress={ ()=>login(null, values.email, values.password, true ).
                            then((logged) => {
                                if(logged.hasOwnProperty('userId')) {
                                    console.log('done')
                                    dispatch({userId: logged.userId})
                                    if(logged.screenName !== 'SetBattleTagScreen') {
                                        dispatch({isSignedIn: true})
                                        dispatch({isLoading: true})
                                    }
                                    else {navigation.navigate(logged.screenName)}

                                }
                            }) }
                        >

                            <Text style = {{color: '#C66C3B', alignSelf: 'center', fontSize: 15}}> Register </Text>

                        </TouchableOpacity>

                    </View>
                        )}
                    </Formik>
                </View>
            </View>
        </SafeAreaView>
    );
}
