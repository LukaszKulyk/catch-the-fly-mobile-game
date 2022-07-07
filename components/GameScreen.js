import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button, Image, Pressable, StatusBar, Dimensions } from 'react-native';
import GameButton from './GameButton';
import Stork from './Stork';
import { GameEngine, GameLoop } from 'react-native-game-engine';
import NewGameScreen from './NewGameScreen';
import Finger from './renderers';
import { MoveFinger, Physics, UpdateFrogPosition } from './systems';
import Box from './Box';
import Matter from 'matter-js';
import Frog from './Frog';
import { TouchableHighlight } from 'react-native-web';

export default function GameScreen({ navigation }) {

  //box consts
  const { width, height } = Dimensions.get("screen");
  const boxSize = Math.trunc(Math.max(width, height) * 0.075);
  const initialBox = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);

  //frog consts
  const frog = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);

  //floor consts
  const floor = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });

  //world
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;

  //adding bodies to the created world
  Matter.World.add(world, [initialBox, frog, floor]);

  return (
    <View>
      {/*<GameEngine 
        style={styles.container}
        systems={[MoveFinger]}
        entities={{
          1: { position: [40,  200], renderer: <Finger />}, //-- Notice that each entity has a unique id (required)
          2: { position: [100, 200], renderer: <Finger />}, //-- and a map of components. Each entity has an optional
          3: { position: [160, 200], renderer: <Finger />}, //-- renderer component. If no renderer is supplied with the
          4: { position: [220, 200], renderer: <Finger />}, //-- entity - it won't get displayed.
          5: { position: [280, 200], renderer: <Finger />}
        }}
      >
        <StatusBar hidden={true} />
      </GameEngine> */}
      <GameEngine
        style={styles.container}
        systems={[Physics]}
        entities={{
          physics: {
            engine: engine,
            world: world
          },
          /*initialBox: {
            body: initialBox,
            size: [boxSize, boxSize],
            color: 'red',
            renderer: Box
          },*/
          frog: {
            body: frog,
            size: [boxSize, boxSize],
            color: 'blue',
            renderer: Frog
          },
          floor: {
            body: floor,
            size: [width, boxSize],
            color: 'green',
            renderer: Box
          }
        }}
      >
      </GameEngine>
      <GameButton
          title="Back"
          onPress={() => navigation.navigate('Home')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});

//AppRegistry.registerComponent("BestGameEver", () => BestGameEver);