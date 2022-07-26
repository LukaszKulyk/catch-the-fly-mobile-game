import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {prepareFlyPosition} from '../../helpers/helpers';

const Fly = React.memo(({screenWitdth, screenHeight, setScore, hide, func, flyPositionX, flyPositionY}) => {

    const flyWidth = 50;
    const flyHeight = 50;

    //const [newFlyPosition, setNewFlyPosition] = useState();

    let flyPosition = prepareFlyPosition(screenWitdth, screenHeight);

    const [newFlyPosition, setNewFlyPosition] = useState(flyPosition);

    //const [score, setScore] = useState(0);

    function handleClick() {
        //console.log('in cardClick');
        setNewFlyPosition(newFlyPosition => prepareFlyPosition(screenWitdth, screenHeight));
        setScore(score => score + 1)
        //setScore(score => score + 1)
        //console.log('actual score: ' + score);
        //return !hide;
        //flyPosition = prepareFlyPosition(screenWitdth, screenHeight);

        /*useEffect(() => {
            flyPosition = prepareFlyPosition(screenWitdth, screenHeight);
        })*/
    }

    return (
        <View //key={5}
            onTouchStart={() => handleClick()} 
            style={{
                position: 'absolute',
                backgroundColor: 'red',
                width: flyWidth,
                height: flyHeight,
                //left: flyPositionX,
                //left: flyPosition[0],
                left: newFlyPosition[0],
                //bottom: frogBottom - (frogHeight / 2),
                //bottom: flyPositionY,
                //bottom: flyPosition[1],
                bottom: newFlyPosition[1],
                //func: 'does it really gonna work?'
        }}></View>
    );
})

export default Fly;