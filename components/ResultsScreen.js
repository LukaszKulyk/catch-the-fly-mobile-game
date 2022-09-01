import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import GameButton from './GameButton';

export default function ResultsScreen({ navigation }) {


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Results Screen</Text>
            <Text>{localStorage.getItem('highScores')}</Text>
            <GameButton
                title="Back"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )
}