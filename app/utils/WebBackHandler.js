import * as React from 'react';
import { withNavigation } from 'react-navigation';

const EVENT_NAME = 'popstate';

const addWebEventListener = (name, handler) => {
  window.addEventListener(EVENT_NAME, handler)
  if(!Array.isArray(window.popStateListeners)) {
    window.popStateListeners = []
  } else if(window.popStateListeners.find(i => i.name === name)) {
    return
  }
  window.popStateListeners.push({name: name, callback: handler})
}

const removeWebEventListener = (name, handler) => {
  window.removeEventListener(EVENT_NAME, handler)
  const index = window.popStateListeners.findIndex(i => i.name === name)
  if(index != -1) {
    window.popStateListeners.splice(index, 1)
  } else {
    console.warn("[BackHandler.web.js] FATAL: did we not register the listener while mounting:", name)
  }
}

const eventHandler = (event, name, handler) => {
  const length = window.popStateListeners.length
  const last = window.popStateListeners[length - 1]
  const myIndex = window.popStateListeners.findIndex(i => i.name === name)
  if(last.name === name) {
    // begin bubbling
    window.popStateBubbling = true;
  }
  if(!window.popStateBubbling) {
    return
  }
  // we are bubbling
  const handled = handler()
  if(handled) {
    window.popStateBubbling = false
  } else {
    const prev = window.popStateListeners[myIndex - 1]
    const prevCallback = prev && prev.callback
    if(prevCallback) {
      prevCallback(event)
    }
  }
}

class BackHandlerAndroid extends React.Component {
  _willFocusSubscription;
  _willBlurSubscription;
  
  constructor(props) {
    super(props);
    this._willFocusSubscription = props.navigation.addListener('willFocus', payload =>
    this.addWebEventListener()
    );
  }

  addWebEventListener = () => {
    const name = this.props.name
    // TODO:
    // capture the return value and store it in
    // this.handleEvent, 
    // let this function itself create the handler
    // and instead of passing this.handleEvent,
    // pass the backPressed function instead
    addWebEventListener(name, this.handleEvent)
  }

  removeWebEventListener = () => {
    const name = this.props.name
    removeWebEventListener(name, this.handleEvent)
  }
  
  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => 
    this.removeWebEventListener()
    );
  }
  
  onBackPressed = () => {
    console.log("now handling the event for ", this.props.name)
    return this.props.onBackPress();
  }
  
  handleEvent = (event) => {
    const name = this.props.name
    eventHandler(event, name, this.onBackPressed)
  };
  
  componentWillUnmount() {
    this._willFocusSubscription && this._willFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }
  
  render() {
    return this.props.children || null;
  }
}

export const AndroidBackHandler = withNavigation(BackHandlerAndroid);

export const withWebBackHandler = (WrappedComponent) => {

 return class extends React.Component {

    getOrSetName = () => {
      if(this.name) {
        return this.name
      }
      const length = window.popStateListeners.length
      const name = 'Modal' + length
      this.name = name;
      return name;
    }

    onBackButtonPress = () => {
      if(this.props.onBackButtonPress) {
        this.props.onBackButtonPress()
        return true
      }
      if(this.props.isVisible) {
        return true;
      }
      return false
    }

    addWebEventListener = () => {
      const name = this.getOrSetName()
      addWebEventListener(name, this.handleEvent)
    }

    removeWebEventListener = () => {
      if(this.name) {
        removeWebEventListener(this.name, this.handleEvent)
        this.name = undefined;
      }
    }

    handleEvent = (event) => {
      this.onBackButtonPress()
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevProps.isVisible !== this.props.isVisible) {
        if(this.props.isVisible) {
          this.addWebEventListener()
        } else {
          this.removeWebEventListener()
        }
      }
    }

    componentWillUnmount() {
      this.removeWebEventListener()
    }

    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
}