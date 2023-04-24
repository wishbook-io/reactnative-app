import {
  ERROR_HANDLER
} from '../actions/error-actions';

export function commonErrorReducer(state, action) {
  switch (action.type) {
    
    case ERROR_HANDLER:
    return {
      ...state,
      isLoading: false,
    }
    
    default:
    return state;
  }
}