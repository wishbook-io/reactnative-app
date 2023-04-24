import React, { Component, Fragment } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { AndroidBackHandler } from 'react-navigation-backhandler';

import Step1 from './Step1';
import StepTwoCatalog from './StepTwo';
import StepTwoSet from './StepTwoSet';
import { showToastAction } from 'app/actions/toast-actions';
import * as navigationActions from 'app/actions/navigation-actions';

import { TestIdGenerator } from 'app/utils/TestingHelper';
const screenName = 'Step1';
const buttonTestId = TestIdGenerator(screenName,'','Button');
const textTestId =  TestIdGenerator(screenName,'','Text');
const radioTestId = TestIdGenerator(screenName,'','Radio');
const checkBoxTestId = TestIdGenerator(screenName,'','CheckBox');
const spinnerTestId = TestIdGenerator(screenName,'','Spinner');
const inputTestId = TestIdGenerator(screenName,'','Input');

const step1TestIds = {
  catalog:        radioTestId('Catalog'),
  nonCatalog:     radioTestId('NonCatalog'),
  setMatching:    radioTestId('SetMatching'),
  top:            spinnerTestId('TopCategory'),
  category:       spinnerTestId('Category'),
  brand:          spinnerTestId('Brand'),
  name:           inputTestId('ProductName'),
  item:           inputTestId('ItemName'),
  photoshoot:     spinnerTestId('Photoshoot'),

  fabric:         buttonTestId('Fabric'),
  work:           buttonTestId('Work'),
  style:          buttonTestId('Style'),
  // save:           buttonTestId('SaveEav'),  <--- different sceen
  other:          inputTestId('Other'),
  live:           inputTestId('Live'),
  date:           buttonTestId('DispatchDate'),
  noOfPcsPerSet:  inputTestId('NoOfPcsPerSet'),
  pricePerPc:     inputTestId('PricePerPc'),
  continue:       buttonTestId('SaveAndContinue'),
  back:           buttonTestId('Back'),
}

const step2ScreenName = 'Step2';

const step2TestIds = {
  cover:  buttonTestId('AddCoverPhoto', undefined, step2ScreenName),
  full:   radioTestId('Full', undefined, step2ScreenName),
  single: radioTestId('Single', undefined, step2ScreenName),
  count:  inputTestId('TotalNoOfDesigns', undefined, step2ScreenName),
  same:   checkBoxTestId('SamePrice', undefined, step2ScreenName),
  add:    buttonTestId('AddProductPhotos', undefined, step2ScreenName),
  design: inputTestId('DesignNumber', undefined, step2ScreenName),
  price:  inputTestId('DesignPrice', undefined, step2ScreenName),
  delete: buttonTestId('Delete', undefined, step2ScreenName),
  submit: buttonTestId('Submit', undefined, step2ScreenName),
  back:   buttonTestId('Back', undefined, step2ScreenName),
}

const step2SetScreenName = 'Step2Set';

const step2SetTestIds = {
  design:     inputTestId('Design', undefined, step2SetScreenName),
  color:      inputTestId('Color', undefined, step2SetScreenName),
  addImages:  buttonTestId('AddImages', undefined, step2SetScreenName),
  live:       inputTestId('Live', undefined, step2SetScreenName),
  addSet:     buttonTestId('AddSet', undefined, step2SetScreenName),
  back:       buttonTestId('Back', undefined, step2SetScreenName),
  upload:     buttonTestId('Upload', undefined, step2SetScreenName),
}

const ADD_STEP = {
  ONE: "1",
  TWO_CATALOG: "2",
  TWO_SET: "3",
}

export default class AddProductsParent extends Component {

  onBackPress = () => {
    if(this.state.step === ADD_STEP.TWO_CATALOG || this.state.step === ADD_STEP.TWO_SET) {
      this.switchToStepOne()
      return true;
    }
    return false
  }

  goToMyBrands = () => {
    navigationActions.goToMyBrands();
  }

  goBack = () => {
    navigationActions.goBack();
  }

  switchToStepOne = () => {
    this.setState({step: ADD_STEP.ONE});
  }

  switchToStepTwoCatalog = (stepOneParams, sizeEav) => {
    this.setState({step: ADD_STEP.TWO_CATALOG, stepOneParams, sizeEav});
  }

  switchToStepTwoSet = (stepOneParams) => {
    this.setState({step: ADD_STEP.TWO_SET, stepOneParams})
  }

  navigateToSearch = (navParams) => {
    this.props.navigation.navigate('AddProductsSearch', navParams)
  }

  finishAddProducts = () => {
    // this.props.navigation.navigate('MyBusiness', {}, NavigationActions.navigate({ routeName: 'MyProducts' }),)
    // navigationActions.goToProductsTab({filters: {ordering: '-id'}});
    // navigationActions.replaceScreenAndGoToProducts({ordering: '-id'})
    
    // this works, but...
    // console.log("navigation state", this.props.navigation.state)
    // const parent = this.props.navigation.dangerouslyGetParent();
    // console.log("parent", parent.state);
    // const replaceAction = StackActions.replace({
      // key: parent.state.key,
      // routeName: 'ProductsScreen',
      // params: {ordering: '-id'}
    // })
    // this.props.navigation.dispatch(replaceAction)
    // ...

    this.props.navigation.pop()
    this.props.dispatch(showToastAction("Successfully uploaded product"))
    navigationActions.goToProductsTab({filters: {ordering: '-id'}})
  }
  
  constructor(props) {
    super(props)
    this.state = {
      step: ADD_STEP.ONE,
      stepOneParams: null,
      sizeEav: {}
    }
  }

  render() {
    return(
      <AndroidBackHandler onBackPress={this.onBackPress}>
        <Step1 
        hide={this.state.step !== ADD_STEP.ONE} 
        goToStepTwoCatalog={this.switchToStepTwoCatalog}
        goToStepTwoSet={this.switchToStepTwoSet}
        navigateToSearch={this.navigateToSearch}
        goBack={this.goBack}
        goToMyBrands={this.goToMyBrands}
        finishAddProducts={this.finishAddProducts}
        testIds={step1TestIds}
        />
        
        <StepTwoCatalog 
        hide={this.state.step !== ADD_STEP.TWO_CATALOG} 
        goToStepOne={this.switchToStepOne} 
        stepOneParams={this.state.stepOneParams}
        sizeEav={this.state.sizeEav}
        finishAddProducts={this.finishAddProducts}
        testIds={step2TestIds}
        />

        <StepTwoSet 
        hide={this.state.step !== ADD_STEP.TWO_SET} 
        goToStepOne={this.switchToStepOne} 
        stepOneParams={this.state.stepOneParams}
        finishAddProducts={this.finishAddProducts}
        testIds={step2SetTestIds}
        />
        </AndroidBackHandler>
    );
  }
}