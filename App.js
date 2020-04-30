import React from 'react';
import { View, AppRegistry, Text, SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import AppNavigator from '@root/route';
import R from '@res/R';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';

import configureStore from '@root/store';

// const store = configureStore;
// 
// const Redux = () => <Provider store={store}><AppNavigator /></Provider>

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default class App extends React.Component {

	constructor(props){
	    super(props);
	    this.state = {
	      fontsLoaded:false
	    }
	  }

	async componentDidMount() {
		await Font.loadAsync({
			"SourceSansPro-Light": require("@res/fonts/SourceSansPro-Light.ttf"),
			"SourceSansPro-Regular": require("@res/fonts/SourceSansPro-Regular.ttf"),
			"SourceSansPro-SemiBold": require("@res/fonts/SourceSansPro-SemiBold.ttf"),
			"SourceSansPro-Bold": require("@res/fonts/SourceSansPro-Bold.ttf"),
			"SourceSansPro-Italic": require('@res/fonts/SourceSansPro-Italic.ttf'),
		});
		this.setState({fontsLoaded:true});
	}

  	render(){
	  	return (

		  	this.state.fontsLoaded ? (
		  		// <View><Text>Testing Ok</Text></View>
			  	<SafeAreaView style={{ flex: 1 }}>
			  		<MyStatusBar backgroundColor={R.colors.primary} barStyle="light-content" />
			    	<AppNavigator />
			    </SafeAreaView>
		  	) : null
		);
  	}
}

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});