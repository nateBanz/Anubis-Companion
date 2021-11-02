import React, {useContext, useEffect, useRef, useState} from 'react';
import {Text} from "react-native";
import {Button, Layout} from "@ui-kitten/components";
import {TextInput, TouchableOpacity} from "react-native-gesture-handler";
import {LoadingScreen} from "./LoadingScreen";
import {Formik} from "formik";
import {View} from "react-native";
import {TopHeaderBar} from "../Assets/TopHeaderBar";
import { StyleSheet, ScrollView} from "react-native";
import {
    SafeAreaView,
} from 'react-native-safe-area-context';
import {AnubisContext} from "../State/Context";
import {FeedbackFish} from "@feedback-fish/react";
import Animated from "react-native-reanimated";


export const ProfileScreen = (props) => {
    const { state: { userId, isLoading, battleTag, error }, dispatch } = useContext(AnubisContext)
    const [val, setVal] = useState(null)
    const errRef = useRef(null);
    // function setter(values) {
    //         dispatch({isLoading: true});
    //         let fullTag = values.name + '-' + values.number;
    //         // for some weird reason, this is broken as well. Will look into further after testing
    //         // setVal(fullTag)
    // }


    function getSecondPart(str) {
        return str.split('-')[1];
    }

    function setter(values) {
        let full = values.name + '-' + values.number
        console.log(full)
        setVal(full)
    }


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
                marginTop: 25,
                marginHorizontal: 0,
                padding: 15,
                height: '90%'
            },

        })

        //make the card retrieve the image and the text based on the title

        useEffect(()=>{
            console.log(val)
            if(val) {
                dispatch({isLoading: true})
                let fullTag = val
                fetch('https://anubis-companion.herokuapp.com/login/python/',
                    {
                        method: 'POST',
                        body: JSON.stringify({fullTag, userId}),
                        headers: {'Content-Type': 'application/json'}
                    })
                    .then((res) => res.json())
                    .catch(err => console.log('error'))
                    .then(
                        (final) => {
                            if (final && final.hasOwnProperty('error')) {
                                console.log(final.error)
                                errRef.current = final.error
                                console.log('set')

                            } else {
                                dispatch({error: null})
                                dispatch({isSignedIn: true})
                                dispatch({battleTag: fullTag});
                                dispatch({rankings: JSON.parse(final[0])});
                                dispatch({suggestedRanking: JSON.parse(final[1])});
                                dispatch({topThreeStats: JSON.parse(final[2])});
                                dispatch({bottomThreeStats: JSON.parse(final[3])})
                            }
                            dispatch({isLoading: false})

                        })
            }

        }, [val])

    //this is broken for now
        return (
            <SafeAreaView style = {{flexGrow: 1}}>
                <View style = {{ alignItems: 'center', justifyContent: 'center'}}>
                    <TopHeaderBar title = 'Profile'></TopHeaderBar>
                </View>

                <ScrollView contentContainerStyle = {profileScreen.mainContainer} overScrollMode = 'always'>
                    <View>
                    <Text style = {{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                        marginLeft: 10}}>
                        Change/Modify BattleTag
                    </Text>
                    <View style = {{
                    borderColor: 'white',
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 20,
                    marginTop: 15,
                    height: '40%' }}>
                    <Formik
                        initialValues={{ name: '' , number: ''}}
                        onSubmit={(values => setter(values))}>
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
                                    marginTop: 15,
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
                                        onPress={ handleSubmit}
                                    >

                                        <Text style = {{
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            color: 'white',
                                            }}> Apply </Text>

                                    </TouchableOpacity>
                                    {isLoading && <LoadingScreen/>}
                                    {errRef.current &&
                                    <View style = {{alignSelf: 'center', padding: 1}}>
                                        <Text style = {{color: 'red', fontWeight: 'bold'}}>
                                        {errRef.current + ' Try Again!'}
                                    </Text></View> }
                                </Layout>


                            </>

                        )}
                    </Formik>
                        {/*{err && <Error message = {err}/>}*/}
                    </View>

                    <Text style = {{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                    alignSelf: 'center',
                    marginTop: 20}}>
                        Feedback!
                    </Text>
                    <View style = {{
                        padding: 5,
                        borderRadius: 20,
                        height: '30%'}}>
                        <Formik
                            initialValues={{ text: ''}}
                            onSubmit={()=> {console.log('submitted')}}>
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <>
                                    <Layout style = {{
                                        borderRadius: 30,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                    }}
                                    >
                                        <TextInput
                                            multiline
                                            numberOfLines={4}
                                            onChangeText={handleChange('text')}
                                            onBlur={handleBlur('text')}
                                            value={values.text}
                                            textAlign={'center'}
                                            style= {{flex: 1, fontSize: 15, color: '#ffffff', backgroundColor: '#505979', padding: 15, borderRadius: 30
                                            }}
                                            placeholder="Let me know if you have any issues or ideas!"
                                            placeholderTextColor = '#ffffff'

                                        />

                                        <TouchableOpacity
                                            style={{marginTop: 0,
                                                backgroundColor:'#C66C3B',
                                                borderRadius:30,
                                                alignItems: 'center',
                                                borderColor: '#C66C3B',
                                                paddingVertical: 10,
                                                width: 100,
                                                alignSelf: 'center',
                                            }}
                                            activeOpacity = { .5 }
                                            onPress={ () => fetch('https://api.feedback.fish/feedback', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    projectId: "8b74890d826155",
                                                    text: values.text,
                                                    category: "other", // Either "issue", "idea" or "other",
                                                    userId: userId,
                                                    metadata: {},
                                                })
                                            })
                                            }
                                        >

                                            <Text style = {{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                color: 'white',
                                            }}> Submit </Text>

                                        </TouchableOpacity>

                                    </Layout>


                                </>

                            )}
                        </Formik>
                    </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }


