import React from 'react';
import { StyleSheet, Text, View, Button, onPressLearnMore } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        
        <Button
          onPress={onPressLearnMore}
          title="GPS Lookup"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />    
        <Text>Manually Add Zipcode</Text>
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
});
