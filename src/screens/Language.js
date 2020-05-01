import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';
import { connect } from 'react-redux';
import { Flag } from 'react-native-svg-flagkit'
import i18n from "@res/lang/i18n";
import { _storeData } from '@components/asyncStorage';

export default class Language extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      language: [{
        "locale": "id",
        "flag": "ID",
        "name": "Bahasa Indonesia"
      },
      {
        "locale": "en",
        "flag": "GB",
        "name": "English"
      }]
    }  
  }

  static navigationOptions=({navigation}) => ({
    title:`${i18n.t("language.select_language")}`,
    headerStyle:{elevation:0, shadowOpacity:0},
    headerTitleStyle: { flex: 1, textAlign: 'center'},
    headerTitleContainerStyle: {left: 0 },
    headerRight:null,
    headerTransparent:false,
    headerForceInset: { top: false }
  });

  renderLanguage(item){
    return (
      <TouchableOpacity onPress={() => this.onPressChangeLanguage(item.locale)} style={styles.languageItemList}>
        <Flag 
            id={item.flag}
            size={0.2}
        />
        <Text style={{marginLeft:20}} title>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  onPressChangeLanguage(locale){
    if(i18n.locale != locale){
      i18n.locale = locale;
      _storeData('locale',locale);
      Alert.alert("Info", i18n.t("language.reopen_app_language"))
    }
    this.props.navigation.navigate("Dashboard");
  }

  render() {

    let { language } = this.state;

    return (
      <ScrollView contentContainerStyle={{flex:1, backgroundColor:R.colors.white}}>        
        <FlatList 
          data = { language }
          renderItem = {(item) => this.renderLanguage(item.item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  languageItemList: {
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