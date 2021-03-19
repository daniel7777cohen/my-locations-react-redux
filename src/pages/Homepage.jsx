import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const Homepage = () => {
  return (
    <Container>
      <h1>Welcome to locations app</h1>
    </Container>
  );
};

export default Homepage;
