import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {MapView} from 'expo';
export default class Maps extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.map}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 40.783060,
          longitude: -73.971249,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        />
        </View>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });
