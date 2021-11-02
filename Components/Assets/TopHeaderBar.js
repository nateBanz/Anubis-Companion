import {View, Text} from "react-native";
import React, {useContext} from 'react'
import { AntDesign } from '@expo/vector-icons';
import {TouchableOpacity} from "react-native-gesture-handler";
import {AnubisContext} from "../State/Context";
import {logOut} from "../../databaseConfig/FirebaseHelper";

export const TopHeaderBar = (props)=> {
    const { state: { isSignedIn }, dispatch } = useContext(AnubisContext)
    function logout() {
        logOut()
        dispatch({isSignedIn: false})
    }
    return (
        <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', padding: 15}}>
            <Text style ={{flex: 5, fontWeight: 'bold', letterSpacing: 1, fontSize: 28, color: '#ffffff'
                }}>
                {props.title}
            </Text>
            <Text style = {{color: 'white', fontSize: 14, marginRight: 6}}>Log Out</Text>
            <TouchableOpacity style = {{flex: 1,}}
                              onPress={logout}
            ><AntDesign name="logout" size={20} color="white" /></TouchableOpacity>
        </View>
    )
}
