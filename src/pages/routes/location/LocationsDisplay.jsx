import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  Alert,
  GridContainer,
  GridItem,
} from '../../../components/layout/commonStyles';
import { RESET_CURRENT_LOCATION } from '../../../store/actions/constants';
import { setCurrentLocation } from '../../../store/actions/locations-actions';

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

const LocationsDisplay = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { locations, currentLocation } = useSelector(
    (state) => state.locationsReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (i, location) => {
    if (selectedLocation === i) {
      setSelectedLocation(null);
      dispatch({ type: RESET_CURRENT_LOCATION });
    } else {
      setSelectedLocation(i);
      dispatch(setCurrentLocation(location));
    }
  };
  return (
    <>
      {locations.length > 0 ? (
        <GridContainer>
          {locations.map((location, i) => (
            <GridItem
              key={i}
              isSelected={
                selectedLocation === i ||
                (currentLocation && currentLocation.id === location.id)
              }
              isCategoriesDisplay
              onClick={() => handleClick(i, location)}
            >
              <span> {location.name}</span>
            </GridItem>
          ))}
        </GridContainer>
      ) : (
        <Alert>
          You have no locations to display.
          <br />
          Click
          <Button onClick={() => history.push('/locations/add-location')}>
            Here
          </Button>
          to add a new location.
        </Alert>
      )}
    </>
  );
};

export default LocationsDisplay;
