import {Login} from "./Authentication/Login";
import {SummaryScreen} from "./Screens/SummaryScreen";
import {RankingScreen} from "./Screens/RankingScreen";
import {DetailScreen} from "./Screens/DetailScreen";
import {ProfileScreen} from "./Screens/ProfileScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AnubisContext} from "./State/Context";
import React, {useContext} from "react";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {ImageBackground, View} from "react-native";
import background from "./Assets/backgroundOverwatch.png";
import styles from "./Styles/AppStyles";
import {AnubisProvider} from "./State/Provider";
import {SetBattleTagScreen} from "./Screens/SetBattleTagScreen";

const Stack = createNativeStackNavigator();
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
            </NavigationContainer>
            </ImageBackground>
        </View>
    )
}
