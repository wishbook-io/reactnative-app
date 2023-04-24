import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from 'native-base'
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import Loader from 'app/components/Loader/loader'
import LoaderComponent from 'app/components/Loader/LoaderComponent';
import { colorresource } from 'app/resources/colorresource';
import { isIos } from 'app/utils/PlatformHelper'

class LoaderHandler extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  findFirstLoading = (props) => {
    const key = Object.keys(props)
      .find(i => i.startsWith('loading') && this.props[i])
    return key
  }

  componentDidUpdate(prevProps, prevState) {
    let toggleLoading = false;
    const loadingKey = this.findFirstLoading(this.props)
    // console.log({cdu: this.props})
    if(loadingKey && !this.state.loading) {
      toggleLoading = true;
      // console.log("[LoaderHandler] key", loadingKey)
    } else if(!loadingKey && this.state.loading) {
      toggleLoading = true
    }

    if(toggleLoading) {
      // console.log("[LoaderHandler] props", this.props)
      // console.log(`[${loadingKey}] caused change from ${this.state.loading} to ${!this.state.loading}`)
      this.setState({loading: !this.state.loading})
    }
  }

  render() {
    if(isIos) { //https://github.com/facebook/react-native/issues/16895
      return (
        this.state.loading || false? 
          <View style={styles.parent}>
            <LoaderComponent/>
          </View> 
        : null
      )
    }
    return (
      <Loader loading={this.state.loading}/>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    loadingloginR: state.loginR.isLoading,
    loadingverifyotpR: state.verifyotpR.isLoading,
    loadingcatalogR: state.catalogR.isLoading,
    loadingdashboardR: state.dashboardR.isLoading,
    loadingbrandsR: state.brandsR.isLoading,
    loadingpromotionsR: state.promotionsR.isLoading,
    loadingmasterListR: state.masterListR.isLoading,
    // loadingthemeR: state.themeR.isLoading,
    loadingproductFilterR: state.productFilterR.isLoading,
    loadinglanguageR: state.languageR.isLoading,
    loadingverifyforgotR: state.verifyforgotR.isLoading,
    loadingenumgroupR: state.enumgroupR.isLoading,
    loadingwishlistR: state.wishlistR.isLoading,
    loadingstateR: state.stateR.isLoading,
    loadingcategoryR: state.categoryR.isLoading,
    loadinguserR: state.userR.isLoading,
    loadingsearchR: state.searchR.isLoading,
    loadingbackendR: state.backendR.isLoading,
    loadingwbMoneyR: state.wbMoneyR.isLoading,
    loadingordersR: state.ordersR.isLoading,
    loadinghomeR: state.homeR.isLoading,
    loadingcartR: state.cartR.isLoading,
    loadingshipayR: state.shipayR.isLoading,
    loadingcreditR: state.creditR.isLoading,
    loadingerrorHandlerR: state.errorHandlerR.isLoading,
    loadingdiscountHandlerR: state.discountR.isLoading,
    // loadingerrorHandlerPlaygroundR: state.errorHandlerPlaygroundR.isLoading,
    // loadingtoastR: state.toastR.isLoading,
    loadingloaderR: state.loaderR.requestLoader,
  })
}

export default connect (mapStateToProps) (LoaderHandler);

const styles = EStyleSheet.create({
  parent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 40,
  },
})