import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderCustom from './Component/Header'

class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
         <Text>Main Screen</Text>
      </View>
     
    );
  }
}

export default MainScreen;