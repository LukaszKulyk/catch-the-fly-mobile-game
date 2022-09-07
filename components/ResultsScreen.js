import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native';
//import { ImageBackground } from 'react-native-web';
import GameButton from './GameButton';

export default function ResultsScreen({ navigation }) {

    const results = JSON.parse(localStorage.getItem('highScores'));
    let bestScores = [];

    if(results == null || results.length < 1) {
        bestScores.push(
            <Text>There are no results yet.</Text>
        )
    }
    else {
        bestScores = []
        results.forEach((element, index) => {
            bestScores.push(
                <View style={{flexDirection: 'row', margin: 10}}>
                    <Text>{index + 1}</Text>
                    <Text>{element.name}</Text>
                    <Text>{element.score}</Text>
                </View>
            )
        });
    }


    return (
        <ImageBackground source={require('../assets/background_image.png')} style={{flex: 1, width: null, height: null}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{fontSize: 40}}>Results</Text>
                <View>{bestScores}</View>
                <GameButton
                    title="Back"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </ImageBackground>
    )
}
