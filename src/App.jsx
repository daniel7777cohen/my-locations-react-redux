import './App.css';
import { useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './components/layout/Sidebar';
import LayoutRouter from './components/layout/LayoutRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';
import { getCategories } from './store/actions/categories-actions';

const Container = styled.div`
  background-color: #f0f2f5;
  display: flex;
  height: 100%;
  padding-bottom:60px;
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: 10px;
  background-color: #f0f2f5;
  text-align:center;
  font-size:12px;
  z-index:1;
  box-shadow: -20px 7px 18px 0px;
`;

function App() {
  useEffect(() => {
    store.dispatch(getCategories());
  }, []);

  return (
    <Provider store={store}>
      <Container>
        <Router>
          <Sidebar />
          <LayoutRouter />
          <Footer>WellDone Assignment <br/>Using React Redux Styled-Components</Footer>
        </Router>
      </Container>
    </Provider>
  );
}

export default App;
