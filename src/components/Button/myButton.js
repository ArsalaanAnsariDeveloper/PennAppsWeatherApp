import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class MyButton extends Component {
  render() {
    return (
      <View style={styles.container}>
        
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.textStyle} >GPS Lookup</Text>

        </TouchableOpacity>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   // flex: 1,
  //  backgroundColor: '#fff',
  //  alignItems: 'center',
  //  justifyContent: 'center',
  paddingVertical: 15,
  },
  buttonContainer:{
    paddingVertical: 15,
    paddingHorizontal: 50,
    backgroundColor: '#2980B9'
  },
  textStyle:{
    fontWeight: '800'
  }
  
});
