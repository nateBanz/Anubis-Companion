import 'react-native-gesture-handler';
import {Login} from "./Authentication/Login";
import {RankingScreen} from "./Screens/RankingScreen";
import {DetailScreen} from "./Screens/DetailScreen";
import {ProfileScreen} from "./Screens/ProfileScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {AnubisContext} from "./State/Context";
import React, {useContext} from "react";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {ImageBackground, View} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {SetBattleTagScreen} from "./Screens/SetBattleTagScreen";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";


const Stack = createStackNavigator();
const Tab = AnimatedTabBarNavigator();
 // #C66C3B
export const Routing = () => {
    let {state: {isSignedIn}, dispatch} = useContext(AnubisContext)
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'transparent',
        },
    };
    return (
        <View style={{  flex: 1,
            flexDirection: "column"}}>
            <ImageBackground source={require('./Assets/backgroundOverwatch.png')} style={{
                flex: 1,
                resizeMode: "cover",
                justifyContent: "center"
            }}>
            <NavigationContainer theme = {MyTheme}>
                {!isSignedIn ?

                    <Stack.Navigator>
                        <>
                            <Stack.Screen name="Login" component={Login} options={{
                                headerShown: false,
                            }}/>
                            <Stack.Screen name="SetBattleTagScreen" component={SetBattleTagScreen} options={{
                                headerShown: false,
                            }}/>

                        </>

                    </Stack.Navigator>
                    :
                    <Tab.Navigator
                        appearance={{
                            shadow: true,
                            floating: true,
                            whenActiveShow: 'both',
                            whenInactiveShow: 'icon-only',

                        }}
                    >
                        <Tab.Screen name="Skill Rating" component={RankingScreen} options={{
                                tabBarIcon: ({ focused, color, size }) => (
                                <Ionicons name="home-outline" size={18} color="#ffffff" />
                            )
                        }}/>
                        <Tab.Screen name="Suggestions" component={DetailScreen} options={{
                                tabBarIcon: ({ focused, color, size }) => (
                                <Ionicons name="analytics" size={18} color="#ffffff" />
                            )
                        }}/>
                        <Tab.Screen name="Profile" component={ProfileScreen} options={{
                                tabBarIcon: ({ focused, color, size }) => (
                                <Ionicons name="settings-outline" size={18} color="#ffffff" />
                            )
                        }}/>
                    </Tab.Navigator>
                }
            </NavigationContainer>
            </ImageBackground>
        </View>
    )
}
