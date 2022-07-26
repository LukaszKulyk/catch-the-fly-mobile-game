import React, { useEffect, useState } from "react";
import { View } from "react-native";
//import prepareFlyPosition from '../../helpers/helpers';

const Stork = React.memo(({screenWitdth, screenHeight, storkPositionX, storkPositionY}) => {

    const storkWidth = 50;
    const storkHeight = 50;


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