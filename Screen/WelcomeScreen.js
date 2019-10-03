import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Button, ImageBackground, AsyncStorage } from 'react-native';

class WelcomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.retrieveData()
        }, 1000)
    }
    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('currentUser');
            if (value != null) {
                this.props.navigation.navigate('Main');
            }else{
                this.props.navigation.navigate('Login');
            }
        }
        catch (error) {
            // Error retrieving data   } };
        }
    }
    render() {
        return (
            <ImageBackground
                source={require("../assets/images/KHINH_KHI_CAU.jpg")}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                resizeMode="cover"
            >
                {this.state.loading && <ActivityIndicator size="large" color="black" />}
            </ImageBackground>
        );
    }
}
export default WelcomeScreen;