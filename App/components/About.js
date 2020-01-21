import React, { Component } from 'react'
import { View, Dimensions, Text, Image, Linking, TouchableOpacity } from 'react-native';
import Header from '../includes/Header/Back';

let ScreenHeight = Dimensions.get("window").height;


class About extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={{height: ScreenHeight}}>
                <Header title="About"/>
                <View style={{margin: 20}}>
                    <Text style={{fontSize: 20, marginBottom: 10}}>Oh My Call<Text style={{fontSize: 11}}>Beta</Text></Text>
                    <Text>This app will call you on each time you say. Every times you want get out somewhere this app realy can helps you.</Text>
                    <Text></Text>
                    <Text>Version: Beta</Text>
                    <Text>License: Open source</Text>
                    <Text>Aouther: JayPY Code</Text>
                    <Text></Text>
                    <TouchableOpacity onPress={()=>Linking.openURL('https://github.com/jaypy-code/oh-my-call')} style={{width: 32, height: 32}}><Image style={{width: 30, height: 30}} source={require('../assets/github.png')}/></TouchableOpacity>
                </View>
            </View>
        )   
    }
}
export default About