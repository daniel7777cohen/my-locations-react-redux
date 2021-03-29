import {
  ADD_CATEGORY,
  SET_CURRENT_CATEGORY,
  SET_CATEGORIES,
  DELETE_CATEGORY,
} from './constants';
import { v4 as uuidv4 } from 'uuid';
import { setAlert } from './alert';

export const getCategories = () => (dispatch) => {
  const fetchedCategories = JSON.parse(localStorage.getItem('categories'));
  if (fetchedCategories && fetchedCategories.length > 0) {
    dispatch({
      type: SET_CATEGORIES,
      payload: fetchedCategories,
    });
  }
};

export const addCategory = (newCategory) => (dispatch) => {
  let newCategories = [];
  const fetchedCategories = JSON.parse(localStorage.getItem('categories'));
  const id = uuidv4();

  if (fetchedCategories) {
    newCategories = [...fetchedCategories];
  }
  newCategories.push({ id, name: newCategory });
  localStorage.setItem('categories', JSON.stringify(newCategories));
  dispatch({
    type: ADD_CATEGORY,
    payload: newCategories,
  });

  dispatch(setAlert('Category added successfully', 'success'));
};

export const setCurrentCategory = (category) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_CATEGORY,
    payload: category,
  });
};

export const editCategory = (categoryId, newName) => (dispatch) => {
  const categories = JSON.parse(localStorage.getItem('categories'));
  const editedCategoryIndex = categories.findIndex(
    (cat) => cat.id === categoryId
  );
  categories[editedCategoryIndex].name = newName;
  localStorage.setItem('categories', JSON.stringify(categories));

  dispatch({
    type: SET_CATEGORIES,
    payload: categories,
  });

  dispatch(setCurrentCategory(categories[editedCategoryIndex]));
  
  dispatch(setAlert(`Category edited successfully`, 'success'));
};

export const deleteCategory = (categoryId) => (dispatch) => {
  const categories = JSON.parse(localStorage.getItem('categories'));
  const deletedCategoryIndex = categories.findIndex(
    (cat) => cat.id === categoryId
  );

  categories.splice(deletedCategoryIndex, 1);
  localStorage.setItem('categories', JSON.stringify(categories));

  dispatch({
    type: DELETE_CATEGORY,
    payload: categories,
  });

  dispatch(setAlert(`Category deleted successfully`, 'success'));
};
