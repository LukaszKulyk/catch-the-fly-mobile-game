//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameButton from './components/GameButton';
import NewGameScreen from './components/NewGameScreen';
import GameScreen from './components/GameScreen';
import { GameEngine } from 'react-native-game-engine';
//import { createStackNavigator, createAppContainer } from 'react-navigation'; 
//import { NavigationContainer } from '@react-navigation/native';
//import { useNavigation } from '@react-navigation/native'

//const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome in Leleka game!</Text>
      <GameButton
        title="Game Screen"
        onPress={() => navigation.navigate('GameScreen')}
      />
      <GameButton
        title="New Game"
        onPress={() => navigation.navigate('NewGame')}
      />
      <GameButton
        title="Results"
        onPress={() => navigation.navigate('Results')}
      />
      <GameButton
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <GameButton
        title="Quit"
        onPress={() => navigation.navigate('Quit')}
      />
      <GameButton
        title="TEST"
        onPress={() => navigation.navigate('Quit')}
      />
    </View>
  );
}
/*
function NewGameScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>New Game Screen</Text>
      <Image 
        source={require('./assets/stork_wings_up_100_50.png')}
        //style={{ width: 50, height: 50}}
      />
      <GameButton
        title="Back"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}*/

function ResultsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Results Screen</Text>
      <GameButton
        title="Back"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <GameButton
        title="Back"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

function QuitScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Quit Screen</Text>
      <GameButton
        title="Back"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  //const nav = props.navigation;
  return (
    /*<View style={styles.container}>
      <Text>Leleka Game!</Text>
      <StatusBar style="auto" />
    </View>*/
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewGame" component={NewGameScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Quit" component={QuitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//{/* <Button title='New Game' onPress={() => }/> */}

//{
  /*}
export const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="NewGame" component={GameScreen} />
    <Stack.Screen name="Scores" component={ScoresScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

const App = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

export default App;*///}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //navButton: {
      //boxShadow: 'inset, 0px 1px 0px, 0px, #caefab', 
      //background: 'linear-gradient(to bottom, #77d42a 5%, #5cb811 100%)',
      //backgroundColor: '#77d42a',
      //border: '2px',
      /*borderRadius: '6px',
      border: '1px solid #268a16',
      display: 'inline-block',
      cursor: 'pointer',
      color: '#306108',
      fontFamily: 'Arial',
      fontSize: '15px',
      fontWeight: 'bold',
      padding: '6px 24px',
      textDecoration: 'none',
      textShadow: '0px 1px 0px #aade7c'   */
  //}
});
