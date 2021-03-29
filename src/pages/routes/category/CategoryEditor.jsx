import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/layout/Spinner';
import {
  addCategory,
  editCategory,
} from '../../../store/actions/categories-actions';
import { setAlert } from '../../../store/actions/alert';
import { Redirect } from 'react-router-dom';
import { Button, RedirectLink } from '../../../components/layout/commonStyles';
import { getIsNameValid } from '../helper';

const Form = styled.form`
  margin: 20px auto;
`;

const Input = styled.input`
  display: block;
  margin:10px auto;
  padding: 10px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5%;
  &:focus {
    outline: none;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 14px;
  }
`;

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
    const isNameValid = getIsNameValid(name, { isCategory: true }, source);
    if (isNameValid) {
      applyCategoryAction();
      setName('');
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  if (source === 'edit' && !currentCategory) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <RedirectLink to="/categories/view-categories">
        Back To Categories ={'>'}
      </RedirectLink>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder={`${source} name...`}
          value={name}
          required
        />
        <Button
          disabled={isLoading || alert.length > 0}
          isLoading={isLoading || alert.length > 0}
          type="submit"
        >
          Submit
        </Button>{' '}
        {isLoading && <Spinner />}
      </Form>
    </>
  );
};

export default CategoryEditor;
