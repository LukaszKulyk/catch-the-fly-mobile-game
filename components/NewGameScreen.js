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

    let [gameLvl, setGameLvl] = useState(1);

//########## STORK LOGIC START ##########

    const [isGameOver, setIsGameOver]= useState(false)

    const [frogPosition, setFrogPosition] = useState(screenWitdth / 2);

    // let [storkPositionX, setStorkPosition] = useState(screenWitdth / 2);
    let [storkPositionX, setStorkPosition] = useState(generateRandomNumberInRange(0, screenWitdth - 50));
    let [storkDirection, setStorkDirection] = useState(1); //0 -> go left | 1 -> go right | 2 -> go down
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

    let gameLvlTimerId;


    //Whole game logic
    useEffect(() => {

      //if game in progress and counter before the game ends (3 -> 0) lets start the game
      if(!isGameOver && counter == 0) {

        //returns value true/false which decides if stork goes down
        let doesStorkGoesDown = doesStorkGoDown();

        //if storkPositionX is higher than 0 and storkDirection is 0 (stok goes to the left)
        if(storkPositionX > 0 && storkDirection == 0){
          storkLeftTimerId = setInterval(() => {
            //if doesStorkGoesDown is set to true and frog and stork  X positions are on the same X line then stork goes down.
            if(doesStorkGoesDown == true && (frogPosition <= storkPositionX + 50 && frogPosition >= storkPositionX - 50)) {
              setStorkDirection(storkDirection + 2);
            }
            //if frog and stork are not in the same X line, move stork as it was before.
            else {
              setStorkPosition(storkPositionX => storkPositionX - 10)
            }
          }, 100 / gameLvl)

          return () => {
          clearInterval(storkLeftTimerId)
          }
        }

        //if stork came to the left end of the screen and stork direction is set to go left then change stork direction to 'go left'
        else if(storkPositionX <= 0 && storkDirection == 0){
          storkChangeToRightDirectionTimerId = setInterval(() => {
            setStorkDirection(storkDirection + 1);
          }, 100 / gameLvl)

          return () => {
            clearInterval(storkChangeToRightDirectionTimerId)
          }
        }

        //if storkPosittion is still on the screen and stork direction is set to 'go right'
        else if(storkPositionX < (screenWitdth - 50) && storkDirection == 1){
          storkRightTimerId = setInterval(() => {
            //if doesStorkGoesDown is set to true and frog and stork  X positions are on the same X line then stork goes down.
            if(doesStorkGoesDown == true && (frogPosition <= storkPositionX + 50 && frogPosition >= storkPositionX - 50)) {
              setStorkDirection(storkDirection + 1);
            }
            //if frog and stork are not in the same X line, move stork as it was before.
            else {
              setStorkPosition(storkPositionX => storkPositionX + 10)
            }
          }, 100)

          return () => {
            clearInterval(storkRightTimerId)
          }
        }

        //if stork came to the right end of the screen and stork direction is set to go right then change stork direction to 'go left'
        else if(storkPositionX >= (screenWitdth - 50) && storkDirection == 1){
          storkChangeToLeftDirectionTimerId = setInterval(() => {
            setStorkDirection(storkDirection - 1);
          }, 100 / gameLvl)

          return () => {
            clearInterval(storkChangeToLeftDirectionTimerId)
          }
        }
        //COLLISIONS
        //if stork goes down and stork Y position is on the same like as frog position (if they touch eachother) then the game is over.
        else if(storkDirection == 2 && storkPositionY <= 100 && storkPositionY >= 30 && (frogPosition <= storkPositionX + 50 && frogPosition >= storkPositionX - 50)){
          collisionDetectionTimerId = setInterval(() => {
            //setIsGameOver(true)
            //checkHighScore(score)
            gameOver()
          }, 100 / gameLvl)

          return () => {
            clearInterval(collisionDetectionTimerId)
          }
        }

        //if stork goes down and his Y position is still above the top of the frog then go down.
        else if(storkDirection == 2 && storkPositionY > 0) {
          storkGoDownTimerId = setInterval(() => {
            setStorkPositionY(storkPositionY => storkPositionY - 30)
          }, 100 / gameLvl)

          return () => {
            clearInterval(storkGoDownTimerId)
          }
        }

        //if stork went down to the bottom of the screen then set new stork Y position and set stork direction.
        else if(storkDirection == 2 && storkPositionY <= 0) {
          storkStartAtTheTop = setInterval(() => {
            setStorkPositionY(storkPositionY => screenHeight - 100)
            //setStorkDirection(storkDirection - 1);
            setStorkDirection(generateRandomNumberInRange(0, 2));
          }, 100 / gameLvl)

          return () => {
            clearInterval(storkStartAtTheTop)
          }
        }
    }
    //if gameOver is false and counter still counts before the game (3,2,1...)
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

      //if game is not over and counter counting has ended then let start the game.
      if(!isGameOver && counter == 0) {
    
        //get location of the touch on the screen by the user.
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
    clearInterval(gameLvlTimerId)
  }

    //more flys

    let howManyFlys = gameLvl * 2;
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