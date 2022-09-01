import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import GameButton from './GameButton';
import Frog from './vanilla/Frog'
import Floor from './vanilla/Floor';
import Fly from './vanilla/Fly';
import Stork from './vanilla/Stork'
import {doesStorkGoDown} from '../helpers/helpers';
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

    let [storkPositionX, setStorkPosition] = useState(screenWitdth / 2);
    let [storkDirection, setStorkDirection] = useState(1);
    let [storkPositionY, setStorkPositionY] = useState(screenHeight - 100)

    //timers for stork walking
    let storkLeftTimerId;
    let storkChangeToRightDirectionTimerId;
    let storkRightTimerId;
    let storkChangeToLeftDirectionTimerId;
    let storkGoDownTimerId;
    let storkStartAtTheTop;
    //COLLISIONS
    let collisionDetectionTimerId;

    useEffect(() => {

      if(!isGameOver) {

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

    })

//########## STORK LOGIC END ##########
//########## FROG LOGIC START ##########

    //creating on press method to check where user clicked on the screen and make a proper move
    const onPress = (evt) => {

      if(!isGameOver) {
    
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
//########## HIGH SCORE LOGIC STARTS ##########

  //const highScoreString = localStorage.getItem(HIGH_SCORES);
    //const highScores = JSON.parse(highScoreString) ?? [];
    //const lowestScore = highScores[NO_OF_HIGH_SCORES — 1]?.score ?? 0;
    
  // function checkHighScore(score) {
  //   const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
  //   const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;//add here lenght maybe??
  //   console.log('Current lowest score: ' + lowestScore)
    
  //   //new way to find last score
  //   //const lenghOfHighScores = highScores.length;
  //   //const lowestScore = highScores[lenghOfHighScores - 1]
          
  //   if (score > lowestScore) {
  //     console.log("Let's start saving new High Score")
  //     saveHighScore(score, highScores); // TODO
  //     //showHighScores(); // TODO
  //     //console.log(localStorage.getItem(HIGH_SCORES))
  //   }
  // }

  // function saveHighScore(score, highScores) {

  //   const name = 'Test';
  //   const newScore = {score, name};
  //   console.log("New score to be saved: " + newScore.name + ' ' + newScore.score)

  //   //Add to the list
  //   highScores.push(newScore);
  //   // highScores.forEach(element => {
  //   //   console.log("Current array of scores (push): " + element.name + ' ' + element.score)

  //   // })
  //   //console.log("Current array of scores (push): " + highScores.name + ' ' + highScores.score)

  //   //Sort the list
  //   highScores.sort((a, b) => b.score - a.score);
  //   // highScores.forEach(element => {
  //   //   console.log("Current array of scores (sort): " + element.name + ' ' + element.score)

  //   // })
  //   //console.log("Current array of scores (sort): " + highScores.name + ' ' + highScores.score)

  //   //Select new list
  //   highScores.splice(NO_OF_HIGH_SCORES);
  //   // highScores.forEach(element => {
  //   //   console.log("Current array of scores (splice): " + element.name + ' ' + element.score)

  //   // })
  //   //console.log("Current array of scores (splice): " + highScores.name + ' ' + highScores.score)

  //   //Save to local storage
  //   localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
  //   highScores.forEach(element => {
  //     console.log("Current array of scores (setItem): " + element.name + ' ' + element.score)

  //   })
  // }

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
//########## HIGH SCORE LOGIC ENDS ##########

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
          {isGameOver && <Text>GAME OVER</Text>}
          {isGameOver && <Text>YOUR SCORE:</Text>}
          {isGameOver && <Text>{score}</Text>}
          {isGameOver && <Text>{localStorage.getItem(HIGH_SCORES)}</Text>}
          {isGameOver && <GameButton
                            title="Back"
                            onPress={() => navigation.navigate('Home')}
                        />}
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