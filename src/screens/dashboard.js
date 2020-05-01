import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, ToastAndroid, Image, ImageBackground, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { get } from '@network/API';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';
import { connect } from 'react-redux';
import { Flag } from 'react-native-svg-flagkit';
import moment from 'moment';

const { height, width } = Dimensions.get("screen");

export default class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      region: {
        "iso": "IDN",
        "name": "Indonesia"
      },
      image:null,
    }
  }

  componentDidMount(){
    this.getResponse()
    this.getSummaryResponse()
  }

  getResponse(){
    get('https://covid19.mathdro.id/api/countries/' + this.state.region.iso)
    .then(response => {
      const { data } = response
      this.setState({ confirmed: data.confirmed, recovered: data.recovered, deaths: data.deaths })
    })
    .catch(errorMessage => {
      return Alert.alert('Error', errorMessage);
    })
  }

  getSummaryResponse(){
    get('https://covid19.mathdro.id/api')
    .then(response => {
      const { data } = response
      this.setState({ image:data.image })
    })
    .catch(errorMessage => {
      return Alert.alert('Error', errorMessage);
    })
  }

  changeLocation = () => {
    this.props.navigation.navigate('Region', {
      onNavigateBack:this.setRegion.bind(this)
    });
  }

  setRegion = (selected_region) => {
    this.setState({region:selected_region}, () => {
      this.getResponse();
    })
  }

  onPressDetailsCase = () => {
    this.props.navigation.navigate("CaseUpdate", { region: this.state.region})
  }

  render() {

    let { recovered, confirmed, deaths, region, image } = this.state;

    return (
      
        <ScrollView contentContainerStyle={{backgroundColor:R.colors.white, marginBottom:50}}>
        	<Block flex={false} spacing={false} style={{height:280}}>
        		<ImageBackground source={R.images.dashboard} style={styles.imageBackground} />
            <Block marginTop={20} style={{marginLeft:width/2.3, position:'absolute', marginTop:70}}>
              <Text h2 white semibold>All you need</Text>
              <Text h2 white semibold style={{marginTop:10}}>is stay at home</Text>
            </Block>
        	</Block>
          <Block flex={false}>
            <TouchableOpacity onPress={this.changeLocation} style={styles.changeLocationButton}>
              <MaterialCommunityIcons name="map-marker" size={24} color={R.colors.primary} />
              <Text semibold title style={{marginLeft:30, flex:1}}>{region.name}</Text>
              <MaterialCommunityIcons name="chevron-down" size={24} color={R.colors.darkgray} />
            </TouchableOpacity>
          </Block>
          <Block flex={false}>
            <Text h3 semibold>Case Update</Text>
            <Block spacing={false} flex={false} row marginTop={10}>
              <Text style={{flex:1}}>Newest update {moment().format("MMM Do YYYY")}</Text>
              <TouchableOpacity onPress={this.onPressDetailsCase}>
                <Text primary semibold>See details</Text>
              </TouchableOpacity>
            </Block>
          </Block>
          <Block flex={false} style={R.palette.card} row>
            <Block middle center spacing={false}>
              <MaterialCommunityIcons name="octagram" size={24} color={R.colors.orange} />
              <Text h2 semibold color={R.colors.orange} marginTop={20}>{confirmed && confirmed.value}</Text>
              <Text gray title>Infected</Text>
            </Block>
            <Block middle center spacing={false}>
              <MaterialCommunityIcons name="octagram" size={24} color={R.colors.greenGrass} />
              <Text h2 semibold color={R.colors.greenGrass} marginTop={20}>{recovered && recovered.value}</Text>
              <Text gray title>Recovered</Text>
            </Block>
            <Block middle center spacing={false}>
              <MaterialCommunityIcons name="octagram" size={24} color={R.colors.red} />
              <Text h2 semibold color={R.colors.red} marginTop={20}>{deaths && deaths.value}</Text>
              <Text gray title>Deaths</Text>
            </Block>
          </Block>
          <Block flex={false}>
            <Text h3 semibold>Global Case</Text>
            <Block spacing={false} flex={false} row marginTop={10}>
              <Text style={{flex:1}}>Newest update {moment().format("MMM Do YYYY")}</Text>
            </Block>
            <Block spacing={false} flex={false} marginTop={10}>
              <Image source={R.images.global_case} style={{width:width - 40, height: (width - 40) / 2, borderRadius:20 }} />
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
    padding:15,
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

// const mapStateToProps = (state) => {
//   console.log(state);
//   return {
//     region: state.dataReducer.selectedRegion
//   }
// }

// //Add in Select Region
// const mapDispatchToProps = (dispatch) => {
//   return {
//     selectRegion: (data) => dispatch(selectedRegion(data))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);