import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/layout/Spinner';
import {
  addCategory,
  editCategory,
} from '../../store/actions/categories-actions';
import { setAlert } from '../../store/actions/alert';
import store from '../../store/store';
import { Redirect } from 'react-router-dom';

const Form = styled.form`
  margin: 20px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 24px 0 0 0;
  }
`;
export const Input = styled.input`
  padding: 10px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5%;
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    ::placeholder,
    ::-webkit-input-placeholder {
      font-size: 14px;
    }
  }
`;

const Button = styled.button`
  margin-left: 10px;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  background-color: #4f94fd;
  opacity: ${({ isLoading }) => (isLoading ? '40%' : 'none')};

  @media (max-width: 768px) {
    margin: 10px 0 0 0;
  }

  &:focus {
    outline: none;
  }
`;

export const SubmitContainer = styled.div`
  display: inline-block;

  @media (max-width: 768px) {
    display: block;
  }
`;

const getIsNameValid = (newCategoryName) => {
  if (newCategoryName.length > 20) {
    store.dispatch(
      setAlert(
        `Error - category's length cannot exceed 20 characters`,
        'danger'
      )
    );
    return false;
  }

  const { categories } = store.getState().categoriesReducer;
  if (categories.length === 0) return true;

  return getIsNameExist(categories, newCategoryName);
};

const getIsNameExist = (categories, newCategoryName) => {
  //prevent duplicates
  const isNameExsists = categories.find(
    (category) => category.name === newCategoryName
  );
  if (isNameExsists) {
    store.dispatch(
      setAlert(`Error - category ${newCategoryName} already exsists`, 'danger')
    );
    return false;
  }
  return true;
};

const CategoryEditor = ({ source }) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alertReducer);
  const { currentCategory } = useSelector((state) => state.categoriesReducer);

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const applyCategoryAction = () => {
    switch (source) {
      case 'add': {
        dispatch(addCategory(name));
        setIsLoading(false);
        break;
      }
      case 'edit': {
        dispatch(editCategory(currentCategory.id, name));
        setIsLoading(false);
        break;
      }
      default:
        dispatch(setAlert(`Error - category ${source} failed.`, 'danger'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isNameValid = getIsNameValid(name);
    if (isNameValid) {
      applyCategoryAction();
      setName('');
    } else {
      setIsLoading(false);
    }
  };

  if (source === 'edit' && !currentCategory) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder={`${source} ${
            currentCategory ? `"${currentCategory.name}"` : 'a category'
          } name...`}
          value={name}
          required
        />

        <SubmitContainer>
          <Button
            disabled={isLoading | (alert.length > 0)}
            isLoading={isLoading | (alert.length > 0)}
            type="submit"
          >
            Submit
          </Button>{' '}
          {isLoading && <Spinner />}
        </SubmitContainer>
      </Form>
    </>
  );
};

export default CategoryEditor;
