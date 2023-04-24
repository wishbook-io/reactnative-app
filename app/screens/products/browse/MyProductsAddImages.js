import React, { Component } from 'react';
import { View } from 'react-native';
import { 
  Header, 
  Title, 
  Content, 
  Button, 
  Left, 
  Right, 
  Body, 
  Icon, 
  Text,
  Container,
  Footer,
  FooterTab,
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import Modal from 'app/components/Modal/Modal';
import {uploadSetMatchingProduct} from './serverHelper'
import {calculateExpiryDate, getFormData} from '../add/validationHelper';
import SetDetail from '../add/SetDetail';
import { colorresource } from 'app/resources/colorresource';
import styles from './styles';

// redux
import {connect} from 'react-redux';
import { showToastAction } from 'app/actions/toast-actions'

import { TestIdGenerator } from 'app/utils/TestingHelper';
const screenName = 'AddSet';
const inputTestId = TestIdGenerator(screenName,'','Input');
const buttonTestId = TestIdGenerator(screenName,'','Button');


const testIds = {
  design:     inputTestId('Design'),
  color:      inputTestId('Color'),
  addImages:  buttonTestId('AddImages'),
  live:       inputTestId('Live'),
  addSet:     buttonTestId('AddSet'),
  back:       buttonTestId('Back'),
  upload:     buttonTestId('Upload'),
}

class MyProductsAddImages extends Component {
  
  onUploadDone = () => {
    console.log("[onUploadDone]")
    const onAddSetDone = this.props.navigation.getParam('onAddSetDone', () => {})
    onAddSetDone();
    this.props.navigation.goBack();
  }

  setShowProgressModal = (text) => {
    this.setProgressModalVisibility(true);
  }

  setHideProgressModal = () => {
    this.setProgressModalVisibility(false);
  }

  setProgressModalVisibility = (visible) => {
    let newState = {progressModalVisible: visible}
    this.setState(newState);
  }

  getCallThreeParamsFromSetDetailImage = (image, index) => {
    let callThreeParams = {
      set_default: index === 0,
      sort_order: this.state.sortOrder,
    }
    let formData = getFormData(callThreeParams, image)
    return formData;
  }

  getCallThreeParams = () => {
    let callThreeImageParamsList = this.state.setDetail.images.map(this.getCallThreeParamsFromSetDetailImage);
    return callThreeImageParamsList
  }

  getCallTwoParamsFromSetDetail = (setDetail, index) => {
    let callTwoParams = {
      sku: setDetail.design,
      title: setDetail.design,
      sort_order: index,
      product_type: 'set',
      ...(this.state.showColor? {set_type_details: setDetail.color} : {}),
      expiry_date: calculateExpiryDate(setDetail.live)
    }
    
    let formData = getFormData(callTwoParams, setDetail.images[0])

    return formData;
  }

  getCallTwoParams = () => {
    // call two params is an array,
    // containing call two params for each
    let callTwoParams = this.getCallTwoParamsFromSetDetail(this.state.setDetail, 0);
    callTwoParams.append('catalog', this.state.setId);
    
    return callTwoParams;
  }

  prepareParams = () => {
    const callTwoParams = this.getCallTwoParams();
    const callThreeParams = this.getCallThreeParams();

    return [callTwoParams, callThreeParams];
  }

  onDonePress = async () => {
    const {data, error: errorValidation} = this.validateSetDetail(this.state.setDetail);
    if(errorValidation) {
      this.showToast(errorValidation);
      return;
    }
    // upload here
    this.setState({progressModalVisible: true})
    const params = this.prepareParams();
    const {response, error} = await uploadSetMatchingProduct({params});
    this.setState({progressModalVisible: false}, this.onUploadDone)
  }

  validateSetDetail = (setDetail) => {
    let validateResult = {
      data: {},
      error: null,
    }

    const designValue = setDetail.design;
    if(!designValue) {
      validateResult.error = "Please enter design name/number"
      return validateResult;
    }
    validateResult.data.design = designValue;

    const colorValue = setDetail.color;
    const isColorSet = this.state.showColor;
    if(isColorSet && !colorValue) {
      validateResult.error = "Please enter color name";
      return validateResult;
    }
    validateResult.data.color = colorValue;

    const imagesValue = setDetail.images;
    if(imagesValue.length === 0) {
      validateResult.error = "Please add atleast one product";
      return validateResult;
    }
    validateResult.data.images = imagesValue;

    const liveValue = parseInt(setDetail.live);
    if(Number.isNaN(liveValue)) {
      validateResult.error = "Please enter a valid enable duration";
      return validateResult;
    }
    if(liveValue < 10) {
      validateResult.error = "Minimum enable duration should be 10";
      return validateResult;
    }
    if(liveValue > 90) {
      validateResult.error = "Maximum enable duration should be 90";
      return validateResult;
    }
    validateResult.data.live = liveValue;

    return validateResult;
  }

  onSetDetailChange = (params) => {
    // console.log("onsetDetailChange params", params);
    const index = params.index;
    const update = params.update;
    let updatedSetDetail = {...this.state.setDetail, ...update}
    // console.log("changedsetdetail: ", changedSetDetail);
    console.log("updated set details:", updatedSetDetail);
    this.setState({setDetail: updatedSetDetail})
  }

  showToast = (message, duration=1000) => {
    this.props.dispatch(showToastAction(message, duration))
  }

  constructor(props) {
    super(props)
    console.log("[MyProductsAddImages] nav params", this.props.navigation.state.params)
    const getNavParam = this.props.navigation.getParam;
    const isColorSet = getNavParam('colorSet', true);
    const setId = getNavParam('setId', '5916')
    const sortOrder = getNavParam('sortOrder', 0)
    this.state = {

      setId,
      sortOrder,

      showColor: isColorSet,

      progressModalVisible: false,

      // setDetail: {
      //   design: 'd100',
      //   color: 'c100',
      //   images: ['file:///sdcard/set_upload_testing/images/s01p01.png'],
      //   live: '53',
      // },

      setDetail: {
        design: '',
        color: '',
        images: [],
        live: '30',
      }
    }
  }

  render() {
    return (
      <Container style={{backgroundColor: colorresource.greybg}}>
        <Header  style={{backgroundColor: colorresource.liteblue}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' style={{color: 'white', fontSize: 24}}/>
            </Button>
          </Left>
          <Body>
            <Title>Add Images</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <SetDetail
          data={this.state.setDetail}
          index={0}
          onSetDetailChange={this.onSetDetailChange}
          showColor={this.state.showColor}
          testIds={testIds}
          />
        </Content>



        <Footer>
          <FooterTab>
            <Button style={{backgroundColor:colorresource.liteblue}} onPress={this.onDonePress} >
              <Text style={{color:'white', fontSize: 16, paddingTop: 0, paddingBottom: 0}}>{'done'}</Text>
            </Button>
          </FooterTab>
        </Footer>

        <Modal
        onBackdropPress={this.setHideProgressModal}
        isVisible={this.state.progressModalVisible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        >
          <View style={localStyles.ProgressModalParent}>
            <Text style={localStyles.ProgressModalHeading}>{'Uploading Image : '+this.props.responseProgress+' / '+this.state.setDetail.images.length}</Text>
          </View>
        </Modal>
        
      </Container>
    );
  }
}

const localStyles = EStyleSheet.create({
  SetAddSet: {
    flex: 1,
    marginBottom: 20,
  },
  SetAddSetButton: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 3,
    backgroundColor: colorresource.liteblue,
  },
  ProgressModalParent: {
    backgroundColor: 'white',
    borderRadius: 3,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  ProgressModalHeading: {
    color: colorresource.grey900,
    fontSize: 20,
    fontWeight: 'bold',
  }
});

const mapStateToProps = (state) => ({
  responseProgress: state.catalogR.uploadSetProgress,
});

export default connect(mapStateToProps)(MyProductsAddImages);