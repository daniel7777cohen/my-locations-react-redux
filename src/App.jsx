import './App.css';
import { useEffect } from 'react';
import styled from 'styled-components';
import BottomBar from './components/layout/BottomBar';
import Topbar from './components/layout/Topbar';
import LayoutRouter from './pages/routes/LayoutRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';
import { getCategories } from './store/actions/categories-actions';
import { getLocations } from './store/actions/locations-actions';
import Alert from './components/layout/Alert';

const Container = styled.div`
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
  height: 100%;
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
  text-align: center;
  font-size: 12px;
  z-index: 1;
  box-shadow: -20px 7px 18px 0px;
`;


function App() {
  useEffect(() => {
    store.dispatch(getCategories());
    store.dispatch(getLocations());
  }, []);

  return (
    <Provider store={store}>
      <Container>
        <Router>
        <Alert/>
          <Topbar />
          <LayoutRouter />
          <BottomBar />
          <Footer>
            WellDone Assignment <br />
            Using React Redux Styled-Components
          </Footer>
        </Router>
      </Container>
    </Provider>
  );
}

export default App;
