import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import dashboard from '@screens/dashboard';

import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet'

const AppNavigators = createStackNavigator(
	{
		dashboard: { screen: dashboard },
	},
);

const ConnectedMyPage = connectActionSheet(AppNavigators);

export default class AppNavigator extends React.Component {
	render() {
	    return (
	      <ActionSheetProvider>
	        <ConnectedMyPage {...this.props} />
	      </ActionSheetProvider>
	    );
	}
}