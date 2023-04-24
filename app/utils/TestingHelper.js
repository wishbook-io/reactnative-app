const TestIdProp = (testId) => {
  return {
    'testID': testId,
    'accessibilityLabel': testId,
  }
}

const TestIdGenerator = (screenName = '', logicalName = '', componentName = '') => {
  return (_logicalName = logicalName, _componentName = componentName, _screenName = screenName) => {
    return TestIdProp(_screenName + _logicalName + _componentName)
  }
}

const SuffixedTestIdGenerator = (screenName = '', logicalName = '', componentName = '') => {
  return (_suffix = '', _logicalName = logicalName, _componentName = componentName) => {
    return TestIdProp(screenName + _logicalName + _suffix + _componentName)
  }
}

export { TestIdGenerator, SuffixedTestIdGenerator };

/*
Usage:

YourScreen.js 

import { TestIdGenerator } from 'TestingHelper'

const buttonIdGenerator = TestIdGenerator("YourScreen", '', "Button")
<Button {...idGenerator("MyShiny")}/>
will produce
<Button testId='YourScreenMyShinyButton' accessibilityId='YourScreenMyShinyButton'/>

*/