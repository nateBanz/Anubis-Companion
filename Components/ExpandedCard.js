import {View, Text} from "react-native";
import React, {useEffect, useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import {TouchableOpacity} from "react-native-gesture-handler";
import {Image} from "react-native";
import { Video, AVPlaybackStatus } from 'expo-av';
export const ExpandedCard = (props)=> {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [expand, setExpand] = useState(false)
    const [image, setImage] = useState(null)
    const [text, setText] = useState(null)

    useEffect(()=>{
      setImage(props.image)
    }, [])
    const changeView = () => {
        setExpand(!expand)
    }



    const getInfoOnCard = (titleLower)=> {

        if (titleLower.includes('allDamageDoneAvgPer10Min')) {
            return require('../Assets/Gifs/allDamage.mp4' )
        }
        else if (titleLower.includes('deathsAvgPer10Min')) {
            return require('../Assets/Gifs/deaths.mp4')
        }
        else if (titleLower.includes('healingDoneAvgPer10Min')) {
            return require('../Assets/Gifs/healing.mp4')
        }
        else if (titleLower.includes('heroDamageDoneAvgPer10Min')) {
            return require('../Assets/Gifs/heroDamage.mp4')
        }
        else if (titleLower.includes('objectiveKillsAvgPer10Min')) {
            return require('../Assets/Gifs/objectiveKills.mp4')
        }
        else if (titleLower.includes('soloKillsAvgPer10Min')) {
            return require('../Assets/Gifs/solo.mp4')
        }
        else if (titleLower.includes('timeSpentOnFireAvgPer10Min')) {
            return require('../Assets/Gifs/onFire.mp4')
        }
        else if (titleLower.includes('barrierDamageDoneAvgPer10Min')) {
            return require('../Assets/Gifs/barrier.mp4')
        }
        else if (titleLower.includes('objectiveTimeAvgPer10Min')) {
            return require('../Assets/Gifs/objective.mp4')
        }
        else if (titleLower.includes('finalBlowsAvgPer10Min')) {
            return require('../Assets/Gifs/finalBlows.mp4')
        }
        else if (titleLower.includes('eliminationsAvgPer10Min')) {
            return require('../Assets/Gifs/elims.mp4')
        }

    }

    return (
        <TouchableOpacity
        onPress = {changeView}>
            <View
            style ={{width: '40%'}}>
                <View>
                    <Text style = {{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{props.title}</Text>
                    <Video
                        ref={video}
                        style={{height: undefined, width: undefined}}
                        source={
                            getInfoOnCard(props.title)
                        }
                        resizeMode="contain"
                        isLooping
                    />
                </View>
                {expand &&
                <View>

                </View>}
            </View>
        </TouchableOpacity>
    )
}
