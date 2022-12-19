import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback, ImageBackground, Modal, TextInput } from 'react-native';
import GameButton from './GameButton';
import Frog from './vanilla/Frog'
import Floor from './vanilla/Floor';
import Fly from './vanilla/Fly';
import Stork from './vanilla/Stork'
import {doesStorkGoDown, generateRandomNumberInRange} from '../helpers/helpers';
//import { ImageBackground } from 'react-native';
import 'localstorage-polyfill';
import * as highScoreHelpers from '../helpers/highScoreHelpers';

  export default function NewGameScreen({ navigation }) {

    //get screen resolution
    const screenWitdth = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;

    const frogLeft = screenWitdth / 2;

    const [frogBottom, setFrogBottom] = useState(screenWitdth / 2);

    const NO_OF_HIGH_SCORES = 10;
    const HIGH_SCORES = 'highScores';

//########## STORK LOGIC START ##########

    const [isGameOver, setIsGameOver]= useState(false)

    const [frogPosition, setFrogPosition] = useState(screenWitdth / 2);

    // let [storkPositionX, setStorkPosition] = useState(screenWitdth / 2);
    let [storkPositionX, setStorkPosition] = useState(generateRandomNumberInRange(0, screenWitdth - 50));
    let [storkDirection, setStorkDirection] = useState(1);
    let [storkPositionY, setStorkPositionY] = useState(screenHeight - 100)

    const [counter, setCounter] = useState(3);

    //timers for stork walking
    let storkLeftTimerId;
    let storkChangeToRightDirectionTimerId;
    let storkRightTimerId;
    let storkChangeToLeftDirectionTimerId;
    let storkGoDownTimerId;
    let storkStartAtTheTop;
    //COLLISIONS
    let collisionDetectionTimerId;

    let counterTimerId;

    useEffect(() => {

      if(!isGameOver && counter == 0) {

        let doesStorkGoesDown = doesStorkGoDown();

        if(storkPositionX > 0 && storkDirection == 0){
          storkLeftTimerId = setInterval(() => {
            if(doesStorkGoesDown == true && (frogPosition <= storkPositionX + 50 && frogPosition >= storkPositionX - 50)) {
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
            if(doesStorkGoesDown == true && (frogPosition <= storkPositionX + 50 && frogPosition >= storkPositionX - 50)) {
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
        //COLLISIONS
        else if(storkDirection == 2 && storkPositionY <= 100 && storkPositionY >= 30 && (frogPosition <= storkPositionX + 50 && frogPosition >= storkPositionX - 50)){
          collisionDetectionTimerId = setInterval(() => {
            //setIsGameOver(true)
            //checkHighScore(score)
            gameOver()
          }, 100)

          return () => {
            clearInterval(collisionDetectionTimerId)
          }
        }

        else if(storkDirection == 2 && storkPositionY > 0) {
          storkGoDownTimerId = setInterval(() => {
            setStorkPositionY(storkPositionY => storkPositionY - 30)
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
    }
    else if (!isGameOver && counter > 0) {
      counterTimerId = setInterval(() => {
        setCounter(counter => counter - 1)
      }, 1000)

      return () => {
        clearInterval(counterTimerId)
      }
    }

    })

//########## STORK LOGIC END ##########
//########## FROG LOGIC START ##########

    //creating on press method to check where user clicked on the screen and make a proper move
    const onPress = (evt) => {

      if(!isGameOver && counter == 0) {
    
        let touchPositionX = evt.nativeEvent.locationX;
        let touchPositionY = evt.nativeEvent.locationY;

        //frog moves logic
        let move = 0;
      
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

        setFrogPosition(frogPosition => frogPosition + move);
    }
    
    }

//########## FROG LOGIC END ##########
//########## FLY LOGIC START ##########
    let [score, setScore] = useState(0);
//########## FLY LOGIC END ##########

  function gameOver() {
    clearInterval(collisionDetectionTimerId)
    clearInterval(storkStartAtTheTop)
    clearInterval(storkGoDownTimerId)
    clearInterval(storkChangeToLeftDirectionTimerId)
    clearInterval(storkRightTimerId)
    clearInterval(storkChangeToRightDirectionTimerId)
    clearInterval(storkLeftTimerId)
    //setIsGameOver(true)
    //checkHighScore(score)
    highScoreHelpers.checkHighScore(score)
    setIsGameOver(true)
    //console.log(localStorage.getItem(HIGH_SCORES))
  }

    //more flys
    let howManyFlys = 6;
    let flysArray = []

    for(let i=0; i<howManyFlys ;i++){
      flysArray.push(
          <Fly
            key={i}
            screenWitdth={screenWitdth}
            screenHeight={screenHeight}
            setScore={setScore}
          />);
    }

    return (
      <ImageBackground source={require('../assets/background_image.png')} style={{flex: 1, width: null, height: null}}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {!isGameOver && <Text style={{
                                  position: 'absolute',
                                  top: 100,
                                  right: 30,
                                  opacity: 0.5,
                                  fontSize: 50, 
                                  color: '#306108'
                                  }}>{score}</Text>}
          {isGameOver && <Text>GAME OVER</Text>}
          {isGameOver && <Text>YOUR SCORE:</Text>}
          {isGameOver && <Text>{score}</Text>}
          {isGameOver && <Text>{localStorage.getItem(HIGH_SCORES)}</Text>}
          {isGameOver && <GameButton
                            title="Back"
                            onPress={() => navigation.navigate('Home')}
                        />}
          {!isGameOver && counter > 0 && <Text style={{fontSize: 120, color: '#306108'}}>{counter}</Text>}
          {!isGameOver && <Stork 
            screenWitdth={screenWitdth}
            screenHeight={screenHeight}
            storkPositionX={storkPositionX}
            storkPositionY={storkPositionY}
          />}
          {!isGameOver && flysArray}
          {!isGameOver && <Frog
            frogBottom={frogBottom}
            frogLeft={frogLeft}
            frogPosition={frogPosition}
          />}
          <Floor
            floorWidth={screenWitdth}
            floorHeight={50}
          />
        </View>
      </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }