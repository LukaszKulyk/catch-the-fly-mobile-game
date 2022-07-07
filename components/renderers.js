import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from "react-native";

const RADIUS = 20;

export default function Finger(props) {

    const x = props.position[0] - RADIUS / 2;
    const y = props.position[1] - RADIUS / 2;

    return (
        <View style={[styles.finger, { left: x, top: y }]} />
    );
  }

  const styles = StyleSheet.create({
    finger: {
      borderColor: "#CCC",
      borderWidth: 4,
      borderRadius: RADIUS * 2,
      width: RADIUS * 2,
      height: RADIUS * 2,
      backgroundColor: "pink",
      position: "absolute"
    }
  });