import React, { Component } from 'react';
import { View, Picker, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { 
  Container, 
  Content, 
  Footer,
  FooterTab,
  Button, 
  Icon, 
  Text,
} from 'native-base';
import { Button as PButton } from 'react-native-paper'
import EStyleSheet from 'react-native-extended-stylesheet';
import _ from 'lodash';

import GenericHeader from 'app/components/Header/GenericHeader';
import Modal from 'app/components/Modal/Modal';
import CustomPicker from './CustomPicker';
import { colorresource } from 'app/resources/colorresource';
import styles from './styles';
import SetDetail from './SetDetail';
import {calculateExpiryDate, getFormData} from './validationHelper';

// actions
import { connect } from 'react-redux';
import { uploadSetAction, clearUploadSetResponse } from 'app/actions/catalog-actions';
import { showToastAction } from 'app/actions/toast-actions'

import { TestIdGenerator } from 'app/utils/TestingHelper';

const screenName = 'StepTwo';
const inputTestId = TestIdGenerator(screenName, '', 'Input');
const buttonTestId = TestIdGenerator(screenName,'','Button');

class StepTwoSet extends Component {

  // TODO:
  // find a better way to figure out if it is a color set
  // either export a function from step1
  // or have a function in helper, and move logic from step1 to helper
  // or pass a boolean from step1 itself
  isColorSet = () => {
    const setParam = this.props.stepOneParams.multi_set_type;
    return setParam === 'color_set'
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
    const isColorSet = this.isColorSet();
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

  onUploadPress = () => {
    Keyboard.dismiss();
    const disableValidation = false;
    let valid = true;

    _.forEach(this.state.setDetails, (item) => {
      const { data, error } = this.validateSetDetail(item)
      if(error) {
        this.showToast(error);
        valid = false;
        return false; // break for each
      }
    });
    valid = disableValidation || valid;
    if(!valid) {
      return;
    }

    const params = this.prepareParams();

    this.props.dispatch(uploadSetAction(params));
    this.setShowProgressModal();

    
  }

  prepareParams = () => {
    
    const callOneParams = this.getCallOneParams();
    const callTwoParams = this.getCallTwoParams();
    const callThreeParams = this.getCallThreeParams();

    return [callOneParams, callTwoParams, callThreeParams];
  }

  getCallThreeParamsFromSetDetailImage = (image, index) => {
    let callThreeParams = {
      set_default: index === 0,
      sort_order: index+1,
    }
    let formData = getFormData(callThreeParams, image)
    return formData;
  }

  getCallThreeParamsFromSetDetail = (setDetail, index) => {
    let callThreeImageParamsList = setDetail.images.map(this.getCallThreeParamsFromSetDetailImage);
    return callThreeImageParamsList
  }

  getCallThreeParams = () => {
    let callThreeParams = this.state.setDetails.map(this.getCallThreeParamsFromSetDetail)
    return callThreeParams;
  }

  getCallTwoParamsFromSetDetail = (setDetail, index) => {
    let callTwoParams = {
      sku: setDetail.design,
      title: setDetail.design,
      sort_order: index,
      product_type: 'set',
      ...(this.isColorSet()? {set_type_details: setDetail.color} : {}),
      expiry_date: calculateExpiryDate(setDetail.live)
    }
    
    let formData = getFormData(callTwoParams, setDetail.images[0])

    return formData;
  }

  getCallTwoParams = () => {
    // call two params is an array,
    // containing call two params for each
    let callTwoParams = this.state.setDetails.map(this.getCallTwoParamsFromSetDetail)
    return callTwoParams;
  }

  getCallOneParams = () => {
    const stepOneCallOneParams = this.props.stepOneParams;
    const callOneParams = {
      ...stepOneCallOneParams,
      "set_type": "multi_set",
      "view_permission": 'public',
    }

    console.log("[getCallOneParams] callOneParams", callOneParams);
    return callOneParams;
  }

  onSetDetailChange = (params) => {
    // console.log("onsetDetailChange params", params);
    const index = params.index;
    const update = params.update;
    let updatedSetDetails = _.cloneDeep(this.state.setDetails)
    const changedSetDetail = {...updatedSetDetails[index], ...update}
    // console.log("changedsetdetail: ", changedSetDetail);
    updatedSetDetails[index] = changedSetDetail;
    console.log("updated set details:", updatedSetDetails);
    this.setState({setDetails: updatedSetDetails})
  }

  onAddAnotherSetPress = () => {
    let index = 0;
    // console.log(this.setDetailRefs);
    for(; index < this.state.setDetails.length; ++index) {
      const { data, error } = this.validateSetDetail(this.state.setDetails[index])
      if(error) {
        this.showToast(error)
        return;
      }
    }

    // console.log("setDetails:", this.state.setDetails);
    let updatedSetDetails = _.cloneDeep(this.state.setDetails);
    // console.log("cloned updatedSetDetails:", updatedSetDetails);
    updatedSetDetails.push({
      design: '',
      color: '',
      live: 30,
      images: [],
    })
    // console.log("updatedSetDetails: ", updatedSetDetails);
    this.setState({setDetails: updatedSetDetails})
  }

  onDeleteSetDetailPress = (index) => {
    this.setDetailRefs.splice(index, 1);
    // console.log("setDetails:", this.state.setDetails);
    let updatedSetDetails = _.cloneDeep(this.state.setDetails);
    // console.log("cloned updatedSetDetails:", updatedSetDetails);
    updatedSetDetails.splice(index, 1)
    // console.log("updatedSetDetails:", updatedSetDetails);
    this.setState({setDetails: updatedSetDetails});
  }

  showToast = (message, duration=1000) => {
    this.props.dispatch(showToastAction(message, duration))
  }

  setRef = (ref) => {
    if(ref) {
      this.setDetailRefs[ref.props.index] = ref;
    } else {
      console.log("ref is null")
      // this means that some component was deleted
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      setDetails: [
        // {
        //   design: 'design1',
        //   color: 'color1',
        //   images: ['file:///sdcard/set_upload_testing/images/s01p01.png'],
        //   live: '30',
        // },
        // {
        //   design: 'design2',
        //   color: 'color2',
        //   images: ['file:///sdcard/set_upload_testing/images/s02p01.png', 'file:///sdcard/set_upload_testing/images/s02p02.png'],
        //   live: '30',
        // },
        // {
        //   design: 'design3',
        //   color: 'color3',
        //   images: ['file:///sdcard/set_upload_testing/images/s03p01.png', 'file:///sdcard/set_upload_testing/images/s03p02.png', 'file:///sdcard/set_upload_testing/images/s03p03.png'],
        //   live: '30',
        // },
        // {
        //   design: 'design4',
        //   color: 'color4',
        //   images: ['file:///sdcard/set_upload_testing/images/s04p01.png', 'file:///sdcard/set_upload_testing/images/s04p02.png', 'file:///sdcard/set_upload_testing/images/s04p03.png', 'file:///sdcard/set_upload_testing/images/s04p04.png'],
        //   live: '30',
        // },
        // {
        //   design: 'design5',
        //   color: 'color5',
        //   images: ['file:///sdcard/set_upload_testing/images/s05p01.png', 'file:///sdcard/set_upload_testing/images/s05p02.png', 'file:///sdcard/set_upload_testing/images/s05p03.png', 'file:///sdcard/set_upload_testing/images/s05p04.png', 'file:///sdcard/set_upload_testing/images/s05p05.png'],
        //   live: '30',
        // }
        {
          design: '',
          color: '',
          images: [],
          live: '30',
        }
        
      ]
    }
    this.setDetailRefs = []
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.responseUploadSet.length > 0 && prevState.progressModalVisible) {
      this.setState({progressModalVisible: false});
      this.props.dispatch(clearUploadSetResponse());
      this.props.finishAddProducts();
    }
  }

  render() {
    if(this.props.hide) {
      return null;
    }
    const testIds = this.props.testIds;
    return(
      <Container style={{backgroundColor: colorresource.materialbg}}>
        <GenericHeader
          title={'Add Products'}
          leftConfig={{
            visible: true,
            icon: 'arrow-back',
            onPress: this.props.goToStepOne,
            testId: testIds.back
          }}
        />
        <Content>

          {this.state.setDetails.map((item,index) =>
            <SetDetail 
            onDeleteSetDetailPress={this.onDeleteSetDetailPress} 
            key={index} 
            index={index} 
            ref={this.setRef/*(ref) => this.setDetailRefs[index] = ref*/}
            data={item}
            onSetDetailChange={this.onSetDetailChange}
            showColor={this.isColorSet()}
            testIds={testIds}
            />
          )}
          
          <View style={localStyles.SetAddSet}>
            {/* <Button full style={localStyles.SetAddSetButton} onPress={this.onAddAnotherSetPress} {...testIds.addSet}>
              <Text uppercase={false}>Add another set</Text>
            </Button> */}
            <PButton
            onPress={this.onAddAnotherSetPress}
            uppercase={false}
            mode={'contained'}
            >
              {'Add another set'}
            </PButton>
          </View>

        </Content>
        <Footer style={{/*borderWidth: 1, borderColor: 'black'*/}}>
          <FooterTab style={{}}>
            <Button full style={{backgroundColor: colorresource.liteblue}} onPress={this.onUploadPress} {...testIds.upload}>
                <Text style={{marginTop: 5, color: 'white', fontSize: 17, lineHeight: 17}}>Upload</Text>
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
            <Text style={localStyles.ProgressModalHeading}>{'Uploading Image : '+this.props.responseProgress+' / '+this.state.setDetails.length}</Text>
          </View>
        </Modal>

      </Container>
    );
  }
}

const AddProductChip = ({onPress, text}) => {
  return (
    <View style={localStyles.ChipParent}>
      <TouchableOpacity onPress={onPress} style={localStyles.Chip}>
          <Text style={localStyles.ChipText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const localStyles = EStyleSheet.create({
  SetAddSet: {
    flex: 1,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
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

const mapStateToProps = (state) => {
  
  return {
    responseFabric:     state.enumgroupR.responseFabrics,
    responseWork:       state.enumgroupR.responseWorks,
    responseStyle:      state.enumgroupR.responseStyles,
    responseUploadSet:  state.catalogR.responseUploadSet,
    responseProgress:   state.catalogR.uploadSetProgress,
  };
};

export default connect(mapStateToProps)(StepTwoSet);