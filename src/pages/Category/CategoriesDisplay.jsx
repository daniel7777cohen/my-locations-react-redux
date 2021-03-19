import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCategory } from '../../store/actions/categories-actions';
import { useHistory } from 'react-router-dom';
import { GridContainer, GridItem } from '../../components/layout/commonStyles';

export const Button = styled.button`
  margin: 10px;
  color: #fff;
  padding: 5px;
  border: none;
  cursor: pointer;
  border-radius: 12px;
  background-color: #4f94fd;

  &:focus {
    outline: none;
  }
`;

const Alert = styled.div`
  margin: 20px 5px;
`;
const Categories = () => {
  const [selectedCaregory, setSelectedCategory] = useState(null);
  const { categories } = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (i, category) => {
    setSelectedCategory(i);
    dispatch(setCurrentCategory(category));
  };

  return (
    <>
      {categories.length > 0 ? (
        <GridContainer>
          {categories.map((category, i) => (
            <GridItem
              key={i}
              isSelected={selectedCaregory === i}
              isCategoriesDisplay
              onClick={() => handleClick(i, category)}
            >
              <span> {category.name}</span>
            </GridItem>
          ))}
        </GridContainer>
      ) : (
        <Alert>
          You have no categories to display.
          <br />
          Click
          <Button onClick={() => history.push('/categories/add-category')}>
            Here
          </Button>
          to add a new category.
        </Alert>
      )}
    </>
  );
};

export default Categories;
