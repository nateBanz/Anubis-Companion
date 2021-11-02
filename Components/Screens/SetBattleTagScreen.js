import React, {useContext, useState} from 'react';
import {View, Button} from "react-native";
import OverLogo from "../Assets/OverLogo";
import {GoogleLoginButton} from "react-social-login-buttons";
import {
    SafeAreaView,
} from 'react-native-safe-area-context';
import { Layout, Text} from "@ui-kitten/components";
import { Formik } from 'formik';
import {TextInput, TouchableOpacity} from "react-native-gesture-handler";
import {AnubisContext} from "../State/Context";
import {LoadingScreen} from "./LoadingScreen";

export const SetBattleTagScreen = () => {
    const { state: { userId, isLoading }, dispatch } = useContext(AnubisContext)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

   //if error, return error on this screen
    let Error = (message) => {
        dispatch({isLoading: false})
        return (
            <Text style = {{color: 'red'}}>
                {message + ' Try Again!'}
            </Text>
        )
    }

    return (

        <SafeAreaView>
            <Layout style = {{
                alignItems: 'center',
                flexDirection: 'column',
                padding: 15,
                height: '100%',
                justifyContent: 'flex-start'
            }}>

                <Text category='h3'>
                    Add your Blizzard BattleTag!
                </Text>

                <Formik
                    initialValues={{ name: '' , number: ''}}
                    onSubmit={values => {
                        dispatch({isLoading: true});
                        let fullTag = values.name + '-' + values.number;
                        console.log(fullTag);
                        fetch('https://anubis-companion.herokuapp.com/login/python/',
                            {method: 'POST',
                                body: JSON.stringify({fullTag, userId}),
                                headers: {'Content-Type': 'application/json'}})
                            .then((res) => res.json())
                            .catch(err => console.log(err))
                            .then(
                                (final) => {
                                if(final.hasOwnProperty('error')) {
                                    setError(true)
                                    setErrorMessage(final.error)
                                }
                                else {
                                    setError(false)
                                    dispatch({isSignedIn: true})
                                    dispatch({battleTag: fullTag });
                                    dispatch ({rankings: JSON.parse(final[0])});
                                    dispatch({suggestedRanking: JSON.parse(final[1]) });
                                    dispatch({topThreeStats: JSON.parse(final[2]) });
                                    dispatch({bottomThreeStats: JSON.parse(final[3]) })}
                                    dispatch({isLoading: false})

                                 })
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <>
                            <Layout style = {{
                                elevation: 4,
                                shadowColor: 'black',
                                shadowOpacity: 0.2,
                                shadowOffsetY: 4,
                                shadowOffsetX: 0,
                                flexDirection: 'row',
                                height: '15%',
                                width: '100%',
                                borderRadius: 30,
                                alignItems: 'center',
                                marginTop: 35
                                }}
                            >
                                <TextInput
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    textAlign={'center'}
                                    style= {{flex: 1, fontSize: 18, color: '#ffffff',
                                        }}
                                    placeholder="Stylosa"
                                    placeholderTextColor = '#ffffff'

                            />
                                <Text category= 'h5'> # </Text>
                                <TextInput
                                    onChangeText={handleChange('number')}
                                    onBlur={handleBlur('number')}
                                    value={values.number}
                                    textAlign={'center'}
                                    style= {{flex: 1, fontSize: 18, color: '#ffffff',
                                    }}
                                    placeholder="1289"
                                    keyboardType="numeric"
                                    placeholderTextColor = '#ffffff'

                        />

                            </Layout>
                            <Layout style ={{borderRadius: 30, flex: 1}}>

                                <TouchableOpacity
                                    style={{marginTop: 18,
                                        backgroundColor:'#C66C3B',
                                        borderRadius:30,
                                        paddingLeft: 44,
                                        paddingRight: 44,
                                        paddingTop: 12,
                                        paddingBottom: 12,
                                        borderColor: '#C66C3B',





                                    }}
                                    activeOpacity = { .5 }
                                    onPress={ handleSubmit }
                                >

                                    <Text category= 'h6'> Next </Text>

                                </TouchableOpacity>

                                {isLoading && <LoadingScreen/>}
                                {error && Error(errorMessage) }
                            </Layout>


                        </>

                    )}
                </Formik>


            </Layout>
        </SafeAreaView>

    )
}
