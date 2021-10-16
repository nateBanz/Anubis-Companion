import React, {useEffect, useState} from 'react';
import {Text} from "react-native";
import {View} from "react-native";
import {TopHeaderBar} from "../Assets/TopHeaderBar";
import {SafeAreaView} from "react-native";
import {FlatList} from "react-native-gesture-handler";

export const DetailScreen = (props) => {
//image and then text ~simple!
    const optionsArray = []

    const getStats = ()=> {

    }

    //make the card retrieve the image and the text based on the title

    const renderItem = () => {

    }
    useEffect(()=>{

    }, [])
    return (
        <SafeAreaView>
            <View style = {{ alignItems: 'center', justifyContent: 'center'}}>
                <TopHeaderBar title = 'Detailed Stats'></TopHeaderBar>
            </View>

            <View>
                <Text>Top Statistics</Text>
                <View>
                    <FlatList
                    data = {}
                    renderItem = {renderItem}
                    keyExtractor = {key}>
                    </FlatList>
                </View>

                <Text>Bottom Statistics</Text>
                <View>
                    <FlatList>

                    </FlatList>
                </View>
            </View>
        </SafeAreaView>
    )
}
