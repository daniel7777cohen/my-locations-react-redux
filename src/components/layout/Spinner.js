import React from 'react';
import spinner from './assets/spinner.gif';

const Spinner = () => {
  return (
    <>
      <img
        src={spinner}
        alt={'Loading...'}
        style={{ width: '17px', height: '17px' }}
      />
    </>
  );
};

export default Spinner;
