import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert} from 'react-native';
import {MapView} from 'expo';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

let id = 0;
let press = 0;
let alertMessage = "test";
function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
export default class Maps extends Component {
  
    constructor(props) {
        super(props);
    
        this.state = {
          locationResponse: "",
          markers: [],
          alertMessage: "Test"
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
              // IMPORTANT 
              latitude: Number(this.props.latitude),
              longitude: Number(this.props.longitude)
              //latitude: 25.940532 ,
              //longitude: -80.257173,

               

            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            this.setState({
                locationResponse: responseJson,
            });
            
            let counter = 0;
            while(counter < responseJson.length){
              
                if(responseJson[counter].type == this.props.type){
                  if(responseJson[counter].status == "functional"){
                    if(this.props.type == "shelter"){
                      this.state.markers.push({coordinate: {latitude: Number(JSON.stringify(responseJson[counter].latitude)), longitude: Number(JSON.stringify(responseJson[counter].longitude))}, key: id++, color:'#7fffd4', title: responseJson[counter].type, description: "Space Available"});
                      
                    }else{
                      this.state.markers.push({coordinate: {latitude: Number(JSON.stringify(responseJson[counter].latitude)), longitude: Number(JSON.stringify(responseJson[counter].longitude))}, key: id++, color:'#7fffd4', title: responseJson[counter].type, description: "Stocked"});
                    }
                  }else if(responseJson[counter].status == "notFunctional" || responseJson[counter].status == false ) {
                    if(this.props.type == "shelter"){
                      this.state.markers.push({coordinate: {latitude: Number(JSON.stringify(responseJson[counter].latitude)), longitude: Number(JSON.stringify(responseJson[counter].longitude))}, key: id++, color:'#FF0000', title: responseJson[counter].type, description: "Full"});
                      
                    }else{
                      this.state.markers.push({coordinate: {latitude: Number(JSON.stringify(responseJson[counter].latitude)), longitude: Number(JSON.stringify(responseJson[counter].longitude))}, key: id++, color:'#FF0000', title: responseJson[counter].type, description: "Not Available"});                      
                    }
                  }else{
                    if(this.props.type == "shelter"){
                      this.state.markers.push({coordinate: {latitude: Number(JSON.stringify(responseJson[counter].latitude)), longitude: Number(JSON.stringify(responseJson[counter].longitude))}, key: id++, color:'#ffa500', title: responseJson[counter].type, description: "Near Capacity"}); 
                    }else{
                      this.state.markers.push({coordinate: {latitude: Number(JSON.stringify(responseJson[counter].latitude)), longitude: Number(JSON.stringify(responseJson[counter].longitude))}, key: id++, color:'#ffa500', title: responseJson[counter].type, description: "Unstocked"});
                    }
                  }
                }
                counter = counter + 1; 
            }
            
            
           
            
           
           return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
          
      }

      update(lat, long, title){

        
        if(title != 'shelter'){
          Alert.alert(
          'Report Location',
          'The following buttons will report a location for either having no supplies or being non functional. If you wish to not proceed please press cancel.',
          [
            {text: 'Not Available', onPress: () => this.push("notFunctional", lat, long, title)},
            {text: 'Unstocked', onPress: () => this.push("noSupplies",lat, long, title)}, 
            {text: 'Stocked', onPress: () => this.push("functional", lat, long, title)},
          ],
          { cancelable: true }
        ) 
      }
      else{
        Alert.alert(
          'Report Location',
          'The following buttons will report a location for having space available, being near capacity, or being full. If you wish to not proceed please press the back button.',
          [
            {text: 'Full', onPress: () => this.push("notFunctional", lat, long, title)},
            {text: 'Near Capacity', onPress: () => this.push("noSupplies",lat, long, title)}, 
            {text: 'Space Available', onPress: () => this.push("functional", lat, long, title)},
          ],
          { cancelable: true }
        ) 

      }       

        

        
    }
      
    push(command, lat, long, title){
      
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
            status: command,
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
              color: '#7D26CD',
            },
          ],
        });
        console.log(this.state.markers)
    
      
    }

   
 
  
    render() {
      
      //IMPORTANT
      let lat = Number(this.props.latitude);
      let long = Number(this.props.longitude);
      //let lat = 25.940532
      //let long = -80.257173
      let loop = false;
    

    
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
              description = {marker.description}
              onCalloutPress={() => this.update(marker.coordinate.latitude, marker.coordinate.longitude, marker.title)}
            />
            
          ))}
    </MapView>

          <View style={styles.buttonContainer}> 
          <TouchableOpacity
            onPress={() => this.setState({ markers: [] })}

            style={styles.bubble}
          >
            <Text>Click to clear locations</Text>
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
