import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {prepareFlyPosition} from '../../helpers/helpers';
import { Image } from "react-native"

const Fly = React.memo(({screenWitdth, screenHeight, setScore, hide, func, flyPositionX, flyPositionY}) => {

    const flyWidth = 50;
    const flyHeight = 50;

    //const [newFlyPosition, setNewFlyPosition] = useState();

    let flyPosition = prepareFlyPosition(screenWitdth, screenHeight);

    const [newFlyPosition, setNewFlyPosition] = useState(flyPosition);

    //const [score, setScore] = useState(0);
    const img1 = require('../../assets/wazka_basic_black_0.png');
    // const img2 = require('../../assets/wazka_basic_black_1.png');
    // const img3 = require('../../assets/wazka_basic_black_2.png');

    // const imgArray = [img1, img2, img3]
    // let imgTimerId;

    // const [img, setNewImg] = useState(img1)

    // useEffect(() => {
    //     imgTimerId = setInterval(() => {
    //         if(img == img1) {
    //             setNewImg(img => img2)
    //         }
    //         else if (img == img2) {
    //             setNewImg(img => img3)
    //         }
    //         else if (img == img3) {
    //             setNewImg(img => img1)
    //         }

    //     }, 100)

    //     return () => {
    //         clearInterval(imgTimerId);
    //     }
    // })

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
        // <View //key={5}
        //     onTouchStart={() => handleClick()} 
        //     style={{
        //         position: 'absolute',
        //         backgroundColor: 'red',
        //         width: flyWidth,
        //         height: flyHeight,
        //         left: newFlyPosition[0],
        //         bottom: newFlyPosition[1],
        // }}></View>
        <Image source={img1}
            onTouchStart={() => handleClick()} 
                style={{
                    position: 'absolute',
                    //backgroundColor: 'red',
                    width: flyWidth,
                    height: flyHeight,
                    left: newFlyPosition[0],
                    bottom: newFlyPosition[1],
            }}
        ></Image>
    );
})

export default Fly;