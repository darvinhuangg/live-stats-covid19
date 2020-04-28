import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, ToastAndroid, ImageBackground, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';

const { height, width } = Dimensions.get("screen");

export default class dashboard extends React.Component {

  constructor(props){
    super(props); 
  }

  changeLocation = () => {
    console.log('Change Location Pressed');
  }

  onPressDetailsCase = () => {
    console.log("Case Pressed");
  }

  onPressDetailsSpread = () => {
    console.log('Spread Pressed');
  }

  onPressSettings = () => {
    console.log('Settings Pressed');
  }

  static navigationOptions=({navigation}) => ({
    headerStyle:{elevation:0, shadowOpacity:0},
    header:null,
  });

  render() {

    return (
      
        <ScrollView contentContainerStyle={{flex:1, backgroundColor:R.colors.white}}>
        	<Block flex={false} spacing={false} style={{height:280}}>
        		<ImageBackground source={R.images.dashboard} style={styles.imageBackground} />
            <TouchableOpacity style={styles.headerRightButton} onPress={this.onPressSettings}>
              <Text title white style={{marginRight:5}}>Settings</Text>
              <MaterialCommunityIcons name="settings" size={20} color={R.colors.white} />
            </TouchableOpacity>
            <Block marginTop={20} style={{marginLeft:width/2.3, position:'absolute', marginTop:70}}>
              <Text h2 white semibold>All you need</Text>
              <Text h2 white semibold style={{marginTop:10}}>is stay at home</Text>
            </Block>
        	</Block>
          <Block flex={false}>
            <TouchableOpacity onPress={this.changeLocation} style={styles.changeLocationButton}>
              <MaterialCommunityIcons name="map-marker" size={24} color={R.colors.primary} />
              <Text semibold title style={{marginLeft:30, flex:1}}>Indonesia</Text>
              <MaterialCommunityIcons name="chevron-down" size={24} color={R.colors.darkgray} />
            </TouchableOpacity>
          </Block>
          <Block flex={false}>
            <Text h3 semibold>Case Update</Text>
            <Block spacing={false} flex={false} row marginTop={10}>
              <Text style={{flex:1}}>Neweset update March 28</Text>
              <TouchableOpacity onPress={this.onPressDetailsCase}>
                <Text primary semibold>See details</Text>
              </TouchableOpacity>
            </Block>
          </Block>
          <Block flex={false} style={R.palette.card} row>
            <Block middle center spacing={false}>
              <MaterialCommunityIcons name="octagram" size={24} color={R.colors.orange} />
              <Text h1 color={R.colors.orange} marginTop={20}>1046</Text>
              <Text gray title>Infected</Text>
            </Block>
            <Block middle center spacing={false}>
              <MaterialCommunityIcons name="octagram" size={24} color={R.colors.red} />
              <Text h1 color={R.colors.red} marginTop={20}>746</Text>
              <Text gray title>Deaths</Text>
            </Block>
            <Block middle center spacing={false}>
              <MaterialCommunityIcons name="octagram" size={24} color={R.colors.greenGrass} />
              <Text h1 color={R.colors.greenGrass} marginTop={20}>46</Text>
              <Text gray title>Recovered</Text>
            </Block>
          </Block>
          <Block flex={false}>
            <Block spacing={false} flex={false} row marginTop={10}>
              <Text style={{flex:1}} h3 semibold>Spread of Virus</Text>
              <TouchableOpacity onPress={this.onPressDetailsSpread}>
                <Text primary semibold>See details</Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  changeLocationButton: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 1,
    borderColor: R.colors.secondary,
    borderRadius:30,
    padding:30,
  },
  imageBackground:{
    flex:1,
    width:'100%',
    height:280,
  },
  headerRightButton:{
    position:'absolute',
    right:20,
    top:20,
    flexDirection:'row',
    alignItems:'center'
  }
});