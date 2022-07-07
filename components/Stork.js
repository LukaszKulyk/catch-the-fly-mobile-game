import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';

export default function StorkComponent(props) {

    const { source } = props;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>This is a Stork component.</Text>
          <Image 
            source={source}
            //style={{ width: 50, height: 50}}
          />
        </View>
      );
}

