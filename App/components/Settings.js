import React, { Component } from 'react'
import { View, Dimensions, Text } from 'react-native';
import { Subheader, Divider, withTheme, Snackbar } from 'react-native-material-ui';
import { OutlinedTextField } from 'react-native-material-textfield';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../includes/Header/Back';

let ScreenHeight = Dimensions.get("window").height;


class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            'phone': '',
            'api': '',
            'toast': false,
            'ready': false
        }
    }
    async componentDidMount(){
        let phone = api = '';
        try {
            phone = await AsyncStorage.getItem('phone') || '';
            api = await AsyncStorage.getItem('api') || '';
        } catch (error) {            
            phone = '';
            api = '';
        }
        this.setState({
            'phone': phone,
            'api': api,
            'toast': false,
            'ready': true
        })
    }
    async set(name=''){
        try {                        
            await AsyncStorage.setItem(name, this.state[name]);
            this.setState({ toast: true });
        } catch (error) {
            
        }
    }
    render() {
        if(this.state.ready == true){
            return (
                <View style={{height: ScreenHeight}}>
                    <Header title="Settings"/>
                    <View style={{marginLeft: 10, marginRight: 10, marginBottom: 20, marginTop: 20}}>
                        <OutlinedTextField
                            label="Phone number"
                            keyboardType='phone-pad'
                            title='We will call to this phone number.'
                            placeholder='09'
                            value={this.state.phone}
                            tintColor={this.props.theme.palette.accentColor}
                            onSubmitEditing={()=>this.set('phone')}
                            onChangeText={value=> this.state.phone = value}
                        />
                    </View>
                    <Divider/>
                    <Subheader text="Ghasedak Settings" />
                    <View style={{marginLeft: 10, marginRight: 10}}>
                        <Text style={{marginBottom: 20}}>
                            This app is useing Ghasedak API to make phone call. You can register and get your api key from their official website.
                        </Text>
                        <OutlinedTextField
                            label="API Key"
                            title='Your api key from Ghasedak.'
                            placeholder=''
                            value={this.state.api}
                            tintColor={this.props.theme.palette.accentColor}
                            onSubmitEditing={()=>this.set('api')}
                            onChangeText={value=> this.state.api = value}
                        />
                    </View>
                    <Snackbar
                        visible={this.state.toast}
                        message="Informations saved successfully !"
                        timeout={3000}
                        actionText="OK"
                        onActionPress={() => this.setState({ toast: false })}
                        onRequestClose={() => this.setState({ toast: false })}
                    />
                </View>
            )
        }
        else {
            return (
                <View></View>
            )
        }
    }
}
export default withTheme(Settings)