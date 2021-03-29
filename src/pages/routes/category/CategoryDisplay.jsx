import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import {
  Bold,
  GridContainer,
  GridItem,
  RedirectLink,
  Text,
} from '../../../components/layout/commonStyles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 20px auto;
  font-size: 25px;
  border-bottom: 2px solid black;
`;

const CategoryDisplay = () => {
  const { currentCategory } = useSelector((state) => state.categoriesReducer);
  const { locations } = useSelector((state) => state.locationsReducer);

  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    if (currentCategory && locations) {
      setFilteredLocations(
        locations.filter(
          (location) => location.categoryId === currentCategory.id
        )
      );
    }
  }, [currentCategory, locations]);

  if (!currentCategory) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <RedirectLink to="/categories/view-categories">
        Back To Categories ={'>'}
      </RedirectLink>
      <Title>Related Locations</Title>
      <GridContainer>
        {filteredLocations.length > 0 ? (
          filteredLocations.map(({ name, address, lat, lng }, i) => (
            <GridItem key={i}>
              <Text>
                <Bold>name:</Bold> {name}.
              </Text>
              <Text>
                <Bold>address:</Bold>
                {address}.
              </Text>
              <Text>
                <Bold>latitude:</Bold>
                {lat}
              </Text>
              <Text>
                <Bold>langtitude:</Bold>
                {lng}
              </Text>
            </GridItem>
          ))
        ) : (
          <h2 style={{ margin: 'auto' }}>
            You have no locations related to the current category
          </h2>
        )}
      </GridContainer>
    </Container>
  );
};

export default CategoryDisplay;
