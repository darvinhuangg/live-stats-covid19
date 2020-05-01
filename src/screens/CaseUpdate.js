import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, ToastAndroid, Image, ImageBackground, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { get } from '@network/API';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';
import { connect } from 'react-redux';
import { Flag } from 'react-native-svg-flagkit';
import axios from 'axios';
import moment from 'moment';
import i18n from "@res/lang/i18n";

const { height, width } = Dimensions.get("screen");

export default class CaseUpdate extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      region: this.props.navigation.state.params.region
    }
  }

  async componentDidMount(){

    let { region } = this.state;

    const [recoveredResponse, confirmedResponse, deathsResponse] = await Promise.all([
     axios.get('https://covid-api.mmediagroup.fr/v1/history?country='+region.name+'&status=Recovered'),
     axios.get('https://covid-api.mmediagroup.fr/v1/history?country='+region.name+'&status=Confirmed'),
     axios.get('https://covid-api.mmediagroup.fr/v1/history?country='+region.name+'&status=Deaths')
    ])

    let recoveredResp = recoveredResponse.data.All;
    let confirmedResp = confirmedResponse.data.All;
    let deathsResp = deathsResponse.data.All;

    let recovered_data = recoveredResp.dates;
    let confirmed_data = confirmedResp.dates;
    let deaths_data = deathsResp.dates;

    let combine_data = [];

    Object.keys(recovered_data).map(function(keyName, index) {
      combine_data.push({
        date: keyName,
        recovered: recovered_data[keyName],
        confirmed: confirmed_data[keyName],
        deaths: deaths_data[keyName],
      })
    })

    this.setState({
      recovered: recoveredResp,
      confirmed: confirmedResp,
      deaths: deathsResp,
      data: combine_data,
    });

    
  }

  renderDailyData = (item) => {

    let { data } = this.state
    let object_length = data.length
    let next_index = object_length - 1 == item.index ? item.index : item.index + 1

    let item_data = item.item;    

    return (
      <Block style={R.palette.card} flex={false} marginTop={3}>
        <Text h3 semibold>{moment(item_data.date).format('Do MMMM YYYY')}</Text>
        <Block row spacing={false} marginTop={10}>
          <Block spacing={false}>
            <Block row middle center spacing={false}>
              <Text title semibold color={R.colors.orange}>{item_data.confirmed}</Text>
              { next_index !== object_length ? (
                <Block middle center row spacing={false} flex={false}>
                  <MaterialCommunityIcons name="chevron-double-up" color={R.colors.orange} size={20} />
                  <Text title semibold color={R.colors.orange}>{item_data.confirmed - this.state.data[next_index].confirmed}</Text>
                </Block>
              ) : (null)}
            </Block>
            <Text title center color={R.colors.gray}>{i18n.t("dashboard.infected")}</Text>
          </Block>
          <Block spacing={false}>
            <Block row middle center spacing={false}>
              <Text title semibold color={R.colors.greenGrass}>{item_data.recovered}</Text>
              { next_index !== object_length ? (
                <Block middle center row spacing={false} flex={false}>
                  <MaterialCommunityIcons name="chevron-double-up" color={R.colors.greenGrass} size={20} />
                  <Text title semibold color={R.colors.greenGrass}>{item_data.recovered - this.state.data[next_index].recovered}</Text>
                </Block>
              ) : (null)}
            </Block>
            <Text title center color={R.colors.gray}>{i18n.t("dashboard.recovered")}</Text>
          </Block>
          <Block spacing={false}>
            <Block row middle center spacing={false}>
              <Text title semibold color={R.colors.red}>{item_data.deaths}</Text>
              { next_index !== object_length ? (
                <Block middle center row spacing={false} flex={false}>
                  <MaterialCommunityIcons name="chevron-double-up" color={R.colors.red} size={20} />
                  <Text title semibold color={R.colors.red}>{item_data.deaths - this.state.data[next_index].deaths}</Text>
                </Block>
              ) : (null)}
            </Block>
            <Text title center color={R.colors.gray}>{i18n.t("dashboard.deaths")}</Text>
          </Block>
        </Block>
      </Block>
    )
  }

  renderHeader(){
    let { confirmed, region } = this.state;
    return (
      <Block flex={false} row>
        <Block middle center>
          <Flag 
            id={region.iso}
            size={0.2}
        />
        </Block>
        <Block spacing={false} flex={3}>
            <Text h2 semibold>{region.name.toUpperCase()}</Text>
            <Text semibold title>{i18n.t("dashboard.total_population")}: {confirmed ? confirmed.population : '-'}</Text>
            <Text title>{i18n.t("dashboard.location")}: {confirmed ? confirmed.continent + " - " + confirmed.location : '-' }</Text>
        </Block>
      </Block>
    )
  }

  renderListEmptyComponent = () => {
    return (
      <Block center middle white style={{borderWidth:1, borderRadius:10, borderColor:R.colors.lightGray}} paddingVertical={20}><Text title semibold>{i18n.t("dashboard.no_record")}</Text></Block>      
    )
  }

  static navigationOptions=({navigation}) => ({
    title:`${i18n.t("dashboard.case_update")}`,
    headerStyle:{elevation:0, shadowOpacity:0},
    headerTitleStyle: { flex: 1, textAlign: 'center'},
    headerTitleContainerStyle: {left: 0 },
    headerRight:null,
    headerTransparent:false,
    headerForceInset: { top: false }
  });

  render() {

    let { region } = this.state;

    return (
      
        <ScrollView contentContainerStyle={{flexGrow:1, backgroundColor:R.colors.white, marginBottom:50,}}>
          <FlatList 
            data={this.state.data}
            ListHeaderComponent={this.renderHeader.bind(this)}
            renderItem = {(item) => this.renderDailyData(item)}
            ListEmptyComponent={this.renderListEmptyComponent}
            keyExtractor={(item, index) => index.toString()}
            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={3}
          />
        	
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

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