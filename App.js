import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, onPressLearnMore,TouchableOpacity} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import MyButton from './src/components/Button/myButton'
import Maps from './src/components/Maps/Maps'

export default class App extends Component {
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
    let text = 'Waiting..';
    let shelterButton = 'Loading..';
    let gasButton = 'Loading..';
    let groceryButton = 'Loading..';
    if (this.state.errorMessage) {
      coords = this.state.errorMessage;
      text = "GPS Location Not Secured"
      shelterButton = 'GPS Not Available'
      groceryButton = 'GPS Not Available'
      gasButton = 'GPS Not Available'

    } else if (this.state.location) {
      coords = JSON.stringify(this.state.location);
      text = "GPS Location Secured"
      shelterButton = 'Nearest Safe Shelter'
      groceryButton = 'Nearest Stocked Grocery Store'
      gasButton = 'Nearest Functioning Gas Station'
    }
    return (

      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <View>
        <MyButton/>
        <MyButton/>
        <MyButton/>

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
