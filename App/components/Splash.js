import React, { Component } from 'react'
import { View, Dimensions, Text, ScrollView, Linking } from 'react-native';
import { Subheader, Divider, withTheme, Snackbar, Button } from 'react-native-material-ui';
import { OutlinedTextField } from 'react-native-material-textfield';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';

let ScreenHeight = Dimensions.get("window").height;

class Splash extends Component {
    constructor(props){
        super(props);
        this.state = {
            api: '',
            phone: '',
            ready: false,
            step: 0,
            toast: null
        }
    }

    async componentDidMount(){
        try {
            let splash = await AsyncStorage.getItem('splash');
            if(splash != null || splash == 'OK') Actions.home();
            else {
                this.setState({
                    ready: true
                })
            }
        } catch (error) {
            
        }
    }

    async submit(){        
        if(this.state.step == 0){
            this.setState({ step: 1 });
        } else {
            if(this.state.api.length == 0) this.setState({ toast: 'API key did n\'t save in settings.' });
            else if(this.state.phone.length == 0) this.setState({ toast: 'Phone number did n\'t save is settings.' })
            else {
                try {
                    await AsyncStorage.setItem('api', this.state.api);
                    await AsyncStorage.setItem('phone', this.state.phone);
                    await AsyncStorage.setItem('splash', 'OK');
                    Actions.home();                    
                } catch (error) {  
                    this.setState({ toast: 'Error while save data !' })                  
                }
            }
        }
    }

    render() {
        if(this.state.ready == true) {
            return (
                <View style={{height: ScreenHeight}}>
                    <View style={{marginLeft: 10, marginRight: 10, marginTop: 30, flex: 1}}>
                    {
                        (this.state.step == 0)?
                            <View style={{padding: 10}}>
                                <Text style={{fontSize: 20, marginBottom: 10}}>Oh My Call<Text style={{fontSize: 11}}>Beta</Text></Text>
                                <Text style={{lineHeight: 22}}>This app will call you on each time you say. Every times you want get out somewhere this app realy can helps you.</Text>
                                <Text></Text>
                            </View>
                        :
                            <View>
                                <Text style={{marginBottom: 20, lineHeight: 20}}>
                                    This app is useing Ghasedak API to makes a phone call. You can register and get your api key from their <Text onPress={()=> Linking.openURL('https://ghasedak.io/')} style={{ color: this.props.theme.palette.accentColor }}>official website</Text>.
                                </Text>
                                <OutlinedTextField
                                    label="API Key"
                                    title='Your api key from Ghasedak.'
                                    placeholder=''
                                    value={this.state.api}
                                    tintColor={this.props.theme.palette.accentColor}
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
                                    onChangeText={value=> this.state.phone = value}
                                />
                            </View>
                    }
                    </View>
                    <Button
                    style={{ container: { height: 50 } }}
                    accent raised text={this.state.step == 0?'Next':'Submit'}
                    onPress={()=> this.submit()}/>
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
        } else {
            return (<View></View>)
        }
    }
}

export default withTheme(Splash)