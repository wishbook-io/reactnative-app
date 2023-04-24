import {
  GET_STATES_ACTION,          GET_STATES_SUCCESS,
  GET_CITIES_ACTION,          GET_CITIES_SUCCESS,
  GET_ORDERED_STATES_ACTION,  GET_ORDERED_STATES_SUCCESS,

} from "../actions/state-actions";
import {commonErrorReducer} from './errorR';

const initialState = {
  states: [],
  error: {},
  isLoading: false,
  response_cities:[],
  citiesByStateId: {},
  responseGetOrderedStates: [],
};


const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case GET_STATES_ACTION:
    return {
      ...state,
      isLoading: true,
    };
    case GET_STATES_SUCCESS:
    return {
      ...state,
      states: action.response_states,
      isLoading: false
    };

    case GET_CITIES_ACTION:
    return {
      ...state,
      [action.loadingParam]: true
    }
    case GET_CITIES_SUCCESS:
    let citiesByStateId = {}
    action.response_cities.forEach(city => {
      const stateId = city.state;
      if(!citiesByStateId[stateId]) {
        citiesByStateId[stateId] = []
      }
      citiesByStateId[stateId].push(city)
    });
    return {
      ...state,
      response_cities:action.response_cities,
      citiesByStateId: {...state.citiesByStateId, ...citiesByStateId},
      [action.loadingParam]: false,
    }

    case GET_ORDERED_STATES_ACTION:
    return {
      ...state,
    }
    case GET_ORDERED_STATES_SUCCESS:
    return {
      ...state,
      responseGetOrderedStates: action.responseGetOrderedStates,
    }

    default:
    return commonErrorReducer(state, action);
  }
};


export default stateReducer;