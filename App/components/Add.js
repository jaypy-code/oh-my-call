import React, { Component } from 'react'
import { View, Dimensions, Text  } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Subheader, withTheme, Snackbar, Button } from 'react-native-material-ui';
import { OutlinedTextField } from 'react-native-material-textfield';
import AsyncStorage from '@react-native-community/async-storage';
// import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../includes/Header/Back';

let ScreenHeight = Dimensions.get("window").height;

class Add extends Component {
    constructor(props){
        super(props);
        let date = new Date();
        this.state = {
            'title': '',
            'date': `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`,
            'time': `${date.getHours()}:${date.getMinutes()}`,
            'toast': null,
            'loading': false
        }
    }
    back(){
        Actions.home();
    }
    async submit(){
        if(this.state.title.length == 0) this.setState({ toast: 'Enter title please !' });
        else if(this.state.date.length == 0) this.setState({ toast: 'Enter date please !' });
        else if(this.state.time.length == 0) this.setState({ toast: 'Enter time please !' });
        else {
            let date = new Date(`${this.state.date} ${this.state.time}`).getTime();
            let api = await AsyncStorage.getItem('api') || null,
                phone = await AsyncStorage.getItem('phone') || null;
            if(api == null) this.setState({ toast: 'API key did n\'t save in settings.' });
            else if(phone == null) this.setState({ toast: 'Phone number did n\'t save is settings.' })
            else {
                this.setState({ loading: true });
                let body = new FormData();
                body.append('message', this.state.title)              
                body.append('receptor', phone)              
                body.append('senddate', date.toString().slice(0, date.toString().length - 4))              
                fetch('https://api.ghasedak.io/v2/voice/send/simple', {
                    headers: {
                        'apikey': api,
                    },
                    body,
                    method: 'POST'
                })
                .then(res=> res.json())
                .then(res=>{                    
                    if(res['result']['message'] == 'success') return Promise.resolve();
                    else return Promise.reject();
                })
                .then(()=>{
                    return AsyncStorage.getItem('calls');
                })
                .then(data=>{
                    data = data || '[]';
                    data = JSON.parse(data);
                    data.push({ at: date, title: this.state.title });
                    return AsyncStorage.setItem('calls', JSON.stringify(data)); 
                })
                .then(()=>{
                    this.back();
                })
                .catch(error=>{
                    console.log(error);
                    
                    this.setState({ toast: 'Error while save data.' });
                    this.setState({ loading: false });
                })
            }            
        }
    }
    render() {
        return (
            <View style={{height: ScreenHeight}}>
                <Header title="New call"/>
                <Subheader text="Add new call" />
                <Text style={{marginLeft: 16, marginTop: -2, marginBottom: 20}}>Fill all inputs and make them correct please.</Text>
                <View style={{margin: 20, flex: 1}}>
                    <OutlinedTextField
                        label="Title"
                        placeholder=''
                        title='Just persian language support'
                        value={this.state.title}
                        tintColor={this.props.theme.palette.accentColor}
                        onChangeText={value=> this.state.title = value}
                        disabled={this.state.loading}
                    />
                    <Text></Text>
                    <OutlinedTextField
                        label="Date"
                        placeholder=''
                        title='Ad date - YYYY/MM/DD'
                        value={this.state.date}
                        tintColor={this.props.theme.palette.accentColor}
                        onChangeText={value=> this.state.date = value}
                        disabled={this.state.loading}
                    />
                    <Text></Text>
                    <OutlinedTextField
                        label="Time"
                        placeholder=''
                        title='24 Hour - hour:minute'
                        value={this.state.time}
                        tintColor={this.props.theme.palette.accentColor}
                        onChangeText={value=> this.state.time = value}
                        disabled={this.state.loading}
                    />
                </View>
                <Button
                style={{ container: { height: 50 } }}
                accent raised text="Submit"
                disabled={this.state.loading}
                onPress={()=> this.submit()} onLongPress={()=> this.back()}/>
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
}

export default withTheme(Add)