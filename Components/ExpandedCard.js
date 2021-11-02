import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from 'react'
import {FontAwesome} from '@expo/vector-icons';
import {Video} from 'expo-av';
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
            let tite = props.item[0]
            let cutTitle = tite.replace('AvgPer10Min','');
            setTitle(cutTitle)
        }
        else{
            getText(props.item[0])
        }

    }, [title])
    const changeView = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setExpand(!expand)
    }
    const getText = (item) => {
        fetch('https://anubis-companion.herokuapp.com/login/getTextOnCard',
            {method: 'POST',
                body: JSON.stringify({title: item}),
                headers: {'Content-Type': 'application/json'}})
            .then((response)=> (response.text()))
            .then((text) => {setText(text)}
        )
    }



    const getInfoOnCard = (titleLower)=> {
        console.log(titleLower)
        if (titleLower.includes('allDamageDone')) {
            return require('./Assets/Gifs/allDamage.mp4' )
        }
        else if (titleLower.includes('deaths')) {
            return require('./Assets/Gifs/deaths.mp4')
        }
        else if (titleLower.includes('healingDone')) {
            return require('./Assets/Gifs/healing.mp4')
        }
        else if (titleLower.includes('heroDamageDone')) {
            return require('./Assets/Gifs/heroDamage.mp4')
        }
        else if (titleLower.includes('objectiveKills')) {
            return require('./Assets/Gifs/objectiveKills.mp4')
        }
        else if (titleLower.includes('soloKills')) {
            return require('./Assets/Gifs/solo.mp4')
        }
        else if (titleLower.includes('timeSpentOnFire')) {
            return require('./Assets/Gifs/onFire.mp4')
        }
        else if (titleLower.includes('barrierDamageDone')) {
            return require('./Assets/Gifs/barrier.mp4')
        }
        else if (titleLower.includes('objectiveTime')) {
            return require('./Assets/Gifs/objective.mp4')
        }
        else if (titleLower.includes('finalBlows')) {
            return require('./Assets/Gifs/finalBlows.mp4')
        }
        else if (titleLower.includes('eliminations')) {
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
            width: 295,
            height: 200,
            borderRadius: 20,
        },
        buttons: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        normalView: {
            width: 295,
            height: 200,
            padding: 10,
            margin: 4,
        },
        expandedView: {
            height: 500,
            width: 300,
            padding: 10,
            margin: 4,
        },
        expandedText: {
            marginTop: 10,
            color: 'white',
            fontSize: 18
        },
        activeButton: {
            backgroundColor:'#C66C3B',
            borderRadius:30,
            borderColor: '#C66C3B',
            width: 100,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginLeft: 15,
            marginTop: -50

        },
        hiddenButton : {
            backgroundColor:'#C66C3B25',
            borderRadius:30,
            borderColor: '#C66C3B',
            width: 100,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginLeft: 15,
            marginTop: -50

        }
    });

    return (
        <View style = {expand ? styles.expandedView : styles.normalView}>

            {title!== undefined &&
            <Video
                resizeMode= 'stretch'
                ref = {video}
                isLooping
                source={getInfoOnCard(title)}
                style = {styles.video}
                shouldPlay
                isMuted
            >
            </Video>}
            <View style ={{position: 'absolute', top: 20, left: 25}}>
                <Text style = {{color: 'white', fontSize: 22, fontWeight: 'bold', letterSpacing: 1}}>
                    {title && title}
                </Text>
            </View>
            {expand &&
            <View style = {{flex: 1,  backgroundColor: '#222b45',borderRadius: 20, padding: 15, marginTop: 20}}>
                <Text style = {styles.expandedText}>
                    {text}
                </Text>
            </View>}
            <TouchableOpacity
            style={!expand ? [styles.activeButton] : [styles.activeButton, styles.hiddenButton] }
            activeOpacity = {.5}
            opacity = {expand ? .1 : .7}
            onPress={changeView}
        >
            <Text> <FontAwesome name="expand" size={24} color="white" /></Text>
        </TouchableOpacity>


        </View>
    )
}
