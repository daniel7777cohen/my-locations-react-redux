import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Homepage from '../Homepage';
import CategoriesRouter from './category/CategoriesRouter';
import LocationsRouter from './location/LocationsRouter';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  margin-bottom: 145px;
`;

const LayoutRouter = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/categories">
          <CategoriesRouter />
        </Route>
        <Route path="/locations">
          <LocationsRouter />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </Layout>
  );
};
export default LayoutRouter;
