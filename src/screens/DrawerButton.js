import React from 'react';
import { TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import R from '@res/R';
import Text from '@components/Text';

const DrawerButton = ({ navigation }) => (
  	<TouchableOpacity style={styles.headerRightButton} onPress={() => navigation.openDrawer()}>
		<MaterialCommunityIcons name="menu" size={36} color={R.colors.white} />
	</TouchableOpacity>
);

const styles = StyleSheet.create({
  headerRightButton:{
    flexDirection:'row',
    marginRight:20,
    top:0,
    right:0,
  }
});

export default DrawerButton;