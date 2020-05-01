import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, ToastAndroid, Image, ImageBackground, Dimensions, RefreshControl } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { get } from '@network/API';
import axios from 'axios';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';
import i18n from "@res/lang/i18n";
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
      refreshing:false,
    }
  }

  componentDidMount(){
    this.getResponse()
  }

  async getResponse(){

    const [regionResp, globalResp] = await Promise.all([
     axios.get('https://covid19.mathdro.id/api/countries/' + this.state.region.iso),
     axios.get('https://covid19.mathdro.id/api')
    ])

    let regionResponse = regionResp.data;
    let globalResponse = globalResp.data;

    this.setState({ 
      confirmed: regionResponse.confirmed, 
      recovered: regionResponse.recovered, 
      deaths: regionResponse.deaths, 
      g_confirmed: globalResponse.confirmed, 
      g_recovered: globalResponse.recovered, 
      g_deaths: globalResponse.deaths })
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

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getResponse();
    this.setState({refreshing:false});
  }

  render() {

    let { recovered, confirmed, deaths, region, image, g_recovered, g_confirmed, g_deaths } = this.state;

    return (
      
        <ScrollView 
          contentContainerStyle={{backgroundColor:R.colors.white, marginBottom:50}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
        	<Block flex={false} spacing={false} style={{height:280}}>
        		<ImageBackground source={R.images.dashboard} style={styles.imageBackground} />
            <Block style={{marginLeft:width/2.3, position:'absolute', marginTop:50}}>
              <Text h2 white semibold>{i18n.t("dashboard.title")}</Text>
              <Text h2 white semibold style={{marginTop:10}}>{i18n.t("dashboard.title_2")}</Text>
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
              <Text style={{flex:1}}>{i18n.t("dashboard.newest_update")} {moment().format("MMM Do YYYY")}</Text>
              <TouchableOpacity onPress={this.onPressDetailsCase}>
                <Text primary semibold>{i18n.t("dashboard.see_details")}</Text>
              </TouchableOpacity>
            </Block>
          </Block>
          <Block flex={false} style={R.palette.card} row>
            <Block middle center spacing={false}>
              <MaterialCommunityIcons name="octagram" size={24} color={R.colors.orange} />
              <Text h2 semibold color={R.colors.orange} marginTop={20}>{confirmed && confirmed.value}</Text>
              <Text gray title>{i18n.t("dashboard.infected")}</Text>
            </Block>
            <Block middle center spacing={false}>
              <MaterialCommunityIcons name="octagram" size={24} color={R.colors.greenGrass} />
              <Text h2 semibold color={R.colors.greenGrass} marginTop={20}>{recovered && recovered.value}</Text>
              <Text gray title>{i18n.t("dashboard.recovered")}</Text>
            </Block>
            <Block middle center spacing={false}>
              <MaterialCommunityIcons name="octagram" size={24} color={R.colors.red} />
              <Text h2 semibold color={R.colors.red} marginTop={20}>{deaths && deaths.value}</Text>
              <Text gray title>{i18n.t("dashboard.deaths")}</Text>
            </Block>
          </Block>
          <Block flex={false}>
            <Text h3 semibold>{i18n.t("dashboard.global_case")}</Text>
            <Block flex={false} row marginTop={10} spacing={false}> 
              <Text style={{flex:1}}>{i18n.t("dashboard.newest_update")} {moment().format("MMM Do YYYY")}</Text>
            </Block>
          </Block>
          <Block flex={false}row style={R.palette.card}>
            <Block middle center spacing={false}>
              <MaterialCommunityIcons name="octagram" size={24} color={R.colors.orange} />
              <Text h3 semibold color={R.colors.orange} marginTop={20}>{g_confirmed && g_confirmed.value}</Text>
              <Text gray title>{i18n.t("dashboard.infected")}</Text>
            </Block>
            <Block middle center spacing={false}>
              <MaterialCommunityIcons name="octagram" size={24} color={R.colors.greenGrass} />
              <Text h3 semibold color={R.colors.greenGrass} marginTop={20}>{g_recovered && g_recovered.value}</Text>
              <Text gray title>{i18n.t("dashboard.recovered")}</Text>
            </Block>
            <Block middle center spacing={false}>
              <MaterialCommunityIcons name="octagram" size={24} color={R.colors.red} />
              <Text h3 semibold color={R.colors.red} marginTop={20}>{g_deaths && g_deaths.value}</Text>
              <Text gray title>{i18n.t("dashboard.deaths")}</Text>
            </Block>
          </Block>
          <Block>{/*Empty Block*/}</Block>
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