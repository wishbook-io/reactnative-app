import React, { Component } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Container, Header, Button, Text, Item, Input, Label } from 'native-base';
import { Button as PButton } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'
import _ from 'lodash';

import assets from '../../utils/assetsObject';
import TextInputKeyed from 'app/components/MaterialTextInput/TextInputKeyed';
import ImagePickerWeb from 'app/components/ImagePicker/ImagePicker';
import { HeaderBackNativeBase } from '../../components/Header';
import GenericHeader from 'app/components/Header/GenericHeader';
import { strings } from '../../utils/i18n';
import { colorresource } from '../../resources/colorresource';
import { getCompanyId } from '../../utils/URLConstants';
import styles from './styles'
import UserHelper from '../../config/userHelper';
import { showToastAction } from 'app/actions/toast-actions'
import { formatErrorFromServer } from 'app/utils/formatHelper'
import { isWeb } from 'app/utils/PlatformHelper';

// actions
import { addBrandAction, addBrandClear, addBrandSuccess } from '../../actions/brand-actions';
import * as serverHelper from './serverHelper';
import { errorActionSet } from '../../actions/error-actions';
import { requestShowLoaderAction, requestHideLoaderAction } from 'app/actions/loader-actions';
import { waitTillUserInfoIsFetched } from 'app/utils/debugHelper';

const screenName = 'AddBrand'

class AddBrand extends Component {

  onImagePickerWebComplete = (data) => {
    console.log(data);
    const { uri, height, width, fileName } = data
    /*
    cancelled: false
    height: 768
    width: 1366
    uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABVYAA..."
    fileName: "Screenshot from 2017-08-14 16-49-32.png"
    file: {
      name: "Screenshot from 2017-08-14 16-49-32.png", 
      lastModified: 1502709578000, 
      webkitRelativePath: "", 
      size: 140480, 
      type: "image/png"
    }
    */
    this.setState({imageSource: {uri}, pickerResponse: data})
  }

  onUploadImagePress = () => {
    if(isWeb) {
      return;
    }
    this.gotoCamera()
  }

  onChangeText = (text) => {
    this.setState({brandName: {text}});
  }
  
  goBack = () => {
    this.props.navigation.goBack()
  }

  gotoCamera = () => {
      
    const options = {
      title: 'Select Design',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        cameraRoll: true,
        waitUntilSaved: true,
      }
    }
    
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response uri, fileName = ', response.uri, response.fileName);
      // console.log("response keys", Object.keys(response));
      /*
      response keys:
        height
        width
        type
        fileName
        fileSize
        path
        data
        uri
        isVertical
        originalRotation
      */
      
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        
        this.setState({
          imageSource: source,
          pickerResponse: response,
        });
      }
    });
  }

  onUploadSuccess = () => {
    this.goBack();
    const onBrandAdded = this.props.navigation.getParam("onBrandAdded", () => {})
    onBrandAdded();
  }

  onUploadFailed = (error) => {
    console.log("[onUploadFailed] error:", error)
    const nameError = _.get(error, "errorResponse.name")
    if(nameError) {
      // this.showToast(nameError)
      this.setState({brandName: {error: nameError}})
    } else {
      this.props.dispatch(errorActionSet(error))
    }
  }

  onSavePress = async () => {
    // Is it OK to have URL param information here?
    // Shouldn't the saga handle these things via passing params in action?
    //*

    // debug
    // this.goBack();
    //   const onBrandAdded = this.props.navigation.getParam("onBrandAdded", () => {})
    //   onBrandAdded();
    //   return;
    //   //debug end

    if(!this.state.imageSource) {
      this.showToast("Image can't be empty");
      return;
    }

    if(!this.state.brandName.text) {
      // this.showToast("Please enter brand name");
      this.setState({brandName: {error: "Please enter brand name"}})
      return;
    }

    // console.log("Brand Name: ", this.state.text)
    const brandName = this.state.brandName.text;
    const companyId = UserHelper.getUsercompany_id()
    // console.log("Received company id", companyId);
    
    let formData = new FormData();

    formData.append('image', isWeb? this.state.pickerResponse.file : {
        uri: this.state.pickerResponse.uri,
        type: 'image/png',
        name: this.state.pickerResponse.fileName
    });
    
    formData.append('name', brandName)
    formData.append('company', companyId)

    this.props.dispatch(requestShowLoaderAction(screenName))
    const result = await serverHelper.addBrand(formData);
    this.props.dispatch(requestHideLoaderAction(screenName))
    
    if(result && result.response) {
      this.onUploadSuccess();
    } else {
      this.onUploadFailed(error)
    }
    
    //*/
    
    // for debugging purposes
    /*
    this.props.dispatch(addBrandSuccess({
      id: 608,
      name: 'Test Brand Name 01',
      company: 'Laxmi Emporium',
      company_id: 3857,
      image: { 
          full_size: 'http://b2b.trivenilabs.com/media/brand_image/image-aa476eb4-ff62-494b-abd8-794430650f5d.jpg',
          thumbnail_small: 'http://b2b.trivenilabs.com/media/__sized__/brand_image/image-aa476eb4-ff62-494b-abd8-794430650f5d-thumbnail-150x150-90.jpg' 
      },
      total_catalogs: 0,
      user: 'bhavik101' 
    }))
    */

  }

  showToast = (message, duration=1000) => {    
    this.props.dispatch(showToastAction(message, duration))
  }

  constructor(props) {
    super(props)
    this.state = {
      imageSource: null,
      brandName: {
        text: '',
        error: null,
      },
      // debugging:
      // imageSource: {uri: 'file:///sdcard/test1.png'},
      // imageSource: {uri: 'file:///sdcard/set_upload_testing/images/s01p01.png'},
      // pickerResponse: {
        // uri: 'file:///sdcard/set_upload_testing/images/s01p01.png',
        // fileName: 's01p01.png',
        // uri: 'file:///sdcard/test1.png',
        // fileName: 'test1.png',
      // },
      // text: 'WB-3862 ' + String(Math.floor(Math.random() * 1000) + 100),
      // debug end
    }
  }
  
  componentDidMount() {
    //waitTillUserInfoIsFetched()
  }
  
  render() {
    return (
      <Container>
        <KeyboardAvoidingView style={styles.Addbrandsflexone}>
          <GenericHeader title={strings('addBrand.add_brand')} />
          <View style={styles.Addbrandaddbrandstopview}>
        
            <View style={styles.Addbrandfirstview}>
              <View style={styles.Addbrandimageviewcamera}>
                {this.state.imageSource === null 
                  ? <Image style={styles.Addbrandimagesource} source={assets['ic_camera']} /> 
                  : <Image style={styles.Addbrandimagesource} source={this.state.imageSource} resizeMode={'contain'}/>
                }
              </View>
              <ImagePickerWeb style={styles.secondview} onComplete={this.onImagePickerWebComplete}>
                <PButton
                mode={'contained'}
                onPress={this.onUploadImagePress}
                >{strings('addBrand.upload_image')}</PButton>
              </ImagePickerWeb>
            </View>
            
            <View style={styles.AddbrandfloatingAddbrandsecondview}>
              <TextInputKeyed
              label={strings('addBrand.enter_your_brand_name')}
              onChange={this.onChangeText}
              value={this.state.brandName.text}
              error={this.state.brandName.error}
              />
              <View style={styles.Addbrandsmt}>
                <PButton
                onPress={this.onSavePress}
                mode={'contained'}
                >
                {strings('common.save')}
                </PButton>
              </View>
            </View>

          </View>

        </KeyboardAvoidingView>
      </Container>
    
    );
  }
}

const mapStateToProps = (state) => {
  return {
    responseAddBrand: state.brandsR.responseAddBrand,
  }
}

export default connect(mapStateToProps)(AddBrand);