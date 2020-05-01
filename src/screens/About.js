import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, ToastAndroid, Image, ImageBackground, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';
import i18n from "@res/lang/i18n";

const { height, width } = Dimensions.get("screen");

export default class About extends React.Component {

  constructor(props){
    super(props);
  }

  render() {

    return (
        <ScrollView contentContainerStyle={{flexGrow:1, backgroundColor:R.colors.white, marginBottom:50}}>
        	<Block flex={false} spacing={false} style={{height:300}}>
        		<ImageBackground source={R.images.about} style={styles.imageBackground} />
            <Block marginTop={20} style={{marginLeft:width/2.3, position:'absolute', marginTop:70}}>
              <Text h2 white semibold>{i18n.t("about.title")}</Text>
              <Text h2 white semibold>{i18n.t("about.title_2")}</Text>
            </Block>
        	</Block>
          <Block flex={false} marginTop={10}>
            <Text h3 semibold>{i18n.t("about.symptomps")}</Text>
            <Block row spacing={false} marginTop={15}>
              <Block middle center spacing={false}>
                <Image source={R.images.fever} style={styles.symptomps} />
                <Text semibold>{i18n.t("about.fever")}</Text>
              </Block>
              <Block middle center spacing={false}>
                <Image source={R.images.cough} style={styles.symptomps} />
                <Text semibold>{i18n.t("about.cough")}</Text>
              </Block>
              <Block middle center spacing={false}>
                <Image source={R.images.breath} style={styles.symptomps} />
                <Text semibold>{i18n.t("about.breathless")}</Text>
              </Block>
            </Block>
            <Block row spacing={false} marginTop={5}>
              <Block middle center spacing={false}>
                <Image source={R.images.headache} style={styles.symptomps} />
                <Text semibold>{i18n.t("about.headache")}</Text>
              </Block>
              <Block middle center spacing={false}>
                <Image source={R.images.sore_throat} style={styles.symptomps} />
                <Text semibold>{i18n.t("about.sore_throat")}</Text>
              </Block>
              <Block middle center spacing={false}>
                {/*Empty Block*/}
              </Block>
            </Block>
          </Block>
          <Block flex={false} marginTop={20} paddingVertical={20}>
            <Text h3 semibold>{i18n.t("about.prevention")}</Text>
            <Block row style={styles.card} marginTop={10}>
              <ImageBackground source={R.images.sneeze_hand} style={styles.prevention} />
              <Block middle spacing={false} style={{marginLeft:10}}>
                <Text semibold h3>{i18n.t("about.prevent_1")}</Text>
                <Text style={{marginTop:5}} caption>{i18n.t("about.prevent_1_desc")}</Text>
              </Block>
            </Block>
            <Block row style={styles.card} marginTop={10}>
              <ImageBackground source={R.images.sneeze_elbow} style={styles.prevention} />
              <Block middle spacing={false} style={{marginLeft:10}}>
                <Text semibold h3>{i18n.t("about.prevent_2")}</Text>
                <Text style={{marginTop:5}} caption>{i18n.t("about.prevent_2_desc")}</Text>
              </Block>
            </Block>
            <Block row style={styles.card} marginTop={10}>
              <ImageBackground source={R.images.wear_mask} style={styles.prevention} />
              <Block middle spacing={false} style={{marginLeft:10}}>
                <Text semibold h3>{i18n.t("about.prevent_3")}</Text>
                <Text style={{marginTop:5}} caption>{i18n.t("about.prevent_3_desc")}</Text>
              </Block>
            </Block>
            <Block row style={styles.card} marginTop={10}>
              <ImageBackground source={R.images.touch_face} style={styles.prevention} />
              <Block middle spacing={false} style={{marginLeft:10}}>
                <Text semibold h3>{i18n.t("about.prevent_4")}</Text>
                <Text style={{marginTop:5}} caption>{i18n.t("about.prevent_4_desc")}</Text>
              </Block>
            </Block>
            <Block row style={styles.card} marginTop={10}>
              <ImageBackground source={R.images.wash_hand} style={styles.prevention} />
              <Block middle spacing={false} style={{marginLeft:10}}>
                <Text semibold h3>{i18n.t("about.prevent_5")}</Text>
                <Text style={{marginTop:5}} caption>{i18n.t("about.prevent_5_desc")}</Text>
              </Block>
            </Block>
            <Block row style={styles.card} marginTop={10}>
              <ImageBackground source={R.images.avoid_people} style={styles.prevention} />
              <Block middle spacing={false} style={{marginLeft:10}}>
                <Text semibold h3>{i18n.t("about.prevent_6")}</Text>
                <Text style={{marginTop:5}} caption>{i18n.t("about.prevent_6_desc")}</Text>
              </Block>
            </Block>
          </Block>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageBackground:{
    flex:1,
    width:'100%',
    height:280,
  },
  symptomps: {
    width:100,
    height:100
  },
  card: {
    borderRadius:30,
    borderWidth:1,
    borderColor:R.colors.lightGray
  },
  prevention:{
    width:120,
    height:120,
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