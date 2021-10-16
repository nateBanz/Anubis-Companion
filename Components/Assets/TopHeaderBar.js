import {View, Text} from "react-native";
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import {TouchableOpacity} from "react-native-gesture-handler";

export const TopHeaderBar = (props)=> {
    return (
        <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', padding: 15}}>
            <Text style ={{flex: 5, fontWeight: 'bold', letterSpacing: 1, fontSize: 24, color: '#ffffff'
                }}>
                {props.title}
            </Text>
            <TouchableOpacity style = {{flex: 1}}><AntDesign name="logout" size={24} color="white" /></TouchableOpacity>
        </View>
    )
}
