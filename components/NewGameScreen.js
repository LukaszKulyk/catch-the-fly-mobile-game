import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button, Image, Pressable, Dimensions } from 'react-native';
//import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-web';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { NavigationContainer } from '@react-navigation/native';
//import GameButton from './GameButton';
//import Stork from './Stork';
import Frog from './vanilla/Frog'
import Floor from './vanilla/Floor';
import Fly from './vanilla/Fly';
import Stork from './vanilla/Stork'
//import prepareFlyPosition from '../helpers/helpers';

//const Stack = createNativeStackNavigator();

/*
const img1 = require('../assets/stork_wings_up_100_50.png');
const img2 = require('../assets/stork_wings_down_100_50.png');

export default function NewGameScreen({ navigation }) {

    const [count, setCount] = useState(0);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>New Game Screen</Text>
        <Text>Naciśnięto {count} razy</Text>
        <Button 
            title='Nacisnij mnie'
            onPress={() => setCount(count + 1)}></Button>
        {count % 2 == 0 ? <Stork source={img1}/> : <Stork source={img2}/>}
        <GameButton
          title="Back"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  }
  */

  export default function NewGameScreen({ navigation }) {

    //get screen resolution
    const screenWitdth = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;

    const frogLeft = screenWitdth / 2;
    //const frogDown = screenHeiht

    const [frogBottom, setFrogBottom] = useState(screenWitdth / 2);
    //const [FrogRight, setFrogRight] = useState(screenWitdth / 2);

    const gravity = 3;
//################################
    const moveLength = 3;

    //const [frogRight, setFrogRight] = useState(screenWitdth / 2);
    //const [frogLeft2, setFrogLeft2] = useState(screenWitdth / 2);

    const [frogPosition, setFrogPosition] = useState(screenWitdth / 2);

    //const [test, setTest] = useState(0);

    //const [newFlyPosition, setNewFlyPosition] = useState(flyPosition);

    let [score, setScore] = useState(0);

    let [flyStatus, setFlyStatus] = useState(false);

    let [wayOfMoving, setWayOfMoving] = useState(0);

    //const floorWidth = screenWitdth

//################################

    //Function for getting data from Fly component.

    /*let getFlyPositionDetails = (flyPositionDetails) => {
      console.log('Fly position details: ' + flyPositionDetails);
    }*/

    //let gameTimerId;
    //let direction = 1;
/*
    //start frog falling
    useEffect(() => {
      if (frogBottom > 0) {
        gameTimerId = setInterval(() => {
          setFrogBottom(frogBottom => frogBottom - gravity)
        }, 30)

        return () => {
          clearInterval(gameTimerId)
        }
      }
    }, [frogBottom])

*/

//########## STORK LOGIC ##########

    let [storkPositionX, setStorkPosition] = useState(screenWitdth / 2);
    let [storkDirection, setStorkDirection] = useState(1);

    //timers for stork walking
    let storkLeftTimerId;
    let storkChangeToRightDirectionTimerId;
    let storkRightTimerId;
    let storkChangeToLeftDirectionTimerId;

    useEffect(() => {

      if(storkPositionX > 20 && storkDirection == 0){
        storkLeftTimerId = setInterval(() => {
          setStorkPosition(storkPositionX => storkPositionX - 10)
        }, 100)

        return () => {
        clearInterval(storkLeftTimerId)
        }
      }

      else if(storkPositionX <= 20 && storkDirection == 0){
        storkChangeToRightDirectionTimerId = setInterval(() => {
          setStorkDirection(storkDirection + 1);
        }, 100)

        return () => {
          clearInterval(storkChangeToRightDirectionTimerId)
        }
      }

      else if(storkPositionX < (screenWitdth - 50) && storkDirection == 1){
        storkRightTimerId = setInterval(() => {
          setStorkPosition(storkPositionX => storkPositionX + 10)
        }, 100)

        return () => {
          clearInterval(storkRightTimerId)
        }
      }

      else if(storkPositionX >= (screenWitdth - 50) && storkDirection == 1){
        storkChangeToLeftDirectionTimerId = setInterval(() => {
          setStorkDirection(storkDirection - 1);
        }, 100)

        return () => {
          clearInterval(storkChangeToLeftDirectionTimerId)
        }
      }
    })

//########## STORK LOGIC ##########
/*useEffect(() => {

  if(storkPositionX > 0 && wayOfMoving == 0) {
    storkTimerId = setInterval(() => {
      setStorkPosition(storkPositionX => storkPositionX - 10)
    }, 100)

    return () => {
      clearInterval(storkTimerId)
    }
  }

  else if(storkPositionX = 100) {
    storkTimerId = setInterval(() => {
      setWayOfMoving(wayOfMoving => wayOfMoving + 1)
    }, 100)

    return () => {
      clearInterval(storkTimerId)
    }
  }
  else if(storkPositionX < screenWitdth && wayOfMoving == 1) {
    storkTimerId = setInterval(() => {
      setStorkPosition(storkPositionX => storkPositionX + 10)
    }, 100)

    return () => {
      clearInterval(storkTimerId)
    }
  }
}, [storkPositionX])*/
    //console.log(screenWitdth);
    //console.log(frogBottom);

    //creating on press method to check where user clicked on the screen and make a proper move
    const onPress = (evt) => {

      //console.log(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
      console.log(score);
    
      let touchPositionX = evt.nativeEvent.locationX;
      let touchPositionY = evt.nativeEvent.locationY;

      //frog moves logic
      let move = 0;

      //add here verifying if user clicked on the Fly!!!

      //calculate screenHeight
      let flyCatchingScreenHeighTop = screenHeight / 3;
      let flyCatchingScreenHeighBottom = screenHeight - (screenHeight / 3);

      //console.log('flyCatchingScreenHeighTop: ' + flyCatchingScreenHeighTop);
      //console.log('flyCatchingScreenHeighBottom' + flyCatchingScreenHeighBottom);

      /*if(touchPositionY < flyCatchingScreenHeighBottom && touchPositionY >= flyCatchingScreenHeighTop) {
        console.log('This is the place where we should catch the fly!')
      }*/
    
      //left move in case frog position bigger than 25 (because frog size is set to 50)
      if(touchPositionX < (screenWitdth / 2) && touchPositionY > screenHeight - (screenHeight / 3) && frogPosition >= 25) {
        move = -10
      }
      //right move in case frog position is less than screen width
      else if (touchPositionX > (screenWitdth / 2) && touchPositionY > screenHeight - (screenHeight / 3) && frogPosition <= screenWitdth - 25){
        move = 10
      }
      //left move in case frog position less than 0
      else if (touchPositionX < (screenWitdth / 2) && touchPositionY > screenHeight - (screenHeight / 3) && frogPosition <= 25) {
        move = 0
      }
      //right move in case frog position more than screen width
      else if (touchPositionX < (screenWitdth / 2) && touchPositionY > screenHeight - (screenHeight / 3) && frogPosition >= screenWitdth - 25) {
        move = 0
      }

      //console.log('Current move: ' + move);

      //console.log('Current frog position: ' + frogPosition);

      setFrogPosition( frogPosition => frogPosition + move);
      //console.log('Current frog positionafter move: ' + frogPosition);
    
    }

    //console.log(prepareFlyPosition())

    //let flyPosition = prepareFlyPosition(screenWitdth, screenHeight);
    //console.log('This is current fly position: ' + flyPosition);
    //prepareFlyPosition

    //update fly posigtion only when it's needed
    //let updateFlyPosition = true

    //more flys
    let howManyFlys = 5;
    let flysArray = []

    //const [test, setTest] = useState(0);

    for(let i=0; i<howManyFlys ;i++){
      flysArray.push(
        <Fly
          //key={i}
          //onTouchStart={() => handleClick()}
          screenWitdth={screenWitdth}
          screenHeight={screenHeight}
        />);
    }

    /*changeStatus = () => {
      setFlyStatus(flyStatus => !flyStatus);
      console.log('new status: ' + flyStatus)
    */

    //const [test, setTest] = useState(0);

    //console.log('current test: ' + test)

    //function onClick() {
      //console.log('in cardClick');
      //setNewFlyPosition(newFlyPosition => prepareFlyPosition(screenWitdth, screenHeight));
    //  setScore(score => score + 1)
    //  console.log('actual score: ' + score);
      //return !hide;
      //flyPosition = prepareFlyPosition(screenWitdth, screenHeight);

      /*useEffect(() => {
          flyPosition = prepareFlyPosition(screenWitdth, screenHeight);
      })*/
  //}


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onTouchStart={onPress}>
          <Button style={{ flex: 1, alignItems: 'stretch'}} title="Back"
        onPress={() => navigation.navigate('Home')}/>
            <Stork 
              screenWitdth={screenWitdth}
              screenHeight={screenHeight}
              storkPositionX={storkPositionX}
            />
            <Fly 
              //onTouchStart={onClick}
              //flyPositionX={flyPosition[0]}
              //flyPositionY={flyPosition[1]}
              screenWitdth={screenWitdth}
              screenHeight={screenHeight}
              //hide={flyStatus}
              //func={getFlyPositionDetails}
            />
          {flysArray}
          <Frog
            frogBottom={frogBottom}
            frogLeft={frogLeft}
            frogPosition={frogPosition}
          />
          <Floor //onTouchStart={changeStatus}
            floorWidth={screenWitdth}
            floorHeight={50}
          />
        </View>
    );
  }