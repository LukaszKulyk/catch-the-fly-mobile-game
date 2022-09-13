import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, TextInput, Modal, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native';
//import { ImageBackground } from 'react-native-web';
import GameButton from './GameButton';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SettingsScreen({ navigation }) {

    const [name, setPlayerName] = useState(localStorage.getItem('Name') || 'player');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'English', value: 'english'},
        {label: 'Polski', value: 'polski'},
        {label: 'Italiano', value: 'italiano'},
        {label: 'Lemko', value: 'lemko'}
    ]);

    const changePlayerName = (name) => {
        setPlayerName(name);
        localStorage.setItem('Name', name)
    }

    const deleteAllResults = () => {
        //localStorage.removeItem('highScores')
        Alert.alert(
            "Remove all saved results",
            "Are you sure you want to delete all saved results? It will not be possible to restore it back.",
            [
                {
                    text:"Delete",
                    onPress: () => localStorage.removeItem('highScores')
                },
                {
                    text:"Cancel",
                    onPress: () => console.log('cancel.')
                }
            ]
        )
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
                    }}>Settings</Text>
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
                                width: 100, 
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
                    <View style={{flexDirection: 'row', marginLeft: 20, marginBottom: 20, alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 20, 
                            textAlign: 'center',
                            color: '#77d42a',
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            textTransform: 'uppercase',
                            marginRight: 10,
                            }}
                        >Language:</Text>
                        <DropDownPicker style={{maxWidth: '50%', textAlign: 'center'}}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            dropDownDirection="TOP"
                            theme="DARK"
                        />
                    </View>
                    <View style={{alignItems: 'center', marginBottom: 20}}>
                        <GameButton
                            title="Reset All Results"
                            onPress={deleteAllResults}
                        />
                    </View>
                </View>
                <GameButton
                    title="Back"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </ImageBackground>
    )
}