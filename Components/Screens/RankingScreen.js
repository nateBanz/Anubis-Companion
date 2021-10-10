import React, {useState} from 'react';
import {Text, View} from "react-native";
import {SafeAreaView} from "react-native";
import {Layout} from "@ui-kitten/components";

export const RankingScreen = (props) => {
    const modifiedCard = () => {
        return (
            <View style = {{flex: 1, height: '100%', width: '100%'}}>
                <View style = {{
                    flex: 1,
                    width: '75%',
                    borderRadius: 30,
                    justifyContent: 'center',
                    backgroundColor: '#ffffff'
                            }}>
                    <Text>Suggested Rankings</Text>
                </View>
                <View style = {{
                    flex: 5,
                    elevation: 4,
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowOffsetY: 4,
                    shadowOffsetX: 0,
                    width: '85%',
                    borderRadius: 20,
                    alignItems: 'center',
                    }}>

                </View>
                    <View style = {{flex: 1, flexDirection: 'row'}}>
                        <Text>Tank Skill Rating</Text>
                    </View>
                    <View style = {{flex: 1, flexDirection: 'row'}}>
                        <Text>Dps Skill Rating</Text>
                    </View>
                    <View style = {{flex: 1, flexDirection: 'row'}}>
                        <Text>Support Skill Rating</Text>
                    </View>
            </View>
        )
    }
    return (
        <SafeAreaView style = {{textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Layout style = {{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: -80}}>
                <View style = {{
                    marginTop: 5,
                    width: '75%',
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                    elevation: 3,
                    height: 40

                }}>
                    <Text style = {{fontSize: 18, fontWeight: 'bold'}}>Suggested Rankings</Text>
                </View>
                <Layout style = {{
                    marginTop: -4,
                    elevation: 2,
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowOffsetY: 4,
                    shadowOffsetX: 0,
                    width: '95%',
                    height: '65%',
                    borderRadius: 20,
                    alignItems: 'center',
                    padding: 10
                }}>
                    <View style = {{flex: 1, marginTop: 40, marginBottom: 10}}>
                        <View style = {{flex: 1, flexDirection: 'row'}}>
                            <Text>Tank Skill Rating</Text>
                        </View>
                        <View style = {{flex: 1, flexDirection: 'row'}}>
                            <Text>Dps Skill Rating</Text>
                        </View>
                        <View style = {{flex: 1, flexDirection: 'row'}}>
                            <Text>Support Skill Rating</Text>
                        </View>
                    </View>
                </Layout>

            </Layout>
        </SafeAreaView>
    )
}
