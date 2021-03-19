import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { GridContainer, GridItem } from '../../components/layout/commonStyles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryTitle = styled.h1`
  margin: 30px 0 30px 5px;
  font-size: 25px;

  @media (max-width: 768px) {
    align-self: center;
    margin: 30px 0;
  }
`;

const CategoryContainer = styled.div`
  margin: 5px;
`;

const Text = styled.span`
  display: block;
`;

const Bold = styled.span`
  font-weight: bold;
`;
export const dummyfoodLocations = [
  {
    id: '222',
    name: 'pizza-place',
    address: 'deizengof tel aviv',
    coordinates: 'lat:0.002, long:0.002',
    category_id: '0',
  },
  {
    id: '333',
    name: 'falafel-place',
    address: 'ben yehuda tel aviv',
    coordinates: 'lat:0.003, long:0.003',
    category_id: '0',
  },
  {
    id: '334',
    name: 'humus-place',
    address: 'ben yehuda tel aviv',
    coordinates: 'lat:0.001353, long:0.135003',
    category_id: '0',
  },
  {
    id: '335',
    name: 'steak-place',
    address: 'gordon tel aviv',
    coordinates: 'lat:0.0103, long:0.0503',
    category_id: '0',
  },
  {
    id: '336',
    name: 'pasta-place',
    address: 'jabutinsky tel aviv',
    coordinates: 'lat:0.3153, long:0.5003',
    category_id: '0',
  },
  {
    id: '337',
    name: 'bear-place',
    address: 'rotchild tel aviv',
    coordinates: 'lat:0.0413, long:0.01243121',
    category_id: '0',
  },
];

const CategoryDisplay = () => {
  // const { currentLocations } = useSelector((state) => state.locationsReducer); not implemented for current excersize
  const { currentCategory } = useSelector((state) => state.categoriesReducer);

  if (!currentCategory) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <CategoryContainer>
        <span>
          Displaying dummy locations.
          <br /> On a real use case, they're taken from locations reducer,
          filtered by category id.
        </span>
      </CategoryContainer>
      <CategoryTitle>{currentCategory.name}</CategoryTitle>
      <GridContainer>
        {dummyfoodLocations.map(({ id, name, address, coordinates }, i) => (
          <GridItem key={i}>
            <Text>
              <Bold>id:</Bold> {id}.
            </Text>
            <Text>
              <Bold>name:</Bold> {name}.
            </Text>
            <Text>
              <Bold>address:</Bold>
              {address}.
            </Text>
            <Text>
              <Bold>location:</Bold>
              {coordinates}.
            </Text>
          </GridItem>
        ))}
      </GridContainer>
    </Container>
  );
};

export default CategoryDisplay;
