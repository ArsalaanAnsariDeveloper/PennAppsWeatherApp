import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, onPressLearnMore,TouchableOpacity} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { StackNavigator } from 'react-navigation';

import MyButton from './src/components/Button/myButton'
import Maps from './src/components/Maps/Maps'



class HomeScreen extends Component {
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
      <View style={styles.buttonStyle}>
      

      <Button
        onPress={() => navigate('Chat', {lat: latitude, long: longitude})}
        title="Nearest Functional Gas Station"
      />

      <View style={styles.buttonStyle}></View>

      <Button
        onPress={() => navigate('Chat', {lat: latitude, long: longitude})}
        title="Nearest Stocked Grocery Store"
      />

      </View>

    </View>

    
  );
}
}

class ChatScreen extends Component {
  static navigationOptions = {
    title: 'GoogleMaps',
  };

  
  render() {
    const { params } = this.props.navigation.state;
    return (
      
      <Maps latitude={params.lat} longitude={params.long}/>
    );
  }
}

const  SimpleAppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen }
});

const AppNavigation = () => (
  <SimpleAppNavigator/>
);

export default class App extends Component {
   
  render() {
    
    
    return (
      <AppNavigation/>
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

  },
  
  buttonStyle: {
    padding : 25

  }
});
