import React, { Component } from 'react'
import { StatusBar } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

import Home from './App/components/Home';
import Settings from './App/components/Settings';
import Add from './App/components/Add';
import About from './App/components/About';

console.disableYellowBox = true;

const theme = {
    palette: {
      primaryColor: COLOR.indigo500,
      accentColor: COLOR.pink300
    }
};

class App extends Component {
    render() {
        return (
            <ThemeContext.Provider value={getTheme(theme)}>
                <StatusBar backgroundColor={theme.palette.primaryColor} barStyle="light-content" />
                <Router>
                    <Scene key="root" hideNavBar={true}>
                        <Scene key="home" component={Home} initial={true}/>
                        <Scene key="settings" component={Settings}/>
                        <Scene key="add" component={Add}/>
                        <Scene key="about" component={About}/>
                    </Scene>
                </Router>
            </ThemeContext.Provider>
        )
    }
}
export default App