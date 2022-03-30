import React from 'react';
import Routes from './Routes';
import { HashRouter } from 'react-router-dom';
import Header from './components/header/Header';
import './styles/styles.scss';

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes />
      </HashRouter>
    </div>
  );
}

export default App;
