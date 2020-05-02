import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { get } from '@network/API';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';
import Loader from '@components/Loader';
import { connect } from 'react-redux';
import { Flag } from 'react-native-svg-flagkit'
import i18n from "@res/lang/i18n";

export default class Region extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      regions:null,
      dataSource:null,
      loading:false,
    }  
  }

  componentDidMount(){
    this.setState({loading:true});
    get('https://covid-api.com/api/regions')
    .then(response => {
      const { data } = response      
      this.setState({ regions: data.data }, () => {
        this.setState({loading:false});
      })
    })
    .catch(errorMessage => {
      this.setState({loading:false});
      return Alert.alert('Error', errorMessage);
    })
  }

  static navigationOptions=({navigation}) => ({
    title:`${i18n.t("dashboard.select_country")}`,
    headerStyle:{elevation:0, shadowOpacity:0},
    headerTitleStyle: { flex: 1, textAlign: 'center'},
    headerTitleContainerStyle: {left: 0 },
    headerRight:null,
    headerTransparent:false,
    headerForceInset: { top: false }
  });

  renderListEmptyComponent = () => {
    let {loading} = this.state;
    return (
      <Block center middle white style={{borderWidth:1, borderRadius:10, borderColor:R.colors.lightGray}} paddingVertical={20}><Text title semibold>{loading ? i18n.t("dashboard.loading") : i18n.t("dashboard.no_record")}</Text></Block>      
    )
  }

  renderRegion(item){
    return (
      <TouchableOpacity onPress={() => this.onPressChangeRegion(item)} style={styles.regionItemList}>
        <Flag 
            id={item.iso}
            size={0.2}
        />
        <Text style={{marginLeft:20}} title>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  renderHeader(){
    return (
      <Block flex={false} card>
        <TextInput 
          value={this.state.search}
          autoFocus={true}
          onChangeText={this.filterRegions}
          placeholder={i18n.t("dashboard.ex_search_placeholder")}
        />
      </Block>
    )
  }

  filterRegions = (text) => {
    const newData = this.state.regions.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search:text,
    });
  }

  onPressChangeRegion(item){
    this.props.navigation.state.params.onNavigateBack(item);
    this.props.navigation.goBack();
  }

  render() {

    let { regions, dataSource } = this.state;

    return (
      <ScrollView contentContainerStyle={{flex:1, backgroundColor:R.colors.white}}>
        <Loader loading={this.state.loading} />
        { this.renderHeader() }
        <FlatList 
          data = { dataSource ? dataSource : regions }
          renderItem = {(item) => this.renderRegion(item.item)}
          ListEmptyComponent={this.renderListEmptyComponent}
          keyExtractor={(item, index) => index.toString()}
          removeClippedSubviews={true}
          maxToRenderPerBatch={20}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  regionItemList: {
    borderWidth:1,
    borderColor: R.colors.lightGray,
    borderRadius:5,
    marginTop:2,
    alignItems:'center',
    flexDirection:'row',
    padding:20,
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

// export default connect(mapStateToProps, mapDispatchToProps)(Region)