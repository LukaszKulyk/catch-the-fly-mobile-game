import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button, Image, Pressable, Dimensions } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-web';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { NavigationContainer } from '@react-navigation/native';
//import GameButton from './GameButton';
//import Stork from './Stork';
import Frog from './vanilla/Frog'
import Floor from './vanilla/Floor';
import Fly from './vanilla/Fly';
import Stork from './vanilla/Stork'
//import { TouchableOpacity } from 'react-native-web';
//import prepareFlyPosition from '../helpers/helpers';
import {doesStorkGoDown} from '../helpers/helpers';

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

    //const [frogPosition, setFrogPosition] = useState(screenWitdth / 2);

    //const [test, setTest] = useState(0);

    //const [newFlyPosition, setNewFlyPosition] = useState(flyPosition);

    //let [score, setScore] = useState(0);

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

//########## STORK LOGIC START ##########

    const [isGameOver, setIsGameOver]= useState(false)

    const [frogPosition, setFrogPosition] = useState(screenWitdth / 2);

    let [storkPositionX, setStorkPosition] = useState(screenWitdth / 2);
    let [storkDirection, setStorkDirection] = useState(1);
    let [storkPositionY, setStorkPositionY] = useState(screenHeight - 100)
    //let [isStorkGoingDown, setIfStorkIsGoingDown] = useState(0);
    //let [countStorkMovements, setNewStorkMovementValue] = useState(0);

    //timers for stork walking
    let storkLeftTimerId;
    let storkChangeToRightDirectionTimerId;
    let storkRightTimerId;
    let storkChangeToLeftDirectionTimerId;
    let storkGoDownTimerId;
    let storkStartAtTheTop;
    //COLLISIONS
    let collisionDetectionTimerId;

    //let countStorkMoves = 0;

    //console.log(doesStorkGoDown())

    useEffect(() => {

      let doesStorkGoesDown = doesStorkGoDown();

      if(storkPositionX > 0 && storkDirection == 0){
        storkLeftTimerId = setInterval(() => {
          //setStorkPosition(storkPositionX => storkPositionX - 10)
          if(doesStorkGoesDown == true && frogPosition == storkPositionX) {
            setStorkDirection(storkDirection + 2);
          }
          else {
            setStorkPosition(storkPositionX => storkPositionX - 10)
          }
        }, 100)

        return () => {
        clearInterval(storkLeftTimerId)
        }
      }

      else if(storkPositionX <= 0 && storkDirection == 0){
        storkChangeToRightDirectionTimerId = setInterval(() => {
          setStorkDirection(storkDirection + 1);
        }, 100)

        return () => {
          clearInterval(storkChangeToRightDirectionTimerId)
        }
      }

      else if(storkPositionX < (screenWitdth - 50) && storkDirection == 1){
        storkRightTimerId = setInterval(() => {
          //setStorkPosition(storkPositionX => storkPositionX + 10)
          if(doesStorkGoesDown == true && frogPosition == storkPositionX) {
            setStorkDirection(storkDirection + 1);
          }
          else {
            setStorkPosition(storkPositionX => storkPositionX + 10)
          }
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
//NEW CODE
      //COLLISIONS
      else if(storkDirection == 2 && storkPositionY <= 100 && storkPositionY >= 30 && frogPosition == storkPositionX){
        collisionDetectionTimerId = setInterval(() => {
          setIsGameOver(true)
        }, 100)

        return () => {
          clearInterval(collisionDetectionTimerId)
        }
      }

      else if(storkDirection == 2 && storkPositionY > 0) {
        storkGoDownTimerId = setInterval(() => {
          setStorkPositionY(storkPositionY => storkPositionY - 30)
          //console.log('Current stork positionY: ' + storkPositionY)
        }, 100)

        return () => {
          clearInterval(storkGoDownTimerId)
        }
      }

      else if(storkDirection == 2 && storkPositionY <= 0) {
        storkStartAtTheTop = setInterval(() => {
          setStorkPositionY(storkPositionY => screenHeight - 100)
          setStorkDirection(storkDirection - 1);
        }, 100)

        return () => {
          clearInterval(storkStartAtTheTop)
        }
      }

    })

    //console.log('COunting movements: ' + countStorkMoves)
    //setIsGameOver(true)
console.log('### SCREEN HEIGHY: ' + screenHeight)
console.log('### SCREEN WIDTH: ' + screenWitdth)
console.log('Stork position X: ' + storkPositionX)
console.log('####################### Frog position X: ' + (frogPosition - 25))
console.log('Stork position Y: ' + storkPositionY)
console.log('############## IS GAME OVER? ' + isGameOver)
//########## STORK LOGIC END ##########
//########## FROG LOGIC START ##########

    //const [frogPosition, setFrogPosition] = useState(screenWitdth / 2);
    //creating on press method to check where user clicked on the screen and make a proper move
    const onPress = (evt) => {

      //console.log(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
      //console.log(score);
    
      let touchPositionX = evt.nativeEvent.locationX;
      let touchPositionY = evt.nativeEvent.locationY;

      //frog moves logic
      let move = 0;

      //add here verifying if user clicked on the Fly!!!

      //calculate screenHeight
      //let flyCatchingScreenHeighTop = screenHeight / 3;
      //let flyCatchingScreenHeighBottom = screenHeight - (screenHeight / 3);

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

      setFrogPosition(frogPosition => frogPosition + move);
      //console.log('Current frog positionafter move: ' + frogPosition);
    
    }
//########## FROG LOGIC END ##########
//########## FLY LOGIC START ##########
    let [score, setScore] = useState(0);
//########## FLY LOGIC END ##########
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
            key={i}
            //onTouchStart={() => handleClick()}
            screenWitdth={screenWitdth}
            screenHeight={screenHeight}
            setScore={setScore}
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
          {isGameOver && <Text>{score}</Text>}
          <Button style={{ flex: 1, alignItems: 'stretch'}} title="Back"
        onPress={() => navigation.navigate('Home')}/>
            <Stork 
              screenWitdth={screenWitdth}
              screenHeight={screenHeight}
              storkPositionX={storkPositionX}
              storkPositionY={storkPositionY}
            />
              <Fly 
                key={6}
                //onTouchStart={onClick}
                //flyPositionX={flyPosition[0]}
                //flyPositionY={flyPosition[1]}
                screenWitdth={screenWitdth}
                screenHeight={screenHeight}
                setScore={setScore}
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