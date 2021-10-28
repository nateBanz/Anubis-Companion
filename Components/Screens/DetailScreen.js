import React, {useContext, useEffect, useState} from 'react';
import {Text} from "react-native";
import {View} from "react-native";
import {TopHeaderBar} from "../Assets/TopHeaderBar";
import {SafeAreaView, StyleSheet, ScrollView} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {AnubisContext} from "../State/Context";
import {ExpandedCard} from "../ExpandedCard";

export const DetailScreen = (props) => {
    const { state: { topThreeStats, bottomThreeStats, rankings }, dispatch } = useContext(AnubisContext)
//image and then text ~simple!
    const [topData, setTopData] = useState()
    const [bottomData, setBottomData] = useState()

    const getStats = ()=> {

    }
    const detailScreen = StyleSheet.create({
        mainContainer: {
            justifyContent: 'flex-start',
            marginTop: 25,
            marginHorizontal: 0


        },

        videoContainer: {
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#505979',
            paddingBottom: 15

        }
    })

    //make the card retrieve the image and the text based on the title

    const renderItem = ({item, index}) => {
        return (
            <ExpandedCard index = {index} item = {item}/>

        )
    }
    useEffect(()=>{
    }, [])
    return (
        <SafeAreaView style = {{flex: 1}}>
            <View style = {{ alignItems: 'center', justifyContent: 'center'}}>
                <TopHeaderBar title = 'Detailed Stats'></TopHeaderBar>
            </View>

            <ScrollView contentContainerStyle = {detailScreen.mainContainer}>

                <Text style = {{color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 15, marginLeft: 10}}>Top Statistics</Text>
                <View style = {detailScreen.videoContainer}>
                    <FlatList
                    data = {topThreeStats}
                    horizontal
                    renderItem = {renderItem}
                    keyExtractor = {item=> (item[0].toString())}>
                    </FlatList>
                </View>

                <Text style = {{color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 15, marginTop: 25, marginLeft: 10}}>Bottom Statistics</Text>
                <View style = {detailScreen.videoContainer}>
                    <FlatList
                        data = {bottomThreeStats}
                        horizontal
                        renderItem = {renderItem}
                        keyExtractor = {item=> (item[0].toString())}>
                    </FlatList>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
