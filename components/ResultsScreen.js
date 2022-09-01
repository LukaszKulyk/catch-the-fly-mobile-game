import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Dimensions, TouchableWithoutFeedback } from 'react-native';
//import { ImageBackground } from 'react-native-web';
import GameButton from './GameButton';

export default function ResultsScreen({ navigation }) {


    return (
        <ImageBackground source={require('../assets/background_image.png')} style={{flex: 1, width: null, height: null}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Results Screen</Text>
                <Text>{localStorage.getItem('highScores')}</Text>
                <GameButton
                    title="Back"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </ImageBackground>
    )
}
