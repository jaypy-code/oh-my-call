import React, { Component } from 'react'
import { Toolbar } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';

class Header extends Component {
    onSelect(item={ "action": "menu", "index": null, "result": "" }){
        if(item['index'] != null){
            if(item['action'] == 'menu'){
                if(item['index'] == 0){
                    Actions.settings();
                }
                if(item['index'] == 1){
                    Actions.about();
                }
            } else {
                if(item['index'] == 0){
                    this.props.onRefresh();
                }
            }
        }
    }
    render() {
        return (
            <Toolbar
            centerElement="Call"
            rightElement={{
                menu: {
                    icon: "more-vert",
                    labels: ["Settings", "About"]
                },
                actions: ['refresh']
            }}
            onRightElementPress={ item => this.onSelect(item)}
        />
        )
    }
}
export default Header