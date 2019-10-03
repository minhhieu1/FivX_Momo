import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  AsyncStorage
} from "react-native";
import data from '../assets/dataFake/data.json';
import { StackActions, NavigationActions } from 'react-navigation';
import {env} from '../environment/environment.env'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password:"",
    }
  }
  static navigationOptions = {
    title: "FivX Login",
    header: null
  };
  data = data;
  account = data.account;
  verifyInput=()=>{
    let userName=this.state.userName;
    let password=this.state.password;
    if(this.account.hasOwnProperty(userName)&&this.account[userName].password===password){
      let user=JSON.stringify(this.account[userName])
      AsyncStorage.setItem('currentUser', user);
      this.resetRoute()
    } else{
      alert("Tên đăng nhập hoặc mật khẩu không đúng!!!")
    }
  }
  loginMomo=()=>{
    let momoAcount=['Momo1', 'Momo2','Momo3','Momo4','Momo5'];
    var random=Math.floor(Math.random() * (momoAcount.length - 0))
    let user=JSON.stringify(this.account[momoAcount[random]])
    AsyncStorage.setItem('currentUser', user);
    this.resetRoute()
  }
  loginFacebook=()=>{
    let user=JSON.stringify(this.account['Unknow'])
    AsyncStorage.setItem('currentUser', user);
    this.resetRoute()
  }
  resetRoute=()=>{
    this.props.navigation.dispatch(
      StackActions.reset({
       index: 0,
       actions: [NavigationActions.navigate({ routeName: "Main" })]
      })
     );
  }
  render() {
    return (
      <ImageBackground
        source={require("../assets/images/KHINH_KHI_CAU.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={{ flex: 0.3 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text
                style={{ fontSize: 18, color: "white", fontWeight: "bold" }}
              >
                {"FivX".toUpperCase()}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 34,
                marginTop: 28,
                color: "white",
                fontWeight: "bold"
              }}
            >
              Đăng nhập
            </Text>
          </View>
          <View style={{ flex: 0.5 }}>
            <TextInput
              // keyboardType="number-pad"
              autoFocus={true}
              textAlign="left"
              placeholder="Tên đăng nhập"
              selectionColor="red"
              style={styles.loginInput}
              onChangeText={(userName) => this.setState({userName})}
            />
            <TextInput
              textAlign="left"
              placeholder="Mật khẩu"
              selectionColor="red"
              style={styles.loginInput}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
            />
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity onPress={() => alert("Fogot Password!")}>
                <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => this.verifyInput()}
            >
              <Text style={styles.textBtn}>{"Đăng nhập".toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 197, flex: 0.2 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={styles.fastLoginText}>
                {"Đăng nhập nhanh".toUpperCase()}
              </Text>
            </View>
            <View style={styles.btnGroupFastLogin}>
              <TouchableOpacity onPress={() => this.loginMomo()}>
                <Image
                  source={require("../assets/images/logo-momo.jpg")}
                  style={styles.fastLoginIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.loginFacebook()}>
                <Image
                  source={require("../assets/images/Facebook.jpg")}
                  style={styles.fastLoginIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    marginLeft: 16,
    marginRight: 16
  },
  loginInput: {
    borderRadius: 4,
    borderWidth: 4,
    backgroundColor: env.BACKGROUND_COLOR,
    height: 50,
    padding: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "lightblue",
    marginTop: 8
  },
  loginBtn: {
    marginTop: 32,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2565BB"
  },
  textBtn: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold"
  },
  forgotPasswordText: {
    marginTop: 16,
    marginLeft: 230,
    flexDirection: "row",
    justifyContent: "flex-end",
    lineHeight: 20,
    fontSize: 14,
    color: "white",
    fontWeight: "500"
  },
  fastLoginText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold"
  },
  fastLoginIcon: {
    width: 60,
    height: 60,
    marginHorizontal: 48,
    borderRadius: 8
  },
  btnGroupFastLogin: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25
  }
});

export default LoginScreen;