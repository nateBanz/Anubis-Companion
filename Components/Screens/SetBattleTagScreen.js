import React, {useState} from 'react';
import {View, Button} from "react-native";
import OverLogo from "../Assets/OverLogo";
import {GoogleLoginButton} from "react-social-login-buttons";
import {SafeAreaView} from "react-native";
import { Layout, Text} from "@ui-kitten/components";
import { Formik } from 'formik';
import {TextInput, TouchableOpacity} from "react-native-gesture-handler";

export const SetBattleTagScreen = () => {

    return (
        <SafeAreaView>
            <Layout style = {{
                alignItems: 'center',
                flexDirection: 'column',
                padding: 15,
                height: '100%',
                flex: 1,
                justifyContent: 'space-between'
                }}>

                <Text category='h1'>
                    Add your Blizzard BattleTag!
                </Text>

                    <Formik
                        initialValues={{ name: '' , number: ''}}
                        onSubmit={values => { let fullTag = values.name + '-' + values.number;
                        fetch('http://192.168.86.58:3000/login/python/',
                            {method: 'POST',
                                body: JSON.stringify({fullTag}),
                                headers: {'Content-Type': 'application/json'}}).
                        then((res) => res.json()).
                        then(final => console.log(final))
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <>
                            <Layout style = {{
                                elevation: 5,
                                shadowColor: 'black',
                                shadowOpacity: 0.2,
                                flexDirection: 'row',
                                marginTop: 20}}
                            >
                                <TextInput
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    textAlign={'center'}
                                />
                                <Text category= 'h3'> # </Text>
                                <TextInput
                                    onChangeText={handleChange('number')}
                                    onBlur={handleBlur('number')}
                                    value={values.number}
                                    textAlign={'center'}
                                />

                            </Layout>

                            <Layout style ={{borderRadius: 30}}>

                                <TouchableOpacity
                                    style={{marginTop:10,
                                        backgroundColor:'#C66C3B',
                                        borderRadius:30,
                                        borderWidth: 1,
                                        padding: 10
                                        }}
                                    activeOpacity = { .5 }
                                    onPress={ handleSubmit }
                                >

                                    <Text category= 'h5'> Submit </Text>

                                </TouchableOpacity>



                            </Layout>

                            </>

                            )}
                    </Formik>


            </Layout>
        </SafeAreaView>

    )
}
