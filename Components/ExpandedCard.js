import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import {Image} from "react-native";
import { Video, AVPlaybackStatus } from 'expo-av';
import {LayoutAnimation, UIManager} from "react-native-web";
export const ExpandedCard = (props)=> {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [expand, setExpand] = useState(false)
    const [image, setImage] = useState(null)
    const [text, setText] = useState(null)
    const [title, setTitle] = useState()
    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    useEffect(()=>{
        console.log(title)
        if(!title) {
            setTitle(props.item[0])
        }
        else{
            getText(props.item[0])
        }

    }, [title])
    const changeView = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpand(!expand)
    }
    const getText = () => {
        fetch('http://192.168.86.66:3000/login/getTextOnCard',
            {method: 'POST',
                body: JSON.stringify({title}),
                headers: {'Content-Type': 'application/json'}})
            .then((response)=> (response.text()))
            .then((text) => {setText(text)}
        )
    }



    const getInfoOnCard = (titleLower)=> {
        console.log(titleLower)
        if (titleLower.includes('allDamageDoneAvgPer10Min')) {
            return require('./Assets/Gifs/allDamage.mp4' )
        }
        else if (titleLower.includes('deathsAvgPer10Min')) {
            return require('./Assets/Gifs/deaths.mp4')
        }
        else if (titleLower.includes('healingDoneAvgPer10Min')) {
            return require('./Assets/Gifs/healing.mp4')
        }
        else if (titleLower.includes('heroDamageDoneAvgPer10Min')) {
            return require('./Assets/Gifs/heroDamage.mp4')
        }
        else if (titleLower.includes('objectiveKillsAvgPer10Min')) {
            return require('./Assets/Gifs/objectiveKills.mp4')
        }
        else if (titleLower.includes('soloKillsAvgPer10Min')) {
            return require('./Assets/Gifs/solo.mp4')
        }
        else if (titleLower.includes('timeSpentOnFireAvgPer10Min')) {
            return require('./Assets/Gifs/onFire.mp4')
        }
        else if (titleLower.includes('barrierDamageDoneAvgPer10Min')) {
            return require('./Assets/Gifs/barrier.mp4')
        }
        else if (titleLower.includes('objectiveTimeAvgPer10Min')) {
            return require('./Assets/Gifs/objective.mp4')
        }
        else if (titleLower.includes('finalBlowsAvgPer10Min')) {
            return require('./Assets/Gifs/finalBlows.mp4')
        }
        else if (titleLower.includes('eliminationsAvgPer10Min')) {
            return require('./Assets/Gifs/elims.mp4')
        }

    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#ecf0f1',
        },
        video: {
            width: 250,
            height: 200,
            borderRadius: 20,
        },
        buttons: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        normalView: {
            width: 250,
            height: 200,
            padding: 10,
            margin: 4
        },
        expandedView: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },

        expandedText: {
            marginTop: 10,
            color: 'white',
            fontSize: 18
        }
    });

    return (
        <TouchableOpacity onPress={changeView} style = {expand ? styles.expandedView : styles.normalView}>

            {title!== undefined &&
            <Video
                resizeMode= 'contain'
                ref = {video}
                isLooping
                source={getInfoOnCard(title)}
                style = {styles.video}
                useNativeControls
                shouldPlay
            >
            </Video>}

            {expand &&
            <View>
                <Text style = {styles.expandedText}>
                    {text}
                </Text>
            </View>}


        </TouchableOpacity>
    )
}
