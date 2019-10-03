import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import data from '../assets/dataFake/data.json';
import ShopCustom from '../Screen/Component/shop'
import { env } from '../environment/environment.env'

class SearchScreen extends React.Component {
    data = data;
    shopList = data.shop;
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            status: 'Lịch sử'
        }
    }
    componentWillMount() {
    }
    static navigationOptions = {
        // header: null,
    };
    summit = (search) => {
        var text=search.nativeEvent.text
        if (text === "") {
            this.setState({ status: 'Lịch sử' })

            //call api history
        } else {
            this.setState({ status: 'Tìm kiếm' })
            
            //call api search
        }
    }
    render() {
        var shop = [];
        for (var i = 0; i < this.shopList.length; i++) {
            shop.push(
                <View style={styles.shop} key={i}>
                    <ShopCustom  shop={this.shopList[i]} ></ShopCustom>
                </View>
                
            )
        }
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', }}>
                    <TextInput
                        keyboardType="number-pad"
                        autoFocus={true}
                        textAlign="left"
                        placeholder="Tìm kiếm"
                        selectionColor="red"
                        style={styles.loginInput}
                        // onChangeText={(search) => this.setState({ search })}
                        onSubmitEditing={(search) => this.summit(search)}
                    />
                </View>
                <View style={styles.listFilter}>
                    <View style={{ flex: 0.06, justifyContent: 'center'  }}>
                        <Text style={{ fontSize: 18, marginLeft: 20 }}>{this.state.status}</Text>
                    </View>
                    <View style={{ flex: 0.94 }}>
                        <ScrollView >
                            {shop}
                        </ScrollView>
                    </View>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: env.BACKGROUND_COLOR,
    },
    loginInput: {
        borderRadius: 18,
        borderWidth: 4,
        backgroundColor: env.ELEMENT_BACKGROUND,
        height: '60%',
        width: '95%',
        padding: 10,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowColor: 'black',
    },
    listFilter: {
        backgroundColor: env.ELEMENT_BACKGROUND,
        flex: 0.9,
        borderRadius: 18,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        shadowColor: 'black',
    },
    shop:{
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        shadowColor: 'black',
    }

})
export default SearchScreen;