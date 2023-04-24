import {
  SETUP_HOME_ACTION, SETUP_HOME_SUCCESS
} from "../actions/home-actions";
import { commonErrorReducer } from './errorR';

const initialState = {
  error: {},
  isLoading: false,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {

    case SETUP_HOME_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case SETUP_HOME_SUCCESS:
    return {
      ...state,
      responseSetupHome: action.responseSetupHome,
      isLoading: false,
    };
    
    default:
    return commonErrorReducer(state, action);
  }
};

export default homeReducer;