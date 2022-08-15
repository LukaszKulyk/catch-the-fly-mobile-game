import React from "react";
import { StlyeSheet, Text, View } from "react-native";
//import { Image } from "react-native";

const Frog = ({frogBottom, frogLeft, frogPosition}) => {

    const frogWidth = 50;
    const frogHeight = 50;

    return (
        // <Image source={require('../../assets/frog.png')}
        // style={{
        //     position: 'absolute',
        //     //backgroundColor: 'blue',
        //     width: frogWidth,
        //     height: frogHeight,
        //     left: frogPosition - (frogWidth / 2),
        //     //bottom: frogBottom - (frogHeight / 2),
        //     bottom: frogHeight
        // }}>
        // </Image>
        <View
            style={{
                position: 'absolute',
                backgroundColor: 'blue',
                width: frogWidth,
                height: frogHeight,
                left: frogPosition - (frogWidth / 2),
                //bottom: frogBottom - (frogHeight / 2),
                bottom: frogHeight
            }}>
        </View>
    );
}

export default Frog;