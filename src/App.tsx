import React from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Display from './components/Display';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Display />
    </>
  );
}

export default App;
