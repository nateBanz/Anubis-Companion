import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {SummaryScreen} from "./Components/Screens/SummaryScreen";
import {RankingScreen} from "./Components/Screens/RankingScreen";
import {Login} from "./Components/Authentication/Login";
import {DetailScreen} from "./Components/Screens/DetailScreen";
import {ProfileScreen} from "./Components/Screens/ProfileScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Summary" component={SummaryScreen}/>
          <Stack.Screen name="Ranking" component={RankingScreen}/>
          <Stack.Screen name="Detail" component={DetailScreen}/>
          <Stack.Screen name="Profile" component={ProfileScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}


