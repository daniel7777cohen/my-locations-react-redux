import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import GoogleMaps from '../../../components/GoogleMaps';
import {
  Bold,
  RedirectLink,
  Text,
} from '../../../components/layout/commonStyles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Location = styled.div`
  display: flex;
  height: 100%;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LocationDetails = styled.div`
  box-shadow: inset -6px 5px 8px 0px #c7c7c7;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;

  @media (max-width: 768px) {
    box-shadow: inset -1px -9px 8px 0px #c7c7c7;
  }
`;

const MapDisplay = styled.div`
  height: 100%;
  width: 100%;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const LocationDisplay = () => {
  const { currentLocation } = useSelector((state) => state.locationsReducer);

  if (!currentLocation) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <RedirectLink to="/locations/view-locations">
        Back To Locations ={'>'}
      </RedirectLink>
      <Location>
        <LocationDetails>
          {Object.keys(currentLocation).map(
            (key, i) =>
              key !== 'categoryId' && (
                <Text key={i}>
                  <Bold>{key}</Bold>: {currentLocation[key]}
                </Text>
              )
          )}
        </LocationDetails>
        <GoogleMaps
          isLocationView={true}
          chosenLat={currentLocation.lat}
          chosenLng={currentLocation.lng}
          containerElement={<MapDisplay />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </Location>
    </Container>
  );
};

export default LocationDisplay;
