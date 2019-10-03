import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, AsyncStorage, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import data from '../assets/dataFake/data.json'
import ShopCustom from '../Screen/Component/shop'
import { ScrollView } from "react-native-gesture-handler";
import { env } from '../environment/environment.env'
import {catelogy} from '../environment/categoryImg'


class CategoryDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                price: true,
                near: false,
                hot: false,
            },
            loading: false,
            error: false,
            user: {},
            shopList: []
        }
    }
    data = data;
    rawData = data.shop;

    static navigationOptions = {
        title: "Category Detail",
        header: null
    };
    componentWillMount() {
        this.filterShopList()
    }
    filterShopList = () => {
        console.log("first time filter")
        new Promise(() => {
            this.retrieveData()
                .then(() => this.callApi(this.state.filter))
        },
            error => {
                this.setState({ error: true })
            }
        )

    }
    callApi = async (filter) => {
        this.setState({ loading: true, error: false })
        console.log("call Api")
        var filter = filter.price ? 'getServiceByPrice' : (filter.near ? 'getServiceByLocation' : 'getServiceByHot')
        var userId = this.state.user.accountId;
        var catelogy = this.props.navigation.getParam('catelogy').catelogyName
        var api = `${env.API}${filter}/${userId}/${catelogy}`
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
        }
    }
    onButtonClick = (button) => {
        var obj = JSON.parse(JSON.stringify(this.state.filter));
        for (var key in obj) {
            if (key == button) {
                obj[key] = true
            } else {
                obj[key] = false
            }
        }
        this.setState({ filter: obj })
        this.callApi(obj)
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
            let catelogyId = this.props.navigation.getParam('catelogy').catelogyId
            var shop = [];
            for (var i = 0; i < this.state.shopList.length; i++) {
                shop.push(
                    <ShopCustom shop={this.state.shopList[i]} key={i}></ShopCustom>
                )
            }

            return (
                <View style={styles.container}>
                    <View style={styles.bannerFilter}>
                        <View style={styles.banner}>
                            <ImageBackground
                                source={catelogy[catelogyId]['image']}
                                style={styles.bannerImage}
                                blurRadius={5}
                                imageStyle={{ borderRadius: 8 }}
                            >
                                <Text style={{ fontSize: 18, textAlign: "center", color: "white", fontWeight: "bold" }}>
                                    {catelogy[catelogyId]['title']}
                                </Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.filter}>
                            <View style={styles.filterType}>
                                <TouchableOpacity
                                    style={this.state.filter.price ? styles.typeBtnClick : styles.typeBtn}
                                    onPress={() => { this.onButtonClick("price") }}
                                >
                                    <Text style={this.state.filter.price ? styles.textBtnClick : styles.textBtn}>Theo Giá</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={this.state.filter.near ? styles.typeBtnClick : styles.typeBtn}
                                    onPress={() => { this.onButtonClick("near") }}
                                >
                                    <Text style={this.state.filter.near ? styles.textBtnClick : styles.textBtn}>Gần bạn</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={this.state.filter.hot ? styles.typeBtnClick : styles.typeBtn}
                                    onPress={() => { this.onButtonClick("hot") }}
                                >
                                    <Text style={this.state.filter.hot ? styles.textBtnClick : styles.textBtn}>HOT!</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <ScrollView style={styles.productList}>
                        {shop}
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: env.BACKGROUND_DETAIL_COLOR
    },
    navigation: {
        flex: 0.05,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    bannerFilter: {
        flex: 0.3,
        backgroundColor: env.BACKGROUND_COLOR
    },
    productList: {
        flex: 0.7,
    },
    bannerImage: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: "center",
        justifyContent: "center",
    },
    banner: {
        flex: 0.7,
        alignItems: "stretch",
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 8,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 10,
    },
    filterType: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
    },
    filter: {
        flex: 0.3,
    },
    typeBtn: {
        flex: 0.33,
        height: 30,
        borderRadius: 25,
        // backgroundColor: "#222222",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        marginStart: 10,
        marginEnd: 10
    },
    typeBtnClick: {
        flex: 0.33,
        height: 30,
        borderRadius: 25,
        backgroundColor: "#3B5998",
        alignItems: "center",
        justifyContent: "center",
        marginStart: 10,
        marginEnd: 10
    },
    textBtn: {
        fontSize: 14,
        color: "black",
        alignItems: "center",
        textAlign: "center"
    },
    textBtnClick: {
        fontSize: 14,
        color: "white",
        alignItems: "center",
        textAlign: "center"
    },
});

export default CategoryDetailScreen;