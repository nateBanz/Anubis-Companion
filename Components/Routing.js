import {Login} from "./Authentication/Login";
import {SummaryScreen} from "./Screens/SummaryScreen";
import {RankingScreen} from "./Screens/RankingScreen";
import {DetailScreen} from "./Screens/DetailScreen";
import {ProfileScreen} from "./Screens/ProfileScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AnubisContext} from "./State/Context";
import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
const Stack = createNativeStackNavigator();
export const Routing = () => {
    let {state: {isSignedIn}, dispatch} = useContext(AnubisContext)
    return (
    <NavigationContainer>
        <Stack.Navigator>
            {!isSignedIn ? <Stack.Screen name="Login" component={Login}/> :
                <>
                    <Stack.Screen name="Summary" component={SummaryScreen}/>
                    <Stack.Screen name="Ranking" component={RankingScreen}/>
                    <Stack.Screen name="Detail" component={DetailScreen}/>
                    <Stack.Screen name="Profile" component={ProfileScreen}/>
                </>
            }
        </Stack.Navigator>
    </NavigationContainer>
    )
}
