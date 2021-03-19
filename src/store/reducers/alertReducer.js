import { SET_ALERT, REMOVE_ALERTS } from '../actions/constants';

const initialState = [];
const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERTS:
      return [];
    default:
      return state;
  }
};

export default alertReducer;
