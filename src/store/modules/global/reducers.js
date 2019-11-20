import * as types from './action-types';
import state from './state';

let initialState = state;

export default (state = initialState, action) => {
  let _obj;
  switch (action.type) {
    case types.ADD_GLOBAL_DATA:
      _obj = action.payload.data;
      return {
        ...state,
        [action.payload.key]: { ..._obj }
      };
    default:
      return state;
  }
}
