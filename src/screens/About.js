import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, ToastAndroid, Image, ImageBackground, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';

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
              <Text h2 white semibold>Get to know</Text>
              <Text h2 white semibold>About Covid-19.</Text>
            </Block>
        	</Block>
          <Block flex={false} marginTop={10}>
            <Text h3 semibold>Symptomps</Text>
            <Block row spacing={false} marginTop={15}>
              <Block middle center spacing={false}>
                <Image source={R.images.fever} style={styles.symptomps} />
                <Text semibold>Fever</Text>
              </Block>
              <Block middle center spacing={false}>
                <Image source={R.images.cough} style={styles.symptomps} />
                <Text semibold>Cough</Text>
              </Block>
              <Block middle center spacing={false}>
                <Image source={R.images.headache} style={styles.symptomps} />
                <Text semibold numberOfLines={2}>Headache</Text>
              </Block>
            </Block>
            <Block row spacing={false} marginTop={5}>
              <Block middle center spacing={false}>
                <Image source={R.images.breath} style={styles.symptomps} />
                <Text semibold>Breathless</Text>
              </Block>
              <Block middle center spacing={false}>
                <Image source={R.images.sore_throat} style={styles.symptomps} />
                <Text semibold>Sore throat</Text>
              </Block>
              <Block middle center spacing={false}>
                {/*Empty Block*/}
              </Block>
            </Block>
          </Block>
          <Block flex={false} marginTop={20} paddingVertical={20}>
            <Text h3 semibold>Prevention</Text>
            <Block row style={styles.card} marginTop={10}>
              <ImageBackground source={R.images.sneeze_hand} style={styles.prevention} />
              <Block middle spacing={false} style={{marginLeft:10}}>
                <Text semibold h3>Do not sneeze in the palm of your hand</Text>
                <Text style={{marginTop:5}} caption>Germs commonly spread by respiratory droplets emitted from
                sneezing and coughing. When they land on your hands, they're transmitted to things and other surfaces.</Text>
              </Block>
            </Block>
            <Block row style={styles.card} marginTop={10}>
              <ImageBackground source={R.images.sneeze_elbow} style={styles.prevention} />
              <Block middle spacing={false} style={{marginLeft:10}}>
                <Text semibold h3>Sneeze on your elbow or scarf</Text>
                <Text style={{marginTop:5}} caption>To be clear, the maneuver doesn't eliminate all risk, even if it's
                then best tactic available. But anything to reduce the amount of flying particles helps.</Text>
              </Block>
            </Block>
            <Block row style={styles.card} marginTop={10}>
              <ImageBackground source={R.images.wear_mask} style={styles.prevention} />
              <Block middle spacing={false} style={{marginLeft:10}}>
                <Text semibold h3>Wearing mask if you are in outdoor</Text>
                <Text style={{marginTop:5}} caption>Basic face masks can prove to be helpful if worn and used properly.
                They trap coughs and sneezes that you releases and can provide a barrier to exposing other and vice-versa</Text>
              </Block>
            </Block>
            <Block row style={styles.card} marginTop={10}>
              <ImageBackground source={R.images.touch_face} style={styles.prevention} />
              <Block middle spacing={false} style={{marginLeft:10}}>
                <Text semibold h3>Do not touch your face with your hand</Text>
                <Text style={{marginTop:5}} caption>This virus can live on metal and plastic for days, so simply adjusting
                your eyeglasses with unwashed hands may be enough to infect yourself.</Text>
              </Block>
            </Block>
            <Block row style={styles.card} marginTop={10}>
              <ImageBackground source={R.images.wash_hand} style={styles.prevention} />
              <Block middle spacing={false} style={{marginLeft:10}}>
                <Text semibold h3>Wash your hands properly & scrub all parts</Text>
                <Text style={{marginTop:5}} caption>Washing your hands properly which takes about as long as 20 seconds 
                removes viruses and bacteria to stop them spreading to other people and objects.</Text>
              </Block>
            </Block>
            <Block row style={styles.card} marginTop={10}>
              <ImageBackground source={R.images.avoid_people} style={styles.prevention} />
              <Block middle spacing={false} style={{marginLeft:10}}>
                <Text semibold h3>Avoid any symptomps and/or infected people</Text>
                <Text style={{marginTop:5}} caption>Keeping distance 1,5 metre from others is especially important. Remember that
                some people without symptomps may be able to spread virus</Text>
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