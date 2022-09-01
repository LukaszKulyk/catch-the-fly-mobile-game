import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, TextInput, Dimensions, TouchableWithoutFeedback } from 'react-native';
//import { ImageBackground } from 'react-native-web';
import GameButton from './GameButton';

export default function SettingsScreen({ navigation }) {

    const [name, setPlayerName] = useState(localStorage.getItem('Name') || 'player')

    const changePlayerName = (name) => {
        setPlayerName(name);
        localStorage.setItem('Name', name)
    }

    return (
        <ImageBackground source={require('../assets/background_image.png')} style={{flex: 1, width: null, height: null}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Settings Screen</Text>
                <TextInput
                    //style={styles.input}
                    onChangeText={changePlayerName}//localStorage.setItem('Name', name)}
                    value={name}
                    placeholder="write your name..."
                    //keyboardType="numeric"
                    maxLength={40}
                />
                <GameButton
                    title="Back"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </ImageBackground>
    )
}