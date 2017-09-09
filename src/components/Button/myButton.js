import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';



export default class MyButton extends Component {

 
  render() {
  //  const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        
        <TouchableOpacity style={styles.buttonContainer}>
        
          <Text style={styles.textStyle} >{this.props.title}</Text>

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
