import Matter from "matter-js";

import { Dimensions  } from "react-native";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const MoveFinger = (entities, { touches }) => {
    
    touches.filter(t => t.type === "move").forEach(t => {
        let finger = entities[t.id];
        if (finger && finger.position) {
            finger.position = [
                finger.position[0] + t.delta.pageX,
                finger.position[1] + t.delta.pageY,
            ]
        }
    });

    return entities;
}
/*
const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let frog = entities.frog.body;

    touches.filter(t => t.type === "press").forEach(t => {
        //Matter.Body.applayForce(frog, {x: frog.position.x, y: frog.position.y}, {x: -0.10, y:-0.10})
        Matter.Body.setVelocity(frog, {x: 0, y: -8 })
    })

    Matter.Engine.update(engine, time.delta);
    return entities;
}*/

const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let frog = entities.frog.body;

    
    touches.filter(t => t.type === "press").forEach(t => {
        //Matter.Body.applayForce(frog, {x: frog.position.x, y: frog.position.y}, {x: -0.10, y:-0.10})
        //Matter.Body.setVelocity(frog, {x: 0, y: -8 })

        /*if(t.pageX < windowWidth / 2) {
            Matter.Body.setVelocity(frog, {x: 2, y: 0 })
        }
        else {
            Matter.Body.setVelocity(frog, {x: -2, y: 0 })
        }*/
        Matter.Body.setVelocity(frog, {x: -2, y: 0})
    })
/*
    let move = touches.find(x => x.type === "move");
      if (move) {
        // move.delta.pageX is negative if moving fingers to the left
        // move.delta.pageX is negative if moving fingers to the top
        const newPosition = {
          x: frog.position.x + move.delta.pageX, 
          y: frog.position.y + move.delta.pageY
        };
        Matter.Body.setPosition(frog, newPosition);
      }
*/

    Matter.Engine.update(engine, time.delta);
    return entities;
}

/*
const UpdateFrogPosition = (entities, { touches }) => {

    let engine = entities['physics'].engine; 

    touches.filter(t => t.type === 'press').forEach(t => 
        { 
            //Matter.Body.setVelocity(entities.frog.body, { x: x - 1, y: entities.Plane.body.velocity.y, }); 
            let frog = entities[t.frog];
            frog.left = -3;
        }); 
    Matter.Engine.update(engine); 
    return entities;
};*/

/*const MoveFrog = (entities, { touches }) => {

}*/

export { MoveFinger, Physics };