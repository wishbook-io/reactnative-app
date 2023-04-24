import React, { Component } from 'react';
import { View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { 
  Text, 
  Icon, 
  Header, 
  Left,
  Container, 
  Content,
  Button,
  Item,
  Footer,
  FooterTab,
} from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';

import assets from 'app/utils/assetsObject';
import { colorresource } from 'app/resources/colorresource';
import styles from './styles';
import CustomMultiSelectSearchItem from './CustomMultiSelectSearchItem'

import { showToastAction } from 'app/actions/toast-actions';

import { TestIdGenerator } from 'app/utils/TestingHelper';

const screenName = 'EavSearch';
const inputTestId = TestIdGenerator(screenName, '', 'Input');
const buttonTestId = TestIdGenerator(screenName,'','Button');

const ITEM_SELECTION_LIMIT = 4;

class CustomMultiSelectSearch extends Component {

  showValidation = () => {
    this.validationVisible = true;
    this.props.dispatch(showToastAction('Cannot select more than 4 items'))
    setTimeout(() => this.validationVisible = false, 1500)
  }

  onSavePress = () => {
    // return id,value pairs back to Parent
    const selectedItems = _.filter(this.state.enumData, (item) => !!this.state.selectedItemsById[item.id]);
    const {onSelectedItemsChange, enumType} = this.props.navigation.state.params;
    const onSelectedItemsChangeParams = {
      enumType,
      selectedItems, 
    }
    console.log("save params: ", onSelectedItemsChangeParams);
    onSelectedItemsChange(onSelectedItemsChangeParams);
    this.props.navigation.goBack();
  }

  onItemAdd = (id) => {
    // is user exceeding the limit of 4?
    const len = _.size(this.state.selectedItemsById);
    if(len == ITEM_SELECTION_LIMIT) {
      this.validationVisible? null : this.showValidation();
      return;
    }
    // add it to selected
    let updatedSelectedItemsById = _.cloneDeep(this.state.selectedItemsById);
    updatedSelectedItemsById[id] = []
    this.setState({selectedItemsById: updatedSelectedItemsById})
  }

  onItemRemove = (id) => {
    const updatedSelectedItemsById = _.omit(this.state.selectedItemsById, id);
    this.setState({selectedItemsById: updatedSelectedItemsById})
  }

  // for radios only
  onItemSelect(id) {
    console.log("id ", id, "radio click")
    const selected = !!this.state.selectedItemsById[id]
    if(selected) {
      // already selected, do nothing here
      return;
    }
    const updatedSelectedItemsById = {[id]: {}}
    this.setState({selectedItemsById: updatedSelectedItemsById})
  }

  onItemPress = (id) => {
    console.log("id ", id, "requested click")
    
    const radio = this.props.navigation.getParam('radio', false);
    if(radio) {
      this.onItemSelect(id)
      return;
    }
    
    const checked = !!this.state.selectedItemsById[id]
    if(checked) {
      // remove it from selected
      this.onItemRemove(id);
    } else {
      this.onItemAdd(id);
    }
  }

  onChangeText = (text) => {
    let shownItems = []
    const enumData = this.state.enumData;
    if(text === '') {
      shownItems = enumData;
    } else {
      const regex = new RegExp(`.*${text}.*`, 'i')
      shownItems = _.filter(enumData, item => !!item.value.match(regex))
    }
    this.setState({shownItems});
  }

  goBack = () => this.props.navigation.goBack()
  
  registerSearchInputRef = (ref) => this.searchInput = ref
  
  renderItem = ({item,index}) => { 
    const radio = this.props.navigation.getParam('radio', false);
    //console.log("printing Item ", item)
    return(
      <CustomMultiSelectSearchItem
        data={item}
        radio={radio}
        onItemPress={this.onItemPress}   
        selected={!!this.state.selectedItemsById[item.id]}
      />
    );
  }

  keyExtractor = (item,index) => index.toString()    
  
  constructor(props) {
    super(props);
    // console.log("navigation params", this.props.navigation.state.params);
    const {selectedItems, enumData} = this.props.navigation.state.params;
    this.state = {
      shownItems: enumData,
      selectedItemsById: _.keyBy(selectedItems, 'id'),    // performance reasons
      enumData,
    }
  }


  render() {
    const radio = this.props.navigation.getParam('radio', false);
    return (
      <Container>
        <Header searchBar rounded style={localStyles.Header}>
          <Item style={localStyles.HeaderItem}>
            <Button transparent style={localStyles.BackButton} onPress={this.goBack}>
              <Icon name="arrow-back" style={localStyles.BackIcon}/>
            </Button>
            <TextInput 
            ref={this.registerSearchInputRef}
            style={localStyles.TextInput} 
            placeholder='Search' 
            onChangeText={this.onChangeText}
            autoFocus={false}
            autoCorrect={false}
            placeholderTextColor={colorresource.gray}
            selectionColor={colorresource.liteblue}
            />
          </Item>
        </Header>
      <Content>
        <FlatList
        data={this.state.shownItems}
        extraData={this.state.selectedItemsById}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        />
      </Content>

        <Footer>
          <FooterTab>
            <Button full style={localStyles.FooterButton} onPress={this.onSavePress} {...buttonTestId("Save")}>
              <Text uppercase={false} style={localStyles.FooterText}>Save</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}

// local styles: they should not be defined in global styles
const localStyles = EStyleSheet.create({
  Header: {
    backgroundColor:'white',
  },
  HeaderItem: {
    marginLeft: 0
  },
  BackButton: {
    alignSelf: 'center',
  },
  BackIcon: {
    color: colorresource.liteblue,
  },
  TextInput: {
    marginLeft: 10, 
    fontSize: 18, 
    paddingTop: 0, 
    paddingBottom: 0,
    width: '100%',
    color: colorresource.liteblack,
  },
  FooterButton: {
    backgroundColor: colorresource.liteblue
  },
  FooterText: {
    marginTop: 5,  
    color: 'white', 
    fontSize: 17, 
    lineHeight: 17
  }
});

export default connect()(CustomMultiSelectSearch);
