import { 
  REQUEST_SHOW_LOADER_ACTION, REQUEST_HIDE_LOADER_ACTION
} from 'app/actions/loader-actions'

const initialState = {
  requestLoader: 0,
}

const loaderReducer = (state = initialState, action) => {
  switch(action.type) {
    
    case REQUEST_SHOW_LOADER_ACTION:
    return {
      ...state,
      requestLoader: state.requestLoader? state.requestLoader + 1 : 1
    }

    case REQUEST_HIDE_LOADER_ACTION:
    // console.log("Hiding loader", state.requestLoader)
    return {
      ...state,
      requestLoader: state.requestLoader? state.requestLoader - 1 : 0
    }

    default:
    return state
  }
}

export default loaderReducer;