import React, {useContext, useEffect, useState} from 'react';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import {AnubisProvider} from "./Components/State/Provider";
import * as eva from '@eva-design/eva';
import {Routing} from "./Components/Routing";
import {light} from "@eva-design/eva";


export default function App() {
    useEffect(()=>{

    }, )
  return (
      <ApplicationProvider {...eva} theme={eva.dark}>
          <AnubisProvider>
             <Routing/>
          </AnubisProvider>
      </ApplicationProvider>
  );
}


