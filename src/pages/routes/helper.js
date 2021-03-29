import { setAlert } from '../../store/actions/alert';
import store from '../../store/store';

export const getIsNameValid = (newName, { isCategory},source) => {
  if (newName.length > 20) {
    store.dispatch(
      setAlert(
        `Error - ${
          isCategory ? 'category' : 'locations'
        }'s length cannot exceed 20 characters`,
        'danger'
      )
    );
    return false;
  }
  let entities;
  if (!isCategory) {
    const { locations } = store.getState().locationsReducer;
    if (locations.length === 0) return true;
    entities = locations;
  } else {
    const { categories } = store.getState().categoriesReducer;
    if (categories.length === 0) return true;
    entities = categories;
  }
  if(source==='edit')
  return true;

  return getIsNameExist(entities, newName, isCategory);
};

const getIsNameExist = (entities, newName, isCategory) => {
  //prevent duplicates
  const isNameExsists = entities.find((entity) => entity.name === newName);
  if (isNameExsists) {
    store.dispatch(
      setAlert(
        `Error - ${
          isCategory ? 'category' : 'location'
        }  ${newName} already exsists`,
        'danger'
      )
    );
    return false;
  }
  return true;
};
