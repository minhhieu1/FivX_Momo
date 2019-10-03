import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Alert, AsyncStorage } from 'react-native';
import {env} from '../environment/environment.env'

class AcountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
    this.retrieveData()
  }
  static navigationOptions = {
    header: null
  };
  // componentDidMount (){
  //   this.retrieveData();
  // }
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('currentUser');
      if (value !== null) {
        this.setState({ user: JSON.parse(value) })
      } else {
        this.props.navigation.navigate('Login');
      }
    }
    catch (error) {
      // Error retrieving data   } };
    }
  }
  logout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      this.props.navigation.navigate('Login')
    }
    catch (exception) {
      alert("Đăng xuất thất bại. Vui lòng thử lại")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.element}>
          <Text style={styles.headline}>Hồ sơ cá nhân</Text>
        </View>
        <View style={styles.acountElement}>
          <Image style={styles.imgAcount} source={require('../assets/images/user.png')}></Image>
          <View style={{ marginStart: 25 }}>
            <Text style={{ fontSize: 18, color: '#222222' }}>
              {this.state.user.name}
            </Text>
            <Text style={{ fontSize: 14, color: '#9B9B9B' }}>
              {this.state.user.email}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.element}>
          <Text style={styles.title}>Cài đặt</Text>
          <Text style={styles.content}>Thông báo, mật khẩu, giao diện</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.element}>
          <Text style={styles.title}>Mã khuyến mãi</Text>
          <Text style={styles.content}>Mã khuyến mãi FivX dành tặng cho bạn</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.element}>
          <Text style={styles.title}>Đánh giá của bạn</Text>
          <Text style={styles.content}>Đánh giá chất lượng các dịch vụ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.element}>
          <Text style={styles.title}>Lịch sử thanh toán</Text>
          <Text style={styles.content}>Xem lại các giao dịch trước đây</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.element} onPress={() => this.logout()}>
          <Text style={styles.title}>Đăng xuất</Text>
        </TouchableOpacity>

      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: env.BACKGROUND_COLOR,
  },
  element: {
    marginStart: 12,
    marginEnd: 12,
    flex: 0.14,
    justifyContent: "center",
    borderBottomWidth: 0.25,
    borderBottomColor: env.BORDER_BOTTOM_COLOR,
  },
  elementtest: {
    backgroundColor: 'red',
  },
  headline: {
    fontSize: 30,
    fontWeight: "bold",
  },
  acountElement: {
    flex: 0.14,
    marginStart: 12,
    marginEnd: 12,
    flexDirection: 'row',
    borderBottomWidth: 0.25,
    borderBottomColor: env.BORDER_BOTTOM_COLOR,
    alignItems: 'center'
  },
  imgAcount: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  title: {
    fontSize: 16,
    color: '#222222',
  },
  content: {
    fontSize: 11,
    color: env.BORDER_BOTTOM_COLOR,
  }
})
export default AcountScreen;