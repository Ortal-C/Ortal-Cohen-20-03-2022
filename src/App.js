import React from 'react';
// import Routes from './Routes';
import { Home } from './pages';
import { BrowserRouter } from 'react-router-dom';
import { Header, Footer } from './components';
import './styles/styles.scss';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Home />
        {/* <Routes /> */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
