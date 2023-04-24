import React, { Component } from 'react';
import {
  View, 
  Image, 
  FlatList, 
  TouchableHighlight, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Dimensions
} from 'react-native';
import { Text, Container, Card, Input, ListItem, CheckBox, Item, Icon, Button, Content } from 'native-base';
import {NBRoot} from '../../components/Root/NBRoot';
import {RecyclerListView, LayoutProvider, DataProvider} from "recyclerlistview";
import { connect } from 'react-redux'
import _ from 'lodash';
import {goBack} from '../../actions/navigation-actions'
import assets from '../../utils/assetsObject';
import { HeaderBackNativeBase } from '../../components/Header';
import { strings } from '../../utils/i18n';
import styles from './styles'
import { colorresource } from '../../resources/colorresource';

import AddBrandsISell from './AddBrandsISell';

// actions
import { 
  getAllBrandsAction, 
  getBrandsIOwnAction, 
  getBrandsISellAction,
  updateBrandsISellAction,
  addBrandClear, 
} from '../../actions/brand-actions';
import { showToastAction } from 'app/actions/toast-actions'

import UserHelper from '../../config/userHelper';
import { isWeb } from '../../utils/PlatformHelper';

class MyBrands extends Component {

  goAddBrand = () => {
    this.props.navigation.navigate('AddBrand', {onBrandAdded: this.showBrandAdded})
  }

  showBrandAdded = () => {
    this.showToast("Brand added successfully", 2500);
  }

  onAddBrandsISellPress = () => {
    // can be optimized, check if this action was already fired
    // if yes, we should already have all the brands
    // and for refreshing, a pull refresh can be implemented
    this.setShowModal();
    if(this.props.responseAllBrands.length === 0){
      this.props.dispatch(getAllBrandsAction({showall: true}));
    }
  }

  updateBrandsISell = (updatedBrandsISell) => {
    // TODO: find a better way to handle empty updated brands in brands i sell
    if(updatedBrandsISell.length === 0) {
      return;
    }
    let id = _.property('[0].id')(this.props.responseBrandsISell);
    let patch = true
    if(!id) {
      id = UserHelper.getUsercompany_id();
      patch = false;
    }
    this.props.dispatch(updateBrandsISellAction(id, updatedBrandsISell, patch))
  }

  onAddBrandsISellDismiss = (haveBrandsISellChanged = false, updatedBrandsISell = [] ) => {
    // now find out if something was changed between brandsISell and brandsISellById
    // console.log("[onAddBrandsISellDismiss]", {haveBrandsISellChanged, updatedBrandsISell});
    if(haveBrandsISellChanged) {
      this.updateBrandsISell(updatedBrandsISell);
    }
    this.setHideModal();
  }

  setHideModal = () => {
    this.setState({modalVisible: false})
  }

  setShowModal = () => {
    this.setState({modalVisible: true})
  }

  showToast = (message, duration=1000) => {
    this.props.dispatch(showToastAction(message, duration))
  }

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      brandsISell: []
    };
  }

  componentDidMount() {
    this.props.dispatch(getBrandsIOwnAction())
    this.props.dispatch(getBrandsISellAction())
    this.props.dispatch(getAllBrandsAction({showall: true}))
  }

  componentWillReceiveProps(nextProps) {
    // console.log("cwrp: MyBrands")
    if(_.property('[0].brand[0]')(nextProps.responseBrandsISell)) {
      this.setState({brandsISell: nextProps.responseBrandsISell[0].brand})
    }
  }

  componentWillUnmount() {
    this.setHideModal()
  }

  render() {
    const { 
      responseBrandsIOwn: brandsOwn, 
    } = this.props
    return (
      <NBRoot>
        <Container>
          <HeaderBackNativeBase title={strings('myBrands.my_brands')}/>
          <Content style={{backgroundColor: '#e7e7e7'}}>
            <View style={styles.MyBrandsParent}>
              <MyBrandsShowcase title='myBrands.brands_i_own' data={brandsOwn} onPress={this.goAddBrand}/>
              <MyBrandsShowcase title='myBrands.brands_i_sell' data={this.state.brandsISell} onPress={this.onAddBrandsISellPress}/>
            </View>
          </Content>
          <AddBrandsISell 
          modalVisible={this.state.modalVisible}
          onDismiss={this.onAddBrandsISellDismiss}
          />
        </Container>
        </NBRoot>
    );
  }
}

class MyBrandsShowcase extends Component {
  render() {
    const {
      title,
      data,
      onPress
    } = this.props

    // if(!data) {
    //   return null;
    // }
    
    return (
      <View style={styles.MyBrandsShowcaseParent}>
        
        <View style={styles.MyBrandsShowcaseHeader} >
          <Text style={styles.MyBrandsShowcaseHeaderText}>{strings(title)}</Text>

          <TouchableOpacity onPress={() => onPress()}>
            <Image style={styles.MyBrandsShowcaseHeaderAdd} resizeMode='contain'
                source={assets['ic_add']}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.MyBrandsShowcaseScrollerParent} >
          <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={({ item: rowData }) => {
                return (
                  <View style={styles.MyBrandsShowcaseCardParent}>
                    <Card>
                      <Image style={styles.MyBrandsShowcaseImage} resizeMode='contain' source={{ uri: rowData.image.thumbnail_small }} />
                      <View style={styles.MyBrandsShowcaseCardTextParent}>
                        <Text numberOfLines={2} style={styles.MyBrandsShowcaseCardText}>
                          {rowData.name}
                        </Text>
                      </View>
                    </Card>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.brandsR.isLoading,
  responseBrandsIOwn: state.brandsR.responseBrandsIOwn,
  responseBrandsISell: state.brandsR.responseBrandsISell,
  responseAllBrands: state.brandsR.responseAllBrands,
  responseAddBrand: state.brandsR.responseAddBrand,
})

export default connect(mapStateToProps)(MyBrands)
