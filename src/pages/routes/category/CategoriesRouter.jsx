import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import CategoryDisplay from './CategoryDisplay';
import CategoriesDisplay from './CategoriesDisplay';
import CategoryEditor from './CategoryEditor';
import CategoryDelete from './CategoryDelete';

const CategoriesRouter = () => {
  const routeMatch = useRouteMatch();

  const getFullPath = (path) => {
    return routeMatch.path + path;
  };
  return (
    <Switch>
      <Route
        exact
        path={`${getFullPath('/view-categories')}`}
        component={CategoriesDisplay}
      />
      <Route
        exact
        path={`${getFullPath('/view-category')}`}
        component={CategoryDisplay}
      />
      <Route
        exact
        path={`${getFullPath('/add-category')}`}
        render={(props) => <CategoryEditor {...props} source={'add'} />}
      />
      <Route
        exact
        path={`${getFullPath('/edit-category')}`}
        render={(props) => <CategoryEditor {...props} source={'edit'} />}
      />
      <Route
        exact
        path={`${getFullPath('/delete-category')}`}
        component={CategoryDelete}
      />
    </Switch>
  );
};

export default CategoriesRouter;
