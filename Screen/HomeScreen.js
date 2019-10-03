import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import data from '../assets/dataFake/data.json';
import CatelogyCustom from '../Screen/Component/catelogy';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { env } from '../environment/environment.env'
import UserServices from '../service/userServices'

class HomeScreen extends React.Component {
  data = data;
  catelogyList = data.catelogyList;
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      location: {},
      loading: false,
      error: false
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
    this.setUserInfo();
  }
  static navigationOptions = {
    // header: null,
  };
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('currentUser');
      if (value != null) {
        this.setState({ user: JSON.parse(value) })
      } else {
        this.props.navigation.navigate('Login');
      }
    }
    catch (error) {
      console.log("Error")
    }
  }
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location })
  };
  setUserInfo = async () => {
    this.setState({ loading: true, error: false })
    new Promise(() => {
      this.retrieveData()
        .then(this.getLocationAsync)
        .then(async () => {
          let accountId = this.state.user.accountId;
          let lat = this.state.location.coords.latitude;
          let long = this.state.location.coords.longitude;
          const api = `${env.API}setUserInfo/${accountId}/${long}/${lat}`
          console.log(api)
          fetch(api)
            .then(res => {
              if (res.ok) {
                this.setState({ loading: false })
              }
            }).catch((e) => {
              console.log(e)
              this.setState({ error: true })
            });
        })
    })
  }


  render() {
    if (this.state.error) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
          <Text style={{ color: 'red', fontSize: 20 }}>Something wrong. Please try again!!!</Text>
        </View>
      )
    }
    else if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )
    }
    else {
      var catelogy = [];
      for (var i = 0; i < this.catelogyList.length; i++) {
        catelogy.push(
          <CatelogyCustom catelogy={this.catelogyList[i]} key={i} style={styles.catelogy}></CatelogyCustom>
        )
      }
      return (
        <View style={styles.container}>
          <View style={{ flex: 0.06, flexDirection: 'row' }}>
            <TouchableOpacity style={styles.chosetab}>
              <Text>Xu hướng chung</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => { this.props.navigation.navigate('Personal') }}>
              <Text>Dành cho bạn</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: (1 - 0.06), backgroundColor: '#F9F9F9' }}>
            {catelogy}
          </ScrollView>

        </View>

      );
    }

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: env.BACKGROUND_COLOR,
  },
  tab: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: env.BACKGROUND_COLOR,
  },
  chosetab: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: env.BORDER_BOTTOM_COLOR,
    backgroundColor: env.BACKGROUND_COLOR,
  },
  catelogy: {
    height: 100,
  }
})
export default HomeScreen;