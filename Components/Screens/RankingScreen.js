import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";
import {SafeAreaView} from "react-native";
import {Layout} from "@ui-kitten/components";
import {TopHeaderBar} from "../Assets/TopHeaderBar";
import {Image} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const RankingScreen = (props) => {
    const [number, setNumber] = useState([0,2000,4000])
    const header = (title) => {
        return (
        <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
            <View>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 18}}>{title}</Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
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
    useEffect(()=>{

    }, [])

    let tankPath = determinePath(number[0])
    let dpsPath = determinePath(number[1])
    let supportPath = determinePath(number[2])


    return (
        <SafeAreaView>
            <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                <TopHeaderBar title = 'Suggested Ranking'></TopHeaderBar>
            </View>

                <View style = {{
                    elevation: 4,
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    shadowOffsetY: 0,
                    shadowOffsetX: 5,
                    width: '95%',
                    height: 400,
                    borderRadius: 20,
                    alignItems: 'flex-start',
                    padding: 10,
                    marginLeft: 10,
                    backgroundColor: '#536382'
                }}>
                    <View style = {{flex: 1, marginTop: 20, marginBottom: 10, padding: 10}}>
                        {header('Tank')}
                        <View style = {{flex: 1, flexDirection: 'row', shadowColor: 'black',
                            shadowOpacity: 0.3, alignItems: 'center', padding: 10}}>
                            {tankPath !== null && <Image source= {tankPath} style = {{height: 80, width: 100}} resizeMod='contain'/>}
                            <Text style = {{ marginLeft: 20, color: 'white', fontWeight: 'bold', fontStyle: 'italic', fontSize: 40}}>1000</Text>
                        </View>
                        {header('DPS')}
                        <View style = {{flex: 1, flexDirection: 'row', shadowColor: 'black',
                            shadowOpacity: 0.3, alignItems: 'center' , padding: 10}}>
                            {dpsPath !== null && <Image source= {dpsPath} style = {{height: 80, width: 100}} resizeMod='contain'/>}
                            <Text style = {{ marginLeft: 20, color: 'white', fontWeight: 'bold', fontStyle: 'italic', fontSize: 40}}>1000</Text>
                        </View>
                        {header('Support')}
                        <View style = {{flex: 1, flexDirection: 'row', shadowColor: 'black',
                            shadowOpacity: 0.3, alignItems: 'center', padding: 10}}>
                            {supportPath !== null && <Image source= {supportPath} style = {{height: 80, width: 100}} resizeMod='contain'/>}
                            <Text style = {{ marginLeft: 20, color: 'white', fontWeight: 'bold', fontStyle: 'italic', fontSize: 40}}>1000</Text>
                            <Text>^50</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text>Your suggested score based on your skills like damage done, healing and damage blocked over time</Text>
                    <Text>See how you can improve!</Text>

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
                        onPress={console.log('next')}
                    >

                        <Text category= 'h6'> <MaterialCommunityIcons name="page-next-outline" size={24} color="black" /> </Text>

                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
}
