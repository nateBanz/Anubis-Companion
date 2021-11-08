import React, {useContext, useEffect, useState} from 'react';
import {Text, ActivityIndicator} from "react-native";
import {AnubisContext} from "../State/Context";

export const LoadingScreen = (props) => {
    const { state: { userId, battleTag }, dispatch } = useContext(AnubisContext)
    const newLoading = props.loading
    useEffect(()=>{
        console.log(newLoading)
        console.log(battleTag)
        if(newLoading) {
            fetch('https://anubis-companion.herokuapp.com/login/loggedPython/',
                {method: 'POST',
                    body: battleTag ? JSON.stringify({battleTag, userId}) : JSON.stringify({userId}) ,
                    headers: {'Content-Type': 'application/json'}})
                .then((res) => res.json())
                .catch(err => console.log(err))
                .then(final => {
                    dispatch({rankings: JSON.parse(final[0])});
                    dispatch({suggestedRanking: JSON.parse(final[1]) });
                    dispatch({topThreeStats: JSON.parse(final[2]) });
                    dispatch({bottomThreeStats: JSON.parse(final[3])});
                    dispatch({isLoading: false}) })

        }

    }, [newLoading])
    return (
        <ActivityIndicator size ='large' color = {'#C66C3B'}/>
    )
}
