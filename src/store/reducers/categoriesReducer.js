import {
  SET_CATEGORIES,
  ADD_CATEGORY,
  SET_CURRENT_CATEGORY,
  DELETE_CATEGORY,
  RESET_CURRENT_CATEGORY,
} from '../actions/constants';

const initialState = {
  categories: [],
  currentCategory: null,
};

const categoriesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: payload,
      };
    case RESET_CURRENT_CATEGORY: {
      return {
        ...state,
        currentCategory: null,
      };
    }
    case ADD_CATEGORY: {
      return {
        ...state,
        categories: payload,
      };
    }
    case DELETE_CATEGORY:
      return {
        ...state,
        currentCategory: null,
        categories: payload,
      };

    default:
      return state;
  }
};

export default categoriesReducer;
