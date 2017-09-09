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
let press = 0;
function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
export default class Maps extends Component {
  
    constructor(props) {
        super(props);
    
        this.state = {
          locationResponse: "",
          markers: [],
        }; 
      }

      componentDidMount(){
        fetch('http://disasternotifs.com/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              latitude: Number(this.props.latitude),
              longitude: Number(this.props.longitude),
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            this.setState({
                locationResponse: responseJson,
            });
            //alert(JSON.stringify(responseJson[0]))
            
            let counter = 0;
            while(counter < responseJson.length){
                if(responseJson[counter].type == "grocer"){
                  if(responseJson[counter].status == null){
                    this.state.markers.push({coordinate: {latitude: Number(JSON.stringify(responseJson[counter].latitude)), longitude: Number(JSON.stringify(responseJson[counter].longitude))}, key: id++, color:'#7fffd4', title: responseJson[counter].type});
                  }else{
                    this.state.markers.push({coordinate: {latitude: Number(JSON.stringify(responseJson[counter].latitude)), longitude: Number(JSON.stringify(responseJson[counter].longitude))}, key: id++, color:'#FF0000', title: responseJson[counter].type});
                  }
                }
                counter = counter + 1; 
            }
            
            
            //console.log("TEST" + JSON.stringify(this.state.markers))
            // update(Number(JSON.stringify(responseJson[0].latitude)),Number(JSON.stringify(responseJson[0].longitude)) )
            
           
           return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
          
      }

      update(lat, long, title){
        alert("This will change the status of the location")
        fetch('http://disasternotifs.com/update/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            latitude: lat,
            longitude: long,
            type: title,
            status: false,
          })
        })
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
        console.log(this.state.markers)
    
      
    }

   
 
  
    render() {
      //alert(JSON.stringify(this.state.locationResponse))
      let lat = Number(this.props.latitude);
      let long = Number(this.props.longitude);
      let loop = false;
    

      //alert(testLat)
      //alert(testLong)
    //this.state.markers.push({coordinate: {latitude: lat, longitude: long}, key: id++, color: randomColor(), title: "Your Location"})
    
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
              title = {marker.title}
              onCalloutPress={() => this.update(marker.coordinate.latitude, marker.coordinate.longitude, marker.title)}
            />
            
          ))}
    </MapView>

          <View style={styles.buttonContainer}> 
          <TouchableOpacity
            onPress={() => this.setState({ markers: [] })}

            style={styles.bubble}
          >
            <Text>Click on screen to load locations</Text>
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
