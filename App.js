import React, {useContext, useEffect, useState} from 'react';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import {AnubisProvider} from "./Components/State/Provider";
import * as eva from '@eva-design/eva';
import {Routing} from "./Components/Routing";
import {light} from "@eva-design/eva";
import {ImageBackground} from "react-native";
import {View, Text} from "react-native";



export default function App() {


    return (

             <ApplicationProvider {...eva} theme={eva.dark}>

                  <AnubisProvider>
                      <View style={{  flex: 1,
                      flexDirection: "column"}}>
                      <ImageBackground source={require('./Components/Assets/backgroundOverwatch.png')} style={{
                          flex: 1,
                          resizeMode: "cover",
                          justifyContent: "center"
                      }}>
                     <Routing/>
                      </ImageBackground>
                      </View>
                  </AnubisProvider>

             </ApplicationProvider>

      // <View style = {styles.container}>
      //     <ImageBackground source = {require('./Components/Assets/backgroundOverwatch.png')} resizeMode = 'cover' style = {styles.backgroundImage}>
      //
      //         {/*<NavigationContainer>*/}
      //         {/*    <Stack.Navigator>*/}
      //         {/*        {!isSignedIn ? <Stack.Screen name="Login" component={Login}/> :*/}
      //         {/*            <>*/}
      //         {/*                <Stack.Screen name="Summary" component={SummaryScreen}/>*/}
      //         {/*                <Stack.Screen name="Ranking" component={RankingScreen}/>*/}
      //         {/*                <Stack.Screen name="Detail" component={DetailScreen}/>*/}
      //         {/*                <Stack.Screen name="Profile" component={ProfileScreen}/>*/}
      //         {/*            </>*/}
      //         {/*        }*/}
      //         {/*    </Stack.Navigator>*/}
      //         {/*</NavigationContainer>*/}
      //     </ImageBackground>
      // </View>

  );
}

