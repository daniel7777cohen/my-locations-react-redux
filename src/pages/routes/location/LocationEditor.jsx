import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/layout/Spinner';
import Select from 'react-select';
import { setAlert } from '../../../store/actions/alert';
import { Redirect } from 'react-router-dom';
import { Button, RedirectLink } from '../../../components/layout/commonStyles';
import GoogleMaps from '../../../components/GoogleMaps';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { getIsNameValid } from '../helper';
import {
  addLocation,
  editLocation,
} from '../../../store/actions/locations-actions';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const FormGroup = styled.div`
  margin: 10px 0;
  font-weight: 100;
  font-size: 16px;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
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

const PlaceHolder = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const SubmitContainer = styled.div`
  display: inline-block;

  @media (max-width: 768px) {
    display: block;
  }
`;

const CoordName = styled.span`
  display: block;
  font-size: 13px;
  font-weight: bold;
  margin: 10px 0 5px 0;
`;

const customStyles = {
  option: (provided, state) => ({
    color: state.isSelected ? 'white' : 'black',
    backgroundColor: state.isSelected ? '#4f94fd' : 'none',
    padding: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  }),
};

const LocationEditor = ({ source }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alertReducer);
  const { categories } = useSelector((state) => state.categoriesReducer);
  const { currentLocation } = useSelector((state) => state.locationsReducer);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    address: '',
    lat: 0,
    lng: 0,
  });

  const options = categories
    ? categories.map(({ id, name }) => {
        return { value: id, label: name };
      })
    : [];

  useEffect(() => {
    if (source === 'edit' && currentLocation) {
      setFormData({
        name: currentLocation.name,
        address: currentLocation.address,
        categoryId: currentLocation.categoryId,
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      });
    } else {
      resetForm();
    }
  }, [currentLocation, source]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isNameValid = getIsNameValid(
      formData.name,
      { isCategory: false },
      source
    );
    if (isNameValid) {
      applyCategoryAction();
    } else {
      setIsLoading(false);
    }
  };

  const handleDropDown = ({ value }) => {
    setFormData((prev) => {
      return { ...prev, categoryId: value };
    });
  };

  const applyCategoryAction = () => {
    switch (source) {
      case 'add': {
        dispatch(addLocation(formData));
        setIsLoading(false);
        resetForm();
        break;
      }
      case 'edit': {
        dispatch(editLocation(formData, currentLocation.id));
        setIsLoading(false);
        break;
      }
      default:
        dispatch(setAlert(`Error - category ${source} failed.`, 'danger'));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      categoryId: '',
      lat: 0,
      lng: 0,
    });
  };
  const handleAddressChange = async ({ label }) => {
    setFormData((prev) => {
      return {
        ...prev,
        address: label,
      };
    });
    try {
      const results = await geocodeByAddress(label);
      const { lat, lng } = await getLatLng(results[0]);
      if (lat && lng) {
        setFormData((prev) => {
          return {
            ...prev,
            lat,
            lng,
          };
        });
      }
    } catch (error) {
      dispatch(
        setAlert(
          'Error getting address coordinates, please try again',
          'danger'
        )
      );
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setFormData((prev) => {
      return {
        ...prev,
        lat,
        lng,
      };
    });
  };

  if (source === 'edit' && !currentLocation) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <RedirectLink to="/locations/view-locations">
        Back To Locations ={'>'}
      </RedirectLink>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <PlaceHolder>Name</PlaceHolder>
          <Input
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder={`${source} a new name...`}
            value={formData['name']}
            name="name"
            required
          />
        </FormGroup>
        <FormGroup>
          <PlaceHolder>Address</PlaceHolder>
          <GooglePlacesAutocomplete
            selectProps={{
              onChange: handleAddressChange,
              placeholder:
                source === 'edit'
                  ? currentLocation.address
                  : 'enter a valid address',
            }}
          />
          <input
            onChange={() => undefined}
            tabIndex={-1}
            autoComplete="off"
            style={{ opacity: 0, height: 0 }}
            required
            value={formData['address']}
          />
        </FormGroup>

        <FormGroup>
          <PlaceHolder>Category</PlaceHolder>
          <Select
            options={options}
            styles={customStyles}
            onChange={handleDropDown}
            placeholder={`${
              source === 'edit' ? currentLocation.category : 'select a category'
            }`}
          />
          <input
            onChange={() => undefined}
            tabIndex={-1}
            autoComplete="off"
            style={{ opacity: 0, height: 0 }}
            required
            value={formData['categoryId']}
          />
        </FormGroup>
        <FormGroup>
          <PlaceHolder>Coordinates</PlaceHolder>
          <CoordName>latitude</CoordName>
          <Input
            isCoord={true}
            type="text"
            onChange={(e) => handleChange(e)}
            value={formData['lat']}
            name="lat"
            required
            disabled
          />
          <CoordName> longtitude</CoordName>
          <Input
            isCoord={true}
            type="text"
            onChange={(e) => handleChange(e)}
            value={formData['lng']}
            name="lng"
            required
            disabled
          />
        </FormGroup>
        <div style={{ margin: 'auto' }}>
          <GoogleMaps
            chosenLat={formData.lat}
            chosenLng={formData.lng}
            handleMapClick={handleMapClick}
            containerElement={
              <div style={{ height: '400px', width: '350px' }} />
            }
            mapElement={<div style={{ height: '100%' }} />}
          />
        </div>
        <SubmitContainer>
          <Button
            disabled={isLoading || alert.length > 0}
            isLoading={isLoading || alert.length > 0}
            type="submit"
          >
            Submit
          </Button>{' '}
          {(isLoading || alert.lengh > 0) && <Spinner />}
        </SubmitContainer>
      </Form>
    </>
  );
};

export default LocationEditor;
