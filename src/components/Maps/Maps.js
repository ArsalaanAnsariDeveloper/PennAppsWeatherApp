import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import {MapView} from 'expo';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
let LATITUDE = 37.78825;
let LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
export default class Maps extends Component {

    
    
  
    constructor(props) {
        super(props);
    
        this.state = {
         
          markers: [],
        };
      }
    
      onMapPress(e) {
        this.setState({
          markers: [
            ...this.state.markers,
            {
              coordinate: e.nativeEvent.coordinate,
              key: id++,
              color: randomColor(),
            },
          ],
        });
      }
      
  
    render() {
      let lat = Number(this.props.latitude);
      let long = Number(this.props.longitude);
     
    return (
      <View style={styles.container}>
      
      <MapView 
        style={styles.map}
        initialRegion={{
            latitude: lat,
          longitude: long,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }
            
        }
        onPress={(e) => this.onMapPress(e)}
        

    >
    {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
    </MapView>

          <View style={styles.buttonContainer}> 
          <TouchableOpacity
            onPress={() => this.setState({ markers: [] })}
            style={styles.bubble}
          >
            <Text>Clear Tags</Text>
          </TouchableOpacity>
        
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
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
      },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
  });
