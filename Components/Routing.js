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
                        tabBarOptions = {{
                            activeBackgroundColor: '#C66C3B',
                            activeTintColor: '#ffffff'
                        }}
                        appearance={{
                            shadow: true,
                            whenActiveShow: 'both',
                            whenInactiveShow: 'icon-only',
                            tabBarBackground:  '#222b45',

                        }}
                        screenOptions = {{
                            headerTitleStyle: {
                                fontWeight: 'bolder'
                            }
                        }}
                    >
                        <Tab.Screen name="Skill Rating" component={RankingScreen} options={{
                                title: 'Suggested Ranking',
                                tabBarIcon: ({ focused, color, size }) => (
                                <Ionicons name="home-outline" size={18} color="white" />
                            )
                        }}/>
                        <Tab.Screen name="Suggestions" component={DetailScreen} options={{
                                title: 'Stats Summary',
                                tabBarIcon: ({ focused, color, size }) => (
                                <Ionicons name="analytics" size={18} color="white" />
                            )
                        }}/>
                        <Tab.Screen name="Profile" component={ProfileScreen} options={{
                                tabBarIcon: ({ focused, color, size }) => (
                                <Ionicons name="settings-outline" size={18} color="white" />
                            )
                        }}/>
                    </Tab.Navigator>
                }
            </NavigationContainer>
        </View>
    )
}
