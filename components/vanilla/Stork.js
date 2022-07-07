import React, { useEffect, useState } from "react";
import { View } from "react-native";
//import prepareFlyPosition from '../../helpers/helpers';

const Stork = React.memo(({screenWitdth, screenHeight, storkPositionX}) => {

    const storkWidth = 50;
    const storkHeight = 50;

    let [storkPosX, setStorkPosX] = useState(screenWitdth / 2);

    const storkMove = 10;
    let storkTimerId;

    let moveDirection = 0;

    //moving stork left/right
    /*useEffect(() => {
        if(storkPosX >= 0 && moveDirection == 0) {
            storkTimerId = setInterval(() => {
                setStorkPosX(storkPosX => storkPosX - storkMove);
            }, 100)
            moveDirection = 1;
        }
        else if(storkPosX <= screenWitdth && moveDirection == 1){
            storkTimerId = setInterval(() => {
                setStorkPosX(storkPosX => storkPosX + storkMove);
            }, 100)
            moveDirection = 0;
        }

        return () => {
            clearInterval(storkTimerId)
        }
    }, [storkPosX])*/

    /*useEffect(() => {
        storkTimerId = setInterval(() => {
            if(storkPosX > 0 && moveDirection == 0){
                setStorkPosX(storkPosX => storkPosX - storkMove);
            }
            else if(storkPosX = screenWitdth && moveDirection == 0){
                //setStorkPosX(storkPosX => storkPosX + storkMove);
                moveDirection = 1;
            }
            else if(storkPosX < screenWitdth && moveDirection == 1){
                setStorkPosX(storkPosX => storkPosX + storkMove);
                //moveDirection = 0;
            }
            else if(storkPosX = screenWitdth && moveDirection == 1){
                //setStorkPosX(storkPosX => storkPosX + storkMove);
                moveDirection = 0;
            }
        }, 30)

        return () => {
            clearInterval(storkTimerId)
        }
    }, [storkPosX])*/


    //let flyPosition = prepareFlyPosition(screenWitdth, screenHeight);

    //const [newFlyPosition, setNewFlyPosition] = useState(flyPosition);

    //let storkPositionX = 0;
    let storkPositionY = screenHeight - (storkHeight * 2);


    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor: 'yellow',
                width: storkWidth,
                height: storkHeight,
                //left: storkPositionX,
                left: storkPositionX,
                bottom: storkPositionY,
        }}></View>
    );
})

export default Stork;