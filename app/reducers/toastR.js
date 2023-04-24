import { 
  SHOW_TOAST_ACTION, POP_TOAST_ACTION, CLEAR_TOAST_ACTION
} from 'app/actions/toast-actions'

const initialState = {
  toast: [],
}

const toastReducer = (state = initialState, action) => {
  switch(action.type) {
    
    case SHOW_TOAST_ACTION:
    return {
      ...state,
      toast: [...state.toast, {message: action.message, duration: action.duration}]
    }

    case POP_TOAST_ACTION:
    return {
      ...state,
      toast: state.toast.slice(1),
    }

    case CLEAR_TOAST_ACTION:
    return {
      ...state,
      toast: [],
    }

    default:
    return state
  }
}

export default toastReducer;