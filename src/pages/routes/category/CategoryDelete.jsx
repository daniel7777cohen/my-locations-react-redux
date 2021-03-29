import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, withRouter } from 'react-router-dom';
import { deleteCategory } from '../../../store/actions/categories-actions';
import { setAlert } from '../../../store/actions/alert';
import Spinner from '../../../components/layout/Spinner';
import { RedirectLink, WarningButton } from '../../../components/layout/commonStyles';

const CategoryDelete = () => {
  const { currentCategory } = useSelector((state) => state.categoriesReducer);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!currentCategory) {
    return <Redirect to="/" />;
  }

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      dispatch(deleteCategory(currentCategory.id));
      setIsLoading(false);
      history.push('/categories/view-categories');
    } catch (error) {
      setAlert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <RedirectLink to="/categories/view-categories">
        Back To Categories ={'>'}
      </RedirectLink>
      <WarningButton
        isLoading={isLoading}
        disabled={isLoading}
        onClick={() => handleDelete()}
      >
        Press Here To Delete
      </WarningButton>
      {isLoading && <Spinner />}
    </>
  );
};

export default withRouter(CategoryDelete);
