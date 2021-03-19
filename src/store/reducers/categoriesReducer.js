import {
  LOAD_DATA,
  ADD_CATEGORY,
  SET_CURRENT_CATEGORY,
  SET_SIDEBAR_AS_TITLE,
  APPEND_ACTION_TO_TITLE,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
} from '../actions/constants';

const initialTitle = 'Hi, user';

const initialState = {
  categories: [],
  currentCategory: null,
  title: initialTitle,
};

const categoriesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_DATA:
      return {
        ...state,
        categories: payload,
      };
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: payload,
        title: `${payload.name}`,
      };

    case EDIT_CATEGORY: {
      const { newCategories, newCurrentCategory } = payload;
      return {
        ...state,
        categories: newCategories,
        currentCategory: newCurrentCategory,
        title: `${newCurrentCategory.name} - edit`,
      };
    }

    case SET_SIDEBAR_AS_TITLE: {
      return {
        ...state,
        currentCategory: null,
        title: payload,
      };
    }

    case APPEND_ACTION_TO_TITLE: {
      return {
        ...state,
        title: `${state.currentCategory.name} - ${payload}`,
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
        title: initialTitle,
        categories: payload,
      };

    default:
      return state;
  }
};

export default categoriesReducer;
