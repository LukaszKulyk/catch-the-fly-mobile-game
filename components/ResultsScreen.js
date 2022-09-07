import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, StyleSheet, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native';
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
                <View key={index} style={styles.resultsView}>
                    <Text style={[styles.resultsText, {flex: 1}]}>{index + 1}.</Text>
                    <Text style={[styles.resultsText, {flex: 4}]}>{element.name}</Text>
                    <Text style={[styles.resultsText, {flex: 2}]}>{element.score}</Text>
                </View>
            )
        });
    }


    return (
        <ImageBackground source={require('../assets/background_image.png')} style={{flex: 1, width: null, height: null}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{
                    fontSize: 40, 
                    color: '#306108', 
                    fontWeight: 'bold',
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
                    borderWidth: '1px', 
                    borderRadius: 6, 
                    borderColor: '#268a16', 
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
        //backgroundColor: 'green'
        //alignItems: 'center',
        //justifyContent: 'center',
        //width: 150,
        //height: 50,
        //boxShadow: 'inset, 0px 1px 0px, 0px, #caefab', 
        //background: 'linear-gradient(to bottom, #77d42a 5%, #5cb811 100%)',
        //backgroundColor: '#77d42a',
        //
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: -4,
        //     height: 7,
        // },
        // shadowOpacity: 0.43,
        // shadowRadius: 9.51,
        //elevation: 15,
        //
        //border: '2px',
        //borderRadius: 6,
        //borderWidth: '1px',
        //display: 'inline-block',
        /*cursor: 'pointer',*/
        //paddingTop: 6,//'6px 24px',
        //paddingBottom: 6,
        //paddingRight: 24,
        //paddingLeft: 24,
        //marginBottom: 10
        /*textDecoration: 'none',
        textShadow: '0px 1px 0px #aade7c'  */ 
    },
    resultsText: {
        textAlign: 'center',
        //alignItems: 'center',
        //justifyContent: 'center',
        color: '#306108',
        //fontFamily: 'sans-serif',
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textTransform: 'uppercase',
        //border: '2px'
    }
  });
