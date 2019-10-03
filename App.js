import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Animated, Easing } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import WelcomeScreen from './Screen/WelcomeScreen';
import LoginScreen from './Screen/LoginScreen';
import HomeScreen from './Screen/HomeScreen';
import LikeScreen from './Screen/LikeScreen';
import AcountScreen from './Screen/AcountScreen';
import HeaderCustom from './Screen/Component/Header';
import TabBarIcon from './Screen/Component/TabBarIcon'
import PersonalScreen from './Screen/PersonalScreen';
import CategoryDetailScreen from './Screen/CategoryDetailScreen';
import SearchScreen from './Screen/SearchScreen';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: () => (
          <HeaderCustom search={true} back={false}></HeaderCustom>
        ),

      }
      //add more screen here
    },
    CatelogyDetail: {
      screen: CategoryDetailScreen,
      navigationOptions: {
        header: () => (
          <HeaderCustom search={true} back={true}></HeaderCustom>
        ),
      }
      //add more screen here
    },
    Personal: {
      screen: PersonalScreen,
      navigationOptions: {
        header: () => (
          <HeaderCustom search={true} back={true}></HeaderCustom>
        ),
      },
    }
  },
);
HomeStack.navigationOptions = ({ navigation }) => {

  tabBarLabel = 'FivX';
  tabBarIcon = ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-home'} />
  );
  let tabBarVisible;
  var routesLength=navigation.state.routes.length
  var last=navigation.state.routes[routesLength-1].routeName
  if(last=='CatelogyDetail'){
    tabBarVisible = false;
  } else{
    tabBarVisible= true
  }
  return { tabBarLabel, tabBarIcon, tabBarVisible }

};
const LikeStack = createStackNavigator(
  {
    Like: {
      screen: LikeScreen,
      navigationOptions: {
        header: () => (
          <HeaderCustom search={true} back={false}></HeaderCustom>
        ),
      }
      //add more screen here
    },

  }
);
LikeStack.navigationOptions = {
  tabBarLabel: 'Ưa thích',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-heart'} />
  ),
};
const AcountStack = createStackNavigator(
  {
    Acount: {
      screen: AcountScreen,
      navigationOptions: {
        header: () => (
          <HeaderCustom search={false} back={false}></HeaderCustom>
        ),
      }
    },
  }
);
AcountStack.navigationOptions = {
  tabBarLabel: 'Cá nhân',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-person'} />
  ),
};

const BottomStack = createBottomTabNavigator(
  {
    HomeStack,
    LikeStack,
    AcountStack
  },
  {
    navigationOptions: ({ navigation }) => {
      return {
        header: null,
      };
    }
  }
);

const MainNavigator = createStackNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    Main: { screen: BottomStack },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        header: () => (
          <HeaderCustom search={false} back={true}></HeaderCustom>
        ),
        headerLeft:null
      }
    }
  },

  {
    navigationOptions: ({ navigation }) => {
      return {
        header: null,
      };
    }
  }
);
const Container = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Container></Container>
    )
  }
}