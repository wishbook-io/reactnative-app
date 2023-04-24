// React & React UI
import React, { Component, Fragment } from 'react';
import { View, Dimensions, FlatList } from 'react-native';
import { 
  ListItem, 
  Text, 
  Button, 
  Item, 
  Icon, 
  Input,
} from 'native-base';
import CheckBox from 'app/components/CheckBox/CheckBox'
import Modal from 'app/components/Modal/Modal';
import {RecyclerListView, LayoutProvider, DataProvider} from "recyclerlistview";
import Select, { components } from 'react-select';

// React Store
import { connect } from 'react-redux';

// Utilities, helpers
import _ from 'lodash';
import { colorresource } from '../../resources/colorresource';
import { isWeb } from 'app/utils/PlatformHelper';

import styles from './styles';

const width = Dimensions.get('window').width;

class AddBrandsISell extends Component {

  getBrandsISellById = () => {
    // console.log("[getBrandsISellById]", {webBrandsISell: this.state.webBrandsISell})
    const brandsISellById = isWeb
      ? _.keyBy(this.state.webBrandsISell, 'value')
      : this.state.brandsISellById
    
    // console.log("[getBrandsISellById]", {brandsISellById})
    return brandsISellById
  }

  onSelectChange = (value, action) => {
    this.setState({webBrandsISell: value})
  }
  
  haveBrandsISellChanged = () => {
    const originalBrandsISell = this.state.brandsISell
    const runningBrandsISellById = this.getBrandsISellById();
    
    if(_.size(runningBrandsISellById) !== _.size(originalBrandsISell)) {
      // we don't care what was changed      
      return true;
    }

    // the sizes are equal, check if for every item in brandsISell, an equivalent key item.id exists in runningBrandsISellById
    let changed = false;
    _.forEach(originalBrandsISell, (item, index) => {
      if(runningBrandsISellById[item.id] === undefined) {
        changed = true;
        return false;
      }
    });

    return changed;
  }

  onCancelPress = () => {
    this.props.onDismiss()
  }

  onDonePress = () => {
    // now find out if something was changed between (web) brandsISell and brandsISellById
    const changed = this.haveBrandsISellChanged()
    // console.log("changed: ", changed)
    const runningBrandsISellById = this.getBrandsISellById()
    this.props.onDismiss(changed, _.keys(runningBrandsISellById))
  }

  onItemPress = (id) => {
    const checked = !!this.state.brandsISellById[id]
    let updatedBrandsISellById = _.cloneDeep(this.state.brandsISellById)
    // console.log("id ", id, "requested click")
    if(checked) {
      // remove it from selected
      // console.log("checked")
      updatedBrandsISellById = _.omit(updatedBrandsISellById, id)
    } else {
      // add it to selected
      // console.log("unchecked")
      updatedBrandsISellById[id] = []
    }
    this.setState({brandsISellById: updatedBrandsISellById})
  }

  updateDataProvider = (text) => {
    let filtered = []
    if(text === '') {
      filtered = this.props.responseAllBrands
    } else {
      const regex = new RegExp(`.*${text}.*`, 'i')
      filtered = _.filter(this.props.responseAllBrands, item => !!item.name.match(regex))
    }
    if(filtered.length > 0) {
      this.setState({dataProvider: this.state.dataProvider.cloneWithRows(filtered)})
    }
  }

  onSearchInputChange = (text) => {
    this.updateDataProvider(text)
    if(text == '') {
      this.setState({placeholderVisible: true})
    } else {
      this.setState({placeholderVisible: false})
    }
  }

  rowRenderer = (type, item) => (
    <ListItem noIndent style={styles.BrandsISellItem} onPress={() => this.onItemPress(item.id)}>
      <CheckBox color={colorresource.liteblue} selected={!!this.state.brandsISellById[item.id]} onPress={() => this.onItemPress(item.id)}/>
      <Text style={styles.BrandsISellItemText}>{item.name}</Text>
    </ListItem>
  )

  renderItem = ({item, index}) => this.rowRenderer(undefined, item)
  

  layoutProvider = new LayoutProvider((i)=>"One", (type, dim, index) => {
    if(type === "One") {
    dim.width = 0.75*width;
    dim.height = 35;
    } else {
      dim.width = 0;
      dim.height = 0;
    }
  })

  constructor(props) {
    super(props)
    this.state = {
      placeholderVisible: true,
      dataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2
      }),
      brandsISellById: {},
      brandsISell: [],

      webDefaultBrandsISell: [],
      webDataProvider: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if(_.property('[0].brand[0]')(nextProps.responseBrandsISell)) {
      const brands = nextProps.responseBrandsISell[0].brand
      const webBrandsISell = brands.map(({id, name}) => ({value:id, label: name}))
      const indexedBrands = _.keyBy(brands, 'id') 
      // performance reasons, if an array is used, then checked prop will take
      // long time to compute, and also the difference at the end will take long time
      // const webBrandsISell
      this.setState({brandsISellById: indexedBrands, brandsISell: brands, webBrandsISell})
    }

    if(nextProps.responseAllBrands && nextProps.responseAllBrands.length > 0 && nextProps.responseAllBrands.length !== this.state.dataProvider.getSize()) {
      // console.log("Now cloning with responseAllBrands whose length is ", nextProps.responseAllBrands.length)
      const webDataProvider = nextProps.responseAllBrands.map(({id, name}) => ({value: id, label: name}))
      this.setState({dataProvider: this.state.dataProvider.cloneWithRows(nextProps.responseAllBrands), webDataProvider})

    }
  }

  render() {
    return (
      <Modal style={{margin: 0}} transparent isVisible={this.props.modalVisible} onRequestClose={() => this.props.onDismiss()}>
        <View style={styles.BrandsISellModalParent}>
          <View style={styles.BrandsISellViewParent}>
            <View>
              <Text style={styles.BrandsISellHeaderText}>Brands I Sell</Text>
            </View>
            {isWeb? 
            <Select
              value={this.state.webBrandsISell}
              options={this.state.webDataProvider}
              isMulti
              onChange={this.onSelectChange}
              components={{
                ClearIndicator: null
              }}
            />
             :
              <Fragment>
                <View>
                  <Item>
                  { this.state.placeholderVisible
                  ? <Icon name='search' style={{position: 'absolute', left: 10}}/>
                  : null }
                    <Input
                    onChangeText={(text) => this.onSearchInputChange(text)}
                    />
                  </Item>
                </View>
                <View style={{height: '80%'}}>
                  <RecyclerListView
                    keyboardShouldPersistTaps={'always'}
                    rowRenderer = {this.rowRenderer}
                    dataProvider = {this.state.dataProvider}
                    layoutProvider = {this.layoutProvider}
                    extendedState = {this.state.brandsISellById}
                  />
                </View>
              </Fragment>
            }
            <View style={styles.BrandsISellButtonRow}>
              <Button transparent onPress={() => this.props.onDismiss()}>
                <Text style={styles.BrandsISellButtonText}>Cancel</Text>
              </Button>
              <Button transparent onPress={() => this.onDonePress()}>
                <Text style={styles.BrandsISellButtonText}>Done</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  responseBrandsISell: state.brandsR.responseBrandsISell,
  responseAllBrands: state.brandsR.responseAllBrands,
})

export default connect(mapStateToProps)(AddBrandsISell)
