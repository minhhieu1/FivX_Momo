import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import {env} from '../../environment/environment.env';

class HeaderCustom extends Component {
    constructor(props){
        super(props);
    }
    goBack=()=>{
        this.props.navigation.goBack();
    }
    goSearch=()=>{
        this.props.navigation.navigate('Search')
    }
    render() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerBotton}>
                    <Text style={styles.headerText}>FIVX</Text>
                    {this.props.search &&<MaterialIcons name="search" size={25} style={styles.search} onPress={()=>this.goSearch()}/>}
                </View>
                {this.props.back &&<Ionicons name="ios-arrow-back" size={25} style={styles.back}  onPress={() => this.goBack()}/>}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: env.BACKGROUND_COLOR,
        justifyContent: 'flex-end',
        // flex: 1
        height: 80,
    },
    headerBotton: { flexDirection: 'row', justifyContent: 'center' },
    headerText: {
        color: env.HEADER_TEXT_COLOR,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 0,
        marginTop: 20
    },
    search: { alignSelf: 'flex-end', position: 'absolute', right: 10 },
    back: { alignSelf: 'flex-start', position: 'absolute', left: 10 }
});

export default withNavigation(HeaderCustom);