import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, withRouter } from 'react-router-dom';
import { deleteCategory } from '../../store/actions/categories-actions';
import Spinner from '../../components/layout/Spinner';
import { setAlert } from '../../store/actions/alert';

const WarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const WarningButton = styled.button`
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  background-color: ${({ deleteButton }) =>
    deleteButton ? '#c70a0a' : '#377afe'};
  margin: 10px;
  opacity: ${({ isLoading }) => (isLoading ? '40%' : 'none')};
  width: 200px;
`;

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

  const handleRedirect = () => {
    setIsLoading(true);
    history.push('/categories/view-categories');
    setIsLoading(false);
  };
  return (
    <WarningContainer>
      <WarningButton
        isLoading={isLoading}
        disabled={isLoading}
        onClick={() => handleDelete()}
        deleteButton
      >
        Press here to delete
      </WarningButton>
      <WarningButton
        isLoading={isLoading}
        disabled={isLoading}
        onClick={() => handleRedirect()}
      >
        Go to category list
      </WarningButton>
      {isLoading && <Spinner />}
    </WarningContainer>
  );
};

export default withRouter(CategoryDelete);
