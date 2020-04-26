import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';

export default class dashboard extends React.Component {

  constructor(props){
    super(props); 
  }


  static navigationOptions=({navigation}) => ({
    title:"Dashboard",
    headerStyle:{elevation:0, shadowOpacity:0},
    headerTitleStyle: { flex: 1, textAlign: 'center'},
    headerTitleContainerStyle: {left: 0 },
    // headerRight: 
    //   (<TouchableOpacity onPress={navigation.getParam('gotoBooked')} style={{paddingHorizontal:15}}>
    //     <MaterialCommunityIcons name="book-open-page-variant" size={20} />
    //   </TouchableOpacity>),
  });

  render() {

    return (
      
        <ScrollView contentContainerStyle={{flex:1, backgroundColor:R.colors.white}}>
        	<Block flex={false}>
        		<Text h1>This is dashboard</Text>
        	</Block>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
 
});