import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActivityIndicator, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Body, Button, Icon, CardItem, CheckBox, Card, Text, Footer, Switch, Right, ListItem, Form, Item, Input } from 'native-base';
import { Dropdown } from '../../components/Dropdown';
import { Autocomplete } from '../../components/TextInput';
import ImagePicker from 'react-native-image-picker';
import { HeaderBackNativeBase } from '../../components/Header';
import FastImage from 'react-native-fast-image';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { colorresource } from '../../resources/colorresource';
import Modal from 'react-native-modal';

import { getCategoryAction } from '../../actions/masterlist-actions';
import { getBrandsAction } from '../../actions/brand-actions';
import { getAddCatalogStepOneAction, getCatalogDropdownAction } from '../../actions/catalog-actions';


const API = 'https://swapi.co/api';

class AddCatalog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      catalogId: '',
      categoryId: '',
      brandId: '',
      query: '',
      ImageSource: null,
      isLoading: false,
      hideResults: false,
      setFullCatalog: false,
      showHints: false,
      //data to be saved
      view_type: "",
      brand: '',
      category: '',
      //responseCatalogDropdown: [],
      calledDropdownApiFrom: 0,
      visibleModal: false,
    };
  }

  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
    responseCategory: PropTypes.array,
    spinnerDatasCategory: PropTypes.array,
    responseCatalogDropdown: PropTypes.array,
    responseBrand: PropTypes.array,
    response_catalogAdd: PropTypes.object,
    responseCatalogDetails: PropTypes.object
  };

  changeText = (query) => {
    this.setState({})
    if (query !== '') {
      if (query.length > 50) {
        alert("Should be less than 50 characters");
      } else if (query.length >= 3) {
        this.setState({ query: query, calledDropdownApiFrom: 0, hideResults: false, });
        this.checkCatalogNameValidate(query);
      }
    }
  }

  checkCatalogNameValidate = (query) => {
    this.props.dispatch(getCatalogDropdownAction(query, this.state.brandId, this.state.categoryId));
  }

  checkValidation = () => {
    console.log(this.state);
    if (this.state.query === '') {
      alert("Catalog name cannot be empty");
    } else if (this.state.query.length > 50) {
      alert("Should be less than 50 characters");
    } else if (this.state.brand === '') {
      alert("Please select the brand");
    } else if (this.state.ImageSource == null) {
      alert("Select Image");
    } else if (this.state.query !== '') {
      this.setState({ calledDropdownApiFrom: 1 });
      this.props.dispatch(getCatalogDropdownAction(this.state.query, this.state.brandId, this.state.categoryId))
    } else {
      this.saveData();
    }
  }

  saveData = () => {
    let addCatalogParams = {
      title: this.state.query,
      brand: this.state.brandId,
      category: this.state.categoryId,
      sell_full_catalog: this.state.setFullCatalog,
      thumbnail: this.state.ImageSource
    }
    this.props.dispatch(getAddCatalogStepOneAction(addCatalogParams));
    this._onItemClick('ProductDetails');
  }

  _onItemClick(type) {
    this.props.navigation.navigate(type, { categoryId: this.state.categoryId });
  }

  onChangeSwitch(newState) {
    this.setState(newState);
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  componentDidMount() {
    this.props.dispatch(getCategoryAction());
    this.props.dispatch(getBrandsAction());
  }

  componentDidUpdate = (prevProps, prevState) => {
    console.log('componentDidUpdate', this.props.responseCatalogDropdown)
    if (this.props.error && prevProps.error !== this.props.error) {
      alert(`${this.props.error.statusText}`);
    }

    if (this.props.responseCatalogDropdown !== prevProps.responseCatalogDropdown) {
      if (this.state.calledDropdownApiFrom === 1) {
        let isAvailable = false;
        if (this.props.responseCatalogDropdown.length > 0) {
          for (var i = 0; i < this.props.responseCatalogDropdown.length; i++) {
            if (this.props.responseCatalogDropdown[i].title === this.state.query) {
              isAvailable = true;
            }
          }
          if (isAvailable) {
            this.setState({ visibleModal: isAvailable });
            this._renderModalContent(this.props.responseCatalogDropdown[0].id);
          } else {
            this.saveData();
          }
        } else {
          this.saveData();
        }
      }
    }
  }


  onChangeDropdownCategory = (index) => {
    console.log('------------------>', index);
    const data = this.props.spinnerDatasCategory[index];
    this.setState({
      category: data.fileName,
      categoryId: data.fileId
    });
    console.log(data);
  }

  onChangeDropdownBrands = (index) => {
    console.log('------------------>', index);
    const data = this.props.responseBrands[index];
    this.setState({
      brand: data.name,
      brandId: data.id
    })
    console.log(data);
  }

  _renderButton = (name, title, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.catlogstabtopview}>
        <Icon style={styles.catlogstab} name={name} />
        <Text style={styles.catlogstabtext}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = (catalog_id) => (
    <View style={styles.modalContent}>
      {this._renderButton("close", 'Sort By', () => this.setState({ visibleModal: false }))}
    </View>
  );

  _renderAutoCompleteListItem = (query, catalogId) => {
    this.setState({ query: query, catalogId: catalogId, hideResults: true });
  }

  render() {

    const gotoCamera = () => {
      const options = {
        title: 'Select Design',
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true,
        }
      }

      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let source = { uri: response.uri };
          console.log('gallery imag path', source);
          this.setState({
            ImageSource: source
          });
        }
      });
    }

    const { spinnerDatasCategory, responseBrands, responseCatalogDropdown } = this.props;
    if (responseCatalogDropdown.length > 0) {
      hideResults = false;
    } else {
      hideResults = true;
    }
    let category = spinnerDatasCategory.map(function (item) {
      return { value: item['fileName'] };
    });

    let brands = responseBrands.map(function (item) {
      return { value: item['name'] };
    });

    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <Container>
        <HeaderBackNativeBase title={strings('mybussiness.add_catalog')} />
        <ScrollView>
          <Card>
            <Text style={styles.paragraphview}>Catalog Details</Text>
            <Form >
              <View style={styles.dropdown}>
                <Dropdown label='Choose a category' onChangeText={(value, index, data) => { this.onChangeDropdownCategory(index) }} data={category} />

                <Dropdown label='Choose a brand' onChangeText={(value, index, data) => { this.onChangeDropdownBrands(index) }} data={brands} />

                {(this.state.showHints) ?
                  (<Text style={styles.brandtext}>If your brand is not registered on Wishbook, then add it from <Text style={{ color: colorresource.liteblue, fontSize: 12, textDecorationLine: 'underline' }}>here</Text>
                  </Text>) : null
                }
              </View>

              <View style={styles.autocompletecontainer}>
                <Autocomplete
                  autoCapitalize="none"
                  autoCorrect={false}
                  containerStyle={styles.autocomplete}
                  data={this.props.responseCatalogDropdown}
                  //data={this.state.responseCatalogDropdown.length === 1 && comp(this.state.query, this.state.responseCatalogDropdown[0].title) ? [] : this.state.responseCatalogDropdown}
                  defaultValue={this.state.query}
                  value={this.query}
                  onChangeText={this.changeText}
                  placeholder={strings('addCatalog.enter_catalog_name')}
                  hideResults={(hideResults === this.state.hideResults ? (false) : (true))}
                  renderItem={({ title, id }) => (
                    <TouchableOpacity onPress={() => this._renderAutoCompleteListItem(title, id)}>
                      <Text style={styles.itemText}>
                        {title}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
                {
                  (this.props.isLoading) ? (<ActivityIndicator size="small" color={colorresource.liteblue} />) : null
                }
              </View>

              <View style={styles.sellfullview}>
                <CheckBox checked={this.state.setFullCatalog} onPress={() => this.setState({ setFullCatalog: !this.state.setFullCatalog })} />
                <Text style={styles.sellfulltext} >Sell full catalog only</Text>

              </View>
              {(this.state.showHints) ? (<Text style={styles.dntselecttext}>Don't setect it if you are open to sell single pieces from the catalog</Text>)
                : null}
            </Form>
          </Card>

          <Card style={styles.card}>
            <CardItem>
              <Body>

                <View style={styles.showhints}>
                  <Text style={styles.hints}>Show hints</Text>
                  <Switch color={colorresource.liteblue} value={this.state.showHints} onValueChange={(value) => this.onChangeSwitch({ showHints: value })} />
                </View>

                <Right style={{ flexDirection: 'row' }}>

                  <TouchableOpacity onPress={gotoCamera} >

                    {this.state.ImageSource === null ? <Image style={styles.gotocamerawidth} source={require('../../images/applogo.png')} /> :
                      <FastImage style={styles.ImageDisplay} source={this.state.ImageSource} resizeMode={FastImage.resizeMode.contain} />
                    }

                  </TouchableOpacity>

                  <Button onPress={gotoCamera} style={styles.uploadcoverbtn}>
                    <Text style={{ fontSize: 13 }}> Upload Cover Photo </Text>
                  </Button>
                </Right>

              </Body>
            </CardItem>
          </Card>
        </ScrollView>
        <TouchableOpacity onPress={() => { this.checkValidation() }}>
          <Footer style={{
            backgroundColor: colorresource.liteblue, alignItems: 'center',
          }}>
            <Text style={styles.footer}>Continue</Text>
          </Footer>
        </TouchableOpacity>
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

  return {
    isLoading: state.catalogR.isLoading,
    response_catalogAdd: state.catalogR.response_catalogAdd,
    responseCategory: state.masterListR.responseCategory,
    spinnerDatasCategory: state.masterListR.spinnerDatasCategory,
    responseCatalogDropdown: state.catalogR.responseCatalogDropdown,
    responseBrands: state.brandsR.responseBrands,
    responseCatalogDetails: state.catalogR.responseCatalogDetails,
    error: state.catalogR.error,
  };
};

export default connect(mapStateToProps)(AddCatalog);

