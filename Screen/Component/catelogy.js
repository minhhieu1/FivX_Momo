import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity , Image} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import {env} from '../../environment/environment.env';
import {catelogy} from '../../environment/categoryImg';
class CatelogyCustom extends Component {
    constructor(props){
        super(props);
    }
    navigateToCatelogy=(catelogy1)=>{
        this.props.navigation.navigate('CatelogyDetail',{'catelogy':catelogy1});
    }
    // navigate=()=>{
    //     console.log("safasfasf");
    //     console.log(this.props)
    //     this.props.navigation.navigate('CatelogyDetail');
    // }
    render() {
        
        return (
            <TouchableOpacity style={styles.container} onPress={()=>{this.navigateToCatelogy(this.props.catelogy)}}>
                <View style={styles.catelogyTitle}>
                <Text style={styles.title}>
                    {this.props.catelogy.catelogyShow}
                </Text>
                </View>
                <Image  style={styles.image} source={catelogy[this.props.catelogy.catelogyId].image}/>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        height: 100,
        flexDirection: 'row',
        backgroundColor: env.ELEMENT_BACKGROUND,
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom:10,
        marginStart: 16,
        marginEnd: 16
    },
    catelogyTitle:{
        flex: 0.5,
        justifyContent: 'center',
    },
    title:{
        fontSize: 18,
        marginStart: 30,
        width: 120,
    },
    image:{
        flex: 0.5,
        height: 100,
    }
});

export default withNavigation(CatelogyCustom);