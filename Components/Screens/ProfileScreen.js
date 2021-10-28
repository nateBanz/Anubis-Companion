import React, {useContext, useEffect, useState} from 'react';
import {Text} from "react-native";
import {Layout} from "@ui-kitten/components";
import {TextInput, TouchableOpacity} from "react-native-gesture-handler";
import {LoadingScreen} from "./LoadingScreen";
import {Formik} from "formik";
import {View} from "react-native";
import {TopHeaderBar} from "../Assets/TopHeaderBar";
import {SafeAreaView, StyleSheet, ScrollView} from "react-native";
import {AnubisContext} from "../State/Context";

export const ProfileScreen = (props) => {

    function getSecondPart(str) {
        return str.split('-')[1];
    }

    const { state: { userId, isLoading, battleTag }, dispatch } = useContext(AnubisContext)
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


    const profileScreen = StyleSheet.create({
            mainContainer: {
                justifyContent: 'flex-start',
                marginTop: 25,
                marginHorizontal: 0,
                padding: 15,
            },

        })

        //make the card retrieve the image and the text based on the title

        useEffect(()=>{
        }, [])
        return (
            <SafeAreaView style = {{flex: 1}}>
                <View style = {{ alignItems: 'center', justifyContent: 'center'}}>
                    <TopHeaderBar title = 'Profile'></TopHeaderBar>
                </View>

                <ScrollView contentContainerStyle = {profileScreen.mainContainer}>
                    <Text style = {{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                        marginLeft: 10}}>
                        Change/Modify BattleTag
                    </Text>
                    <View style = {{borderColor: 'white',
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 20,
                    marginTop: 20}}>
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
                                    height: '40%',
                                    width: '90%',
                                    borderRadius: 30,
                                    alignItems: 'center',
                                    marginTop: 35,
                                    alignSelf: 'center',
                                    backgroundColor: '#505979'
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
                                    <Text style = {{
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: 'white',
                                        }}> # </Text>
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

                                    <Text style = {{
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: 'white',
                                        marginLeft: 10,
                                        marginTop: 15}}>
                                        Note: This will reload all your values and suggestions :)
                                    </Text>
                                    <TouchableOpacity
                                        style={{marginTop: 18,
                                            backgroundColor:'#C66C3B',
                                            borderRadius:30,
                                            alignItems: 'center',
                                            borderColor: '#C66C3B',
                                            paddingVertical: 10,
                                            width: '40%',
                                            alignSelf: 'center'
                                        }}
                                        activeOpacity = { .5 }
                                        onPress={ handleSubmit }
                                    >

                                        <Text style = {{
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            color: 'white',
                                            }}> Apply </Text>

                                    </TouchableOpacity>

                                    {isLoading && <LoadingScreen/>}
                                    {error && Error(errorMessage) }
                                </Layout>


                            </>

                        )}
                    </Formik>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }


