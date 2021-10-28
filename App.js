import React, {useContext, useEffect, useState} from 'react';
import {ApplicationProvider, IconRegistry, Layout} from '@ui-kitten/components';
import {AnubisProvider} from "./Components/State/Provider";
import * as eva from '@eva-design/eva';
import {Routing} from "./Components/Routing";
import {ImageBackground} from "react-native";
import {View, Text} from "react-native";



export default function App() {


    return (
        <>
             <ApplicationProvider {...eva} theme={eva.dark}>

                  <AnubisProvider>
                      <Layout style = {{height: '100%'}}>
                        <Routing/>
                      </Layout>
                  </AnubisProvider>

             </ApplicationProvider>
        </>

  );
}

