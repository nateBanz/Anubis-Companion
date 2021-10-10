import React, {useContext, useState} from 'react';
import {View, Button} from "react-native";
import OverLogo from "../Assets/OverLogo";
import {GoogleLoginButton} from "react-social-login-buttons";
import {SafeAreaView} from "react-native";
import { Layout, Text} from "@ui-kitten/components";
import { Formik } from 'formik';
import {TextInput, TouchableOpacity} from "react-native-gesture-handler";
import {AnubisContext} from "../State/Context";

export const SetBattleTagScreen = () => {
    const { state: { userId }, dispatch } = useContext(AnubisContext)
    const [error, setError] = useState(false)

   //if error, return error on this screen
    let Error = (message) => {
        return (
            <Text style = {{textColor: 'red', color: 'red'}}>
                {message}
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
                    onSubmit={values => {let fullTag = values.name + '-' + values.number; console.log(fullTag);
                        fetch('http://192.168.86.58:3000/login/python/',
                            {method: 'POST',
                                body: JSON.stringify({fullTag}),
                                headers: {'Content-Type': 'application/json'}})
                            .then((res) => res.json())
                            .catch(err => console.log(err))
                            .then(final => {console.log(final); dispatch({isSignedIn: true}) })
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



                            </Layout>
                            {error && Error('Oh no! Make sure you set your profile to public!') }

                        </>

                    )}
                </Formik>


            </Layout>
        </SafeAreaView>

    )
}
