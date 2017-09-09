import MyButton from '../Button/myButton'
import Maps from '../Maps/Maps'
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, onPressLearnMore,TouchableOpacity, AppRegistry} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { StackNavigator } from 'react-navigation';



export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Welcome',
      };
    state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
  
  
  render() {

    const { navigate } = this.props.navigation;
    
    let text = 'Waiting..';
    let shelterButton = 'Loading..';
    let gasButton = 'Loading..';
    let groceryButton = 'Loading..';
    let coords = "nothing"
    let gpslongitude = "nothing"
    let latitude = "Finding..."
    let longitude = "Finding..."
    if (this.state.errorMessage) {
      coords = this.state.errorMessage;
      text = "GPS Location Not Secured"
      shelterButton = 'GPS Not Available'
      groceryButton = 'GPS Not Available'
      gasButton = 'GPS Not Available'

    } else if (this.state.location) {
      latitude = JSON.stringify(this.state.location.coords.latitude)
      longitude = JSON.stringify(this.state.location.coords.longitude)
     
      
      text = "GPS Location Secured"
      shelterButton = 'Nearest Safe Shelter'
      groceryButton = 'Nearest Stocked Grocery Store'
      gasButton = 'Nearest Functioning Gas Station'
    }
    return (

      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <Text>Latitude: {latitude}</Text>
        <Text>Longitude: {longitude}</Text>
        <View>
        <MyButton title= "Nearest Gas Station"/>
        
        <MyButton title= "Nearest Grocery Store"/>

        <Button
          onPress={() => navigate('Chat')}
          title="Chat with Lucy"
        />

        </View>
        
      </View>

      
    );
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    
    fontSize: 32

  }
});

