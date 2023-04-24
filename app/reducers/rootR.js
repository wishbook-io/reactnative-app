/**
 * Created by Yuvaraj on 6/29/17.
 */
import * as actions from "../actions/root-actions";

const initialState = {
  progress: false
};

export default function rootReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PROGRESS:
      return state.set('progress', action.PROGRESS);
    default:
      return state
  }
}
