import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LocationDelete from './LocationDelete';
import LocationDisplay from './LocationDisplay';
import LocationEditor from './LocationEditor';
import LocationsDisplay from './LocationsDisplay';

const LocationsRouter = () => {
  const routeMatch = useRouteMatch();

  const getFullPath = (path) => {
    return routeMatch.path + path;
  };

  return (
    <Switch>
      <Route
        exact
        path={`${getFullPath('/view-locations')}`}
        component={LocationsDisplay}
      ></Route>
          <Route
        exact
        path={`${getFullPath('/view-location')}`}
        component={LocationDisplay}
      ></Route>
           <Route
        exact
        path={`${getFullPath('/add-location')}`}
        render={(props) => <LocationEditor {...props} source={'add'} />}
        ></Route>
         <Route
        exact
        path={`${getFullPath('/edit-location')}`}
        render={(props) => <LocationEditor {...props} source={'edit'} />}
        ></Route>
         <Route
        exact
        path={`${getFullPath('/delete-location')}`}
        component={LocationDelete}
      ></Route>
    </Switch>
  );
};

export default LocationsRouter;
