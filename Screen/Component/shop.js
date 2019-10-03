import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { env } from '../../environment/environment.env';
import data from '../../assets/dataFake/data'
import { imageShop } from '../../environment/shopImg'
class ShopCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: 0,
        }
    }
    navigateToDetailShop = () => {

    }
    componentWillMount() {
        this.setState({ favorite: this.props.shop.favorite })

    }
    data = data
    catelogy = data.catelogyList
    like(service_id) {
        console.log("like")
        userId = ''
        new Promise(() => {
            this.retrieveData().then(res => {
                userId = res.accountId;

                flag = this.state.favorite == 0 ? 1 : 0
                var api = `${env.API}setFavorite/${userId}/${service_id}/${flag}`
                console.log(api)
                fetch(api)
                    .then(res => {
                        if (res.ok) {
                            this.setState({favorite: flag})
                        }
                    }).catch((e) => {
                        // console.log(e)
                        // this.setState({ error: true })
                    });
            })
        })
    }
    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('currentUser');
            if (value != null) {
                return (JSON.parse(value))
            } else {
                this.props.navigation.navigate('Login');
            }
        }
        catch (error) {
            console.log("Error")
            console.log(error)
        }
    }
    render() {
        var shop = this.props.shop;
        if (shop.merchant_name.length > 28) {
            shop.merchant_name = shop.merchant_name.slice(0, 29) + "..."
        }
        if (shop.store_address.length > 80) {
            shop.store_address = shop.store_address.slice(0, 60) + "..."
        }
        if (shop.store_name.length > 19) {
            shop.store_name = shop.store_name.slice(0, 19) + "..."
        }
        shop.distance = parseFloat(Math.round(shop.distance * Math.pow(10, 3)) / Math.pow(10, 3)).toFixed(3)
        var img = () => {
            var img = 0;
            switch (this.props.shop.service_group) {
                case this.catelogy[0].catelogyName:
                    img = Math.floor(Math.random() * (20 - 0)) + 1
                    break;
                case this.catelogy[1].catelogyName:
                    img = Math.floor(Math.random() * (40 - 20)) + 20
                    break;
                case this.catelogy[2].catelogyName:
                    img = Math.floor(Math.random() * (60 - 40)) + 40
                    break;
                case this.catelogy[3].catelogyName:
                    img = Math.floor(Math.random() * (80 - 60)) + 60
                    break;
                case this.catelogy[4].catelogyName:
                    img = Math.floor(Math.random() * (100 - 80)) + 80
                    break;
                case this.catelogy[5].catelogyName:
                    img = Math.floor(Math.random() * (120 - 100)) + 100
                    break;
                default:
                    img = Math.floor(Math.random() * (160))
            }
            return img;
        }
        return (
            <TouchableOpacity style={styles.container} onPress={() => { this.navigateToDetailShop() }}>
                <View style={styles.shop}>
                    <View style={styles.shopImg}>
                        <Image style={styles.image} source={imageShop[img()]} />
                    </View>
                    <View style={styles.shopDetail}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>
                            {shop.store_name}
                        </Text>
                        <Text style={{ fontSize: 10, color: '#9B9B9B' }}>
                            {shop.merchant_name}
                        </Text>
                        <Text style={{ fontSize: 10, marginTop: 5 }}>
                            Địa chỉ
                        </Text>
                        <Text style={{ fontSize: 10, color: '#9B9B9B' }}>
                            {shop.store_address}
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ fontSize: 10 }}>
                                Khoảng cách:
                        </Text>
                            <Text style={{ fontSize: 10, color: '#9B9B9B', marginLeft: 5 }}>
                                {shop.distance} km
                        </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.likeButton} onPress={() => { this.like(shop.service_id) }}>
                    {this.state.favorite == 0 && <Ionicons name="ios-heart-empty" ></Ionicons>}
                    {this.state.favorite != 0 && <Ionicons name="ios-heart" color='red' ></Ionicons>}
                </TouchableOpacity>

            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 120,
        marginTop: 10,
        marginStart: 16,
        marginEnd: 16
    },
    shop: {
        height: 110,
        borderRadius: 8,
        overflow: 'hidden',
        flexDirection: 'row',
        backgroundColor: env.ELEMENT_BACKGROUND,
    },
    shopImg: {
        flex: 0.35,
        justifyContent: 'center',
    },

    image: {
        height: 110,
        width: 110,
    },
    shopDetail: {
        flex: 0.65,
    },
    likeButton: {
        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: env.ELEMENT_BACKGROUND,
        position: 'absolute',
        bottom: 0,
        right: 0,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        shadowColor: '#B1B1B1',
        justifyContent: 'center',
        alignItems: 'center'
    },

});

export default withNavigation(ShopCustom);