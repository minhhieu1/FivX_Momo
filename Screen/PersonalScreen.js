import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import data from '../assets/dataFake/data.json';
import ShopCustom from '../Screen/Component/shop'
import { ScrollView } from "react-native-gesture-handler";
import { env } from '../environment/environment.env'

class PersonalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "TẤT CẢ",
      loading: false,
      error: false,
      user: {},
      shopList:[]
    }
  }

  data = data;
  rawData=[];

  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    this.filterShopList()
  }
  filterShopList = () => {
    console.log("first time filter")
    new Promise(() => {
      this.retrieveData()
        .then(() => this.callApi())
    },
      error => {
        this.setState({ error: true })
      }
    )
  }
  callApi = () => {
    this.setState({ loading: true, error: false })
    console.log("call Api")
    var userId = this.state.user.accountId;
    var api = `${env.API}getReccommendService/${userId}`

    console.log(api)
    fetch(api)
            .then(async (res) => {
                this.rawData = await res.json()
                this.setState({ shopList: this.rawData })
                this.setState({ loading: false })
            })
            .catch((error) => {
                console.log(error)
                this.setState({ error: true })
            });
    // this.setState({shopList: this.rawData})

  }
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
      console.log(error)
    }
  }
  listFilter = (index) => {
    var filter = env.CATELOGY_FILTER
    console.log("Filter list shop + catelogy for filter = " + filter[index])
    var filterWord=filter[index];
    var list=this.rawData.filter((shop)=>{
      return shop.service_group.includes(filterWord);
    })
    this.setState({shopList:list})
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
      var shop = [];
      for (var i = 0; i < this.state.shopList.length; i++) {
        shop.push(
          <ShopCustom shop={this.state.shopList[i]} key={i}></ShopCustom>
        )
      }
      // const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>
          <View style={{ flex: 0.06, flexDirection: 'row' }}>
            <TouchableOpacity style={styles.tab} onPress={() => { this.props.navigation.navigate('Home') }}>
              <Text>Xu hướng chung</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chosetab} >
              <Text>Dành cho bạn</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.04, flexDirection: "row", justifyContent: 'center', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold' }} >{this.state.selected}</Text>
            <ModalDropdown
              options={env.CATELOGY_FILTER_SHOW}
              onSelect={(index, value) => { this.setState({ selected: value }), this.listFilter(index) }}
              dropdownTextStyle={{ color: '#000000', backgroundColor: '#FFFFFF', fontSize: 11, alignSelf: 'center' }}
              style={{ width: '20%', backgroundColor: '#FFFFFF', borderRadius: 30, position: 'absolute', right: 10 }}
              dropdownStyle={{ width: '40%', marginRight: 30, borderRadius: 8, overflow: 'hidden', }}
            >
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
                <MaterialIcons name='filter-list' />
                <Text>Bộ lọc</Text>
              </View>
            </ModalDropdown>
          </View>
          <View style={{ flex: 0.6, marginTop: 10 }}>
            <ScrollView style={{ flex: 1 }}>
              {shop}
            </ScrollView>
          </View>

          <View style={{ flex: 0.3, backgroundColor: '#FFFFFF', borderRadius: 8, }}>
            <View style={{ flex: 0.15, flexDirection: 'row', alignItems: 'center', marginLeft: 15, }}>
              <AntDesign name='gift' size={20} />
              <Text style={{ marginLeft: 10 }}>Khuyến mãi dành cho bạn</Text>
            </View>
            <View style={{ flex: 0.85, alignItems: 'center' }}>
              <Image
                source={require("../assets/images/promotion.jpg")}
                style={{ width: 343, height: 165, borderRadius: 8 }}
              />
            </View>
          </View>

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

})
export default PersonalScreen;