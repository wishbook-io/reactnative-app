import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, TextInput, Platform } from 'react-native';
import {
  Container,
  Header,
  Item,
  Icon,
  Input,
  Button,
  Text,
  Left,
  List,
  ListItem,
  Label,
  Spinner,
} from 'native-base';
import { connect } from 'react-redux';

import { colorresource } from '../../resources/colorresource';
import CatalogItem from '../../screens/products/CatalogItem';

// actions
import { 
  getSuggestionAction, 
  getSearchCatalogAction,
} from '../../actions/search-actions';
import { addToWishlistAction, deleteFromWishlistAction} from 'app/actions/wishlist-actions';
import { isInWishlist } from 'app/screens/wishlist/serverHelper';

import styles from './styles';
import { moveToScreen, goBack } from '../../actions/navigation-actions';

import { TestIdGenerator } from '../../utils/TestingHelper';
import { isWeb } from '../../utils/PlatformHelper';
const buttonTestId = TestIdGenerator("SearchScreen", '', "Button");

class SearchScreen extends Component {

  goBack = () => {
    goBack();
  }
  
  registerInputRef = (ref) => {
    this.searchInput = ref
  }

  onWishlistPress = (data) => {
    const addedToWishlist = isInWishlist(data.id, this.props.responseWishlist)
    if(addedToWishlist) {
      this.props.dispatch(deleteFromWishlistAction({product: data.id}))
    } else {
      this.props.dispatch(addToWishlistAction({product: data.id}))
    }
  }

  onCatalogPress = (id) => {
    let upcomingNavigationAction = moveToScreen("OpenStack","ProductDetails", {id})  
    this.props.navigation.dispatch(upcomingNavigationAction);
  }

  renderCatalogs = () => {
    if(this.props.responseSearchCatalog.length > 0) {
      return (
        <View style={{flex: 1}}>
          <FlatList
          extraData={this.props.responseWishlist}
          data={this.props.responseSearchCatalog}
          renderItem={({item}) => 
            <CatalogItem  
            onPress={() => this.onCatalogPress(item.id)}
            showListView={true}
            data={item}
            onWishlistPress={this.onWishlistPress}
            addedToWishlist={isInWishlist(item.id, this.props.responseWishlist)}
            />
          }
          keyExtractor={(item,index) => index.toString()}
          />
        </View>
      );
    } else if(this.state.haveTriggeredSearchOnce) {
      return(
        <View style={styles.SearchScreenCenteringContainer}>
          <Text style={styles.SearchScreenNoDataText}>No Data Found</Text>
        </View>
      );
    } else {
      return null;
    }
  }

  onSuggestionPress = (text) => {
    this.searchInput.clear()
    this.searchInput.setNativeProps({text: text})
    this.searchInput.blur();
    this.setState({text: text, showSuggestions: false }, () => this.onSearchCatalogs());
  }

  onChangeText = (text) => {
    this.setState({text});
    this.props.dispatch(getSuggestionAction(text));
  }

  onSubmitEditing = () => {
    this.onSearchCatalogs();
  }

  onSearchCatalogs = () => {
    const text = this.state.text;
    this.setState({showSuggestions: false, haveTriggeredSearchOnce: true});
    this.props.dispatch(getSearchCatalogAction(undefined, undefined,{q: text}));
  }

  workaroundFocus() {
    this.searchInput.blur();

    setTimeout(() => {
      this.searchInput.focus();
    }, 100);
  }

  constructor(props) {
    super(props);
    this.state={text: null, showSuggestions: true, haveTriggeredSearchOnce: false}
  }

  componentDidMount() {
    if(isWeb) {
      setTimeout(() => {
        this.workaroundFocus();
      }, 100);
    }
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded style={{backgroundColor:'white'}}>
          <Item style={{marginLeft: 0}}>
            <Button transparent style={{alignSelf: 'center'}} onPress={this.goBack} {...buttonTestId('Back')}>
              <Icon name="arrow-back" style={{color: colorresource.liteblue}}/>
            </Button>
            <TextInput 
            ref={this.registerInputRef}
            style={styles.SearchScreenInput} 
            placeholder='Search by brand, fabric, work, style' 
            onChangeText={(text) => this.onChangeText(text)}
            onSubmitEditing={() => this.onSubmitEditing()}
            returnKeyType={'search'}
            autoFocus={true}
            autoCorrect={false}
            placeholderTextColor={Platform.OS === 'ios'? undefined : '#c9c9c9'}
            selectionColor={colorresource.liteblue}
            onFocus={() => this.setState({showSuggestions: true})}
            />
          </Item>
        </Header>
        <View style={{flex: 1}}>
          { false
          ? <FlatList
          data={Array.from({length:0},(v,i)=>i+1)}
          renderItem={({item,index}) => <Text style={{fontSize: 40}}>{item}</Text>}
          keyExtractor={(item,index) => index.toString()}
          />
          : null }

          { this.props.isLoading
          ? <View style={styles.SearchScreenCenteringContainer}>
            <View style={{alignItems: 'center'}}>
              <ActivityIndicator
              size="large"
              color={colorresource.liteblue}
              animating={true}
              />
              <Text style={styles.SearchScreenLoadingText}>Loading...</Text>
            </View>
          </View>
          : this.renderCatalogs() 
          }

          {this.state.showSuggestions && this.props.responseSuggestion.length > 0
          ? <View style={styles.SearchScreenSuggestionParent}>
            <View style={styles.SearchScreenSuggestion}>
              <List
              keyboardShouldPersistTaps={'always'}
              dataArray={this.props.responseSuggestion}
              renderRow={(item) => <ListItem onPress={() => this.onSuggestionPress(item)}><Text style={styles.SearchScreenSuggestionText}>{item}</Text></ListItem>}
              />
            </View>
          </View>
          : null }
        </View>

      </Container>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isLoading: state.searchR.isLoading,
    error: state.searchR.error,
    responseSuggestion: state.searchR.responseSuggestion,
    responseSearchCatalog: state.searchR.responseSearchCatalog,
    responseWishlist: state.wishlistR.responseWishlist,
  };
};

export default connect(mapStateToProps)(SearchScreen);
