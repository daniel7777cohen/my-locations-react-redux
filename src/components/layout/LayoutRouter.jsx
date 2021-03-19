import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import CategoriesDisplay from '../../pages/Category/CategoriesDisplay';
import CategoryDelete from '../../pages/Category/CategoryDelete';
import CategoryDisplay from '../../pages/Category/CategoryDisplay';
import CategoryEditor from '../../pages/Category/CategoryEditor';
import Homepage from '../../pages/Homepage';
import Alert from './Alert';
import Topbar from './Topbar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

const LayoutRouter = () => {
  return (
    <Container>
      <Topbar />
      <Layout>
        <Alert />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route
            exact
            path="/categories/view-categories"
            component={CategoriesDisplay}
          />
          <Route
            exact
            path="/categories/view-category"
            component={CategoryDisplay}
          />
          <Route
            exact
            path="/categories/add-category"
            render={(props) => <CategoryEditor {...props} source={'add'} />}
          />
          <Route
            exact
            path="/categories/edit-category"
            render={(props) => <CategoryEditor {...props} source={'edit'} />}
          />
          <Route
            exact
            path="/categories/delete-category"
            component={CategoryDelete}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </Layout>
    </Container>
  );
};

export default LayoutRouter;
