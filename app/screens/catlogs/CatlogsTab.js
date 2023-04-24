import React, { Component } from "react";
import { FlatList, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container, Text, Item, Icon, Radio, Button } from "native-base";
import FlightData from '../orders/FlightData';
import { Seperator } from '../../components/List';
import { CatlogFilterComponent } from '../../components/CatlogComponent';
import CatlogItem from './CatlogItem';
import { BadgesScrollViewComponent } from '../../components/CatlogComponent';
import styles from './styles';
import Modal from 'react-native-modal';
import { colorresource } from '../../resources/colorresource';
import { HeaderBackNativeBase } from '../../components/Header';
import { connect } from 'react-redux';
import { getPublicCatalogAction } from '../../actions/catalog-actions';
import Loader from '../../components/Loader/loader';

class CatlogsTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      visibleModal: false,
      sort: [{ text: 'Recently Uploaded', selected: false },
      { text: 'Recently Uploaded', selected: false },
      { text: 'Recently Uploaded', selected: false },
      { text: 'Recently Uploaded', selected: false }],
      sortIndex: 0,
      filterBadgeVisible: false,
      sortBadgeVisible: false,
      badgeText: 0,
      badgeColorVisible: false,
      badgeColor: colorresource.orange,
      enableHeader: (props.navigation.state.params !== undefined)? true : false,
      headerTitle: (props.navigation.state.params !== undefined)?props.navigation.state.params.headerTitle:null,
      autoScroll: (props.navigation.state.params !== undefined)?props.navigation.state.params.index:null
    };
  }

  componentDidMount() {
    this.props.dispatch(getPublicCatalogAction());
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.responsePublicCatalog !== this.props.responsePublicCatalog) {
      this.setState({
        count: this.props.responsePublicCatalog.length
      });
    }
  }

  handlePress = (item) => {
    console.log("Hellog ");
    this.props.navigation.navigate('CatalogItemDetail', { id: item.id });
  };

  _renderRow = ({ item }) => (
    <CatlogItem data={item} onPress={() => this.handlePress(item)} />
  )

  showSortList = (sortList) => {
    let nameList = sortList.map(function (item) {
      return item['name'];
    });
    nameList.push("Cancel")
    let CANCEL_INDEX = nameList.length - 1
    ActionSheet.show(
      {
        options: nameList,
        cancelButtonIndex: CANCEL_INDEX,
        title: "Countries"
      },
      buttonIndex => {
        if (buttonIndex < countries.length - 1) {
          this.props.dispatch(changeCountryLabel(buttonIndex));
        }
      }
    )
  }

  //CatlogFilterComponent
  handelOnPress = (type, item) => {
    switch (type) {
      case 0://Filter
        console.log('Filter');
        this.props.navigation.navigate('FilterScreen');
        break;
      case 1://Sort
        console.log('Sort');
        this.setState({ visibleModal: true })
        break;
      case 2://Search
        console.log('Search');
        break;
      case 3://My Filter
        console.log('My Filter');
        break;
      case 4://Badges items
        console.log('Badges items', item);
        break;
      default:
        break;
    }
  }

  //BadgesScrollViewComponent
  handelOnPressBadgesScrollView = (item) => {
    console.log(item);
  }

  _handleRadioButton = (index) => {
    if (index > 0) {
      this.setState({ sortIndex: index, visibleModal: false, sortBadgeVisible: true, badgeColorVisible: true })
    } else {
      this.setState({ sortIndex: index, visibleModal: false, sortBadgeVisible: false, badgeColorVisible: false })
    }
  };

  _renderButton = (name, title, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.catlogstabtopview}>
        <Icon style={styles.catlogstab} name={name} />
        <Text style={styles.catlogstabtext}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalListItem = (onPress, item, index) => (
    <Button block transparent onPress={onPress} style={styles.modalButton}>
      <Radio selected={this.state.sortIndex == index} />
      <Text style={styles.catlogstabfont}>{item.text}</Text>
    </Button>
  )

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      {this._renderButton("close", 'Sort By', () => this.setState({ visibleModal: false }))}
      <View style={styles.catlogstab} />
      <FlatList
        data={this.state.sort}
        renderItem={({ item, index }) => (this._renderModalListItem(() => this._handleRadioButton(index), item, index))}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={Seperator}
      />
    </View>
  );

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <Container style={styles.catlogstabwhite}>
        {(this.props.isLoading)?<Loader loading={true} />: null}
        {(this.state.enableHeader) ? <HeaderBackNativeBase title={this.state.headerTitle} onPress={this.goBack}/>
          : null
        }
        <View style={styles.catlogstabviewtop}>
            <CatlogFilterComponent onPress={this.handelOnPress}
              filterBadgeVisible={this.state.filterBadgeVisible} 
              sortBadgeVisible={this.state.sortBadgeVisible} 
              badgeText={this.state.badgeText}
              badgeColorVisible={this.state.badgeColorVisible}
              badgeColor={this.state.badgeColor} 
            />
        </View>
        <View style={styles.catlogstabhandlepnpressview}>
          <BadgesScrollViewComponent onPress={this.handelOnPress} />
        </View>
        {this.state.count > 0
          ?
          <FlatList
            data={this.props.responsePublicCatalog}
            initialScrollIndex={this.state.autoScroll}
            renderItem={this._renderRow}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={Seperator}
          />
          : null}
        {/* onEndReached={this.handleListEnd} */}
        <Modal
          animationType="slide"
          isVisible={this.state.visibleModal}
          style={styles.bottomModal}>
          {this._renderModalContent()}
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const isLoading = state.catalogR.isLoading;
  return {
    isLoading,
    error: state.catalogR.error,
    responsePublicCatalog: state.catalogR.responsePublicCatalog
  };
};

export default connect(mapStateToProps)(CatlogsTab);
