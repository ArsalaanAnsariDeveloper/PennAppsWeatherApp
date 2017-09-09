import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {MapView} from 'expo';
export default class Maps extends Component {
  render() {
      let lat = Number(this.props.latitude);
      let long = Number(this.props.longitude);
     
    return (
      <View style={styles.container}>
      <View style={styles.map}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: lat,
          longitude: long,
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
