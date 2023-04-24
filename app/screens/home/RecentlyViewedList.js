import React, { Component } from 'react';
import { View, FlatList, InteractionManager, LayoutAnimation, UIManager } from 'react-native';
import { Left, Button, Text, Icon, Body, CardItem } from 'native-base';
import FastImage from 'react-native-fast-image';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableRipple } from 'react-native-paper';
import _ from 'lodash';

import { isInCart } from '../../screens/cart/serverHelper';
import { colorresource } from '../../resources/colorresource';
import { fontresource } from 'app/resources/fontresource';
import { isDroid } from 'app/utils/PlatformHelper'
import styles from './styles';

// TODO: Add Accordion or collapsible
// for smooth animation, the logic to hide/show
// is same as that of Android.

const INITIAL_WINDOW_SIZE = 3

export default class RecentlyViewedList extends Component {

  onRecentlyViewedPress = (id) => {
    InteractionManager.runAfterInteractions(() => {
      this.props.onPress(id)
    })
  }
  
  populateData = (newData) => {
    if(newData.length > INITIAL_WINDOW_SIZE) {
      this.setState({
        data: _.slice(newData, 0, INITIAL_WINDOW_SIZE),
        moreLess: 'more',
      })
    } else {
      this.setState({
        data: newData,
        moreLess: null
      })
    }
  }

  onMoreLessPress = (config) => {
    const nextConfig = this.moreLessConfig[config.next];
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.setState({
      moreLess: config.next,
      data: _.slice(this.props.data, 0, nextConfig.size),
    })
  }
  
  renderMore() {
    const moreLess = this.state.moreLess
    if(moreLess) {
      const config = this.moreLessConfig[moreLess]
      return (
        <Body style={styles.HomeScreenRecentlyViewedMoreParent}>
          <Button transparent onPress = {() => this.onMoreLessPress(config)}>
            <Text style={styles.HomeScreenRecentlyViewedMoreText}>{config.text}</Text>
            <Icon name={config.icon} type='MaterialCommunityIcons' style={styles.HomeScreenRecentlyViewedMoreIcon}/>
          </Button>
        </Body>
      );
    } else {
      return null;
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      moreLess: null,
    }
    this.moreLessConfig = {
      'more': {
        text: "See All",
        icon: 'chevron-down',
        size: INITIAL_WINDOW_SIZE,
        next: 'less',
      },
      'less': {
        text: "See Less",
        icon: "chevron-up",
        size: undefined, // so that _.slice takes the default which is the length of array
        next: 'more',
      }
    }
  }

  componentDidMount() {
    if(this.props.data && this.props.data.length > 0) {
      this.populateData(this.props.data);
    }
    if(isDroid) {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.data !== this.props.data) {
      this.populateData(this.props.data);
    }
  }
  
  render() {
    return (
      <View style={styles.HomeScreenmargintop}>
        <FlatList style={styles.HomeScreenRecentlyViewedFlatlist}
        vertical
        data={this.state.data}
        extraData={this.props.cartData}
        ItemSeparatorComponent={() => <View style={{width: '100%', height: 1, backgroundColor: colorresource.divider}}/>}
        renderItem={({ item:data, index }) => {

          const isItemInCart = isInCart(data.id, this.props.cartData);
          const [buttonText, buttonCallback] = isItemInCart
            ? ["Go To Cart", this.props.onGoToCart] 
            : ["Add To Cart", () => this.props.onAddToCart(data)]
          
          return(
            <TouchableRipple 
            onPress={() => this.onRecentlyViewedPress(data.id)} 
            style={localStyles.cardItem}
            >
              <View style={localStyles.left}>
                <FastImage 
                style={[{ width: 100, height: 130, borderRadius: 5 }]} 
                resizeMode='contain'
                source={{ uri: data.image.thumbnail_small }} />
                <View style={localStyles.right}>
                  <View style={styles.HomeScreenRecentlyViewedInfo}>
                    <Text style={localStyles.title}>{data.title + ", " + data.category_name} </Text>
                    <Text style={localStyles.subtitle}>{data.total_products + " designs, " + '\u20B9' + data.price_range + "/Pc."}</Text>
                  </View>
                  <View style={{alignSelf: 'flex-end' }}>
                    <Button style={localStyles.button} onPress={buttonCallback}>
                      <Text style={{fontSize: 16,}}>{buttonText}</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </TouchableRipple>
          )}
        }
        keyExtractor={(item, index) => index.toString()} />
        { this.renderMore() }
      </View>
    );
  }
}

const localStyles = EStyleSheet.create({
  cardItem: {
    flex: 1, 
    paddingLeft: 0, 
    padding: 10,
    paddingRight: 5,
    // borderWidth: 1, 
    // borderColor: 'yellow'
  },
  left: {
    flex: 1, 
    alignItems: 'stretch',
    flexDirection: 'row',
    // borderWidth: 1, 
    // borderColor: 'black', 
  },
  right: { 
    flex: 1, 
    justifyContent: 'space-between',
    marginLeft: 10,
    // borderWidth: 1, 
    // borderColor: 'red', 
  },
  title: { 
    width: '100%', 
    textAlign: 'left', 
    color: colorresource.liteblack, 
    fontFamily: fontresource.medium, 
    fontSize: 16
  },
  subtitle: { 
    width: '100%', 
    marginTop: 10, 
    textAlign: 'left',
    color: colorresource.gray, 
    fontSize: 14,
  },
  button: {
    backgroundColor: colorresource.orange, 
    borderRadius: 3,
  }
})