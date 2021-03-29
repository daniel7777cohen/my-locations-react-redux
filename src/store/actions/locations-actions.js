import { v4 as uuidv4 } from 'uuid';
import store from '../store';
import { setAlert } from './alert';
import {
  ADD_LOCATION,
  DELETE_LOCATION,
  SET_LOCATIONS,
  SET_CURRENT_LOCATION,
} from './constants';

export const getLocations = () => (dispatch) => {
  const fetchedLocations = JSON.parse(localStorage.getItem('locations'));
  if (fetchedLocations && fetchedLocations.length > 0) {
    dispatch({
      type: SET_LOCATIONS,
      payload: fetchedLocations,
    });
  }
};

export const addLocation = (formData) => (dispatch) => {
  let newLocations = [];
  const fetchedLocations = JSON.parse(localStorage.getItem('locations'));
  const id = uuidv4();

  if (fetchedLocations) {
    newLocations = [...fetchedLocations];
  }
  newLocations.push({ id, ...formData });
  localStorage.setItem('locations', JSON.stringify(newLocations));
  dispatch({
    type: ADD_LOCATION,
    payload: newLocations,
  });

  dispatch(setAlert('Location added successfully', 'success'));
};

export const setCurrentLocation = (location) => (dispatch) => {
  const currentCategory = store
    .getState()
    .categoriesReducer.categories.find(
      (category) => category.id === location.categoryId
    );
  dispatch({
    type: SET_CURRENT_LOCATION,
    payload: {
      ...location,
      category: currentCategory ? currentCategory.name : 'Category was removed',
    },
  });
};

export const editLocation = (formData, currentLocationId) => (dispatch) => {
  const locations = JSON.parse(localStorage.getItem('locations'));
  const editedLocationIndex = locations.findIndex(
    (location) => location.id === currentLocationId
  );
  locations[editedLocationIndex] = { ...formData, id: currentLocationId };
  localStorage.setItem('locations', JSON.stringify(locations));

  dispatch({
    type: SET_LOCATIONS,
    payload: locations,
  });
  dispatch(setCurrentLocation(locations[editedLocationIndex]));

  dispatch(setAlert(`Location edited successfully`, 'success'));
};

export const deleteLocation = (locationId) => (dispatch) => {
  const locations = JSON.parse(localStorage.getItem('locations'));
  const deletedLocationIndex = locations.findIndex(
    (location) => location.id === locationId
  );

  locations.splice(deletedLocationIndex, 1);
  localStorage.setItem('locations', JSON.stringify(locations));

  dispatch({
    type: DELETE_LOCATION,
    payload: locations,
  });

  dispatch(setAlert(`Location deleted successfully`, 'success'));
};
