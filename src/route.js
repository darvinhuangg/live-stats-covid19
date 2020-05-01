import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';
import Dashboard from '@screens/dashboard';
import Region from '@screens/Region';
import CaseUpdate from '@screens/CaseUpdate';
import DrawerButton from '@screens/DrawerButton';
import About from '@screens/About';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet'

const Home = createStackNavigator(
	{
		Dashboard: { screen: Dashboard },
		Region: { screen: Region},
		CaseUpdate: { screen: CaseUpdate }
	},
	{
		navigationOptions: ({navigation}) => ({
			headerStyle:{elevation:0, shadowOpacity:0, height:70},
			headerTransparent: true,
			headerRight: <DrawerButton navigation={navigation} />,
			headerForceInset: { top: true }
		})
	}
);

const Language = createStackNavigator(
	{
		dashboard: { screen: Dashboard },
	},
	{
		navigationOptions: ({navigation}) => ({
			headerStyle:{elevation:0, shadowOpacity:0, height:70},
			headerTransparent: true,
			headerRight: <DrawerButton navigation={navigation} />,
			headerForceInset: { top: true }
		})
	}
);

const Abouts = createStackNavigator(
	{
		About: { screen: About },
	},
	{
		navigationOptions: ({navigation}) => ({
			headerStyle:{elevation:0, shadowOpacity:0, height:70},
			headerTransparent: true,
			headerRight: <DrawerButton navigation={navigation} />,
			headerForceInset: { top: true }
		})
	}
);


const DrawerNavigator = createDrawerNavigator({
	// Dashboard: {  
	// 		screen: Home, 			
	// 		navigationOptions: {
	// 			drawerLabel: 'Menu',
	// 			drawerIcon: ({tintColor}) => (
	// 				<MaterialCommunityIcons name="menu" size={20} style={{color: tintColor}} />
	// 			)
	// 		},
	// 	},
	About: {
			screen: Abouts, 			
			navigationOptions: {
				drawerLabel: 'Get to know',
				drawerIcon: ({tintColor}) => (
					<MaterialCommunityIcons name="target" size={20} style={{color: tintColor}} />
				)
			},
		},
	Language: {  
			screen: Language, 			
			navigationOptions: {
				drawerLabel: 'Language',
				drawerIcon: ({tintColor}) => (
					<MaterialIcons name="language" size={20} style={{color: tintColor}} />
				)
			},
		},
}, {
	swipeEnabled: true,
});

const ConnectedMyPage = connectActionSheet(DrawerNavigator);

export default class AppNavigator extends React.Component {
	render() {
	    return (
	      <ActionSheetProvider>
	        <ConnectedMyPage {...this.props} />
	      </ActionSheetProvider>
	    );
	}
}