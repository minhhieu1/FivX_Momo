import React from 'react';
import { AsyncStorage } from 'react-native';
import { env } from '../environment/environment.env'

export const UserServices = {
    retrieveData : async () => {
        try {
            const value = await AsyncStorage.getItem('currentUser');
            if (value != null) {
                return JSON.parse(value)
            } else {
                this.props.navigation.navigate('Login');
            }
        }
        catch (error) {
            // Error retrieving data   } };
            console.log("Error")
        }
    }
}