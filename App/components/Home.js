import React, { Component } from 'react'
import { View, ScrollView, Dimensions, Text } from 'react-native';
import { ActionButton, ListItem } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../includes/Header/Home';

let ScreenHeight = Dimensions.get("window").height;

class Home extends Component {
    constructor(props){
        super(props);
        let data = [];
        this.state = {
            data,
            ready: false
        }
    }

    async componentDidMount(){
        try {
            let data = await AsyncStorage.getItem('calls') || '[]';            
            data = await JSON.parse(data);       
            data = data.reverse();     
            this.setState({
                data,
                ready: true
            })
        } catch (error) {
            
        }
    }

    daleteItem(index=0){
        let data = this.state.data;
        data.splice(index, 1);        
        this.setState({ data });
        AsyncStorage.setItem('calls', JSON.stringify(data));
    }

    makeList(item={title: '', at: ''}, index=0){
        let date = new Date(item.at);
        return (
            <ListItem
                key={index}
                divider
                centerElement={{
                    primaryText: item.title,
                    secondaryText: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} - ${date.getHours()}:${date.getMinutes()}`
                }}
                rightElement='delete'
                onRightElementPress={() => this.daleteItem(index)}
            />   
        )
    }

    render() {
        return (
            <View style={{height: ScreenHeight}}>
                <Header onRefresh={()=>this.componentDidMount()}/>
                {
                    (this.state.ready == true)?
                    <ScrollView>
                        {
                            (this.state.data.length == 0)?<Text style={{margin: 20}}>There are no calls !</Text>:this.state.data.map((item, index)=> this.makeList(item, index))
                        }
                    </ScrollView>:
                    <View>
                        <Text style={{margin: 20}}>Fetching data ...</Text>
                    </View>
                }
                <ActionButton onPress={()=> Actions.add()}/>
            </View>
        )
    }
}

export default Home