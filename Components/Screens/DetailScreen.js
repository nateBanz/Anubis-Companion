import React, {useContext, useEffect, useState} from 'react';
import {Text} from "react-native";
import {View} from "react-native";
import {TopHeaderBar} from "../Assets/TopHeaderBar";
import {SafeAreaView, StyleSheet} from "react-native";
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

        },

        videoContainer: {
            alignItems: 'center',
            justifyContent: 'flex-start'

        }
    })

    //make the card retrieve the image and the text based on the title

    const renderItem = ({item, index}) => {
        console.log(item)
        console.log(index)
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

            <View style = {detailScreen.mainContainer}>
                <Text style = {{color: 'white', fontSize: 18}}>Top Statistics</Text>
                <View style = {detailScreen.videoContainer}>
                    <FlatList
                    data = {topThreeStats}
                    horizontal
                    renderItem = {renderItem}
                    keyExtractor = {item=> (item[0].toString())}>
                    </FlatList>
                </View>

                <Text>Bottom Statistics</Text>
                <View>
                    {/*<FlatList>*/}

                    {/*</FlatList>*/}
                </View>
            </View>
        </SafeAreaView>
    )
}
