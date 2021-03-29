import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const GoogleMaps = withGoogleMap(
  ({ handleMapClick, chosenLat, chosenLng, isLocationView = false }) => (
    <GoogleMap
      onClick={handleMapClick}
      defaultZoom={isLocationView ? 20 : 0}
      defaultCenter={{ lat: chosenLat, lng: chosenLng }}
    >
      {<Marker position={{ lat: chosenLat, lng: chosenLng }} />}
    </GoogleMap>
  )
);

export default GoogleMaps;
