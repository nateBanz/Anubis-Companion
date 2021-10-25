import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from "react-native";
import {SafeAreaView} from "react-native";
import {Layout} from "@ui-kitten/components";
import {TopHeaderBar} from "../Assets/TopHeaderBar";
import {Image} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {AntDesign, Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import {AnubisContext} from "../State/Context";
import {LoadingScreen} from "./LoadingScreen";
import {isEmptyArray} from "formik";

export const RankingScreen = (props) => {

    const [tank, setTank] = useState(null)
    const [dps, setDps] = useState(null)
    const [support, setSupport] = useState(null)
    const [differences, setDifferences] = useState([])
    const { state: { isLoading, rankings, suggestedRanking}, dispatch } = useContext(AnubisContext)

    const creatediff = (diff) => {

        if(diff<0) {
            diff = Math.abs(Math.round(diff))
          return (
              <>
              <Text
                  style={{
                      marginLeft: 20,
                      color: '#F5F5F5',
                      fontWeight: 'bold',
                      fontStyle: 'italic',
                      fontSize: 15,
                      paddingBottom: 10
                  }}>
                  <AntDesign name="caretdown" size={15} color="red" />
                  {diff}</Text>
              </>
          )
        }
        else {
            diff = Math.abs(Math.round(diff))
            return (
                <>
                    <Text
                        style={{
                            marginLeft: 20,
                            color: '#F5F5F5',
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            fontSize: 15
                        }}>
                        <AntDesign name="caretup" size={15} color="green" />
                        {diff}
                    </Text>
                </>
            )
        }
    }

    const header = (title) => {
        return (
        <View style = {{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'baseline',
            paddingBottom: 5,
            marginTop: -25,
            marginBottom: 14,
            paddingHorizontal: 8,
            backgroundColor: '#505979',
            borderRadius: 20}}>
            <Text style ={{fontWeight: 'bold', letterSpacing: 1, fontSize: 18, color: '#ffffff'
                }}>
                {title}
            </Text>
        </View>
        )
    }
    const determinePath = (num)=> {
        if(num<1500) {
            console.log('bronze')
            return require('../Assets/bronze.png')
        }
        else if(num >= 1500 && num < 2000) {
            return require('../Assets/silver.png')
        }
        else if(num >= 2000 && num < 2500) {
            return require('../Assets/gold.png')
        }
        else if(num >= 2500 && num < 3000) {
            return require('../Assets/platinum.png')
        }
        else if(num >= 3000 && num < 3500) {
            return require('../Assets/diamond.png')
        }
        else if(num >= 3500 && num < 4000) {
            return require('../Assets/master.png')
        }
        else if(num >= 4000) {
            return require('../Assets/grandmaster.png')
        }
    }
    useEffect(()=> {
        if (suggestedRanking && !isEmptyArray(suggestedRanking)) {
            console.log(typeof suggestedRanking)
            let rank = suggestedRanking[0]
            let newArray = differences
            for (let x = 0; x < 3; x++) {
                let diff = rank[x] - rankings[0][x]
                newArray.push(diff)
            }
            setDifferences(newArray)
            setTank(determinePath(rank[0]))
            setDps(determinePath(rank[1]))
            setSupport(determinePath(rank[2]))
     }
    }, [suggestedRanking])



    const Ranking = () => {
        return (
            <SafeAreaView>
                <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                    <TopHeaderBar title = 'Suggested Ranking'></TopHeaderBar>
                </View>

                { isLoading ? <LoadingScreen loading = {true}/> :
                    <>
                    <ScrollView
                    horizontal
                    bounces
                    style = {{backgroundColor: '#505979', marginLeft: -21, marginTop: 15}}
                        contentContainerStyle={{
                    width: '100%',
                    height: 300,
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: '#505979',

                }}>
                    <View style = {{flex: 1, marginTop: 10, marginBottom: 10, padding: 8, flexDirection: 'row'}}>


                        <View style={styles.col}>
                            {header('Tank')}
                            {tank !== null &&
                            <Image source={tank} style={{height: 90, width: 90}} resizeMod='contain'/>}
                            <Text style = {styles.text}>{!isEmptyArray(suggestedRanking) && Math.round(suggestedRanking[0][0])}</Text>
                            {creatediff(differences[0])}
                        </View>


                        <View style={styles.col}>
                            {header('Damage')}
                            {dps !== null &&
                            <Image source={dps} style={{height: 90, width: 90}} resizeMod='contain'/>}
                            <Text style = {styles.text}>{!isEmptyArray(suggestedRanking) && Math.round(suggestedRanking[0][1])}</Text>
                            {creatediff(differences[1])}
                        </View>

                        <View style={styles.col}>
                            {header('Support')}
                            {support !== null &&
                            <Image source={support} style={{height: 90, width: 90}} resizeMod='contain'/>}
                            <Text style = {styles.text} >{!isEmptyArray(suggestedRanking) && Math.round(suggestedRanking[0][2])}</Text>
                            {creatediff(differences[2])}
                        </View>
                    </View>
                </ScrollView>
                    <View style={styles.bottom}>
                        <Text style = {{fontSize: 24, color: 'white', marginBottom: 15, fontWeight: 'bold'}}>Breakdown</Text>
                        <Text style = {{fontSize: 16, color: 'white'}}>Your suggested 'ranking' is based purely on your mechanical skills like Average Damage, Healing and Damage Blocked over a set period</Text>
                        <Text style = {{fontSize: 16, color: 'white', marginTop: 10}}>See how you can improve on the next page!</Text>

                    <TouchableOpacity
                    style={{
                    marginTop: 18,
                    marginBottom: -30,
                    backgroundColor:'#C66C3B',
                    borderRadius:30,
                    borderColor: '#C66C3B',
                    width: 100,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'

                }}
                    activeOpacity = {.5}
                    onPress={console.log('next')}
                    >

                    <Text> <Entypo name="arrow-long-right" size={24} color="white" /> </Text>

                    </TouchableOpacity>
                    </View>
                    </>
                }
            </SafeAreaView>
        )
    }

    const styles = StyleSheet.create({
        text: {
            fontStyle: 'italic',
            fontSize: 28,
            fontWeight: 'bold',
            color: 'white',
            marginLeft: 10
        },
        bottom: {
            backgroundColor: '#505979',
            borderRadius: 20,
            justifyContent: 'flex-start',
            marginTop: 40,
            padding: 15,
            marginHorizontal: 10
        },
        col: {
            padding: 15,
            backgroundColor: '#222b45',
            marginHorizontal: 5,
            height: 210,
            borderRadius: 20
        }
    });

    return (
        Ranking()
    )
}
