import React, { useState } from 'react';
import { Text, View, ImageBackground, TextInput, StyleSheet } from 'react-native';
import GameButton from './GameButton';

export default function SetNewPlayerScreen({ navigation }) {

    const [name, setPlayerName] = useState(localStorage.getItem('Name') || '');

    const changePlayerName = (name) => {
        setPlayerName(name);
        localStorage.setItem('Name', name)
    }

    return(
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
                        }}>Player Name</Text>
                <View style={{
                    width: '80%',
                    //alignItems: 'center',
                    justifyContent: 'center',
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
                    }}>
                    <View style={{
                        flexDirection: 'row', 
                        marginTop: 20,
                        marginLeft: 20, 
                        marginBottom: 20,
                        alignItems: 'center'
                        }}>
                        <Text style={{
                            fontSize: 20, 
                            textAlign: 'center',
                            color: '#77d42a',
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            textTransform: 'uppercase',
                            }}
                        >Player:</Text>
                        <TextInput
                            //style={styles.input}
                            style={{
                                width: 200, 
                                fontSize: 20,
                                textAlign: 'center',
                                color: '#306108',
                                fontWeight: 'bold',
                                fontStyle: 'italic',
                            }}
                            onChangeText={changePlayerName}//localStorage.setItem('Name', name)}
                            value={name}
                            placeholder="player name..."
                            //keyboardType="numeric"
                            maxLength={40}
                            multiline={false}
                        />
                    </View>
                </View>
                <GameButton
                    title="Start Game"
                    onPress={() => navigation.navigate('NewGame')}
                />
            </View>
        </ImageBackground>
    )
}