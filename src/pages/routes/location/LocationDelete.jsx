import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, withRouter } from 'react-router-dom';
import { setAlert } from '../../../store/actions/alert';
import Spinner from '../../../components/layout/Spinner';
import {
  RedirectLink,
  WarningButton,
} from '../../../components/layout/commonStyles';
import { deleteLocation } from '../../../store/actions/locations-actions';

const LocationDelete = () => {
  const { currentLocation } = useSelector((state) => state.locationsReducer);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!currentLocation) {
    return <Redirect to="/" />;
  }

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      dispatch(deleteLocation(currentLocation.id));
      setIsLoading(false);
      history.push('/locations/view-locations');
    } catch (error) {
      setAlert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <RedirectLink to="/locations/view-locations">
        Back To Locations ={'>'}
      </RedirectLink>
      <WarningButton
        isLoading={isLoading}
        disabled={isLoading}
        onClick={() => handleDelete()}
      >
        Press Here To Delete
      </WarningButton>
      {isLoading && <Spinner />}
    </>
  );
};

export default withRouter(LocationDelete);
