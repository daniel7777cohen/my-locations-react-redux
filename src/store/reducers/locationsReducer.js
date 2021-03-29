import {
  SET_LOCATIONS,
  ADD_LOCATION,
  SET_CURRENT_LOCATION,
  DELETE_LOCATION,
  RESET_CURRENT_LOCATION,
} from '../actions/constants';

const initialState = {
  currentLocation: null,
  locations: [],
};

const locationsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOCATIONS:
      return {
        ...state,
        locations: payload,
      };
    case SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: payload,
      };
    case ADD_LOCATION: {
      return {
        ...state,
        locations: payload,
      };
    }
    case DELETE_LOCATION:
      return {
        ...state,
        currentLocation: null,
        locations: payload,
      };
    case RESET_CURRENT_LOCATION: {
      return {
        ...state,
        currentLocation: null,
      };
    }
    default:
      return state;
  }
};

export default locationsReducer;
