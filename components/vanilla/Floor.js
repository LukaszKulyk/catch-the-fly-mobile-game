import React from "react";
import { StlyeSheet, Text, View } from "react-native";

const Floor = ({floorWidth, floorHeight}) => {

    //const frogWidth = 50;
    //const frogHeight = 50;

    return (
        <View style={{
            position: 'absolute',
            backgroundColor: 'green',
            width: floorWidth,
            height: floorHeight,
            //left: frogPosition - (frogWidth / 2),
            //bottom: frogBottom - (frogHeight / 2),
            bottom: 0
        }}></View>
    );
}

export default Floor;