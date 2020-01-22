import React, { Component } from 'react'
import { View, Dimensions, Text, ScrollView, Linking } from 'react-native';
import { Subheader, Divider, withTheme, Snackbar, Button } from 'react-native-material-ui';
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
            'toast': null,
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
            'toast': null,
            'ready': true
        })
    }
    async set(name=''){
        try {                        
            await AsyncStorage.setItem(name, this.state[name]);
            this.setState({ toast: 'Information saved successfully !' });
        } catch (error) {
            
        }
    }
    clear(){
        this.setState({
            'phone': '',
            'api': '',
            'toast': 'All data cleared successfully !',
            'ready': true
        });
        AsyncStorage.clear();
    }
    render() {
        if(this.state.ready == true){
            return (
                <View style={{height: ScreenHeight}}>
                    <Header title="Settings"/>
                    <ScrollView>
                        <Subheader text="Call Settings" />
                        <View style={{marginLeft: 10, marginRight: 10, marginBottom: 20}}>
                            <Text style={{marginBottom: 20, lineHeight: 20}}>
                                This app is useing Ghasedak API to makes a phone call. You can register and get your api key from their <Text onPress={()=> Linking.openURL('https://ghasedak.io/')} style={{ color: this.props.theme.palette.accentColor }}>official website</Text>.
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
                            <Text></Text>
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
                        <Divider />
                        <Subheader text="App Settings" />
                        <View style={{marginLeft: 10, marginRight: 10, marginBottom: 20}}>
                            <View style={{ alignItems: 'flex-end', marginBottom: 20 }}>
                                <Button
                                    style={{container: { width: 90, position: 'absolute', scaleX: 0.8, scaleY: 0.8 }}}
                                    accent raised text="Delete"
                                    onPress={()=> { AsyncStorage.removeItem("calls"); this.setState({ toast: 'All calls history deleted successfully !' }) }}/>
                                <View style={{ alignSelf: 'flex-start' }}>
                                    <Text>Delete all history</Text>
                                    <Text style={{fontSize: 12, color: '#999'}}>Delete all calls history from this phone.</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end', marginBottom: 20 }}>
                                <Button
                                    style={{container: { width: 90, position: 'absolute', scaleX: 0.8, scaleY: 0.8 }}}
                                    accent raised text="Clear"
                                    onPress={()=> this.clear()}/>
                                <View style={{ alignSelf: 'flex-start' }}>
                                    <Text>Clear all data</Text>
                                    <Text style={{fontSize: 12, color: '#999'}}>Clear all caches and data from this phone.</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <Snackbar
                        visible={this.state.toast != null}
                        message={this.state.toast}
                        timeout={3000}
                        actionText="OK"
                        onActionPress={() => this.setState({ toast: null })}
                        onRequestClose={() => this.setState({ toast: null })}
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