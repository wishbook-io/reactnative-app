import { 
  SHOW_ALERT_ACTION, POP_ALERT_ACTION, CLEAR_ALERT_ACTION
} from 'app/actions/notifier-actions'

const initialState = {
  alert: [],
}

const notifierReducer = (state = initialState, action) => {
  switch(action.type) {
    
    case SHOW_ALERT_ACTION:
    // console.log("show alert action", action)
    return {
      ...state,
      alert: [...state.alert, action.alert]
    }

    case POP_ALERT_ACTION:
    return {
      ...state,
      alert: state.alert.slice(1),
    }

    case CLEAR_ALERT_ACTION:
    return {
      ...state,
      alert: [],
    }

    default:
    return state
  }
}

export default notifierReducer;