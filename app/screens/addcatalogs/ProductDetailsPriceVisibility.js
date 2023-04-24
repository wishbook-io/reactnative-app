import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Platform, StyleSheet, View, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Content, ListItem, Body, Button, CardItem, CheckBox, Icon, Title, Card, Text, Footer, Switch, Right, Form, Left, Item, Input, Spinner, Label } from 'native-base';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { strings } from '../../utils/i18n';
import { HeaderBackNativeBase } from '../../components/Header';
import { colorresource } from '../../resources/colorresource';
import styles from './styles'
import { getAddCatalogAction } from '../../actions/catalog-actions';
import RNFetchBlob from 'rn-fetch-blob';

class ProductDetailsPriceVisibility extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // if public true else private =false view_permission
      typeOfCatalog: false,
      public_priceTypeSingle: false,
      priceTypeSingle: false,
      input_price: '',
      //params
      public_price: '',
      view_permission: '',
      price: ''
    }
  }

  saveData = async () => {

    let data = this.props.addCatalogParams;

    let formData = new FormData();

    formData.append('title', data.title);
    formData.append('brand', data.brand);
    formData.append('category', data.category);
    formData.append('sell_full_catalog', data.sell_full_catalog);
    //formData.append('eav', JSON.stringify(data.eav));

    if (this.state.priceTypeSingle == true) {
      formData.append('price', this.state.input_price);
    }

    if (this.state.public_priceTypeSingle == true) {
      formData.append('public_price', this.state.input_price);
    }

    if (this.state.typeOfCatalog == true) {
      //public
      formData.append('view_permission', "public");
    } else {
      //private
      formData.append('view_permission', "push");
    }

    console.log("formData --------------->", formData);

    let fileKey = "thumbnail";
    await this.fetchFileDetails(formData, data.thumbnail.uri, fileKey);
    //
    // { lastModified: 1518475562000,
    //   size: 30824,
    //   type: 'file',
    //   path: '/storage/emulated/0/DCIM/3_thumb_resize.png',
    //   filename: '3_thumb_resize.png' }
    // postData.files.forEach((file) => {
    //   formData.append(postData.fileKey, {
    //     uri: file.uri,
    //     type: 'image/jpg', // or file.type
    //     name: file.name
    //   });
  }

  fetchFileDetails = (formData, fileUri, fileKey) => {
    console.log(fileUri);

    RNFetchBlob.fs.stat(fileUri).then((fileStats) => {
      console.log(fileStats);
      formData.append(fileKey, {
        uri: fileUri,//stats.path,
        type: 'image/png', // or file.type
        name: fileStats.filename
      });
      this.props.dispatch(getAddCatalogAction(formData));
    }).catch((err) => {
      console.log(err);
      alert("Invalid File Path");
    });
  }

  onSelectCatalog(index, value) {
    if (index === 0) {
      this.setState({
        text: `Selected index: ${index} , value: ${value}`,
        public_priceTypeSingle: true,
        typeOfCatalog: true
      });
    } else if (index === 1) {
      this.setState({
        text: `Selected index: ${index} , value: ${value}`,
        public_priceTypeSingle: false,
        typeOfCatalog: false
      });
    }
  }

  onSelectPriceDetails(index, value) {
    if (index === 0) {
      this.setState({
        text: `Selected index: ${index} , value: ${value}`,
        priceTypeSingle: true
      })
    } else if (index === 1) {
      this.setState({
        text: `Selected index: ${index} , value: ${value}`,
        priceTypeSingle: false
      })
    }
  }

  _onItemClick(type) {
    this._onItemClick('AddDesign')
    this.props.navigation.navigate(type);
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {

    return (
      <Container>
        <HeaderBackNativeBase title={strings('addCatalog.product_details')} />
        <ScrollView>
          <Card>
            <View>

              <Label style={styles.ProductDetailsPriceCatelogvisible}> Catalog Visibility</Label>

              <RadioGroup style={styles.ProductDetailsPriceRadiogroup}
                onSelect={(index, value) => this.onSelectCatalog(index, value)}>
                <RadioButton value={'item1'} >
                  <View>
                    <Text style={styles.ProductDetailsPricePublic}>Public Catalog</Text>
                    <Text style={styles.ProductDetailsPriceyourbrand}>Your brand will be visible to all the Wholesalers and retailers on Wishbook</Text>
                  </View>
                </RadioButton>

                <RadioButton value={'item2'}>
                  <View>
                    <Text>Private Catalog</Text>
                    <Text style={styles.ProductDetailsPriceyourbrand}>Only the buyers in your network will be able to see your catalog</Text>
                  </View>
                </RadioButton>
              </RadioGroup>

            </View>

          </Card>

          <Card>
            <View>

              <Label style={styles.ProductDetailsPriceCatelogvisible}> Price Details</Label>

              <RadioGroup style={styles.ProductDetailsPriceRadiogroup}
                onSelect={(index, value) => this.onSelectPriceDetails(index, value)}>
                <RadioButton value={'item1'} >
                  <View>
                    <Text style={styles.ProductDetailsPricePublic}>Same Price/Design</Text>
                    <Text style={styles.ProductDetailsPriceyourbrand}>Each design in this catalog is of the same price</Text>

                    <Item floatingLabel style={styles.ProductDetailsPriceEnterprice}>
                      <Label style={styles.ProductDetailsPriceEnterPriceLabel}>Enter price for this catalog</Label>
                      <Input value={this.state.input_price} onChangeText={(text) => this.setState({ input_price: text })} />
                    </Item>
                  </View>
                </RadioButton>

                <RadioButton value={'item2'}>
                  <View>
                    <Text>Individual Price/Design</Text>
                    <Text style={styles.ProductDetailsPriceyourbrand}>Each design in this catalog is of the different price</Text>
                  </View>
                </RadioButton>
              </RadioGroup>

            </View>
          </Card>

        </ScrollView>

        <TouchableOpacity onPress={() => { this.saveData(); }}>
          <Footer style={{ backgroundColor: colorresource.liteblue, alignItems: 'center', }}>
            <Text style={styles.ProductDetailsPricefooter}>ADD YOUR DESIGNS</Text>
          </Footer>
        </TouchableOpacity>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.enumgroupR.isLoading,
    error: state.enumgroupR.error,
    response_catalogAdd: state.catalogR.response_catalogAdd,
    addCatalogParams: state.catalogR.addCatalogParams
  };
};

export default connect(mapStateToProps)(ProductDetailsPriceVisibility);