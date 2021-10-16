import React, {useState} from 'react';
import {SafeAreaView, Text} from "react-native";
import {View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {TopHeaderBar} from "../Assets/TopHeaderBar";

export const SummaryScreen = (props) => {

    return (
        <SafeAreaView>
            <View style = {{ alignItems: 'center', justifyContent: 'center'}}>
                <TopHeaderBar title = 'Detailed Stats'></TopHeaderBar>
            </View>
        </SafeAreaView>
    )
}
