import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Container, CheckBox, Card, Text, Footer, Item, Input, Label } from 'native-base';
import { HeaderBackNativeBase } from '../../components/Header';
import SectionedMultiSelect from '../../components/SectionedMultiSelect';
import { strings } from '../../utils/i18n';
import { colorresource } from '../../resources/colorresource';
import styles from './styles';
import { getEnumGroupFabricAction, getEnumGroupWorksAction } from '../../actions/enumgroup-actions';
import { getCategoryEVPAction } from '../../actions/masterlist-actions';
import { getAddCatalogStepTwoAction } from '../../actions/catalog-actions';
import RequestEav from '../../db/models/catalog/addcatalog/RequestEav';

class ProductDetails extends Component {

  constructor(props) {
    super(props)
    const { categoryId } = props.navigation.state.params;
    this.state = {
      selectedItemsFabric: [],
      selectedItemsWork: [],
      responseCategoryEvp: [],
      selectText: '',
      productWithSku: false,
      durationDays: '45',
      otherdetails: '',
      selectedSize: [],
      radio_stritch_type: false,
      categoryId: categoryId
    }
  }

  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
    responseFabrics: PropTypes.array,
    responseWorks: PropTypes.array
  };

  componentDidMount = () => {
    this.props.dispatch(getEnumGroupFabricAction('fabric'));
    this.props.dispatch(getEnumGroupWorksAction('work'));
    this.props.dispatch(getCategoryEVPAction(this.state.categoryId));
  }

  onSelectedItemsChangeFabric = (selectedItemsFabric) => {
    this.setState({ selectedItemsFabric });
  }

  onSelectedItemsChangeWork = (selectedItemsWork) => {
    this.setState({ selectedItemsWork });
  }

  _onItemClick = (type) => {
    this.props.navigation.navigate(type);
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  changeText = (durationDays) => {
    this.setState({ durationDays: durationDays });
  }

  checkValidation = () => {
    let days = this.state.durationDays;
    console.log(this.state.selectedItemsFabric.length);
    if (this.state.selectedItemsFabric.length <= 0) {
      alert("Please Select any fabric");
    } else if (this.state.selectedItemsWork.length <= 0) {
      alert("Please Select any work");
    }
    // else if (this.state.selectedSize.length<=0 ) {
    //   alert("Select Size");
    // } 
    else if (days === '') {
      alert("Duration can't be empty");
    } else if (!this.isNumeric(days)) {
      alert("Invalid days entered");
    } else if (days < 10) {
      alert("Minimum enable duration should be 10");
    } else {
      this.saveData();
    }
  }

  saveData = () => {
    let disable_days = this.addDate(this.state.durationDays);
    console.log("disable_days", disable_days);
    var requestEav = {
      expiry_date: disable_days,
      fabric: this.state.selectedItemsFabric,
      work: this.state.selectedItemsWork,
      size: this.state.selectedSize,
      stitching_type: this.state.radio_stritch_type,
      other: this.state.otherdetails
    }

    this.props.dispatch(getAddCatalogStepTwoAction(requestEav));
    this._onItemClick('ProductDetailsPriceVisibility');
  }

  isNumeric = (num) => {
    num = "" + num; //coerce num to be a string
    return !isNaN(num) && !isNaN(parseFloat(num));
  }

  addDate = (days) => {
    console.log("days", days);
    let day = parseInt(days);
    var date = new Date();
    date.setDate(date.getDate() + day);
    return date.toISOString();
  }

  render() {
    return (
      <Container>
        <HeaderBackNativeBase title={strings('addCatalog.product_details')} />
        <ScrollView>

          <Text style={styles.ProductDetailsflextext}>Fabric &amp; Work Detail</Text>
          <View style={styles.ProductDetailsflextop}>
            <Label style={styles.ProductDetailsflexlabel}>Fabric:</Label>

            <View style={styles.ProductDetailscontainer}>

              <SectionedMultiSelect
                items={this.props.responseFabrics}
                uniqueKey='id'
                displayKey="value"
                selectText='+ Add Fabric'
                readOnlyHeadings={false}
                confirmText='Save'
                showRemoveAll={true}
                onSelectedItemsChange={this.onSelectedItemsChangeFabric}
                selectedItems={this.state.selectedItemsFabric} />

            </View>

          </View>

          <View style={styles.ProductDetailsworkview}>
            <Label style={styles.ProductDetailsflexlabel}>Work:</Label>

            <View style={styles.ProductDetailscontainer}>

              <SectionedMultiSelect style={styles.ProductDetailsworklabel}
                items={this.props.responseWorks}
                uniqueKey='id'
                displayKey="value"
                selectText='+ Add Work'
                readOnlyHeadings={false}
                confirmText='Save'
                showRemoveAll={true}
                onSelectedItemsChange={this.onSelectedItemsChangeWork}
                selectedItems={this.state.selectedItemsWork} />

            </View>

          </View>
          <Card>
          </Card>
          <Card>

            <Label style={styles.ProductDetailscard}> Other Details </Label>

            <Item floatingLabel style={styles.ProductDetailsenterotherlabel}>
              <Label style={styles.ProductDetailsenterotherview}>Enter Other details</Label>
              <Input value={this.state.otherdetails} onChangeText={(text) => this.setState({ otherdetails: text })} />
            </Item>
            <View style={styles.ProductDetailscardproductview}>
              <CheckBox checked={this.state.productWithSku} onPress={() => this.setState({ productWithSku: !this.state.productWithSku })} />
              <Text style={styles.ProductDetailscardproducttext} >Product without SKU</Text>

            </View>
          </Card>
          <Card >
            <View style={{ margin: 10 }}>

              <Label style={styles.ProductDetailscard}> Catalog Enable Duration</Label>
              <Label style={styles.ProductDetailsfont}> Your catalog will get disabled automatically after the period mentioned below</Label>

              <View style={styles.ProductDetailsdurationview}>
                <Label style={styles.ProductDetailsdurationlabel}> Enter Duration</Label>
                <Item style={styles.ProductDetailsdurationitem}>
                  <Input keyboardType='numeric' value={this.state.durationDays} style={styles.ProductDetailsdayslabel} onChangeText={this.changeText} />
                </Item>
                <Label style={styles.ProductDetailsdaystext}> Days</Label>
              </View>

            </View>

          </Card>

        </ScrollView>
        <TouchableOpacity onPress={() => { this.checkValidation() }}>
          <Footer style={{ backgroundColor: colorresource.liteblue, alignItems: 'center', }}>
            <Text style={styles.ProductDetailsfooter}>Enter Price Details</Text>
          </Footer>
        </TouchableOpacity>
      </Container>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.enumgroupR.isLoading,
    responseFabrics: state.enumgroupR.responseFabrics,
    responseWorks: state.enumgroupR.responseWorks,
    responseCategoryEvp: state.masterListR.responseCategoryEvp,
    error: state.enumgroupR.error,
  };
};

export default connect(mapStateToProps)(ProductDetails);