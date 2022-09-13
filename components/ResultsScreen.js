import React from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import GameButton from './GameButton';

export default function ResultsScreen({ navigation }) {

    const results = JSON.parse(localStorage.getItem('highScores'));
    let bestScores = [];

    if(results == null || results.length < 1) {
        for(let i = 0; i < 10; i++) {
            bestScores.push(
                <View key={i} style={styles.resultsView}>
                    <Text style={[styles.resultsText, {flex: 1}]}>{i + 1}.</Text>
                    <Text style={[styles.resultsText, {flex: 4}]}>EMPTY</Text>
                    <Text style={[styles.resultsText, {flex: 2}]}>0</Text>
                </View>
            )
        }
    }
    else {
        bestScores = []
        results.forEach((element, index) => {
            bestScores.push(
                <View key={index} style={styles.resultsView}>
                    <Text style={[styles.resultsText, {flex: 1}]}>{index + 1}.</Text>
                    <Text style={[styles.resultsText, {flex: 4}]}>{element.name}</Text>
                    <Text style={[styles.resultsText, {flex: 2}]}>{element.score}</Text>
                </View>
            )
        });

        if(bestScores.length < 10) {
            for(let i = bestScores.length; i < 10; i++) {
                bestScores.push(
                    <View key={i} style={styles.resultsView}>
                        <Text style={[styles.resultsText, {flex: 1}]}>{i + 1}.</Text>
                        <Text style={[styles.resultsText, {flex: 4}]}>EMPTY</Text>
                        <Text style={[styles.resultsText, {flex: 2}]}>0</Text>
                    </View>
                )
            }
        }
    }

    return (
        <ImageBackground source={require('../assets/background_image.png')} style={{flex: 1, width: null, height: null}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{
                    fontSize: 40, 
                    color: '#77d42a', 
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    shadowOffset: {
                        width: -4,
                        height: 7
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 3,
                    elevation: 15
                    }}>Results</Text>
                <View style={{
                    width: '80%', 
                    marginVertical: 20, 
                    border: '2px', 
                    borderWidth: 4, 
                    borderRadius: 10, 
                    borderColor: '#77d42a', 
                    shadowOffset: {
                        width: -4,
                        height: 7
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 3,
                    elevation: 15
                    }}>{bestScores}</View>
                <GameButton
                    title="Back"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    resultsView: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        margin: 8, 
    },
    resultsText: {
        textAlign: 'center',
        color: '#306108',
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textTransform: 'uppercase',
    }
  });
