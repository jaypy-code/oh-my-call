import React, { Component } from 'react'
import { Toolbar } from 'react-native-material-ui';
import { Actions } from 'react-native-router-flux';

class Header extends Component {
    back(){
        Actions.pop();
    }
    render() {
        return (
            <Toolbar
                centerElement={this.props.title}
                leftElement="arrow-back"
                onLeftElementPress={()=>this.back()}
            />
        )
    }
}
export default Header